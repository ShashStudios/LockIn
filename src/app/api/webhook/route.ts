import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    // Initialize Stripe lazily to avoid build-time errors
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        apiVersion: "2025-12-15.clover",
    });
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;

            if (userId && userId !== "anonymous") {
                // Update Clerk user metadata
                // This requires Clerk Backend SDK
                // await clerkClient.users.updateUser(userId, {
                //   privateMetadata: {
                //     plan: session.mode === "subscription" ? "PRO" : "LIFETIME",
                //     stripeCustomerId: session.customer,
                //     stripeSubscriptionId: session.subscription,
                //   },
                // });
                console.log(`Payment successful for user ${userId}`);
            }
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            // Downgrade user to FREE plan
            // This would update Clerk metadata
            console.log(`Subscription cancelled: ${subscription.id}`);
            break;
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;
            // Handle subscription changes
            console.log(`Subscription updated: ${subscription.id}`);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}

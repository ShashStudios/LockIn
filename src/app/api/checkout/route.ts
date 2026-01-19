import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    // Initialize Stripe lazily to avoid build-time errors
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        apiVersion: "2025-12-15.clover",
    });
    try {
        const body = await request.json();
        const { priceId, userId } = body;

        if (!priceId) {
            return NextResponse.json(
                { error: "Price ID is required" },
                { status: 400 }
            );
        }

        // Determine if this is a subscription or one-time payment
        const isSubscription = priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID;

        const session = await stripe.checkout.sessions.create({
            mode: isSubscription ? "subscription" : "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
            metadata: {
                userId: userId || "anonymous",
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}

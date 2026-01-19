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
        const { customerId } = body;

        if (!customerId) {
            return NextResponse.json(
                { error: "Customer ID is required" },
                { status: 400 }
            );
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Portal error:", error);
        return NextResponse.json(
            { error: "Failed to create portal session" },
            { status: 500 }
        );
    }
}

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";  



export async function POST(req: Request) {
    const body = await req.text(); // Raw body is required for Stripe signature verification
    const rawHeaders = headers();
    const signature = rawHeaders.get("Stripe-Signature") as string;

    if (!signature) {
        return NextResponse.json(
            { error: "Missing Stripe-Signature header" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Ensure STRIPE_WEBHOOK_SECRET is available
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error("Stripe webhook secret is not configured");
        }

        // Construct the event with raw body and signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Log event details (optional for debugging)
        console.log("Received event:", event);
    } catch (error: unknown) {
    return new NextResponse(`Webhook error ${JSON.stringify(error)}`, {
      status: 400,
    });
  }

        const session = event.data.object as Stripe.Checkout.Session;

        if (event.type === "checkout.session.completed") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            if (!session?.metadata?.userId) {
                return new NextResponse("User ID is required", { status: 400 });
            }

            await db.insert(userSubscription).values({
                userId: session.metadata.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date (
                    subscription.current_period_end * 1000,
                ),

            });
        }

        if (event.type === "invoice.payment_succeeded") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            await db.update(userSubscription).set({
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,  
            ),
        }).where(eq(userSubscription.stripeSubscriptionId, subscription.id))
    }
    // Respond with status 200 for successful processing
    return NextResponse.json({ message: "Webhook received successfully" }, { status: 200 });
};

import stripe from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel-subscription";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !secret) {
      return NextResponse.json(
        { error: "No signature or secret" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        const metadata = event.data.object.metadata;

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(event);
        }

        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event);
        }
        break;
      case "checkout.session.expired":
        // sessão de pagamento expirou
        break;
      case "checkout.session.async_payment_succeeded":
        // pagamento com boleto deu certo
        break;
      case "checkout.session.async_payment_failed":
        // pagamento com boleto deu errado
        break;
      case "customer.subscription.created":
        // criou assinatura
        break;
      case "customer.subscription.deleted":
        await handleStripeCancelSubscription(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

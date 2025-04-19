import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log("Assinatura realizada com sucesso");
    const metadata = event.data.object.metadata;

    const userId = metadata?.userId;

    if (!userId) return console.log("User not found");

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    });
  }
}

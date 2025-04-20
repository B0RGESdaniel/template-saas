import { db } from "@/app/lib/firebase";
import resend from "@/app/lib/resend";
import "server-only";
import Stripe from "stripe";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log("Assinatura realizada com sucesso");
    const metadata = event.data.object.metadata;

    const userId = metadata?.userId;
    const userEmail =
      event.data.object.customer_email ||
      event.data.object.customer_details?.email;

    if (!userId || !userEmail) return console.log("User not found");

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    });

    const { data, error } = await resend.emails.send({
      from: "Acme <me@dnborges.dev>",
      to: [userEmail],
      subject: "Pagamento realizado",
      text: "Pagamento realizado com sucesso",
    });

    if (error) {
      console.log(error);
    }

    console.log(data);
  }
}

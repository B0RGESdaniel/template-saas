"use client";

import { useStripe } from "@/app/hooks/useStripe";

export default function Pagamentos() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-screen">
      <h1 className="text-4xl font-bold">Pagamentos</h1>
      <button
        className="border rounded-md px-2 cursor-pointer"
        onClick={() => createPaymentStripeCheckout("teste")}
      >
        Criar pagamento Stripe
      </button>
      <button
        className="border rounded-md px-2 cursor-pointer"
        onClick={() => createSubscriptionStripeCheckout("teste")}
      >
        Criar assinatura Stripe
      </button>
      <button
        className="border rounded-md px-2 cursor-pointer"
        onClick={handleCreateStripePortal}
      >
        Criar portal Stripe
      </button>
    </div>
  );
}

import resend from "@/app/lib/resend";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email;
  const testeId = metadata.teste_id;
  console.log("PAGAMENTO COM SUCESSO", {
    paymentData,
    userEmail,
    testeId,
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

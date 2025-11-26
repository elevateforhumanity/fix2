import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { provisionEnrollmentFromStripe } from "@/lib/enrollmentProvisioning";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const programId = session.metadata?.efh_program_id as string | undefined;
    const studentId = session.metadata?.efh_student_id as string | undefined;
    const paymentMode = session.metadata?.efh_payment_mode as "full" | "plan";
    const paymentRef =
      (session.payment_intent as string | undefined) ??
      (session.subscription as string | undefined);

    if (programId && studentId && paymentMode) {
      await provisionEnrollmentFromStripe({
        programId,
        studentId,
        paymentMode,
        stripeRefId: paymentRef,
      });
    }
  }

  return NextResponse.json({ received: true });
}

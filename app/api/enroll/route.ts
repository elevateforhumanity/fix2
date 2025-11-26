import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProgramById } from "@/lms-data/programs";
import { getCurrentUser } from "@/lib/auth-server";

async function ensureStudent() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Not authenticated");
  }
  
  return {
    id: user.id,
    email: user.email || "no-email@example.com",
  };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("program");
    const mode = (searchParams.get("mode") as "full" | "plan") || "full";

    if (!programId) {
      return NextResponse.json({ error: "Missing program id" }, { status: 400 });
    }

    const program = getProgramById(programId);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const priceId =
      mode === "plan" ? program.stripePriceIdPlan : program.stripePriceId;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price not configured for this program" },
        { status: 500 }
      );
    }

    const student = await ensureStudent();

    const session = await stripe.checkout.sessions.create({
      mode: mode === "plan" ? "subscription" : "payment",
      customer_email: student.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs/${program.slug}`,
      metadata: {
        efh_program_id: program.id,
        efh_student_id: student.id,
        efh_payment_mode: mode,
      },
    });

    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (err) {
    console.error("Enroll route error:", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}

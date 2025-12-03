import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";
import { programToCourseSlugs } from "@/lms-data/enrollmentMappings";
import { autoEnrollPartnerCourse } from "@/lib/automation/partnerEnrollment";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe =
  stripeSecretKey
    ? new Stripe(stripeSecretKey, {
        apiVersion: "2024-11-20.acacia" as any,
      })
    : null;

export async function POST(req: NextRequest) {
  if (!stripe || !stripeWebhookSecret) {
    console.error(
      "[StripeWebhook] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET."
    );
    return NextResponse.json(
      { received: true, error: "Stripe not configured" },
      { status: 200 }
    );
  }

  if (!supabase) {
    console.error("[StripeWebhook] Supabase client not configured.");
    return NextResponse.json(
      { received: true, error: "Supabase not configured" },
      { status: 200 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("[StripeWebhook] Missing stripe-signature header.");
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
  } catch (err: any) {
    console.error("[StripeWebhook] Signature verification failed:", err?.message);
    return NextResponse.json(
      { error: "Signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.customer_details?.email || session.customer_email || null;

    const programId =
      (session.metadata?.programId as string | undefined) ||
      (session.metadata?.program_id as string | undefined) ||
      (session.metadata?.efh_program_id as string | undefined) ||
      null;

    const applicationId =
      (session.metadata?.applicationId as string | undefined) || null;

    const checkoutSessionId = session.id;
    const paymentLinkId =
      (session.payment_link as string | undefined) || null;
    const customerId =
      (session.customer as string | undefined) || null;

    if (!email || !programId) {
      console.warn(
        "[StripeWebhook] checkout.session.completed missing email or programId. " +
          "Make sure your Payment Links or Checkout Sessions set metadata.programId and collect email."
      );
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // 1) Find latest matching application by email + program_id
    let matchedApplicationId = applicationId || null;

    if (!matchedApplicationId) {
      const { data: apps, error: appsError } = await supabase
        .from("applications")
        .select("id")
        .eq("email", email)
        .eq("program_id", programId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (appsError) {
        console.error("[StripeWebhook] Error querying applications:", appsError);
      } else if (apps && apps.length > 0) {
        matchedApplicationId = apps[0].id;
      }
    }

    // 2) Insert enrollment record
    const { data: enrollmentRows, error: enrollError } = await supabase
      .from("enrollments")
      .insert({
        application_id: matchedApplicationId,
        program_id: programId,
        email,
        stripe_checkout_session_id: checkoutSessionId,
        stripe_payment_link_id: paymentLinkId,
        stripe_customer_id: customerId,
        status: "active",
        source: "stripe-payment-link",
      })
      .select("id")
      .limit(1);

    if (enrollError) {
      console.error("[StripeWebhook] Error inserting enrollment:", enrollError);
    }

    const enrollmentId = enrollmentRows?.[0]?.id || null;

    // 3) Update application payment_status if we have an application
    if (matchedApplicationId) {
      const { error: updateError } = await supabase
        .from("applications")
        .update({ payment_status: "paid", status: "accepted" })
        .eq("id", matchedApplicationId);

      if (updateError) {
        console.error(
          "[StripeWebhook] Error updating application payment_status:",
          updateError
        );
      }
    }

    // 4) Auto-assign course access based on program → course mapping
    const courseSlugs = programToCourseSlugs[programId] || [];
    if (courseSlugs.length > 0) {
      const rowsToInsert = courseSlugs.map((slug) => ({
        email,
        program_id: programId,
        course_slug: slug,
        enrollment_id: enrollmentId,
        source: "stripe-webhook",
      }));

      const { error: scError } = await supabase
        .from("student_courses")
        .upsert(rowsToInsert, {
          onConflict: "email,program_id,course_slug",
        });

      if (scError) {
        console.error(
          "[StripeWebhook] Error inserting student_courses:",
          scError
        );
      } else {
          `[StripeWebhook] Auto-assigned courses ${courseSlugs.join(
            ", "
          )} for email=${email}, program=${programId}`
        );
      }
    } else {
        `[StripeWebhook] No course mapping found for program=${programId}; skipping student_courses insert.`
      );
    }

    // 5) Auto-enroll in partner courses if metadata includes partner info
    const partnerId = session.metadata?.partnerId;
    const courseId = session.metadata?.courseId;
    const studentId = session.metadata?.studentId;

    if (studentId && partnerId && courseId) {
        `[StripeWebhook] Auto-enrolling student ${studentId} in partner course ${courseId}`
      );
      
      try {
        const result = await autoEnrollPartnerCourse({
          studentId,
          partnerId,
          courseId,
          programId: programId || undefined,
        });

        if (result.success) {
            `[StripeWebhook] Partner enrollment successful: ${result.enrollmentId}`
          );
        } else {
          console.error(
            `[StripeWebhook] Partner enrollment failed: ${result.error}`
          );
        }
      } catch (err: any) {
        console.error(
          `[StripeWebhook] Partner enrollment exception: ${err.message}`
        );
      }
    }

      `[StripeWebhook] Enrollment recorded for email=${email}, program=${programId}, appId=${matchedApplicationId}, enrollmentId=${enrollmentId}`
    );
  } else {
    // For now, just acknowledge other events
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// app/api/webhooks/partners/[partner]/route.ts
// Webhook endpoint for partner progress updates

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPartnerClient, PartnerType, WebhookPayload } from "@/lib/partners";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials not configured");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ partner: string }> }
) {
  const { partner: partnerName } = await params;
  const partner = partnerName as PartnerType;
  
  const supabase = getSupabaseClient();

  try {
    // Get webhook signature from headers
    const signature = request.headers.get("x-webhook-signature") || "";
    const rawBody = await request.text();

    // Verify webhook signature
    const client = getPartnerClient(partner);
    const webhookSecret = process.env.PARTNER_WEBHOOK_SECRET || "";
    
    const isValid = client.verifyWebhookSignature(
      rawBody,
      signature,
      webhookSecret
    );

    if (!isValid) {
      console.error(`[Webhook] Invalid signature for ${partner}`);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload: WebhookPayload = JSON.parse(rawBody);

      event: payload.event,
      timestamp: payload.timestamp,
    });

    // Process webhook based on event type
    switch (payload.event) {
      case "enrollment.created":
        await handleEnrollmentCreated(partner, payload.data);
        break;

      case "progress.updated":
        await handleProgressUpdated(partner, payload.data);
        break;

      case "course.completed":
        await handleCourseCompleted(partner, payload.data);
        break;

      case "certificate.issued":
        await handleCertificateIssued(partner, payload.data);
        break;

      default:
        console.warn(`[Webhook] Unknown event type: ${payload.event}`);
    }

    // Process webhook through partner-specific handler
    await client.processWebhook(payload);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`[Webhook] Error processing ${partner} webhook:`, error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleEnrollmentCreated(
  partner: PartnerType,
  data: any
): Promise<void> {
  
  // Update enrollment status in database
  const { error } = await supabase
    .from("partner_lms_enrollments")
    .update({
      status: "active",
      metadata: {
        webhook_received_at: new Date().toISOString(),
        external_data: data,
      },
    })
    .eq("external_enrollment_id", data.enrollmentId);

  if (error) {
    console.error("[Webhook] Failed to update enrollment:", error);
  }
}

async function handleProgressUpdated(
  partner: PartnerType,
  data: any
): Promise<void> {

  // Update progress in database
  const { error } = await supabase
    .from("partner_lms_enrollments")
    .update({
      progress_percentage: data.percentage || data.progress || 0,
      metadata: {
        last_synced_at: new Date().toISOString(),
        lessons_completed: data.lessonsCompleted,
        total_lessons: data.totalLessons,
      },
    })
    .eq("external_enrollment_id", data.enrollmentId);

  if (error) {
    console.error("[Webhook] Failed to update progress:", error);
  }
}

async function handleCourseCompleted(
  partner: PartnerType,
  data: any
): Promise<void> {

  // Update enrollment to completed
  const { error } = await supabase
    .from("partner_lms_enrollments")
    .update({
      status: "completed",
      progress_percentage: 100,
      completed_at: data.completedAt || new Date().toISOString(),
      metadata: {
        completion_webhook_received_at: new Date().toISOString(),
      },
    })
    .eq("external_enrollment_id", data.enrollmentId);

  if (error) {
    console.error("[Webhook] Failed to update completion:", error);
    return;
  }

  // Trigger completion email
  await supabase.functions.invoke("send-partner-completion-email", {
    body: {
      enrollmentId: data.enrollmentId,
      partner,
    },
  });
}

async function handleCertificateIssued(
  partner: PartnerType,
  data: any
): Promise<void> {

  // Update enrollment with certificate data
  const { error } = await supabase
    .from("partner_lms_enrollments")
    .update({
      metadata: {
        certificate_id: data.certificateId,
        certificate_number: data.certificateNumber,
        certificate_url: data.downloadUrl,
        certificate_issued_at: data.issuedDate || new Date().toISOString(),
      },
    })
    .eq("external_enrollment_id", data.enrollmentId);

  if (error) {
    console.error("[Webhook] Failed to update certificate:", error);
  }
}

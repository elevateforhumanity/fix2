import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logger } from '@/lib/logger';
import { completeEnrollment } from '@/lib/enrollment/complete-enrollment';

interface EnrollRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  programCode?: string;
  courseId?: string;
  fundingInterest?: string;
  referralSource?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  let body: EnrollRequestBody;
  try {
    body = (await req.json()) as EnrollRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, programCode, courseId, fundingInterest, referralSource, notes } =
    body;

  // If user is authenticated and enrolling in a course
  if (user && courseId) {
    try {
      const result = await completeEnrollment({
        userId: user.id,
        courseId,
        programId: programCode,
        paymentStatus: 'pending',
      });

      if (!result.success) {
        return NextResponse.json(
          { ok: false, error: result.error },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          ok: true,
          enrollmentId: result.enrollmentId,
          courseAccessUrl: result.courseAccessUrl,
          message: "Successfully enrolled! You can now access the course.",
        },
        { status: 201 },
      );
    } catch (err: unknown) {
      logger.error("Enrollment error", err);
      return NextResponse.json(
        { ok: false, error: "Failed to complete enrollment" },
        { status: 500 },
      );
    }
  }

  // Otherwise, create application (for non-authenticated users)
  if (!firstName || !lastName || !email || !programCode) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing required fields: firstName, lastName, email, programCode.",
      },
      { status: 400 },
    );
  }

  try {
    // Insert into applications table
    const { data: application, error: appError } = await supabase
      .from("applications")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        phone: phone ?? null,
        program_id: programCode,
        heard_about_us: referralSource ?? null,
        status: "submitted",
      })
      .select("id")
      .single();

    if (appError) {
      logger.error("Application insert error", appError);
      throw appError;
    }

    return NextResponse.json(
      {
        ok: true,
        applicationId: application?.id,
        message:
          "Application submitted! Elevate staff will follow up to finalize funding and start date.",
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    logger.error("Enrollment API error", err?.message ?? err);
    return NextResponse.json(
      {
        ok: false,
        error:
          err?.message ??
          "Unexpected error while creating application. Check server logs.",
      },
      { status: 500 },
    );
  }
}

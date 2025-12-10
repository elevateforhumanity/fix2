import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logger } from '@/lib/logger';

interface EnrollRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  programCode: string;
  fundingInterest?: string;
  referralSource?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  let body: EnrollRequestBody;
  try {
    body = (await req.json()) as EnrollRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, programCode, fundingInterest, referralSource, notes } =
    body;

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

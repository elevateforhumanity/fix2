import { NextResponse } from "next/server";
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const required = ["firstName", "lastName", "email", "preferredProgramId"];
    const missing = required.filter((key) => !body[key]);

    if (missing.length) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // 🔴 PLACEHOLDER STORAGE LOGIC
    // Right now, we just log the application server-side
    // and pretend it is stored. You (or a dev) can later:
    // - Write it to Supabase
    // - Send an email to your team
    // - Push into a CRM or Airtable, etc.

    logger.info("[New Elevate Application]", {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      preferredProgramId: body.preferredProgramId,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message:
          "Application received. A member of the Elevate team will follow up.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    logger.error("[Enroll Apply] Error:", err);
    return NextResponse.json(
      { message: "Something went wrong submitting your application." },
      { status: 500 }
    );
  }
}

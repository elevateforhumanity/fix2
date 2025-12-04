import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    // Save application to database
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("applications")
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone || null,
        program_id: body.preferredProgramId,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("[Enroll Apply] Database error:", error);
      return NextResponse.json(
        { message: "Failed to submit application. Please try again." },
        { status: 500 }
      );
    }

    console.log("[New Elevate Application] Saved:", data.id);

    return NextResponse.json(
      {
        message:
          "Application received. A member of the Elevate team will follow up.",
        applicationId: data.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Enroll Apply] Error:", err);
    return NextResponse.json(
      { message: "Something went wrong submitting your application." },
      { status: 500 }
    );
  }
}

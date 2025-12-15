import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { provider, course_name } = await req.json();

    if (!provider) {
      return NextResponse.json(
        { error: "Provider is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update credential status
    const { error } = await supabase
      .from("external_credentials")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("student_id", user.id)
      .eq("provider", provider);

    if (error) {
      // Error: $1
      return NextResponse.json(
        { error: "Failed to mark credential complete" },
        { status: 500 }
      );
    }

    // Update exam readiness if Milady RISE
    if (provider === "Milady RISE") {
      await supabase
        .from("exam_readiness")
        .upsert({
          student_id: user.id,
          theory_complete: true,
        });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Error: $1
    return NextResponse.json(
      { error: error.message || "Failed to mark credential complete" },
      { status: 500 }
    );
  }
}

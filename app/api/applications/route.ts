import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateRequest, applicationSchema } from "@/lib/validateRequest";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Validate input with Zod schema
    const { data: validatedData, error: validationError } = await validateRequest(
      req,
      applicationSchema
    );

    if (validationError) {
      return validationError;
    }

    const { full_name, email, phone, program_interest, referral_source } = validatedData!;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          full_name,
          email,
          phone,
          program_interest,
          referral_source,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Could not save application." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, application: data });
  } catch (err) {
    console.error("Application error:", err);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}

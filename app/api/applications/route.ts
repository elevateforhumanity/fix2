import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Supabase client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 500 }
    );
  }

  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    programId,
    preferredStart,
    heardAboutUs,
    youth,
    reentry,
    interestedInJri,
    interestedInWex,
    interestedInOjt,
    needsSupport,
  } = body || {};

  if (!firstName || !lastName || !email || !programId) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("applications").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    program_id: programId,
    preferred_start: preferredStart || null,
    heard_about_us: heardAboutUs || null,
    youth: !!youth,
    reentry: !!reentry,
    interested_in_jri: !!interestedInJri,
    interested_in_wex: !!interestedInWex,
    interested_in_ojt: !!interestedInOjt,
    needs_support: Array.isArray(needsSupport) ? needsSupport : [],
    status: "submitted",
  });

  if (error) {
    console.error("[Applications] Insert error:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from '@/lib/logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = supabaseUrl && serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, role, interest, followup } = body;

    if (!name && !email && !phone) {
      return NextResponse.json(
        { ok: false, message: "Missing basic contact info." },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { ok: false, message: "Database not configured" },
        { status: 503 }
      );
    }

    const { error } = await supabaseAdmin.from("contact_requests").insert({
      name,
      email,
      phone,
      role,
      interest,
      followup,
      source: "efh-website",
    });

    if (error) {
      logger.error("Error inserting contact request:", error);
      return NextResponse.json(
        { ok: false, message: "Could not save your request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

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
      console.error("Error inserting contact request:", error);
      return NextResponse.json(
        { ok: false, message: "Could not save your request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

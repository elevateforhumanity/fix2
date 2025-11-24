// app/api/admin/programs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClients";

// TODO: add real admin auth guard (check auth + role)
// For now this assumes only admins can hit this route.

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("programs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading programs:", error);
    return NextResponse.json({ error: "Failed to load programs" }, { status: 500 });
  }

  return NextResponse.json({ programs: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { id, ...payload } = body;

    if (!payload.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // auto-generate slug if missing
    if (!payload.slug && payload.title) {
      payload.slug = payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    let result;
    if (id) {
      result = await supabaseAdmin
        .from("programs")
        .update(payload)
        .eq("id", id)
        .select("*")
        .maybeSingle();
    } else {
      result = await supabaseAdmin
        .from("programs")
        .insert(payload)
        .select("*")
        .maybeSingle();
    }

    const { data, error } = result;

    if (error || !data) {
      console.error("Program save error:", error);
      return NextResponse.json({ error: "Failed to save program" }, { status: 500 });
    }

    return NextResponse.json({ program: data });
  } catch (err) {
    console.error("Program save error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

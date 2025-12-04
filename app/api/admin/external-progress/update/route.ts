// app/api/admin/external-progress/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Status = "approved" | "in_progress";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body as { id: string; status: Status };

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    if (status !== "approved" && status !== "in_progress") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Build update object based on status
    let updateData;
    
    if (status === "approved") {
      updateData = {
        status,
        approved_at: new Date().toISOString()
      };
    } else {
      // status === "in_progress"
      updateData = {
        status,
        proof_file_url: null,
        approved_at: null,
        approved_by: null
      };
    }

    const { error } = await supabaseAdmin
      .from("external_partner_progress")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Error updating external progress", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}

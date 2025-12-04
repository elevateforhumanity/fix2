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

    // Update the status
    const updates: any = { status };

    // If approving, set approved_at timestamp
    if (status === "approved") {
      updates.approved_at = new Date().toISOString();
    }

    // If resetting to in_progress, clear proof and approved_at
    if (status === "in_progress") {
      updates.proof_file_url = null;
      updates.approved_at = null;
      updates.approved_by = null;
    }

    const { error } = await supabaseAdmin
      .from("external_partner_progress")
      .update(updates)
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

// app/api/admin/external-progress/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  type Status = "approved" | "in_progress";
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
    if (status === "approved") {
      const { error } = await (supabaseAdmin
        .from("external_partner_progress") as any)
        .update({
          status,
          approved_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating external progress", error);
        return NextResponse.json(
          { error: "Failed to update status" },
          { status: 500 }
        );
      }
    } else {
      // status === "in_progress"
      const { error } = await (supabaseAdmin
        .from("external_partner_progress") as any)
        .update({
          status,
          proof_file_url: null,
          approved_at: null,
          approved_by: null
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating external progress", error);
        return NextResponse.json(
          { error: "Failed to update status" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}

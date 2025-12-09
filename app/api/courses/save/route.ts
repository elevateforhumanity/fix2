import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, metadata, slug, title } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing course id" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const updateData: any = {};
    if (metadata) updateData.metadata = metadata;
    if (slug) updateData.slug = slug;
    if (title) updateData.title = title;

    const { data, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      logger.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, course: data });
  } catch (error: any) {
    logger.error("Save course error:", error);
    return NextResponse.json(
      { error: "Failed to save course", message: error.message },
      { status: 500 }
    );
  }
}

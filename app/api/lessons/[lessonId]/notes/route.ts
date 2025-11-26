import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;

  const { data, error } = await supabase
    .from("lesson_notes")
    .select("id, position_seconds, body, created_at")
    .eq("lesson_id", lessonId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("notes GET error", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ notes: data || [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await params;
  const body = await req.json();
  const { text, body: noteBody, positionSeconds } = body;

  const noteText = text || noteBody;

  if (!noteText || !noteText.trim()) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }

  const { error } = await supabase.from("lesson_notes").insert({
    user_id: user.id,
    lesson_id: lessonId,
    body: noteText,
    position_seconds:
      typeof positionSeconds === "number" ? Math.floor(positionSeconds) : null,
  });

  if (error) {
    console.error("notes POST error", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

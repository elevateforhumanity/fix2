import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const {
      lessonId,
      courseId,
      duration,
      watchedSeconds,
      completed,
    }: {
      lessonId?: string | number;
      courseId?: string | number;
      duration?: number;
      watchedSeconds?: number;
      completed?: boolean;
    } = body || {};

    if (!lessonId) {
      return NextResponse.json(
        { error: "Missing lessonId" },
        { status: 400 }
      );
    }

    // Normalize to numbers
    const lesson_id = typeof lessonId === "string" ? parseInt(lessonId) : lessonId;
    const course_id = courseId 
      ? (typeof courseId === "string" ? parseInt(courseId) : courseId)
      : null;

    // Upsert progress
    const { error: upsertError } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          student_id: user.id,
          course_id,
          lesson_id,
          duration_seconds: duration ? Math.round(duration) : null,
          watched_seconds: watchedSeconds ? Math.round(watchedSeconds) : null,
          completed: !!completed,
          last_watched_at: new Date().toISOString(),
        },
        {
          onConflict: "student_id,lesson_id",
        }
      );

    if (upsertError) {
      console.error("Error upserting lesson_progress:", upsertError);
      return NextResponse.json(
        { error: "Failed to save progress" },
        { status: 500 }
      );
    }

    console.log("📹 Video progress saved:", {
      userId: user.id,
      lessonId: lesson_id,
      courseId: course_id,
      completed,
      percentWatched: duration && watchedSeconds 
        ? Math.round((watchedSeconds / duration) * 100) 
        : 0,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in /api/progress:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}

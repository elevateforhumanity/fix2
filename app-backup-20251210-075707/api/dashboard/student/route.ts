import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Enrollments
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, course_id, created_at")
    .eq("user_id", user.id);

  const activeEnrollments = enrollments?.length || 0;

  // Certificates
  const { data: certificates } = await supabase
    .from("certificates")
    .select("id")
    .eq("user_id", user.id);

  const certificatesCount = certificates?.length || 0;

  // Available published courses
  const { data: courses } = await supabase
    .from("courses")
    .select("id")
    .eq("status", "published");

  const availableCourses = courses?.length || 0;

  // Simple overall progress: percent of enrolled courses with at least one completed lesson
  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  let overallProgress = 0;

  if (activeEnrollments > 0 && progressRows && progressRows.length > 0) {
    // Get all lessons for enrolled courses
    const enrolledCourseIds = enrollments?.map((e) => e.course_id) || [];
    
    const { data: modules } = await supabase
      .from("modules")
      .select("id, course_id")
      .in("course_id", enrolledCourseIds);

    const moduleIds = modules?.map((m) => m.id) || [];

    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, module_id")
      .in("module_id", moduleIds);

    // Map lessons to courses
    const lessonToCourse = new Map<string, string>();
    lessons?.forEach((lesson) => {
      const module = modules?.find((m) => m.id === lesson.module_id);
      if (module) {
        lessonToCourse.set(lesson.id, module.course_id);
      }
    });

    // Calculate progress per course
    const byCourse = new Map<string, { total: number; done: number }>();

    progressRows.forEach((row) => {
      const courseId = lessonToCourse.get(row.lesson_id);
      if (!courseId) return;

      const bucket = byCourse.get(courseId) || { total: 0, done: 0 };
      bucket.total += 1;
      if (row.completed) bucket.done += 1;
      byCourse.set(courseId, bucket);
    });

    const percents: number[] = [];
    byCourse.forEach((value) => {
      if (value.total > 0) {
        percents.push((value.done / value.total) * 100);
      }
    });

    if (percents.length > 0) {
      overallProgress = Math.round(
        percents.reduce((a, b) => a + b, 0) / percents.length
      );
    }
  }

  return NextResponse.json({
    activeEnrollments,
    overallProgress,
    certificatesCount,
    availableCourses,
  });
}

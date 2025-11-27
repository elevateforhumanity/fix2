import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "../../../../lib/supabaseServer";
import { CoursePlayer, LessonViewModel } from "../../../../components/CoursePlayer";

interface PageProps {
  params: { courseId: string };
}

export const metadata = {
  title: "Course Player | Elevate LMS",
};

export default async function CoursePage({ params }: PageProps) {
  const supabase = getSupabaseServerClient();

  // CourseId here matches programs.id for now; later you can separate course vs program.
  const { data: program, error: programError } = await supabase
    .from("programs")
    .select("id, name, code")
    .eq("id", params.courseId)
    .maybeSingle();

  if (programError || !program) {
    return notFound();
  }

  const { data: modules } = await supabase
    .from("course_modules")
    .select("id, title, order_index")
    .eq("program_id", program.id)
    .order("order_index", { ascending: true });

  const { data: lessons } = await supabase
    .from("course_lessons")
    .select(
      "id, title, content_type, content_url, duration_minutes, module_id, order_index",
    )
    .in(
      "module_id",
      (modules ?? []).map((m) => m.id),
    )
    .order("order_index", { ascending: true });

  const lessonVM: LessonViewModel[] =
    lessons?.map((l) => ({
      id: l.id,
      title: l.title,
      contentType: l.content_type,
      contentUrl: l.content_url,
      durationMinutes: l.duration_minutes,
    })) ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Course
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            {program.name ?? "Course"}
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Code: {program.code ?? program.id}
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            Lessons and modules are pulled live from Supabase. As you add more
            modules and lessons, they will appear here automatically.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 text-[11px]">
          <CoursePlayer courseTitle={program.name ?? "Course"} lessons={lessonVM} />
        </div>
      </section>
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function InstructorDashboardPage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  // Courses this user teaches
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, slug, status, duration_hours")
    .eq("instructor_id", user.id)
    .order("title");

  // Simple counts
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, course_id")
    .in(
      "course_id",
      (courses || []).map((c) => c.id)
    );

  const studentsPerCourse = new Map<string, number>();
  enrollments?.forEach((e) => {
    studentsPerCourse.set(
      e.course_id,
      (studentsPerCourse.get(e.course_id) || 0) + 1
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Instructor Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Manage your courses, track student progress, and post announcements.
          </p>
        </div>

        <Link
          href="/lms/courses/new"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
        >
          + Create New Course
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Active Courses" value={courses?.length || 0} />
        <StatCard label="Total Enrollments" value={enrollments?.length || 0} />
        <StatCard 
          label="Average Duration" 
          value={Math.round(((courses || []).reduce((a, c) => a + (c.duration_hours || 0), 0) / Math.max((courses || []).length, 1)) || 0)} 
          unit="hrs" 
        />
      </div>

      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">Your Courses</h2>
        {!courses || !courses.length ? (
          <div className="rounded-xl border border-dashed bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600 mb-4">
              You don&apos;t have any courses yet. Start by creating one.
            </p>
            <Link
              href="/lms/courses/new"
              className="inline-flex rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/instructor/courses/${course.slug}`}
                className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {course.title}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600">
                    {course.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Students: {studentsPerCourse.get(course.id) || 0}
                  </span>
                  <span>{course.duration_hours || 0} hours</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <Link
                    href={`/instructor/courses/${course.slug}/students`}
                    className="rounded-full border px-3 py-1 hover:bg-slate-50 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View students
                  </Link>
                  <Link
                    href={`/instructor/courses/${course.slug}/analytics`}
                    className="rounded-full border px-3 py-1 hover:bg-slate-50 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Analytics
                  </Link>
                  <Link
                    href={`/instructor/courses/${course.slug}/announcements`}
                    className="rounded-full border px-3 py-1 hover:bg-slate-50 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Announcements
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">
        {value}
        {unit && <span className="ml-1 text-sm text-slate-500">{unit}</span>}
      </p>
    </div>
  );
}

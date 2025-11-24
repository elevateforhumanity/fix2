import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  instructor_id: string | null;
};

type EnrollmentRow = {
  id: string;
  user_id: string;
  created_at: string;
};

type ProfileRow = {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
};

type ProgressRow = {
  user_id: string;
  lesson_id: string;
  completed: boolean;
};

export default async function InstructorCourseAnalyticsPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const { slug } = params;

  // 1) Get course by slug, make sure this instructor owns it
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single<CourseRow>();

  if (courseError || !course) {
    console.error(courseError);
    notFound();
  }

  if (course.instructor_id && course.instructor_id !== user.id) {
    // prevent other instructors from seeing analytics
    redirect("/instructor/dashboard");
  }

  // 2) Get enrollments
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, user_id, created_at")
    .eq("course_id", course.id);

  const enrollmentList: EnrollmentRow[] = enrollments || [];

  // 3) Get user profiles for enrolled students
  const userIds = enrollmentList.map((e) => e.user_id);
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id, first_name, last_name")
    .in("user_id", userIds);

  const profileMap = new Map<string, ProfileRow>();
  profiles?.forEach((p) => {
    profileMap.set(p.user_id, p);
  });

  // 4) Get all lessons for this course
  const { data: modules } = await supabase
    .from("modules")
    .select("id")
    .eq("course_id", course.id);

  const moduleIds = modules?.map((m) => m.id) || [];

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id")
    .in("module_id", moduleIds);

  const lessonIds = lessons?.map((l) => l.id) || [];
  const totalLessons = lessonIds.length;

  // 5) Get lesson progress for all enrolled students
  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("user_id, lesson_id, completed")
    .in("user_id", userIds)
    .in("lesson_id", lessonIds);

  const progressList: ProgressRow[] = progressRows || [];

  // Group by user: calculate % complete
  const studentStats = calculateStudentProgress(
    enrollmentList,
    profileMap,
    progressList,
    totalLessons
  );

  const totalEnrollments = studentStats.length;
  const avgProgress =
    totalEnrollments > 0
      ? Math.round(
          studentStats.reduce((a, s) => a + s.progressPercent, 0) /
            totalEnrollments
        )
      : 0;

  const completedCount = studentStats.filter(
    (s) => s.progressPercent >= 99
  ).length;

  const completionRate =
    totalEnrollments > 0
      ? Math.round((completedCount / totalEnrollments) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <nav className="mb-2 text-xs text-slate-500">
            <Link href="/instructor/dashboard" className="hover:underline">
              Dashboard
            </Link>{" "}
            /{" "}
            <Link
              href={`/instructor/courses/${slug}`}
              className="hover:underline"
            >
              {course.title}
            </Link>{" "}
            / <span className="text-slate-700">Analytics</span>
          </nav>
          <h1 className="text-2xl font-bold">Course Analytics</h1>
          <p className="text-sm text-slate-600">{course.title}</p>
        </div>
      </header>

      {/* Top stats */}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard label="Total enrollments" value={totalEnrollments} />
        <StatCard label="Average progress" value={avgProgress} unit="%" />
        <StatCard label="Completed learners" value={completedCount} />
        <StatCard label="Completion rate" value={completionRate} unit="%" />
      </div>

      {/* Students table */}
      <section className="mt-8 rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">Student progress</h2>
        {studentStats.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">
            No enrollments yet for this course.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Student
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Enrolled
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Progress
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentStats.map((s) => (
                  <tr
                    key={s.userId}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-2">{s.fullName || "Student"}</td>
                    <td className="px-3 py-2 text-slate-600">
                      {new Date(s.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-red-500 transition-all"
                            style={{ width: `${s.progressPercent}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-[11px] text-slate-700">
                          {s.progressPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-slate-700">
                      {s.progressPercent >= 99 ? (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-red-700">
                          Completed
                        </span>
                      ) : s.progressPercent >= 1 ? (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
                          In progress
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                          Not started
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Additional insights */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Engagement insights</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Students not started:</span>
              <span className="font-semibold">
                {studentStats.filter((s) => s.progressPercent === 0).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Students in progress:</span>
              <span className="font-semibold">
                {
                  studentStats.filter(
                    (s) => s.progressPercent > 0 && s.progressPercent < 99
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Students completed:</span>
              <span className="font-semibold text-red-600">
                {completedCount}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Course details</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Total modules:</span>
              <span className="font-semibold">{modules?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total lessons:</span>
              <span className="font-semibold">{totalLessons}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Avg. lessons per student:</span>
              <span className="font-semibold">
                {totalEnrollments > 0
                  ? Math.round(
                      progressList.filter((p) => p.completed).length /
                        totalEnrollments
                    )
                  : 0}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type StudentStat = {
  userId: string;
  fullName: string | null;
  enrolledAt: string;
  progressPercent: number;
};

function calculateStudentProgress(
  enrollments: EnrollmentRow[],
  profileMap: Map<string, ProfileRow>,
  progressRows: ProgressRow[],
  totalLessons: number
): StudentStat[] {
  if (!enrollments.length) return [];

  // group progress by user
  const byUser = new Map<string, { total: number; done: number }>();

  for (const p of progressRows) {
    const bucket = byUser.get(p.user_id) || { total: 0, done: 0 };
    bucket.total += 1;
    if (p.completed) bucket.done += 1;
    byUser.set(p.user_id, bucket);
  }

  const stats: StudentStat[] = enrollments.map((en) => {
    const bucket = byUser.get(en.user_id);
    let pct = 0;
    if (bucket && totalLessons > 0) {
      pct = Math.round((bucket.done / totalLessons) * 100);
    }

    const profile = profileMap.get(en.user_id);
    const fullName = profile
      ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
      : null;

    return {
      userId: en.user_id,
      fullName: fullName || null,
      enrolledAt: en.created_at,
      progressPercent: pct,
    };
  });

  // sort: highest progress first
  stats.sort((a, b) => b.progressPercent - a.progressPercent);
  return stats;
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

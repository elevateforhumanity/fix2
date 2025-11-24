import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { StudentStreakWidget } from "@/components/dashboard/StudentStreakWidget";
import { StudentAchievementsWidget } from "@/components/dashboard/StudentAchievementsWidget";

type EnrollmentRow = {
  id: string;
  course_id: string;
  started_at: string | null;
  created_at: string | null;
  courses: {
    id: string;
    title: string;
    slug: string;
    thumbnail_url: string | null;
  } | null;
};

export const metadata = {
  title: "Student Dashboard | Elevate For Humanity",
  description: "Your learning dashboard",
};

export default async function StudentPortalDashboardPage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // --- BASIC STATS ---
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      course_id,
      started_at,
      created_at,
      courses (
        id,
        title,
        slug,
        thumbnail_url
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activeEnrollments: EnrollmentRow[] = enrollments || [];

  const { data: certificates } = await supabase
    .from("certificates")
    .select("id")
    .eq("user_id", user.id);

  const { data: courses } = await supabase
    .from("courses")
    .select("id")
    .eq("status", "published");

  const activeEnrollmentsCount = activeEnrollments.length;
  const certificatesCount = certificates?.length || 0;
  const availableCoursesCount = courses?.length || 0;

  // --- PROGRESS / LESSONS MAPPING ---
  const enrolledCourseIds = activeEnrollments.map((e) => e.course_id);

  let lessonToCourse = new Map<string, string>();
  let progressRows: { lesson_id: string; completed: boolean; updated_at: string }[] =
    [];

  if (enrolledCourseIds.length > 0) {
    const { data: modules } = await supabase
      .from("modules")
      .select("id, course_id")
      .in("course_id", enrolledCourseIds);

    const moduleIds = modules?.map((m) => m.id) || [];

    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, module_id")
      .in("module_id", moduleIds);

    lessonToCourse = new Map();
    lessons?.forEach((lesson) => {
      const mod = modules?.find((m) => m.id === lesson.module_id);
      if (mod) {
        lessonToCourse.set(lesson.id, mod.course_id);
      }
    });

    const { data: lp } = await supabase
      .from("lesson_progress")
      .select("lesson_id, completed, updated_at")
      .eq("user_id", user.id);

    progressRows = (lp || []) as any;
  }

  const { overallProgress, progressByCourse } = computeProgress(
    activeEnrollments,
    progressRows,
    lessonToCourse
  );

  // --- UPCOMING DEADLINES (ASSIGNMENTS) ---
  const { data: assignments } = await supabase
    .from("assignments")
    .select(
      `
      id,
      title,
      due_at,
      course_id
    `
    )
    .in("course_id", enrolledCourseIds)
    .order("due_at", { ascending: true })
    .limit(5);

  // --- NOTIFICATIONS ---
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // --- GOALS & STREAKS ---
  const { data: learningGoal } = await supabase
    .from("learning_goals")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: streakRow } = await supabase
    .from("daily_streaks")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // --- ACHIEVEMENTS ---
  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false })
    .limit(6);

  // --- ACTIVITY FEED (recent lesson completions & certificates) ---
  const activity: ActivityItem[] = buildActivityFeed(
    progressRows,
    certificates || []
  );

  // --- SIMPLE RECOMMENDATIONS (just "other courses you're not in yet") ---
  const { data: recommended } = await supabase
    .from("courses")
    .select("id, title, slug, thumbnail_url")
    .eq("status", "published")
    .not("id", "in", `(${enrolledCourseIds.join(",") || "NULL"})`)
    .limit(4);

  const userName = user.email?.split("@")[0] || "Student";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-slate-600">
            Continue your programs, track your progress, and stay on top of
            deadlines and goals.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/lms/courses"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600"
          >
            Browse Programs
          </Link>
          <Link
            href="/support"
            className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
          >
            Need help?
          </Link>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active enrollments" value={activeEnrollmentsCount} />
        <StatCard
          label="Average progress"
          value={Math.round(overallProgress)}
          unit="%"
        />
        <StatCard label="Certificates earned" value={certificatesCount} />
        <StatCard
          label="Daily goal"
          value={learningGoal?.daily_minutes || 20}
          unit="min"
        />
      </div>

      {/* GOALS + STREAK + BADGES */}
      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <StudentStreakWidget />
        <StudentAchievementsWidget />
      </div>

      {/* MAIN GRID: CONTINUE LEARNING + SIDEBAR */}
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* CONTINUE LEARNING */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Continue learning</h2>
          {activeEnrollments.length === 0 ? (
            <EmptyState
              message="You're not enrolled in any courses yet."
              action={
                <Link
                  href="/lms/courses"
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Browse all courses
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeEnrollments.slice(0, 4).map((enrollment) => {
                const course = enrollment.courses;
                if (!course) return null;

                const pct = progressByCourse.get(enrollment.course_id) || 0;

                return (
                  <Link
                    key={enrollment.id}
                    href={`/lms/courses/${course.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative h-32 w-full bg-slate-100">
                      {course.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          No thumbnail
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <h3 className="line-clamp-2 text-sm font-semibold">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{pct}% complete</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                          In progress
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="mt-1 text-xs font-medium text-blue-600 group-hover:underline">
                        Continue course →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {recommended && recommended.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold">Recommended for you</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommended.map((c) => (
                  <Link
                    key={c.id}
                    href={`/lms/courses/${c.slug}`}
                    className="flex items-center gap-3 rounded-xl border bg-white p-3 text-sm hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-lg bg-slate-100">
                      {c.thumbnail_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.thumbnail_url}
                          alt={c.title}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      )}
                    </div>
                    <span className="line-clamp-2">{c.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SIDEBAR: DEADLINES + NOTIFICATIONS + ACTIVITY */}
        <aside className="space-y-4">
          {/* Upcoming deadlines */}
          <section className="space-y-2 rounded-xl border bg-white p-3">
            <h2 className="text-sm font-semibold">Upcoming deadlines</h2>
            {assignments && assignments.length ? (
              <ul className="mt-1 space-y-2 text-xs">
                {assignments.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-col rounded-lg bg-slate-50 p-2"
                  >
                    <span className="font-medium">{a.title}</span>
                    <span className="text-slate-500">
                      {formatDate(a.due_at)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                No upcoming deadlines. Stay ready for your next assignment.
              </p>
            )}
          </section>

          {/* Notifications */}
          <section className="space-y-2 rounded-xl border bg-white p-3">
            <h2 className="text-sm font-semibold">Notifications</h2>
            {notifications && notifications.length ? (
              <ul className="mt-1 space-y-1.5 text-xs">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`rounded-lg p-2 ${
                      n.read ? "bg-slate-50" : "bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{n.title}</span>
                      {!n.read && (
                        <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                          New
                        </span>
                      )}
                    </div>
                    {n.body && (
                      <p className="text-[11px] text-slate-600">
                        {n.body}
                      </p>
                    )}
                    {n.url && (
                      <Link
                        href={n.url}
                        className="mt-1 inline-block text-[11px] font-semibold text-blue-600 hover:underline"
                      >
                        View →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                You're all caught up. New course announcements and
                deadlines will appear here.
              </p>
            )}
          </section>

          {/* Activity Feed */}
          <section className="space-y-2 rounded-xl border bg-white p-3">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            {activity.length ? (
              <ul className="mt-1 space-y-1.5 text-xs">
                {activity.slice(0, 5).map((item, idx) => (
                  <li key={idx} className="flex flex-col rounded-lg p-1.5">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-[11px] text-slate-500">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                Start watching lessons to see your recent learning activity.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Helpers & Small Components ---------- */

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
        {unit && (
          <span className="ml-1 text-sm text-slate-500">{unit}</span>
        )}
      </p>
    </div>
  );
}





function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed bg-slate-50 p-4 text-sm text-slate-600">
      <span>{message}</span>
      {action}
    </div>
  );
}

type ActivityItem = {
  title: string;
  description: string;
};

function buildActivityFeed(
  progressRows: { lesson_id: string; completed: boolean; updated_at: string }[],
  certificates: { id: string }[]
): ActivityItem[] {
  const items: ActivityItem[] = [];

  progressRows
    .filter((p) => p.completed)
    .slice(0, 5)
    .forEach((p) => {
      items.push({
        title: "Lesson completed",
        description: `Completed a lesson on ${formatDate(p.updated_at)}`,
      });
    });

  certificates.slice(0, 3).forEach((c) => {
    items.push({
      title: "Certificate earned",
      description: `You earned a certificate (${c.id}).`,
    });
  });

  return items;
}

function computeProgress(
  enrollments: EnrollmentRow[],
  progressRows: { lesson_id: string; completed: boolean }[],
  lessonToCourse: Map<string, string>
): {
  overallProgress: number;
  progressByCourse: Map<string, number>;
} {
  const progressByCourse = new Map<string, { total: number; done: number }>();

  progressRows.forEach((row) => {
    const courseId = lessonToCourse.get(row.lesson_id);
    if (!courseId) return;
    const bucket = progressByCourse.get(courseId) || {
      total: 0,
      done: 0,
    };
    bucket.total += 1;
    if (row.completed) bucket.done += 1;
    progressByCourse.set(courseId, bucket);
  });

  const percentageByCourse = new Map<string, number>();
  progressByCourse.forEach((val, courseId) => {
    if (val.total > 0) {
      percentageByCourse.set(
        courseId,
        Math.round((val.done / val.total) * 100)
      );
    } else {
      percentageByCourse.set(courseId, 0);
    }
  });

  let overall = 0;
  if (enrollments.length) {
    const percents = enrollments.map((e) => percentageByCourse.get(e.course_id) || 0);
    if (percents.length) {
      overall =
        percents.reduce((a, b) => a + b, 0) / percents.length;
    }
  }

  return { overallProgress: overall, progressByCourse: percentageByCourse };
}

function formatDate(raw: string | null): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

// app/lms/dashboard/page.tsx
import Link from 'next/link';
import { Suspense } from 'react';

type CourseSummary = {
  id: string;
  title: string;
  program_code: string | null;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  next_due_at: string | null;
};

async function getStudentDashboardData(): Promise<{
  firstName: string;
  activeCourses: CourseSummary[];
  completedCount: number;
  upcomingDueCount: number;
}> {
  // Server-side fetching via internal API or direct Supabase call
  // Here we call an internal API route you already have wired to Supabase.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/lms/dashboard`, {
    cache: 'no-store',
    credentials: 'include'
  });

  if (!res.ok) {
    return {
      firstName: 'Student',
      activeCourses: [],
      completedCount: 0,
      upcomingDueCount: 0
    };
  }

  return res.json();
}

function statusLabel(status: CourseSummary['status']) {
  if (status === 'completed') return 'Completed';
  if (status === 'in_progress') return 'In Progress';
  return 'Not Started';
}

export default async function StudentDashboardPage() {
  const data = await getStudentDashboardData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
              Elevate for Humanity · Student Portal
            </p>
            <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
              Welcome back, <span className="text-sky-300">{data.firstName}</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Your training, case management, and certificates live in one place. Stay on track with
              your{' '}
              <span className="font-semibold text-sky-300">
                workforce, WRG, and apprenticeship programs
              </span>{' '}
              through Elevate Connects Directory.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/programs"
              className="rounded-2xl border border-sky-500/60 px-4 py-2 text-sm font-medium text-sky-100 shadow-sm transition hover:border-sky-300 hover:bg-sky-900/40"
            >
              Browse Programs
            </Link>
            <Link
              href="/support/case-manager"
              className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-700/40 transition hover:bg-sky-400"
            >
              Message My Case Manager
            </Link>
          </div>
        </header>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Active Courses
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {data.activeCourses.length}
              <span className="ml-2 text-xs font-normal text-slate-400">in progress</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              HVAC, Barber Apprenticeship, Medical Assistant and more.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Completed Pathways
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {data.completedCount}
              <span className="ml-2 text-xs font-normal text-slate-400">certified</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Certificates sync with Elevate's verification portal for employers.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Upcoming Deadlines
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {data.upcomingDueCount}
              <span className="ml-2 text-xs font-normal text-slate-400">this week</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Assignments and milestones aligned with your IEP and workforce plan.
            </p>
          </div>
        </section>

        {/* Active courses */}
        <section className="mt-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-50">Your active courses</h2>
            <Link
              href="/lms/courses"
              className="text-xs font-medium text-sky-300 hover:text-sky-200"
            >
              View all courses →
            </Link>
          </div>

          {data.activeCourses.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              You are not enrolled in any courses yet. Visit the{' '}
              <Link href="/programs" className="text-sky-300 underline underline-offset-2">
                programs catalog
              </Link>{' '}
              or contact your case manager to get started.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.activeCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/lms/courses/${course.id}`}
                  className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:border-sky-500/70 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-sky-400">
                        {course.program_code
                          ? course.program_code.toUpperCase()
                          : 'ELEVATE PROGRAM'}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-slate-50 line-clamp-2">
                        {course.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                      {statusLabel(course.status)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Progress</span>
                      <span>{Math.round(course.progress)}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-sky-500 transition-all group-hover:bg-sky-400"
                        style={{ width: `${Math.max(4, course.progress)}%` }}
                      />
                    </div>
                    {course.next_due_at && (
                      <p className="mt-2 text-[11px] text-slate-400">
                        Next assignment due:{' '}
                        <span className="font-medium text-sky-300">
                          {new Date(course.next_due_at).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Certificates & compliance */}
        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50">Certificates & badges</h2>
            <p className="mt-2 text-xs text-slate-400">
              Once you finish a course, Elevate automatically unlocks your{' '}
              <span className="font-semibold text-sky-300">digital certificate</span> and routes it
              to case managers and employer partners through the Elevate Connects Directory.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-sky-200">
                Workforce Ready
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-sky-200">
                Apprenticeship Ready
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-sky-200">
                Industry Credential
              </span>
            </div>
            <Link
              href="/lms/certificates"
              className="mt-3 inline-flex text-xs font-medium text-sky-300 hover:text-sky-200"
            >
              View my certificates →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50">Support & case management</h2>
            <p className="mt-2 text-xs text-slate-400">
              Elevate wraps your training in real supports: transportation, childcare, tools,
              uniforms, and more — depending on your funding source (WRG, WIOA, JRI, employer
              sponsorship).
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-300">
              <li>• View and sign your Individual Employment Plan (IEP).</li>
              <li>• Track case manager notes and next steps.</li>
              <li>• Upload required paperwork securely.</li>
            </ul>
            <Link
              href="/wioa/case"
              className="mt-3 inline-flex text-xs font-medium text-sky-300 hover:text-sky-200"
            >
              Open my case file →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

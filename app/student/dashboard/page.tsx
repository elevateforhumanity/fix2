import { getSupabaseServerClient } from "../../../lib/supabaseServer";
import Image from "next/image";

export const metadata = {
  title: "Student Dashboard | Elevate LMS",
};

interface EnrollmentRow {
  id: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  programs: {
    name: string;
    code: string;
  }[];
}

export default async function StudentDashboardV2Page() {
  const supabase = getSupabaseServerClient();

  // For now this pulls ALL enrollments. Later you will filter by logged-in user.
  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      status,
      start_date,
      end_date,
      programs (
        name,
        code
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(25);

  const enrollments = (data ?? []) as unknown as EnrollmentRow[];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-600">
              Pick up where you left off, track your progress, and stay on top of your training.
            </p>
          </div>
          <a
            href="/programs"
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Browse All Programs
          </a>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            There was a problem loading your enrollments. Check Supabase configuration and migrations.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Continue learning */}
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Your Programs</h2>
              {enrollments.length === 0 ? (
                <p className="mt-3 text-xs text-slate-600">
                  No enrollments yet. Once a coach enrolls you in a program, it will
              appear here.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="mt-3 space-y-3">
                {enrollments.map((enr) => (
                  <article
                    key={enr.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-orange-600">
                      {enr.programs?.[0]?.code ?? "Program"}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {enr.programs?.[0]?.name ?? "Program"}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Status:{" "}
                      <span className="font-semibold capitalize">
                        {enr.status}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Start: {enr.start_date ?? "TBD"} • End:{" "}
                      {enr.end_date ?? "TBD"}
                    </p>
                    <button className="mt-3 inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600">
                      Continue Learning
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Funding & Support</h2>
              <p className="mt-2 text-xs text-slate-600">
                Need help with transportation, childcare, or paperwork? Your case manager and Elevate staff can help.
              </p>
              <a
                href="/support"
                className="mt-3 inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Request Support
              </a>
            </section>

            <section className="rounded-2xl bg-slate-900 p-5 text-xs text-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300">
                Mobile App
              </p>
              <p className="mt-1 font-semibold">Take your learning anywhere.</p>
              <p className="mt-2 text-slate-300">
                Download the Elevate app to watch lessons, track progress, and get reminders on your phone.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

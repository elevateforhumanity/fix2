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
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-900">
        <div className="relative h-48 md:h-56">
          <Image
            src="/images/programs-new/program-5.jpg"
            alt="Student Dashboard"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl px-4 w-full">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Student Portal
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-white">Welcome to Elevate</h1>
            <p className="mt-2 text-sm text-slate-200 max-w-3xl">
              This dashboard shows your active and recent programs. As we connect
              authentication, this will filter to just your enrollments.
            </p>
            {error && (
              <p className="mt-3 text-[11px] text-red-400">
                There was a problem loading your enrollments. Check Supabase
                configuration and migrations.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-4 text-[11px]">
          {enrollments.length === 0 ? (
            <p className="text-slate-300">
              No enrollments yet. Once a coach enrolls you in a program, it will
              appear here.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {enrollments.map((enr) => (
                <article
                  key={enr.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                >
                  <p className="text-[10px] uppercase text-slate-400">
                    {enr.programs?.[0]?.code ?? "Program"}
                  </p>
                  <p className="text-[12px] font-semibold text-white">
                    {enr.programs?.[0]?.name ?? "Program"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Status:{" "}
                    <span className="font-semibold capitalize">
                      {enr.status}
                    </span>
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Start: {enr.start_date ?? "TBD"} • End:{" "}
                    {enr.end_date ?? "TBD"}
                  </p>
                  <p className="mt-2 text-[10px] text-slate-500">
                    Later this card can show JRI completion, lesson progress,
                    and links directly into your modules.
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

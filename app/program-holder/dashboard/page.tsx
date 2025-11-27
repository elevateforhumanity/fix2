import Link from "next/link";
import { allPrograms } from "@/lms-data/programs";
import { getModulesForProgram } from "@/lms-data/course-modules";

export const metadata = {
  title: "Program Holder Dashboard | Elevate for Humanity",
  description:
    "Internal console for program holders and instructors to view programs, modules, and partner content."
};

export default function ProgramHolderDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Internal – Program Holder View
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Program Holder &amp; Instructor Console
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Use this dashboard to see how each Elevate program is structured:
            key modules, partner content (like JRI), and what learners will see
            on the student side. This is your control room for curriculum,
            pacing, and expectations.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Changes here are primarily structural and planning tools. In the
            next phase, we will connect this console to Supabase so you can
            add/edit modules and upload resources without touching code.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/student/dashboard"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              View Student Dashboard
            </Link>
            <Link
              href="/admin/funding-playbook"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Funding Playbook
            </Link>
            <Link
              href="/admin/employers-playbook"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Employer Playbook
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAM GRID */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allPrograms.map((program) => {
              const modules = getModulesForProgram(program.id);

              return (
                <article
                  key={program.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm"
                >
                  <p className="text-[11px] font-semibold text-slate-300">
                    Program
                  </p>
                  <h2 className="text-sm font-semibold text-white">
                    {program.title}
                  </h2>
                  {program.subtitle && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      {program.subtitle}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-3 text-[11px] text-slate-400">
                    {program.description}
                  </p>

                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-slate-200">
                      Current Module Count:
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      {modules.length} module{modules.length === 1 ? "" : "s"}{" "}
                      defined in{" "}
                      <code className="font-mono text-[10px]">
                        lms-data/course-modules.ts
                      </code>
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/program-holder/programs/${program.id}`}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                    >
                      Manage Modules
                    </Link>
                    <Link
                      href="/student/dashboard"
                      className="rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      View as Student
                    </Link>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      Public Program Page
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

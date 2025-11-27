import Link from "next/link";
import { getProgramsWithTuitionMeta } from "@/lms-data/tuition";

export const metadata = {
  title: "Talent & Work-Based Learning Options | Employer Portal",
  description:
    "See how Elevate for Humanity can connect your business with job-ready talent through WEX, OJT, apprenticeships, and direct hire pathways."
};

export default function EmployerOpportunitiesPage() {
  const opportunities = getProgramsWithTuitionMeta();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Employer Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Talent &amp; Work-Based Learning Options
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Choose the pathways that make sense for your business. Elevate will
            coordinate with workforce boards and partners to align funding and
            compliance so you can focus on growing your team.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/employer/dashboard"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to Employer Home
            </Link>
            <Link
              href="/funding"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Learn About Funding (WEX/OJT/etc.)
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="grid gap-4 md:grid-cols-2">
            {opportunities.map(({ program, tuition }) => {
              if (!program) return null;

              return (
                <article
                  key={program.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-4"
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

                  {tuition && (
                    <>
                      <p className="mt-2 text-[11px] text-slate-200">
                        Tuition range:{" "}
                        <span className="text-slate-100">
                          {tuition.baseTuition}
                        </span>
                      </p>
                      {tuition.notes && (
                        <p className="mt-1 text-[11px] text-slate-300">
                          {tuition.notes}
                        </p>
                      )}
                      {tuition.fundingFlags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-100">
                            Funding options: {tuition.fundingFlags.join(" • ")}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-3 rounded-lg bg-slate-900/80 p-3 text-[11px] text-slate-200">
                    <p className="font-semibold">Ready to explore this option?</p>
                    <p className="mt-1">
                      Submit your interest and we&apos;ll schedule a brief call
                      to design the right pathway for your roles, schedule,
                      wages, and funding opportunities.
                    </p>
                    <Link
                      href="/employers/intake"
                      className="mt-2 inline-block rounded-md bg-orange-400 text-white px-3 py-1 font-semibold text-white hover:bg-orange-500"
                    >
                      Submit Interest
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

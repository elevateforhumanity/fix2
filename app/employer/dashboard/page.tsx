import Link from "next/link";
import { getEmployerOpportunitiesWithDetails } from "@/lms-data/employers";

export const metadata = {
  title: "Employer Portal | Elevate for Humanity",
  description:
    "A simple portal for employers to explore partnerships with Elevate for Humanity: WEX, OJT, apprenticeship, and hiring pipelines."
};

export default function EmployerDashboardPage() {
  const opportunities = getEmployerOpportunitiesWithDetails();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Employer Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Partner with Elevate for Humanity
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Elevate helps employers build pipelines of job-ready talent through
            training, Job Ready Indy (JRI), work experience (WEX), On-the-Job
            Training (OJT), apprenticeships, and direct hire pathways.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Use this portal to explore which programs fit your roles, what work
            experiences you can host, and how to get started with a simple
            conversation.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/employer/opportunities"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              View Talent & Work-Based Learning Options
            </Link>
            <Link
              href="/employer/placements"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Sample Placements & Outcomes
            </Link>
            <Link
              href="/funding"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Learn How Funding & Wages Work
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK OVERVIEW OF OPTIONS */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">Work Experience (WEX)</h2>
              <p className="mt-1 text-slate-300">
                Time-limited paid work experience where wages may be covered by
                workforce partners. Great for testing fit and giving youth or
                adults their first step into your industry.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">
                On-the-Job Training (OJT)
              </h2>
              <p className="mt-1 text-slate-300">
                You hire the participant, and a workforce partner reimburses a
                portion of wages while they learn the job. Ideal for growing
                permanent staff with support.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">
                Apprenticeships & Earn-While-You-Learn
              </h2>
              <p className="mt-1 text-slate-300">
                Structured training that blends paid work and coursework over
                time. Strong alignment to licensure and long-term retention.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="text-sm font-semibold text-white">
              Where Elevate Has Talent Ready to Go
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Below is a snapshot of programs where Elevate can connect you with
              learners for WEX, OJT, apprenticeship, or direct hire pathways.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {opportunities.map((opp) => {
                const program = opp.program;
                if (!program) return null;

                return (
                  <article
                    key={opp.id}
                    className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-[11px]"
                  >
                    <p className="font-semibold text-slate-100">
                      {program.title}
                    </p>
                    {program.subtitle && (
                      <p className="mt-0.5 text-slate-300">
                        {program.subtitle}
                      </p>
                    )}
                    <p className="mt-1 line-clamp-3 text-slate-400">
                      {program.description}
                    </p>

                    <p className="mt-2 text-slate-200">
                      Roles you can host:
                      <span className="ml-1 text-slate-100">
                        {opp.idealRoles.join(", ")}
                      </span>
                    </p>

                    <p className="mt-1 text-slate-200">
                      Typical schedule:
                      <span className="ml-1 text-slate-100">
                        {opp.typicalHoursPerWeek} hours/week for{" "}
                        {opp.typicalDurationWeeks} weeks
                      </span>
                    </p>

                    <p className="mt-1 text-slate-300">
                      {opp.notesForEmployer}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-100">
                        Options:{" "}
                        {opp.workBasedTypes
                          .map((t) =>
                            t === "wex"
                              ? "WEX"
                              : t === "ojt"
                              ? "OJT"
                              : t === "apprenticeship"
                              ? "Apprenticeship"
                              : "Hire Only"
                          )
                          .join(" • ")}
                      </span>
                      <Link
                        href="/employer/opportunities"
                        className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                      >
                        I&apos;m Interested in Hosting
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

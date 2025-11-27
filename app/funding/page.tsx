import Link from "next/link";
import { allPrograms } from "@/lms-data/programs";
import {
  fundingSources,
  getFundingForProgram,
  getProgramsByFundingKey
} from "@/lms-data/funding";

export const metadata = {
  title: "Funding & Earn While You Learn | Elevate for Humanity",
  description:
    "Learn how Elevate for Humanity braids JRI, WEX, OJT, apprenticeship, tuition, and employer support so learners can earn while they learn."
};

export default function FundingPage() {
  const programsByFunding = getProgramsByFundingKey();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center">
          <div className="md:w-3/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
              Funding & Earn While You Learn
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              How we help you pay for training—and earn as you go.
            </h1>
            <p className="mt-3 text-sm text-slate-200">
              Elevate for Humanity works with local workforce boards, employers,
              and community partners to braid funding together. That can include
              stipends, work experience wages, on-the-job training support,
              apprenticeship income, and flexible payment options.
            </p>
            <p className="mt-3 text-xs text-slate-300">
              Exact eligibility depends on your age, income, location, and
              partner approvals. This page is a guide so you can see how the
              pieces fit together before you talk with an advisor.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <Link
                href="/programs"
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                View Programs
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-slate-500 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
              >
                Talk With an Advisor
              </Link>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs shadow-lg">
              <p className="text-[11px] font-semibold text-slate-100">
                What "Earn While You Learn" can look like:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                <li>Stipends for showing up and completing readiness training.</li>
                <li>Paid work experience hours with partner employers.</li>
                <li>
                  Wages reimbursed to employers while they train you on the job.
                </li>
                <li>Apprenticeship pay while you build hours in your trade.</li>
                <li>
                  Tuition and fees covered or reduced through grants and sponsors.
                </li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-400">
                Our job is to help you match into the right program, funding
                combination, and employer so your pathway is realistic and
                sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING CARDS */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="text-lg font-semibold text-white">
            Funding & Incentive Options
          </h2>
          <p className="mt-1 text-xs text-slate-300">
            These are the main ways Elevate connects learners, employers, and
            funding partners. Not every option is available for every person or
            program, but this gives you a starting map.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fundingSources.map((fs) => {
              const programs = programsByFunding[fs.key] || [];
              return (
                <article
                  key={fs.key}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                    {fs.shortLabel}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    {fs.label}
                  </h3>
                  <p className="mt-2 text-[11px] text-slate-300">
                    {fs.description}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-slate-400">
                    {fs.idealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {fs.notes && (
                    <p className="mt-2 text-[11px] text-slate-500">{fs.notes}</p>
                  )}

                  {programs.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold text-slate-200">
                        Often paired with:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {programs.map((p) => (
                          <Link
                            key={p.id}
                            href={`/programs/${p.slug}`}
                            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2 py-1 text-[10px] text-slate-100 hover:bg-slate-800"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAM GRID WITH FUNDING TAGS */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-lg font-semibold text-white">
            Programs & Possible Funding Paths
          </h2>
          <p className="mt-1 text-xs text-slate-300">
            This table shows how each program can potentially connect to
            funding, work experience, or apprenticeship. Final eligibility is
            always confirmed with your case manager, workforce board, and
            partners.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allPrograms.map((program) => {
              const funding = getFundingForProgram(program.id);

              return (
                <article
                  key={program.id}
                  className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-xs shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-white">
                    {program.title}
                  </h3>
                  {program.subtitle && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      {program.subtitle}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-3 text-[11px] text-slate-400">
                    {program.description}
                  </p>

                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-slate-200">
                      Possible funding or earn-as-you-learn options:
                    </p>
                    {funding.length === 0 ? (
                      <p className="mt-1 text-[11px] text-slate-400">
                        Tuition / self-pay. Ask an advisor about any new
                        funding options.
                      </p>
                    ) : (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {funding.map((fs) => (
                          <span
                            key={fs.key}
                            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] text-slate-100"
                          >
                            {fs.shortLabel}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                    >
                      View Program
                    </Link>
                    <Link
                      href="/contact"
                      className="rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                    >
                      Talk About Funding
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            This page is a planning tool. Final approvals for JRI, WRG, WEX,
            OJT, apprenticeship, and employer sponsorship come from the
            appropriate state and local partners. Elevate for Humanity will help
            you and your case manager understand which options are realistic for
            your situation.
          </p>
        </div>
      </section>
    </main>
  );
}

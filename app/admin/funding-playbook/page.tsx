import Link from "next/link";
import { allPrograms } from "@/lms-data/programs";
import {
  fundingSources,
  getFundingForProgram
} from "@/lms-data/funding";

export const metadata = {
  title: "Funding Playbook | Internal | Elevate for Humanity",
  description:
    "Internal staff guide for using JRI, WRG, WEX, OJT, apprenticeship, tuition, and employer support across Elevate programs."
};

export default function FundingPlaybookPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Internal Staff Only
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Funding & Earn-While-You-Learn Playbook
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This page is a working guide for Elevate for Humanity staff and
            partners. Use it to design funding plans with learners, employers,
            and workforce boards. Do not share this page with learners or the
            general public.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <Link
              href="/funding"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              View Public Funding Page
            </Link>
            <Link
              href="/programs"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Public Programs Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* LAYOUT */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl gap-6 px-4 py-6 md:grid md:grid-cols-[2fr,3fr]">
          {/* LEFT: FUNDING CARDS WITH STAFF NOTES */}
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">
                1. Funding Tools – Staff View
              </h2>
              <p className="mt-1 text-[11px] text-slate-300">
                Each card below explains how Elevate should use that funding
                tool in practice: who it is best for, what staff should do, and
                which partners approve it.
              </p>
            </div>

            <div className="space-y-3">
              {fundingSources.map((fs) => (
                <article
                  key={fs.key}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                    {fs.shortLabel}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    {fs.label}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-300">
                    {fs.description}
                  </p>

                  <div className="mt-2 rounded-lg bg-slate-900/80 p-3">
                    <p className="text-[11px] font-semibold text-slate-100">
                      Staff Checklist – Before You Promise This:
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                      <li>
                        Confirm the learner{" "}
                        <span className="font-semibold">meets eligibility</span>{" "}
                        (age, income, residency, etc.) with the workforce board
                        or case manager.
                      </li>
                      <li>
                        Confirm that{" "}
                        <span className="font-semibold">
                          Elevate&apos;s program is currently approved
                        </span>{" "}
                        for this funding type (ETPL/WRG/apprenticeship list,
                        active MOU, etc.).
                      </li>
                      <li>
                        Document the funding plan in Elevate&apos;s internal
                        notes and any required partner systems.
                      </li>
                      <li>
                        Make sure the learner understands{" "}
                        <span className="font-semibold">
                          what is covered and what is not
                        </span>{" "}
                        (tuition, books, fees, stipends, wages).
                      </li>
                    </ul>
                    {fs.notes && (
                      <p className="mt-2 text-[11px] text-slate-400">
                        <span className="font-semibold">Important:</span>{" "}
                        {fs.notes}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 rounded-lg bg-slate-900/80 p-3">
                    <p className="text-[11px] font-semibold text-slate-100">
                      Who Approves / Signs Off:
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                      <li>
                        Elevate internal: program lead + leadership/finance
                        (for capacity &amp; tuition).
                      </li>
                      <li>
                        External: workforce board case manager / training
                        provider liaison / employer contact, depending on the
                        tool.
                      </li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT: PROGRAM-BY-PROGRAM MAP */}
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">
                2. Program Funding Map – Internal
              </h2>
              <p className="mt-1 text-[11px] text-slate-300">
                Use this section when a learner says, &quot;I&apos;m interested
                in this program – how can we pay for it?&quot; These are our{" "}
                <span className="font-semibold">intended pairings</span>, not
                guarantees. Always confirm live with partners.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {allPrograms.map((program) => {
                const funding = getFundingForProgram(program.id);

                return (
                  <article
                    key={program.id}
                    className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm"
                  >
                    <p className="text-[11px] font-semibold text-slate-300">
                      Program
                    </p>
                    <h3 className="text-sm font-semibold text-white">
                      {program.title}
                    </h3>
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
                        Possible Funding Tools:
                      </p>
                      {funding.length === 0 ? (
                        <p className="mt-1 text-[11px] text-slate-400">
                          Tuition / self-pay only. Ask leadership about any new
                          funding options or pilots for this program.
                        </p>
                      ) : (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {funding.map((fs) => (
                            <span
                              key={fs.key}
                              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-100"
                            >
                              {fs.shortLabel}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 rounded-lg bg-slate-900/80 p-3">
                      <p className="text-[11px] font-semibold text-slate-100">
                        Staff Talking Points:
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                        <li>
                          Start with the{" "}
                          <span className="font-semibold">career goal</span>{" "}
                          and ideal timeline.
                        </li>
                        <li>
                          Identify at least{" "}
                          <span className="font-semibold">
                            one funding path and one backup
                          </span>{" "}
                          (e.g., WEX → OJT, or JRI → WEX → Tuition).
                        </li>
                        <li>
                          Explain clearly what the learner earns and what is
                          covered at each step.
                        </li>
                        <li>
                          Connect them with the{" "}
                          <span className="font-semibold">
                            correct case manager or employer partner
                          </span>{" "}
                          before promising start dates.
                        </li>
                      </ul>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                      >
                        View Public Page
                      </Link>
                      <Link
                        href="/funding"
                        className="rounded-md border border-slate-600 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-900"
                      >
                        View Public Funding View
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* QUICK FLOW GUIDES */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-white">
                3. Quick Example Flows
              </h2>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-slate-900 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    Example: Youth in Customer Service
                  </p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-[11px] text-slate-300">
                    <li>Intake + interest in Customer Service &amp; Contact Center.</li>
                    <li>Connect to JRI cohort for soft skills and stipend (if available).</li>
                    <li>Place into WEX at a front desk / call center partner.</li>
                    <li>Transition successful learners into OJT or direct hire.</li>
                    <li>Offer additional Elevate programs as upskilling options.</li>
                  </ol>
                </div>
                <div className="rounded-lg bg-slate-900 p-3">
                  <p className="text-[11px] font-semibold text-slate-100">
                    Example: Beauty Apprenticeship (Nails / Esthetics)
                  </p>
                  <ol className="mt-1 list-decimal space-y-1 pl-5 text-[11px] text-slate-300">
                    <li>Intake + confirm interest in nail/esthetician careers.</li>
                    <li>Review tuition options (self-pay, payment plan, employer sponsor).</li>
                    <li>Place in apprenticeship shop with clear wage + hours plan.</li>
                    <li>Combine Elevate theory modules with supervised shop hours.</li>
                    <li>Track progress toward state board/licensure requirements.</li>
                  </ol>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Add more internal examples here as new cohorts, employers, and
                pilots launch. Treat this page as a living playbook for staff
                training and onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

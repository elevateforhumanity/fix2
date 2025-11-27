import Link from "next/link";
import { notFound } from "next/navigation";
import { allPrograms } from "@/lms-data/programs";
import { getTuitionForProgram } from "@/lms-data/tuition";
import {
  getPaymentConfigForProgram,
  getFundingFlagsForProgram,
} from "@/lms-data/paymentPlans";

interface PageProps {
  params: { programId: string };
}

const fundingFlagLabels: Record<string, string> = {
  jri: "JRI / Work Readiness",
  wrg: "Workforce Ready Grant (WRG)",
  wex: "Work Experience (WEX)",
  ojt: "On-the-Job Training (OJT)",
  apprenticeship: "Apprenticeship",
  "employer-pay": "Employer Sponsored",
  "student-pay": "Student / Family Pay",
  philanthropy: "Philanthropy / Flexible Aid",
};

export default function ProgramCheckoutPage({ params }: PageProps) {
  const program = allPrograms.find((p) => p.id === params.programId);

  if (!program) {
    notFound();
  }

  const tuition = getTuitionForProgram(program.id);
  const payConfig = getPaymentConfigForProgram(program.id);
  const fundingFlags = getFundingFlagsForProgram(program.id);

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Program Checkout
          </p>
          <h1 className="mt-1 text-2xl font-bold">{program.title}</h1>
          <p className="mt-2 text-xs text-slate-300">
            This page gives you a clear view of typical costs, funding options,
            and how to move forward. Elevate often uses grants, employer
            support, and payment plans so you&apos;re not carrying the whole
            cost alone.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href={`/programs/${program.slug}`}
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Program
            </Link>
            <Link
              href="/apply"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Go to Application
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-5 text-xs">
          {/* TUITION SNAPSHOT */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">
              1. Tuition & Program Cost Snapshot
            </p>
            {tuition ? (
              <>
                <p className="mt-1 text-[11px] text-slate-300">
                  Typical tuition range for this pathway:
                </p>
                <p className="mt-1 text-[12px] font-semibold text-green-300">
                  {tuition.baseTuition}
                </p>
                {tuition.notes && (
                  <p className="mt-1 text-[11px] text-slate-300">
                    {tuition.notes}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1 text-[11px] text-slate-300">
                Tuition details for this program are still being finalized. An
                Elevate staff member can walk you through current pricing.
              </p>
            )}
          </section>

          {/* FUNDING FLAGS */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">
              2. Funding Tools We May Use for This Program
            </p>
            {fundingFlags.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {fundingFlags.map((flag) => (
                  <span
                    key={flag}
                    className="rounded-full border border-slate-700 px-3 py-1 text-[10px] text-slate-200"
                  >
                    {fundingFlagLabels[flag] ?? flag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[11px] text-slate-300">
                Funding tags have not been assigned for this program yet. Most
                Elevate pathways use some blend of grants, employer support or
                payment plans.
              </p>
            )}
            <p className="mt-2 text-[10px] text-slate-500">
              Final funding is always confirmed one-on-one. This page gives you
              a realistic starting picture before you apply.
            </p>
          </section>

          {/* PAYMENT OPTIONS */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">
              3. Payment Options
            </p>
            {payConfig && payConfig.options.length ? (
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {payConfig.options.map((opt) => (
                  <article
                    key={opt.id}
                    className="flex flex-col rounded-lg border border-slate-700 bg-slate-900/80 p-3"
                  >
                    <p className="text-[11px] font-semibold text-slate-100">
                      {opt.label}
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-green-300">
                      {opt.displayAmount}
                    </p>
                    {opt.description && (
                      <p className="mt-1 text-[11px] text-slate-300">
                        {opt.description}
                      </p>
                    )}
                    {opt.fundingNotes && (
                      <p className="mt-1 text-[10px] text-slate-400">
                        {opt.fundingNotes}
                      </p>
                    )}
                    <div className="mt-3">
                      {opt.paymentUrl ? (
                        <a
                          href={opt.paymentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-md bg-orange-400 px-4 py-2 text-[11px] font-semibold text-white hover:bg-orange-500"
                        >
                          Continue to Secure Payment
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex cursor-not-allowed items-center justify-center rounded-md bg-slate-700 px-4 py-2 text-[11px] font-semibold text-slate-300"
                        >
                          Payment link coming soon
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Elevate may also adjust payment based on grants and
                      employer participation. Final amount will be confirmed
                      before you commit.
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[11px] text-slate-300">
                Payment options for this program are still being set up. An
                Elevate team member will provide full details during your
                intake.
              </p>
            )}
          </section>

          {/* NEXT STEPS */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">4. Next Steps</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[11px] text-slate-300">
              <li>Submit your application so we can confirm your funding.</li>
              <li>
                Meet with Elevate to finalize whether JRI, WRG, WEX, OJT,
                apprenticeship or employer pay will be used.
              </li>
              <li>
                Once your funding is confirmed, you&apos;ll receive a secure
                payment link or confirmation that your cost is covered.
              </li>
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}

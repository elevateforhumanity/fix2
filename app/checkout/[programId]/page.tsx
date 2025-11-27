import Link from "next/link";
import { notFound } from "next/navigation";
import { allPrograms } from "@/lms-data/programs";
import {
  getPaymentConfigForProgram,
  type PaymentOption,
} from "@/lms-data/paymentPlans";

interface PageProps {
  params: { programId: string };
}

export const metadata = {
  title: "Program Checkout | Elevate for Humanity",
  description:
    "Tuition, funding, and payment options for Elevate for Humanity programs.",
};

function formatUsd(amount: number | undefined) {
  if (!amount) return "$0";
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function renderPaymentOption(option: PaymentOption) {
  return (
    <article
      key={option.id}
      className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-xs"
    >
      <div>
        <p className="text-[11px] font-semibold text-slate-100">
          {option.label}
        </p>
        {option.mode === "full" && option.amountUsd > 0 && (
          <p className="mt-1 text-sm font-bold text-white">
            {formatUsd(option.amountUsd)} <span className="text-[10px]">total</span>
          </p>
        )}
        {option.mode === "installments" && option.installments && (
          <p className="mt-1 text-sm font-bold text-white">
            {option.installments.count} x{" "}
            {formatUsd(option.installments.amountUsd)}{" "}
            <span className="text-[10px]">
              {option.installments.frequency.toUpperCase()}
            </span>
          </p>
        )}
        {option.amountUsd === 0 && option.mode === "full" && (
          <p className="mt-1 text-sm font-bold text-green-400">
            $0 Tuition to Learner
          </p>
        )}
        {option.description && (
          <p className="mt-1 text-[10px] text-slate-300">
            {option.description}
          </p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        {option.stripePaymentLink ? (
          <a
            href={option.stripePaymentLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
          >
            Continue to Secure Payment
          </a>
        ) : (
          <span className="rounded-md border border-slate-700 px-3 py-2 text-[10px] text-slate-300">
            Add Stripe Payment Link in{" "}
            <code className="bg-slate-900 px-1">paymentPlans.ts</code>.
          </span>
        )}
      </div>
    </article>
  );
}

export default function ProgramCheckoutPage({ params }: PageProps) {
  const programId = params.programId;
  const program = (allPrograms as any[]).find((p) => p.id === programId);
  const paymentConfig = getPaymentConfigForProgram(programId);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Program Checkout
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            {program.title || "Program"}
          </h1>
          {program.shortDescription && (
            <p className="mt-2 text-xs text-slate-300">
              {program.shortDescription}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/apply"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to Application
            </Link>
            <Link
              href="/student/hub"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Go to Student Hub
            </Link>
            <Link
              href="/funding"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Funding &amp; Support Info
            </Link>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6 grid gap-4 md:grid-cols-[1.6fr,1.4fr] text-xs">
          {/* LEFT: Tuition + funding story */}
          <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              How this program is funded
            </p>
            {paymentConfig ? (
              <>
                <p className="text-[11px] text-slate-300">
                  {paymentConfig.headline}
                </p>
                <p className="text-[10px] text-slate-400">
                  Base tuition (before grants/employer funding):{" "}
                  <span className="font-semibold text-slate-100">
                    {formatUsd(paymentConfig.baseTuitionUsd)}
                  </span>
                </p>
                <p className="text-[10px] text-slate-400">
                  Funding type:{" "}
                  <span className="font-semibold text-slate-100">
                    {paymentConfig.isStateFunded
                      ? "Eligible for state / workforce grants (WRG/WIOA) or sponsorship"
                      : "Primarily tuition-based with optional support (WRG, JRI, employer, philanthropy)"}
                  </span>
                </p>
                {paymentConfig.notes && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    {paymentConfig.notes}
                  </p>
                )}
              </>
            ) : (
              <p className="text-[11px] text-slate-300">
                Payment plan configuration has not been added yet for this
                program. Update{" "}
                <code className="bg-slate-900 px-1">paymentPlans.ts</code> with
                a block for programId:{" "}
                <span className="font-mono text-orange-300">{programId}</span>.
              </p>
            )}

            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-[10px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Earn While You Learn (WRG / JRI / WEX / OJT)
              </p>
              <ul className="mt-1 list-disc pl-5">
                <li>
                  Your application flags if a learner is interested in{" "}
                  <span className="font-semibold">JRI</span> as a soft-skill
                  onramp.
                </li>
                <li>
                  You can also mark interest in{" "}
                  <span className="font-semibold">WEX</span> and{" "}
                  <span className="font-semibold">OJT</span> so funding partners
                  can layer wages on top of training.
                </li>
                <li>
                  Staff will match each learner to grants, stipends, or
                  employer-sponsored options during intake.
                </li>
              </ul>
            </div>
          </section>

          {/* RIGHT: Payment options */}
          <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Choose a payment option
            </p>
            <p className="text-[11px] text-slate-300">
              These examples show how you can offer full-pay, payment plans, or
              sponsored options. Replace links with your actual Stripe Payment
              Links.
            </p>
            <div className="mt-3 grid gap-3">
              {paymentConfig && paymentConfig.paymentOptions.length > 0 ? (
                paymentConfig.paymentOptions.map(renderPaymentOption)
              ) : (
                <p className="text-[11px] text-slate-300">
                  No payment options configured yet. Add them to{" "}
                  <code className="bg-slate-900 px-1">paymentPlans.ts</code>.
                </p>
              )}
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              After payment is confirmed (Stripe or sponsored), staff can mark
              the learner as{" "}
              <span className="font-semibold text-slate-100">enrolled</span> in
              your admin panel and grant access to the course.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

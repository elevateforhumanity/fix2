// app/funding/page.tsx
import Link from "next/link";

export default function FundingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Funding &amp; Eligibility
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Funding your training shouldn&apos;t be a barrier.
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity works with workforce boards, re-enstart partners,
            and employers to help eligible students access free or low-cost
            training. Many of our learners qualify for funding that covers most
            or all tuition.
          </p>
        </header>

        {/* Main funding cards */}
        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              WIOA (WorkOne Funding)
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              The Workforce Innovation and Opportunity Act (WIOA) provides
              training funds for eligible adults, dislocated workers, and youth
              through local WorkOne centers and workforce boards.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Must meet income, employment, or barrier-based criteria</li>
              <li>• Requires working with a WorkOne career advisor</li>
              <li>• Often covers tuition, books, and approved fees</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Workforce Ready Grant (WRG) / Next Level Jobs
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              The Workforce Ready Grant helps Indiana residents complete
              short-term, high-demand training programs with little to no
              out-of-pocket cost.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Indiana resident with a high school diploma or equivalent</li>
              <li>• No prior degree above associate level (in most cases)</li>
              <li>• Must enroll in eligible WRG-approved programs</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Jobs for Re-Enstart (JRI)
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              JRI funding supports justice-involved individuals who are ready to
              build new careers and stable lives through training and
              employment.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Recent or past justice involvement</li>
              <li>• Willingness to follow re-enstart program requirements</li>
              <li>• Strong interest in a clear career pathway</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Employer &amp; Apprenticeship Funding
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              Some apprenticeships and employer partnerships include paid
              training, wage reimbursements, or cost-sharing for eligible
              learners.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Employed or sponsored by a partner employer</li>
              <li>• Participating in an approved Registered Apprenticeship</li>
              <li>• Willing to complete agreed-upon hours and training</li>
            </ul>
          </article>
        </section>

        {/* How funding works */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            How the funding process works
          </h2>
          <ol className="mt-3 space-y-2 text-xs text-slate-700">
            <li>
              <span className="font-semibold">1. Apply to Elevate:</span> Submit
              your application and select the program you are interested in.
            </li>
            <li>
              <span className="font-semibold">
                2. Meet with an Elevate advisor:
              </span>{" "}
              We review your background, income, employment status, and any
              barriers to determine what you may qualify for.
            </li>
            <li>
              <span className="font-semibold">
                3. Connect with workforce partners:
              </span>{" "}
              We refer you to WorkOne, WRG, JRI, or other partners as needed so
              they can complete their eligibility steps.
            </li>
            <li>
              <span className="font-semibold">
                4. Confirm funding &amp; enrollment:
              </span>{" "}
              Once funding approval is received, we finalize your enrollment
              date and training schedule.
            </li>
          </ol>
        </section>

        {/* Quick FAQ style block */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Common questions about paying for training
          </h2>
          <div className="mt-4 space-y-4 text-sm text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Do I have to pay anything out of pocket?
              </h3>
              <p className="mt-1 text-xs text-slate-700">
                It depends on your situation and funding source. Many students
                pay little to nothing out of pocket once WIOA, WRG, JRI, or
                other funding is applied. We will walk through all options with
                you before you enroll.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">
                What if I don&apos;t qualify for WIOA or WRG?
              </h3>
              <p className="mt-1 text-xs text-slate-700">
                You may still qualify for other funding or payment plans,
                especially if you are justice-involved, working with a partner
                agency, or sponsored by an employer. We will help you explore
                every option.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Can justice-involved individuals receive funding?
              </h3>
              <p className="mt-1 text-xs text-slate-700">
                Yes. Many of our pathways are intentionally designed for
                justice-involved learners, especially through JRI and
                re-enstart-focused partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mb-4 rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-lg font-semibold">
            Ready to see what you qualify for?
          </h2>
          <p className="mt-2 text-xs text-slate-100">
            The easiest way to start is to apply and talk with an advisor. We
            will help you understand your options and build a plan that makes
            sense for your life and goals.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Start My Application
            </Link>
            <Link
              href="/advising"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Talk With an Advisor
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

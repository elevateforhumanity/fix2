// app/support/page.tsx
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Support &amp; Wellness
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Whole-person support for your journey.
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity is more than training. We recognize that people
            are managing real life—family, trauma, re-entry, housing, mental
            health, and more. Our support services are built to walk with you,
            not judge you.
          </p>
        </header>

        {/* Support categories */}
        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Life Coaching &amp; Motivation
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              Our life coaching services help you unpack where you are, where
              you want to go, and what&apos;s been holding you back. We focus on
              mindset, confidence, and practical next steps.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Goal setting and accountability</li>
              <li>• Confidence and mindset support</li>
              <li>• Navigating life transitions and setbacks</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Mental Health Partnerships
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              Through partner providers like Psychiatric Mental Health Nurse
              Practitioners, we connect learners to mental health care when
              needed, including evaluation, medication management, and
              supportive services.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Referrals for mental health evaluation</li>
              <li>• Medication management (through licensed clinicians)</li>
              <li>• Integrated wellness alongside training</li>
            </ul>
            <div className="mt-3">
              <Link
                href="/team/alina-perfect"
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Learn more about Alina Perfect, PMHNP →
              </Link>
            </div>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Re-Entry &amp; Justice-Involved Support
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              For justice-involved participants, we partner with re-entry
              programs and JRI-aligned agencies to support training, compliance,
              and long-term stability.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Coordination with probation/parole where appropriate</li>
              <li>• Career planning with your situation in mind</li>
              <li>• Pathways that fit re-entry conditions and goals</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Barriers &amp; Navigation Support
            </h2>
            <p className="mt-2 text-xs text-slate-700">
              We can&apos;t fix everything, but we do our best to connect you to
              resources and partners who can help with common barriers.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Referrals for housing and basic needs</li>
              <li>• Childcare and transportation referrals where available</li>
              <li>• Digital literacy and technology support</li>
            </ul>
          </article>
        </section>

        {/* How to access support */}
        <section className="mb-10 rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-lg font-semibold">How to access support</h2>
          <ol className="mt-3 space-y-2 text-xs text-slate-100">
            <li>
              <span className="font-semibold">1. Tell us what&apos;s going on:</span>{" "}
              You can share needs on your application, with your advisor, or
              privately with a life coach.
            </li>
            <li>
              <span className="font-semibold">
                2. We match you to the right person:
              </span>{" "}
              That might be a life coach, advisor, partner clinician, or
              community resource.
            </li>
            <li>
              <span className="font-semibold">
                3. We build a plan around you:
              </span>{" "}
              Training is important, but so is what&apos;s happening at home. We
              do our best to honor both.
            </li>
          </ol>
          <p className="mt-3 text-[0.7rem] text-slate-200">
            Note: Clinical mental health services are provided only by licensed
            professionals through partner organizations. Elevate for Humanity
            does not replace emergency mental health or crisis services. If you
            are in immediate danger, call 911 or your local emergency number.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Apply &amp; Request Support
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

import Link from 'next/link';


export default function FundingPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-10 py-10">
      <div className="mx-auto max-w-6xl">
        {/* HERO */}
        <section className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">
            Funding options that can reduce or cover tuition
          </h1>
          <p className="mt-4 text-lg text-zinc-700">
            We help you understand eligibility and next steps for workforce and
            reentry-aligned funding pathways. Funding availability varies by
            program and individual eligibility.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center transition"
            >
              Start an Application
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center transition"
            >
              Talk to an Advisor
            </Link>
          </div>
        </section>

        {/* FUNDING TYPES */}
        <section className="mt-14">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            Common funding pathways
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <FundingCard
              title="WIOA (Workforce Innovation & Opportunity Act)"
              description="Career training funding for eligible participants seeking in-demand skills and employment pathways."
              bullets={[
                'Eligibility-based workforce funding',
                'Often covers tuition and related costs',
                'Aligned with approved training programs',
              ]}
            />

            <FundingCard
              title="WRG (Workforce Readiness & Growth)"
              description="Support pathways focused on readiness, retention, and successful completion of training programs."
              bullets={[
                'Wraparound and readiness support',
                'Eligibility varies by region and program',
                'Designed to reduce barriers to completion',
              ]}
            />

            <FundingCard
              title="JRI / Justice-Involved Pathways"
              description="Training and support options aligned with reentry, second-chance employment, and community impact."
              bullets={[
                'Reentry-aligned training support',
                'Program-specific eligibility',
                'Career pathways designed for long-term stability',
              ]}
            />
          </div>
        </section>

        {/* APPRENTICESHIP */}
        <section className="mt-14 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            Apprenticeship & earn-while-you-learn options
          </h2>
          <p className="mt-4 text-zinc-700 max-w-3xl">
            Some programs offer apprenticeship-aligned pathways where you gain
            hands-on experience while progressing toward completion. These
            options may include structured milestones, supervised training, and
            employment-aligned outcomes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/programs"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center transition"
            >
              View Apprenticeship Programs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center transition"
            >
              Ask About Eligibility
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-14">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            How funding works
          </h2>

          <ol className="mt-6 space-y-4 list-decimal pl-5 text-zinc-700 max-w-3xl">
            <li>Submit a short application.</li>
            <li>We review your goals, background, and program fit.</li>
            <li>Eligibility is checked for available funding pathways.</li>
            <li>You choose a program and confirm next steps.</li>
            <li>Begin training with clarity and support.</li>
          </ol>
        </section>

        {/* IMPORTANT NOTE */}
        <section className="mt-12 max-w-3xl">
          <p className="text-sm text-zinc-600">
            Important: Funding availability is not guaranteed and depends on
            eligibility, documentation, partner requirements, and current
            program capacity. Our team helps you understand options and next
            steps.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="mt-16 rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            Ready to explore your options?
          </h2>
          <p className="mt-3 text-zinc-700">
            Apply today and we'll help you determine program fit, timelines, and
            potential funding pathways.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center transition"
            >
              Start an Application
            </Link>
            <Link
              href="/programs"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center transition"
            >
              Browse Programs
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FundingCard({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mt-2 text-zinc-700">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 list-disc pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

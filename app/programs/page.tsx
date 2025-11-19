// app/programs/page.tsx
import Link from "next/link";

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant Pathway",
    category: "Healthcare",
    length: "4–6 months · Hybrid",
    funding: "WRG · WIOA · Workforce Grants",
    blurb:
      "Hands-on clinical and front-office skills for entry-level roles in clinics, hospitals, and specialty practices. Built with partner schools and Elevate support.",
  },
  {
    slug: "barber",
    name: "Barber Apprenticeship",
    category: "Apprenticeship · License Track",
    length: "12–18 months · Shop + Classroom",
    funding: "Apprenticeship · WIOA",
    blurb:
      "State-approved barber apprenticeship that mixes Milady-based theory with real shop experience, coaching, and licensing support.",
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    category: "Skilled Trades",
    length: "4–9 months · Lab + Field",
    funding: "Workforce Grants · Employer Sponsors",
    blurb:
      "Partner-led technical training in heating, ventilation, and air conditioning with Elevate as the front door, tracker, and connector.",
  },
  {
    slug: "building-tech",
    name: "Building Maintenance Technician",
    category: "Facilities & Property",
    length: "4–9 months · On-site",
    funding: "Workforce Grants · Apprenticeship",
    blurb:
      "Training for core skills in building systems, repairs, and property maintenance for residential, commercial, or institutional sites.",
  },
  {
    slug: "cdl",
    name: "CDL / Transportation Pathways",
    category: "Transportation",
    length: "Varies · Range + Road",
    funding: "Workforce Grants · Employer Sponsors",
    blurb:
      "Connections to CDL programs and transportation employers, with Elevate support for readiness, paperwork, and employer alignment.",
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness & Re-Entry",
    category: "Readiness & Soft Skills",
    length: "4–12 weeks · Workshops + Coaching",
    funding: "Support Services · Referrals",
    blurb:
      "Coaching, soft skills, and barrier support for adults and re-entry talent preparing to step back into training or employment.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Elevate For Humanity™ Programs
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl text-slate-900">
            High-impact training and apprenticeship pathways.
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
            Each pathway is built in partnership with credentialed schools and
            employers. Elevate handles onboarding, support, and reporting so
            learners and agencies see a clear, step-by-step plan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="rounded-full border-2 border-blue-200 bg-white px-3 py-1 text-slate-700">
              Indiana Workforce · WRG · WIOA-Aligned
            </span>
            <span className="rounded-full border-2 border-blue-200 bg-white px-3 py-1 text-slate-700">
              Re-entry friendly options available
            </span>
          </div>
        </div>
      </section>

      {/* Program grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl text-slate-900">
                Explore current Elevate pathways.
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-xl">
                This catalog continues to grow as we add new credentialing
                partners, apprenticeship sponsors, and employer-aligned options.
              </p>
            </div>
            <Link
              href="/start"
              className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-lg"
            >
              Start My Application
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                  {program.category}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{program.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{program.length}</p>
                <p className="mt-3 flex-1 text-sm text-slate-600 leading-relaxed">
                  {program.blurb}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Funding: {program.funding}
                </p>
                <p className="mt-2 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition">
                  View program details →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help choosing section */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[2fr,1.3fr] items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                Not sure where to start?
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl text-white">
                We help you match your story to the right pathway.
              </h2>
              <p className="mt-2 text-sm text-blue-100">
                You don&apos;t have to figure this out alone. We listen to your
                situation, barriers, and goals, then help you choose a starting
                point that makes sense for your life right now.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-blue-100">
                <li>• Unsure which program fits? We'll walk through it.</li>
                <li>• Re-entry or justice-involved? We have options.</li>
                <li>
                  • Already working but want a career change? We can build a
                  plan.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/start"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition shadow-lg"
                >
                  Start My Application
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Talk With Our Team
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-5 text-sm text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-200 mb-2">
                For case managers & partners
              </p>
              <p className="mb-2">
                Elevate simplifies referrals by turning this catalog into{" "}
                <span className="font-semibold">
                  real, trackable plans with status updates you can see.
                </span>
              </p>
              <p className="mb-2">
                You refer once. We coordinate with training providers, follow up
                with the learner, and keep you in the loop.
              </p>
              <Link
                href="/partners"
                className="mt-2 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                Learn about partnering with Elevate →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

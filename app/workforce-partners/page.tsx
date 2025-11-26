import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Workforce & Agency Partners | Elevate for Humanity",
  description:
    "Tools, reporting, and referral pathways for workforce boards, case managers, re-entry programs, and community agencies partnering with Elevate for Humanity.",
  openGraph: {
    title: "Workforce & Agency Partners | Elevate for Humanity",
    description: "Tools, reporting, and referral pathways for workforce boards and community agencies.",
    images: ["/images/facilities-new/facility-2.jpg"],
    type: "website",
  },
};

const AGENCIES = [
  "Local workforce boards and development agencies",
  "WRG, WIOA, SNAP E&T, and TANF programs",
  "Re-entry and justice-involved support organizations",
  "Community-based organizations, coalitions, and faith-based groups",
  "Housing, mental health, and wraparound service providers",
];

const WHAT_WE_PROVIDE = [
  "Approved training programs with clear outcomes and documentation",
  "Standardized enrollment, attendance, and completion reporting",
  "Case notes and milestone updates that support your compliance",
  "Communication when learners are struggling, not just when they disappear",
  "Pathways into apprenticeship, employment, and ongoing upskilling",
];

const REPORTING = [
  "Enrollment confirmations and training start dates",
  "Attendance summaries and participation flags",
  "Skills milestones and credential attempts/completions (where applicable)",
  "Employment and retention updates where we are engaged for placement",
  "Data extracts for board reporting, audits, and performance reviews",
];

export default function WorkforcePartnersPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Workforce • Agencies • Case Managers
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A Training Partner That Understands Workforce and Compliance.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Elevate for Humanity is built for workforce systems, not around
              them. We design programs, documentation, and reporting so boards,
              case managers, and agencies can plug in without having to fight
              the platform just to get what you need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?type=workforce-partner"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Set Up a Workforce Partnership
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Request a Board / Agency Meeting
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Ideal for workforce boards, re-entry programs, and agencies that
              are tired of chasing down attendance sheets and unclear outcomes.
            </p>
          </div>

          {/* HERO IMAGE */}
          <div className="relative h-64 w-full md:w-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/media/employers-hero.jpg"
              alt="Workforce Partners"
              fill
              className="object-cover"
            />
          </div>

          {/* SNAPSHOT */}
          <div className="hidden w-full max-w-md rounded-2xl border border-slate-100 bg-slate-900 px-5 py-5 text-sm text-slate-50 shadow-lg md:w-80">
            <h2 className="text-sm font-semibold text-white">
              Agency & Board Snapshot
            </h2>
            <dl className="mt-3 space-y-2 text-xs text-slate-100/90">
              <div className="flex justify-between">
                <dt className="text-slate-300">Focus</dt>
                <dd className="font-medium">Training, placement, documentation</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Programs</dt>
                <dd className="font-medium">
                  Trades, healthcare, digital skills, re-entry
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Reporting</dt>
                <dd className="font-medium">Attendance, milestones, outcomes</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Model</dt>
                <dd className="font-medium">Board- and referral-friendly</dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              Our goal is simple: make it easier for you to connect people to
              training, see what happened, and report on it without needing
              five spreadsheets and three emails per learner.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Who we support alongside you
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Elevate sits in the middle — between the learner, the partner
              site, and the systems that fund or track their progress. We help
              all three talk to each other.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {AGENCIES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What we provide to boards & agencies
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We know you answer to policies, performance targets, and audits.
              We respect that. Our systems are built to help you stay
              compliant, not surprised.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {WHAT_WE_PROVIDE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-slate-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* REPORTING */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Reporting & documentation you can trust
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                No more guessing where a learner is in the process. Our systems
                track key moments and can provide clean summaries for your
                files, portals, and board meetings.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {REPORTING.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-900/95 p-5 text-sm text-slate-50 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                Board & agency onboarding
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                During onboarding, we map your reporting cycles, forms, and
                required data points to our system so we&apos;re not sending
                you a pile of PDFs you can&apos;t use.
              </p>
              <p className="mt-3 text-xs text-slate-200">
                That includes clarifying how referrals flow, how we signal
                risk/concern, and what success looks like in your language
                (credential, placement, retention, etc.).
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
              >
                Request Board / Agency Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Let&apos;s make training, reporting, and outcomes easier.
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              If you&apos;re responsible for helping people access training and
              employment, we want to be the partner who makes that easier for
              you — not harder.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?type=workforce-partner"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start Workforce Partner Intake
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              Schedule a Strategy Session
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            We are open to pilots, cohorts, MOUs, and deeper collaborations.
            Boards, agencies, coalitions, and re-entry programs are welcome.
          </p>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';

export const metadata = {
  title: 'Barber Apprenticeship Program | Elevate Connects Directory',
  description:
    'State-approved Barber Apprenticeship program with shop-based training, paid hours, and a clear path to licensure for Indiana learners, re-entry, and workforce clients.',
};

const barberHighlights = [
  'State-approved apprenticeship with real shop-based training',
  'Earn while you learn with paid on-the-job hours',
  'Licensure-focused curriculum aligned to Indiana requirements',
  'Business skills: client retention, scheduling, retail, and shop management',
  'Career coaching and wraparound support services',
];

const whoItServes = [
  'Young adults ready to start a skilled trade',
  'Career changers looking for a licensed, creative profession',
  'Re-entry / justice-involved individuals rebuilding their careers',
  'Workforce clients referred by WorkOne, WRG, and community partners',
];

const fundingOptions = [
  'Workforce Ready Grant (WRG) – where eligible',
  'WIOA & workforce board funding – where approved',
  'Registered Apprenticeship / On-the-Job Training (OJT) structures',
  'Employer-sponsored apprenticeships in partner barbershops',
  'Payment plans or self-pay options when funding is not available',
];

const outcomes = [
  'Barber licensure exam readiness',
  'Documented apprenticeship hours in approved shops',
  'Shop-ready skills: fades, shaves, styling, sanitation, and customer service',
  'Pathways to employment, chair rental, or shop ownership',
];

export default function BarberApprenticeshipPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              Barber Apprenticeship • Licensed Career Pathway
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Barber Apprenticeship Program
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Train inside real barbershops, earn while you learn, and build a
              licensed career in a high-demand, community-centered trade.
              Elevate for Humanity connects learners, barbershops, and workforce
              boards to create a clear, compliant path from{' '}
              <span className="font-semibold">
                first clip to license in hand
              </span>
              .
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?program=barber-apprenticeship"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply for Barber Apprenticeship
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Talk to an Advisor
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Ideal for learners, case managers, and shop owners who want a
              structured pathway to licensure with real-world training and
              workforce-aligned support.
            </p>
          </div>

          {/* Quick Facts Card */}
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-slate-900 px-5 py-5 text-sm text-slate-50 shadow-lg md:w-80">
            <h2 className="text-sm font-semibold text-white">
              Program Snapshot
            </h2>
            <dl className="mt-3 space-y-2 text-xs text-slate-100/90">
              <div className="flex justify-between">
                <dt className="text-slate-300">Pathway</dt>
                <dd className="font-medium">Barber Apprenticeship</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Format</dt>
                <dd className="font-medium">Shop-based + Classroom</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Typical Length</dt>
                <dd className="font-medium">12–18 months (varies by hours)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Location</dt>
                <dd className="font-medium">Partner barbershops in Indiana</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Schedule</dt>
                <dd className="font-medium">
                  Daytime, evening & weekend options
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              Funding and eligibility are determined with each learner and
              referring partner. Case managers and shop owners can coordinate
              directly with our team for details.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll learn / Who it's for */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What you&apos;ll learn
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This program combines hands-on shop experience with structured
              instruction to prepare you for the barber licensure exam and real
              clients in the chair.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {barberHighlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Who this program serves
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Elevate For Humanity is built for real life. We work with learners
              directly and through community partners who support people
              navigating barriers, transitions, and new career starts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {whoItServes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-slate-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Funding & Support */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Funding, support & case management
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We work directly with learners, barbershops, workforce boards,
                and community partners to braid funding and support services.
                Our goal is simple: reduce out-of-pocket costs and keep
                apprentices on track from day one to licensure.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {fundingOptions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Availability of specific funding sources may vary by county,
                provider approvals, and learner eligibility. Case managers can
                coordinate directly with our team to confirm options.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-900/95 p-5 text-sm text-slate-50 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                For case managers & workforce boards
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                We provide documentation to support:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-100">
                <li>• Enrollment verification and training plans</li>
                <li>• Attendance and participation reporting</li>
                <li>• Skill milestones and competency checklists</li>
                <li>• Credential / licensure exam completion updates</li>
                <li>• Employment and retention follow-up where applicable</li>
              </ul>
              <Link
                href="/partners"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
              >
                View Partner & Agency Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] md:items-center md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What you&apos;ll walk away with
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This apprenticeship is designed to move you from "interested in
              cutting hair" to a licensed professional with a plan. You will
              build technical skill, client confidence, and a roadmap for your
              next steps.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Apprenticeship, licensure & next steps
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Exact hour requirements and licensure processes are set by the
              state and licensing board. Elevate for Humanity and our training
              partners align curriculum and documentation to those requirements,
              and support learners as they navigate state forms, testing, and
              applications.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              During orientation, you&apos;ll review:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
              <li>• Required hours and time-in-program expectations</li>
              <li>• Shop placement and expectations for professionalism</li>
              <li>• Safety, sanitation, and client care standards</li>
              <li>• What happens if you need to pause or restart</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Ready to grow behind the chair?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Whether you&apos;re just getting started, coming home from a
              justice-involved setting, or changing careers, the Barber
              Apprenticeship Program gives you structure, support, and a clear
              path to a licensed, income-generating skill.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start My Barber Application
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View All Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Case managers, shop owners, and agencies can also contact us
            directly to discuss cohort planning, sponsorship, and referral
            pathways for your clients.
          </p>
        </div>
      </section>
    </main>
  );
}

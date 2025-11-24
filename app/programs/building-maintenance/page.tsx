import Link from "next/link";

export const metadata = {
  title: "Building Maintenance Technician Program | Elevate for Humanity",
  description:
    "Hands-on building maintenance training covering HVAC, plumbing, electrical, and facility systems with direct pathways to employment in property management and facilities.",
};

const buildingHighlights = [
  "Building systems: HVAC, plumbing, electrical, and mechanical basics",
  "Preventive maintenance, troubleshooting, and repair techniques",
  "Safety protocols, tools, and equipment operation",
  "Facility management and work order systems",
  "Career coaching and job placement with property management companies",
];

const whoItServes = [
  "Young adults seeking stable work in facilities and property management",
  "Career changers looking for hands-on technical roles",
  "Re-entry individuals rebuilding careers in the trades",
  "Workforce clients referred by WRG and community partners",
];

const fundingOptions = [
  "Workforce Ready Grant (WRG) – where eligible",
  "WIOA & workforce board funding – where approved",
  "Workforce grants and apprenticeship structures",
  "Support services for tools, transportation, and supplies",
  "Payment plans or self-pay options when funding is not available",
];

const outcomes = [
  "Technical competencies in building systems and maintenance",
  "Hands-on experience with real equipment and scenarios",
  "Safety certifications and tool proficiency",
  "Direct pathways to employment with property management and facilities companies",
];

export default function BuildingMaintenancePage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              Building Maintenance • Facilities Career Pathway
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Building Maintenance Technician Program
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Keep buildings running smoothly with hands-on training in HVAC,
              plumbing, electrical, and facility systems. Our Building
              Maintenance program prepares you for{" "}
              <span className="font-semibold">stable, in-demand roles in property management and facilities</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?program=building-maintenance"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply for Building Maintenance
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Talk to an Advisor
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Ideal for learners, case managers, and property managers who need
              trained maintenance technicians ready to work.
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
                <dd className="font-medium">Building Maintenance Tech</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Format</dt>
                <dd className="font-medium">Hands-On + Field Training</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Typical Length</dt>
                <dd className="font-medium">4–9 months</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Location</dt>
                <dd className="font-medium">Indianapolis, IN area</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Schedule</dt>
                <dd className="font-medium">Daytime & evening options</dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              Funding and eligibility are determined with each learner and
              referring partner. Case managers and property managers can
              coordinate directly with our team for details.
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
              This program covers building systems, preventive maintenance, and
              troubleshooting to prepare you for facilities and property
              management roles.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {buildingHighlights.map((item) => (
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
                We work directly with learners, property managers, workforce
                boards, and community partners to braid funding and support
                services. Our goal is simple: reduce out-of-pocket costs and
                keep students on track from day one to employment.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {fundingOptions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
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
                <li>• Technical competency checklists and skill assessments</li>
                <li>• Safety certification completion updates</li>
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
              This program is designed to move you from "interested in
              maintenance" to a job-ready technician with hands-on experience
              and employer connections.
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
              Certification & next steps
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Upon completion, you&apos;ll have documented competencies in
              building systems and maintenance. Our program includes safety
              training and prepares you for entry-level technician roles.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              During orientation, you&apos;ll review:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
              <li>• Technical competency requirements and safety protocols</li>
              <li>• Hands-on training expectations and equipment use</li>
              <li>• Safety certifications and tool proficiency standards</li>
              <li>• Job placement support and property management connections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Ready to start your facilities career?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Whether you&apos;re just getting started, changing careers, or
              coming home from a justice-involved setting, the Building
              Maintenance Program gives you structure, support, and a clear path
              to stable employment in property management and facilities.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?program=building-maintenance"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start My Building Maintenance Application
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View All Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Case managers, property managers, and agencies can also contact us
            directly to discuss cohort planning, sponsorship, and referral
            pathways for your clients.
          </p>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";
import ProgramLandingPage from "@/components/templates/ProgramLandingPage";

export const metadata: Metadata = {
  title: "HVAC Technician Training | Elevate for Humanity",
  description: "Hands-on HVAC training with EPA 608 certification prep. Connect to employers hiring in Marion County through workforce grants and employer sponsors.",
  openGraph: {
    title: "HVAC Technician Training | Elevate for Humanity",
    description: "Hands-on HVAC training with EPA 608 certification prep and job placement support.",
    images: ["/images/programs-new/program-16.jpg"],
    type: "website",
  },
};

export default function HVACTechnicianPage() {
  return (
    <ProgramLandingPage
      category="Skilled Trades • High-Demand"
      title="HVAC Technician Training"
      description="Hands-on training in heating, ventilation, and air conditioning systems with direct connections to employers that are hiring in Marion County."
      duration="4–9 months"
      fundingTags={["Workforce Grants", "Employer Sponsors"]}
      format="Lab + Field"
      imageSrc="/images/programs-new/program-16.jpg"
      imageAlt="Learners working with HVAC equipment"
      programSlug="hvac-technician"
      whoThisIsFor={{
        description: "Adults who want a skilled trade career with stable income, including career changers and re-entry talent ready for a fresh start.",
        bullets: [
          "No prior HVAC experience required",
          "Comfortable with hands-on, technical work",
          "Willing to pass employer screenings and show up consistently",
        ],
      }}
      whatYouLearn={[
        "HVAC safety, tools, and core systems",
        "Residential and light commercial troubleshooting",
        "EPA 608 certification prep (required for refrigerant handling)",
        "Customer communication and soft skills",
        "How to prepare for employer interviews and certifications",
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Apply with Elevate",
          description: "We review your goals and barriers.",
        },
        {
          step: 2,
          title: "Get matched to funding",
          description: "WRG, WIOA, or employer sponsors.",
        },
        {
          step: 3,
          title: "Start training",
          description: "You attend lab + field with partner schools.",
        },
        {
          step: 4,
          title: "Connect to employers",
          description: "We help with interviews and placement.",
        },
      ]}
      fundingOptions={[
        "Workforce Ready Grants",
        "WIOA funding (partner workforce boards)",
        "Employer-sponsored training pathways",
        "Barrier support (transportation, childcare referrals, etc.)",
      ]}
      fundingNote="Elevate For Humanity is the front door – we help you navigate approvals with WorkOne, EmployIndy, and partner programs so you're not doing it alone."
      schedule="Flexible scheduling with day and evening options. Hands-on lab work combined with field experience."
      whatHappensAfter="Upon completion, you'll be connected to HVAC contractors and service companies hiring in the Indianapolis area. Many graduates start as apprentices or junior technicians."
    />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              HVAC Technician • Skilled Trade Pathway
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              HVAC Technician Program
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Master heating, cooling, and refrigeration systems in a
              high-demand trade. Our HVAC program combines hands-on lab
              training, field experience, and EPA certification prep to prepare
              you for{" "}
              <span className="font-semibold">technician roles with strong earning potential</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?program=hvac-technician"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply for HVAC Program
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Talk to an Advisor
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Ideal for learners, case managers, and HVAC contractors who need
              trained, certified technicians ready to work.
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
                <dd className="font-medium">HVAC Technician</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Format</dt>
                <dd className="font-medium">Lab + Field Training</dd>
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
              referring partner. Case managers and contractors can coordinate
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
              This program covers heating, cooling, and refrigeration systems
              with hands-on training to prepare you for real-world HVAC work
              and EPA certification.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {hvacHighlights.map((item) => (
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
                We work directly with learners, HVAC contractors, workforce
                boards, and community partners to braid funding and support
                services. Our goal is simple: reduce out-of-pocket costs and
                keep students on track from day one to certification.
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
                <li>• EPA certification exam completion updates</li>
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
              This program is designed to move you from "interested in HVAC" to
              a certified, job-ready technician with hands-on experience and
              employer connections.
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
              Upon completion, you&apos;ll be eligible to sit for the EPA 608
              certification exam (required for refrigerant handling). Our
              program aligns with EPA requirements and includes exam prep to
              help you pass on your first attempt.
            </p>
            <p className="mt-3 text-xs text-slate-600">
              During orientation, you&apos;ll review:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
              <li>• Technical competency requirements and safety protocols</li>
              <li>• Lab and field training expectations</li>
              <li>• EPA 608 certification exam registration process</li>
              <li>• Job placement support and contractor connections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Ready to build your HVAC career?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Whether you&apos;re just getting started, changing careers, or
              coming home from a justice-involved setting, the HVAC Technician
              Program gives you structure, support, and a clear path to a
              skilled, high-demand trade with strong earning potential.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?program=hvac-technician"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start My HVAC Application
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View All Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Case managers, HVAC contractors, and agencies can also contact us
            directly to discuss cohort planning, sponsorship, and referral
            pathways for your clients.
          </p>
        </div>
      </section>
    </main>
  );
}

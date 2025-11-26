// app/programs/cdl/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDL Training Program - Commercial Driver's License",
  description: "CDL training program with partner schools. Get your Commercial Driver's License and start a transportation career. WIOA-funded with job placement support.",
  keywords: ["CDL training", "commercial drivers license", "truck driving", "transportation career", "WIOA CDL program"],
  openGraph: {
    title: "CDL Training Program | Elevate for Humanity",
    description: "CDL training program. Get your Commercial Driver's License and start a transportation career. WIOA-funded.",
    images: ["/images/programs-new/program-18.jpg"],
    type: "website",
  },
};

export default function CdlProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Transportation Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            CDL & Transportation Pathways
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            Elevate for Humanity learners with CDL training partners and transportation
            employers, while helping coordinate funding, readiness, and job placement.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              Length varies · Range + Road
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Partner CDL schools · Elevate coordination
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Workforce funding & employer sponsorship aligned
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Start My Application
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition"
            >
              Talk With Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* WHO & SNAPSHOT */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Who this is for
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                For people who want to be on the move and earn while they drive.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                CDL & transportation pathways can be a fit if you:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Enjoy driving and traveling</li>
                <li>• Want a career with clear, measurable steps</li>
                <li>• Are comfortable with safety rules and regulations</li>
                <li>• Are interested in regional or local routes (depending on the employer)</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                Elevate does not operate trucks or run the training range—instead,
                we coordinate with trusted CDL programs and employers.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Program snapshot
              </p>
              <ul className="space-y-1.5">
                <li>• <span className="font-semibold">Length:</span> Typically a few weeks to a few months</li>
                <li>• <span className="font-semibold">Format:</span> Classroom, yard/range practice, and road time</li>
                <li>• <span className="font-semibold">Location:</span> Partner CDL schools</li>
                <li>• <span className="font-semibold">Support:</span> Elevate onboarding, paperwork help, and employment connections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES & FUNDING (short) */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.5fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                How Elevate fits
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Elevate is the connector between you, training, and employers.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                We help you sort through options, funding, and employer expectations:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Explore if CDL is truly a good fit for your life</li>
                <li>• Connect with training providers and funding where available</li>
                <li>• Coordinate with employers who hire new drivers</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                Licensing, testing, and final hiring decisions always follow state and employer requirements.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Funding & next steps
              </p>
              <p className="mb-3">
                CDL pathways may be supported through workforce funding, employer
                sponsorship, or direct pay options. We review what fits your situation.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
              >
                Start My Application
              </Link>
              <p className="mt-3 text-xs text-slate-400">
                Case managers can contact us to coordinate referrals and expectations up front.
              </p>
              <Link
                href="/partners"
                className="mt-2 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                Partner with Elevate →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="rounded-3xl border border-orange-400/50 bg-gradient-to-r from-orange-600/30 via-slate-900 to-slate-950 px-6 py-10 md:px-10 md:py-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to talk about CDL or transportation?
              </h2>
              <p className="mt-3 text-sm text-slate-100">
                We&apos;ll help you see if driving is a realistic and sustainable
                option for your life, and if so, what your next step should be.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition"
              >
                Start My Application
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition"
              >
                View all programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

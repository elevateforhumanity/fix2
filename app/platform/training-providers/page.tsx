// app/platform/training-providers/page.tsx

import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Providers - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Training Providers - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/programs-new/program-28.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Training Providers - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function TrainingProvidersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
          Platform • For Training Providers
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          For Training Providers – turn your programs into a funded workforce
          hub.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-200">
          Elevate For Humanity partners with schools, academy owners, and
          community-based organizations who want to offer{" "}
          <span className="font-semibold">
            high-quality, funded training programs
          </span>{" "}
          without building all of the infrastructure alone. You focus on
          teaching and hands-on labs; Elevate supports the enrollment flow,
          portals, and compliance backbone.
        </p>

        {/* 3-column highlights */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">
              You bring the expertise.
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              Barber, beauty, medical, HVAC, CDL, building tech, IT, and more.
              If you have a strong program and real-world instructors, you are
              already doing the hard part.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">
              We bring the ecosystem.
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              Student, employer, and partner portals; program catalog; funded
              pathway configuration; progress and attendance tracking; and
              workforce reporting.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">
              Together, we scale impact.
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              More students, more completions, more placement, and stronger
              employer relationships—without losing your identity as a local,
              trusted training provider.
            </p>
          </div>
        </section>

        {/* How it works for providers */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">
            How Elevate works with training partners
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Every provider is different, but the pattern is the same: Elevate
            takes care of the{" "}
            <span className="font-semibold">system side</span> so you can stay
            focused on learners and instruction.
          </p>
          <ol className="mt-4 space-y-3 text-sm text-slate-200">
            <li>
              <span className="font-semibold">1. Program mapping.</span> We sit
              down with you to map out your programs: length, schedule,
              admission requirements, credentialing partners, and employer
              demand.
            </li>
            <li>
              <span className="font-semibold">2. Platform setup.</span> Your
              programs are added to the Elevate directory with clear pathways,
              funding tags (where applicable), and linked portals for students
              and staff.
            </li>
            <li>
              <span className="font-semibold">3. Cohort and enrollment flow.</span>{" "}
              We help organize cohorts, seat counts, and referral flow from
              workforce boards, community partners, and employers.
            </li>
            <li>
              <span className="font-semibold">
                4. Attendance and progress tracking.
              </span>{" "}
              Your instructors record attendance and key milestones inside the
              Partner Portal; Elevate monitors data quality and supports
              reporting.
            </li>
            <li>
              <span className="font-semibold">5. Outcomes & reporting.</span> We
              generate clean reports on completions, credentials, and employment
              outcomes that support your own grants and future partnerships.
            </li>
          </ol>
        </section>

        {/* White-label / branded option */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">
            White-label and branded implementations
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Some partners are happy to plug into the Elevate brand. Others need
            a{" "}
            <span className="font-semibold">
              customized, white-label version
            </span>{" "}
            that matches their existing school or organization identity. We can
            support both:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>
              • Branded domain and logo (your-school.org, your colors, your
              imagery).
            </li>
            <li>
              • Your program catalog and instructors, with Elevate&apos;s
              portals doing the heavy lifting in the background.
            </li>
            <li>
              • Shared or separate workforce reporting, depending on grant and
              board requirements.
            </li>
          </ul>
        </section>

        {/* Call-to-action */}
        <section className="mt-10 rounded-2xl border border-emerald-500/40 bg-red-500/5 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Ready to explore partnering with Elevate?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-100">
            Whether you&apos;re a school, academy, church, nonprofit, or
            employer with in-house training, Elevate can help you turn that
            work into a structured pathway with portals, documentation, and
            workforce alignment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition"
            >
              Schedule a partner conversation
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-emerald-400/60 text-orange-300 hover:bg-emerald-400/10 transition"
            >
              View example funded programs
            </Link>
          </div>
          <p className="mt-3 text-[11px] text-slate-300">
            We work with partners at different stages: some are just getting
            started, others already have ETPL or apprenticeship approvals and
            want to grow. The first step is a conversation.
          </p>
        </section>
      </div>
    </main>
  );
}

// app/platform/workforce-boards/page.tsx

import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workforce Boards - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Workforce Boards - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workforce Boards - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function WorkforceBoardsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
          Platform • For Workforce Boards & Funders
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          For Workforce Boards – a funded training ecosystem you can actually see.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-200">
          Elevate For Humanity is built for the realities of WIOA, WRG, JRI, and
          local workforce initiatives. We sit in the middle of students,
          training providers, and employers so you can clearly see who is
          enrolled, who is progressing, who completed, and who really landed a
          job.
        </p>

        {/* 3 key pains */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">Too many spreadsheets?</h2>
            <p className="mt-2 text-sm text-slate-200">
              We replace scattered attendance sheets, sign-in forms, and email
              chains with one shared system that everyone updates in real time.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">Hard to see outcomes?</h2>
            <p className="mt-2 text-sm text-slate-200">
              Enrollment, participation, completions, credentials, and
              employer engagement are all visible in one place instead of five
              different portals.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold">Need to move quickly?</h2>
            <p className="mt-2 text-sm text-slate-200">
              We stand up pathways, cohorts, and employer placements fast, so
              you can respond to new funding opportunities and community needs
              without starting from scratch.
            </p>
          </div>
        </section>

        {/* How EFH plugs into a board */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">
            A live picture of your region's training activity
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Instead of guessing what is happening inside each program, Elevate
            gives you a clear picture of the entire ecosystem. We connect:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>• Students moving through funded pathways and apprenticeships.</li>
            <li>• Training providers delivering hands-on instruction.</li>
            <li>• Employers offering OJT, WEX, and advancement opportunities.</li>
            <li>• Case managers, re-entry navigators, and community partners.</li>
          </ul>
        </section>

        {/* Metrics / analytics angle */}
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">The metrics you care about</h2>
          <p className="text-sm sm:text-base text-slate-200">
            Every board and funder has different forms and reporting
            requirements, but the core questions are the same:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li>• Who enrolled? From which referral sources?</li>
            <li>• Who is actively attending and participating?</li>
            <li>• Who completed? Who earned a credential or license?</li>
            <li>• Who was placed? Where are they working, and at what wage?</li>
            <li>• Which employers are engaged and hiring again?</li>
          </ul>
          <p className="mt-3 text-sm sm:text-base text-slate-200">
            Elevate&apos;s Workforce Analytics view is designed to answer these
            questions quickly so you can walk into board meetings and oversight
            conversations prepared.
          </p>
        </section>

        {/* Connection to the analytics page you already have */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Real-time dashboards, audit-ready data
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Under the hood, the same system that supports students, employers,
            and training partners also feeds the{" "}
            <Link
              href="/platform/workforce-analytics"
              className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200"
            >
              Workforce Analytics
            </Link>{" "}
            view. That means:
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-200">
            <li>• Less time cleaning data and more time acting on it.</li>
            <li>• A clearer story to tell in grant renewals and RFP responses.</li>
            <li>• Better alignment between programs, employers, and outcomes.</li>
          </ul>
        </section>

        {/* Call to action for boards */}
        <section className="mt-10 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Bring Elevate For Humanity to your city or region
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-100">
            We partner with workforce boards, city and county agencies,
            foundations, and anchor employers to build hubs that reflect the
            community and the local labor market. The technology is already
            built; we configure it to your priorities.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition"
            >
              Talk with Elevate about your board
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 transition"
            >
              View current funded programs
            </Link>
          </div>
          <p className="mt-3 text-[11px] text-slate-300">
            We can start small with one pathway or pilot neighborhood, then grow
            into a broader ecosystem as we prove outcomes together.
          </p>
        </section>
      </div>
    </main>
  );
}

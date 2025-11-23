// app/programs/workforce-readiness/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workforce Readiness & Re-Entry Program",
  description: "Workforce readiness and re-entry program. Coaching, workshops, and support to prepare for training or employment. Re-entry friendly, 4-12 weeks.",
  keywords: ["workforce readiness", "re-entry program", "job readiness", "career coaching", "second chance employment"],
  openGraph: {
    title: "Workforce Readiness & Re-Entry Program | Elevate for Humanity",
    description: "Workforce readiness and re-entry program. Coaching and support to prepare for training or employment.",
    images: ["/images/homepage/workforce-readiness.png"],
    type: "website",
  },
};

export default function WorkforceReadinessProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Readiness & Re-Entry Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Workforce Readiness & Re-Entry Program
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            A short-term coaching and workshop series that helps adults and
            re-entry talent reset, rebuild, and prepare for training or direct
            employment with real support.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              4–12 weeks · Cohorts & 1:1 coaching
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Re-entry friendly · Barrier-focused
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

      {/* WHO & WHAT */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Who this is for
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Designed for people who are "ready for a change" but not sure where to start.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                This pathway is especially helpful if you:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Are re-entering after incarceration or a justice-involved situation</li>
                <li>• Are restarting after a setback or long gap in work</li>
                <li>• Need help organizing your next steps</li>
                <li>• Want a safe space to be honest about barriers without being judged</li>
              </ul>
              <p className="mt-3 text-sm text-slate-300">
                We focus on dignity, accountability, and real resources—not shame.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                What the program includes
              </p>
              <ul className="space-y-1.5">
                <li>• Group sessions focused on mindset, planning, and accountability</li>
                <li>• 1:1 coaching check-ins with Elevate staff</li>
                <li>• Support navigating barriers (transportation, ID, etc.)</li>
                <li>• A concrete next-step plan: training, employment, or both</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              What you'll work on
            </p>
            <h2 className="mt-2 text-xl font-semibold md:text-2xl">
              Real-life readiness: personal, professional, and practical.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Personal Reset
              </h3>
              <ul className="space-y-1.5">
                <li>• Mindset & identity after setbacks</li>
                <li>• Rebuilding confidence</li>
                <li>• Creating realistic short-term goals</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Professional Readiness
              </h3>
              <ul className="space-y-1.5">
                <li>• How to talk about gaps or records professionally</li>
                <li>• Workplace expectations & soft skills</li>
                <li>• Choosing realistic training or jobs</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                Practical Barriers
              </h3>
              <ul className="space-y-1.5">
                <li>• Connecting with community resources</li>
                <li>• Building a schedule that supports success</li>
                <li>• Planning transportation & childcare around steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER & CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                For agencies & re-entry partners
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                A soft landing and a clear next step for your participants.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate&apos;s Workforce Readiness program gives people time and
                structure to stabilize, reflect, and decide on the right path
                without losing connection to your agency.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Short-term engagement instead of long-term "wait and see"</li>
                <li>• Documented progress and participation</li>
                <li>• A program that can sit before training, employment, or both</li>
              </ul>
              <Link
                href="/partners"
                className="mt-3 inline-block text-xs font-semibold text-orange-300 hover:text-orange-200"
              >
                View partner options →
              </Link>
            </div>

            <div className="rounded-3xl border border-orange-400/50 bg-gradient-to-r from-orange-600/20 via-slate-900 to-slate-950 p-5 text-sm text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-200 mb-2">
                Next step
              </p>
              <p className="mb-3">
                If you&apos;re not sure where to begin, this program may be your
                first stop. We can help you reset, then move into training or work.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition"
              >
                Start My Application
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

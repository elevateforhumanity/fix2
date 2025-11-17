// app/employers/page.tsx
import Link from "next/link";

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            For Employers & Hiring Managers
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Build a Talent Pipeline with Elevate For Humanity™
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            We partner with employers to connect you with candidates who&apos;ve
            completed training, understand expectations, and have been supported
            through real-life barriers.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              Healthcare · Trades · Transportation · Facilities
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Start a hiring conversation
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ELEVATE */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h2 className="text-sm font-semibold mb-2 text-orange-300">
                Pre-screened Candidates
              </h2>
              <p>
                Candidates have completed or are completing training and have
                had expectations clearly explained before they&apos;re in front of you.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h2 className="text-sm font-semibold mb-2 text-orange-300">
                Barrier-Aware Support
              </h2>
              <p>
                We work with learners on transportation, communication, and soft
                skills so your supervisors aren&apos;t alone in managing challenges.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <h2 className="text-sm font-semibold mb-2 text-orange-300">
                Workforce & Community Alignment
              </h2>
              <p>
                Show community impact while filling roles—our documentation and
                reporting help with stories, grants, and board updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

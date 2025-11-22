// app/platform/page.tsx

import Link from "next/link";

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="px-6 py-16 sm:px-10 lg:px-24">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-emerald-400 uppercase">
              Elevate For Humanity Platform
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              One workforce platform connecting{" "}
              <span className="text-emerald-400">
                students, employers, and workforce boards
              </span>{" "}
              in a funded training ecosystem.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-200">
              Elevate For Humanity is more than a school. It is a SaaS platform
              that manages funded career pathways, WIOA and workforce grants,
              OJT and internships, apprenticeships, and employer upskilling
              programs in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition"
              >
                Book a platform demo
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-slate-600 hover:border-emerald-400 hover:text-emerald-300 transition"
              >
                Explore funded programs
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400 max-w-md">
              Built for WIOA providers, workforce boards, employers, and
              community-based organizations that need a compliant, turnkey way
              to launch and manage training at scale.
            </p>
          </div>

          {/* Hero "screenshot" block – replace image path with a real screenshot later */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400">
                EFH • Student & Employer View
              </span>
            </div>
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Sample dashboard
                  </p>
                  <p className="text-sm font-semibold">
                    Medical Assistant | WIOA / WRG Eligible
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 border border-emerald-500/40">
                    68% course progress
                  </span>
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sky-300 border border-sky-500/40">
                    2 upcoming classes
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Overall completion</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <p className="text-slate-400 mb-1">Student view</p>
                    <p className="font-semibold text-xs">
                      See classes, hours, certificates, and case-manager notes
                      in one login.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <p className="text-slate-400 mb-1">Employer view</p>
                    <p className="font-semibold text-xs">
                      Track OJT hours, performance, and grant eligibility for
                      each hire.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  *Replace this block later with real screenshots of your
                  portal UI.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Portals */}
      <section className="px-6 py-12 sm:px-10 lg:px-24 border-t border-slate-800 bg-slate-950/80">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            One platform. Four portals. Everyone stays on the same page.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl">
            Elevate For Humanity connects the people who make workforce programs
            work: students, employers, training providers, and workforce boards.
            Each portal is role-based, but all data lives in one secure system.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href="/platform/student-portal"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-emerald-400/70 hover:bg-slate-900/70 transition"
            >
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Student Portal
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Funded training, clear next steps.
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Students see their programs, class schedule, assignments,
                attendance, and certificates in one place—along with funding
                status, case-manager notes, and next steps after graduation.
              </p>
              <p className="mt-3 text-xs text-emerald-300 group-hover:underline">
                View details →
              </p>
            </Link>

            <Link
              href="/platform/employer-portal"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-emerald-400/70 hover:bg-slate-900/70 transition"
            >
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Employer Portal
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                OJT, WEX, apprenticeships, and upskilling in one login.
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Employers can request talent, track OJT/WEX hours, document
                supervision, and see which grants or wage reimbursements each
                placement is eligible for.
              </p>
              <p className="mt-3 text-xs text-emerald-300 group-hover:underline">
                View details →
              </p>
            </Link>

            <Link
              href="/platform/partner-portal"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-emerald-400/70 hover:bg-slate-900/70 transition"
            >
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Training Provider / Partner Portal
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Hands-on partners, compliance handled.
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Schools and program holders focus on instruction while Elevate
                manages enrollment flow, funding documentation, attendance,
                progress tracking, and reporting requirements.
              </p>
              <p className="mt-3 text-xs text-emerald-300 group-hover:underline">
                View details →
              </p>
            </Link>

            <Link
              href="/platform/workforce-analytics"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-emerald-400/70 hover:bg-slate-900/70 transition"
            >
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Workforce Boards & Admin
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Real-time outcomes for WIOA, WRG, JRI, and local initiatives.
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                View completions, credentials, employment outcomes, and employer
                engagement across all programs. Export the reports you need for
                state and federal partners in minutes, not weeks.
              </p>
              <p className="mt-3 text-xs text-emerald-300 group-hover:underline">
                View details →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-12 sm:px-10 lg:px-24 border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            How Elevate For Humanity works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl">
            We combine a funded training directory, a learning experience
            platform, and employer services into one ecosystem that can be
            replicated in any city or region.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Step 1
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Map funding + programs
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                We onboard your funded programs—WIOA, WRG, JRI, apprenticeships,
                employer-paid training—and configure eligibility rules,
                locations, schedules, and seat capacity.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Step 2
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Launch student + employer portals
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Students apply for funded training, case managers track progress
                and documentation, and employers request candidates or upskilling
                for current staff—all inside the platform.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                Step 3
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Report outcomes with confidence
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Administrators see completions, credentials, employment, and
                employer engagement in real time—ready for board reports, grant
                renewals, and state compliance reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & security */}
      <section className="px-6 py-12 sm:px-10 lg:px-24 border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Built for compliance-driven workforce partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl">
            Elevate For Humanity is designed around the realities of WIOA and
            workforce funding—not retrofitted from a generic course platform.
            We align with ETPL standards, apprenticeship documentation, and
            employer agreements while keeping the experience simple for students
            and staff.
          </p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Role-based access for students, employers, partners, and admins
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Audit-ready records of enrollments, attendance, progress, and
              credentials
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Support for OJT, WEX, JRI, and apprenticeship pathways
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Configurable for new programs, new cities, and new employer
              partners
            </li>
          </ul>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition"
            >
              Talk with Elevate about launching the platform in your region
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// app/partners/workforce/page.tsx
import Link from "next/link";

export default function WorkforcePartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-500/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <nav className="mb-6 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-300">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-slate-200">
              Workforce &amp; Case Manager Partners
            </span>
          </nav>

          <div className="grid gap-10 md:grid-cols-[1.6fr,1.3fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                For workforce boards, re-entry, and community partners
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                A turnkey training and placement ecosystem you can plug your
                clients into.
              </h1>
              <p className="mt-4 text-sm text-slate-200 sm:text-base max-w-xl">
                Elevate For Humanity aligns with{" "}
                <span className="font-semibold text-emerald-300">
                  WIOA, re-entry, and state workforce goals
                </span>{" "}
                by providing funded training pathways, barrier-aware support,
                and direct employer connections — all under one roof.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-[11px]">
                <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  ETPL-aligned programs (where approved)
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-200">
                  Work-based learning (OJT, WEX, apprenticeships)
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-200">
                  Outcomes & reporting for boards and funders
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
                >
                  Refer a client or cohort
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
                >
                  Request a partner meeting
                </Link>
              </div>

              <p className="mt-4 text-[11px] text-slate-500 max-w-lg">
                We can align with your local board policies, documentation, and
                reporting needs. Indiana-focused with the ability to expand as
                approvals are added.
              </p>
            </div>

            {/* Quick stats / tiles */}
            <div className="grid gap-4 text-xs text-slate-200 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h2 className="text-sm font-semibold text-white mb-2">
                  Priority sectors
                </h2>
                <ul className="space-y-1">
                  <li>• Healthcare (CNA, MA, Phlebotomy)</li>
                  <li>• Skilled trades (HVAC, Building Maintenance)</li>
                  <li>• Transportation (CDL, Forklift)</li>
                  <li>• Office &amp; customer service pathways</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h2 className="text-sm font-semibold text-white mb-2">
                  Designed for:
                </h2>
                <ul className="space-y-1">
                  <li>• WIOA adults and dislocated workers</li>
                  <li>• SNAP / TANF participants</li>
                  <li>• Justice-involved / re-entry</li>
                  <li>• Youth and opportunity youth (where aligned)</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h2 className="text-sm font-semibold text-white mb-2">
                  Support ecosystem
                </h2>
                <ul className="space-y-1">
                  <li>• Case conferencing and warm handoffs</li>
                  <li>• Attendance and progress updates</li>
                  <li>• Barrier navigation and referrals</li>
                  <li>• Job placement and retention support</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <h2 className="text-sm font-semibold text-white mb-2">
                  Reporting & outcomes
                </h2>
                <ul className="space-y-1">
                  <li>• Enrollment and completion tracking</li>
                  <li>• Industry-recognized credentials (where applicable)</li>
                  <li>• Employment and wage outcomes (where shared)</li>
                  <li>• Stories and impact for boards and funders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS FOR PARTNERS */}
      <section className="border-b border-slate-800 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
          <h2 className="text-2xl font-semibold text-white text-center mb-2">
            How partnering with Elevate works
          </h2>
          <p className="text-sm text-slate-300 text-center max-w-3xl mx-auto mb-8">
            We keep things simple: clear pathways, realistic expectations, and
            communication that makes life easier for case managers — not harder.
          </p>

          <div className="grid gap-6 md:grid-cols-4 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <div className="mb-3 flex items-center justify-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                  1
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-white">
                Align on pathways
              </h3>
              <p className="text-slate-300 text-xs">
                We review your priority sectors, populations, and funding
                streams, then align them with specific programs.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <div className="mb-3 flex items-center justify-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                  2
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-white">
                Set referral flow
              </h3>
              <p className="text-slate-300 text-xs">
                We agree on how referrals come in, how quickly we respond, and
                what information you need back.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <div className="mb-3 flex items-center justify-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                  3
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-white">
                Train & support
              </h3>
              <p className="text-slate-300 text-xs">
                Learners get instruction, coaching, and barrier navigation while
                you receive updates without chasing them down.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center">
              <div className="mb-3 flex items-center justify-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                  4
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-white">
                Place & report
              </h3>
              <p className="text-slate-300 text-xs">
                We move learners into work-based learning or jobs and provide
                documentation you can use for board and grant reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SNAPSHOT */}
      <section className="border-b border-slate-200 bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Priority pathways for your clients
          </h2>
          <p className="text-sm text-slate-600 text-center max-w-3xl mx-auto mb-8">
            We focus on sectors with strong demand, stackable credentials, and
            real advancement opportunities.
          </p>

          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Healthcare</h3>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• CNA</li>
                <li>• Medical Assistant</li>
                <li>• Phlebotomy (varies by partner)</li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                Strong demand, clear licensure steps, and options to stack into
                higher credentials.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Skilled trades &amp; facility</h3>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• HVAC Technician</li>
                <li>• Building Maintenance Technician</li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                Ideal for hands-on learners ready to move beyond general labor
                into trades with growth.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Transportation &amp; office</h3>
              <ul className="space-y-1 text-xs text-slate-700">
                <li>• CDL / Truck driving (with partners)</li>
                <li>• Forklift &amp; warehouse operations</li>
                <li>• Customer service / office pathways</li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                Fast entry into higher-wage roles with clear job openings in the
                region.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
            <p>
              We can tailor which pathways you make available based on your
              region, board approvals, and employer demand.
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-600"
            >
              View full program directory
            </Link>
          </div>
        </div>
      </section>

      {/* CASE MANAGER EXPERIENCE */}
      <section className="border-b border-slate-800 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr,1.5fr] text-sm">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-white">
                Make life easier for case managers.
              </h2>
              <p className="text-slate-300 mb-4">
                You should not have to chase down instructors to see if someone
                showed up, is participating, or is close to completing. Our
                platform and processes are built to keep you in the loop.
              </p>
              <ul className="space-y-2 text-slate-200">
                <li>• Clear referral intake and confirmation</li>
                <li>• Attendance and engagement signals</li>
                <li>• Progress snapshots you can paste into case notes</li>
                <li>• Communication that respects your time and caseload</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-xs text-slate-200">
              <h3 className="text-sm font-semibold text-white mb-2">
                Example communication flow
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold text-emerald-300">
                    • At referral:
                  </span>{" "}
                  we confirm receipt, eligibility checks, and target cohort
                  start.
                </li>
                <li>
                  <span className="font-semibold text-emerald-300">
                    • At enrollment:
                  </span>{" "}
                  we share start date, schedule, and program contact.
                </li>
                <li>
                  <span className="font-semibold text-emerald-300">
                    • Mid-program:
                  </span>{" "}
                  we can provide a brief update if you request it (attendance,
                  engagement, issues).
                </li>
                <li>
                  <span className="font-semibold text-emerald-300">
                    • At completion:
                  </span>{" "}
                  we confirm completion, credential (if any), and next steps for
                  placement.
                </li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                We can adjust this cadence based on your board or agency&apos;s
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-emerald-500/15 via-slate-950 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to explore a partnership or refer your first learners?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            We can start small with a single referral or co-design a cohort that
            aligns with your board, re-entry program, or community initiative.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Refer a client or cohort
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
            >
              Schedule a partner call
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            If you already have ETPL, OJT, or other agreements in place, we can
            align with them. If not, we can talk about what it would take.
          </p>
        </div>
      </section>
    </main>
  );
}

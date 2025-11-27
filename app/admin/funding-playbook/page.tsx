import Link from "next/link";

export const metadata = {
  title: "Funding Playbook | Elevate for Humanity",
  description:
    "Internal playbook for how Elevate for Humanity braids JRI, WRG, WEX, OJT, apprenticeship and philanthropy into programs and tuition.",
};

export default function FundingPlaybookPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin Only
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Funding Playbook – Elevate for Humanity
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This playbook helps you explain, on one page, how Elevate blends
            grants, employer funds, tuition, and philanthropy so people can
            actually participate. It is written in human language so case
            managers, employers, and boards can follow it.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/admin/document-center"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Document Center
            </Link>
            <Link
              href="/admin/dashboard-enhanced"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-5 text-xs">
          {/* OVERVIEW */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              1. Simple Explainer You Can Say Out Loud
            </h2>
            <p className="mt-1 text-[11px] text-slate-200">
              Elevate for Humanity is not just &quot;come take a class&quot;. It
              is a braided funding model. Here is the human way to explain it:
            </p>
            <p className="mt-2 text-[11px] text-slate-300">
              <span className="font-semibold">
                &quot;We start with you – your goals, your income, your
                situation.
              </span>{" "}
              Then we line up all the tools we have: JRI stipends, WRG, WEX,
              OJT, apprenticeships, employer sponsorships, and philanthropy.
              Some programs are fully covered, some are partially covered, and
              some are employer-paid. Our job is to braid those together so you
              can focus on learning and working, not just worrying about the
              bill.&quot;
            </p>
          </section>

          {/* FUNDING MECHANISMS GRID */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              2. Funding Tools & When We Use Them
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Use this as your quick-reference when building employer proposals
              or explaining options to case managers.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {/* JRI */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  Job Ready Indy (JRI)
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Soft skills + work readiness, often with stipends.</li>
                  <li>Can be required on-boarding for youth/young adults.</li>
                  <li>
                    Delivered via SCORM inside your LMS or employer/board
                    systems.
                  </li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: youth programs, on-ramps into CNA, trades, VITA,
                  customer service and more.
                </p>
              </div>

              {/* WRG */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  Workforce Ready Grant (WRG)
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Covers tuition for approved programs on ETPL.</li>
                  <li>Used when Elevate is listed as training provider.</li>
                  <li>
                    Usually routed through WorkOne / workforce boards, not
                    directly from student.
                  </li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: high-demand, state-prioritized programs (CNA,
                  trades, certain IT and business pathways).
                </p>
              </div>

              {/* WEX / OJT */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  WEX (Work Experience) & OJT (On-the-Job Training)
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Wage support while learner is placed with an employer.</li>
                  <li>Requires employer agreements and job descriptions.</li>
                  <li>Aligns with JRI / soft skills and core program content.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: &quot;earn while you learn&quot; placements in
                  partner employers who are willing to host learners.
                </p>
              </div>

              {/* Apprenticeship */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  Apprenticeships
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Registered or industry apprenticeships (eg. Barber).</li>
                  <li>Blends hours, on-the-job learning and instruction.</li>
                  <li>Employer pays wages; grants can support training costs.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: barber, trades, building tech, and any industry
                  where formal hours matter.
                </p>
              </div>

              {/* Employer & Student Pay */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  Employer and Student Pay
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Employers sponsor seats or custom cohorts.</li>
                  <li>Students use payment plans via Stripe.</li>
                  <li>Used when grants are not available for a pathway.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: microprograms, advanced add-ons, or employer-specific
                  training.
                </p>
              </div>

              {/* Philanthropy */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-orange-300">
                  Philanthropy & Flexible Support
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Selfish Inc. 501(c)(3) and other donors.</li>
                  <li>Covers things grants don&apos;t: fees, supplies, gaps.</li>
                  <li>Used case-by-case, not promised to everyone.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Good for: removing last-mile barriers so people can actually
                  show up (transportation, clothing, childcare help, etc.).
                </p>
              </div>
            </div>
          </section>

          {/* PROGRAM MAPPING */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              3. How We Talk About Programs + Funding Together
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              When you&apos;re on the phone or in a meeting, you need simple
              sentences. Examples:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-200">
              <li>
                <span className="font-semibold">CNA Pathway:</span> &quot;This
                program uses our CNA partner for hands-on training plus Elevate
                modules for soft skills. If you qualify, we can use WRG and JRI
                to cover tuition and give you some support while you train.&quot;
              </li>
              <li>
                <span className="font-semibold">
                  Barber Apprenticeship Pathway:
                </span>{" "}
                &quot;You&apos;ll be in a real shop earning hours and income.
                Milady covers theory, Elevate runs the apprenticeship support
                course, and we look at WEX/OJT or employer sponsorship where it
                fits.&quot;
              </li>
              <li>
                <span className="font-semibold">
                  Tax / VITA & Office Pathway:
                </span>{" "}
                &quot;You&apos;ll train using IRS VITA and Intuit tools, plus
                Elevate modules on customer service and office skills. JRI and
                WEX may apply depending on your age and situation.&quot;
              </li>
            </ul>
          </section>

          {/* NEXT STEPS / TODO LIST */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              4. Admin To-Do List for This Playbook
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              As you continue to build Elevate, keep this page updated:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-200">
              <li>
                For each program in your catalog, decide the{" "}
                <span className="font-semibold">default funding stack</span>{" "}
                (e.g. JRI + WRG, or Employer + WEX, etc.).
              </li>
              <li>
                Add quick phrases like the ones above so staff can speak clearly
                without guessing.
              </li>
              <li>
                Link directly to your Document Center items (ETPL approvals,
                MOUs, templates) as they&apos;re uploaded.
              </li>
              <li>
                Later: connect this page to your program data so &quot;funding
                flags&quot; (JRI/WRG/WEX/OJT) show up automatically.
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { HeroBanner } from "../components/HeroBanner";
import { ImageSection } from "../components/ImageSection";

export const metadata = {
  title: "Elevate for Humanity – Workforce Training & Earn-While-You-Learn",
  description:
    "A workforce training platform connecting grants, apprenticeships, and employer partners so learners can skill up without drowning in debt.",
};

export default function HomeV2Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroBanner
        mediaSlot="home_hero_primary"
        title="Training that actually leads to jobs, not just certificates."
        subtitle="Elevate for Humanity braids together grants, apprenticeships, employer partners, and AI-powered coaching so people can skill up, earn while they learn, and move into mortgage-paying careers."
        ctaLabel="Explore Programs & Funding"
        ctaHref="/programs"
        secondaryText="Already referred by WorkOne, WRG, JRI, or an employer? Let us know on your interest form so we can stack your funding."
      />

      <section className="border-y border-slate-800 bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-[11px] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              For Learners
            </p>
            <p className="text-xs text-slate-200">
              CNA • Barber Apprenticeship • HVAC • Building Tech • CDL • Tax &
              VITA • Business Support • and more.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              For Employers
            </p>
            <p className="text-xs text-slate-200">
              WEX, OJT, apprenticeships, and upskilling pathways that reduce
              hiring risk and strengthen your pipeline.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/enroll"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-semibold hover:bg-red-700"
            >
              Start Enrollment
            </Link>
            <Link
              href="/employer"
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-[10px] font-semibold text-slate-100 hover:bg-slate-800"
            >
              Employer Partnerships
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-2">
            <article>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-400">
                Learner Outcomes
              </p>
              <h2 className="mt-2 text-sm font-semibold md:text-base">
                Not just sign-ups. Real completions and job placements.
              </h2>
              <p className="mt-3 text-[11px] text-slate-300">
                Elevate is built around real outcomes: completions, credentials, and employer placements. Every program is designed with soft skills, technical skills, and real workplace experience woven together.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] text-slate-200">
                <li>Stacked funding so cost is not the main barrier</li>
                <li>Job Ready Indy (JRI) modules to build soft skills</li>
                <li>Work-based learning like WEX, OJT, and apprenticeships</li>
                <li>Ongoing coaching and employer feedback loops</li>
              </ul>
            </article>

            <article>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-400">
                For Employers
              </p>
              <h2 className="mt-2 text-sm font-semibold md:text-base">
                A single place to manage WEX, OJT, apprenticeships, and upskilling.
              </h2>
              <p className="mt-3 text-[11px] text-slate-300">
                Instead of juggling emails and spreadsheets, Elevate gives you a simple way to host trainees, track hours, and tap into subsidies where available. We help reduce your hiring risk while building a stronger talent pipeline.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] text-slate-200">
                <li>Pre-screened learners with JRI and foundational skills</li>
                <li>Support navigating WRG, WIOA, and other funding sources</li>
                <li>Templates for WEX/OJT/apprenticeship agreements</li>
                <li>Simple reporting on hours, participation, and outcomes</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 text-[11px]">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-400">
            How Funding Works
          </p>
          <h2 className="mt-2 text-sm font-semibold md:text-base">
            We braid together grants, employer sponsorship, and philanthropy so
            learners aren&apos;t blocked by tuition.
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-[11px] font-semibold">State & Local Grants</p>
              <p className="mt-1 text-[11px] text-slate-300">
                When available, we work with WRG, WIOA, and other local funds so
                eligible learners can reduce or eliminate tuition.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-[11px] font-semibold">Earn-While-You-Learn</p>
              <p className="mt-1 text-[11px] text-slate-300">
                Apprenticeships, WEX, and OJT placements help learners gain
                experience and income while they train.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-[11px] font-semibold">Philanthropy & Payment Plans</p>
              <p className="mt-1 text-[11px] text-slate-300">
                For programs that require tuition, we use targeted scholarships
                and simple payment plans so cost doesn&apos;t stop progress.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { HeroBanner } from "../components/HeroBanner";

export const metadata = {
  title: "Elevate for Humanity – 100% Free Career Training | Indianapolis",
  description:
    "FREE workforce training through WIOA, WRG, and JRI funding. CNA, Barber, HVAC, CDL, Medical Assistant programs. Real jobs, no debt. Located at Keystone Crossing, Indianapolis.",
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
              className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg hover:bg-orange-600"
            >
              Start Enrollment
            </Link>
            <Link
              href="/employers"
              className="rounded-lg border-2 border-white bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow-lg hover:bg-slate-100"
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

      {/* FEATURED PROGRAMS */}
      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
              Featured Programs
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Start Your Career in High-Demand Fields
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link href="/programs/cna" className="group">
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-orange-500">
                <div className="relative h-48">
                  <Image
                    src="/media/programs/cna-hd.jpg"
                    alt="CNA Training Program"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-orange-400">
                    Certified Nursing Assistant (CNA)
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    4-6 weeks • Clinical training • Job placement support
                  </p>
                  <p className="mt-3 text-xs font-semibold text-orange-400">
                    100% FREE with WIOA →
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-orange-500">
                <div className="relative h-48">
                  <Image
                    src="/media/programs/beauty-hd.jpg"
                    alt="Barber Apprenticeship Program"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-orange-400">
                    Barber Apprenticeship
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    12-18 months • Earn while you learn • State licensure
                  </p>
                  <p className="mt-3 text-xs font-semibold text-orange-400">
                    Funded through WRG →
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-tech" className="group">
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-orange-500">
                <div className="relative h-48">
                  <Image
                    src="/media/programs/hvac-hd.jpg"
                    alt="HVAC Technician Program"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-orange-400">
                    HVAC Technician
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    6-12 months • EPA certification • Apprenticeship ready
                  </p>
                  <p className="mt-3 text-xs font-semibold text-orange-400">
                    Multiple funding options →
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
              Success Stories
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Real People, Real Results
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/images/Success_Story_Portrait_Sarah_fc9f8fd1.png"
                    alt="Sarah M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Sarah M.</p>
                  <p className="text-xs text-slate-400">CNA Graduate</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                "I went from unemployed to working at a nursing home in 6 weeks. The WIOA funding covered everything, and the instructors really cared about us succeeding."
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/images/Success_Story_Portrait_Marcus_112c6bbd.png"
                    alt="Marcus J."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Marcus J.</p>
                  <p className="text-xs text-slate-400">Barber Apprentice</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                "I'm earning money while I learn. The apprenticeship gave me real shop experience, not just classroom theory. Already building my client base."
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="/images/Success_Story_Portrait_Lisa_9a59d350.png"
                    alt="Lisa T."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Lisa T.</p>
                  <p className="text-xs text-slate-400">Medical Assistant</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                "After years of retail, I finally have a career with benefits. The job placement support was incredible - I had 3 offers before I even graduated."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING SECTION */}
      <section className="bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
            How Funding Works
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            We braid together grants, employer sponsorship, and philanthropy so learners aren't blocked by tuition.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-lg font-semibold">State & Local Grants</p>
              <p className="mt-3 text-sm text-slate-300">
                When available, we work with WRG, WIOA, and other local funds so eligible learners can reduce or eliminate tuition.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-lg font-semibold">Earn-While-You-Learn</p>
              <p className="mt-3 text-sm text-slate-300">
                Apprenticeships, WEX, and OJT placements help learners gain experience and income while they train.
              </p>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-lg font-semibold">Philanthropy & Payment Plans</p>
              <p className="mt-3 text-sm text-slate-300">
                For programs that require tuition, we use targeted scholarships and simple payment plans so cost doesn't stop progress.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Your Career?
          </h2>
          <p className="mt-4 text-lg text-orange-50">
            Apply today and our team will help you find the right program and funding options.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg hover:bg-slate-50"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-orange-100">
            📍 Located at 8888 Keystone Crossing, Suite 1300, Indianapolis, IN 46240
          </p>
        </div>
      </section>
    </main>
  );
}

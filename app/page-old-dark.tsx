import Link from "next/link";
import {
  homeHeroImages,
  homeSecondaryStripImages,
  successStoryImages,
} from "@/lms-data/media";
import { HomeHero } from "@/components/media/HomeHero";
import { HomeProgramStrip } from "@/components/media/HomeProgramStrip";
import { SuccessStrip } from "@/components/media/SuccessStrip";

export const metadata = {
  title: "Elevate for Humanity | Career & Training Institute",
  description:
    "Elevate for Humanity connects high-demand training, apprenticeships, and workforce funding so people can earn while they learn and close their wage gap.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* 1️⃣ TOP HERO – pulls from your homeHeroImages in lms-data/media.ts */}
      <HomeHero images={homeHeroImages} />

      {/* 2️⃣ HOW ELEVATE WORKS – simple 3-step explainer */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                How Elevate Works
              </p>
              <h2 className="text-lg font-bold">
                Training + Funding + Employers in One Ecosystem
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Elevate is a workforce hub, not just an online course site. We
                connect training programs, workforce grants, and employers so
                people can earn while they learn, not just watch videos.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <Link
                href="/apply"
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Start Your Application
              </Link>
              <Link
                href="/programs"
                className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
              >
                Browse All Programs
              </Link>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-[11px] font-semibold text-slate-100">
                1. Choose a Pathway
              </p>
              <p className="mt-1 text-slate-300">
                CNA, Barber, Nails, HVAC, Building Tech, Culinary, Business EMS,
                IT Support, Customer Service, Tax/VITA and more — all mapped to
                real credentials and employers.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-[11px] font-semibold text-slate-100">
                2. Match to Funding
              </p>
              <p className="mt-1 text-slate-300">
                We braid JRI, WRG, WEX, OJT, apprenticeships, employer
                sponsorships, and philanthropy where possible so you are not
                carrying this alone.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-[11px] font-semibold text-slate-100">
                3. Learn, Work, and Elevate
              </p>
              <p className="mt-1 text-slate-300">
                Blend LMS modules, live labs, AI instructors, and employer
                experience so you actually move into a better job, not just get
                "another certificate."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ PROGRAM STRIP – visual pathways, uses your real program photos */}
      <HomeProgramStrip items={homeSecondaryStripImages} />

      {/* 4️⃣ FUNDING & SUPPORT SECTION */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="grid gap-4 md:grid-cols-[1.3fr,1.4fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                Funding & Wraparound Support
              </p>
              <h2 className="mt-1 text-lg font-bold">
                Built for People Who Have Been Overlooked, Not Overfunded
              </h2>
              <p className="mt-1 text-slate-300">
                Elevate is designed for people balancing kids, jobs, bills,
                trauma, and everything else life throws at them. We do not
                expect "perfect students." We expect real humans.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                <li>
                  Use JRI, WRG, WEX, OJT, and other grants where possible to
                  reduce tuition.
                </li>
                <li>
                  Connect to employers for earn-while-you-learn opportunities
                  when they exist.
                </li>
                <li>
                  Use state and national partners (IRS, Intuit, Milady, HSI,
                  CareerSafe, National Drug, etc.) for industry-standard
                  content.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-[11px] font-semibold text-slate-100">
                Who Elevate is For
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                <li>People starting over after job loss or life changes.</li>
                <li>
                  Parents and caregivers who need flexible, realistic options.
                </li>
                <li>
                  Youth and young adults figuring out their first real
                  credential and job path.
                </li>
                <li>
                  Employers who want to grow talent instead of only poaching
                  talent.
                </li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <Link
                  href="/apply"
                  className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  I'm a Student / Job Seeker
                </Link>
                <Link
                  href="/employer/dashboard"
                  className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
                >
                  I'm an Employer / Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ SUCCESS STORIES / IMPACT – photos from successStoryImages */}
      <SuccessStrip stories={successStoryImages} />

      {/* 6️⃣ AI INSTRUCTORS + LMS EXPERIENCE STRIP */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="grid gap-4 md:grid-cols-[1.4fr,1.3fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                LMS + AI Support
              </p>
              <h2 className="mt-1 text-lg font-bold">
                Not Just Videos – A Real Learning System
              </h2>
              <p className="mt-1 text-slate-300">
                Elevate&apos;s LMS connects content from credential partners,
                your local instructors, and AI instructor assistants that stay
                inside the rules you set.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                <li>Program-specific AI instructors for each pathway.</li>
                <li>
                  SCORM-ready courses like Job Ready Indy (JRI) within your LMS.
                </li>
                <li>
                  Integration space for Milady, HSI, CareerSafe, National Drug,
                  Intuit, IRS Link & Learn, and more.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-[11px] font-semibold text-slate-100">
                Explore the LMS Experience
              </p>
              <ul className="mt-2 space-y-1 text-slate-300">
                <li>
                  <Link
                    href="/student/dashboard"
                    className="font-semibold text-orange-300 hover:text-orange-200"
                  >
                    Student Dashboard
                  </Link>{" "}
                  – see how learners view their journey.
                </li>
                <li>
                  <Link
                    href="/student/instructor"
                    className="font-semibold text-orange-300 hover:text-orange-200"
                  >
                    AI Instructors
                  </Link>{" "}
                  – one guide per program pathway.
                </li>
                <li>
                  <Link
                    href="/program-holder/dashboard"
                    className="font-semibold text-orange-300 hover:text-orange-200"
                  >
                    Program Holder Console
                  </Link>{" "}
                  – operations view for grants and programs.
                </li>
              </ul>
              <p className="mt-2 text-[10px] text-slate-500">
                Elevate is built to align with workforce boards and DOL
                guidance, not fight against it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ FINAL CTA BAND */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="flex flex-col gap-3 rounded-2xl border border-red-700/60 bg-gradient-to-r from-red-700/40 via-slate-950 to-slate-950 px-4 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-200">
                Ready to Take the Next Step?
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">
                Let&apos;s see what funding and pathways you qualify for.
              </h2>
              <p className="mt-1 text-slate-200">
                One application. Multiple programs, funding options, and partner
                pathways. We&apos;ll walk it with you.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-[11px] md:items-end">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100"
              >
                Start Application
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
              >
                Talk to the Elevate Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

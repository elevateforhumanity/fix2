// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { TextToSpeechButton } from "@/components/TextToSpeechButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Career Training & Job Placement | Elevate for Humanity",
  description: "Get certified in healthcare, skilled trades, CDL, or barbering with 100% WIOA-funded training. No tuition, no debt. 85% job placement rate. Start your career today.",
  keywords: ["WIOA training", "free career training", "job placement", "workforce development", "healthcare training", "skilled trades", "CDL training", "barber school", "Milwaukee jobs"],
  openGraph: {
    title: "Free Career Training & Job Placement | Elevate for Humanity",
    description: "Get certified in healthcare, skilled trades, CDL, or barbering with 100% WIOA-funded training. No tuition, no debt. 85% job placement rate.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO – full width like Coursera */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 md:py-20 border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
            {/* Left: text */}
            <div className="flex-1 space-y-4 md:space-y-6">
              <div className="inline-block">
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  WIOA-Approved Training Provider
                </p>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                Free career training. Real jobs waiting.
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl">
                Get certified in <strong>healthcare, skilled trades, CDL, or barbering</strong> — 
                100% funded through WIOA, JRI, and workforce grants. No tuition. No debt. 
                Just training that leads to real employment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <div className="text-3xl font-bold text-emerald-700">$0</div>
                  <div className="text-sm text-slate-600">Cost for eligible participants</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700">12+</div>
                  <div className="text-sm text-slate-600">Career training programs</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-3xl font-bold text-purple-700">85%</div>
                  <div className="text-sm text-slate-600">Job placement rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-emerald-700 transition-colors"
                >
                  Check Eligibility
                </Link>
                <Link
                  href="/directory"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  Browse Programs
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">No Cost Training</p>
                    <p className="text-sm text-slate-600">For eligible participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Dedicated Support</p>
                    <p className="text-sm text-slate-600">From enrollment to employment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Career Placement</p>
                    <p className="text-sm text-slate-600">Employer partnerships</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: hero visual - FULL WIDTH */}
            <div className="flex-1 lg:flex-[1.5]">
              <div className="relative h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[850px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/hero-banner-new.png"
                  alt="Real people changing their lives through Elevate For Humanity"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-lg">
                      Healthcare
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-lg">
                      Skilled Trades
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-purple-700 shadow-lg">
                      CDL
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-lg">
                      Barber
                    </span>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-pink-700 shadow-lg">
                      Re-entry
                    </span>
                  </div>
                  <p className="text-white text-xl font-bold drop-shadow-lg">
                    Join hundreds changing their lives through real training and real opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS – "trusted by" */}
      <section className="border-b border-slate-900 bg-slate-950 py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            Trusted by workforce, training &amp; employer partners
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={`/images/split/piece-${i}.png`}
                  alt={`Partner logo ${i}`}
                  width={200}
                  height={80}
                  className="object-contain opacity-70 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Light Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Title / intro */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              A complete, funded workforce development ecosystem
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Elevate For Humanity connects learners, employers, and workforce partners so people can
              <span className="font-semibold"> earn while they learn</span> in WIOA- and JRI-aligned
              training — with real support, real credentials, and real jobs at the end.
            </p>
          </div>

          {/* Small visual strip (still simple, not a redesign) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Earn while you learn</p>
              <p className="text-[11px] text-slate-600">
                OJT • WEX • apprenticeships with local employers
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Funded pathways</p>
              <p className="text-[11px] text-slate-600">
                WIOA • JRI • state workforce grants (where approved)
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Wraparound support</p>
              <p className="text-[11px] text-slate-600">
                Case management, barrier navigation, and retention coaching
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Documented outcomes</p>
              <p className="text-[11px] text-slate-600">
                Reporting for boards, grants, and workforce partners
              </p>
            </div>
          </div>

          {/* Four cards – same structure, stronger copy */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Training programs */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                🎓 Funded training & apprenticeships
              </h3>
              <p className="text-slate-700 mb-4 text-sm sm:text-base">
                Career-aligned programs that match real employer demand — built with credentialing
                partners and employers you already know or will get to know.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Healthcare: MA, CNA, HHA, emergency health & safety.</li>
                <li>• Barber, esthetics, beauty educator & client services.</li>
                <li>• HVAC and technical trades in high-demand sectors.</li>
                <li>• Public safety reentry & workforce readiness pathways.</li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Many pathways include <span className="font-semibold">earn-while-you-learn</span> hours
                through OJT, apprenticeships, or paid work experience.
              </p>
            </div>

            {/* Funding & access */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                💰 WIOA, JRI, OJT & barrier-breaking funding
              </h3>
              <p className="text-slate-700 mb-4 text-sm sm:text-base">
                Most learners shouldn&apos;t pay out-of-pocket. We walk with you through funding
                so you understand what you qualify for and how to keep your support.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• WIOA, workforce readiness grants, and state funding (where approved).</li>
                <li>• Justice Reinvestment (JRI), reentry, and second-chance pathways.</li>
                <li>• OJT, WEX, and subsidized apprenticeships with local employers.</li>
                <li>• Support to understand how training affects benefits and income.</li>
              </ul>
            </div>

            {/* Support services */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                🤝 Real people, real support
              </h3>
              <p className="text-slate-700 mb-4 text-sm sm:text-base">
                Elevate is not just a list of classes — it&apos;s coaches, case managers, and partners
                who stay connected from interest through employment.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 1:1 case management and accountability check-ins.</li>
                <li>• Help with transportation, childcare, documentation, and barriers.</li>
                <li>• Soft skills, professional behavior, and workplace expectations.</li>
                <li>• Retention support after you start the job or apprenticeship.</li>
              </ul>
            </div>

            {/* Technology platform */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                💻 Portals for learners, employers & partners
              </h3>
              <p className="text-slate-700 mb-4 text-sm sm:text-base">
                Your platform keeps everyone in sync — learners, employers, workforce boards, and
                training partners.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Learner portal for classes, progress, certificates, and next steps.</li>
                <li>• Employer portal for candidate referrals, OJT/WEX tracking, and feedback.</li>
                <li>• Workforce & partner dashboards for outcomes and compliance reporting.</li>
                <li>• Digital paperwork so less time is spent chasing forms and signatures.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO HUB – three tiles pointing to the new pages */}
      <section className="border-b border-slate-900 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-400">
                Watch how Elevate works
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Short videos that explain Elevate in real language.
              </h2>
            </div>
            <p className="max-w-sm text-xs text-slate-400">
              Use these as QR code destinations on flyers, at events, with re-entry
              partners, and in employer presentations.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 1 – Elevate overview */}
            <VideoTile
              href="/videos/elevate-overview"
              tag="For everyone"
              title="Elevate overview in 60 seconds"
              desc="Who we serve, what we offer, and how to get started without a bunch of jargon."
              duration="~1:00"
              placeholder="/images/homepage/pathways-to-employment-banner.png"
            />

            {/* 2 – Barber / re-entry */}
            <VideoTile
              href="/videos/barber-spotlight"
              tag="Barber & re-entry"
              title="Barber Apprenticeship: a second-chance pathway"
              desc="From incarceration to owning a chair — how this pathway actually works."
              duration="~2:30"
              placeholder="/images/homepage/barber-apprenticeship-training.png"
            />

            {/* 3 – Employer / pipeline */}
            <VideoTile
              href="/videos/employer-pipeline"
              tag="Employers & partners"
              title="How Elevate supports funded talent pipelines"
              desc="A clear picture for HR, hiring managers and workforce boards."
              duration="~2:00"
              placeholder="/images/homepage/employer-partnership.png"
            />
          </div>
        </div>
      </section>

      {/* POPULAR PROGRAMS – visual cards */}
      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
                Popular programs
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Training that leads to real roles.
              </h2>
            </div>
            <Link
              href="/directory"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-500"
            >
              View full program directory →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              href="/programs/medical-assistant"
              image="/media/programs/medical.jpg"
              title="Medical Assistant"
              blurb="Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals and specialty practices."
              length="~5 months"
            />
            <ProgramCard
              href="/programs/barber-apprenticeship"
              image="/media/programs/barber.jpg"
              title="Barber Apprenticeship"
              blurb="State-approved apprenticeship where you earn hours in real shops while building a long-term career."
              length="Hours-based"
            />
            <ProgramCard
              href="/programs/hvac-technician"
              image="/media/programs/hvac.jpg"
              title="HVAC Technician"
              blurb="Learn heating, cooling and refrigeration systems with a pathway into in-demand skilled trades roles."
              length="Varies by partner"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS – simple 3 steps */}
      <section className="border-b border-slate-900 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-400">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            We walk with you from interest to employment.
          </h2>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            <StepCard
              number="1"
              title="Connect & explore"
              body="Complete a short interest form or talk with our team. We help explore funding eligibility and which programs make sense."
            />
            <StepCard
              number="2"
              title="Enroll & train"
              body="Enroll with one of our training partners. You get coaching, check-ins, and barrier-busting support along the way."
            />
            <StepCard
              number="3"
              title="Elevate & advance"
              body="Move into jobs, apprenticeships, or next-level credentials with Elevate and employers both in your corner."
            />
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES – cards with headshots */}
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
            Success stories
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Real people, real results.
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <StoryCard
              name="Marcus"
              tag="Barber Apprenticeship Graduate"
              image="/people/marcus.jpg"
              quote="From incarceration to owning my own chair. Elevate gave me structure, accountability, and a pathway instead of just a program."
            />
            <StoryCard
              name="Sharon"
              tag="Medical Assistant Graduate"
              image="/people/sharon.jpg"
              quote="Single mom to certified MA in 5 months. The coaching and funding support meant I could focus on finishing and getting to work."
            />
            <StoryCard
              name="Alicia"
              tag="Healthcare Graduate"
              image="/people/alicia.jpg"
              quote="I went from uncertain about my future to having a real career path. Elevate helped me see what was possible and made it happen."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-emerald-500/20 via-slate-950 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to see what&apos;s possible for you or your community?
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Whether you&apos;re a learner, an employer, or a partner, Elevate For
            Humanity is designed to plug into your world — not make you start from
            scratch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              I&apos;m ready to explore training
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-8 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/10"
            >
              I&apos;m an employer or partner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Helper components ---------- */

type VideoTileProps = {
  href: string;
  tag: string;
  title: string;
  desc: string;
  duration: string;
  placeholder: string;
};

function VideoTile({ href, tag, title, desc, duration, placeholder }: VideoTileProps) {
  return (
    <Link href={href} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 group-hover:shadow-xl">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Image
            src={placeholder}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
            {tag}
          </div>
          <div className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white">
            {duration}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
          <span className="mt-4 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
            Watch video →
          </span>
        </div>
      </div>
    </Link>
  );
}

type ProgramCardProps = {
  href: string;
  image: string;
  title: string;
  blurb: string;
  length: string;
};

function ProgramCard({ href, image, title, blurb, length }: ProgramCardProps) {
  return (
    <Link href={href} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 text-sm">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 flex-1 text-xs text-slate-600">{blurb}</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>{length}</span>
            <span className="font-semibold text-emerald-700">
              Learn more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

type StepCardProps = {
  number: string;
  title: string;
  body: string;
};

function StepCard({ number, title, body }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
          {number}
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-xs text-slate-300">{body}</p>
    </div>
  );
}

type StoryCardProps = {
  name: string;
  tag: string;
  image: string;
  quote: string;
};

function StoryCard({ name, tag, image, quote }: StoryCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="text-xs">
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-[11px] text-slate-500">{tag}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-xs text-slate-700">&quot;{quote}&quot;</p>
    </div>
  );
}

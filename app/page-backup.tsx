import Link from "next/link";

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    blurb: "Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.",
    funding: "WRG • WIOA • Workforce Grants",
    duration: "4–6 Months • Hybrid",
  },
  {
    slug: "barber",
    name: "Barber Apprenticeship",
    blurb: "State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.",
    funding: "DOL Apprenticeship • WIOA",
    duration: "12–18 Months • On-the-Job + Classroom",
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    blurb: "Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.",
    funding: "Workforce Grants • Employer Sponsors",
    duration: "4–9 Months • Lab + Field",
  },
];

const reasons = [
  {
    title: "Partner-centered, not platform-centered.",
    body: "Elevate is built to respect the programs you already trust—Milady, medical assistant schools, HVAC providers—while giving them one shared digital home.",
  },
  {
    title: "Written for humans, not just funders.",
    body: "Every page is written so a learner, grandparent, pastor, or case manager can read it and instantly understand the opportunity.",
  },
  {
    title: "Workforce compliance in mind from day one.",
    body: "We design pathways with WIOA, WRG, JRI, WorkOne, EmployIndy, and similar boards front-of-mind, not as an afterthought.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/40">
              <span className="text-sm font-bold text-emerald-300">EFH</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-50">
                Elevate for Humanity
              </span>
              <span className="text-[0.7rem] text-slate-400">
                Elevate Connects Directory
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
              <Link href="/programs" className="hover:text-emerald-300">
                Programs
              </Link>
              <Link href="#how-it-works" className="hover:text-emerald-300">
                How Elevate Works
              </Link>
              <Link href="/partners" className="hover:text-emerald-300">
                For Agencies & Partners
              </Link>
              <Link href="/about" className="hover:text-emerald-300">
                About
              </Link>
            </div>
            
            {/* Login Button - Always Visible */}
            <Link
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 hover:border-emerald-400 hover:text-emerald-200 md:text-[0.7rem]"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-emerald-500/20 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950">
        {/* Canva-style background elements */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-gradient-to-bl from-sky-500/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-500/10 to-transparent blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 text-center lg:px-6 lg:pb-24 lg:pt-24">
          {/* MAIN COPY */}
          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-emerald-200">
              Workforce Training Platform
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
              The digital front door for{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                community-powered careers.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Connect learners to career training in{" "}
              <span className="font-semibold text-emerald-300">
                Barber, Healthcare, and Skilled Trades
              </span>
              . One platform for enrollment, tracking, and workforce compliance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/40"
              >
                View Programs
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-700 bg-transparent px-8 py-4 text-base font-semibold text-slate-100 transition-all hover:border-emerald-400 hover:bg-emerald-400/10"
              >
                For Partners
              </Link>
            </div>

            {/* Simple Stats */}
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400">3</div>
                <div className="mt-1 text-sm text-slate-400">Career Pathways</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="mt-1 text-sm text-slate-400">WIOA Eligible</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">$0</div>
                <div className="mt-1 text-sm text-slate-400">Upfront Cost</div>
              </div>
            </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden"
      >
        {/* Background accents */}
        <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-sky-500/5 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/3 h-72 w-72 rounded-full bg-gradient-to-l from-amber-500/5 to-transparent blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-3">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Simple steps from enrollment to employment
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">
                Choose Your Path
              </h3>
              <p className="text-sm text-slate-400">
                Browse programs, check eligibility, and apply online in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">
                Get Training
              </h3>
              <p className="text-sm text-slate-400">
                Learn from expert partners with hands-on experience and support.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-50 mb-2">
                Start Your Career
              </h3>
              <p className="text-sm text-slate-400">
                Graduate with credentials and connections to employers hiring now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM STRIP (LIKE PRODUCT ROW) */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Pathways you can plug in today
              </p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-[1.6rem]">
                Start where your community already has momentum.
              </h2>
              <p className="text-sm text-slate-300">
                Elevate helps you stand up (or clean up) pathways that are already in demand:
                barbering, medical assistant, and HVAC—with room to grow into more trades and
                credentials over time.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20"
            >
              View all Elevate pathways
            </Link>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-emerald-400/70"
              >
                <div className="space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-emerald-300">
                    {program.tag}
                  </p>
                  <h3 className="text-[0.98rem] font-semibold text-slate-50">
                    {program.name}
                  </h3>
                  <p className="text-[0.84rem] text-slate-300">
                    {program.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[0.78rem]">
                  <Link
                    href={program.href}
                    className="font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    View pathway →
                  </Link>
                  <span className="text-[0.7rem] text-slate-500">
                    Cohorts · Referrals · Pilots
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        {/* Subtle background accent */}
        <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gradient-to-l from-emerald-500/5 to-transparent blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-50 sm:text-4xl mb-3">
              Career Training Programs
            </h2>
            <p className="text-slate-400 text-lg">
              Choose your path to a new career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Barber Program */}
            <Link 
              href="/programs/barber" 
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">Barber Apprenticeship</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Earn while you learn. Get licensed through hands-on apprenticeship.
                </p>
                <div className="flex items-center text-emerald-400 text-sm font-semibold group-hover:text-emerald-300">
                  Learn more 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Medical Assistant Program */}
            <Link 
              href="/programs/medical-assistant" 
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">Medical Assistant</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Start your healthcare career. Support doctors and patients.
                </p>
                <div className="flex items-center text-sky-400 text-sm font-semibold group-hover:text-sky-300">
                  Learn more 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* HVAC Program */}
            <Link 
              href="/programs/hvac" 
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">HVAC Technician</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Master heating and cooling systems. High-demand skilled trade.
                </p>
                <div className="flex items-center text-amber-400 text-sm font-semibold group-hover:text-amber-300">
                  Learn more 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ELEVATE / DIFFERENTIATORS */}
      <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/5 to-transparent blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Why cities and boards choose Elevate
            </p>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-[1.6rem]">
              Built for people, paperwork, and possibility—at the same time.
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {reasons.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.7)]"
              >
                <h3 className="text-[0.95rem] font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.85rem] text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr,0.9fr] md:items-center">
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Elevate for Humanity was created because too many people were "referred" into
                programs with no follow-up, no clarity, and no sense of where they actually
                were in the journey. We&apos;re here to change that story.
              </p>
              <p>
                When someone in your city is ready to move—out of survival mode, into training,
                into work—we want "Send them to Elevate" to be the default response.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              <p className="italic">
                "Our job is to make opportunity easier to find and easier to finish—without
                asking partners to blow up what already works."
              </p>
              <p className="mt-3 text-[0.78rem] text-slate-400">
                Elevate for Humanity · Elevate Connects Directory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-sky-500 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-950 lg:px-6 lg:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
                Ready to make Elevate the front door for your city?
              </h2>
              <p className="mt-2 text-sm">
                Whether you&apos;re a workforce board, agency, school, church, employer, or
                community hub, Elevate can become the place you send people when they&apos;re
                ready to move.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-emerald-200 shadow-lg shadow-slate-900/70 hover:text-white"
              >
                Book a strategy conversation
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/60 bg-white/95 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white"
              >
                See an Elevate LMS walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[0.75rem] text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>© {new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms" className="hover:text-emerald-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-emerald-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-emerald-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

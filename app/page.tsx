import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

const steps = [
  {
    title: "1 · One clear starting point",
    body: "Learners, parents, case managers, and employers all start in the same place: Elevate. No more sending people to five different sites and hoping they find the right link.",
  },
  {
    title: "2 · Partner-powered training",
    body: "Credentialing partners handle instruction and licensing. Elevate orchestrates the LMS, live support, reminders, documents, and progress tracking across programs.",
  },
  {
    title: "3 · Outcomes you can see",
    body: "Completions, credentials, hours, and next steps are organized where agencies and employers can actually see them, export them, and tell a clear story to funders.",
  },
];

const programs = [
  {
    name: "Barber Apprenticeship (Milady-Powered)",
    tag: "Apprenticeship · License Track",
    description:
      "Milady curriculum + shop-based experience + Elevate tracking to move learners toward real barber careers and licensing support.",
    href: "/programs/barber",
  },
  {
    name: "Medical Assistant Pathway",
    tag: "Healthcare · Partner Program",
    description:
      "Partner medical assistant training wrapped in Elevate onboarding, reminders, and reporting built for agencies and healthcare employers.",
    href: "/programs/medical-assistant",
  },
  {
    name: "HVAC Technician (Partner School)",
    tag: "Skilled Trades · External School",
    description:
      "Elevate as the front door and connector to a trusted HVAC school, with visibility for case managers and employers.",
    href: "/programs/hvac",
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
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />

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
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              How Elevate works
            </p>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-[1.6rem]">
              One platform to connect learners, partners, and workforce systems.
            </h2>
            <p className="text-sm text-slate-300">
              Elevate doesn&apos;t try to be everything. It&apos;s the front door, the glue, and the
              story-teller between the people who need training, the organizations who teach,
              and the systems that fund it.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
              >
                <h3 className="text-sm font-semibold text-emerald-200">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.82rem] text-slate-300">{step.body}</p>
              </div>
            ))}
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

      {/* PROGRAM HIGHLIGHTS SECTION */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-2">
              Explore our programs
            </p>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-[1.6rem]">
              Real students, real training, real careers.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Barber Program */}
            <Link href="/programs/barber" className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group cursor-pointer block">
              <Image
                src="/generated-images/ecd-courses/barber-apprenticeship-cover.png"
                alt="Barber apprenticeship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-emerald-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-bold">Barber Apprenticeship</p>
                <p className="text-xs text-slate-200">Learn more →</p>
              </div>
            </Link>

            {/* Medical Assistant Program */}
            <Link href="/programs/medical-assistant" className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group cursor-pointer block">
              <Image
                src="/generated-images/ecd-courses/medical-assistant-cover.png"
                alt="Medical assistant training"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-emerald-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-bold">Medical Assistant</p>
                <p className="text-xs text-slate-200">Learn more →</p>
              </div>
            </Link>

            {/* HVAC Program */}
            <Link href="/programs/hvac" className="relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-64 group cursor-pointer block">
              <Image
                src="/generated-images/ecd-courses/hvac-technician-cover.png"
                alt="HVAC training"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-emerald-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-bold">HVAC Technician</p>
                <p className="text-xs text-slate-200">Learn more →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ELEVATE / DIFFERENTIATORS */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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
      <section className="bg-gradient-to-r from-emerald-600 via-sky-500 to-amber-400">
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

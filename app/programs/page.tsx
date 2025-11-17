import Link from "next/link";

const programs = [
  {
    slug: "/programs/barber",
    name: "Barber Apprenticeship (Milady-Powered)",
    tag: "Apprenticeship · License Track",
    summary:
      "Milady curriculum, shop-based experience, and Elevate tracking for learners moving toward real barber careers and licensing support.",
  },
  {
    slug: "/programs/medical-assistant",
    name: "Medical Assistant Pathway",
    tag: "Healthcare · Partner Program",
    summary:
      "Partner medical assistant training wrapped in Elevate onboarding, reminders, and reporting for agencies and healthcare employers.",
  },
  {
    slug: "/programs/hvac",
    name: "HVAC Technician (Partner School)",
    tag: "Skilled Trades · External School",
    summary:
      "Elevate as the front door and connector to a trusted HVAC school, with visibility for case managers and employers.",
  },
];

export default function ProgramsPage() {
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

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <Link href="/programs" className="text-emerald-300">
              Programs
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-300">
              How Elevate Works
            </Link>
            <Link href="/partners" className="hover:text-emerald-300">
              For Agencies & Partners
            </Link>
            <Link href="/about" className="hover:text-emerald-300">
              About
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[0.7rem] text-slate-100 hover:border-emerald-400 hover:text-emerald-200"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <section className="relative border-b border-emerald-500/20 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 overflow-hidden">
        {/* Canva-style background */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tl from-sky-500/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Elevate programs
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.7rem]">
              Programs that speak the same language as your community.
            </h1>
            <p className="text-sm text-slate-300">
              Every pathway is designed so a learner, a parent, a pastor, and a case manager
              can read it and instantly understand what it is, who it is for, and how it leads
              to work.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Barber Program */}
            <Link 
              href="/programs/barber" 
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Apprenticeship · License Track
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-50 mb-3">
                  Barber Apprenticeship
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Milady curriculum, shop-based experience, and Elevate tracking for learners moving toward real barber careers and licensing support.
                </p>
                <div className="flex items-center text-emerald-400 text-sm font-semibold group-hover:text-emerald-300">
                  View Program 
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
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    Healthcare · Partner Program
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-50 mb-3">
                  Medical Assistant Pathway
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Partner medical assistant training wrapped in Elevate onboarding, reminders, and reporting for agencies and healthcare employers.
                </p>
                <div className="flex items-center text-sky-400 text-sm font-semibold group-hover:text-sky-300">
                  View Program 
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
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Skilled Trades · External School
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-50 mb-3">
                  HVAC Technician
                </h2>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Elevate as the front door and connector to a trusted HVAC school, with visibility for case managers and employers.
                </p>
                <div className="flex items-center text-amber-400 text-sm font-semibold group-hover:text-amber-300">
                  View Program 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
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

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

const bullets = [
  "State-certified CNA curriculum with theory and clinical skills.",
  "Train in real hospitals and nursing homes with actual patients.",
  "75 hours classroom instruction + 100 hours hands-on clinical.",
  "State certification exam prep and testing included.",
  "Job placement assistance with healthcare employers.",
];

const fits = [
  "Adults who want a patient-facing healthcare career.",
  "Career changers from retail, hospitality, or warehouse work.",
  "Parents and caregivers looking for stable healthcare jobs.",
  "Learners referred by WorkOne, EmployIndy, and workforce boards.",
];

export default function CNAProgramPage() {
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
            <Link href="/programs" className="hover:text-emerald-300">
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

      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              Healthcare pathway · State certified
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
              Certified Nursing Assistant (CNA)
            </h1>
            <p className="text-sm text-slate-300">
              Get your CNA certification in 6-8 weeks. Train in real hospitals and nursing homes. State exam included. Most students pay $0 through WIOA/WRG funding.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply/cna"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-300"
              >
                Apply for CNA program
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-sky-300 hover:text-sky-100"
              >
                Sponsor students or refer learners
              </Link>
            </div>
          </div>

          {/* Video Hero */}
          <div className="mt-10 mb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
                alt="CNA training in hospital setting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-semibold mb-2">Watch: CNA training in action</p>
                <p className="text-2xl font-bold">See students training in real medical facilities</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr,0.9fr] md:items-start">
            <div className="space-y-3 text-sm text-slate-200">
              <h2 className="text-[1.1rem] font-semibold text-slate-50">
                What this program covers.
              </h2>
              <p className="text-slate-300">
                This CNA program is IDOH-licensed and designed to get you certified and working in healthcare in just 6-8 weeks.
              </p>
              <ul className="mt-3 space-y-2">
                {bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.75)]">
              <h3 className="text-[0.95rem] font-semibold text-slate-50">
                Who this is a good fit for.
              </h3>
              <ul className="mt-3 space-y-2">
                {fits.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] text-slate-400">
                This program is ETPL-approved and WIOA-eligible. Most students qualify for $0 cost through workforce funding programs.
              </p>
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

import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Demo - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/40">
              <span className="text-sm font-bold text-orange-300">EFH</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-50">
                Elevate for Humanity
              </span>
              <span className="text-[0.7rem] text-slate-400">
                Elevate for Humanity
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <Link href="/programs" className="hover:text-orange-300">
              Programs
            </Link>
            <Link href="/#how-it-works" className="hover:text-orange-300">
              How Elevate Works
            </Link>
            <Link href="/partners" className="hover:text-orange-300">
              For Agencies & Partners
            </Link>
            <Link href="/about" className="hover:text-orange-300">
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
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            Elevate demo
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
            See how Elevate becomes your front door.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            In a demo, we'll walk through the learner view, partner view, and how reporting can
            line up with the boards, funders, and stories that matter to you.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Use the contact page to request a time that works. We can include your local partners in the conversation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[0.75rem] text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>© {new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms" className="hover:text-orange-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-orange-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-orange-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

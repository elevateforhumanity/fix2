import Link from "next/link";

export default function AboutPage() {
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
                Elevate for Humanity
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
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            About Elevate for Humanity
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
            Building a pillar—not just a program.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Elevate for Humanity and the Elevate for Humanity exist so that when someone
            is ready to move—out of survival, into training, into work—there is a simple,
            trusted place people can send them.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            We work with credentialing partners, workforce boards, agencies, community
            leaders, and employers to turn scattered opportunities into pathways people can
            actually follow and finish.
          </p>
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

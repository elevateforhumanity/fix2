export default function ContactPage() {
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
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Contact Elevate
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
            Let's talk about the people you're trying to move.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Share a little about who you serve, the programs or pathways
            you&apos;re interested in, and what success would look like. Elevate
            will follow up with you to schedule a conversation.
          </p>

          <form className="mt-8 space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Name
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Organization
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                placeholder="Agency, school, employer, or community group"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Email or phone
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                placeholder="How we can reach you"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                What would you like to explore?
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                placeholder="Tell us about your learners, partners, and goals."
              />
            </div>
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
            >
              Send message (demo only)
            </button>
            <p className="mt-2 text-[0.75rem] text-slate-500">
              This form is a visual demo. Your dev team can wire it to email or
              your CRM.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[0.75rem] text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>
            © {new Date().getFullYear()} Elevate for Humanity. All rights
            reserved.
          </p>
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

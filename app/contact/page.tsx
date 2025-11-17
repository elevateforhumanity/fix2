export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Contact Elevate
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
            Let's talk about the people you're trying to move.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Share a little about who you serve, the programs or pathways you&apos;re
            interested in, and what success would look like. Elevate will follow up with you
            to schedule a conversation.
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
              This form is a visual demo. Your dev team can wire it to email or your CRM.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

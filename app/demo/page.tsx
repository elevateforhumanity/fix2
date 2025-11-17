import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Elevate demo
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
            See how Elevate becomes your front door.
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            In a demo, we'll walk through the learner view, partner view, and
            how reporting can line up with the boards, funders, and stories that
            matter to you.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Use the contact page to request a time that works. We can include
            your local partners in the conversation.
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
    </main>
  );
}

// app/partners/page.tsx
import Link from "next/link";

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            For Agencies · Schools · Barbershops · Training Providers
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Partner with Elevate For Humanity™
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-200">
            We help agencies, schools, apprenticeship hosts, and employers turn
            good intentions into clear, trackable pathways for the people they serve.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-300">
            <span className="rounded-full border border-white/15 px-3 py-1">
              Workforce-aligned · Re-entry friendly
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1">
              Central hub for referrals & reporting
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Schedule a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* TYPES OF PARTNERS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Workforce & Re-Entry Agencies
              </p>
              <p>
                WorkOne, re-entry programs, community-based orgs, and case management teams that need reliable training options and feedback loops.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Schools & Training Providers
              </p>
              <p>
                Credentialed schools, skill centers, and training programs looking to increase enrollment, completion, and workforce alignment.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Apprenticeship Hosts & Shops
              </p>
              <p>
                Barbershops, salons, and employer sites that want to host apprentices or learners as part of a structured pathway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW PARTNERSHIP WORKS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[1.6fr,1.3fr] items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                How partnership works
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                One hub. Many pathways. Shared accountability.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Elevate centralizes outreach, screening, case management, and
                reporting so partners can focus on what they do best.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
                <li>• Clear referral process with digital forms</li>
                <li>• Warm handoffs into specific programs</li>
                <li>• Ongoing attendance and progress updates</li>
                <li>• Shared outcome stories for funders and boards</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300 mb-2">
                Ready to explore partnership?
              </p>
              <p className="mb-3">
                Share a bit about your organization, and we&apos;ll follow up to
                talk through fit, expectations, and next steps.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
              >
                Contact Us About Partnership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

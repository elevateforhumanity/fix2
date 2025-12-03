// app/grants/page.tsx
import Link from 'next/link';

export default function GrantsMarketingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 mb-3">
          Elevate For Humanity • Funding Engine
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Let Grant Autopilot help you get funded.
        </h1>
        <p className="text-lg text-slate-700 mb-6 max-w-3xl">
          We built Grant Autopilot for the people we serve every day—barber and
          beauty schools, body sculpting studios, nonprofits, workforce partners,
          and small businesses who are doing the work but don&apos;t have a full
          grant department. Our system helps you find aligned funding and drafts
          the application narrative so you can focus on impact, not paperwork.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Grant Finder</h2>
            <p className="text-sm text-slate-600 mb-4">
              Curated grant and contract opportunities for nonprofits, small
              businesses, schools, and workforce partners aligned with Elevate&apos;s
              ecosystem.
            </p>
            <p className="font-bold text-lg mb-1">$39 / month</p>
            <p className="text-xs text-slate-500 mb-4">Cancel anytime.</p>
            <p className="text-xs text-slate-500">
              Great if you want to stay aware of what&apos;s out there.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm ring-2 ring-emerald-500">
            <h2 className="text-xl font-semibold mb-2">
              Grant Autopilot Drafting
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Our AI-powered engine uses your organization profile plus the
              opportunity details to draft full narratives, goals, and budget
              explanations for you to review and submit.
            </p>
            <p className="font-bold text-lg mb-1">$149 / month</p>
            <p className="text-xs text-slate-500 mb-4">
              Includes Grant Finder + up to 3 drafted applications per month.
            </p>
            <p className="text-xs text-emerald-700 font-semibold">
              You stay in control. We never sign or submit on your behalf—you
              review, approve, and submit.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              Done-With-You Grant Lab
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              For organizations that want more support. We layer human review and
              strategy on top of Autopilot drafts so you submit clean, funder-ready
              applications.
            </p>
            <p className="font-bold text-lg mb-1">From $297 / month</p>
            <p className="text-xs text-slate-500 mb-4">
              Limited spots for nonprofits, schools, and anchor partners.
            </p>
            <p className="text-xs text-slate-500">
              Ideal for Elevate partners, apprenticeship sponsors, and
              multi-program organizations.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Built for the way real people work.
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              Whether you&apos;re a one-person nonprofit, a body sculpting studio,
              a barber school, or a workforce hub, Grant Autopilot helps you turn
              your story, your impact, and your numbers into a clear narrative
              funders can actually understand.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/auth/login?redirect=/dashboard/grants"
              className="inline-flex items-center rounded-full border border-transparent bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Login &amp; Activate Autopilot
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Talk to our team
            </Link>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 max-w-3xl">
          Disclaimer: Grant Autopilot is a drafting and support tool. It does not
          guarantee funding, and it does not submit applications or certify
          compliance on your behalf. You remain the authorized representative for
          all submissions.
        </p>
      </section>
    </main>
  );
}

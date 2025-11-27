import Link from "next/link";

export const metadata = {
  title: "Admin Document Center | Elevate for Humanity",
  description:
    "Internal hub for Elevate for Humanity documents: waivers, ETPL approvals, MOUs, funding docs, and credential partner agreements.",
};

export default function AdminDocumentCenterPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin Only
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Elevate Document Center (Internal)
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This space is for staff only. Use it to keep track of approvals,
            agreements, waivers, and playbooks that support WRG, JRI, WEX, OJT,
            apprenticeship and philanthropic alignment. This page does not need
            to be public-facing.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/admin/funding-playbook"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Open Funding Playbook
            </Link>
            <Link
              href="/admin/dashboard-enhanced"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-5 text-xs">
          {/* SECTION: REGULATORY & APPROVALS */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              1. Regulatory Approvals & Status
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Quick snapshot of Elevate&apos;s status with state, federal and
              local workforce systems. Use this when talking with boards,
              employers, and funders.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  ETPL / State Training Provider
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Elevate for Humanity on ETPL: ✅ (Indiana)</li>
                  <li>WRG Employer setup: ✅</li>
                  <li>Track ETPL listing URL here.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Staff action: paste official ETPL links and upload PDF
                  approvals to storage, then link them into this card.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  JRI / Job Ready Indy
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>JRI partner approved: ✅</li>
                  <li>SCORM 2004 packages downloaded: ✅</li>
                  <li>Mapped into LMS course shell: in progress</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Keep the original JRI agreement docs + emails in a secure
                  folder and link it here for quick reference.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Apprenticeship / OJT / WEX
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Barber apprenticeship: in progress / approved locally</li>
                  <li>WEX / OJT employer agreements: in progress</li>
                  <li>Apprenticeship standards documents: store here.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Track apprenticeship numbers, OJT contracts and WEX templates
                  so they&apos;re easy to pull down when needed.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: CREDENTIAL PARTNER LIBRARY */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              2. Credential Partners Library
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Keep all of your credential partner documentation, logins and
              onboarding materials organized by partner. This supports your
              microprogram library and LMS mappings.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Healthcare & Safety
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Choice Medical Institute – CNA</li>
                  <li>HSI – Safety / CPR / OSHA content</li>
                  <li>National Drug – drug-free workplace training</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Staff: add links to partner portals, login instructions, and
                  any license/contract PDFs here.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Beauty, Trades & Business
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Milady / Rise – beauty & barber content</li>
                  <li>CareerSafe – safety / employability</li>
                  <li>Certiport (if applicable) – IT, digital skills</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Map each partner&apos;s courses to Elevate programs in the LMS
                  using your course catalog and microprogram markup.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Tax, VITA & Financial Literacy
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>IRS VITA – Link & Learn / certification</li>
                  <li>Intuit – training resources & simulations</li>
                  <li>Any local AARP / community partners</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Add links to IRS Link & Learn, VITA site IDs, and intake
                  forms (14446, 13715, 15272, etc.) as you build your VITA hub.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Digital Access & Platforms
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Supabase – database & storage</li>
                  <li>Stripe – tuition & microprogram payments</li>
                  <li>Any LMS integrations (SCORM host, etc.)</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Keep API keys out of this page. Use this only for process
                  notes and links to internal documentation in secure storage.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: MOUs & EMPLOYER AGREEMENTS */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              3. MOUs, Employer Agreements & Templates
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Central place for your signed MOUs, WEX/OJT templates, and
              employer partnership letters. This supports your directory and
              &ldquo;earn while you learn&rdquo; strategy.
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Employer Agreements & WEX / OJT
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Standard WEX agreement template (upload & link).</li>
                  <li>Standard OJT agreement template.</li>
                  <li>Any employer-specific addenda.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  Staff: upload Word/PDF templates to storage and link them
                  here so they&apos;re one click away when onboarding employers.
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-3">
                <p className="text-[11px] font-semibold text-slate-100">
                  Program MOUs & School Partners
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                  <li>Choice Medical Institute MOU.</li>
                  <li>Barber academy / shop MOUs.</li>
                  <li>Any other school training partner MOUs.</li>
                </ul>
                <p className="mt-2 text-[10px] text-slate-500">
                  These documents back up your program marketing claims and help
                  with state and board credibility.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: NOTES FOR FUTURE AUTOMATION */}
          <section className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <h2 className="text-sm font-semibold text-white">
              4. Future Automation Notes
            </h2>
            <p className="mt-1 text-[11px] text-slate-300">
              Over time, this page can be upgraded to pull files directly from
              Supabase storage or another secure document system. For now, treat
              it like a structured &quot;table of contents&quot; for your real
              docs.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-300">
              <li>
                Connect Supabase buckets (e.g. <code>internal-docs</code>) and
                render file lists here for admins only.
              </li>
              <li>
                Add tags/filtering (e.g. JRI, WRG, ETPL, VITA, Apprenticeship).
              </li>
              <li>
                Link documents directly from the Admin Dashboard & employer
                proposal builder.
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}

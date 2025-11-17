import Link from "next/link";

const hvacBullets = [
  "Orientation to HVAC work, expectations, and career paths.",
  "Connection to a trusted external HVAC school or training provider.",
  "Elevate intake, readiness checks, and ongoing touchpoints.",
  "Visibility for agencies into enrollment, engagement, and completion.",
  "Support with next steps into apprenticeships or entry-level roles.",
];

const hvacFit = [
  "Hands-on learners who like tools, problem solving, and being on the move.",
  "People coming from construction, warehouse, or maintenance who want a focused trade.",
  "Re-entry participants and career changers looking for steady, skilled work.",
  "Referrals from workforce boards, nonprofits, schools, and employers.",
];

export default function HvacProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Skilled trades pathway · Partner HVAC school
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
              HVAC Technician Pathway
            </h1>
            <p className="text-sm text-slate-300">
              Elevate acts as the connector between learners, agencies, and a trusted HVAC
              school. We handle intake, expectations, and updates so everyone knows what's
              happening as training moves forward.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply/hvac"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Start the HVAC pathway
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-300 hover:text-emerald-100"
              >
                Explore HVAC cohorts and partners
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr,0.9fr] md:items-start">
            <div className="space-y-3 text-sm text-slate-200">
              <h2 className="text-[1.1rem] font-semibold text-slate-50">
                What this pathway focuses on.
              </h2>
              <p className="text-slate-300">
                Elevate is not the HVAC school. We&apos;re the guide rail that keeps learners
                and agencies informed from referral to completion.
              </p>
              <ul className="mt-3 space-y-2">
                {hvacBullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.75)]">
              <h3 className="text-[0.95rem] font-semibold text-slate-50">
                Who this is a strong fit for.
              </h3>
              <ul className="mt-3 space-y-2">
                {hvacFit.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] text-slate-400">
                Program length, credentials, and lab details depend on the partner HVAC
                school. Elevate helps clarify those details at intake and keeps them visible
                throughout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

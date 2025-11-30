import Link from "next/link";

export const metadata = {
  title: "Funding | WIOA • WRG • Apprenticeships • Employer",
  description: "Most eligible learners pay $0 out-of-pocket. Start the screening.",
};

const OPTIONS = [
  { label: "WIOA", href: "/funding/wioa", blurb: "Tuition assistance via your local workforce board." },
  { label: "Workforce Ready Grant", href: "/funding/wrg", blurb: "Indiana's WRG for high-demand training." },
  { label: "Apprenticeships", href: "/funding/apprenticeship", blurb: "Earn while you learn with DOL-aligned pathways." },
  { label: "Employer Sponsorship", href: "/funding/employer", blurb: "Your employer invests; we deliver outcomes." },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-orange-700">Funding</p>
          <h1 className="mt-2 text-3xl font-extrabold">Don't let tuition block your future</h1>
          <p className="mt-3 text-slate-700">
            We help you qualify for WIOA, WRG, apprenticeships, or employer sponsorships. The goal is simple: remove cost,
            move fast, and get you working.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/apply" className="rounded-full bg-orange-600 text-white px-5 py-3 font-semibold hover:bg-orange-700">
              Start Funding Screening
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-300 px-5 py-3 font-semibold hover:border-orange-500 hover:text-orange-700">
              Talk to a Human
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 p-5 bg-white">
          <div className="text-sm font-semibold mb-2">Options</div>
          <ul className="space-y-2 text-sm">
            {OPTIONS.map((o) => (
              <li key={o.href} className="flex items-start justify-between gap-3">
                <div>
                  <a href={o.href} className="font-medium hover:text-orange-700">{o.label}</a>
                  <div className="text-slate-600">{o.blurb}</div>
                </div>
                <a href={o.href} className="text-orange-600 font-semibold">→</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

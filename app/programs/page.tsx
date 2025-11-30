import Link from "next/link";

export const metadata = {
  title: "Programs | Elevate For Humanity",
  description: "Career-aligned programs that connect to real jobs and funding.",
};

const PROGRAMS = [
  { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship", blurb: "Earn while you learn with a DOL-aligned path." },
  { label: "CNA", href: "/programs/cna", blurb: "Start fast in healthcare with stackable credentials." },
  { label: "HVAC", href: "/programs/hvac", blurb: "Hands-on training matched to employer demand." },
  { label: "Building Technician", href: "/programs/building-technician", blurb: "Facilities, maintenance, and real advancement paths." },
  { label: "CDL", href: "/programs/cdl", blurb: "Licensed routes into logistics and transportation." },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-orange-700">
            Programs • WIOA/WRG aligned
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">Find your pathway</h1>
          <p className="mt-3 text-slate-700">
            Each program is co-designed with employers and workforce partners, so your time leads to credentials, interviews,
            and offers—not just another portal login.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/apply" className="rounded-full bg-orange-600 text-white px-5 py-3 font-semibold hover:bg-orange-700">
              Apply for Funding
            </Link>
            <Link href="/funding" className="rounded-full border border-slate-300 px-5 py-3 font-semibold hover:border-orange-500 hover:text-orange-700">
              How Funding Works
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 p-5 bg-white">
          <div className="text-sm font-semibold mb-2">Programs</div>
          <ul className="space-y-2 text-sm">
            {PROGRAMS.map((p) => (
              <li key={p.href} className="flex items-start justify-between gap-3">
                <div>
                  <a href={p.href} className="font-medium hover:text-orange-700">{p.label}</a>
                  <div className="text-slate-600">{p.blurb}</div>
                </div>
                <a href={p.href} className="text-orange-600 font-semibold">→</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Elevate For Humanity — Training • Funding • Careers",
  description: "Free or subsidized training with WIOA/WRG support. Real pathways to real jobs.",
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-700">
              ORIGINAL-SITE-EFH-ORIGINAL-2024 • Owner: Elizabeth L. Greene
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
              Training that actually leads to work—<span className="text-orange-600">with funding</span> and support.
            </h1>
            <p className="mt-3 text-slate-700">
              We align programs with employers and workforce boards so students move from classroom to paycheck—with case
              management, credentials, and real wraparound help.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/apply" className="rounded-full bg-orange-600 px-6 py-3 text-white font-semibold hover:bg-orange-700">
                Apply Now
              </Link>
              <Link href="/programs" className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-orange-500 hover:text-orange-700">
                See Programs
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5">
            <h3 className="text-sm font-semibold mb-2">How it works</h3>
            <ul className="space-y-2 text-sm">
              <li>• Pick a program aligned to in-demand jobs</li>
              <li>• Check funding (WIOA, WRG, apprenticeships, employer)</li>
              <li>• Train in our LMS with human support</li>
              <li>• Earn credentials and get hired</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick lanes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Programs", desc: "Barber, CNA, HVAC, CDL, and more.", href: "/programs" },
          { title: "Funding", desc: "WIOA, WRG, apprenticeships, employer sponsorships.", href: "/funding" },
          { title: "Student Portal", desc: "Track progress, documents, and next steps.", href: "/student/portal" },
        ].map((c) => (
          <a key={c.title} href={c.href} className="rounded-2xl border border-slate-200 p-5 hover:shadow-sm">
            <div className="text-sm font-semibold">{c.title}</div>
            <div className="text-slate-700 text-sm">{c.desc}</div>
          </a>
        ))}
      </section>
    </main>
  );
}

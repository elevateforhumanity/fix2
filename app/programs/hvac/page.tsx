import Link from "next/link";

export default function HVACPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO WITH VIDEO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/program-hvac.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 md:px-12 lg:px-24 max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase text-orange-300">
            Elevate For Humanity™ • Skilled Trades Pathway
          </p>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            HVAC Technician Training Program
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-100">
            Learn heating, cooling, and refrigeration systems. Prepare for
            in-demand technician roles with hands-on training and industry credentials.
          </p>
        </div>
      </section>

      {/* PROGRAM DETAILS */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12 space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">Program Overview</h2>
          <p className="text-sm md:text-base text-slate-200">
            This pathway prepares you for careers in heating, ventilation, air
            conditioning, and refrigeration. Training includes classroom theory,
            hands-on lab work, and field experience with real HVAC systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Duration
            </h3>
            <p className="text-sm text-slate-200">4–9 Months</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Format
            </h3>
            <p className="text-sm text-slate-200">
              Lab + Field Training
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Funding
            </h3>
            <p className="text-sm text-slate-200">
              Workforce Grants • Employer Sponsors
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-xl font-bold mb-3">Who This Is For</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>Adults seeking a stable, high-demand skilled trade</li>
            <li>Career changers interested in hands-on technical work</li>
            <li>Youth exploring trades after high school</li>
            <li>Anyone who enjoys problem-solving and working with tools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-xl font-bold mb-3">What You'll Learn</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>HVAC system installation, maintenance, and repair</li>
            <li>Electrical components and refrigeration cycles</li>
            <li>Safety protocols and EPA certification prep</li>
            <li>Troubleshooting and diagnostic techniques</li>
            <li>Customer service and professional communication</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-slate-900 p-6">
          <h2 className="text-xl font-bold mb-3">Career Outlook</h2>
          <p className="text-sm md:text-base text-slate-200 mb-4">
            HVAC technicians are in high demand across residential, commercial,
            and industrial sectors. Many graduates find employment with:
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>HVAC contractors and service companies</li>
            <li>Property management and facility maintenance</li>
            <li>Manufacturing and industrial facilities</li>
            <li>Self-employment opportunities</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/apply"
            className="rounded-full bg-orange-500 px-6 py-3 text-sm md:text-base font-semibold shadow-lg shadow-orange-500/40 hover:bg-orange-400 transition"
          >
            Apply Now
          </Link>
          <Link
            href="/programs"
            className="rounded-full border border-white/40 px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/10 transition"
          >
            View All Programs
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-8 mt-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-white">Elevate For Humanity™</p>
              <p className="text-xs text-slate-400">
                Workforce training, apprenticeships, and career pathways.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <Link href="/programs" className="hover:text-orange-300">Programs</Link>
              <Link href="/partners" className="hover:text-orange-300">Partners</Link>
              <Link href="/about" className="hover:text-orange-300">About</Link>
              <Link href="/contact" className="hover:text-orange-300">Contact</Link>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Elevate For Humanity. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

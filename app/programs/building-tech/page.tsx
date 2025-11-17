import Link from "next/link";

export default function BuildingTechPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/program-building-tech.mp4"
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
            Building Maintenance Technician
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-100">
            Training for building systems, repairs, and facility maintenance to
            keep properties safe, functional, and compliant.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12 space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Program Overview
          </h2>
          <p className="text-sm md:text-base text-slate-200">
            This pathway prepares you for careers in building maintenance,
            facility operations, and property management. You'll learn the
            essential skills to maintain, troubleshoot, and repair building
            systems across residential, commercial, and industrial properties.
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
              Hands-On Training + Classroom
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Funding
            </h3>
            <p className="text-sm text-slate-200">
              Workforce Grants • Apprenticeship Options
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-lg font-bold mb-3">Who This Is For</h2>
            <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
              <li>Adults seeking stable, in-demand skilled trades work</li>
              <li>Career changers interested in hands-on technical roles</li>
              <li>Youth exploring trades after high school</li>
              <li>Anyone who enjoys problem-solving and working with tools</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-lg font-bold mb-3">
              What You&apos;ll Learn
            </h2>
            <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
              <li>Basic electrical, plumbing, and HVAC systems</li>
              <li>Carpentry, drywall, painting, and general repairs</li>
              <li>Safety protocols and building codes</li>
              <li>Preventive maintenance and troubleshooting</li>
              <li>Customer service and professional communication</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-lg font-bold mb-3">Career Opportunities</h2>
          <p className="text-sm md:text-base text-slate-200 mb-3">
            Building maintenance technicians are needed across many sectors.
            Graduates often find work with:
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>Property management companies and apartment complexes</li>
            <li>Commercial buildings and office parks</li>
            <li>Schools, hospitals, and government facilities</li>
            <li>Hotels, resorts, and hospitality properties</li>
            <li>Manufacturing and industrial facilities</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-400/40 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
          <h2 className="text-lg font-bold mb-3">Why Building Maintenance?</h2>
          <p className="text-sm md:text-base text-slate-200 mb-3">
            This is a versatile trade that offers job security and growth
            potential. Buildings always need maintenance, and skilled
            technicians are in constant demand.
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li><strong>Stable Employment:</strong> Essential services that can't be outsourced</li>
            <li><strong>Career Growth:</strong> Advance to supervisor or facility manager roles</li>
            <li><strong>Diverse Skills:</strong> Learn multiple trades in one program</li>
            <li><strong>Good Pay:</strong> Competitive wages with benefits</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/apply?program=building-tech"
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

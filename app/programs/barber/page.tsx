import Link from 'next/link';

export default function BarberPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO WITH VIDEO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/program-barber-apprenticeship.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 md:px-12 lg:px-24 max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase text-orange-300">
            Elevate For Humanity™ • State-Approved Apprenticeship
          </p>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            Barber Apprenticeship Program
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-100">
            Earn while you learn in a real barbershop. Build hours toward your
            state barber license through hands-on apprenticeship training.
          </p>
        </div>
      </section>

      {/* PROGRAM DETAILS */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12 space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Program Overview
          </h2>
          <p className="text-sm md:text-base text-slate-200">
            This is a DOL-approved apprenticeship program. You'll work in a real
            barbershop, learning from licensed barbers while earning income and
            building the hours required for state licensure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Duration
            </h3>
            <p className="text-sm text-slate-200">12–18 Months</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Format
            </h3>
            <p className="text-sm text-slate-200">
              On-the-Job Training + Classroom Instruction
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Funding
            </h3>
            <p className="text-sm text-slate-200">
              DOL Apprenticeship • WIOA • Earn While You Learn
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-xl font-bold mb-3">Who This Is For</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>Young adults who want a creative, people-focused trade</li>
            <li>Career changers looking for a stable, licensed profession</li>
            <li>Shop helpers ready to formalize their training</li>
            <li>Anyone passionate about barbering and community connection</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-xl font-bold mb-3">What You'll Learn</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>Hair cutting, styling, and grooming techniques</li>
            <li>Sanitation, safety, and state board requirements</li>
            <li>Customer service and shop management</li>
            <li>Business skills for future shop ownership</li>
            <li>Milady curriculum and state licensing preparation</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-slate-900 p-6">
          <h2 className="text-xl font-bold mb-3">Apprenticeship Benefits</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1 mb-4">
            <li>
              <strong>Earn While You Learn</strong> - Get paid as you train
            </li>
            <li>
              <strong>State-Approved</strong> - DOL registered apprenticeship
            </li>
            <li>
              <strong>Real Experience</strong> - Work in actual barbershops
            </li>
            <li>
              <strong>License Track</strong> - Build hours toward state
              licensure
            </li>
            <li>
              <strong>Support Services</strong> - Coaching and case management
            </li>
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
              <p className="mb-2 text-sm font-semibold text-white">
                Elevate For Humanity™
              </p>
              <p className="text-xs text-slate-400">
                Workforce training, apprenticeships, and career pathways.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <Link href="/programs" className="hover:text-orange-300">
                Programs
              </Link>
              <Link href="/partners" className="hover:text-orange-300">
                Partners
              </Link>
              <Link href="/about" className="hover:text-orange-300">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Elevate For Humanity. All rights
            reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

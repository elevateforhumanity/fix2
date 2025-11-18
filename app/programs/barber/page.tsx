import Link from "next/link";

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
          <h2 className="text-xl md:text-2xl font-bold mb-3">Program Overview</h2>
          <p className="text-sm md:text-base text-slate-200 mb-4">
            This is a DOL-approved apprenticeship program registered with the Indiana Department of Labor.
            You'll work in a real barbershop, learning from licensed barbers while earning income and
            building the hours required for Indiana state licensure.
          </p>
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-orange-300 mb-2">Indiana State Requirements</h3>
            <p className="text-sm text-slate-200">
              The Indiana Professional Licensing Agency requires <strong>1,500 hours</strong> of supervised
              training to qualify for the Indiana Barber License examination. Our apprenticeship program
              is designed to meet these requirements while providing real-world experience and income.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Duration
            </h3>
            <p className="text-sm text-slate-200">12–18 Months</p>
            <p className="text-xs text-slate-400 mt-1">1,500 hours required by Indiana</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Format
            </h3>
            <p className="text-sm text-slate-200">
              On-the-Job Training + Classroom Instruction
            </p>
            <p className="text-xs text-slate-400 mt-1">Supervised by licensed Indiana barbers</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Funding
            </h3>
            <p className="text-sm text-slate-200">
              DOL Apprenticeship • WIOA • Earn While You Learn
            </p>
            <p className="text-xs text-slate-400 mt-1">Wages increase with experience</p>
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
          <p className="text-sm text-slate-300 mb-3">
            Curriculum aligned with Indiana Professional Licensing Agency requirements:
          </p>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
            <li>Hair cutting, styling, and grooming techniques (all hair types)</li>
            <li>Shaving, beard trimming, and facial grooming</li>
            <li>Sanitation, safety, and Indiana state board requirements</li>
            <li>Chemical services (coloring, relaxers, perms)</li>
            <li>Scalp treatments and hair care</li>
            <li>Customer service and shop management</li>
            <li>Business skills for future shop ownership</li>
            <li>Milady curriculum and Indiana state licensing exam preparation</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-slate-900 p-6 mb-6">
          <h2 className="text-xl font-bold mb-3 text-blue-300">Indiana Licensing Path</h2>
          <div className="space-y-4 text-sm text-slate-200">
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Step 1: Complete Apprenticeship</h3>
              <p>Complete 1,500 hours of supervised training under a licensed Indiana barber. Our program tracks your hours and ensures compliance with all state requirements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Step 2: Pass State Examination</h3>
              <p>Take and pass the Indiana Barber License examination administered by the Indiana Professional Licensing Agency. Exam includes both written and practical components.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-200 mb-2">Step 3: Obtain License</h3>
              <p>Upon passing the exam, receive your Indiana Barber License. This allows you to work independently in any barbershop in Indiana or open your own shop.</p>
            </div>
            <div className="bg-blue-900/30 border border-blue-500/30 rounded p-3 mt-4">
              <p className="text-xs">
                <strong>Note:</strong> Indiana requires all barbers to be licensed. Our apprenticeship program is registered with the Indiana Department of Labor and meets all requirements set by the Indiana Professional Licensing Agency (IC 25-7-5).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-slate-900 p-6">
          <h2 className="text-xl font-bold mb-3">Apprenticeship Benefits</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1 mb-4">
            <li><strong>Earn While You Learn</strong> - Get paid as you train (starting $12-15/hr)</li>
            <li><strong>State-Approved</strong> - DOL registered apprenticeship, Indiana compliant</li>
            <li><strong>Real Experience</strong> - Work in actual barbershops across Indianapolis</li>
            <li><strong>License Track</strong> - Build hours toward Indiana state licensure</li>
            <li><strong>Support Services</strong> - Coaching, case management, and exam prep</li>
            <li><strong>Career Placement</strong> - Job placement assistance upon completion</li>
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

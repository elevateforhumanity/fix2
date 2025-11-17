import Link from 'next/link';
import Image from 'next/image';

const programs = [
  {
    slug: '/programs/barber',
    name: 'Barber Apprenticeship (Milady-Powered)',
    tag: 'Apprenticeship · License Track',
    summary:
      'Milady curriculum, shop-based experience, and Elevate tracking for learners moving toward real barber careers and licensing support.',
  },
  {
    slug: '/programs/cna',
    name: 'Certified Nursing Assistant (CNA)',
    tag: 'Healthcare · State Certified',
    summary:
      'Get your CNA certification in 6-8 weeks. Train in real hospitals and nursing homes. State exam included. Most students pay $0 through WIOA/WRG.',
  },
  {
    slug: '/programs/hvac',
    name: 'HVAC Technician (Partner School)',
    tag: 'Skilled Trades · External School',
    summary:
      'Elevate as the front door and connector to a trusted HVAC school, with visibility for case managers and employers.',
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/40">
              <span className="text-sm font-bold text-emerald-300">EFH</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-50">
                Elevate for Humanity
              </span>
              <span className="text-[0.7rem] text-slate-400">
                Elevate Connects Directory
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <Link href="/programs" className="text-emerald-300">
              Programs
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-300">
              How Elevate Works
            </Link>
            <Link href="/partners" className="hover:text-emerald-300">
              For Agencies & Partners
            </Link>
            <Link href="/about" className="hover:text-emerald-300">
              About
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[0.7rem] text-slate-100 hover:border-emerald-400 hover:text-emerald-200"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-16">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Elevate programs
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.7rem]">
              Programs that speak the same language as your community.
            </h1>
            <p className="text-sm text-slate-300">
              Every pathway is designed so a learner, a parent, a pastor, and a
              case manager can read it and instantly understand what it is, who
              it is for, and how it leads to work.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Link href="/programs/barber" className="group">
              <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-emerald-400/70 transition-all">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                    alt="Barber training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-emerald-300">
                    Apprenticeship · License Track
                  </p>
                  <h2 className="text-[0.98rem] font-semibold text-slate-50">
                    Barber Apprenticeship (Milady-Powered)
                  </h2>
                  <p className="text-[0.84rem] text-slate-300">
                    Milady curriculum, shop-based experience, and Elevate
                    tracking for learners moving toward real barber careers and
                    licensing support.
                  </p>
                  <div className="pt-2 font-semibold text-emerald-300 hover:text-emerald-200">
                    View this pathway →
                  </div>
                </div>
              </article>
            </Link>

            <Link href="/programs/cna" className="group">
              <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-sky-400/70 transition-all">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt="CNA training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-sky-300">
                    Healthcare · State Certified
                  </p>
                  <h2 className="text-[0.98rem] font-semibold text-slate-50">
                    Certified Nursing Assistant (CNA)
                  </h2>
                  <p className="text-[0.84rem] text-slate-300">
                    Get your CNA certification in 6-8 weeks. Train in real
                    hospitals and nursing homes. State exam included. Most
                    students pay $0 through WIOA/WRG.
                  </p>
                  <div className="pt-2 font-semibold text-sky-300 hover:text-sky-200">
                    View this pathway →
                  </div>
                </div>
              </article>
            </Link>

            <Link href="/programs/hvac" className="group">
              <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-emerald-400/70 transition-all">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                    alt="HVAC training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-emerald-300">
                    Skilled Trades · External School
                  </p>
                  <h2 className="text-[0.98rem] font-semibold text-slate-50">
                    HVAC Technician (Partner School)
                  </h2>
                  <p className="text-[0.84rem] text-slate-300">
                    Elevate as the front door and connector to a trusted HVAC
                    school, with visibility for case managers and employers.
                  </p>
                  <div className="pt-2 font-semibold text-emerald-300 hover:text-emerald-200">
                    View this pathway →
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[0.75rem] text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>
            © {new Date().getFullYear()} Elevate for Humanity. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms" className="hover:text-emerald-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-emerald-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-emerald-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

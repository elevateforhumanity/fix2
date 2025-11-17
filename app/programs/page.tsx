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
    slug: '/programs/medical-assistant',
    name: 'Medical Assistant Pathway',
    tag: 'Healthcare · Partner Program',
    summary:
      'Partner medical assistant training wrapped in Elevate onboarding, reminders, and reporting for agencies and healthcare employers.',
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

            <Link href="/programs/medical-assistant" className="group">
              <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.65)] hover:border-sky-400/70 transition-all">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt="Medical assistant training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-sky-300">
                    Healthcare · Partner Program
                  </p>
                  <h2 className="text-[0.98rem] font-semibold text-slate-50">
                    Medical Assistant Pathway
                  </h2>
                  <p className="text-[0.84rem] text-slate-300">
                    Partner medical assistant training wrapped in Elevate
                    onboarding, reminders, and reporting for agencies and
                    healthcare employers.
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
    </main>
  );
}

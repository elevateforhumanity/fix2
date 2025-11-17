import Link from 'next/link';

const bullets = [
  'Milady-powered barbering curriculum for theory, safety, and technique.',
  'Shop-based experience where learners can observe, assist, and grow into the chair.',
  'Elevate LMS tracking for attendance, milestones, and apprenticeship hours.',
  'Live Q&A spaces so learners can ask real questions and stay encouraged.',
  'A clear path toward state barber licensing support and long-term careers.',
];

const fits = [
  'Young adults who want a trade that lets them create and connect with people.',
  'Helpers already in the shop who are ready for structured growth and licensing.',
  'Career changers coming from retail, warehouse, or gig work.',
  'Learners referred by WorkOne, EmployIndy, churches, and local partners.',
];

export default function BarberProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Barber apprenticeship · Milady-powered
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
              Barber Apprenticeship Pathway
            </h1>
            <p className="text-sm text-slate-300">
              Elevate's barber apprenticeship pathway combines Milady's trusted
              curriculum, real barbershop experience, and LMS tracking so
              learners, shops, and agencies can move together toward
              licensing—not guess their way through it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply/barber"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Apply for the barber pathway
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-300 hover:text-emerald-100"
              >
                Host apprentices or refer learners
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr,0.9fr] md:items-start">
            <div className="space-y-3 text-sm text-slate-200">
              <h2 className="text-[1.1rem] font-semibold text-slate-50">
                What this pathway is designed to do.
              </h2>
              <p className="text-slate-300">
                This pathway is built so shops can do what they do best—build
                barbers—while Elevate and Milady provide structure, content, and
                documentation.
              </p>
              <ul className="mt-3 space-y-2">
                {bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.75)]">
              <h3 className="text-[0.95rem] font-semibold text-slate-50">
                Who this is a good fit for.
              </h3>
              <ul className="mt-3 space-y-2">
                {fits.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] text-slate-400">
                Exact licensing rules and apprenticeship requirements vary by
                state. Elevate helps learners understand the path and stay
                organized alongside shop owners and agencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

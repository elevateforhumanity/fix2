import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';

// Default to Google Form for general applications
const APPLICATION_URL = import.meta.env.VITE_APPLICATION_FORM_URL || '/apply';

export default function EFHLanding() {
  return (
    <div className="min-h-screen bg-white text-brown-900">
      {/* Top bar */}
      <header className="w-full border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-widest text-brown-500">
                Elevate for Humanity
              </p>
              <h1 className="text-lg font-bold text-brown-900">
                Career & Technical Institute
              </h1>
            </div>
          </div>
          <nav
            role="navigation"
            className="hidden md:flex items-center gap-6 text-sm"
          >
            <a className="hover:text-orange-600" href="/">
              Home
            </a>
            <a className="hover:text-orange-600" href="/programs">
              Programs
            </a>
            <a className="hover:text-orange-600" href="/about">
              About
            </a>
            <a className="hover:text-orange-600" href="/contact">
              Contact
            </a>
          </nav>
        </div>
      </header>
      {/* Heritage hero banner */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                Indiana • Workforce Development
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-brown-900">
                Learn • Grow • Achieve
              </h2>
              <p className="mt-4 text-brown-600 leading-relaxed">
                Elevate for Humanity powers paid apprenticeships and stackable
                credentials across Indiana. We connect learners with
                state-approved training, employer partners, and funding — so you
                can start a career without the debt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-white font-semibold shadow hover:bg-orange-700"
                >
                  Explore Programs
                </a>
                <a
                  href={APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-brown-300 px-5 py-3 font-semibold text-slate-800 hover:border-slate-400"
                >
                  Apply Now
                </a>
              </div>
              <p className="mt-3 text-xs text-brown-500">
                Start with Indiana Career Connect • Funding: WIOA • WRG • WEX •
                OJT • Apprenticeship
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-orange-200 shadow-lg">
                <img
                  src="/images/hero-banner.jpg"
                  alt="Elevate for Humanity — Career & Technical Training"
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to barber hero if new image not found
                    e.currentTarget.src = '/images/efh-barber-hero.jpg';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block rounded-2xl border border-brown-200 bg-white p-4 shadow-lg">
                <p className="text-xs font-semibold text-brown-500">
                  State-Approved Provider • DOL Apprenticeship Sponsor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Programs grid */}
      <section className="bg-beige-50 border-y border-brown-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-brown-900">
                Featured Programs
              </h3>
              <p className="mt-1 text-brown-600">
                State-funded pathways with real employer partners and paid
                on‑the‑job training.
              </p>
            </div>
            <a
              href="/programs"
              className="hidden md:inline-flex rounded-lg border border-brown-300 px-4 py-2 text-sm font-semibold hover:border-slate-400"
            >
              View all
            </a>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Show first 2 programs from data */}
            {programs.slice(0, 2).map((p) => (
              <ProgramCard 
                key={p.slug} 
                icon="📚"
                title={p.name}
                duration="12-24 weeks"
                description={p.summary}
                funding={p.funding.join(', ')}
                href={`/programs/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* How it works */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h3 className="text-2xl font-bold text-brown-900">
            How Enrollment Works
          </h3>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="rounded-2xl border border-brown-200 p-5">
              <p className="text-sm font-semibold text-brown-900">
                1) Start Your Application
              </p>
              <p className="mt-1 text-brown-600">
                Complete the Elevate interest form and apply through Indiana
                Connect.
              </p>
            </li>
            <li className="rounded-2xl border border-brown-200 p-5">
              <p className="text-sm font-semibold text-brown-900">
                2) Funding & Placement
              </p>
              <p className="mt-1 text-brown-600">
                We match you to WIOA/WRG funding and an employer partner for
                paid OJT.
              </p>
            </li>
            <li className="rounded-2xl border border-brown-200 p-5">
              <p className="text-sm font-semibold text-brown-900">
                3) Train & Earn
              </p>
              <p className="mt-1 text-brown-600">
                Complete related instruction while logging on‑the‑job hours
                toward your credential.
              </p>
            </li>
          </ol>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-brown-200">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brown-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Elevate for Humanity — Learn • Grow
              • Achieve
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-orange-600">
                Privacy
              </a>
              <a href="/terms" className="hover:text-orange-600">
                Terms
              </a>
              <a href="/contact" className="hover:text-orange-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';

export default function ProgramsPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-50 to-white border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-300">
                Indiana Workforce Development
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text">
                Our Programs
              </h1>
              <p className="mt-4 text-lg text-brand-text-muted leading-relaxed">
                State-funded pathways with real employer partners and paid on-the-job
                training. Start your career without the debt.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white px-3 py-1 text-brand-text font-medium shadow-sm">
                  Paid Apprenticeships
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-brand-text font-medium shadow-sm">
                  Stackable Credentials
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-brand-text font-medium shadow-sm">
                  Employer Partnerships
                </span>
              </div>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-orange-200 shadow-lg">
              <img
                src="/images/programs-banner.jpg"
                alt="Elevate for Humanity Programs"
                className="h-full w-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/images/efh-barber-hero.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

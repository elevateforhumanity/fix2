// app/page.tsx - Full Sail University Style
import Image from "next/image";
import Link from "next/link";

export default function ElevateHomepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Full Width */}
      <section className="relative h-[700px] overflow-hidden">
        <Image
          src="/media/homepage-hero.jpg"
          alt="Career training that changes lives"
          fill
          className="object-cover brightness-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/50 to-transparent" />
        
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              FREE Training for Those Who Qualify
            </div>
            
            <h1 className="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Career Training.<br />
              <span className="text-red-400">100% Funded.</span>
            </h1>
            
            <p className="mt-6 text-xl leading-relaxed text-gray-100 sm:text-2xl">
              WIOA, WRG, DOL, and JRI funding available. Most learners pay <span className="font-bold text-white">$0</span> when approved. Hybrid and in-person options.
            </p>

            {/* Highlight Boxes */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-sm font-semibold text-red-300">WIOA & WRG Funded</div>
                <div className="mt-1 text-sm text-gray-200">Workforce Innovation & Opportunity Act + Workforce Ready Grant programs cover tuition, books, and supplies</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20">
                <div className="text-sm font-semibold text-blue-300">DOL & JRI Pathways</div>
                <div className="mt-1 text-sm text-gray-200">Department of Labor apprenticeships + Justice Reinvestment Initiative for re-entry learners</div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-red-700 transition transform hover:scale-105"
              >
                Check My Eligibility →
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
              >
                View Programs
              </Link>
            </div>
            
            {/* Stats Bar */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/30 pt-6">
              <div>
                <div className="text-3xl font-bold text-white">$0</div>
                <div className="text-xs text-gray-300">Cost for qualified learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">Hybrid</div>
                <div className="text-xs text-gray-300">Online + in-person options</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="text-xs text-gray-300">Job placement rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS - 3 Columns */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <ValueCard
              title="100% Funded Training"
              description="WIOA, JRI, OJT, and WEX funding available. Most learners pay $0 when approved."
              color="red"
            />
            <ValueCard
              title="Barrier-Aware Support"
              description="Childcare, transportation, records, schedules. We wrap support around you."
              color="orange"
            />
            <ValueCard
              title="Real Job Pipelines"
              description="Apprenticeships and employer partnerships, not just classes and hope."
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Career Programs
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Focused pathways to in-demand careers
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ProgramCard
              image="/media/programs/medical-hd.jpg"
              title="Healthcare"
              description="Medical Assistant, CNA, HHA"
              tag="High Demand"
              tagColor="red"
            />
            <ProgramCard
              image="/media/programs/barber.jpg"
              title="Barber"
              description="Apprenticeship & Licensure"
              tag="Re-entry Friendly"
              tagColor="orange"
            />
            <ProgramCard
              image="/media/programs/hvac-hd.jpg"
              title="HVAC"
              description="Installation & Maintenance"
              tag="Skilled Trade"
              tagColor="blue"
            />
            <ProgramCard
              image="/media/programs/cdl-hd.jpg"
              title="CDL"
              description="Commercial Driving"
              tag="Fast Track"
              tagColor="red"
            />
            <ProgramCard
              image="/media/programs/welding-hd.jpg"
              title="Welding"
              description="Structural & Pipe Welding"
              tag="Skilled Trade"
              tagColor="blue"
            />
            <ProgramCard
              image="/media/programs/culinary-hd.jpg"
              title="Culinary Arts"
              description="Professional Cooking"
              tag="Creative Career"
              tagColor="orange"
            />
            <ProgramCard
              image="/media/programs/beauty-hd.jpg"
              title="Beauty & Esthetics"
              description="Cosmetology & Skin Care"
              tag="Licensed Career"
              tagColor="orange"
            />
            <ProgramCard
              image="/media/programs/building-hd.jpg"
              title="Building Maintenance"
              description="Facilities & Property"
              tag="Stable Career"
              tagColor="blue"
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 px-8 py-4 text-lg font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold">
                Built for Real People
              </h2>
              <p className="mt-6 text-lg text-gray-300">
                Elevate For Humanity serves adults, parents, justice-involved learners, and career changers who need more than just a class.
              </p>
              <ul className="mt-8 space-y-4">
                <ListItem>Adults seeking career change</ListItem>
                <ListItem>Justice-involved individuals (JRI pathways)</ListItem>
                <ListItem>Parents balancing family and training</ListItem>
                <ListItem>Workforce board referrals</ListItem>
              </ul>
              <div className="mt-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white hover:bg-red-700 transition"
                >
                  Check Your Eligibility
                </Link>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl">
              <Image
                src="/images/programs/efh-public-safety-reentry-hero.jpg"
                alt="Learners in training"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-96 overflow-hidden rounded-2xl lg:order-1">
              <Image
                src="/media/programs/building-hd.jpg"
                alt="Employer partnerships"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:order-2">
              <h2 className="text-4xl font-bold text-slate-900">
                Employer Partnerships
              </h2>
              <p className="mt-6 text-lg text-slate-600">
                Build talent pipelines with pre-screened, trained candidates ready for your industry.
              </p>
              <ul className="mt-8 space-y-4">
                <ListItem dark>OJT and WEX funding available</ListItem>
                <ListItem dark>Apprenticeship program design</ListItem>
                <ListItem dark>Ongoing support for hires</ListItem>
                <ListItem dark>Workforce board coordination</ListItem>
              </ul>
              <div className="mt-8">
                <Link
                  href="/employers"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Free training. Real support. Real jobs.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-slate-900 hover:bg-gray-100 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper Components */

function ValueCard({ title, description, color }: { title: string; description: string; color: string }) {
  const colorClasses = {
    red: 'border-red-200 bg-red-50',
    orange: 'border-orange-200 bg-orange-50',
    blue: 'border-blue-200 bg-blue-50',
  };

  return (
    <div className={`rounded-2xl border-2 p-8 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-slate-700">{description}</p>
    </div>
  );
}

function ProgramCard({ image, title, description, tag, tagColor }: any) {
  const tagColors = {
    red: 'bg-red-600',
    orange: 'bg-orange-600',
    blue: 'bg-blue-600',
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${tagColors[tagColor as keyof typeof tagColors]}`}>
            {tag}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{description}</p>
        <div className="mt-4">
          <Link
            href={`/programs/${title.toLowerCase()}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ListItem({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <svg className={`h-6 w-6 flex-shrink-0 ${dark ? 'text-blue-600' : 'text-green-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className={dark ? 'text-slate-700' : 'text-gray-300'}>{children}</span>
    </li>
  );
}

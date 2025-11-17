import Link from 'next/link';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Adult learners engaged in class.',
  },
  {
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Trainer supporting a learner on a computer.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    alt: 'Skilled trades student working with tools.',
  },
];

const programs = [
  {
    name: 'Barber Apprenticeship (Milady-Powered)',
    slug: '/programs/barber',
    tag: 'Apprenticeship • License Track',
    blurb:
      'State-aligned barber pathway powered by Milady content, Elevate live support, and barbershop-based apprenticeship experience.',
  },
  {
    name: 'Certified Nursing Assistant (CNA)',
    slug: '/programs/cna',
    tag: 'Healthcare • High Demand',
    blurb:
      'CNA career pathway with credentialing partner content, Elevate coaching, and reporting built for WorkOne, WRG, and EmployIndy.',
  },
  {
    name: 'HVAC Technician',
    slug: '/programs/hvac',
    tag: 'Skilled Trades • Essential Services',
    blurb:
      'Hands-on HVAC training built with industry input, OSHA-informed safety, and job-focused skills for residential and light commercial work.',
  },
  {
    name: 'Building Maintenance & Facilities',
    slug: '/programs/building-maintenance',
    tag: 'Facilities • Multi-Trade',
    blurb:
      'Building technician training that blends basic electrical, plumbing, carpentry, and safety for apartment, campus, and facility roles.',
  },
  {
    name: 'CDL & Transportation Pathways',
    slug: '/programs/truck-driving',
    tag: 'Logistics • Mobility',
    blurb:
      'Transportation and CDL-aligned pathways designed with employer demand and workforce partners to move people into higher-wage roles.',
  },
  {
    name: 'Online Micro-Credentials & Short Courses',
    slug: '/programs/online',
    tag: 'Flexible • Online',
    blurb:
      "Short, stackable online credentials that plug into Elevate's LMS and partner content so learners can upskill anytime, from anywhere.",
  },
];

const partnerBadges = [
  'DOL Apprenticeship Aligned',
  'Indiana DWD & WorkOne Aware',
  'EmployIndy & Local Boards Friendly',
  'ETPL / WRG / JRI Ready',
  'Built Around Credentialing Partners',
];

const steps = [
  {
    title: '1. Refer learners into a single Elevate pathway.',
    body: 'Agencies, schools, churches, and employers send learners through one simple Elevate front door instead of ten different links.',
  },
  {
    title: '2. Elevate orchestrates partners, live support, and paperwork.',
    body: 'Learners move through credentialing partner courses, Elevate live sessions, and required forms inside one LMS experience.',
  },
  {
    title:
      '3. Partners issue credentials, Elevate issues completion, agencies see outcomes.',
    body: 'Partners handle licenses and credentials. Elevate issues completion certificates and exports reports for WorkOne, WRG, JRI, and boards.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 md:flex-row md:items-center md:pb-24 md:pt-24 lg:px-6">
          {/* LEFT: MESSAGE */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-200">
              Elevate for Humanity · Elevate Connects Directory
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Workforce training, apprenticeships, and credentials that{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                actually move people into careers.
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Elevate for Humanity connects learners, agencies, and
              credentialing partners through one modern LMS. We blend partner
              courses, live instruction, and real-world apprenticeships into
              clear pathways that boards can trust and participants can finish.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                View Elevate Programs
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-emerald-100"
              >
                Become a Referral or Training Partner
              </Link>
            </div>

            <div className="mt-4 grid gap-4 text-xs text-slate-300 sm:grid-cols-3 sm:text-[0.8rem]">
              <div>
                <p className="font-semibold text-slate-100">
                  Built for workforce boards.
                </p>
                <p className="text-slate-400">
                  WIOA, WRG, JRI, DWD, WorkOne, and EmployIndy needs are baked
                  into how programs are designed and tracked.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  Partner-powered content.
                </p>
                <p className="text-slate-400">
                  Milady, CNA partners, IT providers, and online platforms
                  deliver curriculum and credentials. Elevate orchestrates the
                  journey.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  Clear outcomes and reporting.
                </p>
                <p className="text-slate-400">
                  Attendance, hours, completions, and job outcomes organized in
                  one place and ready to export for reports and audits.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGERY */}
          <div className="relative mx-auto max-w-md flex-1">
            <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-24 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />

            <div className="grid gap-4 sm:grid-cols-2">
              {heroImages.map((img, idx) => (
                <div
                  key={img.src}
                  className={`overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/70 shadow-lg shadow-black/40 ${
                    idx === 0 ? 'sm:row-span-2 sm:h-72' : 'h-40'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-slate-900/80 px-4 py-3 text-xs text-slate-100 shadow-lg shadow-emerald-500/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-200">
                EFH
              </div>
              <div>
                <p className="font-semibold">
                  Ready-to-onboard LMS for real students and funded cohorts.
                </p>
                <p className="text-[0.7rem] text-slate-400">
                  Elevate combines credentialing partners, apprenticeships, and
                  live support under one digital roof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER / TRUST STRIP */}
      <section className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-[0.8rem] lg:px-6">
          <p className="font-semibold text-slate-200">
            Designed so case managers, pastors, principals, and employers feel
            confident sending people here.
          </p>
          <div className="flex flex-wrap gap-3">
            {partnerBadges.map((label) => (
              <div
                key={label}
                className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                Pathways that feel real, not theoretical.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Every Elevate pathway blends partner courses, live coaching, and
                real-world experience. Programs are written in everyday language
                so learners, parents, and case managers can instantly see the
                opportunity.
              </p>
            </div>
            <Link
              href="/programs"
              className="mt-2 inline-flex items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20"
            >
              Explore all programs
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/30 transition hover:border-emerald-400/70 hover:bg-slate-900"
              >
                <div className="space-y-2">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-wide text-emerald-300">
                    {program.tag}
                  </p>
                  <h3 className="text-base font-semibold text-slate-50">
                    {program.name}
                  </h3>
                  <p className="text-sm text-slate-300">{program.blurb}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={program.slug}
                    className="text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    View program details →
                  </Link>
                  <span className="text-[0.7rem] text-slate-500">
                    Cohorts & referrals welcome
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE BREAKDOWN */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                For learners & families
              </h2>
              <p className="text-sm text-slate-300">
                Easy-to-understand program pages, clear steps to enroll, and a
                dashboard that shows what&apos;s next. No corporate jargon. Just
                real options and support.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li>• Simple enrollment flow</li>
                <li>• Text and email reminders</li>
                <li>
                  • Clear "what you will learn" and "jobs you can get" sections
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                For agencies & boards
              </h2>
              <p className="text-sm text-slate-300">
                A front door you can trust. Cohorts can be tracked, hours
                logged, and completion reports exported without chasing paper or
                ten separate portals.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li>• Referral-friendly landing pages</li>
                <li>• Completion & credential tracking</li>
                <li>• Reporting designed with WRG, JRI, and WIOA in mind</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                For employers & shops
              </h2>
              <p className="text-sm text-slate-300">
                Elevate becomes your talent farm. Barber chairs, CNA shifts,
                building tech roles, and HVAC trucks filled with people who have
                actually trained for the work.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li>• Apprenticeship and OJT-friendly structures</li>
                <li>• Employer interest & placement tracking</li>
                <li>• Easy way to host cohorts or offer site visits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] md:items-start">
            <div>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                Under the hood: a serious LMS tuned to your reality.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Elevate doesn&apos;t replace Milady, CNA schools, or online
                providers. It wraps around them. Your partners keep teaching and
                issuing their credentials. Elevate organizes the journey, the
                touchpoints, and the paperwork so everyone stays on the same
                page.
              </p>
              <div className="mt-6 space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <h3 className="text-sm font-semibold text-slate-100">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-5 shadow-xl shadow-emerald-500/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                What Elevate handles for you
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                <li>
                  • Course orchestration across multiple credentialing partners
                </li>
                <li>• Automated welcome, reminder, and completion messaging</li>
                <li>• Internal quizzes and knowledge checks</li>
                <li>• Document collection for WIOA, WRG, and agency forms</li>
                <li>• Completion logs and certificates of completion</li>
                <li>• Exports for funders, boards, and audits</li>
              </ul>
              <p className="mt-4 text-[0.8rem] text-slate-400">
                This is the difference between a "nice website" and a hub that
                can actually sit in the middle of your city&apos;s workforce
                system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND / VISION BLOCK */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="grid gap-8 md:grid-cols-[1.1fr,1fr] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                Elevate is building more than programs. It&apos;s building a
                pillar.
              </h2>
              <p className="text-sm text-slate-300">
                The Elevate Connects Directory and Elevate for Humanity
                ecosystem were created so Indianapolis and beyond have a
                consistent, trusted place to send people for training, support,
                and direction. Not a brochure. Not a pop-up project. A real
                pillar for the community.
              </p>
              <p className="text-sm text-slate-300">
                When someone is ready to move, we want "Go to Elevate" to be the
                first sentence out of a case manager&apos;s mouth. This homepage
                is the front door to that promise.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-xl shadow-black/30">
              <p className="italic">
                "Our mission is simple: take the confusion out of training and
                put real opportunity back in front of people, one pathway at a
                time."
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Elevate for Humanity · Elevate Connects Directory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="bg-gradient-to-r from-emerald-600 via-sky-500 to-amber-400">
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-950 lg:px-6 lg:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Ready to onboard your first or next cohort?
              </h2>
              <p className="mt-2 max-w-xl text-sm">
                Use Elevate as your front door for barber, CNA, HVAC, building
                tech, and more. We&apos;ll help you plug in credentialing
                partners, structure live instruction, and deliver the compliance
                and outcomes your funders expect.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold text-emerald-200 shadow-lg shadow-slate-900/60 hover:text-white"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/60 bg-white/90 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white"
              >
                See the LMS in Action
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

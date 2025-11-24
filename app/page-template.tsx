// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function ElevateLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* TOP HERO GRID (inspired by the template screenshot) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.4fr_0.95fr] lg:px-8">
          {/* LEFT COLUMN – intro + mini panels */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                ELEVATE FOR HUMANITY
              </p>
              <h1 className="mt-3 text-2xl font-semibold leading-snug text-slate-900">
                We know{' '}
                <span className="text-red-600">
                  people, pathways, and approvals.
                </span>
              </h1>
              <p className="mt-3 text-sm text-slate-700">
                Free and funded career training for adults, parents,
                justice-involved learners, and career changers in Indiana and
                beyond.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 ring-1 ring-red-200">
                  WIOA · JRI · OJT · WEX
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 ring-1 ring-blue-200">
                  Employers & workforce boards
                </span>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                  WE UNDERSTAND BARRIERS
                </p>
                <p className="mt-2 text-slate-700">
                  Childcare, transportation, records, schedules. Our team and
                  platform wrap support around the learner.
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  WE BRING EMPLOYERS IN EARLY
                </p>
                <p className="mt-2 text-slate-700">
                  Apprenticeships, OJT, and talent pipelines – not just "take a
                  class and hope."
                </p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN – big hero collage like the template */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 ring-1 ring-slate-800">
              {/* big image */}
              <div className="relative h-64 sm:h-80">
                <Image
                  src="/assets/hero-training.jpg"
                  alt="Learners in training and on the job"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                  <span className="inline-flex max-w-xs rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-slate-900 shadow">
                    Free & funded training · Healthcare · Trades · CDL · Barber
                  </span>
                  <p className="max-w-xs text-xs text-slate-100/90">
                    Use this hero image for flyers, social, and QR codes to
                    explain Elevate in one glance.
                  </p>
                </div>
              </div>

              {/* strip of stats like the template numbers */}
              <div className="grid gap-3 border-t border-slate-800 bg-slate-950/60 px-4 py-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Cost for most
                  </p>
                  <p className="text-xl font-semibold text-orange-300">$0</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Career pathways
                  </p>
                  <p className="text-xl font-semibold text-orange-300">12+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    Job / apprenticeship placement
                  </p>
                  <p className="text-xl font-semibold text-blue-300">85%</p>
                </div>
              </div>
            </div>

            {/* three small stacked images like in the screenshot */}
            <div className="grid grid-cols-3 gap-3">
              <HeroThumb src="/generated-images/course-barber-cover.png" label="Barber" />
              <HeroThumb src="/generated-images/course-healthcare-cover.png" label="Healthcare" />
              <HeroThumb src="/generated-images/course-hvac-cover.png" label="HVAC & trades" />
            </div>
          </div>

          {/* RIGHT COLUMN – services / CTAs like template side panels */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-slate-900/80 p-5 ring-1 ring-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                OUR SERVICES
              </p>
              <div className="mt-3 space-y-3 text-sm">
                <ServiceRow title="Funded career training">
                  Healthcare, trades, CDL, barber, building maintenance and
                  more.
                </ServiceRow>
                <ServiceRow title="Re-entry coaching">
                  Justice-involved and court-connected pathways with structure.
                </ServiceRow>
                <ServiceRow title="Employer pipelines">
                  OJT, WEX, and apprenticeship pipelines built around real jobs.
                </ServiceRow>
                <ServiceRow title="Case management & tech">
                  Attendance, milestones, and communication in one ecosystem.
                </ServiceRow>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-blue-600 p-5 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                MAKE YOUR LEARNERS&apos; DREAMS REAL
              </p>
              <p className="mt-3 text-lg font-semibold">
                For learners, employers, and partners who are ready to move.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <Link
                  href="/apply"
                  className="block w-full rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  I&apos;m a learner – check my eligibility
                </Link>
                <Link
                  href="/employers"
                  className="block w-full rounded-full bg-slate-950/20 px-4 py-2 text-center text-sm font-semibold text-white ring-1 ring-white/50 hover:bg-slate-950/40"
                >
                  I&apos;m an employer / partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR WORK / PROGRAMS STRIP – like lower panels in the template */}
      <section className="bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                OUR WORK
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Focused, funded pathways – not random classes.
              </h2>
            </div>
            <Link
              href="/programs"
              className="rounded-full border border-orange-400/70 px-5 py-2 text-sm font-semibold text-orange-200 hover:bg-orange-500 hover:text-slate-950"
            >
              View all programs
            </Link>
          </div>

          {/* image row like template "our work" thumbnails */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <WorkCard
              src="/generated-images/course-cdl-cover.png"
              title="CDL & logistics"
              tag="High-demand"
            />
            <WorkCard
              src="/generated-images/course-healthcare-cover.png"
              title="Healthcare careers"
              tag="Clinical & admin"
            />
            <WorkCard
              src="/generated-images/course-barber-cover.png"
              title="Barber apprenticeship"
              tag="Re-entry friendly"
            />
            <WorkCard
              src="/generated-images/course-hvac-cover.png"
              title="HVAC & building tech"
              tag="Skilled trades"
            />
          </div>
        </div>
      </section>

      {/* BOTTOM STRIP – quick numbers + contact */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="grid flex-1 gap-4 text-center sm:grid-cols-3 sm:text-left">
            <Stat label="Counties served & growing" value="Marion + more" />
            <Stat label="Learner types" value="Adult · Re-entry · Youth" />
            <Stat label="Partners" value="Employers · Courts · Boards" />
          </div>
          <div className="flex flex-col gap-2 text-center lg:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              READY TO CONNECT?
            </p>
            <p className="text-sm text-slate-200">
              Use this site as your digital one-pager for learners, employers,
              and partners.
            </p>
            <Link
              href="/contact"
              className="mt-1 inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2 text-xs font-semibold text-slate-100 hover:border-orange-400 hover:bg-slate-900"
            >
              Contact the Elevate team →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Small helper components (same file for simplicity) --- */

type HeroThumbProps = { src: string; label: string };

function HeroThumb({ src, label }: HeroThumbProps) {
  return (
    <div className="group relative h-24 overflow-hidden rounded-2xl bg-slate-900/80 ring-1 ring-slate-800">
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      <p className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
        {label}
      </p>
    </div>
  );
}

type ServiceRowProps = {
  title: string;
  children: React.ReactNode;
};

function ServiceRow({ title, children }: ServiceRowProps) {
  return (
    <div className="border-b border-slate-800/70 pb-3 last:border-none last:pb-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
        {title}
      </p>
      <p className="mt-1 text-xs text-slate-200">{children}</p>
    </div>
  );
}

type WorkCardProps = {
  src: string;
  title: string;
  tag: string;
};

function WorkCard({ src, title, tag }: WorkCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900/80 ring-1 ring-slate-800">
      <div className="relative h-40">
        <Image src={src} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent transition group-hover:from-slate-950/60" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <span className="inline-flex rounded-full bg-red-500/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {tag}
        </span>
        <p className="mt-1 text-sm font-semibold text-slate-50">{title}</p>
      </div>
    </div>
  );
}

type StatProps = { label: string; value: string };

function Stat({ label, value }: StatProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

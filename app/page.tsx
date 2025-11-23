// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO – clear message + visual */}
      <section className="border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-700/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 md:flex-row md:px-10 lg:pt-16">
          {/* Left: text */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              100% funded career training • Marion County & beyond
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-[2.7rem] leading-tight">
              Elevate For Humanity:
              <span className="text-emerald-300"> funded training, real support, real jobs.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-200">
              We connect people to grant-funded training, wraparound support, and employers
              who are ready to hire — not just collect applications. Healthcare, trades,
              CDL, re-entry and more, with Elevate walking alongside you the whole way.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
              >
                Get started free
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
              >
                Explore training programs
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] text-emerald-300">
                  0$
                </span>
                <span>Most learners pay little to nothing if eligible.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] text-emerald-300">
                  ✓
                </span>
                <span>Approved programs with workforce & employer partners.</span>
              </div>
            </div>
          </div>

          {/* Right: hero visual with video */}
          <div className="w-full max-w-md">
            <div className="relative h-64 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl sm:h-72 md:h-80">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/hero-video-with-audio.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-xs text-slate-100">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    Snapshot
                  </p>
                  <p className="text-xs font-semibold">
                    CNA • CDL • HVAC • Barber • Re-entry &amp; more
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 px-3 py-2 text-[11px]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Outcomes
                  </p>
                  <p className="font-semibold text-emerald-300">Training → Support → Job</p>
                </div>
              </div>
            </div>
            {/* Small trust row under image */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="rounded-full bg-slate-900/80 px-3 py-1">
                Workforce-aligned pathways
              </span>
              <span className="rounded-full bg-slate-900/80 px-3 py-1">
                Employer &amp; board partners
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS – "trusted by" */}
      <section className="border-b border-slate-900 bg-slate-950 py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            Trusted by workforce, training &amp; employer partners
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={`https://placehold.co/200x80/020617/64748b?text=Partner+${i}`}
                  alt={`Partner logo ${i}`}
                  width={200}
                  height={80}
                  className="object-contain opacity-70 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO – light section */}
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600">
              What we do
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              A complete workforce development ecosystem
            </h2>
            <p className="mt-4 text-sm text-slate-600 sm:text-base max-w-3xl mx-auto">
              Elevate For Humanity connects learners, employers, and workforce partners so
              training, support, and job placement are all working together instead of in
              silos.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Training programs */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900">
                🎓 Funded Training Programs
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Career-aligned programs that match real employer demand — delivered with
                partners you already trust or will get to know.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Healthcare: Medical Assistant, CNA, Phlebotomy, Home Health.</li>
                <li>• Trades &amp; technical: HVAC, Electrical, Building Maintenance.</li>
                <li>• Transportation: CDL-A / CDL-B, logistics &amp; support roles.</li>
                <li>• Re-entry, workforce readiness &amp; upskilling for adults.</li>
              </ul>
              <Link
                href="/directory"
                className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-500"
              >
                View all programs →
              </Link>
            </div>

            {/* Funding + support */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900">💰 Funding &amp; access</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Many learners qualify for state and federal funding, employer sponsorship,
                  or other options — we help navigate it with you.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• WIOA, workforce readiness grants &amp; state funding (where approved).</li>
                  <li>• Work Experience (WEX), OJT and apprenticeship options with employers.</li>
                  <li>• Support to understand which paths fit your situation.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900">🤝 Support &amp; technology</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Elevate isn&apos;t just a class list — it&apos;s people, tools and support
                  walking with you.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Coaching, barrier navigation and accountability check-ins.</li>
                  <li>• Student &amp; employer portals for tracking and communication.</li>
                  <li>• Workforce &amp; partner dashboards for outcomes and reporting.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO HUB – three tiles pointing to the new pages */}
      <section className="border-b border-slate-900 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-400">
                Watch how Elevate works
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Short videos that explain Elevate in real language.
              </h2>
            </div>
            <p className="max-w-sm text-xs text-slate-400">
              Use these as QR code destinations on flyers, at events, with re-entry
              partners, and in employer presentations.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 1 – Elevate overview */}
            <VideoTile
              href="/videos/elevate-overview"
              tag="For everyone"
              title="Elevate overview in 60 seconds"
              desc="Who we serve, what we offer, and how to get started without a bunch of jargon."
              duration="~1:00"
              placeholder="https://placehold.co/600x360/020617/22c55e?text=Elevate+Overview"
            />

            {/* 2 – Barber / re-entry */}
            <VideoTile
              href="/videos/barber-spotlight"
              tag="Barber & re-entry"
              title="Barber Apprenticeship: a second-chance pathway"
              desc="From incarceration to owning a chair — how this pathway actually works."
              duration="~2:30"
              placeholder="https://placehold.co/600x360/0f172a/f97316?text=Barber+Spotlight"
            />

            {/* 3 – Employer / pipeline */}
            <VideoTile
              href="/videos/employer-pipeline"
              tag="Employers & partners"
              title="How Elevate supports funded talent pipelines"
              desc="A clear picture for HR, hiring managers and workforce boards."
              duration="~2:00"
              placeholder="https://placehold.co/600x360/022c22/a7f3d0?text=Employer+Pipeline"
            />
          </div>
        </div>
      </section>

      {/* POPULAR PROGRAMS – visual cards */}
      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
                Popular programs
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Training that leads to real roles.
              </h2>
            </div>
            <Link
              href="/directory"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-500"
            >
              View full program directory →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              href="/programs/medical-assistant"
              image="/media/programs/medical.jpg"
              title="Medical Assistant"
              blurb="Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals and specialty practices."
              length="~5 months"
            />
            <ProgramCard
              href="/programs/barber-apprenticeship"
              image="/media/programs/barber.jpg"
              title="Barber Apprenticeship"
              blurb="State-approved apprenticeship where you earn hours in real shops while building a long-term career."
              length="Hours-based"
            />
            <ProgramCard
              href="/programs/hvac-technician"
              image="/media/programs/hvac.jpg"
              title="HVAC Technician"
              blurb="Learn heating, cooling and refrigeration systems with a pathway into in-demand skilled trades roles."
              length="Varies by partner"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS – simple 3 steps */}
      <section className="border-b border-slate-900 bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-400">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            We walk with you from interest to employment.
          </h2>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            <StepCard
              number="1"
              title="Connect & explore"
              body="Complete a short interest form or talk with our team. We help explore funding eligibility and which programs make sense."
            />
            <StepCard
              number="2"
              title="Enroll & train"
              body="Enroll with one of our training partners. You get coaching, check-ins, and barrier-busting support along the way."
            />
            <StepCard
              number="3"
              title="Elevate & advance"
              body="Move into jobs, apprenticeships, or next-level credentials with Elevate and employers both in your corner."
            />
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES – cards with headshots */}
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
            Success stories
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Real people, real results.
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <StoryCard
              name="Marcus"
              tag="Barber Apprenticeship Graduate"
              image="/people/marcus.jpg"
              quote="From incarceration to owning my own chair. Elevate gave me structure, accountability, and a pathway instead of just a program."
            />
            <StoryCard
              name="Sharon"
              tag="Medical Assistant Graduate"
              image="/people/sharon.jpg"
              quote="Single mom to certified MA in 5 months. The coaching and funding support meant I could focus on finishing and getting to work."
            />
            <StoryCard
              name="Alicia"
              tag="Healthcare Graduate"
              image="/people/alicia.jpg"
              quote="I went from uncertain about my future to having a real career path. Elevate helped me see what was possible and made it happen."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-emerald-500/20 via-slate-950 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to see what&apos;s possible for you or your community?
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Whether you&apos;re a learner, an employer, or a partner, Elevate For
            Humanity is designed to plug into your world — not make you start from
            scratch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              I&apos;m ready to explore training
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-8 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/10"
            >
              I&apos;m an employer or partner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Helper components ---------- */

type VideoTileProps = {
  href: string;
  tag: string;
  title: string;
  desc: string;
  duration: string;
  placeholder: string;
};

function VideoTile({ href, tag, title, desc, duration, placeholder }: VideoTileProps) {
  return (
    <Link href={href} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={placeholder}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200">
            {tag}
          </div>
          <div className="absolute bottom-2 left-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-slate-100">
            {duration}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 text-sm">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-2 flex-1 text-xs text-slate-300">{desc}</p>
          <span className="mt-3 text-xs font-semibold text-emerald-300">
            Watch video →
          </span>
        </div>
      </div>
    </Link>
  );
}

type ProgramCardProps = {
  href: string;
  image: string;
  title: string;
  blurb: string;
  length: string;
};

function ProgramCard({ href, image, title, blurb, length }: ProgramCardProps) {
  return (
    <Link href={href} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 text-sm">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 flex-1 text-xs text-slate-600">{blurb}</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>{length}</span>
            <span className="font-semibold text-emerald-700">
              Learn more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

type StepCardProps = {
  number: string;
  title: string;
  body: string;
};

function StepCard({ number, title, body }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
          {number}
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-xs text-slate-300">{body}</p>
    </div>
  );
}

type StoryCardProps = {
  name: string;
  tag: string;
  image: string;
  quote: string;
};

function StoryCard({ name, tag, image, quote }: StoryCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="text-xs">
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-[11px] text-slate-500">{tag}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-xs text-slate-700">&quot;{quote}&quot;</p>
    </div>
  );
}

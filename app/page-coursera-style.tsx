// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO – Full-width, Coursera-style */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-500/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:px-12 lg:py-20">
          {/* Left side text */}
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
              100% funded career training • Marion County & beyond
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Elevate your future with{" "}
              <span className="text-orange-300">
                funded training, apprenticeships,
              </span>{" "}
              and real job connections.
            </h1>
            <p className="mt-4 text-sm text-slate-200 sm:text-base">
              Elevate For Humanity Career &amp; Technical Institute connects
              learners, employers, and workforce partners through{" "}
              <span className="font-semibold text-orange-300">
                no-cost training pathways, barrier-aware support, and employer
                pipelines
              </span>{" "}
              aligned with today&apos;s in-demand careers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
              >
                Get started free
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-orange-300"
              >
                Explore all programs
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-400">
              <div>
                <span className="font-semibold text-orange-300">
                  $0 tuition (where eligible)
                </span>{" "}
                • WIOA, WRG, OJT &amp; workforce funding
              </div>
              <div>
                <span className="font-semibold text-orange-300">
                  Job placement support
                </span>{" "}
                with real employer partners
              </div>
            </div>
          </div>

          {/* Right side – image + optional video badge */}
          <div className="relative flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
              <Image
                src="/images/efh-hero-learners.jpg"
                alt="Learners in training at Elevate For Humanity"
                width={960}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-transparent to-emerald-500/10" />

              {/* "Watch overview" pill – later you can link this to a real video modal */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-950/80 px-4 py-2 text-xs text-slate-200 backdrop-blur">
                🎥 Coming soon: 60-second Elevate overview video
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 right-4 hidden w-64 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs text-slate-200 shadow-xl md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Impact snapshot
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-orange-300">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-400">Funded paths</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-300">
                    12+
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Programs
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Designed with workforce boards, employers, and learners who are
                ready for a real career move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS – placeholder row */}
      <section className="border-b border-slate-800 bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.16em] text-slate-500">
            In collaboration with workforce boards, training providers &amp;
            employers
          </p>
          <div className="grid grid-cols-2 items-center justify-center gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={`https://placehold.co/200x80/020617/94a3b8?text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={200}
                  height={80}
                  className="opacity-60 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS GRID – visual cards like Coursera */}
      <section className="border-b border-slate-200 bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
              Popular pathways
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Career-ready programs you can start with support.
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base max-w-2xl mx-auto">
              Designed with employers and workforce partners so you&apos;re not
              just getting a class — you&apos;re building a pathway into real
              roles with advancement potential.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {/* CNA / MA */}
            <ProgramCard
              href="/programs/medical-assistant"
              imageSrc="/images/efh-cna-hero.jpg"
              imageAlt="Medical Assistant / CNA training at Elevate"
              tag="Healthcare • Funded"
              title="Medical Assistant / CNA"
              description="Hands-on clinical training that prepares you for entry-level roles in clinics, hospitals, and long-term care."
              chips={["Clinical skills", "Cert prep", "High-demand"]}
              duration="4–6 months (varies by partner)"
            />

            {/* Barber Apprenticeship */}
            <ProgramCard
              href="/programs/barber-apprenticeship"
              imageSrc="/images/split/piece-15.png"
              imageAlt="Barber apprenticeship training"
              tag="Apprenticeship"
              title="Barber Apprenticeship"
              description="State-approved apprenticeship hours in real shops with mentors who understand re-entry and second chances."
              chips={["Earn while you learn", "Licensure path", "Re-entry friendly"]}
              duration="Apprenticeship hours toward license"
            />

            {/* HVAC */}
            <ProgramCard
              href="/programs/hvac-technician"
              imageSrc="/images/split/piece-16.png"
              imageAlt="HVAC technician working on equipment"
              tag="Skilled Trades"
              title="HVAC Technician"
              description="Learn heating, cooling, and refrigeration systems so you can move from general labor into a skilled trade."
              chips={["Hands-on", "Field-ready skills", "Career ladder"]}
              duration="Varies by cohort & partner"
            />

            {/* Building Maintenance */}
            <ProgramCard
              href="/programs/building-maintenance"
              imageSrc="/images/split/piece-17.png"
              imageAlt="Building maintenance technician at work"
              tag="Facilities & Maintenance"
              title="Building Maintenance Technician"
              description="Train in building systems, basic electrical, plumbing, and repairs to keep properties safe and functional."
              chips={["Facilities", "Multi-skill", "Property roles"]}
              duration="Program length varies"
            />

            {/* CDL / Transportation */}
            <ProgramCard
              href="/programs/cdl"
              imageSrc="/images/split/piece-18.png"
              imageAlt="CDL truck driving training"
              tag="Transportation"
              title="CDL / Truck Driving (with partners)"
              description="Work with partner schools to obtain your CDL and transition into high-demand driving and logistics roles."
              chips={["High-wage", "Partner-based", "Logistics bridge"]}
              duration="Length varies by partner"
            />

            {/* Re-entry & Workforce Readiness */}
            <ProgramCard
              href="/programs/workforce-readiness"
              imageSrc="/images/split/piece-1.png"
              imageAlt="Workforce readiness and re-entry coaching"
              tag="Re-Entry & Readiness"
              title="Workforce Readiness & Re-Entry"
              description="Coaching, skill-building, and real employer connections for justice-involved adults ready for a different chapter."
              chips={["Barrier-aware", "Case coordination", "Soft skills"]}
              duration="Cohort-based support"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <p>
              Program availability can vary by partner, schedule, and funding.
              We&apos;ll walk with you to find the best starting point.
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 text-xs font-semibold hover:border-emerald-500 hover:text-red-600"
            >
              View full program directory
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO – ecosystem overview */}
      <section className="border-b border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
              What we do
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              A complete workforce development ecosystem.
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base max-w-3xl mx-auto">
              Elevate is built for{" "}
              <span className="font-semibold text-orange-300">
                learners, employers, and workforce partners
              </span>{" "}
              who want something more than a one-off class. We link training,
              support, and placement so people actually land — and stay — in
              better careers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-sm">
            <WhatWeDoCard
              title="Training Programs"
              body="Healthcare, skilled trades, transportation, and office pathways aligned with real employer needs."
              items={[
                "12+ workforce-aligned programs",
                "In-person and hybrid options",
                "Stackable skills and credentials",
              ]}
            />
            <WhatWeDoCard
              title="Funding & Access"
              body="We braid funding so eligible learners can attend with little to no out-of-pocket cost."
              items={[
                "WIOA & workforce grants (where approved)",
                "OJT / WEX and work-based learning",
                "Employer sponsorships & scholarships",
              ]}
            />
            <WhatWeDoCard
              title="Barrier-Aware Support"
              body="We understand transportation, childcare, and re-entry aren&apos;t side notes — they&apos;re the real work."
              items={[
                "Coaching & case conferencing",
                "Attendance & progress updates",
                "Referrals and navigation support",
              ]}
            />
            <WhatWeDoCard
              title="Technology Platform"
              body="Portals for learners, employers, and workforce partners to stay aligned on progress and outcomes."
              items={[
                "Student portal & certificates",
                "Employer and partner dashboards",
                "Outcome reporting and stories",
              ]}
            />
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES – strip with photos */}
      <section className="border-b border-slate-200 bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                Success stories
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Real people. Real careers. Real second chances.
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Learners come to Elevate from different starting points —
                justice-involved, single parents, career changers — and leave
                with tangible skills and a clearer path forward.
              </p>
            </div>
            <Link
              href="/success-stories"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-red-600"
            >
              Read more stories
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <SuccessStoryCard
              imageSrc="/images/split/piece-2.png"
              imageAlt="Marcus - Barber Graduate"
              name="Marcus J."
              label="Barber Apprenticeship Graduate"
              quote="From incarceration to owning my own chair. Elevate gave me the structure, mentorship, and accountability I needed."
              badge="Re-entry • Apprenticeship"
            />
            <SuccessStoryCard
              imageSrc="/images/split/piece-3.png"
              imageAlt="Sarah - Medical Assistant Graduate"
              name="Sarah M."
              label="Medical Assistant Graduate"
              quote="Single mom to certified MA in months. Now I'm in a clinic with benefits, and my kids see me in a totally different light."
              badge="Healthcare • Single parent"
            />
            <SuccessStoryCard
              imageSrc="/images/split/piece-4.png"
              imageAlt="James - HVAC Technician Graduate"
              name="James T."
              label="HVAC Technician Graduate"
              quote="I went from warehouse work to a skilled trade. I'm making more, learning every day, and my next move is my own license."
              badge="Skilled trades • Career change"
            />
          </div>
        </div>
      </section>

      {/* VIDEO HIGHLIGHTS – for your InVideo clips */}
      <section className="border-b border-slate-800 bg-slate-950 py-18 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                Watch how it works
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Short videos that break it down.
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Use these slots for InVideo clips: one big Elevate overview and a
                couple of spotlights on programs and employer partnerships.
                When the videos are ready, we simply swap the thumbnails and
                links.
              </p>
            </div>
            <span className="text-[11px] text-slate-500">
              Videos coming online as media is finalized.
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Big feature video (spans 2 columns on desktop) */}
            <div className="md:col-span-2">
              <VideoHighlightCard
                variant="primary"
                duration="1:00"
                title="Elevate in 60 seconds: funded training, support & real employer pathways."
                description="High-level overview of who Elevate serves, how funding works, and what &quot;career pathways&quot; actually mean in real life."
                thumbnail="https://placehold.co/1200x675/020617/f97316?text=Elevate+Overview+Video"
                href="/videos/elevate-overview"
              />
            </div>

            {/* Side smaller videos */}
            <div className="space-y-4">
              <VideoHighlightCard
                duration="2:30"
                title="Program spotlight: Barber Apprenticeship &amp; re-entry success."
                description="Walk through how the apprenticeship hours work, what support looks like, and how graduates transition into ownership."
                thumbnail="https://placehold.co/600x340/0f172a/e5e7eb?text=Barber+Spotlight"
                href="/videos/barber-spotlight"
              />
              <VideoHighlightCard
                duration="2:00"
                title="For employers &amp; workforce partners: how we make talent pipelines easier."
                description="Quick breakdown of OJT, WEX, and how Elevate handles the compliance and coordination so you can focus on hiring."
                thumbnail="https://placehold.co/600x340/022c22/a7f3d0?text=Employer+%2F+Workforce+Video"
                href="/videos/employer-pipeline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE CTA */}
      <section className="bg-gradient-to-br from-red-500/15 via-slate-950 to-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to see where you—or your clients—could go from here?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Start with a simple interest form. We&apos;ll help you figure out
            which program, funding, and timeline make sense — and where Elevate
            fits into your bigger goals.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Apply / Refer Now
            </Link>
            <Link
              href="/partners/workforce"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-orange-300 hover:bg-red-500/10"
            >
              For workforce & case managers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Small helper components ---------- */

type ProgramCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  chips: string[];
  duration: string;
};

function ProgramCard({
  href,
  imageSrc,
  imageAlt,
  tag,
  title,
  description,
  chips,
  duration,
}: ProgramCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow hover:shadow-xl transition-shadow duration-200">
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-300">
            {tag}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-xs text-slate-600">{description}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span>{duration}</span>
            <span className="font-semibold text-red-600">
              Learn more &rarr;
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

type WhatWeDoCardProps = {
  title: string;
  body: string;
  items: string[];
};

function WhatWeDoCard({ title, body, items }: WhatWeDoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs text-slate-300">{body}</p>
      <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

type SuccessStoryCardProps = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  label: string;
  quote: string;
  badge: string;
};

function SuccessStoryCard({
  imageSrc,
  imageAlt,
  name,
  label,
  quote,
  badge,
}: SuccessStoryCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-200">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{name}</div>
          <div className="text-[11px] text-slate-500">{label}</div>
          <div className="mt-1 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700">
            {badge}
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-700">&quot;{quote}&quot;</p>
    </article>
  );
}

type VideoHighlightCardProps = {
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  href: string;
  variant?: "primary" | "default";
};

function VideoHighlightCard({
  thumbnail,
  title,
  description,
  duration,
  href,
  variant = "default",
}: VideoHighlightCardProps) {
  const primary = variant === "primary";

  return (
    <Link
      href={href}
      className={`group block h-full rounded-2xl border bg-slate-900/70 p-3 text-slate-100 transition hover:border-emerald-400 ${
        primary ? "border-slate-700 md:p-4" : "border-slate-800"
      }`}
    >
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
          alt={title}
          width={primary ? 1200 : 600}
          height={primary ? 675 : 340}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-900">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">
              ►
            </span>
            <span>Play video</span>
          </div>
        </div>
        {/* Duration pill */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
          {duration}
        </div>
      </div>
      <div>
        <h3
          className={`text-xs font-semibold ${
            primary ? "sm:text-sm" : "text-xs"
          }`}
        >
          {title}
        </h3>
        <p className="mt-2 text-[11px] text-slate-300">{description}</p>
      </div>
    </Link>
  );
}

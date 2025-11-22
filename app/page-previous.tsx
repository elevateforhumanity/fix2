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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              100% funded career training • Marion County & beyond
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Elevate your future with{" "}
              <span className="text-emerald-300">
                funded training, apprenticeships,
              </span>{" "}
              and real job connections.
            </h1>
            <p className="mt-4 text-sm text-slate-200 sm:text-base">
              Elevate For Humanity Career &amp; Technical Institute connects
              learners, employers, and workforce partners through{" "}
              <span className="font-semibold text-emerald-300">
                no-cost training pathways, barrier-aware support, and employer
                pipelines
              </span>{" "}
              aligned with today&apos;s in-demand careers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
              >
                Get started free
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
              >
                Explore all programs
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-400">
              <div>
                <span className="font-semibold text-emerald-300">
                  $0 tuition (where eligible)
                </span>{" "}
                • WIOA, WRG, OJT &amp; workforce funding
              </div>
              <div>
                <span className="font-semibold text-emerald-300">
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
                  <div className="text-xl font-bold text-emerald-300">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-400">Funded paths</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-300">
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
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
            {/* CNA */}
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
              imageSrc="https://placehold.co/600x380/f97316/0f172a?text=Barber+Apprenticeship"
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
              imageSrc="https://placehold.co/600x380/0f172a/f97316?text=HVAC+Technician"
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
              imageSrc="https://placehold.co/600x380/1e293b/e5e7eb?text=Building+Maintenance"
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
              imageSrc="https://placehold.co/600x380/0f172a/bae6fd?text=CDL+%2F+Transportation"
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
              imageSrc="https://placehold.co/600x380/022c22/a7f3d0?text=Workforce+Readiness+%26+Re-Entry"
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
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-600"
            >
              View full program directory
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO – lighter "ecosystem" overview */}
      <section className="border-b border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              What we do
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              A complete workforce development ecosystem.
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base max-w-3xl mx-auto">
              Elevate is built for{" "}
              <span className="font-semibold text-emerald-300">
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

      {/* SIMPLE CTA */}
      <section className="bg-gradient-to-br from-emerald-500/15 via-slate-950 to-slate-950 py-16">
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
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Apply / Refer Now
            </Link>
            <Link
              href="/partners/workforce"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
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
          <div className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
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
            <span className="font-semibold text-emerald-600">
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

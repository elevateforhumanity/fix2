// COMPLETE HOMEPAGE - app/page.tsx
// Copy this entire file and paste into app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

type ProgramCardProps = {
  title: string;
  description: string;
  image: string;
  tag?: string;
};

function ProgramCard({ title, description, image, tag }: ProgramCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="relative h-40 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {tag && (
          <span className="inline-flex w-fit rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700">
            {tag}
          </span>
        )}
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <div className="mt-2">
          <span className="text-xs font-semibold text-orange-500">
            Learn more →
          </span>
        </div>
      </div>
    </article>
  );
}

type SuccessCardProps = {
  image: string;
  quote: string;
  name: string;
  track: string;
};

function SuccessCard({ image, quote, name, track }: SuccessCardProps) {
  return (
    <article className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-slate-700">&quot;{quote}&quot;</p>
        <p className="text-[11px] font-semibold text-slate-900">{name}</p>
        <p className="text-[11px] text-slate-500">{track}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-orange-50 via-white to-blue-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:flex-row md:py-24">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Workforce Training. Real Careers. Real Support.
            </h1>
            <p className="max-w-xl text-base text-slate-700 md:text-lg">
              Start a career you can be proud of — with funding, guidance, and
              hands-on programs built for real life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/programs"
                className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
              >
                Explore Programs
              </Link>
              <Link
                href="/funding"
                className="rounded-md border border-blue-500 px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                See If I Qualify for Funding
              </Link>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative h-64 w-full md:h-80">
              <Image
                src="/images/PLACEHOLDER_HOME_HERO.jpg"
                alt="Adult learners in a career training classroom"
                fill
                priority
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="border-t border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Who We Serve</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Career training built for adults, working families, and returning
            citizens who are ready for a real change.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <div className="relative h-40 w-full">
                <Image
                  src="/images/PLACEHOLDER_WHO_ADULTS.jpg"
                  alt="Adult learner in training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-semibold">Adult Learners</h3>
                <p className="text-sm text-slate-600">
                  Get the skills, certifications, and confidence you need to
                  step into a high-demand career.
                </p>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <div className="relative h-40 w-full">
                <Image
                  src="/images/PLACEHOLDER_WHO_FAMILIES.jpg"
                  alt="Working family supported through training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-semibold">Working Families</h3>
                <p className="text-sm text-slate-600">
                  Flexible schedules and funded programs that fit your life —
                  not the other way around.
                </p>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <div className="relative h-40 w-full">
                <Image
                  src="/images/PLACEHOLDER_WHO_REENTRY.jpg"
                  alt="Returning citizen in a supported workforce program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-semibold">Returning Citizens</h3>
                <p className="text-sm text-slate-600">
                  Structured training with support, accountability, and
                  employer-aligned pathways to rebuild and thrive.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="border-t border-slate-100 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Featured Programs
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                Explore high-demand, funding-friendly programs that lead to
                real careers.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all programs →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            <ProgramCard
              title="Healthcare Pathways"
              description="Medical Assistant, CNA, and healthcare support careers with strong employer demand."
              image="/images/PLACEHOLDER_PATHWAY_HEALTHCARE.jpg"
              tag="State-Funded • ETPL"
            />
            <ProgramCard
              title="Skilled Trades & Technical"
              description="HVAC, building maintenance, and technical careers with hands-on learning."
              image="/images/PLACEHOLDER_PATHWAY_TRADES.jpg"
              tag="High-Demand • Hands-On"
            />
            <ProgramCard
              title="Barber & Beauty Apprenticeships"
              description="DOL-registered apprenticeships where you earn while you learn."
              image="/images/PLACEHOLDER_PATHWAY_BEAUTY.jpg"
              tag="DOL Apprenticeship"
            />
            <ProgramCard
              title="CDL & Transportation"
              description="Commercial driving careers with strong pay and consistent hiring."
              image="/images/PLACEHOLDER_PATHWAY_CDL.jpg"
              tag="High-Earning • Fast Track"
            />
            <ProgramCard
              title="Office & Business Careers"
              description="Admin, customer service, and digital skills for long-term stability."
              image="/images/PLACEHOLDER_PATHWAY_BUSINESS.jpg"
              tag="Flexible • Family-Friendly"
            />
            <ProgramCard
              title="Reentry & Supported Pathways"
              description="Structured workforce programs for returning citizens with full support."
              image="/images/PLACEHOLDER_PATHWAY_REENTRY.jpg"
              tag="Reentry • Supported"
            />
          </div>
        </div>
      </section>

      {/* HOW FUNDING WORKS */}
      <section className="border-t border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:grid md:grid-cols-[1.3fr,1fr] md:items-center md:gap-8">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              How Funding Works
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
              Most of our students pay little to nothing out of pocket through
              state and federal workforce grants.
            </p>

            <ol className="mt-6 space-y-4 text-sm md:text-base">
              <li>
                <span className="font-semibold text-orange-500">
                  Step 1:&nbsp;
                </span>
                Connect with WorkOne or Indiana Connect.
              </li>
              <li>
                <span className="font-semibold text-orange-500">
                  Step 2:&nbsp;
                </span>
                Get approved for WIOA, WRG, JRI, Apprenticeship funding, or
                other support.
              </li>
              <li>
                <span className="font-semibold text-orange-500">
                  Step 3:&nbsp;
                </span>
                Start your Elevate For Humanity training program with real
                support.
              </li>
            </ol>

            <div className="mt-6">
              <Link
                href="/funding"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
              >
                Funding Eligibility Guide
              </Link>
            </div>
          </div>

          <div className="relative mt-6 h-52 w-full md:mt-0 md:h-64">
            <Image
              src="/images/PLACEHOLDER_FUNDING_WIOA.jpg"
              alt="Advisor helping student with funding paperwork"
              fill
              className="rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="border-t border-slate-100 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Success Stories
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Real learners. Real careers. Real transformation.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr,1fr] md:items-start">
            <div className="space-y-3">
              <div className="relative h-56 w-full overflow-hidden rounded-xl bg-black md:h-64">
                <Image
                  src="/images/PLACEHOLDER_SUCCESS_1.jpg"
                  alt="Graduate sharing their success story"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <span className="ml-1 border-l-[10px] border-y-[8px] border-l-blue-600 border-y-transparent" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-700 md:text-base">
                "I came here with no direction. Now I'm certified, working, and
                stable. Elevate changed my life."
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Graduate • Healthcare Pathway
              </p>
            </div>

            <div className="space-y-4">
              <SuccessCard
                image="/images/PLACEHOLDER_SUCCESS_2.jpg"
                quote="I was nervous about going back to school. Elevate broke everything down and walked with me through funding and training."
                name="Working Parent"
                track="Skilled Trades"
              />
              <SuccessCard
                image="/images/PLACEHOLDER_SUCCESS_3.jpg"
                quote="As a returning citizen, I needed structure and support. This program helped me get a real job and a real second chance."
                name="Reentry Graduate"
                track="Reentry Pathway"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Ready to Start Your Next Chapter?
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            Whether you&apos;re changing careers, starting fresh, or rebuilding
            your life, we&apos;re here with real support from day one.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/enroll"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
            >
              Start My Enrollment
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Talk to a Program Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

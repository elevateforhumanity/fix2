import Link from "next/link";
import { HomepageProgramsTeaser } from "@/components/programs/HomepageProgramsTeaser";

function PrimaryButton(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
    >
      {props.children}
    </Link>
  );
}

function SecondaryButton(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-900 hover:bg-slate-100"
    >
      {props.children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              Workforce • Training • Platform
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Transform futures. Power workforce.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-700 md:text-base">
              Elevate For Humanity connects real people to fully or partially funded training,
              while giving workforce boards, training providers, and community partners a modern
              platform to track outcomes and impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/programs">Explore programs</PrimaryButton>
              <SecondaryButton href="/demo">Request a workforce demo</SecondaryButton>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Many learners qualify for WIOA, WRG, JRI, apprenticeship, or employer funding
              where approved. We help you navigate it step by step.
            </p>
          </div>

          <div className="flex-1">
            <div className="rounded-3xl bg-slate-900 p-5 text-slate-50 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                One front door. Multiple pathways.
              </p>
              <p className="mt-2 text-sm text-slate-100">
                From CNA, HVAC, barbering, CDL, and building maintenance to career readiness,
                Elevate is building an ecosystem where people don&apos;t just enroll in programs
                — they build a plan that fits their life.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-slate-100">
                <li>• Simple front door for learners and families</li>
                <li>• Clear pathways for providers and schools</li>
                <li>• Real-time outcomes for boards and funders</li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-300">
                Built in Indiana and designed to be replicated in regions that are serious about
                equitable workforce and second chances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Who we serve</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            Elevate is designed for people navigating real life — childcare, transportation, second
            chances, and starting over — and for the organizations that walk with them.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Learners &amp; Families
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">For learners</h3>
              <p className="mt-2 text-xs text-slate-700">
                Find training that fits your life, not the other way around. We help you explore
                programs, understand funding, and stay supported from application to job offer.
              </p>
              <div className="mt-3">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                >
                  See all programs
                </Link>
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Training Providers &amp; Schools
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">For providers</h3>
              <p className="mt-2 text-xs text-slate-700">
                Plug your existing programs into our ecosystem. We help you reach the right
                learners, align with workforce funding, and report outcomes without drowning in
                spreadsheets and email threads.
              </p>
              <div className="mt-3">
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Partner as a provider
                </Link>
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Workforce Boards &amp; Funders
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">For boards &amp; funders</h3>
              <p className="mt-2 text-xs text-slate-700">
                Get a clear view of who you&apos;re serving, which programs perform, and where
                funding is going — in one platform built with WIOA, ETPL, apprenticeships, and
                community impact in mind.
              </p>
              <div className="mt-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Explore workforce solutions
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROGRAMS TEASER */}
      <HomepageProgramsTeaser />

      {/* PLATFORM SECTION */}
      <section className="border-t border-slate-200 bg-slate-900 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                The Elevate Workforce Platform
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                More than a school. A full workforce ecosystem.
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-100">
                Elevate For Humanity is a multi-app workforce system — learner, provider, and board
                portals — that can be licensed by regions, boards, and training networks. People see
                a simple site. You see real-time enrollment, outcomes, and pathways.
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <SecondaryButton href="/demo">See licensing &amp; pricing</SecondaryButton>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
              <h3 className="text-sm font-semibold text-white">Learner &amp; Student Portal</h3>
              <p className="mt-2 text-xs text-slate-200">
                Applications, funding steps, courses, progress, and career support in one secure
                portal for youth and adult learners.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
              <h3 className="text-sm font-semibold text-white">
                Provider &amp; Training Provider Portal
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                Rosters, attendance, completions, and outcomes for CNA schools, barber academies,
                trades, and community-based training partners.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
              <h3 className="text-sm font-semibold text-white">Board &amp; Funder Dashboard</h3>
              <p className="mt-2 text-xs text-slate-200">
                Real-time views of enrollments, demographics, completions, and placements to support
                grants, policy, and strategic decisions.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
              <h3 className="text-sm font-semibold text-white">Admin &amp; Automations</h3>
              <p className="mt-2 text-xs text-slate-200">
                Configuration, reporting exports, and AI-assisted workflows for grants,
                documentation, and ongoing platform operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY ELEVATE WORKS */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Why Elevate works</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We design around the realities that often block people from opportunity — childcare,
            transportation, justice involvement, and starting over — and give boards and providers
            the tools to respond with data and care.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">100% fundable pathways</h3>
              <p className="mt-2 text-xs text-slate-700">
                Many learners qualify for WIOA, WRG, JRI, apprenticeship, or employer funding where
                available. We help them actually access it, not just hear about it.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Built for real barriers</h3>
              <p className="mt-2 text-xs text-slate-700">
                We consider childcare, transportation, mental health, and second chances when
                designing pathways, calendars, and support touchpoints.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                Data boards and funders can trust
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Enrollment, progress, completion, and employment fields are built into the platform
                from day one, not bolted on later.
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                Human first, tech powered
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Technology should make it easier to care for people, not harder. Elevate keeps
                people at the center while streamlining the process.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW FUNDING WORKS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">How funding works</h2>
            <p className="mt-2 text-sm text-slate-700">
              Funding should not feel like a maze. Elevate walks with learners and partners through
              each step, so no one has to figure it out alone.
            </p>
          </div>

          <ol className="mt-6 grid gap-4 text-sm text-slate-800 md:grid-cols-4">
            <li className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step 1
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Tell us about your situation.
              </p>
              <p className="mt-2 text-xs text-slate-700">
                Learners answer a few simple questions about their goals, income, and barriers.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step 2
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                We check possible funding.
              </p>
              <p className="mt-2 text-xs text-slate-700">
                We look at WIOA, WRG, JRI, apprenticeship, employer, and scholarship options where
                available through partners.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step 3
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                We match to programs &amp; providers.
              </p>
              <p className="mt-2 text-xs text-slate-700">
                Learners see programs that fit their goals and life — not just a list of random
                options.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step 4
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                We support the paperwork and next steps.
              </p>
              <p className="mt-2 text-xs text-slate-700">
                Elevate and partners help with forms, reminders, and connections so learners
                aren&apos;t left on their own.
              </p>
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="/apply">Check my funding options</PrimaryButton>
            <SecondaryButton href="/contact?topic=advising">Talk to an advisor</SecondaryButton>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-200 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Ready to move from "thinking about it" to "I got in"?
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              Whether you&apos;re a learner, a training provider, or a workforce board, Elevate is
              designed to meet you where you are and build something better together.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton href="/apply">Apply now – it&apos;s free</PrimaryButton>
            <SecondaryButton href="/contact?topic=advising">Talk to Elevate</SecondaryButton>
            <SecondaryButton href="/demo">Request a platform demo</SecondaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}

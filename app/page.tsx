// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12 lg:py-24">
          {/* Text */}
          <div className="max-w-xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300 border border-orange-400/40">
              Elevate For Humanity™ · Indiana Workforce Hub
            </p>

            <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Free & Funded Workforce Training, Apprenticeships, and{" "}
              <span className="text-orange-400">Real Jobs.</span>
            </h1>

            <p className="text-sm md:text-base text-slate-200/90">
              We connect adults, youth, and re-entry talent with{" "}
              <span className="font-semibold">
                state-approved training, apprenticeships, and employer partners
              </span>{" "}
              so you can elevate your income, your family, and your community.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition"
              >
                Start My Application
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-orange-400 hover:text-orange-200 transition"
              >
                Explore Programs
              </Link>
            </div>

            <div className="space-y-2 text-xs md:text-sm text-slate-300">
              <p className="font-semibold text-slate-200">
                Indiana Workforce • WRG • WIOA · State-Approved Barber
                Apprenticeship · Medical Assistant · HVAC · Building Tech · CDL
              </p>
              <p>Many learners qualify for little to no out-of-pocket cost.</p>
            </div>
          </div>

          {/* Right side – quick stats */}
          <div className="mt-6 w-full max-w-sm md:mt-0">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-xl shadow-black/40 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300 mb-3">
                Why learners & agencies choose Elevate
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="rounded-2xl bg-slate-900/80 p-3 border border-white/5">
                  <p className="text-2xl font-bold text-orange-400">100%</p>
                  <p className="text-slate-300">
                    Training can be <span className="font-semibold">fully
                    funded</span> for eligible learners.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-3 border border-white/5">
                  <p className="text-2xl font-bold text-orange-400">4–12</p>
                  <p className="text-slate-300">
                    Months to move from interest to{" "}
                    <span className="font-semibold">job-ready</span>.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-3 border border-white/5 col-span-2">
                  <p className="text-slate-300">
                    One hub that speaks the language of{" "}
                    <span className="font-semibold">
                      learners, case managers, and employers
                    </span>{" "}
                    at the same time.
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-snug text-slate-400">
                Elevate For Humanity serves Indiana and beyond in partnership
                with training providers, employers, and workforce boards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-6 text-xs md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <p className="font-semibold text-slate-300">
            In partnership with training providers, employers, and workforce
            boards.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="rounded-full border border-white/10 px-3 py-1">
              Indiana Workforce
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              WRG · WIOA-Aligned
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              State-Approved Barber Apprenticeship
            </span>
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12 lg:py-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                Training & Apprenticeship Programs
              </p>
              <h2 className="text-2xl font-bold md:text-3xl">
                Choose a pathway that matches your goals.
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Many programs accept workforce funding, apprenticeships, or
                employer sponsorships. Every description is written so a learner,
                a parent, a pastor, and a case manager can understand it.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold text-orange-300 hover:text-orange-200"
            >
              View all programs →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Medical Assistant */}
            <Link
              href="/programs/medical-assistant"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-orange-400/70 hover:bg-slate-900 transition"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Healthcare · Partner Program
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Medical Assistant Pathway
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                4–6 months · Hybrid
              </p>
              <p className="text-sm text-slate-200 flex-1">
                Hands-on clinical training that prepares you for entry-level MA
                roles in clinics, hospitals, and specialty practices – wrapped
                in Elevate onboarding, reminders, and reporting for agencies.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Funding: WRG · WIOA · Workforce Grants
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-300 group-hover:translate-x-0.5 transition">
                Learn more →
              </p>
            </Link>

            {/* Barber Apprenticeship */}
            <Link
              href="/programs/barber"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-orange-400/70 hover:bg-slate-900 transition"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Apprenticeship · License Track
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Barber Apprenticeship
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                12–18 months · On-the-job + Classroom
              </p>
              <p className="text-sm text-slate-200 flex-1">
                Approved apprenticeship model combining Milady curriculum,
                shop-based experience, and Elevate tracking for learners moving
                toward real barber careers and licensing support.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Funding: DOL Apprenticeship · WIOA
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-300 group-hover:translate-x-0.5 transition">
                Learn more →
              </p>
            </Link>

            {/* HVAC */}
            <Link
              href="/programs/hvac"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-orange-400/70 hover:bg-slate-900 transition"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Skilled Trades · External School
              </p>
              <h3 className="text-lg font-semibold mb-1">HVAC Technician</h3>
              <p className="text-xs text-slate-300 mb-2">
                4–9 months · Lab + Field
              </p>
              <p className="text-sm text-slate-200 flex-1">
                Elevate serves as the front door and connector to a trusted HVAC
                school, with visibility for case managers and employers so
                nobody has to guess where a learner is in the process.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Funding: Workforce Grants · Employer Sponsors
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-300 group-hover:translate-x-0.5 transition">
                Learn more →
              </p>
            </Link>

            {/* Building Maintenance */}
            <Link
              href="/programs/building-tech"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-orange-400/70 hover:bg-slate-900 transition"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Facilities · Hands-On
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Building Maintenance Technician
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                4–9 months · On-site
              </p>
              <p className="text-sm text-slate-200 flex-1">
                Training for building systems, repairs, and facility maintenance
                so learners can keep properties safe and functional while
                learning a career they can grow in.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Funding: Workforce Grants · Apprenticeship
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-300 group-hover:translate-x-0.5 transition">
                Learn more →
              </p>
            </Link>

            {/* Workforce Readiness */}
            <Link
              href="/programs/workforce-readiness"
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-orange-400/70 hover:bg-slate-900 transition"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-300 mb-1">
                Workforce Readiness · Re-Entry Friendly
              </p>
              <h3 className="text-lg font-semibold mb-1">
                Workforce Readiness & Re-Entry
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                4–12 weeks · Coaching + Workshops
              </p>
              <p className="text-sm text-slate-200 flex-1">
                Rebuild, reset, and re-enter the workforce with coaching, skills
                training, and real employment connections for people restarting,
                redirecting, or coming home.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Funding: Support Services · Referrals
              </p>
              <p className="mt-2 text-xs font-semibold text-orange-300 group-hover:translate-x-0.5 transition">
                Learn more →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12 lg:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              How Elevate For Humanity Works
            </p>
            <h2 className="text-2xl font-bold md:text-3xl">
              We walk with you from interest to employment.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Our team coordinates with training providers, agencies, and
              employers so you don&apos;t have to navigate the process alone.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold text-orange-300">STEP 1</p>
              <h3 className="mt-1 text-lg font-semibold">Connect & Explore</h3>
              <p className="mt-2 text-sm text-slate-300">
                Complete a short interest form. Our team reviews funding
                options, program fit, and support services with you.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold text-orange-300">STEP 2</p>
              <h3 className="mt-1 text-lg font-semibold">Enroll & Train</h3>
              <p className="mt-2 text-sm text-slate-300">
                Enroll with our training partners. You receive coaching, case
                management, and help navigating life barriers while you train.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold text-orange-300">STEP 3</p>
              <h3 className="mt-1 text-lg font-semibold">Elevate & Advance</h3>
              <p className="mt-2 text-sm text-slate-300">
                Transition into jobs, apprenticeships, or next-level
                credentials with ongoing support from our network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNERS / AGENCIES / EMPLOYERS STRIP */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12 lg:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Learners */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                For Learners
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                A clear path, not a maze.
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                We help you understand your options, choose a program, and stay
                on track with reminders, coaching, and real people who follow
                up.
              </p>
              <Link
                href="/apply"
                className="mt-3 inline-block text-sm font-semibold text-orange-300 hover:text-orange-200"
              >
                Start my application →
              </Link>
            </div>

            {/* Agencies & Partners */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                For Agencies & Partners
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                One hub that speaks your language.
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Case managers, probation, and community orgs get clear program
                descriptions, status updates, and reporting so referrals don&apos;t
                disappear.
              </p>
              <Link
                href="/partners"
                className="mt-3 inline-block text-sm font-semibold text-orange-300 hover:text-orange-200"
              >
                View partner options →
              </Link>
            </div>

            {/* Employers */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
                For Employers
              </p>
              <h3 className="text-lg font-semibold">
                A pipeline, not random resumes.
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Access candidates who have completed training, understand
                workplace expectations, and have been supported through real
                barriers.
              </p>
              <Link
                href="/employers"
                className="mt-3 inline-block text-sm font-semibold text-orange-300 hover:text-orange-200"
              >
                Build a talent pipeline →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:px-12 lg:py-16">
          <div className="rounded-3xl border border-orange-400/50 bg-gradient-to-r from-orange-600/30 via-slate-900 to-slate-950 px-6 py-10 md:px-10 md:py-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to Elevate Your Future?
              </h2>
              <p className="mt-3 text-sm text-slate-100">
                Whether you&apos;re just getting started, returning to the
                workforce, or changing careers, we&apos;ll help you find the
                right program and funding options.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition"
              >
                Start My Application
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition"
              >
                Talk With Our Team
              </Link>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Elevate For Humanity. All rights reserved.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/programs" className="hover:text-orange-200">
                Programs
              </Link>
              <Link href="/partners" className="hover:text-orange-200">
                Partners
              </Link>
              <Link href="/about" className="hover:text-orange-200">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-200">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-orange-200">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-orange-200">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

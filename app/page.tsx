// app/page.tsx - Clean Professional Homepage
import Link from "next/link";

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-slate-300 text-slate-800 bg-white/80 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_#dc2626_0,_transparent_45%),radial-gradient(circle_at_bottom,_#22c55e_0,_transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr,0.85fr] items-center">
            {/* Text */}
            <div>
              <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-200 ring-1 ring-white/20">
                WIOA • WRG • JRI • Registered Apprenticeships
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Your pathway to skills, stability, and a better future starts
                here.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-100/90 max-w-2xl">
                Elevate for Humanity Technical &amp; Career Institute provides
                free and fundable career training, federally aligned
                apprenticeships, and wrap-around support for students, families,
                and communities across Indiana.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/apply">Apply Now</PrimaryButton>
                <SecondaryButton href="/programs">
                  Explore Programs
                </SecondaryButton>
                <SecondaryButton href="/contact">
                  Talk With an Advisor
                </SecondaryButton>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 text-xs sm:text-sm">
                <div>
                  <dt className="text-slate-300">Funding Pathways</dt>
                  <dd className="font-semibold text-white">
                    WIOA • WRG • JRI • ETPL
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-300">Alignment</dt>
                  <dd className="font-semibold text-white">
                    DOL Registered Apprenticeship • RAPIDS
                  </dd>
                </div>
              </dl>
            </div>

            {/* Side "card" */}
            <div className="lg:justify-self-end">
              <div className="rounded-3xl bg-white/5 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur">
                <h2 className="text-sm font-semibold text-white">
                  In-Demand Career Pathways
                </h2>
                <p className="mt-2 text-xs text-slate-200">
                  Choose from state-approved programs designed to lead directly
                  to employment, licensure, and long-term careers.
                </p>

                <ul className="mt-4 space-y-3 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>
                      <span className="font-semibold">
                        Barber Apprenticeship
                      </span>{" "}
                      – federally aligned, RAPIDS listed, state licensure
                      focused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                    <span>
                      Healthcare pathways – CNA and stackable credentials (where
                      approved).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <span>
                      Skilled trades, CDL, building maintenance, and more
                      employer-driven programs.
                    </span>
                  </li>
                </ul>

                <p className="mt-4 text-[0.7rem] text-slate-200/90">
                  No student loan debt. Most learners qualify for full funding
                  through workforce partners and grants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr,0.9fr] items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                About Elevate for Humanity
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                A technical &amp; career institute built to remove barriers and
                rebuild lives.
              </h2>
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                Elevate for Humanity Technical &amp; Career Institute is a
                workforce training hub focused on individuals who are often
                overlooked or underserved. We partner with workforce boards,
                re-entry programs, employers, and community organizations to
                deliver high-quality training that is trauma-informed,
                compliant, and practical.
              </p>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Our ecosystem integrates classroom training, DOL Registered
                Apprenticeships, mental health support, life coaching, and
                navigation services—so learners aren't just placed in a program,
                they're supported through a pathway.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                Federal &amp; State Alignment
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  U.S. Department of Labor Registered Apprenticeship sponsor
                  (RAPIDS listed).
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Approved provider on the Indiana Eligible Training Provider
                  List (ETPL).
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Fundable through WIOA, Workforce Ready Grant (WRG), and Jobs
                  for Re-Entry (JRI) where eligible.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                  Built to align with employer demand and long-term career
                  growth.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM PATHWAYS */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Program Pathways
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                Career training designed for real-world opportunity.
              </h2>
            </div>
            <PrimaryButton href="/programs">View All Programs</PrimaryButton>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Career Training Programs
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Barbering, healthcare, trades, CDL, building maintenance and
                more—structured to lead directly into employment or
                higher-level credentials.
              </p>
              <Link
                href="/programs"
                className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Explore career programs →
              </Link>
            </article>

            {/* Card 2 */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Registered Apprenticeships
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Earn while you learn through DOL Registered Apprenticeships
                with structured on-the-job training and classroom instruction.
              </p>
              <Link
                href="/programs/barber-apprenticeship"
                className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                View apprenticeships →
              </Link>
            </article>

            {/* Card 3 */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Beauty &amp; Barber Institute
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Barber Apprenticeship, nail, esthetics and related beauty
                programs guided by licensed professionals with 20+ years in the
                industry.
              </p>
              <Link
                href="/programs/barber-apprenticeship"
                className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Learn about barber apprenticeship →
              </Link>
            </article>

            {/* Card 4 */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Support &amp; Coaching
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Life coaching, mental wellness partnerships, workforce
                navigation, and barrier-removal services to help you stay on
                track.
              </p>
              <Link
                href="/team"
                className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                See support services →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* FUNDING & APPROVALS */}
      <section className="bg-slate-900 py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-300">
                Funding &amp; Approvals
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Approved, aligned, and ready to fund your training.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-200 max-w-2xl">
                We work directly with workforce boards, state agencies, and
                employers so eligible students can attend with little to no
                out-of-pocket cost.
              </p>
            </div>
            <PrimaryButton href="/funding">Check My Eligibility</PrimaryButton>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Workforce Funding</h3>
              <ul className="mt-3 space-y-1 text-slate-200">
                <li>WIOA (WorkOne)</li>
                <li>Workforce Ready Grant (WRG)</li>
                <li>Jobs for Re-Entry (JRI)</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">State Alignment</h3>
              <ul className="mt-3 space-y-1 text-slate-200">
                <li>Indiana Eligible Training Provider List (ETPL)</li>
                <li>Regional workforce board partnerships</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">
                Federal Apprenticeships
              </h3>
              <ul className="mt-3 space-y-1 text-slate-200">
                <li>DOL Registered Apprenticeship sponsor</li>
                <li>Programs listed on RAPIDS</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Student Support</h3>
              <ul className="mt-3 space-y-1 text-slate-200">
                <li>Case management &amp; referrals</li>
                <li>Transportation &amp; support services (where available)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAM: BARBER APPRENTICESHIP */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Featured Program
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Barber Apprenticeship: Earn while you learn a licensed trade.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Elevate's Barber Apprenticeship is a state-approved, federally
                aligned program that blends classroom instruction, real shop
                experience, and entrepreneurship skills. Apprentices work toward
                state licensure while serving clients and building a career
                pathway with strong earning potential.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li>✔ Federally aligned DOL Registered Apprenticeship (RAPIDS)</li>
                <li>✔ WIOA, JRI and employer-funded options where eligible</li>
                <li>✔ Real-world training inside active barbershops</li>
                <li>✔ Licensing exam preparation and business skills</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/programs/barber-apprenticeship">
                  View Barber Apprenticeship
                </PrimaryButton>
                <SecondaryButton href="/apply">
                  Apply for Barber Program
                </SecondaryButton>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Is Barber Apprenticeship a fit for you?
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  This pathway is ideal for individuals who want:
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                  <li>• A hands-on, creative career</li>
                  <li>• The option to own a shop or suite one day</li>
                  <li>• A trade that travels anywhere they go</li>
                  <li>• A second chance after justice involvement</li>
                </ul>
                <p className="mt-3 text-[0.7rem] text-slate-600">
                  Our team will walk you through funding, enrollment, and next
                  steps so you can start with clarity and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Getting started is simple.
            </h2>
            <p className="mt-3 text-sm text-slate-700 max-w-2xl mx-auto">
              Whether you're changing careers, re-entering the workforce, or
              just getting started, we walk with you from application to
              employment.
            </p>
          </div>

          <ol className="mt-8 grid gap-6 md:grid-cols-4 text-xs">
            <li className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[0.7rem] font-semibold text-white">
                1
              </span>
              <h3 className="font-semibold text-slate-900">Apply Online</h3>
              <p className="mt-2 text-slate-700">
                Submit a quick, no-cost application so we can learn about your
                goals and needs.
              </p>
            </li>
            <li className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[0.7rem] font-semibold text-white">
                2
              </span>
              <h3 className="font-semibold text-slate-900">
                Meet With an Advisor
              </h3>
              <p className="mt-2 text-slate-700">
                We review program options, funding eligibility, and any barriers
                we can help remove.
              </p>
            </li>
            <li className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[0.7rem] font-semibold text-white">
                3
              </span>
              <h3 className="font-semibold text-slate-900">
                Secure Funding &amp; Enroll
              </h3>
              <p className="mt-2 text-slate-700">
                We coordinate with WorkOne, WRG, JRI, and employers to help
                reduce or remove tuition costs.
              </p>
            </li>
            <li className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[0.7rem] font-semibold text-white">
                4
              </span>
              <h3 className="font-semibold text-slate-900">
                Train, Graduate, &amp; Elevate
              </h3>
              <p className="mt-2 text-slate-700">
                Complete your training, earn credentials, and step into a career
                with real support behind you.
              </p>
            </li>
          </ol>

          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/apply">Start Your Application</PrimaryButton>
          </div>
        </div>
      </section>

      {/* PARTNERS & CONTACT */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Partner With Elevate
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Employers, schools &amp; community partners welcome.
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                We collaborate with barbershops, healthcare organizations,
                skilled trades employers, community groups, and re-entry
                programs to build strong talent pipelines and supportive
                pathways.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                <li>• Co-branded training and apprenticeship pathways</li>
                <li>• Work-based learning, WEX and OJT placements</li>
                <li>• Customized training for employer needs</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton href="/employers">Become a Partner</PrimaryButton>
                <SecondaryButton href="/contact">
                  Contact Our Team
                </SecondaryButton>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                Contact &amp; Location
              </h3>
              <p className="mt-3 text-xs text-slate-700">
                Elevate for Humanity Technical &amp; Career Institute
              </p>
              <p className="mt-1 text-xs text-slate-700">
                8888 Keystone Crossing, Suite 1400
                <br />
                Indianapolis, IN 46240
              </p>
              <p className="mt-3 text-xs text-slate-700">
                Phone: <a href="tel:317-314-3757" className="text-red-600 hover:underline">317-314-3757</a>
                <br />
                Email: <a href="mailto:elevateforhumanity.edu@gmail.com" className="text-red-600 hover:underline">elevateforhumanity.edu@gmail.com</a>
              </p>
              <p className="mt-4 text-[0.7rem] text-slate-600">
                Elevate for Humanity is an equal opportunity training provider.
                Auxiliary aids and services are available upon request to
                individuals with disabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

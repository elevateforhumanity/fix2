import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {/* HERO */}
        <section className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
            <span>About</span>
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            <span>Elevate for Humanity</span>
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr,1.2fr] lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Workforce development for people who{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  can&apos;t afford to be left behind.
                </span>
              </h1>
              <p className="mt-4 text-sm md:text-base text-slate-600 max-w-xl">
                Elevate for Humanity is a workforce and learning ecosystem
                designed for real people with real barriers—parents, returning
                citizens, career changers, and anyone who needs a second
                chance, not a second job filling out forms. We connect training,
                wraparound support, employers, and funding so learners can
                actually finish.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-slate-800 border border-slate-200">
                  🎓 Workforce training & credentials
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-slate-800 border border-slate-200">
                  🤝 Employers & community partners
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-slate-800 border border-slate-200">
                  🏛️ Funding-aligned (WIOA, grants, apprenticeships)
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  Explore training programs
                </Link>
                <Link
                  href="/workforce-partners"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
                >
                  Become a workforce partner
                </Link>
              </div>
            </div>

            <div className="grid gap-4 text-xs">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Our Mission
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  To remove the friction between{" "}
                  <span className="underline decoration-blue-400 decoration-2 underline-offset-4">
                    people who are ready to work
                  </span>{" "}
                  and the training, credentials, and employers that need them.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-900 text-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-300">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Indiana workforce & beyond
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Pathways
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Trades · Healthcare · Transportation
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Model
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Training + support + employers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION · VISION · VALUES */}
        <section className="mb-10 lg:mb-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Mission
              </h2>
              <p className="mt-2 text-xs text-slate-600">
                Elevate for Humanity exists to build career pathways for people
                who are usually overlooked by traditional systems—connecting
                them to high-demand careers, supportive services, and employers
                who believe in second chances.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Vision
              </h2>
              <p className="mt-2 text-xs text-slate-600">
                A world where zip code, background, and past mistakes do not
                decide a person&apos;s future. Our vision is a network of community
                hubs, training partners, and employers that move in sync to
                lift entire families, not just fill job openings.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Values
              </h2>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">
                    People first:
                  </span>{" "}
                  Systems should bend around people, not the other way around.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Clarity & compliance:
                  </span>{" "}
                  We build with workforce boards, funders, and auditors in mind
                  from day one.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Collaboration:
                  </span>{" "}
                  Schools, employers, and community partners all belong at the
                  same table.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Dignity:
                  </span>{" "}
                  Every learner deserves respect, clear options, and a real
                  chance to finish.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* IMPACT / WHAT WE DO */}
        <section className="mb-10 lg:mb-14">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              What Elevate for Humanity actually does
            </h2>
            <p className="text-[11px] text-slate-500 max-w-sm">
              We don&apos;t just &quot;list courses.&quot; We orchestrate an ecosystem of
              programs, partners, and support so people can enroll, persist, and
              get hired.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Training & credentials
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• HVAC, Building Maintenance, CDL, Barber, and more</li>
                <li>• Healthcare pathways powered by credentialing partners</li>
                <li>• Blended learning (online + hands-on labs)</li>
                <li>• Certificates, industry credentials, and apprenticeship tracks</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Support & wraparound services
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• Barrier-aware coaching and case management approach</li>
                <li>• Referrals for childcare, transportation, and mental health</li>
                <li>• Soft skills, work readiness, and life skills content</li>
                <li>• Peer support & community discussion spaces</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Employer & workforce alignment
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• Work-based learning, WEX, OJT, and apprenticeship models</li>
                <li>• Employer advisory input on curriculum and hiring needs</li>
                <li>• Employer directory and partner onboarding</li>
                <li>• Designed to align with WIOA, WRG, and other funding streams</li>
              </ul>
            </div>
          </div>
        </section>

        {/* LEGAL / STRUCTURE */}
        <section className="mb-10 lg:mb-14">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  How everything is structured
                </h2>
                <p className="text-xs text-slate-600 mb-3">
                  Elevate for Humanity is intentionally built as an ecosystem
                  rather than a single program. Different entities play
                  different roles, but they work together around one mission:
                  making workforce training accessible and sustainable.
                </p>

                <dl className="space-y-2 text-xs text-slate-700">
                  <div>
                    <dt className="font-semibold text-slate-900">
                      Philanthropic Umbrella / Fiscal Intermediary
                    </dt>
                    <dd className="text-slate-600">
                      Selfish Inc. – serving as the philanthropic and fiscal
                      backbone to support mission-aligned initiatives,
                      sponsorships, and compliant use of public and private
                      funds.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">
                      Training & Program Delivery
                    </dt>
                    <dd className="text-slate-600">
                      A network of schools, instructors, and program holders
                      that provide day-to-day instruction, labs, and hands-on
                      training, while Elevate manages compliance, reporting,
                      and the digital learning environment.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">
                      Technology & LMS
                    </dt>
                    <dd className="text-slate-600">
                      A modern learning platform that connects enrollment,
                      courses, video, assessments, certificates, and employer
                      tracking in one place.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-900 text-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                    For workforce boards & funders
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    A partner that speaks both human and compliance.
                  </p>
                  <p className="mt-2 text-[11px] text-slate-200">
                    We design programs and documentation with workforce boards,
                    auditors, and grant managers in mind—attendance, outcomes,
                    documentation, and alignment with approved pathways.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    For training partners & program holders
                  </p>
                  <p className="mt-2 text-[11px] text-slate-600">
                    You focus on high-quality instruction and hands-on
                    learning. Elevate helps with LMS, documentation, reporting,
                    and connecting learners to funding and employers.
                  </p>
                  <p className="mt-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-900">
                      Interested in partnering?
                    </span>{" "}
                    Start with our{" "}
                    <Link
                      href="/onboarding/partner"
                      className="font-semibold text-blue-700 underline underline-offset-2"
                    >
                      partner onboarding form
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM / LEADERSHIP */}
        <section className="mb-10 lg:mb-14">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Leadership & ecosystem roles
            </h2>
            <p className="text-[11px] text-slate-500 max-w-sm">
              The work sits at the intersection of community, training, and
              systems. The leadership model reflects that.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Founder & Ecosystem Architect
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Elizabeth L. Greene
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Leads strategy, ecosystem design, and multi-partner coordination
                across training providers, employers, and community organizations.
                Focused on building a model that&apos;s deeply human and deeply
                compliant at the same time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Program & Instructional Leads
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Instructors, coaches, and program holders who bring real-world
                experience from barbering, HVAC, building maintenance,
                healthcare, CDL, and more. Their role is to deliver high-quality
                training while Elevate supports structure, tools, and reporting.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Employers & ecosystem partners
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Employers, workforce boards, community agencies, and other
                training institutions who believe in giving people a real shot.
                They advise on skills, host work-based learning, and hire
                talent coming through the Elevate pipeline.
              </p>
            </div>
          </div>
        </section>

        {/* MILESTONES / APPROACH */}
        <section className="mb-10 lg:mb-14">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  How we&apos;re building the ecosystem
                </h2>
                <p className="text-xs text-slate-600 mb-3">
                  Elevate for Humanity isn&apos;t a &quot;launch and leave&quot; project. It&apos;s
                  being built in deliberate phases so it can actually support
                  learners, partners, and compliance long-term.
                </p>

                <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Phase 1 – Foundation:
                    </span>{" "}
                    Build core tech, LMS, and enrollment flows; map workforce
                    processes and compliance requirements.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Phase 2 – Programs:
                    </span>{" "}
                    Launch flagship pathways (HVAC, CDL, Barber, Building
                    Maintenance, Medical Assistant) with strong employer input.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Phase 3 – Ecosystem:
                    </span>{" "}
                    Add employer directory, multi-partner onboarding, and
                    stronger reporting views for workforce boards and funders.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Phase 4 – Scale:
                    </span>{" "}
                    Expand to additional regions and partners while maintaining
                    tight standards for quality and compliance.
                  </li>
                </ol>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Our design promises
                  </p>
                  <ul className="mt-2 space-y-1.5 text-slate-600">
                    <li>• Human-friendly for learners, not just portals</li>
                    <li>• Clear documentation trails for funders & auditors</li>
                    <li>• Built to integrate training providers, not replace them</li>
                    <li>• Grounded in real career outcomes, not vanity metrics</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Where you fit in
                  </p>
                  <ul className="mt-2 space-y-1.5 text-slate-600">
                    <li>
                      Students & jobseekers – join a program and get a clear
                      plan, not just a brochure.
                    </li>
                    <li>
                      Employers – co-create pipelines that actually deliver
                      people who are trained for your environment.
                    </li>
                    <li>
                      Training partners – plug your expertise into a broader
                      ecosystem with shared infrastructure.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA ROW */}
        <section className="mb-4 lg:mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-900 text-slate-50 p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                I&apos;m a student / jobseeker
              </p>
              <p className="mt-2 text-xs text-slate-200">
                Explore programs, check eligibility, and get on a path that
                leads to a real job, not just a certificate.
              </p>
              <Link
                href="/programs"
                className="mt-3 inline-flex items-center text-[11px] font-semibold text-emerald-200 hover:text-emerald-100"
              >
                View training options →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                I&apos;m an employer
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Build a pipeline of candidates trained specifically for your
                roles—especially in trades, healthcare, and transportation.
              </p>
              <Link
                href="/onboarding/employer"
                className="mt-3 inline-flex items-center text-[11px] font-semibold text-blue-700 hover:underline"
              >
                Get started as an employer →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                I&apos;m a partner / funder
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Explore how Elevate for Humanity can serve as a structured,
                compliant hub for your workforce or philanthropic initiatives.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center text-[11px] font-semibold text-blue-700 hover:underline"
              >
                Talk with the Elevate team →
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-[11px] text-slate-500">
            Elevate for Humanity is part of a broader ecosystem of mission-driven
            initiatives focused on workforce, community, and economic mobility.
          </p>
        </footer>
      </div>
    </main>
  );
}

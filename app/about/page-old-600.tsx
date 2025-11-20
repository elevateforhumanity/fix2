import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      name: 'People First',
      description:
        'We design every program around the real barriers our learners face – childcare, transportation, housing, and confidence – not just test scores.',
    },
    {
      name: 'Compliance With Compassion',
      description:
        "We speak the language of WIOA, DOL, and state workforce boards so our partners don't have to, while keeping the human at the center.",
    },
    {
      name: 'Pathways, Not One-Off Classes',
      description:
        'We build full pathways – outreach, training, wraparound support, work experience, and job placement – not just a single course.',
    },
    {
      name: 'Community Ownership',
      description:
        'We partner with barbershops, clinics, churches, schools, and small businesses so opportunities live inside the neighborhoods we serve.',
    },
  ];

  const milestones = [
    {
      year: '2018–2020',
      title: 'Seeds of Elevate for Humanity',
      description:
        'Grassroots community work, pop-up trainings, and early partnerships with local schools, barbers, and healthcare providers in Indiana.',
    },
    {
      year: '2021',
      title: 'Formalizing the Vision',
      description:
        'Selfish Inc. 501(c)(3) begins operating as the philanthropic umbrella, aligning workforce development, wraparound supports, and compliance under one roof.',
    },
    {
      year: '2022–2023',
      title: 'Building the Ecosystem',
      description:
        'Launch of Elevate for Humanity as a training and workforce development platform, integrating ETPL/WIOA pathways, program partners, and employer relationships.',
    },
    {
      year: '2024–Present',
      title: 'From Programs to Pipelines',
      description:
        'Scaling an integrated ecosystem that connects learners, employers, credentialing partners, and government funding into one seamless experience.',
    },
  ];

  const stats = [
    {
      label: 'Career-Focused Pathways',
      value: '10+',
      description:
        'In-demand tracks in trades, healthcare, technology, and entrepreneurship.',
    },
    {
      label: 'Community & Employer Partners',
      value: '50+',
      description:
        'From barbershops and clinics to workforce boards and training providers.',
    },
    {
      label: 'Learners Served & Supported',
      value: '1,000+',
      description:
        'Individuals touched through training, coaching, and community initiatives.',
    },
    {
      label: 'States & Regions',
      value: 'Multi-Region',
      description:
        'Indiana-anchored with an ecosystem designed to scale nationwide.',
    },
  ];

  const pillars = [
    {
      title: 'Workforce Training & Upskilling',
      description:
        'Short-term, credential-aligned training in partnership with accredited schools, industry partners, and state workforce boards.',
      bullets: [
        'Employer-driven curriculum and real labor market alignment',
        'State-approved program partners and credentialing organizations',
        'Built-in support for WIOA, WRG, OJT, WEX, and apprenticeships',
      ],
    },
    {
      title: 'Wraparound & Community Support',
      description:
        "We recognize that people don't drop out of programs because they are lazy – they drop out because life is heavy. We build in support.",
      bullets: [
        'Navigation and case management in collaboration with partners',
        'Referrals for childcare, transportation, and housing support',
        'Mental wellness, mentorship, and peer support spaces',
      ],
    },
    {
      title: 'Government & Philanthropic Alignment',
      description:
        'We sit at the intersection of community and compliance – translating grant requirements into real opportunities for people.',
      bullets: [
        'Alignment with WIOA and state workforce priorities',
        'Support for DOL apprenticeships and registered pathways',
        'Fiscal intermediary and backbone support for community partners',
      ],
    },
  ];

  const badges = [
    'Workforce Development & Training Institute',
    'Community-Based Philanthropic Backbone',
    'Employer & Industry Partnership Hub',
    'Government & Grant-Aligned Ecosystem',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 mb-4">
                About Elevate for Humanity
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Turning{' '}
                <span className="underline decoration-blue-400 decoration-4 underline-offset-4">
                  training programs
                </span>{' '}
                into real careers and community stability.
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Elevate for Humanity is a workforce development ecosystem that
                connects learners, employers, credentialing partners, and
                government funding – so people can move from surviving to
                thriving without getting lost in the system.
              </p>
              <p className="text-slate-600 mb-6">
                We are the bridge between{' '}
                <span className="font-semibold text-slate-900">
                  community need
                </span>{' '}
                and{' '}
                <span className="font-semibold text-slate-900">
                  systems that have resources
                </span>{' '}
                – translating the language of grants, policy, and compliance
                into real seats in classrooms, real skills, and real paychecks.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Explore Programs
                </Link>
                <Link
                  href="/workforce-partners"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 transition"
                >
                  Partner With Us
                </Link>
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  Philanthropic & Legal Backbone
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <span className="font-semibold text-slate-900">
                    Legal Entity:
                  </span>{' '}
                  Selfish Inc. 501(c)(3)
                  <br />
                  <span className="font-semibold text-slate-900">
                    Doing Business As:
                  </span>{' '}
                  Elevate for Humanity
                </p>
                <p className="text-sm text-slate-700 mb-4">
                  <span className="font-semibold text-slate-900">Role:</span>{' '}
                  Philanthropic umbrella, fiscal intermediary, and workforce
                  backbone organization for a network of training providers and
                  employers.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white/70 p-3 shadow-sm">
                    <p className="font-semibold text-slate-900 mb-1">
                      What We Handle
                    </p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• Compliance & reporting</li>
                      <li>• Grant & fiscal management</li>
                      <li>• Data, systems & tech</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 shadow-sm">
                    <p className="font-semibold text-slate-900 mb-1">
                      What Partners Do
                    </p>
                    <ul className="space-y-1 text-slate-600">
                      <li>• Deliver hands-on training</li>
                      <li>• Mentor & coach learners</li>
                      <li>• Hire & host participants</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-800 border border-blue-100"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-5 shadow-sm border border-slate-100"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr,3fr] items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-slate-600 mb-4">
              <span className="font-semibold text-slate-900">Mission:</span> To
              remove the invisible red tape that keeps people out of training
              and quality jobs by building an ecosystem where community
              organizations, training providers, employers, and government
              systems actually work together.
            </p>
            <p className="text-slate-600 mb-4">
              <span className="font-semibold text-slate-900">Vision:</span> A
              world where your ZIP code, past barriers, or bank account no
              longer decide your access to skills, credentials, and fair-wage
              careers.
            </p>
            <p className="text-slate-600">
              We do this by blending <strong>technology</strong>,{' '}
              <strong>compliance expertise</strong>, and{' '}
              <strong>deep community partnership</strong>– so learners get more
              than a login and a syllabus. They get a guided pathway, real
              humans, and a village around them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.name}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {value.name}
                </p>
                <p className="text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Timeline */}
      <section className="border-t border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[2fr,3fr] items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How Elevate for Humanity Began
              </h2>
              <p className="text-slate-600 mb-4">
                Elevate for Humanity did not start as a piece of software – it
                started as a response to real people stuck between systems:
                people told they "didn't qualify," "missed the deadline," or
                "need one more form" while bills piled up.
              </p>
              <p className="text-slate-600 mb-4">
                From hauling chairs into community rooms, to helping people fill
                out workforce forms by hand, to standing in the gap between
                agencies that don&apos;t talk to each other – this work grew
                into a structured ecosystem and eventually a full technology
                platform.
              </p>
              <p className="text-slate-600">
                Today, Elevate for Humanity serves as a{' '}
                <strong>backbone organization</strong>: aligning community
                partners, credentialing providers, employers, and government
                programs into one coordinated, human-centered pipeline.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 md:left-1/2" />
              <div className="space-y-8 md:space-y-10">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col gap-2 md:w-1/2 ${
                      index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'
                    }`}
                  >
                    <div
                      className={`absolute h-3 w-3 rounded-full border-2 border-blue-500 bg-white top-1 ${
                        index % 2 === 0 ? 'md:-left-1.5' : 'md:-right-1.5'
                      } left-0.5 md:left-1/2`}
                    />
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 pl-6 md:pl-0">
                      {milestone.year}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 pl-6 md:pl-0">
                      {milestone.title}
                    </p>
                    <p className="text-sm text-slate-600 pl-6 md:pl-0">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What We Actually Do
          </h2>
          <p className="text-slate-600 mb-4">
            Elevate for Humanity is not just "another school" and not just
            "another platform." We are the{' '}
            <span className="font-semibold text-slate-900">
              connective tissue
            </span>{' '}
            that keeps people from falling through the cracks between community
            organizations, training providers, employers, and government
            programs.
          </p>
          <p className="text-slate-600">
            Our work can be understood in three core pillars that work together
            as one ecosystem.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {pillar.description}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                {pillar.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Partners & Compliance */}
      <section className="border-t border-b border-slate-200 bg-slate-50/80">
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Partners, Approvals & Compliance Alignment
              </h2>
              <p className="text-slate-600 mb-4">
                Elevate for Humanity is intentionally built to sit in alignment
                with <strong>state and federal workforce systems</strong> – not
                in competition with them. We work alongside workforce boards,
                schools, and employers to make funding and opportunity easier to
                access, not harder.
              </p>
              <p className="text-slate-600 mb-4">
                Our ecosystem is designed to plug into WIOA, WRG, JRI, WEX, OJT,
                and DOL apprenticeship pathways, as well as state ETPL processes
                and other workforce initiatives – so that every seat in a class
                can be paired with a sustainable funding path wherever possible.
              </p>
              <p className="text-slate-600">
                We also support our partners with documentation, MOUs,
                reporting, and systems that make compliance feel less like a
                barrier and more like a bridge to resources.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Examples of How We Align
              </p>
              <ul className="space-y-2 text-sm text-slate-700 mb-5">
                <li>• Workforce Board partnerships and referral pipelines</li>
                <li>
                  • ETPL-aligned training programs with approved providers
                </li>
                <li>
                  • Registered apprenticeship and State Earn & Learn pathways
                </li>
                <li>
                  • Grant-ready documentation, budgets, and compliance support
                </li>
              </ul>
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
                <p className="font-semibold text-slate-900 mb-1">
                  For Workforce & Government Partners
                </p>
                <p className="mb-3">
                  If you represent a workforce board, city, county, or state
                  agency and want to explore how Elevate for Humanity can
                  support your goals, we are ready to plug into your existing
                  priorities and funding streams.
                </p>
                <Link
                  href="/workforce-partners"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-700 transition"
                >
                  View Workforce & Government Partner Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr,3fr] items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Leadership & Backbone Team
            </h2>
            <p className="text-slate-600 mb-4">
              Elevate for Humanity is led by practitioners who have sat at every
              table: the parent trying to enroll in a program, the small
              business owner trying to hire, the nonprofit leader writing
              grants, and the partner trying to keep up with state and federal
              compliance.
            </p>
            <p className="text-slate-600 mb-4">
              Our leadership blends <strong>lived experience</strong>,{' '}
              <strong>policy and compliance expertise</strong>, and{' '}
              <strong>hands-on program management</strong> – so we can build
              systems that honor real life, not just paperwork.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900 mb-1">
                Elizabeth L. Greene – Founder & Ecosystem Architect
              </p>
              <p className="text-sm text-slate-600">
                Elizabeth has spent years building bridges between schools,
                workforce boards, government agencies, and community partners –
                designing Elevate for Humanity as a living ecosystem that makes
                it easier for learners and employers to actually meet in the
                middle.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Let&apos;s Build Pathways Together
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Whether you are an individual looking for a new career path, an
              employer seeking talent, a school or training provider, or a
              workforce/government partner – Elevate for Humanity was built to
              work <span className="font-semibold text-slate-900">with</span>{' '}
              you, not around you.
            </p>
            <p className="text-sm text-slate-700 mb-6">
              Tell us who you are and what you&apos;re trying to solve, and we
              will help map the right mix of programs, partners, and support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
              >
                Contact the Elevate Team
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50 transition"
              >
                I&apos;m Ready to Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

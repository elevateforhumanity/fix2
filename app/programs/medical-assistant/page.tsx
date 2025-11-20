import Link from 'next/link';

export default function MedicalAssistantProgramPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {/* HERO */}
        <section className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
            <span>Healthcare Pathways</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            <span>Medical Assistant Program</span>
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr,1.1fr] lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Become a{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Medical Assistant
                </span>{' '}
                and step into the heart of patient care.
              </h1>
              <p className="mt-4 text-sm md:text-base text-slate-600 max-w-xl">
                The Elevate for Humanity Medical Assistant pathway is built for
                adults who need a clear, supported route into healthcare — not
                just a brochure. You&apos;ll learn hands-on clinical skills,
                front-office basics, and the soft skills employers expect, with
                support for the real-life barriers you&apos;re juggling.
              </p>

              <div className="mt-5 grid gap-3 text-xs sm:grid-cols-3 max-w-xl">
                <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Program length
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    ~16–24 weeks*
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Blended online + in-person labs
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Format
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Flexible, barrier-aware
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Evening/stackable schedule options
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Pathway
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Entry-level healthcare
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Clinics, practices, hospitals & more
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/enroll?program=medical-assistant"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                >
                  Start enrollment for Medical Assistant
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
                >
                  Talk to an advisor about this program
                </Link>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                *Exact schedule, hours, and timeline may vary by cohort,
                location, and credentialing partner.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                  This program is a strong fit if:
                </p>
                <ul className="mt-2 space-y-1.5 text-slate-600">
                  <li>
                    • You like helping people and staying busy on your feet.
                  </li>
                  <li>
                    • You want a faster route into healthcare, not years of
                    school.
                  </li>
                  <li>
                    • You need a program that understands work, kids, and life.
                  </li>
                  <li>
                    • You&apos;re open to both clinical and front-office duties
                    in a medical setting.
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-900 text-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                  Outcomes you&apos;re working toward
                </p>
                <ul className="mt-2 space-y-1.5 text-slate-100">
                  <li>• Entry-level Medical Assistant roles</li>
                  <li>
                    • Strong foundation for Nursing, LPN, RN, and other paths
                  </li>
                  <li>• Confidence with patients, providers, and technology</li>
                  <li>• A clearer long-term healthcare career plan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHAT YOU'LL LEARN */}
        <section className="mb-10 lg:mb-14">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              What you&apos;ll learn in the Elevate Medical Assistant pathway
            </h2>
            <p className="text-[11px] text-slate-500 max-w-sm">
              Curriculum is built with employers and credentialing partners so
              you&apos;re not surprised when you step into a real clinic or
              office.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Clinical skills
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>
                  • Taking vital signs (blood pressure, pulse, respirations,
                  temp)
                </li>
                <li>• Height, weight, BMI and basic measurements</li>
                <li>• Assisting with exams and minor procedures</li>
                <li>• Infection control, PPE, and safety protocols</li>
                <li>
                  • Basic specimen collection and lab basics (program-dependent)
                </li>
                <li>• Rooming patients and preparing exam rooms</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Front-office & admin skills
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• Patient intake, demographics, and charting basics</li>
                <li>• Scheduling, reminders, and phone etiquette</li>
                <li>• Professional communication with providers & staff</li>
                <li>• Intro to medical terminology and documentation</li>
                <li>• Understanding EHR/EMR systems at a beginner level</li>
                <li>• Insurance basics and patient financial conversations</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Professionalism & soft skills
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• Showing up on time, prepared, and professional</li>
                <li>• Communication with patients from all backgrounds</li>
                <li>• Working with providers, nurses, and the care team</li>
                <li>• Managing stress, boundaries, and compassion fatigue</li>
                <li>• Time management for school, work, and family</li>
                <li>• Building confidence and self-advocacy at work</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Career skills & next steps
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li>• Building a healthcare-ready resume</li>
                <li>• Interview prep and mock interviews</li>
                <li>
                  • Understanding different healthcare settings (clinics,
                  practices, hospitals)
                </li>
                <li>• How to grow: phlebotomy, EKG, LPN/RN and beyond</li>
                <li>• Working with workforce boards and funding partners</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION: PROGRAM STRUCTURE */}
        <section className="mb-10 lg:mb-14">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  How the program is structured
                </h2>
                <p className="text-xs text-slate-600 mb-3">
                  The Medical Assistant pathway is designed around real life —
                  work schedules, kids&apos; pickups, transportation, and
                  everything else that usually makes people give up. Expect a
                  blend of online lessons, discussion, and in-person skills
                  practice.
                </p>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li>
                    • Weekly online modules you can complete on your schedule
                  </li>
                  <li>
                    • Live virtual sessions or in-person huddles (cohort-based)
                  </li>
                  <li>• Hands-on labs for skills like vitals and exam prep</li>
                  <li>
                    • Externship/clinical-style experiences where available
                  </li>
                  <li>
                    • Regular check-ins so you&apos;re not left alone to figure
                    it out
                  </li>
                </ul>

                <p className="mt-3 text-[11px] text-slate-500">
                  Exact format may vary depending on partner clinic sites,
                  cohort size, and local requirements.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    A week in the life (example)
                  </p>
                  <ul className="mt-2 space-y-1.5 text-slate-600">
                    <li>• 2–4 hours of online modules and quizzes</li>
                    <li>
                      • 1 live session (virtual or in-person) with your cohort
                    </li>
                    <li>
                      • 1 lab/skills block for hands-on practice (where
                      available)
                    </li>
                    <li>• Optional tutoring, office hours, or study group</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Clinical / externship experiences
                  </p>
                  <p className="mt-2 text-slate-600">
                    Where partner clinics and healthcare sites are available,
                    you may have the opportunity to complete supervised hours in
                    a real healthcare setting. Availability may vary by region
                    and cohort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHO IT'S FOR / REQUIREMENTS */}
        <section className="mb-10 lg:mb-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                Who this program is a good fit for
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  • Adults looking for a first or next career in healthcare
                </li>
                <li>
                  • People currently in low-wage roles who want a better path
                </li>
                <li>• Parents and caregivers who need flexible options</li>
                <li>• Returning citizens rebuilding their career story</li>
                <li>
                  • Anyone who wants to move toward nursing or other healthcare
                  roles
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                Basic expectations & requirements
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  • Consistent access to a smartphone, tablet, or computer
                </li>
                <li>• Willingness to attend scheduled labs or live sessions</li>
                <li>• Comfort working with patients, bodily fluids, and PPE</li>
                <li>
                  • Ability to pass any partner site background or health checks
                  (varies)
                </li>
                <li>
                  • Commitment to completing modules and assignments on time
                </li>
              </ul>
              <p className="mt-2 text-[11px] text-slate-500">
                Exact eligibility and background requirements may depend on the
                clinical sites and employer partners in your area.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: FUNDING & SUPPORT */}
        <section className="mb-10 lg:mb-14">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  Funding, workforce partnerships & support
                </h2>
                <p className="text-xs text-slate-600 mb-3">
                  Elevate for Humanity is built with workforce boards and
                  funding sources in mind. Depending on your location and
                  eligibility, there may be options that reduce or fully cover
                  the cost of training.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li>
                    • Potential WIOA or workforce board funding (where approved)
                  </li>
                  <li>
                    • Grants, scholarships, or sponsored slots when available
                  </li>
                  <li>• Employer-supported pathways and work-based learning</li>
                  <li>• Flexible payment plans or self-pay if needed</li>
                </ul>
                <p className="mt-3 text-[11px] text-slate-500">
                  Funding and approval status can change. An advisor will walk
                  you through your options based on where you live and your
                  background.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Support beyond the classroom
                  </p>
                  <ul className="mt-2 space-y-1.5 text-slate-600">
                    <li>• Help navigating workforce and funding paperwork</li>
                    <li>
                      • Referrals for transportation and childcare resources
                    </li>
                    <li>• Soft skills and barrier-removal coaching</li>
                    <li>• Help connecting to employers after completion</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    For employers & partners
                  </p>
                  <p className="mt-2 text-slate-600">
                    If you&apos;re a clinic, practice, or healthcare employer
                    interested in hosting learners, shaping curriculum, or
                    hiring graduates, we&apos;d love to talk.
                  </p>
                  <Link
                    href="/onboarding/employer"
                    className="mt-2 inline-flex items-center text-[11px] font-semibold text-blue-700 hover:underline"
                  >
                    Learn more about partnering on MA talent →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="mb-10 lg:mb-14">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            Frequently asked questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Do I need previous healthcare experience?
              </p>
              <p className="mt-1 text-slate-600">
                No. This pathway is designed for beginners as well as people
                already working in entry-level roles who want to move up. We
                start with foundations and build from there.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Can I work while I&apos;m in the program?
              </p>
              <p className="mt-1 text-slate-600">
                Many learners do. The program uses a mix of online learning and
                scheduled labs or sessions. We&apos;ll talk through your
                schedule during enrollment so you understand what it will take.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Will this guarantee me a job?
              </p>
              <p className="mt-1 text-slate-600">
                No one can promise a job, but this pathway is built with real
                employers and workforce partners. We focus heavily on
                job-readiness, professional skills, and helping you connect to
                roles once you&apos;re eligible.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                How do I know if I qualify for funding help?
              </p>
              <p className="mt-1 text-slate-600">
                Funding depends on where you live, your income, background, and
                which programs are currently approved. The best step is to start
                an interest form and let an Elevate advisor walk you through
                options.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mb-4 lg:mb-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-900 text-slate-50 p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Ready to explore the Medical Assistant pathway?
              </p>
              <p className="mt-2 text-xs text-slate-100 max-w-md">
                You don&apos;t have to have it all figured out today. Start by
                raising your hand, and we&apos;ll help you understand the
                program, schedule, and funding options based on your situation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/enroll?program=medical-assistant"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2 text-[11px] font-semibold text-white hover:bg-emerald-600 transition"
              >
                Start enrollment interest form
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2 text-[11px] font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
              >
                Ask a question about this program
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

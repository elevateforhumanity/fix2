import Link from "next/link";

export const metadata = {
  title: "Barber Apprenticeship Program | Elevate for Humanity",
  description:
    "State-approved Barber Apprenticeship with shop-based training, paid experience, and a clear path to licensure for Indiana learners, re-entry participants, and workforce clients.",
};

const HIGHLIGHTS = [
  "State-approved barber apprenticeship with real barbershop experience",
  "Earn while you learn with paid on-the-job training (where available)",
  "Licensure-focused training aligned with Indiana barber board requirements",
  "Coaching on business, booking, client retention, and shop etiquette",
  "Supportive environment for learners, career-changers, and re-entry participants",
];

const WHO_IT_SERVES = [
  "Young adults ready to build a long-term skilled trade career",
  "Career changers who want a hands-on, creative profession",
  "Re-entry / justice-involved individuals rebuilding work history",
  "Workforce clients referred by WRG, WIOA, SNAP E&T, and other partners",
];

const CURRICULUM = [
  "Foundations: sanitation, safety, professional conduct, and shop readiness",
  "Clipper work: fades, tapers, line-ups, and texturizing techniques",
  "Shaving & grooming: razor work, beard design, and facial treatments",
  "Client care: consultations, communication, and service recovery",
  "Shop systems: booking, POS, retail products, and simple bookkeeping",
  "Licensure prep: state exam readiness, documentation, and next steps",
];

const FUNDING = [
  "Workforce Ready Grant (WRG) – where eligible and approved",
  "WIOA / workforce board sponsorship – where available",
  "Registered Apprenticeship and On-the-Job Training structures",
  "Employer-sponsored apprenticeship slots in partner barbershops",
  "Self-pay and payment plan options if public funding is not available",
];

const OUTCOMES = [
  "Documented barber apprenticeship hours in approved barbershops",
  "Licensure exam readiness and support navigating state paperwork",
  "Real client experience, not just mannequin practice",
  "Job placement support with partner barbershops and salons",
  "Foundations for chair rental, booth ownership, or shop ownership",
];

const FAQ = [
  {
    q: "How long does the Barber Apprenticeship Program take?",
    a: "Most learners complete their hours over 12–18 months, depending on schedule, shop availability, and state hour requirements. During orientation we build a realistic timeline with you.",
  },
  {
    q: "Do I need experience to start?",
    a: "No. We work with beginners, career changers, and re-entry participants. You bring commitment and reliability; we help with skills, structure, and a pathway to licensure.",
  },
  {
    q: "Can this be funded through WRG, WIOA, or other workforce programs?",
    a: "In many cases, yes. We work with workforce boards, case managers, and community organizations to braid funding and reduce out-of-pocket costs where possible.",
  },
  {
    q: "What if I already work in a barbershop?",
    a: "Great. We can often work with your existing shop as an apprenticeship site if they meet requirements, or we can connect you to approved partner locations.",
  },
];

export default function BarberApprenticeshipPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Barber Apprenticeship • Licensed Trade Pathway
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Become a Licensed Barber Through Real Shop-Based Training
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Step into a barbershop, not just a classroom. The Barber
              Apprenticeship Program blends hands-on experience with structured
              training, so you can build real skills, earn hours toward
              licensure, and create a career that pays you and serves your
              community.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?program=barber-apprenticeship"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply for Barber Apprenticeship
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Talk with an Advisor
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Ideal for learners, re-entry participants, and case managers
              looking for a clear, compliant pathway from "interested in barbering"
              to "licensed, employed, and earning."
            </p>
          </div>

          {/* SNAPSHOT CARD */}
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-slate-900 px-5 py-5 text-sm text-slate-50 shadow-lg md:w-80">
            <h2 className="text-sm font-semibold text-white">
              Program Snapshot
            </h2>
            <dl className="mt-3 space-y-2 text-xs text-slate-100/90">
              <div className="flex justify-between">
                <dt className="text-slate-300">Pathway</dt>
                <dd className="font-medium">Barber Apprenticeship</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Format</dt>
                <dd className="font-medium">
                  Barbershop + Classroom / Lab Sessions
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Typical Length</dt>
                <dd className="font-medium">
                  12–18 months (varies by hours & schedule)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Location</dt>
                <dd className="font-medium">
                  Partner barbershops across Indiana
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Schedule</dt>
                <dd className="font-medium">
                  Daytime, evening & weekend options
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              During intake, we review your goals, schedule, and funding
              options so you understand what it will take to reach licensure
              and employment.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN + WHO IT SERVES */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What you&apos;ll learn
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              You&apos;ll get real experience on real clients, backed by
              structured training that prepares you to pass the state exam and
              work with confidence behind the chair.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Who this program is for
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This program is built for real life. We understand gaps in work
              history, childcare, re-entry, and transportation challenges.
              You don't have to be perfect — just serious about your next step.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {WHO_IT_SERVES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-slate-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Curriculum overview
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                You&apos;ll move through a sequence that starts with safety and
                sanitation, builds technical skill, and ends with business and
                licensure prep — with coaching the whole way through.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {CURRICULUM.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-900/95 p-5 text-sm text-slate-50 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                Shop-based learning, not just theory
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                You&apos;ll split time between shop work and guided
                instruction. That means learning how to fade, shave, and style
                — and how to show up on time, communicate with clients, and
                work as part of a professional team.
              </p>
              <p className="mt-3 text-xs text-slate-200">
                Expect to practice on mannequins at first, then transition to
                real clients with supervision. You&apos;ll get feedback,
                repetition, and support — not just a one-time demo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900">
            How to Get Started: Step-by-Step Process
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Follow these steps to enroll in the Barber Apprenticeship Program with WIOA or WRG funding.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                1
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Register with INconnect
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Visit <a href="https://www.in.gov/dwd/inconnect/" target="_blank" rel="noopener" className="text-orange-600 underline">INconnect.in.gov</a> and create your account. Complete your profile, upload your resume, and indicate interest in barber training.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>Required:</strong> Valid ID, Social Security card, proof of Indiana residency
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                2
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Apply for WIOA or WRG
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Contact your local WorkOne office to apply for <strong>WIOA (Workforce Innovation and Opportunity Act)</strong> or <strong>WRG (Workforce Ready Grant)</strong> funding.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>WIOA:</strong> For dislocated workers, low-income adults, youth<br/>
              <strong>WRG:</strong> For high-demand careers, covers tuition + support services
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                3
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Meet with Case Manager
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Your WorkOne case manager will assess eligibility, review your goals, and help you select Elevate for Humanity as your training provider.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>Bring:</strong> Work history, income verification, proof of barriers (if applicable)
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                4
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Complete Orientation
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Attend our program orientation to learn about shop placement, Milady LMS coursework, apprenticeship requirements, and Indiana barber licensure.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>Includes:</strong> Safety training, shop expectations, LMS setup
            </p>
          </div>

          {/* Step 5 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                5
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Begin Shop Training
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Start your apprenticeship at a partner barbershop. Work with real clients, log your hours, and complete Milady coursework online.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>Track:</strong> 1,500 hours required for Indiana barber license
            </p>
          </div>

          {/* Step 6 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                6
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Pass State Exam
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Complete your hours, pass the Indiana State Board exam (written + practical), and receive your barber license. We support you through the entire process.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <strong>Result:</strong> Licensed barber ready for employment or booth rental
            </p>
          </div>
        </div>
      </section>

      {/* WIOA & WRG EXPLAINED */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-2xl font-semibold text-slate-900">
            Understanding WIOA & WRG Funding
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            These federal and state programs can cover 100% of your training costs plus support services.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* WIOA */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                WIOA (Workforce Innovation and Opportunity Act)
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Federal program providing training funds for eligible adults, dislocated workers, and youth ages 16-24.
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p><strong>Eligibility:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Low-income adults or families</li>
                  <li>Dislocated workers (laid off, plant closure)</li>
                  <li>Youth with barriers to employment</li>
                  <li>Veterans and individuals with disabilities</li>
                  <li>Re-entry participants (justice-involved)</li>
                </ul>
                <p className="mt-3"><strong>Covers:</strong> Tuition, books, supplies, uniforms, transportation, childcare</p>
              </div>
            </div>

            {/* WRG */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                WRG (Workforce Ready Grant)
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Indiana state grant covering tuition and fees for high-demand career training programs.
              </p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p><strong>Eligibility:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Indiana resident</li>
                  <li>U.S. citizen or eligible non-citizen</li>
                  <li>Not currently enrolled in college</li>
                  <li>Pursuing high-demand credential (barber license qualifies)</li>
                  <li>Income at or below 250% of federal poverty level</li>
                </ul>
                <p className="mt-3"><strong>Covers:</strong> Up to $7,500 per year for tuition, fees, books, and certification exams</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
            <p className="text-sm text-slate-700">
              <strong>💡 Pro Tip:</strong> You can combine WIOA and WRG funding! WIOA can cover support services (transportation, childcare) while WRG covers tuition. Your case manager will help you maximize benefits.
            </p>
          </div>
        </div>
      </section>

      {/* MILADY LMS CONNECTION */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900">
                Milady LMS: Your Online Barber Education Platform
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                All apprentices receive access to <strong>Milady Standard Barbering</strong> coursework through our Learning Management System (LMS). This industry-leading curriculum is fully integrated with your shop-based apprenticeship.
              </p>
              
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">What's Included:</h4>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span>Video lessons on cutting, shaving, and styling techniques</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span>Interactive quizzes and knowledge checks</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span>State board exam prep materials</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span>Sanitation, safety, and professional conduct modules</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span>Business and client management training</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900">How It Works:</h4>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="text-indigo-600">1.</span>
                      <span>Access Milady LMS from any device (phone, tablet, computer)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">2.</span>
                      <span>Complete modules at your own pace between shop shifts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">3.</span>
                      <span>Track your progress and apprenticeship hours in one place</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">4.</span>
                      <span>Instructors review your work and provide feedback</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-600">5.</span>
                      <span>Earn certificates as you complete each section</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-indigo-300 bg-white p-4">
                <p className="text-sm text-slate-700">
                  <strong>🎓 Apprenticeship + LMS = Complete Training:</strong> Your shop experience teaches you hands-on skills with real clients. Milady LMS provides the theory, safety knowledge, and exam prep you need to pass the Indiana State Board and become a licensed barber.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING & PARTNER INFO */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Funding, support, and case management
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Elevate for Humanity works directly with workforce boards, case
              managers, and barbershops to braid funding and support services.
              Our goal is to reduce barriers and get you from sign-up to
              licensed, working professional.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {FUNDING.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Final funding decisions depend on eligibility, county, and
              partner approvals. During intake, we will review options and help
              you and your case manager understand what&apos;s possible.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              For case managers & workforce partners
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              We provide documentation to support workforce compliance:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
              <li>• Enrollment verification and individualized training plans</li>
              <li>• Attendance, participation, and progress reports</li>
              <li>• Skill milestones and competency checklists</li>
              <li>• Credential / licensure attempt and completion updates</li>
              <li>• Employment and retention follow-up where applicable</li>
            </ul>
            <Link
              href="/partners"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              View Partner & Agency Information
            </Link>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="border-y border-slate-100 bg-slate-900/95">
        <div className="mx-auto max-w-6xl px-4 py-10 text-slate-50 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr,1fr] md:items-center md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-white">
                What you&apos;ll walk away with
              </h2>
              <p className="mt-2 text-sm text-slate-200">
                This isn&apos;t just "learn to cut hair." It&apos;s a structured
                pathway into a respected trade, with support to navigate
                testing, paperwork, and real-world expectations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-100">
                {OUTCOMES.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-orange-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 text-sm text-slate-100 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                Apprenticeship, licensure & next steps
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Exact hours and licensure requirements are set by the state and
                licensing board. We align with those rules, help you document
                your time, and walk you through what&apos;s needed for your exam
                and license application.
              </p>
              <p className="mt-3 text-xs text-slate-300">
                During orientation, you&apos;ll review:
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-200">
                <li>• Program expectations and code of conduct</li>
                <li>• Required hours and pacing based on your schedule</li>
                <li>• How shop placement works and what shops expect</li>
                <li>• What to do if you need to pause, restart, or relocate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 className="text-lg font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Ready to start or restart your career behind the chair?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Whether you&apos;re fresh out of school, coming home from a
              justice-involved setting, or leaving another job behind, the
              Barber Apprenticeship Program gives you structure, support, and a
              path to a licensed skill that can feed you and your family.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start My Barber Application
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View All Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Case managers, shop owners, and agencies can also contact us
            directly to discuss cohorts, sponsorships, and referral pathways
            for your clients.
          </p>
        </div>
      </section>
    </main>
  );
}

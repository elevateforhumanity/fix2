import Link from 'next/link';

export const metadata = {
  title: 'Medical Assistant Program | Elevate Connects Directory',
  description:
    'Workforce-aligned Medical Assistant training with hands-on labs, externships, and a path to industry-recognized credentials and entry-level healthcare jobs.',
};

const HIGHLIGHTS = [
  'Hands-on Medical Assistant training with labs and real-world skills',
  'Externship experience in clinics, practices, or healthcare sites',
  'Preparation for industry-recognized MA certification exams (where available)',
  'Focus on both clinical and administrative skills employers actually use',
  'Supportive environment for new starters, career-changers, and re-entry learners',
];

const WHO_IT_SERVES = [
  'Learners who want an entry-level healthcare career with growth potential',
  'Career changers moving from retail, food service, or other industries into healthcare',
  'Re-entry / justice-involved participants building a new track record in a high-demand field',
  'Workforce clients referred by WRG, WIOA, SNAP E&T, VR, and community partners',
];

const CURRICULUM = [
  'Healthcare foundations: medical terminology, anatomy & physiology basics',
  'Clinical skills: vitals, patient intake, rooming, and basic procedures support',
  'Lab skills: specimen collection, CLIA-waived testing, and documentation (where applicable)',
  'Administrative: scheduling, phone etiquette, electronic health records, and charting basics',
  'Professional skills: communication, teamwork, confidentiality, and patient experience',
  'Certification & career prep: exam readiness, resumes, interviews, and job search strategy',
];

const FUNDING = [
  'Workforce Ready Grant (WRG) – where eligible and approved',
  'WIOA / workforce board sponsorship – depending on local approvals',
  'Support through re-entry, community, and faith-based partners where available',
  'Employer partnerships and tuition assistance, when offered by hiring partners',
  'Self-pay and payment plan options if public funding is not available',
];

const OUTCOMES = [
  'Entry-level Medical Assistant skills to support providers and care teams',
  'Documentation of training, competencies, and externship hours (where applicable)',
  'Preparation for industry-recognized Medical Assistant credential exams (where available)',
  'Résumé, interview practice, and job search support for outpatient / clinic roles',
  'A pathway into healthcare with room to grow into other allied health roles',
];

const FAQ = [
  {
    q: 'How long does the Medical Assistant Program take?',
    a: 'Most Medical Assistant programs run approximately 4–9 months depending on schedule, externship length, and partner site availability. During orientation we review the specific timeline for your cohort.',
  },
  {
    q: 'Do I need previous healthcare experience?',
    a: "No. Many learners are new to healthcare. We start with foundations and build from there. You'll need reliability, willingness to learn, and comfort working with people.",
  },
  {
    q: 'Can this be funded through WRG, WIOA, or other workforce programs?',
    a: 'In many cases, yes. We work with workforce boards, case managers, and community partners to braid funding and reduce out-of-pocket costs where possible based on eligibility and approvals.',
  },
  {
    q: 'Will I be ready to work after I finish?',
    a: 'The goal of this program is to prepare you with real skills, externship experience where available, and support for credential exams and job search. Employers make final hiring decisions, but we align to what clinics and practices are asking for.',
  },
];

export default function MedicalAssistantPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Medical Assistant • Healthcare Career Pathway
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Train as a Medical Assistant and Step Into Healthcare
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              The Medical Assistant Program helps you move into healthcare with
              real skills, hands-on labs, and externship experience where
              available. You&apos;ll learn how to support providers, care for
              patients, and keep a clinic running smoothly — with workforce
              partners and wraparound support alongside you.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?program=medical-assistant"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply for Medical Assistant
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Talk with an Advisor
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Designed for learners, career changers, and case-managed clients
              who want a structured, supportive pathway into a healthcare role
              that makes a difference every day.
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
                <dd className="font-medium">Medical Assistant</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Format</dt>
                <dd className="font-medium">
                  Classroom / Lab + Externship (where available)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Typical Length</dt>
                <dd className="font-medium">
                  ~4–9 months (varies by schedule & site)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Location</dt>
                <dd className="font-medium">
                  Training sites & partner clinics in Indiana
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Schedule</dt>
                <dd className="font-medium">
                  Daytime and/or evening options by cohort
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              Exact schedule, location, and externship details are confirmed at
              enrollment based on your cohort, partners, and site availability.
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
              You&apos;ll build the mix of clinical, administrative, and
              professional skills that clinics and practices look for when they
              hire entry-level Medical Assistants.
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
              This pathway is built for real life and real barriers. We work
              with learners directly and through workforce partners to support
              childcare, transportation, re-entry, and other challenges where
              possible.
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
                The curriculum blends classroom instruction, skills labs, and
                externship experience where available. You&apos;ll learn how to
                show up as part of a care team, not just "do tasks."
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
                Hands-on learning with real expectations
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                Expect to practice taking vitals, doing patient intake, and
                working with basic equipment in a lab setting before supporting
                real patients. You&apos;ll also learn what it means to respect
                privacy, follow instructions, and keep up with a busy day in a
                clinic.
              </p>
              <p className="mt-3 text-xs text-slate-200">
                Our team talks openly about professionalism, attendance,
                communication, and the soft skills that make the difference
                between just getting hired — and staying hired.
              </p>
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
              Elevate for Humanity is built to work alongside workforce boards,
              community organizations, and employers. We help braid funding and
              support services so tuition isn&apos;t the only voice in the room
              when you&apos;re making decisions.
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
              Actual funding depends on your eligibility, county, provider
              approvals, and timing. Case managers and learners can meet with
              our team to review options before committing.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              For case managers & workforce partners
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              We understand compliance, documentation, and audits. For workforce
              and community partners, we can provide:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
              <li>
                • Enrollment verification and individualized training plans
              </li>
              <li>• Attendance and participation reporting</li>
              <li>• Progress notes and skill milestone tracking</li>
              <li>
                • Credential attempt and completion updates (where applicable)
              </li>
              <li>
                • Employment and retention follow-up for outcome reporting
              </li>
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
                This program is designed to lead to real entry-level
                opportunities in healthcare, not just a line on a resume.
                You&apos;ll leave with skills, experience, and a clearer sense
                of where you can grow next.
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
                Healthcare is a long game — we help you start well
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Medical Assistant can be a destination role or a first step
                toward nursing, allied health, or other healthcare careers. We
                talk openly about what those paths can look like and what it
                takes to keep moving.
              </p>
              <p className="mt-3 text-xs text-slate-300">
                During orientation, we review expectations, next steps, and how
                your workforce or community partners fit into the plan so
                everyone is on the same page from day one.
              </p>
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
              Ready to begin your healthcare career?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Whether you&apos;re stepping into healthcare for the first time or
              returning to build something new, the Medical Assistant Program
              gives you structure, support, and a practical on-ramp into clinics
              and care teams that need you.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?program=medical-assistant"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start My Medical Assistant Application
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              View All Programs
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            Case managers and partners can also reach out directly to plan
            cohorts, referrals, and funding options for your clients.
          </p>
        </div>
      </section>
    </main>
  );
}

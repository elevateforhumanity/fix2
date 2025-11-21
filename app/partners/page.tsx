import Link from "next/link";

export const metadata = {
  title: "Partner With Elevate | Training Sites, Employers & Barbershops",
  description:
    "Become a training partner, apprenticeship site, or employer partner with Elevate for Humanity. Host learners, build your talent pipeline, and align with workforce funding.",
};

const PARTNER_TYPES = [
  "Barbershops and salons that want to host barber apprentices",
  "Healthcare clinics and practices that need Medical Assistants and front-office staff",
  "HVAC, building maintenance, and skilled trades employers looking for entry-level talent",
  "CDL, logistics, warehouse, and distribution employers building local pipelines",
  "Community organizations and nonprofits that co-host training or support services",
];

const WHAT_PARTNERS_GET = [
  "A structured talent pipeline aligned to your real hiring needs",
  "Learners who are coached on attendance, professionalism, and soft skills",
  "Support with documentation, hours tracking, and basic compliance needs",
  "Connection to workforce boards and funding where eligible",
  "Visibility in the Elevate for Humanity so learners and partners can find you",
];

const EXPECTATIONS = [
  "Provide a safe, professional learning environment for learners and apprentices",
  "Allow learners to practice skills under supervision, within clear boundaries",
  "Communicate issues (attendance, performance, conduct) early so we can respond",
  "Complete simple check-ins, evaluations, or hour logs as requested",
  "Stay aligned with state, licensing, and workforce requirements for your industry",
];

export default function PartnersPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:py-16">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Partners • Training Sites • Employers
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Host Learners. Build Talent. Change What Work Looks Like.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Elevate for Humanity connects real people to real skills and real
              workplaces. As a partner, you host learners, apprentices, or
              interns — and we bring structure, coaching, and workforce
              alignment so the experience is good for both you and them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply?type=partner"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Apply to Become a Partner
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Schedule a Partner Call
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              We work with barbershops, clinics, trades employers, logistics
              companies, nonprofits, and more. If you support people or hire
              people, there&apos;s likely a way to build with us.
            </p>
          </div>

          {/* SNAPSHOT */}
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-slate-900 px-5 py-5 text-sm text-slate-50 shadow-lg md:w-80">
            <h2 className="text-sm font-semibold text-white">Partner Snapshot</h2>
            <dl className="mt-3 space-y-2 text-xs text-slate-100/90">
              <div className="flex justify-between">
                <dt className="text-slate-300">Partner Types</dt>
                <dd className="font-medium">Shops, clinics, trades, employers</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Commitment</dt>
                <dd className="font-medium">Cohort-based or ongoing</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Focus Areas</dt>
                <dd className="font-medium">Workforce, apprenticeship, re-entry</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-300">Support</dt>
                <dd className="font-medium">Attendance, coaching, reporting</dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-slate-300">
              We keep expectations clear: you provide the real-world environment,
              we support learners and help handle documentation, behavior, and
              workforce requirements.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE PARTNER WITH */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Who we partner with
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              If your organization hires people, serves people, or supports
              people, we likely have a way to plug you into training, placement,
              or wraparound support.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {PARTNER_TYPES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              What partners receive
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We are not a "send us a warm body" shop. We care about fit,
              readiness, and long-term success. Partners get a coordinated
              relationship, not one-off chaos.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {WHAT_PARTNERS_GET.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-slate-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EXPECTATIONS */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                What we ask of our partners
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We keep expectations clear and simple. You don&apos;t have to be
                perfect — you just need to be willing to host, communicate, and
                treat learners as humans in progress.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-900/95 p-5 text-sm text-slate-50 shadow-md">
              <h3 className="text-sm font-semibold text-white">
                Compliance & documentation support
              </h3>
              <p className="mt-2 text-xs text-slate-200">
                We help keep things organized — attendance logs, hour tracking,
                evaluations, and proof of training. For barbershops, clinics,
                and trades employers, that means you&apos;re not left alone with
                paperwork.
              </p>
              <p className="mt-3 text-xs text-slate-200">
                For workforce-funded learners, we align with WIOA, WRG, SNAP
                E&amp;T, and re-entry reporting needs so partners aren&apos;t
                guessing what to fill out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">
              Ready to host learners or apprentices?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Tell us about your shop, clinic, site, or organization, and we'll
              explore how to plug you into Elevate&apos;s ecosystem of training,
              support, and workforce funding.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply?type=partner"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400"
            >
              Start Partner Application
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-600 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              Request a Partner Meeting
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            We welcome conversations with barbershops, healthcare providers,
            trades employers, community orgs, and others who want to build real
            pathways, not just one-time placements.
          </p>
        </div>
      </section>
    </main>
  );
}

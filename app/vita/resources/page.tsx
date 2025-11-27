import Link from "next/link";

export const metadata = {
  title: "VITA / TCE Resources | Elevate for Humanity",
  description:
    "Central hub for IRS VITA/TCE resources, Link & Learn training, Intuit Academy courses, and required volunteer forms.",
};

export default function VitaResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            VITA / TCE Volunteer Hub
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            VITA &amp; Community Tax Prep Resources
          </h1>
          <p className="mt-3 text-xs text-slate-200 max-w-2xl">
            This page organizes the official IRS and Intuit resources you need
            to complete certification, training, and service hours as part of
            Elevate for Humanity&apos;s Tax &amp; VITA Track.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/programs/tax-vita"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to Tax &amp; VITA Program
            </Link>
            <Link
              href="/apply?programId=prog-tax-vita"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply to the Track
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          {/* IRS TRAINING */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              1. IRS Link &amp; Learn Taxes (Official Training)
            </p>
            <p className="text-[11px] text-slate-300">
              Use these official IRS platforms for VITA/TCE training and
              certification. Elevate staff will help you choose the right
              certification level (Basic or Advanced).
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <a
                  href="https://apps.irs.gov/app/vita/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Link &amp; Learn Taxes – Training Home
                </a>
              </li>
              <li>
                <a
                  href="https://apps.irs.gov/app/vita/choose_path.jsp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Choose Certification Path (Basic / Advanced / Specialty)
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/individuals/irs-tax-volunteers"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  IRS VITA/TCE Volunteer Information
                </a>
              </li>
            </ul>
          </div>

          {/* INTUIT ACADEMY */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              2. Intuit Academy – Free Tax &amp; Bookkeeping Courses
            </p>
            <p className="text-[11px] text-slate-300">
              Intuit Academy offers free, self-paced tax and bookkeeping
              courses that complement your VITA training and can lead to
              remote-work opportunities.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <a
                  href="https://academy.intuit.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Intuit Academy – Main Tax &amp; Bookkeeping Hub
                </a>
              </li>
              <li>
                <a
                  href="https://www.intuit.com/blog/life-at-intuit/intuit-experts/best-tax-preparer-course-for-job-seekers/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Intuit Tax Level 1 &amp; Level 2 Overview
                </a>
              </li>
            </ul>
            <p className="text-[10px] text-slate-400">
              Elevate may recognize completion of these courses as part of your
              overall Tax &amp; VITA microcredential.
            </p>
          </div>
        </div>
      </section>

      {/* FORMS & VOLUNTEER SIGN-UP */}
      <section className="bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">
              3. Required IRS Forms (Intake &amp; Volunteer)
            </p>
            <p className="text-[11px] text-slate-300">
              During training and service, you&apos;ll work with specific IRS
              intake and volunteer forms. Elevate will coach you through these,
              but you can preview them here:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <a
                  href="https://www.irs.gov/pub/irs-pdf/f13614c.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Form 13614-C – Intake/Interview &amp; Quality Review Sheet
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/pub/irs-pdf/f14310.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  Form 14310 – Partner and Volunteer Sign-Up
                </a>
              </li>
            </ul>
            <p className="text-[10px] text-slate-400">
              Always check with Elevate staff for the correct tax year and
              updated forms before using them with taxpayers.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm font-semibold text-white">
              4. Sign Up as a VITA / TCE Volunteer
            </p>
            <p className="text-[11px] text-slate-300">
              As you progress through the track, you may be invited to serve at
              a VITA/TCE site or Elevate-hosted community tax event.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <a
                  href="https://www.irs.gov/individuals/irs-tax-volunteers"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  IRS – Become a Tax Volunteer
                </a>
              </li>
              <li>
                <a
                  href="https://freetaxassistance.for.irs.gov/s/sign-up-form"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-300 underline hover:text-orange-200"
                >
                  IRS VITA/TCE Volunteer Sign-Up Form
                </a>
              </li>
            </ul>
            <p className="text-[10px] text-slate-400">
              Elevate may also have internal forms or agreements to document
              your hours, training milestones, and stipend eligibility.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

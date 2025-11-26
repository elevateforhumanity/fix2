// app/apply/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";

type ApplyPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const PROGRAM_LABELS: Record<string, string> = {
  "medical-assistant": "Medical Assistant",
  "barber": "Barber Apprenticeship",
  "barber-apprenticeship": "Barber Apprenticeship",
  "hvac": "HVAC Technician",
  "hvac-technician": "HVAC Technician",
  "building-maintenance": "Building Maintenance Technician",
  "building-tech": "Building Maintenance Technician",
  "workforce-readiness": "Workforce Readiness & Re-Entry",
  "cdl": "CDL Training",
  "truck-driving": "CDL Training",
};

function getProgramName(raw?: string | string[]) {
  if (!raw) return "a program with Elevate";
  const value = Array.isArray(raw) ? raw[0] : raw;
  return PROGRAM_LABELS[value] ?? "a program with Elevate";
}

function ApplyForm({ programParam }: { programParam?: string | string[] }) {
  const programName = getProgramName(programParam);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">
          Start your application for {programName}
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          Complete this short form and our team will reach out to confirm funding
          options, program fit, and next steps. Case managers can also use this
          form for referrals.
        </p>

        <form
          className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
          action="https://formsubmit.co/elevateforhumanity@gmail.com"
          method="POST"
        >
          {/* Hidden program field */}
          <input
            type="hidden"
            name="program"
            value={getProgramName(programParam)}
          />
          <input type="hidden" name="_subject" value={`New Application: ${getProgramName(programParam)}`} />
          <input type="hidden" name="_next" value="https://www.elevateforhumanity.org/enroll/success" />

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Full Name *
            </label>
            <input
              required
              name="name"
              className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              placeholder="First and last name"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Mobile Phone *
              </label>
              <input
                required
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                placeholder="Best number to reach you"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Email Address *
              </label>
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                placeholder="you@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              County / City
            </label>
            <input
              name="location"
              className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              placeholder="Where do you live?"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Are you working with a case manager, workforce board, or agency?
            </label>
            <input
              name="case_manager"
              className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              placeholder="If yes, list their name/organization"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Anything you want us to know before we call?
            </label>
            <textarea
              name="notes"
              className="mt-1 h-24 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Schedule, barriers, goals, or questions…"
            />
          </div>

          <p className="mt-2 text-[11px] text-slate-500">
            By submitting, you agree that Elevate for Humanity may contact you
            by phone, text, or email about training programs and support
            services. Message and data rates may apply.
          </p>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-brandPrimary px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brandPrimaryDark transition-all"
          >
            Submit my interest for {programName}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-600">Loading application…</p>
      </main>
    }>
      <ApplyForm programParam={searchParams?.program} />
    </Suspense>
  );
}

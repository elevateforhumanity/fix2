import Link from "next/link";

export const metadata = {
  title: "Employer Interest Form | Elevate for Humanity",
  description:
    "Employers can share their interest in partnering with Elevate for Humanity for WEX, OJT, apprenticeships, and talent pipelines.",
};

export default function EmployerIntakePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Employers
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Partner with Elevate for Humanity
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Use this form to tell us about your organization, the roles you
            hire for, and whether you&apos;re open to JRI, WEX, OJT,
            apprenticeship, or &quot;earn while you learn&quot; models. A real
            person from Elevate will follow up.
          </p>
        </div>
      </section>

      <section className="bg-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-6 text-xs">
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4">
            <p className="text-[11px] font-semibold text-slate-100">
              Quick Note
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              This form is a shell. In the next phase, it can be wired to
              Supabase, a secure form handler, or a CRM so submissions are
              stored and trigger follow-ups.
            </p>
          </div>

          <form className="mt-4 space-y-3 text-[11px]">
            <div>
              <label className="block text-slate-200">
                Organization Name
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                  placeholder="Your company or organization"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-slate-200">
                Contact Name
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                />
              </label>
              <label className="block text-slate-200">
                Contact Email
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-slate-200">
                City
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                />
              </label>
              <label className="block text-slate-200">
                State
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                />
              </label>
            </div>
            <div>
              <label className="block text-slate-200">
                Website (optional)
                <input
                  type="url"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                />
              </label>
            </div>
            <div>
              <p className="text-slate-200">
                What pathways are you interested in? (check all that apply)
              </p>
              <div className="mt-1 grid gap-2 md:grid-cols-2">
                {[
                  "CNA & Healthcare",
                  "Barber / Beauty / Nails",
                  "Building Tech / Trades",
                  "Tax / VITA / Office",
                  "Business EMS / Admin",
                  "Customer Service / IT Support",
                ].map((label) => (
                  <label key={label} className="inline-flex items-center gap-2 text-slate-200">
                    <input type="checkbox" className="h-3 w-3" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-200">
                What models are you open to? (check all that apply)
              </p>
              <div className="mt-1 grid gap-2 md:grid-cols-2">
                {[
                  "JRI / soft skills only",
                  "WEX (work experience)",
                  "OJT (on-the-job training)",
                  "Apprenticeship",
                  "Direct hire after training",
                  "Employer-paid cohort",
                ].map((label) => (
                  <label key={label} className="inline-flex items-center gap-2 text-slate-200">
                    <input type="checkbox" className="h-3 w-3" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-slate-200">
                Tell us about your roles and needs
                <textarea
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-[11px] text-slate-100 outline-none focus:border-orange-500"
                  rows={4}
                  placeholder="Example: We hire CNAs for all shifts, need barbers who understand shop culture, want tax/VITA volunteers who can grow into office roles..."
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-2 rounded-md bg-orange-400 text-white px-4 py-2 text-[11px] font-semibold text-white hover:bg-orange-500"
            >
              Submit Interest (Demo Only)
            </button>
            <p className="mt-1 text-[10px] text-slate-500">
              This is a demo form. Submissions are not yet stored. In the next
              phase, we will connect this to a database or CRM.
            </p>
          </form>

          <div className="mt-4 text-[11px] text-slate-400">
            Already in conversation with Elevate?{" "}
            <Link
              href="/contact"
              className="font-semibold text-orange-300 hover:text-orange-200"
            >
              Contact us here
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}

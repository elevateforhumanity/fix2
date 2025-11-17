// app/apply/page.tsx
import Link from "next/link";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
            Start Here
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Apply to Elevate For Humanity™
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-200">
            Tell us a little about yourself so we can help you choose the
            right pathway, explore funding options, and match you with the
            best training partners and employers.
          </p>

          {/* Simple intake form shell */}
          <form className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Which best describes you right now?
              </label>
              <select className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400">
                <option>Looking for my first career</option>
                <option>Changing careers</option>
                <option>Re-entry / justice-involved</option>
                <option>Currently working but underemployed</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Programs you&apos;re interested in
              </label>
              <select
                multiple
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400 h-28"
              >
                <option>Medical Assistant</option>
                <option>Barber Apprenticeship</option>
                <option>HVAC Technician</option>
                <option>Building Maintenance Technician</option>
                <option>CDL / Transportation</option>
                <option>Workforce Readiness & Re-Entry</option>
                <option>Not sure yet</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-400">
                You can change your mind after we talk.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Anything you want us to know before we call you?
              </label>
              <textarea
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-400 h-28"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
            >
              Submit My Information
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-400">
            By submitting this form, you agree to be contacted by Elevate For
            Humanity™ about training and employment opportunities. You can
            opt out at any time.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Case managers and partners: you can also{" "}
            <Link href="/partners" className="text-orange-300 hover:text-orange-200">
              submit a referral through our partner page
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

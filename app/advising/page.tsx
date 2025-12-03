// app/advising/page.tsx
'use client';

export default function AdvisingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Student Advising
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Talk with an advisor about your next steps.
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Not sure where to start, what you qualify for, or which program fits
            you best? Our advising team will walk through your goals, barriers,
            and options so you don&apos;t have to figure it out alone.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">
            Schedule a call or visit
          </h2>
          <p className="mt-2 text-xs text-slate-700">
            Complete this form and a member of our team will reach out to you
            within a reasonable timeframe to schedule a phone call, video
            meeting, or in-person appointment where available.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 space-y-5 text-sm text-slate-800"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-900"
              >
                Email (optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="programInterest"
                className="block text-xs font-semibold text-slate-900"
              >
                Program or pathway you&apos;re interested in
              </label>
              <select
                id="programInterest"
                name="programInterest"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option (or leave blank)
                </option>
                <option value="barber-apprenticeship">Barber Apprenticeship</option>
                <option value="beauty">Beauty / Nails / Esthetics</option>
                <option value="healthcare">Healthcare (CNA, etc.)</option>
                <option value="trades">Skilled Trades / Building Maintenance</option>
                <option value="cdl">Transportation / CDL</option>
                <option value="unsure">I&apos;m not sure yet</option>
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-900">
                How would you like us to contact you?
              </span>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-700">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="call"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Phone Call
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="text"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Text Message
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactMethod"
                    value="email"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Email
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="questions"
                className="block text-xs font-semibold text-slate-900"
              >
                What would you like to talk about?
              </label>
              <p className="mt-1 text-[0.7rem] text-slate-500">
                (Optional) Share any questions, concerns, or barriers you want
                help with—like funding, childcare, transportation, re-entry,
                housing, or mental health.
              </p>
              <textarea
                id="questions"
                name="questions"
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <p className="text-[0.7rem] text-slate-500">
              By submitting this form, you are giving Elevate for Humanity
              permission to contact you about advising, programs, and support
              services. We do not share your information without your consent
              except as required by law.
            </p>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Submit Advising Request
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

// app/apply/page.tsx
'use client';

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Application
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Apply to Elevate for Humanity
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            This form helps us learn who you are, what you&apos;re interested in,
            and what kinds of support you may need. After you submit, an advisor
            will follow up to talk about programs and funding options.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 text-sm text-slate-800"
          >
            {/* Contact info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold text-slate-900"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-slate-900"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-xs font-semibold text-slate-900"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Program interest */}
            <div>
              <label
                htmlFor="program"
                className="block text-xs font-semibold text-slate-900"
              >
                Program You&apos;re Most Interested In
              </label>
              <select
                id="program"
                name="program"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a program
                </option>
                <option value="barber-apprenticeship">
                  Barber Apprenticeship
                </option>
                <option value="beauty">
                  Beauty / Nails / Esthetics (where available)
                </option>
                <option value="healthcare">Healthcare (e.g., CNA)</option>
                <option value="skilled-trades">
                  Skilled Trades / Building Maintenance
                </option>
                <option value="cdl">Transportation / CDL</option>
                <option value="other">Other / Not sure yet</option>
              </select>
            </div>

            {/* Background / barriers */}
            <div>
              <label
                htmlFor="background"
                className="block text-xs font-semibold text-slate-900"
              >
                Anything we should know to better support you?
              </label>
              <p className="mt-1 text-[0.7rem] text-slate-500">
                (Optional) For example: justice involvement, housing needs,
                childcare, transportation, technology access, or anything else
                you&apos;re comfortable sharing.
              </p>
              <textarea
                id="background"
                name="background"
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Contact preference */}
            <div>
              <span className="block text-xs font-semibold text-slate-900">
                Best way to contact you
              </span>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-700">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="call"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Phone Call
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="text"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Text Message
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="email"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Email
                </label>
              </div>
            </div>

            {/* Submit note */}
            <p className="text-[0.7rem] text-slate-500">
              By submitting this form, you are giving Elevate for Humanity
              permission to contact you about training, funding, and support
              services. This is not a credit application and will not impact
              your credit score.
            </p>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                Submit Application
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

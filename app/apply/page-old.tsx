// app/apply/page.tsx
"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [program, setProgram] = useState("Barber Apprenticeship");
  const [supportNotes, setSupportNotes] = useState("");
  const [contactMethod, setContactMethod] = useState("phone");
  const [mathAnswer, setMathAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const correctSum = 6 + 7;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (parseInt(mathAnswer, 10) !== correctSum) {
      setError("Please solve the math question correctly to verify you're human.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: hook this to your API route or Supabase function
      // Example: await fetch("/api/applications", { method: "POST", body: JSON.stringify({...}) });

      console.log("Submitting application", {
        firstName,
        lastName,
        phone,
        email,
        city,
        zip,
        program,
        supportNotes,
        contactMethod,
      });

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setCity("");
      setZip("");
      setProgram("Barber Apprenticeship");
      setSupportNotes("");
      setContactMethod("phone");
      setMathAnswer("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your application. Please try again or call 317-314-3757.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero / Intro */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            Your journey starts here
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Apply for Free Career Training
          </h1>
          <p className="text-slate-700 max-w-2xl mb-4">
            You&apos;re taking the first step toward a better future. This application helps us
            understand your goals, interests, and any support you might need. There&apos;s no cost,
            no commitment—just an opportunity to explore what&apos;s possible.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            After you submit, a real person (not a bot!) will reach out within{" "}
            <span className="font-semibold">1–2 business days</span> to discuss programs, funding
            options, and answer your questions.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              100% Free Training • No Tuition • No Debt
            </span>
            <span className="block">
              Need help right now?{" "}
              <a href="tel:13173143757" className="font-semibold text-orange-600 underline-offset-2 hover:underline">
                Call us at (317) 314-3757
              </a>{" "}
              — we&apos;re here to help.
            </span>
          </div>
        </section>

        {/* Application + Steps grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          {/* Application Form */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Quick Application
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Tell us a little about yourself and the program you&apos;re interested in. This is{" "}
              <span className="font-semibold">not</span> a credit application and will{" "}
              <span className="font-semibold">not</span> impact your credit score.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-800"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Phone / Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* City / ZIP */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-800"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-slate-800"
                  >
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    inputMode="numeric"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Program */}
              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-slate-800"
                >
                  Program You&apos;re Most Interested In
                </label>
                <select
                  id="program"
                  name="program"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a program
                  </option>
                  {PROGRAM_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Support / Notes */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="supportNotes"
                    className="block text-sm font-medium text-slate-800"
                  >
                    Anything we should know to better support you?
                  </label>
                  <span className="text-xs text-slate-500">(Optional)</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  For example: justice involvement, housing needs, childcare, transportation,
                  technology access, or anything else you&apos;re comfortable sharing.
                </p>
                <textarea
                  id="supportNotes"
                  name="supportNotes"
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Best way to contact */}
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Best way to contact you
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {CONTACT_PREFERENCES.map((pref) => (
                    <label
                      key={pref.value}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-orange-400"
                    >
                      <input
                        type="radio"
                        name="contactPreference"
                        value={pref.value}
                        required
                        className="h-4 w-4 border-slate-300 text-orange-500 focus:ring-orange-400"
                      />
                      <span>{pref.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Math Verification */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-slate-900">
                  Quick Verification
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  This helps us protect your application from spam. Please answer the simple math
                  question below.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-slate-900">
                    6 <span className="mx-1">+</span> 7 <span className="mx-1">=</span>
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    name="mathVerification"
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                  {isVerified ? (
                    <span className="text-xs font-medium text-green-700">
                      ✅ Verified
                    </span>
                  ) : (
                    <span className="text-xs text-amber-700">
                      ⚠️ Please complete the math verification above before submitting.
                    </span>
                  )}
                </div>
              </div>

              {/* Consent + Submit */}
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-600">
                  By submitting this form, you are giving Elevate for Humanity permission to contact
                  you about training, funding, and support services. This is{" "}
                  <span className="font-semibold">not</span> a credit application and will{" "}
                  <span className="font-semibold">not</span> impact your credit score.
                </p>

                <button
                  type="submit"
                  disabled={!isVerified}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:w-auto ${
                    isVerified
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "cursor-not-allowed bg-slate-200 text-slate-500"
                  }`}
                >
                  {isVerified ? "Submit Application" : "🔒 Complete Verification to Submit"}
                </button>

                <p className="text-xs text-slate-600">
                  Questions?{" "}
                  <a
                    href="tel:13173143757"
                    className="font-semibold text-orange-600 underline-offset-2 hover:underline"
                  >
                    Call us at (317) 314-3757
                  </a>
                </p>
              </div>
            </form>
          </section>

          {/* How to Enroll + Resources */}
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-7">
              <h2 className="text-lg font-semibold text-slate-900">
                How to Enroll – Step by Step
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Follow these simple steps to start your{" "}
                <span className="font-semibold">free training</span> through Indiana Career Connect.
              </p>

              <ol className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Visit Indiana Career Connect</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Go to{" "}
                      <a
                        href="https://www.indianacareerconnect.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-orange-600 underline-offset-2 hover:underline"
                      >
                        www.indianacareerconnect.com
                      </a>{" "}
                      and create your free account. This is the official portal for all WIOA-funded
                      training programs in Indiana.
                    </p>
                    <a
                      href="https://www.indianacareerconnect.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-xs font-semibold text-orange-600 underline-offset-2 hover:underline"
                    >
                      Go to Indiana Career Connect →
                    </a>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Complete Your Profile</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Fill out your profile with your work history, education, and career goals.
                      This helps match you with the right training and funding.
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      <span className="font-semibold">What you&apos;ll need:</span> Social
                      Security Number, proof of residency, income documentation (if applicable), and
                      high school diploma or GED.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Schedule Your Appointment</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Book an appointment with a career advisor through the Indiana Career Connect
                      portal. They&apos;ll review your eligibility for WIOA funding and help you
                      choose the right program.
                    </p>
                    <ul className="mt-1 space-y-1 text-xs text-slate-600">
                      <li>📍 <span className="font-semibold">In-Person:</span> Visit a WorkOne center near you</li>
                      <li>💻 <span className="font-semibold">Virtual:</span> Schedule a video call appointment</li>
                    </ul>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Meet with Your Advisor</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Your career advisor will verify eligibility, explain funding options, and help
                      you select <span className="font-semibold">Elevate for Humanity</span> as your
                      training provider. They can also discuss supportive services like
                      transportation and childcare.
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      <span className="font-semibold">Tip:</span> Mention you want to train with{" "}
                      <span className="font-semibold">Elevate for Humanity</span>. We&apos;re an
                      approved WIOA provider in Marion County.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    5
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Get Approved &amp; Enroll</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Once approved for WIOA funding, your advisor will issue a training voucher.
                      Bring this to Elevate for Humanity to complete your enrollment. We&apos;ll
                      handle the paperwork and get you started.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">
                  Need help with the process?
                </p>
                <p className="mt-1">
                  Our team can guide you through every step of the Indiana Career Connect process.
                  We&apos;re here to make enrollment as easy as possible.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href="tel:13173143757"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    Call (317) 314-3757
                  </a>
                  <a
                    href="mailto:info@elevateforhumanity.org"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-orange-400"
                  >
                    Email Us
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 hover:border-orange-400"
                  >
                    Schedule Advising Call
                  </a>
                </div>
              </div>
            </div>

            {/* Quick resource cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="/funding"
                className="flex flex-col justify-between rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 hover:ring-orange-300"
              >
                <div>
                  <div className="text-lg">📋</div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">
                    Eligibility Requirements
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Check if you qualify for WIOA funding and other support.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-orange-600">
                  Learn More →
                </span>
              </a>

              <a
                href="/contact"
                className="flex flex-col justify-between rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 hover:ring-orange-300"
              >
                <div>
                  <div className="text-lg">🏢</div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">
                    Find WorkOne Center
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Locate your nearest WorkOne office in Indiana.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-orange-600">
                  Find Location →
                </span>
              </a>

              <a
                href="/funding"
                className="flex flex-col justify-between rounded-2xl bg-white p-4 text-xs shadow-sm ring-1 ring-slate-100 hover:ring-orange-300"
              >
                <div>
                  <div className="text-lg">💰</div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">
                    Funding Options
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Learn about WIOA, WRG, and JRI funding available to you.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-orange-600">
                  View Options →
                </span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

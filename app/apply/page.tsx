// app/apply/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now - Start Your Career Training",
  description: "Apply for free WIOA-funded career training in healthcare, skilled trades, CDL, or barbering. Check eligibility and start your application today.",
  keywords: ["apply for training", "WIOA application", "career training enrollment", "free training", "get started"],
  openGraph: {
    title: "Apply Now - Start Your Career Training | Elevate for Humanity",
    description: "Apply for free WIOA-funded career training in healthcare, skilled trades, CDL, or barbering. Check eligibility and start today.",
    images: ["/images/homepage/apply-now.png"],
    type: "website",
  },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <nav className="mb-6 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-300">
              Home
            </Link>{" "}
            / <span className="text-slate-200">Get Started</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-[1.4fr,1.2fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Get started with Elevate For Humanity
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                One simple form. Multiple ways to Elevate your future.
              </h1>
              <p className="mt-4 text-sm text-slate-200 sm:text-base max-w-xl">
                Whether you&apos;re a{" "}
                <span className="font-semibold text-emerald-300">
                  learner, employer, or case manager
                </span>
                , this form lets our team understand what you need and how to
                connect you with funded training, apprenticeships, and placement
                support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-[11px]">
                <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  100% funded programs (where eligible)
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-200">
                  Job placement & employer partnerships
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-200">
                  Barrier-aware support (transportation, re-entry, more)
                </span>
              </div>

              <p className="mt-4 text-[11px] text-slate-500 max-w-md">
                Completing this form does not lock you into a specific program.
                It helps us understand your goals so we can recommend the best
                pathway and funding options.
              </p>
            </div>

            {/* Right side quick info */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-xs text-slate-200 shadow-xl">
              <h2 className="text-sm font-semibold text-white mb-4">
                What happens after you submit
              </h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                    1
                  </span>
                  <span>
                    Our team reviews your interests, location, and any barriers
                    you share.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                    2
                  </span>
                  <span>
                    We match you with available programs, workforce funding, or
                    employer partnerships.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
                    3
                  </span>
                  <span>
                    Someone reaches out by phone, text, or email with next
                    steps and timelines.
                  </span>
                </li>
              </ol>
              <p className="mt-4 text-[11px] text-slate-500">
                If you already work with a workforce board, probation/parole,
                or another agency, you can include their contact so we can
                coordinate directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="border-b border-slate-800 bg-slate-950 py-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Tell us a little about you
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              This form is intentionally simple. Share what you can — if
              something doesn&apos;t apply, you can skip it. We&apos;ll follow
              up to fill in the details.
            </p>
          </div>

          {/* NOTE: Hook this form up to your API / Supabase later */}
          <form
            className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm md:p-8"
            action="https://formsubmit.co/elevateforhumanity@gmail.com"
            method="POST"
          >
            {/* WHO ARE YOU */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="First and last name"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  Best contact email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  Mobile phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(xxx) xxx-xxxx"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  We may text you about next steps. Standard message rates may
                  apply.
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  County / City
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Marion County, IN"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            {/* ROLE TYPE */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                I am a...
              </label>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 p-3 hover:border-emerald-400">
                  <input
                    type="radio"
                    name="contactType"
                    value="learner"
                    className="mt-1 h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-slate-100">
                      Learner / Student
                    </div>
                    <p className="mt-1 text-slate-400">
                      I&apos;m interested in training, apprenticeships, or
                      re-entry support.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 p-3 hover:border-emerald-400">
                  <input
                    type="radio"
                    name="contactType"
                    value="employer"
                    className="mt-1 h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-slate-100">
                      Employer / HR
                    </div>
                    <p className="mt-1 text-slate-400">
                      I&apos;m looking for talent pipelines, OJT, or upskilling
                      for my team.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/80 p-3 hover:border-emerald-400">
                  <input
                    type="radio"
                    name="contactType"
                    value="case-manager"
                    className="mt-1 h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-slate-100">
                      Case Manager / Workforce / Partner
                    </div>
                    <p className="mt-1 text-slate-400">
                      I support clients and want to refer them into programs.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* INTEREST / PROGRAMS */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                Which pathways are you most interested in?
              </label>
              <p className="text-[11px] text-slate-500 mb-1">
                You can update this later — choose anything that sounds close.
              </p>
              <div className="grid gap-2 text-xs md:grid-cols-3">
                {[
                  "Medical Assistant",
                  "CNA",
                  "Phlebotomy",
                  "Barber Apprenticeship",
                  "HVAC / Skilled Trades",
                  "Building Maintenance",
                  "CDL / Truck Driving",
                  "Forklift / Warehouse",
                  "Customer Service / Call Center",
                  "Office & Admin Support",
                  "Workforce Readiness & Re-Entry",
                  "Not sure yet – I need guidance",
                ].map((path) => (
                  <label
                    key={path}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 hover:border-emerald-400"
                  >
                    <input
                      type="checkbox"
                      name="paths"
                      value={path}
                      className="h-4 w-4 border-slate-600 bg-slate-900 text-emerald-500"
                    />
                    <span className="text-slate-200">{path}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* BARRIERS / STORY */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  Tell us a little about your situation
                </label>
                <textarea
                  name="story"
                  rows={5}
                  placeholder="Example: I'm working part-time now and want to transition into a career that pays more and has a future. I have transportation but need evening classes..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Share as much or as little as you&apos;re comfortable with. This
                  helps us recommend realistic options.
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                  Any barriers we should know about?
                </label>
                <textarea
                  name="barriers"
                  rows={5}
                  placeholder="Example: childcare, transportation, past justice involvement, schedule limits, etc."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  We work with barrier-aware partners. Sharing this lets us plan
                  with you, not against you.
                </p>
              </div>
            </div>

            {/* CASE MANAGER AREA */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200 uppercase tracking-[0.16em]">
                If you are a case manager or workforce partner, add your info
              </label>
              <textarea
                name="partnerInfo"
                rows={3}
                placeholder="Agency name, your role, best contact info, and any funding (WIOA, WRG, RESEA, SNAP, etc.) connected to this referral."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500">
                We can coordinate directly with you and include you on
                communication if you&apos;d like.
              </p>
            </div>

            {/* SUBMIT */}
            <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
                >
                  Submit interest form
                </button>
                <Link
                  href="/directory"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
                >
                  Browse programs first
                </Link>
              </div>
              <p className="text-[11px] text-slate-500">
                By submitting, you agree that Elevate For Humanity may contact
                you about programs and services. We do not sell your
                information.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

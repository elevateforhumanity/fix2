"use client";

import Link from "next/link";

type ProgramPageLayoutProps = {
  title: string;
  subtitle: string;
  badge?: string;
  duration: string;
  schedule: string;
  location: string;
  fundingTags: string[];
  salaryRange: string;
  jobTitles: string[];
  outcomes: string[];
  idealFor: string[];
  steps: string[];
  faq?: { question: string; answer: string }[];
};

export function ProgramPageLayout(props: ProgramPageLayoutProps) {
  const {
    title,
    subtitle,
    badge,
    duration,
    schedule,
    location,
    fundingTags,
    salaryRange,
    jobTitles,
    outcomes,
    idealFor,
    steps,
    faq,
  } = props;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Top badge + breadcrumb */}
      <div className="mb-3 text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
        <span className="uppercase tracking-wide">
          ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="text-slate-500">
          <Link href="/programs" className="hover:text-orange-600">
            Programs
          </Link>{" "}
          / {title}
        </span>
      </div>

      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start mb-10">
        <div className="space-y-4">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700 border border-orange-100 uppercase tracking-wide">
              {badge}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {subtitle}
          </p>

          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Program Length
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {duration}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Designed for fast, focused training
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Schedule & Location
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {schedule}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {location}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Typical Starting Pay
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {salaryRange}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Actual wages vary by employer and experience
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {fundingTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
            >
              Apply Now – It&apos;s Free
            </Link>
            <Link
              href="/funding/wioa"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Talk to a Career Coach
            </Link>
          </div>
        </div>

        {/* Right side card */}
        <aside className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            What jobs can this lead to?
          </h2>
          <ul className="space-y-1 text-sm text-slate-700">
            {jobTitles.map((job) => (
              <li key={job} className="flex gap-2">
                <span className="mt-[2px] text-orange-500">●</span>
                <span>{job}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Class Location
            </h3>
            <p className="text-sm text-slate-800">
              8888 Keystone Crossing Suite 1300
              <br />
              Indianapolis, IN 46240
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Some coursework and support may be completed online. Ask your
              career coach about virtual options.
            </p>
          </div>
        </aside>
      </section>

      {/* Outcomes + Ideal for */}
      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            What you&apos;ll walk away with
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] text-green-500">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            This program is a strong fit if you…
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {idealFor.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] text-orange-500">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps to get started */}
      <section className="mb-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            How to get started
          </h2>
          <ol className="space-y-2 text-sm text-slate-700">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-orange-700"
            >
              Start Application
            </Link>
            <Link
              href="/funding"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
            >
              Explore Funding Options
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {item.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="mb-4">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-orange-900">
              Ready to take the next step?
            </h2>
            <p className="text-xs sm:text-sm text-orange-900/80">
              We&apos;ll help you check WIOA/WRG eligibility and walk you
              through enrollment so you&apos;re not doing this alone.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-orange-700 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-orange-800"
            >
              Apply for this program
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-orange-700 border border-orange-200 hover:bg-orange-100"
            >
              Talk to someone first
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

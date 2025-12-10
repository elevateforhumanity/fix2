// components/marketing/Hero.tsx
import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Cost for eligible learners", value: "$0" },
  { label: "Career pathways & programs", value: "12+" },
  { label: "Job & apprenticeship placement", value: "85%" },
];

const paths = ["Healthcare", "Skilled Trades", "CDL", "Barber", "Re-entry"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0    " />
      <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        {/* Left column */}
        <div className="max-w-xl space-y-6">
          <p className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300 ring-1 ring-emerald-500/40">
            WIOA-aligned · Workforce & employer partners
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Funded training that{" "}
            <span className="block text-orange-300">
              actually leads to jobs.
            </span>
          </h1>
          <p className="text-balance text-base text-slate-200 sm:text-lg">
            Elevate For Humanity connects you to 100% funded career training in
            healthcare, trades, CDL, and more — with real support, employer
            partnerships, and apprenticeships attached.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Check my eligibility
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/60 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-red-300 hover:bg-slate-900"
            >
              Browse programs
            </Link>
          </div>

          {/* Mini benefits */}
          <dl className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
            <div>
              <dt className="font-medium text-slate-100">No tuition for most</dt>
              <dd>We help you unlock WIOA, JRI, and employer-funded options.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-100">Real coaching</dt>
              <dd>Life, barriers, and paperwork support along the way.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-100">Job-connected</dt>
              <dd>Built with employers & workforce boards, not in a vacuum.</dd>
            </div>
          </dl>
        </div>

        {/* Right column: hero media */}
        <div className="flex-1">
          <div className="relative rounded-3xl bg-slate-900/60 p-3 shadow-2xl ring-1 ring-slate-700/80 backdrop-blur">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/media/hero-elevate-learners.jpg"
                alt="Adult learners in a barbershop, clinic, and HVAC lab"
                fill
                priority
                className="object-cover"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <button className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg backdrop-blur transition hover:bg-white">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">
                    ▶
                  </span>
                  Watch Elevate overview · 1:00
                </button>
                <p className="max-w-xs text-xs text-slate-100/90">
                  A quick video you can use on flyers, events, and social to
                  explain Elevate in plain language.
                </p>
              </div>
            </div>

            {/* Stats */}
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-slate-900/80 px-4 py-3 ring-1 ring-slate-700/70"
                >
                  <dd className="text-2xl font-semibold text-orange-300">
                    {stat.value}
                  </dd>
                  <dt className="text-xs text-slate-300">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Path chips */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
            {paths.map((path) => (
              <span
                key={path}
                className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-slate-700/80"
              >
                {path}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

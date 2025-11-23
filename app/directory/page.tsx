// app/directory/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Category =
  | "all"
  | "healthcare"
  | "trades"
  | "transportation"
  | "business"
  | "reentry";

const programs = [
  {
    slug: "/programs/medical-assistant",
    title: "Medical Assistant",
    category: "healthcare" as Category,
    duration: "5–6 months",
    funding: "WIOA · Workforce grants",
    modality: "Hybrid · Classroom + clinical",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=Medical+Assistant",
    summary:
      "Hands-on clinical and administrative training for entry-level roles in clinics, hospitals, and specialty practices.",
  },
  {
    slug: "/programs/cna",
    title: "Certified Nursing Assistant (CNA)",
    category: "healthcare" as Category,
    duration: "4–8 weeks",
    funding: "WIOA · Employer sponsorship",
    modality: "In-person · Day/Evening options",
    image: "https://placehold.co/800x500/020617/f97316?text=CNA",
    summary:
      "Prepare for frontline patient care roles in long-term care, rehab, and hospital settings with state-approved training.",
  },
  {
    slug: "/programs/phlebotomy",
    title: "Phlebotomy Technician",
    category: "healthcare" as Category,
    duration: "4–6 weeks",
    funding: "Workforce grants · Self-pay options",
    modality: "In-person · Lab-focused",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=Phlebotomy",
    summary:
      "Learn venipuncture, specimen handling, and lab safety for entry-level roles in hospitals, labs, and blood centers.",
  },
  {
    slug: "/programs/hvac",
    title: "HVAC Technician",
    category: "trades" as Category,
    duration: "4–6 months",
    funding: "WIOA · OJT · Apprenticeship",
    modality: "In-person · Lab & field",
    image:
      "https://placehold.co/800x500/020617/f97316?text=HVAC+Tech",
    summary:
      "Install, maintain, and repair heating, cooling, and refrigeration systems for residential and light commercial settings.",
  },
  {
    slug: "/programs/building-maintenance",
    title: "Building Maintenance Technician",
    category: "trades" as Category,
    duration: "4–6 months",
    funding: "Workforce grants · Employer cohorts",
    modality: "In-person · Hands-on",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=Building+Maintenance",
    summary:
      "Train on building systems, basic electrical, plumbing, and safety to keep facilities safe, clean, and running.",
  },
  {
    slug: "/programs/barber-apprenticeship",
    title: "Barber Apprenticeship",
    category: "trades" as Category,
    duration: "12–18 months",
    funding: "Apprenticeship · Employer sponsorship",
    modality: "On-the-job + related instruction",
    image:
      "https://placehold.co/800x500/020617/f97316?text=Barber+Apprenticeship",
    summary:
      "State-approved apprenticeship that blends shop experience with related instruction toward your barber license.",
  },
  {
    slug: "/programs/cdl",
    title: "CDL / Truck Driving",
    category: "transportation" as Category,
    duration: "4–8 weeks",
    funding: "WIOA · Employer reimbursement",
    modality: "In-person · Behind-the-wheel",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=CDL+Training",
    summary:
      "Earn your Commercial Driver's License (Class A/B) and step into local, regional, or OTR driving roles.",
  },
  {
    slug: "/programs/forklift",
    title: "Forklift & Warehouse Operations",
    category: "transportation" as Category,
    duration: "1–2 weeks",
    funding: "Workforce grants · Employer cohorts",
    modality: "In-person · Lab & safety",
    image:
      "https://placehold.co/800x500/020617/f97316?text=Forklift+Training",
    summary:
      "OSHA-focused training in powered industrial trucks, material handling, and basic warehouse operations.",
  },
  {
    slug: "/programs/customer-service",
    title: "Customer Service & Call Center",
    category: "business" as Category,
    duration: "4–8 weeks",
    funding: "WIOA · Employer-sponsored",
    modality: "Virtual or hybrid",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=Customer+Service",
    summary:
      "Develop communication, problem-solving, and systems skills for customer-facing roles across industries.",
  },
  {
    slug: "/programs/office-admin",
    title: "Office & Administrative Support",
    category: "business" as Category,
    duration: "8–12 weeks",
    funding: "Workforce grants · Apprenticeship pathways",
    modality: "Hybrid · Online + in-person",
    image:
      "https://placehold.co/800x500/020617/f97316?text=Office+Admin",
    summary:
      "Learn essential computer, office, and organizational skills for entry-level admin roles.",
  },
  {
    slug: "/programs/workforce-readiness",
    title: "Workforce Readiness & Re-Entry",
    category: "reentry" as Category,
    duration: "Varies",
    funding: "Re-entry grants · Partnerships",
    modality: "Hybrid · Group + 1:1 support",
    image:
      "https://placehold.co/800x500/0f172a/f97316?text=Re-Entry+Program",
    summary:
      "Mindset, soft skills, and career coaching for individuals returning to the workforce after justice impact or gaps.",
  },
  {
    slug: "/programs/bridge",
    title: "Bridge & Career Exploration",
    category: "reentry" as Category,
    duration: "4–8 weeks",
    funding: "Youth · WIOA · Special initiatives",
    modality: "Group-based · Project driven",
    image:
      "https://placehold.co/800x500/020617/f97316?text=Bridge+Program",
    summary:
      "Short-term bridge programs to test out pathways, build confidence, and prepare for longer training.",
  },
];

const categoryFilters: { id: Category; label: string }[] = [
  { id: "all", label: "All programs" },
  { id: "healthcare", label: "Healthcare" },
  { id: "trades", label: "Skilled trades" },
  { id: "transportation", label: "Transportation" },
  { id: "business", label: "Business & office" },
  { id: "reentry", label: "Workforce readiness & re-entry" },
];

export default function DirectoryPage() {
  const [category, setCategory] = useState<Category>("all");

  const visiblePrograms =
    category === "all"
      ? programs
      : programs.filter((p) => p.category === category);

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-[2fr,1.3fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Program directory
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Explore funded career training programs.
              </h1>
              <p className="mt-4 text-sm text-slate-200 sm:text-base">
                Browse healthcare, trades, transportation, business, and readiness
                programs that can be funded through workforce grants, OJT, and
                scholarships. Most learners qualify for low or no-cost options.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="rounded-full border border-slate-700 px-3 py-1">
                  $0 cost for eligible learners
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1">
                  Job placement support
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1">
                  Stackable credentials
                </span>
              </div>
            </div>

            {/* Quick CTA card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
              <h2 className="text-sm font-semibold">
                Not sure where to start?
              </h2>
              <p className="mt-2 text-xs text-slate-300">
                Answer a few questions and our team will help you pick a program
                and check funding options in your area.
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Take the interest survey
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300"
                >
                  Talk to an advisor
                </Link>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                We can also coordinate with WorkOne/workforce boards if you&apos;re already
                working with a case manager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Filter by pathway
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Showing {visiblePrograms.length} of {programs.length} programs
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    category === c.id
                      ? "bg-emerald-500 text-slate-950"
                      : "border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {visiblePrograms.length === 0 ? (
            <p className="text-sm text-slate-400">
              No programs found for this category right now. Try another filter or{" "}
              <Link href="/contact" className="text-emerald-400 underline">
                contact our team
              </Link>{" "}
              for options.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePrograms.map((p) => (
                <Link key={p.slug} href={p.slug} className="group">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-sm font-semibold text-white">
                        {p.title}
                      </h2>
                      <p className="mt-2 flex-1 text-xs text-slate-300">
                        {p.summary}
                      </p>
                      <div className="mt-4 space-y-2 text-[11px] text-slate-400">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                            {p.duration}
                          </span>
                          <span className="truncate text-right">
                            {p.modality}
                          </span>
                        </div>
                        <p className="truncate">
                          <span className="font-semibold text-emerald-300">
                            Funding:
                          </span>{" "}
                          {p.funding}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-emerald-300">
                          View details →
                        </span>
                        <Link
                          href={`/apply?program=${encodeURIComponent(p.slug)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/20 transition"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-800 bg-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to match to the right program?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Tell us about your goals, schedule, and any barriers you&apos;re facing.
            We&apos;ll help you map out a path and explore funding in your area.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Get started free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
            >
              Talk to an advisor
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Already working with WorkOne or a workforce board? We can coordinate
            directly with your case manager.
          </p>
        </div>
      </section>
    </main>
  );
}

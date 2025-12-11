"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { programs, Program } from "@/app/data/programs";

// Map programs to categories
const getCategoryForProgram = (program: Program): string => {
  const slug = program.slug;
  if (slug.includes('cna') || slug.includes('medical') || slug.includes('health')) return 'Healthcare';
  if (slug.includes('hvac') || slug.includes('building') || slug.includes('cdl')) return 'Skilled Trades';
  if (slug.includes('barber') || slug.includes('beauty') || slug.includes('esthetician')) return 'Beauty & Wellness';
  if (slug.includes('tax') || slug.includes('business')) return 'Business & Finance';
  return 'Other Programs';
};

// Map programs to icons
const getIconForProgram = (program: Program): string => {
  const slug = program.slug;
  if (slug.includes('barber')) return '✂️';
  if (slug.includes('cna') || slug.includes('health')) return '🏥';
  if (slug.includes('medical')) return '🩺';
  if (slug.includes('hvac')) return '🛠️';
  if (slug.includes('cdl')) return '🚚';
  if (slug.includes('tax') || slug.includes('business')) return '💼';
  if (slug.includes('beauty') || slug.includes('esthetician')) return '💅';
  if (slug.includes('building')) return '🏗️';
  return '📚';
};

export default function ProgramsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | "all">("all");

  // Get all unique categories
  const allCategories = useMemo(() => {
    return Array.from(new Set(programs.map(getCategoryForProgram))).sort();
  }, []);

  // Filter programs
  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const programCategory = getCategoryForProgram(p);
      const matchesCategory = category === "all" || programCategory === category;

      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.heroSubtitle.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  // Group filtered programs by category
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, Program[]>>((acc, p) => {
      const key = getCategoryForProgram(p);
      acc[key] = acc[key] || [];
      acc[key].push(p);
      return acc;
    }, {});
  }, [filtered]);

  const categories = Object.keys(grouped).sort();

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase mb-2">
            Explore Programs
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Programs &amp; Pathways
          </h1>
          <p className="text-slate-700 max-w-3xl mb-4">
            Short-term training, real credentials, and pathways that fit real
            life. Most learners qualify for some funding through{" "}
            <span className="font-semibold">WIOA, WRG, apprenticeships</span>,
            or partner support. Not sure where to start?{" "}
            <Link href="/apply" className="text-emerald-700 underline">
              Submit a Quick Application
            </Link>{" "}
            and we&apos;ll help you decide.
          </p>

          {/* Search + Filter */}
          <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Search programs
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search by name or focus…"
                className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              />
            </div>
            <div className="w-full md:w-60">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Filter by category
              </label>
              <select
                value={category}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                <option value="all">All pathways</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8 lg:py-10 space-y-10">
        {categories.length === 0 && (
          <p className="text-sm text-slate-600">
            No programs match your filters. Try clearing your search.
          </p>
        )}

        {categories.map((cat) => (
          <div key={cat} className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {cat}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[cat].map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const icon = getIconForProgram(program);
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col">
      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">
            {program.name}
          </h3>
        </div>
      </div>

      <p className="text-sm text-slate-700 mt-1 line-clamp-3 mb-4">
        {program.shortDescription}
      </p>

      <dl className="grid grid-cols-2 gap-3 text-xs text-slate-600 mt-auto mb-4">
        <div>
          <dt className="text-slate-500">Length</dt>
          <dd className="font-semibold text-slate-800">{program.duration}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Format</dt>
          <dd className="font-semibold text-slate-800">
            {program.delivery.split(':')[0]}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
        >
          View Program
        </Link>
        <Link
          href={`/apply?program=${program.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition"
        >
          Apply
        </Link>
      </div>
    </div>
  );
}

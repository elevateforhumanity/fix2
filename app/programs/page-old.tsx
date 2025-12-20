'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { programs, Program } from '@/app/data/programs';

// Map programs to categories
const getCategoryForProgram = (program: Program): string => {
  const slug = program.slug;
  if (
    slug.includes('cna') ||
    slug.includes('medical') ||
    slug.includes('health')
  )
    return 'Healthcare';
  if (
    slug.includes('hvac') ||
    slug.includes('building') ||
    slug.includes('cdl')
  )
    return 'Skilled Trades';
  if (
    slug.includes('barber') ||
    slug.includes('beauty') ||
    slug.includes('esthetician')
  )
    return 'Beauty & Wellness';
  if (slug.includes('tax') || slug.includes('business'))
    return 'Business & Finance';
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

// Determine program type
const getProgramType = (
  program: Program
): 'apprenticeship' | 'grant-funded' | 'self-pay' => {
  if (
    program.slug.includes('apprenticeship') ||
    program.fundingOptions.some((f) =>
      f.toLowerCase().includes('apprenticeship')
    )
  ) {
    return 'apprenticeship';
  }
  if (
    program.fundingOptions.some(
      (f) =>
        f.toLowerCase().includes('wioa') ||
        f.toLowerCase().includes('wrg') ||
        f.toLowerCase().includes('jri') ||
        f.toLowerCase().includes('workforce') ||
        f.toLowerCase().includes('grant')
    )
  ) {
    return 'grant-funded';
  }
  return 'self-pay';
};

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | 'all'>('all');
  const [programType, setProgramType] = useState<
    'all' | 'apprenticeship' | 'grant-funded' | 'self-pay'
  >('all');

  // Get all unique categories
  const allCategories = useMemo(() => {
    return Array.from(new Set(programs.map(getCategoryForProgram))).sort();
  }, []);

  // Filter programs
  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const programCategory = getCategoryForProgram(p);
      const matchesCategory =
        category === 'all' || programCategory === category;

      const type = getProgramType(p);
      const matchesType = programType === 'all' || type === programType;

      const term = search.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.heroSubtitle.toLowerCase().includes(term);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [search, category, programType]);

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
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden flex items-center justify-center">
        <Image
          src="/images/heroes/programs.jpg"
          alt="Career Training Programs"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
            Career Training Programs
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Short-term training, industry certifications, and career pathways
            that fit your life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase mb-2">
            Explore Programs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Programs &amp; Pathways
          </h2>
          <p className="text-slate-700 max-w-3xl mb-4">
            Short-term training, real credentials, and pathways that fit real
            life. Most learners qualify for some funding through{' '}
            <span className="font-semibold">WIOA, WRG, apprenticeships</span>,
            or partner support. Not sure where to start?{' '}
            <Link href="/apply" className="text-emerald-700 underline">
              Submit a Quick Application
            </Link>{' '}
            and we&apos;ll help you decide.
          </p>

          {/* Program Type Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setProgramType('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                programType === 'all'
                  ? 'bg-brand-orange-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setProgramType('grant-funded')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                programType === 'grant-funded'
                  ? 'bg-brand-green-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              100% Free (ETPL/WRG)
            </button>
            <button
              onClick={() => setProgramType('apprenticeship')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                programType === 'apprenticeship'
                  ? 'bg-brand-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Apprenticeships
            </button>
            <button
              onClick={() => setProgramType('self-pay')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                programType === 'self-pay'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Self-Pay Options
            </button>
          </div>

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
                onChange={(e) => setCategory(e.target.value)}
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

        {/* Platform Notice */}
        <div className="text-center text-xs text-slate-500 pt-8 border-t border-slate-200">
          <p>
            This is a proprietary instructional and workforce development
            platform operated by Elevate for Humanity. Access is limited to
            authorized participants.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const icon = getIconForProgram(program);
  const type = getProgramType(program);

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
          {type === 'grant-funded' && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-brand-green-100 text-green-800 text-xs font-semibold rounded">
              100% FREE with ETPL/WRG
            </span>
          )}
          {type === 'apprenticeship' && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
              Earn While You Learn
            </span>
          )}
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

      {/* Pricing Info */}
      {program.price && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 mb-1">Self-Pay Option:</p>
          <p className="text-lg font-bold text-slate-900">
            ${program.price.toLocaleString()}
          </p>
          <p className="text-xs text-slate-600">
            Or ${(program.price / 6).toFixed(2)}/month for 6 months
          </p>
          {type === 'grant-funded' && (
            <p className="text-xs text-green-700 font-semibold mt-2">
              ✓ May be 100% FREE with funding
            </p>
          )}
        </div>
      )}

      {/* Funding Options */}
      {type === 'grant-funded' && program.fundingOptions.length > 0 && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs font-semibold text-green-900 mb-1">
            Funding Available:
          </p>
          <ul className="text-xs text-slate-700 space-y-0.5">
            {program.fundingOptions.slice(0, 2).map((option, idx) => (
              <li key={idx}>• {option}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/programs/${program.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-brand-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-orange-600 transition shadow-sm"
        >
          View Program
        </Link>
        <Link
          href={`/apply?program=${program.slug}`}
          className="inline-flex items-center justify-center rounded-full border-2 border-slate-900 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
        >
          Apply
        </Link>
      </div>
    </div>
  );
}

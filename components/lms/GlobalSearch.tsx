'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams?.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      router.push('/courses');
      return;
    }
    router.push(`/courses?q=${encodeURIComponent(q)}`);
  }

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto flex max-w-2xl items-center"
    >
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          className="w-full rounded-full border border-slate-200 bg-white pl-12 pr-32 py-4 text-sm md:text-base shadow-card focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100 transition-all"
          placeholder="Search programs, courses, or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-accent-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-accent-600 active:scale-95 transition-all duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, BookOpen, FileText, Users, ArrowRight } from 'lucide-react';
import { PROGRAMS } from '@/lib/programs-data';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = (q: string) => {
    const lowerQuery = q.toLowerCase();
    
    // Search through programs
    const programResults = PROGRAMS.filter(program =>
      program.name.toLowerCase().includes(lowerQuery) ||
      program.blurb.toLowerCase().includes(lowerQuery) ||
      program.funding.toLowerCase().includes(lowerQuery)
    ).map(program => ({
      type: 'program',
      title: program.name,
      description: program.blurb,
      url: `/programs/${program.slug}`,
      meta: program.funding
    }));

    setResults(programResults);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Search Programs & Courses</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for programs, courses, certifications..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              autoFocus
            />
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && (
          <div className="mb-6">
            <p className="text-slate-600">
              Found <span className="font-semibold text-slate-900">{results.length}</span> results for "{searchQuery}"
            </p>
          </div>
        )}

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Link
                key={index}
                href={result.url}
                className="block bg-white rounded-xl p-6 border border-slate-200 hover:border-red-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-red-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                      {result.title}
                    </h3>
                    <p className="text-slate-600 mb-3 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        {result.type}
                      </span>
                      <span className="text-slate-600">{result.meta}</span>
                    </div>
                  </div>
                  <ArrowRight className="text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" size={20} />
                </div>
              </Link>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-600 mb-6">
              Try searching for different keywords or browse all programs
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Browse All Programs
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Start searching</h3>
            <p className="text-slate-600">
              Enter keywords to find programs, courses, and certifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

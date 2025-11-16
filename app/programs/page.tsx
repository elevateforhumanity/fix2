// app/programs/page.tsx
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/auth';

type Program = {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  summary?: string | null;
  funding?: string[] | null;
};

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, slug, title, tagline, summary, funding')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error loading programs:', error);
  }

  const safePrograms: Program[] = programs || [];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="elevate-gradient-red-orange border-b border-white/10">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">
              Elevate for Humanity · Elevate Connects Directory
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-white">
              Explore Workforce & Apprenticeship Programs
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-white/90">
              Find WIOA-aligned training, Workforce Ready Grant programs, Job
              Ready Indy pathways, and Registered Apprenticeships — all in one
              directory.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wider text-white/90">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                WIOA · WRG · JRI · Apprenticeship
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="elevate-card relative aspect-video w-full overflow-hidden bg-white">
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-gray-700">
                <div>
                  <p className="text-efh-orange font-semibold mb-2">
                    Program Highlight Video
                  </p>
                  <p className="text-xs">
                    WIOA / WRG / JRI / Apprenticeship overview video placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Programs Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">All Programs</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Connected to Elevate for Humanity's ecosystem of workforce
              partners, case managers, and employer networks.
            </p>
          </div>
        </div>
        {safePrograms.length === 0 ? (
          <div className="elevate-card p-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              No programs configured yet. Run the Supabase seed migrations to
              populate programs.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {safePrograms.map((program) => {
              const fundingLabels = program.funding || [];
              return (
                <Link
                  key={program.id}
                  href={`/programs/${program.slug}`}
                  className="elevate-card hover:shadow-xl transition-all"
                >
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {program.title}
                      </h3>
                      {fundingLabels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {fundingLabels.map((tag) => (
                            <span
                              key={tag}
                              className="elevate-badge elevate-badge-red"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {program.tagline && (
                      <p className="text-sm text-efh-orange font-medium">
                        {program.tagline}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {program.summary ||
                        'Click to view program details, courses, and funding options.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-xs text-gray-500">
                    <span>View Details →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

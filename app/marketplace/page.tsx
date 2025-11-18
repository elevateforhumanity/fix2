import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

async function getMarketplaceCourses() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('marketplace_courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return data || [];
}

export default async function MarketplacePage() {
  const courses = await getMarketplaceCourses();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            Elevate Marketplace
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Workforce Programs Marketplace
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse ready-to-launch programs you can license for your school,
            workforce board, or employer academy.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/marketplace/${c.id}`}
              className="rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm hover:border-orange-500"
            >
              <h2 className="text-base font-semibold text-slate-900">
                {c.title}
              </h2>
              <p className="mt-1 line-clamp-3 text-xs text-slate-600">
                {c.summary}
              </p>
              <p className="mt-3 text-xs font-semibold text-orange-600">
                {c.price_cents === 0
                  ? 'Free / Partnership'
                  : `$${(c.price_cents / 100).toFixed(2)} per tenant`}
              </p>
            </Link>
          ))}
          {courses.length === 0 && (
            <p className="text-sm text-slate-500">
              No marketplace programs yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

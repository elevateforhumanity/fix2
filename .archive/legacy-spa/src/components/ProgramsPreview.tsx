import { useEffect, useState } from 'react';
import { Card, Button, EmptyState, ShimmerGrid, useTimedShimmer } from './ds';

interface Program {
  title: string;
  blurb: string;
  href: string;
}

const FALLBACK_PROGRAMS: Program[] = [
  {
    title: 'Barber Apprenticeship',
    blurb:
      'Earn while you learn with a licensed shop, 500+ transferable hours.',
    href: '/apply?program=Barber%20Apprenticeship',
  },
  {
    title: 'Building Tech / HVAC',
    blurb: 'Facilities maintenance, HVAC helper, OSHA-aligned safety training.',
    href: '/apply?program=Building%20Tech%20/%20HVAC',
  },
  {
    title: 'CNA / HHA',
    blurb: 'Fast track to patient care roles with local clinical partners.',
    href: '/apply?program=CNA%20/%20HHA',
  },
];

export default function ProgramsPreview() {
  const HAS_API = !!import.meta.env.VITE_PUBLIC_API;
  const [loading, setLoading] = useState(HAS_API);
  const [items, setItems] = useState<Program[]>(FALLBACK_PROGRAMS);
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    if (!HAS_API) return;

    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API}/programs?limit=3`,
          { mode: 'cors' }
        );
        if (!res.ok) throw new Error('Bad status ' + res.status);
        const data = await res.json();

        if (Array.isArray(data) && data.length) {
          setItems(
            data.slice(0, 3).map((d: any) => ({
              title: d.title || d.name || 'Program',
              blurb: d.blurb || d.description || '',
              href:
                d.href ||
                `/apply?program=${encodeURIComponent(d.title || d.name || 'Program')}`,
            }))
          );
        } else {
          setApiFailed(true);
          setItems(FALLBACK_PROGRAMS);
        }
      } catch (e) {
        setApiFailed(true);
        setItems(FALLBACK_PROGRAMS);
      } finally {
        setLoading(false);
      }
    })();
  }, [HAS_API]);

  const showShimmer = useTimedShimmer({ loading, minMs: 300, maxMs: 3000 });

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12 lg:py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Programs</h2>
        <a
          href="/programs"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
        >
          View all →
        </a>
      </div>
      {showShimmer && (
        <div className="mt-8">
          <ShimmerGrid items={3} columns="md:grid-cols-3" />
        </div>
      )}
      {!showShimmer && items && items.length > 0 && (
        <>
          {apiFailed && HAS_API && (
            <p className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Live catalog unavailable. Showing core programs.
            </p>
          )}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {items.map((program, i) => (
              <Card key={program.title + i} variant="default">
                <h3 className="text-xl font-semibold text-slate-900">
                  {program.title}
                </h3>
                <p className="mt-2 text-slate-700">{program.blurb}</p>
                <div className="mt-4">
                  <a href={program.href}>
                    <Button variant="primary">Apply now</Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
      {!showShimmer && (!items || items.length === 0) && (
        <div className="mt-8">
          <EmptyState
            title="Programs unavailable"
            message="We couldn't load programs right now. Please reload or visit the full catalog."
            href="/programs"
            actionLabel="Go to Programs"
          />
        </div>
      )}
    </section>
  );
}

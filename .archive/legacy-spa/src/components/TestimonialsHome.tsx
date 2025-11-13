import { useEffect, useState } from 'react';
import { Card, EmptyState, ShimmerGrid, useTimedShimmer } from './ds';

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote: 'I started earning within two weeks. The team matched me to a shop and helped with my hours and license steps.',
    name: 'Marcus T.',
    role: 'Barber Apprentice',
  },
  {
    quote: 'They aligned funding through WorkOne and placed me with a facilities team—hands-on, paid, and supportive.',
    name: 'Alicia R.',
    role: 'Building Tech Trainee',
  },
  {
    quote: 'I finished CNA quickly and got help with interviews. Clear steps, real outcomes.',
    name: 'Devon P.',
    role: 'CNA Graduate',
  },
];

export default function TestimonialsHome() {
  const HAS_API = !!import.meta.env.VITE_PUBLIC_API;
  const [loading, setLoading] = useState(HAS_API);
  const [items, setItems] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    if (!HAS_API) return;
    
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PUBLIC_API}/testimonials?limit=3`, { mode: 'cors' });
        if (!res.ok) throw new Error('Bad status ' + res.status);
        const data = await res.json();
        
        if (Array.isArray(data) && data.length) {
          setItems(data.slice(0, 3));
        } else {
          setApiFailed(true);
          setItems(FALLBACK_TESTIMONIALS);
        }
      } catch (e) {
        setApiFailed(true);
        setItems(FALLBACK_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    })();
  }, [HAS_API]);

  const showShimmer = useTimedShimmer({ loading, minMs: 300, maxMs: 3000 });

  return (
    <section aria-label="Student testimonials" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-slate-900">What learners say</h2>

        {showShimmer && (
          <div className="mt-8">
            <ShimmerGrid items={3} columns="md:grid-cols-3" />
          </div>
        )}

        {!showShimmer && items && items.length > 0 && (
          <>
            {apiFailed && HAS_API && (
              <p className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Live testimonials unavailable. Showing recent highlights.
              </p>
            )}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {items.map((testimonial, i) => (
                <Card key={testimonial.name + i} variant="default">
                  <figure>
                    <blockquote className="text-slate-800">
                      <p>"{testimonial.quote}"</p>
                    </blockquote>
                    <figcaption className="mt-4 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">{testimonial.name}</span>
                      {testimonial.role && ` — ${testimonial.role}`}
                    </figcaption>
                  </figure>
                </Card>
              ))}
            </div>
          </>
        )}

        {!showShimmer && (!items || items.length === 0) && (
          <div className="mt-8">
            <EmptyState
              title="No testimonials yet"
              message="Be the first to share your experience after completing a track."
              href="/apply"
              actionLabel="Start your application"
            />
          </div>
        )}
      </div>
    </section>
  );
}

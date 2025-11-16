import { useEffect, useState } from 'react';
import { ShimmerBlock, useTimedShimmer } from './ds';

interface PartnerLogo {
  src: string;
  alt: string;
}

const FALLBACK_LOGOS: PartnerLogo[] = [
  { src: '/images/partners/workone.webp', alt: 'WorkOne Indiana' },
  { src: '/images/partners/dwd.webp', alt: 'Indiana DWD' },
  { src: '/images/partners/nextleveljobs.webp', alt: 'Next Level Jobs' },
  { src: '/images/partners/usdol.webp', alt: 'U.S. Department of Labor' },
  { src: '/images/partners/osha.webp', alt: 'OSHA' },
];

export default function PartnersBand() {
  const HAS_API = !!import.meta.env.VITE_PUBLIC_API;
  const [loading, setLoading] = useState(HAS_API);
  const [logos, setLogos] = useState<PartnerLogo[]>(FALLBACK_LOGOS);

  useEffect(() => {
    if (!HAS_API) return;

    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API}/partners/logos`,
          { mode: 'cors' }
        );
        if (!res.ok) throw new Error('Bad status ' + res.status);
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setLogos(data);
        }
      } catch {
        setLogos(FALLBACK_LOGOS);
      } finally {
        setLoading(false);
      }
    })();
  }, [HAS_API]);

  const showShimmer = useTimedShimmer({ loading, minMs: 300, maxMs: 2000 });

  return (
    <section aria-label="Partners and affiliates" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10 border-y border-slate-100">
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wide">
          Trusted by workforce and education partners
        </p>
        {showShimmer ? (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <ShimmerBlock className="h-8 w-32" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-8 opacity-70">
            {logos.map((logo, i) => (
              <div
                key={logo.alt + i}
                className="flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback to PNG if WebP fails
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace('.webp', '.png');
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

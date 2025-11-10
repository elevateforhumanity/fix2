export default function Partners() {
  const logos = [
    { src: '/images/partners/workone.svg', alt: 'WorkOne Indiana', fallback: '/images/partners/workone.png' },
    { src: '/images/partners/dwd.svg', alt: 'Indiana DWD', fallback: '/images/partners/dwd.png' },
    { src: '/images/partners/nextleveljobs.svg', alt: 'Next Level Jobs', fallback: '/images/partners/nextleveljobs.png' },
    { src: '/images/partners/usdol.svg', alt: 'U.S. Department of Labor', fallback: '/images/partners/usdol.png' },
    { src: '/images/partners/osha.svg', alt: 'OSHA', fallback: '/images/partners/osha.png' },
  ];

  return (
    <section aria-label="Partners and affiliates" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10 border-y border-slate-100">
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wide">
          Trusted by workforce and education partners
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-8 opacity-70">
          {logos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Fallback to PNG if SVG fails
                  const target = e.target as HTMLImageElement;
                  if (target.src !== logo.fallback) {
                    target.src = logo.fallback;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

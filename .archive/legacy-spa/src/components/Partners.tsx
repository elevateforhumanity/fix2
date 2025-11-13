export default function Partners() {
  const logos = [
    { src: '/images/partners/workone.webp', alt: 'WorkOne Indiana' },
    { src: '/images/partners/dwd.webp', alt: 'Indiana DWD' },
    { src: '/images/partners/nextleveljobs.webp', alt: 'Next Level Jobs' },
    { src: '/images/partners/usdol.webp', alt: 'U.S. Department of Labor' },
    { src: '/images/partners/osha.webp', alt: 'OSHA' },
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

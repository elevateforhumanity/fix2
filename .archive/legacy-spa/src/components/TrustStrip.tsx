export default function TrustStrip() {
  const logos = [
    { src: '/logos/dwd.svg', alt: 'Indiana DWD' },
    { src: '/logos/dol.svg', alt: 'U.S. Department of Labor' },
    { src: '/logos/workone.svg', alt: 'WorkOne' },
    { src: '/logos/supabase.svg', alt: 'Supabase' },
  ];

  return (
    <section className="py-10 bg-brand-surface border-y">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-1 text-center">
          <div>
            <div className="text-3xl font-extrabold">100%</div>
            <div className="text-brand-text-muted">FREE to students</div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-80">
          {logos.map((l) => (
            <img
              key={l.src}
              src={l.src}
              alt={l.alt}
              className="h-8 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { ReactNode } from 'react';

interface CompactHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'muted' | 'gradient';
}

export function CompactHero({
  eyebrow,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
}: CompactHeroProps) {
  const backgrounds = {
    default: 'bg-white',
    muted: 'bg-gray-50',
    gradient: 'bg-gradient-to-b from-blue-50 to-white',
  };

  return (
    <section className={backgrounds[variant]}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-gray-600 uppercase tracking-wide">
            {eyebrow}
          </p>
        )}

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl text-gray-900">
          {headline}
        </h1>

        <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-700 leading-relaxed">
          {subheadline}
        </p>

        {(primaryCTA || secondaryCTA) && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {primaryCTA && (
              <a
                href={primaryCTA.href}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                {primaryCTA.text}
              </a>
            )}
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

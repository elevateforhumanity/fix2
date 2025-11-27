import Image from "next/image";
import type { HeroSection } from "@/lib/pageVisuals";

interface HeroBannerProps {
  hero: HeroSection;
}

export function HeroBanner({ hero }: HeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            {hero.eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-brandPrimary">
                {hero.eyebrow}
              </p>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-lg leading-relaxed text-gray-600 max-w-2xl">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaLabel && hero.ctaHref && (
              <div className="pt-4">
                <a
                  href={hero.ctaHref}
                  className="inline-flex items-center justify-center rounded-lg bg-brandPrimary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-brandPrimaryDark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2"
                >
                  {hero.ctaLabel}
                </a>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

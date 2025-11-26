import Image from "next/image";
import type { HeroSection } from "@/lib/pageVisuals";

interface HeroBannerProps {
  hero: HeroSection;
}

export function HeroBanner({ hero }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:py-16">
        <div className="md:w-1/2">
          {hero.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brandPrimary">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold text-brandBlack md:text-4xl">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-3 text-base leading-relaxed text-gray-700">
              {hero.subtitle}
            </p>
          )}
          {hero.ctaLabel && hero.ctaHref && (
            <a
              href={hero.ctaHref}
              className="mt-6 inline-flex rounded-md bg-brandPrimary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brandPrimaryDark"
            >
              {hero.ctaLabel}
            </a>
          )}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl md:w-1/2">
          <Image
            src={hero.imageSrc}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 480px, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

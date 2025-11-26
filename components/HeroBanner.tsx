import Image from "next/image";
import type { HeroSection } from "@/lib/pageVisuals";

interface HeroBannerProps {
  hero: HeroSection;
}

export function HeroBanner({ hero }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-700/40 via-slate-950 to-blue-900/60" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:py-16">
        <div className="md:w-1/2">
          {hero.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-slate-100/90">
              {hero.subtitle}
            </p>
          )}
          {hero.ctaLabel && hero.ctaHref && (
            <a
              href={hero.ctaHref}
              className="mt-4 inline-flex rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-red-700"
            >
              {hero.ctaLabel}
            </a>
          )}
        </div>
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 md:mt-0 md:w-1/2">
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

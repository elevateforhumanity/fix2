"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroImage } from "@/lms-data/media";

interface HomeHeroProps {
  images: HeroImage[];
}

export function HomeHero({ images }: HomeHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(id);
  }, [images.length]);

  const current = images[index];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex min-h-[320px] max-w-6xl flex-col-reverse gap-4 px-4 py-6 md:grid md:grid-cols-[1.3fr,1.7fr] md:items-center">
        {/* TEXT SIDE */}
        <div className="space-y-3 text-white">
          {current.badge && (
            <span className="inline-flex items-center rounded-full bg-red-600/15 px-3 py-1 text-[11px] font-semibold text-red-300">
              {current.badge}
            </span>
          )}
          <h1 className="text-2xl font-bold leading-snug md:text-3xl">
            {current.headline}
          </h1>
          <p className="text-xs text-slate-200 md:text-sm">
            {current.subheadline}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
            {current.ctaHref && current.ctaLabel && (
              <Link
                href={current.ctaHref}
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-red-700"
              >
                {current.ctaLabel}
              </Link>
            )}
            <Link
              href="/funding"
              className="rounded-md border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              See Funding & Stipends
            </Link>
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            JRI, WRG, WEX, OJT, apprenticeships, and employer sponsorship are
            braided together so you can focus on learning and earning.
          </p>
        </div>

        {/* IMAGE SIDE */}
        <div className="relative h-[220px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:h-[260px]">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
            priority
          />
          {/* Soft overlay gradient for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* SMALL DOT INDICATORS */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 pb-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setIndex(i)}
              className={
                "h-1.5 w-6 rounded-full " +
                (i === index ? "bg-red-500" : "bg-slate-700")
              }
              aria-label={`Show hero image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

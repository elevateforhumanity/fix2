"use client";

import Image from "next/image";
import type { Program } from "@/lib/programs";

export function ProgramHero({ program }: { program: Program }) {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-14">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-orange-300">
            Elevate Workforce Pathway
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{program.name}</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-100 md:text-base">
            {program.shortTagline}
          </p>

          <dl className="mt-5 grid max-w-xl gap-4 text-xs text-slate-200 md:grid-cols-3">
            <div>
              <dt className="text-slate-400">Level</dt>
              <dd className="mt-1 font-semibold">{program.level}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Duration</dt>
              <dd className="mt-1 font-semibold">{program.duration}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Format</dt>
              <dd className="mt-1 font-semibold">{program.format}</dd>
            </div>
          </dl>

          <p className="mt-3 text-xs text-slate-300">
            Schedule: <span className="font-medium">{program.schedule}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={program.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              {program.ctaPrimary.label} →
            </a>
            {program.ctaSecondary ? (
              <a
                href={program.ctaSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-400 px-5 py-2 text-xs font-semibold text-slate-50 hover:bg-slate-800"
              >
                {program.ctaSecondary.label} →
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative mx-auto h-56 w-full max-w-md overflow-hidden rounded-3xl bg-slate-800 md:h-72">
            <Image
              src={program.heroImage}
              alt={program.heroImageAlt}
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            * Images are illustrative. Actual training locations and labs may vary by partner.
          </p>
        </div>
      </div>
    </section>
  );
}

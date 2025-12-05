"use client";

import Link from "next/link";
import Image from "next/image";
import { programs } from "@/app/data/programs";

export default function HomeProgramsSection() {
  const featured = programs;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              Elevate For Humanity
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
              Career Training Programs
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              WIOA-approved workforce training in skilled trades, healthcare, and transportation
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View all programs
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((program) => (
            <article
              key={program.slug}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white border border-slate-200 transition hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-slate-50">
                {program.heroImage ? (
                  <Image
                    src={program.heroImage}
                    alt={program.heroImageAlt || program.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Program image coming soon
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {program.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-700">
                  {program.shortDescription}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Workforce-ready training</span>
                  <span className="flex items-center gap-1 font-semibold text-orange-600">
                    Learn more <span aria-hidden>→</span>
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    View program
                  </Link>
                  <Link
                    href={`/apply?program=${encodeURIComponent(program.slug)}`}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    Start application
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

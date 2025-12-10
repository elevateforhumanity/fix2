// app/programs/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProgramBySlugFromDb } from "@/lib/programs";

type Props = { params: { slug: string } };

export const dynamic = 'force-dynamic';

function FormattedLongDescription({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push(
        <ul
          key={`ul-${blocks.length}`}
          className="ml-5 list-disc space-y-1 text-slate-700"
        >
          {listBuffer.map((li, i) => (
            <li key={i}>{li.replace(/^-+\s*/, "").trim()}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();

    if (!line) {
      flushList();
      blocks.push(
        <div key={`sp-${blocks.length}`} className="h-2" />
      );
      return;
    }

    if (/^-/.test(line)) {
      listBuffer.push(line);
      return;
    }

    if (/:$/.test(line) && line.length < 120) {
      flushList();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="mt-8 text-lg font-semibold text-slate-900"
        >
          {line.replace(/:$/, "")}
        </h2>
      );
      return;
    }

    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-slate-700">
        {line}
      </p>
    );
  });

  flushList();
  return <div className="space-y-3">{blocks}</div>;
}

export default async function ProgramPage({ params }: Props) {
  const dbProgram = await getProgramBySlugFromDb(params.slug);

  if (!dbProgram) {
    return notFound();
  }

  const applyHref = `/apply?program=${encodeURIComponent(params.slug)}`;
  const contactHref = `/contact?topic=${encodeURIComponent(params.slug)}`;

  // Use hero_image from database if available, otherwise fallback to static mapping
  const heroImageMap: Record<string, { src: string; alt: string }> = {
    "hvac-technician": {
      src: "/images/programs/hvac-hero.jpg",
      alt: "HVAC student working on an air conditioning unit",
    },
    "barber-apprenticeship": {
      src: "/images/programs/barber-hero.jpg",
      alt: "Barber apprentice cutting a client's hair",
    },
    cna: {
      src: "/images/programs/cna-hero.jpg",
      alt: "CNA student practicing caregiving skills",
    },
    cdl: {
      src: "/images/programs/cdl-hero.jpg",
      alt: "CDL student practicing driving a truck",
    },
    "building-maintenance": {
      src: "/images/programs/building-maintenance-hero.jpg",
      alt: "Maintenance technician working in a building",
    },
    "building-technician": {
      src: "/images/programs/building-technician-hero.jpg",
      alt: "Technician checking building systems",
    },
    "workforce-readiness": {
      src: "/images/programs/workforce-readiness-hero.jpg",
      alt: "Students in a workforce readiness workshop",
    },
  };

  const hero = dbProgram.hero_image
    ? { src: dbProgram.hero_image, alt: dbProgram.hero_image_alt || dbProgram.name }
    : heroImageMap[params.slug];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-14">
          {/* Text side */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              Elevate For Humanity
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {dbProgram.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-700">
              {dbProgram.short_description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={applyHref}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md"
              >
                Start Application
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Talk to a Career Coach
              </Link>
            </div>
          </div>

          {/* Image side */}
          {hero && (
            <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm md:h-72 md:w-80">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, 100vw"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
          <FormattedLongDescription text={dbProgram.long_description} />
        </div>

        {/* Bottom CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={applyHref}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md"
          >
            Apply for {dbProgram.name}
          </Link>
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Request Info Session
          </Link>
        </div>
      </section>
    </main>
  );
}

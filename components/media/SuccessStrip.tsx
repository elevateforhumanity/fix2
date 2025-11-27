import Image from "next/image";
import type { SuccessStoryImage } from "@/lms-data/media";

interface SuccessStripProps {
  stories: SuccessStoryImage[];
}

export function SuccessStrip({ stories }: SuccessStripProps) {
  if (!stories.length) return null;

  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-6 text-white">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Real People, Real Outcomes
            </p>
            <h2 className="text-lg font-bold">Success Stories & Impact</h2>
            <p className="mt-1 text-xs text-slate-300">
              These images represent the kinds of wins Elevate is built for:
              stable jobs, credentials, and confidence for people who were
              overlooked or stuck.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={story.src}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-3 py-2 text-[11px]">
                <p className="font-semibold text-slate-100">{story.name}</p>
                <p className="mt-0.5 text-[11px] text-green-300">
                  {story.outcome}
                </p>
                <p className="mt-1 text-[11px] text-slate-300">
                  "{story.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

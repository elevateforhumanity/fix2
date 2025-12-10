// app/programs/page.tsx
import Link from "next/link";
import Image from "next/image";
import { programs } from "@/app/data/programs";

export default function ProgramsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">Programs</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-700">
            Explore our workforce-ready training programs. Clear outcomes, real support, and
            pathways that fit your life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              {p.heroImage && (
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={p.heroImage}
                    alt={p.heroImageAlt || p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600">
                {p.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-700">{p.shortDescription}</p>
              <div className="mt-4 text-sm font-semibold text-orange-600">View program →</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

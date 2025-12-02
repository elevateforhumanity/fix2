import { PROGRAMS } from "@/data/programs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = PROGRAMS.find((p) => p.slug === params.slug);

  if (!program) return notFound();

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-blue-50 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16 flex flex-col lg:flex-row gap-10">
          <div className="max-w-xl space-y-4">
            <p className="text-xs uppercase text-orange-600 font-semibold tracking-wide">
              {program.category}
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">{program.name}</h1>
            <p className="text-sm text-slate-700">{program.heroTagline}</p>
            <p className="text-sm text-slate-700">{program.overview}</p>

            <div className="flex gap-3 pt-3">
              <Link
                href={`/apply?program=${program.slug}`}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-orange-700"
              >
                Apply Now
              </Link>
              <Link
                href={`/contact?program=${program.slug}`}
                className="border border-orange-300 text-orange-700 px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-orange-50"
              >
                Talk to Team
              </Link>
            </div>
          </div>

          <div className="relative h-64 w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={program.imageSrc}
              alt={program.imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="py-10 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-lg font-semibold">Program at a Glance</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {[
              ["Program Length", program.length],
              ["Schedule", program.schedule],
              ["Delivery", program.delivery],
              ["Location", program.location],
              ["Credential", program.credential],
              ["Starting Pay", program.salaryRange],
              ["Where You Can Work", program.employers],
            ].map(([label, value]) => (
              <div key={label} className="bg-slate-50 p-4 rounded-xl">
                <p className="text-[11px] uppercase text-slate-500">{label}</p>
                <p className="text-sm font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT BLOCKS */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-2">

          {/* WHAT YOU'LL LEARN */}
          <div>
            <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-xs">
              {program.whatYoullLearn.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="h-2 w-2 bg-orange-500 rounded-full mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* DAY IN THE LIFE */}
          <div>
            <h3 className="text-lg font-semibold mb-3">A Day in the Life</h3>
            <ul className="space-y-2 text-xs">
              {program.dayInTheLife.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FIT + FUNDING */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-2">

          {/* RIGHT FOR YOU */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              This Program Is Right for You If…
            </h3>
            <ul className="space-y-2 text-xs">
              {program.isRightForYouIf.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="h-2 w-2 bg-emerald-500 rounded-full mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* FUNDING */}
          <div className="bg-slate-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Funding Options</h3>
            <ul className="space-y-2 text-xs">
              {program.fundingHighlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="h-2 w-2 bg-orange-600 rounded-full mt-1" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/funding/eligibility?program=${program.slug}`}
              className="mt-3 inline-block bg-orange-600 text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-orange-700"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* ENROLL STEPS */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-lg font-semibold">How to Enroll</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-4 text-xs">
            {[
              ["Step 1", "Explore this program"],
              ["Step 2", "Check funding with our team"],
              ["Step 3", "Submit application"],
              ["Step 4", "Start training"],
            ].map(([step, title]) => (
              <div key={step} className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-orange-600 text-[11px] uppercase font-semibold">
                  {step}
                </p>
                <p className="mt-2 text-sm font-medium">{title}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/apply?program=${program.slug}`}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-800"
            >
              Apply Now
            </Link>
            <Link
              href={`/contact?program=${program.slug}`}
              className="border border-slate-300 px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-50"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

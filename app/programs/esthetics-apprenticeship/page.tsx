import Link from "next/link";

export const metadata = {
  title: "Esthetics Apprenticeship | Elevate for Humanity",
  description:
    "Esthetics, spa, and wellness apprenticeship pathway with salon/spa sponsorship, apprenticeship wages, and Elevate-powered theory modules.",
};

export default function EstheticsApprenticeshipProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Esthetics Apprenticeship
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Skin, Spa &amp; Wellness Esthetics Apprenticeship
          </h1>
          <p className="mt-3 text-sm text-slate-200 max-w-2xl">
            This pathway is designed for learners who want to build careers in
            esthetics, spa, and wellness. It blends Elevate&apos;s theory
            modules with salon/spa-based apprenticeship hours and real client
            service.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-esthetics-apprentice"
              className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply for Esthetics Apprenticeship
            </Link>
            <Link
              href="/checkout/prog-esthetics-apprentice"
              className="rounded-md border border-slate-700 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition &amp; Funding
            </Link>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              What this apprenticeship covers
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>Skin basics, sanitation, and safety</li>
              <li>Facials, basic treatments, and client consultation</li>
              <li>Product knowledge and retail conversations</li>
              <li>Spa professionalism and customer service</li>
              <li>Entrepreneurship and building a client book</li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              Exact services and board-aligned requirements are shaped with
              each salon/spa partner and local licensing expectations.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              How funding and wages can work
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                Salons/spas can sponsor tuition using the{" "}
                <span className="font-semibold">
                  Salon/Spa Sponsored Seat
                </span>{" "}
                option
              </li>
              <li>
                Apprentices can receive wages, tips, and/or stipends during
                training
              </li>
              <li>
                Payment plans are available when a learner starts before
                securing a sponsoring salon
              </li>
            </ul>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-[10px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Program identifiers
              </p>
              <ul className="mt-1 list-disc pl-5">
                <li>
                  Elevate program ID:{" "}
                  <span className="font-mono text-orange-300">
                    prog-esthetics-apprentice
                  </span>
                </li>
                <li>
                  Auto-enrolled course slug:{" "}
                  <span className="font-mono">
                    esthetics-apprentice-foundations
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Build a career in esthetics, spa, and wellness.
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Elevate connects learners with sponsoring salons/spas and supports
              you from theory modules to client-ready practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-esthetics-apprentice"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Start Application
            </Link>
            <Link
              href="/checkout/prog-esthetics-apprentice"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Tax & VITA Certification Track | Elevate for Humanity",
  description:
    "VITA/TCE-aligned tax preparation track powered by IRS Link & Learn, Intuit Academy, and community-based service.",
};

export default function TaxVitaProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Tax &amp; VITA Certification Track
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Become an IRS-Certified VITA Tax Preparer
          </h1>
          <p className="mt-3 text-sm text-slate-200 max-w-2xl">
            Elevate for Humanity&apos;s Tax &amp; VITA pathway blends{" "}
            <span className="font-semibold">IRS Link &amp; Learn</span>,
            <span className="font-semibold"> Intuit Academy</span>, and live
            community tax sites so you can earn credentials, support families,
            and unlock future income as a tax professional.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-tax-vita"
              className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply for Tax &amp; VITA Track
            </Link>
            <Link
              href="/checkout/prog-tax-vita"
              className="rounded-md border border-slate-700 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Funding &amp; Tuition Details
            </Link>
            <Link
              href="/vita/resources"
              className="rounded-md border border-slate-700 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              VITA Training Resources
            </Link>
          </div>
        </div>
      </section>

      {/* STRUCTURE / MODULES */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              What you&apos;ll complete in this track
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <span className="font-semibold">IRS Link &amp; Learn</span>{" "}
                training modules (Basic or Advanced)
              </li>
              <li>
                <span className="font-semibold">IRS VITA/TCE certification</span>{" "}
                exams and standards of conduct
              </li>
              <li>
                <span className="font-semibold">Intuit Academy</span> tax
                fundamentals (Tax Level 1 &amp; optionally Level 2)
              </li>
              <li>
                Supervised practice returns using{" "}
                <span className="font-semibold">Form 13614-C</span> and quality
                review checklists
              </li>
              <li>
                Live service hours at a{" "}
                <span className="font-semibold">VITA/TCE site</span> or
                community partner location
              </li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              This track is a strong fit for learners who want to build
              bookkeeping, tax prep, public service, or financial coaching
              careers.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Who this is designed for
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>Youth and adults exploring financial careers</li>
              <li>
                Career changers seeking a low-cost path into tax or bookkeeping
              </li>
              <li>
                Community leaders who want to host{" "}
                <span className="font-semibold">VITA sites</span>
              </li>
              <li>
                Learners in other Elevate programs (CNA, Barber, CDL, HVAC) who
                want an additional income stream during off season
              </li>
            </ul>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-[10px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Funding &amp; stipends
              </p>
              <ul className="mt-1 list-disc pl-5">
                <li>Designed to be fully grant- or partner-funded</li>
                <li>
                  Aligns with VITA/TCE volunteer expectations and local
                  stipends where available
                </li>
                <li>
                  Can be layered with other Elevate programs as a micro-credential
                  with no direct tuition to the learner
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
              Ready to start your Tax &amp; VITA journey?
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Complete Elevate&apos;s intake form, then move into IRS Link &amp;
              Learn and Intuit Academy training modules with our support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-tax-vita"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Start Application
            </Link>
            <Link
              href="/vita/resources"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View VITA Resources
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

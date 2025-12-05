import type { Program } from "@/lib/programs";

export function ProgramDetails({ program }: { program: Program }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
        <div>
          <h2 className="text-xl font-bold text-slate-900">What You&apos;ll Learn</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.outcomes.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Program Highlights
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Is This Program For You?
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {program.whoItIsFor.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-800 ring-1 ring-slate-200">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Tuition & Funding
            </h3>
            <p className="mt-2 text-sm text-slate-800">{program.tuitionNotes}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              {program.fundingOptions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              How to Apply
            </h4>
            <ol className="mt-2 space-y-2 text-xs text-slate-700">
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">1.</span>
                <span>Visit <strong>Indiana Career Connect</strong> to create your profile and browse approved training programs</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">2.</span>
                <span>Schedule an appointment with your local <strong>WorkOne center</strong> to discuss funding options (WIOA, ETPL, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-orange-600">3.</span>
                <span>Your WorkOne career coach will help you apply for funding and connect with training providers</span>
              </li>
            </ol>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={program.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600"
              >
                {program.ctaPrimary.label} →
              </a>
              {program.ctaSecondary ? (
                <a
                  href={program.ctaSecondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                >
                  {program.ctaSecondary.label} →
                </a>
              ) : null}
            </div>
            <p className="mt-3 text-[10px] text-slate-500">
              💡 Most training is 100% funded through WIOA or workforce grants. Your WorkOne coach will help you navigate the process.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

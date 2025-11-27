import { etplAlignmentProfiles } from "../../../lms-data/etplAlignment";

export const metadata = {
  title: "ETPL / WRG / JRI Alignment | Elevate Admin",
  description:
    "Quick reference for how Elevate programs line up with ETPL, WRG, WIOA, JRI, VITA, and apprenticeship pathways.",
};

export default function AdminEtplAlignmentPage() {
  const onETPL = etplAlignmentProfiles.filter((p) => p.onETPL);
  const notOnETPL = etplAlignmentProfiles.filter((p) => !p.onETPL);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin • Compliance &amp; Alignment
          </p>
          <h1 className="mt-2 text-2xl font-bold">
            ETPL / WRG / JRI Alignment Map
          </h1>
          <p className="mt-2 text-xs text-slate-300 max-w-3xl">
            This internal view shows, at a glance, where each Elevate program
            sits in relation to ETPL, Workforce Ready Grant (WRG), WIOA
            eligibility, JRI integration, VITA, and apprenticeship status.
            Use it when filling out forms, talking to boards, or designing
            waivers under new DOL guidance.
          </p>
        </div>
      </section>

      {/* ON ETPL */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-4 text-[11px]">
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Programs Currently Listed on ETPL
            </p>
            <p className="mt-1 text-slate-300">
              Double-check provider IDs and program titles against the official
              ETPL listing when submitting renewals or grant applications.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
            <table className="min-w-full border-collapse text-left text-[11px]">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-2">Program</th>
                  <th className="px-3 py-2">ETPL Name</th>
                  <th className="px-3 py-2">Provider ID</th>
                  <th className="px-3 py-2">WRG</th>
                  <th className="px-3 py-2">WIOA Adult</th>
                  <th className="px-3 py-2">WIOA Youth</th>
                  <th className="px-3 py-2">Apprenticeship</th>
                </tr>
              </thead>
              <tbody>
                {onETPL.map((p) => (
                  <tr
                    key={p.programId}
                    className="border-t border-slate-800 hover:bg-slate-900/70"
                  >
                    <td className="px-3 py-2 align-top text-slate-100">
                      {p.label}
                    </td>
                    <td className="px-3 py-2 align-top text-slate-200">
                      {p.etplProgramName ?? "—"}
                    </td>
                    <td className="px-3 py-2 align-top text-slate-200">
                      {p.etplProviderId ?? "—"}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.wrgEligible
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.wrgEligible ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.wioaAdultEligible
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.wioaAdultEligible ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.wioaYouthEligible
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.wioaYouthEligible ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.apprenticeshipRelated
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.apprenticeshipRelated ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* NOT ON ETPL YET */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Programs Not Yet on ETPL (or Alternative Funding Models)
            </p>
            <p className="mt-1 text-slate-300">
              These programs may use apprenticeship-only, employer-sponsored,
              VITA, or philanthropic models. For each one, the notes explain how
              you&apos;re currently positioning the program with funders.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
            <table className="min-w-full border-collapse text-left text-[11px]">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-2">Program</th>
                  <th className="px-3 py-2">JRI</th>
                  <th className="px-3 py-2">VITA</th>
                  <th className="px-3 py-2">Apprenticeship</th>
                  <th className="px-3 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {notOnETPL.map((p) => (
                  <tr
                    key={p.programId}
                    className="border-t border-slate-800 hover:bg-slate-900/70"
                  >
                    <td className="px-3 py-2 align-top text-slate-100">
                      {p.label}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.jriIntegrated
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.jriIntegrated ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.vitaRelated
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.vitaRelated ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (p.apprenticeshipRelated
                            ? "bg-emerald-700 text-emerald-50"
                            : "bg-slate-800 text-slate-300")
                        }
                      >
                        {p.apprenticeshipRelated ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-slate-300">
                      {p.internalNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-slate-400">
            TIP: When you meet with WorkOne / EmployIndy / state workforce
            boards, open this page so you can walk program-by-program through
            what&apos;s on ETPL, what uses WRG/WIOA, and where you&apos;d like
            to pilot waivers or innovative models under TEGL 05-25.
          </p>
        </div>
      </section>
    </main>
  );
}

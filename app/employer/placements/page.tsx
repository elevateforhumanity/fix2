import Link from "next/link";
import { employers } from "@/lms-data/employers";
import { allPrograms } from "@/lms-data/programs";

// Sample placements for demo purposes
const samplePlacements = employers.map((emp, idx) => ({
  id: `placement-${idx}`,
  employerName: emp.name,
  programId: emp.interestedPrograms[0] || "prog-cna",
  placementType: emp.wantsApprenticeship ? "Apprenticeship" : emp.wantsWex ? "WEX" : "OJT",
  outcome: "Hired full-time after completion",
}));

export const metadata = {
  title: "Sample Placements & Outcomes | Employer Portal",
  description:
    "See examples of how Elevate for Humanity learners have been placed with employers through WEX, OJT, and apprenticeships."
};

export default function EmployerPlacementsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Employer Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Sample Placements &amp; Outcomes
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This page shows example placements to help you visualize how Elevate
            partnerships work in practice: who is involved, which program they
            came from, and the status of their WEX, OJT, or apprenticeship.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/employer/dashboard"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              Back to Employer Home
            </Link>
            <Link
              href="/employer/opportunities"
              className="rounded-md border border-slate-600 px-3 py-1.5 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Talent &amp; WBL Options
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            {samplePlacements.map((plc) => {
              const program = allPrograms.find((p) => p.id === plc.programId);

              const typeLabel =
                plc.workBasedType === "wex"
                  ? "WEX – Work Experience"
                  : plc.workBasedType === "ojt"
                  ? "OJT – On-the-Job Training"
                  : plc.workBasedType === "apprenticeship"
                  ? "Apprenticeship / Earn While You Learn"
                  : "Direct Hire";

              const statusLabel =
                plc.status === "screening"
                  ? "Screening"
                  : plc.status === "active"
                  ? "Active"
                  : plc.status === "completed"
                  ? "Completed"
                  : "On Hold";

              return (
                <article
                  key={plc.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/80 p-4"
                >
                  <p className="text-[11px] font-semibold text-slate-300">
                    Employer
                  </p>
                  <h2 className="text-sm font-semibold text-white">
                    {plc.employerName}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Learner: <span className="text-slate-100">{plc.learnerName}</span>
                  </p>

                  {program && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      Program:{" "}
                      <span className="text-slate-100">{program.title}</span>
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-slate-300">
                    Pathway: <span className="text-slate-100">{typeLabel}</span>
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    Status:{" "}
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-100">
                      {statusLabel}
                    </span>
                  </p>

                  {plc.hoursCompleted != null && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      Hours completed:{" "}
                      <span className="text-slate-100">{plc.hoursCompleted}</span>
                    </p>
                  )}

                  {plc.startDate && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      Start date:{" "}
                      <span className="text-slate-100">{plc.startDate}</span>
                    </p>
                  )}
                  {plc.endDate && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      End date:{" "}
                      <span className="text-slate-100">{plc.endDate}</span>
                    </p>
                  )}

                  {plc.notes && (
                    <p className="mt-2 text-[11px] text-slate-400">
                      Notes: {plc.notes}
                    </p>
                  )}

                  <div className="mt-3 rounded-lg bg-slate-900/80 p-3 text-[11px] text-slate-200">
                    <p className="font-semibold">Imagine this with your logo.</p>
                    <p className="mt-1">
                      In the next version, this page can show your actual
                      placements with Elevate: learners hosted at your sites,
                      hours completed, and outcomes.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

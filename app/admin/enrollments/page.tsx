import { listEnrollments } from "@/lib/db/enrollments";

export const dynamic = "force-dynamic";

export default async function AdminEnrollmentsPage() {
  const enrollments = await listEnrollments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-slate-900">
      <h1 className="text-2xl font-bold">Program Enrollments</h1>
      <p className="mt-2 text-sm text-slate-600">
        This is a basic view backed by an in-memory store. Replace with your real DB.
      </p>

      <table className="mt-6 w-full text-left text-xs">
        <thead>
          <tr className="border-b border-slate-200 text-[11px] uppercase text-slate-500">
            <th className="py-2">Enrollment ID</th>
            <th className="py-2">Student</th>
            <th className="py-2">Program</th>
            <th className="py-2">Funding</th>
            <th className="py-2">Status</th>
            <th className="py-2">Stripe Ref</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e.id} className="border-b border-slate-100">
              <td className="py-2 pr-2 align-top text-[11px]">{e.id}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.studentId}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.programId}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.fundingSource}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.status}</td>
              <td className="py-2 pr-2 align-top text-[11px]">
                {e.stripeRefId ?? "—"}
              </td>
            </tr>
          ))}
          {enrollments.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-[11px] text-slate-500">
                No enrollments yet. Once Stripe checkouts complete and the webhook
                runs, new enrollments will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

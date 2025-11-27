import Link from "next/link";
import { EmployerList } from "@/components/admin/EmployerList";

export const metadata = {
  title: "Employers | Admin | Elevate for Humanity",
  description:
    "Admin view of employer partners and interest, with quick access to proposal previews.",
};

export default function AdminEmployersPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin – Employers
          </p>
          <h1 className="mt-1 text-2xl font-bold">Employer Partners</h1>
          <p className="mt-2 text-xs text-slate-300">
            This page gives Elevate staff a quick view of employers that are
            part of (or interested in) your ecosystem, along with which
            programs, WEX/OJT, and apprenticeships they&apos;re open to.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/employers/intake"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              View Employer Intake Form
            </Link>
            <Link
              href="/admin/dashboard-enhanced"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <EmployerList />
        </div>
      </section>
    </main>
  );
}

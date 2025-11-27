import Link from "next/link";
import { notFound } from "next/navigation";
import { getEmployerById } from "@/lms-data/employers";
import { EmployerProposalPreview } from "@/components/admin/EmployerProposalPreview";

interface PageProps {
  params: { id: string };
}

export const metadata = {
  title: "Employer Proposal | Elevate for Humanity",
  description:
    "Admin view of a draft employer proposal aligned to programs and funding tools.",
};

export default function EmployerProposalPage({ params }: PageProps) {
  const employer = getEmployerById(params.id);

  if (!employer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Admin – Employer Proposal
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Proposal Draft for {employer.name}
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            This is a draft narrative you can copy into a Word doc, PDF, or
            email when sending a formal proposal to the employer. Edit and add
            details as needed.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <Link
              href="/admin/employers"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Back to Employers
            </Link>
            <Link
              href="/admin/funding-playbook"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              Open Funding Playbook
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <EmployerProposalPreview employer={employer} />
        </div>
      </section>
    </main>
  );
}

// app/admin/programs/page.tsx
import Link from "next/link";
import { getAllPrograms } from "@/lib/programs";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_DASHBOARD_PASSWORD;
const SUPABASE_PROGRAMS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL || "https://supabase.com/dashboard";

type AdminPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function AdminProgramsPage({ searchParams }: AdminPageProps) {
  const keyParam = searchParams?.key;
  const key = Array.isArray(keyParam) ? keyParam[0] : keyParam;

  if (ADMIN_PASSWORD && key !== ADMIN_PASSWORD) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-sm shadow-sm ring-1 ring-slate-200">
          <h1 className="text-lg font-semibold text-slate-900">
            Admin access required
          </h1>
          <p className="mt-2 text-slate-700">
            This page is protected. Add your admin key to the URL to view programs.
          </p>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-mono break-all">
              /admin/programs?key=YOUR_ADMIN_PASSWORD
            </p>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Set the <span className="font-mono">ADMIN_DASHBOARD_PASSWORD</span> environment
            variable in your project settings, then reload this page with the matching{" "}
            <span className="font-mono">?key=</span> value.
          </p>
        </div>
      </main>
    );
  }

  const programs = await getAllPrograms();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Programs (Admin View)</h1>
            <p className="mt-2 text-sm text-slate-700">
              This view is reading directly from Supabase (<span className="font-mono">public.programs</span>).
              Use it to verify that website content and database content stay in sync.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              href={SUPABASE_PROGRAMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Edit in Supabase →
            </Link>
            <p className="max-w-xs text-right text-[10px] text-slate-500">
              Set <span className="font-mono">NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL</span> to
              your Supabase table URL for a direct link.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        {programs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-700">No programs found in database.</p>
            <p className="mt-2 text-sm text-slate-500">
              Run the seed script to populate the programs table.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Slug</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Short description
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs.map((p) => (
                  <tr key={p.slug} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.slug}</td>
                    <td className="px-4 py-3 text-slate-900">{p.name}</td>
                    <td className="px-4 py-3 text-slate-700">{p.short_description}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          p.is_active
                            ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                            : "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20"
                        }`}
                      >
                        {p.is_active ? "Active" : "Inactive"}
                      </span>
                      {p.featured && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-600/20">
                          Featured
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

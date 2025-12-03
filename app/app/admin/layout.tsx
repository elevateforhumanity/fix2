// app/app/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside className="w-60 bg-slate-950 text-slate-100 border-r border-slate-800">
        <div className="px-4 py-4 font-semibold text-sm border-b border-slate-800">
          Elevate Admin
        </div>
        <nav className="mt-2 px-2 text-sm space-y-1">
          <Link href="/app/admin/dashboard" className="block px-2 py-2 rounded hover:bg-slate-800">
            Dashboard
          </Link>
          <Link href="/app/admin/users" className="block px-2 py-2 rounded hover:bg-slate-800">
            Users
          </Link>
          <Link href="/app/admin/entities" className="block px-2 py-2 rounded hover:bg-slate-800">
            Entities
          </Link>
          <div className="pt-4 pb-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Mini Apps
          </div>
          <Link href="/app/grants" className="block px-2 py-2 rounded hover:bg-slate-800">
            Grant Autopilot
          </Link>
          <Link href="/app/vita" className="block px-2 py-2 rounded hover:bg-slate-800">
            VITA / Tax
          </Link>
          <Link href="/app/supersonic" className="block px-2 py-2 rounded hover:bg-slate-800">
            SupersonicFastCash
          </Link>
          <Link href="/dashboard/contracts" className="block px-2 py-2 rounded hover:bg-slate-800">
            SAM.gov Contracts
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-900 text-slate-50">
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}

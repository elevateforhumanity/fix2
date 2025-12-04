// app/app/program-holder/layout.tsx
import Link from 'next/link';

export default function ProgramHolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/app/program-holder/dashboard" className="font-semibold text-emerald-600">
            Elevate Program Holder
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/app/program-holder/dashboard" className="hover:text-emerald-600">Dashboard</Link>
            <Link href="/app/program-holder/learners" className="hover:text-emerald-600">Learners</Link>
            <Link href="/app/program-holder/programs" className="hover:text-emerald-600">Programs</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
}

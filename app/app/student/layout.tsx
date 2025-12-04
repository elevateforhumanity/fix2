// app/app/student/layout.tsx
import Link from 'next/link';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/app/student/dashboard" className="font-semibold text-indigo-600">
            Elevate Student
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/app/student/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            <Link href="/app/student/courses" className="hover:text-indigo-600">My Courses</Link>
            <Link href="/app/student/certificates" className="hover:text-indigo-600">Certificates</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>
    </div>
  );
}

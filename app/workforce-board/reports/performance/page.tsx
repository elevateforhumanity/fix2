import Link from "next/link";

export default function PerformanceReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/workforce-board/reports" className="text-sky-600 hover:underline text-sm">
            ← Back to Reports
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Performance Reports
        </h1>
        <p className="text-slate-600 mb-8">
          WIOA performance metrics and outcomes.
        </p>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <p className="text-slate-600 text-center">
            Performance reporting coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

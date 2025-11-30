import Link from "next/link";

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/admin" className="text-sky-600 hover:underline text-sm">
            ← Back to Admin Dashboard
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 mb-8">
          Enrollment metrics, completion rates, and performance tracking.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Enrollments</p>
            <p className="text-3xl font-bold text-slate-900">0</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Active Students</p>
            <p className="text-3xl font-bold text-emerald-600">0</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Completions</p>
            <p className="text-3xl font-bold text-sky-600">0</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-slate-900">0%</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <p className="text-slate-600 text-center">
            Analytics integration coming soon. Connect to Supabase for real-time metrics.
          </p>
        </div>
      </div>
    </div>
  );
}

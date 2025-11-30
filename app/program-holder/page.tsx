import Link from "next/link";

export default function ProgramHolderPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Program Holder Portal
          </h1>
          <p className="text-slate-600 mb-6">
            Access your program management dashboard.
          </p>
          <Link
            href="/program-holder/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

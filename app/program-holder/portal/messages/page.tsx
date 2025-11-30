import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/program-holder/dashboard" className="text-sky-600 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Messages
        </h1>
        <p className="text-slate-600 mb-8">
          Communicate with students and staff.
        </p>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <p className="text-slate-600 text-center">
            Messaging system coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function AppHubPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">App Hub</h1>
        <p className="text-lg text-slate-600 mb-8">
          Access all your training tools, resources, and partner platforms in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/lms"
            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Go to LMS
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

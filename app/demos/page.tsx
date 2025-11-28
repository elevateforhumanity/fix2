import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Demos Coming Soon</h1>
        <p className="text-lg text-slate-600 mb-8">
          This feature is coming soon. We're working hard to bring you the best experience.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}

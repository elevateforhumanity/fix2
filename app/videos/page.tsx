import Link from 'next/link';

export const metadata = {
  title: 'Videos | Elevate for Humanity',
  description: 'Watch videos about our programs, success stories, and workforce training.',
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Videos</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link 
              href="/videos/elevate-overview"
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Elevate Overview
              </h2>
              <p className="text-slate-600">
                Learn about our mission and programs
              </p>
            </Link>

            <Link 
              href="/videos/barber-spotlight"
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Barber Spotlight
              </h2>
              <p className="text-slate-600">
                See our barber apprenticeship program in action
              </p>
            </Link>

            <Link 
              href="/videos/employer-pipeline"
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Employer Pipeline
              </h2>
              <p className="text-slate-600">
                How we connect employers with trained candidates
              </p>
            </Link>
          </div>

          <div className="mt-8">
            <Link 
              href="/programs"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

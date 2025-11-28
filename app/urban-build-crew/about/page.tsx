import Link from 'next/link';

export default function UrbanBuildCrewPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Urban Build Crew</h1>
        <p className="text-lg text-gray-600 mb-8">
          Construction and skilled trades training program.
        </p>
        <Link href="/urbanbuildcrew" className="text-red-600 hover:underline">
          ← Back to Urban Build Crew
        </Link>
      </div>
    </main>
  );
}

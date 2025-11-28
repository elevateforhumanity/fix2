import Link from 'next/link';

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Training Resources</h1>
        <p className="text-lg text-gray-600 mb-8">
          Access training materials and certification programs.
        </p>
        <Link href="/programs" className="text-red-600 hover:underline">
          ← Back to Programs
        </Link>
      </div>
    </main>
  );
}

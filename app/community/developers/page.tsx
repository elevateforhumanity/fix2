import Link from 'next/link';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Community</h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with other members of the Elevate for Humanity community.
        </p>
        <Link href="/community" className="text-red-600 hover:underline">
          ← Back to Community Hub
        </Link>
      </div>
    </main>
  );
}

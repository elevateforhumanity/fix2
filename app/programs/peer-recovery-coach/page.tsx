import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Peer Recovery Coach | Elevate for Humanity',
  description: '100% Free recovery coach training',
  keywords: ['Peer Recovery Coach Indianapolis', 'free Peer Recovery Coach training', 'WIOA Peer Recovery Coach', 'Peer Recovery Coach apprenticeship'],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/peer-recovery-coach',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Peer Recovery Coach
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          100% Free recovery coach training
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

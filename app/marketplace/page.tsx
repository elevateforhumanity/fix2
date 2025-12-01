import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketplace | Elevate For Humanity',
  description: 'Learn more about Marketplace inside the Elevate For Humanity workforce ecosystem.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-6">Marketplace | Elevate For Humanity</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Learn more about Marketplace inside the Elevate For Humanity workforce ecosystem.</p>
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-lg">Welcome to Marketplace | Elevate For Humanity.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p>Providing accessible career training.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
                <p>100% funded programs with job placement.</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/programs" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold mr-4">View Programs</Link>
              <Link href="/apply" className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
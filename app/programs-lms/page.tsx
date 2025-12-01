import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programs Lms | Elevate For Humanity',
  description: 'Learn more about Programs Lms inside the Elevate For Humanity workforce ecosystem.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Programs Lms | Elevate For Humanity</h1>
          <p className="text-xl mb-8">Learn more about Programs Lms inside the Elevate For Humanity workforce ecosystem.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/apply" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">Apply Now</Link>
            <Link href="/contact" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold border-2 border-white">Learn More</Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <ul className="space-y-3">
                <li className="flex"><span className="text-green-600 mr-2">✓</span>100% funded training</li>
                <li className="flex"><span className="text-green-600 mr-2">✓</span>Industry certification</li>
                <li className="flex"><span className="text-green-600 mr-2">✓</span>Job placement</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <dl className="space-y-4">
                <div><dt className="text-sm text-gray-600">Duration</dt><dd className="text-lg font-semibold">4-12 weeks</dd></div>
                <div><dt className="text-sm text-gray-600">Cost</dt><dd className="text-lg font-semibold text-green-600">$0</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
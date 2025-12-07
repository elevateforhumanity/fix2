import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/supersonic-cash",
  },
  title: 'Supersonic Cash Advance | Elevate for Humanity',
  description: 'Fast cash advance up to $3,500. Get approved in minutes.',
};

export default function SupersonicCashPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Supersonic Cash Advance</h1>
            <p className="text-xl mb-8 text-blue-100">
              Get up to $3,500 in minutes. No credit check required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600">Quick 2-minute application</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
              <p className="text-gray-600">Instant decision</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive Funds</h3>
              <p className="text-gray-600">Money in minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Apply now and get your cash advance in minutes.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-blue-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-blue-700"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}

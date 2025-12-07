import Link from 'next/link';

export default function SupersonicFastCashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-900">
          Supersonic Fast Cash
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Lightning-fast financial solutions for your immediate needs
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/supersonic-fast-cash/how-it-works" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-800">How It Works</h2>
            <p className="text-gray-600">Simple, fast, and secure process to get the cash you need in minutes.</p>
          </Link>

          <Link href="/supersonic-fast-cash/services" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Our Services</h2>
            <p className="text-gray-600">Explore our range of financial services designed for speed and convenience.</p>
          </Link>

          <Link href="/supersonic-fast-cash/apply" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Apply Now</h2>
            <p className="text-gray-600">Start now with your application and receive funds in as little as 24 hours.</p>
          </Link>
        </div>

        <div className="bg-green-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Supersonic Fast Cash?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold mb-2">⚡</div>
              <div className="text-xl font-bold mb-2">Lightning Fast</div>
              <div className="text-green-200">Approval in minutes, funds in 24 hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🔒</div>
              <div className="text-xl font-bold mb-2">100% Secure</div>
              <div className="text-green-200">Bank-level encryption and security</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">💯</div>
              <div className="text-xl font-bold mb-2">Transparent</div>
              <div className="text-green-200">No hidden fees, clear terms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

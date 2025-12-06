import Link from 'next/link';

export default function RISEFoundationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-900">
          RISE Foundation
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Empowering communities through education, innovation, and sustainable development
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/rise-foundation/about" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">About Us</h2>
            <p className="text-gray-600">Learn about our mission, vision, and the impact we're making in communities worldwide.</p>
          </Link>

          <Link href="/rise-foundation/programs" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Programs</h2>
            <p className="text-gray-600">Explore our educational programs and community development initiatives.</p>
          </Link>

          <Link href="/rise-foundation/get-involved" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Get Involved</h2>
            <p className="text-gray-600">Join us in making a difference through volunteering, donations, or partnerships.</p>
          </Link>
        </div>

        <div className="bg-blue-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Students Educated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Communities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Partner Organizations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

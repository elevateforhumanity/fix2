import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Create | Elevate For Humanity',
  description: 'Learn more about Create inside the Elevate For Humanity workforce ecosystem.',
};

export default function CreateProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Create | Elevate For Humanity
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Learn more about Create inside the Elevate For Humanity workforce ecosystem.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Apply Now
              </Link>
              <Link 
                href="/contact" 
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition border-2 border-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our create program provides hands-on training and certification 
                    to prepare you for a successful career.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>100% government-funded training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Industry-recognized certification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Job placement assistance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Flexible scheduling options</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-600">Duration</dt>
                    <dd className="text-lg font-semibold">4-12 weeks</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Cost</dt>
                    <dd className="text-lg font-semibold text-green-600">$0 (Fully Funded)</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Format</dt>
                    <dd className="text-lg font-semibold">In-person & Online</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Certification</dt>
                    <dd className="text-lg font-semibold">Industry-Recognized</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Career?</h2>
              <p className="text-gray-700 mb-6">
                Join thousands of students who have transformed their lives through our programs.
              </p>
              <Link 
                href="/apply" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Apply Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

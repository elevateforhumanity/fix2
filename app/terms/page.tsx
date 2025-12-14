import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/terms",
  },
  title: 'Terms of Use | Elevate For Humanity',
  description: 'Terms of Use for Elevate for Humanity platform and services',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Use</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 mb-8">
            Last Updated: December 14, 2024
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Platform Ownership</h2>
            <p className="text-slate-700 leading-relaxed">
              All content, systems, workflows, and instructional materials on this platform are owned and operated by Elevate for Humanity unless otherwise stated. Unauthorized use, reproduction, or representation of this platform or its components is prohibited. Access to the platform does not grant ownership or licensing rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Proprietary Systems</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              This website, platform, and all associated training systems, workflows, and instructional materials are proprietary to Elevate for Humanity. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Platform infrastructure and software systems</li>
              <li>Training program structures and curricula</li>
              <li>Enrollment and compliance workflows</li>
              <li>Partner integration systems</li>
              <li>Student management and tracking systems</li>
              <li>All instructional content and materials</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Access and Use</h2>
            <p className="text-slate-700 leading-relaxed">
              Access to this platform is limited to authorized participants. By using this platform, you agree to use it only for its intended purpose of workforce training and career development. You may not:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
              <li>Copy, reproduce, or distribute platform content without authorization</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use automated tools to scrape or harvest data</li>
              <li>Represent yourself as affiliated with Elevate for Humanity without authorization</li>
              <li>Use the platform for any unlawful purpose</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed">
              All intellectual property rights in the platform, including copyrights, trademarks, trade secrets, and patents, are owned by Elevate for Humanity or its licensors. The Elevate for Humanity name, logo, and all related marks are trademarks of Elevate for Humanity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Accounts</h2>
            <p className="text-slate-700 leading-relaxed">
              If you create an account on this platform, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Your use of the platform is also governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. By using the platform, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-slate-700 leading-relaxed">
              The platform is provided "as is" without warranties of any kind, either express or implied. Elevate for Humanity does not warrant that the platform will be uninterrupted or error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed">
              To the fullest extent permitted by law, Elevate for Humanity shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms of Use are governed by the laws of the State of Indiana, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have questions about these Terms of Use, please contact us:
            </p>
            <div className="mt-4 text-slate-700">
              <p><strong>Elevate for Humanity</strong></p>
              <p>8888 Keystone Crossing, Suite 1300</p>
              <p>Indianapolis, IN 46240</p>
              <p>Email: <a href="mailto:info@elevateforhumanity.org" className="text-blue-600 hover:underline">info@elevateforhumanity.org</a></p>
              <p>Phone: <a href="tel:317-314-3757" className="text-blue-600 hover:underline">317-314-3757</a></p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Elevate for Humanity is a workforce development program of SELFISH INC, a 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline font-semibold"
          >
            Privacy Policy
          </Link>
          <Link
            href="/refund-policy"
            className="text-blue-600 hover:underline font-semibold"
          >
            Refund Policy
          </Link>
          <Link
            href="/accessibility"
            className="text-blue-600 hover:underline font-semibold"
          >
            Accessibility
          </Link>
        </div>
      </div>
    </main>
  );
}
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Terms</h2>
                <p className="text-gray-700 mb-6">Explore Terms and discover opportunities for career growth and development.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% free training programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Industry-standard certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career support and job placement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Terms"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Learn</h3>
                <p className="text-gray-600">Access quality training programs</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Certify</h3>
                <p className="text-gray-600">Earn industry certifications</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Work</h3>
                <p className="text-gray-600">Get hired in your field</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands who have launched successful careers through our programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

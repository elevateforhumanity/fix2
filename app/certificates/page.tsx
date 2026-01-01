import { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle, Shield, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificates & Credentials | Elevate for Humanity',
  description:
    'Earn industry-recognized certificates and credentials. Verify certificates and view our accredited programs.',
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Certificates & Credentials
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Earn industry-recognized certificates that employers trust and
              value.
            </p>
          </div>
        </div>
      </section>

      {/* Verify Certificate */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-black mb-4">
              Verify a Certificate
            </h2>
            <p className="text-lg text-black mb-8">
              Enter a certificate ID to verify its authenticity and view
              details.
            </p>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g., EFH-2024-12345)"
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl text-black focus:border-blue-600 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
                <Search className="h-5 w-5" />
                Verify
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black mb-6">
              Certificates We Offer
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              All certificates are industry-recognized and accepted by employers
              nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Healthcare Certifications',
                items: [
                  'Certified Nursing Assistant (CNA)',
                  'Certified Medical Assistant',
                  'Certified Phlebotomy Technician',
                  'Home Health Aide',
                ],
              },
              {
                title: 'Skilled Trades Certifications',
                items: [
                  'EPA 608 Certification',
                  'AWS Welding Certification',
                  'OSHA 10-Hour Safety',
                  'Forklift Operator',
                ],
              },
              {
                title: 'Transportation Certifications',
                items: [
                  'CDL Class A',
                  'CDL Class B',
                  'Passenger Endorsement',
                  'Hazmat Endorsement',
                ],
              },
              {
                title: 'Technology Certifications',
                items: [
                  'CompTIA A+',
                  'CompTIA Network+',
                  'CompTIA Security+',
                  'Microsoft Office Specialist',
                ],
              },
              {
                title: 'Business Certifications',
                items: [
                  'QuickBooks Certified User',
                  'Customer Service Professional',
                  'Office Administration',
                  'Bookkeeping',
                ],
              },
              {
                title: 'Food Service Certifications',
                items: [
                  'ServSafe Food Handler',
                  'ServSafe Manager',
                  'Alcohol Server Training',
                  'Food Safety Manager',
                ],
              },
            ].map((category) => (
              <div
                key={category.title}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-black text-black mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black mb-6">
              Why Our Certificates Matter
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Industry Recognized
              </h3>
              <p className="text-black">
                Accepted by employers nationwide and meet industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Verified & Secure
              </h3>
              <p className="text-black">
                Digital verification system prevents fraud and ensures
                authenticity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Career Advancement
              </h3>
              <p className="text-black">
                Boost your resume and qualify for higher-paying positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
            Ready to Earn Your Certificate?
          </h2>
          <p className="text-xl text-black mb-8">
            Apply today and start your journey to a certified career.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-colors"
          >
            Apply Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
}

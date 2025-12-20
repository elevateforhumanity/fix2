import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'People behind the work. Meet the team powering workforce development and community impact.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Our Team"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            People behind the work
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Elevate for Humanity is powered by professionals across workforce
              development, education, compliance, technology, and community
              advocacy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our team includes:
            </h2>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Workforce and training coordinators</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Program and compliance specialists</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Employer and partner liaisons</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Advisors and support staff</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Technology and operations professionals</span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 my-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Together, we ensure programs are delivered responsibly, funding
                requirements are met, and individuals receive consistent support
                throughout their journey.
              </p>
            </div>

            <blockquote className="text-xl font-semibold text-gray-900 italic border-l-4 border-brand-blue-600 pl-6 my-8">
              We believe systems should work for people — and our team exists to
              make that real.
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work With Us</h2>
          <p className="text-xl text-blue-100 mb-8">
            Interested in partnering or joining our team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg text-lg font-bold hover:bg-blue-900 border-2 border-white transition-colors"
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

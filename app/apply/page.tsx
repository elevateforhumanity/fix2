import type { Metadata } from 'next';
import ApplyFormClient from './ApplyFormClient';

export const metadata: Metadata = {
  title: 'Apply Now - 100% Free Career Training | Elevate for Humanity',
  description:
    'Start your career journey with 100% free training in healthcare, trades, and technology. No tuition, no debt. WIOA-funded programs in Indianapolis, Indiana.',
  keywords: [
    'apply',
    'free training',
    'WIOA',
    'career training',
    'Indianapolis',
    'Indiana',
    'job training application',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply',
  },
  openGraph: {
    title: 'Apply for Free Career Training - Elevate for Humanity',
    description:
      '100% FREE career training through WIOA funding. No tuition, no debt. Real jobs waiting in Indianapolis.',
    url: 'https://www.elevateforhumanity.org/apply',
    type: 'website',
    images: [
      {
        url: '/images/heroes/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply for free career training',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Start Your Career Journey
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Free training, real jobs, and support every step of the way
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-bold mb-3">What happens after you apply:</h2>
            <ol className="space-y-2 text-white/90">
              <li className="flex items-start gap-3">
                <span className="font-bold text-orange-500">1.</span>
                <span>We review your application (usually within 24 hours)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-orange-500">2.</span>
                <span>An advisor contacts you to schedule a meeting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-orange-500">3.</span>
                <span>We discuss your goals, barriers, and funding options</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-orange-500">4.</span>
                <span>We match you to the right program and help with enrollment</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Application Form</h2>
            <ApplyFormClient />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-700 text-sm mb-2">Monday-Friday, 9am-5pm</p>
              <a href="tel:+13175551234" className="text-blue-600 hover:underline">
                (317) 555-1234
              </a>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-700 text-sm mb-2">We respond within 24 hours</p>
              <a href="mailto:apply@elevateforhumanity.org" className="text-blue-600 hover:underline">
                apply@elevateforhumanity.org
              </a>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-700 text-sm mb-2">By appointment only</p>
              <a href="/contact" className="text-blue-600 hover:underline">
                Schedule a Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

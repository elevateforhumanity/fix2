import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Get Started Today | Elevate for Humanity',
  description:
    'Connect with Elevate for Humanity. Students, employers, training providers, and workforce boards - find the right contact for your needs. Call 317-314-3757.',
  keywords: [
    'contact',
    'Indianapolis',
    'workforce training',
    'career services',
    'WIOA',
    'training providers',
    'employers',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/contact',
  },
  openGraph: {
    title: 'Contact Elevate for Humanity',
    description:
      'Connect with us for free career training, employer partnerships, or platform licensing. Multiple ways to get in touch.',
    url: 'https://www.elevateforhumanity.org/contact',
    type: 'website',
    images: [
      {
        url: '/images/facilities-new/facility-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Elevate for Humanity',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-white/90">
            We're here to help you take the next step in your career journey
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* For Students */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">For Students</h3>
              <p className="text-gray-700 mb-4">Questions about programs, applications, or enrollment</p>
              <a href="tel:+13175551234" className="text-blue-600 hover:underline font-semibold">
                (317) 314-3757
              </a>
              <p className="text-sm text-gray-600 mt-2">Monday-Friday, 9am-5pm</p>
            </div>

            {/* For Employers */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">For Employers</h3>
              <p className="text-gray-700 mb-4">Hiring partnerships, apprenticeships, and training</p>
              <a href="mailto:employers@elevateforhumanity.org" className="text-blue-600 hover:underline font-semibold">
                employers@elevateforhumanity.org
              </a>
              <p className="text-sm text-gray-600 mt-2">We respond within 24 hours</p>
            </div>

            {/* For Partners */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">For Partners</h3>
              <p className="text-gray-700 mb-4">Workforce boards, funders, and training providers</p>
              <a href="mailto:partners@elevateforhumanity.org" className="text-blue-600 hover:underline font-semibold">
                partners@elevateforhumanity.org
              </a>
              <p className="text-sm text-gray-600 mt-2">We respond within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Send Us a Message</h2>
            <ContactClient />
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Our Location</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Elevate for Humanity</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  8888 Keystone Crossing, Suite 1300
                </p>
                <p className="text-gray-700 mb-4">
                  Indianapolis, IN 46240
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Visits by appointment only. Please call or email to schedule.
                </p>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Office Hours</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="text-gray-900 font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="text-gray-900 font-semibold">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="text-gray-900 font-semibold">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Response Time:</strong> We typically respond to emails and voicemails within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

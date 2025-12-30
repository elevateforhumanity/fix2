import type { Metadata } from 'next';
import Image from 'next/image';
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
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/facilities-new/facility-exterior.jpg"
          alt="Contact Elevate For Humanity"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-white">
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
                <svg
                  className="w-8 h-8 text-brand-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                For Students
              </h3>
              <p className="text-gray-700 mb-4">
                Questions about programs, applications, or enrollment
              </p>
              <a
                href="tel:+13175551234"
                className="text-brand-blue-600 hover:underline font-semibold"
              >
                (317) 314-3757
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Monday-Friday, 9am-5pm
              </p>
            </div>

            {/* For Employers */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                For Employers
              </h3>
              <p className="text-gray-700 mb-4">
                Hiring partnerships, apprenticeships, and training
              </p>
              <a
                href="mailto:employers@elevateforhumanity.org"
                className="text-brand-blue-600 hover:underline font-semibold"
              >
                employers@elevateforhumanity.org
              </a>
              <p className="text-sm text-gray-600 mt-2">
                We respond within 24 hours
              </p>
            </div>

            {/* For Partners */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                For Partners
              </h3>
              <p className="text-gray-700 mb-4">
                Workforce boards, funders, and training providers
              </p>
              <a
                href="mailto:partners@elevateforhumanity.org"
                className="text-brand-blue-600 hover:underline font-semibold"
              >
                partners@elevateforhumanity.org
              </a>
              <p className="text-sm text-gray-600 mt-2">
                We respond within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Send Us a Message
            </h2>
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
              <h2 className="text-2xl font-bold text-black mb-4">
                Our Location
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Elevate for Humanity</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  8888 Keystone Crossing, Suite 1300
                </p>
                <p className="text-gray-700 mb-4">Indianapolis, IN 46240</p>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Visits by appointment only. Please call
                  or email to schedule.
                </p>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Office Hours
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="text-gray-900 font-semibold">
                      9:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="text-gray-900 font-semibold">
                      By Appointment
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="text-gray-900 font-semibold">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Response Time:</strong> We typically respond to emails
                  and voicemails within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-700">
              7009 East 56th Street, Suite EE1, Indianapolis, IN 46226
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-[400px] flex items-center justify-center">
            <div className="text-center p-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-600 mb-4">
                Interactive map coming soon
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=7009+East+56th+Street+Indianapolis+IN+46226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Easy to Find</h3>
              <p className="text-gray-700">
                Located on East 56th Street with ample parking available
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Flexible Hours</h3>
              <p className="text-gray-700">
                Open Monday-Friday with Saturday appointments available
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Quick Response</h3>
              <p className="text-gray-700">
                We respond to all inquiries within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                What are your office hours?
              </h3>
              <p className="text-gray-700">
                We're open Monday through Friday from 9:00 AM to 5:00 PM. Saturday appointments are available by request. We're closed on Sundays and major holidays.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Do I need an appointment?
              </h3>
              <p className="text-gray-700">
                Walk-ins are welcome during office hours, but we recommend scheduling an appointment to ensure we can give you our full attention and minimize wait times.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                How quickly will I get a response?
              </h3>
              <p className="text-gray-700">
                We typically respond to emails and voicemails within 24 hours during business days. For urgent matters, please call us directly at (317) 314-3757.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Is parking available?
              </h3>
              <p className="text-gray-700">
                Yes! We have ample free parking available on-site. Look for visitor parking signs when you arrive.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Can I visit without an appointment?
              </h3>
              <p className="text-gray-700">
                Absolutely! Walk-ins are welcome during our regular office hours. However, scheduling an appointment ensures you'll have dedicated time with our team.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Do you offer virtual consultations?
              </h3>
              <p className="text-gray-700">
                Yes! We offer phone and video consultations for your convenience. Let us know your preference when you schedule your appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8">
            Contact us today to learn more about our programs and how we can help you achieve your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              📞 Call (317) 314-3757
            </a>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="inline-block px-10 py-4 bg-blue-700 text-white rounded-lg text-lg font-bold hover:bg-blue-800 transition-colors shadow-xl border-2 border-white"
            >
              ✉️ Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

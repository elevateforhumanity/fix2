import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/accessibility",
  },
  title: 'Accessibility Statement | Elevate For Humanity',
  description: 'Elevate For Humanity is committed to ensuring digital accessibility for people with disabilities.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - No Gradient, No Image, No CTAs */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-slate-300">
            Our Commitment to Digital Accessibility
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Commitment</h2>
            <p className="text-slate-700 mb-6">
              Elevate For Humanity is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Conformance Status</h2>
            <p className="text-slate-700 mb-6">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Accessibility Features</h2>
            <p className="text-slate-700 mb-4">
              Our website includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Clear and consistent navigation throughout the site</li>
              <li>Alternative text for images</li>
              <li>Keyboard navigation support</li>
              <li>Readable fonts and appropriate color contrast</li>
              <li>Descriptive page titles and headings</li>
              <li>Form labels and error messages</li>
              <li>Skip navigation links</li>
              <li>Responsive design for various devices and screen sizes</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Assistive Technology Compatibility</h2>
            <p className="text-slate-700 mb-4">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Physical Accessibility</h2>
            <p className="text-slate-700 mb-4">
              Our training facilities are designed to be accessible to all students:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Wheelchair accessible entrances and facilities</li>
              <li>Accessible parking spaces</li>
              <li>Accessible restrooms</li>
              <li>Elevators and ramps where needed</li>
              <li>Assistive listening devices available upon request</li>
              <li>Service animals welcome</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Accommodations for Students</h2>
            <p className="text-slate-700 mb-4">
              We provide reasonable accommodations for students with disabilities, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Extended time for tests and assignments</li>
              <li>Alternative format materials</li>
              <li>Note-taking assistance</li>
              <li>Sign language interpreters</li>
              <li>Adaptive equipment and technology</li>
              <li>Flexible attendance policies when medically necessary</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Ongoing Efforts</h2>
            <p className="text-slate-700 mb-6">
              We are continuously working to improve the accessibility of our website and services. 
              Our efforts include regular accessibility audits, staff training, and updates to our digital platforms.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Feedback</h2>
            <p className="text-slate-700 mb-4">
              We welcome your feedback on the accessibility of our website and services. 
              If you encounter any accessibility barriers, please let us know:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="text-slate-700 mb-2">
                <strong>Elevate For Humanity</strong>
              </p>
              <p className="text-slate-700 mb-2">
                Phone: <a href="tel:317-314-3757" className="text-blue-600 hover:underline">317-314-3757</a>
              </p>
              <p className="text-slate-700 mb-2">
                Email: <a href="mailto:accessibility@elevateforhumanity.org" className="text-blue-600 hover:underline">accessibility@elevateforhumanity.org</a>
              </p>
              <p className="text-slate-700">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Third-Party Content</h2>
            <p className="text-slate-700 mb-6">
              Some content on our website may be provided by third parties. While we strive to ensure all content is accessible, 
              we may not have full control over third-party materials. We are working with our partners to improve accessibility across all platforms.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Last Updated</h2>
            <p className="text-slate-700 mb-8">
              This accessibility statement was last updated on December 8, 2024.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-slate-700 mb-4">
                <strong>Related Resources:</strong>
              </p>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Contact Us →
                </Link>
                <Link
                  href="/privacy"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Privacy Policy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

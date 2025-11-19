import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Elevate for Humanity',
  description: 'Our commitment to digital accessibility for all users',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Accessibility Statement
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Elevate for Humanity is committed to ensuring digital accessibility
              for people with disabilities. We are continually improving the user
              experience for everyone and applying the relevant accessibility
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Conformance Status
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG)
              2.1 Level AA standards. These guidelines explain how to make web
              content more accessible for people with disabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Accessibility Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Alternative text for images</li>
              <li>Clear and consistent navigation</li>
              <li>Sufficient color contrast</li>
              <li>Resizable text without loss of functionality</li>
              <li>Accessible forms with clear labels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Feedback
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our platform. If you
              encounter any accessibility barriers, please contact us:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:accessibility@elevateforhumanity.org"
                  className="text-red-600 hover:underline"
                >
                  accessibility@elevateforhumanity.org
                </a>
              </p>
              <p className="text-slate-700 mt-2">
                <strong>Phone:</strong> (317) 555-0100
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-slate-700 leading-relaxed">
              This website is built using modern web technologies including HTML5,
              CSS3, and JavaScript. We test our platform with various assistive
              technologies including screen readers, keyboard navigation, and voice
              control software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Limitations and Alternatives
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Despite our best efforts, some content may not yet be fully
              accessible. We are actively working to increase accessibility and
              usability. If you need assistance accessing any content, please
              contact us and we will provide alternative formats.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

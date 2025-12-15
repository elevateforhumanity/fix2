import { Metadata } from 'next';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/privacy',
  },
  title: 'Privacy Policy | Elevate For Humanity',
  description:
    'Learn how Elevate For Humanity collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, No Gradient, No Image, No CTAs */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Last Updated: December 8, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Our Commitment to Privacy
            </h2>
            <p className="text-slate-700 mb-6">
              Elevate For Humanity is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Information We Collect
            </h2>

            <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-4 mt-8">
              Personal Information
            </h3>
            <p className="text-slate-700 mb-4">
              We collect personal information that you voluntarily provide when
              you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Apply for training programs</li>
              <li>Register for an account</li>
              <li>Contact us for information</li>
              <li>Use our tax preparation services</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="text-slate-700 mb-6">
              This may include: name, email address, phone number, mailing
              address, date of birth, Social Security number (for tax services),
              employment history, and educational background.
            </p>

            <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-4 mt-8">
              Automatically Collected Information
            </h3>
            <p className="text-slate-700 mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              How We Use Your Information
            </h2>
            <p className="text-slate-700 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Process your applications and enrollments</li>
              <li>Provide training and educational services</li>
              <li>Prepare tax returns and provide financial services</li>
              <li>Communicate with you about programs and services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations and reporting requirements</li>
              <li>
                Send newsletters and promotional materials (with your consent)
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Information Sharing
            </h2>
            <p className="text-slate-700 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>
                <strong>Government Agencies:</strong> Required for grant funding
                and compliance (WIOA, WRG, etc.)
              </li>
              <li>
                <strong>Educational Partners:</strong> Training providers and
                certification bodies
              </li>
              <li>
                <strong>Employers:</strong> With your consent, for job placement
                services
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties who assist
                with our operations
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
            </ul>
            <p className="text-slate-700 mb-6">
              We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Data Security
            </h2>
            <p className="text-slate-700 mb-4">
              We implement security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Secure servers and databases</li>
              <li>Limited access to personal information</li>
              <li>Regular security audits</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-slate-700 mb-6">
              However, no method of transmission over the internet is 100%
              secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Your Rights
            </h2>
            <p className="text-slate-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>
                Request deletion of your information (subject to legal
                requirements)
              </li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Cookies and Tracking
            </h2>
            <p className="text-slate-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-slate-700 mb-6">
              You can control cookies through your browser settings. See our{' '}
              <Link href="/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </Link>{' '}
              for more information.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Children's Privacy
            </h2>
            <p className="text-slate-700 mb-6">
              Our services are not directed to children under 13. We do not
              knowingly collect information from children under 13. If you
              believe we have collected information from a child under 13,
              please contact us immediately.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Third-Party Links
            </h2>
            <p className="text-slate-700 mb-6">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to read their privacy policies.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Data Retention
            </h2>
            <p className="text-slate-700 mb-6">
              We retain your information for as long as necessary to provide
              services and comply with legal obligations. Student records are
              maintained according to federal and state education regulations.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Changes to This Policy
            </h2>
            <p className="text-slate-700 mb-6">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated date. We encourage you to
              review this policy periodically.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              Contact Us
            </h2>
            <p className="text-slate-700 mb-4">
              For questions about this Privacy Policy or to exercise your
              rights:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="text-slate-700 mb-2">
                <strong>Elevate For Humanity</strong>
              </p>
              <p className="text-slate-700 mb-2">
                Phone:{' '}
                <a
                  href="tel:317-314-3757"
                  className="text-blue-600 hover:underline"
                >
                  317-314-3757
                </a>
              </p>
              <p className="text-slate-700">
                Email:{' '}
                <a
                  href="mailto:privacy@elevateforhumanity.org"
                  className="text-blue-600 hover:underline"
                >
                  privacy@elevateforhumanity.org
                </a>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-slate-700 mb-4">
                <strong>Related Policies:</strong>
              </p>
              <div className="space-y-2">
                <Link
                  href="/terms"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Terms of Service →
                </Link>
                <Link
                  href="/cookies"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Cookie Policy →
                </Link>
                <Link
                  href="/accessibility"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Accessibility Statement →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

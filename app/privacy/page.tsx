import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Elevate for Humanity',
  description:
    'Our commitment to protecting your privacy and personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-sm text-slate-600 mb-8">
            Last Updated: January 1, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-700 mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Create an account or apply for programs</li>
              <li>Submit applications or forms</li>
              <li>Communicate with us</li>
              <li>Participate in training programs</li>
            </ul>
            <p className="text-slate-700 mt-4">
              This may include: name, email address, phone number, date of
              birth, address, employment history, education history, and program
              preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Process your applications and enrollments</li>
              <li>Provide training and educational services</li>
              <li>Communicate with you about programs and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and user experience</li>
              <li>Report to funding agencies (WIOA, WRG, etc.)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-slate-700 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Funding agencies and workforce development boards</li>
              <li>Educational partners and training providers</li>
              <li>Employers (with your consent)</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p className="text-slate-700 mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-slate-700">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption,
              access controls, and regular security assessments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-slate-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>
                Request deletion of your information (subject to legal
                requirements)
              </li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-slate-700">
              We retain your information for as long as necessary to provide
              services and comply with legal obligations. Student records are
              typically retained for 7 years after program completion as
              required by funding agencies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-slate-700">
              We use cookies and similar technologies to improve user
              experience, analyze usage, and provide personalized content. You
              can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-slate-700">
              Our services are not directed to individuals under 18. We do not
              knowingly collect personal information from children without
              parental consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-slate-700">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes by email or through our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-slate-700 mb-4">
              If you have questions about this Privacy Policy or our data
              practices, contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-700 mb-2">
                <strong>Email:</strong> privacy@elevateforhumanity.org
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Phone:</strong> 317-314-3757
              </p>
              <p className="text-slate-700">
                <strong>Address:</strong> Indianapolis, IN
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

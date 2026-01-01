import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Elevate for Humanity',
  description: 'Terms and conditions for using our platform and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-sm text-slate-600 mb-8">
            Last Updated: January 1, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-700">
              By accessing or using Elevate for Humanity's platform and
              services, you agree to be bound by these Terms of Service. If you
              do not agree to these terms, do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Eligibility
            </h2>
            <p className="text-slate-700 mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Be at least 18 years old or have parental consent</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-slate-700 mb-4">
              When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide accurate, current information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Program Enrollment
            </h2>
            <p className="text-slate-700 mb-4">
              Enrollment in training programs is subject to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Eligibility requirements and funding availability</li>
              <li>Completion of application and verification processes</li>
              <li>Acceptance of program-specific terms and conditions</li>
              <li>Attendance and participation requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. User Conduct
            </h2>
            <p className="text-slate-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Harass, threaten, or harm others</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with platform operations</li>
              <li>Attempt unauthorized access to systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-slate-700">
              All content, materials, and intellectual property on our platform
              are owned by Elevate for Humanity or licensed to us. You may not
              copy, modify, distribute, or create derivative works without our
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Termination
            </h2>
            <p className="text-slate-700">
              We reserve the right to suspend or terminate your account and
              access to services at any time for violations of these terms,
              fraudulent activity, or other reasons at our discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Disclaimers
            </h2>
            <p className="text-slate-700 mb-4">
              Our services are provided "as is" without warranties of any kind.
              We do not guarantee:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Employment outcomes or job placement</li>
              <li>Specific program availability or funding</li>
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of third-party content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-slate-700">
              To the maximum extent permitted by law, Elevate for Humanity shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Governing Law
            </h2>
            <p className="text-slate-700">
              These Terms are governed by the laws of the State of Indiana,
              United States, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-slate-700">
              We may modify these Terms at any time. Continued use of our
              services after changes constitutes acceptance of the modified
              terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Contact Information
            </h2>
            <p className="text-slate-700 mb-4">
              For questions about these Terms of Service, contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-700 mb-2">
                <strong>Email:</strong> legal@elevateforhumanity.org
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

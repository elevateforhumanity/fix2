import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Elevate for Humanity',
  description: 'Terms and conditions for using Elevate for Humanity services',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate Connects Directory
            </span>
          </div>
        </div>
        <Link href="/" className="elevate-btn-secondary">
          Back to Home
        </Link>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="elevate-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">Last updated: November 2024</p>
        </div>
      </section>

      {/* Content */}
      <main className="elevate-container py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Elevate for Humanity services, including
              our website, learning management system (LMS), and training
              programs, you accept and agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our
              services.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Use of Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are provided for educational and workforce
              development purposes. You agree to use them responsibly and in
              accordance with all applicable laws.
            </p>
            <p className="text-gray-700 leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Use our services for any unlawful purpose</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Upload malicious code or content</li>
            </ul>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You must notify us immediately of any unauthorized use of
              your account.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. WIOA Eligibility and Enrollment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Participation in WIOA-funded programs requires meeting eligibility
              criteria as determined by local workforce boards. Eligibility is
              subject to verification and may change based on funding
              availability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Students enrolled in WIOA-funded programs must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Provide accurate eligibility information</li>
              <li>Maintain satisfactory progress in their program</li>
              <li>Comply with attendance requirements</li>
              <li>Participate in required assessments and reporting</li>
            </ul>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Program Completion and Certification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Completion of training programs does not guarantee employment or
              certification. Industry certifications may require passing
              external exams administered by third-party organizations. Job
              placement assistance is provided but employment is not guaranteed.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content, materials, and resources provided through our
              services are protected by copyright and other intellectual
              property laws. You may not reproduce, distribute, or create
              derivative works without our express written permission.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of our services is also governed by our Privacy Policy.
              We collect and use personal information as described in our
              Privacy Policy, including information required for WIOA reporting
              and compliance.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Elevate for Humanity provides services "as is" without warranties
              of any kind. We are not liable for any indirect, incidental, or
              consequential damages arising from your use of our services.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting. Your continued
              use of our services after changes are posted constitutes
              acceptance of the modified terms.
            </p>
          </div>

          <div className="elevate-card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, please contact us
              through our website contact form or reach out to your case
              manager.
            </p>
          </div>

          {/* CTA */}
          <div className="elevate-card bg-gradient-to-br from-red-50 to-orange-50 text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 mb-6">
              By enrolling in our programs, you agree to these terms and our
              commitment to your success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/enroll" className="elevate-btn-primary">
                Check Your Eligibility
              </Link>
              <Link href="/privacy-policy" className="elevate-btn-secondary">
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

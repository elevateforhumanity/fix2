export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Elevate for Humanity's services, you accept and agree to be bound by these Terms of Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility</h2>
          <p className="text-gray-700 mb-4">
            You must be at least 18 years old and meet program-specific eligibility requirements to enroll in our training programs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Program Enrollment</h2>
          <p className="text-gray-700 mb-4">
            Enrollment in programs is subject to availability and funding approval. We reserve the right to deny enrollment for any reason.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Student Conduct</h2>
          <p className="text-gray-700 mb-4">
            Students are expected to maintain professional conduct, attend classes regularly, and complete assignments on time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            All course materials, content, and resources are the property of Elevate for Humanity and may not be reproduced without permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            Elevate for Humanity is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            For questions about these Terms of Service, contact us at:
            <br />
            Email: legal@elevateforhumanity.org
            <br />
            Phone: (317) 555-1234
          </p>
        </div>
      </div>
    </div>
  );
}

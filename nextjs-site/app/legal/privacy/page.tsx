export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us when you create an
            account, enroll in programs, or contact us.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to provide, maintain, and improve
            our services, process your enrollment, and communicate with you.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share your
            information with service providers, funding agencies (WIOA/WRG), and
            as required by law.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, correct, or delete your personal
            information. Contact us to exercise these rights.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            6. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy, please contact us
            at:
            <br />
            Email: privacy@elevateforhumanity.org
            <br />
            Phone: (317) 555-1234
          </p>
        </div>
      </div>
    </div>
  );
}

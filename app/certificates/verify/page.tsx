import { Metadata } from 'next';
import CertificateVerificationForm from './CertificateVerificationForm';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/certificates/verify",
  },
  title: 'Verify Certificate | Elevate For Humanity',
  description: 'Verify the authenticity of certificates issued by Elevate For Humanity',
};

export default function CertificateVerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Verify Certificate</h1>
            <p className="text-xl text-blue-100">
              Enter a certificate number to verify its authenticity
            </p>
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <CertificateVerificationForm />

            {/* Information Section */}
            <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6">About Certificate Verification</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What is a Certificate Number?</h3>
                  <p className="text-sm">
                    Each certificate issued by Elevate For Humanity has a unique certificate number
                    in the format: <code className="bg-gray-100 px-2 py-1 rounded">EFH-YYYY-XXXXXXXX</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Where to Find It?</h3>
                  <p className="text-sm">
                    The certificate number is displayed prominently on the certificate document,
                    usually at the top or bottom of the certificate.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">What Information Will I See?</h3>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Student/recipient name</li>
                    <li>Course or program name</li>
                    <li>Completion date</li>
                    <li>Issue date</li>
                    <li>Certificate type</li>
                    <li>Verification status</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Is Verification Logged?</h3>
                  <p className="text-sm">
                    Yes, all verification attempts are logged for security purposes. This helps
                    us maintain the integrity of our certification system.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-900 font-semibold mb-2">Need Help?</p>
              <p className="text-blue-800 text-sm mb-4">
                If you have questions about certificate verification, please contact us.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
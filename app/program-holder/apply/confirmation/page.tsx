import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Mail, Phone, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Received | Elevate for Humanity',
  description: 'Your program holder application has been received.',
};

export default function ProgramHolderApplicationConfirmation({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const applicationId = searchParams.id;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for your interest in becoming a program holder with
            Elevate for Humanity.
          </p>

          {applicationId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">
                Application Reference Number
              </p>
              <p className="text-lg font-mono font-semibold text-gray-900">
                {applicationId.slice(0, 8).toUpperCase()}
              </p>
            </div>
          )}

          {/* What Happens Next */}
          <div className="text-left mt-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What Happens Next
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Application Review
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our team will review your application within 2-3 business
                    days. We'll verify your organization details and program
                    capacity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Initial Contact
                  </h3>
                  <p className="text-sm text-gray-600">
                    We'll reach out via email or phone to discuss your
                    application, answer questions, and schedule a partnership
                    meeting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Partnership Agreement
                  </h3>
                  <p className="text-sm text-gray-600">
                    If approved, we'll send you a Memorandum of Understanding
                    (MOU) to review and sign. This outlines the partnership
                    terms and expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Portal Access
                  </h3>
                  <p className="text-sm text-gray-600">
                    Once the MOU is signed, you'll receive login credentials to
                    access the program holder portal where you can manage
                    students, track progress, and submit reports.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-6 text-left">
            <h3 className="font-bold text-gray-900 mb-4">
              Questions? We're Here to Help
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:elizabeth@elevateforhumanity.org"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    elizabeth@elevateforhumanity.org
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <a
                    href="tel:3173143757"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    (317) 314-3757
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Reference Number
                  </p>
                  <p className="text-sm text-gray-600">
                    {applicationId
                      ? applicationId.slice(0, 8).toUpperCase()
                      : 'Check your email'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition text-center"
            >
              Return to Homepage
            </Link>
            <Link
              href="/programs"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center"
            >
              View Programs
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            While you wait, learn more about our programs and partnerships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/programs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Our Programs
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/partners"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Partner Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

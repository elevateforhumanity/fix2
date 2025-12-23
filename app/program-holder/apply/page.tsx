import { Metadata } from 'next';
import ProgramHolderApplyForm from './ProgramHolderApplyForm';

export const metadata: Metadata = {
  title: 'Become a Program Holder | Elevate for Humanity',
  description:
    'Partner with Elevate for Humanity to deliver workforce training programs in your community.',
};

export default function ProgramHolderApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a Program Holder
          </h1>
          <p className="text-lg text-gray-600">
            Partner with Elevate for Humanity to deliver free workforce training
            to your community. We handle funding, compliance, and support.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-blue-50 border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            What You Get as a Program Holder
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Student Referrals
                </h3>
                <p className="text-sm text-gray-600">
                  Pre-screened, funded students ready to enroll
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Compliance Support
                </h3>
                <p className="text-sm text-gray-600">
                  WIOA, WRG, and apprenticeship documentation help
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Digital Platform
                </h3>
                <p className="text-sm text-gray-600">
                  Student tracking, reporting, and document management
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Marketing Support
                </h3>
                <p className="text-sm text-gray-600">
                  Co-branded materials and community outreach
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Application Form
            </h2>
            <ProgramHolderApplyForm />
          </div>
        </div>
      </section>
    </div>
  );
}

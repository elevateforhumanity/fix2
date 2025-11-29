import { createServerSupabaseClient } from '@/lib/auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: {
    certificateNumber: string;
  };
}

export default async function CertificatePage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient();

  const { data: certificate } = await supabase
    .from('partner_certificates')
    .select(`
      *,
      partner_lms_providers (
        provider_name,
        provider_type
      )
    `)
    .eq('certificate_number', params.certificateNumber)
    .single();

  if (!certificate) {
    notFound();
  }

  const isExpired = new Date(certificate.expiry_date) < new Date();
  const isRevoked = certificate.status === 'revoked';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Certificate Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-blue-600">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Certificate of Completion</h1>
            <p className="text-xl opacity-90">
              Elevate for Humanity Career Training Institute
            </p>
          </div>

          {/* Certificate Body */}
          <div className="p-12">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">This certifies that</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {certificate.student_name || 'Certificate Holder'}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                has successfully completed
              </p>
              <h3 className="text-2xl font-semibold text-blue-600 mb-8">
                {certificate.course_name}
              </h3>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Certificate Number</p>
                <p className="font-mono font-semibold text-gray-900">
                  {certificate.certificate_number}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Training Provider</p>
                <p className="font-semibold text-gray-900">
                  {certificate.partner_lms_providers.provider_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(certificate.issue_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(certificate.expiry_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="text-center pt-6 border-t border-gray-200">
              {isRevoked ? (
                <div className="inline-block px-6 py-3 bg-red-100 text-red-800 rounded-lg font-semibold">
                  ❌ Certificate Revoked
                </div>
              ) : isExpired ? (
                <div className="inline-block px-6 py-3 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
                  ⚠️ Certificate Expired
                </div>
              ) : (
                <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-lg font-semibold">
                  ✅ Valid Certificate
                </div>
              )}
            </div>

            {/* Verification URL */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Verify this certificate at:
              </p>
              <p className="text-center font-mono text-sm text-blue-600 break-all">
                {certificate.verification_url}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This is an official certificate issued by Elevate for Humanity Career
              Training Institute in partnership with{' '}
              {certificate.partner_lms_providers.provider_name}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Certificate
          </button>
          {certificate.certificate_url && (
            <a
              href={certificate.certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Download PDF
            </a>
          )}
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>


      </div>
    </div>
  );
}

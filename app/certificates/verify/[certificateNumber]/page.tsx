import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Verify Certificate | Elevate For Humanity',
  description: 'Verify the authenticity of an Elevate For Humanity certificate',
};

export default async function VerifyCertificatePage({
  params,
}: {
  params: { certificateNumber: string };
}) {
  const supabase = await createClient();

  // Search in both certificate tables
  const { data: programCert } = await supabase
    .from('program_completion_certificates')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email
      ),
      programs:program_id (
        title,
        duration_hours
      )
    `)
    .eq('certificate_number', params.certificateNumber)
    .single();

  const { data: moduleCert } = await supabase
    .from('module_certificates')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email
      )
    `)
    .eq('certificate_number', params.certificateNumber)
    .single();

  const certificate = programCert || moduleCert;

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificate Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Certificate number <span className="font-mono font-semibold">{params.certificateNumber}</span> will not be found in our repository.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700">
              <strong>Please verify:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 text-left">
              <li>• Certificate number is entered correctly</li>
              <li>• Certificate has been issued (may take 24-48 hours)</li>
              <li>• Certificate has not been revoked</li>
            </ul>
          </div>
          <Link
            href="/certificates/verify"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Start Another Certificate
          </Link>
        </div>
      </div>
    );
  }

  const isValid = certificate.status !== 'revoked';
  const studentName = certificate.profiles?.full_name || 'Student Name';
  const programTitle = programCert?.programs?.title || certificate.certificate_name;
  const completionDate = new Date(certificate.completion_date || certificate.issued_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const totalHours = programCert?.programs?.duration_hours || certificate.total_hours || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Verification Status */}
        <div className={`rounded-2xl shadow-xl p-8 mb-8 ${
          isValid ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            {isValid ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isValid ? 'Certificate Verified ✓' : 'Certificate Invalid'}
              </h1>
              <p className="text-gray-600">
                {isValid 
                  ? 'This certificate is authentic and stored in our official repository'
                  : 'This certificate has been revoked or is no longer valid'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificate Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Certificate Number
              </label>
              <p className="text-lg font-mono font-bold text-gray-900 mt-1">
                {certificate.certificate_number}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Issue Date
              </label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {completionDate}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Recipient
              </label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {studentName}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Program
              </label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {programTitle}
              </p>
            </div>

            {totalHours > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Training Hours
                </label>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {totalHours} hours
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Issued By
              </label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                Elevate For Humanity
              </p>
            </div>
          </div>

          {/* Repository Information */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Repository Information</h3>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Official Record:</strong> This certificate is permanently stored in the Elevate For Humanity certificate repository.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Verification Method:</strong> Each certificate contains a unique number and QR code linked to this verification page.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Authenticity:</strong> Only certificates issued by Elevate For Humanity and stored in our repository are considered valid.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isValid && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions</h2>
            <div className="flex flex-wrap gap-4">
              {certificate.certificate_url && (
                <a
                  href={certificate.certificate_url}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </a>
              )}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Verification link copied to clipboard!');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
              >
                <Share2 className="w-5 h-5" />
                Share Verification Link
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Questions about this certificate? Contact us at{' '}
            <a href="mailto:Elevate4humanityedu@gmail.com" className="text-blue-600 hover:underline">
              Elevate4humanityedu@gmail.com
            </a>
            {' '}or call{' '}
            <a href="tel:+13173143757" className="text-blue-600 hover:underline">
              (317) 314-3757
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

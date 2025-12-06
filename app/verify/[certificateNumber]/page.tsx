import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function VerifyCertificatePage({
  params,
}: {
  params: { certificateNumber: string };
}) {
  const supabase = await createClient();

  const { data: certificate } = await supabase
    .from('certificates')
    .select('*, profiles(full_name), courses(title)')
    .eq('certificate_number', params.certificateNumber)
    .single();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Certificate Verification</h1>
          <p className="text-slate-600">Verify the authenticity of an Elevate For Humanity certificate</p>
        </div>

        {certificate ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Valid Certificate</h2>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Student Name</span>
                <span className="font-semibold text-slate-900">{certificate.profiles.full_name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Course</span>
                <span className="font-semibold text-slate-900">{certificate.courses.title}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="text-slate-600">Issued Date</span>
                <span className="font-semibold text-slate-900">
                  {new Date(certificate.issued_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-600">Certificate Number</span>
                <span className="font-mono text-sm font-semibold text-slate-900">{certificate.certificate_number}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                ✓ This certificate is authentic and was issued by Elevate For Humanity
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-slate-900 mb-4">Certificate Not Found</h2>
            <p className="text-center text-slate-600 mb-6">
              We couldn't find a certificate with number: <span className="font-mono">{params.certificateNumber}</span>
            </p>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 text-center">
                This certificate number is not valid or does not exist in our system
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

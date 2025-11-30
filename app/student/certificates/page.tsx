import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Download, Share2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My Certificates | Student Portal',
  description: 'View and download your earned certificates',
  openGraph: {
    images: ["/images/team-new/team-4.jpg"],
    type: "website",
  }};

export default async function StudentCertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  // Fetch user's certificates from partner courses
  const { data: certificates } = await supabase
    .from('partner_certificates')
    .select(`
      *,
      partner_lms_enrollments (
        partner_courses (
          course_name
        ),
        partner_lms_providers (
          provider_name
        )
      )
    `)
    .eq('student_id', user.id)
    .order('issued_date', { ascending: false });
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/student/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Award className="h-8 w-8 text-red-600" />
            My Certificates
          </h1>
          <p className="text-slate-600 mt-2">
            View, download, and share your earned certificates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates && certificates.length > 0 ? (
            certificates.map((cert: any) => {
              const courseName = cert.partner_lms_enrollments?.partner_courses?.course_name || 'Course';
              const providerName = cert.partner_lms_enrollments?.partner_lms_providers?.provider_name || 'Partner';
              
              return (
                <div key={cert.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="border-4 border-emerald-600 rounded-lg p-6 mb-4">
                    <div className="text-center">
                      <Award className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Certificate of Completion
                      </h3>
                      <p className="text-lg text-slate-700 mb-2">{courseName}</p>
                      <p className="text-sm text-slate-600">
                        Issued by: {providerName}
                      </p>
                      <p className="text-sm text-slate-600">
                        Date: {new Date(cert.issued_date).toLocaleDateString()}
                      </p>
                      {cert.expiration_date && (
                        <p className="text-xs text-slate-500 mt-1">
                          Expires: {new Date(cert.expiration_date).toLocaleDateString()}
                        </p>
                      )}
                      {cert.certificate_number && (
                        <p className="text-xs text-slate-500 mt-2 font-mono">
                          ID: {cert.certificate_number}
                        </p>
                      )}
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Partner Certificate
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                    {cert.verification_url && (
                      <a
                        href={cert.verification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <Award className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No certificates earned yet</p>
              <p className="text-sm text-slate-500 mt-2">
                Complete your partner courses to earn certificates
              </p>
              <Link
                href="/student/dashboard"
                className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
              >
                View My Courses
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            📜 About Your Certificates
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Certificates are issued upon successful course completion</li>
            <li>• Each certificate includes a unique verification ID</li>
            <li>• Download as PDF or share digitally with employers</li>
            <li>
              • Verify certificates at{' '}
              <Link href="/cert/verify" className="underline">
                elevateforhumanity.org/cert/verify
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

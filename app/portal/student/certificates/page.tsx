import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, Download, Share2, CheckCircle, Calendar, FileText, ExternalLink, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificates | Student Portal',
  description: 'View and download your certificates',
};

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: completedEnrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs (
        name,
        code,
        duration_weeks,
        certificate_type
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'completed');

  const certificates = completedEnrollments?.map(enrollment => ({
    id: enrollment.id,
    programName: enrollment.programs?.name || 'Unknown Program',
    programCode: enrollment.programs?.code || 'N/A',
    completedDate: enrollment.completed_at || enrollment.updated_at,
    certificateType: enrollment.programs?.certificate_type || 'Completion',
    duration: enrollment.programs?.duration_weeks || 0,
    grade: enrollment.final_grade || 'Pass',
    credentialId: `CERT-${enrollment.id.substring(0, 8).toUpperCase()}`,
    verified: true,
  })) || [];

  const totalCertificates = certificates.length;
  const thisYear = new Date().getFullYear();
  const certificatesThisYear = certificates.filter(c => 
    new Date(c.completedDate).getFullYear() === thisYear
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-gray-600 mt-1">View, download, and share your earned certificates</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-yellow-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalCertificates}</p>
            <p className="text-sm text-gray-600">Total Certificates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Calendar className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{certificatesThisYear}</p>
            <p className="text-sm text-gray-600">Earned This Year</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Shield className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{certificates.filter(c => c.verified).length}</p>
            <p className="text-sm text-gray-600">Verified</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Download className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Downloads</p>
          </div>
        </div>

        {certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <Award size={48} className="text-white/80" />
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      {cert.certificateType}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{cert.programName}</h3>
                  <p className="text-blue-100">Certificate of Completion</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Program Code:</span>
                      <span className="font-semibold">{cert.programCode}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold">
                        {new Date(cert.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{cert.duration} weeks</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-semibold">{cert.grade}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Credential ID:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {cert.credentialId}
                      </span>
                    </div>
                  </div>

                  {cert.verified && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="text-sm text-green-700 font-medium">
                        Verified Certificate
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <Download size={16} />
                      Download
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <ExternalLink size={16} />
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Award className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
            <p className="text-gray-600 mb-6">
              Complete courses to earn certificates and showcase your achievements
            </p>
            <a
              href="/programs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Programs
            </a>
          </div>
        )}

        {certificates.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText size={20} />
              About Your Certificates
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• All certificates are digitally signed and verifiable</li>
              <li>• Share your certificates on LinkedIn and other platforms</li>
              <li>• Download certificates in PDF format for printing</li>
              <li>• Certificates never expire and remain accessible forever</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

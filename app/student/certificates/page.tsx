import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/student/certificates",
  },
  title: 'My Certificates | Student Portal',
  description: 'View and download your earned certificates',
};

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch completed courses
  const { data: completedEnrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        category
      )
    `)
    .eq('user_id', user.id)
    .eq('progress_percentage', 100)
    .order('completed_at', { ascending: false });

  // Fetch completed partner courses
  const { data: completedPartnerEnrollments } = await supabase
    .from('partner_enrollments')
    .select(`
      *,
      partner_courses (
        id,
        course_name,
        certification_name,
        partner_lms_providers (
          provider_name
        )
      )
    `)
    .eq('user_id', user.id)
    .eq('progress_percentage', 100)
    .order('completed_at', { ascending: false });

  const totalCertificates = (completedEnrollments?.length || 0) + (completedPartnerEnrollments?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">My Certificates</h1>
            <p className="text-xl text-blue-100">View and download your earned certificates</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Certificates</h3>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalCertificates}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Internal Courses</h3>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{completedEnrollments?.length || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Partner Certifications</h3>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{completedPartnerEnrollments?.length || 0}</p>
            </div>
          </div>

          {/* Internal Course Certificates */}
          {completedEnrollments && completedEnrollments.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Internal Course Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedEnrollments.map((enrollment: any) => {
                  const course = enrollment.courses;
                  return (
                    <div key={enrollment.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      <div className="bg-blue-700 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-sm">Certificate</span>
                        </div>
                        <h3 className="text-xl font-bold">{course?.title}</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-medium">
                              {enrollment.completed_at 
                                ? new Date(enrollment.completed_at).toLocaleDateString()
                                : 'Recently'}
                            </span>
                          </div>
                          {course?.category && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Category:</span>
                              <span className="font-medium">{course.category}</span>
                            </div>
                          )}
                        </div>
                        <a
                          href={`/api/certificates/download?enrollmentId=${enrollment.id}&type=internal`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Download Certificate
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Partner Certificates */}
          {completedPartnerEnrollments && completedPartnerEnrollments.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Partner Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedPartnerEnrollments.map((enrollment: any) => {
                  const course = enrollment.partner_courses;
                  return (
                    <div key={enrollment.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-sm">{course?.partner_lms_providers?.provider_name}</span>
                        </div>
                        <h3 className="text-xl font-bold">{course?.certification_name || course?.course_name}</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completed:</span>
                            <span className="font-medium">
                              {enrollment.completed_at 
                                ? new Date(enrollment.completed_at).toLocaleDateString()
                                : 'Recently'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Provider:</span>
                            <span className="font-medium">{course?.partner_lms_providers?.provider_name}</span>
                          </div>
                        </div>
                        <a
                          href={`/api/certificates/download?enrollmentId=${enrollment.id}&type=partner`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Download Certificate
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {totalCertificates === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 mb-6">Complete courses to earn certificates</p>
              <Link href="/student/courses" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
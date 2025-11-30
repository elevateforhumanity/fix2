import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  // Fetch enrollment metrics
  const { count: totalEnrollments } = await supabase
    .from('partner_lms_enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: activeEnrollments } = await supabase
    .from('partner_lms_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: completedEnrollments } = await supabase
    .from('partner_lms_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const { count: totalCertificates } = await supabase
    .from('partner_certificates')
    .select('*', { count: 'exact', head: true });

  const { count: failedEnrollments } = await supabase
    .from('partner_lms_enrollment_failures')
    .select('*', { count: 'exact', head: true })
    .eq('resolved', false);

  // Calculate completion rate
  const completionRate = totalEnrollments && totalEnrollments > 0
    ? Math.round((completedEnrollments || 0) / totalEnrollments * 100)
    : 0;

  // Fetch recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('partner_lms_enrollments')
    .select(`
      *,
      profiles (full_name, email),
      partner_courses (course_name),
      partner_lms_providers (provider_name)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/admin" className="text-sky-600 hover:underline text-sm">
            ← Back to Admin Dashboard
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 mb-8">
          Real-time enrollment metrics and performance tracking.
        </p>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Enrollments</p>
            <p className="text-3xl font-bold text-slate-900">{totalEnrollments || 0}</p>
            <p className="text-xs text-slate-500 mt-2">All partner courses</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Active Students</p>
            <p className="text-3xl font-bold text-emerald-600">{activeEnrollments || 0}</p>
            <p className="text-xs text-slate-500 mt-2">Currently enrolled</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Completions</p>
            <p className="text-3xl font-bold text-sky-600">{completedEnrollments || 0}</p>
            <p className="text-xs text-slate-500 mt-2">Courses completed</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-slate-900">{completionRate}%</p>
            <p className="text-xs text-slate-500 mt-2">Success rate</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Certificates Issued</p>
            <p className="text-2xl font-bold text-purple-600">{totalCertificates || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Failed Enrollments</p>
            <p className="text-2xl font-bold text-rose-600">{failedEnrollments || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {(totalEnrollments || 0) - (activeEnrollments || 0) - (completedEnrollments || 0)}
            </p>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Enrollments</h2>
          </div>
          
          {recentEnrollments && recentEnrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Enrolled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnrollments.map((enrollment: any) => (
                    <tr key={enrollment.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p className="font-medium text-slate-900">{enrollment.profiles?.full_name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{enrollment.profiles?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {enrollment.partner_courses?.course_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {enrollment.partner_lms_providers?.provider_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          enrollment.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                          enrollment.status === 'active' ? 'bg-sky-50 text-sky-700' :
                          enrollment.status === 'failed' ? 'bg-rose-50 text-rose-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {enrollment.progress_percentage || 0}%
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(enrollment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-600">
              No enrollments yet. Enrollments will appear here once students start courses.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

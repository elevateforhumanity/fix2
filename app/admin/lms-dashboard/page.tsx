import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LMS Dashboard | Admin',
  description: 'Learning Management System overview and statistics',
};

export default async function LMSDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Programs Statistics
  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true });

  const { count: activePrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Enrollments Statistics
  const { count: totalEnrollments } = await supabase
    .from('student_enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: activeEnrollments } = await supabase
    .from('student_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: completedEnrollments } = await supabase
    .from('student_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const { count: pendingEnrollments } = await supabase
    .from('student_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Modules Statistics
  const { count: totalModules } = await supabase
    .from('modules')
    .select('*', { count: 'exact', head: true });

  const { count: scormModules } = await supabase
    .from('modules')
    .select('*', { count: 'exact', head: true })
    .eq('module_type', 'scorm');

  // Transfer Hours Statistics
  const { count: pendingTransferHours } = await supabase
    .from('transfer_hours')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: approvedTransferHours } = await supabase
    .from('transfer_hours')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  // Funding Statistics
  const { data: fundingData } = await supabase
    .from('funding_records')
    .select('amount, status');

  const totalFunding = fundingData?.reduce((sum, record) => sum + (record.amount || 0), 0) || 0;
  const approvedFunding = fundingData
    ?.filter(r => r.status === 'approved' || r.status === 'disbursed')
    .reduce((sum, record) => sum + (record.amount || 0), 0) || 0;

  // Recent Activity
  const { data: recentEnrollments } = await supabase
    .from('student_enrollments')
    .select(`
      id,
      created_at,
      status,
      student:profiles!student_enrollments_student_id_fkey(full_name, email),
      program:programs(name, slug)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: recentTransferHours } = await supabase
    .from('transfer_hours')
    .select(`
      id,
      created_at,
      hours_requested,
      status,
      enrollment:student_enrollments(
        student:profiles!student_enrollments_student_id_fkey(full_name)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  // Calculate completion rate
  const completionRate = totalEnrollments > 0 
    ? Math.round((completedEnrollments / totalEnrollments) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LMS Dashboard</h1>
          <p className="text-gray-600 mt-1">Learning Management System Overview</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Programs */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Programs</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📚</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalPrograms || 0}</p>
            <p className="text-sm text-gray-500 mt-1">{activePrograms || 0} active</p>
            <Link href="/admin/programs" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              Manage Programs →
            </Link>
          </div>

          {/* Enrollments */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Enrollments</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">👥</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalEnrollments || 0}</p>
            <p className="text-sm text-gray-500 mt-1">{activeEnrollments || 0} active</p>
            <Link href="/admin/enrollments" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              View Enrollments →
            </Link>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">✓</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">{completedEnrollments || 0} completed</p>
          </div>

          {/* Funding */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Funding</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">💰</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">${totalFunding.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">${approvedFunding.toLocaleString()} approved</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Modules</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Total Modules</span>
                <span className="font-semibold">{totalModules || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">SCORM Packages</span>
                <span className="font-semibold">{scormModules || 0}</span>
              </div>
            </div>
            <Link href="/admin/modules" className="text-sm text-blue-600 hover:underline mt-4 inline-block">
              Manage Modules →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Transfer Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Pending Review</span>
                <span className="font-semibold text-yellow-600">{pendingTransferHours || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Approved</span>
                <span className="font-semibold text-green-600">{approvedTransferHours || 0}</span>
              </div>
            </div>
            <Link href="/admin/transfer-hours" className="text-sm text-blue-600 hover:underline mt-4 inline-block">
              Review Requests →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">Enrollment Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Pending</span>
                <span className="font-semibold text-yellow-600">{pendingEnrollments || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Active</span>
                <span className="font-semibold text-green-600">{activeEnrollments || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Enrollments</h2>
            </div>
            <div className="p-6">
              {recentEnrollments && recentEnrollments.length > 0 ? (
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {enrollment.student?.full_name || 'Unknown Student'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {enrollment.program?.name || 'Unknown Program'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                        enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent enrollments</p>
              )}
            </div>
          </div>

          {/* Recent Transfer Hour Requests */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transfer Hour Requests</h2>
            </div>
            <div className="p-6">
              {recentTransferHours && recentTransferHours.length > 0 ? (
                <div className="space-y-4">
                  {recentTransferHours.map((request) => (
                    <div key={request.id} className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.enrollment?.student?.full_name || 'Unknown Student'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.hours_requested}h requested
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent requests</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/programs/new"
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl mb-2">➕</span>
              <span className="text-sm font-medium text-gray-700">Create Program</span>
            </Link>
            <Link
              href="/admin/enrollments/new"
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl mb-2">👤</span>
              <span className="text-sm font-medium text-gray-700">New Enrollment</span>
            </Link>
            <Link
              href="/admin/modules/new"
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Add Module</span>
            </Link>
            <Link
              href="/admin/transfer-hours"
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl mb-2">⏱️</span>
              <span className="text-sm font-medium text-gray-700">Review Hours</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin",
  },
  title: 'Admin Command Center | Elevate For Humanity',
  description: 'Complete platform oversight and management',
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch all critical metrics
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  const { count: totalApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true });

  const { count: pendingApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: activeCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  const { count: totalCertificates } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true });

  // Recent activity
  const { data: recentApplications } = await supabase
    .from('applications')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Admin Command Center</h1>
                <p className="text-xl text-blue-100">Complete platform oversight and control</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">Logged in as</p>
                <p className="text-lg font-semibold">{profile?.full_name || user.email}</p>
                <span className="inline-block px-3 py-1 bg-blue-700 rounded-full text-xs mt-1">
                  {profile?.role || 'admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/admin/users" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalUsers || 0}</p>
              <p className="text-sm text-gray-500 mt-1">View all users →</p>
            </Link>

            <Link href="/admin/applications" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Applications</h3>
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalApplications || 0}</p>
              <p className="text-sm text-orange-600 mt-1">{pendingApplications || 0} pending review</p>
            </Link>

            <Link href="/admin/enrollments" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Enrollments</h3>
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalEnrollments || 0}</p>
              <p className="text-sm text-gray-500 mt-1">Active students</p>
            </Link>

            <Link href="/admin/courses" className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Active Courses</h3>
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{activeCourses || 0}</p>
              <p className="text-sm text-gray-500 mt-1">Published courses</p>
            </Link>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* User Management */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-blue-50">
                <h2 className="text-xl font-semibold text-blue-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  User Management
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/users" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    👥 All Users
                  </Link>
                  <Link href="/admin/students" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🎓 Students
                  </Link>
                  <Link href="/admin/instructors" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    👨‍🏫 Instructors
                  </Link>
                  <Link href="/admin/employers" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🏢 Employers
                  </Link>
                  <Link href="/admin/program-holders" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🤝 Program Holders
                  </Link>
                </nav>
              </div>
            </div>

            {/* Applications & Enrollment */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-green-50">
                <h2 className="text-xl font-semibold text-green-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Applications
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/applications" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📝 All Applications
                  </Link>
                  <Link href="/admin/applicants" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    👤 Applicants
                  </Link>
                  <Link href="/admin/applicants-live" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🔴 Live Applications
                  </Link>
                  <Link href="/admin/enrollments" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    ✅ Enrollments
                  </Link>
                  <Link href="/admin/enrollment" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    ➕ New Enrollment
                  </Link>
                </nav>
              </div>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-purple-50">
                <h2 className="text-xl font-semibold text-purple-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Content & Courses
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/courses" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📚 All Courses
                  </Link>
                  <Link href="/admin/course-builder" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🏗️ Course Builder
                  </Link>
                  <Link href="/admin/course-generator" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🤖 AI Course Generator
                  </Link>
                  <Link href="/admin/programs" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🎯 Programs
                  </Link>
                  <Link href="/admin/certificates" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🏆 Certificates
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* More Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Analytics & Reports */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-orange-50">
                <h2 className="text-xl font-semibold text-orange-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics & Reports
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/analytics" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📊 Analytics Dashboard
                  </Link>
                  <Link href="/admin/reports" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📈 Reports
                  </Link>
                  <Link href="/admin/reporting" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📋 Custom Reporting
                  </Link>
                  <Link href="/admin/outcomes" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🎯 Outcomes
                  </Link>
                  <Link href="/admin/impact" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    💫 Impact Metrics
                  </Link>
                </nav>
              </div>
            </div>

            {/* Operations */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-red-50">
                <h2 className="text-xl font-semibold text-red-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Operations
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/operations" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    ⚙️ Operations Center
                  </Link>
                  <Link href="/admin/workflows" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🔄 Workflows
                  </Link>
                  <Link href="/admin/compliance" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    ✓ Compliance
                  </Link>
                  <Link href="/admin/audit-logs" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    📜 Audit Logs
                  </Link>
                  <Link href="/admin/security" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🔒 Security
                  </Link>
                </nav>
              </div>
            </div>

            {/* System & Settings */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  System & Settings
                </h2>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link href="/admin/settings" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    ⚙️ Settings
                  </Link>
                  <Link href="/admin/system-health" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    💚 System Health
                  </Link>
                  <Link href="/admin/site-health" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🏥 Site Health
                  </Link>
                  <Link href="/admin/integrations" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🔌 Integrations
                  </Link>
                  <Link href="/admin/migrations" className="block p-3 hover:bg-gray-50 rounded text-sm">
                    🔄 Migrations
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Applications</h2>
              </div>
              <div className="divide-y">
                {recentApplications && recentApplications.length > 0 ? (
                  recentApplications.map((app: any) => (
                    <div key={app.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{app.profiles?.full_name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{app.profiles?.email}</p>
                          <p className="text-xs text-gray-500 mt-1">{app.program_type || 'General'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          app.status === 'approved' ? 'bg-blue-100 text-green-700' :
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(app.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">No recent applications</div>
                )}
              </div>
              <div className="p-4 border-t bg-gray-50">
                <Link href="/admin/applications" className="text-sm text-blue-600 hover:text-blue-700">
                  View all applications →
                </Link>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Users</h2>
              </div>
              <div className="divide-y">
                {recentUsers && recentUsers.length > 0 ? (
                  recentUsers.map((u: any) => (
                    <div key={u.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{u.full_name || 'No name'}</p>
                          <p className="text-sm text-gray-600">{u.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          u.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                          u.role === 'instructor' ? 'bg-blue-100 text-purple-700' :
                          'bg-blue-100 text-green-700'
                        }`}>
                          {u.role || 'student'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Joined {new Date(u.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">No recent users</div>
                )}
              </div>
              <div className="p-4 border-t bg-gray-50">
                <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">
                  View all users →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

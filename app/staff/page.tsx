import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Staff Portal | Elevate for Humanity',
  description: 'Access student records, reports, and administrative tools',
,
  openGraph: {
    images: ["/images/students-new/student-8.jpg"],
    type: "website",
  }};

export default async function StaffPortalPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/staff');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', session.user.id)
    .single();

  const allowedRoles = ['admin', 'staff', 'instructor'];
  if (!allowedRoles.includes(profile?.role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Portal</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {profile?.full_name || 'Staff Member'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/admin/students"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
            <p className="text-sm text-gray-600">View and manage student records</p>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-sm text-gray-600">Generate and export reports</p>
          </Link>

          <Link
            href="/lms/attendance"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance</h3>
            <p className="text-sm text-gray-600">Track student attendance</p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">View performance metrics</p>
          </Link>
        </div>

        {/* Main Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student Management */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Management</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/admin/students" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  All Students
                </Link>
              </li>
              <li>
                <Link href="/admin/applications" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Applications
                </Link>
              </li>
              <li>
                <Link href="/lms/attendance" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Attendance Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/analytics/engagement" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Student Engagement
                </Link>
              </li>
              <li>
                <Link href="/admin/retention" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Retention Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Reports & Compliance */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reports & Compliance</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/admin/reports" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  All Reports
                </Link>
              </li>
              <li>
                <Link href="/admin/compliance-dashboard" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  WIOA Compliance
                </Link>
              </li>
              <li>
                <Link href="/admin/reports/caseload" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Caseload Reports
                </Link>
              </li>
              <li>
                <Link href="/admin/outcomes" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Program Outcomes
                </Link>
              </li>
              <li>
                <Link href="/admin/compliance/exports" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Export Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Tools */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Tools</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/admin/hr/employees" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  HR & Employees
                </Link>
              </li>
              <li>
                <Link href="/admin/hr/payroll" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Payroll
                </Link>
              </li>
              <li>
                <Link href="/admin/program-holders" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Training Partners
                </Link>
              </li>
              <li>
                <Link href="/admin/docs/mou" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  MOUs & Documents
                </Link>
              </li>
              <li>
                <Link href="/admin/courses" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                  </svg>
                  Course Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">--</div>
              <div className="text-blue-100">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">--</div>
              <div className="text-blue-100">Pending Applications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">--</div>
              <div className="text-blue-100">This Month Completions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">--</div>
              <div className="text-blue-100">Job Placements</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Log in to view real-time statistics
          </p>
        </div>
      </div>
    </div>
  );
}

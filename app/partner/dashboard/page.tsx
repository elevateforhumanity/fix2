import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Admin | Elevate For Humanity',
  description: 'Admin dashboard',
};

export default async function PartnerDashboardPage() {

  const supabase = await createClient(  );
  const { data: { user } } = await supabase.auth.getUser(  );

  if (!user) {
    redirect('/login'  );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single(  );

  if (!profile) {
    redirect('/login'  );
  }

  // Fetch dashboard data
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student'  );

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true }  );

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active'  );

  const { count: completedEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed'  );

  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true  );

  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true  );

  const completionRate = totalEnrollments && totalEnrollments > 0
    ? Math.round(((completedEnrollments || 0) / totalEnrollments) * 100)
    : 0;

  // Recent activity
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      status,
      profiles!enrollments_user_id_fkey (full_name, email),
      courses (title)
    `)
    .order('created_at', { ascending: false })
    .limit(10  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Hero"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Transform your career with free training
          </p>
        </div>
      </section>

      {/* Header */}
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Partner Dashboard</h1>
            <p className="text-xl text-blue-100">Welcome back, {profile.full_name || profile.email}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">{totalStudents || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Enrollments</h3>
              <p className="text-3xl font-bold text-green-600">{activeEnrollments || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completion Rate</h3>
              <p className="text-3xl font-bold text-purple-600">{completionRate}%</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Programs</h3>
              <p className="text-3xl font-bold text-orange-600">{totalPrograms || 0}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Enrollments</span>
                  <span className="font-semibold">{totalEnrollments || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{completedEnrollments || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Courses</span>
                  <span className="font-semibold">{totalCourses || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/admin/students"
                  className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="font-semibold">View Students</div>
                  <div className="text-sm text-gray-600">Manage student accounts</div>
                </Link>
                <Link
                  href="/admin/programs"
                  className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="font-semibold">View Programs</div>
                  <div className="text-sm text-gray-600">Manage training programs</div>
                </Link>
                <Link
                  href="/admin/reports"
                  className="block p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="font-semibold">View Reports</div>
                  <div className="text-sm text-gray-600">Access analytics and insights</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Enrollments</h2>
            </div>
            <div className="overflow-x-auto">
              {recentEnrollments && recentEnrollments.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {enrollment.profiles?.full_name || enrollment.profiles?.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {enrollment.courses?.title || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      
      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Take the first step toward a better career today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}


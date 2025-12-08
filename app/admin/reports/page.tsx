import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ReportsDashboard from './ReportsDashboard';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/reports",
  },
  title: 'Advanced Reports | Admin Dashboard',
  description: 'Comprehensive reporting and analytics for Elevate For Humanity',
};

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch all data for reports
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    { count: totalStudents },
    { count: totalEnrollments },
    { count: activeEnrollments },
    { count: completedCourses },
    { count: totalApplications },
    { count: pendingApplications },
    { count: approvedApplications },
    { count: totalCertificates },
    { data: recentEnrollments },
    { data: programStats },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('certificates').select('*', { count: 'exact', head: true }),
    supabase
      .from('enrollments')
      .select('*, courses(title), profiles(full_name)')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(30),
    supabase
      .from('enrollments')
      .select('course_id, courses(title)')
      .limit(1000),
  ]);

  const stats = {
    totalStudents: totalStudents || 0,
    totalEnrollments: totalEnrollments || 0,
    activeEnrollments: activeEnrollments || 0,
    completedCourses: completedCourses || 0,
    totalApplications: totalApplications || 0,
    pendingApplications: pendingApplications || 0,
    approvedApplications: approvedApplications || 0,
    totalCertificates: totalCertificates || 0,
    completionRate: totalEnrollments > 0 ? Math.round((completedCourses / totalEnrollments) * 100) : 0,
    approvalRate: totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Advanced Reports & Analytics
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into student performance, enrollment trends, and program effectiveness
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/reports/charts"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                View Charts
              </Link>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                Export CSV
              </button>
            </div>
          </div>

          {/* Pass data to client component */}
          <ReportsDashboard 
            stats={stats}
            recentEnrollments={recentEnrollments || []}
            programStats={programStats || []}
          />
        </div>
      </div>
    </div>
  );
}

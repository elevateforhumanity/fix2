import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import { TrendingUp, Users, DollarSign, Award, Activity } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/admin/performance-dashboard',
  },
  title: 'Performance Dashboard | Elevate For Humanity',
  description: 'Real-time performance metrics and analytics.',
};

export default async function PerformanceDashboardPage() {
  const { user } = await requireRole(['admin', 'super_admin']);
  const supabase = await createClient();

  const [studentsResult, enrollmentsResult, revenueResult, completionsResult] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student'),
      supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
      supabase
        .from('donations')
        .select('amount')
        .eq('payment_status', 'succeeded'),
      supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed'),
    ]);

  const totalStudents = studentsResult.count || 0;
  const activeEnrollments = enrollmentsResult.count || 0;
  const totalRevenue =
    revenueResult.data?.reduce(
      (sum, d) => sum + parseFloat(d.amount || '0'),
      0
    ) || 0;
  const completedCourses = completionsResult.count || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Performance Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Real-time metrics and KPIs</p>
            </div>
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalStudents}</p>
            <p className="text-slate-600 text-sm">Total Students</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-green-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {activeEnrollments}
            </p>
            <p className="text-slate-600 text-sm">Active Enrollments</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-slate-600 text-sm">Total Revenue</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-purple-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedCourses}
            </p>
            <p className="text-slate-600 text-sm">Completed Courses</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Performance Overview
          </h2>
          <p className="text-slate-600">
            Detailed charts and analytics will be displayed here. Integration
            with charting library needed.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { EnrollmentsTable } from './enrollments-table';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/enrollments",
  },
  title: 'Enrollments Management | Admin',
  description: 'Manage student enrollments and track progress',
};

export default async function EnrollmentsPage() {
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
  
  const { data: enrollments, count: totalEnrollments } = await supabase
    .from('student_enrollments')
    .select(`
      *,
      student:profiles!student_enrollments_student_id_fkey(full_name, email),
      program:programs(name, slug),
      funding:funding_records(amount, source, status)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enrollments Management</h1>
              <p className="text-gray-600 mt-1">Track student enrollments and progress</p>
            </div>
            <Link
              href="/admin/enrollments/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              + New Enrollment
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Enrollments</h3>
              <p className="text-2xl font-bold text-gray-900">{totalEnrollments || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Active</h3>
              <p className="text-2xl font-bold text-green-600">{activeEnrollments || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Completed</h3>
              <p className="text-2xl font-bold text-blue-600">{completedEnrollments || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">{pendingEnrollments || 0}</p>
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <EnrollmentsTable enrollments={enrollments || []} />
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Instructor Dashboard',
  description: 'Dashboard for instructor',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect('/login');
  }

  
  // Fetch instructor data
  const { data: courses, count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .eq('instructor_id', user.id);

  const { count: totalStudents } = await supabase
    .from('enrollments')
    .select('user_id', { count: 'exact', head: true })
    .in('course_id', courses?.map(c => c.id) || []);

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .in('course_id', courses?.map(c => c.id) || [])
    .eq('status', 'active');

  const { data: recentActivity } = await supabase
    .from('student_progress')
    .select(`
      *,
      profiles (full_name),
      courses (title)
    `)
    .in('course_id', courses?.map(c => c.id) || [])
    .order('updated_at', { ascending: false })
    .limit(10);


  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Instructor Dashboard</h1>
            <p className="text-xl text-blue-100">Welcome back, {profile.full_name || profile.email}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">My Courses</h3>
              <p className="text-3xl font-bold text-blue-600">{totalCourses || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Students</h3>
              <p className="text-3xl font-bold text-green-600">{totalStudents || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active</h3>
              <p className="text-3xl font-bold text-purple-600">{activeEnrollments || 0}</p>
            </div>

          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Activity feed will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

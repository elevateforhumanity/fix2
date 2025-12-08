import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Staff Portal',
  description: 'Staff management and oversight tools',
};

export default async function StaffDashboardPage() {
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

  if (!profile || profile.role !== 'staff') {
    redirect('/unauthorized');
  }

  

  

  

  
  // Fetch staff data
  const { data: allStudents } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student');

  const { data: allEnrollments } = await supabase
    .from('enrollments')
    .select('*');

  const { data: allCourses } = await supabase
    .from('courses')
    .select('*');

  const totalStudents = allStudents?.length || 0;
  const totalEnrollments = allEnrollments?.length || 0;
  const totalCourses = allCourses?.length || 0;
  

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Staff Portal</h1>
            <p className="text-xl text-blue-100">Welcome back, {profile.full_name || profile.email}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            
            

            

            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Enrollments</h3>
              <p className="text-3xl font-bold text-green-600">{totalEnrollments}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Courses</h3>
              <p className="text-3xl font-bold text-purple-600">{totalCourses}</p>
            </div>
            
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              

              

              

              
              <Link href="/staff-portal/students" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Students</h3>
                <p className="text-sm text-gray-600">View all students</p>
              </Link>
              <Link href="/staff-portal/courses" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Courses</h3>
                <p className="text-sm text-gray-600">View all courses</p>
              </Link>
              <Link href="/admin" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Admin Panel</h3>
                <p className="text-sm text-gray-600">Access admin tools</p>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

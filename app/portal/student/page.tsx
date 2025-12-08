import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Portal',
  description: 'Access your courses and track your progress',
};

export default async function StudentDashboardPage() {
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

  if (!profile || profile.role !== 'student') {
    redirect('/unauthorized');
  }

  
  // Fetch student data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url
      )
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  const { data: progress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', user.id);

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('student_id', user.id);

  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0;
  const inProgressCourses = enrollments?.filter(e => e.status === 'active').length || 0;
  const totalCertificates = certificates?.length || 0;
  

  

  

  

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Student Portal</h1>
            <p className="text-xl text-blue-100">Welcome back, {profile.full_name || profile.email}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Courses</h3>
              <p className="text-3xl font-bold text-blue-600">{inProgressCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Certificates</h3>
              <p className="text-3xl font-bold text-purple-600">{totalCertificates}</p>
            </div>
            
            
            

            

            
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <Link href="/student/courses" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">My Courses</h3>
                <p className="text-sm text-gray-600">View and access your courses</p>
              </Link>
              <Link href="/student/progress" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Track Progress</h3>
                <p className="text-sm text-gray-600">See your learning progress</p>
              </Link>
              <Link href="/student/certificates" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Certificates</h3>
                <p className="text-sm text-gray-600">View your achievements</p>
              </Link>
              

              

              

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

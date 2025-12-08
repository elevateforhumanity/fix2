import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Program Holder Portal',
  description: 'Manage your students, attendance, and reports',
};

export default async function ProgramHolderDashboardPage() {
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

  if (!profile || profile.role !== 'program_holder') {
    redirect('/unauthorized');
  }

  

  
  // Fetch program holder data
  const { data: students } = await supabase
    .from('enrollments')
    .select(`
      *,
      profiles (
        id,
        full_name,
        email
      ),
      courses (
        title
      )
    `)
    .eq('program_holder_id', user.id);

  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('program_holder_id', user.id);

  const totalStudents = new Set(students?.map(s => s.student_id)).size || 0;
  const activeEnrollments = students?.filter(s => s.status === 'active').length || 0;
  const completions = students?.filter(s => s.status === 'completed').length || 0;
  

  

  

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Program Holder Portal</h1>
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
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Enrollments</h3>
              <p className="text-3xl font-bold text-green-600">{activeEnrollments}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completions</h3>
              <p className="text-3xl font-bold text-purple-600">{completions}</p>
            </div>
            

            

            
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              

              
              <Link href="/program-holder/portal/students" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Manage Students</h3>
                <p className="text-sm text-gray-600">View and manage your students</p>
              </Link>
              <Link href="/program-holder/portal/attendance" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">Track Attendance</h3>
                <p className="text-sm text-gray-600">Record student attendance</p>
              </Link>
              <Link href="/program-holder/portal/reports" className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-1">View Reports</h3>
                <p className="text-sm text-gray-600">Access analytics and reports</p>
              </Link>
              

              

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

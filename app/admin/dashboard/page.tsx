import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Users, GraduationCap, Building2, FileCheck, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/dashboard",
  },
  title: 'Admin Dashboard | Elevate For Humanity',
  description: 'Manage students, program holders, enrollments, and platform operations.',
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .limit(10);

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

  // Fetch real statistics
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: totalProgramHolders } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'program_holder');

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: completedEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const { count: pendingApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      status,
      profiles!enrollments_user_id_fkey (full_name, email),
      programs (name)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  // Recent applications
  const { data: recentApplications } = await supabase
    .from('applications')
    .select('id, created_at, status, full_name, email, program_interest')
    .order('created_at', { ascending: false })
    .limit(5);

  const completionRate = totalEnrollments && totalEnrollments > 0 
    ? Math.round(((completedEnrollments || 0) / totalEnrollments) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Dashboard"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Dashboard
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage your platform and monitor performance</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/students" className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
                Manage Students
              </Link>
              <Link href="/admin/program-holders" className="px-4 py-2 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                Manage Program Holders
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-700" size={24} />
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalStudents || 0}</p>
            <p className="text-sm text-slate-600 mt-1">Total Students</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="text-purple-700" size={24} />
              </div>
              <span className="text-sm font-medium text-blue-600">Partners</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalProgramHolders || 0}</p>
            <p className="text-sm text-slate-600 mt-1">Program Holders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-green-700" size={24} />
              </div>
              <span className="text-sm font-medium text-orange-600">{activeEnrollments || 0} Active</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalEnrollments || 0}</p>
            <p className="text-sm text-slate-600 mt-1">Total Enrollments</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileCheck className="text-orange-700" size={24} />
              </div>
              <span className="text-sm font-medium text-red-600">{pendingApplications || 0} Pending</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPrograms || 0}</p>
            <p className="text-sm text-slate-600 mt-1">Active Programs</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-700" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{completedEnrollments || 0}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
            <p className="text-xs text-slate-600 mt-2">{completionRate}% completion rate</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-700" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeEnrollments || 0}</p>
                <p className="text-sm text-slate-600">In Progress</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${totalEnrollments ? (activeEnrollments || 0) / totalEnrollments * 100 : 0}%` }} />
            </div>
            <p className="text-xs text-slate-600 mt-2">Currently active</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-orange-700" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{pendingApplications || 0}</p>
                <p className="text-sm text-slate-600">Pending Review</p>
              </div>
            </div>
            <Link href="/admin/applications" className="text-sm text-blue-700 font-semibold hover:underline">
              Review Applications →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Recent Enrollments</h2>
                <Link href="/admin/enrollments" className="text-sm text-blue-700 font-semibold hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentEnrollments && recentEnrollments.length > 0 ? (
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment: any) => (
                    <div key={enrollment.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-semibold text-slate-900">{enrollment.profiles?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-slate-600">{enrollment.programs?.name || 'Unknown Program'}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          enrollment.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          enrollment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {enrollment.status}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-slate-500">No recent enrollments</p>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
                <Link href="/admin/applications" className="text-sm text-blue-700 font-semibold hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentApplications && recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app: any) => (
                    <div key={app.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-semibold text-slate-900">{app.full_name}</p>
                        <p className="text-sm text-slate-600">{app.program_interest || 'No program specified'}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          app.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-slate-500">No recent applications</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/admin/students" className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center">
              <Users className="mx-auto mb-2 text-blue-700" size={24} />
              <p className="font-semibold text-slate-900">Manage Students</p>
            </Link>
            <Link href="/admin/program-holders" className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
              <Building2 className="mx-auto mb-2 text-purple-700" size={24} />
              <p className="font-semibold text-slate-900">Program Holders</p>
            </Link>
            <Link href="/admin/programs" className="p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center">
              <GraduationCap className="mx-auto mb-2 text-green-700" size={24} />
              <p className="font-semibold text-slate-900">Manage Programs</p>
            </Link>
            <Link href="/admin/reports" className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-center">
              <TrendingUp className="mx-auto mb-2 text-orange-700" size={24} />
              <p className="font-semibold text-slate-900">View Reports</p>
            </Link>
          </div>
        </div>
      
      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every great career begins with a single step. Whether you're looking to change careers, 
                  upgrade your skills, or enter the workforce for the first time, we're here to help you succeed. 
                  Our programs are 100% free, government-funded, and designed to get you hired fast.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% free training - no tuition, no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry-recognized certifications that employers value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Job placement assistance and career support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling for working adults</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}

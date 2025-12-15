import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Award, Clock, TrendingUp, CheckCircle, Calendar, Target, Bell } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/dashboard",
  },
  title: 'Student Dashboard | Elevate For Humanity',
  description: 'Your personalized learning dashboard',
};

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch user data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      programs (id, title, name, training_hours, category)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch recent activity
  const { data: recentActivity } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch upcoming assignments
  const { data: upcomingAssignments } = await supabase
    .from('assignments')
    .select('*')
    .gte('due_date', new Date().toISOString())
    .order('due_date', { ascending: true })
    .limit(5);

  // Calculate stats
  const totalCourses = enrollments?.length || 0;
  const completedCourses = enrollments?.filter(e => e.status === 'completed').length || 0;
  const inProgressCourses = enrollments?.filter(e => e.status === 'active').length || 0;
  const completionRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

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
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Dashboard
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
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
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back, {profile?.full_name || 'Student'}!
              </h1>
              <p className="text-slate-600 mt-1">Continue your learning journey</p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">{inProgressCourses}</p>
                <p className="text-sm text-slate-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">{completedCourses}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">{completionRate}%</p>
                <p className="text-sm text-slate-600">Completion Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Award className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Courses */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Active Courses</h2>
                <Link href="/portal/student/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment: Record<string, any>) => (
                    <div key={enrollment.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{enrollment.programs?.title || enrollment.programs?.name}</h3>
                          <p className="text-sm text-slate-600">{enrollment.programs?.category} • {enrollment.programs?.training_hours} hours</p>
                        </div>
                        <Link
                          href={`/portal/student/courses/${enrollment.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                          Continue
                        </Link>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium text-slate-900">0%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No active courses yet</p>
                  <Link href="/programs" className="text-blue-600 hover:text-blue-700 font-medium">
                    Browse Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Assignments</h2>
                <Link href="/portal/student/assignments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              {upcomingAssignments && upcomingAssignments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAssignments.map((assignment: any) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{assignment.title}</p>
                        <p className="text-sm text-slate-600">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-600 py-4">No upcoming assignments</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/portal/student/courses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <BookOpen size={20} className="text-blue-600" />
                  <span className="text-slate-700">My Courses</span>
                </Link>
                <Link href="/portal/student/assignments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <Target size={20} className="text-green-600" />
                  <span className="text-slate-700">Assignments</span>
                </Link>
                <Link href="/portal/student/grades" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <TrendingUp size={20} className="text-purple-600" />
                  <span className="text-slate-700">Grades</span>
                </Link>
                <Link href="/portal/student/calendar" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                  <Calendar size={20} className="text-orange-600" />
                  <span className="text-slate-700">Calendar</span>
                </Link>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                <Bell size={20} className="text-slate-400" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-700">Welcome to your student portal!</p>
                  <p className="text-xs text-slate-500 mt-1">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Browse All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}

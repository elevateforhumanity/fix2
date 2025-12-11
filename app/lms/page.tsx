import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/lms",
  },
  title: 'Learning Management System | Elevate For Humanity',
  description: 'Access your courses, track progress, and continue your learning journey.',
};

export default async function LmsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?next=/lms');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch student's enrollments
  const { data: enrollments, count: totalEnrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url,
        duration_weeks
      )
    `, { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { count: activeCourses } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'active');

  const { count: completedCourses } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'completed');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Learning Management System</h1>
              <p className="text-slate-600 mt-1">Welcome back, {profile?.full_name || profile?.email}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/student/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Student Dashboard
              </Link>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-slate-900">{totalEnrollments || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">{activeCourses || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedCourses || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/lms/courses"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
            >
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold text-slate-900">Browse Courses</div>
            </Link>
            <Link
              href="/lms/assignments"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-center"
            >
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold text-slate-900">Assignments</div>
            </Link>
            <Link
              href="/lms/grades"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
            >
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold text-slate-900">Grades</div>
            </Link>
            <Link
              href="/lms/calendar"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
            >
              <div className="text-3xl mb-2">📅</div>
              <div className="font-semibold text-slate-900">Calendar</div>
            </Link>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">My Courses</h2>
            <Link
              href="/lms/courses"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Browse All Courses →
            </Link>
          </div>

          {enrollments && enrollments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment: any) => (
                <Link
                  key={enrollment.id}
                  href={`/lms/courses/${enrollment.courses?.id}`}
                  className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    {enrollment.courses?.thumbnail_url ? (
                      <img
                        src={enrollment.courses.thumbnail_url}
                        alt={enrollment.courses?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                        <span className="text-4xl">📚</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        enrollment.status === 'active' ? 'bg-orange-100 text-orange-800' :
                        enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {enrollment.courses?.title || 'Untitled Course'}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {enrollment.courses?.description || 'No description available'}
                    </p>
                    {enrollment.progress_percentage !== null && (
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{enrollment.progress_percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress_percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Courses Yet</h3>
              <p className="text-slate-600 mb-6">
                Browse our course catalog to get started with your learning journey.
              </p>
              <Link
                href="/lms/courses"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

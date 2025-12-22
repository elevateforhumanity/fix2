import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, CheckCircle, Clock, Award, TrendingUp } from 'lucide-react';
import { ClaimApplications } from '@/components/ClaimApplications';

export const metadata = { title: 'Dashboard | LMS' };

export default async function DashboardPage() {
  // Require student or admin role
  const { user, profile } = await requireRole([
    'student',
    'admin',
    'super_admin',
  ]);

  const supabase = await createClient();

  // Get enrollment stats
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url
      )
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const activeCourses =
    enrollments?.filter((e) => e.status === 'active').length || 0;
  const completedCourses =
    enrollments?.filter((e) => e.status === 'completed').length || 0;

  // Get certificates
  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id);

  const certificateCount = certificates?.length || 0;

  // Get recent progress
  const { data: recentProgress } = await supabase
    .from('student_progress')
    .select(
      `
      *,
      courses (title)
    `
    )
    .eq('student_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Claim any pre-auth applications */}
      <ClaimApplications />
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome back, {profile?.first_name || 'Student'}! 👋
          </h1>
          {activeCourses > 0 ? (
            <div>
              <p className="text-base md:text-lg text-white/90 mb-2">
                You're making excellent progress on your training.
              </p>
              <p className="text-white/80">
                {activeCourses} active course{activeCourses > 1 ? 's' : ''} •{' '}
                {completedCourses} completed • {certificateCount} certificate
                {certificateCount !== 1 ? 's' : ''} earned
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base md:text-lg text-white/90 mb-2">
                Your learning journey starts here.
              </p>
              <p className="text-white/80">
                We're linking your applications to your account. Browse our programs below and enroll in your first course to begin earning industry-recognized certifications.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gamification Stats */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Badges */}
          <Link
            href="/student/badges"
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl hover:shadow-lg transition border border-orange-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🏆</div>
              <div className="text-2xl font-bold text-orange-600">
                {certificateCount}
              </div>
            </div>
            <div className="font-semibold text-gray-900">Badges Earned</div>
            <div className="text-sm text-gray-600">View all achievements →</div>
          </Link>

          {/* Progress Streak */}
          <Link
            href="/student/progress"
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition border border-purple-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🔥</div>
              <div className="text-2xl font-bold text-purple-600">
                {activeCourses}
              </div>
            </div>
            <div className="font-semibold text-gray-900">Active Courses</div>
            <div className="text-sm text-gray-600">View progress →</div>
          </Link>

          {/* Points */}
          <Link
            href="/lms/(app)/achievements"
            className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl hover:shadow-lg transition border border-teal-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">⭐</div>
              <div className="text-2xl font-bold text-teal-600">
                {completedCourses * 100}
              </div>
            </div>
            <div className="font-semibold text-gray-900">Total Points</div>
            <div className="text-sm text-gray-600">View achievements →</div>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-brand-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {activeCourses}
                </div>
                <div className="text-sm text-slate-600">In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-brand-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {completedCourses}
                </div>
                <div className="text-sm text-slate-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {certificateCount}
                </div>
                <div className="text-sm text-slate-600">Certificates</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {enrollments?.length || 0}
                </div>
                <div className="text-sm text-slate-600">Total Courses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Checklist for New Users */}
      {enrollments && enrollments.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white border-2 border-green-200 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Get Started in 4 Simple Steps
                </h2>
                <p className="text-slate-600">
                  Follow this checklist to set up your account and begin your
                  training. Each step takes just a few minutes.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className={`flex items-center gap-4 p-4 rounded-lg ${profile?.first_name ? 'bg-brand-green-100 border-2 border-brand-green-600' : 'bg-white border-2 border-blue-200 shadow-sm'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${profile?.first_name ? 'bg-brand-green-600' : 'bg-brand-blue-600'}`}
                >
                  {profile?.first_name ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-bold text-lg">1</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    Complete Your Profile
                  </h3>
                  <p className="text-sm text-slate-600">
                    Add your name, contact information, and photo so instructors
                    can identify you
                  </p>
                  {profile?.first_name && (
                    <p className="text-sm text-green-700 font-semibold mt-1">
                      ✓ Completed
                    </p>
                  )}
                </div>
                {!profile?.first_name && (
                  <Link
                    href="/lms/profile"
                    className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap"
                  >
                    Start Now →
                  </Link>
                )}
              </div>

              <div
                className={`flex items-center gap-4 p-4 rounded-lg ${enrollments && enrollments.length > 0 ? 'bg-brand-green-100 border-2 border-brand-green-600' : 'bg-white border-2 border-slate-200'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${enrollments && enrollments.length > 0 ? 'bg-brand-green-600' : 'bg-slate-300'}`}
                >
                  {enrollments && enrollments.length > 0 ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-bold text-lg">2</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    Enroll in Your First Course
                  </h3>
                  <p className="text-sm text-slate-600">
                    Choose from our industry-certified programs. Most students
                    qualify for 100% free training through WIOA, WRG, or JRI
                    funding.
                  </p>
                  {enrollments && enrollments.length > 0 && (
                    <p className="text-sm text-green-700 font-semibold mt-1">
                      ✓ Enrolled in {enrollments.length} course
                      {enrollments.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <Link
                  href="/programs"
                  className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap"
                >
                  Browse Programs →
                </Link>
              </div>

              <div
                className={`flex items-center gap-4 p-4 rounded-lg bg-white border-2 border-slate-200 ${enrollments && enrollments.length > 0 ? '' : 'opacity-50'}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-300">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    Watch Your First Lesson
                  </h3>
                  <p className="text-sm text-slate-600">
                    Each lesson includes video instruction, downloadable
                    resources, and knowledge checks. Your progress is
                    automatically saved.
                  </p>
                  {enrollments && enrollments.length === 0 && (
                    <p className="text-xs text-slate-500 mt-1 italic">
                      Available after enrollment
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center gap-4 p-4 rounded-lg bg-white border-2 border-slate-200 ${enrollments && enrollments.length > 0 ? '' : 'opacity-50'}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-300">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    Earn Your Certificate
                  </h3>
                  <p className="text-sm text-slate-600">
                    Complete all lessons and pass the final assessment to
                    receive your industry-recognized certificate. You can
                    download it as a PDF or share it on LinkedIn.
                  </p>
                  {enrollments && enrollments.length === 0 && (
                    <p className="text-xs text-slate-500 mt-1 italic">
                      Available after enrollment
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-base font-bold">?</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">
                    Questions? We're Here to Help
                  </h4>
                  <p className="text-slate-700 mb-4">
                    Our student success team is available Monday-Friday, 9am-5pm
                    EST. We can help with:
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1 mb-4">
                    <li>
                      • Checking your funding eligibility (WIOA, WRG, JRI)
                    </li>
                    <li>• Choosing the right program for your career goals</li>
                    <li>• Technical support with the learning platform</li>
                    <li>• Understanding course requirements and schedules</li>
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition"
                    >
                      Contact Support
                    </Link>
                    <a
                      href="tel:+13173143757"
                      className="bg-white hover:bg-slate-50 text-brand-blue-600 border-2 border-brand-blue-600 px-6 py-2 rounded-lg font-semibold text-sm transition"
                    >
                      Call (317) 314-3757
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Continue Where You Left Off */}
      {enrollments &&
        enrollments.length > 0 &&
        enrollments[0].progress > 0 &&
        enrollments[0].progress < 100 && (
          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">
                Continue Where You Left Off
              </h2>
              <p className="text-slate-600">
                Pick up right where you stopped. Your progress is automatically
                saved after each lesson.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  {enrollments[0].courses?.thumbnail_url ? (
                    <Image
                      src={enrollments[0].courses.thumbnail_url}
                      alt={enrollments[0].courses?.title || 'Course'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-800 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-blue-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    {enrollments[0].courses?.title}
                  </h3>
                  <p className="text-blue-100 mb-4">
                    You're {Math.round(enrollments[0].progress)}% through this
                    course
                  </p>
                  <div className="w-full bg-blue-800 rounded-full h-3 mb-4">
                    <div
                      className="bg-white h-3 rounded-full transition-all"
                      style={{ width: `${enrollments[0].progress}%` }}
                    />
                  </div>
                  <Link
                    href={`/lms/courses/${enrollments[0].course_id}`}
                    className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* All Courses */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">All Courses</h2>

        {enrollments && enrollments.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {enrollments.slice(0, 6).map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-48 bg-slate-200">
                  {enrollment.courses?.thumbnail_url ? (
                    <Image
                      src={enrollment.courses.thumbnail_url}
                      alt={enrollment.courses?.title || 'Course'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-slate-400" />
                    </div>
                  )}
                  {enrollment.progress > 0 && (
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(enrollment.progress)}% Complete
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {enrollment.courses?.title || 'Course'}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {enrollment.courses?.description || 'Course description'}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(enrollment.progress || 0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-brand-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/lms/courses/${enrollment.course_id}`}
                    className="block w-full text-center bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    {enrollment.progress === 0
                      ? 'Start Course'
                      : 'Continue Learning'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-brand-blue-600" />
            </div>
            <h3 className="text-lg md:text-lg font-bold mb-3">
              Ready to Start Learning?
            </h3>
            <p className="text-lg text-slate-700 mb-2 max-w-2xl mx-auto">
              Browse our industry-certified training programs and enroll in your
              first course.
            </p>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Most students qualify for 100% free training through government
              funding programs like WIOA, WRG, or JRI. We'll help you check your
              eligibility during enrollment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition text-lg"
              >
                Browse All Programs
              </Link>
              <Link
                href="/funding/how-it-works"
                className="inline-block bg-white hover:bg-slate-50 text-brand-blue-600 border-2 border-brand-blue-600 px-8 py-4 rounded-lg font-semibold transition text-lg"
              >
                Learn About Funding
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Recent Activity */}
      {recentProgress && recentProgress.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {recentProgress.map((progress) => (
                <div
                  key={progress.id}
                  className="flex items-center gap-4 pb-4 border-b last:border-0"
                >
                  <div className="w-10 h-10 bg-brand-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {progress.courses?.title}
                    </div>
                    <div className="text-sm text-slate-600">
                      {progress.completed_lessons} lessons completed
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(progress.updated_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Tutor Quick Access */}
      <Link
        href="/ai-tutor"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition hover:scale-105"
      >
        <span className="text-2xl">🤖</span>
        <div>
          <div className="font-bold">Need Help?</div>
          <div className="text-sm">Ask AI Tutor</div>
        </div>
      </Link>
    </main>
  );
}

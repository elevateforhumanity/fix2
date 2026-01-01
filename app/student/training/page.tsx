import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Clock, Award, CheckCircle, Lock, Play } from 'lucide-react';

export default async function StudentTrainingDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user's enrollments
  const { data: enrollments } = await supabase
    .from('training_enrollments')
    .select(
      `
      *,
      course:training_courses(*)
    `
    )
    .eq('user_id', user.id)
    .eq('status', 'active');

  // Get user's progress
  const { data: progress } = await supabase
    .from('training_progress')
    .select('*')
    .eq('user_id', user.id);

  // Get all available courses
  const { data: allCourses } = await supabase
    .from('training_courses')
    .select('*')
    .order('course_id');

  const enrolledCourseIds = enrollments?.map((e) => e.course_id) || [];
  const progressMap = new Map(progress?.map((p) => [p.lesson_id, p]) || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Training Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Continue your professional development journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-blue-600">
                  {enrollments?.length || 0}
                </p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {progress?.filter((p) => p.completed).length || 0}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours Completed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round(
                    (progress?.reduce(
                      (sum, p) => sum + (p.time_spent_seconds || 0),
                      0
                    ) || 0) / 3600
                  )}
                </p>
              </div>
              <Clock className="h-12 w-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates Earned</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {enrollments?.filter((e) => e.completed_at).length || 0}
                </p>
              </div>
              <Award className="h-12 w-12 text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* My Courses */}
        {enrollments && enrollments.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const course = enrollment.course;
                if (!course) return null;

                const courseProgress =
                  progress?.filter((p) =>
                    p.lesson_id?.startsWith(course.course_id)
                  ) || [];
                const completedLessons = courseProgress.filter(
                  (p) => p.completed
                ).length;
                const totalLessons = course.lessons || 0;
                const progressPercent =
                  totalLessons > 0
                    ? Math.round((completedLessons / totalLessons) * 100)
                    : 0;

                return (
                  <Link
                    key={enrollment.id}
                    href={`/student/training/${course.course_id}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {course.description}
                        </p>
                      </div>
                      {enrollment.completed_at && (
                        <Award className="h-6 w-6 text-yellow-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                          {completedLessons} of {totalLessons} lessons
                        </span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="text-blue-600 font-medium">
                        Continue →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses
              ?.filter(
                (course) => !enrolledCourseIds.includes(course.course_id)
              )
              .map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {course.description}
                      </p>
                    </div>
                    <Lock className="h-6 w-6 text-gray-400 flex-shrink-0 ml-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-600">
                      <BookOpen className="inline h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                    <span className="text-gray-600">
                      <Clock className="inline h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${(course.price / 100).toFixed(2)}
                    </span>
                    <Link
                      href={`/supersonic-fast-cash/careers/training#${course.course_id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

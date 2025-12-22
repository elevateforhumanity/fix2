import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/portal/student/courses',
  },
  title: 'My Courses | Student Portal',
  description: 'View and manage your enrolled courses',
};

export default async function StudentCoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch student enrollments with course details
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      courses (
        id,
        title,
        description,
        duration_weeks,
        difficulty_level,
        thumbnail_url
      )
    `
    )
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  // Fetch available courses not yet enrolled
  const enrolledCourseIds = enrollments?.map((e) => e.course_id) || [];
  const { data: availableCourses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .not('id', 'in', `(${enrolledCourseIds.join(',') || 'null'})`)
    .order('title');

  // Calculate stats
  const totalEnrolled = enrollments?.length || 0;
  const inProgress =
    enrollments?.filter(
      (e) => e.progress_percentage > 0 && e.progress_percentage < 100
    ).length || 0;
  const completed =
    enrollments?.filter((e) => e.progress_percentage === 100).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Courses"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Courses
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-2xl md:text-3xl lg:text-4xl">
              My Courses
            </h1>
            <p className="text-base md:text-lg text-blue-100">
              Track your learning progress and explore new courses
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Enrolled
                </h3>
                <svg
                  className="w-8 h-8 text-brand-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {totalEnrolled}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  In Progress
                </h3>
                <svg
                  className="w-8 h-8 text-brand-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-brand-blue-600">
                {inProgress}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                <svg
                  className="w-8 h-8 text-brand-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-brand-green-600">
                {completed}
              </p>
            </div>
          </div>

          {/* Enrolled Courses */}
          {enrollments && enrollments.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Enrolled Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment: Record<string, any>) => {
                  const course = enrollment.courses;
                  const progress = enrollment.progress_percentage || 0;

                  return (
                    <div
                      key={enrollment.id}
                      className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {course?.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48    flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course?.title || 'Untitled Course'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {course?.description || 'No description available'}
                        </p>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Progress
                            </span>
                            <span className="text-sm font-semibold text-brand-blue-600">
                              {progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-brand-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          {course?.duration_weeks && (
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {course.duration_weeks} weeks
                            </span>
                          )}
                          {course?.difficulty_level && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                course.difficulty_level === 'beginner'
                                  ? 'bg-brand-green-100 text-green-700'
                                  : course.difficulty_level === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {course.difficulty_level}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/student/courses/${course?.id}`}
                          className="block w-full text-center px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors"
                        >
                          {progress === 0
                            ? 'Start Learning'
                            : progress === 100
                              ? 'Review Course'
                              : 'Continue Learning'}
                        </Link>

                        {/* Storytelling Section */}
                        <section className="py-16 bg-white">
                          <div className="container mx-auto px-4">
                            <div className="max-w-7xl mx-auto">
                              <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                  <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                                    Your Journey Starts Here
                                  </h2>
                                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Every great career begins with a single
                                    step. Whether you're looking to change
                                    careers, upgrade your skills, or enter the
                                    workforce for the first time, we're here to
                                    help you succeed. Our programs are 100%
                                    free, government-funded, and designed to get
                                    you hired fast.
                                  </p>
                                  <ul className="space-y-4">
                                    <li className="flex items-start">
                                      <svg
                                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                      <span className="text-gray-700">
                                        100% free training - no tuition, no
                                        hidden costs
                                      </span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg
                                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                      <span className="text-gray-700">
                                        Industry-recognized certifications that
                                        employers value
                                      </span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg
                                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                      <span className="text-gray-700">
                                        Job placement assistance and career
                                        support
                                      </span>
                                    </li>
                                    <li className="flex items-start">
                                      <svg
                                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                      <span className="text-gray-700">
                                        Flexible scheduling for working adults
                                      </span>
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
                })}
              </div>
            </div>
          )}

          {/* Available Courses */}
          {availableCourses && availableCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course: Record<string, any>) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48    flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description || 'No description available'}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        {course.duration_weeks && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {course.duration_weeks} weeks
                          </span>
                        )}
                        {course.difficulty_level && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              course.difficulty_level === 'beginner'
                                ? 'bg-brand-green-100 text-green-700'
                                : course.difficulty_level === 'intermediate'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {course.difficulty_level}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/courses/${course.id}`}
                        className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!enrollments || enrollments.length === 0) &&
            (!availableCourses || availableCourses.length === 0) && (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Courses Available
                </h3>
                <p className="text-gray-600 mb-6">
                  Check back later for new courses or contact your administrator
                </p>
                <Link
                  href="/student/dashboard"
                  className="inline-block px-6 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700"
                >
                  Back to Dashboard
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

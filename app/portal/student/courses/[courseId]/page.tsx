import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CourseProgressTracker from './CourseProgressTracker';

export async function generateMetadata({ params }: { params: { courseId: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('id', params.courseId)
    .single();

  return {
    title: `${course?.title || 'Course'} | Student Portal`,
    description: 'Continue your learning journey',
  };
}

export default async function StudentCourseDetailPage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch enrollment with course details
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        duration_weeks,
        difficulty_level,
        thumbnail_url,
        category
      )
    `)
    .eq('user_id', user.id)
    .eq('course_id', params.courseId)
    .single();

  if (!enrollment) {
    redirect('/student/courses');
  }

  const course = enrollment.courses;
  const progress = enrollment.progress_percentage || 0;

  // Mock lesson data - in production, fetch from lessons table
  const totalLessons = 12;
  const completedLessons = Math.floor((progress / 100) * totalLessons);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/student/courses" className="text-blue-100 hover:text-white mb-4 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M15 19l-7-7 7-7" />
              </svg>
              Back to My Courses
            </Link>
            <h1 className="text-4xl font-bold mb-2">{course?.title}</h1>
            <p className="text-xl text-blue-100">{course?.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Overall Completion</span>
                    <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{completedLessons}</p>
                      <p className="text-sm text-gray-600">Lessons Completed</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{totalLessons - completedLessons}</p>
                      <p className="text-sm text-gray-600">Lessons Remaining</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{totalLessons}</p>
                      <p className="text-sm text-gray-600">Total Lessons</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                <CourseProgressTracker 
                  enrollmentId={enrollment.id}
                  courseId={params.courseId}
                  currentProgress={progress}
                  totalLessons={totalLessons}
                  completedLessons={completedLessons}
                />
              </div>

              {/* Learning Resources */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
                <div className="space-y-3">
                  <Link href={`/student/courses/${params.courseId}/resources`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Course Materials</p>
                      <p className="text-sm text-gray-600">PDFs, slides, and handouts</p>
                    </div>
                  </Link>
                  <Link href={`/student/courses/${params.courseId}/groups`} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Study Groups</p>
                      <p className="text-sm text-gray-600">Connect with classmates</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-bold mb-4">Course Details</h3>
                <div className="space-y-3 text-sm">
                  {course?.duration_weeks && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration_weeks} weeks</span>
                    </div>
                  )}
                  {course?.difficulty_level && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium capitalize">{course.difficulty_level}</span>
                    </div>
                  )}
                  {course?.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{course.category}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrolled:</span>
                    <span className="font-medium">
                      {new Date(enrollment.enrolled_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/student/ai-tutor" className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700">
                    Ask AI Tutor
                  </Link>
                  <Link href="/student/certificates" className="block w-full px-4 py-2 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50">
                    View Certificate
                  </Link>
                </div>
              </div>

              {/* Achievement */}
              {progress === 100 && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-bold text-green-900 mb-2">Course Completed!</h3>
                    <p className="text-sm text-green-800 mb-4">Congratulations on finishing this course</p>
                    <Link href="/student/certificates" className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Get Certificate
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

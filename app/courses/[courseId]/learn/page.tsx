import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Course Lessons | Elevate For Humanity',
  description: 'Access your course lessons and learning materials',
};

export default async function CourseLearnPage({ 
  params 
}: { 
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/courses/' + params.courseId + '/learn');
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', params.courseId)
    .single();

  if (!enrollment) {
    redirect('/courses/' + params.courseId + '/enroll');
  }

  // Fetch course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.courseId)
    .single();

  if (!course) {
    redirect('/student/courses');
  }

  // For partner courses, redirect to external LMS
  if (course.is_partner_course && course.external_url) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold mb-4">Access Partner Course</h1>
          <p className="text-gray-600 mb-6">
            This course is hosted by our partner. Click below to access the course content on their platform.
          </p>
          <a
            href={course.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Launch Course
          </a>
          <Link
            href="/student/courses"
            className="ml-4 inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  // For internal courses, show lesson viewer
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/student/courses" className="text-blue-600 hover:text-blue-700 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to My Courses
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-8">{course.description}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="font-bold text-blue-900 mb-3">Course Content Coming Soon</h2>
              <p className="text-blue-800 mb-4">
                We're currently building out the lesson content for this course. In the meantime, you can:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Track your progress on the course dashboard</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Access course materials and resources</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Connect with other students in study groups</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href={`/student/courses/${params.courseId}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Course Dashboard
              </Link>
              <Link
                href={`/student/courses/${params.courseId}/resources`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Course Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

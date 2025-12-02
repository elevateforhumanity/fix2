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

  // Fetch lessons for this course
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', params.courseId)
    .order('order', { ascending: true });

  // Fetch lesson progress
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  const progressMap = new Map(progress?.map(p => [p.lesson_id, p.completed]) || []);
  const lessonsWithProgress = lessons?.map(lesson => ({
    ...lesson,
    completed: progressMap.get(lesson.id) || false,
  })) || [];

  // For internal courses, show course player
  const CoursePlayer = (await import('./CoursePlayer')).default;

  return (
    <CoursePlayer
      courseId={params.courseId}
      courseTitle={course.title}
      lessons={lessonsWithProgress}
    />
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

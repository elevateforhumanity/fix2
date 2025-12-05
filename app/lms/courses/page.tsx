import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Courses | LMS | Elevate For Humanity',
  description: 'Access your enrolled courses and continue your learning journey',
};

export default async function LMSCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch user's enrollments with course details
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url,
        category,
        duration_hours,
        level
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch available courses (not enrolled)
  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  const { data: availableCourses } = await supabase
    .from('courses')
    .select('*')
    .eq('moderation_status', 'approved')
    .not('id', 'in', `(${enrolledCourseIds.join(',') || 'null'})`)
    .order('title');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
            
            {enrollments && enrollments.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {enrollments.map((enrollment: any) => (
                  <Link
                    key={enrollment.id}
                    href={`/portal/student/courses/${enrollment.course_id}`}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    {enrollment.courses?.thumbnail_url ? (
                      <div className="relative h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-lg overflow-hidden">
                        <Image
                          src={enrollment.courses.thumbnail_url}
                          alt={enrollment.courses.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-lg" />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{enrollment.courses?.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{enrollment.courses?.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-medium">Continue Learning →</span>
                        <span className="text-xs text-gray-500">{enrollment.status}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-12 text-center">
                <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse Available Courses →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      {availableCourses && availableCourses.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {availableCourses.slice(0, 6).map((course: any) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}/enroll`}
                    className="bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    {course.thumbnail_url ? (
                      <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-lg overflow-hidden">
                        <Image
                          src={course.thumbnail_url}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-lg" />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      <span className="text-sm text-blue-600 font-medium">Enroll Now →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All Courses →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

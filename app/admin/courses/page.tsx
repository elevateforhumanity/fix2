import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Plus, Edit, Eye } from 'lucide-react';
import { requireAdmin, createServerSupabaseClient } from '@/lib/auth';
import { getMockCourses } from '@/lib/mock-courses';

export const metadata = {
  title: 'Manage Courses | Admin',
  description: 'Manage all courses in the system',
};

export default async function AdminCoursesPage() {
  await requireAdmin();

  let courses = null;
  let error = null;
  let usingMockData = false;

  try {
    const supabase = await createServerSupabaseClient();

    // Try to fetch courses from database
    const result = await supabase
      .from('courses')
      .select(
        `
        id,
        slug,
        title,
        subtitle,
        description,
        level,
        duration_hours,
        status,
        is_free,
        created_at
      `
      )
      .order('created_at', { ascending: false });

    courses = result.data;
    error = result.error;

    // If no courses or error, use mock data
    if (!courses || courses.length === 0 || error) {
      console.log('Using mock courses data');
      courses = getMockCourses();
      usingMockData = true;
    }
  } catch (e) {
    // Supabase not configured, use mock data
    console.log('Supabase not configured, using mock courses data');
    courses = getMockCourses();
    usingMockData = true;
  }

  // Get enrollment counts for each course
  const courseIds = courses?.map((c) => c.id) || [];
  let enrollmentMap: Record<number, number> = {};

  if (!usingMockData) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: enrollmentCounts } = await supabase
        .from('enrollments')
        .select('course_id')
        .in('course_id', courseIds);

      enrollmentMap =
        enrollmentCounts?.reduce((acc: Record<number, number>, e) => {
          acc[e.course_id] = (acc[e.course_id] || 0) + 1;
          return acc;
        }, {}) || {};
    } catch (e) {
      // Ignore enrollment errors
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link
            href="/admin/dashboard"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/students"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Students
          </Link>
          <Link href="/admin/courses" className="text-red-600 font-semibold">
            Courses
          </Link>
          <Link
            href="/admin/certificates"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Certificates
          </Link>
          <Link
            href="/admin/reports"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Reports
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Admin Portal</div>
          <h1 className="elevate-hero-title">Manage Courses</h1>
          <p className="elevate-hero-subtitle">
            {courses?.length || 0} courses in the system
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Mock Data Banner */}
        {usingMockData && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900">
                  Using Mock Course Data
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Showing 17 sample courses for testing. To activate real
                  courses, run database migrations in Supabase.
                </p>
                <div className="mt-2">
                  <Link
                    href="/ACTIVATE_COURSES_NOW.md"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                  >
                    View Activation Guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">All Courses</h2>
            <p className="text-gray-600 mt-1">
              Manage course content, settings, and enrollments
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/courses/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>

        {!courses || courses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Courses Yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first course to get started
              </p>
              <Button asChild>
                <Link href="/admin/courses/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const enrollmentCount = enrollmentMap[course.id] || 0;

              return (
                <Card
                  key={course.id}
                  className="flex flex-col hover:border-orange-500 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <Badge
                        variant={
                          course.status === 'published'
                            ? 'success'
                            : 'secondary'
                        }
                      >
                        {course.status}
                      </Badge>
                      {course.is_free && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          FREE
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">
                      {course.title}
                    </CardTitle>
                    {course.subtitle && (
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                        {course.subtitle}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      {course.level && (
                        <div>
                          Level:{' '}
                          <span className="font-medium">{course.level}</span>
                        </div>
                      )}
                      {course.duration_hours && (
                        <div>
                          Duration:{' '}
                          <span className="font-medium">
                            {course.duration_hours} hours
                          </span>
                        </div>
                      )}
                      <div>
                        Enrollments:{' '}
                        <span className="font-medium">{enrollmentCount}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/admin/courses/${course.id}/content`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Content
                        </Link>
                      </Button>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/lms/courses/${course.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

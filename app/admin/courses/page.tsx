import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Plus, Edit, Eye } from 'lucide-react';
import { requireAdmin, createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Manage Courses | Admin',
  description: 'Manage all courses in the system',
};

export default async function AdminCoursesPage() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  // Fetch all courses
  const { data: courses, error } = await supabase
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

  // Get enrollment counts for each course
  const courseIds = courses?.map((c) => c.id) || [];
  const { data: enrollmentCounts } = await supabase
    .from('enrollments')
    .select('course_id')
    .in('course_id', courseIds);

  const enrollmentMap =
    enrollmentCounts?.reduce((acc: Record<number, number>, e) => {
      acc[e.course_id] = (acc[e.course_id] || 0) + 1;
      return acc;
    }, {}) || {};

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

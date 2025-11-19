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

  let courses = [];
  let error = null;
  let needsMigration = false;

  try {
    const supabase = await createServerSupabaseClient();

    // Try to fetch from courses table first
    const coursesResult = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (coursesResult.error) {
      // Courses table doesn't exist - need migration
      needsMigration = true;
      error = coursesResult.error;
    } else if (coursesResult.data) {
      courses = coursesResult.data;
    }
  } catch (e) {
    console.error('Error fetching courses:', e);
    needsMigration = true;
  }

  // Get enrollment counts (skip for now)
  const enrollmentMap: Record<string, number> = {};

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
        {/* Migration Needed Banner */}
        {needsMigration && (
          <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  ⚠️ Courses Table Not Created
                </h3>
                <p className="text-sm text-red-800 mb-3">
                  The courses table doesn't exist in your database yet. You need
                  to run the migration SQL to create it.
                </p>
                <div className="bg-white p-4 rounded border border-red-300 mb-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Quick Fix (2 minutes):
                  </p>
                  <ol className="text-sm text-gray-800 space-y-1 list-decimal list-inside">
                    <li>
                      Open:{' '}
                      <a
                        href="https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new"
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Supabase SQL Editor
                      </a>
                    </li>
                    <li>
                      Copy SQL from:{' '}
                      <a
                        href="https://raw.githubusercontent.com/elevateforhumanity/fix2/main/FINAL_MIGRATION.sql"
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        FINAL_MIGRATION.sql
                      </a>
                    </li>
                    <li>Paste and click "Run"</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
                <p className="text-xs text-red-700">
                  This will create the courses table and insert 17 courses.
                  Takes 10 seconds.
                </p>
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

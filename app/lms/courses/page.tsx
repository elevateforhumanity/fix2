import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, Users, Award, BookOpen } from 'lucide-react';
import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';
import EnrollButton from '@/components/lms/EnrollButton';

export const metadata = {
  title: 'Courses | Elevate LMS',
  description: 'Browse available courses',
};

export default async function CoursesPage() {
  const supabase = await createServerSupabaseClient();
  const user = await getCurrentUser();

  // Fetch all published courses from database
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
      metadata
    `
    )
    .eq('status', 'published')
    .order('title');

  // Fetch user's enrollments if logged in
  let enrolledCourseIds: number[] = [];
  if (user) {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id)
      .in('status', ['active', 'completed']);

    enrolledCourseIds = enrollments?.map((e) => e.course_id) || [];
  }

  if (error || !courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Course Catalog</h1>
                <p className="text-muted-foreground mt-1">
                  Explore our training programs
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/lms/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Courses Available</h2>
              <p className="text-gray-600 mb-6">
                Courses are being added to the platform. Check back soon!
              </p>
              <Button asChild>
                <Link href="/lms/dashboard">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Course Catalog</h1>
              <p className="text-muted-foreground mt-1">
                {courses.length} training programs available
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            const levelBadge = course.level || 'All Levels';

            return (
              <Card
                key={course.id}
                className="flex flex-col hover:border-orange-500 transition-colors"
              >
                <div className="h-48 bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white/80" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <Badge variant={isEnrolled ? 'default' : 'secondary'}>
                      {isEnrolled ? 'Enrolled' : levelBadge}
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
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  {course.subtitle && (
                    <CardDescription className="line-clamp-1 text-sm font-medium">
                      {course.subtitle}
                    </CardDescription>
                  )}
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    {course.duration_hours && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {course.duration_hours} hours
                      </div>
                    )}
                  </div>
                  {isEnrolled ? (
                    <Button className="w-full" asChild>
                      <Link href={`/lms/courses/${course.id}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button className="w-full" asChild>
                        <Link href={`/lms/courses/${course.id}`}>
                          View Course
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/enroll?course=${course.slug}`}>
                          Enroll Now
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}

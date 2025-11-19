import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  createServerSupabaseClient,
  getCurrentUser,
  requireStudent,
} from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function StudentCoursesPage() {
  await requireStudent();
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const supabase = await createServerSupabaseClient();

  // Fetch student's enrollments with course details
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(
      `
      id,
      status,
      enrolled_at,
      completed_at,
      progress_percentage,
      courses (
        id,
        title,
        subtitle,
        description,
        duration_hours,
        level
      )
    `
    )
    .eq('student_id', user.id)
    .order('enrolled_at', { ascending: false });

  const courses =
    enrollments?.map((enrollment) => {
      const course = enrollment.courses as any;
      return {
        id: course?.id || 0,
        title: course?.title || 'Unknown Course',
        subtitle: course?.subtitle || '',
        progress: enrollment.progress_percentage || 0,
        status: enrollment.status,
        duration_hours: course?.duration_hours || 0,
        level: course?.level || 'All Levels',
        enrollmentId: enrollment.id,
      };
    }) || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'active':
        return <Badge variant="primary">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'withdrawn':
        return <Badge variant="destructive">Withdrawn</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
            <p className="text-slate-600 mt-1">
              Track your progress and access course materials
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Courses Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't enrolled in any courses yet. Browse our catalog to
                get started!
              </p>
              <Button asChild>
                <Link href="/lms/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-600 mt-1">
            Track your progress and access course materials
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">Total Courses</div>
              <div className="text-3xl font-bold text-slate-900 mt-1">
                {courses.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">In Progress</div>
              <div className="text-3xl font-bold text-red-600 mt-1">
                {courses.filter((c) => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-slate-600">Completed</div>
              <div className="text-3xl font-bold text-green-600 mt-1">
                {courses.filter((c) => c.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="hover:border-orange-500 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {course.title}
                        </h3>
                        {course.subtitle && (
                          <p className="text-slate-600 text-sm">
                            {course.subtitle}
                          </p>
                        )}
                        {course.duration_hours > 0 && (
                          <p className="text-slate-500 text-sm mt-1">
                            {course.duration_hours} hours • {course.level}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(course.status)}
                    </div>

                    {(course.status === 'active' ||
                      course.status === 'completed') && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-600">
                              Progress
                            </span>
                            <span className="text-sm font-semibold text-slate-900">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      </div>
                    )}

                    {course.status === 'pending' && (
                      <div className="text-sm text-slate-500 mt-2">
                        Your enrollment is pending approval
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button
                      variant="primary"
                      fullWidth
                      disabled={
                        course.status === 'pending' ||
                        course.status === 'withdrawn'
                      }
                      asChild={
                        course.status === 'active' ||
                        course.status === 'completed'
                      }
                    >
                      {course.status === 'active' ||
                      course.status === 'completed' ? (
                        <Link href={`/lms/courses/${course.id}`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          {course.status === 'completed'
                            ? 'Review'
                            : 'Continue'}
                        </Link>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          {course.status === 'pending'
                            ? 'Pending'
                            : 'Unavailable'}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" fullWidth asChild>
                      <Link href={`/lms/courses/${course.id}`}>
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

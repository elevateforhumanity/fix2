import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CourseProgressTracker from './CourseProgressTracker';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('id', courseId)
    .single();

  return {
    title: `${course?.title || 'Course'} | Student Portal`,
    description: 'Continue your learning journey',
  };
}

export default async function StudentCourseDetailPage(props: Props) {
  const { courseId } = await props.params;
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (!course) {
    redirect('/portal/student');
  }

  // Get enrollment status
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single();

  // Get course modules
  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index');

  // Get user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId);

  const completedModules = progress?.filter((p) => p.completed).length || 0;
  const totalModules = modules?.length || 0;
  const progressPercentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <Link
              href="/portal/student"
              className="text-sm text-brand-blue-600 hover:text-brand-blue-700"
            >
              ← Back to Portal
            </Link>
          </div>

          {course.image_url && (
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={course.image_url}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            {course.title}
          </h1>

          {course.description && (
            <p className="mb-6 text-lg text-slate-600">{course.description}</p>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">
                Your Progress
              </span>
              <span className="text-slate-600">
                {progressPercentage}% Complete
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-brand-blue-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {enrollment && (
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-brand-green-100 px-3 py-1 font-semibold text-green-700">
                Enrolled
              </span>
              <span className="text-slate-600">
                Started {new Date(enrollment.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Course Progress Tracker */}
        {enrollment && (
          // @ts-expect-error TS2322: Type '{ courseId: string; userId: string; }' is not assignable to type 'Intri...
          <CourseProgressTracker courseId={courseId} userId={user.id} />
        )}

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Course Modules</h2>

          {modules && modules.length > 0 ? (
            <div className="space-y-3">
              {modules.map((module, index) => {
                const moduleProgress = progress?.find(
                  (p) => p.module_id === module.id
                );
                const isCompleted = moduleProgress?.completed || false;

                return (
                  <div
                    key={module.id}
                    className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                              isCompleted
                                ? 'bg-brand-green-100 text-brand-green-600'
                                : 'bg-blue-100 text-brand-blue-600'
                            }`}
                          >
                            {isCompleted ? '✓' : index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {module.title}
                          </h3>
                        </div>

                        {module.description && (
                          <p className="ml-11 text-slate-600">
                            {module.description}
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/portal/student/courses/${courseId}/modules/${module.id}`}
                        className={`ml-4 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                          isCompleted
                            ? 'bg-brand-green-600 hover:bg-green-700'
                            : 'bg-brand-blue-600 hover:bg-brand-blue-700'
                        }`}
                      >
                        {isCompleted ? 'Review' : 'Start'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">No modules available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

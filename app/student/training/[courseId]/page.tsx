import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Play,
  Lock,
  Clock,
  Award,
} from 'lucide-react';

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { courseId } = params;

  // Get course details
  const { data: course } = await supabase
    .from('training_courses')
    .select('*')
    .eq('course_id', courseId)
    .single();

  if (!course) {
    redirect('/student/training');
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('training_enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('status', 'active')
    .single();

  if (!enrollment) {
    redirect('/student/training');
  }

  // Get lessons
  const { data: lessons } = await supabase
    .from('training_lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('lesson_number');

  // Get progress
  const { data: progress } = await supabase
    .from('training_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('enrollment_id', enrollment.id);

  const progressMap = new Map(progress?.map((p) => [p.lesson_id, p]) || []);
  const completedCount = progress?.filter((p) => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/student/training"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>
                  <Clock className="inline h-4 w-4 mr-1" />
                  {course.duration}
                </span>
                <span>{totalLessons} lessons</span>
                <span>{completedCount} completed</span>
              </div>
            </div>
            {enrollment.completed_at && (
              <div className="flex flex-col items-center">
                <Award className="h-16 w-16 text-yellow-500 mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  Completed
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Course Lessons
          </h2>
          <div className="space-y-4">
            {lessons?.map((lesson, index) => {
              const lessonProgress = progressMap.get(lesson.id);
              const isCompleted = lessonProgress?.completed || false;
              const isInProgress = lessonProgress && !isCompleted;
              const isLocked =
                index > 0 &&
                !progressMap.get(lessons[index - 1]?.id)?.completed;

              return (
                <Link
                  key={lesson.id}
                  href={
                    isLocked
                      ? '#'
                      : `/student/training/${courseId}/lesson/${lesson.lesson_number}`
                  }
                  className={`
                    block p-6 rounded-lg border-2 transition-all
                    ${isCompleted ? 'border-green-500 bg-green-50' : ''}
                    ${isInProgress ? 'border-blue-500 bg-blue-50' : ''}
                    ${isLocked ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' : ''}
                    ${!isCompleted && !isInProgress && !isLocked ? 'border-gray-200 hover:border-blue-500 hover:shadow-md' : ''}
                  `}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {isCompleted && (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        )}
                        {isInProgress && (
                          <Play className="h-8 w-8 text-blue-600" />
                        )}
                        {isLocked && <Lock className="h-8 w-8 text-gray-400" />}
                        {!isCompleted && !isInProgress && !isLocked && (
                          <Circle className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Lesson {lesson.lesson_number}: {lesson.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            <Clock className="inline h-4 w-4 mr-1" />
                            {lesson.duration_minutes} min
                          </span>
                          {lessonProgress && (
                            <span>
                              Last accessed:{' '}
                              {new Date(
                                lessonProgress.last_accessed_at
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!isLocked && (
                      <div className="text-blue-600 font-medium">
                        {isCompleted
                          ? 'Review'
                          : isInProgress
                            ? 'Continue'
                            : 'Start'}{' '}
                        →
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

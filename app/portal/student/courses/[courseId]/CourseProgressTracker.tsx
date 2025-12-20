'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface CourseProgressTrackerProps {
  enrollmentId: string;
  courseId: string;
  currentProgress: number;
  totalLessons: number;
  completedLessons: number;
}

export default function CourseProgressTracker({
  enrollmentId,
  courseId,
  currentProgress,
  totalLessons,
  completedLessons,
}: CourseProgressTrackerProps) {
  const [progress, setProgress] = useState(currentProgress);
  const [completed, setCompleted] = useState(completedLessons);
  const [updating, setUpdating] = useState(false);

  const lessons = Array.from({ length: totalLessons }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}`,
    completed: i < completed,
  }));

  const updateProgress = async (lessonIndex: number) => {
    setUpdating(true);
    const newCompleted = lessonIndex + 1;
    const newProgress = Math.round((newCompleted / totalLessons) * 100);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('enrollments')
        .update({
          progress_percentage: newProgress,
          last_accessed_at: new Date().toISOString(),
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      setProgress(newProgress);
      setCompleted(newCompleted);
    } catch (err) {
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
            lesson.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                lesson.completed
                  ? 'bg-brand-green-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {lesson.completed ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                lesson.id
              )}
            </div>
            <div>
              <p
                className={`font-medium ${lesson.completed ? 'text-green-900' : 'text-gray-900'}`}
              >
                {lesson.title}
              </p>
              <p className="text-sm text-gray-600">
                {lesson.completed ? 'Completed' : 'Not started'}
              </p>
            </div>
          </div>
          {!lesson.completed && (
            <button
              onClick={() => updateProgress(index)}
              disabled={updating || index > completed}
              className="px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              {updating ? 'Updating...' : 'Mark Complete'}
            </button>
          )}
          {lesson.completed && (
            <span className="text-brand-green-600 font-medium text-sm">
              ✓ Done
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

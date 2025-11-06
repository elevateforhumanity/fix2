import { useState, useEffect } from 'react';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  progress: number;
  lastAccessed: Date;
}

interface CourseProgress {
  courseId: string;
  lessons: LessonProgress[];
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
}

export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [courseId]);

  const loadProgress = async () => {
    setLoading(true);
    try {
      // Load from localStorage for now - replace with API call
      const stored = localStorage.getItem(`course_progress_${courseId}`);
      if (stored) {
        const data = JSON.parse(stored);
        setProgress({
          ...data,
          lessons: data.lessons.map((l: any) => ({
            ...l,
            lastAccessed: new Date(l.lastAccessed),
          })),
        });
      } else {
        // Initialize empty progress
        setProgress({
          courseId,
          lessons: [],
          overallProgress: 0,
          completedLessons: 0,
          totalLessons: 0,
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLessonProgress = async (
    lessonId: string,
    progressPercent: number,
    completed: boolean = false
  ) => {
    if (!progress) return;

    const existingLesson = progress.lessons.find(
      (l) => l.lessonId === lessonId
    );
    const updatedLessons = existingLesson
      ? progress.lessons.map((l) =>
          l.lessonId === lessonId
            ? {
                ...l,
                progress: progressPercent,
                completed,
                lastAccessed: new Date(),
              }
            : l
        )
      : [
          ...progress.lessons,
          {
            lessonId,
            progress: progressPercent,
            completed,
            lastAccessed: new Date(),
          },
        ];

    const completedCount = updatedLessons.filter((l) => l.completed).length;
    const totalCount = updatedLessons.length;
    const overallProgress =
      totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    const updatedProgress: CourseProgress = {
      courseId,
      lessons: updatedLessons,
      overallProgress,
      completedLessons: completedCount,
      totalLessons: totalCount,
    };

    setProgress(updatedProgress);

    // Save to localStorage - replace with API call
    localStorage.setItem(
      `course_progress_${courseId}`,
      JSON.stringify(updatedProgress)
    );

    // TODO: Send to backend API
    // await fetch('/api/progress', {
    //   method: 'POST',
    //   body: JSON.stringify({ courseId, lessonId, progress: progressPercent, completed }),
    // });
  };

  const markLessonComplete = async (lessonId: string) => {
    await updateLessonProgress(lessonId, 100, true);
  };

  const getLessonProgress = (lessonId: string): LessonProgress | null => {
    return progress?.lessons.find((l) => l.lessonId === lessonId) || null;
  };

  const resetProgress = async () => {
    const emptyProgress: CourseProgress = {
      courseId,
      lessons: [],
      overallProgress: 0,
      completedLessons: 0,
      totalLessons: 0,
    };
    setProgress(emptyProgress);
    localStorage.removeItem(`course_progress_${courseId}`);
  };

  return {
    progress,
    loading,
    updateLessonProgress,
    markLessonComplete,
    getLessonProgress,
    resetProgress,
  };
}

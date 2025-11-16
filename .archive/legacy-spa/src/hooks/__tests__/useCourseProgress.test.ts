import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCourseProgress } from '../useCourseProgress';

describe('useCourseProgress', () => {
  const courseId = 'test-course-123';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty progress', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.progress).toEqual({
      courseId,
      lessons: [],
      overallProgress: 0,
      completedLessons: 0,
      totalLessons: 0,
    });
  });

  it('updates lesson progress', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.updateLessonProgress('lesson-1', 50, false);
    });

    expect(result.current.progress?.lessons).toHaveLength(1);
    expect(result.current.progress?.lessons[0]).toMatchObject({
      lessonId: 'lesson-1',
      progress: 50,
      completed: false,
    });
  });

  it('marks lesson as complete', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    expect(result.current.progress?.lessons[0]).toMatchObject({
      lessonId: 'lesson-1',
      progress: 100,
      completed: true,
    });
  });

  it('calculates overall progress correctly', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.markLessonComplete('lesson-1');
      result.current.updateLessonProgress('lesson-2', 50, false);
    });

    expect(result.current.progress?.completedLessons).toBe(1);
    expect(result.current.progress?.totalLessons).toBe(2);
    expect(result.current.progress?.overallProgress).toBe(50);
  });

  it('persists progress to localStorage', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    const stored = localStorage.getItem(`course_progress_${courseId}`);
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed.lessons).toHaveLength(1);
  });

  it('handles localStorage unavailable gracefully', async () => {
    // Mock localStorage to throw
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should not throw
    expect(() => {
      act(() => {
        result.current.markLessonComplete('lesson-1');
      });
    }).not.toThrow();

    setItemSpy.mockRestore();
  });

  it('resets progress', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.markLessonComplete('lesson-1');
    });

    expect(result.current.progress?.lessons).toHaveLength(1);

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.progress?.lessons).toHaveLength(0);
    expect(localStorage.getItem(`course_progress_${courseId}`)).toBeNull();
  });

  it('gets lesson progress by id', async () => {
    const { result } = renderHook(() => useCourseProgress(courseId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.updateLessonProgress('lesson-1', 75, false);
    });

    const lessonProgress = result.current.getLessonProgress('lesson-1');
    expect(lessonProgress).toMatchObject({
      lessonId: 'lesson-1',
      progress: 75,
      completed: false,
    });
  });
});

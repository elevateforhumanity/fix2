import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface ProgressTrackerProps {
  modules: Module[];
  currentLessonId?: string;
  onLessonClick?: (lessonId: string) => void;
}

export default function ProgressTracker({
  modules,
  currentLessonId,
  onLessonClick,
}: ProgressTrackerProps) {
  const totalLessons = modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-brown-200 p-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-brown-900">Course Progress</h3>
          <span className="text-sm font-semibold text-green-600">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-3 bg-beige-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-brown-600 mt-2">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>
      {/* Module List */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => {
          const moduleCompleted = module.lessons.filter(
            (l) => l.completed
          ).length;
          const moduleTotal = module.lessons.length;
          const moduleProgress =
            moduleTotal > 0 ? (moduleCompleted / moduleTotal) * 100 : 0;

          return (
            <div
              key={module.id}
              className="border-b border-brown-100 pb-4 last:border-0"
            >
              {/* Module Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-brown-900">
                    Module {moduleIndex + 1}: {module.title}
                  </h4>
                  <span className="text-xs text-brown-600">
                    {moduleCompleted}/{moduleTotal}
                  </span>
                </div>
                <div className="h-1.5 bg-beige-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-300"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
              {/* Lesson List */}
              <div className="space-y-2 ml-4">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isActive = lesson.id === currentLessonId;
                  const canAccess = !lesson.locked;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => canAccess && onLessonClick?.(lesson.id)}
                      disabled={!canAccess}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition ${
                        isActive
                          ? 'bg-green-50 border border-green-200'
                          : canAccess
                            ? 'hover:bg-beige-50'
                            : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : lesson.locked ? (
                          <Lock className="w-5 h-5 text-brown-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-brown-300" />
                        )}
                      </div>
                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? 'text-green-700' : 'text-brown-900'
                          }`}
                        >
                          {lessonIndex + 1}. {lesson.title}
                        </p>
                      </div>
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Completion Badge */}
      {progressPercent === 100 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="font-semibold text-green-900">Course Completed!</p>
          <p className="text-sm text-green-700 mt-1">
            Congratulations on finishing all lessons
          </p>
        </div>
      )}
    </div>
  );
}

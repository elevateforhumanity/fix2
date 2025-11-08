import { CheckCircle, Circle, Lock } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isLocked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  isLocked: boolean;
}

interface CourseProgressProps {
  modules: Module[];
  overallProgress: number;
  onLessonClick?: (moduleId: string, lessonId: string) => void;
}

export default function CourseProgress({
  modules,
  overallProgress,
  onLessonClick,
}: CourseProgressProps) {
  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const completedLessons = modules.reduce(
    (sum, module) => sum + module.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-brown-900 mb-4">
          Course Progress
        </h3>
        <ProgressBar
          progress={overallProgress}
          size="lg"
          showLabel
          label="Overall Completion"
        />
        <div className="mt-4 flex items-center justify-between text-sm text-brown-600">
          <span>
            {completedLessons} of {totalLessons} lessons completed
          </span>
          <span className="font-semibold">{Math.round(overallProgress)}%</span>
        </div>
      </div>
      {/* Module Progress */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => {
          const moduleCompleted = module.lessons.filter(
            (l) => l.completed
          ).length;
          const moduleTotal = module.lessons.length;
          const moduleProgress =
            moduleTotal > 0 ? (moduleCompleted / moduleTotal) * 100 : 0;

          return (
            <div key={module.id} className="card p-6">
              {/* Module Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-brown-500 uppercase">
                      Module {moduleIndex + 1}
                    </span>
                    {module.isLocked && (
                      <Lock className="w-4 h-4 text-brown-400" />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-brown-900">
                    {module.title}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {moduleCompleted}/{moduleTotal}
                  </div>
                  <div className="text-xs text-brown-500">Lessons</div>
                </div>
              </div>
              {/* Module Progress Bar */}
              <ProgressBar
                progress={moduleProgress}
                size="sm"
                showLabel={false}
                className="mb-4"
              />
              {/* Lessons List */}
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson.id}
                    onClick={() =>
                      !lesson.isLocked && onLessonClick?.(module.id, lesson.id)
                    }
                    disabled={lesson.isLocked}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                      lesson.isLocked
                        ? 'bg-beige-100 cursor-not-allowed opacity-60'
                        : lesson.completed
                          ? 'bg-green-50 hover:bg-green-100'
                          : 'bg-beige-50 hover:bg-beige-100'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {lesson.isLocked ? (
                        <Lock className="w-5 h-5 text-brown-400" />
                      ) : lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 fill-current" />
                      ) : (
                        <Circle className="w-5 h-5 text-brown-400" />
                      )}
                    </div>
                    {/* Lesson Info */}
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-brown-900">
                        Lesson {lessonIndex + 1}: {lesson.title}
                      </div>
                    </div>
                    {/* Status Badge */}
                    {lesson.completed && (
                      <div className="flex-shrink-0">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                          Completed
                        </span>
                      </div>
                    )}
                    {lesson.isLocked && (
                      <div className="flex-shrink-0">
                        <span className="text-xs px-2 py-1 rounded-full bg-brown-100 text-brown-600 font-semibold">
                          Locked
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Completion Message */}
      {overallProgress === 100 && (
        <div className="card p-6 bg-gradient-to-r from-green-50 to-beige-50 border-l-4 border-green-600">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎉</div>
            <div>
              <h3 className="text-lg font-bold text-brown-900 mb-1">
                Congratulations!
              </h3>
              <p className="text-brown-600">
                You've completed all lessons in this course. Your certificate is
                ready!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

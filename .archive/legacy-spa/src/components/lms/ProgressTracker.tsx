import { CheckCircle, Circle, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

interface ProgressTrackerProps {
  lessons: Lesson[];
  currentLessonId: string;
  onLessonClick: (id: string) => void;
}

export default function ProgressTracker({
  lessons,
  currentLessonId,
  onLessonClick,
}: ProgressTrackerProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold mb-4">Course Progress</h3>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => !lesson.locked && onLessonClick(lesson.id)}
            disabled={lesson.locked}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
              lesson.id === currentLessonId
                ? 'bg-brand-blue text-white'
                : lesson.locked
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'hover:bg-slate-50'
            }`}
          >
            {lesson.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : lesson.locked ? (
              <Lock className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
            <span className="flex-1 text-left">{lesson.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

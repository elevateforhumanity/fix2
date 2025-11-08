import React from 'react';
import { useCoach } from '../../hooks/useCoach';

interface CoachPanelProps {
  courseId: string;
}

export default function CoachPanel({ courseId }: CoachPanelProps) {
  const { plan, loading, refreshPlan } = useCoach(courseId);

  return (
    <div className="rounded-2xl p-6 shadow-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">
          🤖 Your AI Study Coach
        </h3>
        <button
          onClick={refreshPlan}
          disabled={loading}
          className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Refresh Plan'}
        </button>
      </div>
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <p className="ml-3 text-gray-600">
            Analyzing your performance and generating your personalized study
            plan...
          </p>
        </div>
      )}
      {!loading && plan && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Today's focus areas are based on your quiz performance and time to
            test.
          </p>
          <ul className="space-y-3">
            {plan.tasks?.map((task: any, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-gray-900">{task.title}</strong>
                  <p className="text-sm text-gray-600 mt-1">{task.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && !plan && (
        <p className="text-gray-500 text-center py-8">
          Click "Refresh Plan" to generate your personalized study plan.
        </p>
      )}
    </div>
  );
}

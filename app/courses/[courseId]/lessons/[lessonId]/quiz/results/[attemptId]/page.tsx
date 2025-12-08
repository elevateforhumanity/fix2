import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function QuizResultsPage({
  params,
}: {
  params: { courseId: string; lessonId: string; attemptId: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/signin');

  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*, quizzes(title, passing_score, total_questions)')
    .eq('id', params.attemptId)
    .eq('user_id', user.id)
    .single();

  if (!attempt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl border p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Results Not Found</h1>
          <Link href={`/courses/${params.courseId}/learn`} className="text-orange-600 hover:text-orange-700 font-medium">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const passed = attempt.score >= (attempt.quizzes.passing_score || 70);
  const correctAnswers = Math.round((attempt.score / 100) * attempt.quizzes.total_questions);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Results Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Congratulations!' : 'Keep Starting!'}
          </h1>
          <p className="text-slate-600 mb-8">
            {passed
              ? 'You passed the quiz!'
              : `You need ${attempt.quizzes.passing_score}% to pass. You can retake the quiz.`}
          </p>

          {/* Score */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-slate-900 mb-2">{attempt.score}%</div>
            <p className="text-slate-600">
              {correctAnswers} out of {attempt.quizzes.total_questions} correct
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{attempt.score}%</div>
              <div className="text-xs text-slate-600">Your Score</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{attempt.quizzes.passing_score}%</div>
              <div className="text-xs text-slate-600">Passing Score</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{correctAnswers}/{attempt.quizzes.total_questions}</div>
              <div className="text-xs text-slate-600">Correct</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/courses/${params.courseId}/lessons/${params.lessonId}/quiz/review/${params.attemptId}`}
              className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Review Answers
            </Link>
            {!passed && (
              <Link
                href={`/courses/${params.courseId}/lessons/${params.lessonId}/quiz`}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Retake Quiz
              </Link>
            )}
            {passed && (
              <Link
                href={`/courses/${params.courseId}/learn`}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Continue Course
              </Link>
            )}
          </div>
        </div>

        {/* Feedback */}
        <div className={`mt-6 p-6 rounded-xl border ${
          passed ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`font-semibold mb-2 ${passed ? 'text-green-900' : 'text-blue-900'}`}>
            {passed ? 'Great Job!' : 'Study Tips'}
          </h3>
          <p className={`text-sm ${passed ? 'text-green-800' : 'text-blue-800'}`}>
            {passed
              ? 'You\'ve demonstrated mastery of this material. Continue to the next lesson to keep building your skills.'
              : 'Review the lesson material and start again. Focus on the areas where you missed questions.'}
          </p>
        </div>
      </div>
    </div>
  );
}

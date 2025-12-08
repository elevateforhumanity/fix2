import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function QuizReviewPage({
  params,
}: {
  params: { courseId: string; lessonId: string; attemptId: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/signin');

  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*, quizzes(title)')
    .eq('id', params.attemptId)
    .eq('user_id', user.id)
    .single();

  if (!attempt) {
    return <div>Attempt not found</div>;
  }

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', attempt.quiz_id)
    .order('order');

  const userAnswers = attempt.answers as Record<string, number>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Quiz Review</h1>
          <p className="text-slate-600">{attempt.quizzes.title}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-sm text-slate-600">
              Your Score: <span className="font-bold text-slate-900">{attempt.score}%</span>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions?.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div key={question.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  {/* Question Number */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isCorrect ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    {/* Question */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {index + 1}. {question.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-4">
                      {question.options.map((option: string, optionIndex: number) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = question.correct_answer === optionIndex;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-50'
                                : isUserAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCorrectAnswer
                                  ? 'border-green-500 bg-green-500'
                                  : isUserAnswer
                                  ? 'border-red-500 bg-red-500'
                                  : 'border-slate-300'
                              }`}>
                                {(isCorrectAnswer || isUserAnswer) && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span className="flex-1">{option}</span>
                              {isCorrectAnswer && (
                                <span className="text-xs font-semibold text-green-700">Correct Answer</span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="text-xs font-semibold text-red-700">Your Answer</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                        <p className="text-sm text-blue-800">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/courses/${params.courseId}/learn`}
            className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-center font-semibold hover:bg-slate-50 transition"
          >
            Back to Course
          </Link>
          <Link
            href={`/courses/${params.courseId}/lessons/${params.lessonId}/quiz`}
            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg text-center font-semibold hover:bg-orange-700 transition"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

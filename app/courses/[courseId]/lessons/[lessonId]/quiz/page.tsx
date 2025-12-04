import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function QuizStartPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/signin');

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', params.lessonId)
    .single();

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl border p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">No Quiz Available</h1>
          <p className="text-slate-600 mb-6">This lesson doesn't have a quiz yet.</p>
          <Link href={`/courses/${params.courseId}/learn`} className="text-orange-600 hover:text-orange-700 font-medium">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const { data: attempts } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('quiz_id', quiz.id)
    .eq('user_id', user.id);

  const attemptsUsed = attempts?.length || 0;
  const attemptsRemaining = quiz.max_attempts ? quiz.max_attempts - attemptsUsed : 999;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl border p-8">
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-slate-600 mb-8">{quiz.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Questions</div>
            <div className="text-2xl font-bold">{quiz.total_questions || 10}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Passing Score</div>
            <div className="text-2xl font-bold">{quiz.passing_score || 70}%</div>
          </div>
          {quiz.time_limit && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600">Time Limit</div>
              <div className="text-2xl font-bold">{quiz.time_limit} min</div>
            </div>
          )}
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Attempts Remaining</div>
            <div className="text-2xl font-bold">{attemptsRemaining}</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Read each question carefully</li>
            <li>• You must score {quiz.passing_score || 70}% or higher to pass</li>
            {quiz.time_limit && <li>• Complete the quiz within {quiz.time_limit} minutes</li>}
            <li>• You can review your answers before submitting</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/courses/${params.courseId}/learn`}
            className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-center font-semibold hover:bg-slate-50 transition"
          >
            Back to Lesson
          </Link>
          <Link
            href={`/courses/${params.courseId}/lessons/${params.lessonId}/quiz/take`}
            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg text-center font-semibold hover:bg-orange-700 transition"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

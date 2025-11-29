'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
  explanation: string | null;
  points: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    // Get lesson
    const { data: lessonData } = await supabase
      .from('lessons')
      .select('*, programs(title, slug)')
      .eq('id', params.lessonId)
      .single();

    if (lessonData) {
      setLesson(lessonData);
    }

    // Get questions
    const { data: questionsData } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('lesson_id', params.lessonId)
      .order('order_index');

    if (questionsData) {
      setQuestions(questionsData.map(q => ({
        ...q,
        options: q.options as string[]
      })));
    }

    setLoading(false);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((q) => {
      totalPoints += q.points;
      if (answers[q.id] === q.correct_answer) {
        correctCount++;
        earnedPoints += q.points;
      }
    });

    setScore(earnedPoints);
    setSubmitted(true);

    // Save attempt
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const percentage = (earnedPoints / totalPoints) * 100;
      const passed = percentage >= 70; // 70% passing grade

      await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          lesson_id: params.lessonId,
          score: earnedPoints,
          total_points: totalPoints,
          percentage,
          passed,
          answers,
          completed_at: new Date().toISOString(),
        });

      // If passed, mark lesson as complete
      if (passed) {
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('id')
          .eq('user_id', user.id)
          .eq('program_id', lesson.program_id)
          .single();

        if (enrollment) {
          await supabase
            .from('lesson_progress')
            .upsert({
              enrollment_id: enrollment.id,
              lesson_id: params.lessonId,
              status: 'completed',
              completed_at: new Date().toISOString(),
            });
        }
      }
    }
  };

  const retakeQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
  const passed = percentage >= 70;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/programs/${lesson?.programs?.slug}/learn`)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Course
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {lesson?.title}
          </h1>
          <p className="text-gray-600">
            {questions.length} questions • {totalPoints} points total • 70% to pass
          </p>
        </div>

        {!submitted ? (
          /* Quiz Questions */
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {question.question_text}
                    </h3>

                    {question.question_type === 'multiple_choice' && (
                      <div className="space-y-3">
                        {question.options.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-gray-900">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.question_type === 'true_false' && (
                      <div className="space-y-3">
                        {['True', 'False'].map((option) => (
                          <label
                            key={option}
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-gray-900">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 text-sm text-gray-500">
                      {question.points} {question.points === 1 ? 'point' : 'points'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results */
          <div>
            <div className={`rounded-lg p-8 mb-8 text-center ${
              passed ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="text-6xl mb-4">
                {passed ? '🎉' : '📚'}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${
                passed ? 'text-green-900' : 'text-red-900'
              }`}>
                {passed ? 'Congratulations!' : 'Keep Studying'}
              </h2>
              <p className={`text-xl mb-4 ${
                passed ? 'text-green-800' : 'text-red-800'
              }`}>
                You scored {score} out of {totalPoints} points ({percentage.toFixed(1)}%)
              </p>
              <p className={passed ? 'text-green-700' : 'text-red-700'}>
                {passed 
                  ? 'You passed! This lesson is now marked as complete.' 
                  : 'You need 70% to pass. Review the material and try again.'}
              </p>
            </div>

            {/* Answer Review */}
            <div className="space-y-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Answer Review</h3>
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correct_answer;

                return (
                  <div key={question.id} className={`rounded-lg p-6 ${
                    isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Question {index + 1}: {question.question_text}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Your answer:</span>{' '}
                            <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {userAnswer || 'No answer'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p>
                              <span className="font-medium">Correct answer:</span>{' '}
                              <span className="text-green-700">{question.correct_answer}</span>
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-gray-700 mt-2">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {passed ? (
                <button
                  onClick={() => router.push(`/programs/${lesson?.programs?.slug}/learn`)}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue to Next Lesson
                </button>
              ) : (
                <>
                  <button
                    onClick={retakeQuiz}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => router.push(`/programs/${lesson?.programs?.slug}/learn`)}
                    className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Review Lessons
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

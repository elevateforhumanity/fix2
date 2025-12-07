'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TakeQuizPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch quiz questions
    fetch(`/api/quizzes/lesson/${params.lessonId}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || []);
        if (data.timeLimit) {
          setTimeRemaining(data.timeLimit * 60); // Convert to seconds
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load quiz:', err);
        setLoading(false);
      });
  }, [params.lessonId]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const unanswered = questions.filter(q => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`)) {
        return;
      }
    }

    setSubmitting(true);

    start {
      const response = await fetch(`/api/quizzes/lesson/${params.lessonId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/courses/${params.courseId}/lessons/${params.lessonId}/quiz/results/${data.attemptId}`);
      } else {
        alert('Failed to submit quiz. Please start again.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit quiz. Please start again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 sticky top-4 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Quiz in Progress</h1>
              <p className="text-sm text-slate-600 mt-1">
                {answeredCount} of {questions.length} questions answered
              </p>
            </div>
            <div className="text-right">
              {timeRemaining !== null && (
                <div className={`text-2xl font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatTime(timeRemaining)}
                </div>
              )}
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-orange-600 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">{question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option: string, optionIndex: number) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswerSelect(question.id, optionIndex)}
                        className={`
                          w-full text-left p-4 rounded-lg border-2 transition-all
                          ${answers[question.id] === optionIndex
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${answers[question.id] === optionIndex
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-slate-300'
                            }
                          `}>
                            {answers[question.id] === optionIndex && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-slate-900">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">
                {answeredCount === questions.length
                  ? 'All questions answered!'
                  : `${questions.length - answeredCount} questions remaining`}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

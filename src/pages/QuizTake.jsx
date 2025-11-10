/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function QuizTake() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetchQuizQuestions();
  }, [lessonId]);

  const fetchQuizQuestions = async () => {
    if (!supabase) {
      setError('Database service is not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to take the quiz');
        return;
      }

      const { data, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('id');

      if (questionsError) throw questionsError;

      if (!data || data.length === 0) {
        setError('No quiz questions found for this lesson');
        return;
      }

      setQuestions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!supabase) {
      setError('Database service is not available');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to submit quiz');
        return;
      }

      // Save all responses
      const responses = questions.map((q) => ({
        question_id: q.id,
        user_id: user.id,
        answer: answers[q.id] || null,
        created_at: new Date().toISOString(),
      }));

      const { error: insertError } = await supabase
        .from('quiz_responses')
        .upsert(responses, {
          onConflict: 'question_id,user_id',
        });

      if (insertError) throw insertError;

      // Navigate to results
      navigate(`/quiz-results/${lessonId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const progress =
    questions.length > 0
      ? Math.round(((currentQuestion + 1) / questions.length) * 100)
      : 0;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Take Quiz</h1>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading quiz...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600-hover"
            >
              Go Back
            </button>
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-brown-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            {/* Question Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].prompt}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options?.map((option, idx) => (
                  <label
                    key={idx}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                      answers[questions[currentQuestion].id] === option
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-brown-300 hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={option}
                      checked={
                        answers[questions[currentQuestion].id] === option
                      }
                      onChange={() =>
                        handleAnswerSelect(
                          questions[currentQuestion].id,
                          option
                        )
                      }
                      className="mr-3"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(questions.length - 1, prev + 1)
                    )
                  }
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={
                    submitting || Object.keys(answers).length < questions.length
                  }
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>
            {/* Answer Status */}
            <div className="bg-beige-50 rounded-lg p-4">
              <p className="text-sm text-brown-600">
                Answered: {Object.keys(answers).length} / {questions.length}
              </p>
              {Object.keys(answers).length < questions.length && (
                <p className="text-sm text-orange-600 mt-1">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-brown-600">No quiz available for this lesson</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function QuizResults() {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizResults();
  }, [quizId]);

  const fetchQuizResults = async () => {
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
        setError('Please log in to view quiz results');
        return;
      }

      // Fetch quiz responses for this user
      const { data: responses, error: responsesError } = await supabase
        .from('quiz_responses')
        .select(
          `
          *,
          quiz_questions (
            id,
            prompt,
            options,
            answer,
            lesson_id
          )
        `
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (responsesError) throw responsesError;

      // Calculate score
      let correct = 0;
      let total = responses?.length || 0;

      responses?.forEach((response) => {
        if (response.answer === response.quiz_questions?.answer) {
          correct++;
        }
      });

      const score = total > 0 ? Math.round((correct / total) * 100) : 0;

      setResults({
        responses,
        correct,
        total,
        score,
        passed: score >= 70,
      });
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading results...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error}</p>
          </div>
        ) : results ? (
          <div className="space-y-6">
            {/* Score Card */}
            <div
              className={`rounded-lg shadow-lg p-8 text-center ${
                results.passed
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              }`}
            >
              <h2 className="text-5xl font-bold mb-4">{results.score}%</h2>
              <p className="text-2xl mb-2">
                {results.correct} out of {results.total} correct
              </p>
              <p
                className={`text-xl font-semibold ${
                  results.passed ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {results.passed
                  ? '✓ Passed'
                  : '✗ Failed - 70% required to pass'}
              </p>
            </div>
            {/* Detailed Results */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold mb-4">Question Review</h3>
              <div className="space-y-4">
                {results.responses?.map((response, idx) => {
                  const isCorrect =
                    response.answer === response.quiz_questions?.answer;
                  return (
                    <div
                      key={response.question_id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold">Question {idx + 1}</p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            isCorrect
                              ? 'bg-green-200 text-green-600'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="mb-3">{response.quiz_questions?.prompt}</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Your answer:</strong>{' '}
                          {response.answer || 'No answer'}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-700">
                            <strong>Correct answer:</strong>{' '}
                            {response.quiz_questions?.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Back to Course
              </button>
              {!results.passed && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-brown-600">No quiz results found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

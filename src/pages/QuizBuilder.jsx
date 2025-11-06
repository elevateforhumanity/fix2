/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function QuizBuilder() {
  const { lessonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: '',
    options: ['', '', '', ''],
    answer: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [lessonId]);

  const fetchQuestions = async () => {
    if (!supabase) {
      setError('Database service is not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('id');

      if (questionsError) throw questionsError;

      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!supabase) {
      setError('Database service is not available');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      if (!newQuestion.prompt.trim()) {
        setError('Question prompt is required');
        return;
      }

      const validOptions = newQuestion.options.filter((opt) => opt.trim());
      if (validOptions.length < 2) {
        setError('At least 2 options are required');
        return;
      }

      if (!newQuestion.answer.trim()) {
        setError('Correct answer is required');
        return;
      }

      const { data, error: insertError } = await supabase
        .from('quiz_questions')
        .insert([
          {
            lesson_id: lessonId,
            prompt: newQuestion.prompt,
            options: validOptions,
            answer: newQuestion.answer,
          },
        ])
        .select();

      if (insertError) throw insertError;

      setQuestions([...questions, ...data]);
      setNewQuestion({
        prompt: '',
        options: ['', '', '', ''],
        answer: '',
      });
      setSuccess('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', questionId);

      if (deleteError) throw deleteError;

      setQuestions(questions.filter((q) => q.id !== questionId));
      setSuccess('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
      setError(error.message);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Quiz Builder</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-600">{success}</p>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Add New Question Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Question Prompt *
                  </label>
                  <textarea
                    value={newQuestion.prompt}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, prompt: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="Enter your question here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Answer Options * (at least 2 required)
                  </label>
                  {newQuestion.options.map((option, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-green-500"
                      placeholder={`Option ${idx + 1}`}
                    />
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Correct Answer *
                  </label>
                  <select
                    value={newQuestion.answer}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, answer: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select correct answer...</option>
                    {newQuestion.options
                      .filter((opt) => opt.trim())
                      .map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  onClick={handleAddQuestion}
                  disabled={saving}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold transition"
                >
                  {saving ? 'Adding...' : 'Add Question'}
                </button>
              </div>
            </div>
            {/* Existing Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Existing Questions ({questions.length})
              </h2>
              {questions.length === 0 ? (
                <p className="text-brown-500 text-center py-8">
                  No questions yet. Add your first question above!
                </p>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, idx) => (
                    <div
                      key={question.id}
                      className="border-2 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">
                          Question {idx + 1}
                        </h3>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-600-hover text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="mb-3">{question.prompt}</p>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold">Options:</p>
                        <ul className="list-disc list-inside pl-4">
                          {question.options?.map((option, optIdx) => (
                            <li
                              key={optIdx}
                              className={
                                option === question.answer
                                  ? 'text-green-600 font-bold'
                                  : ''
                              }
                            >
                              {option}{' '}
                              {option === question.answer && '✓ (Correct)'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

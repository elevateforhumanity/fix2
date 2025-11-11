/**
 * Quiz/Assessment Builder
 * Create quizzes and assessments with multiple question types
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Save, 
  Eye, 
  Plus,
  Trash2,
  GripVertical,
  CheckSquare,
  Circle,
  Type,
  FileText,
  Clock,
  Award
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  explanation?: string;
}

export default function QuizBuilder() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [passingScore, setPassingScore] = useState('70');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What is the first step in a professional haircut consultation?',
      options: ['Start cutting immediately', 'Discuss client preferences', 'Wash hair', 'Apply product'],
      correctAnswer: 1,
      points: 10,
      explanation: 'Always discuss client preferences before starting any service.'
    }
  ]);

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      type,
      question: '',
      points: 10,
      ...(type === 'multiple-choice' && { options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correctAnswer: 0 }),
      ...(type === 'true-false' && { options: ['True', 'False'], correctAnswer: 0 })
    };
    setQuestions([...questions, newQuestion]);
    setShowAddQuestion(false);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const getQuestionIcon = (type: Question['type']) => {
    switch (type) {
      case 'multiple-choice': return <CheckSquare className="h-5 w-5" />;
      case 'true-false': return <Circle className="h-5 w-5" />;
      case 'short-answer': return <Type className="h-5 w-5" />;
      case 'essay': return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Quiz Builder | Staff Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Builder</h1>
              <p className="text-gray-600">Create assessments to test student knowledge</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                <Eye className="h-5 w-5" />
                Preview
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <Save className="h-5 w-5" />
                Save Quiz
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Quiz Builder */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                {/* Quiz Info */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Quiz Title"
                    className="w-full text-2xl font-bold text-gray-900 border-none focus:outline-none mb-3"
                  />
                  <textarea
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Quiz description or instructions..."
                    rows={2}
                    className="w-full text-gray-600 border-none focus:outline-none resize-none"
                  />
                </div>

                {/* Quiz Stats */}
                <div className="flex gap-6 p-4 bg-gray-50 rounded-lg mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Questions</div>
                    <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Points</div>
                    <div className="text-2xl font-bold text-gray-900">{totalPoints}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Passing Score</div>
                    <div className="text-2xl font-bold text-gray-900">{passingScore}%</div>
                  </div>
                  {timeLimit && (
                    <div>
                      <div className="text-sm text-gray-600">Time Limit</div>
                      <div className="text-2xl font-bold text-gray-900">{timeLimit} min</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
                      <div className={`p-2 rounded ${
                        question.type === 'multiple-choice' ? 'bg-blue-100 text-blue-600' :
                        question.type === 'true-false' ? 'bg-green-100 text-green-600' :
                        question.type === 'short-answer' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {getQuestionIcon(question.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-gray-900">Question {index + 1}</span>
                          <span className="text-sm text-gray-500">
                            ({question.type.replace('-', ' ')})
                          </span>
                          <span className="ml-auto text-sm font-semibold text-gray-700">
                            {question.points} points
                          </span>
                        </div>
                        
                        {/* Question Text */}
                        <textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          placeholder="Enter your question here..."
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />

                        {/* Multiple Choice Options */}
                        {question.type === 'multiple-choice' && question.options && (
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === optIndex}
                                  onChange={() => updateQuestion(question.id, { correctAnswer: optIndex })}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options!];
                                    newOptions[optIndex] = e.target.value;
                                    updateQuestion(question.id, { options: newOptions });
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* True/False Options */}
                        {question.type === 'true-false' && question.options && (
                          <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === 0}
                                onChange={() => updateQuestion(question.id, { correctAnswer: 0 })}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="font-semibold">True</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === 1}
                                onChange={() => updateQuestion(question.id, { correctAnswer: 1 })}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="font-semibold">False</span>
                            </label>
                          </div>
                        )}

                        {/* Short Answer / Essay */}
                        {(question.type === 'short-answer' || question.type === 'essay') && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              {question.type === 'short-answer' 
                                ? 'Students will type a short text answer'
                                : 'Students will write a longer essay response'}
                            </p>
                          </div>
                        )}

                        {/* Explanation */}
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Explanation (shown after answer)
                          </label>
                          <textarea
                            value={question.explanation || ''}
                            onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                            placeholder="Explain the correct answer..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Points */}
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-semibold text-gray-700">Points:</label>
                          <input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 0 })}
                            className="w-20 px-3 py-1 border border-gray-300 rounded text-sm"
                            min="0"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Question Button */}
                <div className="bg-white rounded-lg shadow p-6">
                  {!showAddQuestion ? (
                    <button
                      onClick={() => setShowAddQuestion(true)}
                      className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
                    >
                      <Plus className="h-5 w-5" />
                      Add Question
                    </button>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900 mb-4">Select Question Type:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => addQuestion('multiple-choice')}
                          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                        >
                          <CheckSquare className="h-6 w-6 text-blue-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">Multiple Choice</div>
                            <div className="text-sm text-gray-600">4 options, 1 correct</div>
                          </div>
                        </button>
                        <button
                          onClick={() => addQuestion('true-false')}
                          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                        >
                          <Circle className="h-6 w-6 text-green-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">True/False</div>
                            <div className="text-sm text-gray-600">Simple yes/no</div>
                          </div>
                        </button>
                        <button
                          onClick={() => addQuestion('short-answer')}
                          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                        >
                          <Type className="h-6 w-6 text-purple-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">Short Answer</div>
                            <div className="text-sm text-gray-600">Brief text response</div>
                          </div>
                        </button>
                        <button
                          onClick={() => addQuestion('essay')}
                          className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition"
                        >
                          <FileText className="h-6 w-6 text-orange-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">Essay</div>
                            <div className="text-sm text-gray-600">Long form answer</div>
                          </div>
                        </button>
                      </div>
                      <button
                        onClick={() => setShowAddQuestion(false)}
                        className="mt-3 text-sm text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quiz Settings</h2>

                {/* Time Limit */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    placeholder="No limit"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Passing Score */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                {/* Attempts */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Allowed Attempts
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Unlimited</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>

                {/* Randomize */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm font-semibold text-gray-700">Randomize questions</span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm font-semibold text-gray-700">Show correct answers</span>
                  </label>
                </div>

                {/* Summary */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold text-blue-900 mb-2">Quiz Summary</div>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>{questions.length} questions</div>
                    <div>{totalPoints} total points</div>
                    <div>{passingScore}% to pass</div>
                    {timeLimit && <div>{timeLimit} minute limit</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

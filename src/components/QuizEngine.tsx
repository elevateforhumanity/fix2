import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'multiple-select';
  options: string[];
  correctAnswers: number[]; // indices of correct options
  explanation?: string;
  points: number;
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  timeLimit?: number; // in minutes
  passingScore?: number; // percentage
  onComplete: (results: QuizResults) => void;
  onExit?: () => void;
}

interface QuizResults {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  answers: Array<{
    questionId: string;
    selectedAnswers: number[];
    correct: boolean;
    points: number;
  }>;
  timeSpent: number;
}

export default function QuizEngine({
  questions,
  title,
  timeLimit,
  passingScore = 70,
  onComplete,
  onExit,
}: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number[]>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    timeLimit ? timeLimit * 60 : null
  );
  const [startTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  // Timer
  useEffect(() => {
    if (!timeLimit || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const currentAnswers = answers.get(currentQuestion.id) || [];

    if (currentQuestion.type === 'multiple-select') {
      // Toggle selection for multiple select
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter((i) => i !== optionIndex)
        : [...currentAnswers, optionIndex];
      setAnswers(new Map(answers.set(currentQuestion.id, newAnswers)));
    } else {
      // Single selection
      setAnswers(new Map(answers.set(currentQuestion.id, [optionIndex])));
    }
  };

  const isAnswerCorrect = (
    questionId: string,
    selectedAnswers: number[]
  ): boolean => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return false;

    const correct = question.correctAnswers.sort();
    const selected = selectedAnswers.sort();

    return (
      correct.length === selected.length &&
      correct.every((val, idx) => val === selected[idx])
    );
  };

  const calculateResults = (): QuizResults => {
    let score = 0;
    const results: QuizResults['answers'] = [];

    questions.forEach((question) => {
      const selectedAnswers = answers.get(question.id) || [];
      const correct = isAnswerCorrect(question.id, selectedAnswers);
      const points = correct ? question.points : 0;

      score += points;
      results.push({
        questionId: question.id,
        selectedAnswers,
        correct,
        points,
      });
    });

    const percentage = (score / totalPoints) * 100;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    return {
      score,
      totalPoints,
      percentage,
      passed: percentage >= passingScore,
      answers: results,
      timeSpent,
    };
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const results = calculateResults();
    setShowResults(true);
    onComplete(results);
  };

  const currentAnswers = answers.get(currentQuestion.id) || [];

  if (showResults) {
    const results = calculateResults();

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              {results.passed ? (
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              ) : (
                <XCircle className="w-16 h-16 text-red-600 mx-auto" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-brown-900 mb-2">
              {results.passed ? 'Congratulations!' : 'Keep Practicing'}
            </h2>
            <p className="text-brown-600">
              {results.passed
                ? 'You passed the assessment!'
                : `You need ${passingScore}% to pass. Try again!`}
            </p>
          </div>
          {/* Score Display */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-beige-50 rounded-lg">
              <div className="text-3xl font-bold text-brown-900">
                {Math.round(results.percentage)}%
              </div>
              <div className="text-sm text-brown-600">Score</div>
            </div>
            <div className="text-center p-4 bg-beige-50 rounded-lg">
              <div className="text-3xl font-bold text-brown-900">
                {results.score}/{results.totalPoints}
              </div>
              <div className="text-sm text-brown-600">Points</div>
            </div>
            <div className="text-center p-4 bg-beige-50 rounded-lg">
              <div className="text-3xl font-bold text-brown-900">
                {formatTime(results.timeSpent)}
              </div>
              <div className="text-sm text-brown-600">Time</div>
            </div>
          </div>
          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-brown-900 mb-4">Review</h3>
            <div className="space-y-3">
              {questions.map((question, idx) => {
                const result = results.answers[idx];
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-2 ${
                      result.correct
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-brown-900">
                          Question {idx + 1}: {question.question}
                        </p>
                        <p className="text-sm text-brown-600 mt-1">
                          {result.points}/{question.points} points
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Actions */}
          <div className="flex gap-4 justify-center">
            {!results.passed && (
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Try Again
              </button>
            )}
            {results.passed && (
              <button
                onClick={() => onExit?.()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Continue to Certificate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border border-brown-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-brown-900">{title}</h2>
          {timeRemaining !== null && (
            <div className="flex items-center gap-2 text-brown-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-beige-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
             />
          </div>
          <span className="text-sm text-brown-600 whitespace-nowrap">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>
      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-brown-900">
              Question {currentQuestionIndex + 1}
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {currentQuestion.points}{' '}
              {currentQuestion.points === 1 ? 'point' : 'points'}
            </span>
          </div>
          <p className="text-lg text-brown-700">{currentQuestion.question}</p>
          {currentQuestion.type === 'multiple-select' && (
            <p className="text-sm text-brown-500 mt-2">Select all that apply</p>
          )}
        </div>
        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = currentAnswers.includes(idx);

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  isSelected
                    ? 'border-green-600 bg-green-50'
                    : 'border-brown-200 hover:border-brown-300 hover:bg-beige-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-green-600 bg-green-600'
                        : 'border-brown-300'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-brown-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Explanation (if shown) */}
        {showExplanation && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Explanation:
            </p>
            <p className="text-sm text-blue-800">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="flex gap-3">
          {currentQuestion.explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={currentAnswers.length === 0}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

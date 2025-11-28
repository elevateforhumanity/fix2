'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of workforce development programs?",
    options: [
      "To provide free education",
      "To connect job seekers with training and employment opportunities",
      "To replace traditional colleges",
      "To offer entertainment"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "WIOA stands for:",
    options: [
      "Work Initiative Opportunity Act",
      "Workforce Innovation and Opportunity Act",
      "Worker Income Optimization Act",
      "Workplace Integration Outreach Act"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "What is expected of students in terms of attendance?",
    options: [
      "Attendance is optional",
      "Students must attend at least 50% of classes",
      "Regular attendance and punctuality are required",
      "Only final exams are mandatory"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "Which of the following is NOT a support service typically offered?",
    options: [
      "Career counseling",
      "Job placement assistance",
      "Free housing",
      "Transportation assistance"
    ],
    correct: 2
  },
  {
    id: 5,
    question: "What should you do if you need to miss a class?",
    options: [
      "Just don't show up",
      "Notify your instructor as soon as possible",
      "Wait until after the class to inform anyone",
      "Send a text message to a classmate"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Professional conduct in the workplace includes:",
    options: [
      "Using your phone during training",
      "Arriving late occasionally",
      "Treating others with respect and maintaining professional boundaries",
      "Wearing whatever you want"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "What is the purpose of a competency assessment?",
    options: [
      "To fail students",
      "To establish a baseline and track progress",
      "To compare students against each other",
      "To determine salary"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "If you experience harassment or discrimination, you should:",
    options: [
      "Ignore it and hope it stops",
      "Report it to your instructor or program coordinator immediately",
      "Handle it yourself",
      "Post about it on social media"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "Certification exams are:",
    options: [
      "Optional for all programs",
      "Required to demonstrate competency in your field",
      "Only for advanced students",
      "Not important for employment"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "What is the best way to succeed in your training program?",
    options: [
      "Attend regularly, participate actively, and ask for help when needed",
      "Just show up and do the minimum",
      "Focus only on passing tests",
      "Work alone and avoid asking questions"
    ],
    correct: 0
  }
];

export default function CompetencyTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeStarted] = useState(new Date());

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const score = showResults ? calculateScore() : null;
  const passed = score && score.percentage >= 70;

  if (showResults && score) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-8">
            <div className="text-center">
              {passed ? (
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <XCircle className="w-12 h-12 text-orange-600" />
                </div>
              )}

              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {passed ? 'Congratulations!' : 'Assessment Complete'}
              </h1>

              <div className="text-6xl font-bold text-slate-900 mb-2">
                {score.percentage}%
              </div>

              <p className="text-lg text-slate-600 mb-6">
                You answered {score.correct} out of {score.total} questions correctly
              </p>

              {passed ? (
                <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6 mb-8">
                  <p className="text-green-800 font-semibold mb-2">
                    ✓ You've passed the competency assessment!
                  </p>
                  <p className="text-sm text-green-700">
                    You've demonstrated a solid understanding of program expectations and workforce development principles.
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 rounded-xl border-2 border-orange-200 p-6 mb-8">
                  <p className="text-orange-800 font-semibold mb-2">
                    You need 70% or higher to pass
                  </p>
                  <p className="text-sm text-orange-700">
                    Review the orientation materials and retake the assessment. You can retake it as many times as needed.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center">
                {passed ? (
                  <>
                    <Link
                      href="/orientation"
                      className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white hover:bg-green-700 transition-all shadow-lg"
                    >
                      Continue to Next Module →
                    </Link>
                    <Link
                      href="/student/dashboard"
                      className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      Go to Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers([]);
                        setShowResults(false);
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-base font-bold text-white hover:bg-orange-700 transition-all shadow-lg"
                    >
                      Retake Assessment
                    </button>
                    <Link
                      href="/orientation"
                      className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      Review Materials
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orientation" className="text-sm text-slate-600 hover:text-slate-900 mb-4 inline-block">
            ← Back to Orientation
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Competency Assessment
          </h1>
          <p className="text-slate-600">
            Answer all questions to demonstrate your understanding of program expectations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                {currentQuestion + 1}
              </div>
              <h2 className="text-xl font-bold text-slate-900 flex-1">
                {question.question}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-6 rounded-xl border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-red-500 flex items-center justify-center font-semibold text-slate-600 group-hover:text-red-600">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-slate-900 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <Clock className="w-4 h-4 inline mr-1" />
          Take your time and read each question carefully
        </div>
      </div>
    </main>
  );
}

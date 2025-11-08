import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import QuizEngine from '../../components/QuizEngine';
import { useAuth } from '../../contexts/AuthContext';
import {
  generateCertificate,
  checkCourseCompletion,
} from '../../services/certificates';

export default function QuizBlock() {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const { user } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);

  // Mock quiz data - replace with API call
  const quizData = {
    id: quizId || 'quiz-1',
    title: 'Module 1 Assessment: Introduction to Barbering',
    description:
      'Test your knowledge of barbering history, tools, and safety practices.',
    timeLimit: 30, // minutes
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the primary purpose of sanitizing barbering tools?',
        type: 'multiple-choice' as const,
        options: [
          'To make them look clean',
          'To prevent the spread of infections and diseases',
          'To extend the life of the tools',
          'To comply with shop regulations only',
        ],
        correctAnswers: [1],
        explanation:
          'Sanitizing tools is crucial for preventing the spread of infections and diseases between clients, ensuring public health and safety.',
        points: 10,
      },
      {
        id: 'q2',
        question:
          'Which of the following are essential tools for a professional barber?',
        type: 'multiple-select' as const,
        options: [
          'Clippers',
          'Scissors',
          'Comb',
          'Hair dryer',
          'Straight razor',
        ],
        correctAnswers: [0, 1, 2, 4],
        explanation:
          "Clippers, scissors, combs, and straight razors are fundamental tools. While a hair dryer is useful, it's not considered essential for basic barbering.",
        points: 15,
      },
      {
        id: 'q3',
        question:
          "The barber pole's red and white stripes originally symbolized blood and bandages.",
        type: 'true-false' as const,
        options: ['True', 'False'],
        correctAnswers: [0],
        explanation:
          "True. The barber pole's colors have historical significance, with red representing blood and white representing bandages, dating back to when barbers also performed minor surgical procedures.",
        points: 5,
      },
      {
        id: 'q4',
        question:
          'What is the recommended angle for holding scissors when cutting hair?',
        type: 'multiple-choice' as const,
        options: [
          '90 degrees (perpendicular to the head)',
          '45 degrees',
          '30 degrees',
          'Parallel to the head',
        ],
        correctAnswers: [1],
        explanation:
          'A 45-degree angle is generally recommended as it provides the best control and creates natural-looking layers.',
        points: 10,
      },
      {
        id: 'q5',
        question:
          'Which of the following are proper safety practices in a barbershop?',
        type: 'multiple-select' as const,
        options: [
          'Disinfecting tools between clients',
          'Using a new blade for each client',
          'Washing hands before and after each service',
          'Sharing tools between barbers to save time',
          'Properly disposing of used blades in a sharps container',
        ],
        correctAnswers: [0, 1, 2, 4],
        explanation:
          'All options except sharing tools are proper safety practices. Tools should never be shared without proper sanitization.',
        points: 20,
      },
    ],
  };

  const handleQuizComplete = async (results: any) => {
    console.log('Quiz completed:', results);

    // Save results to backend
    // await saveQuizResults(courseId, quizId, results);

    // Navigate based on pass/fail
    if (results.passed && user && courseId) {
      // Check if this completes the course
      try {
        setGeneratingCertificate(true);
        const isComplete = await checkCourseCompletion(user.id, courseId);

        if (isComplete) {
          // Generate certificate
          const certificate = await generateCertificate(user.id, courseId);

          // Show success message and navigate to certificate
          setTimeout(() => {
            navigate(`/certificate/${certificate.id}`);
          }, 3000);
        } else {
          // Navigate back to course
          setTimeout(() => {
            navigate(`/lms/courses/${courseId}`);
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking completion:', error);
        // Navigate back to course anyway
        setTimeout(() => {
          navigate(`/lms/courses/${courseId}`);
        }, 3000);
      } finally {
        setGeneratingCertificate(false);
      }
    }
  };

  const handleExit = () => {
    navigate(`/lms/courses/${courseId}`);
  };

  if (!quizStarted) {
    return (
      <div>
        <Helmet>
          <title>{quizData.title} | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="min-h-screen bg-beige-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-brown-900 mb-4">
                  {quizData.title}
                </h1>
                <p className="text-brown-700 mb-6">{quizData.description}</p>
                <div className="bg-beige-50 rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-bold text-brown-900 mb-4">
                    Quiz Information
                  </h2>
                  <ul className="space-y-2 text-brown-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span>{quizData.questions.length} questions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span>Time limit: {quizData.timeLimit} minutes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span>Passing score: {quizData.passingScore}%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span>
                        Total points:{' '}
                        {quizData.questions.reduce(
                          (sum, q) => sum + q.points,
                          0
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Once you start the quiz, the
                    timer will begin. Make sure you have a stable internet
                    connection and enough time to complete it.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Start Quiz
                  </button>
                  <button
                    onClick={handleExit}
                    className="px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{quizData.title} | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <div className="min-h-screen bg-beige-50 py-12">
        <div className="container mx-auto px-4">
          <QuizEngine
            questions={quizData.questions}
            title={quizData.title}
            timeLimit={quizData.timeLimit}
            passingScore={quizData.passingScore}
            onComplete={handleQuizComplete}
            onExit={handleExit}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

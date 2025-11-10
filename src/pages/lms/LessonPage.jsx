/**
 * Lesson Page
 * Displays individual lesson content with progress tracking
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabaseClient';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import DOMPurify from 'dompurify';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login?returnTo=' + window.location.pathname);
      return;
    }
    loadLesson();
  }, [lessonId, user]);

  const loadLesson = async () => {
    if (!supabase) return;

    try {
      // Load lesson with related data
      const { data: lessonData } = await supabase
        .from('lessons')
        .select(`
          *,
          module:modules(*),
          course:courses(*)
        `)
        .eq('id', lessonId)
        .single();

      if (!lessonData) {
        alert('Lesson not found');
        navigate('/lms');
        return;
      }

      setLesson(lessonData);
      setModule(lessonData.module);
      setCourse(lessonData.course);

      // Load all lessons in this module for navigation
      const { data: moduleLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', lessonData.module_id)
        .order('idx');

      setAllLessons(moduleLessons || []);

      // Load progress
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (progressData) {
        setProgress(progressData.percent);
        setCompleted(progressData.completed);
      }

      // Load quiz questions
      const { data: questions } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('lesson_id', lessonId);

      setQuizQuestions(questions || []);

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async () => {
    if (!user || !lesson) return;

    try {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          percent: 100,
          completed: true
        });

      setProgress(100);
      setCompleted(true);

      // Show quiz if available
      if (quizQuestions.length > 0) {
        setShowQuiz(true);
      } else {
        // Move to next lesson
        const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
        if (currentIndex < allLessons.length - 1) {
          const nextLesson = allLessons[currentIndex + 1];
          navigate(`/lms/courses/${courseId}/lessons/${nextLesson.id}`);
        }
      }
    } catch (error) {
    }
  };

  const submitQuiz = async () => {
    if (!user) return;

    try {
      // Save quiz responses
      for (const [questionId, answer] of Object.entries(quizAnswers)) {
        await supabase
          .from('quiz_responses')
          .upsert({
            question_id: questionId,
            user_id: user.id,
            answer
          });
      }

      alert('Quiz submitted! Moving to next lesson...');
      
      // Move to next lesson
      const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
      if (currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        navigate(`/lms/courses/${courseId}/lessons/${nextLesson.id}`);
      } else {
        navigate(`/lms/courses/${courseId}`);
      }
    } catch (error) {
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>{lesson.title} | {course?.title} | Elevate for Humanity</title>
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link to="/lms" className="text-brand hover:underline">My Courses</Link>
            <span className="mx-2 text-text-secondary">/</span>
            <Link to={`/lms/courses/${courseId}`} className="text-brand hover:underline">
              {course?.title}
            </Link>
            <span className="mx-2 text-text-secondary">/</span>
            <span className="text-text-secondary">{module?.title}</span>
            <span className="mx-2 text-text-secondary">/</span>
            <span className="text-text-primary font-medium">{lesson.title}</span>
          </nav>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Lesson Progress</span>
              <span className="text-sm font-medium text-brand">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Lesson Header */}
          <div className="card card-spacious mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="heading-2 mb-2">{lesson.title}</h1>
                {lesson.duration_minutes && (
                  <p className="text-sm text-text-secondary">
                    Duration: {lesson.duration_minutes} minutes
                  </p>
                )}
              </div>
              {completed && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Completed
                </span>
              )}
            </div>

            {/* Topics */}
            {lesson.topics && lesson.topics.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Topics Covered:</h3>
                <ul className="space-y-1">
                  {lesson.topics.map((topic, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-brand mr-2">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="card card-spacious mb-6">
            {lesson.video_url && (
              <div className="mb-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <iframe
                    src={lesson.video_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {lesson.html && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(lesson.html, {
                    ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'code', 'pre', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                    ALLOWED_ATTR: ['class', 'id', 'href', 'src', 'alt', 'title', 'style', 'target', 'rel']
                  })
                }}
              />
            )}
          </div>

          {/* Quiz Section */}
          {showQuiz && quizQuestions.length > 0 && (
            <div className="card card-spacious mb-6">
              <h2 className="heading-3 mb-4">Knowledge Check</h2>
              <div className="space-y-6">
                {quizQuestions.map((question, index) => (
                  <div key={question.id}>
                    <p className="font-medium mb-3">
                      {index + 1}. {question.prompt}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <label key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={quizAnswers[question.id] === option}
                            onChange={(e) =>
                              setQuizAnswers({
                                ...quizAnswers,
                                [question.id]: e.target.value
                              })
                            }
                            className="mr-2"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="btn btn-primary mt-6"
              >
                Submit Quiz
              </button>
            </div>
          )}

          {/* Action Buttons */}
          {!showQuiz && (
            <div className="flex items-center justify-between mb-6">
              {prevLesson ? (
                <Link
                  to={`/lms/courses/${courseId}/lessons/${prevLesson.id}`}
                  className="btn btn-outline"
                >
                  ← Previous Lesson
                </Link>
              ) : (
                <div></div>
              )}

              {!completed && (
                <button onClick={markComplete} className="btn btn-primary">
                  Mark as Complete
                </button>
              )}

              {nextLesson && completed && (
                <Link
                  to={`/lms/courses/${courseId}/lessons/${nextLesson.id}`}
                  className="btn btn-primary"
                >
                  Next Lesson →
                </Link>
              )}
            </div>
          )}

          {/* Module Navigation */}
          <div className="card">
            <h3 className="font-semibold mb-4">Module: {module?.title}</h3>
            <div className="space-y-2">
              {allLessons.map((l, index) => (
                <Link
                  key={l.id}
                  to={`/lms/courses/${courseId}/lessons/${l.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    l.id === lesson.id
                      ? 'bg-brand-light text-brand font-medium'
                      : 'hover:bg-surface-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {index + 1}. {l.title}
                    </span>
                    {l.id === lesson.id && (
                      <span className="text-xs px-2 py-1 bg-brand text-white rounded">
                        Current
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

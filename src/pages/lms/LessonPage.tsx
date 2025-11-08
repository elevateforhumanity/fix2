import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Clock,
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CoursePlayer from '../../components/CoursePlayer';
import DiscussionForum from '../../components/DiscussionForum';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: number;
  content: string;
  videoUrl?: string;
  completed: boolean;
}

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching lesson data
    const fetchLesson = async () => {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockLesson: Lesson = {
        id: lessonId || '1',
        title: 'Introduction to Workforce Development',
        type: 'video',
        duration: 15,
        content:
          'This lesson covers the fundamentals of workforce development and career readiness.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        completed: false,
      };

      setTimeout(() => {
        setLesson(mockLesson);
        setLoading(false);
      }, 500);
    };

    fetchLesson();
  }, [courseId, lessonId]);

  const handleComplete = () => {
    setIsCompleted(true);
    setProgress(100);
    // Save progress to backend
    console.log('Lesson completed:', lessonId);
  };

  const handleNext = () => {
    // Navigate to next lesson
    navigate(
      `/lms/courses/${courseId}/lessons/${parseInt(lessonId || '1') + 1}`
    );
  };

  const handlePrevious = () => {
    // Navigate to previous lesson
    if (parseInt(lessonId || '1') > 1) {
      navigate(
        `/lms/courses/${courseId}/lessons/${parseInt(lessonId || '1') - 1}`
      );
    }
  };

  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Loading... | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
            <p className="text-brown-600">Loading lesson...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div>
        <Helmet>
          <title>Lesson Not Found | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brown-900 mb-4">
              Lesson Not Found
            </h1>
            <button
              onClick={() => navigate(`/lms/courses/${courseId}`)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Back to Course
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{lesson.title} | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      {/* Progress Bar */}
      <div className="bg-white border-b border-brown-200">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-beige-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
             />
          </div>
        </div>
      </div>
      {/* Lesson Header */}
      <div className="bg-beige-50 border-b border-brown-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-brown-600 mb-2">
                {lesson.type === 'video' && <Video className="w-4 h-4" />}
                {lesson.type === 'reading' && <BookOpen className="w-4 h-4" />}
                {lesson.type === 'quiz' && <FileText className="w-4 h-4" />}
                <span className="capitalize">{lesson.type}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} min</span>
              </div>
              <h1 className="text-3xl font-bold text-brown-900">
                {lesson.title}
              </h1>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Video Player */}
          {lesson.type === 'video' && lesson.videoUrl && (
            <div className="mb-8">
              <CoursePlayer
                videoUrl={lesson.videoUrl}
                onProgress={(percent) => setProgress(percent)}
                onComplete={handleComplete}
                autoPlay={false}
              />
            </div>
          )}
          {/* Reading Content */}
          {lesson.type === 'reading' && (
            <div className="prose prose-brown max-w-none mb-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <p className="text-brown-700 leading-relaxed">
                  {lesson.content}
                </p>
              </div>
            </div>
          )}
          {/* Lesson Description */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-brown-900 mb-4">
              About This Lesson
            </h2>
            <p className="text-brown-700">{lesson.content}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 mb-12">
            <button
              onClick={handlePrevious}
              disabled={parseInt(lessonId || '1') <= 1}
              className="flex items-center gap-2 px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <div className="flex gap-4">
              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Complete
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Discussion Forum */}
          <div>
            <h2 className="text-2xl font-bold text-brown-900 mb-6">
              Lesson Discussion
            </h2>
            <DiscussionForum courseId={courseId || ''} lessonId={lessonId} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

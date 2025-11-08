import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Award, Play } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressTracker from '../../components/ProgressTracker';
import Button from '../../components/Button';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  modules: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      completed: boolean;
      locked: boolean;
    }>;
  }>;
}

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching course data
    const fetchCourse = async () => {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockCourse: Course = {
        id: courseId || '1',
        title: 'Barber Apprenticeship Program',
        description:
          'Comprehensive training program covering all aspects of professional barbering, from basic cuts to advanced styling techniques.',
        instructor: 'Master Barber John Smith',
        duration: '12 weeks',
        students: 45,
        modules: [
          {
            id: 'm1',
            title: 'Introduction to Barbering',
            lessons: [
              {
                id: 'l1',
                title: 'History of Barbering',
                completed: true,
                locked: false,
              },
              {
                id: 'l2',
                title: 'Tools and Equipment',
                completed: true,
                locked: false,
              },
              {
                id: 'l3',
                title: 'Safety and Sanitation',
                completed: false,
                locked: false,
              },
            ],
          },
          {
            id: 'm2',
            title: 'Basic Cutting Techniques',
            lessons: [
              {
                id: 'l4',
                title: 'Clipper Techniques',
                completed: false,
                locked: false,
              },
              {
                id: 'l5',
                title: 'Scissor Techniques',
                completed: false,
                locked: true,
              },
              {
                id: 'l6',
                title: 'Blending and Fading',
                completed: false,
                locked: true,
              },
            ],
          },
          {
            id: 'm3',
            title: 'Advanced Styling',
            lessons: [
              {
                id: 'l7',
                title: 'Modern Styles',
                completed: false,
                locked: true,
              },
              {
                id: 'l8',
                title: 'Classic Styles',
                completed: false,
                locked: true,
              },
              {
                id: 'l9',
                title: 'Beard Grooming',
                completed: false,
                locked: true,
              },
            ],
          },
        ],
      };

      setTimeout(() => {
        setCourse(mockCourse);
        setLoading(false);
      }, 500);
    };

    fetchCourse();
  }, [courseId]);

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lms/courses/${courseId}/lessons/${lessonId}`);
  };

  const handleStartCourse = () => {
    // Find first incomplete lesson
    const firstIncomplete = course?.modules
      .flatMap((m) => m.lessons)
      .find((l) => !l.completed && !l.locked);

    if (firstIncomplete) {
      navigate(`/lms/courses/${courseId}/lessons/${firstIncomplete.id}`);
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
            <p className="text-brown-600">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <Helmet>
          <title>Course Not Found | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brown-900 mb-4">
              Course Not Found
            </h1>
            <Button onClick={() => navigate('/lms/courses')}>
              Back to Courses
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{course.title} | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      {/* Course Header */}
      <div className="bg-gradient-to-r from-brown-700 to-brown-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-white/90 mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.modules.length} Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Certificate upon completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-brown-200 p-6 mb-6">
              <h2 className="text-2xl font-bold text-brown-900 mb-4">
                About This Course
              </h2>
              <p className="text-brown-700 mb-6">{course.description}</p>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=00a544&color=fff`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-brown-600">Instructor</p>
                  <p className="font-semibold text-brown-900">
                    {course.instructor}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleStartCourse}
                variant="primary"
                size="large"
                className="w-full sm:w-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Continue Learning
              </Button>
            </div>
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-sm border border-brown-200 p-6">
              <h2 className="text-2xl font-bold text-brown-900 mb-4">
                What You'll Learn
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-brown-700">
                    Master fundamental barbering techniques and tools
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-brown-700">
                    Learn advanced cutting and styling methods
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-brown-700">
                    Understand safety, sanitation, and professional standards
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-brown-700">
                    Gain hands-on experience with real clients
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Sidebar - Progress Tracker */}
          <div className="lg:col-span-1">
            <ProgressTracker
              modules={course.modules}
              onLessonClick={handleLessonClick}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/**
 * Student Portal - Course Access
 * Students can view and access their enrolled courses
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, CheckCircle, Clock, Award, FileText, Video } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function StudentPortalAccess() {
  // Mock student data - replace with real auth/data
  const student = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    enrolledCourses: [
      {
        id: 'barber-101',
        title: 'Barber Apprenticeship - Level 1',
        progress: 65,
        totalLessons: 24,
        completedLessons: 16,
        nextLesson: 'Advanced Fade Techniques',
        instructor: 'Master Barber Smith',
        thumbnail: '/images/barber-course.jpg'
      },
      {
        id: 'safety-101',
        title: 'Workplace Safety Fundamentals',
        progress: 100,
        totalLessons: 8,
        completedLessons: 8,
        nextLesson: 'Completed',
        instructor: 'Safety Officer Johnson',
        thumbnail: '/images/safety-course.jpg'
      },
      {
        id: 'customer-service',
        title: 'Customer Service Excellence',
        progress: 30,
        totalLessons: 12,
        completedLessons: 4,
        nextLesson: 'Handling Difficult Customers',
        instructor: 'Prof. Williams',
        thumbnail: '/images/customer-service.jpg'
      }
    ],
    certificates: 2,
    totalHours: 145
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>My Courses | Student Portal</title>
        <meta name="description" content="Access your enrolled courses and track your learning progress" />
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}!</h1>
            <p className="text-xl opacity-90">Continue your learning journey</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{student.enrolledCourses.length}</div>
                <div className="text-sm opacity-90">Active Courses</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{student.certificates}</div>
                <div className="text-sm opacity-90">Certificates</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{student.totalHours}</div>
                <div className="text-sm opacity-90">Learning Hours</div>
              </div>
            </div>
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <Link
                to="/courses"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Browse More Courses →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {student.enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {/* Course Thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative">
                    <Video className="h-16 w-16 text-white opacity-50" />
                    {course.progress === 100 && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Completed
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Instructor: {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Next Lesson */}
                    {course.progress < 100 ? (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs text-blue-600 font-semibold mb-1">NEXT LESSON</div>
                        <div className="text-sm text-gray-900">{course.nextLesson}</div>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-800 font-semibold">Course Completed!</span>
                      </div>
                    )}

                    {/* Action Button */}
                    {course.progress < 100 ? (
                      <Link
                        to={`/course/${course.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        <PlayCircle className="h-5 w-5" />
                        Continue Learning
                      </Link>
                    ) : (
                      <Link
                        to={`/certificate/${course.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        <Award className="h-5 w-5" />
                        View Certificate
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              to="/courses"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Browse Courses</h3>
              <p className="text-sm text-gray-600">Find new programs</p>
            </Link>

            <Link
              to="/certificates"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">My Certificates</h3>
              <p className="text-sm text-gray-600">View achievements</p>
            </Link>

            <Link
              to="/assignments"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <FileText className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Assignments</h3>
              <p className="text-sm text-gray-600">Submit work</p>
            </Link>

            <Link
              to="/support"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Get Help</h3>
              <p className="text-sm text-gray-600">Support center</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * My Courses - Student Portal
 * View all enrolled courses
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Clock, Award } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function MyCourses() {
  const [filter, setFilter] = useState('all'); // all, in-progress, completed

  const courses = [
    {
      id: 'barber-101',
      title: 'Barber Apprenticeship - Level 1',
      instructor: 'Master Barber Smith',
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      status: 'in-progress',
      enrolledDate: '2024-01-15',
      nextLesson: 'Advanced Fade Techniques'
    },
    {
      id: 'safety-101',
      title: 'Workplace Safety Fundamentals',
      instructor: 'Safety Officer Johnson',
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      status: 'completed',
      enrolledDate: '2024-01-10',
      completedDate: '2024-02-15'
    },
    {
      id: 'customer-service',
      title: 'Customer Service Excellence',
      instructor: 'Prof. Williams',
      progress: 30,
      totalLessons: 12,
      completedLessons: 4,
      status: 'in-progress',
      enrolledDate: '2024-02-01',
      nextLesson: 'Handling Difficult Customers'
    },
    {
      id: 'digital-skills',
      title: 'Digital Skills Bootcamp',
      instructor: 'Tech Instructor Davis',
      progress: 100,
      totalLessons: 16,
      completedLessons: 16,
      status: 'completed',
      enrolledDate: '2023-11-01',
      completedDate: '2024-01-05'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>My Courses | Student Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
              <p className="text-gray-600">{filteredCourses.length} courses</p>
            </div>
            <Link
              to="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse More Courses
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setFilter('all')}
              className={`pb-4 px-4 font-semibold transition ${
                filter === 'all'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Courses ({courses.length})
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`pb-4 px-4 font-semibold transition ${
                filter === 'in-progress'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              In Progress ({courses.filter(c => c.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`pb-4 px-4 font-semibold transition ${
                filter === 'completed'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({courses.filter(c => c.status === 'completed').length})
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Course Header */}
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative">
                  <div className="text-white text-5xl font-bold opacity-20">
                    {course.title.charAt(0)}
                  </div>
                  {course.status === 'completed' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Instructor: {course.instructor}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          course.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Next Lesson or Completion */}
                  {course.status === 'in-progress' ? (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 font-semibold mb-1">NEXT LESSON</div>
                      <div className="text-sm text-gray-900">{course.nextLesson}</div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-600 font-semibold mb-1">COMPLETED</div>
                      <div className="text-sm text-gray-900">{course.completedDate}</div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Enrolled: {course.enrolledDate}</span>
                  </div>

                  {/* Action Button */}
                  {course.status === 'in-progress' ? (
                    <Link
                      to={`/student/course/${course.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <PlayCircle className="h-5 w-5" />
                      Continue Learning
                    </Link>
                  ) : (
                    <Link
                      to={`/student/certificate/${course.id}`}
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

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No courses found</p>
              <Link
                to="/courses"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Browse available courses →
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

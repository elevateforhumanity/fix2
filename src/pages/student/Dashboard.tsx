/**
 * Student Dashboard
 * Main dashboard showing overview of student's learning
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, TrendingUp, PlayCircle, CheckCircle } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function StudentDashboard() {
  const student = {
    name: 'John Doe',
    coursesInProgress: 3,
    coursesCompleted: 2,
    totalHours: 145,
    certificates: 2,
    nextClass: {
      title: 'Advanced Fade Techniques',
      course: 'Barber Apprenticeship',
      time: 'Today at 2:00 PM'
    }
  };

  const recentCourses = [
    {
      id: 'barber-101',
      title: 'Barber Apprenticeship',
      progress: 65,
      nextLesson: 'Advanced Fade Techniques',
      dueDate: 'Today'
    },
    {
      id: 'safety-101',
      title: 'Workplace Safety',
      progress: 100,
      nextLesson: 'Completed',
      dueDate: null
    },
    {
      id: 'customer-service',
      title: 'Customer Service Excellence',
      progress: 30,
      nextLesson: 'Handling Difficult Customers',
      dueDate: 'Tomorrow'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Dashboard | Student Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {student.name}!
            </h1>
            <p className="text-gray-600">Here's your learning progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">{student.coursesInProgress}</span>
              </div>
              <div className="text-sm text-gray-600">Courses In Progress</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">{student.coursesCompleted}</span>
              </div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-orange-600" />
                <span className="text-3xl font-bold text-gray-900">{student.totalHours}</span>
              </div>
              <div className="text-sm text-gray-600">Learning Hours</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-purple-600" />
                <span className="text-3xl font-bold text-gray-900">{student.certificates}</span>
              </div>
              <div className="text-sm text-gray-600">Certificates Earned</div>
            </div>
          </div>

          {/* Next Class */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">NEXT CLASS</div>
                <h3 className="text-2xl font-bold mb-1">{student.nextClass.title}</h3>
                <p className="opacity-90">{student.nextClass.course}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">{student.nextClass.time}</div>
                <Link
                  to="/student/schedule"
                  className="text-sm underline opacity-90 hover:opacity-100"
                >
                  View Full Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                    
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 font-semibold mb-1">NEXT</div>
                      <div className="text-sm text-gray-900">{course.nextLesson}</div>
                      {course.dueDate && (
                        <div className="text-xs text-gray-600 mt-1">Due: {course.dueDate}</div>
                      )}
                    </div>

                    {/* Button */}
                    {course.progress < 100 ? (
                      <Link
                        to={`/student/course/${course.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        <PlayCircle className="h-5 w-5" />
                        Continue
                      </Link>
                    ) : (
                      <Link
                        to={`/student/certificate/${course.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
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

          {/* Quick Links */}
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              to="/student/courses"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">My Courses</h3>
            </Link>

            <Link
              to="/student/assignments"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Assignments</h3>
            </Link>

            <Link
              to="/student/certificates"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Award className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Certificates</h3>
            </Link>

            <Link
              to="/student/schedule"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Clock className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Schedule</h3>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    certificatesEarned: 0,
    hoursCompleted: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      coursesEnrolled: 3,
      coursesCompleted: 1,
      certificatesEarned: 1,
      hoursCompleted: 45,
    });

    setRecentCourses([
      {
        id: '1',
        title: 'Barber Apprenticeship Program',
        progress: 75,
        nextLesson: 'Advanced Cutting Techniques',
        thumbnail: '/images/barber-course.jpg',
      },
      {
        id: '2',
        title: 'Customer Service Excellence',
        progress: 100,
        completed: true,
        thumbnail: '/images/customer-service.jpg',
      },
      {
        id: '3',
        title: 'Business Management Basics',
        progress: 30,
        nextLesson: 'Financial Planning',
        thumbnail: '/images/business-mgmt.jpg',
      },
    ]);

    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Student Dashboard | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="section">
          <div className="container">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-brown-600">Loading dashboard...</p>
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
        <title>Student Dashboard | Elevate for Humanity</title>
      </Helmet>
      <Navigation />

      <div className="section bg-beige-50">
        <div className="container">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-brown-900 mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'Student'}!
            </h1>
            <p className="text-lg text-brown-600">
              Continue your learning journey
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.coursesEnrolled}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Courses Enrolled
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.coursesCompleted}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Courses Completed
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.certificatesEarned}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Certificates Earned
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.hoursCompleted}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Hours Completed
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6 mb-12">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/lms/courses" className="btn-primary text-center">
                Browse Courses
              </Link>
              <Link
                to="/lms/my-certificates"
                className="btn-outline text-center"
              >
                View Certificates
              </Link>
              <Link to="/account" className="btn-outline text-center">
                Account Settings
              </Link>
            </div>
          </div>

          {/* Recent Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brown-900">My Courses</h2>
              <Link
                to="/lms/courses"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                View All →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="card hover:shadow-lg transition-shadow"
                >
                  {/* Course Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-green-100 to-beige-100 flex items-center justify-center">
                    <div className="text-6xl">📚</div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brown-900 mb-3">
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-brown-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-beige-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Next Lesson or Completed */}
                    {course.completed ? (
                      <div className="flex items-center gap-2 text-green-600 font-semibold mb-4">
                        <span>✓</span>
                        <span>Completed</span>
                      </div>
                    ) : (
                      <div className="text-sm text-brown-600 mb-4">
                        <strong>Next:</strong> {course.nextLesson}
                      </div>
                    )}

                    {/* Action Button */}
                    <Link
                      to={`/lms/courses/${course.id}`}
                      className={
                        course.completed
                          ? 'btn-outline w-full text-center'
                          : 'btn-primary w-full text-center'
                      }
                    >
                      {course.completed ? 'Review Course' : 'Continue Learning'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          {stats.certificatesEarned > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-brown-900 mb-6">
                Recent Achievements
              </h2>
              <div className="card p-6 bg-gradient-to-r from-green-50 to-beige-50">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">🏆</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brown-900 mb-1">
                      Certificate Earned!
                    </h3>
                    <p className="text-brown-600 mb-3">
                      You completed Customer Service Excellence
                    </p>
                    <Link
                      to="/lms/my-certificates"
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      View Certificate →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

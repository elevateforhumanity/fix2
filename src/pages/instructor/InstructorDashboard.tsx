import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    pendingGrading: 0,
    certificatesIssued: 0,
  });
  const [courses, setCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalStudents: 45,
      activeCourses: 3,
      pendingGrading: 8,
      certificatesIssued: 12,
    });

    setCourses([
      {
        id: '1',
        title: 'Barber Apprenticeship Program',
        students: 25,
        completionRate: 68,
        avgGrade: 85,
      },
      {
        id: '2',
        title: 'Customer Service Excellence',
        students: 15,
        completionRate: 93,
        avgGrade: 92,
      },
      {
        id: '3',
        title: 'Business Management Basics',
        students: 5,
        completionRate: 40,
        avgGrade: 78,
      },
    ]);

    setRecentActivity([
      {
        id: '1',
        type: 'submission',
        student: 'John Doe',
        course: 'Barber Apprenticeship',
        action: 'submitted Module 3 Quiz',
        time: '2 hours ago',
      },
      {
        id: '2',
        type: 'completion',
        student: 'Jane Smith',
        course: 'Customer Service Excellence',
        action: 'completed the course',
        time: '5 hours ago',
      },
      {
        id: '3',
        type: 'question',
        student: 'Mike Johnson',
        course: 'Business Management',
        action: 'asked a question in discussion',
        time: '1 day ago',
      },
    ]);

    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Instructor Dashboard | Elevate for Humanity</title>
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
        <title>Instructor Dashboard | Elevate for Humanity</title>
      </Helmet>
      <Navigation />

      <div className="section bg-beige-50">
        <div className="container">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-brown-900 mb-2">
              Instructor Dashboard
            </h1>
            <p className="text-lg text-brown-600">
              Manage your courses and students
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalStudents}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Total Students
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.activeCourses}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Active Courses
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stats.pendingGrading}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Pending Grading
              </div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.certificatesIssued}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Certificates Issued
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6 mb-12">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/course-builder" className="btn-primary text-center">
                Create Course
              </Link>
              <Link to="/lms/grading" className="btn-outline text-center">
                Grade Assignments
              </Link>
              <Link to="/lms/students" className="btn-outline text-center">
                View Students
              </Link>
              <Link to="/analytics" className="btn-outline text-center">
                View Analytics
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* My Courses */}
            <div>
              <h2 className="text-2xl font-bold text-brown-900 mb-6">
                My Courses
              </h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="card p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-brown-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-brown-600">
                          {course.students} students enrolled
                        </p>
                      </div>
                      <Link
                        to={`/lms/courses/${course.id}/manage`}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        Manage →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-brown-500 mb-1">
                          Completion Rate
                        </div>
                        <div className="font-semibold text-brown-900">
                          {course.completionRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-brown-500 mb-1">Avg Grade</div>
                        <div className="font-semibold text-brown-900">
                          {course.avgGrade}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-beige-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-brown-900 mb-6">
                Recent Activity
              </h2>
              <div className="card p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="pb-4 border-b border-brown-200 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {activity.type === 'submission' && '📝'}
                          {activity.type === 'completion' && '🎓'}
                          {activity.type === 'question' && '💬'}
                        </div>
                        <div className="flex-1">
                          <p className="text-brown-900 mb-1">
                            <strong>{activity.student}</strong>{' '}
                            {activity.action}
                          </p>
                          <p className="text-sm text-brown-600">
                            {activity.course} • {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-brown-200">
                  <Link
                    to="/lms/activity"
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    View All Activity →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          {stats.pendingGrading > 0 && (
            <div className="mt-12">
              <div className="card p-6 bg-orange-50 border-l-4 border-orange-600">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">⚠️</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brown-900 mb-1">
                      {stats.pendingGrading} Assignments Need Grading
                    </h3>
                    <p className="text-brown-600 mb-3">
                      Students are waiting for feedback on their submissions
                    </p>
                    <Link
                      to="/lms/grading"
                      className="text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      Grade Now →
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

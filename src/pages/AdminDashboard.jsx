import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeStudents: 0,
    totalInstructors: 0,
    certificatesIssued: 0,
    completionRate: 0,
    avgSatisfaction: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    database: 'healthy',
    storage: 'healthy',
    api: 'healthy',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalUsers: 523,
      totalCourses: 24,
      totalRevenue: 45780,
      activeStudents: 342,
      totalInstructors: 18,
      certificatesIssued: 156,
      completionRate: 73,
      avgSatisfaction: 4.6,
    });

    setRecentUsers([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'student',
        joined: '2 hours ago',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'instructor',
        joined: '5 hours ago',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'student',
        joined: '1 day ago',
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Admin Dashboard | Elevate for Humanity</title>
        </Helmet>
        <Navigation />
        <div className="section">
          <div className="container">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
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
        <title>Admin Dashboard | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <div className="section bg-beige-50">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-brown-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-brown-600">
              Platform overview and management
            </p>
          </div>
          {/* System Health */}
          <div className="card p-6 mb-8 bg-green-50 border-l-4 border-green-600">
            <div className="flex items-center gap-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="text-lg font-bold text-brown-900 mb-1">
                  All Systems Operational
                </h3>
                <p className="text-sm text-brown-600">
                  Database: {systemHealth.database} • Storage:{' '}
                  {systemHealth.storage} • API: {systemHealth.api}
                </p>
              </div>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalUsers}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Total Users
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalCourses}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Total Courses
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${(stats.totalRevenue / 1000).toFixed(1)}k
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Total Revenue
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.activeStudents}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Active Students
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.totalInstructors}
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Instructors
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
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.completionRate}%
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Completion Rate
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.avgSatisfaction}/5
              </div>
              <div className="text-sm text-brown-600 uppercase tracking-wide">
                Avg Satisfaction
              </div>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="card p-6 mb-12">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/admin/users" className="btn-primary text-center">
                Manage Users
              </Link>
              <Link to="/admin/courses" className="btn-outline text-center">
                Manage Courses
              </Link>
              <Link to="/admin/reports" className="btn-outline text-center">
                View Reports
              </Link>
              <Link to="/admin/settings" className="btn-outline text-center">
                System Settings
              </Link>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div>
              <h2 className="text-2xl font-bold text-brown-900 mb-6">
                Recent Users
              </h2>
              <div className="card p-6">
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="pb-4 border-b border-brown-200 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-brown-900 mb-1">
                            {user.name}
                          </p>
                          <p className="text-sm text-brown-600">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800 mb-1">
                            {user.role}
                          </span>
                          <p className="text-xs text-brown-500">
                            {user.joined}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-brown-200">
                  <Link
                    to="/admin/users"
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    View All Users →
                  </Link>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div>
              <h2 className="text-2xl font-bold text-brown-900 mb-6">
                Platform Insights
              </h2>
              <div className="space-y-4">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-brown-600">Course Completion</span>
                    <span className="font-bold text-brown-900">
                      {stats.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-beige-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-brown-900 mb-4">
                    User Distribution
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-brown-600">Students</span>
                      <span className="font-semibold text-brown-900">
                        {stats.activeStudents} (
                        {Math.round(
                          (stats.activeStudents / stats.totalUsers) * 100
                        )}
                        %)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brown-600">Instructors</span>
                      <span className="font-semibold text-brown-900">
                        {stats.totalInstructors} (
                        {Math.round(
                          (stats.totalInstructors / stats.totalUsers) * 100
                        )}
                        %)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brown-600">Admins</span>
                      <span className="font-semibold text-brown-900">
                        {stats.totalUsers -
                          stats.activeStudents -
                          stats.totalInstructors}{' '}
                        (
                        {Math.round(
                          ((stats.totalUsers -
                            stats.activeStudents -
                            stats.totalInstructors) /
                            stats.totalUsers) *
                            100
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-r from-green-50 to-beige-50">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">⭐</div>
                    <div>
                      <div className="text-2xl font-bold text-brown-900">
                        {stats.avgSatisfaction}/5.0
                      </div>
                      <div className="text-sm text-brown-600">
                        Average Student Satisfaction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Management Links */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link
              to="/admin/analytics"
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Analytics
              </h3>
              <p className="text-brown-600 text-sm">
                View detailed platform analytics and reports
              </p>
            </Link>
            <Link
              to="/admin/content"
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Content Management
              </h3>
              <p className="text-brown-600 text-sm">
                Manage courses, lessons, and learning materials
              </p>
            </Link>
            <Link
              to="/admin/compliance"
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Compliance
              </h3>
              <p className="text-brown-600 text-sm">
                ETPL reporting and DOL compliance tracking
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

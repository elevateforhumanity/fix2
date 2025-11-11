/**
 * Staff Portal
 * Staff and administrators manage entire LMS system
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Building2, 
  FileText, 
  Settings, 
  BarChart3,
  DollarSign,
  Shield,
  Bell,
  Database,
  Upload,
  Download
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function StaffPortal() {
  // Mock staff data - replace with real auth/data
  const staff = {
    name: 'Admin User',
    role: 'System Administrator',
    totalStudents: 342,
    totalPartners: 15,
    activeCourses: 28,
    pendingApprovals: 47,
    revenue: 125000,
    alerts: 8
  };

  const recentActivity = [
    { type: 'student', action: 'New enrollment', detail: 'John Doe - Barber Program', time: '5 min ago' },
    { type: 'partner', action: 'Partner application', detail: 'WorkOne Southside', time: '15 min ago' },
    { type: 'course', action: 'Course completed', detail: 'Jane Smith - HVAC Training', time: '1 hour ago' },
    { type: 'alert', action: 'System alert', detail: 'Low certificate inventory', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Staff Portal | Elevate for Humanity</title>
        <meta name="description" content="Administrative dashboard for managing the entire LMS system" />
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Staff Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Staff Portal</h1>
                <p className="text-xl opacity-90">{staff.name} - {staff.role}</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <Bell className="h-6 w-6" />
                  {staff.alerts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {staff.alerts}
                    </span>
                  )}
                </button>
                <Link
                  to="/staff/settings"
                  className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <Settings className="h-6 w-6" />
                </Link>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-6 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{staff.totalStudents}</div>
                <div className="text-sm opacity-90">Total Students</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{staff.totalPartners}</div>
                <div className="text-sm opacity-90">Partners</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{staff.activeCourses}</div>
                <div className="text-sm opacity-90">Active Courses</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{staff.pendingApprovals}</div>
                <div className="text-sm opacity-90">Pending</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">${(staff.revenue / 1000).toFixed(0)}K</div>
                <div className="text-sm opacity-90">Revenue</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{staff.alerts}</div>
                <div className="text-sm opacity-90">Alerts</div>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Student Management */}
            <Link
              to="/staff/students"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{staff.totalStudents}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Student Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage all student accounts, enrollments, and progress</p>
              <div className="text-blue-600 font-semibold">View All Students →</div>
            </Link>

            {/* Partner Management */}
            <Link
              to="/staff/partners"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <Building2 className="h-12 w-12 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">{staff.totalPartners}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Partner Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage partner organizations and their programs</p>
              <div className="text-purple-600 font-semibold">View All Partners →</div>
            </Link>

            {/* Course Management */}
            <Link
              to="/staff/courses"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-12 w-12 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{staff.activeCourses}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Course Management</h3>
              <p className="text-sm text-gray-600 mb-4">Create, edit, and manage all courses and content</p>
              <div className="text-green-600 font-semibold">Manage Courses →</div>
            </Link>
          </div>

          {/* Admin Tools Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Link
              to="/staff/applications"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <FileText className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Applications</h3>
              <p className="text-sm text-gray-600">Review & approve</p>
              <div className="mt-2 text-orange-600 font-bold">{staff.pendingApprovals} pending</div>
            </Link>

            <Link
              to="/staff/reports"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <BarChart3 className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Reports</h3>
              <p className="text-sm text-gray-600">Analytics & insights</p>
            </Link>

            <Link
              to="/staff/funding"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Funding</h3>
              <p className="text-sm text-gray-600">WIOA/WRG/JRI</p>
            </Link>

            <Link
              to="/staff/security"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Shield className="h-10 w-10 text-red-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Security</h3>
              <p className="text-sm text-gray-600">Access & permissions</p>
            </Link>

            <Link
              to="/staff/database"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Database className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Database</h3>
              <p className="text-sm text-gray-600">Data management</p>
            </Link>

            <Link
              to="/staff/import"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Upload className="h-10 w-10 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Import</h3>
              <p className="text-sm text-gray-600">Bulk data upload</p>
            </Link>

            <Link
              to="/staff/export"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Download className="h-10 w-10 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Export</h3>
              <p className="text-sm text-gray-600">Download reports</p>
            </Link>

            <Link
              to="/staff/settings"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Settings className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">System config</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'student' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'partner' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'course' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {activity.type === 'student' && <Users className="h-5 w-5" />}
                    {activity.type === 'partner' && <Building2 className="h-5 w-5" />}
                    {activity.type === 'course' && <BookOpen className="h-5 w-5" />}
                    {activity.type === 'alert' && <Bell className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.detail}</div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

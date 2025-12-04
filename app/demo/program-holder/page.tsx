'use client';

import Link from 'next/link';
import { Users, TrendingUp, DollarSign, Award, FileText, Calendar } from 'lucide-react';

export default function ProgramHolderDemoPage() {
  const students = [
    { name: 'John Smith', program: 'Barbering', progress: 75, status: 'Active' },
    { name: 'Maria Garcia', program: 'Cosmetology', progress: 90, status: 'Active' },
    { name: 'James Wilson', program: 'Construction', progress: 60, status: 'Active' },
    { name: 'Sarah Johnson', program: 'Healthcare', progress: 85, status: 'Active' },
    { name: 'Michael Brown', program: 'IT Support', progress: 45, status: 'Active' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              <span className="font-semibold">DEMO MODE - Program Holder Portal Preview</span>
            </div>
            <Link href="/demo" className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Program Holder Dashboard</h1>
          <p className="text-gray-600">Manage your workforce development programs</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
            <p className="text-3xl font-bold">127</p>
            <p className="text-sm text-green-600 mt-1">+12 this month</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-500">Completion Rate</p>
            </div>
            <p className="text-3xl font-bold">87%</p>
            <p className="text-sm text-green-600 mt-1">+5% from last quarter</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-gray-500">Certificates Issued</p>
            </div>
            <p className="text-3xl font-bold">342</p>
            <p className="text-sm text-gray-600 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-500">Revenue (MTD)</p>
            </div>
            <p className="text-3xl font-bold">$48K</p>
            <p className="text-sm text-green-600 mt-1">On track for $60K</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Students */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Active Students</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700">
                  + Enroll Student
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Student</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Program</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Progress</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{student.name}</td>
                        <td className="py-3 px-2 text-gray-600">{student.program}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Maria Garcia completed Cosmetology Module 8</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <span className="text-xl">📝</span>
                  <div>
                    <p className="font-semibold text-sm">New enrollment: David Martinez - IT Support</p>
                    <p className="text-xs text-gray-600">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                  <span className="text-xl">🎓</span>
                  <div>
                    <p className="font-semibold text-sm">Certificate issued to James Wilson - OSHA 30</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 text-left px-4 flex items-center gap-2">
                  <Users size={18} />
                  Enroll New Student
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4 flex items-center gap-2">
                  <FileText size={18} />
                  Generate Report
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4 flex items-center gap-2">
                  <Calendar size={18} />
                  Schedule Training
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 text-left px-4 flex items-center gap-2">
                  <Award size={18} />
                  Issue Certificate
                </button>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Compliance Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly Reports</span>
                  <span className="text-green-600 font-semibold">✓ Up to date</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Student Records</span>
                  <span className="text-green-600 font-semibold">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grant Reporting</span>
                  <span className="text-yellow-600 font-semibold">⚠ Due in 5 days</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
              <p className="text-sm text-blue-100 mb-4">Contact your account manager</p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50">
                Get Help
              </button>
            </div>
          </div>
        </div>

        {/* Demo Footer */}
        <div className="mt-12 bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-900 mb-2">This is a Demo Preview</h3>
          <p className="text-purple-700 mb-4">
            In the full platform, program holders can manage students, track outcomes, generate compliance reports, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              View Pricing
            </Link>
            <Link href="/contact" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-purple-600">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

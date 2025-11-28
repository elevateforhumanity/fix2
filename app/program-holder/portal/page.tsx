'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Mail, 
  FileText, 
  Video, 
  BarChart3, 
  BookOpen,
  Upload,
  Download,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ProgramHolderPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    activeStudents: 24,
    totalEnrolled: 32,
    averageAttendance: 87,
    completionRate: 78,
  };

  const recentStudents = [
    { id: 1, name: 'John Smith', program: 'HVAC Technician', attendance: 92, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', program: 'Medical Assistant', attendance: 88, status: 'Active' },
    { id: 3, name: 'Mike Davis', program: 'Welding', attendance: 76, status: 'At Risk' },
    { id: 4, name: 'Lisa Brown', program: 'CNA Training', attendance: 95, status: 'Active' },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Program Holder Portal</h1>
              <p className="text-orange-100 mt-1">Manage your students, courses, and reports</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/program-holder/portal/live-qa"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg animate-pulse"
              >
                <Video className="w-5 h-5" />
                Go Live for Q&A
              </Link>
              <Link
                href="/program-holder/settings"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-all"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'attendance', label: 'Attendance', icon: CheckCircle },
              { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'messages', label: 'Messages', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Active Students</span>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{stats.activeStudents}</div>
                <div className="text-xs text-slate-500 mt-1">of {stats.totalEnrolled} enrolled</div>
              </div>

              <div className="bg-white rounded-xl border-2 border-green-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Avg Attendance</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-700">{stats.averageAttendance}%</div>
                <div className="text-xs text-slate-500 mt-1">Last 30 days</div>
              </div>

              <div className="bg-white rounded-xl border-2 border-purple-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Completion Rate</span>
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-700">{stats.completionRate}%</div>
                <div className="text-xs text-slate-500 mt-1">This cohort</div>
              </div>

              <div className="bg-white rounded-xl border-2 border-orange-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Revenue This Month</span>
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-700">$12.4K</div>
                <div className="text-xs text-slate-500 mt-1">Your share</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/program-holder/portal/attendance"
                className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Take Attendance</h3>
                <p className="text-sm text-slate-600">Mark today's attendance for your classes</p>
              </Link>

              <Link
                href="/program-holder/portal/messages"
                className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-green-300 transition-colors"
              >
                <Mail className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Send Mass Email</h3>
                <p className="text-sm text-slate-600">Email all students or specific groups</p>
              </Link>

              <Link
                href="/program-holder/portal/reports"
                className="block p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-purple-300 transition-colors"
              >
                <FileText className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Run Reports</h3>
                <p className="text-sm text-slate-600">Generate attendance, progress, and compliance reports</p>
              </Link>
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Recent Students</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Program</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Attendance</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.program}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            student.attendance >= 80 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status === 'Active' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/program-holder/portal/students/${student.id}`}
                            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Student Management</h2>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Export List
                </button>
                <Link
                  href="/program-holder/portal/students/add"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  + Add Student
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <p className="text-slate-600">Student management interface with filtering, search, and bulk actions.</p>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Attendance Tracking</h2>
              <Link
                href="/program-holder/portal/attendance/take"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
              >
                <CheckCircle className="w-5 h-5" />
                Take Attendance Now
              </Link>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <p className="text-slate-600">Daily attendance tracking with calendar view and reporting.</p>
            </div>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Master Syllabus & Course Content</h2>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Download Master Syllabus
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                  <Upload className="w-4 h-4" />
                  Import Your LMS Content
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">📚 About Master Syllabus</h3>
              <p className="text-sm text-slate-700 mb-4">
                Every program comes with a universal master syllabus that ensures credential requirements are met. 
                You can apply your own instruction methods and materials as long as the master syllabus objectives are completed.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Universal Standards:</strong> Master syllabus ensures all credential requirements are covered</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Your Instruction:</strong> Add your own teaching methods, materials, and activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>LMS Import:</strong> If you have an existing LMS, import your content directly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Compliance Ready:</strong> Master syllabus meets all accreditation and funding requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Your Programs</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">HVAC Technician Training</h4>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Master syllabus: 480 hours | Your customization: 85% complete</p>
                  <div className="flex gap-2">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View Master Syllabus</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">Edit Your Content</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-sm font-semibold text-green-600 hover:text-green-700">Import from LMS</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Attendance Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Daily Attendance</div>
                      <div className="text-xs text-slate-600">Today's attendance by class</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Weekly Summary</div>
                      <div className="text-xs text-slate-600">Attendance trends this week</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">At-Risk Students</div>
                      <div className="text-xs text-slate-600">Students below 80% attendance</div>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Progress Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Student Progress</div>
                      <div className="text-xs text-slate-600">Individual student progress reports</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Completion Rates</div>
                      <div className="text-xs text-slate-600">Program completion statistics</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Certification Pass Rates</div>
                      <div className="text-xs text-slate-600">Industry certification exam results</div>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Financial Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Revenue Summary</div>
                      <div className="text-xs text-slate-600">Your earnings by program</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Payment History</div>
                      <div className="text-xs text-slate-600">All payments received</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Pending Payments</div>
                      <div className="text-xs text-slate-600">Payments awaiting documentation</div>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Compliance Reports</h3>
                <ul className="space-y-3">
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Documentation Status</div>
                      <div className="text-xs text-slate-600">Missing or incomplete documents</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">WIOA Compliance</div>
                      <div className="text-xs text-slate-600">PIRL data and reporting status</div>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="font-semibold text-slate-900">Audit Readiness</div>
                      <div className="text-xs text-slate-600">Compliance checklist and gaps</div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Mass Email & Messaging</h2>
              <Link
                href="/program-holder/portal/messages/compose"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                <Mail className="w-5 h-5" />
                Compose New Message
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button className="p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors text-left">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Email All Students</h3>
                <p className="text-sm text-slate-600">Send announcement to all enrolled students</p>
              </button>

              <button className="p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-green-300 transition-colors text-left">
                <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Email Active Students</h3>
                <p className="text-sm text-slate-600">Send to currently active students only</p>
              </button>

              <button className="p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-yellow-300 transition-colors text-left">
                <AlertCircle className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Email At-Risk Students</h3>
                <p className="text-sm text-slate-600">Send to students with attendance issues</p>
              </button>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Messages</h3>
              <p className="text-sm text-slate-600">Message history and templates</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

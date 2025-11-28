'use client';

import Link from 'next/link';
import { 
  BookOpen,
  Video,
  Users,
  DollarSign,
  CheckCircle,
  Database,
  BarChart3,
  FileText,
  Clock,
  Settings,
  Zap,
  TrendingUp,
  AlertCircle,
  Calendar,
  Mail,
  Upload,
  Download,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

export default function MasterDashboardPage() {
  const quickStats = {
    activeStudents: 847,
    pendingPayroll: 12,
    complianceTasks: 3,
    coursesCreated: 24,
    revenue: 124500,
    attendance: 87,
  };

  const tools = [
    {
      category: 'Course Creation',
      color: 'blue',
      icon: BookOpen,
      items: [
        {
          name: 'AI Course Generator',
          description: 'Generate complete courses with AI',
          href: '/admin/course-generator',
          icon: Zap,
          status: 'ready'
        },
        {
          name: 'Course Builder',
          description: 'Build courses manually with templates',
          href: '/admin/course-builder',
          icon: BookOpen,
          status: 'ready'
        },
        {
          name: 'Video Generator',
          description: 'Create training videos with AI',
          href: '/admin/video-generator',
          icon: Video,
          status: 'ready'
        },
        {
          name: 'Content Library',
          description: 'Browse and reuse existing content',
          href: '/admin/content-library',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'Course Templates',
          description: 'Pre-built course templates',
          href: '/admin/course-templates',
          icon: BookOpen,
          status: 'ready'
        },
        {
          name: 'Digital Binders',
          description: 'Create digital workbooks',
          href: '/digital-binders',
          icon: FileText,
          status: 'ready'
        },
      ]
    },
    {
      category: 'Student Tracking',
      color: 'green',
      icon: Users,
      items: [
        {
          name: 'Student Management',
          description: 'View and manage all students',
          href: '/admin/students',
          icon: Users,
          status: 'ready'
        },
        {
          name: 'Attendance Tracking',
          description: 'Daily attendance and alerts',
          href: '/admin/attendance',
          icon: Calendar,
          status: 'ready'
        },
        {
          name: 'Progress Monitoring',
          description: 'Track student progress and grades',
          href: '/admin/progress',
          icon: TrendingUp,
          status: 'ready'
        },
        {
          name: 'Hour Tracking',
          description: 'Apprenticeship hour logs',
          href: '/admin/hours',
          icon: Clock,
          status: 'ready'
        },
        {
          name: 'At-Risk Students',
          description: 'Students needing intervention',
          href: '/admin/at-risk',
          icon: AlertCircle,
          status: 'ready'
        },
        {
          name: 'Enrollment Pipeline',
          description: 'Applications and enrollments',
          href: '/admin/enrollment',
          icon: Users,
          status: 'ready'
        },
      ]
    },
    {
      category: 'Payroll & Finance',
      color: 'purple',
      icon: DollarSign,
      items: [
        {
          name: 'Payroll Processing',
          description: 'Process staff and contractor payroll',
          href: '/admin/hr/payroll',
          icon: DollarSign,
          status: 'ready'
        },
        {
          name: 'Program Holder Payments',
          description: 'Track and process program holder payments',
          href: '/admin/grants/revenue',
          icon: DollarSign,
          status: 'ready'
        },
        {
          name: 'Grant Revenue',
          description: 'WIOA, WRG, and grant tracking',
          href: '/admin/grants',
          icon: DollarSign,
          status: 'ready'
        },
        {
          name: 'Payroll Cards',
          description: 'Manage payroll card system',
          href: '/admin/payroll-cards',
          icon: DollarSign,
          status: 'ready'
        },
        {
          name: 'Financial Reports',
          description: 'Revenue, expenses, and forecasting',
          href: '/admin/reporting?type=financial',
          icon: BarChart3,
          status: 'ready'
        },
        {
          name: 'Invoice Management',
          description: 'Create and track invoices',
          href: '/admin/invoices',
          icon: FileText,
          status: 'ready'
        },
      ]
    },
    {
      category: 'Compliance & Reporting',
      color: 'orange',
      icon: CheckCircle,
      items: [
        {
          name: 'WIOA PIRL Reporting',
          description: 'Federal WIOA compliance reports',
          href: '/admin/compliance/wioa',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'WRG Compliance',
          description: 'Workforce Ready Grant reporting',
          href: '/admin/compliance/wrg',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'Documentation Status',
          description: 'Track required documents',
          href: '/admin/compliance/documents',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'Audit Readiness',
          description: 'Compliance checklist and gaps',
          href: '/admin/compliance/audit',
          icon: CheckCircle,
          status: 'ready'
        },
        {
          name: 'All Reports',
          description: 'Access all reporting tools',
          href: '/admin/reporting',
          icon: BarChart3,
          status: 'ready'
        },
        {
          name: 'Data Export',
          description: 'Export data for external reporting',
          href: '/admin/export',
          icon: Download,
          status: 'ready'
        },
      ]
    },
    {
      category: 'Database & System',
      color: 'red',
      icon: Database,
      items: [
        {
          name: 'Database Management',
          description: 'Supabase database admin',
          href: 'https://supabase.com/dashboard',
          icon: Database,
          status: 'external',
          external: true
        },
        {
          name: 'Data Backup',
          description: 'Backup and restore database',
          href: '/admin/backup',
          icon: Database,
          status: 'ready'
        },
        {
          name: 'System Health',
          description: 'Monitor system performance',
          href: '/admin/site-health',
          icon: TrendingUp,
          status: 'ready'
        },
        {
          name: 'User Management',
          description: 'Manage all user accounts',
          href: '/admin/users',
          icon: Users,
          status: 'ready'
        },
        {
          name: 'Integrations',
          description: 'Manage system integrations',
          href: '/admin/integrations',
          icon: Settings,
          status: 'ready'
        },
        {
          name: 'API Documentation',
          description: 'View API endpoints and docs',
          href: '/admin/api-docs',
          icon: FileText,
          status: 'ready'
        },
      ]
    },
    {
      category: 'Communication',
      color: 'indigo',
      icon: Mail,
      items: [
        {
          name: 'Mass Email',
          description: 'Send emails to groups',
          href: '/admin/messages',
          icon: Mail,
          status: 'ready'
        },
        {
          name: 'SMS Notifications',
          description: 'Send text message alerts',
          href: '/admin/sms',
          icon: Mail,
          status: 'ready'
        },
        {
          name: 'Announcements',
          description: 'Post system-wide announcements',
          href: '/admin/announcements',
          icon: Mail,
          status: 'ready'
        },
        {
          name: 'Email Templates',
          description: 'Manage email templates',
          href: '/admin/email-templates',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'Communication Log',
          description: 'View all sent communications',
          href: '/admin/comm-log',
          icon: FileText,
          status: 'ready'
        },
        {
          name: 'Support Tickets',
          description: 'Manage support requests',
          href: '/admin/support',
          icon: AlertCircle,
          status: 'ready'
        },
      ]
    },
  ];

  const recentActivity = [
    { action: 'New enrollment', detail: 'John Smith - HVAC Program', time: '5 min ago', type: 'success' },
    { action: 'Payroll processed', detail: '$12,450 to 15 staff members', time: '1 hour ago', type: 'success' },
    { action: 'Compliance alert', detail: '3 students missing documentation', time: '2 hours ago', type: 'warning' },
    { action: 'Course created', detail: 'Advanced Welding Techniques', time: '3 hours ago', type: 'info' },
    { action: 'Report generated', detail: 'Monthly WIOA PIRL Report', time: '4 hours ago', type: 'info' },
  ];

  const pendingTasks = [
    { task: 'Review 12 pending payroll items', priority: 'high', href: '/admin/hr/payroll' },
    { task: 'Complete 3 compliance tasks', priority: 'high', href: '/admin/compliance' },
    { task: 'Approve 8 new enrollments', priority: 'medium', href: '/admin/enrollment' },
    { task: 'Review 5 at-risk students', priority: 'medium', href: '/admin/at-risk' },
    { task: 'Generate quarterly reports', priority: 'low', href: '/admin/reporting' },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Master Dashboard</h1>
              <p className="text-slate-300">Complete control center for all operations</p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-6 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Active Students</div>
              <div className="text-2xl font-bold">{quickStats.activeStudents}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Pending Payroll</div>
              <div className="text-2xl font-bold text-yellow-300">{quickStats.pendingPayroll}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Compliance Tasks</div>
              <div className="text-2xl font-bold text-orange-300">{quickStats.complianceTasks}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Courses Created</div>
              <div className="text-2xl font-bold">{quickStats.coursesCreated}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Monthly Revenue</div>
              <div className="text-2xl font-bold text-green-300">${(quickStats.revenue / 1000).toFixed(0)}K</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-sm text-slate-300 mb-1">Avg Attendance</div>
              <div className="text-2xl font-bold">{quickStats.attendance}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tools */}
          <div className="lg:col-span-2 space-y-8">
            {tools.map((toolCategory) => {
              const CategoryIcon = toolCategory.icon;
              return (
                <div key={toolCategory.category} className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                  <div className={`p-4 border-b border-slate-200 bg-${toolCategory.color}-50`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${toolCategory.color}-100 flex items-center justify-center`}>
                        <CategoryIcon className={`w-5 h-5 text-${toolCategory.color}-600`} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{toolCategory.category}</h2>
                        <p className="text-xs text-slate-600">{toolCategory.items.length} tools available</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      {toolCategory.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            className="flex items-start gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <ItemIcon className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 truncate">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-600 mt-0.5">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pending Tasks */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Tasks</h3>
              <div className="space-y-3">
                {pendingTasks.map((task, idx) => (
                  <Link
                    key={idx}
                    href={task.href}
                    className="block p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                          {task.task}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {task.priority === 'high' ? 'High Priority' :
                           task.priority === 'medium' ? 'Medium Priority' :
                           'Low Priority'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{activity.action}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{activity.detail}</div>
                      <div className="text-xs text-slate-400 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/admin/course-generator"
                  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                  🚀 Generate New Course
                </Link>
                <Link
                  href="/admin/hr/payroll"
                  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                  💰 Process Payroll
                </Link>
                <Link
                  href="/admin/reporting"
                  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                  📊 Generate Report
                </Link>
                <Link
                  href="/admin/students"
                  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold"
                >
                  👥 View All Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

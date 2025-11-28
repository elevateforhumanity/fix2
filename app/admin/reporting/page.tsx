'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Download,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function ReportingDashboardPage() {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  // Mock data
  const stats = {
    totalStudents: 847,
    activePrograms: 24,
    completionRate: 78,
    revenue: 124500,
    attendance: 87,
    jobPlacement: 89,
  };

  const reportCategories = [
    {
      id: 'student',
      title: 'Student Reports',
      icon: Users,
      color: 'blue',
      reports: [
        { name: 'Enrollment Report', description: 'All student enrollments by program and date' },
        { name: 'Attendance Report', description: 'Daily, weekly, monthly attendance tracking' },
        { name: 'Progress Report', description: 'Student progress and completion status' },
        { name: 'At-Risk Students', description: 'Students below 80% attendance or failing' },
        { name: 'Completion Report', description: 'Students who completed programs' },
        { name: 'Dropout Report', description: 'Students who left programs early' },
      ]
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      icon: DollarSign,
      color: 'green',
      reports: [
        { name: 'Revenue Summary', description: 'Total revenue by program and funding source' },
        { name: 'Program Holder Payments', description: 'Payments made to program holders' },
        { name: 'Grant Revenue', description: 'WIOA, WRG, and grant funding breakdown' },
        { name: 'Payment Schedule', description: 'Pending and upcoming payments' },
        { name: 'Micro Program Sales', description: 'Revenue from micro program sales' },
        { name: 'Payroll Report', description: 'Staff and contractor payroll' },
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Reports',
      icon: CheckCircle,
      color: 'purple',
      reports: [
        { name: 'WIOA PIRL Report', description: 'Participant Individual Record Layout data' },
        { name: 'WRG Compliance', description: 'Workforce Ready Grant reporting' },
        { name: 'Documentation Status', description: 'Missing or incomplete documents' },
        { name: 'Audit Readiness', description: 'Compliance checklist and gaps' },
        { name: 'Hour Tracking Report', description: 'Apprenticeship hours logged' },
        { name: 'Certification Report', description: 'Industry certifications earned' },
      ]
    },
    {
      id: 'program',
      title: 'Program Reports',
      icon: BarChart3,
      color: 'orange',
      reports: [
        { name: 'Program Performance', description: 'Enrollment, completion, and placement by program' },
        { name: 'Program Holder Report', description: 'Performance by program holder' },
        { name: 'Instructor Report', description: 'Performance by instructor' },
        { name: 'Cohort Report', description: 'Performance by cohort/class' },
        { name: 'Waitlist Report', description: 'Students waiting for program start' },
        { name: 'Capacity Report', description: 'Program capacity and utilization' },
      ]
    },
    {
      id: 'outcomes',
      title: 'Outcome Reports',
      icon: TrendingUp,
      color: 'indigo',
      reports: [
        { name: 'Job Placement Report', description: 'Employment outcomes and wages' },
        { name: 'Retention Report', description: '90-day and 180-day retention rates' },
        { name: 'Wage Report', description: 'Starting wages by program' },
        { name: 'Employer Report', description: 'Hiring partners and placements' },
        { name: 'Career Progression', description: 'Student career advancement tracking' },
        { name: 'Success Stories', description: 'Notable student achievements' },
      ]
    },
    {
      id: 'operational',
      title: 'Operational Reports',
      icon: Clock,
      color: 'red',
      reports: [
        { name: 'Daily Activity Report', description: 'Daily enrollments, attendance, completions' },
        { name: 'Weekly Summary', description: 'Week-over-week performance metrics' },
        { name: 'Monthly Dashboard', description: 'Comprehensive monthly overview' },
        { name: 'Quarterly Report', description: 'Quarterly performance and trends' },
        { name: 'Annual Report', description: 'Year-end comprehensive report' },
        { name: 'Custom Report Builder', description: 'Build your own custom reports' },
      ]
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-slate-600 hover:text-slate-900 mb-2 inline-block">
                ← Back to Admin
              </Link>
              <h1 className="text-3xl font-bold text-slate-900">Reporting & Analytics</h1>
              <p className="text-slate-600 mt-2">
                Comprehensive reports for students, finances, compliance, and outcomes
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Total Students</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalStudents}</div>
            <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Active Programs</span>
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.activePrograms}</div>
            <div className="text-xs text-slate-500 mt-1">Across all categories</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-green-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Completion Rate</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">{stats.completionRate}%</div>
            <div className="text-xs text-green-600 mt-1">↑ 3% from last month</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Revenue</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">${(stats.revenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Avg Attendance</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{stats.attendance}%</div>
            <div className="text-xs text-green-600 mt-1">↑ 2% from last month</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-green-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">Job Placement</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">{stats.jobPlacement}%</div>
            <div className="text-xs text-green-600 mt-1">Within 90 days</div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-8">
          {reportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                <div className={`p-6 border-b border-slate-200 bg-${category.color}-50`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{category.title}</h2>
                      <p className="text-sm text-slate-600">{category.reports.length} reports available</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.reports.map((report, idx) => (
                      <button
                        key={idx}
                        className="text-left p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
                            {report.name}
                          </h3>
                          <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <p className="text-sm text-slate-600">{report.description}</p>
                        <div className="mt-3 flex gap-2">
                          <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                            View Report →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled Reports */}
        <div className="mt-8 bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Scheduled Reports</h2>
              <p className="text-sm text-slate-600">Automatically generated and emailed reports</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              + Schedule New Report
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">Weekly Enrollment Report</div>
                  <div className="text-sm text-slate-600">Every Monday at 8:00 AM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  Active
                </span>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Edit
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">Monthly Financial Summary</div>
                  <div className="text-sm text-slate-600">1st of each month at 9:00 AM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  Active
                </span>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Edit
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">Quarterly WIOA Report</div>
                  <div className="text-sm text-slate-600">End of each quarter</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  Active
                </span>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

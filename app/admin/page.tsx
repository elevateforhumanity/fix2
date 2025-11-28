// app/admin/page.tsx - Admin Dashboard Overview
import { getServerSupabase } from "@/lib/supabaseClients";
import Link from "next/link";
import { Users, FileText, Award, TrendingUp, Clock, DollarSign, Info } from "lucide-react";

// Enable caching for 5 minutes
export const revalidate = 300;

export default async function AdminDashboardPage() {
  const supabase = getServerSupabase();

  // Initialize stats with defaults
  let stats = {
    totalApplications: 0,
    applicationsThisWeek: 0,
    activeEnrollments: 0,
    completedPrograms: 0,
    certificatesIssued: 0,
    pendingApplications: 0,
  };

  if (supabase) {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Run all queries in parallel for better performance
      const [
        { count: totalApps },
        { count: weekApps },
        { count: pendingApps },
        { count: activeEnroll },
        { count: completedEnroll },
        { count: certs }
      ] = await Promise.all([
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }).gte("created_at", oneWeekAgo.toISOString()),
        supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "submitted"),
        supabase.from("enrollments").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("enrollments").select("*", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("certificates").select("*", { count: "exact", head: true })
      ]);

      stats = {
        totalApplications: totalApps || 0,
        applicationsThisWeek: weekApps || 0,
        activeEnrollments: activeEnroll || 0,
        completedPrograms: completedEnroll || 0,
        certificatesIssued: certs || 0,
        pendingApplications: pendingApps || 0,
      };
    } catch (error) {
      console.error("Error loading admin stats:", error);
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600 mt-1">
            Monitor applications, enrollments, completions, and funding mix across all Elevate For Humanity programs
          </p>
        </div>

        {!supabase && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Database not configured. Showing demo data. Configure Supabase to see real data.
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Total Applications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-brandPrimary" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Total number of applications submitted through the Elevate For Humanity intake form. This includes learners referred by workforce partners, employers, and the public. Use this to track demand and outreach impact.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalApplications}
            </div>
            <div className="text-sm font-semibold text-gray-900">Total Applications</div>
            {stats.applicationsThisWeek > 0 && (
              <div className="mt-2 text-xs text-green-600 font-medium">
                +{stats.applicationsThisWeek} in the last 7 days
              </div>
            )}
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Applications that need review and approval. Click "Review now" to approve applications and automatically create user accounts and enrollments.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.pendingApplications}
            </div>
            <div className="text-sm font-semibold text-gray-900">Pending Applications</div>
            <div className="text-xs text-gray-500 mt-1">Needs review</div>
            <Link
              href="/admin/applications"
              className="mt-2 inline-block text-xs text-orange-600 hover:text-orange-700 font-semibold"
            >
              Review now →
            </Link>
          </div>

          {/* Active Enrollments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Number of learners who are currently enrolled in at least one program and marked as 'active' in the system. These are your in-progress learners that need support, check-ins, and coordination.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeEnrollments}
            </div>
            <div className="text-sm font-semibold text-gray-900">Active Enrollments</div>
            <div className="text-xs text-gray-500 mt-1">Learners currently in programs</div>
            <Link
              href="/admin/enrollments"
              className="mt-2 inline-block text-xs text-green-600 hover:text-green-700 font-semibold"
            >
              View details →
            </Link>
          </div>

          {/* Completed Programs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Total number of enrollments that have been marked 'completed.' These are learners who have finished all required coursework or program milestones. Use this number for completion reporting to workforce boards and funders.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.completedPrograms}
            </div>
            <div className="text-sm font-semibold text-gray-900">Completed Enrollments</div>
            <div className="text-xs text-gray-500 mt-1">Learners who finished a program</div>
            <Link
              href="/admin/progress"
              className="mt-2 inline-block text-xs text-purple-600 hover:text-purple-700 font-semibold"
            >
              View progress →
            </Link>
          </div>

          {/* Certificates Issued */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Total certificates generated by the LMS for completed programs. This can be used for verification, audits, and to show funders how many learners have finished a pathway and received documentation.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.certificatesIssued}
            </div>
            <div className="text-sm font-semibold text-gray-900">Certificates Issued</div>
            <div className="text-xs text-gray-500 mt-1">Total completions across all time</div>
            <Link
              href="/admin/certificates"
              className="mt-2 inline-block text-xs text-red-600 hover:text-red-700 font-semibold"
            >
              View certificates →
            </Link>
          </div>

          {/* Funding Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
                  Total enrollments with identified funding sources. Export detailed funding reports from the Enrollments page to share with workforce boards and funding partners.
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeEnrollments}
            </div>
            <div className="text-sm font-semibold text-gray-900">Funded Enrollments</div>
            <div className="mt-2 text-xs text-gray-500">
              WIOA, WRG, JRI, OJT, WEX
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href="/admin/applications"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-brandPrimary hover:bg-blue-50 transition-all"
            >
              <FileText className="w-6 h-6 text-brandPrimary mb-2" />
              <div className="font-semibold text-gray-900">Review Applications</div>
              <div className="text-xs text-gray-600 mt-1">
                Process new applications
              </div>
            </Link>

            <Link
              href="/admin/enrollments"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Manage Enrollments</div>
              <div className="text-xs text-gray-600 mt-1">
                View active students
              </div>
            </Link>

            <Link
              href="/admin/courses"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-900">Course Builder</div>
              <div className="text-xs text-gray-600 mt-1">
                Create & edit programs
              </div>
            </Link>

            <Link
              href="/admin/certificates"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all"
            >
              <Award className="w-6 h-6 text-red-600 mb-2" />
              <div className="font-semibold text-gray-900">Issue Certificates</div>
              <div className="text-xs text-gray-600 mt-1">
                Award completions
              </div>
            </Link>

            <Link
              href="/admin/reports"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
              <div className="font-semibold text-gray-900">View Reports</div>
              <div className="text-xs text-gray-600 mt-1">
                Analytics & insights
              </div>
            </Link>
          </div>
        </div>

        {/* Content Creation Tools */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm border-2 border-indigo-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Content Creation Tools</h2>
          <p className="text-sm text-gray-600 mb-4">Build courses, upload videos, and manage digital content</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/course-builder"
              className="p-4 bg-white border-2 border-indigo-200 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-6 h-6 text-indigo-600 mb-2" />
              <div className="font-semibold text-gray-900">Course Builder</div>
              <div className="text-xs text-gray-600 mt-1">
                Create new courses
              </div>
            </Link>

            <Link
              href="/admin/ai-course-builder"
              className="p-4 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-900">AI Course Builder</div>
              <div className="text-xs text-gray-600 mt-1">
                AI-powered creation
              </div>
            </Link>

            <Link
              href="/admin/videos/upload"
              className="p-4 bg-white border-2 border-pink-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-6 h-6 text-pink-600 mb-2" />
              <div className="font-semibold text-gray-900">Video Builder</div>
              <div className="text-xs text-gray-600 mt-1">
                Upload & manage videos
              </div>
            </Link>

            <Link
              href="/admin/document-center"
              className="p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-6 h-6 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-900">Digital Binders</div>
              <div className="text-xs text-gray-600 mt-1">
                Document management
              </div>
            </Link>
          </div>
        </div>

        {/* Reporting & Monitoring */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-sm border-2 border-green-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Reporting & Monitoring</h2>
          <p className="text-sm text-gray-600 mb-4">Track performance, generate reports, and monitor system health</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/reports"
              className="p-4 bg-white border-2 border-green-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Reports</div>
              <div className="text-xs text-gray-600 mt-1">
                Generate reports
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="p-4 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-900">Analytics</div>
              <div className="text-xs text-gray-600 mt-1">
                View insights
              </div>
            </Link>

            <Link
              href="/admin/site-health"
              className="p-4 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-6 h-6 text-teal-600 mb-2" />
              <div className="font-semibold text-gray-900">Site Health</div>
              <div className="text-xs text-gray-600 mt-1">
                Monitor system
              </div>
            </Link>

            <Link
              href="/admin/compliance-dashboard"
              className="p-4 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-6 h-6 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-900">Compliance</div>
              <div className="text-xs text-gray-600 mt-1">
                Track compliance
              </div>
            </Link>

            <Link
              href="/admin/outcomes"
              className="p-4 bg-white border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all"
            >
              <Award className="w-6 h-6 text-orange-600 mb-2" />
              <div className="font-semibold text-gray-900">Outcomes</div>
              <div className="text-xs text-gray-600 mt-1">
                Student outcomes
              </div>
            </Link>

            <Link
              href="/admin/impact"
              className="p-4 bg-white border-2 border-pink-200 rounded-xl hover:border-pink-500 hover:shadow-lg transition-all"
            >
              <TrendingUp className="w-6 h-6 text-pink-600 mb-2" />
              <div className="font-semibold text-gray-900">Impact</div>
              <div className="text-xs text-gray-600 mt-1">
                Measure impact
              </div>
            </Link>

            <Link
              href="/admin/retention"
              className="p-4 bg-white border-2 border-indigo-200 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all"
            >
              <Users className="w-6 h-6 text-indigo-600 mb-2" />
              <div className="font-semibold text-gray-900">Retention</div>
              <div className="text-xs text-gray-600 mt-1">
                Track retention
              </div>
            </Link>

            <Link
              href="/admin/audit-logs"
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-500 hover:shadow-lg transition-all"
            >
              <FileText className="w-6 h-6 text-gray-600 mb-2" />
              <div className="font-semibold text-gray-900">Audit Logs</div>
              <div className="text-xs text-gray-600 mt-1">
                View activity logs
              </div>
            </Link>
          </div>
        </div>

        {/* Additional Tools */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/quiz-builder"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <FileText className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Quiz Builder</div>
              <div className="text-xs text-gray-600 mt-1">
                Create assessments
              </div>
            </Link>

            <Link
              href="/admin/syllabus-generator"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition-all"
            >
              <FileText className="w-6 h-6 text-yellow-600 mb-2" />
              <div className="font-semibold text-gray-900">Syllabus Generator</div>
              <div className="text-xs text-gray-600 mt-1">
                Auto-generate syllabi
              </div>
            </Link>

            <Link
              href="/admin/program-generator"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all"
            >
              <FileText className="w-6 h-6 text-teal-600 mb-2" />
              <div className="font-semibold text-gray-900">Program Generator</div>
              <div className="text-xs text-gray-600 mt-1">
                Build new programs
              </div>
            </Link>

            <Link
              href="/admin/curriculum/upload"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              <FileText className="w-6 h-6 text-orange-600 mb-2" />
              <div className="font-semibold text-gray-900">Curriculum Upload</div>
              <div className="text-xs text-gray-600 mt-1">
                Import curriculum
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-sm text-gray-600">
            Recent applications, enrollments, and completions will appear here once data is available.
          </div>
        </div>
      </div>
    </div>
  );
}

// app/admin/page.tsx - Admin Dashboard Overview
import { getServerSupabase } from "@/lib/supabaseClients";
import Link from "next/link";
import { Users, FileText, Award, TrendingUp, Clock, DollarSign } from "lucide-react";

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
      // Get applications count
      const { count: totalApps } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      // Get applications this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const { count: weekApps } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .gte("created_at", oneWeekAgo.toISOString());

      // Get pending applications
      const { count: pendingApps } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "submitted");

      // Get active enrollments
      const { count: activeEnroll } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Get completed enrollments
      const { count: completedEnroll } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed");

      // Get certificates issued
      const { count: certs } = await supabase
        .from("certificates")
        .select("*", { count: "exact", head: true });

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
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-600 mt-1">
            Monitor applications, enrollments, and program outcomes
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
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">All Time</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalApplications}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
            {stats.applicationsThisWeek > 0 && (
              <div className="mt-2 text-xs text-green-600">
                +{stats.applicationsThisWeek} this week
              </div>
            )}
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Needs Review</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.pendingApplications}
            </div>
            <div className="text-sm text-gray-600">Pending Applications</div>
            <Link
              href="/admin/applications"
              className="mt-2 text-xs text-orange-600 hover:text-orange-700 font-medium"
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
              <span className="text-sm text-gray-500">Currently Active</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeEnrollments}
            </div>
            <div className="text-sm text-gray-600">Active Enrollments</div>
            <Link
              href="/admin/enrollments"
              className="mt-2 text-xs text-green-600 hover:text-green-700 font-medium"
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
              <span className="text-sm text-gray-500">Completions</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.completedPrograms}
            </div>
            <div className="text-sm text-gray-600">Completed Programs</div>
            <Link
              href="/admin/progress"
              className="mt-2 text-xs text-purple-600 hover:text-purple-700 font-medium"
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
              <span className="text-sm text-gray-500">Issued</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.certificatesIssued}
            </div>
            <div className="text-sm text-gray-600">Certificates Issued</div>
            <Link
              href="/admin/certificates"
              className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
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
              <span className="text-sm text-gray-500">Funding</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeEnrollments}
            </div>
            <div className="text-sm text-gray-600">Funded Enrollments</div>
            <div className="mt-2 text-xs text-gray-500">
              WIOA, WRG, JRI, OJT
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/applications"
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <FileText className="w-6 h-6 text-blue-600 mb-2" />
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

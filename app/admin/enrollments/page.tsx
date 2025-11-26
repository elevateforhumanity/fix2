// app/admin/enrollments/page.tsx - Enrollments Management
import { getServerSupabase } from "@/lib/supabaseClients";
import Link from "next/link";
import { Download, Users, Filter, Calendar } from "lucide-react";

export default async function EnrollmentsPage() {
  const supabase = getServerSupabase();

  let enrollments: any[] = [];
  const stats = {
    total: 0,
    active: 0,
    completed: 0,
    wioa: 0,
    wrg: 0,
    jri: 0,
  };

  if (supabase) {
    try {
      // Get enrollments with program info
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
          id,
          user_id,
          program_id,
          status,
          funding_type,
          source,
          started_at,
          completed_at,
          created_at,
          programs ( title, slug )
        `
        )
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      enrollments = data || [];

      // Calculate stats
      stats.total = enrollments.length;
      stats.active = enrollments.filter((e) => e.status === "active").length;
      stats.completed = enrollments.filter((e) => e.status === "completed").length;
      stats.wioa = enrollments.filter((e) => e.funding_type === "WIOA").length;
      stats.wrg = enrollments.filter((e) => e.funding_type === "WRG").length;
      stats.jri = enrollments.filter((e) => e.funding_type === "JRI").length;
    } catch (error) {
      console.error("Error loading enrollments:", error);
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Enrollments</h1>
            <p className="text-gray-600 mt-1">
              Manage student enrollments and track program participation
            </p>
          </div>

          {/* Export Button */}
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export/enrollments?format=csv"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </a>
          </div>
        </div>

        {!supabase && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Database not configured. Showing demo data. Configure Supabase to see real enrollments.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-gray-600">Active</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-xs font-medium text-gray-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-600">WIOA</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.wioa}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-600">WRG</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.wrg}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-red-600">JRI</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.jri}</div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">Quick Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/api/admin/export/enrollments?format=csv&status=active"
              className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Active Only
            </a>
            <a
              href="/api/admin/export/enrollments?format=csv&funding_type=WIOA"
              className="px-3 py-1.5 rounded-full border border-blue-300 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors"
            >
              WIOA Funded
            </a>
            <a
              href="/api/admin/export/enrollments?format=csv&funding_type=WRG"
              className="px-3 py-1.5 rounded-full border border-orange-300 text-xs font-medium text-orange-700 hover:bg-orange-50 transition-colors"
            >
              WRG Funded
            </a>
            <a
              href="/api/admin/export/enrollments?format=csv&funding_type=JRI"
              className="px-3 py-1.5 rounded-full border border-red-300 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              JRI Funded
            </a>
            <a
              href="/api/admin/export/enrollments?format=csv&status=completed"
              className="px-3 py-1.5 rounded-full border border-purple-300 text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Completed Only
            </a>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Funding
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Started
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                      No enrollments found. Applications will appear here once approved.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {enrollment.programs?.title || "Unknown Program"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {enrollment.programs?.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-mono text-gray-600">
                          {enrollment.user_id.substring(0, 8)}...
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-700"
                              : enrollment.status === "completed"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {enrollment.funding_type ? (
                          <span className="text-xs font-semibold text-gray-700">
                            {enrollment.funding_type}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600">
                          {enrollment.source || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {enrollment.started_at
                            ? new Date(enrollment.started_at).toLocaleDateString()
                            : "Not started"}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            📊 Reporting for Funders
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Click "Export CSV" to download all enrollments for reporting</li>
            <li>• Use quick filters to export specific funding types (WIOA, WRG, JRI)</li>
            <li>• CSV includes program details, funding type, dates, and status</li>
            <li>• Share reports with WorkOne, WRG, or other workforce partners</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

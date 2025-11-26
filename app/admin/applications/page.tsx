// app/admin/applications/page.tsx - Applications Management
import { getServerSupabase } from "@/lib/supabaseClients";
import Link from "next/link";
import { FileText, Eye, Calendar, Mail, User } from "lucide-react";

export default async function ApplicationsPage() {
  const supabase = getServerSupabase();

  let applications: any[] = [];
  const stats = {
    total: 0,
    submitted: 0,
    converted: 0,
    rejected: 0,
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      applications = data || [];

      // Calculate stats
      stats.total = applications.length;
      stats.submitted = applications.filter((a) => a.status === "submitted").length;
      stats.converted = applications.filter((a) => a.status === "converted").length;
      stats.rejected = applications.filter((a) => a.status === "rejected").length;
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Review and approve program applications</p>
        </div>

        {!supabase && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Database not configured. Configure Supabase to see real applications.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs font-medium text-gray-600">Pending</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.submitted}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-gray-600">Approved</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-gray-600">Rejected</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Applicant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Program</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                      No applications found. New applications will appear here.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{app.first_name} {app.last_name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {app.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{app.program || "Not specified"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === "converted" ? "bg-green-100 text-green-700" :
                          app.status === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {app.status || "submitted"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600">{app.source || "website"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/applications/${app.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
                          <Eye className="w-3 h-3" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Application Workflow</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Click "View Details" to see full application information</li>
            <li>• Select a program and funding type, then click "Approve & Enroll"</li>
            <li>• System automatically creates user account and enrollment</li>
            <li>• Student can log in immediately after approval</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

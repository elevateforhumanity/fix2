import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { Download, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'WorkOne Oversight Dashboard',
  description: 'Read-only view for WorkOne regional monitoring',
};

export default async function WorkOneView() {
  const supabase = createAdminClient();

  // Get audit snapshot data
  const { data: auditData } = await supabase
    .from('audit_snapshot')
    .select('*')
    .order('referral_date', { ascending: false })
    .limit(100);

  // Get summary stats
  const { data: apprentices } = await supabase
    .from('apprentices')
    .select('status');

  const stats = {
    total: apprentices?.length || 0,
    active: apprentices?.filter((a) => a.status === 'active').length || 0,
    completed:
      apprentices?.filter((a) => a.status === 'completed').length || 0,
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                WorkOne Oversight Dashboard
              </h1>
              <p className="text-slate-600">Read-only monitoring view</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This is a read-only view for WorkOne
              regional monitoring. No data can be edited from this dashboard.
              For questions or updates, contact the sponsor directly.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {stats.total}
            </div>
            <div className="text-sm text-slate-600">Total Enrollments</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.active}
            </div>
            <div className="text-sm text-slate-600">Active Apprentices</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.completed}
            </div>
            <div className="text-sm text-slate-600">Completed</div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/api/audit/export"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Download className="w-5 h-5" />
            Export Full Report (CSV)
          </Link>
        </div>

        {/* Audit Data Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-slate-100 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Referrals & Status
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    Referral Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    Employer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    Funding Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    Funding Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    RAPIDS Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {auditData?.map((record: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {record.referral_date
                        ? new Date(record.referral_date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {record.program || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {record.employer || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {record.funding_source || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                          record.funding_status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : record.funding_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {record.funding_status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                          record.rapids_status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : record.rapids_status === 'registered'
                            ? 'bg-blue-100 text-blue-800'
                            : record.rapids_status === 'completed'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {record.rapids_status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!auditData || auditData.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No data available</p>
            </div>
          ) : null}
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4">
            Questions or Updates?
          </h3>
          <p className="text-slate-700 mb-4">
            This dashboard is for monitoring purposes only. For any questions,
            updates, or to request changes, please contact:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Elevate for Humanity</strong>
            </p>
            <p>Phone: (317) 314-3757</p>
            <p>Email: elevate4humanityedu@gmail.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}

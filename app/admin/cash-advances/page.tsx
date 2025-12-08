// app/admin/cash-advances/page.tsx
import { Metadata } from 'next';
import { supabaseServer } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cash Advance Management | Admin',
  description: 'Manage cash advance applications and approvals',
};

export default async function CashAdvancesAdminPage() {
  const supabase = supabaseServer();

  // Fetch applications
  const { data: applications, error } = await supabase
    .from('cash_advance_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  // Calculate stats
  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter(a => a.status === 'pending').length || 0,
    approved: applications?.filter(a => a.status === 'approved').length || 0,
    funded: applications?.filter(a => a.status === 'funded').length || 0,
    denied: applications?.filter(a => a.status === 'denied').length || 0,
    totalAmount: applications?.reduce((sum, a) => sum + (a.requested_amount || 0), 0) || 0,
    approvedAmount: applications?.filter(a => a.status === 'approved' || a.status === 'funded')
      .reduce((sum, a) => sum + (a.approved_amount || 0), 0) || 0,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Cash Advance Management
        </h1>
        <p className="text-slate-600">
          Manage Supersonic Cash advance applications and approvals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Total Applications</div>
          <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Pending Review</div>
          <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Approved</div>
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Total Funded</div>
          <div className="text-3xl font-bold text-blue-600">
            ${stats.approvedAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/cash-advances/pending"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Review Pending ({stats.pending})
          </Link>
          <Link
            href="/admin/cash-advances/reports"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Reports
          </Link>
          <Link
            href="/admin/cash-advances/settings"
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Underwriting Settings
          </Link>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
        </div>

        {error && (
          <div className="p-6 text-red-600">
            Error loading applications: {error.message}
          </div>
        )}

        {!error && applications && applications.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No applications yet
          </div>
        )}

        {!error && applications && applications.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Income
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {app.first_name} {app.last_name}
                      </div>
                      <div className="text-sm text-slate-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-900">
                        ${app.requested_amount?.toLocaleString()}
                      </div>
                      {app.approved_amount && (
                        <div className="text-xs text-green-600">
                          Approved: ${app.approved_amount.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      ${app.monthly_income?.toLocaleString()}/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'pending'
                            ? 'bg-orange-100 text-orange-800'
                            : app.status === 'denied'
                            ? 'bg-red-100 text-red-800'
                            : app.status === 'funded'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/cash-advances/applications/${app.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      {app.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900 mr-4">
                            Approve
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Deny
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EPS Financial Partnership Status */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">
              🏦 EPS Financial Partnership
            </h3>
            <p className="text-blue-100 mb-1">
              Powered by Pathward®, N.A. | www.epstax.net
            </p>
            <p className="text-sm text-blue-200">
              Industry-leading refund advances and cash advance solutions
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">44,000+</div>
            <div className="text-sm text-blue-200">Tax Offices Enrolled</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold mb-2">💰 E-Advance</h4>
            <p className="text-sm text-blue-100">
              No cost taxpayer advance loan program with no in-season marketing fees
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold mb-2">📊 E-Collect</h4>
            <p className="text-sm text-blue-100">
              Simple, low-cost ($20) refund transfer program
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎁 E-Bonus</h4>
            <p className="text-sm text-blue-100">
              High incentive refund transfer - earn up to $20 more per return
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="font-semibold mb-3">Setup Requirements:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">EPS Financial API Credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">EPS Merchant/Office ID</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">Pathward Bank Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm">FasterMoney® Visa® Card Setup</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="https://www.epstax.net/getstarted/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            Enroll with EPS
          </a>
          <a
            href="https://www.epstax.net/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/10 backdrop-blur border border-white/30 rounded-lg hover:bg-white/20 transition"
          >
            Contact Support: 888-782-0850
          </a>
        </div>
      </div>
    </div>
  );
}

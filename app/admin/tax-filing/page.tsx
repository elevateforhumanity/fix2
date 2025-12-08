// app/admin/tax-filing/page.tsx
import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tax Filing Management | Admin',
  description: 'Manage tax filing applications and preparers',
};

export default async function TaxFilingAdminPage() {
  const supabase = createServerClient();

  // Fetch applications
  const { data: applications, error } = await supabase
    .from('tax_filing_applications')
    .select('*')
    .order('created_at', { ascending: false})
    .limit(100);

  // Fetch preparers
  const { data: preparers } = await supabase
    .from('tax_preparers')
    .select('*')
    .order('created_at', { ascending: false });

  // Calculate stats
  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter(a => a.status === 'pending').length || 0,
    inProgress: applications?.filter(a => a.status === 'in_progress').length || 0,
    filed: applications?.filter(a => a.status === 'filed').length || 0,
    completed: applications?.filter(a => a.status === 'completed').length || 0,
    totalPreparers: preparers?.length || 0,
    activePreparers: preparers?.filter(p => p.status === 'active').length || 0,
    totalRevenue: applications?.filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + (a.fee_amount || 0), 0) || 0,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Tax Filing Management
        </h1>
        <p className="text-slate-600">
          Manage tax return applications, preparers, and Drake Software integration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Total Returns</div>
          <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Pending Assignment</div>
          <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Active Preparers</div>
          <div className="text-3xl font-bold text-green-600">{stats.activePreparers}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-600 mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-blue-600">
            ${stats.totalRevenue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/tax-filing/applications"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View All Applications
          </Link>
          <Link
            href="/admin/tax-filing/preparers"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Manage Preparers ({stats.totalPreparers})
          </Link>
          <Link
            href="/admin/tax-filing/training"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Training Management
          </Link>
          <Link
            href="/admin/tax-filing/reports"
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Reports & Analytics
          </Link>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Recent Tax Returns</h2>
        </div>

        {error && (
          <div className="p-6 text-red-600">
            Error loading applications: {error.message}
          </div>
        )}

        {!error && applications && applications.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No tax filing applications yet
          </div>
        )}

        {!error && applications && applications.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tax Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Preparer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fee
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {app.tax_year || '2024'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {app.preparer_id ? (
                        <span className="text-green-600">Assigned</span>
                      ) : (
                        <span className="text-orange-600">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'filed'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'pending'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      ${app.fee_amount?.toLocaleString() || '100'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/tax-filing/applications/${app.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      {app.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900">
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* IRS e-File Integration Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          📋 Custom Tax Filing System
        </h3>
        <p className="text-blue-800 mb-4">
          Built-in tax form system with direct IRS e-file integration. No third-party software required.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Features:</h4>
            <ul className="list-disc list-inside text-sm text-blue-700">
              <li>Custom form builder</li>
              <li>IRS Form 1040 support</li>
              <li>W-2, 1099 import</li>
              <li>Direct IRS e-file</li>
              <li>PDF generation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Setup Required:</h4>
            <ul className="list-disc list-inside text-sm text-blue-700">
              <li>IRS EFIN (E-File ID Number)</li>
              <li>IRS ETIN (Transmitter ID)</li>
              <li>IRS CAF Number</li>
              <li>IRS Modernized e-File API access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Training Partners | Admin',
  description: 'Manage training providers and partnerships',
};

export default async function PartnersManagementPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/partners');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // Only admins and staff can view partners
  if (!['admin', 'staff'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  // Fetch all training partners/program holders
  const { data: partners } = await supabase
    .from('program_holders')
    .select('*')
    .order('created_at', { ascending: false });

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
  };

  const mouStatusColors: Record<string, string> = {
    signed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Partners</h1>
            <p className="mt-2 text-gray-600">
              Manage training providers, barbershops, and partner organizations
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/program-holder/apply"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Partner
            </Link>
            <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              Export List
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Partners</div>
            <div className="text-3xl font-bold text-gray-900">{partners?.length || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">
              {partners?.filter(p => p.status === 'active').length || 0}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Pending Approval</div>
            <div className="text-3xl font-bold text-yellow-600">
              {partners?.filter(p => p.status === 'pending').length || 0}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">MOUs Signed</div>
            <div className="text-3xl font-bold text-blue-600">
              {partners?.filter(p => p.mou_status === 'signed').length || 0}
            </div>
          </div>
        </div>

        {/* Partners List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Training Partners</h2>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Types</option>
                <option>Barbershop</option>
                <option>HVAC Company</option>
                <option>Healthcare Facility</option>
                <option>Training Center</option>
              </select>
            </div>
          </div>
          
          {partners && partners.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Partner Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training Focus
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MOU Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {partner.name?.charAt(0) || 'P'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {partner.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Since {new Date(partner.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{partner.contact_name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{partner.contact_email || partner.owner_email}</div>
                        {partner.phone && (
                          <div className="text-sm text-gray-500">{partner.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{partner.training_focus || 'General'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[partner.status] || 'bg-gray-100 text-gray-800'}`}>
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${mouStatusColors[partner.mou_status] || 'bg-gray-100 text-gray-800'}`}>
                          {partner.mou_status}
                        </span>
                        {partner.mou_signed_at && (
                          <div className="text-xs text-gray-500 mt-1">
                            Signed {new Date(partner.mou_signed_at).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link href={`/admin/partners/${partner.id}/students`} className="text-blue-600 hover:text-blue-700">
                          View Students
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/program-holders/${partner.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/program-holders/${partner.id}/edit`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No partners yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first training partner.</p>
              <div className="mt-6">
                <Link
                  href="/program-holder/apply"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Partner
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            href="/partners/mou"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">MOU Templates</h3>
            <p className="text-sm text-gray-600">Manage partnership agreements</p>
          </Link>
          <Link
            href="/admin/reports/partners"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Partner Reports</h3>
            <p className="text-sm text-gray-600">View partnership performance</p>
          </Link>
          <Link
            href="/partners/training-provider"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Partner Info</h3>
            <p className="text-sm text-gray-600">Learn about becoming a partner</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'LMS Integrations | Admin',
  description: 'Manage external LMS partner integrations',
};

export default async function LMSIntegrationsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/partners/lms-integrations');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!['admin', 'staff'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  // Fetch all LMS providers
  const { data: providers } = await supabase
    .from('partner_lms_providers')
    .select('*')
    .order('provider_name');

  // Fetch enrollment stats
  const { data: enrollments } = await supabase
    .from('partner_lms_enrollments')
    .select('provider_id, status');

  const enrollmentsByProvider = enrollments?.reduce((acc, e) => {
    if (!acc[e.provider_id]) {
      acc[e.provider_id] = { total: 0, active: 0, completed: 0 };
    }
    acc[e.provider_id].total++;
    if (e.status === 'active') acc[e.provider_id].active++;
    if (e.status === 'completed') acc[e.provider_id].completed++;
    return acc;
  }, {} as Record<string, { total: number; active: number; completed: number }>);

  const providerTypeColors: Record<string, string> = {
    milady: 'bg-purple-100 text-purple-800',
    jri: 'bg-blue-100 text-blue-800',
    certiport: 'bg-green-100 text-green-800',
    nrf_rise: 'bg-orange-100 text-orange-800',
    hsi: 'bg-red-100 text-red-800',
    careersafe: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/admin/partners" className="hover:text-brandPrimary">Partners</Link>
            <span>/</span>
            <span className="text-gray-900">LMS Integrations</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">External LMS Integrations</h1>
              <p className="mt-2 text-gray-600">
                Manage connections to Certiport, HSI, JRI, NRF RISE Up, CareerSafe, and Milady RISE
              </p>
            </div>
            <Link
              href="/admin/partners/lms-integrations/add"
              className="px-6 py-3 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors"
            >
              + Add Integration
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Integrations</div>
            <div className="text-3xl font-bold text-gray-900">{providers?.length || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">
              {providers?.filter(p => p.is_active).length || 0}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Enrollments</div>
            <div className="text-3xl font-bold text-brandPrimary">
              {enrollments?.length || 0}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-blue-600">
              {enrollments?.filter(e => e.status === 'completed').length || 0}
            </div>
          </div>
        </div>

        {/* Integrations List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All LMS Integrations</h2>
          </div>
          
          {providers && providers.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {providers.map((provider) => {
                const stats = enrollmentsByProvider?.[provider.id] || { total: 0, active: 0, completed: 0 };
                
                return (
                  <div key={provider.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {provider.provider_name}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${providerTypeColors[provider.provider_type] || providerTypeColors.other}`}>
                            {provider.provider_type}
                          </span>
                          {provider.is_active ? (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              Inactive
                            </span>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <div className="text-sm text-gray-600 mb-2">Contact Information</div>
                            {provider.contact_name && (
                              <div className="text-sm text-gray-900">{provider.contact_name}</div>
                            )}
                            {provider.contact_email && (
                              <div className="text-sm text-gray-600">{provider.contact_email}</div>
                            )}
                            {provider.contact_phone && (
                              <div className="text-sm text-gray-600">{provider.contact_phone}</div>
                            )}
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-600 mb-2">Integration Details</div>
                            {provider.api_endpoint && (
                              <div className="text-sm text-gray-900">API: {provider.api_endpoint}</div>
                            )}
                            {provider.sso_enabled && (
                              <div className="text-sm text-green-600">✓ SSO Enabled</div>
                            )}
                            {provider.promo_code && (
                              <div className="text-sm text-gray-900">Promo: {provider.promo_code}</div>
                            )}
                            {provider.requires_payment && (
                              <div className="text-sm text-gray-900">
                                Payment: ${provider.payment_amount}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Enrollment Stats */}
                        <div className="mt-4 flex gap-6">
                          <div>
                            <div className="text-xs text-gray-600">Total Enrollments</div>
                            <div className="text-lg font-semibold text-gray-900">{stats.total}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Active</div>
                            <div className="text-lg font-semibold text-green-600">{stats.active}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Completed</div>
                            <div className="text-lg font-semibold text-blue-600">{stats.completed}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <Link
                          href={`/admin/partners/lms-integrations/${provider.id}`}
                          className="px-4 py-2 text-sm font-medium text-brandPrimary border border-brandPrimary rounded-lg hover:bg-blue-50 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/admin/partners/lms-integrations/${provider.id}/enroll`}
                          className="px-4 py-2 text-sm font-medium text-white bg-brandPrimary rounded-lg hover:bg-brandPrimaryDark transition-colors text-center"
                        >
                          Enroll Student
                        </Link>
                        <Link
                          href={`/admin/partners/lms-integrations/${provider.id}/edit`}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations configured</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first LMS integration.</p>
              <div className="mt-6">
                <Link
                  href="/admin/partners/lms-integrations/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brandPrimary hover:bg-brandPrimaryDark"
                >
                  Add Integration
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Certiport</h3>
            <p className="text-sm text-gray-600 mb-4">Microsoft Office Specialist certifications</p>
            <Link href="/admin/partners/lms-integrations?filter=certiport" className="text-sm text-brandPrimary hover:underline">
              View Certiport →
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">🏥 HSI</h3>
            <p className="text-sm text-gray-600 mb-4">Health & Safety Institute certifications</p>
            <Link href="/admin/partners/lms-integrations?filter=hsi" className="text-sm text-brandPrimary hover:underline">
              View HSI →
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">🛍️ NRF RISE Up</h3>
            <p className="text-sm text-gray-600 mb-4">Retail industry training</p>
            <Link href="/admin/partners/lms-integrations?filter=nrf_rise" className="text-sm text-brandPrimary hover:underline">
              View NRF →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

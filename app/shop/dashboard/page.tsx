import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Award, Users, FileText, CheckCircle, Clock } from 'lucide-react';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export default async function ShopDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/shop/dashboard');
  }

  // Find shops for this user
  const { data: staff } = await supabase
    .from('shop_staff')
    .select('shop_id, role, shops(*)')
    .eq('user_id', user.id);

  const shop = staff?.[0]?.shops;

  if (!shop) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">Shop Portal</h1>
          <p className="mt-2 text-slate-700">
            No shop access found for this account. Contact your program sponsor.
          </p>
        </div>
      </div>
    );
  }

  // Get onboarding status
  const { data: onboarding } = await supabase
    .from('shop_onboarding')
    .select('*')
    // @ts-expect-error TS2339: Property 'id' does not exist on type 'any[]'.
    .eq('shop_id', shop.id)
    .single();

  // Get active placements
  const { data: placements } = await supabase
    .from('apprentice_placements')
    .select('id, status, start_date, profiles(id, full_name, email)')
    // @ts-expect-error TS2339: Property 'id' does not exist on type 'any[]'.
    .eq('shop_id', shop.id)
    .eq('status', 'active');

  // Get recent reports
  const { data: recentReports } = await supabase
    .from('apprentice_weekly_reports')
    .select('id, week_start, week_end, hours_total, status')
    .in('placement_id', placements?.map((p) => p.id) || [])
    .order('submitted_at', { ascending: false })
    .limit(5);

  const onboardingComplete =
    onboarding?.handbook_ack &&
    onboarding?.reporting_trained &&
    onboarding?.apprentice_supervisor_assigned &&
    onboarding?.rapids_reporting_ready;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              // @ts-expect-error TS2339: Property 'name' does not exist on type
              'any[]'.
              <h1 className="text-3xl font-bold text-slate-900">{shop.name}</h1>
              <p className="mt-1 text-slate-600">Shop Partner Portal</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                Indiana Registered Apprenticeship
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding Status */}
            {!onboardingComplete && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-brand-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-900">
                      Complete Onboarding
                    </h2>
                    <p className="mt-1 text-sm text-slate-700">
                      You must complete all onboarding steps before hosting
                      apprentices.
                    </p>
                    <Link
                      href="/shop/onboarding"
                      className="mt-3 inline-flex items-center px-4 py-2 bg-brand-orange-600 text-white font-semibold rounded-lg hover:bg-brand-orange-700 transition"
                    >
                      Continue Onboarding
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Onboarding Checklist */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-brand-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Onboarding Checklist
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {onboarding?.handbook_ack ? (
                    <CheckCircle className="w-5 h-5 text-brand-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                  <span
                    className={
                      onboarding?.handbook_ack
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-600'
                    }
                  >
                    Acknowledge sponsor handbook + expectations
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {onboarding?.reporting_trained ? (
                    <CheckCircle className="w-5 h-5 text-brand-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                  <span
                    className={
                      onboarding?.reporting_trained
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-600'
                    }
                  >
                    Complete reporting training
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {onboarding?.apprentice_supervisor_assigned ? (
                    <CheckCircle className="w-5 h-5 text-brand-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                  <span
                    className={
                      onboarding?.apprentice_supervisor_assigned
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-600'
                    }
                  >
                    Assign apprentice supervisor
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {onboarding?.rapids_reporting_ready ? (
                    <CheckCircle className="w-5 h-5 text-brand-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                  <span
                    className={
                      onboarding?.rapids_reporting_ready
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-600'
                    }
                  >
                    RAPIDS reporting readiness
                  </span>
                </div>
              </div>

              {!onboardingComplete && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <Link
                    href="/shop/onboarding"
                    className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-sm"
                  >
                    Open onboarding →
                  </Link>
                </div>
              )}
            </div>

            {/* Active Apprentices */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-brand-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">
                    Active Apprentices
                  </h2>
                </div>
                {onboardingComplete && (
                  <Link
                    href="/shop/reports/new"
                    className="px-4 py-2 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition text-sm"
                  >
                    Submit Weekly Report
                  </Link>
                )}
              </div>

              <div className="space-y-3">
                {placements && placements.length > 0 ? (
                  placements.map((p: any) => (
                    <div
                      key={p.id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="font-bold text-slate-900">
                        {p.profiles?.full_name || 'Student'}
                      </div>
                      <div className="text-sm text-slate-600">
                        {p.profiles?.email}
                      </div>
                      <div className="text-sm text-slate-600">
                        Start Date:{' '}
                        {new Date(p.start_date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">
                    No active apprentices assigned yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-brand-blue-600">
                    {placements?.length || 0}
                  </div>
                  <div className="text-sm text-slate-600">
                    Active Apprentices
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-green-600">
                    {recentReports?.length || 0}
                  </div>
                  <div className="text-sm text-slate-600">
                    Reports Submitted
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-brand-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Reports
                </h3>
              </div>
              <div className="space-y-2">
                {recentReports && recentReports.length > 0 ? (
                  recentReports.map((r: any) => (
                    <div
                      key={r.id}
                      className="text-sm border-b border-slate-100 pb-2 last:border-0"
                    >
                      <div className="font-medium text-slate-900">
                        {new Date(r.week_start).toLocaleDateString()} -{' '}
                        {new Date(r.week_end).toLocaleDateString()}
                      </div>
                      <div className="text-slate-600">
                        {r.hours_total} hours • {r.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">
                    No reports submitted yet
                  </div>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Contact your program sponsor for assistance with reporting or
                apprentice management.
              </p>
              <a
                href="mailto:elevate4humanityedu@gmail.com"
                className="text-sm text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
              >
                elevate4humanityedu@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

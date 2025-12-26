import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import { BarChart3, TrendingUp, Eye, Target } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/admin/analytics-dashboard',
  },
  title: 'Analytics Dashboard | Elevate For Humanity',
  description: 'Traffic analytics, conversions, and user behavior.',
};

export default async function AnalyticsDashboardPage() {
  const { user } = await requireRole(['admin', 'super_admin']);
  const supabase = await createClient();

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [pageViewsResult, conversionsResult] = await Promise.all([
    supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo),
    supabase.from('conversions').select('*').gte('created_at', thirtyDaysAgo),
  ]);

  const totalPageViews = pageViewsResult.count || 0;
  const totalConversions = conversionsResult.data?.length || 0;
  const conversionRate =
    totalPageViews > 0
      ? ((totalConversions / totalPageViews) * 100).toFixed(2)
      : '0.00';

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Analytics Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Last 30 days</p>
            </div>
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <Eye className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold text-slate-900">
              {totalPageViews.toLocaleString()}
            </p>
            <p className="text-slate-600 text-sm">Page Views</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <Target className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold text-slate-900">
              {totalConversions}
            </p>
            <p className="text-slate-600 text-sm">Conversions</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold text-slate-900">
              {conversionRate}%
            </p>
            <p className="text-slate-600 text-sm">Conversion Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Analytics Overview
          </h2>
          <div className="flex items-center justify-center h-64 text-slate-400">
            <BarChart3 className="h-16 w-16" />
          </div>
          <p className="text-center text-slate-600">
            Charts and detailed analytics will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}

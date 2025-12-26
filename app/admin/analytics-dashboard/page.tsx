import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';

export const metadata = {
  title: 'Analytics Dashboard | Admin',
};

async function getAnalytics() {
  const supabase = await createClient();
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const [
    { data: pageViews },
    { data: applications },
    { data: socialPosts },
    { data: emailCampaigns }
  ] = await Promise.all([
    supabase.from('page_views').select('*').gte('created_at', thirtyDaysAgo.toISOString()),
    supabase.from('applications').select('*').gte('created_at', thirtyDaysAgo.toISOString()),
    supabase.from('social_media_posts').select('*').gte('posted_at', thirtyDaysAgo.toISOString()),
    supabase.from('email_campaigns').select('*').gte('sent_at', thirtyDaysAgo.toISOString())
  ]);

  const uniqueVisitors = new Set(pageViews?.map(v => v.user_id)).size;
  const totalApplications = applications?.length || 0;
  const conversionRate = uniqueVisitors > 0 ? ((totalApplications / uniqueVisitors) * 100).toFixed(1) : '0.0';

  return {
    uniqueVisitors,
    totalApplications,
    conversionRate,
    socialPosts: socialPosts?.length || 0,
    emailsSent: emailCampaigns?.reduce((sum, c) => sum + (c.recipients || 0), 0) || 0
  };
}

async function getTopPages() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('page_views')
    .select('path')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const pageCounts: Record<string, number> = {};
  data?.forEach(view => {
    pageCounts[view.path] = (pageCounts[view.path] || 0) + 1;
  });

  return Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));
}

export default async function AnalyticsDashboardPage() {
  await requireRole(['admin', 'super_admin']);
  
  const analytics = await getAnalytics();
  const topPages = await getTopPages();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Website Traffic</h3>
            <div className="text-4xl font-bold text-blue-600">{analytics.uniqueVisitors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">unique visitors (30 days)</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Applications</h3>
            <div className="text-4xl font-bold text-green-600">{analytics.totalApplications}</div>
            <div className="text-sm text-gray-600">new applications (30 days)</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Conversion Rate</h3>
            <div className="text-4xl font-bold text-purple-600">{analytics.conversionRate}%</div>
            <div className="text-sm text-gray-600">visitor to applicant</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <div className="text-4xl font-bold text-blue-600">{analytics.socialPosts}</div>
            <div className="text-sm text-gray-600">posts published (30 days)</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Email Marketing</h3>
            <div className="text-4xl font-bold text-orange-600">{analytics.emailsSent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">emails sent (30 days)</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Top Pages</h2>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div key={page.path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{i + 1}</span>
                  <span className="font-medium">{page.path}</span>
                </div>
                <span className="text-sm text-gray-600">{page.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

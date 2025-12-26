import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  UserCheck,
} from 'lucide-react';

/**
 * DELEGATE DASHBOARD
 *
 * For delegates who manage community members and moderate content.
 * Part of the Skool-like community management system.
 */
export default async function DelegateDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/delegate/dashboard');
  }

  // Get delegate profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'delegate') {
    redirect('/dashboard');
  }

  // Get delegate profile
  const { data: delegateProfile } = await supabase
    .from('delegate_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get pending approvals count
  const { count: pendingApprovals } = await supabase
    .from('member_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Get active members count
  const { count: activeMembers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .neq('role', 'admin');

  // Get flagged content count
  const { count: flaggedContent } = await supabase
    .from('content_reports')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Get today's resolved count
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: resolvedToday } = await supabase
    .from('moderation_actions')
    .select('*', { count: 'exact', head: true })
    .eq('delegate_id', user.id)
    .gte('created_at', today.toISOString());

  // Get recent activity
  const { data: recentActions } = await supabase
    .from('moderation_actions')
    .select('*')
    .eq('delegate_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Delegate Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage community members and content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingApprovals || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeMembers || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged Content</p>
                <p className="text-2xl font-bold text-gray-900">
                  {flaggedContent || 0}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {resolvedToday || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/delegate/approvals"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <UserCheck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Review Approvals
            </h3>
            <p className="text-sm text-gray-600">
              Approve or reject member applications
            </p>
            {(pendingApprovals || 0) > 0 && (
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                {pendingApprovals} pending
              </span>
            )}
          </Link>

          <Link
            href="/delegate/members"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Members
            </h3>
            <p className="text-sm text-gray-600">
              View and manage community members
            </p>
          </Link>

          <Link
            href="/delegate/moderation"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <AlertCircle className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Content Moderation
            </h3>
            <p className="text-sm text-gray-600">
              Review flagged posts and comments
            </p>
            {(flaggedContent || 0) > 0 && (
              <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                {flaggedContent} flagged
              </span>
            )}
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Approved new member
                  </p>
                  <p className="text-sm text-gray-600">
                    John Smith joined the community
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Content flagged for review
                  </p>
                  <p className="text-sm text-gray-600">
                    Post reported by 2 members
                  </p>
                  <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Resolved moderation issue
                  </p>
                  <p className="text-sm text-gray-600">Removed spam content</p>
                  <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                </div>
              </div>
            </div>

            {/* Delegate Tools */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Delegate Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/delegate/students" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Students</Link>
                <Link href="/delegate/messages" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Messages</Link>
                <Link href="/delegate/reports" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Reports</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

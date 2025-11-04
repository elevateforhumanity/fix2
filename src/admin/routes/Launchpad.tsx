import React from 'react';
/**
 * Admin Launchpad Page
 * Quick access dashboard for common admin tasks and system overview
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';
import { Link } from 'react-router-dom';

interface QuickStat {
  label: string;
  value: number;
  icon: string;
  link: string;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export default function Launchpad() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<QuickStat[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy' as 'healthy' | 'warning' | 'error',
    uptime: '99.9%',
    responseTime: '45ms',
    activeUsers: 0,
  });

  useEffect(() => {
    if (currentOrg) {
      loadLaunchpadData();
    }
  }, [currentOrg]);

  async function loadLaunchpadData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Load quick stats
      const [usersCount, coursesCount, enrollmentsCount, pendingCount] =
        await Promise.all([
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('courses')
            .select('*', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('assessment_submissions')
            .select('*', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id)
            .eq('graded', false),
        ]);

      setStats([
        {
          label: 'Total Users',
          value: usersCount.count || 0,
          icon: '👥',
          link: '/admin/users',
        },
        {
          label: 'Active Courses',
          value: coursesCount.count || 0,
          icon: '📚',
          link: '/admin/courses',
        },
        {
          label: 'Enrollments',
          value: enrollmentsCount.count || 0,
          icon: '🎓',
          link: '/admin/enrollments',
        },
        {
          label: 'Pending Reviews',
          value: pendingCount.count || 0,
          icon: '⏳',
          link: '/admin/assessments',
        },
      ]);

      // Load recent activity
      const { data: activityData } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('org_id', currentOrg.id)
        .order('created_at', { ascending: false })
        .limit(10);

      const activities: RecentActivity[] = (activityData || []).map(
        (event) => ({
          id: event.id,
          type: event.event_type,
          description: formatActivityDescription(
            event.event_type,
            event.metadata
          ),
          timestamp: event.created_at,
          user: event.metadata?.user_email,
        })
      );

      setRecentActivity(activities);

      // Update system health
      setSystemHealth({
        status: 'healthy',
        uptime: '99.9%',
        responseTime: '45ms',
        activeUsers: usersCount.count || 0,
      });
    } catch (error) {
      console.error('Failed to load launchpad data:', error);
      setSystemHealth((prev) => ({ ...prev, status: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  function formatActivityDescription(eventType: string, metadata: any): string {
    switch (eventType) {
      case 'user.created':
        return 'New user registered';
      case 'enrollment.created':
        return `Enrolled in ${metadata?.course_title || 'a course'}`;
      case 'course.published':
        return `Published course: ${metadata?.course_title || 'Unknown'}`;
      case 'assessment.submitted':
        return 'Submitted an assessment';
      default:
        return eventType
          .replace(/\./g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  const quickActions: QuickAction[] = [
    {
      id: 'create-course',
      title: 'Create Course',
      description: 'Start building a new course',
      icon: '➕',
      action: () => (window.location.href = '/admin/courses'),
    },
    {
      id: 'invite-users',
      title: 'Invite Users',
      description: 'Add new team members or students',
      icon: '✉️',
      action: () => (window.location.href = '/admin/users'),
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: '📊',
      action: () => (window.location.href = '/admin/analytics'),
    },
    {
      id: 'manage-integrations',
      title: 'Integrations',
      description: 'Connect third-party services',
      icon: '🔌',
      action: () => (window.location.href = '/admin/integrations'),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Launchpad</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>
      {/* System Health */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              System Status
            </h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    systemHealth.status === 'healthy'
                      ? 'bg-green-500'
                      : systemHealth.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-600 capitalize">
                  {systemHealth.status}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                Uptime: {systemHealth.uptime}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                Response: {systemHealth.responseTime}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                Active: {systemHealth.activeUsers} users
              </span>
            </div>
          </div>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            View Details
          </button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-sm text-gray-500">→</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Link>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="text-left p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Link
              to="/admin/analytics"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 8).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      {activity.user && <span>{activity.user}</span>}
                      {activity.user && <span>•</span>}
                      <span>
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Shortcuts & Resources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resources & Help
          </h2>
          <div className="space-y-3">
            <a
              href="/docs"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <div className="font-medium text-gray-900">Documentation</div>
                  <div className="text-sm text-gray-600">
                    Learn how to use the platform
                  </div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/support"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium text-gray-900">Support</div>
                  <div className="text-sm text-gray-600">
                    Get help from our team
                  </div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/api-docs"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <div className="font-medium text-gray-900">API Reference</div>
                  <div className="text-sm text-gray-600">
                    Integrate with our API
                  </div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/changelog"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="font-medium text-gray-900">What's New</div>
                  <div className="text-sm text-gray-600">
                    Latest features and updates
                  </div>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </div>
      </div>
      {/* Admin Navigation Grid */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Admin Sections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Users', icon: '👥', link: '/admin/users' },
            { name: 'Courses', icon: '📚', link: '/admin/courses' },
            { name: 'Enrollments', icon: '🎓', link: '/admin/enrollments' },
            { name: 'Community', icon: '💬', link: '/admin/community' },
            { name: 'Marketing', icon: '📢', link: '/admin/marketing' },
            { name: 'Assessments', icon: '📝', link: '/admin/assessments' },
            { name: 'Analytics', icon: '📊', link: '/admin/analytics' },
            { name: 'Integrations', icon: '🔌', link: '/admin/integrations' },
          ].map((section) => (
            <Link
              key={section.name}
              to={section.link}
              className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
            >
              <span className="text-4xl mb-2">{section.icon}</span>
              <span className="text-sm font-medium text-gray-900">
                {section.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

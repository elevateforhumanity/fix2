import React from 'react';
/**
 * Admin Dashboard
 * Overview of key metrics and recent activity
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Stats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  activeStudents: number;
}

interface RecentActivity {
  id: string;
  action: string;
  target: string;
  actor_email: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { currentOrg, getUsageStats } = useOrg(user?.id || null);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeStudents: 0,
  });
  const [usage, setUsage] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadDashboardData();
    }
  }, [currentOrg]);

  async function loadDashboardData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Load stats
      const [users, courses, enrollments, activeStudents, usageData] =
        await Promise.all([
          supabase
            .from('org_members')
            .select('id', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('courses')
            .select('id', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('enrollments')
            .select('id', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id),
          supabase
            .from('enrollments')
            .select('id', { count: 'exact', head: true })
            .eq('org_id', currentOrg.id)
            .eq('status', 'active'),
          getUsageStats(),
        ]);

      setStats({
        totalUsers: users.count || 0,
        totalCourses: courses.count || 0,
        totalEnrollments: enrollments.count || 0,
        activeStudents: activeStudents.count || 0,
      });

      setUsage(usageData);

      // Load recent activity
      const { data: activity } = await supabase
        .from('audit_logs')
        .select(
          `
          id,
          action,
          target,
          created_at,
          actor:auth.users!audit_logs_actor_id_fkey(email)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (activity) {
        setRecentActivity(
          activity.map((a: any) => ({
            id: a.id,
            action: a.action,
            target: a.target,
            actor_email: a.actor?.email || 'Unknown',
            created_at: a.created_at,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with {currentOrg?.name}.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={
            usage
              ? `${usage.seats.used} / ${usage.seats.max} seats used`
              : undefined
          }
          link="/admin/users"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          subtitle={
            usage
              ? `${usage.courses.used} / ${usage.courses.max} courses`
              : undefined
          }
          link="/admin/courses"
        />
        <StatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          link="/admin/courses"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          subtitle="Currently enrolled"
        />
      </div>
      {/* Usage Warnings */}
      {usage && (
        <div className="space-y-4">
          {usage.seats.used >= usage.seats.max && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Seat Limit Reached
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    You've reached your seat limit ({usage.seats.max} seats).{' '}
                    <Link to="/admin/billing" className="font-medium underline">
                      Upgrade your plan
                    </Link>{' '}
                    to add more users.
                  </p>
                </div>
              </div>
            </div>
          )}
          {usage.courses.used >= usage.courses.max && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Course Limit Reached
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    You've reached your course limit ({usage.courses.max}{' '}
                    courses).{' '}
                    <Link to="/admin/billing" className="font-medium underline">
                      Upgrade your plan
                    </Link>{' '}
                    to create more courses.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No recent activity
            </div>
          ) : (
            recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatAction(activity.action)}
                    </p>
                    <p className="text-sm text-gray-500">
                      by {activity.actor_email} • {activity.target}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(activity.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        {recentActivity.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Link
              to="/admin/audit"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all activity →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  link,
}: {
  title: string;
  value: number;
  subtitle?: string;
  link?: string;
}) {
  const content = (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block hover:shadow-md transition-shadow">
        {content}
      </Link>
    );
  }

  return content;
}

function formatAction(action: string): string {
  return action
    .split('.')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

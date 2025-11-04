import React from 'react';
/**
 * Admin Analytics Page
 * Track user behavior, course performance, and business metrics
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id: string;
  metadata: any;
  created_at: string;
}

interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export default function Analytics() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>(
    '30d'
  );
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'courses' | 'revenue'
  >('overview');

  // Metrics
  const [metrics, setMetrics] = useState<{
    users: MetricData;
    activeUsers: MetricData;
    enrollments: MetricData;
    completions: MetricData;
    revenue: MetricData;
    avgSessionTime: MetricData;
  }>({
    users: { label: 'Total Users', value: 0, change: 0, trend: 'neutral' },
    activeUsers: {
      label: 'Active Users',
      value: 0,
      change: 0,
      trend: 'neutral',
    },
    enrollments: {
      label: 'Enrollments',
      value: 0,
      change: 0,
      trend: 'neutral',
    },
    completions: {
      label: 'Completions',
      value: 0,
      change: 0,
      trend: 'neutral',
    },
    revenue: { label: 'Revenue', value: 0, change: 0, trend: 'neutral' },
    avgSessionTime: {
      label: 'Avg Session',
      value: 0,
      change: 0,
      trend: 'neutral',
    },
  });

  // Top courses
  const [topCourses, setTopCourses] = useState<any[]>([]);

  useEffect(() => {
    if (currentOrg) {
      loadAnalytics();
    }
  }, [currentOrg, timeRange]);

  async function loadAnalytics() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      if (timeRange === '7d') {
        startDate.setDate(now.getDate() - 7);
      } else if (timeRange === '30d') {
        startDate.setDate(now.getDate() - 30);
      } else if (timeRange === '90d') {
        startDate.setDate(now.getDate() - 90);
      } else {
        startDate = new Date(0); // All time
      }

      // Load analytics events
      const { data: eventsData, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('org_id', currentOrg.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (eventsError) throw eventsError;
      setEvents(eventsData || []);

      // Load user metrics
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', currentOrg.id);

      const { count: activeUsers } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', currentOrg.id)
        .gte('created_at', startDate.toISOString());

      // Load enrollment metrics
      const { count: enrollments } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', currentOrg.id)
        .gte('created_at', startDate.toISOString());

      const { count: completions } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', currentOrg.id)
        .eq('status', 'completed')
        .gte('updated_at', startDate.toISOString());

      // Load top courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select(
          `
          id,
          title,
          enrollments:enrollments(count)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setTopCourses(coursesData || []);

      // Update metrics (simplified - would need previous period data for real trends)
      setMetrics({
        users: {
          label: 'Total Users',
          value: totalUsers || 0,
          change: 12,
          trend: 'up',
        },
        activeUsers: {
          label: 'Active Users',
          value: activeUsers || 0,
          change: 8,
          trend: 'up',
        },
        enrollments: {
          label: 'Enrollments',
          value: enrollments || 0,
          change: 15,
          trend: 'up',
        },
        completions: {
          label: 'Completions',
          value: completions || 0,
          change: 5,
          trend: 'up',
        },
        revenue: {
          label: 'Revenue',
          value: 0, // Would need payment data
          change: 0,
          trend: 'neutral',
        },
        avgSessionTime: {
          label: 'Avg Session',
          value: 0, // Would need session tracking
          change: 0,
          trend: 'neutral',
        },
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
      alert('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }

  function formatMetricValue(metric: MetricData): string {
    if (metric.label === 'Revenue') {
      return `$${metric.value.toLocaleString()}`;
    } else if (metric.label === 'Avg Session') {
      return `${metric.value}m`;
    }
    return metric.value.toLocaleString();
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Track performance, engagement, and growth metrics
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'users'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'courses'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'revenue'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Revenue
        </button>
      </div>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(metrics).map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  {metric.trend !== 'neutral' && (
                    <div
                      className={`text-sm font-medium ${
                        metric.trend === 'up'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {metric.trend === 'up' ? '↑' : '↓'} {metric.change}%
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatMetricValue(metric)}
                </div>
              </div>
            ))}
          </div>
          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                User Growth
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Chart visualization would go here
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Engagement Trends
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Chart visualization would go here
              </div>
            </div>
          </div>
          {/* Top Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Performing Courses
            </h3>
            {topCourses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No course data available
              </div>
            ) : (
              <div className="space-y-3">
                {topCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {Array.isArray(course.enrollments)
                            ? course.enrollments.length
                            : 0}{' '}
                          enrollments
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Recent Events */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            {events.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No recent activity
              </div>
            ) : (
              <div className="space-y-2">
                {events.slice(0, 10).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-900">
                        {event.event_type}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(event.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            User Analytics
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  User Acquisition
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Acquisition chart would go here
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  User Retention
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Retention chart would go here
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">User Segments</h3>
              <div className="text-gray-600">
                Segmentation analysis would go here
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Course Analytics
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Enrollment Trends
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Enrollment chart would go here
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Completion Rates
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Completion chart would go here
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Course Performance
              </h3>
              <div className="text-gray-600">
                Detailed course metrics would go here
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Revenue Analytics
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Revenue Growth
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Revenue chart would go here
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Revenue by Source
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Revenue breakdown would go here
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Payment Analytics
              </h3>
              <div className="text-gray-600">
                Payment metrics and trends would go here
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

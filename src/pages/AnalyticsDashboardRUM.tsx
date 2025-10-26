/**
 * Real User Monitoring (RUM) Analytics Dashboard
 * Displays performance metrics, user behavior, and system health
 */

import { useState, useEffect } from 'react';
import { Sentry, trackEvent, addSentryBreadcrumb } from '../monitoring/sentry';
import AppLayout from '../layouts/AppLayout';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  unit: string;
}

interface UserSession {
  id: string;
  startTime: number;
  duration: number;
  pageViews: number;
  interactions: number;
  errors: number;
}

interface ErrorReport {
  message: string;
  count: number;
  lastSeen: string;
  level: 'error' | 'warning' | 'info';
}

export default function AnalyticsDashboardRUM() {
  const [performanceMetrics, setPerformanceMetrics] = useState<
    PerformanceMetric[]
  >([]);
  const [currentSession, setCurrentSession] = useState<UserSession | null>(
    null
  );
  const [recentErrors, setRecentErrors] = useState<ErrorReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformanceMetrics();
    loadSessionData();
    loadErrorReports();

    // Track page view
    trackEvent('Analytics Dashboard Viewed', {
      timestamp: new Date().toISOString(),
    });
  }, []);

  function loadPerformanceMetrics() {
    // Get Web Vitals from Performance API
    const metrics: PerformanceMetric[] = [];

    // Largest Contentful Paint (LCP)
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      const lcp = lcpEntries[lcpEntries.length - 1] as any;
      metrics.push({
        name: 'Largest Contentful Paint (LCP)',
        value: Math.round(lcp.renderTime || lcp.loadTime),
        rating: getRating(lcp.renderTime || lcp.loadTime, 2500, 4000),
        unit: 'ms',
      });
    }

    // First Input Delay (FID) - approximated with First Input
    const fidEntries = performance.getEntriesByType('first-input');
    if (fidEntries.length > 0) {
      const fid = fidEntries[0] as any;
      metrics.push({
        name: 'First Input Delay (FID)',
        value: Math.round(fid.processingStart - fid.startTime),
        rating: getRating(fid.processingStart - fid.startTime, 100, 300),
        unit: 'ms',
      });
    }

    // Cumulative Layout Shift (CLS)
    const clsEntries = performance.getEntriesByType('layout-shift');
    let clsScore = 0;
    clsEntries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    });
    if (clsScore > 0) {
      metrics.push({
        name: 'Cumulative Layout Shift (CLS)',
        value: Math.round(clsScore * 1000) / 1000,
        rating: getRating(clsScore, 0.1, 0.25),
        unit: '',
      });
    }

    // Time to First Byte (TTFB)
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0] as any;
      metrics.push({
        name: 'Time to First Byte (TTFB)',
        value: Math.round(nav.responseStart - nav.requestStart),
        rating: getRating(nav.responseStart - nav.requestStart, 800, 1800),
        unit: 'ms',
      });
    }

    // First Contentful Paint (FCP)
    const fcpEntries = performance.getEntriesByName('first-contentful-paint');
    if (fcpEntries.length > 0) {
      const fcp = fcpEntries[0] as any;
      metrics.push({
        name: 'First Contentful Paint (FCP)',
        value: Math.round(fcp.startTime),
        rating: getRating(fcp.startTime, 1800, 3000),
        unit: 'ms',
      });
    }

    // DOM Content Loaded
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0] as any;
      metrics.push({
        name: 'DOM Content Loaded',
        value: Math.round(
          nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart
        ),
        rating: getRating(
          nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
          1500,
          3000
        ),
        unit: 'ms',
      });
    }

    // Page Load Time
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0] as any;
      metrics.push({
        name: 'Page Load Time',
        value: Math.round(nav.loadEventEnd - nav.fetchStart),
        rating: getRating(nav.loadEventEnd - nav.fetchStart, 3000, 5000),
        unit: 'ms',
      });
    }

    setPerformanceMetrics(metrics);
  }

  function getRating(
    value: number,
    goodThreshold: number,
    poorThreshold: number
  ): 'good' | 'needs-improvement' | 'poor' {
    if (value <= goodThreshold) return 'good';
    if (value <= poorThreshold) return 'needs-improvement';
    return 'poor';
  }

  function loadSessionData() {
    // Create mock session data (in production, this would come from Sentry or analytics backend)
    const session: UserSession = {
      id: Math.random().toString(36).substring(7),
      startTime: Date.now() - Math.random() * 3600000, // Random time in last hour
      duration: Math.floor(Math.random() * 1800000), // Random duration up to 30 min
      pageViews: Math.floor(Math.random() * 20) + 1,
      interactions: Math.floor(Math.random() * 50) + 5,
      errors: Math.floor(Math.random() * 3),
    };

    setCurrentSession(session);
  }

  function loadErrorReports() {
    // Mock error data (in production, this would come from Sentry)
    const errors: ErrorReport[] = [
      {
        message: 'Failed to fetch user data',
        count: 12,
        lastSeen: new Date(Date.now() - 3600000).toISOString(),
        level: 'error',
      },
      {
        message: 'Network request timeout',
        count: 8,
        lastSeen: new Date(Date.now() - 7200000).toISOString(),
        level: 'warning',
      },
      {
        message: 'Component render warning',
        count: 5,
        lastSeen: new Date(Date.now() - 1800000).toISOString(),
        level: 'info',
      },
    ];

    setRecentErrors(errors);
    setLoading(false);
  }

  function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  }

  function getRatingColor(rating: string): string {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  }

  function getErrorLevelColor(level: string): string {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Real User Monitoring
          </h1>
          <p className="mt-2 text-gray-600">
            Performance metrics, user behavior, and system health
          </p>
        </div>
        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Web Vitals & Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric) => (
              <div
                key={metric.name}
                className="bg-white rounded-lg shadow p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    {metric.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getRatingColor(
                      metric.rating
                    )}`}
                  >
                    {metric.rating.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-lg text-gray-500 ml-1">
                    {metric.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Current Session */}
        {currentSession && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Session
            </h2>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Session ID</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentSession.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDuration(currentSession.duration)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Page Views</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentSession.pageViews}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interactions</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentSession.interactions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Errors</p>
                  <p className="text-lg font-semibold text-red-600">
                    {currentSession.errors}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Recent Errors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Errors & Warnings
          </h2>
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Seen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentErrors.map((error, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {error.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${getErrorLevelColor(
                          error.level
                        )}`}
                      >
                        {error.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {error.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(error.lastSeen).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Integration Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Sentry Integration
          </h3>
          <p className="text-blue-700 mb-4">
            This dashboard displays real-time performance metrics and error
            tracking powered by Sentry Real User Monitoring (RUM).
          </p>
          <div className="space-y-2 text-sm text-blue-600">
            <p>
              <strong>Status:</strong>{' '}
              {import.meta.env.VITE_SENTRY_DSN ? (
                <span className="text-green-600">✓ Configured</span>
              ) : (
                <span className="text-yellow-600">⚠ Not configured</span>
              )}
            </p>
            <p>
              <strong>Environment:</strong>{' '}
              {import.meta.env.VITE_ENVIRONMENT || 'development'}
            </p>
            <p>
              <strong>Version:</strong>{' '}
              {import.meta.env.VITE_APP_VERSION || '2.0.0'}
            </p>
          </div>
          {!import.meta.env.VITE_SENTRY_DSN && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Setup Required:</strong> Add VITE_SENTRY_DSN to your
                environment variables to enable full error tracking and
                performance monitoring.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

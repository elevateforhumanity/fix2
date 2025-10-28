// Autopilot Phase 4: Health Dashboard Component
// Displays system health metrics, uptime, and recent incidents
// Only accessible to users in automation.admin_users table

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface HealthRollup {
  hour: string;
  kind: string;
  status: 'ok' | 'warn' | 'error';
  cnt: number;
  avg_response_time: number;
  min_response_time: number;
  max_response_time: number;
}

interface SystemHealth {
  kind: string;
  current_status: 'ok' | 'warn' | 'error';
  last_check: string;
  ok_24h: number;
  warn_24h: number;
  error_24h: number;
  uptime_24h: number;
}

interface RecentIncident {
  id: number;
  source: string;
  kind: string;
  status: 'warn' | 'error';
  http_code: number | null;
  response_time_ms: number | null;
  detail: string | null;
  checked_at: string;
}

export default function HealthDashboard() {
  const [rollupData, setRollupData] = useState<HealthRollup[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [incidents, setIncidents] = useState<RecentIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    loadDashboardData();

    // Refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function checkAdminAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    // Check if user is in admin_users table
    const { data, error: adminError } = await supabase
      .from('automation.admin_users')
      .select('user_id, role')
      .eq('user_id', user.id)
      .single();

    if (adminError || !data) {
      setError('Access denied - not an admin user');
      setLoading(false);
      return;
    }

    setIsAdmin(true);
  }

  async function loadDashboardData() {
    if (!isAdmin) return;

    try {
      setLoading(true);

      // Load rollup data
      const { data: rollup, error: rollupError } = await supabase
        .from('automation.health_log_rollup')
        .select('*')
        .order('hour', { ascending: false })
        .limit(168); // 7 days * 24 hours

      if (rollupError) throw rollupError;

      // Load system health summary
      const { data: health, error: healthError } = await supabase
        .from('automation.system_health_summary')
        .select('*')
        .order('kind');

      if (healthError) throw healthError;

      // Load recent incidents
      const { data: incidentData, error: incidentError } = await supabase
        .from('automation.recent_incidents')
        .select('*')
        .order('checked_at', { ascending: false })
        .limit(50);

      if (incidentError) throw incidentError;

      setRollupData(rollup as HealthRollup[]);
      setSystemHealth(health as SystemHealth[]);
      setIncidents(incidentData as RecentIncident[]);
      setError(null);
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  if (loading && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600">{error}</p>
          <p className="text-sm text-slate-500 mt-4">
            Contact your administrator to request access to the health
            dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Calculate totals for summary cards
  const totals = rollupData.reduce((acc: Record<string, number>, r) => {
    const key = `${r.kind}:${r.status}`;
    acc[key] = (acc[key] ?? 0) + r.cnt;
    return acc;
  }, {});

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'ok':
        return '✅';
      case 'warn':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'text-green-600 bg-green-50';
      case 'warn':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            System Health Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Real-time monitoring of autopilot system health and performance
          </p>
        </div>
        {/* System Health Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {systemHealth.map((item) => (
            <div
              key={item.kind}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize text-slate-800">
                  {item.kind}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.current_status)}`}
                >
                  {getStatusEmoji(item.current_status)} {item.current_status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Uptime (24h):</span>
                  <span className="font-semibold text-slate-900">
                    {item.uptime_24h?.toFixed(2) || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last check:</span>
                  <span className="text-slate-900">
                    {new Date(item.last_check).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t">
                  <span className="text-green-600">✅ {item.ok_24h}</span>
                  <span className="text-yellow-600">⚠️ {item.warn_24h}</span>
                  <span className="text-red-600">❌ {item.error_24h}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 7-Day Summary Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            7-Day Summary
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {['site', 'db', 'deploy', 'migration', 'rollback'].map((kind) => (
              <div
                key={kind}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
              >
                <div className="text-sm font-medium text-slate-500 capitalize mb-3">
                  {kind}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">✅ OK</span>
                    <span className="font-semibold">
                      {totals[`${kind}:ok`] ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600">⚠️ Warn</span>
                    <span className="font-semibold">
                      {totals[`${kind}:warn`] ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">❌ Error</span>
                    <span className="font-semibold">
                      {totals[`${kind}:error`] ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Incidents */}
        {incidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Recent Incidents (24h)
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Kind
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {incidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {new Date(incident.checked_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                          {incident.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                          {incident.kind}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}
                          >
                            {getStatusEmoji(incident.status)} {incident.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {incident.detail || 'No details'}
                          {incident.http_code && (
                            <span className="ml-2 text-slate-400">
                              (HTTP {incident.http_code})
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* Hourly Activity Table */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Hourly Activity (7 days)
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Hour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Kind
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Avg Response
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td
                        className="px-6 py-4 text-center text-slate-500"
                        colSpan={5}
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : rollupData.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-4 text-center text-slate-500"
                        colSpan={5}
                      >
                        No data available
                      </td>
                    </tr>
                  ) : (
                    rollupData.slice(0, 100).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {new Date(row.hour).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                          {row.kind}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}
                          >
                            {getStatusEmoji(row.status)} {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {row.cnt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {row.avg_response_time
                            ? `${row.avg_response_time}ms`
                            : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">Auto-refreshes every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}

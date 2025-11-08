/**
 * Admin Audit Log Page
 * View all system actions and changes
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface AuditLog {
  id: string;
  org_id: string;
  actor_id: string;
  action: string;
  target: string;
  target_type: string | null;
  target_id: string | null;
  diff: any;
  metadata: Record<string, any>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  actor?: {
    email: string;
  };
}

export default function Audit() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7'); // days
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    if (currentOrg) {
      loadAuditLogs();
    }
  }, [currentOrg, dateFilter]);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter]);

  async function loadAuditLogs() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      // Calculate date range
      const daysAgo = parseInt(dateFilter);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data, error } = await supabase
        .from('audit_logs')
        .select(
          `
          *,
          actor:auth.users!audit_logs_actor_id_fkey(email)
        `
        )
        .eq('org_id', currentOrg.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;

      setLogs((data as any) || []);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
      alert('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  }

  function filterLogs() {
    let filtered = [...logs];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          log.target.toLowerCase().includes(term) ||
          log.actor?.email?.toLowerCase().includes(term)
      );
    }

    // Action filter
    if (actionFilter !== 'all') {
      filtered = filtered.filter((log) => log.action.startsWith(actionFilter));
    }

    setFilteredLogs(filtered);
  }

  function getActionColor(action: string): string {
    if (action.includes('create')) return 'text-green-600 bg-green-50';
    if (action.includes('update')) return 'text-blue-600 bg-blue-50';
    if (action.includes('delete')) return 'text-red-600 bg-red-50';
    if (action.includes('login') || action.includes('auth'))
      return 'text-purple-600 bg-purple-50';
    return 'text-gray-600 bg-gray-50';
  }

  function getActionIcon(action: string): string {
    if (action.includes('create')) return '➕';
    if (action.includes('update')) return '✏️';
    if (action.includes('delete')) return '🗑️';
    if (action.includes('login') || action.includes('auth')) return '🔐';
    return '📝';
  }

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'course', label: 'Courses' },
    { value: 'member', label: 'Members' },
    { value: 'user', label: 'Users' },
    { value: 'billing', label: 'Billing' },
    { value: 'settings', label: 'Settings' },
    { value: 'auth', label: 'Authentication' },
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
        <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p className="mt-2 text-gray-600">
          Track all actions and changes in your organization
        </p>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search actions, targets, users..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Action Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Type
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {actionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredLogs.length} of {logs.length} events
          </span>
          <button
            onClick={loadAuditLogs}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No audit logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="text-gray-900">
                        {log.actor?.email || 'System'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getActionColor(
                          log.action
                        )}`}
                      >
                        <span className="mr-1">
                          {getActionIcon(log.action)}
                        </span>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate">{log.target}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Audit Log Details
              </h2>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(selectedLog.created_at).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Actor</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedLog.actor?.email || 'System'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Action</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                      selectedLog.action
                    )}`}
                  >
                    {selectedLog.action}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Target</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedLog.target}
                </dd>
              </div>
              {selectedLog.diff && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Changes
                  </dt>
                  <dd className="mt-1">
                    <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto">
                      {JSON.stringify(selectedLog.diff, null, 2)}
                    </pre>
                  </dd>
                </div>
              )}
              {selectedLog.metadata &&
                Object.keys(selectedLog.metadata).length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">
                      Metadata
                    </dt>
                    <dd className="mt-1">
                      <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </dd>
                  </div>
                )}
              {selectedLog.ip_address && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    IP Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono">
                    {selectedLog.ip_address}
                  </dd>
                </div>
              )}
              {selectedLog.user_agent && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    User Agent
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedLog.user_agent}
                  </dd>
                </div>
              )}
            </dl>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_email: string;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 50;

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, resourceFilter]);

  async function fetchLogs() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });

      if (actionFilter) params.append('action', actionFilter);
      if (resourceFilter) params.append('resource_type', resourceFilter);

      const res = await fetch(`/api/audit-logs?${params}`);
      const data = await res.json();

      if (data.logs) {
        setLogs(data.logs);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  }

  function exportLogs() {
    const csv = [
      ['Timestamp', 'Actor', 'Action', 'Resource Type', 'Resource ID', 'IP Address'].join(','),
      ...logs.map((log) =>
        [
          log.created_at,
          log.profiles?.full_name || log.actor_email,
          log.action,
          log.resource_type || '',
          log.resource_id || '',
          log.ip_address || '',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(search) ||
      log.actor_email.toLowerCase().includes(search) ||
      log.profiles?.full_name?.toLowerCase().includes(search) ||
      log.resource_type?.toLowerCase().includes(search)
    );
  });

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueResourceTypes = Array.from(
    new Set(logs.map((log) => log.resource_type).filter(Boolean))
  );

  const totalPages = Math.ceil(total / pageSize);

  if (loading && logs.length === 0) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="w-8 h-8 text-brandPrimary" />
          Audit Logs
        </h1>
        <p className="text-gray-600">
          Comprehensive activity tracking for SOC 2 compliance and security monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Events</span>
            <Activity className="w-5 h-5 text-brandPrimary" />
          </div>
          <div className="text-3xl font-bold">{total.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Unique Actions</span>
            <Filter className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold">{uniqueActions.length}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Resource Types</span>
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold">{uniqueResourceTypes.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(0);
            }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Actions</option>
            {uniqueActions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>

          <select
            value={resourceFilter}
            onChange={(e) => {
              setResourceFilter(e.target.value);
              setPage(0);
            }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Resources</option>
            {uniqueResourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={exportLogs}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
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
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {log.profiles?.full_name || 'Unknown'}
                        </div>
                        <div className="text-xs text-gray-500">{log.actor_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.resource_type && (
                      <div>
                        <div className="font-medium">{log.resource_type}</div>
                        {log.resource_id && (
                          <div className="text-xs text-gray-500 font-mono">
                            {log.resource_id.substring(0, 8)}...
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {log.ip_address || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No audit logs found matching your filters.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {page * pageSize + 1} to {Math.min((page + 1) * pageSize, total)} of{' '}
              {total} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="px-4 py-1 text-sm text-gray-600">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

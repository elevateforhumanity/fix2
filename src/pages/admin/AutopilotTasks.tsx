import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import AppLayout from '../../layouts/AppLayout';

interface Task {
  id: number;
  kind: string;
  status: string;
  payload: any;
  priority: number;
  error: string | null;
  attempts: number;
  max_attempts: number;
  requires_approval: boolean;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export default function AutopilotTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadTasks();
    loadStats();

    // Refresh every 10 seconds
    const interval = setInterval(() => {
      loadTasks();
      loadStats();
    }, 10000);

    return () => clearInterval(interval);
  }, [filter]);

  const loadTasks = async () => {
    try {
      let query = supabase
        .from('automation.tasks')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(100);

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('automation.task_stats')
        .select('*');
      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const approveTask = async (id: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch(import.meta.env.VITE_AUTOPILOT_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-autopilot-sign': import.meta.env.VITE_AUTOPILOT_SECRET,
        },
        body: JSON.stringify({ task: 'approve', id, approver: user.id }),
      });

      if (!response.ok) throw new Error('Failed to approve task');
      await loadTasks();
    } catch (error) {
      console.error('Error approving task:', error);
      alert('Failed to approve task');
    }
  };

  const retryTask = async (id: number) => {
    try {
      const response = await fetch(import.meta.env.VITE_AUTOPILOT_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-autopilot-sign': import.meta.env.VITE_AUTOPILOT_SECRET,
        },
        body: JSON.stringify({ task: 'retry', id }),
      });

      if (!response.ok) throw new Error('Failed to retry task');
      await loadTasks();
    } catch (error) {
      console.error('Error retrying task:', error);
      alert('Failed to retry task');
    }
  };

  const cancelTask = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this task?')) return;

    try {
      const response = await fetch(import.meta.env.VITE_AUTOPILOT_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-autopilot-sign': import.meta.env.VITE_AUTOPILOT_SECRET,
        },
        body: JSON.stringify({ task: 'cancel', id }),
      });

      if (!response.ok) throw new Error('Failed to cancel task');
      await loadTasks();
    } catch (error) {
      console.error('Error cancelling task:', error);
      alert('Failed to cancel task');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-brand-surface text-brand-success';
      case 'failed':
        return 'bg-brand-surface text-red-800';
      case 'running':
        return 'bg-brand-surface text-brand-info';
      case 'needs_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'queued':
        return 'bg-brand-surface-dark text-brand-text';
      case 'skipped':
        return 'bg-brand-surface-dark text-brand-text-muted';
      default:
        return 'bg-brand-surface-dark text-brand-text';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return '✅';
      case 'failed':
        return '❌';
      case 'running':
        return '⏳';
      case 'needs_approval':
        return '⚠️';
      case 'queued':
        return '📋';
      case 'skipped':
        return '⏭️';
      default:
        return '❓';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Autopilot Tasks</h1>
          <button
            onClick={() => loadTasks()}
            className="px-4 py-2 bg-brand-info text-white rounded-lg hover:bg-brand-info-hover"
          >
            🔄 Refresh
          </button>
        </div>
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {stats.map((stat: any) => (
              <div
                key={stat.status}
                className="bg-white rounded-lg shadow p-4 text-center"
              >
                <div className="text-2xl mb-1">
                  {getStatusIcon(stat.status)}
                </div>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-sm text-brand-text-muted capitalize">
                  {stat.status}
                </div>
                {stat.avg_duration_seconds && (
                  <div className="text-xs text-brand-text-light mt-1">
                    ~{stat.avg_duration_seconds}s avg
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              'all',
              'queued',
              'running',
              'needs_approval',
              'succeeded',
              'failed',
              'skipped',
            ].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 font-medium transition whitespace-nowrap ${
                  filter === f
                    ? 'border-b-2 border-blue-600 text-brand-info'
                    : 'text-brand-text-muted hover:text-brand-text'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brand-text-muted">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-brand-text-light text-lg">No tasks found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {getStatusIcon(task.status)}
                      </span>
                      <h3 className="text-xl font-bold">
                        #{task.id} - {task.kind}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                      {task.requires_approval && (
                        <span className="px-3 py-1 bg-brand-surface text-brand-warning rounded-full text-sm font-semibold">
                          Requires Approval
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-brand-text-muted space-y-1">
                      <p>
                        Priority: {task.priority} | Attempts: {task.attempts}/
                        {task.max_attempts}
                      </p>
                      <p>
                        Created: {new Date(task.created_at).toLocaleString()}
                      </p>
                      {task.started_at && (
                        <p>
                          Started: {new Date(task.started_at).toLocaleString()}
                        </p>
                      )}
                      {task.completed_at && (
                        <p>
                          Completed:{' '}
                          {new Date(task.completed_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    {task.status === 'needs_approval' && (
                      <button
                        onClick={() => approveTask(task.id)}
                        className="px-4 py-2 bg-brand-success text-white rounded hover:bg-brand-success-hover text-sm font-bold"
                      >
                        ✓ Approve
                      </button>
                    )}
                    {task.status === 'failed' && (
                      <button
                        onClick={() => retryTask(task.id)}
                        className="px-4 py-2 bg-brand-info text-white rounded hover:bg-brand-info-hover text-sm"
                      >
                        🔄 Retry
                      </button>
                    )}
                    {['queued', 'running', 'needs_approval'].includes(
                      task.status
                    ) && (
                      <button
                        onClick={() => cancelTask(task.id)}
                        className="px-4 py-2 bg-brand-danger text-white rounded hover:bg-brand-danger-hover text-sm"
                      >
                        ✗ Cancel
                      </button>
                    )}
                  </div>
                </div>
                {/* Payload */}
                {Object.keys(task.payload).length > 0 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-brand-text hover:text-brand-text">
                      View Payload
                    </summary>
                    <pre className="mt-2 p-4 bg-brand-surface rounded text-xs overflow-x-auto">
                      {JSON.stringify(task.payload, null, 2)}
                    </pre>
                  </details>
                )}
                {/* Error */}
                {task.error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm font-semibold text-red-900 mb-1">
                      Error:
                    </p>
                    <p className="text-sm text-red-800">{task.error}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import { supabase as s } from './supabaseClient-DCQoDyvc.js';
import { A as r } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
import './vendor-router-CQjfSXV_.js';
function a() {
  const [a, n] = e.useState([]),
    [o, i] = e.useState(null),
    [l, d] = e.useState(!0),
    [c, x] = e.useState('all');
  e.useEffect(() => {
    (p(), u());
    const e = setInterval(() => {
      (p(), u());
    }, 1e4);
    return () => clearInterval(e);
  }, [c]);
  const p = async () => {
      if (s)
        try {
          let e = s
            .from('automation.tasks')
            .select('*')
            .order('updated_at', { ascending: !1 })
            .limit(100);
          'all' !== c && (e = e.eq('status', c));
          const { data: t, error: r } = await e;
          if (r) throw r;
          n(t || []);
        } catch (e) {
          console.error('Error loading tasks:', e);
        } finally {
          d(!1);
        }
    },
    u = async () => {
      if (s)
        try {
          const { data: e, error: t } = await s
            .from('automation.task_stats')
            .select('*');
          if (t) throw t;
          i(e);
        } catch (e) {
          console.error('Error loading stats:', e);
        }
    },
    m = (e) => {
      switch (e) {
        case 'succeeded':
          return 'bg-green-50 text-green-800';
        case 'failed':
          return 'bg-red-50 text-red-800';
        case 'running':
          return 'bg-blue-50 text-blue-800';
        case 'needs_approval':
          return 'bg-yellow-50 text-yellow-800';
        case 'queued':
        default:
          return 'bg-beige-100 text-brown-800';
        case 'skipped':
          return 'bg-gray-100 text-gray-600';
      }
    },
    h = (e) => {
      switch (e) {
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
  return t.jsx(r, {
    children: t.jsxs('div', {
      className: 'container mx-auto px-4 py-8',
      children: [
        t.jsxs('div', {
          className: 'flex justify-between items-center mb-6',
          children: [
            t.jsx('h1', {
              className: 'text-3xl font-bold text-brown-900',
              children: 'Autopilot Tasks',
            }),
            t.jsx('button', {
              onClick: () => p(),
              className:
                'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition',
              children: '🔄 Refresh',
            }),
          ],
        }),
        o &&
          t.jsx('div', {
            className: 'grid grid-cols-2 md:grid-cols-6 gap-4 mb-6',
            children: o.map((e) =>
              t.jsxs(
                'div',
                {
                  className: 'bg-white rounded-lg shadow p-4 text-center',
                  children: [
                    t.jsx('div', {
                      className: 'text-2xl mb-1',
                      children: h(e.status),
                    }),
                    t.jsx('div', {
                      className: 'text-2xl font-bold text-brown-900',
                      children: e.count,
                    }),
                    t.jsx('div', {
                      className: 'text-sm text-brown-600 capitalize',
                      children: e.status,
                    }),
                    e.avg_duration_seconds &&
                      t.jsxs('div', {
                        className: 'text-xs text-brown-500 mt-1',
                        children: ['~', e.avg_duration_seconds, 's avg'],
                      }),
                  ],
                },
                e.status
              )
            ),
          }),
        t.jsx('div', {
          className: 'bg-white rounded-lg shadow mb-6',
          children: t.jsx('div', {
            className: 'flex border-b overflow-x-auto',
            children: [
              'all',
              'queued',
              'running',
              'needs_approval',
              'succeeded',
              'failed',
              'skipped',
            ].map((e) =>
              t.jsx(
                'button',
                {
                  onClick: () => x(e),
                  className:
                    'px-6 py-3 font-medium transition whitespace-nowrap ' +
                    (c === e
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-brown-600 hover:text-brown-900'),
                  children:
                    e.charAt(0).toUpperCase() + e.slice(1).replace('_', ' '),
                },
                e
              )
            ),
          }),
        }),
        l
          ? t.jsxs('div', {
              className: 'text-center py-12',
              children: [
                t.jsx('div', {
                  className:
                    'animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto',
                }),
                t.jsx('p', {
                  className: 'mt-4 text-brown-600',
                  children: 'Loading tasks...',
                }),
              ],
            })
          : 0 === a.length
            ? t.jsx('div', {
                className: 'bg-white rounded-lg shadow p-12 text-center',
                children: t.jsx('p', {
                  className: 'text-brown-500 text-lg',
                  children: 'No tasks found',
                }),
              })
            : t.jsx('div', {
                className: 'space-y-4',
                children: a.map((e) =>
                  t.jsxs(
                    'div',
                    {
                      className:
                        'bg-white rounded-lg shadow p-6 hover:shadow-lg transition',
                      children: [
                        t.jsxs('div', {
                          className: 'flex justify-between items-start mb-4',
                          children: [
                            t.jsxs('div', {
                              className: 'flex-1',
                              children: [
                                t.jsxs('div', {
                                  className: 'flex items-center gap-3 mb-2',
                                  children: [
                                    t.jsx('span', {
                                      className: 'text-2xl',
                                      children: h(e.status),
                                    }),
                                    t.jsxs('h3', {
                                      className: 'text-xl font-bold',
                                      children: ['#', e.id, ' - ', e.kind],
                                    }),
                                    t.jsx('span', {
                                      className: `px-3 py-1 rounded-full text-sm font-semibold ${m(e.status)}`,
                                      children: e.status,
                                    }),
                                    e.requires_approval &&
                                      t.jsx('span', {
                                        className:
                                          'px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-sm font-semibold',
                                        children: 'Requires Approval',
                                      }),
                                  ],
                                }),
                                t.jsxs('div', {
                                  className: 'text-sm text-brown-600 space-y-1',
                                  children: [
                                    t.jsxs('p', {
                                      children: [
                                        'Priority: ',
                                        e.priority,
                                        ' | Attempts: ',
                                        e.attempts,
                                        '/',
                                        e.max_attempts,
                                      ],
                                    }),
                                    t.jsxs('p', {
                                      children: [
                                        'Created: ',
                                        new Date(e.created_at).toLocaleString(),
                                      ],
                                    }),
                                    e.started_at &&
                                      t.jsxs('p', {
                                        children: [
                                          'Started: ',
                                          new Date(
                                            e.started_at
                                          ).toLocaleString(),
                                        ],
                                      }),
                                    e.completed_at &&
                                      t.jsxs('p', {
                                        children: [
                                          'Completed:',
                                          ' ',
                                          new Date(
                                            e.completed_at
                                          ).toLocaleString(),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            t.jsxs('div', {
                              className: 'flex gap-2 ml-4',
                              children: [
                                'needs_approval' === e.status &&
                                  t.jsx('button', {
                                    onClick: () =>
                                      (async (e) => {
                                        if (s)
                                          try {
                                            const {
                                              data: { user: t },
                                            } = await s.auth.getUser();
                                            if (!t) return;
                                            if (
                                              !(
                                                await fetch(void 0, {
                                                  method: 'POST',
                                                  headers: {
                                                    'Content-Type':
                                                      'application/json',
                                                    'x-autopilot-sign': void 0,
                                                  },
                                                  body: JSON.stringify({
                                                    task: 'approve',
                                                    id: e,
                                                    approver: t.id,
                                                  }),
                                                })
                                              ).ok
                                            )
                                              throw new Error(
                                                'Failed to approve task'
                                              );
                                            await p();
                                          } catch (t) {
                                            (console.error(
                                              'Error approving task:',
                                              t
                                            ),
                                              alert('Failed to approve task'));
                                          }
                                      })(e.id),
                                    className:
                                      'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-bold',
                                    children: '✓ Approve',
                                  }),
                                'failed' === e.status &&
                                  t.jsx('button', {
                                    onClick: () =>
                                      (async (e) => {
                                        try {
                                          if (
                                            !(
                                              await fetch(void 0, {
                                                method: 'POST',
                                                headers: {
                                                  'Content-Type':
                                                    'application/json',
                                                  'x-autopilot-sign': void 0,
                                                },
                                                body: JSON.stringify({
                                                  task: 'retry',
                                                  id: e,
                                                }),
                                              })
                                            ).ok
                                          )
                                            throw new Error(
                                              'Failed to retry task'
                                            );
                                          await p();
                                        } catch (t) {
                                          (console.error(
                                            'Error retrying task:',
                                            t
                                          ),
                                            alert('Failed to retry task'));
                                        }
                                      })(e.id),
                                    className:
                                      'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm',
                                    children: '🔄 Retry',
                                  }),
                                [
                                  'queued',
                                  'running',
                                  'needs_approval',
                                ].includes(e.status) &&
                                  t.jsx('button', {
                                    onClick: () =>
                                      (async (e) => {
                                        if (
                                          confirm(
                                            'Are you sure you want to cancel this task?'
                                          )
                                        )
                                          try {
                                            if (
                                              !(
                                                await fetch(void 0, {
                                                  method: 'POST',
                                                  headers: {
                                                    'Content-Type':
                                                      'application/json',
                                                    'x-autopilot-sign': void 0,
                                                  },
                                                  body: JSON.stringify({
                                                    task: 'cancel',
                                                    id: e,
                                                  }),
                                                })
                                              ).ok
                                            )
                                              throw new Error(
                                                'Failed to cancel task'
                                              );
                                            await p();
                                          } catch (t) {
                                            (console.error(
                                              'Error cancelling task:',
                                              t
                                            ),
                                              alert('Failed to cancel task'));
                                          }
                                      })(e.id),
                                    className:
                                      'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm',
                                    children: '✗ Cancel',
                                  }),
                              ],
                            }),
                          ],
                        }),
                        Object.keys(e.payload).length > 0 &&
                          t.jsxs('details', {
                            className: 'mt-4',
                            children: [
                              t.jsx('summary', {
                                className:
                                  'cursor-pointer text-sm font-semibold text-brown-900 hover:text-green-600',
                                children: 'View Payload',
                              }),
                              t.jsx('pre', {
                                className:
                                  'mt-2 p-4 bg-beige-50 rounded text-xs overflow-x-auto',
                                children: JSON.stringify(e.payload, null, 2),
                              }),
                            ],
                          }),
                        e.error &&
                          t.jsxs('div', {
                            className:
                              'mt-4 p-4 bg-red-50 border border-red-200 rounded',
                            children: [
                              t.jsx('p', {
                                className:
                                  'text-sm font-semibold text-red-900 mb-1',
                                children: 'Error:',
                              }),
                              t.jsx('p', {
                                className: 'text-sm text-red-800',
                                children: e.error,
                              }),
                            ],
                          }),
                      ],
                    },
                    e.id
                  )
                ),
              }),
      ],
    }),
  });
}
export { a as default };

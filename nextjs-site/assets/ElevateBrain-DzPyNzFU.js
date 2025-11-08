const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/supabaseClient-DCQoDyvc.js',
      'assets/vendor-supabase-C00Cu5KO.js',
      'assets/vendor-Da1LjC7-.js',
    ])
) => i.map((i) => d[i]);
import { _ as e } from './vendor-supabase-C00Cu5KO.js';
import { r, j as t } from './vendor-react-C-ZQNdj3.js';
import { L as i } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o, n] = r.useState(!1),
    [a, l] = r.useState(''),
    s = async (r) => {
      var t, i;
      r.preventDefault();
      try {
        const { supabase: r } = await e(
          async () => {
            const { supabase: e } = await import(
              './supabaseClient-DCQoDyvc.js'
            );
            return { supabase: e };
          },
          __vite__mapDeps([0, 1, 2])
        );
        if (!r) return void alert('Authentication service is not available');
        const {
          data: { user: o },
        } = await r.auth.getUser();
        o &&
        ((null == (t = o.email)
          ? void 0
          : t.includes('@elevateforhumanity.org')) ||
          'admin' === (null == (i = o.user_metadata) ? void 0 : i.role))
          ? n(!0)
          : alert('Access denied. Admin privileges required.');
      } catch (o) {
        (alert('Authentication failed. Please log in first.'),
          (window.location.href = '/login'));
      }
    };
  return o
    ? t.jsxs('div', {
        style: { minHeight: '100vh', backgroundColor: '#f5f1e8' },
        children: [
          t.jsx('div', {
            style: {
              backgroundColor: '#4a3728',
              color: '#fff',
              padding: '1rem 2rem',
              borderBottom: '3px solid #00a544',
            },
            children: t.jsxs('div', {
              style: {
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                t.jsxs('div', {
                  style: { display: 'flex', alignItems: 'center', gap: '1rem' },
                  children: [
                    t.jsx('div', {
                      style: { fontSize: '2rem' },
                      children: '🧠',
                    }),
                    t.jsx('h1', {
                      style: { fontSize: '1.5rem', fontWeight: '700' },
                      children: 'Elevate Brain',
                    }),
                  ],
                }),
                t.jsx('button', {
                  onClick: () => n(!1),
                  style: {
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  },
                  children: 'Logout',
                }),
              ],
            }),
          }),
          t.jsxs('div', {
            style: { maxWidth: '1400px', margin: '0 auto', padding: '2rem' },
            children: [
              t.jsx('div', {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                },
                children: [
                  {
                    title: 'Total Users',
                    value: '1,247',
                    icon: '👥',
                    color: '#00a544',
                  },
                  {
                    title: 'Active Programs',
                    value: '15',
                    icon: '📚',
                    color: '#00a544',
                  },
                  {
                    title: 'Revenue (MTD)',
                    value: '$45,230',
                    icon: '💰',
                    color: '#ca8a04',
                  },
                  {
                    title: 'Completion Rate',
                    value: '87%',
                    icon: '📊',
                    color: '#4a3728',
                  },
                ].map((e, r) =>
                  t.jsx(
                    'div',
                    {
                      style: {
                        backgroundColor: '#fff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      },
                      children: t.jsxs('div', {
                        style: {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        },
                        children: [
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                style: {
                                  color: '#6b5d52',
                                  fontSize: '0.875rem',
                                  marginBottom: '0.5rem',
                                },
                                children: e.title,
                              }),
                              t.jsx('p', {
                                style: {
                                  fontSize: '2rem',
                                  fontWeight: '700',
                                  color: e.color,
                                },
                                children: e.value,
                              }),
                            ],
                          }),
                          t.jsx('div', {
                            style: { fontSize: '3rem' },
                            children: e.icon,
                          }),
                        ],
                      }),
                    },
                    r
                  )
                ),
              }),
              t.jsxs('div', {
                style: {
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '2rem',
                },
                children: [
                  t.jsx('h2', {
                    style: {
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '1.5rem',
                    },
                    children: 'Quick Actions',
                  }),
                  t.jsxs('div', {
                    style: {
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                    },
                    children: [
                      t.jsx(i, {
                        to: '/elevate-brain/admin-dashboard',
                        style: {
                          padding: '1rem',
                          backgroundColor: '#f5f1e8',
                          color: '#00a544',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textAlign: 'center',
                        },
                        children: '📊 Admin Dashboard',
                      }),
                      t.jsx(i, {
                        to: '/elevate-brain/analytics',
                        style: {
                          padding: '1rem',
                          backgroundColor: '#f0fdf4',
                          color: '#00a544',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textAlign: 'center',
                        },
                        children: '📈 Analytics',
                      }),
                      t.jsx(i, {
                        to: '/elevate-brain/internal-notes',
                        style: {
                          padding: '1rem',
                          backgroundColor: '#fef3c7',
                          color: '#ca8a04',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textAlign: 'center',
                        },
                        children: '📝 Internal Notes',
                      }),
                      t.jsx(i, {
                        to: '/admin',
                        style: {
                          padding: '1rem',
                          backgroundColor: '#f3e8ff',
                          color: '#4a3728',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                          fontWeight: '600',
                          textAlign: 'center',
                        },
                        children: '⚙️ System Settings',
                      }),
                    ],
                  }),
                ],
              }),
              t.jsxs('div', {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '1.5rem',
                },
                children: [
                  t.jsxs('div', {
                    style: {
                      backgroundColor: '#fff',
                      padding: '2rem',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                    children: [
                      t.jsx('h3', {
                        style: {
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                        },
                        children: 'Recent Activity',
                      }),
                      t.jsx('div', {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                        },
                        children: [
                          {
                            action: 'New user registration',
                            time: '5 min ago',
                            icon: '👤',
                          },
                          {
                            action: 'Course completion',
                            time: '12 min ago',
                            icon: '✅',
                          },
                          {
                            action: 'Payment received',
                            time: '1 hour ago',
                            icon: '💳',
                          },
                          {
                            action: 'System backup completed',
                            time: '2 hours ago',
                            icon: '💾',
                          },
                        ].map((e, r) =>
                          t.jsxs(
                            'div',
                            {
                              style: {
                                padding: '1rem',
                                backgroundColor: '#f5f1e8',
                                borderRadius: '0.375rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              },
                              children: [
                                t.jsxs('div', {
                                  style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                  },
                                  children: [
                                    t.jsx('span', {
                                      style: { fontSize: '1.5rem' },
                                      children: e.icon,
                                    }),
                                    t.jsx('span', { children: e.action }),
                                  ],
                                }),
                                t.jsx('span', {
                                  style: {
                                    fontSize: '0.875rem',
                                    color: '#6b5d52',
                                  },
                                  children: e.time,
                                }),
                              ],
                            },
                            r
                          )
                        ),
                      }),
                    ],
                  }),
                  t.jsxs('div', {
                    style: {
                      backgroundColor: '#fff',
                      padding: '2rem',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    },
                    children: [
                      t.jsx('h3', {
                        style: {
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                        },
                        children: 'System Health',
                      }),
                      t.jsx('div', {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                        },
                        children: [
                          {
                            name: 'API Server',
                            status: 'Operational',
                            color: '#00a544',
                          },
                          {
                            name: 'Database',
                            status: 'Operational',
                            color: '#00a544',
                          },
                          {
                            name: 'File Storage',
                            status: 'Operational',
                            color: '#00a544',
                          },
                          {
                            name: 'Email Service',
                            status: 'Operational',
                            color: '#00a544',
                          },
                        ].map((e, r) =>
                          t.jsxs(
                            'div',
                            {
                              style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem',
                                backgroundColor: '#f5f1e8',
                                borderRadius: '0.375rem',
                              },
                              children: [
                                t.jsx('span', { children: e.name }),
                                t.jsx('span', {
                                  style: {
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: e.color,
                                    color: '#fff',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                  },
                                  children: e.status,
                                }),
                              ],
                            },
                            r
                          )
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          t.jsxs('div', {
            style: {
              backgroundColor: '#4a3728',
              color: '#fff',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '4rem',
            },
            children: [
              t.jsx('p', {
                style: { marginBottom: '0.5rem' },
                children: '🔒 Elevate Brain - Internal Operations Hub',
              }),
              t.jsx('p', {
                style: { fontSize: '0.875rem', color: '#8b7d6f' },
                children:
                  'Authorized Personnel Only | © 2025 Elevate for Humanity',
              }),
            ],
          }),
        ],
      })
    : t.jsx('div', {
        style: {
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4a3728 0%, #4a3728 100%)',
        },
        children: t.jsxs('div', {
          style: {
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            maxWidth: '400px',
            width: '100%',
          },
          children: [
            t.jsxs('div', {
              style: { textAlign: 'center', marginBottom: '2rem' },
              children: [
                t.jsx('div', {
                  style: { fontSize: '4rem', marginBottom: '1rem' },
                  children: '🧠',
                }),
                t.jsx('h1', {
                  style: {
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                  },
                  children: 'Elevate Brain',
                }),
                t.jsx('p', {
                  style: { color: '#6b5d52' },
                  children: 'Internal Operations Hub',
                }),
              ],
            }),
            t.jsxs('form', {
              onSubmit: s,
              children: [
                t.jsxs('div', {
                  style: { marginBottom: '1.5rem' },
                  children: [
                    t.jsx('label', {
                      style: {
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                      },
                      children: 'Access Code',
                    }),
                    t.jsx('input', {
                      type: 'password',
                      'aria-label': 'password input',
                      value: a,
                      onChange: (e) => l(e.target.value),
                      placeholder: 'Enter access code',
                      style: {
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #c4b5a0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                      },
                    }),
                  ],
                }),
                t.jsx('button', {
                  type: 'submit',
                  style: {
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#4a3728',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                  },
                  children: 'Access System',
                }),
              ],
            }),
            t.jsx('p', {
              style: {
                marginTop: '1.5rem',
                fontSize: '0.875rem',
                color: '#6b5d52',
                textAlign: 'center',
              },
              children: '🔒 Authorized Personnel Only',
            }),
          ],
        }),
      });
}
export { o as ElevateBrain, o as default };

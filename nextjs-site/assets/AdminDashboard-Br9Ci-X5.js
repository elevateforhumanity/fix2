import { r as e, j as s, H as t } from './vendor-react-C-ZQNdj3.js';
import { L as a } from './vendor-router-CQjfSXV_.js';
import { N as n } from './Navigation-Bbm4Xzc1.js';
import { F as r } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
function l() {
  const [l, i] = e.useState({
      totalUsers: 0,
      totalCourses: 0,
      totalRevenue: 0,
      activeStudents: 0,
      totalInstructors: 0,
      certificatesIssued: 0,
      completionRate: 0,
      avgSatisfaction: 0,
    }),
    [c, d] = e.useState([]),
    [o, x] = e.useState({
      database: 'healthy',
      storage: 'healthy',
      api: 'healthy',
    }),
    [m, h] = e.useState(!0);
  return (
    e.useEffect(() => {
      (i({
        totalUsers: 523,
        totalCourses: 24,
        totalRevenue: 45780,
        activeStudents: 342,
        totalInstructors: 18,
        certificatesIssued: 156,
        completionRate: 73,
        avgSatisfaction: 4.6,
      }),
        d([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'student',
            joined: '2 hours ago',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'instructor',
            joined: '5 hours ago',
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'student',
            joined: '1 day ago',
          },
        ]),
        h(!1));
    }, []),
    m
      ? s.jsxs('div', {
          children: [
            s.jsx(t, {
              children: s.jsx('title', {
                children: 'Admin Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(n, {}),
            s.jsx('div', {
              className: 'section',
              children: s.jsx('div', {
                className: 'container',
                children: s.jsxs('div', {
                  className: 'text-center',
                  children: [
                    s.jsx('div', {
                      className:
                        'inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600',
                    }),
                    s.jsx('p', {
                      className: 'mt-4 text-brown-600',
                      children: 'Loading dashboard...',
                    }),
                  ],
                }),
              }),
            }),
            s.jsx(r, {}),
          ],
        })
      : s.jsxs('div', {
          children: [
            s.jsx(t, {
              children: s.jsx('title', {
                children: 'Admin Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(n, {}),
            s.jsx('div', {
              className: 'section bg-beige-50',
              children: s.jsxs('div', {
                className: 'container',
                children: [
                  s.jsxs('div', {
                    className: 'mb-8',
                    children: [
                      s.jsx('h1', {
                        className: 'text-4xl font-bold text-brown-900 mb-2',
                        children: 'Admin Dashboard',
                      }),
                      s.jsx('p', {
                        className: 'text-lg text-brown-600',
                        children: 'Platform overview and management',
                      }),
                    ],
                  }),
                  s.jsx('div', {
                    className:
                      'card p-6 mb-8 bg-green-50 border-l-4 border-green-600',
                    children: s.jsxs('div', {
                      className: 'flex items-center gap-4',
                      children: [
                        s.jsx('div', { className: 'text-3xl', children: '✅' }),
                        s.jsxs('div', {
                          children: [
                            s.jsx('h3', {
                              className:
                                'text-lg font-bold text-brown-900 mb-1',
                              children: 'All Systems Operational',
                            }),
                            s.jsxs('p', {
                              className: 'text-sm text-brown-600',
                              children: [
                                'Database: ',
                                o.database,
                                ' • Storage:',
                                ' ',
                                o.storage,
                                ' • API: ',
                                o.api,
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  s.jsxs('div', {
                    className: 'grid md:grid-cols-4 gap-6 mb-12',
                    children: [
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.totalUsers,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Total Users',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.totalCourses,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Total Courses',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsxs('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: [
                              '$',
                              (l.totalRevenue / 1e3).toFixed(1),
                              'k',
                            ],
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Total Revenue',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.activeStudents,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Active Students',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.totalInstructors,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Instructors',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.certificatesIssued,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Certificates Issued',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsxs('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: [l.completionRate, '%'],
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Completion Rate',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsxs('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: [l.avgSatisfaction, '/5'],
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Avg Satisfaction',
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'card p-6 mb-12',
                    children: [
                      s.jsx('h2', {
                        className: 'text-2xl font-bold text-brown-900 mb-4',
                        children: 'Quick Actions',
                      }),
                      s.jsxs('div', {
                        className: 'grid md:grid-cols-4 gap-4',
                        children: [
                          s.jsx(a, {
                            to: '/admin/users',
                            className: 'btn-primary text-center',
                            children: 'Manage Users',
                          }),
                          s.jsx(a, {
                            to: '/admin/courses',
                            className: 'btn-outline text-center',
                            children: 'Manage Courses',
                          }),
                          s.jsx(a, {
                            to: '/admin/reports',
                            className: 'btn-outline text-center',
                            children: 'View Reports',
                          }),
                          s.jsx(a, {
                            to: '/admin/settings',
                            className: 'btn-outline text-center',
                            children: 'System Settings',
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'grid lg:grid-cols-2 gap-8',
                    children: [
                      s.jsxs('div', {
                        children: [
                          s.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-6',
                            children: 'Recent Users',
                          }),
                          s.jsxs('div', {
                            className: 'card p-6',
                            children: [
                              s.jsx('div', {
                                className: 'space-y-4',
                                children: c.map((e) =>
                                  s.jsx(
                                    'div',
                                    {
                                      className:
                                        'pb-4 border-b border-brown-200 last:border-0 last:pb-0',
                                      children: s.jsxs('div', {
                                        className:
                                          'flex items-start justify-between',
                                        children: [
                                          s.jsxs('div', {
                                            children: [
                                              s.jsx('p', {
                                                className:
                                                  'font-semibold text-brown-900 mb-1',
                                                children: e.name,
                                              }),
                                              s.jsx('p', {
                                                className:
                                                  'text-sm text-brown-600',
                                                children: e.email,
                                              }),
                                            ],
                                          }),
                                          s.jsxs('div', {
                                            className: 'text-right',
                                            children: [
                                              s.jsx('span', {
                                                className:
                                                  'inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800 mb-1',
                                                children: e.role,
                                              }),
                                              s.jsx('p', {
                                                className:
                                                  'text-xs text-brown-500',
                                                children: e.joined,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    },
                                    e.id
                                  )
                                ),
                              }),
                              s.jsx('div', {
                                className:
                                  'mt-6 pt-4 border-t border-brown-200',
                                children: s.jsx(a, {
                                  to: '/admin/users',
                                  className:
                                    'text-green-600 hover:text-green-700 font-semibold text-sm',
                                  children: 'View All Users →',
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        children: [
                          s.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-6',
                            children: 'Platform Insights',
                          }),
                          s.jsxs('div', {
                            className: 'space-y-4',
                            children: [
                              s.jsxs('div', {
                                className: 'card p-6',
                                children: [
                                  s.jsxs('div', {
                                    className:
                                      'flex items-center justify-between mb-2',
                                    children: [
                                      s.jsx('span', {
                                        className: 'text-brown-600',
                                        children: 'Course Completion',
                                      }),
                                      s.jsxs('span', {
                                        className: 'font-bold text-brown-900',
                                        children: [l.completionRate, '%'],
                                      }),
                                    ],
                                  }),
                                  s.jsx('div', {
                                    className:
                                      'w-full bg-beige-200 rounded-full h-2',
                                    children: s.jsx('div', {
                                      className:
                                        'bg-green-600 h-2 rounded-full transition-all',
                                      style: { width: `${l.completionRate}%` },
                                    }),
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'card p-6',
                                children: [
                                  s.jsx('h3', {
                                    className:
                                      'text-lg font-bold text-brown-900 mb-4',
                                    children: 'User Distribution',
                                  }),
                                  s.jsxs('div', {
                                    className: 'space-y-3',
                                    children: [
                                      s.jsxs('div', {
                                        className:
                                          'flex items-center justify-between',
                                        children: [
                                          s.jsx('span', {
                                            className: 'text-brown-600',
                                            children: 'Students',
                                          }),
                                          s.jsxs('span', {
                                            className:
                                              'font-semibold text-brown-900',
                                            children: [
                                              l.activeStudents,
                                              ' (',
                                              Math.round(
                                                (l.activeStudents /
                                                  l.totalUsers) *
                                                  100
                                              ),
                                              '%)',
                                            ],
                                          }),
                                        ],
                                      }),
                                      s.jsxs('div', {
                                        className:
                                          'flex items-center justify-between',
                                        children: [
                                          s.jsx('span', {
                                            className: 'text-brown-600',
                                            children: 'Instructors',
                                          }),
                                          s.jsxs('span', {
                                            className:
                                              'font-semibold text-brown-900',
                                            children: [
                                              l.totalInstructors,
                                              ' (',
                                              Math.round(
                                                (l.totalInstructors /
                                                  l.totalUsers) *
                                                  100
                                              ),
                                              '%)',
                                            ],
                                          }),
                                        ],
                                      }),
                                      s.jsxs('div', {
                                        className:
                                          'flex items-center justify-between',
                                        children: [
                                          s.jsx('span', {
                                            className: 'text-brown-600',
                                            children: 'Admins',
                                          }),
                                          s.jsxs('span', {
                                            className:
                                              'font-semibold text-brown-900',
                                            children: [
                                              l.totalUsers -
                                                l.activeStudents -
                                                l.totalInstructors,
                                              ' ',
                                              '(',
                                              Math.round(
                                                ((l.totalUsers -
                                                  l.activeStudents -
                                                  l.totalInstructors) /
                                                  l.totalUsers) *
                                                  100
                                              ),
                                              '%)',
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              s.jsx('div', {
                                className:
                                  'card p-6 bg-gradient-to-r from-green-50 to-beige-50',
                                children: s.jsxs('div', {
                                  className: 'flex items-center gap-3',
                                  children: [
                                    s.jsx('div', {
                                      className: 'text-3xl',
                                      children: '⭐',
                                    }),
                                    s.jsxs('div', {
                                      children: [
                                        s.jsxs('div', {
                                          className:
                                            'text-2xl font-bold text-brown-900',
                                          children: [l.avgSatisfaction, '/5.0'],
                                        }),
                                        s.jsx('div', {
                                          className: 'text-sm text-brown-600',
                                          children:
                                            'Average Student Satisfaction',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'mt-12 grid md:grid-cols-3 gap-6',
                    children: [
                      s.jsxs(a, {
                        to: '/admin/analytics',
                        className: 'card p-6 hover:shadow-lg transition-shadow',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl mb-3',
                            children: '📊',
                          }),
                          s.jsx('h3', {
                            className: 'text-xl font-bold text-brown-900 mb-2',
                            children: 'Analytics',
                          }),
                          s.jsx('p', {
                            className: 'text-brown-600 text-sm',
                            children:
                              'View detailed platform analytics and reports',
                          }),
                        ],
                      }),
                      s.jsxs(a, {
                        to: '/admin/content',
                        className: 'card p-6 hover:shadow-lg transition-shadow',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl mb-3',
                            children: '📚',
                          }),
                          s.jsx('h3', {
                            className: 'text-xl font-bold text-brown-900 mb-2',
                            children: 'Content Management',
                          }),
                          s.jsx('p', {
                            className: 'text-brown-600 text-sm',
                            children:
                              'Manage courses, lessons, and learning materials',
                          }),
                        ],
                      }),
                      s.jsxs(a, {
                        to: '/admin/compliance',
                        className: 'card p-6 hover:shadow-lg transition-shadow',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl mb-3',
                            children: '✅',
                          }),
                          s.jsx('h3', {
                            className: 'text-xl font-bold text-brown-900 mb-2',
                            children: 'Compliance',
                          }),
                          s.jsx('p', {
                            className: 'text-brown-600 text-sm',
                            children:
                              'ETPL reporting and DOL compliance tracking',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            s.jsx(r, {}),
          ],
        })
  );
}
export { l as default };

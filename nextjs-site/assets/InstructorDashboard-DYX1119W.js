import { r as e, j as s, H as t } from './vendor-react-C-ZQNdj3.js';
import { L as i } from './vendor-router-CQjfSXV_.js';
import { N as a } from './Navigation-Bbm4Xzc1.js';
import { F as r } from './Footer-Dh9yHrAI.js';
import { u as n } from './AuthContext-D_Hfa_pA.js';
import './vendor-Da1LjC7-.js';
import './supabaseClient-DCQoDyvc.js';
import './vendor-supabase-C00Cu5KO.js';
function d() {
  const { user: d } = n(),
    [l, c] = e.useState({
      totalStudents: 0,
      activeCourses: 0,
      pendingGrading: 0,
      certificatesIssued: 0,
    }),
    [o, x] = e.useState([]),
    [m, h] = e.useState([]),
    [b, j] = e.useState(!0);
  return (
    e.useEffect(() => {
      (c({
        totalStudents: 45,
        activeCourses: 3,
        pendingGrading: 8,
        certificatesIssued: 12,
      }),
        x([
          {
            id: '1',
            title: 'Barber Apprenticeship Program',
            students: 25,
            completionRate: 68,
            avgGrade: 85,
          },
          {
            id: '2',
            title: 'Customer Service Excellence',
            students: 15,
            completionRate: 93,
            avgGrade: 92,
          },
          {
            id: '3',
            title: 'Business Management Basics',
            students: 5,
            completionRate: 40,
            avgGrade: 78,
          },
        ]),
        h([
          {
            id: '1',
            type: 'submission',
            student: 'John Doe',
            course: 'Barber Apprenticeship',
            action: 'submitted Module 3 Quiz',
            time: '2 hours ago',
          },
          {
            id: '2',
            type: 'completion',
            student: 'Jane Smith',
            course: 'Customer Service Excellence',
            action: 'completed the course',
            time: '5 hours ago',
          },
          {
            id: '3',
            type: 'question',
            student: 'Mike Johnson',
            course: 'Business Management',
            action: 'asked a question in discussion',
            time: '1 day ago',
          },
        ]),
        j(!1));
    }, [d]),
    b
      ? s.jsxs('div', {
          children: [
            s.jsx(t, {
              children: s.jsx('title', {
                children: 'Instructor Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(a, {}),
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
                children: 'Instructor Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(a, {}),
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
                        children: 'Instructor Dashboard',
                      }),
                      s.jsx('p', {
                        className: 'text-lg text-brown-600',
                        children: 'Manage your courses and students',
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'grid md:grid-cols-4 gap-6 mb-12',
                    children: [
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.totalStudents,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Total Students',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: l.activeCourses,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Active Courses',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className:
                              'text-4xl font-bold text-orange-600 mb-2',
                            children: l.pendingGrading,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Pending Grading',
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
                          s.jsx(i, {
                            to: '/course-builder',
                            className: 'btn-primary text-center',
                            children: 'Create Course',
                          }),
                          s.jsx(i, {
                            to: '/lms/grading',
                            className: 'btn-outline text-center',
                            children: 'Grade Assignments',
                          }),
                          s.jsx(i, {
                            to: '/lms/students',
                            className: 'btn-outline text-center',
                            children: 'View Students',
                          }),
                          s.jsx(i, {
                            to: '/analytics',
                            className: 'btn-outline text-center',
                            children: 'View Analytics',
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
                            children: 'My Courses',
                          }),
                          s.jsx('div', {
                            className: 'space-y-4',
                            children: o.map((e) =>
                              s.jsxs(
                                'div',
                                {
                                  className:
                                    'card p-6 hover:shadow-lg transition-shadow',
                                  children: [
                                    s.jsxs('div', {
                                      className:
                                        'flex items-start justify-between mb-4',
                                      children: [
                                        s.jsxs('div', {
                                          children: [
                                            s.jsx('h3', {
                                              className:
                                                'text-xl font-bold text-brown-900 mb-1',
                                              children: e.title,
                                            }),
                                            s.jsxs('p', {
                                              className:
                                                'text-sm text-brown-600',
                                              children: [
                                                e.students,
                                                ' students enrolled',
                                              ],
                                            }),
                                          ],
                                        }),
                                        s.jsx(i, {
                                          to: `/lms/courses/${e.id}/manage`,
                                          className:
                                            'text-green-600 hover:text-green-700 font-semibold text-sm',
                                          children: 'Manage →',
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className:
                                        'grid grid-cols-2 gap-4 text-sm',
                                      children: [
                                        s.jsxs('div', {
                                          children: [
                                            s.jsx('div', {
                                              className: 'text-brown-500 mb-1',
                                              children: 'Completion Rate',
                                            }),
                                            s.jsxs('div', {
                                              className:
                                                'font-semibold text-brown-900',
                                              children: [e.completionRate, '%'],
                                            }),
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          children: [
                                            s.jsx('div', {
                                              className: 'text-brown-500 mb-1',
                                              children: 'Avg Grade',
                                            }),
                                            s.jsxs('div', {
                                              className:
                                                'font-semibold text-brown-900',
                                              children: [e.avgGrade, '%'],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    s.jsx('div', {
                                      className: 'mt-4',
                                      children: s.jsx('div', {
                                        className:
                                          'w-full bg-beige-200 rounded-full h-2',
                                        children: s.jsx('div', {
                                          className:
                                            'bg-green-600 h-2 rounded-full transition-all',
                                          style: {
                                            width: `${e.completionRate}%`,
                                          },
                                        }),
                                      }),
                                    }),
                                  ],
                                },
                                e.id
                              )
                            ),
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        children: [
                          s.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-6',
                            children: 'Recent Activity',
                          }),
                          s.jsxs('div', {
                            className: 'card p-6',
                            children: [
                              s.jsx('div', {
                                className: 'space-y-4',
                                children: m.map((e) =>
                                  s.jsx(
                                    'div',
                                    {
                                      className:
                                        'pb-4 border-b border-brown-200 last:border-0 last:pb-0',
                                      children: s.jsxs('div', {
                                        className: 'flex items-start gap-3',
                                        children: [
                                          s.jsxs('div', {
                                            className: 'text-2xl',
                                            children: [
                                              'submission' === e.type && '📝',
                                              'completion' === e.type && '🎓',
                                              'question' === e.type && '💬',
                                            ],
                                          }),
                                          s.jsxs('div', {
                                            className: 'flex-1',
                                            children: [
                                              s.jsxs('p', {
                                                className:
                                                  'text-brown-900 mb-1',
                                                children: [
                                                  s.jsx('strong', {
                                                    children: e.student,
                                                  }),
                                                  ' ',
                                                  e.action,
                                                ],
                                              }),
                                              s.jsxs('p', {
                                                className:
                                                  'text-sm text-brown-600',
                                                children: [
                                                  e.course,
                                                  ' • ',
                                                  e.time,
                                                ],
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
                                children: s.jsx(i, {
                                  to: '/lms/activity',
                                  className:
                                    'text-green-600 hover:text-green-700 font-semibold text-sm',
                                  children: 'View All Activity →',
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.pendingGrading > 0 &&
                    s.jsx('div', {
                      className: 'mt-12',
                      children: s.jsx('div', {
                        className:
                          'card p-6 bg-orange-50 border-l-4 border-orange-600',
                        children: s.jsxs('div', {
                          className: 'flex items-center gap-4',
                          children: [
                            s.jsx('div', {
                              className: 'text-4xl',
                              children: '⚠️',
                            }),
                            s.jsxs('div', {
                              className: 'flex-1',
                              children: [
                                s.jsxs('h3', {
                                  className:
                                    'text-xl font-bold text-brown-900 mb-1',
                                  children: [
                                    l.pendingGrading,
                                    ' Assignments Need Grading',
                                  ],
                                }),
                                s.jsx('p', {
                                  className: 'text-brown-600 mb-3',
                                  children:
                                    'Students are waiting for feedback on their submissions',
                                }),
                                s.jsx(i, {
                                  to: '/lms/grading',
                                  className:
                                    'text-orange-600 hover:text-orange-700 font-semibold',
                                  children: 'Grade Now →',
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                ],
              }),
            }),
            s.jsx(r, {}),
          ],
        })
  );
}
export { d as default };

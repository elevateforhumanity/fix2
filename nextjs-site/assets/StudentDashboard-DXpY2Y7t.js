import { r as e, j as s, H as t } from './vendor-react-C-ZQNdj3.js';
import { L as r } from './vendor-router-CQjfSXV_.js';
import { N as i } from './Navigation-Bbm4Xzc1.js';
import { F as l } from './Footer-Dh9yHrAI.js';
import { u as n } from './AuthContext-D_Hfa_pA.js';
import './vendor-Da1LjC7-.js';
import './supabaseClient-DCQoDyvc.js';
import './vendor-supabase-C00Cu5KO.js';
function a() {
  var a;
  const { user: c } = n(),
    [d, o] = e.useState({
      coursesEnrolled: 0,
      coursesCompleted: 0,
      certificatesEarned: 0,
      hoursCompleted: 0,
    }),
    [m, x] = e.useState([]),
    [h, j] = e.useState(!0);
  return (
    e.useEffect(() => {
      (o({
        coursesEnrolled: 3,
        coursesCompleted: 1,
        certificatesEarned: 1,
        hoursCompleted: 45,
      }),
        x([
          {
            id: '1',
            title: 'Barber Apprenticeship Program',
            progress: 75,
            nextLesson: 'Advanced Cutting Techniques',
            thumbnail: '/images/barber-course.jpg',
          },
          {
            id: '2',
            title: 'Customer Service Excellence',
            progress: 100,
            completed: !0,
            thumbnail: '/images/customer-service.jpg',
          },
          {
            id: '3',
            title: 'Business Management Basics',
            progress: 30,
            nextLesson: 'Financial Planning',
            thumbnail: '/images/business-mgmt.jpg',
          },
        ]),
        j(!1));
    }, [c]),
    h
      ? s.jsxs('div', {
          children: [
            s.jsx(t, {
              children: s.jsx('title', {
                children: 'Student Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(i, {}),
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
            s.jsx(l, {}),
          ],
        })
      : s.jsxs('div', {
          children: [
            s.jsx(t, {
              children: s.jsx('title', {
                children: 'Student Dashboard | Elevate for Humanity',
              }),
            }),
            s.jsx(i, {}),
            s.jsx('div', {
              className: 'section bg-beige-50',
              children: s.jsxs('div', {
                className: 'container',
                children: [
                  s.jsxs('div', {
                    className: 'mb-8',
                    children: [
                      s.jsxs('h1', {
                        className: 'text-4xl font-bold text-brown-900 mb-2',
                        children: [
                          'Welcome back, ',
                          (null == (a = null == c ? void 0 : c.email)
                            ? void 0
                            : a.split('@')[0]) || 'Student',
                          '!',
                        ],
                      }),
                      s.jsx('p', {
                        className: 'text-lg text-brown-600',
                        children: 'Continue your learning journey',
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
                            children: d.coursesEnrolled,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Courses Enrolled',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: d.coursesCompleted,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Courses Completed',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: d.certificatesEarned,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Certificates Earned',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'card p-6 text-center',
                        children: [
                          s.jsx('div', {
                            className: 'text-4xl font-bold text-green-600 mb-2',
                            children: d.hoursCompleted,
                          }),
                          s.jsx('div', {
                            className:
                              'text-sm text-brown-600 uppercase tracking-wide',
                            children: 'Hours Completed',
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
                        className: 'grid md:grid-cols-3 gap-4',
                        children: [
                          s.jsx(r, {
                            to: '/lms/courses',
                            className: 'btn-primary text-center',
                            children: 'Browse Courses',
                          }),
                          s.jsx(r, {
                            to: '/lms/my-certificates',
                            className: 'btn-outline text-center',
                            children: 'View Certificates',
                          }),
                          s.jsx(r, {
                            to: '/account',
                            className: 'btn-outline text-center',
                            children: 'Account Settings',
                          }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    children: [
                      s.jsxs('div', {
                        className: 'flex items-center justify-between mb-6',
                        children: [
                          s.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900',
                            children: 'My Courses',
                          }),
                          s.jsx(r, {
                            to: '/lms/courses',
                            className:
                              'text-green-600 hover:text-green-700 font-semibold',
                            children: 'View All →',
                          }),
                        ],
                      }),
                      s.jsx('div', {
                        className: 'grid md:grid-cols-3 gap-6',
                        children: m.map((e) =>
                          s.jsxs(
                            'div',
                            {
                              className:
                                'card hover:shadow-lg transition-shadow',
                              children: [
                                s.jsx('div', {
                                  className:
                                    'h-48 bg-gradient-to-br from-green-100 to-beige-100 flex items-center justify-center',
                                  children: s.jsx('div', {
                                    className: 'text-6xl',
                                    children: '📚',
                                  }),
                                }),
                                s.jsxs('div', {
                                  className: 'p-6',
                                  children: [
                                    s.jsx('h3', {
                                      className:
                                        'text-xl font-bold text-brown-900 mb-3',
                                      children: e.title,
                                    }),
                                    s.jsxs('div', {
                                      className: 'mb-4',
                                      children: [
                                        s.jsxs('div', {
                                          className:
                                            'flex items-center justify-between text-sm text-brown-600 mb-2',
                                          children: [
                                            s.jsx('span', {
                                              children: 'Progress',
                                            }),
                                            s.jsxs('span', {
                                              className: 'font-semibold',
                                              children: [e.progress, '%'],
                                            }),
                                          ],
                                        }),
                                        s.jsx('div', {
                                          className:
                                            'w-full bg-beige-200 rounded-full h-2',
                                          children: s.jsx('div', {
                                            className:
                                              'bg-green-600 h-2 rounded-full transition-all',
                                            style: { width: `${e.progress}%` },
                                          }),
                                        }),
                                      ],
                                    }),
                                    e.completed
                                      ? s.jsxs('div', {
                                          className:
                                            'flex items-center gap-2 text-green-600 font-semibold mb-4',
                                          children: [
                                            s.jsx('span', { children: '✓' }),
                                            s.jsx('span', {
                                              children: 'Completed',
                                            }),
                                          ],
                                        })
                                      : s.jsxs('div', {
                                          className:
                                            'text-sm text-brown-600 mb-4',
                                          children: [
                                            s.jsx('strong', {
                                              children: 'Next:',
                                            }),
                                            ' ',
                                            e.nextLesson,
                                          ],
                                        }),
                                    s.jsx(r, {
                                      to: `/lms/courses/${e.id}`,
                                      className: e.completed
                                        ? 'btn-outline w-full text-center'
                                        : 'btn-primary w-full text-center',
                                      children: e.completed
                                        ? 'Review Course'
                                        : 'Continue Learning',
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
                  d.certificatesEarned > 0 &&
                    s.jsxs('div', {
                      className: 'mt-12',
                      children: [
                        s.jsx('h2', {
                          className: 'text-2xl font-bold text-brown-900 mb-6',
                          children: 'Recent Achievements',
                        }),
                        s.jsx('div', {
                          className:
                            'card p-6 bg-gradient-to-r from-green-50 to-beige-50',
                          children: s.jsxs('div', {
                            className: 'flex items-center gap-4',
                            children: [
                              s.jsx('div', {
                                className: 'text-6xl',
                                children: '🏆',
                              }),
                              s.jsxs('div', {
                                className: 'flex-1',
                                children: [
                                  s.jsx('h3', {
                                    className:
                                      'text-xl font-bold text-brown-900 mb-1',
                                    children: 'Certificate Earned!',
                                  }),
                                  s.jsx('p', {
                                    className: 'text-brown-600 mb-3',
                                    children:
                                      'You completed Customer Service Excellence',
                                  }),
                                  s.jsx(r, {
                                    to: '/lms/my-certificates',
                                    className:
                                      'text-green-600 hover:text-green-700 font-semibold',
                                    children: 'View Certificate →',
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
            }),
            s.jsx(l, {}),
          ],
        })
  );
}
export { a as default };

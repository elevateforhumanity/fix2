import {
  j as e,
  H as s,
  t,
  a3 as l,
  a4 as r,
  A as i,
  J as a,
  U as n,
  y as c,
  ac as d,
} from './vendor-react-C-ZQNdj3.js';
import { L as o } from './vendor-router-CQjfSXV_.js';
import { N as m } from './Navigation-Bbm4Xzc1.js';
import { F as x } from './Footer-Dh9yHrAI.js';
import {
  C as h,
  e as j,
  a as u,
  b as p,
  d as f,
  B as N,
} from './button-B_Plb33j.js';
import './vendor-Da1LjC7-.js';
function b() {
  const b = [
    {
      icon: t,
      label: 'My Courses',
      href: '/lms/courses',
      color: 'text-green-600',
    },
    { icon: l, label: 'Live Classes', href: '/meet', color: 'text-purple-600' },
    {
      icon: r,
      label: 'Assignments',
      href: '/lms/assignments',
      color: 'text-green-600',
    },
    {
      icon: i,
      label: 'Certificates',
      href: '/certificates',
      color: 'text-yellow-600',
    },
    { icon: a, label: 'Schedule', href: '/calendar', color: 'text-red-600' },
    {
      icon: n,
      label: 'Study Groups',
      href: '/community',
      color: 'text-green-600',
    },
    {
      icon: c,
      label: 'Progress',
      href: '/lms/progress',
      color: 'text-pink-600',
    },
    { icon: d, label: 'Settings', href: '/settings', color: 'text-brown-600' },
  ];
  return e.jsxs('div', {
    className: 'min-h-screen bg-beige-50',
    children: [
      e.jsxs(s, {
        children: [
          e.jsx('title', { children: 'LMS Dashboard | Elevate for Humanity' }),
          e.jsx('meta', {
            name: 'description',
            content: 'Access your courses, assignments, and learning materials',
          }),
        ],
      }),
      e.jsx(m, {}),
      e.jsxs('main', {
        role: 'main',
        className: 'container mx-auto px-4 py-8',
        children: [
          e.jsxs('div', {
            className: 'mb-8',
            children: [
              e.jsx('h1', {
                className: 'text-4xl font-bold text-brown-900 mb-2',
                children: 'Welcome back, Student!',
              }),
              e.jsx('p', {
                className: 'text-lg text-brown-600',
                children: 'Continue your learning journey',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'grid grid-cols-2 md:grid-cols-4 gap-4 mb-8',
            children: b.map((s, t) =>
              e.jsx(
                o,
                {
                  to: s.href,
                  children: e.jsx(h, {
                    className:
                      'hover:shadow-lg transition-shadow cursor-pointer',
                    children: e.jsxs(j, {
                      className:
                        'flex flex-col items-center justify-center p-6',
                      children: [
                        e.jsx(s.icon, { className: `w-8 h-8 mb-2 ${s.color}` }),
                        e.jsx('span', {
                          className: 'text-sm font-medium text-center',
                          children: s.label,
                        }),
                      ],
                    }),
                  }),
                },
                t
              )
            ),
          }),
          e.jsxs('div', {
            className: 'grid lg:grid-cols-3 gap-8',
            children: [
              e.jsxs('div', {
                className: 'lg:col-span-2 space-y-6',
                children: [
                  e.jsxs(h, {
                    children: [
                      e.jsxs(u, {
                        children: [
                          e.jsx(p, { children: 'My Courses' }),
                          e.jsx(f, { children: 'Continue where you left off' }),
                        ],
                      }),
                      e.jsxs(j, {
                        className: 'space-y-4',
                        children: [
                          [
                            {
                              title: 'Construction Pre-Apprenticeship',
                              progress: 65,
                              nextLesson: 'OSHA 10 Safety Module 3',
                              dueDate: 'Oct 20, 2025',
                            },
                            {
                              title: 'Phlebotomy Technician',
                              progress: 40,
                              nextLesson: 'Venipuncture Techniques',
                              dueDate: 'Oct 18, 2025',
                            },
                            {
                              title: 'CPR Instructor Certification',
                              progress: 85,
                              nextLesson: 'Final Assessment',
                              dueDate: 'Oct 15, 2025',
                            },
                          ].map((s, t) =>
                            e.jsxs(
                              'div',
                              {
                                className:
                                  'border rounded-lg p-4 hover:bg-beige-50 transition-colors',
                                children: [
                                  e.jsxs('div', {
                                    className:
                                      'flex justify-between items-start mb-2',
                                    children: [
                                      e.jsx('h3', {
                                        className: 'font-semibold text-lg',
                                        children: s.title,
                                      }),
                                      e.jsxs('span', {
                                        className: 'text-sm text-brown-500',
                                        children: [s.progress, '%'],
                                      }),
                                    ],
                                  }),
                                  e.jsx('div', {
                                    className:
                                      'w-full bg-brown-200 rounded-full h-2 mb-3',
                                    children: e.jsx('div', {
                                      className:
                                        'bg-primary h-2 rounded-full transition-all',
                                      style: { width: `${s.progress}%` },
                                    }),
                                  }),
                                  e.jsxs('div', {
                                    className:
                                      'flex justify-between items-center',
                                    children: [
                                      e.jsxs('div', {
                                        children: [
                                          e.jsxs('p', {
                                            className: 'text-sm text-brown-600',
                                            children: ['Next: ', s.nextLesson],
                                          }),
                                          e.jsxs('p', {
                                            className: 'text-xs text-brown-500',
                                            children: ['Due: ', s.dueDate],
                                          }),
                                        ],
                                      }),
                                      e.jsx(N, {
                                        size: 'sm',
                                        children: 'Continue',
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              t
                            )
                          ),
                          e.jsxs(N, {
                            variant: 'outline',
                            className: 'w-full',
                            children: [
                              e.jsx(t, { className: 'w-4 h-4 mr-2' }),
                              'Browse All Courses',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(h, {
                    children: [
                      e.jsxs(u, {
                        children: [
                          e.jsx(p, { children: 'Upcoming Assignments' }),
                          e.jsx(f, {
                            children: 'Stay on track with your deadlines',
                          }),
                        ],
                      }),
                      e.jsx(j, {
                        children: e.jsxs('div', {
                          className: 'space-y-3',
                          children: [
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between p-3 border rounded-lg',
                              children: [
                                e.jsxs('div', {
                                  children: [
                                    e.jsx('p', {
                                      className: 'font-medium',
                                      children: 'OSHA 10 Quiz',
                                    }),
                                    e.jsx('p', {
                                      className: 'text-sm text-brown-500',
                                      children: 'Due Oct 17, 2025',
                                    }),
                                  ],
                                }),
                                e.jsx(N, {
                                  size: 'sm',
                                  variant: 'outline',
                                  children: 'Start',
                                }),
                              ],
                            }),
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between p-3 border rounded-lg',
                              children: [
                                e.jsxs('div', {
                                  children: [
                                    e.jsx('p', {
                                      className: 'font-medium',
                                      children: 'Phlebotomy Lab Report',
                                    }),
                                    e.jsx('p', {
                                      className: 'text-sm text-brown-500',
                                      children: 'Due Oct 19, 2025',
                                    }),
                                  ],
                                }),
                                e.jsx(N, {
                                  size: 'sm',
                                  variant: 'outline',
                                  children: 'Start',
                                }),
                              ],
                            }),
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between p-3 border rounded-lg',
                              children: [
                                e.jsxs('div', {
                                  children: [
                                    e.jsx('p', {
                                      className: 'font-medium',
                                      children: 'CPR Practice Video',
                                    }),
                                    e.jsx('p', {
                                      className: 'text-sm text-brown-500',
                                      children: 'Due Oct 20, 2025',
                                    }),
                                  ],
                                }),
                                e.jsx(N, {
                                  size: 'sm',
                                  variant: 'outline',
                                  children: 'Start',
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
              e.jsxs('div', {
                className: 'space-y-6',
                children: [
                  e.jsxs(h, {
                    children: [
                      e.jsx(u, {
                        children: e.jsx(p, { children: 'Upcoming Events' }),
                      }),
                      e.jsxs(j, {
                        className: 'space-y-3',
                        children: [
                          [
                            {
                              title: 'Construction Safety Webinar',
                              date: 'Oct 15, 2:00 PM',
                              type: 'Live Class',
                            },
                            {
                              title: 'Phlebotomy Lab Session',
                              date: 'Oct 16, 10:00 AM',
                              type: 'In-Person',
                            },
                            {
                              title: 'CPR Final Exam',
                              date: 'Oct 18, 9:00 AM',
                              type: 'Assessment',
                            },
                          ].map((s, t) =>
                            e.jsxs(
                              'div',
                              {
                                className:
                                  'border-l-4 border-primary pl-3 py-2',
                                children: [
                                  e.jsx('p', {
                                    className: 'font-medium text-sm',
                                    children: s.title,
                                  }),
                                  e.jsx('p', {
                                    className: 'text-xs text-brown-500',
                                    children: s.date,
                                  }),
                                  e.jsx('span', {
                                    className:
                                      'inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded',
                                    children: s.type,
                                  }),
                                ],
                              },
                              t
                            )
                          ),
                          e.jsxs(N, {
                            variant: 'outline',
                            size: 'sm',
                            className: 'w-full mt-2',
                            children: [
                              e.jsx(a, { className: 'w-4 h-4 mr-2' }),
                              'View Full Calendar',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(h, {
                    children: [
                      e.jsx(u, {
                        children: e.jsx(p, { children: 'Recent Achievements' }),
                      }),
                      e.jsxs(j, {
                        className: 'space-y-3',
                        children: [
                          e.jsxs('div', {
                            className: 'flex items-center gap-3',
                            children: [
                              e.jsx('div', {
                                className:
                                  'w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center',
                                children: e.jsx(i, {
                                  className: 'w-6 h-6 text-yellow-600',
                                }),
                              }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('p', {
                                    className: 'font-medium text-sm',
                                    children: 'Perfect Attendance',
                                  }),
                                  e.jsx('p', {
                                    className: 'text-xs text-brown-500',
                                    children: 'Earned Oct 10, 2025',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'flex items-center gap-3',
                            children: [
                              e.jsx('div', {
                                className:
                                  'w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center',
                                children: e.jsx(i, {
                                  className: 'w-6 h-6 text-green-600',
                                }),
                              }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('p', {
                                    className: 'font-medium text-sm',
                                    children: 'Quick Learner',
                                  }),
                                  e.jsx('p', {
                                    className: 'text-xs text-brown-500',
                                    children: 'Earned Oct 8, 2025',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx(N, {
                            variant: 'outline',
                            size: 'sm',
                            className: 'w-full mt-2',
                            children: 'View All Achievements',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(h, {
                    children: [
                      e.jsx(u, {
                        children: e.jsx(p, { children: 'Need Help?' }),
                      }),
                      e.jsxs(j, {
                        className: 'space-y-2',
                        children: [
                          e.jsxs(N, {
                            variant: 'outline',
                            size: 'sm',
                            className: 'w-full justify-start',
                            children: [
                              e.jsx(r, { className: 'w-4 h-4 mr-2' }),
                              'Student Handbook',
                            ],
                          }),
                          e.jsxs(N, {
                            variant: 'outline',
                            size: 'sm',
                            className: 'w-full justify-start',
                            children: [
                              e.jsx(n, { className: 'w-4 h-4 mr-2' }),
                              'Contact Support',
                            ],
                          }),
                          e.jsxs(N, {
                            variant: 'outline',
                            size: 'sm',
                            className: 'w-full justify-start',
                            children: [
                              e.jsx(l, { className: 'w-4 h-4 mr-2' }),
                              'Tutorial Videos',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsx(x, {}),
    ],
  });
}
export { b as default };

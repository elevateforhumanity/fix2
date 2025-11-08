import {
  r as e,
  j as s,
  a9 as t,
  aa as n,
  t as r,
  u as l,
  ab as i,
  g as a,
  A as o,
  D as d,
} from './vendor-react-C-ZQNdj3.js';
import { L as c } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function m() {
  const m = {},
    [x, h] = e.useState([]),
    [u, g] = e.useState(!0);
  e.useEffect(() => {
    p();
  }, []);
  const p = async () => {
    try {
      g(!0);
      const e = await fetch('/api/lms/courses');
      if (e.ok) {
        const s = await e.json();
        h(s);
      }
    } catch (e) {
      console.error('Failed to load courses:', e);
    } finally {
      g(!1);
    }
  };
  if (u)
    return s.jsxs('div', {
      className: 'min-h-screen flex items-center justify-center',
      children: [
        s.jsx(t, { className: 'h-8 w-8 animate-spin text-green-600' }),
        s.jsx('span', {
          className: 'ml-2 text-brown-600',
          children: 'Loading your courses...',
        }),
      ],
    });
  const b = [
      {
        id: 'ai-fundamentals',
        title: 'AI Fundamentals & Machine Learning',
        category: 'Technology',
        modules: 12,
        duration: '48 hours',
        completion: 65,
        enrolled: !0,
        instructor: 'Dr. Sarah Chen',
        description:
          'Master the fundamentals of artificial intelligence and machine learning',
        modules_list: [
          {
            id: 1,
            title: 'Introduction to AI',
            duration: '2 hours',
            completed: !0,
          },
          { id: 2, title: 'Python for AI', duration: '4 hours', completed: !0 },
          {
            id: 3,
            title: 'Machine Learning Basics',
            duration: '4 hours',
            completed: !0,
          },
          {
            id: 4,
            title: 'Neural Networks',
            duration: '6 hours',
            completed: !1,
            current: !0,
          },
          { id: 5, title: 'Deep Learning', duration: '8 hours', completed: !1 },
          {
            id: 6,
            title: 'Computer Vision',
            duration: '6 hours',
            completed: !1,
          },
        ],
        nextModule: 'Neural Networks Fundamentals',
      },
      {
        id: 'data-science',
        title: 'Data Science & Analytics',
        category: 'Analytics',
        modules: 16,
        duration: '64 hours',
        completion: 0,
        enrolled: !1,
        instructor: 'Prof. Michael Rodriguez',
        description:
          'Comprehensive data science training with real-world projects',
        modules_list: [
          {
            id: 1,
            title: 'Statistics for Data Science',
            duration: '4 hours',
            completed: !1,
          },
          {
            id: 2,
            title: 'Python & R Programming',
            duration: '6 hours',
            completed: !1,
          },
          {
            id: 3,
            title: 'Data Visualization',
            duration: '4 hours',
            completed: !1,
          },
        ],
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity Specialist',
        category: 'Security',
        modules: 20,
        duration: '80 hours',
        completion: 25,
        enrolled: !0,
        instructor: 'James Wilson, CISSP',
        description:
          'Advanced cybersecurity training for enterprise environments',
        modules_list: [
          {
            id: 1,
            title: 'Security Fundamentals',
            duration: '3 hours',
            completed: !0,
          },
          {
            id: 2,
            title: 'Network Security',
            duration: '5 hours',
            completed: !0,
          },
          {
            id: 3,
            title: 'Ethical Hacking',
            duration: '6 hours',
            completed: !1,
            current: !0,
          },
        ],
      },
    ],
    j = 156,
    w = 28,
    N = 3,
    f = 8;
  return s.jsxs('div', {
    className: 'min-h-screen bg-beige-50',
    children: [
      s.jsx('div', {
        className: 'bg-white border-b',
        children: s.jsx('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between',
            children: [
              s.jsxs('div', {
                children: [
                  s.jsx('h1', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: 'Learning Management System',
                  }),
                  s.jsx('p', {
                    className: 'text-brown-600 mt-1',
                    children:
                      'Your personalized learning journey with federal compliance tracking',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'flex items-center space-x-4',
                children: [
                  s.jsx('div', {
                    className:
                      'bg-beige-50 text-green-600 px-3 py-1 rounded-full text-sm',
                    children: 'Progress: 45%',
                  }),
                  s.jsx(c, {
                    to: '/compliance',
                    className:
                      'bg-beige-50 text-yellow-600 px-3 py-1 rounded-full text-sm',
                    children: '📊 Federal Tracking',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      s.jsx('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
        children: s.jsxs('div', {
          className: 'grid lg:grid-cols-3 gap-8',
          children: [
            s.jsxs('div', {
              className: 'lg:col-span-2 space-y-6',
              children: [
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    s.jsx('h2', {
                      className: 'text-xl font-bold text-brown-900 mb-4',
                      children: 'Continue Learning',
                    }),
                    s.jsx('div', {
                      className:
                        'bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white',
                      children: s.jsxs('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          s.jsxs('div', {
                            children: [
                              s.jsx('h3', {
                                className: 'text-lg font-medium',
                                children: 'AI Fundamentals & Machine Learning',
                              }),
                              s.jsx('p', {
                                className: 'text-blue-100',
                                children: 'Next: Neural Networks Fundamentals',
                              }),
                              s.jsxs('div', {
                                className: 'mt-3',
                                children: [
                                  s.jsx('div', {
                                    className: 'bg-white/20 rounded-full h-2',
                                    children: s.jsx('div', {
                                      className: 'bg-white rounded-full h-2',
                                      style: { width: '65%' },
                                    }),
                                  }),
                                  s.jsx('p', {
                                    className: 'text-sm text-blue-100 mt-1',
                                    children: '65% Complete',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          s.jsxs('button', {
                            className:
                              'bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors',
                            children: [
                              s.jsx(n, { className: 'h-4 w-4 mr-2 inline' }),
                              'Continue',
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    s.jsx('h2', {
                      className: 'text-xl font-bold text-brown-900 mb-4',
                      children: 'My Courses',
                    }),
                    s.jsx('div', {
                      className: 'space-y-4',
                      children: b.map((e) =>
                        s.jsx(
                          'div',
                          {
                            className:
                              'border rounded-lg p-4 hover:bg-beige-50 transition-colors',
                            children: s.jsxs('div', {
                              className: 'flex items-center justify-between',
                              children: [
                                s.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    s.jsxs('div', {
                                      className: 'flex items-center space-x-3',
                                      children: [
                                        s.jsx('h3', {
                                          className:
                                            'font-medium text-brown-900',
                                          children: e.title,
                                        }),
                                        s.jsx('span', {
                                          className:
                                            'bg-beige-100 text-brown-900 px-2 py-1 rounded text-sm',
                                          children: e.category,
                                        }),
                                        e.enrolled &&
                                          s.jsx('span', {
                                            className:
                                              'bg-beige-50 text-green-600 px-2 py-1 rounded text-sm',
                                            children: 'Enrolled',
                                          }),
                                      ],
                                    }),
                                    s.jsx('p', {
                                      className: 'text-brown-600 text-sm mt-1',
                                      children: e.description,
                                    }),
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center space-x-4 mt-2 text-sm text-brown-500',
                                      children: [
                                        s.jsxs('span', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(r, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            e.modules,
                                            ' modules',
                                          ],
                                        }),
                                        s.jsxs('span', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(l, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            e.duration,
                                          ],
                                        }),
                                        s.jsxs('span', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(i, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            e.instructor,
                                          ],
                                        }),
                                      ],
                                    }),
                                    e.enrolled &&
                                      s.jsxs('div', {
                                        className: 'mt-3',
                                        children: [
                                          s.jsx('div', {
                                            className:
                                              'bg-brown-200 rounded-full h-2',
                                            children: s.jsx('div', {
                                              className:
                                                'bg-green-600 rounded-full h-2',
                                              style: {
                                                width: `${e.completion}%`,
                                              },
                                            }),
                                          }),
                                          s.jsxs('p', {
                                            className:
                                              'text-sm text-brown-600 mt-1',
                                            children: [
                                              e.completion,
                                              '% Complete',
                                            ],
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                                s.jsx('div', {
                                  className: 'ml-4',
                                  children: e.enrolled
                                    ? s.jsx(c, {
                                        to: `/lms/${e.id}`,
                                        className:
                                          'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors',
                                        children: 'Continue',
                                      })
                                    : s.jsx(c, {
                                        to: `/pay?program=${e.id}`,
                                        className:
                                          'bg-white text-green-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors',
                                        children: 'Enroll',
                                      }),
                                }),
                              ],
                            }),
                          },
                          e.id
                        )
                      ),
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow-sm border p-6',
                  children: [
                    s.jsxs('h3', {
                      className: 'text-lg font-semibold mb-4 flex items-center',
                      children: [
                        s.jsx(r, { className: 'w-5 h-5 mr-2 text-blue-500' }),
                        'Google Career Certificates - Available for Enrollment',
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'grid md:grid-cols-2 gap-4 mb-6',
                      children: [
                        s.jsxs('div', {
                          className:
                            'border rounded-lg p-4 hover:shadow-md transition-shadow',
                          children: [
                            s.jsx('h4', {
                              className: 'font-medium text-brown-900',
                              children: 'Google Data Analytics Certificate',
                            }),
                            s.jsx('p', {
                              className: 'text-sm text-brown-600 mt-1',
                              children:
                                '6 months • $1,200 with career coaching',
                            }),
                            s.jsxs('div', {
                              className:
                                'mt-3 flex justify-between items-center',
                              children: [
                                s.jsx('span', {
                                  className:
                                    'text-xs bg-beige-50 text-green-600 px-2 py-1 rounded',
                                  children: 'Free Content + Support',
                                }),
                                s.jsx('button', {
                                  onClick: () =>
                                    window.open(
                                      '/programs.html?focus=google-data-analytics-cert',
                                      '_blank'
                                    ),
                                  className:
                                    'text-green-600 hover:text-green-600 text-sm font-medium',
                                  children: 'Enroll Now →',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className:
                            'border rounded-lg p-4 hover:shadow-md transition-shadow',
                          children: [
                            s.jsx('h4', {
                              className: 'font-medium text-brown-900',
                              children: 'Digital Marketing & E-commerce',
                            }),
                            s.jsx('p', {
                              className: 'text-sm text-brown-600 mt-1',
                              children:
                                '6 months • $1,000 with portfolio review',
                            }),
                            s.jsxs('div', {
                              className:
                                'mt-3 flex justify-between items-center',
                              children: [
                                s.jsx('span', {
                                  className:
                                    'text-xs bg-beige-50 text-green-600 px-2 py-1 rounded',
                                  children: 'Free Content + Support',
                                }),
                                s.jsx('button', {
                                  onClick: () =>
                                    window.open(
                                      '/programs.html?focus=google-digital-marketing-cert',
                                      '_blank'
                                    ),
                                  className:
                                    'text-green-600 hover:text-green-600 text-sm font-medium',
                                  children: 'Enroll Now →',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className:
                            'border rounded-lg p-4 hover:shadow-md transition-shadow',
                          children: [
                            s.jsx('h4', {
                              className: 'font-medium text-brown-900',
                              children: 'Google Ads Certification',
                            }),
                            s.jsx('p', {
                              className: 'text-sm text-brown-600 mt-1',
                              children: '4-6 weeks • $599 with live mentoring',
                            }),
                            s.jsxs('div', {
                              className:
                                'mt-3 flex justify-between items-center',
                              children: [
                                s.jsx('span', {
                                  className:
                                    'text-xs bg-beige-50 text-green-600 px-2 py-1 rounded',
                                  children: 'Free Content + Support',
                                }),
                                s.jsx('button', {
                                  onClick: () =>
                                    window.open(
                                      '/programs.html?focus=google-ads-certification',
                                      '_blank'
                                    ),
                                  className:
                                    'text-green-600 hover:text-green-600 text-sm font-medium',
                                  children: 'Enroll Now →',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className:
                            'border rounded-lg p-4 hover:shadow-md transition-shadow',
                          children: [
                            s.jsx('h4', {
                              className: 'font-medium text-brown-900',
                              children: 'Google Analytics Certification',
                            }),
                            s.jsx('p', {
                              className: 'text-sm text-brown-600 mt-1',
                              children: '3-4 weeks • $499 with implementation',
                            }),
                            s.jsxs('div', {
                              className:
                                'mt-3 flex justify-between items-center',
                              children: [
                                s.jsx('span', {
                                  className:
                                    'text-xs bg-beige-50 text-green-600 px-2 py-1 rounded',
                                  children: 'Free Content + Support',
                                }),
                                s.jsx('button', {
                                  onClick: () =>
                                    window.open(
                                      '/programs.html?focus=google-analytics-certification',
                                      '_blank'
                                    ),
                                  className:
                                    'text-green-600 hover:text-green-600 text-sm font-medium',
                                  children: 'Enroll Now →',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (null == m ? void 0 : m.module) &&
                  s.jsxs('div', {
                    className: 'bg-white rounded-lg shadow p-6',
                    children: [
                      s.jsx('h2', {
                        className: 'text-xl font-bold text-brown-900 mb-4',
                        children: 'Course Modules',
                      }),
                      s.jsx('div', {
                        className: 'space-y-3',
                        children: b[0].modules_list.map((e) =>
                          s.jsxs(
                            'div',
                            {
                              className:
                                'flex items-center justify-between p-4 border rounded-lg',
                              children: [
                                s.jsxs('div', {
                                  className: 'flex items-center space-x-3',
                                  children: [
                                    e.completed
                                      ? s.jsx(a, {
                                          className: 'h-5 w-5 text-green-500',
                                        })
                                      : e.current
                                        ? s.jsx(n, {
                                            className: 'h-5 w-5 text-blue-500',
                                          })
                                        : s.jsx('div', {
                                            className:
                                              'h-5 w-5 border-2 border-brown-300 rounded-full',
                                          }),
                                    s.jsxs('div', {
                                      children: [
                                        s.jsx('h4', {
                                          className:
                                            'font-medium ' +
                                            (e.completed
                                              ? 'text-brown-600'
                                              : 'text-brown-900'),
                                          children: e.title,
                                        }),
                                        s.jsx('p', {
                                          className: 'text-sm text-brown-500',
                                          children: e.duration,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsx('button', {
                                  className:
                                    'px-4 py-2 rounded-lg text-sm ' +
                                    (e.completed
                                      ? 'bg-beige-100 text-brown-600'
                                      : e.current
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-beige-100 text-gray-400 cursor-not-allowed'),
                                  disabled: !e.completed && !e.current,
                                  children: e.completed
                                    ? 'Review'
                                    : e.current
                                      ? 'Continue'
                                      : 'Locked',
                                }),
                              ],
                            },
                            e.id
                          )
                        ),
                      }),
                    ],
                  }),
              ],
            }),
            s.jsxs('div', {
              className: 'space-y-6',
              children: [
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    s.jsxs('h3', {
                      className:
                        'text-lg font-medium text-brown-900 mb-4 flex items-center',
                      children: [
                        s.jsx(o, { className: 'h-5 w-5 mr-2 text-green-600' }),
                        'Digital Learning Binder',
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'space-y-3',
                      children: [
                        s.jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            s.jsx('span', {
                              className: 'text-brown-600',
                              children: 'Total Learning Hours',
                            }),
                            s.jsx('span', {
                              className: 'font-medium',
                              children: j,
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            s.jsx('span', {
                              className: 'text-brown-600',
                              children: 'Completed Modules',
                            }),
                            s.jsx('span', {
                              className: 'font-medium',
                              children: w,
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            s.jsx('span', {
                              className: 'text-brown-600',
                              children: 'Certificates Earned',
                            }),
                            s.jsx('span', {
                              className: 'font-medium',
                              children: N,
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'flex justify-between',
                          children: [
                            s.jsx('span', {
                              className: 'text-brown-600',
                              children: 'Projects Completed',
                            }),
                            s.jsx('span', {
                              className: 'font-medium',
                              children: f,
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('button', {
                      className:
                        'w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors',
                      children: [
                        s.jsx(d, { className: 'h-4 w-4 mr-2 inline' }),
                        'Download Transcript',
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    s.jsx('h3', {
                      className: 'text-lg font-medium text-brown-900 mb-4',
                      children: 'Achievements',
                    }),
                    s.jsx('div', {
                      className: 'space-y-3',
                      children: [
                        {
                          id: 1,
                          title: 'First Module Complete',
                          earned: !0,
                          date: '2024-01-15',
                        },
                        {
                          id: 2,
                          title: 'Python Programming Badge',
                          earned: !0,
                          date: '2024-01-22',
                        },
                        {
                          id: 3,
                          title: 'Machine Learning Foundation',
                          earned: !1,
                        },
                        { id: 4, title: 'AI Project Completed', earned: !1 },
                      ].map((e) =>
                        s.jsxs(
                          'div',
                          {
                            className: 'flex items-center space-x-3',
                            children: [
                              s.jsx('div', {
                                className:
                                  'p-2 rounded-full ' +
                                  (e.earned ? 'bg-yellow-100' : 'bg-beige-100'),
                                children: s.jsx(o, {
                                  className:
                                    'h-4 w-4 ' +
                                    (e.earned
                                      ? 'text-yellow-600'
                                      : 'text-gray-400'),
                                }),
                              }),
                              s.jsxs('div', {
                                className: 'flex-1',
                                children: [
                                  s.jsx('p', {
                                    className:
                                      'text-sm font-medium ' +
                                      (e.earned
                                        ? 'text-brown-900'
                                        : 'text-brown-500'),
                                    children: e.title,
                                  }),
                                  e.earned &&
                                    e.date &&
                                    s.jsxs('p', {
                                      className: 'text-xs text-brown-500',
                                      children: [
                                        'Earned',
                                        ' ',
                                        new Date(e.date).toLocaleDateString(),
                                      ],
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
                s.jsxs('div', {
                  className:
                    'bg-orange-50 border border-orange-200 rounded-lg p-6',
                  children: [
                    s.jsx('h3', {
                      className: 'text-lg font-medium text-orange-900 mb-2',
                      children: '📊 Federal Compliance Tracking',
                    }),
                    s.jsx('p', {
                      className: 'text-orange-700 text-sm mb-4',
                      children:
                        'Your progress is automatically tracked for DOL/DWD reporting requirements.',
                    }),
                    s.jsx(c, {
                      to: '/compliance',
                      className:
                        'bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm',
                      children: 'View Compliance Records',
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    s.jsx('h3', {
                      className: 'text-lg font-medium text-brown-900 mb-4',
                      children: 'Quick Actions',
                    }),
                    s.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        s.jsx(c, {
                          to: '/programs',
                          className:
                            'w-full bg-beige-100 text-brown-900 py-2 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm block text-center',
                          children: 'Browse All Programs',
                        }),
                        s.jsx(c, {
                          to: '/connect',
                          className:
                            'w-full bg-beige-100 text-brown-900 py-2 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm block text-center',
                          children: 'Connect with Peers',
                        }),
                        s.jsx('button', {
                          className:
                            'w-full bg-beige-100 text-brown-900 py-2 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm',
                          children: 'Technical Support',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { m as default };

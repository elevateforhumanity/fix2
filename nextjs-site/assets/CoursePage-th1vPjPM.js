import {
  j as e,
  g as s,
  ao as l,
  ap as t,
  r as n,
  H as r,
  t as a,
  u as i,
  U as d,
  A as c,
  aa as o,
} from './vendor-react-C-ZQNdj3.js';
import { N as m } from './Navigation-Bbm4Xzc1.js';
import { F as x } from './Footer-Dh9yHrAI.js';
import { B as h } from './Button-kBKDsv7Y.js';
import { u, c as j } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function p({ modules: n, currentLessonId: r, onLessonClick: a }) {
  const i = n.reduce((e, s) => e + s.lessons.length, 0),
    d = n.reduce((e, s) => e + s.lessons.filter((e) => e.completed).length, 0),
    c = i > 0 ? (d / i) * 100 : 0;
  return e.jsxs('div', {
    className: 'bg-white rounded-lg shadow-sm border border-brown-200 p-6',
    children: [
      e.jsxs('div', {
        className: 'mb-6',
        children: [
          e.jsxs('div', {
            className: 'flex items-center justify-between mb-2',
            children: [
              e.jsx('h3', {
                className: 'text-lg font-bold text-brown-900',
                children: 'Course Progress',
              }),
              e.jsxs('span', {
                className: 'text-sm font-semibold text-green-600',
                children: [Math.round(c), '%'],
              }),
            ],
          }),
          e.jsx('div', {
            className: 'h-3 bg-beige-100 rounded-full overflow-hidden',
            children: e.jsx('div', {
              className: 'h-full bg-green-600 transition-all duration-300',
              style: { width: `${c}%` },
            }),
          }),
          e.jsxs('p', {
            className: 'text-sm text-brown-600 mt-2',
            children: [d, ' of ', i, ' lessons completed'],
          }),
        ],
      }),
      e.jsx('div', {
        className: 'space-y-4',
        children: n.map((n, i) => {
          const d = n.lessons.filter((e) => e.completed).length,
            c = n.lessons.length,
            o = c > 0 ? (d / c) * 100 : 0;
          return e.jsxs(
            'div',
            {
              className: 'border-b border-brown-100 pb-4 last:border-0',
              children: [
                e.jsxs('div', {
                  className: 'mb-3',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center justify-between mb-1',
                      children: [
                        e.jsxs('h4', {
                          className: 'font-semibold text-brown-900',
                          children: ['Module ', i + 1, ': ', n.title],
                        }),
                        e.jsxs('span', {
                          className: 'text-xs text-brown-600',
                          children: [d, '/', c],
                        }),
                      ],
                    }),
                    e.jsx('div', {
                      className:
                        'h-1.5 bg-beige-100 rounded-full overflow-hidden',
                      children: e.jsx('div', {
                        className:
                          'h-full bg-green-600 transition-all duration-300',
                        style: { width: `${o}%` },
                      }),
                    }),
                  ],
                }),
                e.jsx('div', {
                  className: 'space-y-2 ml-4',
                  children: n.lessons.map((n, i) => {
                    const d = n.id === r,
                      c = !n.locked;
                    return e.jsxs(
                      'button',
                      {
                        onClick: () => c && (null == a ? void 0 : a(n.id)),
                        disabled: !c,
                        className:
                          'w-full flex items-center gap-3 p-2 rounded-lg text-left transition ' +
                          (d
                            ? 'bg-green-50 border border-green-200'
                            : c
                              ? 'hover:bg-beige-50'
                              : 'opacity-50 cursor-not-allowed'),
                        children: [
                          e.jsx('div', {
                            className: 'flex-shrink-0',
                            children: n.completed
                              ? e.jsx(s, {
                                  className: 'w-5 h-5 text-green-600',
                                })
                              : n.locked
                                ? e.jsx(l, {
                                    className: 'w-5 h-5 text-brown-400',
                                  })
                                : e.jsx(t, {
                                    className: 'w-5 h-5 text-brown-300',
                                  }),
                          }),
                          e.jsx('div', {
                            className: 'flex-1 min-w-0',
                            children: e.jsxs('p', {
                              className:
                                'text-sm font-medium truncate ' +
                                (d ? 'text-green-700' : 'text-brown-900'),
                              children: [i + 1, '. ', n.title],
                            }),
                          }),
                          d &&
                            e.jsx('div', {
                              className: 'flex-shrink-0',
                              children: e.jsx('div', {
                                className: 'w-2 h-2 bg-green-600 rounded-full',
                              }),
                            }),
                        ],
                      },
                      n.id
                    );
                  }),
                }),
              ],
            },
            n.id
          );
        }),
      }),
      100 === c &&
        e.jsxs('div', {
          className:
            'mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center',
          children: [
            e.jsx(s, { className: 'w-8 h-8 text-green-600 mx-auto mb-2' }),
            e.jsx('p', {
              className: 'font-semibold text-green-900',
              children: 'Course Completed!',
            }),
            e.jsx('p', {
              className: 'text-sm text-green-700 mt-1',
              children: 'Congratulations on finishing all lessons',
            }),
          ],
        }),
    ],
  });
}
function b() {
  const { courseId: s } = u(),
    l = j(),
    [t, b] = n.useState(null),
    [g, f] = n.useState(!0);
  n.useEffect(() => {
    (async () => {
      f(!0);
      const e = {
        id: s || '1',
        title: 'Barber Apprenticeship Program',
        description:
          'Comprehensive training program covering all aspects of professional barbering, from basic cuts to advanced styling techniques.',
        instructor: 'Master Barber John Smith',
        duration: '12 weeks',
        students: 45,
        modules: [
          {
            id: 'm1',
            title: 'Introduction to Barbering',
            lessons: [
              {
                id: 'l1',
                title: 'History of Barbering',
                completed: !0,
                locked: !1,
              },
              {
                id: 'l2',
                title: 'Tools and Equipment',
                completed: !0,
                locked: !1,
              },
              {
                id: 'l3',
                title: 'Safety and Sanitation',
                completed: !1,
                locked: !1,
              },
            ],
          },
          {
            id: 'm2',
            title: 'Basic Cutting Techniques',
            lessons: [
              {
                id: 'l4',
                title: 'Clipper Techniques',
                completed: !1,
                locked: !1,
              },
              {
                id: 'l5',
                title: 'Scissor Techniques',
                completed: !1,
                locked: !0,
              },
              {
                id: 'l6',
                title: 'Blending and Fading',
                completed: !1,
                locked: !0,
              },
            ],
          },
          {
            id: 'm3',
            title: 'Advanced Styling',
            lessons: [
              { id: 'l7', title: 'Modern Styles', completed: !1, locked: !0 },
              { id: 'l8', title: 'Classic Styles', completed: !1, locked: !0 },
              { id: 'l9', title: 'Beard Grooming', completed: !1, locked: !0 },
            ],
          },
        ],
      };
      setTimeout(() => {
        (b(e), f(!1));
      }, 500);
    })();
  }, [s]);
  return g
    ? e.jsxs('div', {
        children: [
          e.jsx(r, {
            children: e.jsx('title', {
              children: 'Loading... | Elevate for Humanity',
            }),
          }),
          e.jsx(m, {}),
          e.jsx('div', {
            className: 'min-h-screen flex items-center justify-center',
            children: e.jsxs('div', {
              className: 'text-center',
              children: [
                e.jsx('div', {
                  className:
                    'animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4',
                }),
                e.jsx('p', {
                  className: 'text-brown-600',
                  children: 'Loading course...',
                }),
              ],
            }),
          }),
          e.jsx(x, {}),
        ],
      })
    : t
      ? e.jsxs('div', {
          children: [
            e.jsx(r, {
              children: e.jsxs('title', {
                children: [t.title, ' | Elevate for Humanity'],
              }),
            }),
            e.jsx(m, {}),
            e.jsx('div', {
              className:
                'bg-gradient-to-r from-brown-700 to-brown-800 text-white py-12',
              children: e.jsx('div', {
                className: 'container mx-auto px-4',
                children: e.jsxs('div', {
                  className: 'max-w-4xl',
                  children: [
                    e.jsx('h1', {
                      className: 'text-4xl font-bold mb-4',
                      children: t.title,
                    }),
                    e.jsx('p', {
                      className: 'text-xl text-white/90 mb-6',
                      children: t.description,
                    }),
                    e.jsxs('div', {
                      className: 'flex flex-wrap gap-6 text-sm',
                      children: [
                        e.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            e.jsx(a, { className: 'w-5 h-5' }),
                            e.jsxs('span', {
                              children: [t.modules.length, ' Modules'],
                            }),
                          ],
                        }),
                        e.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            e.jsx(i, { className: 'w-5 h-5' }),
                            e.jsx('span', { children: t.duration }),
                          ],
                        }),
                        e.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            e.jsx(d, { className: 'w-5 h-5' }),
                            e.jsxs('span', {
                              children: [t.students, ' Students'],
                            }),
                          ],
                        }),
                        e.jsxs('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            e.jsx(c, { className: 'w-5 h-5' }),
                            e.jsx('span', {
                              children: 'Certificate upon completion',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            e.jsx('div', {
              className: 'container mx-auto px-4 py-12',
              children: e.jsxs('div', {
                className: 'grid lg:grid-cols-3 gap-8',
                children: [
                  e.jsxs('div', {
                    className: 'lg:col-span-2',
                    children: [
                      e.jsxs('div', {
                        className:
                          'bg-white rounded-lg shadow-sm border border-brown-200 p-6 mb-6',
                        children: [
                          e.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-4',
                            children: 'About This Course',
                          }),
                          e.jsx('p', {
                            className: 'text-brown-700 mb-6',
                            children: t.description,
                          }),
                          e.jsxs('div', {
                            className: 'flex items-center gap-4 mb-6',
                            children: [
                              e.jsx('img', {
                                src: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.instructor)}&background=00a544&color=fff`,
                                alt: t.instructor,
                                className: 'w-12 h-12 rounded-full',
                              }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('p', {
                                    className: 'text-sm text-brown-600',
                                    children: 'Instructor',
                                  }),
                                  e.jsx('p', {
                                    className: 'font-semibold text-brown-900',
                                    children: t.instructor,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsxs(h, {
                            onClick: () => {
                              const e =
                                null == t
                                  ? void 0
                                  : t.modules
                                      .flatMap((e) => e.lessons)
                                      .find((e) => !e.completed && !e.locked);
                              e && l(`/lms/courses/${s}/lessons/${e.id}`);
                            },
                            variant: 'primary',
                            size: 'large',
                            className: 'w-full sm:w-auto',
                            children: [
                              e.jsx(o, { className: 'w-5 h-5 mr-2' }),
                              'Continue Learning',
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className:
                          'bg-white rounded-lg shadow-sm border border-brown-200 p-6',
                        children: [
                          e.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-4',
                            children: "What You'll Learn",
                          }),
                          e.jsxs('ul', {
                            className: 'space-y-3',
                            children: [
                              e.jsxs('li', {
                                className: 'flex items-start gap-3',
                                children: [
                                  e.jsx('div', {
                                    className:
                                      'w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                                    children: e.jsx('span', {
                                      className: 'text-green-600 text-sm',
                                      children: '✓',
                                    }),
                                  }),
                                  e.jsx('span', {
                                    className: 'text-brown-700',
                                    children:
                                      'Master fundamental barbering techniques and tools',
                                  }),
                                ],
                              }),
                              e.jsxs('li', {
                                className: 'flex items-start gap-3',
                                children: [
                                  e.jsx('div', {
                                    className:
                                      'w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                                    children: e.jsx('span', {
                                      className: 'text-green-600 text-sm',
                                      children: '✓',
                                    }),
                                  }),
                                  e.jsx('span', {
                                    className: 'text-brown-700',
                                    children:
                                      'Learn advanced cutting and styling methods',
                                  }),
                                ],
                              }),
                              e.jsxs('li', {
                                className: 'flex items-start gap-3',
                                children: [
                                  e.jsx('div', {
                                    className:
                                      'w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                                    children: e.jsx('span', {
                                      className: 'text-green-600 text-sm',
                                      children: '✓',
                                    }),
                                  }),
                                  e.jsx('span', {
                                    className: 'text-brown-700',
                                    children:
                                      'Understand safety, sanitation, and professional standards',
                                  }),
                                ],
                              }),
                              e.jsxs('li', {
                                className: 'flex items-start gap-3',
                                children: [
                                  e.jsx('div', {
                                    className:
                                      'w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                                    children: e.jsx('span', {
                                      className: 'text-green-600 text-sm',
                                      children: '✓',
                                    }),
                                  }),
                                  e.jsx('span', {
                                    className: 'text-brown-700',
                                    children:
                                      'Gain hands-on experience with real clients',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'lg:col-span-1',
                    children: e.jsx(p, {
                      modules: t.modules,
                      onLessonClick: (e) => {
                        l(`/lms/courses/${s}/lessons/${e}`);
                      },
                    }),
                  }),
                ],
              }),
            }),
            e.jsx(x, {}),
          ],
        })
      : e.jsxs('div', {
          children: [
            e.jsx(r, {
              children: e.jsx('title', {
                children: 'Course Not Found | Elevate for Humanity',
              }),
            }),
            e.jsx(m, {}),
            e.jsx('div', {
              className: 'min-h-screen flex items-center justify-center',
              children: e.jsxs('div', {
                className: 'text-center',
                children: [
                  e.jsx('h1', {
                    className: 'text-2xl font-bold text-brown-900 mb-4',
                    children: 'Course Not Found',
                  }),
                  e.jsx(h, {
                    onClick: () => l('/lms/courses'),
                    children: 'Back to Courses',
                  }),
                ],
              }),
            }),
            e.jsx(x, {}),
          ],
        });
}
export { b as default };

import {
  r as e,
  j as s,
  g as t,
  am as n,
  A as i,
  u as r,
  H as a,
} from './vendor-react-C-ZQNdj3.js';
import { N as o } from './Navigation-Bbm4Xzc1.js';
import { F as l } from './Footer-Dh9yHrAI.js';
import { u as c } from './AuthContext-D_Hfa_pA.js';
import { c as d, d as x } from './certificates-Y_9npsL2.js';
import { c as m, u as h } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
import './supabaseClient-DCQoDyvc.js';
import './vendor-supabase-C00Cu5KO.js';
import './supa-DdKhhKHf.js';
function p({
  questions: a,
  title: o,
  timeLimit: l,
  passingScore: c = 70,
  onComplete: d,
  onExit: x,
}) {
  const [m, h] = e.useState(0),
    [p, b] = e.useState(new Map()),
    [g, u] = e.useState(!1),
    [j, f] = e.useState(l ? 60 * l : null),
    [w] = e.useState(Date.now()),
    [N, v] = e.useState(!1),
    y = a[m],
    S = m === a.length - 1,
    q = a.reduce((e, s) => e + s.points, 0);
  e.useEffect(() => {
    if (!l || g) return;
    const e = setInterval(() => {
      f((e) => (null === e || e <= 0 ? (T(), 0) : e - 1));
    }, 1e3);
    return () => clearInterval(e);
  }, [l, g]);
  const k = (e) =>
      `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, '0')}`,
    C = () => {
      let e = 0;
      const s = [];
      a.forEach((t) => {
        const n = p.get(t.id) || [],
          i = ((e, s) => {
            const t = a.find((s) => s.id === e);
            if (!t) return !1;
            const n = t.correctAnswers.sort(),
              i = s.sort();
            return n.length === i.length && n.every((e, s) => e === i[s]);
          })(t.id, n),
          r = i ? t.points : 0;
        ((e += r),
          s.push({
            questionId: t.id,
            selectedAnswers: n,
            correct: i,
            points: r,
          }));
      });
      const t = (e / q) * 100,
        n = Math.floor((Date.now() - w) / 1e3);
      return {
        score: e,
        totalPoints: q,
        percentage: t,
        passed: t >= c,
        answers: s,
        timeSpent: n,
      };
    },
    T = () => {
      const e = C();
      (u(!0), d(e));
    },
    A = p.get(y.id) || [];
  if (g) {
    const e = C();
    return s.jsx('div', {
      className: 'max-w-2xl mx-auto',
      children: s.jsxs('div', {
        className: 'bg-white rounded-lg shadow-lg p-8',
        children: [
          s.jsxs('div', {
            className: 'text-center mb-8',
            children: [
              s.jsx('div', {
                className: 'mb-4',
                children: e.passed
                  ? s.jsx(t, { className: 'w-16 h-16 text-green-600 mx-auto' })
                  : s.jsx(n, { className: 'w-16 h-16 text-red-600 mx-auto' }),
              }),
              s.jsx('h2', {
                className: 'text-3xl font-bold text-brown-900 mb-2',
                children: e.passed ? 'Congratulations!' : 'Keep Practicing',
              }),
              s.jsx('p', {
                className: 'text-brown-600',
                children: e.passed
                  ? 'You passed the assessment!'
                  : `You need ${c}% to pass. Try again!`,
              }),
            ],
          }),
          s.jsxs('div', {
            className: 'grid grid-cols-3 gap-4 mb-8',
            children: [
              s.jsxs('div', {
                className: 'text-center p-4 bg-beige-50 rounded-lg',
                children: [
                  s.jsxs('div', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: [Math.round(e.percentage), '%'],
                  }),
                  s.jsx('div', {
                    className: 'text-sm text-brown-600',
                    children: 'Score',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'text-center p-4 bg-beige-50 rounded-lg',
                children: [
                  s.jsxs('div', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: [e.score, '/', e.totalPoints],
                  }),
                  s.jsx('div', {
                    className: 'text-sm text-brown-600',
                    children: 'Points',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'text-center p-4 bg-beige-50 rounded-lg',
                children: [
                  s.jsx('div', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: k(e.timeSpent),
                  }),
                  s.jsx('div', {
                    className: 'text-sm text-brown-600',
                    children: 'Time',
                  }),
                ],
              }),
            ],
          }),
          s.jsxs('div', {
            className: 'mb-8',
            children: [
              s.jsx('h3', {
                className: 'text-xl font-bold text-brown-900 mb-4',
                children: 'Review',
              }),
              s.jsx('div', {
                className: 'space-y-3',
                children: a.map((i, r) => {
                  const a = e.answers[r];
                  return s.jsx(
                    'div',
                    {
                      className:
                        'p-4 rounded-lg border-2 ' +
                        (a.correct
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'),
                      children: s.jsxs('div', {
                        className: 'flex items-start gap-3',
                        children: [
                          a.correct
                            ? s.jsx(t, {
                                className:
                                  'w-5 h-5 text-green-600 flex-shrink-0 mt-0.5',
                              })
                            : s.jsx(n, {
                                className:
                                  'w-5 h-5 text-red-600 flex-shrink-0 mt-0.5',
                              }),
                          s.jsxs('div', {
                            className: 'flex-1',
                            children: [
                              s.jsxs('p', {
                                className: 'font-medium text-brown-900',
                                children: [
                                  'Question ',
                                  r + 1,
                                  ': ',
                                  i.question,
                                ],
                              }),
                              s.jsxs('p', {
                                className: 'text-sm text-brown-600 mt-1',
                                children: [a.points, '/', i.points, ' points'],
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    i.id
                  );
                }),
              }),
            ],
          }),
          s.jsxs('div', {
            className: 'flex gap-4 justify-center',
            children: [
              !e.passed &&
                s.jsx('button', {
                  onClick: () => window.location.reload(),
                  className:
                    'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition',
                  children: 'Try Again',
                }),
              e.passed &&
                s.jsxs('button', {
                  onClick: () => (null == x ? void 0 : x()),
                  className:
                    'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2',
                  children: [
                    s.jsx(i, { className: 'w-5 h-5' }),
                    'Continue to Certificate',
                  ],
                }),
            ],
          }),
        ],
      }),
    });
  }
  return s.jsxs('div', {
    className: 'max-w-3xl mx-auto',
    children: [
      s.jsxs('div', {
        className:
          'bg-white rounded-lg shadow-sm border border-brown-200 p-6 mb-6',
        children: [
          s.jsxs('div', {
            className: 'flex items-center justify-between mb-4',
            children: [
              s.jsx('h2', {
                className: 'text-2xl font-bold text-brown-900',
                children: o,
              }),
              null !== j &&
                s.jsxs('div', {
                  className: 'flex items-center gap-2 text-brown-600',
                  children: [
                    s.jsx(r, { className: 'w-5 h-5' }),
                    s.jsx('span', {
                      className: 'font-mono font-semibold',
                      children: k(j),
                    }),
                  ],
                }),
            ],
          }),
          s.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              s.jsx('div', {
                className:
                  'flex-1 h-2 bg-beige-100 rounded-full overflow-hidden',
                children: s.jsx('div', {
                  className: 'h-full bg-green-600 transition-all duration-300',
                  style: { width: ((m + 1) / a.length) * 100 + '%' },
                }),
              }),
              s.jsxs('span', {
                className: 'text-sm text-brown-600 whitespace-nowrap',
                children: [m + 1, ' / ', a.length],
              }),
            ],
          }),
        ],
      }),
      s.jsxs('div', {
        className: 'bg-white rounded-lg shadow-lg p-8 mb-6',
        children: [
          s.jsxs('div', {
            className: 'mb-6',
            children: [
              s.jsxs('div', {
                className: 'flex items-start justify-between mb-4',
                children: [
                  s.jsxs('h3', {
                    className: 'text-xl font-bold text-brown-900',
                    children: ['Question ', m + 1],
                  }),
                  s.jsxs('span', {
                    className:
                      'px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold',
                    children: [
                      y.points,
                      ' ',
                      1 === y.points ? 'point' : 'points',
                    ],
                  }),
                ],
              }),
              s.jsx('p', {
                className: 'text-lg text-brown-700',
                children: y.question,
              }),
              'multiple-select' === y.type &&
                s.jsx('p', {
                  className: 'text-sm text-brown-500 mt-2',
                  children: 'Select all that apply',
                }),
            ],
          }),
          s.jsx('div', {
            className: 'space-y-3',
            children: y.options.map((e, n) => {
              const i = A.includes(n);
              return s.jsx(
                'button',
                {
                  onClick: () =>
                    ((e) => {
                      const s = p.get(y.id) || [];
                      if ('multiple-select' === y.type) {
                        const t = s.includes(e)
                          ? s.filter((s) => s !== e)
                          : [...s, e];
                        b(new Map(p.set(y.id, t)));
                      } else b(new Map(p.set(y.id, [e])));
                    })(n),
                  className:
                    'w-full text-left p-4 rounded-lg border-2 transition ' +
                    (i
                      ? 'border-green-600 bg-green-50'
                      : 'border-brown-200 hover:border-brown-300 hover:bg-beige-50'),
                  children: s.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      s.jsx('div', {
                        className:
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ' +
                          (i
                            ? 'border-green-600 bg-green-600'
                            : 'border-brown-300'),
                        children:
                          i && s.jsx(t, { className: 'w-4 h-4 text-white' }),
                      }),
                      s.jsx('span', {
                        className: 'text-brown-900',
                        children: e,
                      }),
                    ],
                  }),
                },
                n
              );
            }),
          }),
          N &&
            y.explanation &&
            s.jsxs('div', {
              className:
                'mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg',
              children: [
                s.jsx('p', {
                  className: 'text-sm font-semibold text-blue-900 mb-1',
                  children: 'Explanation:',
                }),
                s.jsx('p', {
                  className: 'text-sm text-blue-800',
                  children: y.explanation,
                }),
              ],
            }),
        ],
      }),
      s.jsxs('div', {
        className: 'flex items-center justify-between',
        children: [
          s.jsx('button', {
            onClick: () => {
              (v(!1), m > 0 && h(m - 1));
            },
            disabled: 0 === m,
            className:
              'px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition disabled:opacity-50 disabled:cursor-not-allowed',
            children: 'Previous',
          }),
          s.jsxs('div', {
            className: 'flex gap-3',
            children: [
              y.explanation &&
                s.jsxs('button', {
                  onClick: () => v(!N),
                  className:
                    'px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition',
                  children: [N ? 'Hide' : 'Show', ' Explanation'],
                }),
              s.jsx('button', {
                onClick: () => {
                  (v(!1), S ? T() : h(m + 1));
                },
                disabled: 0 === A.length,
                className:
                  'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed',
                children: S ? 'Submit Quiz' : 'Next',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function b() {
  const t = m(),
    { courseId: n, quizId: i } = h(),
    { user: r } = c(),
    [b, g] = e.useState(!1),
    [u, j] = e.useState(!1),
    f = {
      title: 'Module 1 Assessment: Introduction to Barbering',
      description:
        'Test your knowledge of barbering history, tools, and safety practices.',
      timeLimit: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question:
            'What is the primary purpose of sanitizing barbering tools?',
          type: 'multiple-choice',
          options: [
            'To make them look clean',
            'To prevent the spread of infections and diseases',
            'To extend the life of the tools',
            'To comply with shop regulations only',
          ],
          correctAnswers: [1],
          explanation:
            'Sanitizing tools is crucial for preventing the spread of infections and diseases between clients, ensuring public health and safety.',
          points: 10,
        },
        {
          id: 'q2',
          question:
            'Which of the following are essential tools for a professional barber?',
          type: 'multiple-select',
          options: [
            'Clippers',
            'Scissors',
            'Comb',
            'Hair dryer',
            'Straight razor',
          ],
          correctAnswers: [0, 1, 2, 4],
          explanation:
            "Clippers, scissors, combs, and straight razors are fundamental tools. While a hair dryer is useful, it's not considered essential for basic barbering.",
          points: 15,
        },
        {
          id: 'q3',
          question:
            "The barber pole's red and white stripes originally symbolized blood and bandages.",
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswers: [0],
          explanation:
            "True. The barber pole's colors have historical significance, with red representing blood and white representing bandages, dating back to when barbers also performed minor surgical procedures.",
          points: 5,
        },
        {
          id: 'q4',
          question:
            'What is the recommended angle for holding scissors when cutting hair?',
          type: 'multiple-choice',
          options: [
            '90 degrees (perpendicular to the head)',
            '45 degrees',
            '30 degrees',
            'Parallel to the head',
          ],
          correctAnswers: [1],
          explanation:
            'A 45-degree angle is generally recommended as it provides the best control and creates natural-looking layers.',
          points: 10,
        },
        {
          id: 'q5',
          question:
            'Which of the following are proper safety practices in a barbershop?',
          type: 'multiple-select',
          options: [
            'Disinfecting tools between clients',
            'Using a new blade for each client',
            'Washing hands before and after each service',
            'Sharing tools between barbers to save time',
            'Properly disposing of used blades in a sharps container',
          ],
          correctAnswers: [0, 1, 2, 4],
          explanation:
            'All options except sharing tools are proper safety practices. Tools should never be shared without proper sanitization.',
          points: 20,
        },
      ],
    },
    w = () => {
      t(`/lms/courses/${n}`);
    };
  return b
    ? s.jsxs('div', {
        children: [
          s.jsx(a, {
            children: s.jsxs('title', {
              children: [f.title, ' | Elevate for Humanity'],
            }),
          }),
          s.jsx(o, {}),
          s.jsx('div', {
            className: 'min-h-screen bg-beige-50 py-12',
            children: s.jsx('div', {
              className: 'container mx-auto px-4',
              children: s.jsx(p, {
                questions: f.questions,
                title: f.title,
                timeLimit: f.timeLimit,
                passingScore: f.passingScore,
                onComplete: async (e) => {
                  if ((console.log('Quiz completed:', e), e.passed && r && n))
                    try {
                      j(!0);
                      if (await d(r.id, n)) {
                        const e = await x(r.id, n);
                        setTimeout(() => {
                          t(`/certificate/${e.id}`);
                        }, 3e3);
                      } else
                        setTimeout(() => {
                          t(`/lms/courses/${n}`);
                        }, 3e3);
                    } catch (s) {
                      (console.error('Error checking completion:', s),
                        setTimeout(() => {
                          t(`/lms/courses/${n}`);
                        }, 3e3));
                    } finally {
                      j(!1);
                    }
                },
                onExit: w,
              }),
            }),
          }),
          s.jsx(l, {}),
        ],
      })
    : s.jsxs('div', {
        children: [
          s.jsx(a, {
            children: s.jsxs('title', {
              children: [f.title, ' | Elevate for Humanity'],
            }),
          }),
          s.jsx(o, {}),
          s.jsx('div', {
            className: 'min-h-screen bg-beige-50 py-12',
            children: s.jsx('div', {
              className: 'container mx-auto px-4',
              children: s.jsx('div', {
                className: 'max-w-2xl mx-auto',
                children: s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow-lg p-8',
                  children: [
                    s.jsx('h1', {
                      className: 'text-3xl font-bold text-brown-900 mb-4',
                      children: f.title,
                    }),
                    s.jsx('p', {
                      className: 'text-brown-700 mb-6',
                      children: f.description,
                    }),
                    s.jsxs('div', {
                      className: 'bg-beige-50 rounded-lg p-6 mb-6',
                      children: [
                        s.jsx('h2', {
                          className: 'text-lg font-bold text-brown-900 mb-4',
                          children: 'Quiz Information',
                        }),
                        s.jsxs('ul', {
                          className: 'space-y-2 text-brown-700',
                          children: [
                            s.jsxs('li', {
                              className: 'flex items-center gap-2',
                              children: [
                                s.jsx('span', {
                                  className: 'text-green-600',
                                  children: '•',
                                }),
                                s.jsxs('span', {
                                  children: [f.questions.length, ' questions'],
                                }),
                              ],
                            }),
                            s.jsxs('li', {
                              className: 'flex items-center gap-2',
                              children: [
                                s.jsx('span', {
                                  className: 'text-green-600',
                                  children: '•',
                                }),
                                s.jsxs('span', {
                                  children: [
                                    'Time limit: ',
                                    f.timeLimit,
                                    ' minutes',
                                  ],
                                }),
                              ],
                            }),
                            s.jsxs('li', {
                              className: 'flex items-center gap-2',
                              children: [
                                s.jsx('span', {
                                  className: 'text-green-600',
                                  children: '•',
                                }),
                                s.jsxs('span', {
                                  children: [
                                    'Passing score: ',
                                    f.passingScore,
                                    '%',
                                  ],
                                }),
                              ],
                            }),
                            s.jsxs('li', {
                              className: 'flex items-center gap-2',
                              children: [
                                s.jsx('span', {
                                  className: 'text-green-600',
                                  children: '•',
                                }),
                                s.jsxs('span', {
                                  children: [
                                    'Total points:',
                                    ' ',
                                    f.questions.reduce(
                                      (e, s) => e + s.points,
                                      0
                                    ),
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
                        'bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6',
                      children: s.jsxs('p', {
                        className: 'text-sm text-yellow-800',
                        children: [
                          s.jsx('strong', { children: 'Important:' }),
                          ' Once you start the quiz, the timer will begin. Make sure you have a stable internet connection and enough time to complete it.',
                        ],
                      }),
                    }),
                    s.jsxs('div', {
                      className: 'flex gap-4',
                      children: [
                        s.jsx('button', {
                          onClick: () => g(!0),
                          className:
                            'flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold',
                          children: 'Start Quiz',
                        }),
                        s.jsx('button', {
                          onClick: w,
                          className:
                            'px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition',
                          children: 'Cancel',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          }),
          s.jsx(l, {}),
        ],
      });
}
export { b as default };

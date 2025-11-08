import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import { supabase as r } from './supabaseClient-DCQoDyvc.js';
import { A as t } from './AppLayout-DjgAzEIN.js';
import { u as n } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
function a() {
  var a;
  const { quizId: o } = n(),
    [d, l] = e.useState(!0),
    [i, c] = e.useState(null),
    [u, x] = e.useState(null);
  e.useEffect(() => {
    m();
  }, [o]);
  const m = async () => {
    if (!r) return (x('Database service is not available'), void l(!1));
    try {
      (l(!0), x(null));
      const {
        data: { user: e },
      } = await r.auth.getUser();
      if (!e) return void x('Please log in to view quiz results');
      const { data: s, error: t } = await r
        .from('quiz_responses')
        .select(
          '\n          *,\n          quiz_questions (\n            id,\n            prompt,\n            options,\n            answer,\n            lesson_id\n          )\n        '
        )
        .eq('user_id', e.id)
        .order('created_at', { ascending: !1 });
      if (t) throw t;
      let n = 0,
        a = (null == s ? void 0 : s.length) || 0;
      null == s ||
        s.forEach((e) => {
          var s;
          e.answer === (null == (s = e.quiz_questions) ? void 0 : s.answer) &&
            n++;
        });
      const o = a > 0 ? Math.round((n / a) * 100) : 0;
      c({ responses: s, correct: n, total: a, score: o, passed: o >= 70 });
    } catch (e) {
      (console.error('Error fetching quiz results:', e), x(e.message));
    } finally {
      l(!1);
    }
  };
  return s.jsx(t, {
    children: s.jsxs('div', {
      className: 'container mx-auto px-4 py-8',
      children: [
        s.jsx('h1', {
          className: 'text-3xl font-bold mb-6',
          children: 'Quiz Results',
        }),
        d
          ? s.jsxs('div', {
              className: 'text-center py-12',
              children: [
                s.jsx('div', {
                  className:
                    'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto',
                }),
                s.jsx('p', {
                  className: 'mt-4 text-brown-600',
                  children: 'Loading results...',
                }),
              ],
            })
          : u
            ? s.jsx('div', {
                className: 'bg-red-50 border border-red-200 rounded-lg p-6',
                children: s.jsx('p', {
                  className: 'text-red-800',
                  children: u,
                }),
              })
            : i
              ? s.jsxs('div', {
                  className: 'space-y-6',
                  children: [
                    s.jsxs('div', {
                      className:
                        'rounded-lg shadow-lg p-8 text-center ' +
                        (i.passed
                          ? 'bg-green-50 border-2 border-green-500'
                          : 'bg-red-50 border-2 border-red-500'),
                      children: [
                        s.jsxs('h2', {
                          className: 'text-5xl font-bold mb-4',
                          children: [i.score, '%'],
                        }),
                        s.jsxs('p', {
                          className: 'text-2xl mb-2',
                          children: [
                            i.correct,
                            ' out of ',
                            i.total,
                            ' correct',
                          ],
                        }),
                        s.jsx('p', {
                          className:
                            'text-xl font-semibold ' +
                            (i.passed ? 'text-green-700' : 'text-red-700'),
                          children: i.passed
                            ? '✓ Passed'
                            : '✗ Failed - 70% required to pass',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white rounded-lg shadow p-6',
                      children: [
                        s.jsx('h3', {
                          className: 'text-2xl font-bold mb-4',
                          children: 'Question Review',
                        }),
                        s.jsx('div', {
                          className: 'space-y-4',
                          children:
                            null == (a = i.responses)
                              ? void 0
                              : a.map((e, r) => {
                                  var t, n, a;
                                  const o =
                                    e.answer ===
                                    (null == (t = e.quiz_questions)
                                      ? void 0
                                      : t.answer);
                                  return s.jsxs(
                                    'div',
                                    {
                                      className:
                                        'p-4 rounded-lg border-2 ' +
                                        (o
                                          ? 'bg-green-50 border-green-300'
                                          : 'bg-red-50 border-red-300'),
                                      children: [
                                        s.jsxs('div', {
                                          className:
                                            'flex items-start justify-between mb-2',
                                          children: [
                                            s.jsxs('p', {
                                              className: 'font-semibold',
                                              children: ['Question ', r + 1],
                                            }),
                                            s.jsx('span', {
                                              className:
                                                'px-3 py-1 rounded-full text-sm font-bold ' +
                                                (o
                                                  ? 'bg-green-200 text-green-600'
                                                  : 'bg-red-200 text-red-800'),
                                              children: o
                                                ? 'Correct'
                                                : 'Incorrect',
                                            }),
                                          ],
                                        }),
                                        s.jsx('p', {
                                          className: 'mb-3',
                                          children:
                                            null == (n = e.quiz_questions)
                                              ? void 0
                                              : n.prompt,
                                        }),
                                        s.jsxs('div', {
                                          className: 'space-y-1 text-sm',
                                          children: [
                                            s.jsxs('p', {
                                              children: [
                                                s.jsx('strong', {
                                                  children: 'Your answer:',
                                                }),
                                                ' ',
                                                e.answer || 'No answer',
                                              ],
                                            }),
                                            !o &&
                                              s.jsxs('p', {
                                                className: 'text-green-700',
                                                children: [
                                                  s.jsx('strong', {
                                                    children: 'Correct answer:',
                                                  }),
                                                  ' ',
                                                  null == (a = e.quiz_questions)
                                                    ? void 0
                                                    : a.answer,
                                                ],
                                              }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e.question_id
                                  );
                                }),
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'flex gap-4 justify-center',
                      children: [
                        s.jsx('button', {
                          onClick: () => window.history.back(),
                          className:
                            'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition',
                          children: 'Back to Course',
                        }),
                        !i.passed &&
                          s.jsx('button', {
                            onClick: () => window.location.reload(),
                            className:
                              'px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition',
                            children: 'Retake Quiz',
                          }),
                      ],
                    }),
                  ],
                })
              : s.jsx('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: s.jsx('p', {
                    className: 'text-brown-600',
                    children: 'No quiz results found',
                  }),
                }),
      ],
    }),
  });
}
export { a as default };

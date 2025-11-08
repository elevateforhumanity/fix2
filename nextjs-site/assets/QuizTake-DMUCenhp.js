import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import { supabase as t } from './supabaseClient-DCQoDyvc.js';
import { A as r } from './AppLayout-DjgAzEIN.js';
import { u as a, c as i } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
function n() {
  var n;
  const { lessonId: l } = a(),
    o = i(),
    [d, c] = e.useState(!0),
    [u, h] = e.useState([]),
    [m, b] = e.useState({}),
    [x, g] = e.useState(!1),
    [p, j] = e.useState(null),
    [f, v] = e.useState(0);
  e.useEffect(() => {
    w();
  }, [l]);
  const w = async () => {
      if (!t) return (j('Database service is not available'), void c(!1));
      try {
        (c(!0), j(null));
        const {
          data: { user: e },
        } = await t.auth.getUser();
        if (!e) return void j('Please log in to take the quiz');
        const { data: s, error: r } = await t
          .from('quiz_questions')
          .select('*')
          .eq('lesson_id', l)
          .order('id');
        if (r) throw r;
        if (!s || 0 === s.length)
          return void j('No quiz questions found for this lesson');
        h(s);
      } catch (e) {
        (console.error('Error fetching quiz questions:', e), j(e.message));
      } finally {
        c(!1);
      }
    },
    N = u.length > 0 ? Math.round(((f + 1) / u.length) * 100) : 0;
  return s.jsx(r, {
    children: s.jsxs('div', {
      className: 'container mx-auto px-4 py-8 max-w-3xl',
      children: [
        s.jsx('h1', {
          className: 'text-3xl font-bold mb-6',
          children: 'Take Quiz',
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
                  children: 'Loading quiz...',
                }),
              ],
            })
          : p
            ? s.jsxs('div', {
                className: 'bg-red-50 border border-red-200 rounded-lg p-6',
                children: [
                  s.jsx('p', { className: 'text-red-800', children: p }),
                  s.jsx('button', {
                    onClick: () => window.history.back(),
                    className:
                      'mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600-hover',
                    children: 'Go Back',
                  }),
                ],
              })
            : u.length > 0
              ? s.jsxs('div', {
                  className: 'space-y-6',
                  children: [
                    s.jsxs('div', {
                      className: 'bg-white rounded-lg shadow p-4',
                      children: [
                        s.jsxs('div', {
                          className: 'flex justify-between mb-2',
                          children: [
                            s.jsxs('span', {
                              className: 'text-sm font-medium',
                              children: ['Question ', f + 1, ' of ', u.length],
                            }),
                            s.jsxs('span', {
                              className: 'text-sm font-medium',
                              children: [N, '%'],
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className: 'w-full bg-brown-200 rounded-full h-2',
                          children: s.jsx('div', {
                            className:
                              'bg-green-600 h-2 rounded-full transition-all duration-300',
                            style: { width: `${N}%` },
                          }),
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white rounded-lg shadow-lg p-8',
                      children: [
                        s.jsx('h2', {
                          className: 'text-2xl font-bold mb-6',
                          children: u[f].prompt,
                        }),
                        s.jsx('div', {
                          className: 'space-y-3',
                          children:
                            null == (n = u[f].options)
                              ? void 0
                              : n.map((e, t) =>
                                  s.jsxs(
                                    'label',
                                    {
                                      className:
                                        'block p-4 border-2 rounded-lg cursor-pointer transition ' +
                                        (m[u[f].id] === e
                                          ? 'border-blue-600 bg-blue-50'
                                          : 'border-brown-300 hover:border-blue-400'),
                                      children: [
                                        s.jsx('input', {
                                          type: 'radio',
                                          name: `question-${u[f].id}`,
                                          value: e,
                                          checked: m[u[f].id] === e,
                                          onChange: () => {
                                            return (
                                              (s = u[f].id),
                                              (t = e),
                                              void b((e) => ({ ...e, [s]: t }))
                                            );
                                            var s, t;
                                          },
                                          className: 'mr-3',
                                        }),
                                        s.jsx('span', {
                                          className: 'text-lg',
                                          children: e,
                                        }),
                                      ],
                                    },
                                    t
                                  )
                                ),
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'flex justify-between items-center',
                      children: [
                        s.jsx('button', {
                          onClick: () => v((e) => Math.max(0, e - 1)),
                          disabled: 0 === f,
                          className:
                            'px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition',
                          children: 'Previous',
                        }),
                        f < u.length - 1
                          ? s.jsx('button', {
                              onClick: () =>
                                v((e) => Math.min(u.length - 1, e + 1)),
                              className:
                                'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition',
                              children: 'Next',
                            })
                          : s.jsx('button', {
                              onClick: async () => {
                                if (t)
                                  try {
                                    (g(!0), j(null));
                                    const {
                                      data: { user: e },
                                    } = await t.auth.getUser();
                                    if (!e)
                                      return void j(
                                        'Please log in to submit quiz'
                                      );
                                    const s = u.map((s) => ({
                                        question_id: s.id,
                                        user_id: e.id,
                                        answer: m[s.id] || null,
                                        created_at: new Date().toISOString(),
                                      })),
                                      { error: r } = await t
                                        .from('quiz_responses')
                                        .upsert(s, {
                                          onConflict: 'question_id,user_id',
                                        });
                                    if (r) throw r;
                                    o(`/quiz-results/${l}`);
                                  } catch (e) {
                                    (console.error('Error submitting quiz:', e),
                                      j(e.message));
                                  } finally {
                                    g(!1);
                                  }
                                else j('Database service is not available');
                              },
                              disabled: x || Object.keys(m).length < u.length,
                              className:
                                'px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold',
                              children: x ? 'Submitting...' : 'Submit Quiz',
                            }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-beige-50 rounded-lg p-4',
                      children: [
                        s.jsxs('p', {
                          className: 'text-sm text-brown-600',
                          children: [
                            'Answered: ',
                            Object.keys(m).length,
                            ' / ',
                            u.length,
                          ],
                        }),
                        Object.keys(m).length < u.length &&
                          s.jsx('p', {
                            className: 'text-sm text-orange-600 mt-1',
                            children:
                              'Please answer all questions before submitting',
                          }),
                      ],
                    }),
                  ],
                })
              : s.jsx('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: s.jsx('p', {
                    className: 'text-brown-600',
                    children: 'No quiz available for this lesson',
                  }),
                }),
      ],
    }),
  });
}
export { n as default };

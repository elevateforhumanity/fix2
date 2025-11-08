import {
  r as e,
  j as t,
  M as s,
  S as r,
  aq as a,
  ar as n,
} from './vendor-react-C-ZQNdj3.js';
function i({ courseId: i, lessonId: l }) {
  const [o, d] = e.useState([
      {
        id: '1',
        author: 'John Doe',
        authorRole: 'student',
        content:
          "Can someone explain the difference between clippers and trimmers? I'm still a bit confused.",
        timestamp: new Date(Date.now() - 72e5),
        likes: 5,
        isLiked: !1,
        replies: [
          {
            id: '1-1',
            author: 'Master Barber Smith',
            authorRole: 'instructor',
            content:
              'Great question! Clippers are used for bulk hair removal and creating fades, while trimmers are for detailing and edging. Clippers have larger blades and more power.',
            timestamp: new Date(Date.now() - 36e5),
          },
          {
            id: '1-2',
            author: 'Jane Smith',
            authorRole: 'student',
            content: 'Thanks for explaining! That makes much more sense now.',
            timestamp: new Date(Date.now() - 18e5),
          },
        ],
      },
      {
        id: '2',
        author: 'Mike Johnson',
        authorRole: 'student',
        content:
          "What's the best way to practice fades at home? Any tips for beginners?",
        timestamp: new Date(Date.now() - 18e6),
        likes: 3,
        isLiked: !0,
        replies: [],
      },
    ]),
    [c, m] = e.useState(''),
    [x, h] = e.useState(null),
    [u, p] = e.useState(''),
    b = (e) => {
      const t = new Date().getTime() - e.getTime(),
        s = Math.floor(t / 6e4),
        r = Math.floor(s / 60),
        a = Math.floor(r / 24);
      return a > 0
        ? `${a}d ago`
        : r > 0
          ? `${r}h ago`
          : s > 0
            ? `${s}m ago`
            : 'Just now';
    },
    g = (e) => {
      const t = {
        instructor: 'bg-green-100 text-green-800',
        admin: 'bg-purple-100 text-purple-800',
        student: 'bg-blue-100 text-blue-800',
      };
      return t[e] || t.student;
    };
  return t.jsxs('div', {
    className: 'space-y-6',
    children: [
      t.jsxs('div', {
        className: 'card p-6',
        children: [
          t.jsxs('h3', {
            className:
              'text-lg font-bold text-brown-900 mb-4 flex items-center gap-2',
            children: [
              t.jsx(s, { className: 'w-5 h-5' }),
              'Start a Discussion',
            ],
          }),
          t.jsxs('form', {
            onSubmit: (e) => {
              if ((e.preventDefault(), !c.trim())) return;
              const t = {
                id: Date.now().toString(),
                author: 'Current User',
                authorRole: 'student',
                content: c,
                timestamp: new Date(),
                likes: 0,
                replies: [],
              };
              (d([t, ...o]), m(''));
            },
            children: [
              t.jsx('textarea', {
                value: c,
                onChange: (e) => m(e.target.value),
                placeholder: 'Ask a question or share your thoughts...',
                className:
                  'w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none',
                rows: 4,
              }),
              t.jsx('div', {
                className: 'mt-3 flex justify-end',
                children: t.jsxs('button', {
                  type: 'submit',
                  disabled: !c.trim(),
                  className:
                    'btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                  children: [t.jsx(r, { className: 'w-4 h-4' }), 'Post'],
                }),
              }),
            ],
          }),
        ],
      }),
      t.jsx('div', {
        className: 'space-y-4',
        children: o.map((e) =>
          t.jsxs(
            'div',
            {
              className: 'card p-6',
              children: [
                t.jsx('div', {
                  className: 'flex items-start justify-between mb-4',
                  children: t.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      t.jsx('div', {
                        className:
                          'w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold',
                        children: e.author.charAt(0),
                      }),
                      t.jsxs('div', {
                        children: [
                          t.jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                              t.jsx('span', {
                                className: 'font-semibold text-brown-900',
                                children: e.author,
                              }),
                              t.jsx('span', {
                                className: `text-xs px-2 py-0.5 rounded-full ${g(e.authorRole)}`,
                                children: e.authorRole,
                              }),
                            ],
                          }),
                          t.jsx('span', {
                            className: 'text-sm text-brown-500',
                            children: b(e.timestamp),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                t.jsx('p', {
                  className: 'text-brown-700 mb-4',
                  children: e.content,
                }),
                t.jsxs('div', {
                  className:
                    'flex items-center gap-4 pt-4 border-t border-brown-200',
                  children: [
                    t.jsxs('button', {
                      onClick: () => {
                        return (
                          (t = e.id),
                          void d(
                            o.map((e) =>
                              e.id === t
                                ? {
                                    ...e,
                                    likes: e.isLiked
                                      ? e.likes - 1
                                      : e.likes + 1,
                                    isLiked: !e.isLiked,
                                  }
                                : e
                            )
                          )
                        );
                        var t;
                      },
                      className:
                        'flex items-center gap-2 text-sm transition ' +
                        (e.isLiked
                          ? 'text-green-600 font-semibold'
                          : 'text-brown-600 hover:text-green-600'),
                      children: [
                        t.jsx(a, {
                          className:
                            'w-4 h-4 ' + (e.isLiked ? 'fill-current' : ''),
                        }),
                        e.likes,
                        ' ',
                        1 === e.likes ? 'Like' : 'Likes',
                      ],
                    }),
                    t.jsxs('button', {
                      onClick: () => h(x === e.id ? null : e.id),
                      className:
                        'flex items-center gap-2 text-sm text-brown-600 hover:text-green-600 transition',
                      children: [t.jsx(n, { className: 'w-4 h-4' }), 'Reply'],
                    }),
                    e.replies.length > 0 &&
                      t.jsxs('span', {
                        className: 'text-sm text-brown-500',
                        children: [
                          e.replies.length,
                          ' ',
                          1 === e.replies.length ? 'Reply' : 'Replies',
                        ],
                      }),
                  ],
                }),
                e.replies.length > 0 &&
                  t.jsx('div', {
                    className:
                      'mt-4 pl-6 border-l-2 border-brown-200 space-y-4',
                    children: e.replies.map((e) =>
                      t.jsxs(
                        'div',
                        {
                          className: 'bg-beige-50 rounded-lg p-4',
                          children: [
                            t.jsxs('div', {
                              className: 'flex items-center gap-2 mb-2',
                              children: [
                                t.jsx('div', {
                                  className:
                                    'w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold',
                                  children: e.author.charAt(0),
                                }),
                                t.jsxs('div', {
                                  children: [
                                    t.jsxs('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        t.jsx('span', {
                                          className:
                                            'font-semibold text-brown-900 text-sm',
                                          children: e.author,
                                        }),
                                        t.jsx('span', {
                                          className: `text-xs px-2 py-0.5 rounded-full ${g(e.authorRole)}`,
                                          children: e.authorRole,
                                        }),
                                      ],
                                    }),
                                    t.jsx('span', {
                                      className: 'text-xs text-brown-500',
                                      children: b(e.timestamp),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            t.jsx('p', {
                              className: 'text-brown-700 text-sm',
                              children: e.content,
                            }),
                          ],
                        },
                        e.id
                      )
                    ),
                  }),
                x === e.id &&
                  t.jsxs('div', {
                    className: 'mt-4 pl-6 border-l-2 border-green-600',
                    children: [
                      t.jsx('textarea', {
                        value: u,
                        onChange: (e) => p(e.target.value),
                        placeholder: 'Write your reply...',
                        className:
                          'w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none',
                        rows: 3,
                      }),
                      t.jsxs('div', {
                        className: 'mt-2 flex gap-2 justify-end',
                        children: [
                          t.jsx('button', {
                            onClick: () => {
                              (h(null), p(''));
                            },
                            className: 'btn-outline text-sm',
                            children: 'Cancel',
                          }),
                          t.jsxs('button', {
                            onClick: () =>
                              ((e) => {
                                if (!u.trim()) return;
                                const t = {
                                  id: `${e}-${Date.now()}`,
                                  author: 'Current User',
                                  authorRole: 'student',
                                  content: u,
                                  timestamp: new Date(),
                                };
                                (d(
                                  o.map((s) =>
                                    s.id === e
                                      ? { ...s, replies: [...s.replies, t] }
                                      : s
                                  )
                                ),
                                  p(''),
                                  h(null));
                              })(e.id),
                            disabled: !u.trim(),
                            className:
                              'btn-primary text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                            children: [
                              t.jsx(r, { className: 'w-3 h-3' }),
                              'Reply',
                            ],
                          }),
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
      0 === o.length &&
        t.jsxs('div', {
          className: 'card p-12 text-center',
          children: [
            t.jsx(s, { className: 'w-12 h-12 text-brown-400 mx-auto mb-4' }),
            t.jsx('h3', {
              className: 'text-xl font-semibold text-brown-900 mb-2',
              children: 'No discussions yet',
            }),
            t.jsx('p', {
              className: 'text-brown-600',
              children: 'Be the first to start a conversation!',
            }),
          ],
        }),
    ],
  });
}
export { i as D };

import { r as e, j as r } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o, t] = e.useState([]),
    [n, i] = e.useState(null),
    [d, s] = e.useState([]),
    [l, a] = e.useState([]),
    [c, m] = e.useState(''),
    [p, u] = e.useState(null),
    [f, h] = e.useState(!1),
    [g, x] = e.useState('sources');
  e.useEffect(() => {
    b();
  }, []);
  const b = async () => {
      const e = [
        {
          id: 'nb1',
          title: 'Research Project',
          description: 'AI and Education',
          sources: [],
          notes: [],
        },
      ];
      (t(e), e.length > 0 && i(e[0]));
    },
    y = async (e) => {
      const r = prompt(`Enter ${e} title:`);
      if (!r) return;
      let o = '';
      'url' === e && (o = prompt('Enter URL:'));
      const t = {
        id: `src_${Date.now()}`,
        type: e,
        title: r,
        url: o,
        content: `Sample content for ${r}`,
        addedAt: new Date(),
      };
      s([...d, t]);
    },
    j = async () => {
      c.trim() &&
        (h(!0),
        setTimeout(() => {
          (u({
            question: c,
            answer: `Based on your sources, here's what I found:\n\n${c} is an important topic. According to Source 1, there are several key considerations...\n\nKey points:\n1. First important point\n2. Second important point\n3. Third important point\n\nWould you like me to elaborate on any of these points?`,
            sources: d
              .slice(0, 3)
              .map((e) => ({ title: e.title, citation: `${e.title}, p.1` })),
            timestamp: new Date(),
          }),
            h(!1));
        }, 1500));
    };
  return r.jsxs('div', {
    style: { display: 'flex', height: '100vh', backgroundColor: '#f5f1e8' },
    children: [
      r.jsxs('div', {
        style: {
          width: '250px',
          backgroundColor: '#fff',
          borderRight: '1px solid #d4c9b8',
          padding: '1rem',
        },
        children: [
          r.jsx('h2', {
            style: { marginBottom: '1rem', fontSize: '1.25rem' },
            children: '📓 NotebookLM',
          }),
          r.jsxs('div', {
            style: { marginBottom: '1.5rem' },
            children: [
              r.jsx('select', {
                value: (null == n ? void 0 : n.id) || '',
                onChange: (e) => i(o.find((r) => r.id === e.target.value)),
                style: {
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #c4b5a0',
                  borderRadius: '0.375rem',
                  marginBottom: '0.5rem',
                },
                children: o.map((e) =>
                  r.jsx('option', { value: e.id, children: e.title }, e.id)
                ),
              }),
              r.jsx('button', {
                onClick: () => {
                  const e = prompt('Notebook title:');
                  e &&
                    t([
                      ...o,
                      {
                        id: `nb_${Date.now()}`,
                        title: e,
                        sources: [],
                        notes: [],
                      },
                    ]);
                },
                style: {
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#00a544',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                },
                children: '+ New Notebook',
              }),
            ],
          }),
          r.jsxs('div', {
            style: { marginBottom: '1.5rem' },
            children: [
              r.jsxs('button', {
                onClick: () => x('sources'),
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'sources' === g ? '#00a544' : '#fff',
                  color: 'sources' === g ? '#fff' : '#000',
                  border: '1px solid #c4b5a0',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                },
                children: ['📚 Sources (', d.length, ')'],
              }),
              r.jsx('button', {
                onClick: () => x('chat'),
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'chat' === g ? '#00a544' : '#fff',
                  color: 'chat' === g ? '#fff' : '#000',
                  border: '1px solid #c4b5a0',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                },
                children: '💬 Ask Questions',
              }),
              r.jsxs('button', {
                onClick: () => x('notes'),
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'notes' === g ? '#00a544' : '#fff',
                  color: 'notes' === g ? '#fff' : '#000',
                  border: '1px solid #c4b5a0',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                },
                children: ['📝 Notes (', l.length, ')'],
              }),
              r.jsx('button', {
                onClick: () => x('graph'),
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'graph' === g ? '#00a544' : '#fff',
                  color: 'graph' === g ? '#fff' : '#000',
                  border: '1px solid #c4b5a0',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                },
                children: '🕸️ Knowledge Graph',
              }),
            ],
          }),
        ],
      }),
      r.jsxs('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column' },
        children: [
          r.jsxs('div', {
            style: {
              backgroundColor: '#fff',
              borderBottom: '1px solid #d4c9b8',
              padding: '1rem 2rem',
            },
            children: [
              r.jsx('h1', {
                style: { fontSize: '1.5rem', fontWeight: '600' },
                children: (null == n ? void 0 : n.title) || 'NotebookLM',
              }),
              r.jsx('p', {
                style: { color: '#6b5d52', fontSize: '0.875rem' },
                children:
                  (null == n ? void 0 : n.description) ||
                  'AI-powered research assistant',
              }),
            ],
          }),
          r.jsxs('div', {
            style: { flex: 1, overflowY: 'auto', padding: '2rem' },
            children: [
              'sources' === g &&
                r.jsxs('div', {
                  children: [
                    r.jsxs('div', {
                      style: {
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '2rem',
                      },
                      children: [
                        r.jsx('button', {
                          onClick: () => y('pdf'),
                          style: {
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#00a544',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                          },
                          children: '📄 Add PDF',
                        }),
                        r.jsx('button', {
                          onClick: () => y('url'),
                          style: {
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#00a544',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                          },
                          children: '🔗 Add URL',
                        }),
                        r.jsx('button', {
                          onClick: () => y('text'),
                          style: {
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#00a544',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                          },
                          children: '📝 Add Text',
                        }),
                      ],
                    }),
                    0 === d.length
                      ? r.jsxs('div', {
                          style: {
                            textAlign: 'center',
                            padding: '4rem',
                            color: '#6b5d52',
                          },
                          children: [
                            r.jsx('div', {
                              style: { fontSize: '4rem', marginBottom: '1rem' },
                              children: '📚',
                            }),
                            r.jsx('h2', {
                              style: {
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem',
                              },
                              children: 'No sources yet',
                            }),
                            r.jsx('p', {
                              children:
                                'Add PDFs, URLs, or text to start researching',
                            }),
                          ],
                        })
                      : r.jsx('div', {
                          style: {
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '1rem',
                          },
                          children: d.map((e) =>
                            r.jsxs(
                              'div',
                              {
                                style: {
                                  backgroundColor: '#fff',
                                  padding: '1.5rem',
                                  borderRadius: '0.5rem',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                },
                                children: [
                                  r.jsx('div', {
                                    style: {
                                      fontSize: '2rem',
                                      marginBottom: '0.5rem',
                                    },
                                    children:
                                      'pdf' === e.type
                                        ? '📄'
                                        : 'url' === e.type
                                          ? '🔗'
                                          : '📝',
                                  }),
                                  r.jsx('h3', {
                                    style: {
                                      fontSize: '1.125rem',
                                      fontWeight: '600',
                                      marginBottom: '0.5rem',
                                    },
                                    children: e.title,
                                  }),
                                  r.jsxs('p', {
                                    style: {
                                      color: '#6b5d52',
                                      fontSize: '0.875rem',
                                      marginBottom: '1rem',
                                    },
                                    children: [
                                      'Added ',
                                      new Date(e.addedAt).toLocaleDateString(),
                                    ],
                                  }),
                                  r.jsx('button', {
                                    style: {
                                      padding: '0.5rem 1rem',
                                      backgroundColor: '#dc2626',
                                      color: '#fff',
                                      border: 'none',
                                      borderRadius: '0.375rem',
                                      cursor: 'pointer',
                                      fontSize: '0.875rem',
                                    },
                                    children: 'Delete',
                                  }),
                                ],
                              },
                              e.id
                            )
                          ),
                        }),
                  ],
                }),
              'chat' === g &&
                r.jsxs('div', {
                  children: [
                    r.jsxs('div', {
                      style: {
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginBottom: '2rem',
                      },
                      children: [
                        r.jsx('h2', {
                          style: {
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                          },
                          children: 'Ask a Question',
                        }),
                        r.jsxs('div', {
                          style: { display: 'flex', gap: '1rem' },
                          children: [
                            r.jsx('input', {
                              type: 'text',
                              'aria-label': 'text input',
                              value: c,
                              onChange: (e) => m(e.target.value),
                              onKeyPress: (e) => 'Enter' === e.key && j(),
                              placeholder: 'What would you like to know?',
                              style: {
                                flex: 1,
                                padding: '0.75rem',
                                border: '1px solid #c4b5a0',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                              },
                            }),
                            r.jsx('button', {
                              onClick: j,
                              disabled: f,
                              style: {
                                padding: '0.75rem 2rem',
                                backgroundColor: '#00a544',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '600',
                              },
                              children: f ? 'Thinking...' : 'Ask',
                            }),
                          ],
                        }),
                      ],
                    }),
                    p &&
                      r.jsxs('div', {
                        style: {
                          backgroundColor: '#fff',
                          padding: '2rem',
                          borderRadius: '0.5rem',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        },
                        children: [
                          r.jsxs('h3', {
                            style: {
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              marginBottom: '1rem',
                              color: '#00a544',
                            },
                            children: ['Q: ', p.question],
                          }),
                          r.jsx('div', {
                            style: {
                              whiteSpace: 'pre-wrap',
                              lineHeight: '1.6',
                              marginBottom: '1.5rem',
                            },
                            children: p.answer,
                          }),
                          r.jsxs('div', {
                            style: {
                              borderTop: '1px solid #d4c9b8',
                              paddingTop: '1rem',
                            },
                            children: [
                              r.jsx('h4', {
                                style: {
                                  fontSize: '0.875rem',
                                  fontWeight: '600',
                                  marginBottom: '0.5rem',
                                  color: '#6b5d52',
                                },
                                children: 'Sources:',
                              }),
                              p.sources.map((e, o) =>
                                r.jsxs(
                                  'div',
                                  {
                                    style: {
                                      fontSize: '0.875rem',
                                      color: '#6b5d52',
                                      marginBottom: '0.25rem',
                                    },
                                    children: ['• ', e.citation],
                                  },
                                  o
                                )
                              ),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              'notes' === g &&
                r.jsxs('div', {
                  style: {
                    textAlign: 'center',
                    padding: '4rem',
                    color: '#6b5d52',
                  },
                  children: [
                    r.jsx('div', {
                      style: { fontSize: '4rem', marginBottom: '1rem' },
                      children: '📝',
                    }),
                    r.jsx('h2', {
                      style: { fontSize: '1.5rem', marginBottom: '0.5rem' },
                      children: 'Notes',
                    }),
                    r.jsx('p', {
                      children: 'AI-generated notes will appear here',
                    }),
                  ],
                }),
              'graph' === g &&
                r.jsxs('div', {
                  style: {
                    textAlign: 'center',
                    padding: '4rem',
                    color: '#6b5d52',
                  },
                  children: [
                    r.jsx('div', {
                      style: { fontSize: '4rem', marginBottom: '1rem' },
                      children: '🕸️',
                    }),
                    r.jsx('h2', {
                      style: { fontSize: '1.5rem', marginBottom: '0.5rem' },
                      children: 'Knowledge Graph',
                    }),
                    r.jsx('p', {
                      children: 'Visual connections between your sources',
                    }),
                  ],
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { o as NotebookLM, o as default };

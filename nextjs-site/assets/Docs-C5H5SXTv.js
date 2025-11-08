import { r as e, j as r } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o, i] = e.useState([
      {
        id: 1,
        title: 'Project Proposal',
        lastModified: '2 hours ago',
        owner: 'You',
        shared: 3,
      },
      {
        id: 2,
        title: 'Meeting Notes',
        lastModified: 'Yesterday',
        owner: 'You',
        shared: 5,
      },
      {
        id: 3,
        title: 'Research Paper',
        lastModified: 'Jan 15',
        owner: 'John Doe',
        shared: 2,
      },
    ]),
    [t, n] = e.useState(null),
    [d, l] = e.useState(''),
    [s, a] = e.useState('Untitled Document');
  return r.jsxs('div', {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f1e8',
    },
    children: [
      r.jsx('div', {
        style: {
          backgroundColor: '#fff',
          borderBottom: '1px solid #d4c9b8',
          padding: '1rem 2rem',
        },
        children: r.jsxs('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          children: [
            r.jsxs('div', {
              style: { display: 'flex', alignItems: 'center', gap: '1rem' },
              children: [
                r.jsx('h1', {
                  style: { fontSize: '1.5rem', fontWeight: '600' },
                  children: '📝 Documents',
                }),
                t &&
                  r.jsx('input', {
                    type: 'text',
                    'aria-label': 'text input',
                    value: s,
                    onChange: (e) => a(e.target.value),
                    style: {
                      fontSize: '1.25rem',
                      padding: '0.5rem',
                      border: '1px solid #c4b5a0',
                      borderRadius: '0.375rem',
                      width: '300px',
                    },
                  }),
              ],
            }),
            r.jsxs('div', {
              style: { display: 'flex', gap: '1rem' },
              children: [
                t &&
                  r.jsxs(r.Fragment, {
                    children: [
                      r.jsx('button', {
                        style: {
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                        },
                        children: 'Share',
                      }),
                      r.jsx('button', {
                        onClick: () => n(null),
                        style: {
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f3f4f6',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                        },
                        children: 'Close',
                      }),
                    ],
                  }),
                r.jsx('button', {
                  onClick: () => {
                    const e = {
                      id: Date.now(),
                      title: 'Untitled Document',
                      lastModified: 'Just now',
                      owner: 'You',
                      shared: 0,
                    };
                    (i([e, ...o]), n(e), a('Untitled Document'), l(''));
                  },
                  style: {
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#00a544',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                  },
                  children: '+ New Document',
                }),
              ],
            }),
          ],
        }),
      }),
      !t &&
        r.jsx('div', {
          style: { flex: 1, padding: '2rem', overflowY: 'auto' },
          children: r.jsxs('div', {
            style: { maxWidth: '1200px', margin: '0 auto' },
            children: [
              r.jsx('h2', {
                style: {
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                },
                children: 'Recent Documents',
              }),
              r.jsx('div', {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem',
                },
                children: o.map((e) =>
                  r.jsxs(
                    'div',
                    {
                      onClick: () =>
                        ((e) => {
                          (n(e),
                            a(e.title),
                            l(
                              `This is the content of "${e.title}". Start editing...`
                            ));
                        })(e),
                      style: {
                        backgroundColor: '#fff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                      },
                      children: [
                        r.jsx('div', {
                          style: { fontSize: '2rem', marginBottom: '0.5rem' },
                          children: '📄',
                        }),
                        r.jsx('h3', {
                          style: {
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                          children: e.title,
                        }),
                        r.jsxs('div', {
                          style: {
                            fontSize: '0.875rem',
                            color: '#6b5d52',
                            marginBottom: '0.25rem',
                          },
                          children: ['Modified ', e.lastModified],
                        }),
                        r.jsxs('div', {
                          style: { fontSize: '0.875rem', color: '#6b5d52' },
                          children: ['Owner: ', e.owner],
                        }),
                        e.shared > 0 &&
                          r.jsxs('div', {
                            style: {
                              fontSize: '0.875rem',
                              color: '#00a544',
                              marginTop: '0.5rem',
                            },
                            children: ['👥 Shared with ', e.shared, ' people'],
                          }),
                      ],
                    },
                    e.id
                  )
                ),
              }),
            ],
          }),
        }),
      t &&
        r.jsxs('div', {
          style: { flex: 1, display: 'flex', flexDirection: 'column' },
          children: [
            r.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                borderBottom: '1px solid #d4c9b8',
                padding: '0.5rem 2rem',
                display: 'flex',
                gap: '0.5rem',
              },
              children: [
                r.jsx('button', {
                  style: {
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                  },
                  children: 'B',
                }),
                r.jsx('button', {
                  style: {
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontStyle: 'italic',
                  },
                  children: 'I',
                }),
                r.jsx('button', {
                  style: {
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  },
                  children: 'U',
                }),
                r.jsx('div', {
                  style: {
                    width: '1px',
                    backgroundColor: '#d4c9b8',
                    margin: '0 0.5rem',
                  },
                }),
                r.jsxs('select', {
                  style: {
                    padding: '0.5rem',
                    border: '1px solid #c4b5a0',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  },
                  children: [
                    r.jsx('option', { children: 'Normal text' }),
                    r.jsx('option', { children: 'Heading 1' }),
                    r.jsx('option', { children: 'Heading 2' }),
                    r.jsx('option', { children: 'Heading 3' }),
                  ],
                }),
                r.jsxs('select', {
                  style: {
                    padding: '0.5rem',
                    border: '1px solid #c4b5a0',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  },
                  children: [
                    r.jsx('option', { children: 'Arial' }),
                    r.jsx('option', { children: 'Times New Roman' }),
                    r.jsx('option', { children: 'Courier' }),
                  ],
                }),
                r.jsxs('select', {
                  style: {
                    padding: '0.5rem',
                    border: '1px solid #c4b5a0',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                  },
                  children: [
                    r.jsx('option', { children: '12' }),
                    r.jsx('option', { children: '14' }),
                    r.jsx('option', { children: '16' }),
                    r.jsx('option', { children: '18' }),
                  ],
                }),
              ],
            }),
            r.jsx('div', {
              style: {
                flex: 1,
                padding: '2rem',
                overflowY: 'auto',
                backgroundColor: '#f5f1e8',
              },
              children: r.jsx('div', {
                style: {
                  maxWidth: '800px',
                  margin: '0 auto',
                  backgroundColor: '#fff',
                  padding: '3rem',
                  minHeight: '100%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
                children: r.jsx('textarea', {
                  value: d,
                  onChange: (e) => l(e.target.value),
                  placeholder: 'Start typing...',
                  style: {
                    width: '100%',
                    minHeight: '600px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    resize: 'none',
                    fontFamily: 'inherit',
                  },
                }),
              }),
            }),
          ],
        }),
    ],
  });
}
export { o as Docs, o as default };

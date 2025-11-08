import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o, i] = e.useState(null),
    [r, n] = e.useState(0),
    [l, d] = e.useState(null),
    [s, a] = e.useState(!1);
  e.useEffect(() => {
    c();
  }, []);
  const c = async () => {
      i({
        id: 'pres_1',
        title: 'Untitled Presentation',
        theme: {
          primaryColor: '#4285f4',
          backgroundColor: '#ffffff',
          fontFamily: 'Arial',
        },
        slidesData: [
          {
            id: 'slide1',
            layout: 'title',
            elements: [
              {
                id: 'title',
                type: 'text',
                content: 'Welcome to Elevate Slides',
                x: 50,
                y: 200,
                width: 700,
                height: 100,
                fontSize: 48,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#000000',
              },
              {
                id: 'subtitle',
                type: 'text',
                content: 'Create beautiful presentations',
                x: 50,
                y: 320,
                width: 700,
                height: 60,
                fontSize: 24,
                textAlign: 'center',
                color: '#6b5d52',
              },
            ],
          },
        ],
      });
    },
    f = (e) => {
      const n = l === e.id,
        s = {
          position: 'absolute',
          left: `${e.x}px`,
          top: `${e.y}px`,
          width: `${e.width}px`,
          height: `${e.height}px`,
          fontSize: `${e.fontSize}px`,
          fontWeight: e.fontWeight || 'normal',
          textAlign: e.textAlign || 'left',
          color: e.color || '#000000',
          border: n ? '2px solid #00a544' : 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          outline: 'none',
        };
      return 'text' === e.type
        ? t.jsx(
            'div',
            {
              style: s,
              onClick: () => d(e.id),
              contentEditable: !0,
              suppressContentEditableWarning: !0,
              onBlur: (t) =>
                ((e, t) => {
                  const n = [...o.slidesData],
                    l = n[r].elements.find((t) => t.id === e);
                  l && (Object.assign(l, t), i({ ...o, slidesData: n }));
                })(e.id, { content: t.target.textContent }),
              children: e.content,
            },
            e.id
          )
        : 'image' === e.type
          ? t.jsx(
              'img',
              { src: e.src, alt: e.alt, style: s, onClick: () => d(e.id) },
              e.id
            )
          : null;
    },
    u = null == o ? void 0 : o.slidesData[r];
  return s
    ? t.jsxs('div', {
        style: {
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        },
        children: [
          t.jsx('div', {
            style: {
              width: '800px',
              height: '600px',
              backgroundColor:
                (null == o ? void 0 : o.theme.backgroundColor) || '#fff',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
            children: null == u ? void 0 : u.elements.map(f),
          }),
          t.jsxs('div', {
            style: {
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '1rem',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            children: [
              t.jsx('button', {
                onClick: () => n(Math.max(0, r - 1)),
                disabled: 0 === r,
                style: {
                  padding: '0.5rem 1rem',
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                },
                children: '← Previous',
              }),
              t.jsxs('span', {
                style: { color: '#fff', padding: '0.5rem 1rem' },
                children: [
                  r + 1,
                  ' / ',
                  null == o ? void 0 : o.slidesData.length,
                ],
              }),
              t.jsx('button', {
                onClick: () => n(Math.min(o.slidesData.length - 1, r + 1)),
                disabled: r === o.slidesData.length - 1,
                style: {
                  padding: '0.5rem 1rem',
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                },
                children: 'Next →',
              }),
              t.jsx('button', {
                onClick: () => a(!1),
                style: {
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                },
                children: 'Exit',
              }),
            ],
          }),
        ],
      })
    : t.jsxs('div', {
        style: { display: 'flex', height: '100vh', backgroundColor: '#f5f1e8' },
        children: [
          t.jsxs('div', {
            style: {
              width: '200px',
              backgroundColor: '#fff',
              borderRight: '1px solid #d4c9b8',
              overflowY: 'auto',
              padding: '1rem',
            },
            children: [
              t.jsx('h3', {
                style: {
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                },
                children: 'Slides',
              }),
              null == o
                ? void 0
                : o.slidesData.map((e, l) =>
                    t.jsxs(
                      'div',
                      {
                        onClick: () => n(l),
                        style: {
                          marginBottom: '0.75rem',
                          border:
                            r === l ? '2px solid #00a544' : '1px solid #d4c9b8',
                          borderRadius: '0.375rem',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          backgroundColor: r === l ? '#f5f1e8' : '#fff',
                          position: 'relative',
                        },
                        children: [
                          t.jsxs('div', {
                            style: {
                              width: '100%',
                              height: '80px',
                              backgroundColor: '#f3f4f6',
                              borderRadius: '0.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              color: '#6b5d52',
                            },
                            children: ['Slide ', l + 1],
                          }),
                          t.jsx('button', {
                            onClick: (e) => {
                              (e.stopPropagation(),
                                ((e) => {
                                  const t = o.slidesData.filter(
                                    (t, o) => o !== e
                                  );
                                  (i({ ...o, slidesData: t }),
                                    r >= t.length &&
                                      n(Math.max(0, t.length - 1)));
                                })(l));
                            },
                            style: {
                              position: 'absolute',
                              top: '0.25rem',
                              right: '0.25rem',
                              padding: '0.25rem',
                              backgroundColor: '#dc2626',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                            },
                            children: '×',
                          }),
                        ],
                      },
                      e.id
                    )
                  ),
              t.jsx('button', {
                onClick: () => {
                  const e = {
                    id: `slide${Date.now()}`,
                    layout: 'content',
                    elements: [
                      {
                        id: 'title',
                        type: 'text',
                        content: 'Click to add title',
                        x: 50,
                        y: 50,
                        width: 700,
                        height: 60,
                        fontSize: 36,
                        fontWeight: 'bold',
                      },
                    ],
                  };
                  (i({ ...o, slidesData: [...o.slidesData, e] }),
                    n(o.slidesData.length));
                },
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#00a544',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                },
                children: '+ New Slide',
              }),
            ],
          }),
          t.jsxs('div', {
            style: { flex: 1, display: 'flex', flexDirection: 'column' },
            children: [
              t.jsxs('div', {
                style: {
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #d4c9b8',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                },
                children: [
                  t.jsx('input', {
                    type: 'text',
                    'aria-label': 'text input',
                    value:
                      (null == o ? void 0 : o.title) || 'Untitled Presentation',
                    style: {
                      border: 'none',
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      outline: 'none',
                      width: '300px',
                    },
                  }),
                  t.jsx('div', { style: { flex: 1 } }),
                  t.jsx('button', {
                    style: {
                      padding: '0.5rem 1rem',
                      backgroundColor: '#fff',
                      border: '1px solid #c4b5a0',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                    },
                    children: '💾 Save',
                  }),
                  t.jsx('button', {
                    onClick: () => a(!0),
                    style: {
                      padding: '0.5rem 1rem',
                      backgroundColor: '#00a544',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                    },
                    children: '▶ Present',
                  }),
                ],
              }),
              t.jsx('div', {
                style: {
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  overflow: 'auto',
                },
                children: t.jsx('div', {
                  style: {
                    width: '800px',
                    height: '600px',
                    backgroundColor:
                      (null == o ? void 0 : o.theme.backgroundColor) || '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    position: 'relative',
                  },
                  children: null == u ? void 0 : u.elements.map(f),
                }),
              }),
            ],
          }),
        ],
      });
}
export { o as Slides, o as default };

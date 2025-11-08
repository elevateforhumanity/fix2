import { r as e, j as o } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function r() {
  var r;
  const [l, t] = e.useState(null),
    [n, d] = e.useState(null),
    [i, s] = e.useState({ row: 0, col: 0 }),
    [a, c] = e.useState(''),
    [u, f] = e.useState(!1);
  e.useEffect(() => {
    p();
  }, []);
  const p = async () => {
      const e = {
        id: 'sheet_1',
        title: 'Untitled Spreadsheet',
        sheets: ['sheet1'],
        sheetsData: [
          { id: 'sheet1', name: 'Sheet1', rows: 100, cols: 26, cells: {} },
        ],
      };
      (t(e), d(e.sheetsData[0]));
    },
    x = (e) => {
      c(e.target.value);
    },
    b = async () => {
      if (!n) return;
      const e = `${i.row},${i.col}`,
        o = a.startsWith('='),
        r = {
          row: i.row,
          col: i.col,
          value: a,
          formula: o ? a : null,
          displayValue: a,
        };
      ((n.cells[e] = r), f(!1), console.log('Cell updated:', r));
    },
    h = (e) => {
      let o = '',
        r = e + 1;
      for (; r > 0; ) {
        const e = (r - 1) % 26;
        ((o = String.fromCharCode(65 + e) + o), (r = Math.floor((r - 1) / 26)));
      }
      return o;
    },
    m = (e, o) => {
      const r = `${e},${o}`,
        l = null == n ? void 0 : n.cells[r];
      return (null == l ? void 0 : l.displayValue) || '';
    },
    g = (e, o) => i.row === e && i.col === o;
  return o.jsxs('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f5f1e8',
    },
    children: [
      o.jsxs('div', {
        style: {
          backgroundColor: '#fff',
          borderBottom: '1px solid #d4c9b8',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        },
        children: [
          o.jsx('input', {
            type: 'text',
            'aria-label': 'text input',
            value: (null == l ? void 0 : l.title) || 'Untitled Spreadsheet',
            style: {
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: '500',
              outline: 'none',
              width: '300px',
            },
          }),
          o.jsx('div', { style: { flex: 1 } }),
          o.jsx('button', {
            style: {
              padding: '0.5rem 1rem',
              backgroundColor: '#fff',
              border: '1px solid #c4b5a0',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            },
            children: '💾 Save',
          }),
          o.jsx('button', {
            style: {
              padding: '0.5rem 1rem',
              backgroundColor: '#00a544',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            },
            children: 'Share',
          }),
        ],
      }),
      o.jsxs('div', {
        style: {
          backgroundColor: '#fff',
          borderBottom: '1px solid #d4c9b8',
          padding: '0.5rem 1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        },
        children: [
          o.jsxs('div', {
            style: {
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.25rem',
              minWidth: '60px',
              textAlign: 'center',
              fontWeight: '600',
            },
            children: [h(i.col), i.row + 1],
          }),
          o.jsx('input', {
            type: 'text',
            'aria-label': 'text input',
            value: a,
            onChange: x,
            onKeyPress: (e) => {
              'Enter' === e.key && b();
            },
            placeholder: 'Enter value or formula (=SUM(A1:A10))',
            style: {
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #c4b5a0',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            },
          }),
        ],
      }),
      o.jsx('div', {
        style: { flex: 1, overflow: 'auto', backgroundColor: '#fff' },
        children: o.jsxs('table', {
          style: {
            borderCollapse: 'collapse',
            width: '100%',
            tableLayout: 'fixed',
          },
          children: [
            o.jsx('thead', {
              children: o.jsxs('tr', {
                children: [
                  o.jsx('th', {
                    style: {
                      width: '40px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #d4c9b8',
                      position: 'sticky',
                      top: 0,
                      left: 0,
                      zIndex: 3,
                    },
                  }),
                  Array.from(
                    { length: (null == n ? void 0 : n.cols) || 26 },
                    (e, r) =>
                      o.jsx(
                        'th',
                        {
                          style: {
                            width: '100px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d4c9b8',
                            padding: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            position: 'sticky',
                            top: 0,
                            zIndex: 2,
                          },
                          children: h(r),
                        },
                        r
                      )
                  ),
                ],
              }),
            }),
            o.jsx('tbody', {
              children: Array.from(
                { length: (null == n ? void 0 : n.rows) || 100 },
                (e, r) =>
                  o.jsxs(
                    'tr',
                    {
                      children: [
                        o.jsx('td', {
                          style: {
                            width: '40px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d4c9b8',
                            padding: '0.5rem',
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            position: 'sticky',
                            left: 0,
                            zIndex: 1,
                          },
                          children: r + 1,
                        }),
                        Array.from(
                          { length: (null == n ? void 0 : n.cols) || 26 },
                          (e, l) =>
                            o.jsx(
                              'td',
                              {
                                onClick: () =>
                                  ((e, o) => {
                                    s({ row: e, col: o });
                                    const r = `${e},${o}`,
                                      l = null == n ? void 0 : n.cells[r];
                                    (c(
                                      (null == l ? void 0 : l.formula) ||
                                        (null == l ? void 0 : l.value) ||
                                        ''
                                    ),
                                      f(!1));
                                  })(r, l),
                                onDoubleClick: () =>
                                  ((e, o) => {
                                    s({ row: e, col: o });
                                    const r = `${e},${o}`,
                                      l = null == n ? void 0 : n.cells[r];
                                    (c(
                                      (null == l ? void 0 : l.formula) ||
                                        (null == l ? void 0 : l.value) ||
                                        ''
                                    ),
                                      f(!0));
                                  })(r, l),
                                style: {
                                  border: '1px solid #d4c9b8',
                                  padding: '0.5rem',
                                  cursor: 'cell',
                                  backgroundColor: g(r, l) ? '#dbeafe' : '#fff',
                                  outline: g(r, l)
                                    ? '2px solid #00a544'
                                    : 'none',
                                  position: 'relative',
                                },
                                children:
                                  u && g(r, l)
                                    ? o.jsx('input', {
                                        type: 'text',
                                        'aria-label': 'text input',
                                        value: a,
                                        onChange: x,
                                        onBlur: b,
                                        onKeyPress: (e) => {
                                          'Enter' === e.key && b();
                                        },
                                        autoFocus: !0,
                                        style: {
                                          width: '100%',
                                          border: 'none',
                                          outline: 'none',
                                          padding: 0,
                                          backgroundColor: 'transparent',
                                        },
                                      })
                                    : m(r, l),
                              },
                              l
                            )
                        ),
                      ],
                    },
                    r
                  )
              ),
            }),
          ],
        }),
      }),
      o.jsxs('div', {
        style: {
          backgroundColor: '#fff',
          borderTop: '1px solid #d4c9b8',
          padding: '0.5rem 1rem',
          display: 'flex',
          gap: '0.5rem',
        },
        children: [
          null == (r = null == l ? void 0 : l.sheetsData)
            ? void 0
            : r.map((e) =>
                o.jsx(
                  'button',
                  {
                    onClick: () => d(e),
                    style: {
                      padding: '0.5rem 1rem',
                      backgroundColor:
                        (null == n ? void 0 : n.id) === e.id
                          ? '#e0e7ff'
                          : 'transparent',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight:
                        (null == n ? void 0 : n.id) === e.id ? '600' : '400',
                    },
                    children: e.name,
                  },
                  e.id
                )
              ),
          o.jsx('button', {
            style: {
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
            },
            children: '+',
          }),
        ],
      }),
    ],
  });
}
export { r as Sheets, r as default };

import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function t() {
  var t, l;
  const [n, i] = e.useState([{ title: 'Module 1', lessons: ['Lesson 1'] }]),
    [o, r] = e.useState(''),
    [d, a] = e.useState(''),
    [u, p] = e.useState(0);
  return s.jsxs('main', {
    role: 'main',
    style: { padding: 32, maxWidth: 900, margin: '0 auto' },
    children: [
      s.jsx('h1', { children: 'Course Builder' }),
      s.jsxs('form', {
        onSubmit: function (e) {
          (e.preventDefault(),
            o.trim() && (i([...n, { title: o, lessons: [] }]), r('')));
        },
        style: { marginBottom: 16 },
        children: [
          s.jsx('input', {
            value: o,
            onChange: (e) => r(e.target.value),
            placeholder: 'New Module Title',
            style: { padding: 8, marginRight: 8 },
          }),
          s.jsx('button', {
            type: 'submit',
            style: { padding: '8px 16px' },
            children: 'Add Module',
          }),
        ],
      }),
      s.jsxs('div', {
        style: { display: 'flex', gap: 32 },
        children: [
          s.jsxs('div', {
            style: { flex: 1 },
            children: [
              s.jsx('h2', { children: 'Modules' }),
              s.jsx('ul', {
                children: n.map((e, t) =>
                  s.jsx(
                    'li',
                    {
                      style: {
                        cursor: 'pointer',
                        fontWeight: t === u ? 'bold' : 'normal',
                        marginBottom: 8,
                      },
                      onClick: () => p(t),
                      children: e.title,
                    },
                    t
                  )
                ),
              }),
            ],
          }),
          s.jsxs('div', {
            style: { flex: 2 },
            children: [
              s.jsxs('h2', {
                children: [
                  'Lessons in ',
                  null == (t = n[u]) ? void 0 : t.title,
                ],
              }),
              s.jsx('ul', {
                children:
                  null == (l = n[u])
                    ? void 0
                    : l.lessons.map((e, t) => s.jsx('li', { children: e }, t)),
              }),
              s.jsxs('form', {
                onSubmit: function (e) {
                  (e.preventDefault(),
                    d.trim() &&
                      (i(
                        n.map((e, s) =>
                          s === u ? { ...e, lessons: [...e.lessons, d] } : e
                        )
                      ),
                      a('')));
                },
                style: { marginTop: 12 },
                children: [
                  s.jsx('input', {
                    value: d,
                    onChange: (e) => a(e.target.value),
                    placeholder: 'New Lesson Title',
                    style: { padding: 8, marginRight: 8 },
                  }),
                  s.jsx('button', {
                    type: 'submit',
                    style: { padding: '8px 16px' },
                    children: 'Add Lesson',
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
export { t as default };

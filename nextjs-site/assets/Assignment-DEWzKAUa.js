import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function n() {
  const [n, r] = e.useState(!1),
    [s, i] = e.useState('');
  return t.jsxs('main', {
    role: 'main',
    style: { padding: 32, maxWidth: 600, margin: '0 auto' },
    children: [
      t.jsx('h1', { children: 'Assignment: AI Essay' }),
      t.jsxs('p', {
        children: [
          'Write a short essay (100-300 words):',
          t.jsx('br', {}),
          t.jsx('strong', {
            children: '“How will AI change the world in the next 10 years?”',
          }),
        ],
      }),
      n
        ? t.jsx('div', {
            style: { marginTop: 24, fontWeight: 'bold', color: '#388e3c' },
            children: 'Assignment submitted! (Demo)',
          })
        : t.jsxs('form', {
            onSubmit: function (e) {
              (e.preventDefault(), r(!0));
            },
            children: [
              t.jsx('textarea', {
                value: s,
                onChange: (e) => i(e.target.value),
                rows: 8,
                style: { width: '100%', marginBottom: 16, padding: 8 },
                required: !0,
                minLength: 100,
                maxLength: 300,
              }),
              t.jsx('button', {
                type: 'submit',
                style: {
                  padding: '10px 24px',
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                },
                children: 'Submit Assignment',
              }),
            ],
          }),
    ],
  });
}
export { n as default };

import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import { v as t } from './certificates-Y_9npsL2.js';
import './vendor-Da1LjC7-.js';
import './supa-DdKhhKHf.js';
import './vendor-supabase-C00Cu5KO.js';
function a() {
  var a, i;
  const [r, n] = e.useState(''),
    [l, c] = e.useState(null),
    [d, m] = e.useState(!1),
    [o, x] = e.useState(!1);
  return s.jsx('section', {
    className: 'section',
    children: s.jsxs('div', {
      className: 'container max-w-2xl',
      children: [
        s.jsx('h1', {
          className: 'text-3xl font-bold text-center',
          children: 'Verify Certificate',
        }),
        s.jsx('p', {
          className: 'mt-2 text-center text-brown-600',
          children: 'Enter a certificate number to verify authenticity',
        }),
        s.jsxs('form', {
          onSubmit: async function (e) {
            (e.preventDefault(), m(!0), x(!0));
            const s = await t(r);
            (c(s), m(!1));
          },
          className: 'mt-8 card p-6',
          children: [
            s.jsx('label', {
              className: 'block text-sm font-medium mb-2',
              children: 'Certificate Number',
            }),
            s.jsxs('div', {
              className: 'flex gap-3',
              children: [
                s.jsx('input', {
                  type: 'text',
                  'aria-label': 'text input',
                  value: r,
                  onChange: (e) => n(e.target.value),
                  className:
                    'flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 font-mono',
                  placeholder: 'EFH-1234567890-ABCDEF',
                  required: !0,
                }),
                s.jsx('button', {
                  type: 'submit',
                  className: 'btn',
                  disabled: d,
                  children: d ? 'Verifying...' : 'Verify',
                }),
              ],
            }),
          ],
        }),
        o &&
          s.jsx('div', {
            className: 'mt-6',
            children: l
              ? s.jsx('div', {
                  className: 'card p-6 border-2 border-green-500',
                  children: s.jsxs('div', {
                    className: 'flex items-start gap-4',
                    children: [
                      s.jsx('div', { className: 'text-4xl', children: '✅' }),
                      s.jsxs('div', {
                        className: 'flex-1',
                        children: [
                          s.jsx('h3', {
                            className: 'text-xl font-semibold text-green-700',
                            children: 'Valid Certificate',
                          }),
                          s.jsxs('div', {
                            className: 'mt-3 space-y-2 text-sm',
                            children: [
                              s.jsxs('div', {
                                children: [
                                  s.jsx('span', {
                                    className: 'font-medium',
                                    children: 'Course:',
                                  }),
                                  ' ',
                                  null == (a = l.courses) ? void 0 : a.title,
                                ],
                              }),
                              s.jsxs('div', {
                                children: [
                                  s.jsx('span', {
                                    className: 'font-medium',
                                    children: 'Student:',
                                  }),
                                  ' ',
                                  null == (i = l.profiles) ? void 0 : i.email,
                                ],
                              }),
                              s.jsxs('div', {
                                children: [
                                  s.jsx('span', {
                                    className: 'font-medium',
                                    children: 'Issued:',
                                  }),
                                  ' ',
                                  new Date(l.issued_at).toLocaleDateString(),
                                ],
                              }),
                              s.jsxs('div', {
                                children: [
                                  s.jsx('span', {
                                    className: 'font-medium',
                                    children: 'Certificate #:',
                                  }),
                                  ' ',
                                  s.jsx('span', {
                                    className: 'font-mono',
                                    children: l.certificate_number,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                })
              : s.jsx('div', {
                  className: 'card p-6 border-2 border-red-500',
                  children: s.jsxs('div', {
                    className: 'flex items-start gap-4',
                    children: [
                      s.jsx('div', { className: 'text-4xl', children: '❌' }),
                      s.jsxs('div', {
                        children: [
                          s.jsx('h3', {
                            className: 'text-xl font-semibold text-red-700',
                            children: 'Invalid Certificate',
                          }),
                          s.jsx('p', {
                            className: 'mt-2 text-brown-600',
                            children:
                              'This certificate number was not found in our system. It may be invalid, expired, or revoked.',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
          }),
      ],
    }),
  });
}
export { a as default };

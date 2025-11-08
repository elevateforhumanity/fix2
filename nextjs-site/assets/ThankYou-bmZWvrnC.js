import {
  j as e,
  H as s,
  g as t,
  v as n,
  aj as r,
} from './vendor-react-C-ZQNdj3.js';
import { L as a } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function l() {
  return e.jsxs('div', {
    className:
      'min-h-screen bg-gradient-to-b from-white to-beige-50 flex items-center justify-center px-4',
    children: [
      e.jsx(s, {
        children: e.jsx('title', {
          children: 'Thank You | Elevate for Humanity',
        }),
      }),
      e.jsx('div', {
        className: 'container max-w-2xl',
        children: e.jsxs('div', {
          className: 'bg-white rounded-2xl shadow-lg p-12 text-center',
          children: [
            e.jsx('div', {
              className:
                'inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6',
              children: e.jsx(t, { className: 'h-12 w-12 text-green-600' }),
            }),
            e.jsx('h1', {
              className: 'text-4xl font-bold text-brown-900 mb-4',
              children: 'Thank You!',
            }),
            e.jsx('p', {
              className: 'text-xl text-brown-600 mb-8',
              children:
                "We've received your submission and will be in touch soon.",
            }),
            e.jsxs('div', {
              className: 'bg-beige-50 rounded-lg p-6 mb-8',
              children: [
                e.jsxs('div', {
                  className:
                    'flex items-center justify-center gap-2 text-brown-600 mb-2',
                  children: [
                    e.jsx(n, { className: 'h-5 w-5' }),
                    e.jsx('span', {
                      className: 'text-sm',
                      children: 'Check your email',
                    }),
                  ],
                }),
                e.jsx('p', {
                  className: 'text-sm text-brown-500',
                  children:
                    'You should receive a confirmation email within the next few minutes.',
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'space-y-3',
              children: [
                e.jsx('h3', {
                  className: 'font-semibold text-brown-900 mb-4',
                  children: "What's Next?",
                }),
                e.jsxs('ul', {
                  className: 'text-left space-y-2 text-brown-600 mb-8',
                  children: [
                    e.jsxs('li', {
                      className: 'flex items-start gap-2',
                      children: [
                        e.jsx('span', {
                          className: 'text-green-600 mt-1',
                          children: '✓',
                        }),
                        e.jsx('span', {
                          children: 'Our team will review your information',
                        }),
                      ],
                    }),
                    e.jsxs('li', {
                      className: 'flex items-start gap-2',
                      children: [
                        e.jsx('span', {
                          className: 'text-green-600 mt-1',
                          children: '✓',
                        }),
                        e.jsx('span', {
                          children:
                            "We'll contact you within 1-2 business days",
                        }),
                      ],
                    }),
                    e.jsxs('li', {
                      className: 'flex items-start gap-2',
                      children: [
                        e.jsx('span', {
                          className: 'text-green-600 mt-1',
                          children: '✓',
                        }),
                        e.jsx('span', {
                          children:
                            "You'll receive next steps and enrollment details",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'flex flex-wrap gap-3 justify-center',
              children: [
                e.jsxs(a, {
                  to: '/',
                  className:
                    'inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition',
                  children: [e.jsx(r, { className: 'h-4 w-4' }), 'Return Home'],
                }),
                e.jsx(a, {
                  to: '/programs',
                  className:
                    'px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition',
                  children: 'Browse Programs',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { l as default };

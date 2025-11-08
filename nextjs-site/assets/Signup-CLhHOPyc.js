import { r as e, j as r } from './vendor-react-C-ZQNdj3.js';
import { c as a, L as t } from './vendor-router-CQjfSXV_.js';
import { supabase as n } from './supabaseClient-DCQoDyvc.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
function o() {
  const [o, s] = e.useState(''),
    [i, l] = e.useState(''),
    [d, c] = e.useState(''),
    [u, m] = e.useState(!1),
    [p, x] = e.useState(''),
    b = a();
  return r.jsx('div', {
    className:
      'min-h-screen flex items-center justify-center bg-beige-50 py-12 px-4',
    children: r.jsxs('div', {
      className: 'max-w-md w-full space-y-8',
      children: [
        r.jsx('div', {
          children: r.jsx('h2', {
            className:
              'mt-6 text-center text-3xl font-extrabold text-brown-900',
            children: 'Create your account',
          }),
        }),
        r.jsxs('form', {
          className: 'mt-8 space-y-6',
          onSubmit: async (e) => {
            if ((e.preventDefault(), n)) {
              (m(!0), x(''));
              try {
                const { data: e, error: r } = await n.auth.signUp({
                  email: o,
                  password: i,
                  options: { data: { full_name: d } },
                });
                if (r) throw r;
                (alert('Check your email for the confirmation link!'),
                  b('/login'));
              } catch (r) {
                x(r.message);
              } finally {
                m(!1);
              }
            } else x('Authentication service is not available');
          },
          children: [
            p &&
              r.jsx('div', {
                className:
                  'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded',
                children: p,
              }),
            r.jsxs('div', {
              className: 'rounded-md shadow-sm space-y-4',
              children: [
                r.jsx('input', {
                  type: 'text',
                  'aria-label': 'text input',
                  required: !0,
                  className:
                    'appearance-none relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm',
                  placeholder: 'Full Name',
                  value: d,
                  onChange: (e) => c(e.target.value),
                }),
                r.jsx('input', {
                  type: 'email',
                  'aria-label': 'email input',
                  required: !0,
                  className:
                    'appearance-none relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm',
                  placeholder: 'Email address',
                  value: o,
                  onChange: (e) => s(e.target.value),
                }),
                r.jsx('input', {
                  type: 'password',
                  'aria-label': 'password input',
                  required: !0,
                  minLength: 6,
                  className:
                    'appearance-none relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm',
                  placeholder: 'Password (min 6 characters)',
                  value: i,
                  onChange: (e) => l(e.target.value),
                }),
              ],
            }),
            r.jsx('button', {
              type: 'submit',
              disabled: u,
              className:
                'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50',
              children: u ? 'Creating account...' : 'Sign up',
            }),
            r.jsx('div', {
              className: 'text-center',
              children: r.jsx(t, {
                to: '/login',
                className: 'text-green-600 hover:text-indigo-500',
                children: 'Already have an account? Sign in',
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
export { o as default };

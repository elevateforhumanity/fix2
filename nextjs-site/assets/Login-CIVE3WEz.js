import { r as e, j as r } from './vendor-react-C-ZQNdj3.js';
import { c as s, L as n } from './vendor-router-CQjfSXV_.js';
import { supabase as a } from './supabaseClient-DCQoDyvc.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
function t() {
  const [t, o] = e.useState(''),
    [i, d] = e.useState(''),
    [l, c] = e.useState(!1),
    [u, p] = e.useState(''),
    m = s();
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
            children: 'Sign in to your account',
          }),
        }),
        r.jsxs('form', {
          className: 'mt-8 space-y-6',
          onSubmit: async (e) => {
            if ((e.preventDefault(), a)) {
              (c(!0), p(''));
              try {
                const { data: e, error: r } = await a.auth.signInWithPassword({
                  email: t,
                  password: i,
                });
                if (r) throw r;
                m('/dashboard');
              } catch (r) {
                p(r.message);
              } finally {
                c(!1);
              }
            } else p('Authentication service is not available');
          },
          children: [
            u &&
              r.jsx('div', {
                className:
                  'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded',
                children: u,
              }),
            r.jsxs('div', {
              className: 'rounded-md shadow-sm -space-y-px',
              children: [
                r.jsx('div', {
                  children: r.jsx('input', {
                    type: 'email',
                    'aria-label': 'email input',
                    required: !0,
                    className:
                      'appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                    placeholder: 'Email address',
                    value: t,
                    onChange: (e) => o(e.target.value),
                  }),
                }),
                r.jsx('div', {
                  children: r.jsx('input', {
                    type: 'password',
                    'aria-label': 'password input',
                    required: !0,
                    className:
                      'appearance-none rounded-none relative block w-full px-3 py-2 border border-brown-300 placeholder-gray-500 text-brown-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                    placeholder: 'Password',
                    value: i,
                    onChange: (e) => d(e.target.value),
                  }),
                }),
              ],
            }),
            r.jsx('div', {
              children: r.jsx('button', {
                type: 'submit',
                disabled: l,
                className:
                  'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50',
                children: l ? 'Signing in...' : 'Sign in',
              }),
            }),
            r.jsx('div', {
              className: 'text-center',
              children: r.jsx(n, {
                to: '/signup',
                className: 'text-green-600 hover:text-indigo-500',
                children: "Don't have an account? Sign up",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
export { t as default };

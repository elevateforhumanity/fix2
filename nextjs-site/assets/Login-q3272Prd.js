import { r as e, j as s, H as a } from './vendor-react-C-ZQNdj3.js';
import { L as t } from './vendor-router-CQjfSXV_.js';
import { N as r } from './Navigation-Bbm4Xzc1.js';
import { S as l } from './Section-DjKsK8lK.js';
import { F as o } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
function i() {
  const [i, n] = e.useState(''),
    [c, m] = e.useState('');
  return s.jsxs('div', {
    children: [
      s.jsx(a, {
        children: s.jsx('title', { children: 'Login | Elevate for Humanity' }),
      }),
      s.jsx(r, {}),
      s.jsx(l, {
        background: 'white',
        children: s.jsxs('div', {
          className: 'mx-auto max-w-md',
          children: [
            s.jsx('h1', {
              className: 'section-title text-center',
              children: 'Login',
            }),
            s.jsxs('form', {
              onSubmit: (e) => {
                (e.preventDefault(),
                  console.log('Login:', { email: i, password: c }));
              },
              className: 'space-y-6 mt-8',
              children: [
                s.jsxs('div', {
                  children: [
                    s.jsx('label', {
                      htmlFor: 'email',
                      className: 'label',
                      children: 'Email',
                    }),
                    s.jsx('input', {
                      type: 'email',
                      id: 'email',
                      value: i,
                      onChange: (e) => n(e.target.value),
                      required: !0,
                      className: 'input',
                      placeholder: 'your.email@example.com',
                    }),
                  ],
                }),
                s.jsxs('div', {
                  children: [
                    s.jsx('label', {
                      htmlFor: 'password',
                      className: 'label',
                      children: 'Password',
                    }),
                    s.jsx('input', {
                      type: 'password',
                      id: 'password',
                      value: c,
                      onChange: (e) => m(e.target.value),
                      required: !0,
                      className: 'input',
                      placeholder: '••••••••',
                    }),
                  ],
                }),
                s.jsx('button', {
                  type: 'submit',
                  className: 'button w-full',
                  children: 'Login',
                }),
              ],
            }),
            s.jsxs('div', {
              className: 'mt-6 text-center',
              children: [
                s.jsx(t, {
                  to: '/auth/forgot-password',
                  className:
                    'text-sm text-[var(--color-green-600)] hover:underline',
                  children: 'Forgot password?',
                }),
                s.jsxs('p', {
                  className: 'mt-4 text-sm',
                  children: [
                    "Don't have an account?",
                    ' ',
                    s.jsx(t, {
                      to: '/auth/signup',
                      className:
                        'text-[var(--color-green-600)] hover:underline',
                      children: 'Sign up',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      s.jsx(o, {}),
    ],
  });
}
export { i as default };

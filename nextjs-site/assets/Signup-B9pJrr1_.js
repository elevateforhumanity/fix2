import { r as e, j as a, H as s } from './vendor-react-C-ZQNdj3.js';
import { L as t } from './vendor-router-CQjfSXV_.js';
import { N as l } from './Navigation-Bbm4Xzc1.js';
import { S as r } from './Section-DjKsK8lK.js';
import { F as n } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
function i() {
  const [i, o] = e.useState({ name: '', email: '', password: '' });
  return a.jsxs('div', {
    children: [
      a.jsx(s, {
        children: a.jsx('title', {
          children: 'Sign Up | Elevate for Humanity',
        }),
      }),
      a.jsx(l, {}),
      a.jsx(r, {
        background: 'white',
        children: a.jsxs('div', {
          className: 'mx-auto max-w-md',
          children: [
            a.jsx('h1', {
              className: 'section-title text-center',
              children: 'Create Account',
            }),
            a.jsxs('form', {
              onSubmit: (e) => {
                (e.preventDefault(), console.log('Signup:', i));
              },
              className: 'space-y-6 mt-8',
              children: [
                a.jsxs('div', {
                  children: [
                    a.jsx('label', {
                      htmlFor: 'name',
                      className: 'label',
                      children: 'Full Name',
                    }),
                    a.jsx('input', {
                      type: 'text',
                      id: 'name',
                      value: i.name,
                      onChange: (e) => o({ ...i, name: e.target.value }),
                      required: !0,
                      className: 'input',
                    }),
                  ],
                }),
                a.jsxs('div', {
                  children: [
                    a.jsx('label', {
                      htmlFor: 'email',
                      className: 'label',
                      children: 'Email',
                    }),
                    a.jsx('input', {
                      type: 'email',
                      id: 'email',
                      value: i.email,
                      onChange: (e) => o({ ...i, email: e.target.value }),
                      required: !0,
                      className: 'input',
                    }),
                  ],
                }),
                a.jsxs('div', {
                  children: [
                    a.jsx('label', {
                      htmlFor: 'password',
                      className: 'label',
                      children: 'Password',
                    }),
                    a.jsx('input', {
                      type: 'password',
                      id: 'password',
                      value: i.password,
                      onChange: (e) => o({ ...i, password: e.target.value }),
                      required: !0,
                      className: 'input',
                    }),
                  ],
                }),
                a.jsx('button', {
                  type: 'submit',
                  className: 'button w-full',
                  children: 'Create Account',
                }),
              ],
            }),
            a.jsxs('p', {
              className: 'mt-6 text-center text-sm',
              children: [
                'Already have an account?',
                ' ',
                a.jsx(t, {
                  to: '/auth/login',
                  className: 'text-[var(--color-green-600)] hover:underline',
                  children: 'Login',
                }),
              ],
            }),
          ],
        }),
      }),
      a.jsx(n, {}),
    ],
  });
}
export { i as default };

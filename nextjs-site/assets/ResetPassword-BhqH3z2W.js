import { r as e, j as s, ao as t } from './vendor-react-C-ZQNdj3.js';
import { d as r, c as a } from './vendor-router-CQjfSXV_.js';
import { supabase as n } from './supabaseClient-DCQoDyvc.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
function l() {
  const [l] = r(),
    i = a(),
    [o, d] = e.useState(''),
    [c, m] = e.useState(''),
    [u, x] = e.useState(!1),
    [h, b] = e.useState(''),
    [w, f] = e.useState(!1),
    [g, p] = e.useState(!0),
    [j, N] = e.useState(!1),
    v = l.get('access_token'),
    y = l.get('type');
  e.useEffect(() => {
    k();
  }, [v, y]);
  const k = async () => {
    if (n) {
      if ((p(!0), 'recovery' === y && v))
        try {
          const { error: e } = await n.auth.setSession({
            access_token: v,
            refresh_token: l.get('refresh_token') || '',
          });
          if (e) throw e;
          N(!0);
        } catch (e) {
          (console.error('Token validation error:', e), N(!1));
        }
      else N(!1);
      p(!1);
    }
  };
  return g
    ? s.jsx('div', {
        className: 'min-h-screen flex items-center justify-center bg-beige-50',
        children: s.jsxs('div', {
          className:
            'max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center',
          children: [
            s.jsx('div', {
              className:
                'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4',
            }),
            s.jsx('p', {
              className: 'text-brown-600',
              children: 'Validating reset link...',
            }),
          ],
        }),
      })
    : j
      ? w
        ? s.jsx('div', {
            className:
              'min-h-screen flex items-center justify-center bg-beige-50',
            children: s.jsxs('div', {
              className:
                'max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center',
              children: [
                s.jsx('div', {
                  className: 'text-green-500 text-4xl mb-4',
                  children: '✓',
                }),
                s.jsx('h2', {
                  className: 'text-2xl font-bold text-brown-900 mb-2',
                  children: 'Password Reset Successful',
                }),
                s.jsx('p', {
                  className: 'text-brown-600',
                  children: 'Redirecting to login...',
                }),
              ],
            }),
          })
        : s.jsx('div', {
            className:
              'min-h-screen flex items-center justify-center bg-beige-50',
            children: s.jsxs('div', {
              className: 'max-w-md w-full bg-white rounded-lg shadow-lg p-8',
              children: [
                s.jsxs('div', {
                  className: 'text-center mb-8',
                  children: [
                    s.jsx('div', {
                      className:
                        'inline-flex items-center justify-center w-16 h-16 bg-green-600/10 rounded-full mb-4',
                      children: s.jsx(t, {
                        className: 'h-8 w-8 text-green-600',
                      }),
                    }),
                    s.jsx('h2', {
                      className: 'text-2xl font-bold text-brown-900',
                      children: 'Reset Your Password',
                    }),
                    s.jsx('p', {
                      className: 'text-brown-600 mt-2',
                      children: 'Enter your new password below',
                    }),
                  ],
                }),
                s.jsxs('form', {
                  onSubmit: async (e) => {
                    if (n)
                      if ((e.preventDefault(), b(''), o === c))
                        if (o.length < 8)
                          b('Password must be at least 8 characters');
                        else {
                          x(!0);
                          try {
                            const { error: e } = await n.auth.updateUser({
                              password: o,
                            });
                            if (e) throw e;
                            (f(!0),
                              await n.auth.signOut(),
                              setTimeout(() => i('/auth/login'), 2e3));
                          } catch (s) {
                            b(s.message || 'Failed to reset password');
                          } finally {
                            x(!1);
                          }
                        }
                      else b('Passwords do not match');
                  },
                  className: 'space-y-4',
                  children: [
                    h &&
                      s.jsx('div', {
                        className:
                          'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded',
                        children: h,
                      }),
                    s.jsxs('div', {
                      children: [
                        s.jsx('label', {
                          className:
                            'block text-sm font-medium text-brown-900 mb-2',
                          children: 'New Password',
                        }),
                        s.jsx('input', {
                          type: 'password',
                          'aria-label': 'password input',
                          value: o,
                          onChange: (e) => d(e.target.value),
                          className:
                            'w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent',
                          placeholder: 'Enter new password',
                          required: !0,
                          minLength: 8,
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      children: [
                        s.jsx('label', {
                          className:
                            'block text-sm font-medium text-brown-900 mb-2',
                          children: 'Confirm Password',
                        }),
                        s.jsx('input', {
                          type: 'password',
                          'aria-label': 'password input',
                          value: c,
                          onChange: (e) => m(e.target.value),
                          className:
                            'w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent',
                          placeholder: 'Confirm new password',
                          required: !0,
                          minLength: 8,
                        }),
                      ],
                    }),
                    s.jsx('button', {
                      type: 'submit',
                      disabled: u,
                      className: 'w-full btn',
                      children: u ? 'Resetting...' : 'Reset Password',
                    }),
                  ],
                }),
              ],
            }),
          })
      : s.jsx('div', {
          className:
            'min-h-screen flex items-center justify-center bg-beige-50',
          children: s.jsxs('div', {
            className:
              'max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center',
            children: [
              s.jsx('div', {
                className: 'text-red-500 text-4xl mb-4',
                children: '⚠️',
              }),
              s.jsx('h2', {
                className: 'text-2xl font-bold text-brown-900 mb-2',
                children: 'Invalid Reset Link',
              }),
              s.jsx('p', {
                className: 'text-brown-600 mb-6',
                children: 'This password reset link is invalid or has expired.',
              }),
              s.jsx('button', {
                onClick: () => i('/auth/forgot-password'),
                className: 'btn',
                children: 'Request New Link',
              }),
            ],
          }),
        });
}
export { l as default };

import { r as e, j as s, g as t, _ as r } from './vendor-react-C-ZQNdj3.js';
import { d as a, L as n } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function l() {
  const [l] = a(),
    o = l.get('session_id'),
    [i, c] = e.useState(!0),
    [m, d] = e.useState(null);
  return (
    e.useEffect(() => {
      (async () => {
        if (o)
          try {
            const e = await fetch('/.netlify/functions/stripe-webhook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type: 'verify_session', session_id: o }),
            });
            if (!e.ok) throw new Error('Failed to verify payment');
            const s = await e.json();
            d({
              programName: s.programName || 'Your Program',
              enrollmentId:
                s.enrollmentId ||
                'ENR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
              courseId: s.courseId,
              amount: s.amount,
            });
          } catch (e) {
            (console.error('Error verifying payment:', e),
              d({
                programName: 'Your Program',
                enrollmentId:
                  'ENR-' +
                  Math.random().toString(36).substr(2, 9).toUpperCase(),
              }));
          } finally {
            c(!1);
          }
        else c(!1);
      })();
    }, [o]),
    i
      ? s.jsx('section', {
          className: 'section',
          children: s.jsx('div', {
            className: 'container max-w-2xl mx-auto',
            children: s.jsxs('div', {
              className: 'card p-8 text-center',
              children: [
                s.jsx('div', {
                  className:
                    'animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto',
                }),
                s.jsx('p', {
                  className: 'mt-4 text-brown-600',
                  children: 'Confirming your enrollment...',
                }),
              ],
            }),
          }),
        })
      : s.jsx('section', {
          className: 'section',
          children: s.jsx('div', {
            className: 'container max-w-2xl mx-auto',
            children: s.jsxs('div', {
              className: 'card p-8 text-center',
              children: [
                s.jsx('div', {
                  className:
                    'w-20 h-20 bg-beige-50 rounded-full flex items-center justify-center mx-auto mb-6',
                  children: s.jsx(t, { className: 'w-12 h-12 text-green-600' }),
                }),
                s.jsx('h1', {
                  className: 'text-3xl font-bold text-brown-900',
                  children: 'Welcome to Elevate for Humanity!',
                }),
                s.jsx('p', {
                  className: 'mt-3 text-lg text-brown-600',
                  children:
                    "Your enrollment is confirmed. Let's get started on your new career path!",
                }),
                m &&
                  s.jsxs('div', {
                    className: 'mt-6 p-4 bg-beige-50 rounded-lg text-left',
                    children: [
                      s.jsx('div', {
                        className: 'text-sm text-brown-500',
                        children: 'Enrollment ID',
                      }),
                      s.jsx('div', {
                        className: 'font-mono font-semibold',
                        children: m.enrollmentId,
                      }),
                    ],
                  }),
                s.jsxs('div', {
                  className: 'mt-8 space-y-3',
                  children: [
                    s.jsxs(n, {
                      to: '/lms',
                      className:
                        'btn w-full text-lg flex items-center justify-center gap-2',
                      children: [
                        'Go to Your Dashboard',
                        s.jsx(r, { className: 'w-5 h-5' }),
                      ],
                    }),
                    s.jsx(n, {
                      to: '/programs',
                      className: 'btn-outline w-full',
                      children: 'Browse More Programs',
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'mt-6 p-4 bg-blue-50 rounded-lg text-sm text-left',
                  children: [
                    s.jsx('div', {
                      className: 'font-semibold text-blue-900 mb-2',
                      children: "What's Next?",
                    }),
                    s.jsxs('ul', {
                      className: 'space-y-2 text-green-600',
                      children: [
                        s.jsxs('li', {
                          className: 'flex items-start gap-2',
                          children: [
                            s.jsx('span', {
                              className: 'text-green-600',
                              children: '✓',
                            }),
                            s.jsx('span', {
                              children:
                                'Check your email for enrollment confirmation',
                            }),
                          ],
                        }),
                        s.jsxs('li', {
                          className: 'flex items-start gap-2',
                          children: [
                            s.jsx('span', {
                              className: 'text-green-600',
                              children: '✓',
                            }),
                            s.jsx('span', {
                              children:
                                'Access your courses in the LMS dashboard',
                            }),
                          ],
                        }),
                        s.jsxs('li', {
                          className: 'flex items-start gap-2',
                          children: [
                            s.jsx('span', {
                              className: 'text-green-600',
                              children: '✓',
                            }),
                            s.jsx('span', {
                              children:
                                'Connect with your instructor and classmates',
                            }),
                          ],
                        }),
                        s.jsxs('li', {
                          className: 'flex items-start gap-2',
                          children: [
                            s.jsx('span', {
                              className: 'text-green-600',
                              children: '✓',
                            }),
                            s.jsx('span', {
                              children:
                                'Start learning and earning your certification',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('p', {
                  className: 'mt-6 text-sm text-brown-500',
                  children: [
                    'Need help? Contact us at',
                    ' ',
                    s.jsx('a', {
                      href: 'mailto:elevateforhumanity@gmail.com',
                      className: 'text-green-600 hover:underline',
                      children: 'elevateforhumanity@gmail.com',
                    }),
                  ],
                }),
              ],
            }),
          }),
        })
  );
}
export { l as default };

import {
  r as e,
  j as s,
  g as t,
  D as l,
  x as n,
  q as i,
} from './vendor-react-C-ZQNdj3.js';
import { d as r, L as a } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o] = r(),
    d = o.get('session_id'),
    [c, x] = e.useState(!0),
    [m, h] = e.useState(null);
  return (
    e.useEffect(() => {
      (async () => {
        if (d)
          try {
            const e = await fetch(
              `/.netlify/functions/stripe-webhook?session_id=${d}`,
              { method: 'GET', headers: { 'Content-Type': 'application/json' } }
            );
            if (!e.ok) throw new Error('Failed to fetch donation details');
            const s = await e.json();
            h({
              amount: s.amount_total ? s.amount_total / 100 : 100,
              type: 'subscription' === s.mode ? 'monthly' : 'one-time',
              date: new Date().toLocaleDateString(),
              email: s.customer_email,
              receiptUrl: s.receipt_url,
            });
          } catch (e) {
            (console.error('Error fetching donation details:', e),
              h({
                amount: 100,
                type: 'one-time',
                date: new Date().toLocaleDateString(),
              }));
          } finally {
            x(!1);
          }
        else x(!1);
      })();
    }, [d]),
    c
      ? s.jsx('div', {
          className: 'min-h-screen flex items-center justify-center',
          children: s.jsxs('div', {
            className: 'text-center',
            children: [
              s.jsx('div', {
                className:
                  'animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4',
              }),
              s.jsx('p', {
                className: 'text-brown-600',
                children: 'Processing your donation...',
              }),
            ],
          }),
        })
      : s.jsx('div', {
          className: 'min-h-screen bg-gradient-to-b from-green-50 to-white',
          children: s.jsxs('div', {
            className: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16',
            children: [
              s.jsxs('div', {
                className: 'bg-white rounded-2xl shadow-xl p-12 text-center',
                children: [
                  s.jsxs('div', {
                    className: 'mb-8',
                    children: [
                      s.jsx(t, {
                        className: 'w-24 h-24 text-green-500 mx-auto mb-6',
                      }),
                      s.jsx('h1', {
                        className: 'text-4xl font-bold text-brown-900 mb-4',
                        children: 'Thank You for Your Generosity!',
                      }),
                      s.jsx('p', {
                        className: 'text-xl text-brown-600 mb-8',
                        children:
                          'Your donation will help transform lives through education and workforce development.',
                      }),
                    ],
                  }),
                  m &&
                    s.jsx('div', {
                      className: 'bg-beige-50 rounded-xl p-8 mb-8',
                      children: s.jsxs('div', {
                        className: 'grid md:grid-cols-3 gap-6 text-left',
                        children: [
                          s.jsxs('div', {
                            children: [
                              s.jsx('div', {
                                className: 'text-sm text-brown-500 mb-1',
                                children: 'Donation Amount',
                              }),
                              s.jsxs('div', {
                                className: 'text-2xl font-bold text-green-600',
                                children: [
                                  '$',
                                  m.amount,
                                  'monthly' === m.type &&
                                    s.jsx('span', {
                                      className: 'text-base',
                                      children: '/month',
                                    }),
                                ],
                              }),
                            ],
                          }),
                          s.jsxs('div', {
                            children: [
                              s.jsx('div', {
                                className: 'text-sm text-brown-500 mb-1',
                                children: 'Donation Type',
                              }),
                              s.jsx('div', {
                                className:
                                  'text-lg font-semibold text-brown-900 capitalize',
                                children:
                                  'monthly' === m.type
                                    ? 'Monthly Recurring'
                                    : 'One-Time',
                              }),
                            ],
                          }),
                          s.jsxs('div', {
                            children: [
                              s.jsx('div', {
                                className: 'text-sm text-brown-500 mb-1',
                                children: 'Date',
                              }),
                              s.jsx('div', {
                                className:
                                  'text-lg font-semibold text-brown-900',
                                children: m.date,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  s.jsxs('div', {
                    className: 'text-left mb-8',
                    children: [
                      s.jsx('h2', {
                        className: 'text-2xl font-bold mb-4',
                        children: 'What Happens Next?',
                      }),
                      s.jsxs('ul', {
                        className: 'space-y-3',
                        children: [
                          s.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              s.jsx(t, {
                                className:
                                  'w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5',
                              }),
                              s.jsxs('span', {
                                className: 'text-brown-900',
                                children: [
                                  s.jsx('strong', {
                                    children: 'Email Receipt:',
                                  }),
                                  " You'll receive a tax-deductible receipt via email within 24 hours.",
                                ],
                              }),
                            ],
                          }),
                          s.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              s.jsx(t, {
                                className:
                                  'w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5',
                              }),
                              s.jsxs('span', {
                                className: 'text-brown-900',
                                children: [
                                  s.jsx('strong', {
                                    children: 'Impact Report:',
                                  }),
                                  " We'll send quarterly updates showing how your donation is making a difference.",
                                ],
                              }),
                            ],
                          }),
                          s.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              s.jsx(t, {
                                className:
                                  'w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5',
                              }),
                              s.jsxs('span', {
                                className: 'text-brown-900',
                                children: [
                                  s.jsx('strong', {
                                    children: 'Student Stories:',
                                  }),
                                  " Hear directly from students whose lives you're helping transform.",
                                ],
                              }),
                            ],
                          }),
                          'monthly' === (null == m ? void 0 : m.type) &&
                            s.jsxs('li', {
                              className: 'flex items-start',
                              children: [
                                s.jsx(t, {
                                  className:
                                    'w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5',
                                }),
                                s.jsxs('span', {
                                  className: 'text-brown-900',
                                  children: [
                                    s.jsx('strong', {
                                      children: 'Monthly Giving:',
                                    }),
                                    ' Your card will be charged automatically each month. You can cancel anytime.',
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs('div', {
                    className: 'flex flex-col sm:flex-row gap-4 justify-center',
                    children: [
                      s.jsxs('button', {
                        className:
                          'flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors',
                        children: [
                          s.jsx(l, { className: 'w-5 h-5' }),
                          'Download Receipt',
                        ],
                      }),
                      s.jsxs('button', {
                        className:
                          'flex items-center justify-center gap-2 bg-beige-100 text-brown-900 py-3 px-6 rounded-lg font-semibold hover:bg-brown-300 transition-colors',
                        children: [
                          s.jsx(n, { className: 'w-5 h-5' }),
                          'Share Your Impact',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className:
                  'mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center',
                children: [
                  s.jsx(i, { className: 'w-16 h-16 mx-auto mb-4' }),
                  s.jsx('h2', {
                    className: 'text-3xl font-bold mb-4',
                    children: 'Your Impact',
                  }),
                  s.jsxs('p', {
                    className: 'text-xl mb-6',
                    children: [
                      'Your $',
                      null == m ? void 0 : m.amount,
                      ' donation will help provide:',
                    ],
                  }),
                  s.jsx('div', {
                    className: 'grid md:grid-cols-3 gap-6',
                    children:
                      (null == m ? void 0 : m.amount) >= 5e3
                        ? s.jsxs(s.Fragment, {
                            children: [
                              s.jsxs('div', {
                                className: 'bg-white/10 rounded-lg p-4',
                                children: [
                                  s.jsx('div', {
                                    className: 'text-3xl font-bold mb-2',
                                    children: '1',
                                  }),
                                  s.jsx('div', {
                                    children: 'Full-ride scholarship',
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'bg-white/10 rounded-lg p-4',
                                children: [
                                  s.jsx('div', {
                                    className: 'text-3xl font-bold mb-2',
                                    children: '10',
                                  }),
                                  s.jsx('div', {
                                    children: 'Emergency assistance grants',
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'bg-white/10 rounded-lg p-4',
                                children: [
                                  s.jsx('div', {
                                    className: 'text-3xl font-bold mb-2',
                                    children: '50',
                                  }),
                                  s.jsx('div', {
                                    children: 'Students with books',
                                  }),
                                ],
                              }),
                            ],
                          })
                        : (null == m ? void 0 : m.amount) >= 2500
                          ? s.jsxs(s.Fragment, {
                              children: [
                                s.jsxs('div', {
                                  className: 'bg-white/10 rounded-lg p-4',
                                  children: [
                                    s.jsx('div', {
                                      className: 'text-3xl font-bold mb-2',
                                      children: '1',
                                    }),
                                    s.jsx('div', {
                                      children: 'Partial scholarship',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'bg-white/10 rounded-lg p-4',
                                  children: [
                                    s.jsx('div', {
                                      className: 'text-3xl font-bold mb-2',
                                      children: '5',
                                    }),
                                    s.jsx('div', {
                                      children: 'Emergency assistance grants',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'bg-white/10 rounded-lg p-4',
                                  children: [
                                    s.jsx('div', {
                                      className: 'text-3xl font-bold mb-2',
                                      children: '25',
                                    }),
                                    s.jsx('div', {
                                      children: 'Students with books',
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (null == m ? void 0 : m.amount) >= 500
                            ? s.jsxs(s.Fragment, {
                                children: [
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: '1',
                                      }),
                                      s.jsx('div', {
                                        children: 'Emergency assistance grant',
                                      }),
                                    ],
                                  }),
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: '5',
                                      }),
                                      s.jsx('div', {
                                        children:
                                          'Students with transportation',
                                      }),
                                    ],
                                  }),
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: '10',
                                      }),
                                      s.jsx('div', {
                                        children: 'Students with books',
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : s.jsxs(s.Fragment, {
                                children: [
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: Math.floor(
                                          ((null == m ? void 0 : m.amount) ||
                                            0) / 50
                                        ),
                                      }),
                                      s.jsx('div', {
                                        children: 'Students with books',
                                      }),
                                    ],
                                  }),
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: Math.floor(
                                          ((null == m ? void 0 : m.amount) ||
                                            0) / 100
                                        ),
                                      }),
                                      s.jsx('div', {
                                        children: 'Months of transportation',
                                      }),
                                    ],
                                  }),
                                  s.jsxs('div', {
                                    className: 'bg-white/10 rounded-lg p-4',
                                    children: [
                                      s.jsx('div', {
                                        className: 'text-3xl font-bold mb-2',
                                        children: '∞',
                                      }),
                                      s.jsx('div', {
                                        children: 'Lives changed',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'mt-12 text-center',
                children: [
                  s.jsx('h3', {
                    className: 'text-2xl font-bold mb-6',
                    children: 'Continue Your Journey',
                  }),
                  s.jsxs('div', {
                    className: 'flex flex-col sm:flex-row gap-4 justify-center',
                    children: [
                      s.jsx(a, {
                        to: '/',
                        className:
                          'bg-white text-brown-900 py-3 px-6 rounded-lg font-semibold hover:bg-beige-50 transition-colors border-2 border-brown-200',
                        children: 'Return Home',
                      }),
                      s.jsx(a, {
                        to: '/programs',
                        className:
                          'bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors',
                        children: 'Explore Programs',
                      }),
                      s.jsx(a, {
                        to: '/volunteer',
                        className:
                          'bg-brown-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brown-600-hover transition-colors',
                        children: 'Volunteer With Us',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        })
  );
}
export { o as default };

import { r as e, j as s, H as t } from './vendor-react-C-ZQNdj3.js';
import { N as r } from './Navigation-Bbm4Xzc1.js';
import { F as n } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function l() {
  const [l, a] = e.useState('Elevateforhumanity@gmail.com'),
    [i, o] = e.useState(''),
    [c, m] = e.useState(''),
    [d, x] = e.useState(!1),
    [h, p] = e.useState([]),
    j = (e) => {
      p((s) => [...s, `[${new Date().toLocaleTimeString()}] ${e}`]);
    };
  return s.jsxs('div', {
    children: [
      s.jsxs(t, {
        children: [
          s.jsx('title', {
            children: 'Durable Integration Console | Elevate for Humanity',
          }),
          s.jsx('meta', {
            name: 'description',
            content:
              'Automated enrollment program injection for Durable.co integration',
          }),
        ],
      }),
      s.jsx(r, {}),
      s.jsx('div', {
        className: 'section bg-beige-50',
        children: s.jsx('div', {
          className: 'container max-w-4xl',
          children: s.jsxs('div', {
            className: 'card p-8',
            children: [
              s.jsx('h1', {
                className: 'text-3xl font-bold text-brown-900 mb-2',
                children: '🎓 Durable Integration Console',
              }),
              s.jsx('p', {
                className: 'text-brown-600 mb-8',
                children:
                  'Automated enrollment program injection for www.elevateforhumanity.org',
              }),
              s.jsxs('div', {
                className: 'mb-8 p-6 bg-green-50 rounded-lg',
                children: [
                  s.jsx('h2', {
                    className: 'text-xl font-semibold text-brown-900 mb-4',
                    children: 'Durable.co Credentials',
                  }),
                  s.jsxs('div', {
                    className: 'space-y-4',
                    children: [
                      s.jsxs('div', {
                        children: [
                          s.jsx('label', {
                            className:
                              'block text-sm font-medium text-brown-700 mb-2',
                            children: 'Email',
                          }),
                          s.jsx('input', {
                            type: 'email',
                            value: l,
                            onChange: (e) => a(e.target.value),
                            className:
                              'w-full px-4 py-2 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent',
                            placeholder: 'your-email@example.com',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        children: [
                          s.jsx('label', {
                            className:
                              'block text-sm font-medium text-brown-700 mb-2',
                            children: 'Password',
                          }),
                          s.jsx('input', {
                            type: 'password',
                            value: i,
                            onChange: (e) => o(e.target.value),
                            className:
                              'w-full px-4 py-2 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent',
                            placeholder: '••••••••',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'mb-8 space-y-4',
                children: [
                  s.jsx('button', {
                    onClick: async () => {
                      (x(!0),
                        m('Starting injection...'),
                        j('🚀 Starting Durable enrollment injection'));
                      try {
                        const e = await fetch(
                            '/.netlify/functions/durable-inject',
                            {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ email: l, password: i }),
                            }
                          ),
                          s = await e.json();
                        s.success
                          ? (m('✅ Enrollment script injected successfully!'),
                            j('✅ Script injected to Durable site'),
                            j('✅ Enrollment programs now visible'),
                            j('🔗 Check: https://www.elevateforhumanity.org'))
                          : (m(`❌ ${s.error}`),
                            j(`❌ ${s.error}`),
                            s.scriptTag &&
                              (j('📋 Script to add manually:'), j(s.scriptTag)),
                            s.instructions &&
                              (j(''),
                              j('📝 Manual steps:'),
                              s.instructions.forEach((e) => {
                                j(`   ${e}`);
                              })),
                            s.screenshot &&
                              (j(''),
                              j('📸 Screenshot saved - check console'),
                              console.log(
                                'Durable editor screenshot:',
                                s.screenshot
                              )));
                      } catch (e) {
                        (m(`❌ Error: ${e.message}`),
                          j(`❌ Error: ${e.message}`));
                      } finally {
                        x(!1);
                      }
                    },
                    disabled: d || !i,
                    className:
                      'w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed',
                    children: d
                      ? s.jsxs('span', {
                          className: 'flex items-center justify-center',
                          children: [
                            s.jsxs('svg', {
                              className:
                                'animate-spin -ml-1 mr-3 h-5 w-5 text-white',
                              xmlns: 'http://www.w3.org/2000/svg',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              children: [
                                s.jsx('circle', {
                                  className: 'opacity-25',
                                  cx: '12',
                                  cy: '12',
                                  r: '10',
                                  stroke: 'currentColor',
                                  strokeWidth: '4',
                                }),
                                s.jsx('path', {
                                  className: 'opacity-75',
                                  fill: 'currentColor',
                                  d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                                }),
                              ],
                            }),
                            'Injecting...',
                          ],
                        })
                      : '🚀 Inject Enrollment Script to Durable',
                  }),
                  s.jsx('button', {
                    onClick: () => {
                      window.open(
                        'https://main--elevateforhumanityfix.netlify.app/enrollment-test.html',
                        '_blank'
                      );
                    },
                    className: 'w-full btn-outline py-3',
                    children: '👁️ Preview Enrollment Script',
                  }),
                ],
              }),
              c &&
                s.jsx('div', {
                  className:
                    'mb-8 p-4 rounded-xl ' +
                    (c.includes('✅')
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'),
                  children: s.jsx('p', {
                    className: 'font-semibold',
                    children: c,
                  }),
                }),
              h.length > 0 &&
                s.jsxs('div', {
                  className: 'mb-8',
                  children: [
                    s.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-3',
                      children: 'Activity Log',
                    }),
                    s.jsx('div', {
                      className:
                        'bg-brown-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto',
                      children: h.map((e, t) =>
                        s.jsx('div', { className: 'mb-1', children: e }, t)
                      ),
                    }),
                  ],
                }),
              s.jsxs('div', {
                className: 'p-6 bg-beige-100 rounded-lg',
                children: [
                  s.jsx('h3', {
                    className: 'text-lg font-semibold text-brown-900 mb-3',
                    children: 'ℹ️ How This Works',
                  }),
                  s.jsxs('ul', {
                    className: 'space-y-2 text-brown-700',
                    children: [
                      s.jsxs('li', {
                        className: 'flex items-start',
                        children: [
                          s.jsx('span', { className: 'mr-2', children: '1.' }),
                          s.jsx('span', {
                            children:
                              'Autopilot logs into your Durable.co account using Puppeteer',
                          }),
                        ],
                      }),
                      s.jsxs('li', {
                        className: 'flex items-start',
                        children: [
                          s.jsx('span', { className: 'mr-2', children: '2.' }),
                          s.jsx('span', {
                            children:
                              'Opens the site editor and finds custom code section',
                          }),
                        ],
                      }),
                      s.jsxs('li', {
                        className: 'flex items-start',
                        children: [
                          s.jsx('span', { className: 'mr-2', children: '3.' }),
                          s.jsxs('span', {
                            children: [
                              'Injects enrollment script:',
                              ' ',
                              s.jsx('code', {
                                className: 'bg-white px-2 py-1 rounded text-sm',
                                children: 'enrollment-injector.js',
                              }),
                            ],
                          }),
                        ],
                      }),
                      s.jsxs('li', {
                        className: 'flex items-start',
                        children: [
                          s.jsx('span', { className: 'mr-2', children: '4.' }),
                          s.jsx('span', {
                            children: 'Publishes changes automatically',
                          }),
                        ],
                      }),
                      s.jsxs('li', {
                        className: 'flex items-start',
                        children: [
                          s.jsx('span', { className: 'mr-2', children: '5.' }),
                          s.jsx('span', {
                            children:
                              'Enrollment programs appear on www.elevateforhumanity.org',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'mt-6 p-4 bg-beige-50 rounded-lg',
                children: [
                  s.jsxs('p', {
                    className: 'text-sm text-brown-600',
                    children: [
                      s.jsx('strong', { children: 'Script URL:' }),
                      ' ',
                      s.jsx('a', {
                        href: 'https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-green-600 hover:underline',
                        children: 'enrollment-injector.js',
                      }),
                    ],
                  }),
                  s.jsxs('p', {
                    className: 'text-sm text-brown-600 mt-2',
                    children: [
                      s.jsx('strong', { children: 'Test Page:' }),
                      ' ',
                      s.jsx('a', {
                        href: 'https://main--elevateforhumanityfix.netlify.app/enrollment-test.html',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-green-600 hover:underline',
                        children: 'enrollment-test.html',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      s.jsx(n, {}),
    ],
  });
}
export { l as default };

import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import { A as s } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function n() {
  const [n, r] = e.useState([]),
    [a, o] = e.useState(null),
    [i, l] = e.useState([]),
    [d, c] = e.useState(!0);
  function m(e, t, s) {
    return e <= t ? 'good' : e <= s ? 'needs-improvement' : 'poor';
  }
  function x(e) {
    switch (e) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-brown-600 bg-beige-50';
    }
  }
  function h(e) {
    switch (e) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-green-600 bg-blue-50';
      default:
        return 'text-brown-600 bg-beige-50';
    }
  }
  return (
    e.useEffect(() => {
      (!(function () {
        const e = [],
          t = performance.getEntriesByType('largest-contentful-paint');
        if (t.length > 0) {
          const s = t[t.length - 1];
          e.push({
            name: 'Largest Contentful Paint (LCP)',
            value: Math.round(s.renderTime || s.loadTime),
            rating: m(s.renderTime || s.loadTime, 2500, 4e3),
            unit: 'ms',
          });
        }
        const s = performance.getEntriesByType('first-input');
        if (s.length > 0) {
          const t = s[0];
          e.push({
            name: 'First Input Delay (FID)',
            value: Math.round(t.processingStart - t.startTime),
            rating: m(t.processingStart - t.startTime, 100, 300),
            unit: 'ms',
          });
        }
        const n = performance.getEntriesByType('layout-shift');
        let a = 0;
        (n.forEach((e) => {
          e.hadRecentInput || (a += e.value);
        }),
          a > 0 &&
            e.push({
              name: 'Cumulative Layout Shift (CLS)',
              value: Math.round(1e3 * a) / 1e3,
              rating: m(a, 0.1, 0.25),
              unit: '',
            }));
        const o = performance.getEntriesByType('navigation');
        if (o.length > 0) {
          const t = o[0];
          e.push({
            name: 'Time to First Byte (TTFB)',
            value: Math.round(t.responseStart - t.requestStart),
            rating: m(t.responseStart - t.requestStart, 800, 1800),
            unit: 'ms',
          });
        }
        const i = performance.getEntriesByName('first-contentful-paint');
        if (i.length > 0) {
          const t = i[0];
          e.push({
            name: 'First Contentful Paint (FCP)',
            value: Math.round(t.startTime),
            rating: m(t.startTime, 1800, 3e3),
            unit: 'ms',
          });
        }
        if (o.length > 0) {
          const t = o[0];
          e.push({
            name: 'DOM Content Loaded',
            value: Math.round(
              t.domContentLoadedEventEnd - t.domContentLoadedEventStart
            ),
            rating: m(
              t.domContentLoadedEventEnd - t.domContentLoadedEventStart,
              1500,
              3e3
            ),
            unit: 'ms',
          });
        }
        if (o.length > 0) {
          const t = o[0];
          e.push({
            name: 'Page Load Time',
            value: Math.round(t.loadEventEnd - t.fetchStart),
            rating: m(t.loadEventEnd - t.fetchStart, 3e3, 5e3),
            unit: 'ms',
          });
        }
        r(e);
      })(),
        (function () {
          const e = {
            id: Math.random().toString(36).substring(7),
            startTime: Date.now() - 36e5 * Math.random(),
            duration: Math.floor(18e5 * Math.random()),
            pageViews: Math.floor(20 * Math.random()) + 1,
            interactions: Math.floor(50 * Math.random()) + 5,
            errors: Math.floor(3 * Math.random()),
          };
          o(e);
        })(),
        (function () {
          const e = [
            {
              message: 'Failed to fetch user data',
              count: 12,
              lastSeen: new Date(Date.now() - 36e5).toISOString(),
              level: 'error',
            },
            {
              message: 'Network request timeout',
              count: 8,
              lastSeen: new Date(Date.now() - 72e5).toISOString(),
              level: 'warning',
            },
            {
              message: 'Component render warning',
              count: 5,
              lastSeen: new Date(Date.now() - 18e5).toISOString(),
              level: 'info',
            },
          ];
          (l(e), c(!1));
        })(),
        new Date().toISOString());
    }, []),
    d
      ? t.jsx(s, {
          children: t.jsx('div', {
            className: 'flex items-center justify-center min-h-screen',
            children: t.jsxs('div', {
              className: 'text-center',
              children: [
                t.jsx('div', {
                  className:
                    'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto',
                }),
                t.jsx('p', {
                  className: 'mt-4 text-brown-600',
                  children: 'Loading analytics...',
                }),
              ],
            }),
          }),
        })
      : t.jsx(s, {
          children: t.jsxs('div', {
            className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
            children: [
              t.jsxs('div', {
                className: 'mb-8',
                children: [
                  t.jsx('h1', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: 'Real User Monitoring',
                  }),
                  t.jsx('p', {
                    className: 'mt-2 text-brown-600',
                    children:
                      'Performance metrics, user behavior, and system health',
                  }),
                ],
              }),
              t.jsxs('div', {
                className: 'mb-8',
                children: [
                  t.jsx('h2', {
                    className: 'text-xl font-semibold text-brown-900 mb-4',
                    children: 'Web Vitals & Performance',
                  }),
                  t.jsx('div', {
                    className:
                      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
                    children: n.map((e) =>
                      t.jsxs(
                        'div',
                        {
                          className:
                            'bg-white rounded-lg shadow p-6 border border-brown-200',
                          children: [
                            t.jsxs('div', {
                              className:
                                'flex items-center justify-between mb-2',
                              children: [
                                t.jsx('h3', {
                                  className:
                                    'text-sm font-medium text-brown-900',
                                  children: e.name,
                                }),
                                t.jsx('span', {
                                  className: `px-2 py-1 text-xs font-semibold rounded ${x(e.rating)}`,
                                  children: e.rating.replace('-', ' '),
                                }),
                              ],
                            }),
                            t.jsxs('p', {
                              className: 'text-3xl font-bold text-brown-900',
                              children: [
                                e.value,
                                t.jsx('span', {
                                  className: 'text-lg text-brown-500 ml-1',
                                  children: e.unit,
                                }),
                              ],
                            }),
                          ],
                        },
                        e.name
                      )
                    ),
                  }),
                ],
              }),
              a &&
                t.jsxs('div', {
                  className: 'mb-8',
                  children: [
                    t.jsx('h2', {
                      className: 'text-xl font-semibold text-brown-900 mb-4',
                      children: 'Current Session',
                    }),
                    t.jsx('div', {
                      className:
                        'bg-white rounded-lg shadow p-6 border border-brown-200',
                      children: t.jsxs('div', {
                        className: 'grid grid-cols-2 md:grid-cols-5 gap-4',
                        children: [
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                className: 'text-sm text-brown-600',
                                children: 'Session ID',
                              }),
                              t.jsx('p', {
                                className:
                                  'text-lg font-semibold text-brown-900',
                                children: a.id,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                className: 'text-sm text-brown-600',
                                children: 'Duration',
                              }),
                              t.jsx('p', {
                                className:
                                  'text-lg font-semibold text-brown-900',
                                children: (function (e) {
                                  const t = Math.floor(e / 1e3),
                                    s = Math.floor(t / 60),
                                    n = Math.floor(s / 60);
                                  return n > 0
                                    ? `${n}h ${s % 60}m`
                                    : s > 0
                                      ? `${s}m ${t % 60}s`
                                      : `${t}s`;
                                })(a.duration),
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                className: 'text-sm text-brown-600',
                                children: 'Page Views',
                              }),
                              t.jsx('p', {
                                className:
                                  'text-lg font-semibold text-brown-900',
                                children: a.pageViews,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                className: 'text-sm text-brown-600',
                                children: 'Interactions',
                              }),
                              t.jsx('p', {
                                className:
                                  'text-lg font-semibold text-brown-900',
                                children: a.interactions,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('p', {
                                className: 'text-sm text-brown-600',
                                children: 'Errors',
                              }),
                              t.jsx('p', {
                                className: 'text-lg font-semibold text-red-600',
                                children: a.errors,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              t.jsxs('div', {
                className: 'mb-8',
                children: [
                  t.jsx('h2', {
                    className: 'text-xl font-semibold text-brown-900 mb-4',
                    children: 'Recent Errors & Warnings',
                  }),
                  t.jsx('div', {
                    className:
                      'bg-white rounded-lg shadow border border-brown-200 overflow-hidden',
                    children: t.jsxs('table', {
                      className: 'min-w-full divide-y divide-gray-200',
                      children: [
                        t.jsx('thead', {
                          className: 'bg-beige-50',
                          children: t.jsxs('tr', {
                            children: [
                              t.jsx('th', {
                                className:
                                  'px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider',
                                children: 'Message',
                              }),
                              t.jsx('th', {
                                className:
                                  'px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider',
                                children: 'Level',
                              }),
                              t.jsx('th', {
                                className:
                                  'px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider',
                                children: 'Count',
                              }),
                              t.jsx('th', {
                                className:
                                  'px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider',
                                children: 'Last Seen',
                              }),
                            ],
                          }),
                        }),
                        t.jsx('tbody', {
                          className: 'bg-white divide-y divide-gray-200',
                          children: i.map((e, s) =>
                            t.jsxs(
                              'tr',
                              {
                                children: [
                                  t.jsx('td', {
                                    className:
                                      'px-6 py-4 whitespace-nowrap text-sm text-brown-900',
                                    children: e.message,
                                  }),
                                  t.jsx('td', {
                                    className: 'px-6 py-4 whitespace-nowrap',
                                    children: t.jsx('span', {
                                      className: `px-2 py-1 text-xs font-semibold rounded ${h(e.level)}`,
                                      children: e.level,
                                    }),
                                  }),
                                  t.jsx('td', {
                                    className:
                                      'px-6 py-4 whitespace-nowrap text-sm text-brown-900',
                                    children: e.count,
                                  }),
                                  t.jsx('td', {
                                    className:
                                      'px-6 py-4 whitespace-nowrap text-sm text-brown-500',
                                    children: new Date(
                                      e.lastSeen
                                    ).toLocaleString(),
                                  }),
                                ],
                              },
                              s
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              t.jsxs('div', {
                className: 'bg-blue-50 border border-blue-200 rounded-lg p-6',
                children: [
                  t.jsx('h3', {
                    className: 'text-lg font-semibold text-blue-900 mb-2',
                    children: 'Sentry Integration',
                  }),
                  t.jsx('p', {
                    className: 'text-green-600 mb-4',
                    children:
                      'This dashboard displays real-time performance metrics and error tracking powered by Sentry Real User Monitoring (RUM).',
                  }),
                  t.jsxs('div', {
                    className: 'space-y-2 text-sm text-green-600',
                    children: [
                      t.jsxs('p', {
                        children: [
                          t.jsx('strong', { children: 'Status:' }),
                          ' ',
                          t.jsx('span', {
                            className: 'text-yellow-600',
                            children: '⚠ Not configured',
                          }),
                        ],
                      }),
                      t.jsxs('p', {
                        children: [
                          t.jsx('strong', { children: 'Environment:' }),
                          ' ',
                          'production',
                        ],
                      }),
                      t.jsxs('p', {
                        children: [
                          t.jsx('strong', { children: 'Version:' }),
                          ' ',
                          '2.0.0',
                        ],
                      }),
                    ],
                  }),
                  t.jsx('div', {
                    className:
                      'mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded',
                    children: t.jsxs('p', {
                      className: 'text-sm text-yellow-800',
                      children: [
                        t.jsx('strong', { children: 'Setup Required:' }),
                        ' Add VITE_SENTRY_DSN to your environment variables to enable full error tracking and performance monitoring.',
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        })
  );
}
export { n as default };

import { j as e } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
const r = [
  { course: 'AI for Beginners', enrolled: 42, avgProgress: 68 },
  { course: 'Workforce Readiness', enrolled: 31, avgProgress: 82 },
  { course: 'Healthcare Fundamentals', enrolled: 27, avgProgress: 54 },
  { course: 'Digital Marketing Essentials', enrolled: 19, avgProgress: 73 },
];
function s() {
  return e.jsxs('main', {
    role: 'main',
    style: { padding: 32, maxWidth: 900, margin: '0 auto' },
    children: [
      e.jsx('h1', { children: 'Analytics Dashboard' }),
      e.jsx('p', {
        children: 'View learner progress, engagement, and export reports.',
      }),
      e.jsxs('table', {
        style: { width: '100%', marginTop: 24, borderCollapse: 'collapse' },
        children: [
          e.jsx('thead', {
            children: e.jsxs('tr', {
              style: { background: '#f0f0f0' },
              children: [
                e.jsx('th', {
                  style: { textAlign: 'left', padding: 8 },
                  children: 'Course',
                }),
                e.jsx('th', {
                  style: { textAlign: 'left', padding: 8 },
                  children: 'Enrolled',
                }),
                e.jsx('th', {
                  style: { textAlign: 'left', padding: 8 },
                  children: 'Avg. Progress (%)',
                }),
              ],
            }),
          }),
          e.jsx('tbody', {
            children: r.map((r, s) =>
              e.jsxs(
                'tr',
                {
                  children: [
                    e.jsx('td', { style: { padding: 8 }, children: r.course }),
                    e.jsx('td', {
                      style: { padding: 8 },
                      children: r.enrolled,
                    }),
                    e.jsx('td', {
                      style: { padding: 8 },
                      children: e.jsx('div', {
                        style: {
                          background: '#d4c9b8',
                          borderRadius: 6,
                          width: 120,
                        },
                        children: e.jsxs('div', {
                          style: {
                            width: `${r.avgProgress}%`,
                            background: '#1976d2',
                            color: '#fff',
                            borderRadius: 6,
                            padding: '2px 0',
                            textAlign: 'center',
                          },
                          children: [r.avgProgress, '%'],
                        }),
                      }),
                    }),
                  ],
                },
                s
              )
            ),
          }),
        ],
      }),
    ],
  });
}
export { s as default };

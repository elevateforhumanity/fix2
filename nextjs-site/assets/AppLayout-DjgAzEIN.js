import { j as e, H as r } from './vendor-react-C-ZQNdj3.js';
import { ak as t } from './vendor-Da1LjC7-.js';
import { N as n } from './vendor-router-CQjfSXV_.js';
function i({ title: t, children: i }) {
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs(r, {
        children: [
          e.jsx('title', { children: t ? `${t} | App` : 'App' }),
          e.jsx('meta', {
            name: 'description',
            content: 'Workforce readiness and learning platform.',
          }),
        ],
      }),
      e.jsx('a', {
        href: '#main-content',
        className: 'skip-link',
        children: 'Skip to content',
      }),
      e.jsx('header', {
        style: { padding: '12px 24px', background: '#0f172a' },
        children: e.jsxs('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          },
          children: [
            e.jsxs('nav', {
              role: 'navigation',
              style: { display: 'flex', gap: 16, flexWrap: 'wrap' },
              children: [
                e.jsx(n, { style: o, to: '/', children: 'Home' }),
                e.jsx(n, { style: o, to: '/courses', children: 'Courses' }),
                e.jsx(n, { style: o, to: '/account', children: 'Account' }),
                e.jsx(n, { style: o, to: '/support', children: 'Support' }),
                e.jsx(n, { style: o, to: '/partners', children: 'Partners' }),
              ],
            }),
            e.jsxs('div', {
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: 'linear-gradient(to right, #059669, #10b981)',
                color: 'white',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              },
              children: [
                e.jsxs('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '16',
                  height: '16',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  children: [
                    e.jsx('circle', { cx: '12', cy: '8', r: '6' }),
                    e.jsx('path', {
                      d: 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11',
                    }),
                  ],
                }),
                e.jsx('span', { children: 'Buy Black Certified' }),
              ],
            }),
          ],
        }),
      }),
      e.jsx('main', { role: 'main', id: 'main-content', children: i }),
      e.jsxs('footer', {
        style: {
          padding: 24,
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--brand-text-muted)',
          borderTop: '1px solid var(--brand-border)',
        },
        children: [
          e.jsxs('div', {
            style: { marginBottom: 16 },
            children: [
              e.jsx(n, {
                style: s,
                to: '/privacy-policy',
                children: 'Privacy Policy',
              }),
              ' | ',
              e.jsx(n, {
                style: s,
                to: '/terms-of-service',
                children: 'Terms of Service',
              }),
              ' | ',
              e.jsx(n, {
                style: s,
                to: '/refund-policy',
                children: 'Refund Policy',
              }),
              ' | ',
              e.jsx(n, { style: s, to: '/support', children: 'Support' }),
            ],
          }),
          e.jsxs('div', {
            children: [
              '© ',
              new Date().getFullYear(),
              ' Elevate for Humanity. All rights reserved.',
            ],
          }),
        ],
      }),
    ],
  });
}
const o = ({ isActive: e }) => ({
    color: e ? '#38bdf8' : 'var(--brand-border)',
    textDecoration: 'none',
    fontWeight: 500,
  }),
  s = {
    color: 'var(--brand-text-muted)',
    textDecoration: 'none',
    fontSize: 12,
  };
i.propTypes = { title: t.string, children: t.node };
export { i as A };

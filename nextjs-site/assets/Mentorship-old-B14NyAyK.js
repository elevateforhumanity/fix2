import { j as e, r as t, H as r } from './vendor-react-C-ZQNdj3.js';
import { L as n } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
const o = () =>
  e.jsx('nav', {
    className: 'bg-white border-b border-gray-200 sticky top-0 z-50',
    children: e.jsx('div', {
      className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      children: e.jsxs('div', {
        className: 'flex justify-between h-16',
        children: [
          e.jsx('div', {
            className: 'flex items-center',
            children: e.jsx(n, {
              to: '/',
              className: 'text-xl font-bold text-brand-700',
              children: 'Elevate for Humanity',
            }),
          }),
          e.jsxs('div', {
            className: 'flex items-center space-x-8',
            children: [
              e.jsx(n, {
                to: '/programs',
                className: 'text-gray-700 hover:text-brand-600',
                children: 'Programs',
              }),
              e.jsx(n, {
                to: '/lms',
                className: 'text-gray-700 hover:text-brand-600',
                children: 'Learning',
              }),
              e.jsx(n, {
                to: '/community',
                className: 'text-gray-700 hover:text-brand-600',
                children: 'Community',
              }),
              e.jsx(n, {
                to: '/about',
                className: 'text-gray-700 hover:text-brand-600',
                children: 'About',
              }),
              e.jsx(n, {
                to: '/connect',
                className: 'text-gray-700 hover:text-brand-600',
                children: 'Connect',
              }),
            ],
          }),
        ],
      }),
    }),
  });
function s() {
  const [s, a] = t.useState(null),
    [i, c] = t.useState(!0);
  t.useEffect(() => {
    fetch('/api/checkout/product/prod_XXXXXXXXXXXX')
      .then((e) => e.json())
      .then((e) => {
        (a(e.markedUpPrice), c(!1));
      });
  }, []);
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs(r, {
        children: [
          e.jsx('title', {
            children: 'Elevate for Humanity | Empowering Students Worldwide',
          }),
          e.jsx('meta', {
            name: 'description',
            content:
              'Accessible, high-quality education and mentorship for all. Join Elevate for Humanity and our sister sites to grow, connect, and make a difference.',
          }),
        ],
      }),
      e.jsx('header', { children: e.jsx(o, {}) }),
      e.jsxs('main', {
        role: 'main',
        id: 'main-content',
        tabIndex: -1,
        style: { padding: 32 },
        children: [
          e.jsx('h1', { children: 'Mentorship Hub' }),
          e.jsx('p', {
            children:
              'Connect with experienced mentors for career guidance, skill development, and personal growth. Explore our directory or sign up to become a mentor.',
          }),
          e.jsx('img', {
            src: '/images/student.jpg',
            alt: 'A diverse group of students collaborating on a project',
            style: { width: '100%', height: 'auto', borderRadius: 8 },
          }),
          e.jsx('div', {
            style: { margin: '24px 0' },
            children: i
              ? e.jsx('span', { children: 'Loading price...' })
              : e.jsxs('button', {
                  onClick: async () => {
                    const e = await fetch(
                        '/api/checkout/create-checkout-session',
                        {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            priceId: 'price_XXXXXXXXXXXX',
                            partnerStripeAccountId: 'acct_XXXXXXXXXXXX',
                          }),
                        }
                      ),
                      t = await e.json();
                    window.location.href = t.url;
                  },
                  style: {
                    background: '#1976d2',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: 8,
                    fontWeight: 'bold',
                    fontSize: 20,
                    border: 'none',
                    cursor: 'pointer',
                  },
                  children: ['Buy Now for $', s.toFixed(2)],
                }),
          }),
          e.jsx('a', {
            href: 'https://buy.stripe.com/test_donation_link',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: {
              display: 'inline-block',
              background: '#388e3c',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: 8,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: 20,
              marginTop: 24,
            },
            children: 'Donate Now & Support Scholarships',
          }),
          e.jsx('div', {
            style: { marginTop: 32 },
            children: e.jsx(n, {
              to: '/courses',
              style: {
                display: 'inline-block',
                background: '#1976d2',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: 8,
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize: 20,
              },
              children: 'Course Library',
            }),
          }),
        ],
      }),
      e.jsx('footer', {
        children: e.jsxs('p', {
          children: [
            '© ',
            new Date().getFullYear(),
            ' Elevate for Humanity. All rights reserved.',
          ],
        }),
      }),
    ],
  });
}
export { s as default };

import { j as e } from './vendor-react-C-ZQNdj3.js';
import { P as r } from './ProgramCard-Cgx3ANiy.js';
import { p as s } from './programs-CGx4ILW0.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function a() {
  return e.jsxs('div', {
    className: 'min-h-screen bg-white text-brown-900',
    children: [
      e.jsx('header', {
        className: 'w-full border-b border-orange-200',
        children: e.jsxs('div', {
          className:
            'mx-auto max-w-6xl px-4 py-4 flex items-center justify-between',
          children: [
            e.jsxs('div', {
              className: 'flex items-center gap-3',
              children: [
                e.jsx('div', {
                  className: 'h-10 w-10 rounded-lg bg-orange-500',
                  'aria-hidden': !0,
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('p', {
                      className:
                        'text-xs uppercase tracking-widest text-brown-500',
                      children: 'Elevate for Humanity',
                    }),
                    e.jsx('h1', {
                      className: 'text-lg font-bold text-brown-900',
                      children: 'Career & Technical Institute',
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('nav', {
              role: 'navigation',
              className: 'hidden md:flex items-center gap-6 text-sm',
              children: [
                e.jsx('a', {
                  className: 'hover:text-orange-600',
                  href: '/',
                  children: 'Home',
                }),
                e.jsx('a', {
                  className: 'hover:text-orange-600',
                  href: '/programs',
                  children: 'Programs',
                }),
                e.jsx('a', {
                  className: 'hover:text-orange-600',
                  href: '/about',
                  children: 'About',
                }),
                e.jsx('a', {
                  className: 'hover:text-orange-600',
                  href: '/contact',
                  children: 'Contact',
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx('section', {
        className:
          'relative bg-gradient-to-br from-orange-50 via-white to-white',
        children: e.jsx('div', {
          className: 'mx-auto max-w-7xl px-6 py-20',
          children: e.jsxs('div', {
            className: 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('span', {
                    className:
                      'inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200',
                    children: 'Indiana • Workforce Development',
                  }),
                  e.jsx('h2', {
                    className:
                      'mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-brown-900',
                    children: 'Learn • Grow • Achieve',
                  }),
                  e.jsx('p', {
                    className: 'mt-4 text-brown-600 leading-relaxed',
                    children:
                      'Elevate for Humanity powers paid apprenticeships and stackable credentials across Indiana. We connect learners with state-approved training, employer partners, and funding — so you can start a career without the debt.',
                  }),
                  e.jsxs('div', {
                    className: 'mt-6 flex flex-wrap gap-3',
                    children: [
                      e.jsx('a', {
                        href: '/programs',
                        className:
                          'inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-white font-semibold shadow hover:bg-orange-700',
                        children: 'Explore Programs',
                      }),
                      e.jsx('a', {
                        href: '/apply',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className:
                          'inline-flex items-center justify-center rounded-xl border border-brown-300 px-5 py-3 font-semibold text-slate-800 hover:border-slate-400',
                        children: 'Apply Now',
                      }),
                    ],
                  }),
                  e.jsx('p', {
                    className: 'mt-3 text-xs text-brown-500',
                    children:
                      'Start with Indiana Career Connect • Funding: WIOA • WRG • WEX • OJT • Apprenticeship',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'relative',
                children: [
                  e.jsx('div', {
                    className:
                      'aspect-[4/3] w-full overflow-hidden rounded-2xl border border-orange-200 shadow-lg',
                    children: e.jsx('img', {
                      src: '/images/hero-banner.jpg',
                      alt: 'Elevate for Humanity — Career & Technical Training',
                      className: 'h-full w-full object-cover',
                      loading: 'eager',
                      onError: (e) => {
                        e.currentTarget.src = '/images/efh-barber-hero.jpg';
                      },
                    }),
                  }),
                  e.jsx('div', {
                    className:
                      'absolute -bottom-6 -right-6 hidden md:block rounded-2xl border border-brown-200 bg-white p-4 shadow-lg',
                    children: e.jsx('p', {
                      className: 'text-xs font-semibold text-brown-500',
                      children:
                        'State-Approved Provider • DOL Apprenticeship Sponsor',
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx('section', {
        className: 'bg-beige-50 border-y border-brown-200',
        children: e.jsxs('div', {
          className: 'mx-auto max-w-6xl px-4 py-14',
          children: [
            e.jsxs('div', {
              className: 'flex items-end justify-between gap-6',
              children: [
                e.jsxs('div', {
                  children: [
                    e.jsx('h3', {
                      className: 'text-2xl font-bold text-brown-900',
                      children: 'Featured Programs',
                    }),
                    e.jsx('p', {
                      className: 'mt-1 text-brown-600',
                      children:
                        'State-funded pathways with real employer partners and paid on‑the‑job training.',
                    }),
                  ],
                }),
                e.jsx('a', {
                  href: '/programs',
                  className:
                    'hidden md:inline-flex rounded-lg border border-brown-300 px-4 py-2 text-sm font-semibold hover:border-slate-400',
                  children: 'View all',
                }),
              ],
            }),
            e.jsx('div', {
              className: 'mt-8 grid grid-cols-1 md:grid-cols-2 gap-6',
              children: s.slice(0, 2).map((s) => e.jsx(r, { p: s }, s.slug)),
            }),
          ],
        }),
      }),
      e.jsx('section', {
        children: e.jsxs('div', {
          className: 'mx-auto max-w-6xl px-4 py-14',
          children: [
            e.jsx('h3', {
              className: 'text-2xl font-bold text-brown-900',
              children: 'How Enrollment Works',
            }),
            e.jsxs('ol', {
              className: 'mt-6 grid grid-cols-1 md:grid-cols-3 gap-6',
              children: [
                e.jsxs('li', {
                  className: 'rounded-2xl border border-brown-200 p-5',
                  children: [
                    e.jsx('p', {
                      className: 'text-sm font-semibold text-brown-900',
                      children: '1) Start Your Application',
                    }),
                    e.jsx('p', {
                      className: 'mt-1 text-brown-600',
                      children:
                        'Complete the Elevate interest form and apply through Indiana Connect.',
                    }),
                  ],
                }),
                e.jsxs('li', {
                  className: 'rounded-2xl border border-brown-200 p-5',
                  children: [
                    e.jsx('p', {
                      className: 'text-sm font-semibold text-brown-900',
                      children: '2) Funding & Placement',
                    }),
                    e.jsx('p', {
                      className: 'mt-1 text-brown-600',
                      children:
                        'We match you to WIOA/WRG funding and an employer partner for paid OJT.',
                    }),
                  ],
                }),
                e.jsxs('li', {
                  className: 'rounded-2xl border border-brown-200 p-5',
                  children: [
                    e.jsx('p', {
                      className: 'text-sm font-semibold text-brown-900',
                      children: '3) Train & Earn',
                    }),
                    e.jsx('p', {
                      className: 'mt-1 text-brown-600',
                      children:
                        'Complete related instruction while logging on‑the‑job hours toward your credential.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx('footer', {
        className: 'border-t border-brown-200',
        children: e.jsx('div', {
          className: 'mx-auto max-w-6xl px-4 py-10 text-sm text-brown-600',
          children: e.jsxs('div', {
            className:
              'flex flex-col md:flex-row items-start md:items-center justify-between gap-4',
            children: [
              e.jsxs('p', {
                children: [
                  '© ',
                  new Date().getFullYear(),
                  ' Elevate for Humanity — Learn • Grow • Achieve',
                ],
              }),
              e.jsxs('div', {
                className: 'flex items-center gap-4',
                children: [
                  e.jsx('a', {
                    href: '/privacy',
                    className: 'hover:text-orange-600',
                    children: 'Privacy',
                  }),
                  e.jsx('a', {
                    href: '/terms',
                    className: 'hover:text-orange-600',
                    children: 'Terms',
                  }),
                  e.jsx('a', {
                    href: '/contact',
                    className: 'hover:text-orange-600',
                    children: 'Contact',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
export { a as default };

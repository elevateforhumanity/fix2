import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import { L as s } from './vendor-router-CQjfSXV_.js';
const a = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Black businessman talking to large group of entrepreneurs during an education event in conference hall',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%234a3728" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="32"%3EEducation Event%3C/text%3E%3C/svg%3E',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Webinar E-learning Skills Business Internet Technology Concepts Training Webinar E-learning Skills',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%2300a544" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="32"%3EE-Learning%3C/text%3E%3C/svg%3E',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Corporate Training Presentation In Classroom',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%23f5f1e8" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%234a3728" font-size="32"%3ETraining Classroom%3C/text%3E%3C/svg%3E',
  },
];
function l({
  title: l,
  subtitle: r,
  badges: i = [],
  primaryButton: n,
  secondaryButton: o,
  showCarousel: c = !1,
  className: h = '',
}) {
  const [x, d] = e.useState(0);
  return (
    e.useEffect(() => {
      if (!c) return;
      const e = setInterval(() => {
        d((e) => (e + 1) % a.length);
      }, 5e3);
      return () => clearInterval(e);
    }, [c]),
    t.jsxs('section', {
      className: `hero ${h}`,
      children: [
        c &&
          t.jsxs('div', {
            className:
              'hero-carousel relative w-full h-[500px] overflow-hidden',
            children: [
              a.map((e, s) =>
                t.jsx(
                  'div',
                  {
                    className:
                      'absolute inset-0 transition-opacity duration-1000 ' +
                      (s === x ? 'opacity-100' : 'opacity-0'),
                    children: t.jsx('img', {
                      src: e.src,
                      alt: e.alt,
                      className: 'w-full h-full object-cover',
                      onError: (t) => {
                        t.currentTarget.src = e.fallback;
                      },
                    }),
                  },
                  s
                )
              ),
              t.jsx('div', {
                className:
                  'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2',
                children: a.map((e, s) =>
                  t.jsx(
                    'button',
                    {
                      onClick: () => d(s),
                      className:
                        'w-3 h-3 rounded-full transition-colors ' +
                        (s === x ? 'bg-white' : 'bg-white/50'),
                      'aria-label': `Go to slide ${s + 1}`,
                    },
                    s
                  )
                ),
              }),
              t.jsx('div', {
                className:
                  'absolute inset-0 bg-black/40 flex items-center justify-center',
                children: t.jsxs('div', {
                  className: 'container text-center text-white',
                  children: [
                    t.jsx('h1', {
                      className: 'text-5xl md:text-6xl font-bold mb-6',
                      children: l,
                    }),
                    t.jsx('p', {
                      className:
                        'text-xl md:text-2xl mb-8 max-w-[800px] mx-auto',
                      children: r,
                    }),
                    n &&
                      t.jsx(s, {
                        to: n.href,
                        className: 'button-white text-lg px-8 py-4',
                        children: n.text,
                      }),
                  ],
                }),
              }),
            ],
          }),
        !c &&
          t.jsx('div', {
            className: 'container',
            children: t.jsxs('div', {
              className: 'hero-content',
              children: [
                t.jsx('h1', { className: 'hero-title', children: l }),
                t.jsx('p', { className: 'hero-subtitle', children: r }),
                i.length > 0 &&
                  t.jsx('div', {
                    className: 'flex flex-wrap gap-6 justify-center mb-8',
                    children: i.map((e, s) =>
                      t.jsxs(
                        'span',
                        {
                          className:
                            'px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium',
                          children: [e.icon, ' ', e.text],
                        },
                        s
                      )
                    ),
                  }),
                (n || o) &&
                  t.jsxs('div', {
                    className: 'flex flex-wrap gap-6 justify-center',
                    children: [
                      n &&
                        t.jsx(s, {
                          to: n.href,
                          className: 'button',
                          children: n.text,
                        }),
                      o &&
                        t.jsx(s, {
                          to: o.href,
                          className: 'button-secondary',
                          children: o.text,
                        }),
                    ],
                  }),
              ],
            }),
          }),
      ],
    })
  );
}
export { l as H };

import { r as s, j as e } from './vendor-react-C-ZQNdj3.js';
import { l as r } from './programs-D_WNJ_Mg.js';
import './vendor-Da1LjC7-.js';
import './supa-DdKhhKHf.js';
import './vendor-supabase-C00Cu5KO.js';
function a() {
  const [a, l] = s.useState([]),
    [t, c] = s.useState(!0),
    [i, n] = s.useState(null);
  return (
    s.useEffect(() => {
      r()
        .then(l)
        .catch((s) => n(s.message))
        .finally(() => c(!1));
    }, []),
    t
      ? e.jsx('div', {
          className: 'section',
          children: e.jsx('div', {
            className: 'container',
            children: 'Loading…',
          }),
        })
      : i
        ? e.jsx('div', {
            className: 'section',
            children: e.jsx('div', {
              className: 'container text-red-600',
              children: i,
            }),
          })
        : e.jsx('section', {
            className: 'section',
            children: e.jsxs('div', {
              className: 'container',
              children: [
                e.jsx('h1', {
                  className: 'text-3xl font-bold',
                  children: 'Programs',
                }),
                e.jsx('div', {
                  className: 'mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
                  children: a.map((s) => {
                    var r;
                    return e.jsxs(
                      'a',
                      {
                        href: `/programs/${s.slug}`,
                        className: 'card overflow-hidden group',
                        children: [
                          e.jsx('div', {
                            className: 'aspect-[16/9] overflow-hidden',
                            children: e.jsx('img', {
                              src:
                                null != (r = s.cover_url)
                                  ? r
                                  : '/programs/placeholder.jpg',
                              alt: s.title,
                              className:
                                'h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]',
                            }),
                          }),
                          e.jsxs('div', {
                            className: 'p-4 md:p-5',
                            children: [
                              e.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  e.jsx('span', {
                                    className:
                                      'rounded-full bg-beige-50 text-green-700 px-2.5 py-1 text-xs font-semibold',
                                    children: s.track,
                                  }),
                                  s.hours &&
                                    e.jsx('span', {
                                      className: 'text-xs text-brown-500',
                                      children: s.hours,
                                    }),
                                ],
                              }),
                              e.jsx('h3', {
                                className: 'mt-2 text-lg font-semibold',
                                children: s.title,
                              }),
                              s.blurb &&
                                e.jsx('p', {
                                  className: 'mt-1 text-sm text-brown-600',
                                  children: s.blurb,
                                }),
                            ],
                          }),
                        ],
                      },
                      s.id
                    );
                  }),
                }),
              ],
            }),
          })
  );
}
export { a as default };

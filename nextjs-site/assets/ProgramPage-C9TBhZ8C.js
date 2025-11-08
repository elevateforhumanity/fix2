import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import { u as t, L as a } from './vendor-router-CQjfSXV_.js';
import { g as r } from './programs-D_WNJ_Mg.js';
import { s as l } from './supa-DdKhhKHf.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
const c = '/apply';
function n() {
  var n;
  const { slug: i } = t(),
    [o, d] = e.useState(null),
    [m, x] = e.useState([]),
    [h, j] = e.useState(null),
    [u, p] = e.useState(c);
  return (
    e.useEffect(() => {
      i &&
        (async () => {
          try {
            const e = await r(i);
            d(e);
            const s = await (async function (e) {
              const { data: s, error: t } = await l
                .from('courses')
                .select('id, program_id, code, title, summary, cover_url')
                .eq('program_id', e)
                .order('title');
              if (t) throw t;
              return s;
            })(e.id);
            x(s);
            const t =
              'state' === e.funding_type || 'federal' === e.funding_type;
            p(t ? 'https://indianacareerconnect.com' : c);
          } catch (e) {
            j(e.message);
          }
        })();
    }, [i]),
    h
      ? s.jsx('div', {
          className: 'section',
          children: s.jsx('div', {
            className: 'container max-w-2xl mx-auto',
            children: s.jsxs('div', {
              className: 'card p-8 text-center',
              children: [
                s.jsx('div', { className: 'text-4xl mb-4', children: '😕' }),
                s.jsx('h2', {
                  className: 'text-2xl font-bold text-red-600',
                  children: 'Program Not Found',
                }),
                s.jsx('p', { className: 'mt-2 text-brown-600', children: h }),
                s.jsxs('div', {
                  className: 'mt-6 flex gap-3 justify-center',
                  children: [
                    s.jsx(a, {
                      to: '/programs',
                      className: 'btn',
                      children: 'Browse All Programs',
                    }),
                    s.jsx(a, {
                      to: '/',
                      className: 'btn-outline',
                      children: 'Go Home',
                    }),
                  ],
                }),
              ],
            }),
          }),
        })
      : o
        ? s.jsxs('div', {
            children: [
              s.jsx('section', {
                className: 'section pt-8',
                children: s.jsxs('div', {
                  className: 'container grid md:grid-cols-2 gap-10 items-start',
                  children: [
                    s.jsxs('div', {
                      children: [
                        s.jsx('h1', {
                          className: 'text-3xl md:text-4xl font-extrabold',
                          children: o.title,
                        }),
                        o.blurb &&
                          s.jsx('p', {
                            className: 'mt-3 text-brown-600',
                            children: o.blurb,
                          }),
                        s.jsxs('div', {
                          className: 'mt-5 flex flex-wrap gap-3',
                          children: [
                            s.jsx('a', {
                              href: u,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              className: 'btn text-lg px-6 py-3',
                              children: "Apply Now (It's Free!) →",
                            }),
                            s.jsx('a', {
                              href: '/contact',
                              className: 'btn-outline text-lg px-6 py-3',
                              children: 'Have Questions?',
                            }),
                          ],
                        }),
                        s.jsxs('ul', {
                          className: 'mt-6 text-sm text-brown-600',
                          children: [
                            o.hours &&
                              s.jsxs('li', {
                                children: ['⏱️ Duration: ', o.hours],
                              }),
                            s.jsxs('li', { children: ['📚 Track: ', o.track] }),
                          ],
                        }),
                      ],
                    }),
                    s.jsx('div', {
                      className: 'card overflow-hidden',
                      children: s.jsx('img', {
                        src:
                          null != (n = o.cover_url)
                            ? n
                            : '/programs/placeholder.jpg',
                        alt: o.title,
                        className: 'w-full h-[320px] object-cover',
                      }),
                    }),
                  ],
                }),
              }),
              s.jsx('section', {
                className: 'section bg-beige-50',
                children: s.jsxs('div', {
                  className: 'container',
                  children: [
                    s.jsxs('div', {
                      className: 'text-center max-w-2xl mx-auto mb-8',
                      children: [
                        s.jsx('h2', {
                          className: 'text-3xl font-bold',
                          children: "What You'll Learn",
                        }),
                        s.jsxs('p', {
                          className: 'mt-2 text-brown-600',
                          children: [
                            'This program includes ',
                            m.length,
                            ' course',
                            1 !== m.length ? 's' : '',
                            ' designed to get you job-ready',
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className:
                        'mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3',
                      children: [
                        m.map((e) =>
                          s.jsxs(
                            a,
                            {
                              to: `/lms/course/${e.id}`,
                              className:
                                'card p-6 hover:shadow-lg transition-all hover:-translate-y-1',
                              children: [
                                s.jsx('div', {
                                  className:
                                    'text-xs font-semibold text-green-600 uppercase tracking-wide',
                                  children: e.code,
                                }),
                                s.jsx('div', {
                                  className: 'mt-2 text-xl font-bold',
                                  children: e.title,
                                }),
                                e.summary &&
                                  s.jsx('p', {
                                    className:
                                      'mt-3 text-sm text-brown-600 leading-relaxed',
                                    children: e.summary,
                                  }),
                                s.jsx('div', {
                                  className:
                                    'mt-4 text-green-600 text-sm font-medium',
                                  children: 'Start Learning →',
                                }),
                              ],
                            },
                            e.id
                          )
                        ),
                        0 === m.length &&
                          s.jsxs('div', {
                            className: 'col-span-full text-center py-12',
                            children: [
                              s.jsx('div', {
                                className: 'text-4xl mb-4',
                                children: '📚',
                              }),
                              s.jsx('p', {
                                className: 'text-brown-600',
                                children:
                                  'Courses are being added to this program.',
                              }),
                              s.jsx('p', {
                                className: 'mt-2 text-sm text-brown-500',
                                children:
                                  'Check back soon or contact us for more information.',
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          })
        : s.jsx('div', {
            className: 'section',
            children: s.jsx('div', {
              className: 'container max-w-2xl mx-auto',
              children: s.jsxs('div', {
                className: 'card p-8 text-center',
                children: [
                  s.jsxs('div', {
                    className: 'animate-pulse',
                    children: [
                      s.jsx('div', {
                        className:
                          'h-8 bg-slate-200 rounded w-3/4 mx-auto mb-4',
                      }),
                      s.jsx('div', {
                        className:
                          'h-4 bg-slate-200 rounded w-1/2 mx-auto mb-2',
                      }),
                      s.jsx('div', {
                        className: 'h-4 bg-slate-200 rounded w-2/3 mx-auto',
                      }),
                    ],
                  }),
                  s.jsx('p', {
                    className: 'mt-4 text-brown-600',
                    children: 'Loading program details...',
                  }),
                ],
              }),
            }),
          })
  );
}
export { n as default };

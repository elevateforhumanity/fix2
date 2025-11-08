import { j as e, H as t, r as n } from './vendor-react-C-ZQNdj3.js';
import { d as r, L as o } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
class s extends Error {
  constructor(e, t) {
    (super(e), (this.name = 'ApiError'), (this.status = t));
  }
}
const i = async (e) => {
  const t = await fetch(e);
  if (!t.ok) throw new s(`HTTP ${t.status}: ${t.statusText}`, t.status);
  return t.json();
};
function a({
  title: n = 'Elevate for Humanity - 106+ Workforce Certifications',
  description:
    r = 'Indianapolis-based ETPL provider offering 106+ industry-recognized certification programs with 92% job placement rate. 100% FREE through WIOA funding.',
  keywords:
    o = 'workforce development, online learning, career training, professional development, LMS, certifications, Indianapolis, WIOA, free training',
  image: s = 'https://elevateforhumanity.org/og-image.svg',
  url: i = 'https://elevateforhumanity.org',
  type: a = 'website',
}) {
  const l = n.includes('Elevate for Humanity')
    ? n
    : `${n} | Elevate for Humanity`;
  return e.jsxs(t, {
    children: [
      e.jsx('title', { children: l }),
      e.jsx('meta', { name: 'title', content: l }),
      e.jsx('meta', { name: 'description', content: r }),
      e.jsx('meta', { name: 'keywords', content: o }),
      e.jsx('meta', { property: 'og:type', content: a }),
      e.jsx('meta', { property: 'og:url', content: i }),
      e.jsx('meta', { property: 'og:title', content: l }),
      e.jsx('meta', { property: 'og:description', content: r }),
      e.jsx('meta', { property: 'og:image', content: s }),
      e.jsx('meta', {
        property: 'og:site_name',
        content: 'Elevate for Humanity',
      }),
      e.jsx('meta', { name: 'robots', content: 'index, follow' }),
      e.jsx('meta', { name: 'language', content: 'English' }),
      e.jsx('meta', { name: 'revisit-after', content: '7 days' }),
      e.jsx('meta', { name: 'author', content: 'Elevate for Humanity' }),
      e.jsx('link', { rel: 'canonical', href: i }),
      e.jsx('script', {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Elevate for Humanity',
          alternateName: 'EFH Workforce Development',
          description:
            'Indianapolis-based ETPL provider offering 106+ industry-recognized certification programs with 92% job placement rate. FREE workforce development through WIOA funding.',
          url: 'https://elevateforhumanity.org',
          logo: 'https://elevateforhumanity.org/images/logo.png',
          image: 'https://elevateforhumanity.org/og-image.svg',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Indianapolis',
            addressRegion: 'IN',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-317-314-3757',
            contactType: 'customer service',
            email: 'elevateforhumanity@gmail.com',
            availableLanguage: ['English'],
          },
          sameAs: [
            'https://www.facebook.com/elevateforhumanity',
            'https://www.linkedin.com/company/elevate-for-humanity',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '247',
            bestRating: '5',
            worstRating: '1',
          },
          numberOfEmployees: { '@type': 'QuantitativeValue', value: '15' },
          foundingDate: '2020',
          slogan: 'Empowering People. Elevating Communities.',
          knowsAbout: [
            'Workforce Development',
            'Career Training',
            'Professional Certifications',
            'Apprenticeships',
            'WIOA Programs',
            'Healthcare Training',
            'IT Certifications',
            'Construction Training',
          ],
        }),
      }),
      e.jsx('script', {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Elevate for Humanity',
          image: 'https://elevateforhumanity.org/og-image.svg',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Indianapolis',
            addressRegion: 'IN',
            addressCountry: 'US',
          },
          telephone: '+1-317-314-3757',
          url: 'https://elevateforhumanity.org',
          priceRange: 'FREE',
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '247',
          },
        }),
      }),
      e.jsx('script', {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Are the training programs really free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, 100% FREE through WIOA (Workforce Innovation and Opportunity Act) funding. Students pay nothing for tuition, materials, or certification exams.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the job placement rate?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We maintain a 92% job placement rate across all programs. Most students are employed within 30-60 days of program completion.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long do the programs take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Programs range from 4-20 weeks depending on the certification. Most programs are 8-12 weeks with flexible scheduling options.',
              },
            },
            {
              '@type': 'Question',
              name: 'What certifications do you offer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We offer 106+ industry-recognized certifications in Healthcare (Phlebotomy, EHR, Allied Health), IT (CompTIA, Cloud, Cisco), Construction (OSHA, Pre-Apprenticeship), Business (PMI, HRCI), and more.',
              },
            },
            {
              '@type': 'Question',
              name: 'Who is eligible for the programs?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Programs are available to Indianapolis/Marion County residents who meet WIOA eligibility requirements. This includes unemployed, underemployed, veterans, and those seeking career advancement.',
              },
            },
          ],
        }),
      }),
    ],
  });
}
const l = ({ size: t = 'medium', message: n = 'Loading...' }) =>
  e.jsxs('div', {
    className: 'loading-spinner-container',
    children: [
      e.jsx('div', { className: `spinner spinner-${t}` }),
      n && e.jsx('p', { children: n }),
    ],
  });
function c() {
  const [t] = r(),
    s = t.get('q') || '',
    [c, d] = n.useState([]),
    [p, g] = n.useState(!0),
    [u, y] = n.useState({ type: 'all', category: 'all', sortBy: 'relevance' }),
    [h, m] = n.useState({ total: 0, courses: 0, instructors: 0, pages: 0 });
  n.useEffect(() => {
    s && x();
  }, [s, u]);
  const x = async () => {
      var e, t, n;
      g(!0);
      try {
        const r = await i('/search', {
          q: s,
          type: 'all' !== u.type ? u.type : void 0,
          category: 'all' !== u.category ? u.category : void 0,
          sortBy: u.sortBy,
        });
        (d(r.results || []),
          m({
            total: r.total || 0,
            courses: (null == (e = r.stats) ? void 0 : e.courses) || 0,
            instructors: (null == (t = r.stats) ? void 0 : t.instructors) || 0,
            pages: (null == (n = r.stats) ? void 0 : n.pages) || 0,
          }));
      } catch (r) {
        (console.error('Search failed:', r), d([]));
      } finally {
        g(!1);
      }
    },
    f = (e) => {
      switch (e.type) {
        case 'course':
          return `/course/${e.id}`;
        case 'instructor':
          return `/instructor/${e.id}`;
        case 'page':
          return e.path;
        default:
          return '#';
      }
    };
  return e.jsxs('div', {
    style: { padding: '40px 20px', maxWidth: 1200, margin: '0 auto' },
    children: [
      e.jsx(a, {
        title: `Search Results for "${s}"`,
        description: `Search results for ${s} on Elevate for Humanity`,
      }),
      e.jsxs('div', {
        style: { marginBottom: 32 },
        children: [
          e.jsx('h1', {
            style: { fontSize: 32, marginBottom: 8 },
            children: 'Search Results',
          }),
          e.jsx('p', {
            style: { fontSize: 16, color: '#4a3728' },
            children: p
              ? 'Searching...'
              : e.jsxs(e.Fragment, {
                  children: [
                    'Found ',
                    h.total,
                    ' result',
                    1 !== h.total ? 's' : '',
                    ' for "',
                    s,
                    '"',
                  ],
                }),
          }),
        ],
      }),
      e.jsxs('div', {
        style: { display: 'grid', gridTemplateColumns: '250px 1fr', gap: 32 },
        children: [
          e.jsx('div', {
            children: e.jsxs('div', {
              style: { position: 'sticky', top: 20 },
              children: [
                e.jsx('h3', {
                  style: { fontSize: 18, marginBottom: 16 },
                  children: 'Filters',
                }),
                e.jsxs('div', {
                  style: { marginBottom: 24 },
                  children: [
                    e.jsx('label', {
                      style: {
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                      },
                      children: 'Type',
                    }),
                    e.jsxs('select', {
                      value: u.type,
                      onChange: (e) => y({ ...u, type: e.target.value }),
                      style: {
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: 14,
                        border: '1px solid #d4c9b8',
                        borderRadius: 6,
                      },
                      children: [
                        e.jsx('option', {
                          value: 'all',
                          children: 'All Types',
                        }),
                        e.jsxs('option', {
                          value: 'course',
                          children: ['Courses (', h.courses, ')'],
                        }),
                        e.jsxs('option', {
                          value: 'instructor',
                          children: ['Instructors (', h.instructors, ')'],
                        }),
                        e.jsxs('option', {
                          value: 'page',
                          children: ['Pages (', h.pages, ')'],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  style: { marginBottom: 24 },
                  children: [
                    e.jsx('label', {
                      style: {
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                      },
                      children: 'Category',
                    }),
                    e.jsxs('select', {
                      value: u.category,
                      onChange: (e) => y({ ...u, category: e.target.value }),
                      style: {
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: 14,
                        border: '1px solid #d4c9b8',
                        borderRadius: 6,
                      },
                      children: [
                        e.jsx('option', {
                          value: 'all',
                          children: 'All Categories',
                        }),
                        e.jsx('option', {
                          value: 'technology',
                          children: 'Technology',
                        }),
                        e.jsx('option', {
                          value: 'business',
                          children: 'Business',
                        }),
                        e.jsx('option', {
                          value: 'design',
                          children: 'Design',
                        }),
                        e.jsx('option', {
                          value: 'marketing',
                          children: 'Marketing',
                        }),
                        e.jsx('option', {
                          value: 'personal-development',
                          children: 'Personal Development',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  style: { marginBottom: 24 },
                  children: [
                    e.jsx('label', {
                      style: {
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 8,
                      },
                      children: 'Sort By',
                    }),
                    e.jsxs('select', {
                      value: u.sortBy,
                      onChange: (e) => y({ ...u, sortBy: e.target.value }),
                      style: {
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: 14,
                        border: '1px solid #d4c9b8',
                        borderRadius: 6,
                      },
                      children: [
                        e.jsx('option', {
                          value: 'relevance',
                          children: 'Relevance',
                        }),
                        e.jsx('option', {
                          value: 'newest',
                          children: 'Newest First',
                        }),
                        e.jsx('option', {
                          value: 'popular',
                          children: 'Most Popular',
                        }),
                        e.jsx('option', {
                          value: 'rating',
                          children: 'Highest Rated',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx('button', {
                  onClick: () =>
                    y({ type: 'all', category: 'all', sortBy: 'relevance' }),
                  style: {
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: 14,
                    border: '1px solid #d4c9b8',
                    borderRadius: 6,
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  },
                  children: 'Clear Filters',
                }),
              ],
            }),
          }),
          e.jsx('div', {
            children: p
              ? e.jsx('div', {
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 60,
                  },
                  children: e.jsx(l, { size: 'large' }),
                })
              : 0 === c.length
                ? e.jsxs('div', {
                    style: {
                      textAlign: 'center',
                      padding: 60,
                      color: '#4a3728',
                    },
                    children: [
                      e.jsx('div', {
                        style: { fontSize: 48, marginBottom: 16 },
                        children: '🔍',
                      }),
                      e.jsx('h3', {
                        style: { fontSize: 20, marginBottom: 8 },
                        children: 'No results found',
                      }),
                      e.jsx('p', {
                        children: 'Try adjusting your search or filters',
                      }),
                    ],
                  })
                : e.jsx('div', {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                    },
                    children: c.map((t) => {
                      return e.jsx(
                        o,
                        {
                          to: f(t),
                          style: {
                            display: 'block',
                            padding: 20,
                            backgroundColor: 'white',
                            border: '1px solid #d4c9b8',
                            borderRadius: 8,
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'all 0.2s',
                          },
                          onMouseEnter: (e) => {
                            ((e.currentTarget.style.borderColor = '#00a544'),
                              (e.currentTarget.style.boxShadow =
                                '0 2px 8px rgba(0, 123, 255, 0.1)'));
                          },
                          onMouseLeave: (e) => {
                            ((e.currentTarget.style.borderColor = '#d4c9b8'),
                              (e.currentTarget.style.boxShadow = 'none'));
                          },
                          children: e.jsxs('div', {
                            style: { display: 'flex', gap: 16 },
                            children: [
                              e.jsx('div', {
                                style: { fontSize: 32 },
                                children:
                                  ((n = t.type),
                                  {
                                    course: '📚',
                                    instructor: '👨‍🏫',
                                    page: '📄',
                                    topic: '🏷️',
                                    certificate: '🎓',
                                  }[n] || '🔍'),
                              }),
                              e.jsxs('div', {
                                style: { flex: 1 },
                                children: [
                                  e.jsx('h3', {
                                    style: {
                                      fontSize: 18,
                                      marginBottom: 8,
                                      color: '#00a544',
                                    },
                                    children: t.title,
                                  }),
                                  t.description &&
                                    e.jsx('p', {
                                      style: {
                                        fontSize: 14,
                                        color: '#4a3728',
                                        marginBottom: 8,
                                        lineHeight: 1.5,
                                      },
                                      children: t.description,
                                    }),
                                  e.jsxs('div', {
                                    style: {
                                      display: 'flex',
                                      gap: 12,
                                      fontSize: 12,
                                      color: '#999',
                                    },
                                    children: [
                                      e.jsx('span', {
                                        children:
                                          t.type.charAt(0).toUpperCase() +
                                          t.type.slice(1),
                                      }),
                                      t.category &&
                                        e.jsxs(e.Fragment, {
                                          children: [
                                            e.jsx('span', { children: '•' }),
                                            e.jsx('span', {
                                              children: t.category,
                                            }),
                                          ],
                                        }),
                                      t.rating &&
                                        e.jsxs(e.Fragment, {
                                          children: [
                                            e.jsx('span', { children: '•' }),
                                            e.jsxs('span', {
                                              children: [
                                                '⭐ ',
                                                t.rating.toFixed(1),
                                              ],
                                            }),
                                          ],
                                        }),
                                      t.enrollments &&
                                        e.jsxs(e.Fragment, {
                                          children: [
                                            e.jsx('span', { children: '•' }),
                                            e.jsxs('span', {
                                              children: [
                                                t.enrollments.toLocaleString(),
                                                ' enrolled',
                                              ],
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        `${t.type}-${t.id}`
                      );
                      var n;
                    }),
                  }),
          }),
        ],
      }),
    ],
  });
}
export { c as default };

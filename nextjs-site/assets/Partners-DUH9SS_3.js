import { d as e, j as t } from './vendor-react-C-ZQNdj3.js';
import { L as i } from './vendor-router-CQjfSXV_.js';
import { A as o } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
function r() {
  const r = [
      {
        id: 1,
        name: 'Selfish Inc. dba',
        category: 'Technology',
        description:
          'Strategic technology partner providing platform development and infrastructure support.',
        logo: '💻',
        website: 'https://elevateforhumanity.org/partners',
        since: '2020',
      },
      {
        id: 2,
        name: 'Indiana Department of Workforce Development',
        category: 'Government',
        description:
          'State partner for workforce development and WIOA compliance programs.',
        logo: '🏛️',
        website: 'https://www.in.gov/dwd/',
        since: '2019',
      },
      {
        id: 3,
        name: 'CompTIA',
        category: 'Education',
        description:
          'IT certification and training partner for technology skills development.',
        logo: '🎓',
        website: 'https://www.comptia.org',
        since: '2021',
      },
      {
        id: 4,
        name: 'AHIMA',
        category: 'Healthcare',
        description:
          'Healthcare information management certification and training partner.',
        logo: '🏥',
        website: 'https://www.ahima.org',
        since: '2020',
      },
      {
        id: 5,
        name: 'PMI',
        category: 'Professional Development',
        description:
          'Project management certification and professional development partner.',
        logo: '📊',
        website: 'https://www.pmi.org',
        since: '2022',
      },
      {
        id: 6,
        name: 'HRCI',
        category: 'Human Resources',
        description:
          'HR certification partner for human resources professional development.',
        logo: '👥',
        website: 'https://www.hrci.org',
        since: '2020',
      },
      {
        id: 7,
        name: 'IRS VITA Program',
        category: 'Financial Education',
        description:
          'Recognized IRS Financial Education and Asset Building Partner providing free tax preparation services and financial literacy programs.',
        logo: '💰',
        website:
          'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
        since: '2024',
      },
    ],
    [n, a] = e.useState('All'),
    s = 'All' === n ? r : r.filter((e) => e.category === n);
  return t.jsx(o, {
    children: t.jsxs('div', {
      style: { maxWidth: 1200, margin: '0 auto', padding: 32 },
      children: [
        t.jsxs('div', {
          style: { marginBottom: 40 },
          children: [
            t.jsx('h1', {
              style: { fontSize: 36, fontWeight: 700, marginBottom: 12 },
              children: 'Our Partners',
            }),
            t.jsx('p', {
              style: { fontSize: 18, color: '#6b5d52', maxWidth: 800 },
              children:
                'We collaborate with leading organizations worldwide to expand our impact and reach more communities in need.',
            }),
          ],
        }),
        t.jsxs('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 40,
          },
          children: [
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                textAlign: 'center',
              },
              children: [
                t.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#00a544',
                    marginBottom: 8,
                  },
                  children: '50+',
                }),
                t.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Partner Organizations',
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                textAlign: 'center',
              },
              children: [
                t.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#00a544',
                    marginBottom: 8,
                  },
                  children: '120+',
                }),
                t.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Countries Reached',
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                textAlign: 'center',
              },
              children: [
                t.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#ca8a04',
                    marginBottom: 8,
                  },
                  children: '2M+',
                }),
                t.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Lives Impacted',
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                textAlign: 'center',
              },
              children: [
                t.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#dc2626',
                    marginBottom: 8,
                  },
                  children: '500+',
                }),
                t.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Active Projects',
                }),
              ],
            }),
          ],
        }),
        t.jsx('div', {
          style: {
            display: 'flex',
            gap: 12,
            marginBottom: 32,
            flexWrap: 'wrap',
          },
          children: [
            'All',
            'Education',
            'Technology',
            'Healthcare',
            'Financial Education',
            'Government',
            'Professional Development',
            'Human Resources',
          ].map((e) =>
            t.jsx(
              'button',
              {
                onClick: () => a(e),
                style: {
                  padding: '8px 16px',
                  backgroundColor: n === e ? '#00a544' : '#fff',
                  color: n === e ? '#fff' : '#333',
                  border: '1px solid #d4c9b8',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                },
                children: e,
              },
              e
            )
          ),
        }),
        t.jsx('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: 24,
            marginBottom: 40,
          },
          children: s.map((e) =>
            t.jsxs(
              'div',
              {
                style: {
                  backgroundColor: '#fff',
                  border: '1px solid #d4c9b8',
                  borderRadius: 8,
                  padding: 24,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                },
                onMouseEnter: (e) => {
                  ((e.currentTarget.style.transform = 'translateY(-4px)'),
                    (e.currentTarget.style.boxShadow =
                      '0 4px 12px rgba(0, 0, 0, 0.1)'));
                },
                onMouseLeave: (e) => {
                  ((e.currentTarget.style.transform = 'translateY(0)'),
                    (e.currentTarget.style.boxShadow = 'none'));
                },
                children: [
                  t.jsxs('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: 16,
                    },
                    children: [
                      t.jsx('div', {
                        style: { fontSize: 48, marginRight: 16, flexShrink: 0 },
                        children: e.logo,
                      }),
                      t.jsxs('div', {
                        style: { flex: 1 },
                        children: [
                          t.jsx('h3', {
                            style: {
                              fontSize: 18,
                              fontWeight: 600,
                              marginBottom: 4,
                            },
                            children: e.name,
                          }),
                          t.jsx('div', {
                            style: {
                              display: 'inline-block',
                              padding: '4px 12px',
                              backgroundColor: '#f0f0f0',
                              borderRadius: 12,
                              fontSize: 12,
                              color: '#6b5d52',
                              marginBottom: 8,
                            },
                            children: e.category,
                          }),
                        ],
                      }),
                    ],
                  }),
                  t.jsx('p', {
                    style: {
                      fontSize: 14,
                      color: '#6b5d52',
                      lineHeight: 1.6,
                      marginBottom: 16,
                    },
                    children: e.description,
                  }),
                  t.jsxs('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 16,
                      borderTop: '1px solid #f0f0f0',
                    },
                    children: [
                      t.jsxs('div', {
                        style: { fontSize: 13, color: '#999' },
                        children: ['Partner since ', e.since],
                      }),
                      t.jsx('a', {
                        href: e.website,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        style: {
                          color: '#00a544',
                          textDecoration: 'none',
                          fontSize: 14,
                          fontWeight: 500,
                        },
                        children: 'Visit Website →',
                      }),
                    ],
                  }),
                ],
              },
              e.id
            )
          ),
        }),
        t.jsxs('div', {
          style: {
            backgroundColor: '#00a544',
            color: '#fff',
            padding: 48,
            borderRadius: 12,
            textAlign: 'center',
            marginTop: 40,
          },
          children: [
            t.jsx('h2', {
              style: { fontSize: 28, fontWeight: 700, marginBottom: 16 },
              children: 'Become a Partner',
            }),
            t.jsx('p', {
              style: {
                fontSize: 16,
                marginBottom: 24,
                opacity: 0.9,
                maxWidth: 600,
                margin: '0 auto 24px',
              },
              children:
                'Join our network of organizations committed to making a positive impact. Together, we can reach more communities and create lasting change.',
            }),
            t.jsxs('div', {
              style: {
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
                flexWrap: 'wrap',
              },
              children: [
                t.jsx(i, {
                  to: '/contact',
                  style: {
                    padding: '12px 32px',
                    backgroundColor: '#fff',
                    color: '#00a544',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                  },
                  children: 'Get in Touch',
                }),
                t.jsx('a', {
                  href: '/partnership-info.pdf',
                  download: !0,
                  style: {
                    padding: '12px 32px',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '2px solid #fff',
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                  },
                  children: 'Download Partnership Info',
                }),
              ],
            }),
          ],
        }),
        t.jsxs('div', {
          style: { marginTop: 60 },
          children: [
            t.jsx('h2', {
              style: {
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 32,
                textAlign: 'center',
              },
              children: 'Partnership Benefits',
            }),
            t.jsxs('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 24,
              },
              children: [
                t.jsxs('div', {
                  style: { textAlign: 'center', padding: 20 },
                  children: [
                    t.jsx('div', {
                      style: { fontSize: 48, marginBottom: 16 },
                      children: '🤝',
                    }),
                    t.jsx('h3', {
                      style: { fontSize: 18, fontWeight: 600, marginBottom: 8 },
                      children: 'Collaborative Impact',
                    }),
                    t.jsx('p', {
                      style: {
                        fontSize: 14,
                        color: '#6b5d52',
                        lineHeight: 1.6,
                      },
                      children:
                        "Work together on projects that amplify your organization's mission and reach.",
                    }),
                  ],
                }),
                t.jsxs('div', {
                  style: { textAlign: 'center', padding: 20 },
                  children: [
                    t.jsx('div', {
                      style: { fontSize: 48, marginBottom: 16 },
                      children: '🌍',
                    }),
                    t.jsx('h3', {
                      style: { fontSize: 18, fontWeight: 600, marginBottom: 8 },
                      children: 'Global Network',
                    }),
                    t.jsx('p', {
                      style: {
                        fontSize: 14,
                        color: '#6b5d52',
                        lineHeight: 1.6,
                      },
                      children:
                        'Access our worldwide network of partners, resources, and expertise.',
                    }),
                  ],
                }),
                t.jsxs('div', {
                  style: { textAlign: 'center', padding: 20 },
                  children: [
                    t.jsx('div', {
                      style: { fontSize: 48, marginBottom: 16 },
                      children: '📊',
                    }),
                    t.jsx('h3', {
                      style: { fontSize: 18, fontWeight: 600, marginBottom: 8 },
                      children: 'Shared Resources',
                    }),
                    t.jsx('p', {
                      style: {
                        fontSize: 14,
                        color: '#6b5d52',
                        lineHeight: 1.6,
                      },
                      children:
                        'Leverage shared tools, platforms, and best practices for greater efficiency.',
                    }),
                  ],
                }),
                t.jsxs('div', {
                  style: { textAlign: 'center', padding: 20 },
                  children: [
                    t.jsx('div', {
                      style: { fontSize: 48, marginBottom: 16 },
                      children: '🎯',
                    }),
                    t.jsx('h3', {
                      style: { fontSize: 18, fontWeight: 600, marginBottom: 8 },
                      children: 'Measurable Results',
                    }),
                    t.jsx('p', {
                      style: {
                        fontSize: 14,
                        color: '#6b5d52',
                        lineHeight: 1.6,
                      },
                      children:
                        'Track and report on the collective impact of our partnership initiatives.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { r as default };

import {
  j as e,
  q as s,
  I as t,
  _ as a,
  U as n,
  A as i,
  W as r,
} from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function l() {
  const l = [
    {
      icon: e.jsx(n, { className: 'h-8 w-8' }),
      title: 'Scholarships & Grants',
      description:
        'Direct financial support for students pursuing career training',
      impact: '$250K+ awarded annually',
    },
    {
      icon: e.jsx(i, { className: 'h-8 w-8' }),
      title: 'Community Hubs',
      description: 'Physical spaces for learning, mentorship, and networking',
      impact: '3 locations across Indianapolis',
    },
    {
      icon: e.jsx(t, { className: 'h-8 w-8' }),
      title: 'Career Pathways',
      description: 'End-to-end support from training to employment',
      impact: '92% job placement rate',
    },
    {
      icon: e.jsx(r, { className: 'h-8 w-8' }),
      title: 'Emergency Assistance',
      description: 'Support for transportation, childcare, and basic needs',
      impact: '500+ families supported',
    },
  ];
  return e.jsxs('div', {
    className: 'min-h-screen bg-gradient-to-b from-white to-beige-50',
    children: [
      e.jsx('section', {
        className:
          'bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16',
        children: e.jsx('div', {
          className: 'container max-w-7xl mx-auto px-4',
          children: e.jsxs('div', {
            className: 'max-w-3xl',
            children: [
              e.jsxs('div', {
                className:
                  'inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6',
                children: [
                  e.jsx(s, { className: 'h-5 w-5' }),
                  e.jsx('span', {
                    className: 'font-medium',
                    children: 'Powered by Selfish Inc',
                  }),
                ],
              }),
              e.jsx('h1', {
                className: 'text-4xl md:text-5xl font-bold mb-4',
                children: 'Philanthropy & Community Impact',
              }),
              e.jsx('p', {
                className: 'text-xl text-blue-100 mb-8',
                children:
                  'Funding pathways that convert learning into livelihoods.',
              }),
              e.jsxs('div', {
                className: 'flex flex-wrap gap-4',
                children: [
                  e.jsx('a', {
                    href: '/donate',
                    className: 'btn bg-white text-green-600 hover:bg-beige-100',
                    children: 'Donate Now',
                  }),
                  e.jsx('a', {
                    href: '/contact',
                    className:
                      'btn-outline border-white text-white hover:bg-white/10',
                    children: 'Partner With Us',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx('section', {
        className: 'section',
        children: e.jsxs('div', {
          className: 'container max-w-7xl mx-auto px-4',
          children: [
            e.jsx('div', {
              className: 'text-center mb-12',
              children: e.jsx('h2', {
                className: 'text-3xl font-bold text-brown-900 mb-4',
                children: 'How We Steward Funding',
              }),
            }),
            e.jsx('div', {
              className: 'grid md:grid-cols-2 gap-6',
              children: l.map((s, a) =>
                e.jsx(
                  'div',
                  {
                    className:
                      'bg-white rounded-xl p-6 shadow-sm border border-brown-200',
                    children: e.jsxs('div', {
                      className: 'flex items-start gap-4',
                      children: [
                        e.jsx('div', {
                          className:
                            'flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 text-white rounded-lg flex items-center justify-center',
                          children: s.icon,
                        }),
                        e.jsxs('div', {
                          className: 'flex-1',
                          children: [
                            e.jsx('h3', {
                              className:
                                'text-xl font-bold text-brown-900 mb-2',
                              children: s.title,
                            }),
                            e.jsx('p', {
                              className: 'text-brown-600 mb-3',
                              children: s.description,
                            }),
                            e.jsxs('div', {
                              className:
                                'inline-flex items-center gap-2 text-sm font-medium text-green-600',
                              children: [
                                e.jsx(t, { className: 'h-4 w-4' }),
                                s.impact,
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  a
                )
              ),
            }),
          ],
        }),
      }),
      e.jsx('section', {
        className: 'section bg-white',
        children: e.jsx('div', {
          className: 'container max-w-7xl mx-auto px-4',
          children: e.jsxs('div', {
            className: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6',
            children: [
              e.jsxs('div', {
                className: 'text-center',
                children: [
                  e.jsx('div', {
                    className: 'text-4xl font-bold text-green-600 mb-2',
                    children: '1,200+',
                  }),
                  e.jsx('div', {
                    className: 'text-brown-600',
                    children: 'Students Served',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'text-center',
                children: [
                  e.jsx('div', {
                    className: 'text-4xl font-bold text-green-600 mb-2',
                    children: '$2.5M',
                  }),
                  e.jsx('div', {
                    className: 'text-brown-600',
                    children: 'Scholarships Awarded',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'text-center',
                children: [
                  e.jsx('div', {
                    className: 'text-4xl font-bold text-green-600 mb-2',
                    children: '92%',
                  }),
                  e.jsx('div', {
                    className: 'text-brown-600',
                    children: 'Job Placement Rate',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'text-center',
                children: [
                  e.jsx('div', {
                    className: 'text-4xl font-bold text-green-600 mb-2',
                    children: '$45K',
                  }),
                  e.jsx('div', {
                    className: 'text-brown-600',
                    children: 'Avg. Starting Salary',
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx('section', {
        className: 'section bg-gradient-to-r from-orange-50 to-blue-50',
        children: e.jsxs('div', {
          className: 'container max-w-4xl mx-auto px-4 text-center',
          children: [
            e.jsx('h2', {
              className: 'text-3xl font-bold text-brown-900 mb-4',
              children: 'Sponsor a Cohort',
            }),
            e.jsx('p', {
              className: 'text-xl text-brown-600 mb-8',
              children:
                'Your contribution directly funds training, credentials, and career placement.',
            }),
            e.jsxs('div', {
              className: 'flex flex-wrap gap-4 justify-center',
              children: [
                e.jsxs('a', {
                  href: '/donate',
                  className: 'btn inline-flex items-center gap-2',
                  children: [
                    'Make a Donation ',
                    e.jsx(a, { className: 'h-4 w-4' }),
                  ],
                }),
                e.jsx('a', {
                  href: '/contact',
                  className: 'btn-outline',
                  children: 'Discuss Partnership',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { l as default };

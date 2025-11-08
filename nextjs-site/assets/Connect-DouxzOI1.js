import {
  r as e,
  j as s,
  U as t,
  J as a,
  K as n,
  M as i,
  N as r,
  O as l,
  Q as d,
} from './vendor-react-C-ZQNdj3.js';
import { u as c } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function o() {
  const o = c(),
    [m, x] = e.useState((null == o ? void 0 : o.section) || 'overview'),
    h = [
      {
        id: 1,
        title: 'AI & Machine Learning Career Fair',
        date: '2024-02-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Virtual Event',
        attendees: 245,
        type: 'Career Fair',
        description:
          'Connect with top employers hiring AI and ML professionals',
      },
      {
        id: 2,
        title: 'Cybersecurity Networking Mixer',
        date: '2024-02-20',
        time: '6:00 PM - 8:00 PM',
        location: 'Downtown Convention Center',
        attendees: 87,
        type: 'Networking',
        description:
          'Meet cybersecurity professionals and learn about industry trends',
      },
      {
        id: 3,
        title: 'Data Science Project Showcase',
        date: '2024-02-25',
        time: '2:00 PM - 5:00 PM',
        location: 'University Research Center',
        attendees: 156,
        type: 'Showcase',
        description: 'Present your data science projects to industry experts',
      },
    ],
    b = [
      {
        id: 1,
        title: 'Machine Learning Engineer',
        company: 'TechCorp Solutions',
        location: 'Remote',
        salary: '$85,000 - $120,000',
        type: 'Full-time',
        posted: '2 days ago',
        skills: ['Python', 'TensorFlow', 'AWS', 'Docker'],
        matched: !0,
      },
      {
        id: 2,
        title: 'Cybersecurity Analyst',
        company: 'SecureNet Inc',
        location: 'Chicago, IL',
        salary: '$75,000 - $95,000',
        type: 'Full-time',
        posted: '1 week ago',
        skills: ['SIEM', 'Incident Response', 'Network Security'],
        matched: !0,
      },
      {
        id: 3,
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'New York, NY',
        salary: '$90,000 - $130,000',
        type: 'Full-time',
        posted: '3 days ago',
        skills: ['R', 'Python', 'SQL', 'Machine Learning'],
        matched: !1,
      },
    ],
    p = [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        title: 'Senior AI Researcher',
        company: 'Google',
        expertise: ['Machine Learning', 'Computer Vision', 'Python'],
        rating: 4.9,
        sessions: 127,
        available: !0,
        image: '/images/mentors/sarah-chen.jpg',
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        title: 'Cybersecurity Director',
        company: 'Microsoft',
        expertise: ['Network Security', 'Incident Response', 'Risk Management'],
        rating: 4.8,
        sessions: 89,
        available: !1,
        image: '/images/mentors/michael-rodriguez.jpg',
      },
      {
        id: 3,
        name: 'Emily Watson',
        title: 'Data Science Manager',
        company: 'Netflix',
        expertise: [
          'Data Analytics',
          'Statistical Modeling',
          'Team Leadership',
        ],
        rating: 4.9,
        sessions: 156,
        available: !0,
        image: '/images/mentors/emily-watson.jpg',
      },
    ],
    g = {
      totalMembers: 5247,
      activeToday: 342,
      jobPlacements: 1876,
      mentorSessions: 892,
    },
    j = [
      { id: 'overview', label: 'Overview', icon: t },
      { id: 'events', label: 'Events', icon: a },
      { id: 'jobs', label: 'Job Board', icon: n },
      { id: 'mentors', label: 'Mentors', icon: i },
    ];
  return s.jsxs('div', {
    className: 'min-h-screen bg-beige-50',
    children: [
      s.jsx('div', {
        className: 'bg-white border-b',
        children: s.jsx('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6',
          children: s.jsxs('div', {
            className: 'flex items-center justify-between',
            children: [
              s.jsxs('div', {
                children: [
                  s.jsx('h1', {
                    className: 'text-3xl font-bold text-brown-900',
                    children: 'Connect Community',
                  }),
                  s.jsx('p', {
                    className: 'text-brown-600 mt-1',
                    children:
                      'Network with peers, find opportunities, and advance your career',
                  }),
                ],
              }),
              s.jsx('div', {
                className: 'flex items-center space-x-4',
                children: s.jsxs('div', {
                  className:
                    'bg-beige-50 text-green-600 px-3 py-1 rounded-full text-sm',
                  children: ['✅ ', g.activeToday, ' Active Today'],
                }),
              }),
            ],
          }),
        }),
      }),
      s.jsx('div', {
        className: 'bg-white border-b',
        children: s.jsx('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsx('div', {
            className: 'flex space-x-8',
            children: j.map((e) =>
              s.jsxs(
                'button',
                {
                  onClick: () => x(e.id),
                  className:
                    'flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ' +
                    (m === e.id
                      ? 'border-blue-500 text-green-600'
                      : 'border-transparent text-brown-500 hover:text-brown-900 hover:border-brown-300'),
                  children: [
                    s.jsx(e.icon, { className: 'h-4 w-4' }),
                    s.jsx('span', { children: e.label }),
                  ],
                },
                e.id
              )
            ),
          }),
        }),
      }),
      s.jsxs('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
        children: [
          'overview' === m &&
            s.jsxs('div', {
              className: 'space-y-8',
              children: [
                s.jsxs('div', {
                  className: 'grid grid-cols-2 md:grid-cols-4 gap-6',
                  children: [
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-green-600',
                          children: g.totalMembers.toLocaleString(),
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Total Members',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-green-600',
                          children: g.activeToday,
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Active Today',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-purple-600',
                          children: g.jobPlacements.toLocaleString(),
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Job Placements',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-orange-600',
                          children: g.mentorSessions,
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Mentor Sessions',
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'grid md:grid-cols-3 gap-6',
                  children: [
                    s.jsxs('button', {
                      onClick: () => x('jobs'),
                      className:
                        'bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left',
                      children: [
                        s.jsx(n, { className: 'h-8 w-8 text-green-600 mb-3' }),
                        s.jsx('h3', {
                          className: 'font-medium text-brown-900 mb-2',
                          children: 'Find Jobs',
                        }),
                        s.jsx('p', {
                          className: 'text-brown-600 text-sm',
                          children:
                            'Browse matched job opportunities from our partner employers',
                        }),
                        s.jsxs('div', {
                          className:
                            'mt-3 text-green-600 text-sm font-medium flex items-center',
                          children: [
                            'View Jobs ',
                            s.jsx(r, { className: 'h-4 w-4 ml-1' }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('button', {
                      onClick: () => x('events'),
                      className:
                        'bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left',
                      children: [
                        s.jsx(a, { className: 'h-8 w-8 text-green-600 mb-3' }),
                        s.jsx('h3', {
                          className: 'font-medium text-brown-900 mb-2',
                          children: 'Attend Events',
                        }),
                        s.jsx('p', {
                          className: 'text-brown-600 text-sm',
                          children:
                            'Join career fairs, networking events, and skill workshops',
                        }),
                        s.jsxs('div', {
                          className:
                            'mt-3 text-green-600 text-sm font-medium flex items-center',
                          children: [
                            'View Events ',
                            s.jsx(r, { className: 'h-4 w-4 ml-1' }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('button', {
                      onClick: () => x('mentors'),
                      className:
                        'bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left',
                      children: [
                        s.jsx(t, { className: 'h-8 w-8 text-purple-600 mb-3' }),
                        s.jsx('h3', {
                          className: 'font-medium text-brown-900 mb-2',
                          children: 'Get Mentorship',
                        }),
                        s.jsx('p', {
                          className: 'text-brown-600 text-sm',
                          children:
                            'Connect with industry experts for career guidance',
                        }),
                        s.jsxs('div', {
                          className:
                            'mt-3 text-purple-600 text-sm font-medium flex items-center',
                          children: [
                            'Find Mentors ',
                            s.jsx(r, { className: 'h-4 w-4 ml-1' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'grid md:grid-cols-2 gap-8',
                  children: [
                    s.jsxs('div', {
                      className: 'bg-white rounded-lg shadow p-6',
                      children: [
                        s.jsx('h3', {
                          className: 'text-lg font-medium text-brown-900 mb-4',
                          children: 'Upcoming Events',
                        }),
                        s.jsx('div', {
                          className: 'space-y-4',
                          children: h
                            .slice(0, 3)
                            .map((e) =>
                              s.jsxs(
                                'div',
                                {
                                  className: 'border-l-4 border-blue-500 pl-4',
                                  children: [
                                    s.jsx('h4', {
                                      className: 'font-medium text-brown-900',
                                      children: e.title,
                                    }),
                                    s.jsxs('p', {
                                      className: 'text-sm text-brown-600',
                                      children: [
                                        new Date(e.date).toLocaleDateString(),
                                        ' • ',
                                        e.time,
                                      ],
                                    }),
                                    s.jsxs('p', {
                                      className: 'text-sm text-brown-500',
                                      children: [e.attendees, ' attending'],
                                    }),
                                  ],
                                },
                                e.id
                              )
                            ),
                        }),
                        s.jsx('button', {
                          onClick: () => x('events'),
                          className:
                            'mt-4 text-green-600 hover:text-green-600 text-sm font-medium',
                          children: 'View All Events →',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white rounded-lg shadow p-6',
                      children: [
                        s.jsx('h3', {
                          className: 'text-lg font-medium text-brown-900 mb-4',
                          children: 'Top Job Matches',
                        }),
                        s.jsx('div', {
                          className: 'space-y-4',
                          children: b
                            .filter((e) => e.matched)
                            .slice(0, 2)
                            .map((e) =>
                              s.jsxs(
                                'div',
                                {
                                  className:
                                    'border border-brown-200 rounded-lg p-4',
                                  children: [
                                    s.jsx('h4', {
                                      className: 'font-medium text-brown-900',
                                      children: e.title,
                                    }),
                                    s.jsxs('p', {
                                      className: 'text-sm text-brown-600',
                                      children: [e.company, ' • ', e.location],
                                    }),
                                    s.jsx('p', {
                                      className:
                                        'text-sm text-green-600 font-medium',
                                      children: e.salary,
                                    }),
                                    s.jsx('div', {
                                      className: 'flex flex-wrap gap-1 mt-2',
                                      children: e.skills
                                        .slice(0, 3)
                                        .map((e, t) =>
                                          s.jsx(
                                            'span',
                                            {
                                              className:
                                                'bg-beige-50 text-green-600 text-xs px-2 py-1 rounded',
                                              children: e,
                                            },
                                            t
                                          )
                                        ),
                                    }),
                                  ],
                                },
                                e.id
                              )
                            ),
                        }),
                        s.jsx('button', {
                          onClick: () => x('jobs'),
                          className:
                            'mt-4 text-green-600 hover:text-green-600 text-sm font-medium',
                          children: 'View All Jobs →',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          'events' === m &&
            s.jsx('div', {
              className: 'space-y-6',
              children: s.jsxs('div', {
                className: 'bg-white rounded-lg shadow',
                children: [
                  s.jsxs('div', {
                    className: 'p-6 border-b',
                    children: [
                      s.jsx('h2', {
                        className: 'text-xl font-bold text-brown-900',
                        children: 'Upcoming Events',
                      }),
                      s.jsx('p', {
                        className: 'text-brown-600',
                        children:
                          'Connect with employers, peers, and industry experts',
                      }),
                    ],
                  }),
                  s.jsx('div', {
                    className: 'p-6',
                    children: s.jsx('div', {
                      className: 'space-y-6',
                      children: h.map((e) =>
                        s.jsx(
                          'div',
                          {
                            className: 'border border-brown-200 rounded-lg p-6',
                            children: s.jsxs('div', {
                              className: 'flex items-start justify-between',
                              children: [
                                s.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center space-x-3 mb-2',
                                      children: [
                                        s.jsx('h3', {
                                          className:
                                            'text-lg font-medium text-brown-900',
                                          children: e.title,
                                        }),
                                        s.jsx('span', {
                                          className:
                                            'bg-beige-50 text-green-600 text-sm px-2 py-1 rounded',
                                          children: e.type,
                                        }),
                                      ],
                                    }),
                                    s.jsx('p', {
                                      className: 'text-brown-600 mb-3',
                                      children: e.description,
                                    }),
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center space-x-6 text-sm text-brown-500',
                                      children: [
                                        s.jsxs('div', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(a, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            new Date(
                                              e.date
                                            ).toLocaleDateString(),
                                            ' •',
                                            ' ',
                                            e.time,
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(l, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            e.location,
                                          ],
                                        }),
                                        s.jsxs('div', {
                                          className: 'flex items-center',
                                          children: [
                                            s.jsx(t, {
                                              className: 'h-4 w-4 mr-1',
                                            }),
                                            e.attendees,
                                            ' attending',
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                s.jsx('button', {
                                  className:
                                    'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors',
                                  children: 'Register',
                                }),
                              ],
                            }),
                          },
                          e.id
                        )
                      ),
                    }),
                  }),
                ],
              }),
            }),
          'jobs' === m &&
            s.jsx('div', {
              className: 'space-y-6',
              children: s.jsxs('div', {
                className: 'bg-white rounded-lg shadow',
                children: [
                  s.jsxs('div', {
                    className: 'p-6 border-b',
                    children: [
                      s.jsx('h2', {
                        className: 'text-xl font-bold text-brown-900',
                        children: 'Job Opportunities',
                      }),
                      s.jsx('p', {
                        className: 'text-brown-600',
                        children:
                          'Positions from our verified employer partners',
                      }),
                    ],
                  }),
                  s.jsx('div', {
                    className: 'p-6',
                    children: s.jsx('div', {
                      className: 'space-y-6',
                      children: b.map((e) =>
                        s.jsx(
                          'div',
                          {
                            className:
                              'border rounded-lg p-6 ' +
                              (e.matched
                                ? 'border-green-200 bg-green-50'
                                : 'border-brown-200'),
                            children: s.jsxs('div', {
                              className: 'flex items-start justify-between',
                              children: [
                                s.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center space-x-3 mb-2',
                                      children: [
                                        s.jsx('h3', {
                                          className:
                                            'text-lg font-medium text-brown-900',
                                          children: e.title,
                                        }),
                                        e.matched &&
                                          s.jsx('span', {
                                            className:
                                              'bg-beige-50 text-green-600 text-sm px-2 py-1 rounded',
                                            children: 'Great Match',
                                          }),
                                        s.jsx('span', {
                                          className:
                                            'bg-beige-100 text-brown-900 text-sm px-2 py-1 rounded',
                                          children: e.type,
                                        }),
                                      ],
                                    }),
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center space-x-4 text-sm text-brown-600 mb-3',
                                      children: [
                                        s.jsx('span', {
                                          className: 'font-medium',
                                          children: e.company,
                                        }),
                                        s.jsx('span', { children: e.location }),
                                        s.jsx('span', {
                                          className:
                                            'text-green-600 font-medium',
                                          children: e.salary,
                                        }),
                                      ],
                                    }),
                                    s.jsx('div', {
                                      className: 'flex flex-wrap gap-2 mb-3',
                                      children: e.skills.map((e, t) =>
                                        s.jsx(
                                          'span',
                                          {
                                            className:
                                              'bg-beige-50 text-green-600 text-sm px-2 py-1 rounded',
                                            children: e,
                                          },
                                          t
                                        )
                                      ),
                                    }),
                                    s.jsxs('p', {
                                      className: 'text-sm text-brown-500',
                                      children: ['Posted ', e.posted],
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  className: 'space-x-2',
                                  children: [
                                    s.jsx('button', {
                                      className:
                                        'bg-white text-green-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors',
                                      children: 'Learn More',
                                    }),
                                    s.jsx('button', {
                                      className:
                                        'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors',
                                      children: 'Apply Now',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          e.id
                        )
                      ),
                    }),
                  }),
                ],
              }),
            }),
          'mentors' === m &&
            s.jsx('div', {
              className: 'space-y-6',
              children: s.jsxs('div', {
                className: 'bg-white rounded-lg shadow',
                children: [
                  s.jsxs('div', {
                    className: 'p-6 border-b',
                    children: [
                      s.jsx('h2', {
                        className: 'text-xl font-bold text-brown-900',
                        children: 'Industry Mentors',
                      }),
                      s.jsx('p', {
                        className: 'text-brown-600',
                        children:
                          'Connect with experienced professionals for career guidance',
                      }),
                    ],
                  }),
                  s.jsx('div', {
                    className: 'p-6',
                    children: s.jsx('div', {
                      className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
                      children: p.map((e) =>
                        s.jsxs(
                          'div',
                          {
                            className: 'border border-brown-200 rounded-lg p-6',
                            children: [
                              s.jsxs('div', {
                                className: 'text-center mb-4',
                                children: [
                                  s.jsx('div', {
                                    className:
                                      'w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3',
                                  }),
                                  s.jsx('h3', {
                                    className: 'font-medium text-brown-900',
                                    children: e.name,
                                  }),
                                  s.jsx('p', {
                                    className: 'text-sm text-brown-600',
                                    children: e.title,
                                  }),
                                  s.jsx('p', {
                                    className: 'text-sm text-brown-500',
                                    children: e.company,
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className:
                                  'flex items-center justify-center space-x-4 mb-4',
                                children: [
                                  s.jsxs('div', {
                                    className: 'flex items-center',
                                    children: [
                                      s.jsx(d, {
                                        className:
                                          'h-4 w-4 text-yellow-500 mr-1',
                                      }),
                                      s.jsx('span', {
                                        className: 'text-sm text-brown-600',
                                        children: e.rating,
                                      }),
                                    ],
                                  }),
                                  s.jsxs('div', {
                                    className: 'text-sm text-brown-500',
                                    children: [e.sessions, ' sessions'],
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'mb-4',
                                children: [
                                  s.jsx('p', {
                                    className: 'text-sm text-brown-600 mb-2',
                                    children: 'Expertise:',
                                  }),
                                  s.jsx('div', {
                                    className: 'flex flex-wrap gap-1',
                                    children: e.expertise.map((e, t) =>
                                      s.jsx(
                                        'span',
                                        {
                                          className:
                                            'bg-beige-50 text-brown-600 text-xs px-2 py-1 rounded',
                                          children: e,
                                        },
                                        t
                                      )
                                    ),
                                  }),
                                ],
                              }),
                              s.jsx('button', {
                                className:
                                  'w-full py-2 px-4 rounded-lg transition-colors ' +
                                  (e.available
                                    ? 'bg-brown-600 text-white hover:bg-brown-600-hover'
                                    : 'bg-beige-100 text-brown-500 cursor-not-allowed'),
                                disabled: !e.available,
                                children: e.available
                                  ? 'Book Session'
                                  : 'Not Available',
                              }),
                            ],
                          },
                          e.id
                        )
                      ),
                    }),
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
export { o as default };

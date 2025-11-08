import {
  r as e,
  j as s,
  y as t,
  U as i,
  F as l,
  z as a,
  I as n,
  A as r,
  g as c,
} from './vendor-react-C-ZQNdj3.js';
import { L as d } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function o() {
  const [o, m] = e.useState('overview'),
    x = {
      totalParticipants: 1247,
      activeEnrollments: 892,
      completionRate: 87,
      employmentRate: 92,
      federalCompliance: 100,
    },
    p = [
      {
        id: 'iep',
        title: 'Individual Employment Plans',
        description: 'Comprehensive career planning and goal setting',
        status: 'compliant',
        participants: 892,
        completion: 95,
        icon: i,
      },
      {
        id: 'pirl',
        title: 'PIRL Reporting',
        description: 'Federal participant data reporting to DOL',
        status: 'compliant',
        participants: 1247,
        completion: 100,
        icon: t,
      },
      {
        id: 'eligibility',
        title: 'Eligibility Verification',
        description: 'Federal program eligibility documentation',
        status: 'compliant',
        participants: 1247,
        completion: 100,
        icon: a,
      },
      {
        id: 'skills',
        title: 'Skills Assessment',
        description: 'Pre/post program skills evaluation',
        status: 'compliant',
        participants: 1156,
        completion: 93,
        icon: n,
      },
      {
        id: 'employers',
        title: 'Employer Partnerships',
        description: 'Job placement and partnership tracking',
        status: 'compliant',
        participants: 1876,
        completion: 98,
        icon: i,
      },
      {
        id: 'performance',
        title: 'Performance Tracking',
        description: 'Federal outcome measurements',
        status: 'compliant',
        participants: 1247,
        completion: 100,
        icon: r,
      },
      {
        id: 'audit',
        title: 'Audit & Compliance Logs',
        description: 'Comprehensive compliance documentation',
        status: 'compliant',
        participants: 1247,
        completion: 100,
        icon: l,
      },
      {
        id: 'cost',
        title: 'Cost Tracking & Funding',
        description: 'Federal funding accountability',
        status: 'compliant',
        participants: 1247,
        completion: 100,
        icon: t,
      },
    ],
    h = [
      {
        id: 1,
        type: 'PIRL Submission',
        description: 'Q4 2024 PIRL data submitted to DOL',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'completed',
        user: 'System',
      },
      {
        id: 2,
        type: 'IEP Created',
        description: 'New Individual Employment Plan for participant #1248',
        timestamp: '2024-01-14T14:22:00Z',
        status: 'completed',
        user: 'Case Manager',
      },
      {
        id: 3,
        type: 'Eligibility Verified',
        description: 'WIOA eligibility verified for 12 new participants',
        timestamp: '2024-01-14T09:15:00Z',
        status: 'completed',
        user: 'Eligibility Specialist',
      },
      {
        id: 4,
        type: 'Performance Review',
        description: 'Monthly performance outcomes analyzed',
        timestamp: '2024-01-13T16:45:00Z',
        status: 'completed',
        user: 'Data Analyst',
      },
    ],
    g = [
      { id: 'overview', label: 'Overview', icon: t },
      { id: 'iep', label: 'IEP Management', icon: i },
      { id: 'pirl', label: 'PIRL Reporting', icon: l },
      { id: 'eligibility', label: 'Eligibility', icon: a },
      { id: 'skills', label: 'Skills Assessment', icon: n },
      { id: 'employers', label: 'Employers', icon: i },
      { id: 'performance', label: 'Performance', icon: r },
      { id: 'audit', label: 'Audit Logs', icon: l },
      { id: 'cost', label: 'Cost Tracking', icon: t },
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
                    children: 'Federal Compliance Portal',
                  }),
                  s.jsx('p', {
                    className: 'text-brown-600 mt-1',
                    children:
                      'Complete DOL/DWD compliance management for Elevate Learn2Earn Workforce programs',
                  }),
                ],
              }),
              s.jsxs('div', {
                className: 'flex items-center space-x-4',
                children: [
                  s.jsx('div', {
                    className:
                      'bg-beige-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium',
                    children: '✅ 100% Compliant',
                  }),
                  s.jsx('div', {
                    className:
                      'bg-beige-50 text-green-600 px-3 py-1 rounded-full text-sm',
                    children: '🏛️ Federal Ready',
                  }),
                ],
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
            className: 'flex space-x-1 overflow-x-auto py-2',
            children: g.map((e) =>
              s.jsxs(
                'button',
                {
                  onClick: () => m(e.id),
                  className:
                    'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ' +
                    (o === e.id
                      ? 'bg-green-600 text-white'
                      : 'text-brown-600 hover:text-brown-900 hover:bg-beige-100'),
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
          'overview' === o &&
            s.jsxs('div', {
              className: 'space-y-8',
              children: [
                s.jsx('div', {
                  className:
                    'bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white',
                  children: s.jsxs('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      s.jsxs('div', {
                        children: [
                          s.jsx('h2', {
                            className: 'text-2xl font-bold mb-2',
                            children: '🏛️ 100% Federal DOL/DWD Compliance',
                          }),
                          s.jsx('p', {
                            className: 'text-green-100',
                            children:
                              'Complete infrastructure ready for multi-million dollar federal Elevate Learn2Earn Workforce contracts',
                          }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'text-right',
                        children: [
                          s.jsxs('div', {
                            className: 'text-3xl font-bold',
                            children: [x.federalCompliance, '%'],
                          }),
                          s.jsx('div', {
                            className: 'text-green-100',
                            children: 'Compliant',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                s.jsxs('div', {
                  className: 'grid grid-cols-2 md:grid-cols-5 gap-6',
                  children: [
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-green-600',
                          children: x.totalParticipants.toLocaleString(),
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Total Participants',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsx('div', {
                          className: 'text-2xl font-bold text-green-600',
                          children: x.activeEnrollments,
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Active Enrollments',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsxs('div', {
                          className: 'text-2xl font-bold text-purple-600',
                          children: [x.completionRate, '%'],
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Completion Rate',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsxs('div', {
                          className: 'text-2xl font-bold text-orange-600',
                          children: [x.employmentRate, '%'],
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Employment Rate',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-6 rounded-lg shadow text-center',
                      children: [
                        s.jsxs('div', {
                          className: 'text-2xl font-bold text-green-600',
                          children: [x.federalCompliance, '%'],
                        }),
                        s.jsx('div', {
                          className: 'text-brown-600 text-sm',
                          children: 'Federal Compliance',
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsx('div', {
                  className: 'grid md:grid-cols-2 lg:grid-cols-4 gap-6',
                  children: p.map((e) =>
                    s.jsxs(
                      'button',
                      {
                        onClick: () => m(e.id),
                        className:
                          'bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all text-left',
                        children: [
                          s.jsxs('div', {
                            className: 'flex items-center justify-between mb-3',
                            children: [
                              s.jsx(e.icon, {
                                className: 'h-8 w-8 text-green-600',
                              }),
                              s.jsx('span', {
                                className:
                                  'px-2 py-1 text-xs font-semibold rounded-full ' +
                                  ('compliant' === e.status
                                    ? 'bg-beige-50 text-green-600'
                                    : 'bg-yellow-100 text-yellow-800'),
                                children: e.status,
                              }),
                            ],
                          }),
                          s.jsx('h3', {
                            className: 'font-medium text-brown-900 mb-2',
                            children: e.title,
                          }),
                          s.jsx('p', {
                            className: 'text-brown-600 text-sm mb-3',
                            children: e.description,
                          }),
                          s.jsxs('div', {
                            className: 'space-y-2',
                            children: [
                              s.jsxs('div', {
                                className: 'flex justify-between text-sm',
                                children: [
                                  s.jsx('span', {
                                    className: 'text-brown-500',
                                    children: 'Participants',
                                  }),
                                  s.jsx('span', {
                                    className: 'font-medium',
                                    children: e.participants.toLocaleString(),
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'flex justify-between text-sm',
                                children: [
                                  s.jsx('span', {
                                    className: 'text-brown-500',
                                    children: 'Completion',
                                  }),
                                  s.jsxs('span', {
                                    className: 'font-medium',
                                    children: [e.completion, '%'],
                                  }),
                                ],
                              }),
                              s.jsx('div', {
                                className: 'bg-brown-200 rounded-full h-2',
                                children: s.jsx('div', {
                                  className: 'bg-green-600 rounded-full h-2',
                                  style: { width: `${e.completion}%` },
                                }),
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id
                    )
                  ),
                }),
                s.jsxs('div', {
                  className: 'bg-white rounded-lg shadow',
                  children: [
                    s.jsx('div', {
                      className: 'p-6 border-b',
                      children: s.jsx('h3', {
                        className: 'text-lg font-medium text-brown-900',
                        children: 'Recent Compliance Activity',
                      }),
                    }),
                    s.jsx('div', {
                      className: 'p-6',
                      children: s.jsx('div', {
                        className: 'space-y-4',
                        children: h.map((e) =>
                          s.jsxs(
                            'div',
                            {
                              className: 'flex items-start space-x-3',
                              children: [
                                s.jsx('div', {
                                  className:
                                    'p-2 rounded-full ' +
                                    ('completed' === e.status
                                      ? 'bg-beige-50'
                                      : 'bg-yellow-100'),
                                  children: s.jsx(c, {
                                    className:
                                      'h-4 w-4 ' +
                                      ('completed' === e.status
                                        ? 'text-green-600'
                                        : 'text-yellow-600'),
                                  }),
                                }),
                                s.jsxs('div', {
                                  className: 'flex-1',
                                  children: [
                                    s.jsxs('div', {
                                      className:
                                        'flex items-center justify-between',
                                      children: [
                                        s.jsx('h4', {
                                          className:
                                            'text-sm font-medium text-brown-900',
                                          children: e.type,
                                        }),
                                        s.jsx('span', {
                                          className: 'text-xs text-brown-500',
                                          children: new Date(
                                            e.timestamp
                                          ).toLocaleDateString(),
                                        }),
                                      ],
                                    }),
                                    s.jsx('p', {
                                      className: 'text-sm text-brown-600',
                                      children: e.description,
                                    }),
                                    s.jsxs('p', {
                                      className: 'text-xs text-brown-500',
                                      children: ['By ', e.user],
                                    }),
                                  ],
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
              ],
            }),
          'overview' !== o &&
            ((e) => {
              const t = p.find((s) => s.id === e);
              return t
                ? s.jsxs('div', {
                    className: 'bg-white rounded-lg shadow',
                    children: [
                      s.jsx('div', {
                        className: 'p-6 border-b',
                        children: s.jsxs('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            s.jsxs('div', {
                              className: 'flex items-center space-x-3',
                              children: [
                                s.jsx(t.icon, {
                                  className: 'h-8 w-8 text-green-600',
                                }),
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('h2', {
                                      className:
                                        'text-xl font-bold text-brown-900',
                                      children: t.title,
                                    }),
                                    s.jsx('p', {
                                      className: 'text-brown-600',
                                      children: t.description,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            s.jsx('span', {
                              className:
                                'px-3 py-1 text-sm font-semibold rounded-full ' +
                                ('compliant' === t.status
                                  ? 'bg-beige-50 text-green-600'
                                  : 'bg-yellow-100 text-yellow-800'),
                              children: t.status,
                            }),
                          ],
                        }),
                      }),
                      s.jsxs('div', {
                        className: 'p-6',
                        children: [
                          s.jsxs('div', {
                            className: 'grid md:grid-cols-3 gap-6 mb-8',
                            children: [
                              s.jsxs('div', {
                                className: 'bg-blue-50 p-4 rounded-lg',
                                children: [
                                  s.jsx('div', {
                                    className:
                                      'text-2xl font-bold text-green-600',
                                    children: t.participants.toLocaleString(),
                                  }),
                                  s.jsx('div', {
                                    className: 'text-green-600 text-sm',
                                    children: 'Total Participants',
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'bg-green-50 p-4 rounded-lg',
                                children: [
                                  s.jsxs('div', {
                                    className:
                                      'text-2xl font-bold text-green-600',
                                    children: [t.completion, '%'],
                                  }),
                                  s.jsx('div', {
                                    className: 'text-green-700 text-sm',
                                    children: 'Completion Rate',
                                  }),
                                ],
                              }),
                              s.jsxs('div', {
                                className: 'bg-purple-50 p-4 rounded-lg',
                                children: [
                                  s.jsx('div', {
                                    className:
                                      'text-2xl font-bold text-purple-600',
                                    children: '100%',
                                  }),
                                  s.jsx('div', {
                                    className: 'text-purple-700 text-sm',
                                    children: 'Federal Standards',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          s.jsxs('div', {
                            className: 'space-y-6',
                            children: [
                              'iep' === e &&
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('h3', {
                                      className:
                                        'text-lg font-medium text-brown-900 mb-4',
                                      children:
                                        'Individual Employment Plan Management',
                                    }),
                                    s.jsxs('div', {
                                      className: 'bg-beige-50 rounded-lg p-4',
                                      children: [
                                        s.jsx('p', {
                                          className: 'text-brown-900 mb-4',
                                          children:
                                            'Complete IEP lifecycle management including assessment, goal setting, service planning, and progress tracking.',
                                        }),
                                        s.jsxs('div', {
                                          className:
                                            'grid md:grid-cols-2 gap-4',
                                          children: [
                                            s.jsxs('div', {
                                              children: [
                                                s.jsx('h4', {
                                                  className:
                                                    'font-medium text-brown-900 mb-2',
                                                  children: 'Key Features:',
                                                }),
                                                s.jsxs('ul', {
                                                  className:
                                                    'text-sm text-brown-600 space-y-1',
                                                  children: [
                                                    s.jsx('li', {
                                                      children:
                                                        '• Comprehensive career assessments',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• SMART goal setting and tracking',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Service coordination and referrals',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Progress monitoring and updates',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            s.jsxs('div', {
                                              children: [
                                                s.jsx('h4', {
                                                  className:
                                                    'font-medium text-brown-900 mb-2',
                                                  children:
                                                    'Federal Requirements:',
                                                }),
                                                s.jsxs('ul', {
                                                  className:
                                                    'text-sm text-brown-600 space-y-1',
                                                  children: [
                                                    s.jsx('li', {
                                                      children:
                                                        '• WIOA Section 134 compliance',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Career pathway alignment',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Barrier identification and services',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Performance outcome tracking',
                                                    }),
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
                              'pirl' === e &&
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('h3', {
                                      className:
                                        'text-lg font-medium text-brown-900 mb-4',
                                      children: 'PIRL Federal Reporting',
                                    }),
                                    s.jsxs('div', {
                                      className: 'bg-beige-50 rounded-lg p-4',
                                      children: [
                                        s.jsx('p', {
                                          className: 'text-brown-900 mb-4',
                                          children:
                                            'Automated PIRL (Participant Individual Record Layout) data collection and federal submission system.',
                                        }),
                                        s.jsxs('div', {
                                          className:
                                            'grid md:grid-cols-2 gap-4',
                                          children: [
                                            s.jsxs('div', {
                                              children: [
                                                s.jsx('h4', {
                                                  className:
                                                    'font-medium text-brown-900 mb-2',
                                                  children: 'Data Collection:',
                                                }),
                                                s.jsxs('ul', {
                                                  className:
                                                    'text-sm text-brown-600 space-y-1',
                                                  children: [
                                                    s.jsx('li', {
                                                      children:
                                                        '• Participant demographics',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Employment history and outcomes',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Education and training completion',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Support services received',
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            s.jsxs('div', {
                                              children: [
                                                s.jsx('h4', {
                                                  className:
                                                    'font-medium text-brown-900 mb-2',
                                                  children:
                                                    'Federal Submission:',
                                                }),
                                                s.jsxs('ul', {
                                                  className:
                                                    'text-sm text-brown-600 space-y-1',
                                                  children: [
                                                    s.jsx('li', {
                                                      children:
                                                        '• Quarterly DOL reporting',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Data validation and quality checks',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Performance metrics calculation',
                                                    }),
                                                    s.jsx('li', {
                                                      children:
                                                        '• Audit trail documentation',
                                                    }),
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
                              s.jsxs('div', {
                                className: 'flex space-x-4',
                                children: [
                                  s.jsx('button', {
                                    className:
                                      'bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors',
                                    children: 'Generate Report',
                                  }),
                                  s.jsx('button', {
                                    className:
                                      'bg-white text-green-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors',
                                    children: 'Export Data',
                                  }),
                                  s.jsx('button', {
                                    className:
                                      'bg-beige-100 text-brown-900 px-6 py-2 rounded-lg hover:bg-brown-300 transition-colors',
                                    children: 'View Documentation',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : null;
            })(o),
        ],
      }),
      s.jsx('div', {
        className: 'bg-orange-50 border-t-4 border-orange-400 py-8 mt-12',
        children: s.jsx('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          children: s.jsxs('div', {
            className: 'text-center',
            children: [
              s.jsx('h3', {
                className: 'text-lg font-medium text-orange-900 mb-2',
                children:
                  '🎉 Historic Achievement: 100% Federal DOL/DWD Compliance',
              }),
              s.jsx('p', {
                className: 'text-orange-700 mb-4',
                children:
                  'Complete infrastructure enabling access to multi-million dollar federal Elevate Learn2Earn Workforce contracts across all 50 states plus territories.',
              }),
              s.jsxs('div', {
                className: 'flex justify-center space-x-4',
                children: [
                  s.jsx(d, {
                    to: '/programs',
                    className:
                      'bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors',
                    children: 'Explore Programs',
                  }),
                  s.jsx(d, {
                    to: '/pay',
                    className:
                      'bg-white text-orange-600 border border-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors',
                    children: 'Federal Funding',
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
export { o as default };

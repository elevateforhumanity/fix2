import {
  j as e,
  A as s,
  s as t,
  u as r,
  g as i,
  U as l,
  v as a,
  w as n,
} from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
const c = () => {
  const c = [
      {
        title: 'Industry-Recognized Credentials',
        description: 'Earn certifications recognized by employers worldwide',
        icon: s,
      },
      {
        title: 'Flexible Scheduling',
        description: 'Schedule your exam at a time that works for you',
        icon: r,
      },
      {
        title: 'Immediate Results',
        description: 'Get your exam results immediately upon completion',
        icon: i,
      },
      {
        title: 'Professional Environment',
        description: 'Take exams in a secure, proctored testing environment',
        icon: l,
      },
    ],
    o = (e) => {
      const s = {
        blue: 'bg-blue-100 text-blue-800 border-blue-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        purple: 'bg-purple-100 text-purple-800 border-purple-300',
        orange: 'bg-orange-100 text-orange-800 border-orange-300',
        pink: 'bg-pink-100 text-pink-800 border-pink-300',
        indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      };
      return s[e] || s.blue;
    };
  return e.jsxs('div', {
    className: 'min-h-screen bg-gray-50',
    children: [
      e.jsx('div', {
        className:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20',
        children: e.jsx('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          children: e.jsxs('div', {
            className: 'text-center',
            children: [
              e.jsx('div', {
                className: 'flex justify-center mb-6',
                children: e.jsx(s, { className: 'w-20 h-20' }),
              }),
              e.jsx('h1', {
                className: 'text-5xl font-bold mb-4',
                children: 'Certiport Authorized Testing Center',
              }),
              e.jsx('p', {
                className: 'text-2xl mb-6',
                children: 'Elevate for Humanity Career and Training Institute',
              }),
              e.jsx('p', {
                className: 'text-xl mb-8 max-w-3xl mx-auto',
                children:
                  'Take industry-recognized certification exams at our authorized testing center. Microsoft, Adobe, Autodesk, and more.',
              }),
              e.jsxs('div', {
                className: 'flex flex-wrap justify-center gap-4',
                children: [
                  e.jsx('a', {
                    href: '#schedule',
                    className:
                      'bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition',
                    children: 'Schedule an Exam',
                  }),
                  e.jsxs('a', {
                    href: 'https://www.certiport.com',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition flex items-center',
                    children: [
                      'Visit Certiport',
                      e.jsx(t, { className: 'w-5 h-5 ml-2' }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsxs('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16',
        children: [
          e.jsxs('div', {
            className: 'bg-white rounded-lg shadow-lg p-8 mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: 'About Our Testing Center',
              }),
              e.jsx('p', {
                className:
                  'text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto',
                children:
                  'As a Certiport Authorized Testing Center (CATC), we provide a professional, secure environment for taking industry-recognized certification exams. Our facility meets all Certiport standards for testing security and candidate experience.',
              }),
              e.jsx('div', {
                className: 'grid md:grid-cols-4 gap-6 mt-8',
                children: c.map((s, t) => {
                  const r = s.icon;
                  return e.jsxs(
                    'div',
                    {
                      className: 'text-center',
                      children: [
                        e.jsx('div', {
                          className:
                            'bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4',
                          children: e.jsx(r, {
                            className: 'w-8 h-8 text-blue-600',
                          }),
                        }),
                        e.jsx('h3', {
                          className: 'font-bold mb-2',
                          children: s.title,
                        }),
                        e.jsx('p', {
                          className: 'text-sm text-gray-600',
                          children: s.description,
                        }),
                      ],
                    },
                    t
                  );
                }),
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-3xl font-bold mb-8 text-center',
                children: 'Available Certifications',
              }),
              e.jsx('div', {
                className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
                children: [
                  {
                    name: 'Microsoft Office Specialist (MOS)',
                    description:
                      'Industry-recognized certification for Microsoft Office proficiency',
                    exams: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Access'],
                    icon: '💼',
                    color: 'blue',
                  },
                  {
                    name: 'IC3 Digital Literacy',
                    description:
                      'Global standard for digital literacy certification',
                    exams: [
                      'Computing Fundamentals',
                      'Key Applications',
                      'Living Online',
                    ],
                    icon: '💻',
                    color: 'green',
                  },
                  {
                    name: 'Adobe Certified Professional',
                    description:
                      'Validate skills in Adobe Creative Cloud applications',
                    exams: [
                      'Photoshop',
                      'Illustrator',
                      'InDesign',
                      'Premiere Pro',
                    ],
                    icon: '🎨',
                    color: 'purple',
                  },
                  {
                    name: 'Autodesk Certified User',
                    description:
                      'Professional certification for Autodesk design software',
                    exams: ['AutoCAD', 'Revit', 'Fusion 360', 'Maya'],
                    icon: '🏗️',
                    color: 'orange',
                  },
                  {
                    name: 'Entrepreneurship and Small Business (ESB)',
                    description:
                      'Certification for entrepreneurial and business skills',
                    exams: ['ESB Certification Exam'],
                    icon: '🚀',
                    color: 'pink',
                  },
                  {
                    name: 'IT Specialist',
                    description:
                      'Entry-level IT certification for technical skills',
                    exams: [
                      'Software Development',
                      'Networking',
                      'Cybersecurity',
                      'Cloud Computing',
                    ],
                    icon: '🔧',
                    color: 'indigo',
                  },
                ].map((s, t) =>
                  e.jsxs(
                    'div',
                    {
                      className: `border-2 rounded-lg p-6 ${o(s.color)}`,
                      children: [
                        e.jsx('div', {
                          className: 'text-4xl mb-4',
                          children: s.icon,
                        }),
                        e.jsx('h3', {
                          className: 'text-xl font-bold mb-3',
                          children: s.name,
                        }),
                        e.jsx('p', {
                          className: 'text-sm mb-4',
                          children: s.description,
                        }),
                        e.jsxs('div', {
                          className: 'space-y-2',
                          children: [
                            e.jsx('p', {
                              className: 'font-semibold text-sm',
                              children: 'Available Exams:',
                            }),
                            e.jsx('ul', {
                              className: 'space-y-1',
                              children: s.exams.map((s, t) =>
                                e.jsxs(
                                  'li',
                                  {
                                    className: 'flex items-center text-sm',
                                    children: [
                                      e.jsx(i, {
                                        className: 'w-4 h-4 mr-2 flex-shrink-0',
                                      }),
                                      s,
                                    ],
                                  },
                                  t
                                )
                              ),
                            }),
                          ],
                        }),
                      ],
                    },
                    t
                  )
                ),
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'bg-blue-50 rounded-lg p-8 mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: 'How to Take an Exam',
              }),
              e.jsxs('div', {
                className: 'grid md:grid-cols-4 gap-6',
                children: [
                  e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('div', {
                        className:
                          'bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold',
                        children: '1',
                      }),
                      e.jsx('h3', {
                        className: 'font-bold mb-2',
                        children: 'Choose Your Exam',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-700 text-sm',
                        children:
                          'Select the certification exam you want to take',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('div', {
                        className:
                          'bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold',
                        children: '2',
                      }),
                      e.jsx('h3', {
                        className: 'font-bold mb-2',
                        children: 'Schedule Your Test',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-700 text-sm',
                        children:
                          'Contact us to schedule your exam date and time',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('div', {
                        className:
                          'bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold',
                        children: '3',
                      }),
                      e.jsx('h3', {
                        className: 'font-bold mb-2',
                        children: 'Take Your Exam',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-700 text-sm',
                        children:
                          'Arrive at our testing center and complete your exam',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'text-center',
                    children: [
                      e.jsx('div', {
                        className:
                          'bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold',
                        children: '4',
                      }),
                      e.jsx('h3', {
                        className: 'font-bold mb-2',
                        children: 'Get Certified',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-700 text-sm',
                        children:
                          'Receive your results immediately and earn your certification',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'bg-white rounded-lg shadow-lg p-8 mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: 'Exam Pricing',
              }),
              e.jsxs('div', {
                className: 'max-w-3xl mx-auto',
                children: [
                  e.jsxs('div', {
                    className: 'grid md:grid-cols-2 gap-6',
                    children: [
                      e.jsxs('div', {
                        className: 'border-2 border-gray-200 rounded-lg p-6',
                        children: [
                          e.jsx('h3', {
                            className: 'text-xl font-bold mb-3',
                            children: 'Standard Exams',
                          }),
                          e.jsx('p', {
                            className: 'text-gray-700 mb-4',
                            children:
                              'Microsoft Office Specialist, IC3, IT Specialist',
                          }),
                          e.jsx('p', {
                            className: 'text-3xl font-bold text-blue-600',
                            children: '$100',
                          }),
                          e.jsx('p', {
                            className: 'text-sm text-gray-600',
                            children: 'per exam',
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'border-2 border-gray-200 rounded-lg p-6',
                        children: [
                          e.jsx('h3', {
                            className: 'text-xl font-bold mb-3',
                            children: 'Professional Exams',
                          }),
                          e.jsx('p', {
                            className: 'text-gray-700 mb-4',
                            children:
                              'Adobe Certified Professional, Autodesk Certified User',
                          }),
                          e.jsx('p', {
                            className: 'text-3xl font-bold text-purple-600',
                            children: '$150',
                          }),
                          e.jsx('p', {
                            className: 'text-sm text-gray-600',
                            children: 'per exam',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    className:
                      'mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center',
                    children: [
                      e.jsx('p', {
                        className: 'font-bold text-lg mb-2',
                        children: 'Training Program Participants',
                      }),
                      e.jsx('p', {
                        className: 'text-gray-700',
                        children:
                          'Exam fees may be covered by WIOA/WRG funding for eligible participants in our training programs',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'bg-white rounded-lg shadow-lg p-8 mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-3xl font-bold mb-6 text-center',
                children: 'Testing Requirements',
              }),
              e.jsxs('div', {
                className: 'grid md:grid-cols-2 gap-8 max-w-4xl mx-auto',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('h3', {
                        className: 'text-xl font-bold mb-4',
                        children: 'What to Bring',
                      }),
                      e.jsxs('ul', {
                        className: 'space-y-3',
                        children: [
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children: 'Valid government-issued photo ID',
                              }),
                            ],
                          }),
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children:
                                  'Certiport exam voucher (if applicable)',
                              }),
                            ],
                          }),
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children:
                                  'Payment for exam fee (if not pre-paid)',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h3', {
                        className: 'text-xl font-bold mb-4',
                        children: 'Testing Rules',
                      }),
                      e.jsxs('ul', {
                        className: 'space-y-3',
                        children: [
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children:
                                  'Arrive 15 minutes before scheduled time',
                              }),
                            ],
                          }),
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children:
                                  'No personal items allowed in testing area',
                              }),
                            ],
                          }),
                          e.jsxs('li', {
                            className: 'flex items-start',
                            children: [
                              e.jsx(i, {
                                className:
                                  'w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0',
                              }),
                              e.jsx('span', {
                                children: 'Testing is proctored and monitored',
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
          e.jsxs('div', {
            id: 'schedule',
            className:
              'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-4xl font-bold mb-4 text-center',
                children: 'Ready to Get Certified?',
              }),
              e.jsx('p', {
                className: 'text-xl mb-8 text-center',
                children:
                  'Schedule your certification exam at our authorized testing center',
              }),
              e.jsxs('div', {
                className: 'flex flex-col sm:flex-row gap-4 justify-center',
                children: [
                  e.jsxs('a', {
                    href: 'mailto:elevateforhumanity@gmail.com?subject=Certiport Exam Scheduling',
                    className:
                      'bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition text-center flex items-center justify-center',
                    children: [
                      e.jsx(a, { className: 'w-5 h-5 mr-2' }),
                      'Email to Schedule',
                    ],
                  }),
                  e.jsxs('a', {
                    href: 'tel:+13173143757',
                    className:
                      'bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition text-center flex items-center justify-center',
                    children: [
                      e.jsx(n, { className: 'w-5 h-5 mr-2' }),
                      'Call (317) 314-3757',
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'bg-white rounded-lg shadow-lg p-8 text-center',
            children: [
              e.jsx('h2', {
                className: 'text-2xl font-bold mb-4',
                children: 'Testing Center Information',
              }),
              e.jsxs('div', {
                className: 'max-w-2xl mx-auto',
                children: [
                  e.jsxs('p', {
                    className: 'text-lg mb-6',
                    children: [
                      e.jsx('strong', {
                        children:
                          'Elevate for Humanity Career and Training Institute',
                      }),
                      e.jsx('br', {}),
                      'Certiport Authorized Testing Center',
                    ],
                  }),
                  e.jsxs('div', {
                    className: 'grid md:grid-cols-2 gap-6',
                    children: [
                      e.jsxs('div', {
                        children: [
                          e.jsx('h3', {
                            className: 'font-bold mb-2',
                            children: 'Contact Us',
                          }),
                          e.jsxs('p', {
                            className: 'text-gray-700',
                            children: [
                              'Email: elevateforhumanity@gmail.com',
                              e.jsx('br', {}),
                              'Phone: (317) 314-3757',
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('h3', {
                            className: 'font-bold mb-2',
                            children: 'Testing Hours',
                          }),
                          e.jsxs('p', {
                            className: 'text-gray-700',
                            children: [
                              'By Appointment Only',
                              e.jsx('br', {}),
                              'Monday - Friday: 9 AM - 5 PM',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'mt-6 pt-6 border-t border-gray-200',
                    children: e.jsxs('p', {
                      className: 'text-sm text-gray-600',
                      children: [
                        'For Certiport customer support: 1-888-999-9830 (Option 2)',
                        e.jsx('br', {}),
                        'Or email: customerservices@certiport.com',
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export { c as default };

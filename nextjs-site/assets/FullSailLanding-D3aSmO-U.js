import { r as e, j as t, H as r } from './vendor-react-C-ZQNdj3.js';
import { N as a } from './Navigation-Bbm4Xzc1.js';
import { F as s } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
const n = () => {
  const [n, i] = e.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      program: '',
      employment: '',
    }),
    l = (e) => {
      i({ ...n, [e.target.name]: e.target.value });
    };
  return t.jsxs('div', {
    children: [
      t.jsxs(r, {
        children: [
          t.jsx('title', {
            children: 'Free Training Programs | Elevate for Humanity',
          }),
          t.jsx('meta', {
            name: 'description',
            content:
              'FREE training available for qualified Indiana residents. WIOA approved programs.',
          }),
        ],
      }),
      t.jsx(a, {}),
      t.jsxs('div', {
        className: 'min-h-screen bg-beige-50',
        children: [
          t.jsxs('div', {
            className: 'bg-brown-900 text-white text-center py-3 text-sm',
            children: [
              t.jsx('span', {
                className:
                  'bg-green-600 text-white px-3 py-1 rounded font-bold mr-2',
                children: 'FREE TRAINING',
              }),
              'Available for Qualified Indiana Residents • WIOA Approved Programs',
            ],
          }),
          t.jsx('div', {
            className:
              'bg-gradient-to-br from-brown-800 to-brown-700 text-white',
            children: t.jsx('div', {
              className: 'max-w-7xl mx-auto',
              children: t.jsxs('div', {
                className: 'grid lg:grid-cols-[1fr_400px] grid-cols-1',
                children: [
                  t.jsxs('div', {
                    className: 'p-10 lg:p-16 flex flex-col justify-center',
                    children: [
                      t.jsx('div', {
                        className:
                          'bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase inline-block w-fit mb-5',
                        children: '89% Job Placement Rate',
                      }),
                      t.jsx('h1', {
                        className:
                          'text-4xl lg:text-5xl font-bold mb-5 leading-tight',
                        children: 'Start Your Career in Tech & Trades',
                      }),
                      t.jsx('p', {
                        className: 'text-xl mb-8 text-gray-200 leading-relaxed',
                        children:
                          'Get job-ready in months, not years with industry-recognized certifications and guaranteed employer connections.',
                      }),
                      t.jsx('ul', {
                        className: 'space-y-3 mb-8',
                        children: [
                          'Free training for qualified residents',
                          'Industry-recognized certifications',
                          'Job placement assistance included',
                          'Flexible scheduling options',
                          'No experience required',
                        ].map((e, r) =>
                          t.jsxs(
                            'li',
                            {
                              className: 'flex items-start text-lg',
                              children: [
                                t.jsx('span', {
                                  className:
                                    'text-green-400 font-bold text-xl mr-3',
                                  children: '✓',
                                }),
                                e,
                              ],
                            },
                            r
                          )
                        ),
                      }),
                    ],
                  }),
                  t.jsxs('div', {
                    className: 'bg-white text-brown-900 p-8 lg:p-10 shadow-2xl',
                    children: [
                      t.jsxs('div', {
                        className: 'text-center mb-8',
                        children: [
                          t.jsx('h2', {
                            className: 'text-2xl font-bold text-brown-900 mb-2',
                            children: 'Get Program Info',
                          }),
                          t.jsx('p', {
                            className: 'text-brown-600',
                            children:
                              'Find out if you qualify for free training',
                          }),
                        ],
                      }),
                      t.jsxs('form', {
                        onSubmit: (e) => {
                          (e.preventDefault(),
                            console.log('Form submitted:', n),
                            alert('Thank you! We will contact you soon.'));
                        },
                        className: 'space-y-5',
                        children: [
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'firstName',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'First Name *',
                              }),
                              t.jsx('input', {
                                type: 'text',
                                id: 'firstName',
                                name: 'firstName',
                                value: n.firstName,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base',
                                required: !0,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'lastName',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'Last Name *',
                              }),
                              t.jsx('input', {
                                type: 'text',
                                id: 'lastName',
                                name: 'lastName',
                                value: n.lastName,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base',
                                required: !0,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'email',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'Email Address *',
                              }),
                              t.jsx('input', {
                                type: 'email',
                                id: 'email',
                                name: 'email',
                                value: n.email,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base',
                                required: !0,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'phone',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'Phone Number *',
                              }),
                              t.jsx('input', {
                                type: 'tel',
                                id: 'phone',
                                name: 'phone',
                                value: n.phone,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base',
                                required: !0,
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'program',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'Program Interest *',
                              }),
                              t.jsxs('select', {
                                id: 'program',
                                name: 'program',
                                value: n.program,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base bg-white',
                                required: !0,
                                children: [
                                  t.jsx('option', {
                                    value: '',
                                    children: 'Select a Program',
                                  }),
                                  t.jsx('option', {
                                    value: 'cybersecurity',
                                    children: 'Cybersecurity',
                                  }),
                                  t.jsx('option', {
                                    value: 'cloud-computing',
                                    children: 'Cloud Computing',
                                  }),
                                  t.jsx('option', {
                                    value: 'healthcare',
                                    children: 'Healthcare (CNA)',
                                  }),
                                  t.jsx('option', {
                                    value: 'electrical',
                                    children: 'Electrical Trades',
                                  }),
                                  t.jsx('option', {
                                    value: 'construction',
                                    children: 'Construction',
                                  }),
                                  t.jsx('option', {
                                    value: 'beauty',
                                    children: 'Beauty & Wellness',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          t.jsxs('div', {
                            children: [
                              t.jsx('label', {
                                htmlFor: 'employment',
                                className:
                                  'block font-bold text-brown-900 mb-1',
                                children: 'Current Employment Status *',
                              }),
                              t.jsxs('select', {
                                id: 'employment',
                                name: 'employment',
                                value: n.employment,
                                onChange: l,
                                className:
                                  'w-full px-4 py-3 border-2 border-brown-300 rounded focus:border-orange-500 focus:outline-none text-base bg-white',
                                required: !0,
                                children: [
                                  t.jsx('option', {
                                    value: '',
                                    children: 'Select Status',
                                  }),
                                  t.jsx('option', {
                                    value: 'unemployed',
                                    children: 'Unemployed',
                                  }),
                                  t.jsx('option', {
                                    value: 'underemployed',
                                    children: 'Underemployed',
                                  }),
                                  t.jsx('option', {
                                    value: 'employed',
                                    children: 'Employed (seeking change)',
                                  }),
                                  t.jsx('option', {
                                    value: 'student',
                                    children: 'Student',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          t.jsx('button', {
                            type: 'submit',
                            className:
                              'w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded font-bold text-lg uppercase tracking-wider transition-colors',
                            children: 'Get Free Program Info',
                          }),
                          t.jsx('p', {
                            className:
                              'text-xs text-brown-600 leading-relaxed mt-4',
                            children:
                              'By submitting this form, you consent to receive emails and texts from Elevate for Humanity. You may opt out at any time. Message and data rates may apply.',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          t.jsx('div', {
            className: 'py-16 px-6 bg-beige-50',
            children: t.jsxs('div', {
              className: 'max-w-7xl mx-auto',
              children: [
                t.jsx('h2', {
                  className:
                    'text-4xl font-bold text-center text-brown-900 mb-12',
                  children: 'Choose Your Career Path',
                }),
                t.jsx('div', {
                  className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
                  children: [
                    {
                      icon: '🛡️',
                      title: 'Cybersecurity',
                      description:
                        'Protect organizations from cyber threats with CompTIA Security+ certification.',
                      features: [
                        'CompTIA Security+ Certification',
                        'Ethical Hacking Training',
                        'Network Security',
                        '12-16 weeks',
                        '$65,000+ average salary',
                      ],
                    },
                    {
                      icon: '☁️',
                      title: 'Cloud Computing',
                      description:
                        'Master cloud platforms with Google Cloud and Microsoft Azure certifications.',
                      features: [
                        'Google Cloud Certification',
                        'Microsoft Azure Training',
                        'Cloud Architecture',
                        '8-12 weeks',
                        '$75,000+ average salary',
                      ],
                    },
                    {
                      icon: '🏥',
                      title: 'Healthcare (CNA)',
                      description:
                        'Start your healthcare career as a Certified Nursing Assistant.',
                      features: [
                        'State CNA Certification',
                        'Clinical Training',
                        'Patient Care Skills',
                        '6-8 weeks',
                        '$35,000+ average salary',
                      ],
                    },
                    {
                      icon: '⚡',
                      title: 'Electrical Trades',
                      description:
                        'Join the IBEW union with electrical apprenticeship preparation.',
                      features: [
                        'IBEW Apprenticeship Prep',
                        'Electrical Fundamentals',
                        'Safety Training',
                        '12-16 weeks',
                        '$70,000+ average salary',
                      ],
                    },
                    {
                      icon: '🏗️',
                      title: 'Construction',
                      description:
                        'Build your future with NCCER construction certifications.',
                      features: [
                        'NCCER Core Certification',
                        'Construction Safety',
                        'Blueprint Reading',
                        '10-14 weeks',
                        '$55,000+ average salary',
                      ],
                    },
                    {
                      icon: '💅',
                      title: 'Beauty & Wellness',
                      description:
                        'Launch your career in the beauty industry with professional certifications.',
                      features: [
                        'Cosmetology License Prep',
                        'Esthetics Training',
                        'Nail Technology',
                        '8-12 weeks',
                        '$40,000+ average salary',
                      ],
                    },
                  ].map((e, r) =>
                    t.jsxs(
                      'div',
                      {
                        className:
                          'bg-white rounded-lg p-8 shadow-lg hover:-translate-y-2 transition-transform text-center',
                        children: [
                          t.jsx('span', {
                            className: 'text-5xl block mb-5',
                            children: e.icon,
                          }),
                          t.jsx('h3', {
                            className: 'text-2xl font-bold text-brown-900 mb-4',
                            children: e.title,
                          }),
                          t.jsx('p', {
                            className: 'text-brown-600 mb-5 leading-relaxed',
                            children: e.description,
                          }),
                          t.jsx('ul', {
                            className: 'text-left space-y-2 mb-6',
                            children: e.features.map((e, r) =>
                              t.jsxs(
                                'li',
                                {
                                  className:
                                    'text-brown-900 text-sm pl-5 relative',
                                  children: [
                                    t.jsx('span', {
                                      className:
                                        'absolute left-0 text-orange-500 font-bold',
                                      children: '•',
                                    }),
                                    e,
                                  ],
                                },
                                r
                              )
                            ),
                          }),
                          t.jsx('button', {
                            className:
                              'bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded font-bold transition-colors',
                            children: 'Learn More',
                          }),
                        ],
                      },
                      r
                    )
                  ),
                }),
              ],
            }),
          }),
          t.jsx('div', {
            className: 'bg-gray-800 text-white py-16 px-6 text-center',
            children: t.jsx('div', {
              className: 'max-w-4xl mx-auto',
              children: t.jsx('div', {
                className: 'grid grid-cols-2 lg:grid-cols-4 gap-8',
                children: [
                  { number: '89%', label: 'Job Placement Rate' },
                  { number: '106+', label: 'Certifications Offered' },
                  { number: '2,500+', label: 'Students Trained' },
                  { number: '$0', label: 'Cost for Qualified Residents' },
                ].map((e, r) =>
                  t.jsxs(
                    'div',
                    {
                      children: [
                        t.jsx('div', {
                          className: 'text-5xl font-bold text-orange-500 mb-3',
                          children: e.number,
                        }),
                        t.jsx('div', {
                          className: 'text-lg',
                          children: e.label,
                        }),
                      ],
                    },
                    r
                  )
                ),
              }),
            }),
          }),
        ],
      }),
      t.jsx(s, {}),
    ],
  });
};
export { n as default };

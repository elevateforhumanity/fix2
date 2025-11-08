import { r as e, j as s, H as r } from './vendor-react-C-ZQNdj3.js';
import { N as l } from './Navigation-Bbm4Xzc1.js';
import { F as n } from './Footer-Dh9yHrAI.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function t() {
  const [t, o] = e.useState('enrollment');
  return s.jsxs('div', {
    children: [
      s.jsxs(r, {
        children: [
          s.jsx('title', { children: 'Student Portal | Elevate for Humanity' }),
          s.jsx('meta', {
            name: 'description',
            content:
              'Student portal for Elevate for Humanity Career & Training Institute',
          }),
        ],
      }),
      s.jsx(l, {}),
      s.jsxs('div', {
        className: 'min-h-screen bg-beige-50',
        children: [
          s.jsx('div', {
            className:
              'bg-gradient-to-r from-green-600 to-brown-600 text-white py-8 text-center',
            children: s.jsxs('div', {
              className: 'max-w-7xl mx-auto px-8',
              children: [
                s.jsx('h1', {
                  className: 'text-4xl font-bold mb-2',
                  children: '🎓 Student Portal',
                }),
                s.jsx('p', {
                  className: 'text-lg',
                  children: 'Elevate for Humanity Career & Training Institute',
                }),
              ],
            }),
          }),
          s.jsx('div', {
            className: 'bg-white shadow-md mb-8',
            children: s.jsx('div', {
              className: 'max-w-7xl mx-auto px-8',
              children: s.jsxs('div', {
                className: 'flex flex-wrap justify-center gap-4 py-4',
                children: [
                  s.jsx('button', {
                    onClick: () => o('enrollment'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('enrollment' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '📝 Enrollment',
                  }),
                  s.jsx('button', {
                    onClick: () => o('dashboard'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('dashboard' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '📊 Dashboard',
                  }),
                  s.jsx('button', {
                    onClick: () => o('courses'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('courses' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '📚 My Courses',
                  }),
                  s.jsx('button', {
                    onClick: () => o('certificates'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('certificates' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '🏆 Certificates',
                  }),
                  s.jsx('button', {
                    onClick: () => o('profile'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('profile' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '👤 Profile',
                  }),
                  s.jsx('button', {
                    onClick: () => o('support'),
                    className:
                      'px-6 py-3 rounded-lg font-semibold transition ' +
                      ('support' === t
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-200 text-brown-900 hover:bg-green-600 hover:text-white'),
                    children: '💬 Support',
                  }),
                ],
              }),
            }),
          }),
          s.jsxs('div', {
            className: 'max-w-7xl mx-auto px-8 pb-16',
            children: [
              'enrollment' === t &&
                s.jsxs('div', {
                  className: 'bg-white p-8 rounded-xl shadow-sm',
                  children: [
                    s.jsx('h2', {
                      className: 'text-3xl font-bold mb-4',
                      children: '📝 Course Enrollment',
                    }),
                    s.jsx('p', {
                      className: 'text-brown-600 mb-8',
                      children:
                        'Select and enroll in professional certification programs. All courses include hybrid learning with online modules and hands-on skills validation.',
                    }),
                    s.jsxs('form', {
                      className: 'space-y-6',
                      children: [
                        s.jsxs('div', {
                          children: [
                            s.jsx('label', {
                              className:
                                'block mb-2 font-semibold text-brown-900',
                              children: 'Select Training Program *',
                            }),
                            s.jsxs('select', {
                              className:
                                'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                              children: [
                                s.jsx('option', {
                                  value: '',
                                  children: 'Choose a program...',
                                }),
                                s.jsxs('optgroup', {
                                  label: 'Healthcare & Public Safety',
                                  children: [
                                    s.jsx('option', {
                                      value: 'hha',
                                      children:
                                        'Home Health Aide (HHA) Training - $299',
                                    }),
                                    s.jsx('option', {
                                      value: 'cpr',
                                      children:
                                        'CPR & OSHA Safety Technician - $89',
                                    }),
                                    s.jsx('option', {
                                      value: 'dsp',
                                      children:
                                        'Direct Support Professional (DSP) - $199',
                                    }),
                                  ],
                                }),
                                s.jsxs('optgroup', {
                                  label: 'Technology & Digital Tools',
                                  children: [
                                    s.jsx('option', {
                                      value: 'microsoft',
                                      children:
                                        'Microsoft Office Specialist - $149',
                                    }),
                                    s.jsx('option', {
                                      value: 'google',
                                      children:
                                        'Google Workspace Productivity - $99',
                                    }),
                                    s.jsx('option', {
                                      value: 'digital-literacy',
                                      children: 'Digital Literacy & IC3 - $129',
                                    }),
                                  ],
                                }),
                                s.jsxs('optgroup', {
                                  label: 'Food Service & Business',
                                  children: [
                                    s.jsx('option', {
                                      value: 'servsafe',
                                      children: 'ServSafe Food Handler - $69',
                                    }),
                                    s.jsx('option', {
                                      value: 'servsafe-manager',
                                      children: 'ServSafe Manager - $149',
                                    }),
                                    s.jsx('option', {
                                      value: 'entrepreneurship',
                                      children: 'Youth Entrepreneurship - $199',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'grid md:grid-cols-2 gap-6',
                          children: [
                            s.jsxs('div', {
                              children: [
                                s.jsx('label', {
                                  className:
                                    'block mb-2 font-semibold text-brown-900',
                                  children: 'First Name *',
                                }),
                                s.jsx('input', {
                                  type: 'text',
                                  'aria-label': 'text input',
                                  className:
                                    'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                                }),
                              ],
                            }),
                            s.jsxs('div', {
                              children: [
                                s.jsx('label', {
                                  className:
                                    'block mb-2 font-semibold text-brown-900',
                                  children: 'Last Name *',
                                }),
                                s.jsx('input', {
                                  type: 'text',
                                  'aria-label': 'text input',
                                  className:
                                    'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'grid md:grid-cols-2 gap-6',
                          children: [
                            s.jsxs('div', {
                              children: [
                                s.jsx('label', {
                                  className:
                                    'block mb-2 font-semibold text-brown-900',
                                  children: 'Email Address *',
                                }),
                                s.jsx('input', {
                                  type: 'email',
                                  'aria-label': 'email input',
                                  className:
                                    'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                                }),
                              ],
                            }),
                            s.jsxs('div', {
                              children: [
                                s.jsx('label', {
                                  className:
                                    'block mb-2 font-semibold text-brown-900',
                                  children: 'Phone Number *',
                                }),
                                s.jsx('input', {
                                  type: 'tel',
                                  'aria-label': 'tel input',
                                  className:
                                    'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          children: [
                            s.jsx('label', {
                              className:
                                'block mb-2 font-semibold text-brown-900',
                              children: 'Funding Source',
                            }),
                            s.jsxs('select', {
                              className:
                                'w-full p-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600',
                              children: [
                                s.jsx('option', {
                                  value: '',
                                  children: 'Select funding source...',
                                }),
                                s.jsx('option', {
                                  value: 'self-pay',
                                  children: 'Self Pay',
                                }),
                                s.jsx('option', {
                                  value: 'wioa',
                                  children: 'WIOA (Workforce Innovation)',
                                }),
                                s.jsx('option', {
                                  value: 'employer',
                                  children: 'Employer Sponsored',
                                }),
                                s.jsx('option', {
                                  value: 'grant',
                                  children: 'Grant/Scholarship',
                                }),
                                s.jsx('option', {
                                  value: 'va-benefits',
                                  children: 'VA Benefits',
                                }),
                              ],
                            }),
                          ],
                        }),
                        s.jsx('button', {
                          type: 'submit',
                          className:
                            'w-full bg-green-600 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition',
                          children: 'Submit Enrollment Application',
                        }),
                      ],
                    }),
                  ],
                }),
              'dashboard' === t &&
                s.jsxs('div', {
                  children: [
                    s.jsxs('div', {
                      className:
                        'bg-green-50 border border-green-200 text-green-600 p-4 rounded-lg mb-8',
                      children: [
                        s.jsx('strong', { children: 'Welcome back, Student!' }),
                        ' You have 2 active courses and 1 completed certification.',
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'grid md:grid-cols-2 gap-8 mb-8',
                      children: [
                        s.jsxs('div', {
                          className:
                            'bg-beige-50 border border-brown-200 rounded-xl p-6',
                          children: [
                            s.jsx('h3', {
                              className:
                                'text-xl font-semibold text-green-600 mb-4',
                              children: 'Overall Progress',
                            }),
                            s.jsx('div', {
                              className:
                                'bg-brown-200 rounded-full h-5 mb-3 overflow-hidden',
                              children: s.jsx('div', {
                                className:
                                  'bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full',
                                style: { width: '68%' },
                              }),
                            }),
                            s.jsx('p', {
                              className: 'text-brown-900',
                              children:
                                '68% Complete - 2 of 3 courses finished',
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className:
                            'bg-beige-50 border border-brown-200 rounded-xl p-6',
                          children: [
                            s.jsx('h3', {
                              className:
                                'text-xl font-semibold text-green-600 mb-4',
                              children: 'Quick Stats',
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', {
                                  children: 'Enrolled Courses:',
                                }),
                                ' 3',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'Completed:' }),
                                ' 1',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', {
                                  children: 'Certificates Earned:',
                                }),
                                ' 1',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'Next Deadline:' }),
                                ' March 15, 2024',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'bg-white p-8 rounded-xl shadow-sm',
                      children: [
                        s.jsx('h3', {
                          className: 'text-2xl font-bold mb-4',
                          children: 'Recent Activity',
                        }),
                        s.jsxs('div', {
                          className: 'space-y-3',
                          children: [
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'March 10:' }),
                                ' Completed CPR Skills Assessment',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'March 8:' }),
                                ' Submitted Module 3 Assignment - Microsoft Excel',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'March 5:' }),
                                ' Started OSHA 10 Hour Training',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'March 1:' }),
                                ' Earned ServSafe Food Handler Certificate',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              'courses' === t &&
                s.jsxs('div', {
                  className: 'space-y-6',
                  children: [
                    s.jsx('h2', {
                      className: 'text-3xl font-bold mb-6',
                      children: '📚 My Courses',
                    }),
                    s.jsxs('div', {
                      className:
                        'bg-beige-50 border border-brown-200 rounded-xl p-6',
                      children: [
                        s.jsxs('div', {
                          className: 'flex justify-between items-start mb-4',
                          children: [
                            s.jsx('h3', {
                              className: 'text-xl font-semibold text-green-600',
                              children: 'CPR & OSHA Safety Technician',
                            }),
                            s.jsx('span', {
                              className:
                                'bg-beige-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold',
                              children: 'Completed',
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className:
                            'bg-brown-200 rounded-full h-5 mb-3 overflow-hidden',
                          children: s.jsx('div', {
                            className:
                              'bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full',
                            style: { width: '100%' },
                          }),
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Completion Date:' }),
                            ' February 28, 2024',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-4',
                          children: [
                            s.jsx('strong', { children: 'Grade:' }),
                            ' 94% (Pass)',
                          ],
                        }),
                        s.jsx('button', {
                          className:
                            'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition',
                          children: 'View Certificate',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className:
                        'bg-beige-50 border border-brown-200 rounded-xl p-6',
                      children: [
                        s.jsxs('div', {
                          className: 'flex justify-between items-start mb-4',
                          children: [
                            s.jsx('h3', {
                              className: 'text-xl font-semibold text-green-600',
                              children: 'Microsoft Office Specialist',
                            }),
                            s.jsx('span', {
                              className:
                                'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold',
                              children: 'In Progress',
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className:
                            'bg-brown-200 rounded-full h-5 mb-3 overflow-hidden',
                          children: s.jsx('div', {
                            className:
                              'bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full',
                            style: { width: '75%' },
                          }),
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Progress:' }),
                            ' 75% Complete',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Next Module:' }),
                            ' PowerPoint Advanced Features',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-4',
                          children: [
                            s.jsx('strong', { children: 'Due Date:' }),
                            ' March 15, 2024',
                          ],
                        }),
                        s.jsx('button', {
                          className:
                            'bg-green-600 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition',
                          children: 'Continue Course',
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className:
                        'bg-beige-50 border border-brown-200 rounded-xl p-6',
                      children: [
                        s.jsxs('div', {
                          className: 'flex justify-between items-start mb-4',
                          children: [
                            s.jsx('h3', {
                              className: 'text-xl font-semibold text-green-600',
                              children: 'OSHA 10 Hour Certification',
                            }),
                            s.jsx('span', {
                              className:
                                'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold',
                              children: 'In Progress',
                            }),
                          ],
                        }),
                        s.jsx('div', {
                          className:
                            'bg-brown-200 rounded-full h-5 mb-3 overflow-hidden',
                          children: s.jsx('div', {
                            className:
                              'bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full',
                            style: { width: '30%' },
                          }),
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Progress:' }),
                            ' 30% Complete',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Next Module:' }),
                            ' Hazard Recognition',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-4',
                          children: [
                            s.jsx('strong', { children: 'Due Date:' }),
                            ' March 30, 2024',
                          ],
                        }),
                        s.jsx('button', {
                          className:
                            'bg-green-600 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition',
                          children: 'Continue Course',
                        }),
                      ],
                    }),
                  ],
                }),
              'certificates' === t &&
                s.jsxs('div', {
                  children: [
                    s.jsx('h2', {
                      className: 'text-3xl font-bold mb-6',
                      children: '🏆 My Certificates',
                    }),
                    s.jsxs('div', {
                      className:
                        'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-600 rounded-xl p-8 text-center',
                      children: [
                        s.jsx('h3', {
                          className: 'text-2xl font-bold text-green-700 mb-4',
                          children: '🏥 CPR & OSHA Safety Technician',
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Issued:' }),
                            ' February 28, 2024',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-2',
                          children: [
                            s.jsx('strong', { children: 'Expires:' }),
                            ' February 28, 2026',
                          ],
                        }),
                        s.jsxs('p', {
                          className: 'text-brown-900 mb-6',
                          children: [
                            s.jsx('strong', { children: 'Certificate ID:' }),
                            ' EFH-CPR-2024-001247',
                          ],
                        }),
                        s.jsxs('div', {
                          className: 'flex gap-4 justify-center',
                          children: [
                            s.jsx('button', {
                              className:
                                'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition',
                              children: 'Download PDF',
                            }),
                            s.jsx('button', {
                              className:
                                'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition',
                              children: 'Share Certificate',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              'profile' === t &&
                s.jsxs('div', {
                  className: 'bg-white p-8 rounded-xl shadow-sm',
                  children: [
                    s.jsx('h2', {
                      className: 'text-3xl font-bold mb-6',
                      children: '👤 My Profile',
                    }),
                    s.jsxs('div', {
                      className: 'space-y-4',
                      children: [
                        s.jsxs('div', {
                          children: [
                            s.jsx('label', {
                              className:
                                'block mb-2 font-semibold text-brown-900',
                              children: 'Full Name',
                            }),
                            s.jsx('input', {
                              type: 'text',
                              'aria-label': 'text input',
                              defaultValue: 'John Doe',
                              className:
                                'w-full p-3 border border-brown-300 rounded-lg',
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          children: [
                            s.jsx('label', {
                              className:
                                'block mb-2 font-semibold text-brown-900',
                              children: 'Email',
                            }),
                            s.jsx('input', {
                              type: 'email',
                              'aria-label': 'email input',
                              defaultValue: 'john.doe@example.com',
                              className:
                                'w-full p-3 border border-brown-300 rounded-lg',
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          children: [
                            s.jsx('label', {
                              className:
                                'block mb-2 font-semibold text-brown-900',
                              children: 'Phone',
                            }),
                            s.jsx('input', {
                              type: 'tel',
                              'aria-label': 'tel input',
                              defaultValue: '(555) 123-4567',
                              className:
                                'w-full p-3 border border-brown-300 rounded-lg',
                            }),
                          ],
                        }),
                        s.jsx('button', {
                          className:
                            'bg-green-600 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition',
                          children: 'Update Profile',
                        }),
                      ],
                    }),
                  ],
                }),
              'support' === t &&
                s.jsxs('div', {
                  className: 'bg-white p-8 rounded-xl shadow-sm',
                  children: [
                    s.jsx('h2', {
                      className: 'text-3xl font-bold mb-6',
                      children: '💬 Support',
                    }),
                    s.jsxs('div', {
                      className: 'space-y-6',
                      children: [
                        s.jsxs('div', {
                          className:
                            'bg-blue-50 border border-blue-200 p-6 rounded-lg',
                          children: [
                            s.jsx('h3', {
                              className:
                                'text-xl font-semibold text-green-600 mb-2',
                              children: 'Need Help?',
                            }),
                            s.jsx('p', {
                              className: 'text-brown-900 mb-4',
                              children:
                                'Our support team is here to assist you Monday-Friday, 9 AM - 5 PM EST',
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'Email:' }),
                                ' support@elevateforhumanity.org',
                              ],
                            }),
                            s.jsxs('p', {
                              className: 'text-brown-900',
                              children: [
                                s.jsx('strong', { children: 'Phone:' }),
                                ' (555) 123-4567',
                              ],
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          children: [
                            s.jsx('h3', {
                              className: 'text-xl font-semibold mb-4',
                              children: 'Submit a Support Ticket',
                            }),
                            s.jsxs('form', {
                              className: 'space-y-4',
                              children: [
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('label', {
                                      className:
                                        'block mb-2 font-semibold text-brown-900',
                                      children: 'Subject',
                                    }),
                                    s.jsx('input', {
                                      type: 'text',
                                      'aria-label': 'text input',
                                      className:
                                        'w-full p-3 border border-brown-300 rounded-lg',
                                    }),
                                  ],
                                }),
                                s.jsxs('div', {
                                  children: [
                                    s.jsx('label', {
                                      className:
                                        'block mb-2 font-semibold text-brown-900',
                                      children: 'Message',
                                    }),
                                    s.jsx('textarea', {
                                      rows: '5',
                                      className:
                                        'w-full p-3 border border-brown-300 rounded-lg',
                                    }),
                                  ],
                                }),
                                s.jsx('button', {
                                  className:
                                    'bg-green-600 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition',
                                  children: 'Submit Ticket',
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
        ],
      }),
      s.jsx(n, {}),
    ],
  });
}
export { t as default };

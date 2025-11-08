import {
  j as e,
  t as s,
  A as t,
  a4 as o,
  J as r,
  U as n,
  af as a,
} from './vendor-react-C-ZQNdj3.js';
import { L as i } from './vendor-router-CQjfSXV_.js';
import './vendor-Da1LjC7-.js';
function c() {
  const c = [
    {
      title: 'Student Dashboard',
      description: 'Access your courses, track progress, and view assignments',
      icon: s,
      to: '/lms',
      color: 'bg-blue-500',
    },
    {
      title: 'My Certificates',
      description: 'View and download your earned certificates',
      icon: t,
      to: '/certificates',
      color: 'bg-green-500',
    },
    {
      title: 'Course Catalog',
      description: 'Browse available courses and enroll in new programs',
      icon: o,
      to: '/lms/courses',
      color: 'bg-purple-500',
    },
    {
      title: 'Events Calendar',
      description: 'View upcoming classes, workshops, and events',
      icon: r,
      to: '/calendar',
      color: 'bg-orange-500',
    },
    {
      title: 'Community Hub',
      description: 'Connect with fellow students and join study groups',
      icon: n,
      to: '/community',
      color: 'bg-pink-500',
    },
    {
      title: 'AI Tutor',
      description: 'Get instant help with your coursework',
      icon: a,
      to: '/ai-tutor',
      color: 'bg-indigo-500',
    },
  ];
  return e.jsxs('div', {
    className: 'min-h-screen bg-white',
    children: [
      e.jsx('section', {
        className:
          'bg-gradient-to-r from-brown-700 to-brown-800 text-white py-16',
        children: e.jsxs('div', {
          className: 'container',
          children: [
            e.jsx('h1', {
              className: 'text-4xl md:text-5xl font-bold mb-4',
              children: 'Student Portal',
            }),
            e.jsx('p', {
              className: 'text-xl opacity-90 max-w-2xl',
              children:
                'Access all your learning resources, courses, and student services in one place',
            }),
          ],
        }),
      }),
      e.jsx('section', {
        className: 'py-16',
        children: e.jsx('div', {
          className: 'container',
          children: e.jsx('div', {
            className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
            children: c.map((s) => {
              const t = s.icon;
              return e.jsxs(
                i,
                {
                  to: s.to,
                  className:
                    'group border border-brown-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-green-600',
                  children: [
                    e.jsx('div', {
                      className: `${s.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`,
                      children: e.jsx(t, { className: 'h-6 w-6 text-white' }),
                    }),
                    e.jsx('h3', {
                      className:
                        'text-xl font-semibold text-brown-900 mb-2 group-hover:text-green-600 transition-colors',
                      children: s.title,
                    }),
                    e.jsx('p', {
                      className: 'text-brown-600',
                      children: s.description,
                    }),
                  ],
                },
                s.to
              );
            }),
          }),
        }),
      }),
      e.jsx('section', {
        className: 'bg-beige-50 py-16',
        children: e.jsxs('div', {
          className: 'container',
          children: [
            e.jsx('h2', {
              className: 'text-3xl font-bold text-brown-900 mb-8 text-center',
              children: 'Student Resources',
            }),
            e.jsxs('div', {
              className: 'grid md:grid-cols-2 gap-8 max-w-4xl mx-auto',
              children: [
                e.jsxs('div', {
                  className: 'bg-white p-6 rounded-lg border border-brown-200',
                  children: [
                    e.jsx('h3', {
                      className: 'text-xl font-semibold text-brown-900 mb-3',
                      children: 'Student Handbook',
                    }),
                    e.jsx('p', {
                      className: 'text-brown-600 mb-4',
                      children:
                        'Review policies, procedures, and important information for students',
                    }),
                    e.jsx(i, {
                      to: '/student-handbook',
                      className:
                        'text-green-600 hover:text-green-700 font-medium',
                      children: 'View Handbook →',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'bg-white p-6 rounded-lg border border-brown-200',
                  children: [
                    e.jsx('h3', {
                      className: 'text-xl font-semibold text-brown-900 mb-3',
                      children: 'Support Center',
                    }),
                    e.jsx('p', {
                      className: 'text-brown-600 mb-4',
                      children:
                        'Get help with technical issues, course questions, and more',
                    }),
                    e.jsx(i, {
                      to: '/support',
                      className:
                        'text-green-600 hover:text-green-700 font-medium',
                      children: 'Get Support →',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsx('section', {
        className: 'py-16',
        children: e.jsxs('div', {
          className: 'container text-center',
          children: [
            e.jsx('h2', {
              className: 'text-3xl font-bold text-brown-900 mb-4',
              children: 'New to Elevate for Humanity?',
            }),
            e.jsx('p', {
              className: 'text-lg text-brown-600 mb-8 max-w-2xl mx-auto',
              children:
                'Create an account to access your courses and start your learning journey',
            }),
            e.jsxs('div', {
              className: 'flex gap-4 justify-center',
              children: [
                e.jsx(i, {
                  to: '/auth/login',
                  className: 'btn-secondary',
                  children: 'Sign In',
                }),
                e.jsx(i, {
                  to: '/auth/signup',
                  className: 'btn',
                  children: 'Create Account',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { c as default };

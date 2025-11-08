import { j as e, H as t } from './vendor-react-C-ZQNdj3.js';
import { N as i } from './Navigation-Bbm4Xzc1.js';
import { F as r } from './Footer-Dh9yHrAI.js';
import { S as n } from './Section-DjKsK8lK.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
function s() {
  return e.jsxs('div', {
    children: [
      e.jsxs(t, {
        children: [
          e.jsx('title', {
            children: 'Platform Features | Elevate for Humanity',
          }),
          e.jsx('meta', {
            name: 'description',
            content:
              'Everything you need to succeed in your learning journey. Interactive learning, expert instructors, flexible schedules, and more.',
          }),
        ],
      }),
      e.jsx(i, {}),
      e.jsxs(n, {
        background: 'beige',
        children: [
          e.jsxs('div', {
            className: 'text-center mb-12',
            children: [
              e.jsx('h1', {
                className: 'section-title',
                children: 'Platform Features',
              }),
              e.jsx('p', {
                className: 'section-subtitle max-w-2xl mx-auto',
                children:
                  'Everything you need to succeed in your learning journey',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
            children: [
              {
                title: 'Interactive Learning',
                description:
                  'Engage with hands-on exercises and real-world projects',
                icon: '🎮',
              },
              {
                title: 'Expert Instructors',
                description:
                  'Learn from industry professionals with years of experience',
                icon: '👨‍🏫',
              },
              {
                title: 'Flexible Schedule',
                description: 'Study at your own pace, anytime and anywhere',
                icon: '⏰',
              },
              {
                title: 'Certificates',
                description:
                  'Earn recognized certificates upon course completion',
                icon: '🎓',
              },
              {
                title: 'Community Support',
                description:
                  'Connect with peers and mentors in our learning community',
                icon: '👥',
              },
              {
                title: 'Career Services',
                description: 'Get job placement assistance and career guidance',
                icon: '💼',
              },
            ].map((t, i) =>
              e.jsxs(
                'div',
                {
                  className: 'card p-8 hover:shadow-lg transition',
                  children: [
                    e.jsx('div', {
                      className: 'text-5xl mb-4',
                      children: t.icon,
                    }),
                    e.jsx('h3', {
                      className: 'text-2xl font-bold text-brown-900 mb-3',
                      children: t.title,
                    }),
                    e.jsx('p', {
                      className: 'text-brown-600',
                      children: t.description,
                    }),
                  ],
                },
                i
              )
            ),
          }),
        ],
      }),
      e.jsx(r, {}),
    ],
  });
}
export { s as default };

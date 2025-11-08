import {
  j as e,
  H as s,
  A as t,
  r as l,
  a2 as a,
  a3 as i,
  a4 as n,
  a5 as r,
  a6 as o,
  a7 as d,
} from './vendor-react-C-ZQNdj3.js';
import { L as c } from './vendor-router-CQjfSXV_.js';
import { F as m } from './Footer-Dh9yHrAI.js';
import {
  C as x,
  a as h,
  b as u,
  d as j,
  e as p,
  B as g,
} from './button-B_Plb33j.js';
import './vendor-Da1LjC7-.js';
const b = ({
    title: t = 'Elevate for Humanity',
    description: l = 'Empowering communities through technology and innovation',
    keywords: a = 'elevate, humanity, technology, innovation',
    image: i = '/og-image.jpg',
    url: n = 'https://elevateforhumanity.org',
  }) =>
    e.jsxs(s, {
      children: [
        e.jsx('title', { children: t }),
        e.jsx('meta', { name: 'description', content: l }),
        e.jsx('meta', { name: 'keywords', content: a }),
        e.jsx('meta', { property: 'og:title', content: t }),
        e.jsx('meta', { property: 'og:description', content: l }),
        e.jsx('meta', { property: 'og:image', content: i }),
        e.jsx('meta', { property: 'og:url', content: n }),
        e.jsx('meta', { property: 'og:type', content: 'website' }),
      ],
    }),
  N = () =>
    e.jsx('header', {
      className: 'site-header',
      children: e.jsxs('div', {
        className: 'header-container',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-4',
            children: [
              e.jsx(c, {
                to: '/',
                className: 'header-logo',
                children: e.jsx('h1', { children: 'Elevate for Humanity' }),
              }),
              e.jsxs('div', {
                className:
                  'hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-lg',
                children: [
                  e.jsx(t, { className: 'h-4 w-4' }),
                  e.jsx('span', { children: 'Buy Black Certified' }),
                ],
              }),
            ],
          }),
          e.jsxs('nav', {
            role: 'navigation',
            className: 'header-nav',
            children: [
              e.jsx(c, { to: '/', children: 'Home' }),
              e.jsx(c, { to: '/about', children: 'About' }),
              e.jsx(c, { to: '/blog', children: 'Blog' }),
              e.jsx(c, { to: '/contact', children: 'Contact' }),
            ],
          }),
        ],
      }),
    });
function v() {
  const [s, t] = l.useState({
      title: '',
      description: '',
      thumbnail: null,
      modules: [],
    }),
    [c, v] = l.useState({ title: '', lessons: [] }),
    w = (e) => {
      const s = { id: Date.now(), type: e, title: '', content: null };
      v({ ...c, lessons: [...c.lessons, s] });
    };
  return e.jsxs('div', {
    className: 'min-h-screen bg-beige-50',
    children: [
      e.jsx(b, {
        title: 'Create Course | Instructor Portal',
        description: 'Create and manage your courses',
      }),
      e.jsx(N, {}),
      e.jsxs('main', {
        role: 'main',
        className: 'container mx-auto px-4 py-8',
        children: [
          e.jsxs('div', {
            className: 'mb-8',
            children: [
              e.jsx('h1', {
                className: 'text-4xl font-bold text-brown-900 mb-2',
                children: 'Create New Course',
              }),
              e.jsx('p', {
                className: 'text-lg text-brown-600',
                children: 'Build your course content and publish to students',
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'grid lg:grid-cols-3 gap-8',
            children: [
              e.jsxs('div', {
                className: 'lg:col-span-2 space-y-6',
                children: [
                  e.jsxs(x, {
                    children: [
                      e.jsxs(h, {
                        children: [
                          e.jsx(u, { children: 'Course Information' }),
                          e.jsx(j, {
                            children: 'Basic details about your course',
                          }),
                        ],
                      }),
                      e.jsxs(p, {
                        className: 'space-y-4',
                        children: [
                          e.jsxs('div', {
                            children: [
                              e.jsx('label', {
                                className: 'block text-sm font-medium mb-2',
                                children: 'Course Title',
                              }),
                              e.jsx('input', {
                                type: 'text',
                                'aria-label': 'text input',
                                className:
                                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary',
                                placeholder:
                                  'e.g., Construction Pre-Apprenticeship',
                                value: s.title,
                                onChange: (e) =>
                                  t({ ...s, title: e.target.value }),
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('label', {
                                className: 'block text-sm font-medium mb-2',
                                children: 'Description',
                              }),
                              e.jsx('textarea', {
                                className:
                                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary',
                                rows: '4',
                                placeholder:
                                  'Describe what students will learn...',
                                value: s.description,
                                onChange: (e) =>
                                  t({ ...s, description: e.target.value }),
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('label', {
                                className: 'block text-sm font-medium mb-2',
                                children: 'Course Thumbnail',
                              }),
                              e.jsxs('div', {
                                className:
                                  'border-2 border-dashed rounded-lg p-8 text-center',
                                children: [
                                  e.jsx(a, {
                                    className:
                                      'w-12 h-12 mx-auto mb-4 text-gray-400',
                                  }),
                                  e.jsx('p', {
                                    className: 'text-sm text-brown-600 mb-2',
                                    children:
                                      'Click to upload or drag and drop',
                                  }),
                                  e.jsx('p', {
                                    className: 'text-xs text-brown-500',
                                    children: 'PNG, JPG up to 5MB',
                                  }),
                                  e.jsx('input', {
                                    type: 'file',
                                    'aria-label': 'file input',
                                    className: 'hidden',
                                    accept: 'image/*',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(x, {
                    children: [
                      e.jsxs(h, {
                        children: [
                          e.jsx(u, { children: 'Course Modules' }),
                          e.jsx(j, {
                            children: 'Organize your content into modules',
                          }),
                        ],
                      }),
                      e.jsxs(p, {
                        className: 'space-y-4',
                        children: [
                          s.modules.map((s, t) =>
                            e.jsxs(
                              'div',
                              {
                                className: 'border rounded-lg p-4 bg-white',
                                children: [
                                  e.jsxs('div', {
                                    className:
                                      'flex items-center justify-between mb-2',
                                    children: [
                                      e.jsxs('h3', {
                                        className: 'font-semibold',
                                        children: [
                                          'Module ',
                                          t + 1,
                                          ': ',
                                          s.title,
                                        ],
                                      }),
                                      e.jsx(g, {
                                        variant: 'ghost',
                                        size: 'sm',
                                        children: 'Edit',
                                      }),
                                    ],
                                  }),
                                  e.jsxs('p', {
                                    className: 'text-sm text-brown-600',
                                    children: [s.lessons.length, ' lessons'],
                                  }),
                                ],
                              },
                              t
                            )
                          ),
                          e.jsxs('div', {
                            className: 'border-2 border-dashed rounded-lg p-6',
                            children: [
                              e.jsx('input', {
                                type: 'text',
                                'aria-label': 'text input',
                                className:
                                  'w-full px-4 py-2 border rounded-lg mb-4',
                                placeholder:
                                  'Module Title (e.g., Introduction to Safety)',
                                value: c.title,
                                onChange: (e) =>
                                  v({ ...c, title: e.target.value }),
                              }),
                              e.jsxs('div', {
                                className: 'flex flex-wrap gap-2 mb-4',
                                children: [
                                  e.jsxs(g, {
                                    variant: 'outline',
                                    size: 'sm',
                                    onClick: () => w('video'),
                                    children: [
                                      e.jsx(i, { className: 'w-4 h-4 mr-2' }),
                                      'Add Video',
                                    ],
                                  }),
                                  e.jsxs(g, {
                                    variant: 'outline',
                                    size: 'sm',
                                    onClick: () => w('reading'),
                                    children: [
                                      e.jsx(n, { className: 'w-4 h-4 mr-2' }),
                                      'Add Reading',
                                    ],
                                  }),
                                  e.jsxs(g, {
                                    variant: 'outline',
                                    size: 'sm',
                                    onClick: () => w('assignment'),
                                    children: [
                                      e.jsx(a, { className: 'w-4 h-4 mr-2' }),
                                      'Add Assignment',
                                    ],
                                  }),
                                  e.jsxs(g, {
                                    variant: 'outline',
                                    size: 'sm',
                                    onClick: () => w('quiz'),
                                    children: [
                                      e.jsx(r, { className: 'w-4 h-4 mr-2' }),
                                      'Add Quiz',
                                    ],
                                  }),
                                ],
                              }),
                              c.lessons.length > 0 &&
                                e.jsx('div', {
                                  className: 'space-y-2 mb-4',
                                  children: c.lessons.map((s, t) =>
                                    e.jsxs(
                                      'div',
                                      {
                                        className:
                                          'flex items-center gap-2 p-2 bg-beige-50 rounded',
                                        children: [
                                          'video' === s.type &&
                                            e.jsx(i, { className: 'w-4 h-4' }),
                                          'reading' === s.type &&
                                            e.jsx(n, { className: 'w-4 h-4' }),
                                          'assignment' === s.type &&
                                            e.jsx(a, { className: 'w-4 h-4' }),
                                          'quiz' === s.type &&
                                            e.jsx(r, { className: 'w-4 h-4' }),
                                          e.jsx('input', {
                                            type: 'text',
                                            'aria-label': 'text input',
                                            className:
                                              'flex-1 px-2 py-1 text-sm border rounded',
                                            placeholder: `${s.type} title...`,
                                          }),
                                          e.jsx(g, {
                                            variant: 'ghost',
                                            size: 'sm',
                                            children: '×',
                                          }),
                                        ],
                                      },
                                      s.id
                                    )
                                  ),
                                }),
                              e.jsxs(g, {
                                onClick: () => {
                                  c.title &&
                                    (t({ ...s, modules: [...s.modules, c] }),
                                    v({ title: '', lessons: [] }));
                                },
                                disabled: !c.title,
                                children: [
                                  e.jsx(o, { className: 'w-4 h-4 mr-2' }),
                                  'Add Module',
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
                className: 'space-y-6',
                children: [
                  e.jsxs(x, {
                    children: [
                      e.jsx(h, {
                        children: e.jsx(u, { children: 'Course Preview' }),
                      }),
                      e.jsxs(p, {
                        children: [
                          e.jsx('div', {
                            className:
                              'aspect-video bg-brown-200 rounded-lg mb-4 flex items-center justify-center',
                            children: e.jsx('p', {
                              className: 'text-brown-500',
                              children: 'Thumbnail Preview',
                            }),
                          }),
                          e.jsx('h3', {
                            className: 'font-semibold mb-2',
                            children: s.title || 'Course Title',
                          }),
                          e.jsx('p', {
                            className: 'text-sm text-brown-600 mb-4',
                            children:
                              s.description ||
                              'Course description will appear here...',
                          }),
                          e.jsxs('div', {
                            className: 'text-sm text-brown-500',
                            children: [
                              e.jsxs('p', {
                                children: [s.modules.length, ' modules'],
                              }),
                              e.jsxs('p', {
                                children: [
                                  s.modules.reduce(
                                    (e, s) => e + s.lessons.length,
                                    0
                                  ),
                                  ' ',
                                  'lessons',
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(x, {
                    children: [
                      e.jsx(h, {
                        children: e.jsx(u, { children: 'Publish Course' }),
                      }),
                      e.jsxs(p, {
                        className: 'space-y-2',
                        children: [
                          e.jsxs(g, {
                            className: 'w-full',
                            disabled: !s.title || 0 === s.modules.length,
                            children: [
                              e.jsx(d, { className: 'w-4 h-4 mr-2' }),
                              'Save Draft',
                            ],
                          }),
                          e.jsx(g, {
                            className: 'w-full',
                            variant: 'outline',
                            children: 'Preview Course',
                          }),
                          e.jsx(g, {
                            className: 'w-full',
                            variant: 'default',
                            disabled: !s.title || 0 === s.modules.length,
                            children: 'Publish Course',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs(x, {
                    children: [
                      e.jsx(h, {
                        children: e.jsx(u, { children: 'Need Help?' }),
                      }),
                      e.jsxs(p, {
                        className: 'space-y-2 text-sm',
                        children: [
                          e.jsxs('p', {
                            className: 'text-brown-600',
                            children: [
                              e.jsx('strong', { children: 'Videos:' }),
                              ' Upload to Google Drive automatically',
                            ],
                          }),
                          e.jsxs('p', {
                            className: 'text-brown-600',
                            children: [
                              e.jsx('strong', { children: 'Assignments:' }),
                              ' Students submit through the platform',
                            ],
                          }),
                          e.jsxs('p', {
                            className: 'text-brown-600',
                            children: [
                              e.jsx('strong', { children: 'Quizzes:' }),
                              ' Auto-graded with instant feedback',
                            ],
                          }),
                          e.jsx(g, {
                            variant: 'link',
                            size: 'sm',
                            className: 'p-0',
                            children: 'View Tutorial →',
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
      e.jsx(m, {}),
    ],
  });
}
export { v as default };

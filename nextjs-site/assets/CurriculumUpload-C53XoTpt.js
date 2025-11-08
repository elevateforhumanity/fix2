import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import './vendor-Da1LjC7-.js';
function i() {
  const [i, l] = e.useState(null),
    [t, r] = e.useState(''),
    [n, o] = e.useState(null);
  return s.jsxs('main', {
    role: 'main',
    style: { padding: 32 },
    children: [
      s.jsx('h1', { children: 'AI Curriculum Upload' }),
      s.jsxs('form', {
        onSubmit: async (e) => {
          (e.preventDefault(),
            r('Processing...'),
            setTimeout(() => {
              (o({
                title: 'Sample Course from Upload',
                modules: [
                  {
                    title: 'Module 1: Introduction',
                    lessons: ['Lesson 1', 'Lesson 2'],
                  },
                  { title: 'Module 2: Advanced Topics', lessons: ['Lesson 3'] },
                ],
                quizzes: [{ title: 'Quiz 1', questions: 5 }],
                coverUrl: '/images/sample-cover.jpg',
              }),
                r('Preview generated! Review and publish.'));
            }, 2e3));
        },
        children: [
          s.jsx('input', {
            type: 'file',
            'aria-label': 'file input',
            accept: '.pdf,.docx,.txt,.mp4',
            onChange: (e) => l(e.target.files[0]),
            required: !0,
          }),
          s.jsx('button', {
            type: 'submit',
            style: { marginLeft: 16 },
            children: 'Upload & Generate',
          }),
        ],
      }),
      s.jsx('div', { style: { marginTop: 24 }, children: t }),
      n &&
        s.jsxs('div', {
          style: {
            marginTop: 32,
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 24,
          },
          children: [
            s.jsx('h2', { children: n.title }),
            s.jsx('img', {
              src: n.coverUrl,
              alt: 'Course Cover',
              style: { width: 200, borderRadius: 8 },
            }),
            s.jsx('h3', { children: 'Modules' }),
            s.jsx('ul', {
              children: n.modules.map((e, i) =>
                s.jsxs(
                  'li',
                  {
                    children: [
                      s.jsx('strong', { children: e.title }),
                      s.jsx('ul', {
                        children: e.lessons.map((e, i) =>
                          s.jsx('li', { children: e }, i)
                        ),
                      }),
                    ],
                  },
                  i
                )
              ),
            }),
            s.jsx('h3', { children: 'Quizzes' }),
            s.jsx('ul', {
              children: n.quizzes.map((e, i) =>
                s.jsxs(
                  'li',
                  { children: [e.title, ' (', e.questions, ' questions)'] },
                  i
                )
              ),
            }),
            s.jsx('button', {
              style: { marginTop: 16 },
              children: 'Publish Course',
            }),
          ],
        }),
    ],
  });
}
export { i as default };

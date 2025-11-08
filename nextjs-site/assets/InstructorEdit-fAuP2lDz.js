import { r as e, j as i } from './vendor-react-C-ZQNdj3.js';
import { L as t } from './vendor-router-CQjfSXV_.js';
import { A as o } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
function n() {
  const [n, r] = e.useState('details'),
    [s, d] = e.useState(!1),
    [l, a] = e.useState({
      title: 'Introduction to Web Development',
      subtitle: 'Learn HTML, CSS, and JavaScript from scratch',
      description:
        'This comprehensive course covers the fundamentals of web development...',
      category: 'Technology',
      level: 'Beginner',
      language: 'English',
      price: '49.99',
      thumbnail: '',
      videoIntro: '',
      published: !0,
    }),
    [c, p] = e.useState([
      {
        id: 1,
        title: 'Getting Started',
        lessons: [
          {
            id: 1,
            title: 'Welcome to the Course',
            type: 'video',
            duration: '5:30',
          },
          {
            id: 2,
            title: 'Setting Up Your Environment',
            type: 'video',
            duration: '12:45',
          },
        ],
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        lessons: [
          { id: 3, title: 'HTML Basics', type: 'video', duration: '15:20' },
          { id: 4, title: 'HTML Quiz', type: 'quiz', duration: '10 questions' },
        ],
      },
    ]),
    u = (e) => {
      a({ ...l, [e.target.name]: e.target.value });
    };
  return i.jsx(o, {
    children: i.jsxs('div', {
      style: { maxWidth: 1200, margin: '0 auto', padding: 32 },
      children: [
        i.jsxs('div', {
          style: { marginBottom: 32 },
          children: [
            i.jsx(t, {
              to: '/instructor/courses',
              style: {
                fontSize: 14,
                color: '#00a544',
                textDecoration: 'none',
                marginBottom: 12,
                display: 'block',
              },
              children: '← Back to My Courses',
            }),
            i.jsxs('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                i.jsxs('div', {
                  children: [
                    i.jsx('h1', {
                      style: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
                      children: 'Edit Course',
                    }),
                    i.jsx('p', {
                      style: { color: '#6b5d52', fontSize: 16 },
                      children: 'Update your course content and settings',
                    }),
                  ],
                }),
                i.jsxs('div', {
                  style: { display: 'flex', gap: 12 },
                  children: [
                    i.jsx('button', {
                      style: {
                        padding: '10px 20px',
                        backgroundColor: '#fff',
                        color: '#6b5d52',
                        border: '1px solid #d4c9b8',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                      },
                      children: 'Preview',
                    }),
                    i.jsx('button', {
                      onClick: () => {
                        (d(!0), setTimeout(() => d(!1), 3e3));
                      },
                      style: {
                        padding: '10px 20px',
                        backgroundColor: '#00a544',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                      },
                      children: 'Save Changes',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        s &&
          i.jsx('div', {
            style: {
              padding: 16,
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: 8,
              marginBottom: 24,
              border: '1px solid #c3e6cb',
            },
            children: '✅ Course saved successfully',
          }),
        i.jsx('div', {
          style: {
            display: 'flex',
            gap: 24,
            borderBottom: '2px solid #d4c9b8',
            marginBottom: 32,
          },
          children: ['details', 'curriculum', 'pricing', 'settings'].map((e) =>
            i.jsx(
              'button',
              {
                onClick: () => r(e),
                style: {
                  padding: '12px 0',
                  backgroundColor: 'transparent',
                  color: n === e ? '#00a544' : '#6b5d52',
                  border: 'none',
                  borderBottom:
                    n === e ? '2px solid #00a544' : '2px solid transparent',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: -2,
                  textTransform: 'capitalize',
                },
                children: e,
              },
              e
            )
          ),
        }),
        'details' === n &&
          i.jsx('div', {
            children: i.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                marginBottom: 24,
              },
              children: [
                i.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Course Details',
                }),
                i.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 20 },
                  children: [
                    i.jsxs('div', {
                      children: [
                        i.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Course Title *',
                        }),
                        i.jsx('input', {
                          type: 'text',
                          'aria-label': 'text input',
                          name: 'title',
                          value: l.title,
                          onChange: u,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      children: [
                        i.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Subtitle',
                        }),
                        i.jsx('input', {
                          type: 'text',
                          'aria-label': 'text input',
                          name: 'subtitle',
                          value: l.subtitle,
                          onChange: u,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      children: [
                        i.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Description *',
                        }),
                        i.jsx('textarea', {
                          name: 'description',
                          value: l.description,
                          onChange: u,
                          rows: 6,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                            fontFamily: 'inherit',
                            resize: 'vertical',
                          },
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 16,
                      },
                      children: [
                        i.jsxs('div', {
                          children: [
                            i.jsx('label', {
                              style: {
                                display: 'block',
                                marginBottom: 8,
                                fontWeight: 500,
                                fontSize: 14,
                              },
                              children: 'Category *',
                            }),
                            i.jsxs('select', {
                              name: 'category',
                              value: l.category,
                              onChange: u,
                              style: {
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d4c9b8',
                                borderRadius: 6,
                                fontSize: 14,
                              },
                              children: [
                                i.jsx('option', {
                                  value: 'Technology',
                                  children: 'Technology',
                                }),
                                i.jsx('option', {
                                  value: 'Business',
                                  children: 'Business',
                                }),
                                i.jsx('option', {
                                  value: 'Design',
                                  children: 'Design',
                                }),
                                i.jsx('option', {
                                  value: 'Marketing',
                                  children: 'Marketing',
                                }),
                                i.jsx('option', {
                                  value: 'Personal Development',
                                  children: 'Personal Development',
                                }),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs('div', {
                          children: [
                            i.jsx('label', {
                              style: {
                                display: 'block',
                                marginBottom: 8,
                                fontWeight: 500,
                                fontSize: 14,
                              },
                              children: 'Level *',
                            }),
                            i.jsxs('select', {
                              name: 'level',
                              value: l.level,
                              onChange: u,
                              style: {
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d4c9b8',
                                borderRadius: 6,
                                fontSize: 14,
                              },
                              children: [
                                i.jsx('option', {
                                  value: 'Beginner',
                                  children: 'Beginner',
                                }),
                                i.jsx('option', {
                                  value: 'Intermediate',
                                  children: 'Intermediate',
                                }),
                                i.jsx('option', {
                                  value: 'Advanced',
                                  children: 'Advanced',
                                }),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs('div', {
                          children: [
                            i.jsx('label', {
                              style: {
                                display: 'block',
                                marginBottom: 8,
                                fontWeight: 500,
                                fontSize: 14,
                              },
                              children: 'Language *',
                            }),
                            i.jsxs('select', {
                              name: 'language',
                              value: l.language,
                              onChange: u,
                              style: {
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d4c9b8',
                                borderRadius: 6,
                                fontSize: 14,
                              },
                              children: [
                                i.jsx('option', {
                                  value: 'English',
                                  children: 'English',
                                }),
                                i.jsx('option', {
                                  value: 'Spanish',
                                  children: 'Spanish',
                                }),
                                i.jsx('option', {
                                  value: 'French',
                                  children: 'French',
                                }),
                                i.jsx('option', {
                                  value: 'German',
                                  children: 'German',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      children: [
                        i.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Course Thumbnail',
                        }),
                        i.jsxs('div', {
                          style: {
                            border: '2px dashed #d4c9b8',
                            borderRadius: 6,
                            padding: 40,
                            textAlign: 'center',
                            cursor: 'pointer',
                          },
                          children: [
                            i.jsx('div', {
                              style: { fontSize: 48, marginBottom: 12 },
                              children: '📷',
                            }),
                            i.jsx('div', {
                              style: {
                                fontSize: 14,
                                color: '#6b5d52',
                                marginBottom: 8,
                              },
                              children: 'Click to upload or drag and drop',
                            }),
                            i.jsx('div', {
                              style: { fontSize: 12, color: '#999' },
                              children:
                                'PNG, JPG up to 5MB (1280x720 recommended)',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        'curriculum' === n &&
          i.jsx('div', {
            children: i.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
                marginBottom: 24,
              },
              children: [
                i.jsxs('div', {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  },
                  children: [
                    i.jsx('h2', {
                      style: { fontSize: 20, fontWeight: 600 },
                      children: 'Course Curriculum',
                    }),
                    i.jsx('button', {
                      onClick: () => {
                        const e = {
                          id: c.length + 1,
                          title: 'New Module',
                          lessons: [],
                        };
                        p([...c, e]);
                      },
                      style: {
                        padding: '8px 16px',
                        backgroundColor: '#00a544',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: 'pointer',
                      },
                      children: '+ Add Module',
                    }),
                  ],
                }),
                i.jsx('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 16 },
                  children: c.map((e, t) =>
                    i.jsxs(
                      'div',
                      {
                        style: {
                          border: '1px solid #d4c9b8',
                          borderRadius: 6,
                          padding: 16,
                        },
                        children: [
                          i.jsxs('div', {
                            style: {
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 12,
                            },
                            children: [
                              i.jsx('input', {
                                type: 'text',
                                'aria-label': 'text input',
                                value: e.title,
                                onChange: (e) => {
                                  const i = [...c];
                                  ((i[t].title = e.target.value), p(i));
                                },
                                style: {
                                  flex: 1,
                                  padding: '8px 12px',
                                  border: '1px solid #d4c9b8',
                                  borderRadius: 6,
                                  fontSize: 16,
                                  fontWeight: 600,
                                },
                              }),
                              i.jsxs('div', {
                                style: {
                                  display: 'flex',
                                  gap: 8,
                                  marginLeft: 12,
                                },
                                children: [
                                  i.jsx('button', {
                                    onClick: () => {
                                      return (
                                        (i = e.id),
                                        void p(
                                          c.map((e) =>
                                            e.id === i
                                              ? {
                                                  ...e,
                                                  lessons: [
                                                    ...e.lessons,
                                                    {
                                                      id: Date.now(),
                                                      title: 'New Lesson',
                                                      type: 'video',
                                                      duration: '0:00',
                                                    },
                                                  ],
                                                }
                                              : e
                                          )
                                        )
                                      );
                                      var i;
                                    },
                                    style: {
                                      padding: '6px 12px',
                                      backgroundColor: '#00a544',
                                      color: '#fff',
                                      border: 'none',
                                      borderRadius: 4,
                                      fontSize: 12,
                                      cursor: 'pointer',
                                    },
                                    children: '+ Lesson',
                                  }),
                                  i.jsx('button', {
                                    onClick: () => {
                                      return (
                                        (i = e.id),
                                        void p(c.filter((e) => e.id !== i))
                                      );
                                      var i;
                                    },
                                    style: {
                                      padding: '6px 12px',
                                      backgroundColor: '#dc2626',
                                      color: '#fff',
                                      border: 'none',
                                      borderRadius: 4,
                                      fontSize: 12,
                                      cursor: 'pointer',
                                    },
                                    children: 'Delete',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          i.jsx('div', {
                            style: {
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                              marginLeft: 20,
                            },
                            children: e.lessons.map((o, n) =>
                              i.jsxs(
                                'div',
                                {
                                  style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: 12,
                                    backgroundColor: '#f8f8f8',
                                    borderRadius: 4,
                                  },
                                  children: [
                                    i.jsx('span', {
                                      style: { fontSize: 16 },
                                      children:
                                        'video' === o.type
                                          ? '▶️'
                                          : 'quiz' === o.type
                                            ? '✍️'
                                            : '📄',
                                    }),
                                    i.jsx('input', {
                                      type: 'text',
                                      'aria-label': 'text input',
                                      value: o.title,
                                      onChange: (e) => {
                                        const i = [...c];
                                        ((i[t].lessons[n].title =
                                          e.target.value),
                                          p(i));
                                      },
                                      style: {
                                        flex: 1,
                                        padding: '6px 10px',
                                        border: '1px solid #d4c9b8',
                                        borderRadius: 4,
                                        fontSize: 14,
                                      },
                                    }),
                                    i.jsxs('select', {
                                      value: o.type,
                                      onChange: (e) => {
                                        const i = [...c];
                                        ((i[t].lessons[n].type =
                                          e.target.value),
                                          p(i));
                                      },
                                      style: {
                                        padding: '6px 10px',
                                        border: '1px solid #d4c9b8',
                                        borderRadius: 4,
                                        fontSize: 12,
                                      },
                                      children: [
                                        i.jsx('option', {
                                          value: 'video',
                                          children: 'Video',
                                        }),
                                        i.jsx('option', {
                                          value: 'quiz',
                                          children: 'Quiz',
                                        }),
                                        i.jsx('option', {
                                          value: 'reading',
                                          children: 'Reading',
                                        }),
                                        i.jsx('option', {
                                          value: 'assignment',
                                          children: 'Assignment',
                                        }),
                                      ],
                                    }),
                                    i.jsx('button', {
                                      onClick: () => {
                                        return (
                                          (i = e.id),
                                          (t = o.id),
                                          void p(
                                            c.map((e) =>
                                              e.id === i
                                                ? {
                                                    ...e,
                                                    lessons: e.lessons.filter(
                                                      (e) => e.id !== t
                                                    ),
                                                  }
                                                : e
                                            )
                                          )
                                        );
                                        var i, t;
                                      },
                                      style: {
                                        padding: '6px 12px',
                                        backgroundColor: '#dc2626',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 4,
                                        fontSize: 12,
                                        cursor: 'pointer',
                                      },
                                      children: '×',
                                    }),
                                  ],
                                },
                                o.id
                              )
                            ),
                          }),
                        ],
                      },
                      e.id
                    )
                  ),
                }),
              ],
            }),
          }),
        'pricing' === n &&
          i.jsx('div', {
            children: i.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
              },
              children: [
                i.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Pricing',
                }),
                i.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 20 },
                  children: [
                    i.jsxs('div', {
                      children: [
                        i.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Course Price (USD)',
                        }),
                        i.jsx('input', {
                          type: 'number',
                          'aria-label': 'number input',
                          name: 'price',
                          value: l.price,
                          onChange: u,
                          step: '0.01',
                          style: {
                            width: '100%',
                            maxWidth: 200,
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                        }),
                        i.jsx('p', {
                          style: {
                            fontSize: 12,
                            color: '#6b5d52',
                            marginTop: 8,
                          },
                          children: 'Set to 0 for a free course',
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      style: {
                        padding: 16,
                        backgroundColor: '#f8f8f8',
                        borderRadius: 6,
                      },
                      children: [
                        i.jsx('h3', {
                          style: {
                            fontSize: 16,
                            fontWeight: 600,
                            marginBottom: 8,
                          },
                          children: 'Revenue Share',
                        }),
                        i.jsx('p', {
                          style: {
                            fontSize: 14,
                            color: '#6b5d52',
                            marginBottom: 12,
                          },
                          children:
                            'Instructors receive 70% of course revenue after platform fees.',
                        }),
                        i.jsxs('div', {
                          style: { fontSize: 14 },
                          children: [
                            i.jsxs('div', {
                              style: { marginBottom: 4 },
                              children: [
                                'Course Price: ',
                                i.jsxs('strong', { children: ['$', l.price] }),
                              ],
                            }),
                            i.jsxs('div', {
                              style: { marginBottom: 4 },
                              children: [
                                'Your Earnings:',
                                ' ',
                                i.jsxs('strong', {
                                  children: ['$', (0.7 * l.price).toFixed(2)],
                                }),
                              ],
                            }),
                            i.jsxs('div', {
                              children: [
                                'Platform Fee:',
                                ' ',
                                i.jsxs('strong', {
                                  children: ['$', (0.3 * l.price).toFixed(2)],
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
          }),
        'settings' === n &&
          i.jsx('div', {
            children: i.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
              },
              children: [
                i.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Course Settings',
                }),
                i.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 20 },
                  children: [
                    i.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        i.jsxs('div', {
                          children: [
                            i.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Published',
                            }),
                            i.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children: 'Make this course visible to students',
                            }),
                          ],
                        }),
                        i.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            i.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: l.published,
                              onChange: () =>
                                a({ ...l, published: !l.published }),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            i.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: l.published
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: i.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: l.published ? 28 : 3,
                                  bottom: 3,
                                  backgroundColor: 'white',
                                  borderRadius: '50%',
                                  transition: '0.3s',
                                },
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    i.jsxs('div', {
                      style: {
                        padding: 16,
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ca8a04',
                        borderRadius: 6,
                      },
                      children: [
                        i.jsx('h3', {
                          style: {
                            fontSize: 16,
                            fontWeight: 600,
                            marginBottom: 8,
                            color: '#856404',
                          },
                          children: '⚠️ Delete Course',
                        }),
                        i.jsx('p', {
                          style: {
                            fontSize: 14,
                            color: '#856404',
                            marginBottom: 12,
                          },
                          children:
                            'Permanently delete this course and all its content. This action cannot be undone.',
                        }),
                        i.jsx('button', {
                          style: {
                            padding: '8px 16px',
                            backgroundColor: '#dc2626',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer',
                          },
                          children: 'Delete Course',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    }),
  });
}
export { n as default };

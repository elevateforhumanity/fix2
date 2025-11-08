import { r as e, j as o } from './vendor-react-C-ZQNdj3.js';
import { L as t } from './vendor-router-CQjfSXV_.js';
import { A as i } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
function r() {
  const [r, s] = e.useState('all'),
    n = [
      {
        id: 1,
        courseName: 'Introduction to Web Development',
        instructor: 'Dr. Sarah Johnson',
        completionDate: '2024-12-15',
        issueDate: '2024-12-16',
        certificateId: 'CERT-2024-001234',
        grade: '95%',
        status: 'issued',
        skills: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        id: 2,
        courseName: 'Data Science Fundamentals',
        instructor: 'Prof. Michael Chen',
        completionDate: '2024-11-28',
        issueDate: '2024-11-29',
        certificateId: 'CERT-2024-001189',
        grade: '88%',
        status: 'issued',
        skills: ['Python', 'Data Analysis', 'Statistics'],
      },
      {
        id: 3,
        courseName: 'Digital Marketing Essentials',
        instructor: 'Emily Rodriguez',
        completionDate: '2024-10-10',
        issueDate: '2024-10-11',
        certificateId: 'CERT-2024-000987',
        grade: '92%',
        status: 'issued',
        skills: ['SEO', 'Social Media', 'Content Marketing'],
      },
      {
        id: 4,
        courseName: 'Project Management Professional',
        instructor: 'James Wilson',
        completionDate: null,
        issueDate: null,
        certificateId: null,
        grade: 'In Progress',
        status: 'in-progress',
        progress: 65,
        skills: ['Agile', 'Scrum', 'Leadership'],
      },
    ],
    d = n.filter((e) => 'all' === r || e.status === r),
    l = n.filter((e) => 'issued' === e.status).length,
    a = n.filter((e) => 'in-progress' === e.status).length;
  return o.jsx(i, {
    children: o.jsxs('div', {
      style: { maxWidth: 1200, margin: '0 auto', padding: 32 },
      children: [
        o.jsxs('div', {
          style: { marginBottom: 32 },
          children: [
            o.jsx('h1', {
              style: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
              children: 'My Certificates',
            }),
            o.jsx('p', {
              style: { color: '#6b5d52', fontSize: 16 },
              children: 'View, download, and share your earned certificates',
            }),
          ],
        }),
        o.jsxs('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 32,
          },
          children: [
            o.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
              },
              children: [
                o.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#00a544',
                    marginBottom: 8,
                  },
                  children: l,
                }),
                o.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Certificates Earned',
                }),
              ],
            }),
            o.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
              },
              children: [
                o.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#00a544',
                    marginBottom: 8,
                  },
                  children: a,
                }),
                o.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'In Progress',
                }),
              ],
            }),
            o.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                border: '1px solid #d4c9b8',
              },
              children: [
                o.jsx('div', {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#ca8a04',
                    marginBottom: 8,
                  },
                  children: n.reduce((e, o) => {
                    var t;
                    return (
                      e + ((null == (t = o.skills) ? void 0 : t.length) || 0)
                    );
                  }, 0),
                }),
                o.jsx('div', {
                  style: { fontSize: 14, color: '#6b5d52' },
                  children: 'Skills Acquired',
                }),
              ],
            }),
          ],
        }),
        o.jsxs('div', {
          style: {
            display: 'flex',
            gap: 12,
            marginBottom: 24,
            borderBottom: '2px solid #d4c9b8',
          },
          children: [
            o.jsxs('button', {
              onClick: () => s('all'),
              style: {
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'all' === r ? '#00a544' : '#6b5d52',
                border: 'none',
                borderBottom:
                  'all' === r ? '2px solid #00a544' : '2px solid transparent',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: -2,
              },
              children: ['All (', n.length, ')'],
            }),
            o.jsxs('button', {
              onClick: () => s('issued'),
              style: {
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'issued' === r ? '#00a544' : '#6b5d52',
                border: 'none',
                borderBottom:
                  'issued' === r
                    ? '2px solid #00a544'
                    : '2px solid transparent',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: -2,
              },
              children: ['Issued (', l, ')'],
            }),
            o.jsxs('button', {
              onClick: () => s('in-progress'),
              style: {
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'in-progress' === r ? '#00a544' : '#6b5d52',
                border: 'none',
                borderBottom:
                  'in-progress' === r
                    ? '2px solid #00a544'
                    : '2px solid transparent',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: -2,
              },
              children: ['In Progress (', a, ')'],
            }),
          ],
        }),
        o.jsx('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 20 },
          children: d.map((e) =>
            o.jsxs(
              'div',
              {
                style: {
                  backgroundColor: '#fff',
                  border: '1px solid #d4c9b8',
                  borderRadius: 8,
                  padding: 24,
                  transition: 'box-shadow 0.2s',
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(0, 0, 0, 0.1)';
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.boxShadow = 'none';
                },
                children: [
                  o.jsxs('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    },
                    children: [
                      o.jsxs('div', {
                        style: { flex: 1 },
                        children: [
                          o.jsxs('div', {
                            style: {
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              marginBottom: 8,
                            },
                            children: [
                              o.jsx('h3', {
                                style: {
                                  fontSize: 20,
                                  fontWeight: 600,
                                  margin: 0,
                                },
                                children: e.courseName,
                              }),
                              o.jsx('span', {
                                style: {
                                  padding: '4px 12px',
                                  backgroundColor:
                                    'issued' === e.status
                                      ? '#d4edda'
                                      : '#fff3cd',
                                  color:
                                    'issued' === e.status
                                      ? '#155724'
                                      : '#856404',
                                  borderRadius: 12,
                                  fontSize: 12,
                                  fontWeight: 500,
                                },
                                children:
                                  'issued' === e.status
                                    ? 'Issued'
                                    : 'In Progress',
                              }),
                            ],
                          }),
                          o.jsxs('p', {
                            style: {
                              fontSize: 14,
                              color: '#6b5d52',
                              marginBottom: 12,
                            },
                            children: ['Instructor: ', e.instructor],
                          }),
                          o.jsxs('div', {
                            style: {
                              display: 'grid',
                              gridTemplateColumns:
                                'repeat(auto-fit, minmax(150px, 1fr))',
                              gap: 16,
                              marginBottom: 16,
                            },
                            children: [
                              e.completionDate &&
                                o.jsxs('div', {
                                  children: [
                                    o.jsx('div', {
                                      style: {
                                        fontSize: 12,
                                        color: '#999',
                                        marginBottom: 4,
                                      },
                                      children: 'Completion Date',
                                    }),
                                    o.jsx('div', {
                                      style: { fontSize: 14, fontWeight: 500 },
                                      children: new Date(
                                        e.completionDate
                                      ).toLocaleDateString(),
                                    }),
                                  ],
                                }),
                              e.certificateId &&
                                o.jsxs('div', {
                                  children: [
                                    o.jsx('div', {
                                      style: {
                                        fontSize: 12,
                                        color: '#999',
                                        marginBottom: 4,
                                      },
                                      children: 'Certificate ID',
                                    }),
                                    o.jsx('div', {
                                      style: {
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: 'monospace',
                                      },
                                      children: e.certificateId,
                                    }),
                                  ],
                                }),
                              o.jsxs('div', {
                                children: [
                                  o.jsx('div', {
                                    style: {
                                      fontSize: 12,
                                      color: '#999',
                                      marginBottom: 4,
                                    },
                                    children: 'Grade',
                                  }),
                                  o.jsx('div', {
                                    style: { fontSize: 14, fontWeight: 500 },
                                    children: e.grade,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          'in-progress' === e.status &&
                            void 0 !== e.progress &&
                            o.jsxs('div', {
                              style: { marginBottom: 16 },
                              children: [
                                o.jsxs('div', {
                                  style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 8,
                                  },
                                  children: [
                                    o.jsx('span', {
                                      style: { fontSize: 12, color: '#6b5d52' },
                                      children: 'Progress',
                                    }),
                                    o.jsxs('span', {
                                      style: { fontSize: 12, fontWeight: 600 },
                                      children: [e.progress, '%'],
                                    }),
                                  ],
                                }),
                                o.jsx('div', {
                                  style: {
                                    width: '100%',
                                    height: 8,
                                    backgroundColor: '#d4c9b8',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                  },
                                  children: o.jsx('div', {
                                    style: {
                                      width: `${e.progress}%`,
                                      height: '100%',
                                      backgroundColor: '#00a544',
                                      transition: 'width 0.3s',
                                    },
                                  }),
                                }),
                              ],
                            }),
                          e.skills &&
                            e.skills.length > 0 &&
                            o.jsxs('div', {
                              children: [
                                o.jsx('div', {
                                  style: {
                                    fontSize: 12,
                                    color: '#999',
                                    marginBottom: 8,
                                  },
                                  children: 'Skills Covered',
                                }),
                                o.jsx('div', {
                                  style: {
                                    display: 'flex',
                                    gap: 8,
                                    flexWrap: 'wrap',
                                  },
                                  children: e.skills.map((e, t) =>
                                    o.jsx(
                                      'span',
                                      {
                                        style: {
                                          padding: '4px 12px',
                                          backgroundColor: '#f0f0f0',
                                          borderRadius: 12,
                                          fontSize: 12,
                                          color: '#333',
                                        },
                                        children: e,
                                      },
                                      t
                                    )
                                  ),
                                }),
                              ],
                            }),
                        ],
                      }),
                      o.jsx('div', {
                        style: {
                          width: 120,
                          height: 90,
                          backgroundColor:
                            'issued' === e.status ? '#f8f8f8' : '#d4c9b8',
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 24,
                          border: '1px solid #d4c9b8',
                        },
                        children: o.jsx('span', {
                          style: { fontSize: 32 },
                          children: 'issued' === e.status ? '🏆' : '⏳',
                        }),
                      }),
                    ],
                  }),
                  'issued' === e.status &&
                    o.jsxs('div', {
                      style: {
                        display: 'flex',
                        gap: 12,
                        marginTop: 20,
                        paddingTop: 20,
                        borderTop: '1px solid #f0f0f0',
                      },
                      children: [
                        o.jsx('button', {
                          style: {
                            padding: '8px 20px',
                            backgroundColor: '#00a544',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer',
                          },
                          children: 'Download PDF',
                        }),
                        o.jsx('button', {
                          style: {
                            padding: '8px 20px',
                            backgroundColor: '#fff',
                            color: '#00a544',
                            border: '1px solid #00a544',
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer',
                          },
                          children: 'Share on LinkedIn',
                        }),
                        o.jsx('button', {
                          style: {
                            padding: '8px 20px',
                            backgroundColor: '#fff',
                            color: '#6b5d52',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer',
                          },
                          children: 'Verify Certificate',
                        }),
                      ],
                    }),
                  'in-progress' === e.status &&
                    o.jsx('div', {
                      style: {
                        marginTop: 20,
                        paddingTop: 20,
                        borderTop: '1px solid #f0f0f0',
                      },
                      children: o.jsx(t, {
                        to: `/course/${e.id}`,
                        style: {
                          display: 'inline-block',
                          padding: '8px 20px',
                          backgroundColor: '#00a544',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: 'none',
                        },
                        children: 'Continue Course',
                      }),
                    }),
                ],
              },
              e.id
            )
          ),
        }),
        0 === d.length &&
          o.jsxs('div', {
            style: {
              textAlign: 'center',
              padding: 48,
              backgroundColor: '#f8f8f8',
              borderRadius: 8,
            },
            children: [
              o.jsx('div', {
                style: { fontSize: 48, marginBottom: 16 },
                children: '📜',
              }),
              o.jsx('h3', {
                style: { fontSize: 20, fontWeight: 600, marginBottom: 8 },
                children: 'No certificates yet',
              }),
              o.jsx('p', {
                style: { fontSize: 14, color: '#6b5d52', marginBottom: 24 },
                children:
                  'Complete courses to earn certificates and showcase your skills',
              }),
              o.jsx(t, {
                to: '/courses',
                style: {
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#00a544',
                  color: '#fff',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                },
                children: 'Browse Courses',
              }),
            ],
          }),
        o.jsxs('div', {
          style: {
            marginTop: 48,
            padding: 24,
            backgroundColor: '#f8f8f8',
            borderRadius: 8,
          },
          children: [
            o.jsx('h3', {
              style: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
              children: 'Certificate Verification',
            }),
            o.jsx('p', {
              style: {
                fontSize: 14,
                color: '#6b5d52',
                marginBottom: 16,
                lineHeight: 1.6,
              },
              children:
                'All certificates include a unique verification code. Employers or institutions can verify the authenticity of your certificate by entering the certificate ID on our verification page.',
            }),
            o.jsx(t, {
              to: '/verify-certificate',
              style: {
                color: '#00a544',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              },
              children: 'Verify a Certificate →',
            }),
          ],
        }),
      ],
    }),
  });
}
export { r as default };

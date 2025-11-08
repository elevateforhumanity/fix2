import { r as e, j as t } from './vendor-react-C-ZQNdj3.js';
import { L as i } from './vendor-router-CQjfSXV_.js';
import { A as o } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
function s() {
  const [s, n] = e.useState({
      emailNotifications: !0,
      courseUpdates: !0,
      weeklyDigest: !1,
      marketingEmails: !1,
      language: 'en',
      timezone: 'America/New_York',
      theme: 'light',
      autoplay: !0,
      subtitles: !1,
      playbackSpeed: '1.0',
      twoFactorAuth: !1,
      sessionTimeout: '30',
      publicProfile: !0,
      showProgress: !0,
    }),
    [l, r] = e.useState(!1),
    a = (e) => {
      n({ ...s, [e]: !s[e] });
    },
    d = (e) => {
      n({ ...s, [e.target.name]: e.target.value });
    };
  return t.jsx(o, {
    children: t.jsxs('div', {
      style: { maxWidth: 900, margin: '0 auto', padding: 32 },
      children: [
        t.jsxs('div', {
          style: { marginBottom: 32 },
          children: [
            t.jsx('h1', {
              style: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
              children: 'Settings',
            }),
            t.jsx('p', {
              style: { color: '#6b5d52', fontSize: 16 },
              children:
                'Manage your account preferences and application settings',
            }),
          ],
        }),
        l &&
          t.jsx('div', {
            style: {
              padding: 16,
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: 8,
              marginBottom: 24,
              border: '1px solid #c3e6cb',
            },
            children: '✅ Settings saved successfully',
          }),
        t.jsxs('form', {
          onSubmit: (e) => {
            (e.preventDefault(), r(!0), setTimeout(() => r(!1), 3e3));
          },
          children: [
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                marginBottom: 24,
                border: '1px solid #d4c9b8',
              },
              children: [
                t.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Notifications',
                }),
                t.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 16 },
                  children: [
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Email Notifications',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Receive email notifications for important updates',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.emailNotifications,
                              onChange: () => a('emailNotifications'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.emailNotifications
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.emailNotifications ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Course Updates',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                "Get notified when courses you're enrolled in are updated",
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.courseUpdates,
                              onChange: () => a('courseUpdates'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.courseUpdates
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.courseUpdates ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Weekly Digest',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Receive a weekly summary of your learning progress',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.weeklyDigest,
                              onChange: () => a('weeklyDigest'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.weeklyDigest
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.weeklyDigest ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Marketing Emails',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Receive promotional content and special offers',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.marketingEmails,
                              onChange: () => a('marketingEmails'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.marketingEmails
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.marketingEmails ? 28 : 3,
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
                  ],
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                marginBottom: 24,
                border: '1px solid #d4c9b8',
              },
              children: [
                t.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Preferences',
                }),
                t.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 20 },
                  children: [
                    t.jsxs('div', {
                      children: [
                        t.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Language',
                        }),
                        t.jsxs('select', {
                          name: 'language',
                          value: s.language,
                          onChange: d,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                          children: [
                            t.jsx('option', {
                              value: 'en',
                              children: 'English',
                            }),
                            t.jsx('option', {
                              value: 'es',
                              children: 'Español',
                            }),
                            t.jsx('option', {
                              value: 'fr',
                              children: 'Français',
                            }),
                            t.jsx('option', {
                              value: 'de',
                              children: 'Deutsch',
                            }),
                            t.jsx('option', {
                              value: 'pt',
                              children: 'Português',
                            }),
                          ],
                        }),
                      ],
                    }),
                    t.jsxs('div', {
                      children: [
                        t.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Timezone',
                        }),
                        t.jsxs('select', {
                          name: 'timezone',
                          value: s.timezone,
                          onChange: d,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                          children: [
                            t.jsx('option', {
                              value: 'America/New_York',
                              children: 'Eastern Time (ET)',
                            }),
                            t.jsx('option', {
                              value: 'America/Chicago',
                              children: 'Central Time (CT)',
                            }),
                            t.jsx('option', {
                              value: 'America/Denver',
                              children: 'Mountain Time (MT)',
                            }),
                            t.jsx('option', {
                              value: 'America/Los_Angeles',
                              children: 'Pacific Time (PT)',
                            }),
                            t.jsx('option', {
                              value: 'Europe/London',
                              children: 'London (GMT)',
                            }),
                            t.jsx('option', {
                              value: 'Europe/Paris',
                              children: 'Paris (CET)',
                            }),
                            t.jsx('option', {
                              value: 'Asia/Tokyo',
                              children: 'Tokyo (JST)',
                            }),
                          ],
                        }),
                      ],
                    }),
                    t.jsxs('div', {
                      children: [
                        t.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Theme',
                        }),
                        t.jsxs('select', {
                          name: 'theme',
                          value: s.theme,
                          onChange: d,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                          children: [
                            t.jsx('option', {
                              value: 'light',
                              children: 'Light',
                            }),
                            t.jsx('option', {
                              value: 'dark',
                              children: 'Dark',
                            }),
                            t.jsx('option', {
                              value: 'auto',
                              children: 'Auto (System)',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                marginBottom: 24,
                border: '1px solid #d4c9b8',
              },
              children: [
                t.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Video Playback',
                }),
                t.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 16 },
                  children: [
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Autoplay Next Video',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Automatically play the next video in a course',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.autoplay,
                              onChange: () => a('autoplay'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.autoplay
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.autoplay ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Subtitles',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Show subtitles by default when available',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.subtitles,
                              onChange: () => a('subtitles'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.subtitles
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.subtitles ? 28 : 3,
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
                    t.jsxs('div', {
                      children: [
                        t.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Default Playback Speed',
                        }),
                        t.jsxs('select', {
                          name: 'playbackSpeed',
                          value: s.playbackSpeed,
                          onChange: d,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                          children: [
                            t.jsx('option', { value: '0.5', children: '0.5x' }),
                            t.jsx('option', {
                              value: '0.75',
                              children: '0.75x',
                            }),
                            t.jsx('option', {
                              value: '1.0',
                              children: '1.0x (Normal)',
                            }),
                            t.jsx('option', {
                              value: '1.25',
                              children: '1.25x',
                            }),
                            t.jsx('option', { value: '1.5', children: '1.5x' }),
                            t.jsx('option', { value: '2.0', children: '2.0x' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                backgroundColor: '#fff',
                padding: 24,
                borderRadius: 8,
                marginBottom: 24,
                border: '1px solid #d4c9b8',
              },
              children: [
                t.jsx('h2', {
                  style: { fontSize: 20, fontWeight: 600, marginBottom: 20 },
                  children: 'Security & Privacy',
                }),
                t.jsxs('div', {
                  style: { display: 'flex', flexDirection: 'column', gap: 16 },
                  children: [
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Two-Factor Authentication',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Add an extra layer of security to your account',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.twoFactorAuth,
                              onChange: () => a('twoFactorAuth'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.twoFactorAuth
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.twoFactorAuth ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Public Profile',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Make your profile visible to other users',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.publicProfile,
                              onChange: () => a('publicProfile'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.publicProfile
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.publicProfile ? 28 : 3,
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
                    t.jsxs('div', {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 16,
                        borderBottom: '1px solid #f0f0f0',
                      },
                      children: [
                        t.jsxs('div', {
                          children: [
                            t.jsx('div', {
                              style: { fontWeight: 500, marginBottom: 4 },
                              children: 'Show Learning Progress',
                            }),
                            t.jsx('div', {
                              style: { fontSize: 14, color: '#6b5d52' },
                              children:
                                'Display your course progress on your profile',
                            }),
                          ],
                        }),
                        t.jsxs('label', {
                          style: {
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: 24,
                          },
                          children: [
                            t.jsx('input', {
                              type: 'checkbox',
                              'aria-label': 'checkbox input',
                              checked: s.showProgress,
                              onChange: () => a('showProgress'),
                              style: { opacity: 0, width: 0, height: 0 },
                            }),
                            t.jsx('span', {
                              style: {
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: s.showProgress
                                  ? '#00a544'
                                  : '#ccc',
                                borderRadius: 24,
                                transition: '0.3s',
                              },
                              children: t.jsx('span', {
                                style: {
                                  position: 'absolute',
                                  content: '',
                                  height: 18,
                                  width: 18,
                                  left: s.showProgress ? 28 : 3,
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
                    t.jsxs('div', {
                      children: [
                        t.jsx('label', {
                          style: {
                            display: 'block',
                            marginBottom: 8,
                            fontWeight: 500,
                            fontSize: 14,
                          },
                          children: 'Session Timeout (minutes)',
                        }),
                        t.jsxs('select', {
                          name: 'sessionTimeout',
                          value: s.sessionTimeout,
                          onChange: d,
                          style: {
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d4c9b8',
                            borderRadius: 6,
                            fontSize: 14,
                          },
                          children: [
                            t.jsx('option', {
                              value: '15',
                              children: '15 minutes',
                            }),
                            t.jsx('option', {
                              value: '30',
                              children: '30 minutes',
                            }),
                            t.jsx('option', {
                              value: '60',
                              children: '1 hour',
                            }),
                            t.jsx('option', {
                              value: '120',
                              children: '2 hours',
                            }),
                            t.jsx('option', {
                              value: 'never',
                              children: 'Never',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            t.jsxs('div', {
              style: {
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
                paddingTop: 8,
              },
              children: [
                t.jsx(i, {
                  to: '/account',
                  style: {
                    padding: '12px 24px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                  },
                  children: 'Cancel',
                }),
                t.jsx('button', {
                  type: 'submit',
                  style: {
                    padding: '12px 24px',
                    backgroundColor: '#00a544',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  },
                  children: 'Save Settings',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { s as default };

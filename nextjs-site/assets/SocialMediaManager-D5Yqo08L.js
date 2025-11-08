var e = Object.defineProperty,
  t = (t, s, n) =>
    ((t, s, n) =>
      s in t
        ? e(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[s] = n))(t, 'symbol' != typeof s ? s + '' : s, n);
import { r as s, j as n } from './vendor-react-C-ZQNdj3.js';
import { A as o } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
import './vendor-router-CQjfSXV_.js';
const r = new (class {
  constructor() {
    (t(this, 'webhookUrls'),
      t(this, 'apiKey'),
      (this.webhookUrls = new Map([
        ['facebook', ''],
        ['linkedin', ''],
        ['youtube', ''],
        ['all', ''],
      ])),
      (this.apiKey = ''));
  }
  async postToPlatform(e, t, s) {
    const n = this.webhookUrls.get(e);
    if (!n)
      return (
        console.error(`[Zapier] No webhook URL configured for ${e}`),
        { success: !1, error: `No webhook URL configured for ${e}` }
      );
    const o = {
      platform: e,
      content: t,
      mediaUrl: null == s ? void 0 : s.mediaUrl,
      scheduledTime: null == s ? void 0 : s.scheduledTime,
      metadata: null == s ? void 0 : s.metadata,
    };
    try {
      console.log(`[Zapier] Posting to ${e}...`);
      const t = await fetch(n, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
        },
        body: JSON.stringify(o),
      });
      if (!t.ok) throw new Error(`HTTP ${t.status}: ${t.statusText}`);
      const s = await t.json();
      return (
        console.log(`[Zapier] Successfully posted to ${e}`),
        {
          success: !0,
          zapId: s.id || s.zapId,
          message: `Posted to ${e} successfully`,
        }
      );
    } catch (r) {
      return (
        console.error(`[Zapier] Failed to post to ${e}:`, r),
        { success: !1, error: r instanceof Error ? r.message : 'Unknown error' }
      );
    }
  }
  async postToAllPlatforms(e, t) {
    const s = ['facebook', 'linkedin', 'youtube'],
      n = this.webhookUrls.get('all');
    if (n) {
      console.log('[Zapier] Using single webhook for all platforms');
      const o = {
        platforms: s,
        content: e,
        mediaUrl: null == t ? void 0 : t.mediaUrl,
        scheduledTime: null == t ? void 0 : t.scheduledTime,
        metadata: null == t ? void 0 : t.metadata,
      };
      try {
        const e = await fetch(n, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
          },
          body: JSON.stringify(o),
        });
        if (!e.ok) throw new Error(`HTTP ${e.status}: ${e.statusText}`);
        const t = await e.json();
        return s.reduce(
          (e, s) => ({
            ...e,
            [s]: {
              success: !0,
              zapId: t.id || t.zapId,
              message: `Posted to ${s} successfully`,
            },
          }),
          {}
        );
      } catch (r) {
        return (
          console.error('[Zapier] Failed to post to all platforms:', r),
          s.reduce(
            (e, t) => ({
              ...e,
              [t]: {
                success: !1,
                error: r instanceof Error ? r.message : 'Unknown error',
              },
            }),
            {}
          )
        );
      }
    }
    console.log('[Zapier] Posting to each platform individually');
    const o = await Promise.all(s.map((s) => this.postToPlatform(s, e, t)));
    return s.reduce((e, t, s) => ({ ...e, [t]: o[s] }), {});
  }
  async announceNewProgram(e) {
    const t = `🎓 New Program Alert! 🎓\n\nWe're excited to announce: ${e.name}\n\n${e.description}\n\n${e.enrollmentUrl ? `Enroll now: ${e.enrollmentUrl}` : 'Contact us to learn more!'}\n\n#WorkforceDevelopment #Training #ElevateForHumanity`;
    return this.postToAllPlatforms(t, {
      mediaUrl: e.imageUrl,
      metadata: {
        programName: e.name,
        eventType: 'program_announcement',
        tags: ['program', 'announcement', 'enrollment'],
      },
    });
  }
  async postSuccessStory(e) {
    const t = `🌟 Success Story 🌟\n\nCongratulations to ${e.studentName} for completing ${e.programName}!\n\n${e.achievement}\n\nWe're proud of your accomplishment! 🎉\n\n#SuccessStory #WorkforceDevelopment #ElevateForHumanity`;
    return this.postToAllPlatforms(t, {
      mediaUrl: e.imageUrl,
      metadata: {
        programName: e.programName,
        eventType: 'success_story',
        tags: ['success', 'student', 'achievement'],
      },
    });
  }
  async announceEvent(e) {
    const t = `📅 Upcoming Event 📅\n\n${e.name}\nDate: ${e.date}\n\n${e.description}\n\n${e.registrationUrl ? `Register: ${e.registrationUrl}` : 'Stay tuned for registration details!'}\n\n#Event #Community #ElevateForHumanity`;
    return this.postToAllPlatforms(t, {
      mediaUrl: e.imageUrl,
      scheduledTime: e.date,
      metadata: {
        eventName: e.name,
        eventType: 'event_announcement',
        tags: ['event', 'announcement', 'community'],
      },
    });
  }
  async postDailyMotivation(e, t) {
    const s = `💪 Daily Motivation 💪\n\n"${e}"\n${t ? `- ${t}` : ''}\n\nKeep pushing forward! You've got this! 🚀\n\n#Motivation #Inspiration #ElevateForHumanity`;
    return this.postToAllPlatforms(s, {
      metadata: {
        eventType: 'daily_motivation',
        tags: ['motivation', 'inspiration', 'daily'],
      },
    });
  }
  async announcePartnership(e) {
    const t = `🤝 Partnership Announcement 🤝\n\nWe're thrilled to partner with ${e.name}!\n\n${e.description}\n\n${e.websiteUrl ? `Learn more: ${e.websiteUrl}` : ''}\n\nTogether, we're making a difference! 💙\n\n#Partnership #Collaboration #ElevateForHumanity`;
    return this.postToAllPlatforms(t, {
      mediaUrl: e.logoUrl,
      metadata: {
        partnerName: e.name,
        eventType: 'partnership_announcement',
        tags: ['partnership', 'announcement', 'collaboration'],
      },
    });
  }
  async schedulePost(e, t, s, n) {
    return 'all' === e
      ? this.postToAllPlatforms(t, { ...n, scheduledTime: s })
      : this.postToPlatform(e, t, { ...n, scheduledTime: s });
  }
  async testConnection(e) {
    const t = this.webhookUrls.get(e);
    if (!t)
      return (console.error(`[Zapier] No webhook URL configured for ${e}`), !1);
    try {
      return (
        await fetch(t, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
          },
          body: JSON.stringify({
            platform: e,
            content: 'Test connection from Elevate for Humanity',
            metadata: { eventType: 'test', test: !0 },
          }),
        })
      ).ok;
    } catch (s) {
      return (
        console.error(`[Zapier] Connection test failed for ${e}:`, s),
        !1
      );
    }
  }
  getConfigurationStatus() {
    return {
      facebook: !!this.webhookUrls.get('facebook'),
      linkedin: !!this.webhookUrls.get('linkedin'),
      youtube: !!this.webhookUrls.get('youtube'),
      all: !!this.webhookUrls.get('all'),
      apiKey: !!this.apiKey,
    };
  }
})();
function a() {
  const [e, t] = s.useState('post'),
    [a, i] = s.useState(''),
    [l, c] = s.useState(''),
    [d, m] = s.useState(['facebook', 'linkedin', 'youtube']),
    [u, p] = s.useState(''),
    [b, h] = s.useState(!1),
    [x, g] = s.useState(null),
    [f, w] = s.useState({});
  async function y(e) {
    (h(!0), g(null));
    try {
      let t;
      switch (e) {
        case 'program':
          t = await (async function (e) {
            return r.announceNewProgram(e);
          })({
            name: 'Sample Program',
            description: 'This is a sample program announcement',
            enrollmentUrl: 'https://elevateforhumanity.org/programs',
          });
          break;
        case 'success':
          t = await (async function (e) {
            return r.postSuccessStory(e);
          })({
            studentName: 'John Doe',
            programName: 'IT Certification',
            achievement:
              'Successfully completed the program and secured a job!',
          });
          break;
        case 'event':
          t = await (async function (e) {
            return r.announceEvent(e);
          })({
            name: 'Open House',
            date: new Date(Date.now() + 6048e5).toLocaleDateString(),
            description:
              'Join us for an open house to learn about our programs!',
            registrationUrl: 'https://elevateforhumanity.org/events',
          });
          break;
        case 'motivation':
          t = await (async function (e, t) {
            return r.postDailyMotivation(e, t);
          })(
            'The only way to do great work is to love what you do.',
            'Steve Jobs'
          );
          break;
        case 'partnership':
          t = await (async function (e) {
            return r.announcePartnership(e);
          })({
            name: 'Sample Partner',
            description: 'We are excited to partner with this organization!',
            websiteUrl: 'https://example.com',
          });
          break;
        default:
          return;
      }
      g(t);
    } catch (t) {
      (console.error('Failed to post template:', t),
        alert('Failed to post template'));
    } finally {
      h(!1);
    }
  }
  return (
    s.useEffect(() => {
      !(function () {
        const e = r.getConfigurationStatus();
        w(e);
      })();
    }, []),
    n.jsx(o, {
      children: n.jsxs('div', {
        className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
        children: [
          n.jsxs('div', {
            className: 'mb-8',
            children: [
              n.jsx('h1', {
                className: 'text-3xl font-bold text-brown-900',
                children: 'Social Media Manager',
              }),
              n.jsx('p', {
                className: 'mt-2 text-brown-600',
                children: 'Automate social media posts via Zapier integration',
              }),
            ],
          }),
          n.jsx('div', {
            className: 'border-b border-brown-200 mb-6',
            children: n.jsxs('nav', {
              role: 'navigation',
              className: '-mb-px flex space-x-8',
              children: [
                n.jsx('button', {
                  onClick: () => t('post'),
                  className:
                    'py-4 px-1 border-b-2 font-medium text-sm ' +
                    ('post' === e
                      ? 'border-blue-500 text-green-600'
                      : 'border-transparent text-brown-500 hover:text-brown-900 hover:border-brown-300'),
                  children: 'Create Post',
                }),
                n.jsx('button', {
                  onClick: () => t('templates'),
                  className:
                    'py-4 px-1 border-b-2 font-medium text-sm ' +
                    ('templates' === e
                      ? 'border-blue-500 text-green-600'
                      : 'border-transparent text-brown-500 hover:text-brown-900 hover:border-brown-300'),
                  children: 'Templates',
                }),
                n.jsx('button', {
                  onClick: () => t('status'),
                  className:
                    'py-4 px-1 border-b-2 font-medium text-sm ' +
                    ('status' === e
                      ? 'border-blue-500 text-green-600'
                      : 'border-transparent text-brown-500 hover:text-brown-900 hover:border-brown-300'),
                  children: 'Configuration',
                }),
              ],
            }),
          }),
          'post' === e &&
            n.jsxs('div', {
              className: 'bg-white rounded-lg shadow p-6',
              children: [
                n.jsx('h2', {
                  className: 'text-xl font-semibold text-brown-900 mb-4',
                  children: 'Create New Post',
                }),
                n.jsxs('div', {
                  className: 'mb-6',
                  children: [
                    n.jsx('label', {
                      className:
                        'block text-sm font-medium text-brown-900 mb-2',
                      children: 'Select Platforms',
                    }),
                    n.jsx('div', {
                      className: 'flex space-x-4',
                      children: ['facebook', 'linkedin', 'youtube'].map((e) =>
                        n.jsxs(
                          'label',
                          {
                            className: 'flex items-center',
                            children: [
                              n.jsx('input', {
                                type: 'checkbox',
                                'aria-label': 'checkbox input',
                                checked: d.includes(e),
                                onChange: () =>
                                  (function (e) {
                                    d.includes(e)
                                      ? m(d.filter((t) => t !== e))
                                      : m([...d, e]);
                                  })(e),
                                className:
                                  'h-4 w-4 text-green-600 focus:ring-green-500 border-brown-300 rounded',
                              }),
                              n.jsx('span', {
                                className:
                                  'ml-2 text-sm text-brown-900 capitalize',
                                children: e,
                              }),
                            ],
                          },
                          e
                        )
                      ),
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'mb-6',
                  children: [
                    n.jsx('label', {
                      className:
                        'block text-sm font-medium text-brown-900 mb-2',
                      children: 'Post Content',
                    }),
                    n.jsx('textarea', {
                      value: a,
                      onChange: (e) => i(e.target.value),
                      rows: 6,
                      className:
                        'w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
                      placeholder: 'What would you like to share?',
                    }),
                    n.jsxs('p', {
                      className: 'mt-1 text-sm text-brown-500',
                      children: [a.length, ' characters'],
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'mb-6',
                  children: [
                    n.jsx('label', {
                      className:
                        'block text-sm font-medium text-brown-900 mb-2',
                      children: 'Media URL (Optional)',
                    }),
                    n.jsx('input', {
                      type: 'url',
                      'aria-label': 'url input',
                      value: l,
                      onChange: (e) => c(e.target.value),
                      className:
                        'w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
                      placeholder: 'https://example.com/image.jpg',
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'mb-6',
                  children: [
                    n.jsx('label', {
                      className:
                        'block text-sm font-medium text-brown-900 mb-2',
                      children: 'Schedule for Later (Optional)',
                    }),
                    n.jsx('input', {
                      type: 'datetime-local',
                      'aria-label': 'datetime-local input',
                      value: u,
                      onChange: (e) => p(e.target.value),
                      className:
                        'w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
                    }),
                  ],
                }),
                n.jsx('button', {
                  onClick: async function () {
                    if (a.trim()) {
                      (h(!0), g(null));
                      try {
                        const e = d,
                          t = await (async function (e, t) {
                            if (
                              (null == t ? void 0 : t.platforms) &&
                              1 === t.platforms.length
                            ) {
                              const s = await r.postToPlatform(
                                t.platforms[0],
                                e,
                                t
                              );
                              return { [t.platforms[0]]: s };
                            }
                            return r.postToAllPlatforms(e, t);
                          })(a, {
                            platforms: e,
                            mediaUrl: l || void 0,
                            scheduledTime: u || void 0,
                          });
                        (g(t),
                          Object.values(t).every((e) => e.success) &&
                            (i(''), c(''), p('')));
                      } catch (e) {
                        (console.error('Failed to post:', e),
                          alert('Failed to post to social media'));
                      } finally {
                        h(!1);
                      }
                    } else alert('Please enter content to post');
                  },
                  disabled: b || 0 === d.length,
                  className:
                    'w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium',
                  children: b ? 'Posting...' : u ? 'Schedule Post' : 'Post Now',
                }),
                x &&
                  n.jsxs('div', {
                    className: 'mt-6 p-4 bg-beige-50 rounded-md',
                    children: [
                      n.jsx('h3', {
                        className: 'font-semibold text-brown-900 mb-2',
                        children: 'Post Results:',
                      }),
                      Object.entries(x).map(([e, t]) =>
                        n.jsxs(
                          'div',
                          {
                            className: 'flex items-center justify-between py-2',
                            children: [
                              n.jsxs('span', {
                                className: 'capitalize text-brown-900',
                                children: [e, ':'],
                              }),
                              n.jsx('span', {
                                className:
                                  'font-medium ' +
                                  (t.success
                                    ? 'text-green-600'
                                    : 'text-red-600'),
                                children: t.success
                                  ? '✓ Success'
                                  : `✗ ${t.error}`,
                              }),
                            ],
                          },
                          e
                        )
                      ),
                    ],
                  }),
              ],
            }),
          'templates' === e &&
            n.jsxs('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
              children: [
                n.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    n.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-2',
                      children: 'Program Announcement',
                    }),
                    n.jsx('p', {
                      className: 'text-sm text-brown-600 mb-4',
                      children: 'Announce a new training program or course',
                    }),
                    n.jsx('button', {
                      onClick: () => y('program'),
                      disabled: b,
                      className:
                        'w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400',
                      children: 'Use Template',
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    n.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-2',
                      children: 'Success Story',
                    }),
                    n.jsx('p', {
                      className: 'text-sm text-brown-600 mb-4',
                      children: 'Share a student achievement or success story',
                    }),
                    n.jsx('button', {
                      onClick: () => y('success'),
                      disabled: b,
                      className:
                        'w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400',
                      children: 'Use Template',
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    n.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-2',
                      children: 'Event Announcement',
                    }),
                    n.jsx('p', {
                      className: 'text-sm text-brown-600 mb-4',
                      children: 'Promote an upcoming event or webinar',
                    }),
                    n.jsx('button', {
                      onClick: () => y('event'),
                      disabled: b,
                      className:
                        'w-full bg-brown-600 text-white py-2 px-4 rounded-md hover:bg-brown-600-hover disabled:bg-gray-400',
                      children: 'Use Template',
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    n.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-2',
                      children: 'Daily Motivation',
                    }),
                    n.jsx('p', {
                      className: 'text-sm text-brown-600 mb-4',
                      children: 'Share an inspirational quote or message',
                    }),
                    n.jsx('button', {
                      onClick: () => y('motivation'),
                      disabled: b,
                      className:
                        'w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 disabled:bg-gray-400',
                      children: 'Use Template',
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className: 'bg-white rounded-lg shadow p-6',
                  children: [
                    n.jsx('h3', {
                      className: 'text-lg font-semibold text-brown-900 mb-2',
                      children: 'Partnership Announcement',
                    }),
                    n.jsx('p', {
                      className: 'text-sm text-brown-600 mb-4',
                      children: 'Announce a new partnership or collaboration',
                    }),
                    n.jsx('button', {
                      onClick: () => y('partnership'),
                      disabled: b,
                      className:
                        'w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400',
                      children: 'Use Template',
                    }),
                  ],
                }),
                x &&
                  n.jsxs('div', {
                    className: 'md:col-span-2 bg-beige-50 rounded-lg p-6',
                    children: [
                      n.jsx('h3', {
                        className: 'font-semibold text-brown-900 mb-4',
                        children: 'Template Post Results:',
                      }),
                      Object.entries(x).map(([e, t]) =>
                        n.jsxs(
                          'div',
                          {
                            className: 'flex items-center justify-between py-2',
                            children: [
                              n.jsxs('span', {
                                className: 'capitalize text-brown-900',
                                children: [e, ':'],
                              }),
                              n.jsx('span', {
                                className:
                                  'font-medium ' +
                                  (t.success
                                    ? 'text-green-600'
                                    : 'text-red-600'),
                                children: t.success
                                  ? '✓ Success'
                                  : `✗ ${t.error}`,
                              }),
                            ],
                          },
                          e
                        )
                      ),
                    ],
                  }),
              ],
            }),
          'status' === e &&
            n.jsxs('div', {
              className: 'bg-white rounded-lg shadow p-6',
              children: [
                n.jsx('h2', {
                  className: 'text-xl font-semibold text-brown-900 mb-4',
                  children: 'Zapier Configuration Status',
                }),
                n.jsxs('div', {
                  className: 'space-y-4',
                  children: [
                    n.jsxs('div', {
                      className:
                        'flex items-center justify-between p-4 bg-beige-50 rounded-md',
                      children: [
                        n.jsxs('div', {
                          children: [
                            n.jsx('h3', {
                              className: 'font-medium text-brown-900',
                              children: 'Facebook',
                            }),
                            n.jsx('p', {
                              className: 'text-sm text-brown-600',
                              children: 'Webhook configuration',
                            }),
                          ],
                        }),
                        n.jsx('span', {
                          className:
                            'px-3 py-1 rounded-full text-sm font-medium ' +
                            (f.facebook
                              ? 'bg-beige-50 text-green-600'
                              : 'bg-beige-50 text-red-800'),
                          children: f.facebook
                            ? 'Configured'
                            : 'Not Configured',
                        }),
                      ],
                    }),
                    n.jsxs('div', {
                      className:
                        'flex items-center justify-between p-4 bg-beige-50 rounded-md',
                      children: [
                        n.jsxs('div', {
                          children: [
                            n.jsx('h3', {
                              className: 'font-medium text-brown-900',
                              children: 'LinkedIn',
                            }),
                            n.jsx('p', {
                              className: 'text-sm text-brown-600',
                              children: 'Webhook configuration',
                            }),
                          ],
                        }),
                        n.jsx('span', {
                          className:
                            'px-3 py-1 rounded-full text-sm font-medium ' +
                            (f.linkedin
                              ? 'bg-beige-50 text-green-600'
                              : 'bg-beige-50 text-red-800'),
                          children: f.linkedin
                            ? 'Configured'
                            : 'Not Configured',
                        }),
                      ],
                    }),
                    n.jsxs('div', {
                      className:
                        'flex items-center justify-between p-4 bg-beige-50 rounded-md',
                      children: [
                        n.jsxs('div', {
                          children: [
                            n.jsx('h3', {
                              className: 'font-medium text-brown-900',
                              children: 'YouTube',
                            }),
                            n.jsx('p', {
                              className: 'text-sm text-brown-600',
                              children: 'Webhook configuration',
                            }),
                          ],
                        }),
                        n.jsx('span', {
                          className:
                            'px-3 py-1 rounded-full text-sm font-medium ' +
                            (f.youtube
                              ? 'bg-beige-50 text-green-600'
                              : 'bg-beige-50 text-red-800'),
                          children: f.youtube ? 'Configured' : 'Not Configured',
                        }),
                      ],
                    }),
                    n.jsxs('div', {
                      className:
                        'flex items-center justify-between p-4 bg-beige-50 rounded-md',
                      children: [
                        n.jsxs('div', {
                          children: [
                            n.jsx('h3', {
                              className: 'font-medium text-brown-900',
                              children: 'All Platforms (Single Webhook)',
                            }),
                            n.jsx('p', {
                              className: 'text-sm text-brown-600',
                              children: 'Optional unified webhook',
                            }),
                          ],
                        }),
                        n.jsx('span', {
                          className:
                            'px-3 py-1 rounded-full text-sm font-medium ' +
                            (f.all
                              ? 'bg-beige-50 text-green-600'
                              : 'bg-beige-100 text-brown-900'),
                          children: f.all ? 'Configured' : 'Optional',
                        }),
                      ],
                    }),
                    n.jsxs('div', {
                      className:
                        'flex items-center justify-between p-4 bg-beige-50 rounded-md',
                      children: [
                        n.jsxs('div', {
                          children: [
                            n.jsx('h3', {
                              className: 'font-medium text-brown-900',
                              children: 'Zapier API Key',
                            }),
                            n.jsx('p', {
                              className: 'text-sm text-brown-600',
                              children: 'Optional authentication',
                            }),
                          ],
                        }),
                        n.jsx('span', {
                          className:
                            'px-3 py-1 rounded-full text-sm font-medium ' +
                            (f.apiKey
                              ? 'bg-beige-50 text-green-600'
                              : 'bg-beige-100 text-brown-900'),
                          children: f.apiKey ? 'Configured' : 'Optional',
                        }),
                      ],
                    }),
                  ],
                }),
                n.jsxs('div', {
                  className:
                    'mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md',
                  children: [
                    n.jsx('h3', {
                      className: 'font-semibold text-blue-900 mb-2',
                      children: 'Setup Instructions',
                    }),
                    n.jsxs('ol', {
                      className:
                        'list-decimal list-inside space-y-2 text-sm text-green-600',
                      children: [
                        n.jsx('li', {
                          children:
                            'Create Zaps in Zapier for each platform (Facebook, LinkedIn, YouTube)',
                        }),
                        n.jsx('li', {
                          children: 'Use "Webhooks by Zapier" as the trigger',
                        }),
                        n.jsx('li', {
                          children: 'Copy the webhook URLs from Zapier',
                        }),
                        n.jsxs('li', {
                          children: [
                            'Add webhook URLs to your environment variables:',
                            n.jsxs('ul', {
                              className:
                                'list-disc list-inside ml-6 mt-2 space-y-1',
                              children: [
                                n.jsx('li', {
                                  children: 'VITE_ZAPIER_FACEBOOK_WEBHOOK',
                                }),
                                n.jsx('li', {
                                  children: 'VITE_ZAPIER_LINKEDIN_WEBHOOK',
                                }),
                                n.jsx('li', {
                                  children: 'VITE_ZAPIER_YOUTUBE_WEBHOOK',
                                }),
                                n.jsx('li', {
                                  children:
                                    'VITE_ZAPIER_ALL_PLATFORMS_WEBHOOK (optional)',
                                }),
                                n.jsx('li', {
                                  children: 'VITE_ZAPIER_API_KEY (optional)',
                                }),
                              ],
                            }),
                          ],
                        }),
                        n.jsx('li', {
                          children:
                            'Configure Zapier actions to post to respective platforms',
                        }),
                        n.jsx('li', {
                          children: 'Test the integration using the templates',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
    })
  );
}
export { a as default };

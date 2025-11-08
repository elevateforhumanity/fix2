import { r as e, j as s } from './vendor-react-C-ZQNdj3.js';
import { supabase as i } from './supabaseClient-DCQoDyvc.js';
import { A as t } from './AppLayout-DjgAzEIN.js';
import './vendor-Da1LjC7-.js';
import './vendor-supabase-C00Cu5KO.js';
import './vendor-router-CQjfSXV_.js';
function n() {
  const [n, a] = e.useState(!0),
    [r, o] = e.useState(!1),
    [l, c] = e.useState({
      email_notifications: !0,
      push_notifications: !0,
      sms_notifications: !1,
      course_updates: !0,
      grade_updates: !0,
      payment_updates: !0,
      marketing_emails: !1,
    }),
    [d, u] = e.useState(null),
    [m, b] = e.useState(null);
  e.useEffect(() => {
    p();
  }, []);
  const p = async () => {
    if (!i) return (u('Database service is not available'), void a(!1));
    try {
      (a(!0), u(null));
      const {
        data: { user: e },
      } = await i.auth.getUser();
      if (!e) return void u('Please log in to manage notification settings');
      const { data: s, error: t } = await i
        .from('notification_preferences')
        .select('*')
        .eq('user_id', e.id)
        .single();
      if (t && 'PGRST116' !== t.code) throw t;
      s && c(s);
    } catch (e) {
      (console.error('Error fetching preferences:', e), u(e.message));
    } finally {
      a(!1);
    }
  };
  return s.jsx(t, {
    children: s.jsxs('div', {
      className: 'container mx-auto px-4 py-8 max-w-3xl',
      children: [
        s.jsx('h1', {
          className: 'text-3xl font-bold mb-6',
          children: 'Notification Settings',
        }),
        d &&
          s.jsx('div', {
            className: 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6',
            children: s.jsx('p', { className: 'text-red-800', children: d }),
          }),
        m &&
          s.jsx('div', {
            className:
              'bg-green-50 border border-green-200 rounded-lg p-4 mb-6',
            children: s.jsx('p', { className: 'text-green-600', children: m }),
          }),
        n
          ? s.jsxs('div', {
              className: 'text-center py-12',
              children: [
                s.jsx('div', {
                  className:
                    'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto',
                }),
                s.jsx('p', {
                  className: 'mt-4 text-brown-600',
                  children: 'Loading settings...',
                }),
              ],
            })
          : s.jsxs('div', {
              className: 'space-y-6',
              children: [
                [
                  {
                    title: 'Notification Channels',
                    settings: [
                      {
                        key: 'email_notifications',
                        label: 'Email Notifications',
                        description: 'Receive notifications via email',
                      },
                      {
                        key: 'push_notifications',
                        label: 'Push Notifications',
                        description: 'Receive browser push notifications',
                      },
                      {
                        key: 'sms_notifications',
                        label: 'SMS Notifications',
                        description:
                          'Receive text message notifications (carrier rates may apply)',
                      },
                    ],
                  },
                  {
                    title: 'Content Preferences',
                    settings: [
                      {
                        key: 'course_updates',
                        label: 'Course Updates',
                        description:
                          'New lessons, assignments, and course announcements',
                      },
                      {
                        key: 'grade_updates',
                        label: 'Grade Updates',
                        description: 'Quiz results and grade changes',
                      },
                      {
                        key: 'payment_updates',
                        label: 'Payment Updates',
                        description:
                          'Payment confirmations and billing notifications',
                      },
                      {
                        key: 'marketing_emails',
                        label: 'Marketing Emails',
                        description: 'News, promotions, and special offers',
                      },
                    ],
                  },
                ].map((e, i) =>
                  s.jsxs(
                    'div',
                    {
                      className: 'bg-white rounded-lg shadow',
                      children: [
                        s.jsx('div', {
                          className: 'p-6 border-b',
                          children: s.jsx('h2', {
                            className: 'text-xl font-bold',
                            children: e.title,
                          }),
                        }),
                        s.jsx('div', {
                          className: 'divide-y',
                          children: e.settings.map((e) =>
                            s.jsxs(
                              'div',
                              {
                                className:
                                  'p-6 flex items-start justify-between',
                                children: [
                                  s.jsxs('div', {
                                    className: 'flex-1',
                                    children: [
                                      s.jsx('h3', {
                                        className:
                                          'font-semibold text-brown-900 mb-1',
                                        children: e.label,
                                      }),
                                      s.jsx('p', {
                                        className: 'text-sm text-brown-600',
                                        children: e.description,
                                      }),
                                    ],
                                  }),
                                  s.jsx('button', {
                                    onClick: () => {
                                      return (
                                        (s = e.key),
                                        void c((e) => ({ ...e, [s]: !e[s] }))
                                      );
                                      var s;
                                    },
                                    className:
                                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ml-4 ' +
                                      (l[e.key]
                                        ? 'bg-green-600'
                                        : 'bg-brown-200'),
                                    children: s.jsx('span', {
                                      className:
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ' +
                                        (l[e.key]
                                          ? 'translate-x-5'
                                          : 'translate-x-0'),
                                    }),
                                  }),
                                ],
                              },
                              e.key
                            )
                          ),
                        }),
                      ],
                    },
                    i
                  )
                ),
                s.jsxs('div', {
                  className: 'flex justify-end gap-4',
                  children: [
                    s.jsx('button', {
                      onClick: p,
                      disabled: r,
                      className:
                        'px-6 py-3 bg-brown-200 text-brown-900 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition',
                      children: 'Reset',
                    }),
                    s.jsx('button', {
                      onClick: async () => {
                        if (i)
                          try {
                            (o(!0), u(null), b(null));
                            const {
                              data: { user: e },
                            } = await i.auth.getUser();
                            if (!e)
                              return void u('Please log in to save settings');
                            const { error: s } = await i
                              .from('notification_preferences')
                              .upsert({
                                user_id: e.id,
                                ...l,
                                updated_at: new Date().toISOString(),
                              });
                            if (s) throw s;
                            (b('Settings saved successfully!'),
                              setTimeout(() => b(null), 3e3));
                          } catch (e) {
                            (console.error('Error saving preferences:', e),
                              u(e.message));
                          } finally {
                            o(!1);
                          }
                        else u('Database service is not available');
                      },
                      disabled: r,
                      className:
                        'px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition font-bold',
                      children: r ? 'Saving...' : 'Save Settings',
                    }),
                  ],
                }),
                s.jsxs('div', {
                  className: 'bg-blue-50 border border-blue-200 rounded-lg p-6',
                  children: [
                    s.jsx('h3', {
                      className: 'font-bold text-blue-900 mb-2',
                      children: 'About Notifications',
                    }),
                    s.jsxs('ul', {
                      className: 'text-sm text-green-600 space-y-1',
                      children: [
                        s.jsx('li', {
                          children:
                            '• You can change these settings at any time',
                        }),
                        s.jsx('li', {
                          children:
                            '• Critical account and security notifications cannot be disabled',
                        }),
                        s.jsx('li', {
                          children:
                            '• SMS notifications require phone number verification',
                        }),
                        s.jsx('li', {
                          children:
                            '• Push notifications require browser permission',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
      ],
    }),
  });
}
export { n as default };

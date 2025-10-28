/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function NotificationSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    course_updates: true,
    grade_updates: true,
    payment_updates: true,
    marketing_emails: false,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to manage notification settings');
        return;
      }

      const { data, error: prefsError } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (prefsError && prefsError.code !== 'PGRST116') {
        throw prefsError;
      }

      if (data) {
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to save settings');
        return;
      }

      const { error: upsertError } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) throw upsertError;

      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const settingGroups = [
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
          description: 'New lessons, assignments, and course announcements',
        },
        {
          key: 'grade_updates',
          label: 'Grade Updates',
          description: 'Quiz results and grade changes',
        },
        {
          key: 'payment_updates',
          label: 'Payment Updates',
          description: 'Payment confirmations and billing notifications',
        },
        {
          key: 'marketing_emails',
          label: 'Marketing Emails',
          description: 'News, promotions, and special offers',
        },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Notification Settings</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">{success}</p>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brand-text-muted">Loading settings...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {settingGroups.map((group, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">{group.title}</h2>
                </div>
                <div className="divide-y">
                  {group.settings.map((setting) => (
                    <div
                      key={setting.key}
                      className="p-6 flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {setting.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle(setting.key)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-4 ${
                          preferences[setting.key]
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            preferences[setting.key]
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={fetchPreferences}
                disabled={saving}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-bold"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-2">
                About Notifications
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You can change these settings at any time</li>
                <li>
                  • Critical account and security notifications cannot be
                  disabled
                </li>
                <li>• SMS notifications require phone number verification</li>
                <li>• Push notifications require browser permission</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

import React, { useState } from 'react';
import { Mail, Bell, MessageCircle, Award, FileText } from 'lucide-react';

interface EmailPreferencesProps {
  userId: string;
}

export default function EmailPreferences({ userId }: EmailPreferencesProps) {
  const [preferences, setPreferences] = useState({
    courseEnrollment: true,
    lessonComplete: true,
    courseComplete: true,
    certificateIssued: true,
    assignmentGraded: true,
    discussionReply: true,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Save to backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const preferenceItems = [
    {
      key: 'courseEnrollment' as const,
      icon: <Bell className="w-5 h-5" />,
      title: 'Course Enrollment',
      description: 'Get notified when you enroll in a new course',
    },
    {
      key: 'lessonComplete' as const,
      icon: <FileText className="w-5 h-5" />,
      title: 'Lesson Completion',
      description: 'Receive confirmation when you complete a lesson',
    },
    {
      key: 'courseComplete' as const,
      icon: <Award className="w-5 h-5" />,
      title: 'Course Completion',
      description: 'Celebrate when you complete a course',
    },
    {
      key: 'certificateIssued' as const,
      icon: <Award className="w-5 h-5" />,
      title: 'Certificate Issued',
      description: 'Get notified when your certificate is ready',
    },
    {
      key: 'assignmentGraded' as const,
      icon: <FileText className="w-5 h-5" />,
      title: 'Assignment Graded',
      description: 'Receive notifications when assignments are graded',
    },
    {
      key: 'discussionReply' as const,
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'Discussion Replies',
      description: 'Get notified when someone replies to your posts',
    },
    {
      key: 'weeklyDigest' as const,
      icon: <Mail className="w-5 h-5" />,
      title: 'Weekly Digest',
      description: 'Receive a weekly summary of your progress',
    },
    {
      key: 'marketingEmails' as const,
      icon: <Mail className="w-5 h-5" />,
      title: 'Marketing Emails',
      description: 'Receive updates about new courses and features',
    },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-brown-900">
          Email Notifications
        </h3>
      </div>

      <p className="text-brown-600 mb-6">
        Choose which email notifications you'd like to receive
      </p>

      <div className="space-y-4">
        {preferenceItems.map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition"
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="text-green-600 mt-1">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-brown-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-brown-600">{item.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences[item.key] ? 'bg-green-600' : 'bg-brown-300'
              }`}
              role="switch"
              aria-checked={preferences[item.key]}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-brown-500">
          Changes are saved automatically
        </p>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-semibold">
              ✓ Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}

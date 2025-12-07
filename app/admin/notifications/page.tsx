'use client';

import { useState } from 'react';
import { Bell, Send, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    targetAudience: 'all-students',
    url: '/',
    icon: '/icon-192x192.png',
  });

  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendNotification = async () => {
    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error sending notification:', error);
      setResult({ success: false, error: 'Failed to send notification' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Push Notifications</h1>
              <p className="text-gray-600 mt-1">Send instant notifications to students and staff</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notification Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Create Notification</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={notification.title}
                    onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                    placeholder="e.g., Class Reminder"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={notification.body}
                    onChange={(e) => setNotification({ ...notification, body: e.target.value })}
                    placeholder="e.g., Your class starts in 30 minutes"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={notification.targetAudience}
                    onChange={(e) => setNotification({ ...notification, targetAudience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all-students">All Students</option>
                    <option value="active-students">Active Students</option>
                    <option value="all-staff">All Staff</option>
                    <option value="barber-students">Barber Program Students</option>
                    <option value="cna-students">CNA Program Students</option>
                    <option value="cdl-students">CDL Program Students</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Click Action URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={notification.url}
                    onChange={(e) => setNotification({ ...notification, url: e.target.value })}
                    placeholder="/student/courses"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Where users go when they click the notification
                  </p>
                </div>

                <button
                  onClick={sendNotification}
                  disabled={sending || !notification.title || !notification.body}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{sending ? 'Sending...' : 'Send Notification'}</span>
                </button>
              </div>

              {/* Result */}
              {result && (
                <div className={`mt-6 p-4 rounded-lg ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                        {result.success ? 'Notification Sent!' : 'Failed to Send'}
                      </h3>
                      {result.summary && (
                        <p className={`text-sm mt-1 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                          Sent to {result.summary.sent} of {result.summary.total} users
                          {result.summary.failed > 0 && ` (${result.summary.failed} failed)`}
                        </p>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-700 mt-1">{result.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickTemplate
                  title="Class Reminder"
                  body="Your class starts in 30 minutes"
                  onClick={() => setNotification({
                    ...notification,
                    title: 'Class Reminder',
                    body: 'Your class starts in 30 minutes',
                    url: '/student/courses',
                  })}
                />
                <QuickTemplate
                  title="Assignment Due"
                  body="Assignment due tomorrow at 11:59 PM"
                  onClick={() => setNotification({
                    ...notification,
                    title: 'Assignment Due',
                    body: 'Assignment due tomorrow at 11:59 PM',
                    url: '/student/assignments',
                  })}
                />
                <QuickTemplate
                  title="New Message"
                  body="You have a new message from your instructor"
                  onClick={() => setNotification({
                    ...notification,
                    title: 'New Message',
                    body: 'You have a new message from your instructor',
                    url: '/student/messages',
                  })}
                />
                <QuickTemplate
                  title="Certificate Ready"
                  body="Your certificate is ready to download!"
                  onClick={() => setNotification({
                    ...notification,
                    title: 'Certificate Ready',
                    body: 'Your certificate is ready to download!',
                    url: '/student/certificates',
                  })}
                />
              </div>
            </div>
          </div>

          {/* Preview & Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
              
              {/* Notification Preview */}
              <div className="border-2 border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <img 
                    src={notification.icon} 
                    alt="Icon" 
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">
                      {notification.title || 'Notification Title'}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {notification.body || 'Notification message will appear here'}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Elevate for Humanity • now
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Target Audience</div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.targetAudience.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Estimated Recipients</div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.targetAudience === 'all-students' ? '1,234' :
                     notification.targetAudience === 'active-students' ? '856' :
                     notification.targetAudience === 'all-staff' ? '45' :
                     '200+'}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Click Action</div>
                  <div className="text-sm text-gray-900 truncate">
                    {notification.url}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-xs text-gray-600">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Notifications are sent instantly to all users with push notifications enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickTemplateProps {
  title: string;
  body: string;
  onClick: () => void;
}

function QuickTemplate({ title, body, onClick }: QuickTemplateProps) {
  return (
    <button
      onClick={onClick}
      className="p-4 border-2 border-gray-200 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
    >
      <div className="font-medium text-gray-900 mb-1">{title}</div>
      <div className="text-sm text-gray-600">{body}</div>
    </button>
  );
}

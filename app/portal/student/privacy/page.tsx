'use client';

import { useState } from 'react';
import { Shield, Eye, EyeOff, Download, Trash2, Lock, Globe, Users, Bell, Mail, Cookie, FileText, AlertCircle, Check, X } from 'lucide-react';

interface PrivacySetting {
  id: string;
  category: string;
  title: string;
  description: string;
  enabled: boolean;
  required?: boolean;
}

export default function PrivacyPage() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: '1',
      category: 'Profile',
      title: 'Public Profile',
      description: 'Make your profile visible to other students',
      enabled: true,
    },
    {
      id: '2',
      category: 'Profile',
      title: 'Show Email',
      description: 'Display your email address on your profile',
      enabled: false,
    },
    {
      id: '3',
      category: 'Profile',
      title: 'Show Progress',
      description: 'Allow others to see your course progress',
      enabled: true,
    },
    {
      id: '4',
      category: 'Communication',
      title: 'Email Notifications',
      description: 'Receive updates and announcements via email',
      enabled: true,
      required: true,
    },
    {
      id: '5',
      category: 'Communication',
      title: 'SMS Notifications',
      description: 'Receive important alerts via text message',
      enabled: false,
    },
    {
      id: '6',
      category: 'Communication',
      title: 'Allow Messages',
      description: 'Let other students send you messages',
      enabled: true,
    },
    {
      id: '7',
      category: 'Data',
      title: 'Analytics',
      description: 'Help improve the platform by sharing usage data',
      enabled: true,
    },
    {
      id: '8',
      category: 'Data',
      title: 'Personalization',
      description: 'Use my data to personalize my experience',
      enabled: true,
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id && !s.required ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const profileSettings = settings.filter(s => s.category === 'Profile');
  const communicationSettings = settings.filter(s => s.category === 'Communication');
  const dataSettings = settings.filter(s => s.category === 'Data');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Privacy & Data</h1>
          <p className="text-gray-600 mt-1">Manage your privacy settings and data</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Shield className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{settings.filter(s => s.enabled).length}</p>
            <p className="text-sm text-gray-600">Active Settings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Lock className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">Secure</p>
            <p className="text-sm text-gray-600">Data Protection</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Eye className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{profileSettings.filter(s => s.enabled).length}</p>
            <p className="text-sm text-gray-600">Public Settings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Cookie className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">Managed</p>
            <p className="text-sm text-gray-600">Cookie Preferences</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Users size={24} className="text-blue-600" />
                  <h2 className="text-xl font-semibold">Profile Privacy</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {profileSettings.map((setting) => (
                  <label
                    key={setting.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                      disabled={setting.required}
                      className="w-5 h-5 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Bell size={24} className="text-green-600" />
                  <h2 className="text-xl font-semibold">Communication Preferences</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {communicationSettings.map((setting) => (
                  <label
                    key={setting.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {setting.title}
                        {setting.required && (
                          <span className="ml-2 text-xs text-red-600">(Required)</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                      disabled={setting.required}
                      className="w-5 h-5 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <FileText size={24} className="text-purple-600" />
                  <h2 className="text-xl font-semibold">Data & Analytics</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {dataSettings.map((setting) => (
                  <label
                    key={setting.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                      className="w-5 h-5 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Cookie size={24} className="text-orange-600" />
                  <h2 className="text-xl font-semibold">Cookie Preferences</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">Essential Cookies <span className="text-xs text-red-600">(Required)</span></p>
                    <p className="text-sm text-gray-600 mt-1">Necessary for the website to function</p>
                  </div>
                  <input type="checkbox" checked disabled className="w-5 h-5 rounded" />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-sm text-gray-600 mt-1">Help us understand how you use the site</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">Marketing Cookies</p>
                    <p className="text-sm text-gray-600 mt-1">Used to show relevant advertisements</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded" />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Data Management</h2>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download size={20} />
                  Export My Data
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={20} />
                  Delete Account
                </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Check className="text-green-600" size={24} />
                <h3 className="font-semibold text-green-900">Your Data is Protected</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• End-to-end encryption</li>
                <li>• GDPR compliant</li>
                <li>• Regular security audits</li>
                <li>• No data selling</li>
                <li>• Transparent policies</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Privacy Resources</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900">
                  <FileText size={16} />
                  Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900">
                  <FileText size={16} />
                  Terms of Service
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900">
                  <Cookie size={16} />
                  Cookie Policy
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900">
                  <Shield size={16} />
                  Security Center
                </a>
              </div>
            </div>
          </div>
        </div>

        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Export Your Data</h3>
                <button onClick={() => setShowExportModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Download a copy of all your data including profile information, course progress, and activity history.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Profile data</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Course progress</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Assignments & grades</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Messages & communications</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Request Export
                  </button>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600">Delete Account</h3>
                <button onClick={() => setShowDeleteModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <p className="font-semibold text-red-900">Warning: This action is permanent</p>
                  </div>
                  <p className="text-sm text-red-800">
                    Deleting your account will permanently remove all your data, including:
                  </p>
                  <ul className="text-sm text-red-800 mt-2 space-y-1">
                    <li>• Profile and personal information</li>
                    <li>• Course progress and grades</li>
                    <li>• Certificates and achievements</li>
                    <li>• Messages and communications</li>
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type "DELETE" to confirm
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="DELETE"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// app/admin/security/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Key, Lock, CheckCircle } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
              <p className="text-sm text-gray-600 mt-1">
                Configure SSO, 2FA, and security policies
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SSO Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Single Sign-On (SSO)</h2>
              <p className="text-sm text-gray-600">
                Configure SSO providers for seamless authentication
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable SSO</p>
                <p className="text-sm text-gray-600">
                  Allow users to sign in with external providers
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ssoEnabled}
                  onChange={(e) => setSsoEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {ssoEnabled && (
              <div className="space-y-3 pl-4">
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Google OAuth</p>
                    <p className="text-sm text-gray-600">Configured and active</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Microsoft Azure AD</p>
                    <p className="text-sm text-gray-600">Configured and active</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Key className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
              <p className="text-sm text-gray-600">
                Require additional verification for user logins
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Require 2FA for all users</p>
              <p className="text-sm text-gray-600">
                Users must set up 2FA before accessing the system
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorRequired}
                onChange={(e) => setTwoFactorRequired(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Password Policy */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Lock className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Password Policy</h2>
              <p className="text-sm text-gray-600">
                Set requirements for user passwords
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) =>
                  setPasswordPolicy({
                    ...passwordPolicy,
                    minLength: parseInt(e.target.value)
                  })
                }
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={passwordPolicy.requireUppercase}
                  onChange={(e) =>
                    setPasswordPolicy({
                      ...passwordPolicy,
                      requireUppercase: e.target.checked
                    })
                  }
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  Require at least one uppercase letter
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={passwordPolicy.requireLowercase}
                  onChange={(e) =>
                    setPasswordPolicy({
                      ...passwordPolicy,
                      requireLowercase: e.target.checked
                    })
                  }
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  Require at least one lowercase letter
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={passwordPolicy.requireNumbers}
                  onChange={(e) =>
                    setPasswordPolicy({
                      ...passwordPolicy,
                      requireNumbers: e.target.checked
                    })
                  }
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Require at least one number</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={passwordPolicy.requireSpecialChars}
                  onChange={(e) =>
                    setPasswordPolicy({
                      ...passwordPolicy,
                      requireSpecialChars: e.target.checked
                    })
                  }
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  Require at least one special character
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Save Security Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

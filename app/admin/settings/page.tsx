'use client';

import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Admin Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Settings</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Site configuration</li>
              <li>• Branding settings</li>
              <li>• Contact information</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• User roles</li>
              <li>• Permissions</li>
              <li>• Access control</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Settings</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• SMTP configuration</li>
              <li>• Email templates</li>
              <li>• Notification settings</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Settings</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• API keys</li>
              <li>• Third-party services</li>
              <li>• Webhooks</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Password policies</li>
              <li>• Two-factor auth</li>
              <li>• Session management</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Backup & Restore</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Database backups</li>
              <li>• File backups</li>
              <li>• Restore options</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

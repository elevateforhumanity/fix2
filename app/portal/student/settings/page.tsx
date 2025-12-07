import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { User, Lock, Bell, Eye, Globe, Shield, Download, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/settings",
  },
  title: 'Settings | Student Portal',
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium flex items-center gap-2">
                <User size={20} />
                Account
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Lock size={20} />
                Security
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Bell size={20} />
                Notifications
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Eye size={20} />
                Privacy
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Globe size={20} />
                Language
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={profile?.full_name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue={profile?.phone || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield size={24} />
                  Security
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Change Password</h3>
                    <p className="text-sm text-gray-600">Update your password regularly</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Eye size={24} />
                  Privacy
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-gray-600">Control who can see your profile</p>
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Everyone</option>
                    <option>Students Only</option>
                    <option>Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Online Status</h3>
                    <p className="text-sm text-gray-600">Let others see when you're online</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Data Management</h2>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Download size={20} className="text-blue-600" />
                    <div className="text-left">
                      <h3 className="font-medium">Download Your Data</h3>
                      <p className="text-sm text-gray-600">Export all your data</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50">
                  <div className="flex items-center gap-3">
                    <Trash2 size={20} className="text-red-600" />
                    <div className="text-left">
                      <h3 className="font-medium text-red-600">Delete Account</h3>
                      <p className="text-sm text-gray-600">Permanently delete your account</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

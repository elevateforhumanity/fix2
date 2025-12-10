import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { User, Lock, Bell, Eye, Globe, Shield, Download, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/settings",
  },
  title: 'Settings | Student Portal',
  description: 'Explore Settings and discover opportunities for career growth and development at Elevate For Humanity.',
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
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Settings"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Settings
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
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
      
      {/* Storytelling Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every great career begins with a single step. Whether you're looking to change careers, 
                  upgrade your skills, or enter the workforce for the first time, we're here to help you succeed. 
                  Our programs are 100% free, government-funded, and designed to get you hired fast.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% free training - no tuition, no hidden costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry-recognized certifications that employers value</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Job placement assistance and career support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Flexible scheduling for working adults</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Browse All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}

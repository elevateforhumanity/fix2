import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Smartphone, Download, CheckCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mobile App | Elevate For Humanity',
  description:
    'Download the Milady mobile app to access your training anywhere',
};

export default async function MobileAppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/mobile-app');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            📱 Learn Anywhere, Anytime
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            Download the Milady mobile app for iOS or Android
          </p>
        </div>

        {/* Milady Logo */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image
              src="/images/milady-logo.jpg"
              alt="Milady"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Milady Training Platform
          </h2>
          <p className="text-slate-600">
            Powered by Thinkific - Access all your courses on mobile
          </p>
        </div>

        {/* Download Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href="https://apps.apple.com/us/app/thinkific/id1471012001"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                <span className="text-3xl"></span>
              </div>
              <Download className="w-8 h-8 text-blue-600 group-hover:animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Download for iPhone
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Available on the App Store for iOS devices
            </p>
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition-all">
              Get on App Store →
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.thinkific.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-3xl">▶</span>
              </div>
              <Download className="w-8 h-8 text-blue-600 group-hover:animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Download for Android
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Available on Google Play for Android devices
            </p>
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition-all">
              Get on Google Play →
            </div>
          </a>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
            How to Get Started
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Download the Thinkific App
                </h3>
                <p className="text-slate-600">
                  Search for "Thinkific" in the App Store (iOS) or Google Play
                  (Android) and install the app.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Open the App and Tap "Login"
                </h3>
                <p className="text-slate-600">
                  Launch the Thinkific app on your device and tap the login
                  button.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Enter Your School Domain
                </h3>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mt-2 inline-block">
                  <code className="text-lg font-bold text-blue-900">
                    miladytraining.com
                  </code>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Login with Your Milady Credentials
                </h3>
                <p className="text-slate-600">
                  Use the email and password you created when enrolling in
                  Milady RISE courses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Start Learning!
                </h3>
                <p className="text-slate-600">
                  Access all your courses, watch videos, complete lessons, and
                  track your progress on the go.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">App Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Offline Access</p>
                <p className="text-blue-100 text-sm">
                  Download videos to watch without internet
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Progress Tracking</p>
                <p className="text-blue-100 text-sm">
                  See your completion status in real-time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Push Notifications</p>
                <p className="text-blue-100 text-sm">
                  Get reminders for assignments and deadlines
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">24/7 Access</p>
                <p className="text-blue-100 text-sm">
                  Learn anytime, anywhere at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Web Alternative */}
        <div className="bg-slate-100 rounded-xl p-6 text-center">
          <p className="text-slate-700 mb-4">Prefer to use a web browser?</p>
          <a
            href="https://www.miladytraining.com/users/sign_in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Login on Web Browser
          </a>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link
            href="/student/dashboard"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

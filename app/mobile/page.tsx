'use client';

import Link from 'next/link';
import { Smartphone, Download, Zap, Wifi, Bell, Lock } from 'lucide-react';

export default function MobileAppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
            <Smartphone className="w-4 h-4" />
            Available Now
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Learn Anywhere,
            <br />
            <span className="text-red-600">Anytime</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Access your courses offline, get push notifications, and enjoy a native app experience with our Progressive Web App.
          </p>
          
          {/* Install Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  // Trigger PWA install prompt
                  window.dispatchEvent(new Event('beforeinstallprompt'));
                }
              }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition shadow-lg"
            >
              <Download className="w-5 h-5" />
              Install App
            </button>
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-50 transition border-2 border-slate-200"
            >
              Continue in Browser
            </Link>
          </div>

          {/* App Preview */}
          <div className="relative max-w-sm mx-auto">
            <div className="bg-slate-900 rounded-3xl p-3 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="bg-red-600 p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold">Elevate LMS</span>
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Welcome back!</h3>
                  <p className="text-sm text-emerald-100">Continue your learning journey</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">HVAC Technician</p>
                        <div className="h-1.5 bg-slate-200 rounded-full mt-2">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Medical Assistant</p>
                        <div className="h-1.5 bg-slate-200 rounded-full mt-2">
                          <div className="h-full bg-brandPrimary rounded-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Use Our Mobile App?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Offline Access</h3>
              <p className="text-slate-600">
                Download courses and continue learning even without internet connection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-brandPrimary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Push Notifications</h3>
              <p className="text-slate-600">
                Get instant alerts for new assignments, messages, and deadlines.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast & Native</h3>
              <p className="text-slate-600">
                Enjoy a smooth, app-like experience with instant loading and navigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How to Install
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* iOS */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">iOS (iPhone/iPad)</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Open this page in Safari browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Tap the Share button (square with arrow)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Scroll down and tap "Add to Home Screen"</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Tap "Add" to install the app</span>
                </li>
              </ol>
            </div>

            {/* Android */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Android</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Open this page in Chrome browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Tap the menu button (three dots)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Tap "Add to Home screen" or "Install app"</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Tap "Install" to add the app</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn on the Go?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Install our app now and take your education anywhere.
          </p>
          <button
            onClick={() => {
              if ('serviceWorker' in navigator) {
                window.dispatchEvent(new Event('beforeinstallprompt'));
              }
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition shadow-lg"
          >
            <Download className="w-5 h-5" />
            Install Now
          </button>
        </div>
      </section>
    </main>
  );
}

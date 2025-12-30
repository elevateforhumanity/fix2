'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  FileText,
  Video,
  GraduationCap,
  DollarSign,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Download,
} from 'lucide-react';

export default function SupersonicFastCashHome() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // PWA Install Prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* PWA Install Banner */}
      {showInstallPrompt && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6" />
              <div>
                <p className="font-semibold">Install SupersonicFastCash App</p>
                <p className="text-sm text-green-100">
                  Get faster access and work offline
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="px-4 py-2 text-white hover:bg-green-700 rounded-lg transition"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - SmartWiz Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  IRS-Certified • Drake Software Powered
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                File Your Taxes
                <br />
                <span className="text-green-200">Faster Than Ever</span>
              </h1>

              <p className="text-xl text-green-100 mb-8">
                DIY tax prep starting at $49, or get professional help. Real-time
                refund calculator. E-file in minutes. Plus free tax training.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Refund in 8-21 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>$49-$99 DIY</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Drake Software</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Free training</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/diy/start"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-xl"
                >
                  <Calculator className="w-5 h-5" />
                  Start DIY ($49)
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white rounded-xl font-bold text-lg hover:bg-green-900 transition border-2 border-white/20"
                >
                  <Video className="w-5 h-5" />
                  Book Tax Pro
                </Link>
              </div>

              <p className="text-sm text-green-200 mt-4">
                💰 Refund advance available: $250-$7,500 (3.5% + $35 fee)
              </p>
            </div>

            {/* Right: Live Calculator Preview */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">
                Estimate Your Refund
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Filing Status
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none">
                    <option>Single</option>
                    <option>Married Filing Jointly</option>
                    <option>Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Income (W-2)
                  </label>
                  <input
                    type="number"
                    placeholder="$50,000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Federal Withholding
                  </label>
                  <input
                    type="number"
                    placeholder="$6,000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Estimated Refund
                    </span>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    $2,847
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on 2024 tax tables
                  </p>
                </div>

                <Link
                  href="/supersonic-fast-cash/diy/start"
                  className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Start Your Return →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options - SmartWiz Style */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600">
              DIY, professional help, or learn to become a tax pro yourself
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* DIY Option */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold mb-3">DIY Tax Prep</h3>
              <p className="text-gray-600 mb-6">
                TurboTax-style guided interview. Real-time calculator. E-file
                directly to IRS.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Step-by-step wizard</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Real-time refund calc</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Drake Software powered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>E-file included</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">
                $49-$99
              </div>

              <Link
                href="/supersonic-fast-cash/diy/start"
                className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Start Now →
              </Link>
            </div>

            {/* Professional Option */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-green-900 px-4 py-1 rounded-bl-lg font-bold text-sm">
                MOST POPULAR
              </div>

              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-3">Professional Service</h3>
              <p className="text-green-100 mb-6">
                IRS-certified tax pro prepares your return. Video consultation
                included.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Tax pro prepares</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Video consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Max refund guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>Audit support</span>
                </div>
              </div>

              <div className="text-3xl font-bold mb-6">$150-$500</div>

              <Link
                href="/supersonic-fast-cash/book-appointment"
                className="block w-full text-center px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Book Appointment →
              </Link>
            </div>

            {/* Training Option */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-2xl font-bold mb-3">Tax Training</h3>
              <p className="text-gray-600 mb-6">
                Learn to prepare taxes. IRS certification. Start your own tax
                business.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>IRS Link & Learn</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Mock exams</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Tax book included</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Get certified</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-6">FREE</div>

              <Link
                href="/supersonic-fast-cash/training"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Learning →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Better than SmartWiz */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why We're Better Than SmartWiz
            </h2>
            <p className="text-xl text-gray-600">
              More features, better support, lower prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Clock className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Faster Filing</h3>
              <p className="text-sm text-gray-600">
                Drake Software integration means faster e-file processing
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <DollarSign className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Lower Prices</h3>
              <p className="text-sm text-gray-600">
                $49 vs $60+ for basic returns. Save money every year
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Video className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Live Tax Pros</h3>
              <p className="text-sm text-gray-600">
                Video consultations included. Real humans, not chatbots
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <GraduationCap className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Free Training</h3>
              <p className="text-sm text-gray-600">
                Learn tax prep yourself. SmartWiz doesn't offer this
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <FileText className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Tax Book Access</h3>
              <p className="text-sm text-gray-600">
                Complete tax reference guide. Search any topic instantly
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Shield className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Audit Protection</h3>
              <p className="text-sm text-gray-600">
                Free audit support with professional service
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Smartphone className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">PWA App</h3>
              <p className="text-sm text-gray-600">
                Install on your phone. Works offline. Push notifications
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">All 50 States</h3>
              <p className="text-sm text-gray-600">
                Federal + state filing. Virtual or in-person (Indianapolis)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Your Refund?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands who've already filed with SupersonicFastCash
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/diy/start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition"
            >
              Start DIY Filing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white rounded-xl font-bold text-lg hover:bg-green-900 transition border-2 border-white/20"
            >
              Book Tax Pro
            </Link>
          </div>

          <p className="text-sm text-green-200 mt-6">
            💳 Refund advance available • 🎓 Free training included • 📱 Mobile
            app ready
          </p>
        </div>
      </section>
    </main>
  );
}

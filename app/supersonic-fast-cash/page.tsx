'use client';

import Link from 'next/link';
import {
  DollarSign,
  Clock,
  Shield,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

export default function SupersonicMarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero - Marketing Focus */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-red-900 text-white py-24 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tight leading-none">
              Get Your Tax Refund
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse">
                TODAY!
              </span>
            </h1>
            <p className="text-3xl md:text-4xl mb-12 font-bold text-gray-100">
              Up to <span className="text-red-400">$7,500</span> in Just{' '}
              <span className="text-red-400">15 Minutes</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/supersonic-fast-cash/apply"
                className="group px-14 py-7 bg-gradient-to-r from-red-600 to-red-700 text-white text-2xl font-black rounded-2xl hover:from-red-700 hover:to-red-800 shadow-2xl hover:shadow-red-500/50 uppercase transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  💵 Get Cash Now
                  <span className="group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </span>
              </Link>
              <Link
                href="/supersonic-fast-cash/diy-taxes"
                className="group px-14 py-7 bg-white text-blue-900 text-2xl font-black rounded-2xl hover:bg-gray-50 shadow-2xl hover:shadow-white/50 uppercase transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  📝 File Yourself
                  <span className="group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-4">💵</div>
              <div className="font-black text-2xl mb-2">Up to $7,500</div>
              <div className="text-gray-200">Same-day cash</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-4">⚡</div>
              <div className="font-black text-2xl mb-2">15 Minutes</div>
              <div className="text-gray-200">Fast approval</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-4">✅</div>
              <div className="font-black text-2xl mb-2">No Credit Check</div>
              <div className="text-gray-200">Everyone approved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-6xl mb-4">🏦</div>
              <div className="font-black text-2xl mb-2">FDIC Insured</div>
              <div className="text-gray-200">Safe & secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed EA Credentials Banner */}
      <section className="py-12 bg-gradient-to-r from-white via-gray-50 to-white border-y-4 border-red-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-100 transition-colors">
                <Shield className="w-20 h-20 text-red-600" />
              </div>
              <div>
                <div className="text-3xl font-black text-blue-900 mb-1">
                  Licensed Enrolled Agent
                </div>
                <div className="text-lg text-gray-600 font-semibold">
                  IRS-Authorized Tax Professional
                </div>
              </div>
            </div>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block"></div>
            <div className="text-center">
              <div className="text-xl font-black text-blue-900 mb-4">
                Full IRS Representation Rights
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-base">
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold border border-green-200">
                  ✅ Audit Defense
                </span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold border border-green-200">
                  ✅ Appeals
                </span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold border border-green-200">
                  ✅ Collections
                </span>
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold border border-green-200">
                  ✅ Tax Court
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services - Marketing Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Professional tax solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tax Refund Advance */}
            <div className="group bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-600 hover:border-red-700 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="text-7xl mb-4 relative z-10">💰</div>
                <h3 className="text-3xl font-black uppercase relative z-10">
                  Tax Refund Advance
                </h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Up to $7,500 cash today
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      15-minute approval
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      No credit check needed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Free tax preparation included
                    </span>
                  </li>
                </ul>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                  <div className="font-black text-red-900 mb-2 text-sm uppercase">
                    Documents Needed:
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Photo ID (Driver's License)</li>
                    <li>• Social Security Card</li>
                    <li>• W-2 or 1099 forms</li>
                    <li>• Last year's tax return</li>
                    <li>• Bank account info</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/supersonic-fast-cash/apply"
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-center font-black rounded-xl hover:from-red-700 hover:to-red-800 uppercase shadow-lg hover:shadow-red-500/50 transition-all"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/upload-documents"
                    className="px-4 py-4 bg-white border-2 border-red-600 text-red-600 font-black rounded-xl hover:bg-red-50 transition-all"
                    title="Upload Documents"
                  >
                    📤
                  </Link>
                </div>
              </div>
            </div>

            {/* Professional Tax Prep */}
            <div className="group bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-900 hover:border-blue-950 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="text-7xl mb-4 relative z-10">👨‍💼</div>
                <h3 className="text-3xl font-black uppercase relative z-10">
                  Professional Tax Prep
                </h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      IRS-certified preparers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Maximum refund guaranteed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Online or in-person
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      All 50 states
                    </span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <div className="font-black text-blue-900 mb-2 text-sm uppercase">
                    Documents Needed:
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• All W-2s and 1099s</li>
                    <li>• Income statements</li>
                    <li>• Deduction receipts</li>
                    <li>• Investment statements</li>
                    <li>• Prior year return</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/supersonic-fast-cash/book-appointment"
                    className="flex-1 py-4 bg-gradient-to-r from-blue-900 to-blue-950 text-white text-center font-black rounded-xl hover:from-blue-950 hover:to-blue-900 uppercase shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/upload-documents"
                    className="px-4 py-4 bg-white border-2 border-blue-900 text-blue-900 font-black rounded-xl hover:bg-blue-50 transition-all"
                    title="Upload Documents"
                  >
                    📤
                  </Link>
                </div>
              </div>
            </div>

            {/* DIY Self-Prep */}
            <div className="group bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-green-600 hover:border-green-700 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="text-7xl mb-4 relative z-10">💻</div>
                <h3 className="text-3xl font-black uppercase relative z-10">
                  DIY Self-Prep
                </h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      File your own taxes online
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Easy step-by-step wizard
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      Free for simple returns
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg font-semibold text-gray-700">
                      E-file directly to IRS
                    </span>
                  </li>
                </ul>
                <Link
                  href="/supersonic-fast-cash/diy-taxes"
                  className="block w-full py-5 bg-gradient-to-r from-green-600 to-green-700 text-white text-center font-black rounded-xl hover:from-green-700 hover:to-green-800 uppercase shadow-lg hover:shadow-green-500/50 transition-all text-lg"
                >
                  Start Filing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools & Pages */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">
              All Features & Tools
            </h2>
            <p className="text-xl text-gray-600 font-semibold">
              Everything you need for a smooth tax experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Link
              href="/supersonic-fast-cash/calculator"
              className="group p-8 bg-white border-2 border-blue-900 rounded-2xl hover:shadow-2xl hover:border-blue-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">🧮</div>
              <h3 className="font-black text-xl mb-2 text-blue-900 group-hover:text-blue-700">
                Refund Calculator
              </h3>
              <p className="text-gray-600">Estimate your refund amount</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/tools/refund-tracker"
              className="group p-8 bg-white border-2 border-red-600 rounded-2xl hover:shadow-2xl hover:border-red-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">📍</div>
              <h3 className="font-black text-xl mb-2 text-red-600 group-hover:text-red-700">
                Track Refund
              </h3>
              <p className="text-gray-600">Check IRS status live</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/upload-documents"
              className="group p-8 bg-white border-2 border-blue-900 rounded-2xl hover:shadow-2xl hover:border-blue-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">📤</div>
              <h3 className="font-black text-xl mb-2 text-blue-900 group-hover:text-blue-700">
                Upload Documents
              </h3>
              <p className="text-gray-600">Secure document portal</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/portal"
              className="group p-8 bg-white border-2 border-red-600 rounded-2xl hover:shadow-2xl hover:border-red-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">👤</div>
              <h3 className="font-black text-xl mb-2 text-red-600 group-hover:text-red-700">
                Customer Portal
              </h3>
              <p className="text-gray-600">Track your application</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/pricing"
              className="group p-8 bg-white border-2 border-green-600 rounded-2xl hover:shadow-2xl hover:border-green-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">💲</div>
              <h3 className="font-black text-xl mb-2 text-green-600 group-hover:text-green-700">
                Pricing
              </h3>
              <p className="text-gray-600">Transparent, upfront fees</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/locations"
              className="group p-8 bg-white border-2 border-blue-900 rounded-2xl hover:shadow-2xl hover:border-blue-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="font-black text-xl mb-2 text-blue-900 group-hover:text-blue-700">
                Locations
              </h3>
              <p className="text-gray-600">Indianapolis offices</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/how-it-works"
              className="group p-8 bg-white border-2 border-red-600 rounded-2xl hover:shadow-2xl hover:border-red-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">❓</div>
              <h3 className="font-black text-xl mb-2 text-red-600 group-hover:text-red-700">
                How It Works
              </h3>
              <p className="text-gray-600">Simple 3-step process</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="group p-8 bg-white border-2 border-green-600 rounded-2xl hover:shadow-2xl hover:border-green-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="font-black text-xl mb-2 text-green-600 group-hover:text-green-700">
                Book Appointment
              </h3>
              <p className="text-gray-600">Schedule your visit</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/careers"
              className="group p-8 bg-white border-2 border-blue-900 rounded-2xl hover:shadow-2xl hover:border-blue-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="font-black text-xl mb-2 text-blue-900 group-hover:text-blue-700">
                Careers
              </h3>
              <p className="text-gray-600">Join our team</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/sub-office-agreement"
              className="group p-8 bg-white border-2 border-red-600 rounded-2xl hover:shadow-2xl hover:border-red-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="font-black text-xl mb-2 text-red-600 group-hover:text-red-700">
                Sub-Office Program
              </h3>
              <p className="text-gray-600">Partner with us</p>
            </Link>

            <Link
              href="/dashboard/tax-intake"
              className="group p-8 bg-white border-2 border-purple-600 rounded-2xl hover:shadow-2xl hover:border-purple-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="font-black text-xl mb-2 text-purple-600 group-hover:text-purple-700">
                Staff Dashboard
              </h3>
              <p className="text-gray-600">DIY intake management</p>
            </Link>

            <Link
              href="/dashboard/sub-offices"
              className="group p-8 bg-white border-2 border-orange-600 rounded-2xl hover:shadow-2xl hover:border-orange-700 transition-all transform hover:scale-105"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-black text-xl mb-2 text-orange-600 group-hover:text-orange-700">
                Sub-Office Dashboard
              </h3>
              <p className="text-gray-600">Performance tracking</p>
            </Link>
          </div>

          {/* Staff Resources */}
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-900 rounded-2xl">
            <h3 className="font-black text-2xl mb-6 text-blue-900 uppercase">
              Staff Training & Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/supersonic-fast-cash/careers/training"
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="text-3xl">📚</div>
                <div>
                  <div className="font-bold text-blue-900 group-hover:text-blue-700">
                    Tax Preparer Training
                  </div>
                  <div className="text-sm text-gray-600">
                    Complete certification course
                  </div>
                </div>
              </Link>
              <Link
                href="/supersonic-fast-cash/careers/competency-test"
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="text-3xl">✅</div>
                <div>
                  <div className="font-bold text-blue-900 group-hover:text-blue-700">
                    Competency Test
                  </div>
                  <div className="text-sm text-gray-600">
                    Verify your skills
                  </div>
                </div>
              </Link>
              <Link
                href="/supersonic-fast-cash/admin/client-intake"
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="text-3xl">📋</div>
                <div>
                  <div className="font-bold text-blue-900 group-hover:text-blue-700">
                    Client Intake System
                  </div>
                  <div className="text-sm text-gray-600">
                    Process new clients
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6 uppercase">
            Ready to Get Your Money?
          </h2>
          <p className="text-2xl mb-8">
            Join thousands who got their refund in minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="px-12 py-6 bg-white text-red-600 text-2xl font-black rounded-lg hover:bg-gray-100 uppercase"
            >
              Apply Now →
            </Link>
            <a
              href="tel:+13173143757"
              className="px-12 py-6 bg-blue-900 text-white text-2xl font-black rounded-lg hover:bg-blue-800 uppercase"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/supersonic-fast-cash/apply">
                    Tax Refund Advance
                  </Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/services">
                    Professional Tax Prep
                  </Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/diy-taxes">
                    DIY Self-Prep
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/supersonic-fast-cash/calculator">
                    Refund Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/tools/refund-tracker">
                    Track Refund
                  </Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/upload-documents">
                    Upload Documents
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/supersonic-fast-cash/locations">Locations</Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/supersonic-fast-cash/careers">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📞 (317) 314-3757</li>
                <li>✉️ supersonicfastcash@gmail.com</li>
                <li>📍 Indianapolis, IN</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>
              © 2025 Supersonic Fast Cash. Powered by EPS Financial & Pathward
              Bank.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

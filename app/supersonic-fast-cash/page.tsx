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
    <div className="min-h-screen bg-white">
      {/* Header - Red/White/Blue */}
      <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/supersonic-fast-cash"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black uppercase">
                Supersonic Fast Cash
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 font-bold hover:text-red-500">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 bg-white text-gray-900 shadow-xl rounded-lg p-4 hidden group-hover:block w-64">
                  <Link
                    href="/supersonic-fast-cash/apply"
                    className="block py-2 hover:text-red-600"
                  >
                    Tax Refund Advance
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/services"
                    className="block py-2 hover:text-red-600"
                  >
                    Professional Tax Prep
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/diy-taxes"
                    className="block py-2 hover:text-red-600"
                  >
                    DIY Self-Prep
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 font-bold hover:text-red-500">
                  Tools <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 bg-white text-gray-900 shadow-xl rounded-lg p-4 hidden group-hover:block w-64">
                  <Link
                    href="/supersonic-fast-cash/calculator"
                    className="block py-2 hover:text-red-600"
                  >
                    Refund Calculator
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/tools/refund-tracker"
                    className="block py-2 hover:text-red-600"
                  >
                    Track Refund
                  </Link>
                  <Link
                    href="/supersonic-fast-cash/upload-documents"
                    className="block py-2 hover:text-red-600"
                  >
                    Upload Documents
                  </Link>
                </div>
              </div>

              <Link
                href="/supersonic-fast-cash/pricing"
                className="font-bold hover:text-red-500"
              >
                Pricing
              </Link>
              <Link
                href="/supersonic-fast-cash/locations"
                className="font-bold hover:text-red-500"
              >
                Locations
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a href="tel:+13173143757" className="hidden sm:block font-bold">
                📞 (317) 314-3757
              </a>
              <Link
                href="/supersonic-fast-cash/apply"
                className="px-6 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 uppercase"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Marketing Focus */}
      <section className="bg-gradient-to-r from-blue-900 via-red-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">
              Get Your Tax Refund
              <span className="block text-red-500">TODAY!</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8">
              Up to $7,500 in Just 15 Minutes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/supersonic-fast-cash/apply"
                className="px-12 py-6 bg-red-600 text-white text-2xl font-black rounded-lg hover:bg-red-700 shadow-2xl uppercase"
              >
                💵 Get Cash Now
              </Link>
              <Link
                href="/supersonic-fast-cash/diy-taxes"
                className="px-12 py-6 bg-white text-blue-900 text-2xl font-black rounded-lg hover:bg-gray-100 shadow-2xl uppercase"
              >
                📝 File Yourself
              </Link>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
              <div className="text-5xl mb-3">💵</div>
              <div className="font-bold text-xl">Up to $7,500</div>
              <div className="text-sm">Same-day cash</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
              <div className="text-5xl mb-3">⚡</div>
              <div className="font-bold text-xl">15 Minutes</div>
              <div className="text-sm">Fast approval</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
              <div className="text-5xl mb-3">✅</div>
              <div className="font-bold text-xl">No Credit Check</div>
              <div className="text-sm">Everyone approved</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg text-center">
              <div className="text-5xl mb-3">🏦</div>
              <div className="font-bold text-xl">FDIC Insured</div>
              <div className="text-sm">Safe & secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed EA Credentials Banner */}
      <section className="py-8 bg-white border-y-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-4">
              <Shield className="w-16 h-16 text-red-600" />
              <div>
                <div className="text-2xl font-black text-blue-900">
                  Licensed Enrolled Agent
                </div>
                <div className="text-gray-600">
                  IRS-Authorized Tax Professional
                </div>
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-900 mb-2">
                Full IRS Representation Rights
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                <span>✅ Audit Defense</span>
                <span>✅ Appeals</span>
                <span>✅ Collections</span>
                <span>✅ Tax Court</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services - Marketing Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 uppercase">
            Choose Your Service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tax Refund Advance */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-4 border-red-600">
              <div className="bg-red-600 text-white p-6 text-center">
                <div className="text-6xl mb-3">💰</div>
                <h3 className="text-2xl font-black uppercase">
                  Tax Refund Advance
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>Up to $7,500 cash today</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>15-minute approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>No credit check needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>Free tax preparation included</span>
                  </li>
                </ul>
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="block w-full py-4 bg-red-600 text-white text-center font-black rounded-lg hover:bg-red-700 uppercase"
                >
                  Apply Now →
                </Link>
              </div>
            </div>

            {/* Professional Tax Prep */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-4 border-blue-900">
              <div className="bg-blue-900 text-white p-6 text-center">
                <div className="text-6xl mb-3">👨‍💼</div>
                <h3 className="text-2xl font-black uppercase">
                  Professional Tax Prep
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                    <span>IRS-certified preparers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                    <span>Maximum refund guaranteed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                    <span>Online or in-person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                    <span>All 50 states</span>
                  </li>
                </ul>
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="block w-full py-4 bg-blue-900 text-white text-center font-black rounded-lg hover:bg-blue-800 uppercase"
                >
                  Book Appointment →
                </Link>
              </div>
            </div>

            {/* DIY Self-Prep */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-4 border-red-600">
              <div className="bg-red-600 text-white p-6 text-center">
                <div className="text-6xl mb-3">💻</div>
                <h3 className="text-2xl font-black uppercase">DIY Self-Prep</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>File your own taxes online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>Easy step-by-step wizard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>Free for simple returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span>E-file directly to IRS</span>
                  </li>
                </ul>
                <Link
                  href="/supersonic-fast-cash/diy-taxes"
                  className="block w-full py-4 bg-red-600 text-white text-center font-black rounded-lg hover:bg-red-700 uppercase"
                >
                  Start Filing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools & Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 uppercase">
            All Features & Tools
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/supersonic-fast-cash/calculator"
              className="p-6 bg-blue-50 border-2 border-blue-900 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">🧮</div>
              <h3 className="font-bold text-lg mb-2">Refund Calculator</h3>
              <p className="text-sm text-gray-600">Estimate your refund</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/tools/refund-tracker"
              className="p-6 bg-red-50 border-2 border-red-600 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold text-lg mb-2">Track Refund</h3>
              <p className="text-sm text-gray-600">Check IRS status</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/upload-documents"
              className="p-6 bg-blue-50 border-2 border-blue-900 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-bold text-lg mb-2">Upload Documents</h3>
              <p className="text-sm text-gray-600">Secure document portal</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/portal"
              className="p-6 bg-red-50 border-2 border-red-600 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">👤</div>
              <h3 className="font-bold text-lg mb-2">Customer Portal</h3>
              <p className="text-sm text-gray-600">Track your status</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/pricing"
              className="p-6 bg-blue-50 border-2 border-blue-900 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">💲</div>
              <h3 className="font-bold text-lg mb-2">Pricing</h3>
              <p className="text-sm text-gray-600">Transparent fees</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/locations"
              className="p-6 bg-red-50 border-2 border-red-600 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-bold text-lg mb-2">Locations</h3>
              <p className="text-sm text-gray-600">Indianapolis offices</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/how-it-works"
              className="p-6 bg-blue-50 border-2 border-blue-900 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">❓</div>
              <h3 className="font-bold text-lg mb-2">How It Works</h3>
              <p className="text-sm text-gray-600">Simple 3-step process</p>
            </Link>

            <Link
              href="/supersonic-fast-cash/careers"
              className="p-6 bg-red-50 border-2 border-red-600 rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-bold text-lg mb-2">Careers</h3>
              <p className="text-sm text-gray-600">Join our team</p>
            </Link>
          </div>

          {/* Training Links (for staff) */}
          <div className="mt-12 p-6 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Staff Training & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/supersonic-fast-cash/careers/training"
                className="text-blue-900 hover:underline"
              >
                Tax Preparer Training
              </Link>
              <Link
                href="/supersonic-fast-cash/careers/competency-test"
                className="text-blue-900 hover:underline"
              >
                Competency Test
              </Link>
              <Link
                href="/supersonic-fast-cash/admin/client-intake"
                className="text-blue-900 hover:underline"
              >
                Client Intake System
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

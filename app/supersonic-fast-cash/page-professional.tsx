import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Shield,
  Clock,
  Users,
  Award,
  FileText,
  Calendar,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Tax Preparation Services | Supersonic Fast Cash',
  description:
    'Expert tax preparation and refund advance services in Indianapolis. IRS-certified preparers, secure filing, and personalized service. Serving all 50 states.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
  },
};

export default function SupersonicFastCashPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero - Clean & Trustworthy */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] bg-repeat" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">
                  IRS Certified • EFIN 358459
                </span>
              </div>

              {/* Professional Headline */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Professional Tax Preparation You Can Trust
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Expert tax services with personalized attention. Get your
                maximum refund with confidence.
              </p>

              {/* Key Benefits - Professional */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">IRS-Certified Preparers</div>
                    <div className="text-blue-200 text-sm">
                      Licensed professionals with years of experience
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">
                      Maximum Refund Guarantee
                    </div>
                    <div className="text-blue-200 text-sm">
                      We find every deduction and credit you deserve
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Secure & Confidential</div>
                    <div className="text-blue-200 text-sm">
                      Bank-level encryption and data protection
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Appointment
                </Link>
                <Link
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors border-2 border-blue-500"
                >
                  <Phone className="w-5 h-5" />
                  (317) 314-3757
                </Link>
              </div>
            </div>

            {/* Professional Image/Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      15+ Years Experience
                    </div>
                    <div className="text-blue-200">
                      Trusted by thousands of clients
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      Personalized Service
                    </div>
                    <div className="text-blue-200">
                      One-on-one attention for your unique situation
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Fast & Accurate</div>
                    <div className="text-blue-200">
                      Quick turnaround without sacrificing quality
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Professional */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tax solutions for individuals and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Individual Tax Preparation
              </h3>
              <p className="text-gray-600 mb-4">
                Personal tax returns filed accurately and on time. We handle
                simple to complex situations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  W-2 and 1099 income
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Itemized deductions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Investment income
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Refund Advance
              </h3>
              <p className="text-gray-600 mb-4">
                Get your refund faster with our advance program. No credit check
                required.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Up to $7,500 available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Same-day funding
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Simple approval process
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Business Tax Services
              </h3>
              <p className="text-gray-600 mb-4">
                Complete business tax solutions including bookkeeping and
                quarterly filings.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  LLC, S-Corp, C-Corp
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Quarterly estimates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Payroll services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Professional */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to excellence and accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Years in Business</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Returns Filed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50</div>
              <div className="text-gray-600">States Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Professional */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule your appointment today and experience professional tax
            service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
            <Link
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

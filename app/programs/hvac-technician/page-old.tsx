import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HVAC Technician Training | Elevate For Humanity',
  description:
    'Start your HVAC technician career with free training. AI-powered learning, hands-on practice, and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/hvac-technician',
  },
};

export default function HvacTechnicianPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source
            src="/videos/heroes/programs/trades/hero-program-hvac.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                HVAC Technician Training
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 drop-shadow-lg">
                Earn $45K-$65K installing and repairing heating, cooling, and
                ventilation systems. Complete training in 8-12 weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
                >
                  Apply for Free Training
                </Link>
                <Link
                  href="/checkout/prog-hvac-technician"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-2xl"
                >
                  Pay with Affirm - $5,000
                </Link>
              </div>
              <p className="text-sm text-white/90 mt-4 drop-shadow">
                Choose free government-funded training OR pay $5,000 with
                flexible payment plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">
                8-12 Weeks
              </div>
              <div className="text-sm text-slate-600">Complete Training</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">$45K-$65K</div>
              <div className="text-sm text-slate-600">Starting Salary</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">
                High Demand
              </div>
              <div className="text-sm text-slate-600">1000+ Jobs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">100% FREE</div>
              <div className="text-sm text-slate-600">Government Funded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights - 3 Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              HVAC Training Highlights
            </h2>
            <p className="text-xl text-slate-600">
              Hands-on training with industry-standard equipment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/media/programs/hvac-highlight-1.jpg"
                alt="HVAC training - Professional equipment"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/media/programs/hvac-highlight-2.jpg"
                alt="HVAC training - Hands-on practice"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/media/programs/hvac-highlight-3.jpg"
                alt="HVAC training - Real-world scenarios"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Credentials Section */}
          <div className="bg-blue-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Industry-Recognized Credentials Included
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  Residential HVAC Certification 1
                </h4>
                <p className="text-sm text-slate-600">
                  Industry-Recognized Certification
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  Residential HVAC Certification 2
                </h4>
                <p className="text-sm text-slate-600">
                  Refrigeration Diagnostics
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">OSHA 30</h4>
                <p className="text-sm text-slate-600">Safety Certification</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  CPR Certification
                </h4>
                <p className="text-sm text-slate-600">Emergency Response</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  Rise Up Certificate
                </h4>
                <p className="text-sm text-slate-600">Career Readiness</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  EPA Certification
                </h4>
                <p className="text-sm text-slate-600">
                  Refrigerant Handling (Prep)
                </p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-slate-900 text-white rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Two Ways to Enroll
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-xl font-bold text-green-400 mb-4">
                  Option 1: Free Training
                </h4>
                <p className="mb-4">
                  100% government-funded through WIOA, Workforce Ready Grant, or
                  employer sponsorship.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li>✓ $0 out of pocket</li>
                  <li>✓ Must qualify for workforce funding</li>
                  <li>✓ Apply through WorkOne or Indiana Career Connect</li>
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                >
                  Apply for Free Training
                </Link>
              </div>
              <div className="border-2 border-blue-500 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-400 mb-4">
                  Option 2: Pay with Affirm
                </h4>
                <p className="mb-4">
                  Start immediately with flexible payment plans. No waiting for
                  funding approval.
                </p>
                <div className="text-3xl font-bold mb-2">$5,000</div>
                <p className="text-sm mb-4">As low as $417/month with Affirm</p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li>✓ Flexible 3, 6, or 12-month plans</li>
                  <li>✓ Start training immediately</li>
                  <li>✓ Secure checkout with Stripe</li>
                </ul>
                <Link
                  href="/checkout/prog-hvac-technician"
                  className="block text-center px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                >
                  Enroll Now - $5,000
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">
              Professional Responsibilities
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Install & Repair Systems
                  </div>
                  <div className="text-slate-600">
                    Install, maintain, and repair heating, ventilation, and air
                    conditioning systems in homes and businesses
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Diagnose Problems
                  </div>
                  <div className="text-slate-600">
                    Use diagnostic tools to identify issues with HVAC equipment
                    and recommend solutions
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Preventive Maintenance
                  </div>
                  <div className="text-slate-600">
                    Perform routine maintenance to keep systems running
                    efficiently and prevent breakdowns
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Customer Service
                  </div>
                  <div className="text-slate-600">
                    Work directly with customers to explain repairs, provide
                    estimates, and ensure satisfaction
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg mb-8">
              <h3 className="font-bold text-slate-900 mb-4 text-xl">
                Career Opportunities:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li>
                  • <strong>Residential HVAC Technician</strong> - Service homes
                  and apartments ($45K-$55K)
                </li>
                <li>
                  • <strong>Commercial HVAC Technician</strong> - Work on large
                  buildings ($50K-$65K)
                </li>
                <li>
                  • <strong>HVAC Installer</strong> - Install new systems in
                  construction ($48K-$60K)
                </li>
                <li>
                  • <strong>Service Manager</strong> - Lead teams and manage
                  operations ($60K-$80K)
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block px-10 py-5 text-xl bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Learning */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Personal AI Instructor
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Never feel stuck or alone. Get instant help, personalized
              guidance, and encouragement 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Available 24/7
              </h3>
              <p className="text-slate-600">
                Questions at 2am? Your AI instructor is always awake and ready
                to help you succeed
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Personalized Learning
              </h3>
              <p className="text-slate-600">
                Learn at your own pace with a curriculum that adapts to your
                needs and progress
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Instant Feedback
              </h3>
              <p className="text-slate-600">
                Get immediate answers, corrections, and encouragement to keep
                you moving forward
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-slate-600">
              Four simple steps to your new career
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Apply Free
              </h3>
              <p className="text-slate-600">
                Simple 5-minute application. No experience needed. Get accepted
                in 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Learn Online
              </h3>
              <p className="text-slate-600">
                Self-paced video lessons with AI instructor support available
                24/7.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Hands-On Practice
              </h3>
              <p className="text-slate-600">
                Real equipment and tools at local training facilities with
                expert supervision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Get Hired
              </h3>
              <p className="text-slate-600">
                Earn your credential and get job placement support to start your
                career.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              Start Step 1 - Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Start your career"
          fill
          className="object-cover"
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-2xl text-white mb-8">
            Join students learning hvac technician with free training and AI
            support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-12 py-6 bg-orange-500 text-white text-2xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/contact"
              className="inline-block px-12 py-6 bg-white text-slate-900 text-2xl font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl"
            >
              Questions? Contact Us
            </Link>
          </div>
          <p className="text-white mt-6 text-lg">
            Application takes 5 minutes • Get started today • Call 317-314-3757
          </p>
        </div>
      </section>
    </main>
  );
}

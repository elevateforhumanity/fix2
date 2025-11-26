import Link from 'next/link';
import { CheckCircle, Clock, Award, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "HVAC Technician | Elevate for Humanity",
  description: "Career training and workforce development programs.",
  openGraph: {
    title: "Program | Elevate for Humanity",
    description: "Career training and workforce development programs.",
    images: ["/images/programs-new/program-12.jpg"],
    type: "website",
  },
};

export default function HVACTechPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate for Humanity
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/programs"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            All Programs
          </Link>
          <Link href="/enroll" className="elevate-btn-primary">
            Enroll Now
          </Link>
        </div>
      </header>
      {/* Hero */}
      <section className="elevate-gradient-red-orange border-b border-white/10">
        <div className="elevate-container py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="elevate-badge elevate-badge-blue">
                  ETPL Approved
                </span>
                <span className="elevate-badge elevate-badge-purple">
                  640 Hours
                </span>
                <span className="elevate-badge elevate-badge-green">
                  High Demand
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                HVAC Technician
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Master HVAC systems with comprehensive 640-hour training program
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/enroll?program=hvac"
                  className="elevate-btn-primary bg-white text-red-600 hover:bg-gray-100"
                >
                  Start Enrollment
                </Link>
                <Link
                  href="/programs"
                  className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
                >
                  View All Programs
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>640 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>EPA 608 Cert</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>$45K-$65K salary</span>
                </div>
              </div>
            </div>
            <div className="elevate-card bg-white">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-semibold">Program Video</p>
                  <p className="text-gray-500 text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Program Overview
            </h2>
            <div className="elevate-card mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our HVAC Technician program provides comprehensive training in
                heating, ventilation, air conditioning, and refrigeration
                systems. You'll learn installation, maintenance, repair, and
                troubleshooting of residential and commercial HVAC equipment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                HVAC technicians are in high demand across Indiana and
                nationwide. This ETPL-approved program prepares you for EPA 608
                certification and immediate employment in a growing industry.
                100% free for WIOA-eligible participants.
              </p>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'HVAC fundamentals and theory',
                'Electrical systems and wiring',
                'Refrigeration cycles and principles',
                'EPA 608 certification prep',
                'System installation procedures',
                'Troubleshooting and diagnostics',
                'Preventive maintenance',
                'Safety protocols and OSHA standards',
                'Ductwork design and installation',
                'Heat pump systems',
                'Commercial HVAC systems',
                'Customer service and communication',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 elevate-card"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Career Opportunities
            </h3>
            <div className="elevate-card mb-8">
              <p className="text-gray-700 mb-4">
                HVAC technicians work in various settings:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>
                    <strong>Residential HVAC:</strong> Home installation and
                    repair
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>
                    <strong>Commercial HVAC:</strong> Large building systems
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>
                    <strong>Industrial HVAC:</strong> Manufacturing and
                    facilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>
                    <strong>Self-employment:</strong> Start your own HVAC
                    business
                  </span>
                </li>
              </ul>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Certifications Earned
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="elevate-card bg-red-50 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2">
                  EPA 608 Certification
                </h4>
                <p className="text-gray-700 text-sm">
                  Required federal certification for handling refrigerants.
                  Covers Type I, II, III, and Universal.
                </p>
              </div>
              <div className="elevate-card bg-green-50 border-2 border-green-200">
                <h4 className="font-bold text-gray-900 mb-2">
                  OSHA 10-Hour Safety
                </h4>
                <p className="text-gray-700 text-sm">
                  Workplace safety certification covering construction safety
                  and health hazards.
                </p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Program Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Duration</h4>
                <p className="text-gray-700">640 hours (16-20 weeks)</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Certification</h4>
                <p className="text-gray-700">EPA 608, OSHA 10</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Cost</h4>
                <p className="text-gray-700">100% FREE with WIOA funding</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">
                  Starting Salary
                </h4>
                <p className="text-gray-700">$45,000 - $65,000 per year</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Job Outlook</h4>
                <p className="text-gray-700">
                  15% growth (much faster than average)
                </p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Funding</h4>
                <p className="text-gray-700">WIOA, WRG-style, Youth, Reentry</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="elevate-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your HVAC Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a high-demand industry with excellent job security and growth
            potential.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/enroll?program=hvac" className="elevate-btn-primary">
              Check Your Eligibility
            </Link>
            <Link href="/programs" className="elevate-btn-secondary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

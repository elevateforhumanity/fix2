import Link from 'next/link';
import { CheckCircle, Clock, Award, TrendingUp } from 'lucide-react';
import { VideoShell } from '@/components/VideoShell';

export const metadata = {
  title: 'CDL Truck Driving | Elevate for Humanity',
  description: 'Professional truck driver training leading to Class A Commercial Driver License. WIOA-funded, 160 hours, $50K-$65K starting salary.',
};

export default function TruckDrivingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">Elevate Connects Directory</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">
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
                <span className="elevate-badge elevate-badge-blue">WIOA Approved</span>
                <span className="elevate-badge elevate-badge-purple">160 Hours</span>
                <span className="elevate-badge elevate-badge-green">High Demand</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                CDL Truck Driving
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Professional truck driver training leading to Class A Commercial Driver License
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/enroll?program=truck-driving" className="elevate-btn-primary bg-white text-red-600 hover:bg-gray-100">
                  Start Enrollment
                </Link>
                <Link href="/programs" className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20">
                  View All Programs
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>160 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>Class A CDL</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>$50K-$65K salary</span>
                </div>
              </div>
            </div>
            <div className="elevate-card bg-white">
              <VideoShell
                src="https://player.vimeo.com/video/273947191"
                title="CDL Truck Driving Program"
                caption="Professional truck driver training leading to Class A CDL"
                layout="horizontal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Overview</h2>
            <div className="elevate-card mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our CDL Truck Driving program provides comprehensive training to prepare you for a 
                career as a professional truck driver. You'll learn vehicle operation, safety procedures, 
                DOT regulations, and earn your Class A Commercial Driver's License.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The trucking industry is experiencing a nationwide driver shortage, creating excellent 
                job opportunities with competitive salaries and benefits. This WIOA-approved program 
                is 100% free for eligible participants.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Vehicle inspection and maintenance',
                'Safe driving techniques',
                'DOT regulations and compliance',
                'Hours of service requirements',
                'Cargo handling and securement',
                'Defensive driving strategies',
                'Pre-trip and post-trip procedures',
                'Electronic logging devices (ELD)',
                'Backing and maneuvering',
                'Highway and city driving',
                'Weather and road conditions',
                'CDL skills test preparation',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 elevate-card">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Opportunities</h3>
            <div className="elevate-card mb-8">
              <p className="text-gray-700 mb-4">
                CDL holders are in high demand across multiple industries:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Long-haul trucking:</strong> Interstate freight transportation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Local delivery:</strong> Regional and city routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Specialized transport:</strong> Hazmat, tanker, refrigerated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Owner-operator:</strong> Start your own trucking business</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Duration</h4>
                <p className="text-gray-700">160 hours (4-6 weeks full-time)</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Certification</h4>
                <p className="text-gray-700">Class A Commercial Driver's License</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Cost</h4>
                <p className="text-gray-700">100% FREE with WIOA funding</p>
              </div>
              <div className="elevate-card">
                <h4 className="font-bold text-gray-900 mb-2">Starting Salary</h4>
                <p className="text-gray-700">$50,000 - $65,000 per year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="elevate-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Trucking Career?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Americans who have launched successful careers through FREE WIOA-funded training.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/enroll?program=truck-driving" className="elevate-btn-primary">
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

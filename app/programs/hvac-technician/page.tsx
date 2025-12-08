import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hvac Technician Training | Elevate For Humanity',
  description: 'Start your hvac technician career with free training. AI-powered learning, hands-on practice, and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/hvac-technician',
  },
};

export default function HvacTechnicianPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              filter: 'contrast(1.05) saturate(1.1) brightness(0.95)',
              imageRendering: 'high-quality'
            }}
          >
            <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-c913a513-dde0-4ac7-ae3c-53a453b8b83d.mp4?Expires=2080579938&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=bci4L0nUlydNRWrQZU2TXiuNiaTOtWFSTcwDsFXVD1wtGnIjTpHNtF4xoUqNXpgtu3-WdWous6RTH8nkZl4RVvTmNjsWfY--5~x3WnC4QuYxep5iI0eEKuN8WOTXJ5cWryEb7RMnGAIMb5~ir3RcAb7Iaztw9nSl5grVDQSq4WGT1VM~rOpGGxtGlGdy~lraTjHJIEe3BkmkV8Or6RWKUerH4pJ0YFqjtEcIXiBc3SI3Z8s00fo0T9SKd61VrbxkB2v8BVZaOSsNwB4Dp9hBoHHT74FCn5uAMl0-Cpy4Tr8iUH01Cp1Lc2dNKwtzUTy7tfw9V4IS94CtAiHPeMHzcw__" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                HVAC Technician Training
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 drop-shadow-lg">
                Earn $45K-$65K installing and repairing heating, cooling, and ventilation systems. Complete training in 8-12 weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
                >
                  Apply Now - It's Free
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/50 shadow-2xl"
                >
                  Questions? Contact Us
                </Link>
              </div>
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
              <div className="text-2xl font-bold text-slate-900">8-12 Weeks</div>
              <div className="text-sm text-slate-600">Complete Training</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">$45K-$65K</div>
              <div className="text-sm text-slate-600">Starting Salary</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">High Demand</div>
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

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                What You'll Do as an HVAC Technician
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Install & Repair Systems</div>
                    <div className="text-slate-600">Install, maintain, and repair heating, ventilation, and air conditioning systems in homes and businesses</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Diagnose Problems</div>
                    <div className="text-slate-600">Use diagnostic tools to identify issues with HVAC equipment and recommend solutions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Preventive Maintenance</div>
                    <div className="text-slate-600">Perform routine maintenance to keep systems running efficiently and prevent breakdowns</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Customer Service</div>
                    <div className="text-slate-600">Work directly with customers to explain repairs, provide estimates, and ensure satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-slate-900 mb-3">Career Opportunities:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Residential HVAC Technician</strong> - Service homes and apartments ($45K-$55K)</li>
                  <li>• <strong>Commercial HVAC Technician</strong> - Work on large buildings ($50K-$65K)</li>
                  <li>• <strong>HVAC Installer</strong> - Install new systems in construction ($48K-$60K)</li>
                  <li>• <strong>Service Manager</strong> - Lead teams and manage operations ($60K-$80K)</li>
                </ul>
              </div>
              <Link
                href="/apply"
                className="inline-block mt-8 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Career Today
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/media/programs/hvac-highlight-1.jpg"
                alt="HVAC Technician professional at work"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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
              Never feel stuck or alone. Get instant help, personalized guidance, and encouragement 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Available 24/7</h3>
              <p className="text-slate-600">
                Questions at 2am? Your AI instructor is always awake and ready to help you succeed
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Learning</h3>
              <p className="text-slate-600">
                Learn at your own pace with a curriculum that adapts to your needs and progress
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
              <p className="text-slate-600">
                Get immediate answers, corrections, and encouragement to keep you moving forward
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply Free</h3>
              <p className="text-slate-600">
                Simple 5-minute application. No experience needed. Get accepted in 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Learn Online</h3>
              <p className="text-slate-600">
                Self-paced video lessons with AI instructor support available 24/7.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hands-On Practice</h3>
              <p className="text-slate-600">
                Real equipment and tools at local training facilities with expert supervision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600">
                Earn your credential and get job placement support to start your career.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/apply"
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
            Join students learning hvac technician with free training and AI support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
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

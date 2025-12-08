import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rise Up Training | Elevate For Humanity',
  description: 'Start your rise up career with free training. AI-powered learning, hands-on practice, and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/rise-up',
  },
};

export default function RiseUpPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Rise Up Training"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Rise Up
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 drop-shadow-lg">
                Start your career with free training, AI-powered learning, and job placement support
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
              <div className="text-2xl font-bold text-slate-900">12-16 Weeks</div>
              <div className="text-sm text-slate-600">Flexible Schedule</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">100% FREE</div>
              <div className="text-sm text-slate-600">No Hidden Costs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">AI-Powered</div>
              <div className="text-sm text-slate-600">24/7 Support</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">Job Support</div>
              <div className="text-sm text-slate-600">Placement Help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Career */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Choose Rise Up?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">High Demand Career</div>
                    <div className="text-slate-600">Growing industry with thousands of job openings</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Good Income Potential</div>
                    <div className="text-slate-600">Competitive salary with room for growth</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">No Experience Required</div>
                    <div className="text-slate-600">We start from the basics and build your skills</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Career Stability</div>
                    <div className="text-slate-600">Essential skills that are always in demand</div>
                  </div>
                </div>
              </div>
              <Link
                href="/apply"
                className="inline-block mt-8 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Career Today
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Rise Up professional at work"
                fill
                className="object-cover"
                quality={100}
              
          sizes="100vw"
        />
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Learning */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
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
            Join students learning rise up with free training and AI support
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

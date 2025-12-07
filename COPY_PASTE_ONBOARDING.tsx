// COPY THIS ENTIRE FILE TO: /workspaces/fix2/app/onboarding/page.tsx

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Building2, GraduationCap, BookOpen, Video, FileText, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Welcome & Onboarding | Elevate For Humanity',
  description: 'Get started with your training journey. Complete orientation and learn how to use the platform.',
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user profile if logged in
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single();
    profile = data;

    // Redirect to role-specific onboarding
    if (profile?.role === 'student') {
      redirect('/onboarding/learner');
    } else if (profile?.role === 'program_holder') {
      redirect('/program-holder/onboarding');
    } else if (profile?.role === 'admin' || profile?.role === 'super_admin') {
      redirect('/admin/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - NO TEXT OVERLAY */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden bg-white">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Welcome to Elevate for Humanity"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Title Section - BELOW HERO */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Welcome to Elevate for Humanity
          </h1>
          <p className="text-xl sm:text-2xl text-slate-700 mb-6">
            Choose your path to get started with our platform and access free workforce training.
          </p>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Choose Your Path</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Path */}
            <Link href="/onboarding/learner" className="bg-white rounded-lg shadow-sm border p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <GraduationCap className="text-blue-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">I'm a Student</h3>
              <p className="text-slate-600 mb-6 text-center">
                Start your free training, access courses, and earn certifications.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Access 30+ training programs</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>100% free - no tuition</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Earn industry certifications</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Job placement assistance</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="inline-flex items-center text-blue-700 font-semibold">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </span>
              </div>
            </Link>

            {/* Program Holder Path */}
            <Link href="/program-holder/onboarding" className="bg-white rounded-lg shadow-sm border p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Building2 className="text-purple-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">I'm a Program Holder</h3>
              <p className="text-slate-600 mb-6 text-center">
                Manage students, track progress, and access reports for your organization.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Enroll and manage students</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Track student progress</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Generate compliance reports</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Access training resources</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="inline-flex items-center text-purple-700 font-semibold">
                  Learn More <ArrowRight className="ml-2" size={20} />
                </span>
              </div>
            </Link>

            {/* Partner/Employer Path */}
            <Link href="/onboarding/partner" className="bg-white rounded-lg shadow-sm border p-8 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Users className="text-orange-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">I'm a Partner/Employer</h3>
              <p className="text-slate-600 mb-6 text-center">
                Partner with us to train your workforce or hire our graduates.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Access trained candidates</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Custom training programs</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Workforce development</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Partnership opportunities</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="inline-flex items-center text-orange-700 font-semibold">
                  Partner With Us <ArrowRight className="ml-2" size={20} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Sign Up</h3>
              <p className="text-slate-600 text-sm">Create your free account and complete your profile</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Choose Program</h3>
              <p className="text-slate-600 text-sm">Select from 30+ career training programs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Complete Training</h3>
              <p className="text-slate-600 text-sm">Learn at your own pace with expert support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Get Hired</h3>
              <p className="text-slate-600 text-sm">Earn certification and start your career</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Resources & Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="text-blue-700" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Video Tutorials</h3>
              <p className="text-slate-600 text-sm mb-4">
                Watch step-by-step guides on using the platform and accessing features.
              </p>
              <Link href="/training" className="text-blue-700 font-semibold text-sm hover:underline">
                Watch Videos →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-purple-700" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">User Guides</h3>
              <p className="text-slate-600 text-sm mb-4">
                Read detailed documentation on all platform features and tools.
              </p>
              <Link href="/docs" className="text-purple-700 font-semibold text-sm hover:underline">
                View Guides →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-orange-700" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">FAQ</h3>
              <p className="text-slate-600 text-sm mb-4">
                Find answers to common questions about programs and enrollment.
              </p>
              <Link href="/faq" className="text-orange-700 font-semibold text-sm hover:underline">
                View FAQ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have launched successful careers through our free training programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg transition-all">
              Sign Up Now
            </Link>
            <Link href="/programs" className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg transition-all">
              Browse Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

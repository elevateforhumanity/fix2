'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, GraduationCap, Briefcase, Building2, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <main className="bg-white">
      {/* 1. VIDEO HERO - Above the Fold */}
      <section className="relative overflow-hidden">
        {!videoError ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              preload="auto"
              muted={true}
              className="w-full h-auto"
              style={{ display: 'block', maxHeight: '600px', objectFit: 'cover' }}
              onError={() => setVideoError(true)}
              poster="/images/video-poster.jpg"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
            </video>

            {/* Unmute Button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition z-10"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </>
        ) : (
          // Fallback if video fails
          <div className="relative h-[400px] bg-slate-900">
            <Image
              src="/images/video-poster.jpg"
              alt="Elevate for Humanity"
              fill
              className="object-cover opacity-60"
            />
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                We See Your Potential, Not Your Past
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                100% Free Training • No Student Debt
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link
                  href="/apply"
                  className="inline-block px-8 py-4 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition text-lg shadow-lg"
                >
                  Apply Now
                </Link>
                <Link
                  href="/programs"
                  className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition text-lg shadow-lg"
                >
                  Explore Programs
                </Link>
              </div>
              <p className="text-sm text-white/80">
                Funded through WIOA, WRG, JRI, Apprenticeships & Employer Sponsorships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF BAR */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-brand-green-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">DOL Registered</p>
              <p className="text-xs text-slate-600">Apprenticeship</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-brand-green-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">WIOA / ETPL</p>
              <p className="text-xs text-slate-600">Approved</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-brand-green-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">State Workforce</p>
              <p className="text-xs text-slate-600">Partners</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-brand-green-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Employer-Led</p>
              <p className="text-xs text-slate-600">Training</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-brand-green-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Earn While</p>
              <p className="text-xs text-slate-600">You Learn</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROLE ROUTING - Critical */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-brand-orange-600 hover:shadow-lg transition">
              <GraduationCap className="w-12 h-12 text-brand-orange-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Students</h3>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Start a career</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Get funded training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Earn certifications</span>
                </li>
              </ul>
              <Link
                href="/apply"
                className="block w-full text-center px-6 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
              >
                Apply for Training
              </Link>
            </div>

            {/* Employers */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-brand-blue-600 hover:shadow-lg transition">
              <Briefcase className="w-12 h-12 text-brand-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Employers</h3>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Hire talent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Host apprentices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Reduce turnover</span>
                </li>
              </ul>
              <Link
                href="/employers"
                className="block w-full text-center px-6 py-3 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 transition"
              >
                Partner With Us
              </Link>
            </div>

            {/* Agencies & Schools */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-brand-green-600 hover:shadow-lg transition">
              <Building2 className="w-12 h-12 text-brand-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Agencies & Schools</h3>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>License platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Deliver funded programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Workforce reporting</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-brand-green-600 text-white font-bold rounded-lg hover:bg-brand-green-700 transition"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-brand-orange-100 text-brand-orange-600 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Apply</h3>
                <p className="text-slate-700">2–3 minutes online application</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-brand-orange-100 text-brand-orange-600 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Meet with WorkOne / Case Manager</h3>
                <p className="text-slate-700">Confirm eligibility and funding options</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-brand-orange-100 text-brand-orange-600 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">We confirm funding + start date</h3>
                <p className="text-slate-700">Begin your training and career path</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 text-center mt-8">
            Indiana applicants schedule through{' '}
            <a href="https://www.indianacareerconnect.com" className="text-brand-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              IndianaCareerConnect
            </a>
          </p>
        </div>
      </section>

      {/* 5. PROGRAM HIGHLIGHTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured Programs
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Curated training programs with strong employer demand
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Program 1 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Barber Apprenticeship</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-semibold rounded-full">
                  Hybrid
                </span>
                <span className="px-3 py-1 bg-brand-green-100 text-brand-green-700 text-xs font-semibold rounded-full">
                  DOL RAP
                </span>
                <span className="px-3 py-1 bg-brand-orange-100 text-brand-orange-700 text-xs font-semibold rounded-full">
                  WIOA
                </span>
              </div>
              <p className="text-slate-600 mb-4">12 months • Earn while you learn</p>
              <Link
                href="/programs/barber-apprenticeship"
                className="text-brand-orange-600 font-semibold hover:underline flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Program 2 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">HVAC Technician</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-semibold rounded-full">
                  Hybrid
                </span>
                <span className="px-3 py-1 bg-brand-orange-100 text-brand-orange-700 text-xs font-semibold rounded-full">
                  WIOA
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  WRG
                </span>
              </div>
              <p className="text-slate-600 mb-4">8-12 weeks • Start at $55K+</p>
              <Link
                href="/programs/hvac-technician"
                className="text-brand-orange-600 font-semibold hover:underline flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Program 3 */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">CNA Healthcare</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-semibold rounded-full">
                  Hybrid
                </span>
                <span className="px-3 py-1 bg-brand-orange-100 text-brand-orange-700 text-xs font-semibold rounded-full">
                  WIOA
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  WRG
                </span>
              </div>
              <p className="text-slate-600 mb-4">6-8 weeks • High demand</p>
              <Link
                href="/programs/cna"
                className="text-brand-orange-600 font-semibold hover:underline flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/programs"
              className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* 6. OUTCOMES & IMPACT */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Proven Outcomes
          </h2>
          <p className="text-xl text-slate-700 mb-12">
            Strong placement outcomes across funded programs with employer-aligned training and verified results
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">14+</div>
              <p className="text-slate-700">Career Programs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">4-12</div>
              <p className="text-slate-700">Weeks to Complete</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">$0</div>
              <p className="text-slate-700">Out-of-Pocket Cost</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FUNDING PATHWAYS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Funding Pathways
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Most students pay $0 out-of-pocket. Eligibility confirmed after application.
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">WIOA</h3>
              <p className="text-sm text-slate-600">Workforce Innovation</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">WRG</h3>
              <p className="text-sm text-slate-600">Workforce Ready Grant</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">JRI</h3>
              <p className="text-sm text-slate-600">Justice Reinvestment</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Apprenticeships</h3>
              <p className="text-sm text-slate-600">DOL Registered</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Employer</h3>
              <p className="text-sm text-slate-600">Sponsorship</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-16 bg-brand-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Start Your Career Path?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-block px-10 py-4 bg-white text-brand-orange-600 font-bold rounded-lg hover:bg-slate-100 transition text-lg shadow-xl"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-block px-10 py-4 bg-brand-orange-700 text-white font-bold rounded-lg hover:bg-brand-orange-800 transition text-lg shadow-xl border-2 border-white"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

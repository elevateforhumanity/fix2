import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:gap-12 lg:py-24">
        {/* Left Content */}
        <div className="max-w-2xl lg:flex-1">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Workforce training that pays you to learn
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl">
            State-approved apprenticeships and earn-while-you-learn programs. Fast pathways to careers in barbering, HVAC, healthcare, CDL, and more.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3">
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              View Programs
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">ETPL Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">WorkOne Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">DOL Registered</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-12 lg:mt-0 lg:flex-1">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-2xl">
            <img
              src="/images/hero-training.jpg"
              alt="Students in workforce training program"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

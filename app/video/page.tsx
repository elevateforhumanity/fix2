"use client";

import { useState } from "react";
import Link from "next/link";

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Video Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See How Elevate Works
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Watch our video to learn how we connect learners to free training, employers to talent,
              and case managers to powerful tools for workforce development.
            </p>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
            <video
              controls
              autoPlay
              className="w-full h-full"
              poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="https://cdn.coverr.co/videos/coverr-students-studying-together-in-library-5337/1080p.mp4" type="video/mp4" />
              <source src="https://cdn.coverr.co/videos/coverr-woman-working-on-laptop-4753/1080p.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play button overlay (shows when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
                <button
                  onClick={(e) => {
                    const video = e.currentTarget.parentElement?.querySelector('video');
                    video?.play();
                  }}
                  className="bg-white/90 hover:bg-white rounded-full p-8 shadow-2xl transition transform hover:scale-110"
                >
                  <svg className="w-16 h-16 text-brandPrimary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Video Description */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Free Training
                </h3>
                <p className="text-sm text-slate-300">
                  Access workforce-funded programs in healthcare, trades, CDL, and more
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Real Partnerships
                </h3>
                <p className="text-sm text-slate-300">
                  Connect with employers, training sites, and workforce agencies
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Job Placement
                </h3>
                <p className="text-sm text-slate-300">
                  Get hired by employers looking for trained, work-ready candidates
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/start"
              className="inline-block px-8 py-4 bg-brandPrimary text-white font-bold rounded-lg hover:bg-brandPrimaryDark transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/programs"
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              View Programs
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-slate-800 border-t border-slate-700">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What You'll Learn in This Video
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">How Elevate Works</h3>
                  <p className="text-sm text-slate-300">
                    See our platform in action and understand how we connect learners, employers, and partners
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Available Programs</h3>
                  <p className="text-sm text-slate-300">
                    Explore our training programs in healthcare, trades, CDL, and workforce readiness
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Funding Options</h3>
                  <p className="text-sm text-slate-300">
                    Learn about WRG, WIOA, and other workforce funding that makes training free or low-cost
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Partner Network</h3>
                  <p className="text-sm text-slate-300">
                    See how we work with barbershops, clinics, employers, and workforce agencies
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Success Stories</h3>
                  <p className="text-sm text-slate-300">
                    Hear from learners who completed training and found meaningful employment
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center text-white font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Next Steps</h3>
                  <p className="text-sm text-slate-300">
                    Find out how to apply, what to expect, and how to get started today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

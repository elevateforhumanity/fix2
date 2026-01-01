import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full -mt-[72px]">
      <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/homepage-hero-new.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Award className="h-4 w-4" />
                <span>100% Funded Training Available</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                Transform Your Future with Free Career Training
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-white mb-8 leading-relaxed">
                Get certified in healthcare, skilled trades, CDL, and more —
                with WIOA funding, job placement, and wraparound support.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl transition-all transform hover:scale-105"
                >
                  <span>Apply Now - It's Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-gray-900 transition-all"
                >
                  <span>Explore Programs</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
                <div>
                  <div className="text-4xl font-black text-white mb-1">$0</div>
                  <div className="text-sm text-white/90">
                    Cost for Most Students
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-1">12+</div>
                  <div className="text-sm text-white/90">Career Programs</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-1">85%</div>
                  <div className="text-sm text-white/90">
                    Job Placement Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

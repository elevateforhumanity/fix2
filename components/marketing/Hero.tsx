import Link from 'next/link';
import { Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full -mt-[72px]">
      {/* Full-bleed background - owns above the fold */}
      <div className="relative min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
      </div>

      {/* Content overlay (constrained) */}
      <div className="absolute inset-0 z-10 flex items-center pt-[72px]">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-purple-600/90 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wide">WIOA-Funded Training</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
              Limitless Opportunities
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Where Learning Leads to Earning!
            </h2>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Free career training in Indianapolis. Get trained, get hired, get paid. No cost, no debt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                className="rounded-xl bg-white px-8 py-4 font-bold text-black hover:bg-gray-100 transition text-center text-lg shadow-xl" 
                href="/programs"
              >
                Explore Programs
              </Link>
              <Link 
                className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-black transition text-center text-lg" 
                href="/apply"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

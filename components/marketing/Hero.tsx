import Link from 'next/link';
import { Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Full-bleed background */}
      <div className="relative h-[520px] w-full overflow-hidden">
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
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </div>

      {/* Content overlay (constrained) */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">WIOA-Funded Training Programs</span>
            </div>
            
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Limitless Opportunities
            </h1>
            
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">
              Where Learning Leads to Earning!
            </h2>
            
            <p className="mt-3 text-lg">
              Free career training in Indianapolis. Get trained, get hired, get paid. No cost, no debt.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link 
                className="rounded-xl bg-white px-6 py-3 font-bold text-black hover:bg-gray-100 transition text-center" 
                href="/programs"
              >
                Explore Programs
              </Link>
              <Link 
                className="rounded-xl border-2 border-white px-6 py-3 font-bold text-white hover:bg-white hover:text-black transition text-center" 
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

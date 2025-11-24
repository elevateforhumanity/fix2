// components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16 grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-center">
        {/* LEFT – TEXT */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            Philanthropy Through Workforce Development
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            We Don&apos;t Give Handouts.<br className="hidden sm:block" />
            <span className="text-red-600"> We Build Pathways</span> to
            Self-Sufficiency.
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl">
            Elevate For Humanity connects Indiana residents to 100% funded
            training, WorkOne case managers, and employers ready to hire
            through WIOA, WRG, and JRI.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold shadow-sm hover:bg-red-700 transition-colors"
            >
              Apply Now – It&apos;s Free
            </Link>
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm text-white text-sm font-bold hover:bg-white hover:text-red-600 transition-colors shadow-lg"
            >
              Schedule at Indiana Career Connect
            </a>
          </div>

          {/* Fallback text for Indiana Career Connect */}
          <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed">
            If IndianaCareerConnect.com doesn&apos;t load, call your local WorkOne office
            and ask for a WIOA/WRG appointment. Tell them Elevate For Humanity is
            your training provider.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-2">
            <div>
              <p className="font-semibold text-slate-900">100% Funded</p>
              <p>WIOA • WRG • JRI – no tuition</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Barrier-Aware</p>
              <p>Justice-involved, unemployed, underemployed</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Real Sites</p>
              <p>Shops, clinics, and job sites across Indiana</p>
            </div>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="relative h-56 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-md">
          <Image
            src="/media/hero-banner-latest.png"
            alt="Elevate For Humanity - funded training, real support, real jobs"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* How to Get Started Section */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">📍 How to Get Started:</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="font-semibold text-slate-900">Call WorkOne</h3>
              </div>
              <p className="text-sm text-slate-600">
                Visit your local WorkOne office or call to schedule an appointment. 
                You can also try{" "}
                <a 
                  href="https://www.indianacareerconnect.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-red-600 underline hover:text-red-700"
                >
                  IndianaCareerConnect.com
                </a>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="font-semibold text-slate-900">Get Approved</h3>
              </div>
              <p className="text-sm text-slate-600">
                WorkOne handles all intake, eligibility checks, and funding paperwork 
                (WIOA, WRG, JRI). They verify your eligibility.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="font-semibold text-slate-900">Start Training</h3>
              </div>
              <p className="text-sm text-slate-600">
                Once approved, we provide the training structure and connect you 
                to real shops, clinics, and job sites across Indiana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

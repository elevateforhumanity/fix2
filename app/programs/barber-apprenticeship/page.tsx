// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/images/beauty/hero-program-barber.jpg"
          alt="Barber Apprenticeship Training"
          fill
          className="object-cover brightness-105"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 mb-3">
              DOL Registered Apprenticeship
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Barber Apprenticeship
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-6">
              Earn while you learn. 2,000 hours. 100% funded.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-all">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Overview</h2>
          <p className="text-lg text-slate-700 mb-6">
            Complete your 2,000-hour DOL Registered Apprenticeship in real barbershops. 
            Earn wages and tips while training with licensed professionals. Graduate ready 
            to take the Indiana State Board exam and start your career.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">2,000</div>
              <div className="text-sm text-slate-600">Training Hours</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">With WIOA/WRG Funding</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm text-slate-600">Job Placement Rate</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Core Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Hair cutting and styling techniques</li>
                <li>• Beard trimming and shaving</li>
                <li>• Hair coloring and chemical treatments</li>
                <li>• Sanitation and safety protocols</li>
                <li>• Client consultation and communication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Business Skills</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Shop operations and management</li>
                <li>• Customer service excellence</li>
                <li>• Retail product knowledge</li>
                <li>• Appointment scheduling</li>
                <li>• Building your client base</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funding Options */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">100% Funded Training</h2>
          <p className="text-lg text-slate-700 mb-4">
            This program is fully covered by government workforce funding:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - Workforce Innovation and Opportunity Act</li>
            <li>• <strong>WRG</strong> - Workforce Ready Grant</li>
            <li>• <strong>JRI</strong> - Justice Reinvestment Initiative</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Our team will help you determine eligibility and complete all paperwork.
          </p>
        </section>

        {/* Career Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Career Outcomes</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Average Earnings</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">$35,000 - $55,000</p>
                <p className="text-sm text-slate-600">First year, including tips</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Career Paths</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Licensed Barber</li>
                  <li>• Shop Owner</li>
                  <li>• Master Barber</li>
                  <li>• Barber Instructor</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start?</h2>
          <p className="text-lg text-slate-700 mb-6">
            Apply today and begin your journey to becoming a licensed barber.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-md font-semibold hover:bg-orange-600 transition-all text-lg"
          >
            Apply Now
          </Link>
        </section>
      </div>
    </main>
  );
}

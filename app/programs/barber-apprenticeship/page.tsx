// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90"
          alt="Professional barber training and apprenticeship"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30" />
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-orange-500 mb-2 sm:mb-3">
              Your Path to Success
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Become a Barber
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-4 sm:mb-6">
              Get paid to learn your craft. No tuition. Real barbershops. Real future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/apply" className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-all text-center">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Here's How It Works</h2>
          <p className="text-lg text-slate-700 mb-6">
            You'll train in real barbershops alongside experienced barbers who remember what it's like 
            to start out. You'll earn money from day one—wages plus tips—while learning everything 
            from classic cuts to modern styles. After 2,000 hours, you'll be ready to take your 
            state exam and start your own career.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">2,000</div>
              <div className="text-sm text-slate-600">Hours of hands-on training</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">Day 1</div>
              <div className="text-sm text-slate-600">Start earning immediately</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Craft</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Every cut from classic to modern</li>
                <li>• Beard shaping and straight razor shaves</li>
                <li>• Color, highlights, and chemical treatments</li>
                <li>• How to keep your clients safe and comfortable</li>
                <li>• Reading what your client really wants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Business</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Running your own chair or shop</li>
                <li>• Building relationships that bring clients back</li>
                <li>• Products that work (and how to recommend them)</li>
                <li>• Managing your schedule and income</li>
                <li>• Growing from zero clients to fully booked</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funding Options */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            We know "free training" sounds too good to be true. But this is real. 
            Government workforce programs pay for everything because they want you to succeed:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a new career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>JRI</strong> - second chance opportunities</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Don't worry about the paperwork—we'll walk you through every step and help you qualify.
          </p>
        </section>

        {/* Career Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happens After You Graduate</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">$35,000 - $55,000</p>
                <p className="text-sm text-slate-600">That's your base pay plus tips. Many of our grads do even better.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Where You Can Go</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Work in any barbershop you choose</li>
                  <li>• Open your own shop</li>
                  <li>• Become a master barber</li>
                  <li>• Teach the next generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Let's Get You Started</h2>
          <p className="text-lg text-slate-700 mb-6">
            No experience needed. No money down. Just bring yourself and we'll handle the rest.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-md font-semibold hover:bg-orange-600 transition-all text-lg"
          >
            Start Your Application
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Questions? Call us at (317) 123-4567 or stop by—we'd love to meet you.
          </p>
        </section>
      </div>
    </main>
  );
}

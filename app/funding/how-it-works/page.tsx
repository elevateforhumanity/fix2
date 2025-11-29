import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users, Building2, GraduationCap, Briefcase, DollarSign, FileText } from "lucide-react";

export const metadata = {
  title: "How Funding Works | Elevate For Humanity",
  description: "Understanding WIOA, Workforce Ready Grant, EmployIndy, WorkOne, and DOL Apprenticeships - How your training gets funded 100% FREE",
};

export default async function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-600 to-orange-700 border-b border-orange-500">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/federal-funding-hero.jpg"
            alt="How Funding Works"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            How Your Training Gets Funded 100% FREE
          </h1>
          <p className="text-2xl text-orange-100 mb-8 max-w-4xl">
            We connect the dots between federal, state, and local workforce programs so you don't pay a dime for career training.
          </p>
          <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold text-lg">
            <CheckCircle className="w-6 h-6" />
            $0 Out of Pocket - Government Pays 100%
          </div>
        </div>
      </section>

      {/* The Ecosystem */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          The Workforce Funding Ecosystem
        </h2>
        <p className="text-xl text-slate-300 mb-12 text-center max-w-3xl mx-auto">
          Multiple government programs work together to fund your training. Here's how they connect:
        </p>

        {/* Flow Diagram */}
        <div className="bg-slate-800 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Federal Level */}
            <div className="space-y-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-center">
                FEDERAL LEVEL
              </div>
              <div className="bg-slate-900 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">U.S. Department of Labor (DOL)</h3>
                    <p className="text-sm text-slate-400">Funds workforce development nationwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">WIOA (Workforce Innovation & Opportunity Act)</h3>
                    <p className="text-sm text-slate-400">Federal law that funds job training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">DOL Registered Apprenticeships</h3>
                    <p className="text-sm text-slate-400">Earn while you learn programs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* State Level */}
            <div className="space-y-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-center">
                STATE LEVEL
              </div>
              <div className="bg-slate-900 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Indiana DWD (Dept of Workforce Development)</h3>
                    <p className="text-sm text-slate-400">Manages state workforce programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Workforce Ready Grant (WRG)</h3>
                    <p className="text-sm text-slate-400">State-funded tuition-free training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">WorkOne Centers</h3>
                    <p className="text-sm text-slate-400">State career centers across Indiana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Level */}
            <div className="space-y-4">
              <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-center">
                LOCAL LEVEL
              </div>
              <div className="bg-slate-900 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">EmployIndy</h3>
                    <p className="text-sm text-slate-400">Marion County workforce board</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Training Providers (Like Us!)</h3>
                    <p className="text-sm text-slate-400">Deliver the actual training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Employer Partners</h3>
                    <p className="text-sm text-slate-400">Hire trained graduates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Arrows */}
          <div className="mt-8 flex items-center justify-center gap-4 text-slate-400">
            <span>Federal Funds</span>
            <ArrowRight className="w-5 h-5" />
            <span>State Distributes</span>
            <ArrowRight className="w-5 h-5" />
            <span>Local Delivers</span>
            <ArrowRight className="w-5 h-5" />
            <span className="text-orange-400 font-bold">You Get Trained FREE</span>
          </div>
        </div>

        {/* How Each Program Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* WIOA */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">WIOA Funding</h3>
            <p className="text-slate-300 mb-4">
              The Workforce Innovation and Opportunity Act (WIOA) is federal law that provides funding for job training and employment services.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Covers tuition, books, supplies, and support services</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Available to adults, dislocated workers, and youth</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Requires eligibility determination at WorkOne</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Can include transportation and childcare assistance</p>
              </div>
            </div>
          </div>

          {/* Workforce Ready Grant */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Workforce Ready Grant</h3>
            <p className="text-slate-300 mb-4">
              Indiana's state-funded program providing tuition-free training in high-demand careers.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Must be Indiana resident with high school diploma</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Cannot have a college degree already</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Must file FAFSA (for certain programs)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Covers certificate programs in high-growth fields</p>
              </div>
            </div>
          </div>

          {/* EmployIndy */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">EmployIndy</h3>
            <p className="text-slate-300 mb-4">
              Marion County's workforce development board that connects job seekers to training and employers.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Manages WIOA funds for Marion County</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Approves training providers like Elevate</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Connects graduates to employer partners</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Provides career coaching and support services</p>
              </div>
            </div>
          </div>

          {/* DOL Apprenticeships */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">DOL Registered Apprenticeships</h3>
            <p className="text-slate-300 mb-4">
              Earn-while-you-learn programs registered with the U.S. Department of Labor.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Get paid while you train (typically $15-$20/hour)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Combines on-the-job training with classroom instruction</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Leads to nationally recognized credentials</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300">Available in trades (barber, HVAC, building, etc.)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Path */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Path to Free Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Apply to Elevate</h3>
              <p className="text-sm text-orange-100">Tell us about your career goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">We Check Eligibility</h3>
              <p className="text-sm text-orange-100">We determine which funding you qualify for</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Get Approved</h3>
              <p className="text-sm text-orange-100">We handle all paperwork with funding sources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Start Training FREE</h3>
              <p className="text-sm text-orange-100">Begin your program at $0 cost to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Do I have to pay anything back?</h3>
              <p className="text-slate-300">
                No! These are grants, not loans. You never have to pay back the training costs.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">What if I don't qualify for one program?</h3>
              <p className="text-slate-300">
                We check multiple funding sources. If you don't qualify for WIOA, you might qualify for Workforce Ready Grant, or vice versa. We find the right fit for you.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">How long does approval take?</h3>
              <p className="text-slate-300">
                Typically 1-2 weeks. We handle all the paperwork and coordination with funding agencies.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Can I get help with transportation or childcare?</h3>
              <p className="text-slate-300">
                Yes! WIOA funding can include support services like transportation, childcare, and even work clothes or tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Apply now and we'll determine which funding programs you qualify for.
        </p>
        <Link
          href="/apply"
          className="inline-block px-8 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
        >
          Apply for Free Training
        </Link>
      </section>
    </main>
  );
}

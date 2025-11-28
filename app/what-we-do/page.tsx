import Link from "next/link";
import { CheckCircle, ArrowRight, Users, Building2, GraduationCap, Briefcase, DollarSign } from "lucide-react";

export const metadata = {
  title: "What We Do | Elevate For Humanity",
  description: "We connect Indianapolis residents to FREE government-funded career training through WIOA, Workforce Ready Grant, OJT, and Apprenticeships",
};

export default async function WhatWeDoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-6">
            What We Actually Do
          </h1>
          <p className="text-2xl text-orange-100 mb-8 max-w-4xl">
            We're a training provider that connects Indianapolis residents to FREE career training funded by government workforce programs.
          </p>
          <div className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold text-lg">
            <CheckCircle className="w-6 h-6" />
            You Pay $0 - Government Pays 100%
          </div>
        </div>
      </section>

      {/* The Simple Explanation */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-blue-50 border-4 border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Simple Version</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Apply</h3>
              <p className="text-sm text-slate-700">Tell us what career you want</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">We Get You Funded</h3>
              <p className="text-sm text-slate-700">WIOA, WRG, OJT, or Apprenticeship</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Train FREE</h3>
              <p className="text-sm text-slate-700">Technical skills + JRI soft skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Get Hired</h3>
              <p className="text-sm text-slate-700">We connect you to employers</p>
            </div>
          </div>
        </div>

        {/* Funding Sources */}
        <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          How Your Training Gets Funded
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* WIOA */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">WIOA Funding</h3>
            </div>
            <p className="text-slate-700 mb-4">
              Federal workforce development money managed by <strong>EmployIndy</strong> (Marion County's workforce board)
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Covers tuition, books, supplies</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Can include transportation & childcare</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Apply through WorkOne Career Centers</p>
              </div>
            </div>
          </div>

          {/* Workforce Ready Grant */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-slate-900">Workforce Ready Grant</h3>
            </div>
            <p className="text-slate-700 mb-4">
              Indiana state program managed by <strong>Indiana DWD</strong> (Department of Workforce Development)
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Tuition-free certificate programs</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Must be Indiana resident with HS diploma</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Cannot have college degree</p>
              </div>
            </div>
          </div>

          {/* OJT */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-slate-900">OJT (On-the-Job Training)</h3>
            </div>
            <p className="text-slate-700 mb-4">
              Get PAID while you train! Employer pays your wages, government reimburses employer 50%
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Earn $15-$20/hour while training</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">You're a real employee from day 1</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Training period: 3-6 months</p>
              </div>
            </div>
          </div>

          {/* Apprenticeships */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-slate-900">DOL Apprenticeships</h3>
            </div>
            <p className="text-slate-700 mb-4">
              Earn while you learn! Work full-time + get classroom training + build credential hours
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Full wages ($15-$20/hour)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Nationally recognized credentials</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Examples: Barber, HVAC, Building Tech</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Provide */}
        <div className="bg-orange-50 border-4 border-orange-200 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">What We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Technical Training</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• CNA (Certified Nursing Assistant)</li>
                <li>• Medical Assistant</li>
                <li>• HVAC Technician</li>
                <li>• Building Technician</li>
                <li>• CDL (Commercial Driver)</li>
                <li>• Barber/Beauty</li>
                <li>• Customer Service</li>
                <li>• IT Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">JRI Soft Skills</h3>
              <p className="text-sm text-slate-700 mb-3">
                <strong>Job Ready Indy</strong> curriculum from EmployIndy:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Communication</li>
                <li>• Professionalism</li>
                <li>• Teamwork</li>
                <li>• Problem-solving</li>
                <li>• Financial literacy</li>
                <li>• Career advancement</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Job Connections</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• 100+ employer partners</li>
                <li>• Interview prep</li>
                <li>• Resume building</li>
                <li>• Job placement support</li>
                <li>• Career coaching</li>
                <li>• Follow-up support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Ecosystem */}
        <div className="bg-slate-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">The Workforce Ecosystem</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="font-bold text-slate-900">Federal DOL</p>
              <p className="text-xs text-slate-600">WIOA Funds</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="font-bold text-slate-900">EmployIndy</p>
              <p className="text-xs text-slate-600">Marion County</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="font-bold text-slate-900">WorkOne</p>
              <p className="text-xs text-slate-600">Career Centers</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-orange-500 text-white rounded-lg p-4 shadow">
              <p className="font-bold">Elevate</p>
              <p className="text-xs">Training Provider</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-green-600 text-white rounded-lg p-4 shadow">
              <p className="font-bold">YOU</p>
              <p className="text-xs">Get Trained FREE</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply now and we'll determine which funding programs you qualify for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/funding/how-it-works"
              className="inline-block px-8 py-4 bg-orange-800 text-white rounded-lg font-bold text-lg hover:bg-orange-900 transition-colors"
            >
              Learn More About Funding
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

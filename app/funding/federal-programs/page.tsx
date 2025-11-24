// app/funding/federal-programs/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, DollarSign, FileText, Users, Award, Clock, Shield, Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Funding Programs | Elevate For Humanity",
  description: "Learn about federal funding programs including WIOA, Pell Grants, and other options that cover 100% of your training costs. No tuition, no debt.",
  keywords: ["WIOA", "Pell Grant", "federal funding", "free training", "workforce development"],
};

export default function FederalFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 mb-6">
                <Shield size={16} />
                <span>Federal Programs</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Federal Funding for Career Training
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Access federal programs like WIOA, Pell Grants, and other funding sources that make career training completely free. These programs are designed to help you gain skills and secure employment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
                >
                  Check Your Eligibility
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-purple-600 hover:text-purple-600 transition-all"
                >
                  Get Help Applying
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/federal-funding-hero.jpg"
                  alt="Federal funding programs"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIOA Program Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 mb-6">
                <Award size={16} />
                <span>Primary Federal Program</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                WIOA (Workforce Innovation and Opportunity Act)
              </h2>
              
              <p className="text-lg text-slate-600 mb-6">
                WIOA is the primary federal workforce development program, providing comprehensive training and employment services to help individuals access quality jobs and careers.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Covers Full Training Costs</div>
                    <div className="text-sm text-slate-600">Tuition, fees, books, and supplies included</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Support Services</div>
                    <div className="text-sm text-slate-600">Transportation, childcare, and other barrier assistance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Career Counseling</div>
                    <div className="text-sm text-slate-600">One-on-one guidance and job placement assistance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">No Repayment</div>
                    <div className="text-sm text-slate-600">It's not a loan - you never have to pay it back</div>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.dol.gov/agencies/eta/wioa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Learn More About WIOA
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">WIOA Eligibility</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Adults (18+)</h4>
                    <p className="text-sm text-slate-600">
                      Unemployed, underemployed, or facing barriers to employment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Briefcase size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Dislocated Workers</h4>
                    <p className="text-sm text-slate-600">
                      Lost job due to layoff, plant closure, or economic conditions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Priority Groups</h4>
                    <p className="text-sm text-slate-600">
                      Veterans, low-income individuals, and those with barriers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <DollarSign size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Income Guidelines</h4>
                    <p className="text-sm text-slate-600">
                      Low-income status or receiving public assistance
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-slate-700">
                  <strong>Good News:</strong> WIOA serves a wide range of individuals. We'll help determine your eligibility and guide you through the application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Federal Programs */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Other Federal Funding Options
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Multiple federal programs can help fund your training. We'll help you find the best fit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {federalPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Award size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{program.name}</h3>
                <p className="text-slate-600 mb-4">{program.description}</p>
                <div className="space-y-2">
                  {program.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Access Federal Funding
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We simplify the process. Here's how to get started with federal funding.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight size={20} className="text-slate-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
              >
                Start Your Application
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-purple-600 hover:text-purple-600 transition-all"
              >
                Get Application Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Access Federal Funding?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Federal programs make career training accessible to everyone. Let us help you navigate the funding process and start your new career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-purple-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const federalPrograms = [
  {
    name: "Pell Grants",
    description: "Federal grants for low-income students pursuing postsecondary education and training.",
    benefits: [
      "Up to $7,395 per year",
      "No repayment required",
      "For eligible certificate programs",
    ],
  },
  {
    name: "Trade Adjustment Assistance (TAA)",
    description: "For workers who lost jobs due to foreign trade, providing training and support.",
    benefits: [
      "Full training costs covered",
      "Income support during training",
      "Job search assistance",
    ],
  },
  {
    name: "Veterans Benefits",
    description: "GI Bill and other VA programs for veterans and eligible family members.",
    benefits: [
      "Tuition and fees covered",
      "Monthly housing allowance",
      "Books and supplies stipend",
    ],
  },
  {
    name: "SNAP E&T",
    description: "Employment and Training program for SNAP (food stamp) recipients.",
    benefits: [
      "Training costs covered",
      "Support services included",
      "Path to self-sufficiency",
    ],
  },
  {
    name: "TANF",
    description: "Temporary Assistance for Needy Families with work and training requirements.",
    benefits: [
      "Training and education support",
      "Childcare assistance",
      "Transportation help",
    ],
  },
  {
    name: "Second Chance Act",
    description: "Programs for justice-involved individuals reentering the workforce.",
    benefits: [
      "Reentry support services",
      "Job training and placement",
      "Mentoring and counseling",
    ],
  },
];

const steps = [
  {
    title: "Apply to Elevate",
    description: "Complete our application and select your training program.",
  },
  {
    title: "Meet with Advisor",
    description: "We'll assess your eligibility for federal programs.",
  },
  {
    title: "Complete Funding Application",
    description: "We'll help you apply to the appropriate federal program.",
  },
  {
    title: "Start Training",
    description: "Once approved, begin your fully-funded training.",
  },
];

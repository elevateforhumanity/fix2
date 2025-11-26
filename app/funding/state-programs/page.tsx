// app/funding/state-programs/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, DollarSign, FileText, Users, Award, Clock, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "State Funding Programs | Elevate For Humanity",
  description: "Learn about Indiana state funding programs including WRG (Workforce Ready Grant) and Next Level Jobs that cover 100% of your training costs. No tuition, no debt.",
  keywords: ["WRG", "Workforce Ready Grant", "Next Level Jobs", "Indiana funding", "free training", "state programs"],
};

export default function StateFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-emerald-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-brandPrimary mb-6">
                <Shield size={16} />
                <span>Indiana State Programs</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                100% Free Training Through Indiana State Funding
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Indiana offers multiple state-funded programs that cover the full cost of career training. No loans, no debt, just opportunity. Learn about WRG, Next Level Jobs, and other state programs that can fund your education.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brandPrimary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brandPrimaryDark transition-all hover:scale-105"
                >
                  Check Your Eligibility
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-brandPrimary hover:text-brandPrimary transition-all"
                >
                  Get Help Applying
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/state-funding-hero.jpg"
                  alt="Indiana state funding programs"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WRG Program Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 mb-6">
                <Award size={16} />
                <span>Most Popular Program</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Workforce Ready Grant (WRG)
              </h2>
              
              <p className="text-lg text-slate-600 mb-6">
                The Workforce Ready Grant is Indiana's premier workforce development program, covering up to $7,500 per year for high-demand career training.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Covers Full Tuition</div>
                    <div className="text-sm text-slate-600">Up to $7,500 per year for eligible programs</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">High-Demand Careers</div>
                    <div className="text-sm text-slate-600">All our healthcare programs are WRG-eligible</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Fast Application</div>
                    <div className="text-sm text-slate-600">Simple online application through INvestEd</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">No Repayment Required</div>
                    <div className="text-sm text-slate-600">It's a grant, not a loan - never pay it back</div>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.in.gov/dwd/workforce-ready-grant/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Learn More About WRG
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">WRG Eligibility Requirements</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users size={20} className="text-brandPrimary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Indiana Resident</h4>
                    <p className="text-sm text-slate-600">
                      Must be a resident of Indiana for at least 12 months
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <DollarSign size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Income Requirements</h4>
                    <p className="text-sm text-slate-600">
                      Household income at or below 250% of federal poverty level
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Education Level</h4>
                    <p className="text-sm text-slate-600">
                      High school diploma, GED, or enrolled in adult education
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Clock size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Employment Status</h4>
                    <p className="text-sm text-slate-600">
                      Unemployed, underemployed, or need skills upgrade
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-slate-700">
                  <strong>Good News:</strong> Most of our students qualify for WRG funding. We'll help you through the entire application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Level Jobs Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Next Level Jobs Eligibility</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users size={20} className="text-brandPrimary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Indiana Resident</h4>
                      <p className="text-sm text-slate-600">
                        Must be a resident of Indiana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Award size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Eligible Programs</h4>
                      <p className="text-sm text-slate-600">
                        High-value, high-demand certificate programs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FileText size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">No Degree Required</h4>
                      <p className="text-sm text-slate-600">
                        Available to those without an associate or bachelor's degree
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <DollarSign size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Covers Full Cost</h4>
                      <p className="text-sm text-slate-600">
                        Tuition, fees, and required materials included
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <strong>Note:</strong> Next Level Jobs has broader eligibility than WRG and may be available even if you don't qualify for WRG.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-brandPrimary mb-6">
                <Award size={16} />
                <span>Alternative Funding</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Next Level Jobs
              </h2>
              
              <p className="text-lg text-slate-600 mb-6">
                Next Level Jobs is Indiana's employer-driven workforce initiative that provides free training for high-demand careers. This program covers tuition and fees for eligible certificate programs.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brandPrimary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Employer-Aligned Training</div>
                    <div className="text-sm text-slate-600">Programs designed with input from Indiana employers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brandPrimary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Quick Completion</div>
                    <div className="text-sm text-slate-600">Short-term programs that get you working fast</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brandPrimary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Stackable Credentials</div>
                    <div className="text-sm text-slate-600">Build on your skills with additional certifications</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brandPrimary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900">Career Support</div>
                    <div className="text-sm text-slate-600">Job placement assistance and career counseling</div>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.in.gov/dwd/next-level-jobs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brandPrimary font-semibold hover:text-brandPrimary transition-colors"
              >
                Learn More About Next Level Jobs
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Apply for State Funding
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We make it easy. Follow these simple steps to access free training through state programs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brandPrimary text-white flex items-center justify-center text-2xl font-bold mb-4">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brandPrimary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brandPrimaryDark transition-all hover:scale-105"
              >
                Start Your Application
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-brandPrimary hover:text-brandPrimary transition-all"
              >
                Get Application Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Programs Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              All Our Programs Are State-Funded Eligible
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Every healthcare program we offer qualifies for WRG and/or Next Level Jobs funding.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-brandPrimary transition-colors">
                    <Award size={20} className="text-brandPrimary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-red-600">100% Funded</div>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-brandPrimary transition-colors">
                  {program.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{program.duration}</span>
                  <span>{program.salary}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-red-600 to-orange-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Access Free Training?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't let cost be a barrier to your career goals. Indiana state programs make training accessible to everyone. Let us help you navigate the funding process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brandPrimary shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
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
const steps = [
  {
    title: "Apply to Elevate",
    description: "Complete our simple application to choose your program.",
  },
  {
    title: "We Check Eligibility",
    description: "We'll determine which state programs you qualify for.",
  },
  {
    title: "Submit Funding Application",
    description: "We'll help you complete the WRG or Next Level Jobs application.",
  },
  {
    title: "Start Training",
    description: "Once approved, begin your free training immediately.",
  },
];

const programs = [
  { name: "Medical Assistant", slug: "medical-assistant", duration: "12 weeks", salary: "$35K-$45K" },
  { name: "Phlebotomy Technician", slug: "phlebotomy", duration: "8 weeks", salary: "$32K-$42K" },
  { name: "EKG Technician", slug: "ekg-technician", duration: "6 weeks", salary: "$33K-$43K" },
  { name: "Pharmacy Technician", slug: "pharmacy-technician", duration: "12 weeks", salary: "$34K-$44K" },
  { name: "Dental Assistant", slug: "dental-assistant", duration: "10 weeks", salary: "$36K-$46K" },
  { name: "Patient Care Technician", slug: "patient-care-technician", duration: "14 weeks", salary: "$35K-$45K" },
  { name: "Sterile Processing", slug: "sterile-processing", duration: "12 weeks", salary: "$37K-$47K" },
  { name: "Healthcare Administration", slug: "healthcare-administration", duration: "16 weeks", salary: "$40K-$50K" },
];

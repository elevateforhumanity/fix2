// app/page.tsx - Marketing Homepage
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, DollarSign, Clock, Award } from "lucide-react";

export default function MarketingHomepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
                <Award size={16} />
                <span>100% FREE Career Training</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Transform Your Career with{" "}
                <span className="text-emerald-600">Free Healthcare Training</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                No tuition. No debt. Real jobs waiting. Get certified in high-demand healthcare careers through 100% funded programs in Marion County, Indiana.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Fully funded through WIOA, WRG, and JRI programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Earn industry-recognized certifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Job placement assistance with local employers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Flexible schedules for working adults</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
                >
                  Apply Now - It's Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            {/* Right Column - Image & Stats */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/homepage-hero.jpg"
                  alt="Healthcare training students"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-emerald-600">$0</div>
                <div className="text-sm text-slate-600">Tuition Cost</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-slate-600">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Healthcare Career Path
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              All programs are 100% funded and lead to industry-recognized certifications with strong job placement rates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {program.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {program.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    {program.salary}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                100% Funded Training Through Multiple Programs
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We work with state and federal funding programs to ensure you can access training at no cost. No loans, no debt, no barriers.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WIOA Funding</h3>
                    <p className="text-sm text-slate-600">
                      Workforce Innovation and Opportunity Act provides free training for eligible adults.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WRG & Next Level Jobs</h3>
                    <p className="text-sm text-slate-600">
                      Indiana state programs covering tuition, fees, and certification costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">JRI Funding</h3>
                    <p className="text-sm text-slate-600">
                      Justice Reinvestment Initiative for justice-involved individuals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/funding/state-programs"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Learn About Funding Options
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/funding-support.jpg"
                  alt="Funding and support services"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Journey to a New Career
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We've made it simple to get started. Follow these four steps to begin your career transformation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
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

          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
            >
              Start Your Application
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">$0</div>
              <div className="text-slate-300">Tuition Cost</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">8+</div>
              <div className="text-slate-300">Healthcare Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">85%</div>
              <div className="text-slate-300">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">$45K</div>
              <div className="text-slate-300">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real people, real transformations. See how our programs have changed lives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.program}</div>
                  </div>
                </div>
                <p className="text-slate-700 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Read More Success Stories
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of students who have transformed their lives through our free training programs. No cost, no debt, just opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Apply Now - It's Free
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
const programs = [
  {
    name: "Medical Assistant",
    slug: "medical-assistant",
    description: "Provide essential support in healthcare settings with clinical and administrative skills.",
    duration: "12 weeks",
    salary: "$35K-$45K",
  },
  {
    name: "Phlebotomy Technician",
    slug: "phlebotomy",
    description: "Specialize in blood collection and laboratory procedures.",
    duration: "8 weeks",
    salary: "$32K-$42K",
  },
  {
    name: "EKG Technician",
    slug: "ekg-technician",
    description: "Perform electrocardiogram tests to monitor heart health.",
    duration: "6 weeks",
    salary: "$33K-$43K",
  },
  {
    name: "Pharmacy Technician",
    slug: "pharmacy-technician",
    description: "Assist pharmacists in preparing and dispensing medications.",
    duration: "12 weeks",
    salary: "$34K-$44K",
  },
  {
    name: "Dental Assistant",
    slug: "dental-assistant",
    description: "Support dental professionals in patient care and office operations.",
    duration: "10 weeks",
    salary: "$36K-$46K",
  },
  {
    name: "Patient Care Technician",
    slug: "patient-care-technician",
    description: "Provide direct patient care in hospitals and healthcare facilities.",
    duration: "14 weeks",
    salary: "$35K-$45K",
  },
  {
    name: "Sterile Processing",
    slug: "sterile-processing",
    description: "Ensure medical instruments are properly sterilized and maintained.",
    duration: "12 weeks",
    salary: "$37K-$47K",
  },
  {
    name: "Healthcare Administration",
    slug: "healthcare-administration",
    description: "Manage healthcare office operations and patient records.",
    duration: "16 weeks",
    salary: "$40K-$50K",
  },
];

const steps = [
  {
    title: "Apply Online",
    description: "Complete our simple application form in just 10 minutes.",
  },
  {
    title: "Check Eligibility",
    description: "We'll help you determine which funding programs you qualify for.",
  },
  {
    title: "Choose Your Program",
    description: "Select the healthcare career path that's right for you.",
  },
  {
    title: "Start Training",
    description: "Begin your journey to a new career with expert instruction.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    program: "Medical Assistant",
    quote: "This program changed my life. I went from unemployed to working at a great hospital in just 3 months. The training was excellent and completely free!",
  },
  {
    name: "Michael Davis",
    program: "Phlebotomy Technician",
    quote: "I was skeptical at first, but the support I received was amazing. Now I have a stable career and I'm earning more than I ever thought possible.",
  },
  {
    name: "Jennifer Martinez",
    program: "Dental Assistant",
    quote: "As a single mom, I couldn't afford traditional schooling. This program gave me the skills and certification I needed without any debt.",
  },
];

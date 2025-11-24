// app/page.tsx - Elevate For Humanity Homepage
// REAL business model: We CONNECT people to training, we don't run a campus
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, DollarSign, Clock, Award, MapPin, Phone, Mail } from "lucide-react";

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 mb-6">
                <Award size={16} />
                <span>100% FREE • We Handle the Paperwork</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                We Connect You to{" "}
                <span className="text-red-600">Free Career Training</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                We know people, pathways, and approvals. We connect Indiana residents to fully-funded training at partner locations. Barber shops, HVAC companies, trucking schools, medical clinics. We handle the funding paperwork. You focus on learning.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">We handle WIOA, WRG, and JRI funding paperwork</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Schedule appointments at Indiana Connect/WorkOne</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Train at real shops, labs, and job sites across Indiana</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Case management and job placement support</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105"
                >
                  Check My Eligibility
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-red-600 hover:text-red-600 transition-all"
                >
                  See Training Options
                </Link>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">Questions? Contact us:</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <a href="tel:+13173143757" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition">
                    <Phone size={16} />
                    (317) 314-3757
                  </a>
                  <a href="mailto:elizabethpowell6262@gmail.com" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition">
                    <Mail size={16} />
                    elizabethpowell6262@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - How It Works */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Apply Online</h4>
                      <p className="text-sm text-slate-600">Tell us what you want to learn. Takes 10 minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">We Handle Funding</h4>
                      <p className="text-sm text-slate-600">We check your eligibility and submit paperwork for WIOA, WRG, or JRI.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Schedule at Indiana Connect</h4>
                      <p className="text-sm text-slate-600">Book your appointment at WorkOne/Indiana Connect.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Start Training</h4>
                      <p className="text-sm text-slate-600">Train at partner locations. We provide ongoing support.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">5</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Get Hired</h4>
                      <p className="text-sm text-slate-600">We connect you with employers ready to hire.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-200">
                <div className="text-3xl font-bold text-red-600">$0</div>
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
              Choose Your Career Path
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              All programs are 100% funded through WIOA, WRG, and JRI. No tuition, no debt. Real jobs waiting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-red-300 transition-all"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
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
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-red-600" />
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
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
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
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105"
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
              <div className="text-5xl font-bold text-orange-400 mb-2">$0</div>
              <div className="text-slate-300">Tuition Cost</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">8+</div>
              <div className="text-slate-300">Career Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">85%</div>
              <div className="text-slate-300">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">$45K</div>
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
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
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
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Read More Success Stories
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
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
    name: "VITA Tax Preparation",
    slug: "vita",
    description: "Become an IRS-certified tax preparer. Help families file taxes and earn income year-round.",
    duration: "8-12 weeks",
    salary: "$35K-$55K",
  },
  {
    name: "Barber Apprenticeship",
    slug: "barber",
    description: "Learn barbering in a real shop. Get licensed and start your own business or work anywhere.",
    duration: "12 months",
    salary: "$30K-$60K+",
  },
  {
    name: "Medical Assistant",
    slug: "medical-assistant",
    description: "Work in clinics and hospitals. Take vitals, assist doctors, manage patient records.",
    duration: "8-12 weeks",
    salary: "$35K-$45K",
  },
  {
    name: "HVAC Technician",
    slug: "hvac",
    description: "Install and repair heating and cooling systems. High demand, great pay, work anywhere.",
    duration: "12 weeks",
    salary: "$40K-$65K",
  },
  {
    name: "CDL Training",
    slug: "cdl",
    description: "Get your Commercial Driver's License. Drive trucks, earn great money, see the country.",
    duration: "4 weeks",
    salary: "$50K-$75K",
  },
  {
    name: "Building Maintenance",
    slug: "building-maintenance",
    description: "Learn plumbing, electrical, HVAC basics. Maintain buildings, apartments, facilities.",
    duration: "10-12 weeks",
    salary: "$35K-$55K",
  },
  {
    name: "Digital Skills",
    slug: "digital-skills",
    description: "Master Microsoft Office, Google Workspace, email, and essential computer skills.",
    duration: "6-8 weeks",
    salary: "$30K-$45K",
  },
  {
    name: "Re-Entry Coaching",
    slug: "reentry",
    description: "For justice-involved individuals. Career coaching, job placement, second-chance employers.",
    duration: "Ongoing",
    salary: "Varies",
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
    name: "Marcus T.",
    program: "Barber Apprenticeship",
    quote: "I went from cutting hair in my kitchen to owning my own shop. Elevate helped me get licensed and connected me with mentors. Now I'm my own boss.",
  },
  {
    name: "Jennifer R.",
    program: "Medical Assistant",
    quote: "As a single mom, I couldn't afford school. This program was completely free and I got hired at a clinic before I even finished. Life-changing.",
  },
  {
    name: "David L.",
    program: "CDL Training",
    quote: "Got my CDL in 4 weeks, no cost. Now I'm making $60K driving for a great company. Best decision I ever made.",
  },
];

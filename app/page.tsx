import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Award, Briefcase, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Free Workforce Training in Indianapolis",
  description: "100% free career training through WIOA, WRG, JRI, and apprenticeship programs. No tuition, no debt. Real jobs waiting.",
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-6 py-3 text-sm font-bold text-teal-700 mb-8">
              <CheckCircle size={20} />
              <span>100% Free Training • No Tuition • No Debt</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Your Career Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed">
              Free workforce training through government-funded programs. Get certified, get hired, get paid.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg text-lg"
              >
                Apply Now - It's Free
                <ArrowRight size={24} className="ml-2" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-all text-lg"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING PROGRAMS */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            100% Funded Through
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-slate-200 rounded-xl">
              <p className="text-2xl font-bold text-teal-600 mb-2">WIOA</p>
              <p className="text-xs text-slate-600">Workforce Innovation & Opportunity Act</p>
            </div>
            <div className="text-center p-6 border border-slate-200 rounded-xl">
              <p className="text-2xl font-bold text-orange-600 mb-2">WRG</p>
              <p className="text-xs text-slate-600">Workforce Ready Grant</p>
            </div>
            <div className="text-center p-6 border border-slate-200 rounded-xl">
              <p className="text-2xl font-bold text-blue-600 mb-2">JRI</p>
              <p className="text-xs text-slate-600">Justice Reinvestment Initiative</p>
            </div>
            <div className="text-center p-6 border border-slate-200 rounded-xl">
              <p className="text-2xl font-bold text-purple-600 mb-2">Apprenticeships</p>
              <p className="text-xs text-slate-600">DOL Registered Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three simple steps to start your new career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border-2 border-teal-200 rounded-2xl">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Apply</h3>
              <p className="text-slate-700 leading-relaxed">
                Fill out our simple application. We'll check your eligibility for government funding programs.
              </p>
            </div>

            <div className="text-center p-8 border-2 border-orange-200 rounded-2xl">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Train</h3>
              <p className="text-slate-700 leading-relaxed">
                Get certified in 4-12 weeks. Hands-on training with industry experts. 100% free.
              </p>
            </div>

            <div className="text-center p-8 border-2 border-blue-200 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Get Hired</h3>
              <p className="text-slate-700 leading-relaxed">
                Our team connects you with employers. Many students have jobs before graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Training Programs
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose your path to a better career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-teal-600 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${program.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                  {program.description}
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold">Duration:</span> {program.duration}
                  </p>
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold">Salary:</span> {program.salary}
                  </p>
                </div>
                <div className="inline-flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Learn More</span>
                  <ArrowRight size={18} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-all shadow-lg"
            >
              View All Programs
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-slate-600">
              Real results from real people
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 border-2 border-teal-200 rounded-2xl">
              <div className="text-5xl font-bold text-teal-600 mb-2">500+</div>
              <p className="text-slate-700 font-semibold">Students Trained</p>
            </div>
            <div className="text-center p-8 border-2 border-orange-200 rounded-2xl">
              <div className="text-5xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-slate-700 font-semibold">Job Placement Rate</p>
            </div>
            <div className="text-center p-8 border-2 border-blue-200 rounded-2xl">
              <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-slate-700 font-semibold">Training Programs</p>
            </div>
            <div className="text-center p-8 border-2 border-purple-200 rounded-2xl">
              <div className="text-5xl font-bold text-purple-600 mb-2">100+</div>
              <p className="text-slate-700 font-semibold">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Elevate for Humanity
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're more than just training—we're your partner in career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 border-2 border-slate-200 rounded-2xl hover:border-teal-600 transition-all">
                <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center mb-6`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Apply now for 100% free training. No tuition, no debt, real jobs waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg text-lg"
            >
              Apply Now - It's Free
              <ArrowRight size={24} className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-all text-lg"
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
    title: "Healthcare",
    description: "CNA, Medical Assistant, Phlebotomy",
    duration: "4-10 weeks",
    salary: "$35K-$45K",
    link: "/programs/cna",
    color: "bg-teal-600",
    icon: <Users size={32} className="text-white" />,
  },
  {
    title: "Skilled Trades",
    description: "HVAC, Electrical, Plumbing",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    link: "/programs/hvac",
    color: "bg-orange-600",
    icon: <Award size={32} className="text-white" />,
  },
  {
    title: "Beauty & Wellness",
    description: "Barber, Cosmetology, Esthetics",
    duration: "12 weeks",
    salary: "$30K-$55K",
    link: "/programs/barber",
    color: "bg-pink-600",
    icon: <GraduationCap size={32} className="text-white" />,
  },
  {
    title: "Transportation",
    description: "CDL, Logistics, Delivery",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    link: "/programs/cdl",
    color: "bg-blue-600",
    icon: <Briefcase size={32} className="text-white" />,
  },
];

const benefits = [
  {
    title: "100% Free Training",
    description: "No tuition, no fees, no hidden costs. Government-funded programs cover everything.",
    color: "bg-teal-600",
    icon: <CheckCircle size={24} className="text-white" />,
  },
  {
    title: "Fast Track to Employment",
    description: "Get certified in weeks, not years. Start earning quickly with in-demand skills.",
    color: "bg-orange-600",
    icon: <Award size={24} className="text-white" />,
  },
  {
    title: "Job Placement Support",
    description: "Our team connects you with employers. 85% of graduates get hired within 90 days.",
    color: "bg-blue-600",
    icon: <Briefcase size={24} className="text-white" />,
  },
  {
    title: "Hands-On Training",
    description: "Learn by doing with real equipment and industry-standard tools.",
    color: "bg-purple-600",
    icon: <Users size={24} className="text-white" />,
  },
  {
    title: "Flexible Schedules",
    description: "Day and evening classes available to fit your life and responsibilities.",
    color: "bg-green-600",
    icon: <GraduationCap size={24} className="text-white" />,
  },
  {
    title: "Support Services",
    description: "Housing assistance, mental health services, life coaching, and more.",
    color: "bg-indigo-600",
    icon: <CheckCircle size={24} className="text-white" />,
  },
];

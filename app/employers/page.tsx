// app/employers/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Briefcase, TrendingUp, Award, Target, Clock, DollarSign, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Employers | Elevate For Humanity",
  description: "Partner with Elevate for Humanity to access skilled, certified healthcare professionals. Reduce hiring costs, improve retention, and build your talent pipeline.",
  keywords: ["employer partnerships", "hire trained workers", "workforce solutions", "talent pipeline", "healthcare staffing"],
  openGraph: {
    title: "For Employers | Elevate For Humanity",
    description: "Partner with Elevate for Humanity to access skilled, certified healthcare professionals.",
    images: ["/images/facilities-new/facility-1.jpg"],
    type: "website",
  },
};

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-emerald-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-brandPrimary mb-6">
                <Briefcase size={16} />
                <span>Employer Partnerships</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Build Your Workforce with Skilled, Certified Professionals
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Partner with Elevate for Humanity to access a pipeline of job-ready healthcare professionals. Our graduates are trained to your industry standards, certified, and ready to contribute from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brandPrimary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brandPrimaryDark transition-all hover:scale-105"
                >
                  Partner With Us
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="#benefits"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-brandPrimary hover:text-brandPrimary transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/employers-hero.jpg"
                  alt="Employer partnerships"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Partner With Elevate?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We make hiring easier, faster, and more cost-effective while delivering qualified candidates who are ready to work.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-start p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Our Partnership Works
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A simple, streamlined process to connect you with qualified candidates.
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-red-600 to-orange-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Workforce?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Partner with Elevate for Humanity and gain access to a pipeline of skilled, certified healthcare professionals. No cost to you, just quality candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brandPrimary shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Partner With Us
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Call Us: (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const benefits = [
  {
    icon: <DollarSign size={24} className="text-brandPrimary" />,
    title: "Zero Recruiting Costs",
    description: "No fees, no commissions. Access qualified candidates at no cost to your organization.",
  },
  {
    icon: <Award size={24} className="text-brandPrimary" />,
    title: "Certified Professionals",
    description: "All graduates hold industry-recognized certifications and are job-ready.",
  },
  {
    icon: <Clock size={24} className="text-brandPrimary" />,
    title: "Faster Hiring",
    description: "Reduce time-to-hire with pre-screened, trained candidates ready to start.",
  },
  {
    icon: <TrendingUp size={24} className="text-brandPrimary" />,
    title: "Better Retention",
    description: "Our graduates have higher retention rates due to comprehensive training.",
  },
  {
    icon: <Target size={24} className="text-brandPrimary" />,
    title: "Custom Training",
    description: "We can tailor curriculum to meet your specific organizational needs.",
  },
  {
    icon: <Shield size={24} className="text-brandPrimary" />,
    title: "Quality Guarantee",
    description: "Rigorous training standards ensure graduates meet your expectations.",
  },
];

const steps = [
  {
    title: "Connect",
    description: "Reach out to discuss your hiring needs and workforce challenges.",
  },
  {
    title: "Collaborate",
    description: "We align our training with your specific requirements and standards.",
  },
  {
    title: "Recruit",
    description: "Get early access to our graduates before they complete training.",
  },
  {
    title: "Hire",
    description: "Onboard certified, job-ready professionals into your organization.",
  },
];

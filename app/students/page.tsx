// app/students/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Heart, Briefcase, GraduationCap, DollarSign, Clock, Award, BookOpen, Home, Baby } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Students | Elevate For Humanity",
  description: "Discover free career training programs, support services, and resources designed to help you succeed. No tuition, no debt, just opportunity.",
  keywords: ["student resources", "career training", "free education", "support services", "student success"],
};

export default function StudentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
                <GraduationCap size={16} />
                <span>Student Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Your Success Is Our Mission
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We understand that life happens. That's why we provide comprehensive support services to help you overcome barriers and achieve your career goals. From childcare assistance to transportation support, we're here for you every step of the way.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
                >
                  Apply Now - It's Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all"
                >
                  Talk to an Advisor
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/students-hero.jpg"
                  alt="Students in training"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Students Choose Elevate
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're more than just a training program. We're a community dedicated to your success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
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

      {/* Support Services Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Comprehensive Support Services
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We know that barriers exist. That's why we offer wraparound support services to help you focus on your training and succeed in your new career.
              </p>

              <div className="space-y-4">
                {supportServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/support-services.jpg"
                  alt="Support services"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              All programs are 100% funded and lead to industry-recognized certifications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={`/programs/${program.slug}`}
                className="group bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <GraduationCap size={24} className="text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {program.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} />
                    {program.salary}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
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

      {/* Student Journey Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Journey to Success
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From application to employment, we're with you every step of the way.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, index) => (
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
                {index < journey.length - 1 && (
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hear from students who transformed their lives through our programs.
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
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
const benefits = [
  {
    icon: <DollarSign size={32} className="text-emerald-600" />,
    title: "100% Free Training",
    description: "No tuition, no fees, no hidden costs. Fully funded through state and federal programs.",
  },
  {
    icon: <Clock size={32} className="text-emerald-600" />,
    title: "Flexible Schedules",
    description: "Full-time, part-time, and evening options to fit your life and responsibilities.",
  },
  {
    icon: <Award size={32} className="text-emerald-600" />,
    title: "Industry Certifications",
    description: "Earn recognized credentials that employers value and trust.",
  },
  {
    icon: <Briefcase size={32} className="text-emerald-600" />,
    title: "Job Placement",
    description: "85% job placement rate with local employers ready to hire our graduates.",
  },
  {
    icon: <Heart size={32} className="text-emerald-600" />,
    title: "Support Services",
    description: "Childcare, transportation, and other barrier assistance available.",
  },
  {
    icon: <Users size={32} className="text-emerald-600" />,
    title: "Small Class Sizes",
    description: "Personalized attention and hands-on training in supportive environments.",
  },
];

const supportServices = [
  {
    icon: <Baby size={20} className="text-blue-600" />,
    title: "Childcare Assistance",
    description: "Help with childcare costs so you can focus on your training.",
  },
  {
    icon: <Home size={20} className="text-blue-600" />,
    title: "Transportation Support",
    description: "Gas cards, bus passes, and other transportation assistance.",
  },
  {
    icon: <BookOpen size={20} className="text-blue-600" />,
    title: "Books & Supplies",
    description: "All required materials provided at no cost to you.",
  },
  {
    icon: <Users size={20} className="text-blue-600" />,
    title: "Career Counseling",
    description: "One-on-one guidance from enrollment through job placement.",
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

const journey = [
  {
    title: "Apply",
    description: "Complete our simple application in just 10 minutes.",
  },
  {
    title: "Get Funded",
    description: "We help you access free training through state/federal programs.",
  },
  {
    title: "Train",
    description: "Learn from expert instructors with hands-on experience.",
  },
  {
    title: "Get Hired",
    description: "Secure employment with our job placement assistance.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    program: "Medical Assistant",
    quote: "This program changed my life. I went from unemployed to working at a great hospital in just 3 months. The support was incredible!",
  },
  {
    name: "Michael Davis",
    program: "Phlebotomy Technician",
    quote: "As a single dad, I couldn't afford traditional schooling. This program gave me the skills I needed without any debt.",
  },
  {
    name: "Jennifer Martinez",
    program: "Dental Assistant",
    quote: "The instructors genuinely cared about my success. They helped me overcome every barrier and now I have a career I love.",
  },
];

// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Target, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Elevate For Humanity",
  description: "Learn about Elevate for Humanity's mission to provide free career training and workforce development in 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240. Empowering communities through education.",
  keywords: ["about elevate", "mission", "workforce development", "community impact", "Marion County"],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 mb-6">
              <Heart size={16} />
              <span>Our Story</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Elevating Communities Through Career Training
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Elevate for Humanity is a workforce development organization dedicated to providing 100% free career training to individuals in 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240, and beyond. We believe everyone deserves access to quality education and meaningful employment, regardless of their circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
              <div className="w-16 h-16 rounded-xl bg-red-600 flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To empower individuals through accessible, high-quality career training that leads to meaningful employment and economic self-sufficiency. We remove barriers to education by providing 100% funded programs, comprehensive support services, and direct pathways to employment.
              </p>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                A community where every individual has access to the training and resources needed to build a successful career. We envision a future where economic barriers don't prevent anyone from achieving their full potential and contributing to their community's prosperity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                What We Do
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We provide comprehensive workforce development solutions that connect individuals with high-demand careers in healthcare and other growing industries.
              </p>

              <div className="space-y-4">
                {whatWeDo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <CheckCircle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/about-what-we-do.jpg"
                  alt="What we do"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Making a real difference in our community through education and employment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-slate-300">Students Trained</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">85%</div>
              <div className="text-slate-300">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">$0</div>
              <div className="text-slate-300">Cost to Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-slate-300">Employer Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Commitment Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Commitment to Marion County
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're deeply rooted in 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240, and committed to strengthening our local community through workforce development.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {commitments.map((commitment, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  {commitment.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {commitment.title}
                </h3>
                <p className="text-slate-600">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Elevating Our Community
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Whether you're looking to start a new career or partner with us to build your workforce, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Apply for Training
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
const values = [
  {
    icon: <Heart size={24} className="text-red-600" />,
    title: "Accessibility",
    description: "We remove financial and logistical barriers to ensure everyone can access quality training.",
  },
  {
    icon: <Award size={24} className="text-red-600" />,
    title: "Excellence",
    description: "We maintain high standards in training, ensuring graduates are truly job-ready.",
  },
  {
    icon: <Users size={24} className="text-red-600" />,
    title: "Community",
    description: "We're committed to strengthening our local community through workforce development.",
  },
  {
    icon: <CheckCircle size={24} className="text-red-600" />,
    title: "Integrity",
    description: "We operate with transparency, honesty, and accountability in all we do.",
  },
  {
    icon: <Target size={24} className="text-red-600" />,
    title: "Results",
    description: "We focus on measurable outcomes: certifications earned and jobs secured.",
  },
  {
    icon: <TrendingUp size={24} className="text-red-600" />,
    title: "Innovation",
    description: "We continuously improve our programs to meet evolving workforce needs.",
  },
];

const whatWeDo = [
  {
    title: "Free Career Training",
    description: "100% funded programs in high-demand healthcare careers with no cost to students.",
  },
  {
    title: "Support Services",
    description: "Comprehensive wraparound services including childcare, transportation, and counseling.",
  },
  {
    title: "Industry Certifications",
    description: "All programs lead to recognized credentials that employers value.",
  },
  {
    title: "Job Placement",
    description: "Direct connections to employers with 85% placement rate for graduates.",
  },
  {
    title: "Employer Partnerships",
    description: "Collaboration with local healthcare providers to ensure training meets industry needs.",
  },
  {
    title: "Ongoing Support",
    description: "Continued career counseling and professional development after graduation.",
  },
];

const commitments = [
  {
    icon: <Users size={32} className="text-red-600" />,
    title: "Local Focus",
    description: "We prioritize serving Marion County residents and connecting them with local employers.",
  },
  {
    icon: <Heart size={32} className="text-red-600" />,
    title: "Barrier Removal",
    description: "We understand local challenges and provide targeted support to overcome them.",
  },
  {
    icon: <TrendingUp size={32} className="text-red-600" />,
    title: "Economic Growth",
    description: "We contribute to community prosperity by creating pathways to family-sustaining careers.",
  },
];

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Briefcase, Award, TrendingUp, Heart } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/about",
  },
  title: "About | Elevate For Humanity",
  description: "We believe your past doesn't define your future. Free career training for people who need a second chance.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section with Text Overlay */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/images/heroes/hero-students.jpg"
          alt="Students succeeding"
          fill
          className="object-cover brightness-50"
          priority
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Elevate For Humanity
            </h1>
            <p className="text-2xl md:text-3xl mb-4 max-w-3xl">
              Transforming Lives Through Free Career Training
            </p>
            <p className="text-xl text-white/90 max-w-2xl">
              We believe your past doesn't define your future. Everyone deserves a chance to build a better life.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Elevate For Humanity started with a simple question: Why are talented, hardworking people stuck in dead-end jobs?
          </p>
          
          <p className="text-lg text-slate-600 mb-6">
            The answer wasn't lack of potential. It was lack of access—to training, to funding, to employers willing to give them a chance.
          </p>
          
          <p className="text-lg text-slate-600 mb-6">
            We met Maria, a single mom working two jobs who couldn't afford childcare to attend training. We met James, who spent five years incarcerated and wanted to work but couldn't get past background checks. We met Linda, laid off after 20 years at a factory with no idea how to start over.
          </p>
          
          <p className="text-lg text-slate-600 mb-6">
            So we built something different. Not just training, but real support: housing assistance, mental health services, life coaching, transportation, childcare. And most importantly, connections to employers who hire based on skills, not resumes.
          </p>
          
          <p className="text-lg text-slate-600 mb-6">
            Today, Maria is a licensed CNA earning $45,000 a year with benefits. James owns his own barbershop. Linda runs a successful tax preparation business from home.
          </p>
          
          <p className="text-lg text-slate-600">
            We've helped thousands of people go from unemployment to careers, from minimum wage to $40K-$60K+ salaries, from hopeless to hopeful. And we're just getting started.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Training</h3>
              <p className="text-slate-600">
                We connect you to 100% free career training through WRG, WIOA, and employer partnerships. No tuition. No debt.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support Services</h3>
              <p className="text-slate-600">
                Housing help, mental health services, life coaching, transportation, childcare—we remove barriers so you can focus on training.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Job Placement</h3>
              <p className="text-slate-600">
                We partner with 100+ employers who hire our graduates. Many students get job offers before they even finish training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2 text-3xl md:text-4xl lg:text-5xl">10,000+</div>
              <div className="text-slate-600">Students Trained</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2 text-3xl md:text-4xl lg:text-5xl">85%</div>
              <div className="text-slate-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2 text-3xl md:text-4xl lg:text-5xl">$45K</div>
              <div className="text-slate-600">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Approvals */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Official Approvals</h2>
          
          <p className="text-center text-slate-600 mb-8">
            We're not just a training provider—we're officially approved by state and federal agencies.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">✓ Indiana Department of Workforce Development</h3>
              <p className="text-sm text-slate-600">INTraining Program Location ID: 10004621</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">✓ WIOA Eligible Training Provider (ETP)</h3>
              <p className="text-sm text-slate-600">Approved for federal workforce funding</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">✓ Workforce Ready Grant (WRG) Approved</h3>
              <p className="text-sm text-slate-600">Indiana's free training program</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-2">✓ U.S. Department of Labor Registered</h3>
              <p className="text-sm text-slate-600">Apprenticeship Sponsor (RAPIDS ID: 2025-IN-132301)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Elizabeth */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/team/elizabeth-greene.jpg"
                alt="Elizabeth Greene, CEO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Meet Elizabeth Greene</h2>
              <p className="text-lg text-slate-700 mb-4">
                <strong>CEO & Founder</strong>
              </p>
              <p className="text-slate-600 mb-4">
                Elizabeth founded Elevate For Humanity with a simple belief: everyone deserves a chance to build a better life, regardless of their past.
              </p>
              <p className="text-slate-600 mb-4">
                Before starting Elevate, she worked in workforce development and saw firsthand how broken the system was. People wanted to work, but couldn't access training. Training existed, but people couldn't afford it. Employers were hiring, but couldn't find qualified candidates.
              </p>
              <p className="text-slate-600">
                So she built a bridge. Today, Elevate For Humanity connects thousands of people to free training and real careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl mb-8">Contact us today. We'll help you find free training and a path to employment.</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg shadow-xl"
          >
            Contact Us
          </Link>
          <p className="mt-6 text-white/90">
            Call <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}

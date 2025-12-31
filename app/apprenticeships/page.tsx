"use client";

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Building2
} from 'lucide-react';


const apprenticeshipPrograms = programs.filter(
  (p) =>
    p.slug.includes('apprenticeship') ||
    p.slug === 'barber-apprenticeship' ||
    p.fundingOptions.some((f) => f.toLowerCase().includes('apprenticeship'))
);

export default function ApprenticeshipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/artlist/hero-training-9.jpg"
            alt="Apprenticeship training"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Animated Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30 mb-6">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-orange-100 font-semibold">U.S. Department of Labor Registered</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
              Apprenticeship Programs
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 max-w-4xl mx-auto">
              Earn While You Learn. Earn & Learn to Train.
            </p>
            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Combine on-the-job training with classroom instruction. Graduate with industry certifications and zero debt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/apprenticeships/apply"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 uppercase"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#programs"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border-3 border-white bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-black text-white hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 uppercase"
              >
                View Programs
                <Briefcase className="w-5 h-5" />
              </Link>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <DollarSign className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-black mb-1">Earn & Learn</div>
                <div className="text-sm text-gray-200">Paid Training</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <GraduationCap className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-black mb-1">No Debt</div>
                <div className="text-sm text-gray-200">Zero Cost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Award className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-black mb-1">Certified</div>
                <div className="text-sm text-gray-200">Industry Credentials</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-black mb-1">Career</div>
                <div className="text-sm text-gray-200">Career Path</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is an Apprenticeship */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What is a Registered Apprenticeship?
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            A Registered Apprenticeship is a proven model of job training that
            combines on-the-job learning with classroom instruction. You get
            paid while you learn, earn industry certifications, and graduate
            with zero debt.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Earn While You Learn
              </h3>
              <p className="text-slate-700">
                Get paid from day one. Work with a real employer while
                completing your training.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Industry Certifications
              </h3>
              <p className="text-slate-700">
                Graduate with nationally recognized credentials that employers
                value.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Zero Debt
              </h3>
              <p className="text-slate-700">
                No tuition. No loans. Just training that leads to a career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apprenticeship Programs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Available Apprenticeship Programs
          </h2>

          {apprenticeshipPrograms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apprenticeshipPrograms.map((program) => (
                <div
                  key={program.slug}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={program.heroImage}
                      alt={program.heroImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{program.name}</h3>
                    <p className="text-slate-600 mb-4">
                      {program.shortDescription}
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-slate-700">
                        <strong>Duration:</strong> {program.duration}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Delivery:</strong> {program.delivery}
                      </p>
                      {program.price && (
                        <p className="text-sm text-slate-700">
                          <strong>Self-Pay:</strong> $
                          {program.price.toLocaleString()}
                          <br />
                          <span className="text-xs text-slate-500">
                            If funding not available, split over 6 months: $
                            {(program.price / 6).toFixed(2)}/month
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="bg-green-50 rounded p-3 mb-4">
                      <p className="text-sm font-semibold text-green-900 mb-1">
                        Funding Options:
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {program.fundingOptions.map((option, idx) => (
                          <li key={idx}>• {option}</li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="block w-full text-center bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-slate-600 mb-4">
                We're currently developing new apprenticeship programs. Check
                back soon or contact us to learn about upcoming opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

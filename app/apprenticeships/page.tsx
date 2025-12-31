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
    <div className="min-h-screen bg-white">
      {/* Video Hero Banner - Wix Style */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/apprenticeships-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-6xl w-full rich-animate">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
              />
            </div>
            
            {/* Badge */}
            <div className="rich-badge mb-8 bg-orange-500/20 border-orange-500/30 text-orange-100">
              <Award className="w-5 h-5" />
              <span>U.S. Department of Labor Registered</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              APPRENTICESHIP PROGRAMS
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              Earn While You Learn. Earn & Learn to Train.
            </h2>
            
            {/* Body */}
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Combine on-the-job training with classroom instruction. Graduate with industry certifications and zero debt.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/apprenticeships/apply"
                className="rich-button-primary uppercase inline-flex items-center gap-3"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#programs"
                className="rich-button-secondary text-white border-white hover:bg-white hover:text-orange-600 uppercase inline-flex items-center gap-3"
              >
                <span>View Programs</span>
                <Briefcase className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Wix Style */}
      <section className="rich-section bg-white">
        <div className="rich-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="rich-animate">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-green-500 to-green-600">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="rich-stat-number text-4xl">Earn & Learn</div>
              <div className="rich-stat-label">Paid Training</div>
            </div>
            <div className="rich-animate">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-blue-500 to-blue-600">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="rich-stat-number text-4xl">No Debt</div>
              <div className="rich-stat-label">Zero Cost</div>
            </div>
            <div className="rich-animate">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-yellow-500 to-yellow-600">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="rich-stat-number text-4xl">Certified</div>
              <div className="rich-stat-label">Industry Credentials</div>
            </div>
            <div className="rich-animate">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-orange-500 to-orange-600">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="rich-stat-number text-4xl">Career</div>
              <div className="rich-stat-label">Career Path</div>
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

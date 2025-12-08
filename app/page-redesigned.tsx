'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Users, Award, Briefcase, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mounted, setMounted] = useState(false);

  const banners = [
    { 
      title: "No-Cost Career Training for Eligible Participants", 
      subtitle: "State-Approved ETPL Provider • DOL Registered Apprenticeship Sponsor",
      description: "Workforce Innovation and Opportunity Act (WIOA) funded training programs leading to industry-standard-recognized credentials and employment opportunities.",
      image: "/images/efh/hero/hero-health.jpg",
      badge: "ETPL Approved Provider"
    },
    { 
      title: "Indusstart-Aligned Training Programs", 
      subtitle: "Healthcare • Skilled Trades • Information Technology • Business Services",
      description: "Competency-based training delivered by qualified instructors in accordance with state and federal workforce development standards.",
      image: "/media-backup-20251128-043832/state-funding-hero.jpg",
      badge: "Indusstart-Recognized Credentials"
    },
    { 
      title: "Comprehensive Support Services", 
      subtitle: "Career Counseling • Job Placement Assistance • Supportive Services",
      description: "Individualized Employment Plans (IEP) and wraparound services to support your career goals and address barriers to employment.",
      image: "/media-backup-20251128-043832/hero-slide-healthcare.jpg",
      badge: "Career Services Available"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white">
      <section className="relative h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
                sizes="100vw"
              />
              
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                  {/* Badge */}
                  <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                    {banner.badge}
                  </div>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-white/95 mb-4 font-semibold">
                    {banner.subtitle}
                  </p>
                  
                  {/* Title */}
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                    {banner.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl leading-relaxed">
                    {banner.description}
                  </p>
                  
                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/apply"
                      className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl"
                    >
                      Apply Now - It's Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl border-2 border-white"
                    >
                      View Programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        {mounted && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentBanner ? 'bg-white w-12' : 'bg-white/50 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-sm opacity-90">Career Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">92%</div>
              <div className="text-sm opacity-90">Job Placement</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$45K</div>
              <div className="text-sm opacity-90">Avg. Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights with Images */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore high-demand careers with free training, industry-standard certifications, and job placement support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Healthcare */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/programs/efh-cna-hero.jpg"
                  alt="Healthcare Careers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={100}
                />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Healthcare</h3>
                  <p className="text-white/90 text-sm">Medical Assistant • CNA • Pharmacy Tech</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">High Demand</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Start your healthcare career in as little as 8-12 weeks. Get certified and begin helping others.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">8-24 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Salary:</span>
                    <span className="font-semibold">$35K-$45K</span>
                  </div>
                </div>
                <Link
                  href="/programs?category=healthcare"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Healthcare Programs
                </Link>
              </div>
            </div>

            {/* Skilled Trades */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/programs/hvac-hero.jpg"
                  alt="Skilled Trades Careers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={100}
                />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Skilled Trades</h3>
                  <p className="text-white/90 text-sm">HVAC • Electrical • Plumbing • Welding</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">High Earning Potential</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Learn a skilled trade with hands-on training. Earn while you learn through apprenticeships.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">12-52 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Salary:</span>
                    <span className="font-semibold">$45K-$65K</span>
                  </div>
                </div>
                <Link
                  href="/programs?category=trades"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Trade Programs
                </Link>
              </div>
            </div>

            {/* Business & Technology */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/images/programs/efh-building-tech-hero.jpg"
                  alt="Business & Technology Careers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={100}
                />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Business & Tech</h3>
                  <p className="text-white/90 text-sm">IT Support • Medical Billing • Tax Prep</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Indusstart Certified</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Get certified in high-demand business and technology skills. Work remotely or in-office.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">8-20 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Salary:</span>
                    <span className="font-semibold">$40K-$60K</span>
                  </div>
                </div>
                <Link
                  href="/programs?category=business"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Business Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to start your new career
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Apply",
                description: "Complete our simple application. Check your eligibility for free training.",
                icon: "📝",
                image: "/images/general/application-process.jpg"
              },
              {
                step: "2",
                title: "Get Approved",
                description: "We'll verify your eligibility and help you access funding.",
                icon: "✅",
                image: "/images/general/approval-process.jpg"
              },
              {
                step: "3",
                title: "Train",
                description: "Learn from experts with hands-on training and industry-standard certifications.",
                icon: "🎓",
                image: "/images/general/training-process.jpg"
              },
              {
                step: "4",
                title: "Get Hired",
                description: "We connect you with employers and support your job search.",
                icon: "💼",
                image: "/images/general/employment-process.jpg"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-6xl">{item.icon}</span>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-blue-600">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories with Images */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people. Real careers. Real success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Maria Rodriguez",
                program: "Medical Assistant",
                quote: "I went from unemployed to working in healthcare in just 3 months. The training was excellent and job placement support was amazing.",
                salary: "$42,000/year",
                image: "/images/success-stories/maria-medical-assistant.jpg"
              },
              {
                name: "James Wilson",
                program: "HVAC Technician",
                quote: "The apprenticeship program let me earn while I learned. Now I have a great career with benefits and room to grow.",
                salary: "$55,000/year",
                image: "/images/success-stories/james-hvac.jpg"
              },
              {
                name: "Sarah Chen",
                program: "IT Support Specialist",
                quote: "I got my CompTIA A+ certification and landed a remote job. The flexibility is perfect for my family.",
                salary: "$48,000/year",
                image: "/images/success-stories/sarah-it.jpg"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Users className="w-24 h-24 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.program}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Now Earning:</span>
                      <span className="font-bold text-green-600">{story.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Compliance Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Government-Approved Training
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Our programs are approved by state and federal agencies, ensuring quality training and recognized credentials.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="font-bold text-lg mb-2">ETPL Approved</h3>
                <p className="text-sm text-gray-600">Eligible Training Provider List - State of Indiana</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🇺🇸</div>
                <h3 className="font-bold text-lg mb-2">DOL Registered</h3>
                <p className="text-sm text-gray-600">U.S. Department of Labor Registered Apprenticeship Sponsor</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold text-lg mb-2">WIOA Funded</h3>
                <p className="text-sm text-gray-600">Workforce Innovation & Opportunity Act - 100% Free Training</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Equal Opportunity Provider</h3>
              <p className="text-gray-700 mb-4">
                Elevate For Humanity is an equal opportunity employer and program provider. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or political affiliation.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/equal-opportunity" className="text-blue-600 hover:underline">
                  Equal Opportunity Statement
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/grievance" className="text-blue-600 hover:underline">
                  Grievance Procedure
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/accessibility" className="text-blue-600 hover:underline">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-95">
            Apply today and take the first step toward a better future. Training is 100% free for eligible participants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-12 py-5 bg-white text-blue-600 font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl"
            >
              Apply Now - It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-12 py-5 bg-transparent text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Questions? Call us at (317) 314-3757 or email Elevate4humanityedu@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}

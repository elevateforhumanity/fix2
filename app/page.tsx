import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Users, Award, TrendingUp, ArrowRight, Clock, DollarSign, Briefcase } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  const featuredPrograms = [
    {
      id: 1,
      title: 'Certified Nursing Assistant (CNA)',
      category: 'Healthcare',
      duration: '6-8 weeks',
      cost: 'WIOA Funded',
      placement: '92%',
      image: '/media/programs/healthcare-1.jpg',
      slug: 'cna-training',
    },
    {
      id: 2,
      title: 'HVAC Technician',
      category: 'Skilled Trades',
      duration: '12 weeks',
      cost: 'WIOA Funded',
      placement: '88%',
      image: '/media/programs/trades-1.jpg',
      slug: 'hvac-technician',
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      category: 'Technology',
      duration: '16 weeks',
      cost: 'WIOA Funded',
      placement: '85%',
      image: '/media/programs/tech-1.jpg',
      slug: 'web-development',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 bg-red-50 text-red-700 text-xs font-semibold tracking-wide uppercase mb-6 rounded-full">
                  WIOA-Funded Training Programs
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Transform Your Career with <span className="text-red-600">Free Training</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Get the skills employers need through Wisconsin's premier workforce development program. 100% funded training, job placement support, and career services—all at no cost to you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/apply" 
                    className="px-8 py-3.5 bg-red-600 text-white font-semibold hover:bg-red-700 transition text-center"
                  >
                    Check Eligibility
                  </Link>
                  <Link 
                    href="/programs" 
                    className="px-8 py-3.5 bg-white text-slate-700 border border-slate-300 font-semibold hover:bg-slate-50 transition text-center"
                  >
                    View Programs
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>100% Funded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>State Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Job Placement Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/media/homepage-hero.jpg"
                  alt="Students in training"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 md:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600">Three steps to access funded training</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-orange-500 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-2xl mb-6 rounded-lg shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Explore Programs</h3>
                <p className="text-slate-600 leading-relaxed">
                  Browse 12+ state-approved training programs in healthcare, skilled trades, technology, and business. All programs lead to industry-recognized certifications.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-orange-500 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-2xl mb-6 rounded-lg shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Check Eligibility</h3>
                <p className="text-slate-600 leading-relaxed">
                  Complete a quick eligibility check to see if you qualify for WIOA funding. Most Wisconsin residents are eligible based on income or employment status.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-slate-200 hover:border-orange-500 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-2xl mb-6 rounded-lg shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Start Training</h3>
                <p className="text-slate-600 leading-relaxed">
                  Enroll in your program with full tuition, books, and supplies covered. Get job placement support, career counseling, and ongoing mentorship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-2">Featured Programs</h2>
                <p className="text-lg text-slate-600">Start your career in high-demand industries</p>
              </div>
              <Link 
                href="/programs" 
                className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
              >
                View All Programs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPrograms.map((program) => (
                <Link key={program.id} href={`/programs/${program.slug}`} className="group">
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all">
                    <div className="relative h-48">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="success">{program.cost}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="primary" size="sm">{program.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition">
                        {program.title}
                      </h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span>{program.cost}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{program.placement} job placement rate</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12 md:hidden">
              <Link 
                href="/programs" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-semibold hover:border-slate-400 transition"
              >
                View All Programs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-blue-100">Transforming lives across Wisconsin</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">2,500+</div>
                <div className="text-blue-100">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">85%</div>
                <div className="text-blue-100">Job Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">$45K</div>
                <div className="text-blue-100">Average Starting Salary</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Employer Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Elevate Connects</h2>
              <p className="text-xl text-slate-600">Wisconsin's premier workforce development program</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">State-Approved Programs</h3>
                <p className="text-slate-600">
                  All training programs are approved by Wisconsin DWD and meet WIOA eligibility requirements for quality and outcomes.
                </p>
              </div>
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Job Placement Support</h3>
                <p className="text-slate-600">
                  Dedicated career counselors, resume building, interview prep, and direct connections to 50+ hiring employers.
                </p>
              </div>
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ongoing Support</h3>
                <p className="text-slate-600">
                  Case management, childcare assistance, transportation support, and follow-up services for 12 months after graduation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Join 2,500+ Wisconsin residents who have transformed their careers through our WIOA-funded training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/apply" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:shadow-xl transition"
              >
                Apply Now
              </Link>
              <Link 
                href="/programs" 
                className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-100 transition"
              >
                Browse Programs
              </Link>
            </div>
            <p className="text-sm text-slate-400">
              Questions? Call us at (608) 555-0100 or email info@elevateconnects.org
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

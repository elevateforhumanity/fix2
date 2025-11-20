import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Users, Award, TrendingUp, BookOpen, Clock, DollarSign } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Docebo/LearnWorlds Style */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  🎓 100% Free Training • WIOA Funded
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Launch Your Career in
                <span className="block text-yellow-300 mt-2">
                  High-Demand Industries
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Get certified in healthcare, skilled trades, or technology—with zero tuition cost. 
                Join 2,500+ graduates earning $45K+ annually.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Free Training →
                </Link>
                <Link
                  href="/programs"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                >
                  Browse Programs
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm">No Cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm">Job Placement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm">Industry Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">2,500+</div>
                <div className="text-sm text-blue-100">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">95%</div>
                <div className="text-sm text-blue-100">Job Placement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">$45K+</div>
                <div className="text-sm text-blue-100">Avg. Starting Salary</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-yellow-300 mb-2">$0</div>
                <div className="text-sm text-blue-100">Tuition Cost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* PROGRAMS SECTION - WorkKeys Style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-recognized certifications in high-growth fields
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Medical Assistant',
                icon: '🏥',
                duration: '8-12 weeks',
                salary: '$38K/year',
                jobs: '1,200+ openings',
                color: 'from-red-500 to-pink-500'
              },
              {
                title: 'HVAC Technician',
                icon: '🔧',
                duration: '12-16 weeks',
                salary: '$52K/year',
                jobs: '800+ openings',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'CDL Truck Driver',
                icon: '🚛',
                duration: '4-6 weeks',
                salary: '$55K/year',
                jobs: '2,000+ openings',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((program, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                <div className="p-8">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-semibold">{program.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{program.jobs}</span>
                    </div>
                  </div>

                  <Link
                    href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
                    className="block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all group-hover:scale-105"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              View All 6 Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Docebo Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Path to Success
            </h2>
            <p className="text-xl text-gray-600">
              From enrollment to employment in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Free', desc: 'Quick 5-minute application', icon: '📝' },
              { step: '2', title: 'Get Approved', desc: 'WIOA funding verification', icon: '✅' },
              { step: '3', title: 'Train & Certify', desc: 'Hands-on learning', icon: '🎓' },
              { step: '4', title: 'Land Your Job', desc: 'Career placement support', icon: '💼' }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200" />
                )}
                <div className="relative bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - LearnWorlds Style */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maria Rodriguez', role: 'Medical Assistant', quote: 'Went from unemployed to earning $42K in just 3 months!', rating: 5 },
              { name: 'James Wilson', role: 'HVAC Tech', quote: 'Best decision I ever made. Now I own my own business.', rating: 5 },
              { name: 'Sarah Johnson', role: 'CDL Driver', quote: 'Free training changed my life. Making $60K my first year!', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 2,500+ students who've launched successful careers through our free training programs.
          </p>
          <Link
            href="/apply"
            className="inline-block px-12 py-5 bg-yellow-400 text-blue-900 font-bold text-lg rounded-lg hover:bg-yellow-300 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Start Your Application Now →
          </Link>
          <p className="mt-6 text-sm text-blue-200">
            ✓ No cost ✓ No commitment ✓ 5-minute application
          </p>
        </div>
      </section>
    </main>
  );
}

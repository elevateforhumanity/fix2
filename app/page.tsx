import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Users, Award, ArrowRight, Clock, DollarSign, Briefcase, Star, Play, Quote } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  const programs = [
    {
      id: 1,
      title: 'Certified Nursing Assistant (CNA)',
      category: 'Healthcare',
      duration: '6-8 weeks',
      placement: '92%',
      salary: '$32,000/year',
      students: 342,
      rating: 4.8,
      description: 'Launch your healthcare career with state-approved CNA training. Learn patient care, vital signs, and clinical skills in real healthcare settings.',
      highlights: ['State Certification', 'Clinical Experience', 'Job Placement Guaranteed'],
      image: '/media/programs/healthcare-1.jpg',
      slug: 'cna',
    },
    {
      id: 2,
      title: 'HVAC Technician',
      category: 'Skilled Trades',
      duration: '12 weeks',
      placement: '88%',
      salary: '$48,000/year',
      students: 256,
      rating: 4.7,
      description: 'Master heating, cooling, and ventilation systems. Hands-on training with industry-standard equipment and EPA certification prep.',
      highlights: ['EPA Certification', 'Tool Kit Included', 'Apprenticeship Ready'],
      image: '/media/programs/trades-1.jpg',
      slug: 'hvac',
    },
    {
      id: 3,
      title: 'Barber Apprenticeship',
      category: 'Skilled Trades',
      duration: '12-18 months',
      placement: '95%',
      salary: '$35,000/year',
      students: 189,
      rating: 4.9,
      description: 'State-approved apprenticeship program. Learn cutting, styling, and business skills while earning in a real barbershop.',
      highlights: ['Earn While Learning', 'State License', '1,500 Hours Training'],
      image: '/media/programs/barber-hero.jpg',
      slug: 'barber',
    },
    {
      id: 4,
      title: 'Commercial Truck Driving (CDL)',
      category: 'Transportation',
      duration: '4-6 weeks',
      placement: '90%',
      salary: '$55,000/year',
      students: 198,
      rating: 4.6,
      description: 'Get your Class A CDL and start a high-paying career. Behind-the-wheel training with experienced instructors.',
      highlights: ['Class A CDL', 'Job Placement', 'High Demand'],
      image: '/media/programs/truck-driving.jpg',
      slug: 'truck-driving',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      program: 'CNA Certification',
      image: '/media/testimonials/sarah.jpg',
      quote: 'The CNA program changed my life. I went from unemployment to a stable healthcare career in just 8 weeks. The instructors were amazing and the job placement support was incredible.',
      rating: 5,
      outcome: 'Now working at Aurora Medical Center',
    },
    {
      name: 'Michael Rodriguez',
      program: 'HVAC Technician',
      image: '/media/testimonials/michael.jpg',
      quote: 'Best decision I ever made. The hands-on training was exactly what I needed. Within 2 weeks of graduating, I had 3 job offers. Now I am making more than I ever thought possible.',
      rating: 5,
      outcome: 'Earning $52,000/year',
    },
    {
      name: 'David Chen',
      program: 'Barber Apprenticeship',
      image: '/media/testimonials/david.jpg',
      quote: 'I love that I could earn while learning. My mentor taught me everything about the business side too. Now I am planning to open my own shop next year.',
      rating: 5,
      outcome: 'Licensed Barber, Planning Own Business',
    },
  ];

  const stats = [
    { number: '2,500+', label: 'Students Trained', icon: Users },
    { number: '92%', label: 'Job Placement Rate', icon: Briefcase },
    { number: '12+', label: 'Career Programs', icon: Award },
    { number: '$45K', label: 'Average Starting Salary', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold tracking-wide uppercase mb-6 rounded-full">
                  🎓 100% WIOA-Funded Training
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Transform Your Life with <span className="text-red-500">Free Career Training</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Get the skills employers need through Wisconsin&apos;s premier workforce development program. 100% funded training, job placement support, and career services—all at no cost to you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="/apply" 
                    className="px-8 py-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition text-center rounded-lg text-lg shadow-lg hover:shadow-xl"
                  >
                    Check Your Eligibility →
                  </Link>
                  <Link 
                    href="/programs" 
                    className="px-8 py-4 bg-white text-slate-900 font-semibold hover:bg-gray-100 transition text-center rounded-lg text-lg shadow-lg"
                  >
                    Explore Programs
                  </Link>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>No Tuition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>State Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Job Guaranteed</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <Image
                    src="/media/homepage-hero.jpg"
                    alt="Students in training"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">2,500+ Graduates</div>
                      <div className="text-sm text-slate-600">92% Job Placement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-8 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                    <div className="text-slate-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 px-4 md:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-red-50 text-red-700 text-sm font-semibold tracking-wide uppercase mb-4 rounded-full">
                🎯 HIGH-DEMAND CAREERS
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Our Training Programs</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose from career paths with guaranteed job placement. All programs are 100% funded through WIOA.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program) => (
                <div key={program.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-red-600">
                  <div className="relative h-72">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-red-600 text-white">100% FUNDED</Badge>
                        <Badge className="bg-white/90 text-slate-900">{program.category}</Badge>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {program.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{program.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{program.students} students</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                      {program.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">{program.duration}</div>
                        <div className="text-xs text-slate-600">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">{program.placement}</div>
                        <div className="text-xs text-slate-600">Job Placement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{program.salary}</div>
                        <div className="text-xs text-slate-600">Avg. Salary</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={`/programs/${program.slug}`}
                      className="block w-full py-4 bg-red-600 text-white text-center font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      View Program Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition text-lg"
              >
                View All 12+ Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold tracking-wide uppercase mb-4 rounded-full">
                💚 SUCCESS STORIES
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Real Students, Real Results</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hear from graduates who transformed their careers through our programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-8 relative">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-red-200" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.program}</div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>{testimonial.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/success-stories"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg"
              >
                Read More Success Stories
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-red-600 to-orange-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-bold mb-6">Ready to Start Your New Career?</h2>
            <p className="text-xl mb-8 text-white/90">
              Check your eligibility in under 2 minutes. Most Wisconsin residents qualify for 100% funded training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/apply"
                className="px-10 py-5 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg shadow-xl"
              >
                Check Eligibility Now →
              </Link>
              <Link 
                href="/contact"
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

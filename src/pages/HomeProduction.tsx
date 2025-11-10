import { Link } from 'react-router-dom';
import { Button, Section } from '../components/ds';
import ProgramsPreview from '../components/ProgramsPreview';
import PartnersBand from '../components/PartnersBand';
import TestimonialsHome from '../components/TestimonialsHome';
import SuccessToast from '../components/SuccessToast';

export default function HomeProduction() {
  return (
    <>
      <SuccessToast />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-slate-900 text-lg">Elevate for Humanity</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#programs" className="text-slate-700 hover:text-amber-600 transition-colors">Programs</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-amber-600 transition-colors">How It Works</a>
              <a href="/partners" className="text-slate-700 hover:text-amber-600 transition-colors">Partners</a>
              <a href="#contact" className="text-slate-700 hover:text-amber-600 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center gap-3">
              <a href="/login" className="text-slate-700 hover:text-amber-600 transition-colors text-sm font-medium">
                Login
              </a>
              <Link to="/apply">
                <Button variant="primary">Apply Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-slate-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(251,191,36,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 lg:px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                ETPL Approved • WorkOne Partner • DOL Registered
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                Workforce training that{' '}
                <span className="text-amber-600">pays you to learn</span>
              </h1>
              
              <p className="mt-6 text-lg lg:text-xl text-slate-700 leading-relaxed">
                Get certified in high-demand careers while earning income. 
                100% funded through WIOA, WRG, and partner programs. 
                No upfront costs, real job placement.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/apply">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <a href="#programs">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    View Programs
                  </Button>
                </a>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>80%+ job placement</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>$15-$27/hr starting</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>6-24 month programs</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-100 to-slate-100 shadow-2xl overflow-hidden">
                <img
                  src="/images/hero-training.jpg"
                  alt="Students in workforce training"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="text-3xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-slate-600">Students Trained</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="text-3xl font-bold text-green-600">92%</div>
                <div className="text-sm text-slate-600">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Band */}
      <PartnersBand />

      {/* Programs Preview */}
      <section id="programs" className="bg-white">
        <ProgramsPreview />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-50">
        <Section spacing="lg">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-700">
              Three simple steps to start your career transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Apply & Get Approved',
                description: 'Submit your application and we'll verify your funding eligibility through WorkOne, WIOA, or other partner programs.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Match & Enroll',
                description: 'We match you with a host employer or training site based on your goals and location. Start learning immediately.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Earn & Get Certified',
                description: 'Complete your training while earning income. Graduate with industry certifications and job placement support.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/apply">
              <Button variant="primary" size="lg">Start Your Application</Button>
            </Link>
          </div>
        </Section>
      </section>

      {/* Testimonials */}
      <TestimonialsHome />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to transform your career?
            </h2>
            <p className="mt-4 text-lg text-amber-50">
              Join hundreds of students who are earning while they learn. 
              Apply today and start your journey to a better future.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply">
                <Button variant="secondary" size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                  Apply Now
                </Button>
              </Link>
              <a href="tel:+13173143757">
                <Button variant="ghost" size="lg" className="text-white border-2 border-white hover:bg-white/10">
                  Call (317) 314-3757
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="font-bold text-white">Elevate for Humanity</span>
              </div>
              <p className="text-sm">
                Workforce training that transforms lives through education and career development.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Programs</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/programs" className="hover:text-white transition-colors">All Programs</a></li>
                <li><a href="/apply?program=Barber%20Apprenticeship" className="hover:text-white transition-colors">Barber Training</a></li>
                <li><a href="/apply?program=Building%20Tech%20/%20HVAC" className="hover:text-white transition-colors">HVAC & Building Tech</a></li>
                <li><a href="/apply?program=CNA%20/%20HHA" className="hover:text-white transition-colors">CNA / HHA</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/partners" className="hover:text-white transition-colors">Partners</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Indianapolis, IN</li>
                <li><a href="tel:+13173143757" className="hover:text-white transition-colors">(317) 314-3757</a></li>
                <li><a href="mailto:info@elevateforhumanity.org" className="hover:text-white transition-colors">info@elevateforhumanity.org</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            <p>© {new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

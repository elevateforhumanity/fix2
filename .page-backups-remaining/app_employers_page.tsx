import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Briefcase,
  FileText,
  Handshake,
  Building2,
  Target,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';


export const metadata: Metadata = {
  title: 'Hire Graduates | Elevate for Humanity',
  description: 'Hire trained, certified, job-ready graduates. No recruiting fees. Tax incentives available. 85% placement rate.',
};

export default async function EmployersPage() {
  const supabase = createClient();

  // Internal navigation for Employers subpages
  const navLinks = [
    { label: 'Hire Graduates', href: '/hire-graduates' },
    { label: 'For Employers', href: '/for-employers' },
    { label: 'Partner With Us', href: '/partner-with-us' },
    { label: 'OJT & Funding', href: '/ojt-and-funding' },
    { label: 'Workforce Partners', href: '/workforce-partners' },
    { label: 'Training Providers', href: '/training-providers' },
    { label: 'Partner Application', href: '/partner-application' },
    { label: 'Partner Playbook', href: '/partner-playbook' },
    { label: 'Partner Courses', href: '/partner-courses' },
    { label: 'WorkOne Packet', href: '/workone-partner-packet' },
    { label: 'Industries', href: '/industries' },
    { label: 'Careers', href: '/careers' },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Pre-Screened Candidates',
      description: 'All graduates are background-checked, drug-tested, and certified in their field.'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Graduates hold recognized credentials and licenses required for the job.'
    },
    {
      icon: DollarSign,
      title: 'No Recruiting Fees',
      description: 'Hire our graduates at no cost. We handle all placement coordination.'
    },
    {
      icon: TrendingUp,
      title: 'Tax Incentives',
      description: 'Qualify for Work Opportunity Tax Credits (WOTC) and other hiring incentives.'
    },
    {
      icon: Briefcase,
      title: 'OJT Funding',
      description: 'On-the-Job Training wage reimbursement available for eligible hires.'
    },
    {
      icon: Target,
      title: 'Retention Support',
      description: 'We provide ongoing support to ensure employee success and retention.'
    }
  ];

  const resources = [
    {
      title: 'Hire Graduates',
      description: 'Browse our job board and connect with graduates ready to work.',
      href: '/hire-graduates',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'For Employers',
      description: 'Learn how we support employers with hiring and retention.',
      href: '/for-employers',
      icon: Building2,
      color: 'green'
    },
    {
      title: 'Partner With Us',
      description: 'Become a training partner and help shape our curriculum.',
      href: '/partner-with-us',
      icon: Handshake,
      color: 'purple'
    },
    {
      title: 'OJT & Funding',
      description: 'On-the-Job Training programs with wage reimbursement.',
      href: '/ojt-and-funding',
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'Workforce Partners',
      description: 'Join our network of workforce development partners.',
      href: '/workforce-partners',
      icon: Users,
      color: 'pink'
    },
    {
      title: 'Training Providers',
      description: 'Become an approved training provider for our programs.',
      href: '/training-providers',
      icon: Award,
      color: 'indigo'
    },
    {
      title: 'Partner Application',
      description: 'Apply to become an employer or training partner.',
      href: '/partner-application',
      icon: FileText,
      color: 'cyan'
    },
    {
      title: 'Partner Playbook',
      description: 'Resources and guides for employer partners.',
      href: '/partner-playbook',
      icon: FileText,
      color: 'teal'
    },
    {
      title: 'Partner Courses',
      description: 'Training courses designed with employer input.',
      href: '/partner-courses',
      icon: Award,
      color: 'emerald'
    },
    {
      title: 'WorkOne Partner Packet',
      description: 'Information for WorkOne centers and workforce boards.',
      href: '/workone-partner-packet',
      icon: FileText,
      color: 'violet'
    },
    {
      title: 'Industries',
      description: 'Explore graduates by industry sector.',
      href: '/industries',
      icon: Building2,
      color: 'rose'
    },
    {
      title: 'Careers',
      description: 'Join our team and help transform lives.',
      href: '/careers',
      icon: Briefcase,
      color: 'amber'
    }
  ];

  return (
    <>
      {/* Video Hero Banner - Full Bleed */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/employers-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="absolute inset-0 z-10 flex items-center pt-[72px]">
          <div className="mx-auto w-full max-w-6xl px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-600/90 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wide text-white">Employer Services</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Hire Job-Ready Graduates
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              No Recruiting Fees. Tax Incentives Available.
            </h2>
            
            {/* Body */}
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Access trained, certified, and motivated candidates. 85% placement rate. We handle the hard work.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">85%</div>
                <div className="text-xs md:text-sm text-white/80">Placement Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">$0</div>
                <div className="text-xs md:text-sm text-white/80">Recruiting Fees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">500+</div>
                <div className="text-xs md:text-sm text-white/80">Employers</div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hire-graduates"
                className="rounded-xl bg-white px-8 py-4 font-bold text-black hover:bg-gray-100 transition text-center text-lg shadow-xl"
              >
                Browse Graduates
              </Link>
              <Link
                href="#contact"
                className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-black transition text-center text-lg"
              >
                Schedule Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {navLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Benefits Section - Wix Style */}
      <section className="rich-section-alt">
        <div className="rich-container">
          <div className="text-center mb-16">
            <h2 className="rich-headline text-gray-900 mb-6">
              Why Hire Our Graduates?
            </h2>
            <p className="rich-body max-w-3xl mx-auto">
              We do the heavy lifting so you can focus on growing your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits?.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="rich-card">
                  <div className="rich-icon-container mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="rich-body">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Wix Style */}
      <section className="rich-section bg-white">
        <div className="rich-container-narrow text-center">
          <h2 className="rich-headline text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="rich-body mb-16">
            Simple, fast, and effective hiring process
          </p>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { step: '1', title: 'Post Your Job', description: 'Tell us what positions you need to fill' },
              { step: '2', title: 'We Match Candidates', description: 'We send you qualified, certified graduates' },
              { step: '3', title: 'Interview & Hire', description: 'Interview candidates and make your selection' },
              { step: '4', title: 'Ongoing Support', description: 'We provide retention support after hire' }
            ].map((item) => (
              <div key={item.step} className="rich-animate">
                <div className="rich-icon-container mx-auto">
                  <span className="text-3xl font-black text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="rich-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources - Wix Style */}
      <section className="rich-section bg-white">
        <div className="rich-container">
          <div className="text-center mb-16">
            <h2 className="rich-headline text-gray-900 mb-6">
              Employer Resources
            </h2>
            <p className="rich-body max-w-3xl mx-auto">
              Everything you need to hire, partner, and succeed
            </p>
          </div>

          <div className="rich-grid">
            {resources?.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group"
                >
                  <div className="rich-card">
                    <div className="rich-icon-container mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="rich-subheadline text-gray-900 group-hover:text-purple-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="rich-body mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 text-purple-600 font-bold">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA - Wix Style */}
      <section id="contact" className="relative h-[500px] overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
              />
            </div>
            
            <h2 className="rich-headline text-white mb-6">
              Ready to Hire?
            </h2>
            <p className="rich-body text-white/90 mb-10">
              Contact our employer services team to get started
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
              <a
                href="tel:+13178001234"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-900 transition-all text-white font-bold"
              >
                <Phone className="w-5 h-5" />
                <span>(317) 800-1234</span>
              </a>
              <a
                href="mailto:employers@elevateforhumanity.org"
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-900 transition-all text-white font-bold"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>

            <Link
              href="/hire-graduates"
              className="rich-button-primary bg-orange-500 hover:bg-orange-600 inline-flex items-center gap-3 text-xl"
            >
              <span>Browse Graduates Now</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white text-center border-t border-gray-200">
        <p className="text-sm text-gray-900">
          © 2025 Elevate for Humanity. All rights reserved.
        </p>
      </footer>
    </>
  );
}

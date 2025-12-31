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

export const metadata: Metadata = {
  title: 'Hire Graduates | Elevate for Humanity',
  description: 'Hire trained, certified, job-ready graduates. No recruiting fees. Tax incentives available. 85% placement rate.',
};

export default function EmployersPage() {
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">Employer Services</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Hire Job-Ready Graduates
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Access a pipeline of trained, certified, and motivated candidates. 
                No recruiting fees. Tax incentives available. We handle the hard work.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">85%</div>
                  <div className="text-xs text-blue-100">Placement Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">$0</div>
                  <div className="text-xs text-blue-100">Recruiting Fees</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">500+</div>
                  <div className="text-xs text-blue-100">Employers</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/hire-graduates"
                  className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-orange-600 hover:scale-105 transition-all"
                >
                  <span>Browse Graduates</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-900 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Call</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Employer hiring graduates"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Hire Our Graduates?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We do the heavy lifting so you can focus on growing your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and effective hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Post Your Job', description: 'Tell us what positions you need to fill' },
              { step: '2', title: 'We Match Candidates', description: 'We send you qualified, certified graduates' },
              { step: '3', title: 'Interview & Hire', description: 'Interview candidates and make your selection' },
              { step: '4', title: 'Ongoing Support', description: 'We provide retention support after hire' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Employer Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to hire, partner, and succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-500 hover:-translate-y-1 transform"
                >
                  <div className={`w-12 h-12 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${resource.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Hire?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Contact our employer services team to get started
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <a
              href="tel:+13178001234"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-900 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span className="font-bold">(317) 800-1234</span>
            </a>
            <a
              href="mailto:employers@elevateforhumanity.org"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-900 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span className="font-bold">employers@elevateforhumanity.org</span>
            </a>
          </div>

          <Link
            href="/hire-graduates"
            className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all"
          >
            <span>Browse Graduates Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}

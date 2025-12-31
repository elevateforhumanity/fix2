import Link from 'next/link';
import { Metadata } from 'next';
import { 
  DollarSign,
  Briefcase,
  Users,
  FileText,
  Heart,
  TrendingUp,
  Calendar,
  GraduationCap,
  Lightbulb,
  Shield,
  Phone,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Elevate for Humanity',
  description: 'Tax services, career counseling, job placement, and more. Supporting your success every step of the way.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Supersonic Fast Cash',
      description: 'Professional tax preparation, refund advances, and IRS representation by licensed Enrolled Agents.',
      href: '/supersonic-fast-cash',
      icon: DollarSign,
      color: 'orange',
      features: ['Tax Preparation', 'Refund Advances', 'IRS Representation', 'Year-Round Support']
    },
    {
      title: 'Tax Services',
      description: 'Full-service tax preparation with expert guidance and maximum refund guarantee.',
      href: '/tax-services',
      icon: FileText,
      color: 'blue',
      features: ['Expert Tax Prep', 'E-Filing', 'Audit Support', 'Tax Planning']
    },
    {
      title: 'VITA Tax Prep',
      description: 'Free IRS-certified tax preparation for qualifying individuals and families.',
      href: '/vita',
      icon: Heart,
      color: 'red',
      features: ['100% Free', 'IRS Certified', 'No Income Limit', 'Same-Day Filing']
    },
    {
      title: 'Career Services',
      description: 'Resume building, interview preparation, and job search support from career experts.',
      href: '/career-services',
      icon: Briefcase,
      color: 'green',
      features: ['Resume Writing', 'Interview Prep', 'Job Search', 'Career Coaching']
    },
    {
      title: 'Career Center',
      description: 'Job boards, employer connections, and placement assistance for graduates.',
      href: '/career-center',
      icon: TrendingUp,
      color: 'purple',
      features: ['Job Board', 'Employer Network', 'Placement Help', 'Career Resources']
    },
    {
      title: 'Career Fairs',
      description: 'Meet employers hiring our graduates at regular career fair events.',
      href: '/career-fair',
      icon: Users,
      color: 'pink',
      features: ['Employer Meetings', 'On-Site Interviews', 'Networking', 'Job Offers']
    },
    {
      title: 'Academic Advising',
      description: 'One-on-one guidance to help you succeed in your training program.',
      href: '/advising',
      icon: GraduationCap,
      color: 'indigo',
      features: ['Program Planning', 'Academic Support', 'Progress Tracking', 'Goal Setting']
    },
    {
      title: 'Mentorship Program',
      description: 'Connect with industry professionals for guidance and career support.',
      href: '/mentorship',
      icon: Lightbulb,
      color: 'yellow',
      features: ['Industry Mentors', 'Career Guidance', 'Networking', 'Skill Development']
    },
    {
      title: 'Support Services',
      description: 'Transportation, childcare, and other barrier removal services.',
      href: '/support',
      icon: Shield,
      color: 'cyan',
      features: ['Transportation', 'Childcare', 'Emergency Aid', 'Resource Referrals']
    },
    {
      title: 'Consumer Education',
      description: 'Financial literacy, budgeting, and money management classes.',
      href: '/consumer-education',
      icon: DollarSign,
      color: 'emerald',
      features: ['Financial Literacy', 'Budgeting', 'Credit Building', 'Money Management']
    },
    {
      title: 'Banking Services',
      description: 'Help opening bank accounts and building credit history.',
      href: '/banking',
      icon: DollarSign,
      color: 'teal',
      features: ['Account Opening', 'Credit Building', 'Financial Planning', 'Banking Education']
    },
    {
      title: 'Help Center',
      description: 'FAQs, guides, and support resources for all your questions.',
      href: '/help',
      icon: Phone,
      color: 'gray',
      features: ['FAQs', 'How-To Guides', 'Video Tutorials', 'Live Support']
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Video Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/services-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">
              Support Services
            </h1>
            <p className="text-2xl md:text-3xl font-bold mb-8">
              We Don't Just Train You—We Support Your Entire Journey
            </p>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              From tax preparation to career counseling, job placement to financial literacy—
              we provide the support you need to succeed in training and beyond.
            </p>
            <Link
              href="#services"
              className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all uppercase"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Our Services Matter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why We Offer These Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Training alone isn't enough. We remove barriers and provide support so you can focus on learning and building your career.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Remove Barriers</h3>
              <p className="text-gray-600 leading-relaxed">
                Transportation, childcare, financial challenges—we help you overcome obstacles that prevent success.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accelerate Success</h3>
              <p className="text-gray-600 leading-relaxed">
                Career counseling, job placement, and mentorship help you land a job faster and earn more.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifelong Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our support doesn't end at graduation. We're here for you throughout your career journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              All Services & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click any service to learn more and get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-500 hover:-translate-y-2 transform"
                >
                  {/* Icon Header */}
                  <div className={`bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 p-6`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
            "The career services team helped me land a job before I even graduated. 
            The resume help and interview prep made all the difference."
          </blockquote>
          <p className="text-xl text-blue-100">
            — Marcus J., HVAC Technician Graduate
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Apply now and get access to all our support services
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl hover:scale-105 transition-all uppercase"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-500 mt-6">
            Takes 5 minutes • No commitment required
          </p>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Heart,
  Target,
  Users,
  TrendingUp,
  Award,
  Globe,
  FileText,
  Newspaper,
  Shield,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'A workforce development ecosystem helping individuals access training, funding, and employment pathways.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'Every decision we make starts with how it impacts the people we serve.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: '85% job placement rate. We measure success by student outcomes.'
    },
    {
      icon: Shield,
      title: 'Barrier Removal',
      description: 'We eliminate obstacles that prevent people from succeeding in training.'
    },
    {
      icon: Globe,
      title: 'Community Impact',
      description: 'Transforming lives strengthens families, neighborhoods, and our entire community.'
    }
  ];

  const resources = [
    {
      title: 'Our Mission',
      description: 'Learn about our mission to transform lives through workforce development.',
      href: '#mission',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'What We Do',
      description: 'Discover how we connect people to training, funding, and employment.',
      href: '#what-we-do',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Our Founder',
      description: 'Meet Elizabeth Greene, founder and CEO of Elevate for Humanity.',
      href: '/founder',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Our Team',
      description: 'Meet the people behind Elevate for Humanity.',
      href: '/team',
      icon: Users,
      color: 'violet'
    },
    {
      title: 'Impact',
      description: 'See the difference we\'re making in our community.',
      href: '#impact',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Transparency',
      description: 'View our financial reports, outcomes data, and accountability measures.',
      href: '/transparency',
      icon: Shield,
      color: 'cyan'
    },
    {
      title: 'Blog',
      description: 'Read stories, updates, and insights from our team.',
      href: '/blog',
      icon: Newspaper,
      color: 'pink'
    },
    {
      title: 'Success Stories',
      description: 'Real stories from graduates who transformed their lives.',
      href: '/success-stories',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Press',
      description: 'Media coverage and press releases.',
      href: '/press',
      icon: FileText,
      color: 'indigo'
    },
    {
      title: 'Careers',
      description: 'Join our team and help transform lives.',
      href: '/careers',
      icon: Award,
      color: 'teal'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section - Dark & Elegant */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Heart className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold">About Us</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Transforming Lives Through Workforce Development
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're a workforce development ecosystem designed to help individuals access training, 
                funding, employment pathways, and support services—especially when traditional systems feel impossible to navigate.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-orange-400 mb-1">5,000+</div>
                  <div className="text-xs text-gray-400">Students Served</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-green-400 mb-1">85%</div>
                  <div className="text-xs text-gray-400">Job Placement</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-blue-400 mb-1">50+</div>
                  <div className="text-xs text-gray-400">Programs</div>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Join Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Our Mission
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed">
              To create pathways to meaningful careers by removing barriers, providing training, 
              and connecting people to opportunities that transform lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-black text-orange-400 mb-3">100%</div>
              <div className="text-gray-300">Free Training</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-3">$0</div>
              <div className="text-gray-300">Student Debt</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-3">∞</div>
              <div className="text-gray-300">Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than a training provider—we're a complete support system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Training</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                50+ programs in healthcare, skilled trades, and business. All 100% free through federal funding.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Industry certifications</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Hands-on learning</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Flexible schedules</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg border-2 border-green-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Support</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We remove barriers that prevent success—transportation, childcare, financial challenges.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Career counseling</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Financial literacy</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Emergency assistance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Placement</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Direct connections to employers. 85% of graduates are employed within 6 months.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Job matching</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Interview prep</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Ongoing support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Real results. Real lives transformed.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black mb-3">5,000+</div>
              <div className="text-lg text-orange-100">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">85%</div>
              <div className="text-lg text-orange-100">Job Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">$45K</div>
              <div className="text-lg text-orange-100">Average Starting Salary</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">500+</div>
              <div className="text-lg text-orange-100">Employer Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Learn More About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our story, team, impact, and commitment to transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-500 hover:-translate-y-1 transform"
                >
                  <div className={`w-12 h-12 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${resource.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join 5,000+ students who chose Elevate for Humanity
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-400 mt-6">
            Takes 5 minutes • 100% free • No commitment
          </p>
        </div>
      </section>
    </main>
  );
}

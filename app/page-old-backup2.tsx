import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  GraduationCap,
  Briefcase,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Elevate for Humanity | Free Career Training & Apprenticeships Indiana',
  description:
    'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more. Get trained, get hired, get paid. No cost, no debt.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/images/logo.png',
    description:
      'Free career training and apprenticeships in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Admissions',
      email: 'elevate4humanityedu@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
    ],
  };

  return (
    <main className="overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section - Video Banner with Rich Wix Styling */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-6xl w-full">
            {/* Logo - Wix Style - Hidden on mobile to avoid white box */}
            <div className="mb-6 md:mb-8 hidden md:block">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
                priority
              />
            </div>
            
            {/* Badge - Wix Style */}
            <div className="rich-badge mb-8 bg-teal-500/20 border-teal-500/30 text-teal-100">
              <Award className="w-5 h-5" />
              <span>WIOA-Funded Training Programs</span>
            </div>
            
            {/* Headline - Wix Style: Large, Bold, Dramatic */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight px-2">
              LIMITLESS OPPORTUNITIES
            </h1>
            
            {/* Subheadline - Wix Style */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 px-2">
              WHERE LEARNING LEADS TO EARNING!
            </h2>
            
            {/* Body Text - Wix Style: Generous spacing */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Free career training in Indianapolis. Get trained, get hired, get paid. No cost, no debt.
            </p>
            
            {/* Buttons - Wix Style: Large, Bold, Shadowed */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/apply"
                className="rich-button-primary uppercase inline-flex items-center gap-3"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/programs"
                className="rich-button-secondary text-white border-white hover:bg-white hover:text-purple-600 uppercase inline-flex items-center gap-3"
              >
                <span>View Programs</span>
                <GraduationCap className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Programs - Wix Style with Large Images */}
      <section className="rich-section-alt">
        <div className="rich-container">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              Explore Our Programs
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from 50+ career training programs in high-demand industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
            {/* Healthcare */}
            <Link href="/programs" className="group">
              <div className="rich-card">
                <div className="rich-image-container h-80 mb-6">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Healthcare Training"
                    fill
                    className="rich-image object-cover"
                  />
                  <div className="rich-overlay">
                    <div className="rich-icon-container">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="rich-subheadline text-gray-900 group-hover:text-purple-600 transition-colors">
                  Healthcare
                </h3>
                <p className="rich-body mb-4">
                  CNA, Medical Assistant, Phlebotomy, and more
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-bold">
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs" className="group">
              <div className="rich-card">
                <div className="rich-image-container h-80 mb-6">
                  <Image
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Skilled Trades Training"
                    fill
                    className="rich-image object-cover"
                  />
                  <div className="rich-overlay">
                    <div className="rich-icon-container">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="rich-subheadline text-gray-900 group-hover:text-purple-600 transition-colors">
                  Skilled Trades
                </h3>
                <p className="rich-body mb-4">
                  HVAC, Electrical, Plumbing, Welding, and more
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-bold">
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Business */}
            <Link href="/programs" className="group">
              <div className="rich-card">
                <div className="rich-image-container h-80 mb-6">
                  <Image
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Business Training"
                    fill
                    className="rich-image object-cover"
                  />
                  <div className="rich-overlay">
                    <div className="rich-icon-container">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="rich-subheadline text-gray-900 group-hover:text-purple-600 transition-colors">
                  Business & Finance
                </h3>
                <p className="rich-body mb-4">
                  Accounting, Office Administration, Customer Service
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-bold">
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Wix Style */}
      <section className="rich-section bg-white">
        <div className="rich-container-narrow text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-12 md:mb-16 px-4">
            Getting started is simple. Here's what happens when you apply:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4">
            <div className="rich-animate">
              <div className="rich-icon-container mx-auto">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Apply</h3>
              <p className="text-sm md:text-base text-gray-600">
                Fill out our simple application in 5 minutes
              </p>
            </div>

            <div className="rich-animate">
              <div className="rich-icon-container mx-auto">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Get Approved</h3>
              <p className="text-sm md:text-base text-gray-600">
                We handle all funding paperwork with WIOA
              </p>
            </div>

            <div className="rich-animate">
              <div className="rich-icon-container mx-auto">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Start Training</h3>
              <p className="text-sm md:text-base text-gray-600">
                Begin your program and start your new career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Wix Style */}
      <section className="rich-section-alt">
        <div className="rich-container-narrow px-4">
          <div className="rich-testimonial">
            <div className="flex justify-center gap-1 mb-4 md:mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-relaxed text-center px-4">
              "This program changed my life. I went from unemployed to earning $45,000 a year as a CNA in just 6 weeks. The training was free and the support was incredible."
            </blockquote>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 text-center">
              — Sarah Johnson, CNA Graduate
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview - Wix Style */}
      <section className="rich-section bg-white">
        <div className="rich-container">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              More Than Just Training
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support services to ensure your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="rich-card text-center">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-orange-500 to-orange-600">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Supersonic Fast Cash</h3>
              <p className="rich-body mb-4 md:mb-6 text-sm md:text-base">
                Professional tax prep and instant refund advances
              </p>
              <Link href="/supersonic-fast-cash" className="text-purple-600 font-bold hover:underline text-sm md:text-base">
                Learn More →
              </Link>
            </div>

            <div className="rich-card text-center">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-green-500 to-green-600">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">VITA Tax Prep</h3>
              <p className="rich-body mb-4 md:mb-6 text-sm md:text-base">
                Free IRS-certified tax preparation
              </p>
              <Link href="/vita" className="text-purple-600 font-bold hover:underline text-sm md:text-base">
                Learn More →
              </Link>
            </div>

            <div className="rich-card text-center">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-blue-500 to-blue-600">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Career Services</h3>
              <p className="rich-body mb-4 md:mb-6 text-sm md:text-base">
                Resume help, interview prep, job placement
              </p>
              <Link href="/career-services" className="text-purple-600 font-bold hover:underline text-sm md:text-base">
                Learn More →
              </Link>
            </div>

            <div className="rich-card text-center">
              <div className="rich-icon-container mx-auto bg-gradient-to-br from-purple-500 to-purple-600">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Support Bundle</h3>
              <p className="rich-body mb-4 md:mb-6 text-sm md:text-base">
                Transportation, childcare, and barrier removal
              </p>
              <Link href="/services" className="text-purple-600 font-bold hover:underline text-sm md:text-base">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Wix Style */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Logo - Hidden on mobile to avoid white box */}
          <div className="mb-6 md:mb-8 hidden md:block">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={200}
              height={80}
              className="mx-auto brightness-0 invert"
            />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join 5,000+ students who chose free career training with Elevate for Humanity
          </p>
          <Link
            href="/apply"
            className="rich-button-primary bg-orange-500 hover:bg-orange-600 inline-flex items-center gap-3 text-base md:text-xl px-6 md:px-8 py-3 md:py-4"
          >
            <span>Apply Now - 100% Free</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
          <p className="text-white/80 mt-4 md:mt-6 text-sm md:text-base">
            Takes 5 minutes • No commitment required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white text-center border-t border-gray-200">
        <p className="text-sm text-gray-900">
          © 2025 Elevate for Humanity. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

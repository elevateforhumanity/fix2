// Enhanced Homepage with Hero Banners, Images, and CTAs
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users, Award, DollarSign, Clock, TrendingUp, Briefcase, Star, Shield, Zap } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description: "100% free workforce training through WIOA funding. CNA, HVAC, Barber, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function EnhancedHomePage() {
  const programs = [
    {
      title: "CNA - Certified Nursing Assistant",
      image: "/media-backup-20251128-043832/programs/webp/cna.webp",
      duration: "4-6 weeks",
      salary: "$35,000-$45,000",
      jobs: "High Demand",
      href: "/programs/cna"
    },
    {
      title: "HVAC Technician",
      image: "/media-backup-20251128-043832/programs/webp/hvac.webp",
      duration: "8-12 weeks",
      salary: "$45,000-$65,000",
      jobs: "Excellent Growth",
      href: "/programs/hvac"
    },
    {
      title: "Barber",
      image: "/media-backup-20251128-043832/programs/webp/barber.webp",
      duration: "12 weeks",
      salary: "$35,000-$55,000",
      jobs: "Self-Employment",
      href: "/programs/barber"
    },
    {
      title: "CDL - Commercial Driver",
      image: "/media-backup-20251128-043832/programs/webp/cdl.webp",
      duration: "4-6 weeks",
      salary: "$50,000-$75,000",
      jobs: "Critical Need",
      href: "/programs/cdl"
    },
    {
      title: "Medical Assistant",
      image: "/media-backup-20251128-043832/programs/webp/medical.webp",
      duration: "8-10 weeks",
      salary: "$38,000-$48,000",
      jobs: "Growing Field",
      href: "/programs/medical-assistant"
    },
    {
      title: "Welding",
      image: "/media-backup-20251128-043832/programs/webp/welding.webp",
      duration: "10-12 weeks",
      salary: "$42,000-$62,000",
      jobs: "High Demand",
      href: "/programs/welding"
    },
    {
      title: "IT Support Specialist",
      image: "/media-backup-20251128-043832/programs/webp/it.webp",
      duration: "8-12 weeks",
      salary: "$45,000-$65,000",
      jobs: "Tech Sector",
      href: "/programs/it-support"
    },
    {
      title: "Culinary Arts",
      image: "/media-backup-20251128-043832/programs/webp/culinary.webp",
      duration: "10-12 weeks",
      salary: "$35,000-$55,000",
      jobs: "Hospitality",
      href: "/programs/culinary-arts"
    },
  ];

  return (
    <main className="bg-white">
      {/* ENHANCED HERO BANNER */}
      <section className="relative h-[700px]     overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
            alt="Elevate for Humanity Career Training"
            fill
            className="object-cover opacity-30"
            priority
            quality={90}
          />
          <div className="absolute inset-0   "></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 rounded-full mb-6 animate-pulse">
              <CheckCircle className="w-5 h-5" />
              <span className="text-white font-bold text-sm">100% FREE - GOVERNMENT FUNDED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Get Job-Ready in
              <span className="block text-orange-400">4-12 Weeks</span>
            </h1>
            
            <p className="text-2xl mb-8 text-blue-100 leading-relaxed">
              Free career training in healthcare, trades, and tech. No tuition. Real credentials. Guaranteed job connections.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-1">$0</div>
                <div className="text-sm text-blue-200">Out of Pocket</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-1">500+</div>
                <div className="text-sm text-blue-200">Graduates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-1">85%</div>
                <div className="text-sm text-blue-200">Job Placement</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/contact"
                className="group px-10 py-5 bg-orange-500 text-white font-bold text-xl rounded-xl hover:bg-orange-600 transition-all shadow-2xl hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2"
              >
                Apply Now - It's Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/programs"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-xl rounded-xl hover:bg-white/20 transition-all"
              >
                View Programs
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>500+ Graduates</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span>WIOA Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* PROGRAM CARDS WITH IMAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Popular Programs
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All programs are 100% free through WIOA funding. Get certified and start earning in weeks, not years.
            </p>
          </div>

          {/* Program Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0   "></div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    FREE
                  </div>
                </div>

                {/* Program Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {program.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{program.salary}/year</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>{program.jobs}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4    text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              View All 34 Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - WITH IMAGES */}
      <section className="py-20   ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Choose Elevate for Humanity?
            </h2>
            <p className="text-xl text-gray-600">
              We're not just training—we're transforming lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Free Training</h3>
              <p className="text-gray-600 mb-4">
                No tuition, no hidden fees. Fully funded through WIOA and government grants.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free books & materials</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free certification exams</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Free job placement</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Track to Career</h3>
              <p className="text-gray-600 mb-4">
                Get certified and start earning in 4-12 weeks, not years.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Accelerated programs</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Hands-on training</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Industry certifications</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Guaranteed Job Connections</h3>
              <p className="text-gray-600 mb-4">
                85% job placement rate with our employer partners.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span>Resume building</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span>Interview prep</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span>Employer connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION WITH IMAGE */}
      <section className="relative py-20    overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media-backup-20251128-043832/hero-slide-healthcare.jpg"
            alt="Start your career"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-2xl text-orange-100 mb-8">
            Apply today and start training within 2 weeks. It's 100% free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-orange-600 font-bold text-xl rounded-xl hover:bg-orange-50 transition-all shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/funding"
              className="px-10 py-5 bg-orange-800 text-white font-bold text-xl rounded-xl hover:bg-orange-900 transition-all border-2 border-white/30"
            >
              Check Your Eligibility
            </Link>
          </div>

          <p className="mt-8 text-orange-100">
            Questions? Call us at <strong className="text-white">(317) 123-4567</strong> or <Link href="/contact" className="underline hover:text-white">contact us online</Link>
          </p>
        </div>
      </section>

      {/* TESTIMONIALS WITH PHOTOS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
              Success Stories
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600">
              Hear from graduates who transformed their lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="   rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/media-backup-20251128-043832/additional-image-12-hd.jpg"
                    alt="Maria Rodriguez"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Maria Rodriguez</div>
                  <div className="text-sm text-gray-600">CNA Graduate</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "I went from unemployed to working at a top hospital in just 6 weeks. The training was excellent and completely free. Now I'm earning $42,000 a year!"
              </p>
              <div className="text-sm text-gray-600">
                <strong>Now earning:</strong> $42,000/year
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="   rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/media-backup-20251128-043832/additional-image-14-hd.jpg"
                    alt="James Thompson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">James Thompson</div>
                  <div className="text-sm text-gray-600">CDL Graduate</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Best decision I ever made. Got my CDL in 4 weeks, started driving immediately. Making $65,000 a year now and loving the freedom!"
              </p>
              <div className="text-sm text-gray-600">
                <strong>Now earning:</strong> $65,000/year
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="   rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="/media-backup-20251128-043832/programs/healthcare-professional-1-hd.jpg"
                    alt="Sarah Johnson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">HVAC Graduate</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "As a single mom, I needed a career fast. Elevate gave me free training and now I'm an HVAC tech making $58,000. Life-changing!"
              </p>
              <div className="text-sm text-gray-600">
                <strong>Now earning:</strong> $58,000/year
              </div>
            </div>
          </div>

          {/* Video Testimonials CTA */}
          <div className="text-center mt-12">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-8 py-4    text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              Watch Video Testimonials
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PWA APP DOWNLOAD SECTION */}
      <section className="py-20     text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                📱 Mobile App Available
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Learn Anywhere with Our Mobile App
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Access courses, track progress, and connect with instructors on the go. Available for iOS and Android.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Offline course access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Push notifications for assignments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-lg">Live chat with instructors</span>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                    alt="Mobile App Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full opacity-50 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-50 blur-2xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA CTA SECTION */}
      <section className="py-20   ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Follow Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Join our community and stay updated with success stories, tips, and opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Facebook */}
            <a
              href="https://facebook.com/elevateforhumanity"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
              <p className="text-gray-600 text-sm mb-4">Daily updates & live sessions</p>
              <div className="text-blue-600 font-semibold">Follow Us →</div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/elevateforhumanity"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center"
            >
              <div className="w-16 h-16    rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instagram</h3>
              <p className="text-gray-600 text-sm mb-4">Behind-the-scenes & stories</p>
              <div className="text-pink-600 font-semibold">Follow Us →</div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/elevateforhumanity"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600 text-sm mb-4">Career tips & job postings</p>
              <div className="text-blue-700 font-semibold">Connect →</div>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@elevateforhumanity"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-center"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">YouTube</h3>
              <p className="text-gray-600 text-sm mb-4">Video tutorials & testimonials</p>
              <div className="text-red-600 font-semibold">Subscribe →</div>
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join our growing community</p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">15K+</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted Partners</h3>
            <p className="text-gray-600">Supported by leading workforce development organizations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">EmployIndy</div>
              <div className="text-sm text-gray-600">Workforce Board</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-2">WorkOne</div>
              <div className="text-sm text-gray-600">Career Center</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600 mb-2">Indiana DWD</div>
              <div className="text-sm text-gray-600">State Agency</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-orange-600 mb-2">US DOL</div>
              <div className="text-sm text-gray-600">Federal Partner</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

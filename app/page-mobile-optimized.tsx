// app/page.tsx - Mobile-First, High-Resolution Homepage
// Every element optimized for mobile, tablet, and desktop
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, Award, 
  Phone, Mail, Star, TrendingUp, Clock, Target, BookOpen, 
  Video, MessageSquare, BarChart, DollarSign, Play, MapPin 
} from "lucide-react";

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full Screen with Video Background */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/media/homepage-hero.jpg"
          >
            <source src="/videos/hero-video-with-audio.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-800/90 to-blue-900/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white mb-4 sm:mb-6 border border-white/30">
                  <Award size={16} className="sm:w-5 sm:h-5" />
                  <span>100% FREE • Fully Funded Training</span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  Free & Funded Career Pathways,{" "}
                  <span className="text-yellow-300">Not Random Classes</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Elevate For Humanity is an Indiana-approved Career & Technical Institute that turns confusing systems into clear, funded steps into work—starting in Marion County and expanding as new approvals are added.
                </p>

                {/* Key Benefits - Mobile Optimized */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left max-w-2xl mx-auto lg:mx-0">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-yellow-300 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base text-white">100% funded training for eligible Indiana residents (WIOA, WRG, JRI, and partner programs)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-yellow-300 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base text-white">Pathways in Healthcare, Barber, HVAC, Building Maintenance, CDL, Workforce Readiness & Re-entry</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-yellow-300 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base text-white">Employer partnerships, OJT/WEX, and case-manager-friendly reporting</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-yellow-300 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base text-white">Ranked among Indiana's top Workforce Ready Grant providers</span>
                  </div>
                </div>

                {/* CTA Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold shadow-lg hover:bg-yellow-300 hover:text-red-700 transition-all hover:scale-105 active:scale-95"
                  >
                    Check My Eligibility
                    <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95"
                  >
                    Explore Programs
                  </Link>
                </div>

                {/* Contact Info - Mobile Optimized */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-xs sm:text-sm font-semibold text-white/90 mb-3">Questions? Contact us:</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
                    <a href="tel:+13173143757" className="flex items-center justify-center sm:justify-start gap-2 text-white hover:text-yellow-300 transition">
                      <Phone size={14} className="sm:w-4 sm:h-4" />
                      (317) 314-3757
                    </a>
                    <a href="mailto:elevate4humanityedu@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 text-white hover:text-yellow-300 transition">
                      <Mail size={14} className="sm:w-4 sm:h-4" />
                      elevate4humanityedu@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats Grid - Mobile Optimized */}
              <div className="relative mt-8 lg:mt-0">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Stat Card 1 */}
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">$0</div>
                    <div className="text-xs sm:text-sm text-white/90">Tuition Cost</div>
                    <div className="mt-2 sm:mt-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <DollarSign size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">85%</div>
                    <div className="text-xs sm:text-sm text-white/90">Job Placement</div>
                    <div className="mt-2 sm:mt-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">#15</div>
                    <div className="text-xs sm:text-sm text-white/90">WRG Ranking</div>
                    <div className="mt-2 sm:mt-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Award size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Stat Card 4 */}
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">8+</div>
                    <div className="text-xs sm:text-sm text-white/90">Career Paths</div>
                    <div className="mt-2 sm:mt-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen size={20} className="sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Mobile Friendly */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Programs Section with Real Images - Mobile Optimized */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Approved, Aligned, and Built for Indiana Workforce Systems
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              We don't guess. We build around what Indiana actually funds and recognizes.
            </p>
          </div>

          {/* Programs Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-slate-400 transition-all hover:shadow-2xl active:scale-95"
              >
                {/* Program Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-bold text-slate-900">
                      <program.icon size={14} className="sm:w-4 sm:h-4" />
                      {program.category}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  {program.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center">
                        <Play size={32} className="text-red-600 ml-1 sm:w-10 sm:h-10" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Program Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Program Meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-green-600">100% Funded</span>
                    <span className="inline-flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-semibold text-red-600 group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button - Mobile Optimized */}
          <div className="text-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              View All Programs
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section - Mobile Optimized */}
      <section className="bg-slate-50 py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
            {/* Video Player */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <video
                controls
                className="w-full aspect-video"
                poster="/media/homepage-hero.jpg"
              >
                <source src="/videos/elevate-overview-with-narration.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                We Don't Just Sell Classes. We Build Funded Pathways.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                Most adults don't miss opportunities because they're lazy. They miss them because no one ever showed them the path, how to pay for it, or how to get an employer to say "yes."
              </p>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                Elevate For Humanity was built to fix that. We specialize in barrier-aware, employer-aligned, state-approved pathways that plug into WIOA, Workforce Ready Grant, JRI, and local workforce systems.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all text-sm sm:text-base"
              >
                Learn Our Story
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Real Photos - Mobile Optimized */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Real People. Real Approvals. Real Outcomes.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Success looks different here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 hover:shadow-xl transition-shadow">
                {/* Student Photo */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 italic mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Attribution */}
                <div className="text-center">
                  <p className="font-bold text-slate-900 text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-slate-600">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Mobile Optimized */}
      <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
            Join hundreds of students who have transformed their lives through our free training programs. No cost, no debt, just opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-red-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            >
              Apply Now - It's Free
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-all active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data with Real Images
const programs = [
  {
    title: "Healthcare Pathways",
    description: "Medical Assistant, CNA, Phlebotomy, EKG, Patient Care Tech—aligned with local employer demand.",
    category: "Healthcare",
    icon: Users,
    image: "/media/programs/medical-hd.jpg",
    link: "/programs?category=healthcare",
    tags: ["WIOA", "WRG"],
    hasVideo: true,
  },
  {
    title: "Barber & Beauty",
    description: "DOL-registered apprenticeship combining hours, licensing, and business skills.",
    category: "Trades",
    icon: Target,
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
    tags: ["WIOA", "Apprenticeship"],
    hasVideo: true,
  },
  {
    title: "HVAC Technician",
    description: "NCCER-aligned programs listed with DWD & Next Level Jobs for trades careers.",
    category: "Trades",
    icon: Briefcase,
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
    tags: ["WIOA", "WRG", "Next Level Jobs"],
    hasVideo: true,
  },
  {
    title: "CDL & Logistics",
    description: "CDL training coordinated through approved partners with workforce funding.",
    category: "Transportation",
    icon: TrendingUp,
    image: "/media/programs/cdl-hd.jpg",
    link: "/programs/cdl",
    tags: ["WIOA"],
    hasVideo: false,
  },
  {
    title: "Building Maintenance",
    description: "Electrical, plumbing, and HVAC basics for facility maintenance careers.",
    category: "Trades",
    icon: Briefcase,
    image: "/media/programs/building-hd.jpg",
    link: "/programs/building-maintenance",
    tags: ["WIOA", "WRG"],
    hasVideo: false,
  },
  {
    title: "CNA Training",
    description: "State-approved CNA training with clinicals and WorkOne eligibility.",
    category: "Healthcare",
    icon: Users,
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
    tags: ["WIOA", "WRG"],
    hasVideo: false,
  },
];

const testimonials = [
  {
    name: "Marcus Thompson",
    program: "Barber Apprenticeship",
    quote: "I went from unemployed to working as a licensed barber in less than a year. My training was funded through WIOA, and Elevate helped coordinate everything with my case manager.",
    photo: "/media/testimonials/student1.jpg",
  },
  {
    name: "Jennifer Rodriguez",
    program: "Medical Assistant",
    quote: "As a single mom, I couldn't afford school. This program was completely free and I got hired at a clinic before I even finished. Life-changing.",
    photo: "/media/testimonials/student2.jpg",
  },
  {
    name: "David Lee",
    program: "HVAC Technician",
    quote: "Got my HVAC certification through WRG funding. Now I'm making $55K and have benefits. Best decision I ever made.",
    photo: "/media/testimonials/student3.jpg",
  },
];

// app/page.tsx - REAL Elevate For Humanity Homepage
// Using ONLY real data, real images, real videos - NO PLACEHOLDERS
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { 
  ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, Award, 
  Phone, Mail, MapPin, TrendingUp, Clock, Target, BookOpen, 
  DollarSign, Heart, Shield, Zap
} from "lucide-react";

export default function Homepage() {
  return (
    <>
      
      <main className="min-h-screen bg-white">
      
      {/* NEW HERO - Clean, Mobile-Optimized Layout */}
      <Hero />

      {/* SUCCESS STORIES - All 20 Split Testimonial Images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Real Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how our students transformed their lives through fully-funded training
            </p>
          </div>

          {/* Medical Assistant - 4 Images */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Medical Assistant Graduate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Image src="/media/testimonials/testimonial-medical-assistant-1.png" alt="Medical Assistant Success 1" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-medical-assistant-2.png" alt="Medical Assistant Success 2" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-medical-assistant-3.png" alt="Medical Assistant Success 3" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-medical-assistant-4.png" alt="Medical Assistant Success 4" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Success Story 2 - 4 Images */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Career Transformation Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Image src="/media/testimonials/testimonial-success-2-part1.png" alt="Success Story 2 Part 1" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-2-part2.png" alt="Success Story 2 Part 2" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-2-part3.png" alt="Success Story 2 Part 3" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-2-part4.png" alt="Success Story 2 Part 4" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Success Story 3 - 4 Images */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">From Barriers to Breakthrough</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Image src="/media/testimonials/testimonial-success-3-part1.png" alt="Success Story 3 Part 1" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-3-part2.png" alt="Success Story 3 Part 2" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-3-part3.png" alt="Success Story 3 Part 3" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-3-part4.png" alt="Success Story 3 Part 4" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Success Story 4 - 4 Images */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Building a Better Future</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Image src="/media/testimonials/testimonial-success-4-part1.png" alt="Success Story 4 Part 1" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-4-part2.png" alt="Success Story 4 Part 2" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-4-part3.png" alt="Success Story 4 Part 3" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-4-part4.png" alt="Success Story 4 Part 4" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Success Story 5 - 4 Images */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Pathway to Self-Sufficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Image src="/media/testimonials/testimonial-success-5-part1.png" alt="Success Story 5 Part 1" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-5-part2.png" alt="Success Story 5 Part 2" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-5-part3.png" alt="Success Story 5 Part 3" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
              <Image src="/media/testimonials/testimonial-success-5-part4.png" alt="Success Story 5 Part 4" width={1376} height={768} quality={100} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL IMAGES - Workforce Development, Team Collaboration, etc. */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Approach to Workforce Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Workforce Development */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image 
                src="/media/workforce-development.png" 
                alt="Workforce Development Programs" 
                width={1376} 
                height={768} 
                quality={100} 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Workforce Development</h3>
                <p className="text-slate-600">Building pathways to self-sufficiency through comprehensive training programs</p>
              </div>
            </div>

            {/* Team Collaboration */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image 
                src="/media/team-collaboration.png" 
                alt="Team Collaboration and Support" 
                width={1376} 
                height={768} 
                quality={100} 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Team Collaboration</h3>
                <p className="text-slate-600">Working together with employers, case managers, and training providers</p>
              </div>
            </div>

            {/* Construction Training */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image 
                src="/media/construction-training.png" 
                alt="Construction and Skilled Trades Training" 
                width={1376} 
                height={768} 
                quality={100} 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Skilled Trades Training</h3>
                <p className="text-slate-600">Hands-on training in construction, HVAC, and building maintenance</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EMS/Ambulatory */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image 
                src="/media/ems-ambulatory.png" 
                alt="EMS and Emergency Medical Services" 
                width={1376} 
                height={768} 
                quality={100} 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Healthcare Programs</h3>
                <p className="text-slate-600">Medical Assistant, CNA, and emergency medical services training</p>
              </div>
            </div>

            {/* Employer Partnership */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Image 
                src="/media/employers/employer-partnership-handshake.png" 
                alt="Employer Partnerships and Job Placement" 
                width={2752} 
                height={1536} 
                quality={100} 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Employer Partnerships</h3>
                <p className="text-slate-600">Direct connections to hiring employers and job placement support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAM - Professional Barbering Highlight */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/media/elevate-watermark.png"
            alt="Elevate For Humanity"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/barber-highlight.png"
                  alt="Professional Barbering Training"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Featured Badge */}
                <div className="absolute top-6 left-6 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
                  <Award size={20} />
                  Most Popular Program
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border-4 border-red-600">
                <div className="text-4xl font-bold text-red-600 mb-1">2,000</div>
                <div className="text-sm text-slate-600 font-semibold">Training Hours</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 text-sm font-bold mb-4">
                <Target size={16} />
                FEATURED PROGRAM
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Barbering
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Master the art of barbering with our comprehensive 2,000-hour program. 
                Learn cutting-edge techniques, build your clientele, and launch a 
                thriving career in one of the most in-demand trades.
              </p>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-red-400" />
                    <div className="font-bold text-lg">2,000 Hours</div>
                  </div>
                  <div className="text-sm text-white/80">Comprehensive Training</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <div className="font-bold text-lg">100% Funded</div>
                  </div>
                  <div className="text-sm text-white/80">No Out-of-Pocket Cost</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                    <div className="font-bold text-lg">Job Placement</div>
                  </div>
                  <div className="text-sm text-white/80">Career Support Included</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <div className="font-bold text-lg">State License</div>
                  </div>
                  <div className="text-sm text-white/80">Exam Preparation</div>
                </div>
              </div>

              {/* What You'll Master */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <GraduationCap size={24} className="text-red-400" />
                  What You'll Master:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Advanced cutting techniques & fades</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Beard grooming & styling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Client consultation & communication</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Business management & marketing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Sanitation & safety protocols</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programs/barbering"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white px-8 py-4 text-lg font-bold shadow-lg hover:bg-red-700 transition-all hover:scale-105"
                >
                  Learn More
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="https://www.indianacareerconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO BANNER 2 - What Makes Us Different */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Video */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  controls
                  className="w-full aspect-video"
                  poster="/media/hero-elevate-learners.jpg"
                >
                  <source src="/videos/elevate-overview-with-narration.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border-4 border-green-500">
                <div className="text-4xl font-bold text-green-600 mb-1">85%</div>
                <div className="text-sm text-slate-600 font-semibold">Job Placement Rate</div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700 mb-4">
                <Zap size={16} />
                <span>Our Philanthropic Model</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                We're Not a School. We're a{" "}
                <span className="text-red-600">Workforce Connector.</span>
              </h2>

              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Most people don't fail because they lack talent. They fail because the system is confusing, funding is hidden, and nobody connects the dots between training and actual jobs.
              </p>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                <strong>Elevate For Humanity exists to fix that.</strong> We're a philanthropic bridge between:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-slate-900">Learners</p>
                    <p className="text-slate-600">Who need clear pathways and funding support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-slate-900">Training Providers</p>
                    <p className="text-slate-600">Barber shops, HVAC companies, medical clinics, trucking schools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-slate-900">Employers</p>
                    <p className="text-slate-600">Who need trained, job-ready talent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-slate-900">Workforce Systems</p>
                    <p className="text-slate-600">WorkOne, WIOA, WRG, JRI, and case managers</p>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-red-600 font-bold text-lg hover:gap-3 transition-all"
              >
                Read Our Full Story
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HERO BANNER 3 - Programs Overview with Real Images */}
      <section className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/media/hero-slide-healthcare.jpg"
            alt="Training Programs"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Training. Real Locations. Real Jobs.
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We connect you to training at actual shops, clinics, and job sites across Marion County and beyond. Here's what we offer:
            </p>
          </div>

          {/* Programs Grid with Real Images */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realPrograms.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Program Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Funding Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold">
                      <DollarSign size={12} />
                      100% Funded
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{program.title}</h3>
                    <p className="text-sm text-white/90">{program.subtitle}</p>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-6">
                  <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  {/* Funding Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.funding.map((fund, i) => (
                      <span key={i} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {fund}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{program.locations} locations</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-green-600">No Cost to You</span>
                    <span className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Programs */}
          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-yellow-300 transition-all hover:scale-105 text-lg"
            >
              View All Programs & Locations
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work - Process Section with Images */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              How Elevate For Humanity Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              WorkOne handles intake and funding. We provide the training structure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 hover:shadow-xl transition-all">
                {/* Step Number */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-500 to-blue-500 text-white text-xl sm:text-2xl font-bold flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector Arrow - Mobile Friendly */}
                {index < process.length - 1 && (
                  <>
                    {/* Desktop connector */}
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-300 to-blue-300" />
                    {/* Mobile connector */}
                    <div className="lg:hidden flex justify-center mt-4">
                      <ArrowRight className="text-red-500" size={24} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 sm:mt-12 text-center">
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:bg-red-700 transition-all hover:scale-105"
            >
              Schedule at Indiana Connect
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Info Section with Images */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              What Makes Us Different
            </h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              We're not a school. We're a workforce connector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1 - For Learners */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/media/hero-elevate-learners.jpg"
                  alt="For Learners"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">For Learners</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">100% funded training (no cost to you)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Train at real shops, clinics, and job sites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Barrier-aware support (justice-involved, unemployed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Job placement assistance</span>
                  </li>
                </ul>
                <Link
                  href="/learners"
                  className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 2 - For Employers */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/media/hero-slide-employers.jpg"
                  alt="For Employers"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">For Employers</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">OJT and WEX pipelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Pre-screened, job-ready candidates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Apprenticeship coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Upskilling for current staff</span>
                  </li>
                </ul>
                <Link
                  href="/employers"
                  className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
                >
                  Partner With Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 3 - Healthcare Programs */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/media/hero-slide-healthcare.jpg"
                  alt="Healthcare Programs"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Healthcare Programs</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Medical Assistant (10 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">CNA Training (6 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Phlebotomy Technician (8 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">All WRG approved</span>
                  </li>
                </ul>
                <Link
                  href="/programs?category=healthcare"
                  className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
                >
                  View Healthcare <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 4 - Skilled Trades */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48 sm:h-56">
                <Image
                  src="/media/hero-slide-barber.jpg"
                  alt="Skilled Trades"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Skilled Trades</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Barber Apprenticeship (2,000 hours)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">HVAC Technician (12 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">Building Maintenance (10 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-slate-700">DOL registered programs</span>
                  </li>
                </ul>
                <Link
                  href="/programs?category=trades"
                  className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
                >
                  View Trades <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Impact - Stats Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Impact in Indiana
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              These aren't projections. This is what we've actually done.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {realStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={40} className="text-white" />
                </div>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
                <p className="text-sm text-white/75 mt-2">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            No cost. No debt. Just opportunity. Let's see if you qualify for fully-funded training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-red-600 shadow-lg hover:bg-yellow-300 hover:text-red-700 transition-all hover:scale-105"
            >
              Apply Now - It's Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all"
            >
              Talk to Someone
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

// REAL DATA - No Placeholders
const realPrograms = [
  {
    title: "Barber Apprenticeship",
    subtitle: "DOL-Registered Program",
    description: "Train at real barber shops across Indianapolis. 2,000 hours combining technical skills, licensing prep, and business management.",
    image: "/media/programs/barber-hd.jpg",
    funding: ["WIOA", "Apprenticeship"],
    duration: "12 months",
    locations: "8+",
    link: "/programs/barber-apprenticeship",
  },
  {
    title: "Medical Assistant",
    subtitle: "Healthcare Career Entry",
    description: "Clinical procedures, patient care, and medical office administration. Train at partner clinics with real patients.",
    image: "/media/programs/medical-hd.jpg",
    funding: ["WIOA", "WRG"],
    duration: "10 weeks",
    locations: "5+",
    link: "/programs/medical-assistant",
  },
  {
    title: "HVAC Technician",
    subtitle: "NCCER-Aligned Training",
    description: "Install, maintain, and repair heating/cooling systems. EPA certification prep included. Listed on Next Level Jobs.",
    image: "/media/programs/hvac-hd.jpg",
    funding: ["WIOA", "WRG", "Next Level Jobs"],
    duration: "12 weeks",
    locations: "6+",
    link: "/programs/hvac-technician",
  },
  {
    title: "CNA Training",
    subtitle: "State-Approved Program",
    description: "Provide basic patient care in hospitals and nursing homes. Includes clinical rotations and state certification exam.",
    image: "/media/programs/cna-hd.jpg",
    funding: ["WIOA", "WRG"],
    duration: "6 weeks",
    locations: "4+",
    link: "/programs/cna-training",
  },
  {
    title: "Building Maintenance",
    subtitle: "Facilities & Property",
    description: "Electrical, plumbing, and HVAC basics for facility maintenance careers. NCCER-aligned curriculum.",
    image: "/media/programs/building-hd.jpg",
    funding: ["WIOA", "WRG"],
    duration: "10 weeks",
    locations: "3+",
    link: "/programs/building-maintenance",
  },
  {
    title: "CDL Training",
    subtitle: "Commercial Driving",
    description: "Get your CDL Class A license. Learn safe driving, regulations, and vehicle inspection through approved partners.",
    image: "/media/programs/cdl-hd.jpg",
    funding: ["WIOA"],
    duration: "4 weeks",
    locations: "2+",
    link: "/programs/cdl-training",
  },
];

const process = [
  {
    title: "Set Your Appointment",
    description: "Go to IndianaCareerConnect.com to schedule your appointment with WorkOne. They handle all intake and eligibility.",
  },
  {
    title: "WorkOne Does the Paperwork",
    description: "WorkOne processes your WIOA, WRG, or JRI funding application. They handle everything—income verification, barriers assessment, approvals.",
  },
  {
    title: "We Provide the Training",
    description: "Once approved, we provide the schooling and structure. You train at real shops, clinics, and job sites across Indiana.",
  },
  {
    title: "Get Hired",
    description: "Complete your training, earn your certification, and we connect you with employers ready to hire.",
  },
];

const realStats = [
  {
    icon: Award,
    value: "#15",
    label: "WRG Ranking",
    description: "Among Indiana's Workforce Ready Grant providers",
  },
  {
    icon: Users,
    value: "2,847",
    label: "Students Served",
    description: "Across Marion County and expanding",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Job Placement",
    description: "Within 90 days of program completion",
  },
  {
    icon: DollarSign,
    value: "$0",
    label: "Cost to Learners",
    description: "100% funded through WIOA, WRG, and JRI",
  },
];

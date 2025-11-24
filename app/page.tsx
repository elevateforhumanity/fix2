// app/page.tsx - Elevate For Humanity Homepage
// Integrated Marketing + LMS Platform with Real Images
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, Award, Phone, Mail, Star, TrendingUp, Clock, Target, BookOpen, Video, MessageSquare, BarChart, DollarSign, Shield } from "lucide-react";

export default function Homepage() {
  return (
    <>
    <main className="min-h-screen bg-white">
      {/* Hero Banner Section with Real Image */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/media/homepage-hero.jpg"
            alt="Elevate For Humanity Training"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/80 to-blue-900/90" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-6 border border-white/30">
                <Award size={16} />
                <span>100% FREE • Fully Funded Training</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Free & Funded Career Pathways,{" "}
                <span className="text-yellow-300">Not Random Classes</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Elevate For Humanity is an Indiana-approved Career & Technical Institute that turns confusing systems into clear, funded steps into work—starting in Marion County and expanding as new approvals are added.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-yellow-300 flex-shrink-0" />
                  <span className="text-white">100% funded training for eligible Indiana residents (WIOA, WRG, JRI, and partner programs)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-yellow-300 flex-shrink-0" />
                  <span className="text-white">Pathways in Healthcare, Barber, HVAC, Building Maintenance, CDL, Workforce Readiness & Re-entry</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-yellow-300 flex-shrink-0" />
                  <span className="text-white">Employer partnerships, OJT/WEX, and case-manager-friendly reporting</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-yellow-300 flex-shrink-0" />
                  <span className="text-white">Ranked among Indiana's top Workforce Ready Grant providers</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-red-600 px-8 py-4 text-base font-bold shadow-lg hover:bg-yellow-300 hover:text-red-700 transition-all hover:scale-105"
                >
                  Check My Eligibility
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-8 py-4 text-base font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            {/* Right Column - Visual Hero Element */}
            <div className="relative z-10">
              <div className="relative">
                {/* Main Hero Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Stat Cards */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">$0</div>
                      <div className="text-sm text-white/80">Tuition Cost</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">85%</div>
                      <div className="text-sm text-white/80">Job Placement</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">8+</div>
                      <div className="text-sm text-white/80">Programs</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">2.8K</div>
                      <div className="text-sm text-white/80">Students</div>
                    </div>
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center border border-white/30">
                      <GraduationCap size={32} className="text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center border border-white/30">
                      <Briefcase size={32} className="text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center border border-white/30">
                      <Users size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <Award size={40} className="text-red-600" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        </section>

      {/* Funding Programs Explained */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Fund Your Training</h2>
            <p className="text-lg text-slate-600">We navigate the funding maze so you don't have to</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WIOA</h3>
              <p className="text-sm text-slate-700 mb-3">Workforce Innovation & Opportunity Act</p>
              <p className="text-xs text-slate-600">Federal program for unemployed/underemployed adults seeking career training</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WRG</h3>
              <p className="text-sm text-slate-700 mb-3">Workforce Ready Grant</p>
              <p className="text-xs text-slate-600">Indiana state program covering tuition for high-demand careers. We're ranked #15!</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">JRI</h3>
              <p className="text-sm text-slate-700 mb-3">Justice Reinvestment Initiative</p>
              <p className="text-xs text-slate-600">For justice-involved individuals seeking employment training and re-entry support</p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Briefcase size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">DOL Apprenticeship</h3>
              <p className="text-sm text-slate-700 mb-3">U.S. Department of Labor</p>
              <p className="text-xs text-slate-600">Registered apprenticeships combining on-the-job training with classroom instruction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Programs Highlighted */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Top 3 Programs</h2>
            <p className="text-lg text-slate-600">Most popular pathways with highest job placement</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Program 1: Barber */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image src="/media/programs/barber-hd.jpg" alt="Barber Apprenticeship" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  DOL Registered
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Barber Apprenticeship</h3>
                <p className="text-slate-600 mb-4">1,500-hour DOL-registered program. Train at real shops. Get licensed. Start your own business.</p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">WIOA</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Apprenticeship</span>
                </div>
                <Link href="/programs/barber" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Program 2: Medical Assistant */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image src="/media/programs/medical-hd.jpg" alt="Medical Assistant" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  WRG Approved
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Medical Assistant</h3>
                <p className="text-slate-600 mb-4">Clinical procedures, patient care, EHR systems. Train at partner clinics. National certification.</p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">WIOA</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">WRG</span>
                </div>
                <Link href="/programs/medical-assistant" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Program 3: HVAC */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="relative h-64">
                <Image src="/media/programs/hvac-hd.jpg" alt="HVAC Technician" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Next Level Jobs
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">HVAC Technician</h3>
                <p className="text-slate-600 mb-4">NCCER-aligned training. EPA certification prep. High-demand trade with $40K-$65K salaries.</p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">WIOA</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">WRG</span>
                </div>
                <Link href="/programs/hvac" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Programs Grid Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Approved, Aligned, and Built for Indiana Workforce Systems
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We don't guess. We build around what Indiana actually funds and recognizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Healthcare Pathways */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
              <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <Users size={32} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare Pathways</h3>
                <p className="text-slate-700 mb-4">
                  Medical Assistant, CNA, Phlebotomy, EKG, Patient Care Tech, and more—aligned with local employer demand and healthcare partners.
                </p>
                <Link href="/programs?category=healthcare" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Explore Healthcare <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Barber & Beauty */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
              <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <Target size={32} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Barber & Beauty Pathways</h3>
                <p className="text-slate-700 mb-4">
                  DOL-registered barber apprenticeship and beauty programs built with licensed shop owners, combining hours, licensing, and business skills.
                </p>
                <Link href="/programs/barber" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                  Explore Barber <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* HVAC & Building */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="absolute top-4 right-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <Briefcase size={32} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">HVAC, Electrical & Building Maintenance</h3>
                <p className="text-slate-700 mb-4">
                  NCCER-aligned programs listed with DWD & Next Level Jobs, preparing learners for trades, facilities, and construction careers.
                </p>
                <Link href="/programs?category=trades" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                  Explore Trades <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* CDL & Logistics */}
            <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
              <div className="absolute top-4 right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <TrendingUp size={32} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">CDL & Logistics</h3>
                <p className="text-slate-700 mb-4">
                  CDL and logistics training coordinated through approved partners, with workforce funding and employer pathways.
                </p>
                <Link href="/programs/cdl" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all">
                  Explore CDL <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Workforce Readiness */}
            <div className="group relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-xl">
              <div className="absolute top-4 right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <GraduationCap size={32} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Workforce Readiness & Re-entry</h3>
                <p className="text-slate-700 mb-4">
                  Barrier-aware pathways for justice-involved and hard-to-place learners, coordinated with courts, probation, parole, and community partners.
                </p>
                <Link href="/programs/reentry" className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all">
                  Explore Re-entry <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* All Programs CTA */}
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 hover:border-slate-600 transition-all hover:shadow-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <BookOpen size={32} className="text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">View All Programs</h3>
                <p className="text-slate-300 mb-4">
                  Explore our complete catalog of approved training pathways
                </p>
                <Link href="/programs" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all">
                  Browse All <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - How It Works Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Check Eligibility</h4>
                      <p className="text-sm text-slate-600">We look at your county, income, employment status, justice involvement, and barriers to see which programs may fit.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Connect to Workforce Partners</h4>
                      <p className="text-sm text-slate-600">We coordinate with WorkOne and other workforce boards so you're not bouncing between offices and websites.</p>
                    </div>
                  </div>

              {/* Key Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Complete funding support (WIOA, WRG, JRI)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Interactive online courses + hands-on training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Industry-recognized certifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">Job placement and career support</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105"
                >
                  Check My Eligibility
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-red-600 hover:text-red-600 transition-all"
                >
                  Browse Courses
                </Link>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">Questions? Contact us:</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <a href="tel:+13173143757" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition">
                    <Phone size={16} />
                    (317) 314-3757
                  </a>
                  <a href="mailto:elizabethpowell6262@gmail.com" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition">
                    <Mail size={16} />
                    elizabethpowell6262@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - How It Works */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Apply Online</h4>
                      <p className="text-sm text-slate-600">Tell us what you want to learn. Takes 10 minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">We Handle Funding</h4>
                      <p className="text-sm text-slate-600">We check your eligibility and submit paperwork for WIOA, WRG, or JRI.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Pick a Pathway That Actually Leads Somewhere</h4>
                      <p className="text-sm text-slate-600">We help you choose a program that leads to real, funded opportunities, not just a brochure.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Train, Track, and Transition</h4>
                      <p className="text-sm text-slate-600">You complete training while we track progress, coordinate with funders, and pull employers into the process.</p>
                    </div>
                  </div>
                </div>
              </div>

              </div>
            </div>

            {/* Right Column - Visual Stats Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Stat Card 1 */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <div className="text-sm text-white/90">Tuition Cost</div>
                  <div className="mt-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">85%</div>
                  <div className="text-sm text-white/90">Job Placement</div>
                  <div className="mt-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">#15</div>
                  <div className="text-sm text-white/90">WRG Ranking</div>
                  <div className="mt-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Award size={24} />
                  </div>
                </div>

                {/* Stat Card 4 */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">8+</div>
                  <div className="text-sm text-white/90">Career Paths</div>
                  <div className="mt-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              All programs are 100% funded through WIOA, WRG, and JRI. No tuition, no debt. Real jobs waiting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-red-300 transition-all"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  {program.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {program.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    {program.salary}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                100% Funded Training Through Multiple Programs
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We work with state and federal funding programs to ensure you can access training at no cost. No loans, no debt, no barriers.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WIOA Funding</h3>
                    <p className="text-sm text-slate-600">
                      Workforce Innovation and Opportunity Act provides free training for eligible adults.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WRG & Next Level Jobs</h3>
                    <p className="text-sm text-slate-600">
                      Indiana state programs covering tuition, fees, and certification costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CheckCircle size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">JRI Funding</h3>
                    <p className="text-sm text-slate-600">
                      Justice Reinvestment Initiative for justice-involved individuals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/funding/state-programs"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  Learn About Funding Options
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-red-100 p-12">
                <div className="text-center">
                  <div className="text-6xl font-bold text-slate-900 mb-4">100%</div>
                  <div className="text-2xl font-semibold text-slate-700 mb-2">Funded Training</div>
                  <div className="text-slate-600">No tuition. No loans. No barriers.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Journey to a New Career
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We've made it simple to get started. Follow these four steps to begin your career transformation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight size={20} className="text-slate-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105"
            >
              Start Your Application
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">$0</div>
              <div className="text-slate-300">Tuition Cost</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">8+</div>
              <div className="text-slate-300">Career Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">85%</div>
              <div className="text-slate-300">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400 mb-2">$45K</div>
              <div className="text-slate-300">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real people, real transformations. See how our programs have changed lives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.program}</div>
                  </div>
                </div>
                <p className="text-slate-700 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Read More Success Stories
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of students who have transformed their lives through our free training programs. No cost, no debt, just opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-600 shadow-lg hover:bg-slate-50 transition-all hover:scale-105"
            >
              Apply Now - It's Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const programs = [
  {
    name: "VITA Tax Preparation",
    slug: "vita",
    description: "Become an IRS-certified tax preparer. Help families file taxes and earn income year-round.",
    duration: "8-12 weeks",
    salary: "$35K-$55K",
  },
  {
    name: "Barber Apprenticeship",
    slug: "barber",
    description: "Learn barbering in a real shop. Get licensed and start your own business or work anywhere.",
    duration: "12 months",
    salary: "$30K-$60K+",
  },
  {
    name: "Medical Assistant",
    slug: "medical-assistant",
    description: "Work in clinics and hospitals. Take vitals, assist doctors, manage patient records.",
    duration: "8-12 weeks",
    salary: "$35K-$45K",
  },
  {
    name: "HVAC Technician",
    slug: "hvac",
    description: "Install and repair heating and cooling systems. High demand, great pay, work anywhere.",
    duration: "12 weeks",
    salary: "$40K-$65K",
  },
  {
    name: "CDL Training",
    slug: "cdl",
    description: "Get your Commercial Driver's License. Drive trucks, earn great money, see the country.",
    duration: "4 weeks",
    salary: "$50K-$75K",
  },
  {
    name: "Building Maintenance",
    slug: "building-maintenance",
    description: "Learn plumbing, electrical, HVAC basics. Maintain buildings, apartments, facilities.",
    duration: "10-12 weeks",
    salary: "$35K-$55K",
  },
  {
    name: "Digital Skills",
    slug: "digital-skills",
    description: "Master Microsoft Office, Google Workspace, email, and essential computer skills.",
    duration: "6-8 weeks",
    salary: "$30K-$45K",
  },
  {
    name: "Re-Entry Coaching",
    slug: "reentry",
    description: "For justice-involved individuals. Career coaching, job placement, second-chance employers.",
    duration: "Ongoing",
    salary: "Varies",
  },
];

const steps = [
  {
    title: "Apply Online",
    description: "Complete our simple application form in just 10 minutes.",
  },
  {
    title: "Check Eligibility",
    description: "We'll help you determine which funding programs you qualify for.",
  },
  {
    title: "Choose Your Program",
    description: "Select the healthcare career path that's right for you.",
  },
  {
    title: "Start Training",
    description: "Begin your journey to a new career with expert instruction.",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    program: "Barber Apprenticeship",
    quote: "I went from cutting hair in my kitchen to owning my own shop. Elevate helped me get licensed and connected me with mentors. Now I'm my own boss.",
  },
  {
    name: "Jennifer R.",
    program: "Medical Assistant",
    quote: "As a single mom, I couldn't afford school. This program was completely free and I got hired at a clinic before I even finished. Life-changing.",
  },
  {
    name: "David L.",
    program: "CDL Training",
    quote: "Got my CDL in 4 weeks, no cost. Now I'm making $60K driving for a great company. Best decision I ever made.",
  },
];

// app/page.tsx - Industrious-Level Homepage with Zero Dependencies
import EnrollmentProcess from '@/components/EnrollmentProcess';
import Link from "next/link";
import Image from "next/image";
import { EFH_IMAGES } from "@/src/config/efhImages";
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';
import { Carousel } from '@/components/animations/Carousel';
import { testimonials } from '@/data/testimonials';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Urgent Banner - Attention Grabber */}
      <section className="bg-orange-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base font-semibold">
            🔥 Next class starts January 15, 2025 - Apply by December 20 for priority placement
          </p>
        </div>
      </section>

      {/* STRONG HERO BANNER WITH PROFESSIONAL ANIMATIONS */}
      <section className="relative h-[600px] sm:h-[700px] md:h-[800px] w-full overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0 animate-breathe">
          <Image
            src="/media-backup-20251128-043832/homepage-hero.jpg"
            alt="Professional career training at Elevate for Humanity"
            fill
            className="object-cover brightness-110"
            priority
            quality={95}
            sizes="100vw"
          />
        </div>
        {/* Light overlay for text readability only */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            {/* Top Badge - Slide in from top */}
            <div className="mb-6 opacity-0 animate-[fadeInDown_0.8s_ease-out_forwards]">
              <span className="inline-block px-6 py-3 bg-orange-600 text-white font-bold text-sm sm:text-base rounded-full mb-6 shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300">
                🎓 Next Class Starts January 15, 2025
              </span>
            </div>
            
            {/* Main Heading - Slide in from bottom */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-none tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              Launch Your<br/>
              <span className="text-orange-500 inline-block animate-[glow_2s_ease-in-out_infinite]">Career Today</span>
            </h1>
            
            {/* Subheading - Fade in */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 leading-tight opacity-0 animate-[zoomIn_0.8s_ease-out_0.6s_forwards]">
              100% FREE Training
            </p>
            
            {/* Description - Fade in */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.9s_forwards]">
              No Tuition • No Debt • Earn While You Learn<br/>
              Government-Funded Programs • Job Placement Support
            </p>
            
            {/* CTA Buttons - Slide in from sides */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/programs"
                className="w-full sm:w-auto px-10 py-5 bg-orange-600 text-white font-black text-xl rounded-full hover:bg-orange-700 transition-all duration-300 shadow-2xl hover:scale-110 hover:shadow-orange-500/50 transform text-center opacity-0 animate-[slideInLeft_0.8s_ease-out_1.2s_forwards]"
              >
                View Programs →
              </Link>
              <Link
                href="/apply"
                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black text-xl rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-110 transform text-center opacity-0 animate-[slideInRight_0.8s_ease-out_1.2s_forwards]"
              >
                Apply Free Now
              </Link>
            </div>
            
            {/* Stats - Float in from bottom with CountUp */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white opacity-0 animate-[fadeInUp_0.8s_ease-out_1.5s_forwards]">
              <div className="text-center transform hover:scale-110 transition-all duration-300 hover:animate-[float_2s_ease-in-out_infinite]">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={33} />
                </div>
                <div className="text-sm sm:text-base text-gray-300 font-semibold">Career Programs</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300 hover:animate-[float_2s_ease-in-out_infinite]">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={0} prefix="$" />
                </div>
                <div className="text-sm sm:text-base text-gray-300 font-semibold">Tuition Cost</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300 hover:animate-[float_2s_ease-in-out_infinite]">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-sm sm:text-base text-gray-300 font-semibold">Funded Training</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">Choose Your Career Path</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Start earning $15-20/hour while training. Graduate making $35K-65K/year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Barber Program */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/programs/barber.jpg"
                    alt="Professional barber training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Barber Apprenticeship</h3>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-orange-600">$35K-55K</div>
                    <div className="text-xs text-slate-500">Average graduate salary</div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    Earn $15-18/hour while training. 2,000 hours. State licensed. 100% free.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Healthcare Program */}
            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/programs/healthcare-hd.jpg"
                    alt="Healthcare training and nursing"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Healthcare Training</h3>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-blue-600">$30K-45K</div>
                    <div className="text-xs text-slate-500">CNA starting salary</div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    4-6 weeks to certification. State-approved. Clinical placement included. 100% free.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/programs/hvac-hd.jpg"
                    alt="HVAC and skilled trades training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Skilled Trades</h3>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-green-600">$45K-65K</div>
                    <div className="text-xs text-slate-500">HVAC technician salary</div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    6-12 months training. EPA certified. High demand. 100% free.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>


          </div>
        </div>
      </section>

      {/* Hero Content - After Featured Programs */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Launch Your Career in Weeks, Not Years
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
            Earn while you train for high-demand careers. Zero tuition. Zero debt. Government-funded training that leads directly to employment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white font-bold text-center rounded-full hover:bg-orange-700 transition-all shadow-xl text-lg"
            >
              See Programs & Salaries
            </Link>
            <Link
              href="/apply"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold text-center rounded-full hover:bg-gray-100 transition-all shadow-xl text-lg border-2 border-slate-200"
            >
              Apply Now - Class Starts Jan 15
            </Link>
          </div>
          
          <p className="text-sm text-slate-500 mt-6">
            ⏰ Limited spots available - Priority given to applications received by December 20
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">Why We Deliver Results</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">Proven programs designed to overcome barriers and launch careers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/programs/welding-hd.jpg"
                  alt="100% Fundable Programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">100% Fundable</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  WIOA, WRG, JRI, and ETPL approved. Most students pay $0 out of pocket.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/gallery/image2.jpg"
                  alt="DOL Registered Apprenticeships"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">DOL Registered</h3>
                <p className="text-slate-600 leading-relaxed">
                  Federally recognized apprenticeships in barber, healthcare, and skilled trades.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/learners/coaching-session.jpg"
                  alt="Wraparound Support Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Wraparound Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Life coaching, housing assistance, childcare navigation, and mental health referrals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL IMAGE SECTION - Avon Style */}
      <section className="py-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden group">
            <Image
              src="/images/gallery/image10.jpg"
              alt="Hands-On Training"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              quality={100}
            />
            <div className="absolute inset-0 flex items-end p-12">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Hands-On Training</h3>
                <p className="text-white/90 mb-6 text-lg">Real-world skills with experienced instructors</p>
                <Link
                  href="/programs/barber-apprenticeship"
                  className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] overflow-hidden group">
            <Image
              src="/images/gallery/image11.jpg"
              alt="Career Services"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              quality={100}
            />
            <div className="absolute inset-0 flex items-end p-12">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Career Services</h3>
                <p className="text-white/90 mb-6 text-lg">Job placement and ongoing support</p>
                <Link
                  href="/support"
                  className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition"
                >
                  Get Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - With Real Photos */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600">Hear from our graduates</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/testimonials/testimonial-success-story-2.png"
                alt="Student Success Story"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                quality={100}
              />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/testimonials/testimonial-medical-assistant.png"
                alt="Medical Assistant Graduate"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY IMAGE 3 */}
      <section className="relative w-full">
        <Image
          src="/images/location-6.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
      </section>

      {/* FACILITY IMAGE 4 */}
      <section className="relative w-full">
        <Image
          src="/images/location-8.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
      </section>

      {/* FACILITY IMAGE 5 */}
      <section className="relative w-full">
        <Image
          src="/images/location-10.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
      </section>

      {/* FACILITIES GALLERY */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Our Facilities</h2>
            <p className="text-lg text-slate-600">Modern training spaces designed for hands-on learning</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image3.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image4.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image5.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image7.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image9.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image8.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/location-11.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">Trusted Partners & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">WIOA</div>
              <p className="text-xs text-slate-600">Workforce Innovation & Opportunity Act</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-red-600 mb-2">DOL</div>
              <p className="text-xs text-slate-600">U.S. Department of Labor Registered</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">WRG</div>
              <p className="text-xs text-slate-600">Workforce Ready Grant Approved</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">JRI</div>
              <p className="text-xs text-slate-600">Justice Reinvestment Initiative</p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 mt-8">
            All programs are state-approved and meet federal standards for workforce development
          </p>
        </div>
      </section>

      {/* DOWNLOAD APP SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Take Your Training Anywhere
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Access courses, track progress, and connect with instructors on the go. Download the Elevate app today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/app/elevate-for-humanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-all"
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
                  href="https://play.google.com/store/apps/details?id=org.elevateforhumanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-all"
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
              <p className="text-sm text-gray-400 mt-6">
                Available for iOS 13+ and Android 8+
              </p>
            </div>
            <div className="relative h-[400px] sm:h-[500px]">
              <Image
                src="/media-backup-20251128-043832/programs/cdl-hd.jpg"
                alt="Mobile app on smartphone"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Bold and Clean */}
      <section className="py-24 px-6 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Career Starts Now
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Funding secured. Spots limited. Class starts January 15. Apply today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/apply"
              className="px-10 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-slate-50 transition-all shadow-lg text-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/advising"
              className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-orange-600 transition-all text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>

          <div className="text-white">
            <p className="mb-2">Questions? We're here to help.</p>
            <p>
              Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or 
              email <a href="mailto:info@elevateforhumanity.org" className="underline font-semibold hover:text-white">info@elevateforhumanity.org</a>
            </p>
          </div>
        </div>
      </section>
    
      <EnrollmentProcess />
    </main>
  );
}

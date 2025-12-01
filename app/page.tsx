import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";
import SocialMediaHighlight from "@/components/SocialMediaHighlight";
import SideHeroBanner from "@/components/SideHeroBanner";

export const metadata = {
  title: "Elevate for Humanity | Workforce Development & Career Training",
  description:
    "State-funded workforce training programs in Indianapolis. Free career training through WIOA, WRG, and apprenticeships.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* TOP BANNER - Urgent Call to Action */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-3 sticky top-0 z-50 shadow-lg">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white animate-pulse">
                🔥 NOW ENROLLING
              </span>
              <p className="text-white font-semibold text-sm sm:text-base">
                Free Career Training - 100% Government Funded • Start in 2 Weeks
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-all shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </section>

      {/* HERO SLIDESHOW */}
      <HeroSlideshow />

      {/* GOVERNMENT PARTNERS BAR */}
      <section className="bg-slate-50 border-y border-slate-200 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Approved Workforce Development Partner
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="font-semibold text-slate-700">EmployIndy</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700">WorkOne</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700">Indiana DWD</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700">US Dept of Labor</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STORY - Large Image + Text (Princeton Style) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded overflow-hidden shadow-xl">
              <Image
                src="/images/location-4.jpg"
                alt="Elevate For Humanity Office - Indianapolis"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                How We Work
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Government Pays 100%.<br />You Pay Nothing.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                We connect you to state and federal workforce programs that cover your entire training cost—tuition, books, supplies, certification exams, and support services like transportation and childcare.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Programs like WIOA (Workforce Innovation & Opportunity Act), Indiana's Workforce Ready Grant, and DOL-registered apprenticeships exist specifically to help unemployed and underemployed residents gain skills and get hired.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We handle the paperwork, guide you through eligibility, and connect you directly to employers who are hiring.
              </p>
              <Link
                href="/funding"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Learn about funding options
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIDE HERO BANNER */}
      <SideHeroBanner />

      {/* SINGLE FEATURE - HEALTHCARE */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Healthcare Careers
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Start Your Healthcare Career in Weeks
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Train as a Certified Nursing Assistant, Medical Assistant, or Phlebotomist in 4-10 weeks. State certification included. Hospitals and clinics are hiring immediately.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Starting pay: $16-$20/hour with benefits and room for advancement.
              </p>
              <Link
                href="/programs/cna"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Explore healthcare programs
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/healthcare-professional-1-hd.jpg"
                alt="Healthcare training"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE FEATURE - SKILLED TRADES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/location-5.jpg"
                alt="Elevate For Humanity Training Facility"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Skilled Trades
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Build a Career in High-Demand Trades
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                HVAC technicians, welders, and building maintenance workers earn $20-$30/hour with benefits. Get EPA certification, OSHA training, and hands-on experience.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Apprenticeships available with local employers.
              </p>
              <Link
                href="/programs/hvac"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Explore trades programs
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE FEATURE - LICENSED PROFESSIONALS */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Licensed Professionals
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Get Licensed, Get Hired, Get Ahead
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Become a licensed barber, CDL truck driver, or cosmetologist. Own your chair, drive your own routes, or work for established companies.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Flexible schedules and entrepreneurship opportunities.
              </p>
              <Link
                href="/programs/barber"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Explore licensed programs
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/barber-hd.jpg"
                alt="Barber training"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE FEATURE IMAGE - HANDS-ON TRAINING */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/location-9.jpg"
                alt="Elevate For Humanity Office Location"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Real Training, Real Skills
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Learn by Doing, Not Just Watching
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Every program includes hands-on practice with real equipment, real scenarios, and real instructors who work in the field.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                You'll practice CPR on mannequins, work with actual HVAC systems, cut real hair, drive real trucks, and use the same tools professionals use every day.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                See all training programs
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE PROGRAM SHOWCASE - CNA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4">Featured Training Programs</h2>
            <p className="text-xl text-slate-600 font-light">
              Industry-recognized credentials in high-demand fields
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/cna-hd.jpg"
                alt="Certified Nursing Assistant Training"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                Certified Nursing Assistant (CNA)
              </h3>
              <p className="text-lg text-slate-600 mb-4">
                Start your healthcare career in just 4-6 weeks. Get hands-on training, clinical experience, and state certification.
              </p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="text-lg font-semibold text-slate-900">4-6 weeks</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Salary Range</p>
                  <p className="text-lg font-semibold text-slate-900">$35K-$45K</p>
                </div>
              </div>
              <Link
                href="/programs/cna"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
              >
                Learn More
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                HVAC Technician
              </h3>
              <p className="text-lg text-slate-600 mb-4">
                Learn heating, ventilation, and air conditioning systems. Get EPA certification and OSHA training in 8-12 weeks.
              </p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="text-lg font-semibold text-slate-900">8-12 weeks</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Salary Range</p>
                  <p className="text-lg font-semibold text-slate-900">$45K-$65K</p>
                </div>
              </div>
              <Link
                href="/programs/hvac"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
              >
                Learn More
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/facilities-new/facility-15.jpg"
                alt="HVAC Technician Training"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/cdl-hd.jpg"
                alt="Commercial Driver CDL Training"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                Commercial Driver (CDL)
              </h3>
              <p className="text-lg text-slate-600 mb-4">
                Get your CDL license in 4-6 weeks. Drive for national carriers or local companies with excellent pay and benefits.
              </p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="text-lg font-semibold text-slate-900">4-6 weeks</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Salary Range</p>
                  <p className="text-lg font-semibold text-slate-900">$50K-$70K</p>
                </div>
              </div>
              <Link
                href="/programs/cdl"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors"
              >
                Learn More
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/programs"
              className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors text-lg"
            >
              View all 20+ training programs
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Impact by the Numbers
            </h2>
            <p className="text-lg text-slate-600">
              Real results from real people building real careers
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-teal-600 mb-2">500+</div>
              <p className="text-slate-700 font-semibold">Students Trained</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-slate-700 font-semibold">Job Placement Rate</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-slate-700 font-semibold">Training Programs</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-purple-600 mb-2">100+</div>
              <p className="text-slate-700 font-semibold">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES - SINGLE LARGE TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600 font-light">
              Real graduates, real careers
            </p>
          </div>

          {/* Story 1 - Marcus */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/cna-hd.jpg"
                alt="Marcus J. - CNA Graduate"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                CNA Training Graduate
              </p>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                Marcus J.
              </h3>
              <p className="text-2xl text-slate-700 italic mb-6 leading-relaxed">
                "I went from unemployed to working at a hospital in 6 weeks."
              </p>
              <p className="text-lg text-slate-600 mb-4">
                Marcus completed our CNA training program and was hired immediately after passing his state certification exam.
              </p>
              <p className="text-lg font-semibold text-slate-900">
                Now earning $18/hr at Community Hospital
              </p>
            </div>
          </div>

          {/* Story 2 - Tasha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                HVAC Technician Graduate
              </p>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                Tasha W.
              </h3>
              <p className="text-2xl text-slate-700 italic mb-6 leading-relaxed">
                "Free training, real skills, and a job waiting when I finished."
              </p>
              <p className="text-lg text-slate-600 mb-4">
                Tasha trained with us through WIOA funding and secured employment before graduation.
              </p>
              <p className="text-lg font-semibold text-slate-900">
                Hired by local HVAC company at $22/hr
              </p>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/hvac-hd.jpg"
                alt="Tasha W. - HVAC Graduate"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          {/* Story 3 - David */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/cdl-hd.jpg"
                alt="David R. - CDL Graduate"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                CDL Training Graduate
              </p>
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                David R.
              </h3>
              <p className="text-2xl text-slate-700 italic mb-6 leading-relaxed">
                "I got my CDL without paying a dime. Best decision I made."
              </p>
              <p className="text-lg text-slate-600 mb-4">
                David completed CDL training through Workforce Ready Grant funding and now drives for a national carrier.
              </p>
              <p className="text-lg font-semibold text-slate-900">
                Driving for national carrier at $60K/year
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/success-stories"
              className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors text-lg"
            >
              Read more success stories
              <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA HIGHLIGHT */}
      <SocialMediaHighlight />

      {/* ABOUT FOUNDER */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Our Founder
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Elizabeth L. Greene
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Elizabeth L. Greene is the Founder and CEO of Elevate For Humanity™, a mission-driven workforce organization dedicated to expanding access to quality training, career advancement, and employer-connected opportunities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Elizabeth leads with a blend of professional discipline and genuine care for the people and communities Elevate For Humanity serves. Her approach is simple: keep the work human, keep the systems strong, and keep the focus on helping individuals move forward with confidence.
              </p>
              <blockquote className="border-l-4 border-orange-500 pl-4 py-2 italic text-slate-700 mb-6">
                "Our goal is simple — to make career growth feel clear, achievable, and supported. Every learner deserves a pathway and someone who believes in their potential."
              </blockquote>
              <Link
                href="/founder"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Meet the Founder
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative h-[400px] rounded overflow-hidden shadow-xl">
              <Image
                src="/images/heroes/about-team.jpg"
                alt="Elizabeth L. Greene - Founder & CEO"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA WITH IMAGE */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/image11.jpg"
                alt="Start your training today"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Training?
              </h2>
              <p className="text-xl mb-8 text-orange-50">
                Apply now for free workforce training through state-funded programs. No tuition. Real credentials. Direct job connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors shadow-lg"
                >
                  Apply Now
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors shadow-lg"
                >
                  View Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Data
const features = [
  {
    title: "Healthcare Careers",
    description: "Train as a Certified Nursing Assistant, Medical Assistant, or Phlebotomist in 4-10 weeks. State certification included. Hospitals and clinics are hiring immediately. Starting pay: $16-$20/hour.",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna-certification",
  },
  {
    title: "Skilled Trades",
    description: "HVAC technicians, welders, and building maintenance workers earn $20-$30/hour with benefits. Get EPA certification, OSHA training, and hands-on experience. Apprenticeships available.",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac-technician",
  },
  {
    title: "Licensed Professionals",
    description: "Become a licensed barber, CDL truck driver, or cosmetologist. Own your chair, drive your own routes, or work for established companies. Flexible schedules and entrepreneurship opportunities.",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber-apprenticeship",
  },
];

const programs = [
  {
    title: "Certified Nursing Assistant",
    description: "Healthcare career training",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    link: "/programs/cna-certification",
    image: "/images/artlist/hero-training-1.jpg",
  },
  {
    title: "HVAC Technician",
    description: "Heating & cooling systems",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    link: "/programs/hvac-technician",
    image: "/images/artlist/hero-training-2.jpg",
  },
  {
    title: "Licensed Barber",
    description: "Professional barbering",
    duration: "12 weeks",
    salary: "$30K-$55K",
    link: "/programs/barber-apprenticeship",
    image: "/images/artlist/hero-training-3.jpg",
  },
  {
    title: "Commercial Driver",
    description: "CDL certification",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    link: "/programs/cdl-training",
    image: "/images/artlist/hero-training-4.jpg",
  },
  {
    title: "Medical Assistant",
    description: "Clinical support role",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    link: "/programs/medical-administrative-assistant",
    image: "/images/artlist/hero-training-5.jpg",
  },
  {
    title: "Building Maintenance",
    description: "Property maintenance",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    link: "/programs/building-maintenance-tech",
    image: "/media/programs/building-hd.jpg",
  },
  {
    title: "Phlebotomy",
    description: "Blood draw specialist",
    duration: "4-6 weeks",
    salary: "$30K-$38K",
    link: "/programs/phlebotomy-technician",
    image: "/media/programs/medical-hd.jpg",
  },
  {
    title: "IT Support Specialist",
    description: "Technical support",
    duration: "8-12 weeks",
    salary: "$40K-$55K",
    link: "/programs/it-support-specialist",
    image: "/media/programs/welding-hd.jpg",
  },
];

const stories = [
  {
    name: "Marcus J.",
    program: "CNA Training",
    quote: "I went from unemployed to working at a hospital in 6 weeks.",
    outcome: "Now earning $18/hr at Community Hospital",
    image: "/media/programs/cna-hd.jpg",
  },
  {
    name: "Tasha W.",
    program: "HVAC Technician",
    quote: "Free training, real skills, and a job waiting when I finished.",
    outcome: "Hired by local HVAC company at $22/hr",
    image: "/media/programs/hvac-hd.jpg",
  },
  {
    name: "David R.",
    program: "CDL Training",
    quote: "I got my CDL without paying a dime. Best decision I made.",
    outcome: "Driving for national carrier at $60K/year",
    image: "/media/programs/cdl-hd.jpg",
  },
];

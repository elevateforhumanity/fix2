import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users, Award, DollarSign, Clock, TrendingUp, Briefcase, Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description:
    "Get FREE career training through state-funded workforce programs. Indiana residents train at no cost using WIOA, WRG, apprenticeships and more.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* 1️⃣ HERO BANNER - COMPLETE UPGRADE */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/students-new/student-11.jpg"
            alt="Students in career training"
            fill
            className="object-cover"
            priority
            quality={95} sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold mb-6 shadow-xl animate-pulse">
              <span className="text-lg">✓</span>
              <span>100% FREE - STATE FUNDED</span>
            </div>

            {/* BIG Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Get FREE Career Training<br />
              Through State-Funded<br />
              <span className="text-orange-400">Workforce Programs</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Indiana residents can train at no cost using <strong className="text-white">Workforce Ready Grants</strong>, <strong className="text-white">WIOA</strong>, <strong className="text-white">Apprenticeships</strong>, and more.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-slate-900 bg-orange-500 rounded-full hover:bg-orange-400 transition-all hover:scale-105 shadow-2xl"
              >
                Apply for Funding
                <ArrowRight size={24} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all hover:scale-105 border-2 border-white/30 shadow-2xl"
              >
                Explore Programs
              </Link>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-slate-300">
              Approved by <strong className="text-white">EmployIndy</strong> • <strong className="text-white">WorkOne</strong> • <strong className="text-white">Indiana DWD</strong> • <strong className="text-white">US Dept of Labor</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ HOW IT WORKS - 5 STEPS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              How to Get Free Training
            </h2>
            <p className="text-xl text-slate-600">
              Simple 5-step process from application to employment
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/funding/how-it-works"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Learn more about funding options
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5️⃣ PROGRAM CARDS ON HOMEPAGE */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-xl text-slate-600">
              High-demand careers with real job opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500" quality={85} sizes="100vw"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    FREE
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {program.description}
                  </p>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-slate-700 font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-green-600" />
                      <span className="text-slate-700 font-semibold">{program.salary}</span>
                    </div>
                  </div>
                  <span className="text-orange-500 font-bold text-sm group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-xl"
            >
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6️⃣ SOCIAL PROOF - STATS + SUCCESS STORIES */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Elevate For Humanity Impact
            </h2>
            <p className="text-xl text-blue-100">
              Real training → Real jobs → Real results
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
              <p className="text-lg text-blue-100">Students Supported</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">20+</div>
              <p className="text-lg text-blue-100">Training Programs</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">$20-32</div>
              <p className="text-lg text-blue-100">Avg Starting Wage/Hr</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2">85%</div>
              <p className="text-lg text-blue-100">Job Placement Rate</p>
            </div>
          </div>

          {/* Success Stories */}
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold">
                    {story.initials}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{story.name}</p>
                    <p className="text-sm text-blue-100">{story.program}</p>
                  </div>
                </div>
                <p className="text-white/90 italic mb-3">"{story.quote}"</p>
                <p className="text-sm text-blue-100 font-semibold">{story.outcome}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Read More Success Stories
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3️⃣ BRIGHT PROFESSIONAL IMAGE SECTION */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/facilities-new/facility-5.jpg"
                alt="Training facility and classrooms"
                fill
                className="object-cover" quality={85} sizes="100vw"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Elevate?
              </h2>
              <ul className="space-y-4">
                {whyChoose.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-900">{reason.title}</p>
                      <p className="text-slate-600">{reason.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
                >
                  Learn About Our Mission
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-2xl text-orange-100 mb-8">
            Apply now and start training within 2 weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now - It's Free
              <ArrowRight size={24} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition-all hover:scale-105 border-2 border-white/30 shadow-2xl"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* 7️⃣ STRONG FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Elevate For Humanity</h3>
              <p className="text-slate-300 text-sm mb-4">
                Free career training through state-funded workforce programs. Changing lives in Indianapolis and beyond.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="sr-only">Facebook</span>
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="sr-only">Twitter</span>
                  𝕏
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  in
                </a>
              </div>
            </div>

            {/* Column 2 - Programs */}
            <div>
              <h3 className="text-lg font-bold mb-4">Programs</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link href="/programs/cna" className="hover:text-orange-400 transition-colors">CNA Training</Link></li>
                <li><Link href="/programs/hvac" className="hover:text-orange-400 transition-colors">HVAC Technician</Link></li>
                <li><Link href="/programs/barber" className="hover:text-orange-400 transition-colors">Barber Apprenticeship</Link></li>
                <li><Link href="/programs/cdl" className="hover:text-orange-400 transition-colors">CDL Training</Link></li>
                <li><Link href="/programs" className="hover:text-orange-400 transition-colors font-semibold">View All Programs →</Link></li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link href="/funding" className="hover:text-orange-400 transition-colors">Funding Options</Link></li>
                <li><Link href="/funding/wioa" className="hover:text-orange-400 transition-colors">WIOA</Link></li>
                <li><Link href="/funding/wrg" className="hover:text-orange-400 transition-colors">Workforce Ready Grant</Link></li>
                <li><Link href="/faq" className="hover:text-orange-400 transition-colors">FAQs</Link></li>
                <li><Link href="/success-stories" className="hover:text-orange-400 transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  <span>Indianapolis, IN 46205</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  <a href="tel:3171234567" className="hover:text-orange-400 transition-colors">(317) 123-4567</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={18} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@elevateforhumanity.org" className="hover:text-orange-400 transition-colors">info@elevateforhumanity.org</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2024 Elevate For Humanity. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Data
const steps = [
  {
    title: "Check Eligibility",
    description: "Apply online in 5 minutes",
  },
  {
    title: "Submit Documents",
    description: "Provide required paperwork",
  },
  {
    title: "Meet Your Advisor",
    description: "Discuss your career goals",
  },
  {
    title: "Choose Program",
    description: "Select your training path",
  },
  {
    title: "Start Training",
    description: "Begin learning for free",
  },
];

const programs = [
  {
    title: "CNA",
    description: "Certified Nursing Assistant",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
  },
  {
    title: "HVAC",
    description: "Heating & Cooling Tech",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
  },
  {
    title: "Barber",
    description: "Licensed Barber",
    duration: "12 weeks",
    salary: "$30K-$55K",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
  },
  {
    title: "CDL",
    description: "Commercial Driver",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    image: "/media/programs/cdl-hd.jpg",
    link: "/programs/cdl",
  },
  {
    title: "Medical Assistant",
    description: "Clinical Support Role",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    image: "/images/programs/efh-cna-hero.jpg",
    link: "/programs/medical-assistant",
  },
  {
    title: "Building Tech",
    description: "Maintenance Technician",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    image: "/media/programs/building-tech-hd.jpg",
    link: "/programs/building-maintenance",
  },
  {
    title: "IT Support",
    description: "Technology Career",
    duration: "8-12 weeks",
    salary: "$40K-$55K",
    image: "/media/programs/it-hd.jpg",
    link: "/programs/it-support",
  },
  {
    title: "Culinary Arts",
    description: "Professional Chef",
    duration: "10-12 weeks",
    salary: "$28K-$45K",
    image: "/media/programs/culinary-hd.jpg",
    link: "/programs/culinary-arts",
  },
];

const successStories = [
  {
    initials: "M.J.",
    name: "Marcus J.",
    program: "CNA Training",
    quote: "I went from unemployed to working at a hospital in 6 weeks. This program changed my life.",
    outcome: "Now earning $18/hr at Community Hospital",
  },
  {
    initials: "T.W.",
    name: "Tasha W.",
    program: "HVAC Technician",
    quote: "Free training, real skills, and a job waiting for me when I finished. Couldn't ask for more.",
    outcome: "Hired by local HVAC company at $22/hr",
  },
  {
    initials: "D.R.",
    name: "David R.",
    program: "CDL Training",
    quote: "I'm making more money than I ever have, and I got my CDL without paying a dime.",
    outcome: "Driving for national carrier at $60K/year",
  },
];

const whyChoose = [
  {
    title: "100% Free Training",
    description: "Government funding covers tuition, books, supplies, and support services.",
  },
  {
    title: "Real Credentials",
    description: "State licenses and industry certifications that employers recognize and value.",
  },
  {
    title: "Job Placement Support",
    description: "Direct connections to 100+ hiring employers in Indianapolis and beyond.",
  },
  {
    title: "Flexible Schedules",
    description: "Day, evening, and weekend classes to fit your life and responsibilities.",
  },
  {
    title: "Wrap-Around Support",
    description: "Transportation help, childcare assistance, and barrier removal services.",
  },
];

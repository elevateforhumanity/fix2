import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Users, Award, DollarSign, Clock, TrendingUp, Briefcase } from "lucide-react";
import HeroSlideshow from "./components/HeroSlideshow";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description:
    "100% free workforce training through WIOA funding. CNA, HVAC, Barber, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO - CLEAN & POWERFUL */}
      <section className="relative text-white overflow-hidden h-[500px] sm:h-[600px] md:h-[700px]">
        {/* Background Slideshow */}
        <HeroSlideshow />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold mb-6 animate-pulse">
              <span className="text-lg">✓</span>
              <span>100% FREE - GOVERNMENT FUNDED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Start Your<br />
              <span className="text-orange-400">New Career</span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-slate-200 mb-8 font-light">
              Free career training in healthcare, trades, and tech.<br />
              No tuition. Real credentials. Guaranteed job connections.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10 max-w-xl">
              <div>
                <div className="text-3xl font-bold text-orange-400">$0</div>
                <div className="text-sm text-slate-300">Out of Pocket</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-slate-300">Free Training</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-slate-900 bg-orange-500 rounded-full hover:bg-orange-400 transition-all hover:scale-105 shadow-2xl"
              >
                Apply Now - It's Free
                <ArrowRight size={24} />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all hover:scale-105 border-2 border-white/20"
              >
                Check Your Funding
              </Link>
            </div>

            {/* Trust Line */}
            <p className="mt-8 text-sm text-slate-400">
              Trusted by <strong className="text-white">EmployIndy</strong>, <strong className="text-white">WorkOne</strong>, <strong className="text-white">Indiana DWD</strong>, and <strong className="text-white">US Dept of Labor</strong>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-end justify-center pb-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITIONS - ABOVE THE FOLD */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Prop 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                100% Free Training
              </h3>
              <p className="text-slate-600">
                Government pays for tuition, books, supplies, and support services. You pay nothing.
              </p>
            </div>

            {/* Prop 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Real Credentials
              </h3>
              <p className="text-slate-600">
                State licenses, industry-standard certifications, and nationally recognized credentials employers want.
              </p>
            </div>

            {/* Prop 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Job Connections
              </h3>
              <p className="text-slate-600">
                Direct connections to 100+ hiring employers. We help you get interviews and land the job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY SHOWCASE */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Modern Training Facilities
            </h2>
            <p className="text-xl text-slate-600">
              Professional environment designed for hands-on learning and career success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/facility-1.jpg"
                alt="Elevate For Humanity training facility"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/facility-2.jpg"
                alt="Professional training environment"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALED PROGRAMS - HYBRID - SHORT TERM */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Credentialed Programs
            </h2>
            <p className="text-xl text-slate-600">
              Hybrid learning • Short-term training • Industry-recognized credentials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Hybrid Learning */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                Hybrid Format
              </h3>
              <p className="text-slate-700 text-center">
                Learn online at your own pace, then practice hands-on skills at our modern training facility with expert instructors.
              </p>
            </div>

            {/* Short-Term */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                Short-Term Training
              </h3>
              <p className="text-slate-700 text-center">
                Complete programs in weeks, not years. Get job-ready fast with focused, intensive training designed for quick career entry.
              </p>
            </div>

            {/* Credentialed */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                Industry Credentials
              </h3>
              <p className="text-slate-700 text-center">
                Earn state licenses, national certifications, and industry-recognized credentials that employers value and trust.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              Explore Programs
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS - CLEAN GRID */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Most Popular Programs
            </h2>
            <p className="text-xl text-slate-600">
              High-demand careers with great pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative h-56">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500" quality={100} sizes="100vw"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    FREE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {program.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={18} className="text-blue-600" />
                      <span className="text-slate-700 font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="text-slate-700 font-semibold">{program.salary}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-bold group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full hover:bg-slate-100 transition-all border-2 border-slate-300 hover:border-orange-500 shadow-md"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - IMPACT NUMBERS */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Results
            </h2>
            <p className="text-xl text-blue-100">
              Changing lives through workforce training
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold mb-2">500+</div>
              <p className="text-xl text-blue-100">Students Trained</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">85%</div>
              <p className="text-xl text-blue-100">Job Placement</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">100+</div>
              <p className="text-xl text-blue-100">Hiring Partners</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">$45K</div>
              <p className="text-xl text-blue-100">Avg Starting Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING EXPLAINED */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                How Is This Free?
              </h2>
              <p className="text-xl text-slate-700 mb-8">
                Government workforce programs pay for everything. You qualify if you're:
              </p>
              <ul className="space-y-4 mb-8">
                {qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{qual.title}</p>
                      <p className="text-slate-600">{qual.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/funding"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-xl"
              >
                Learn About Funding
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Training facility"
                fill
                className="object-cover" quality={100} sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* REAL TRAINING PHOTOS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Hands-On Training
            </h2>
            <p className="text-xl text-slate-600">
              Real students learning real skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cpr-group-training-hd.jpg"
                alt="CPR training - Real students learning life-saving skills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cna-training-video-thumbnail.jpg"
                alt="CNA training - Real healthcare students"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/medical-esthetics-training-hd.jpg"
                alt="Medical esthetics training - Real beauty students"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/programs/cpr-certification-group-hd.jpg"
                alt="CPR certification - Real students getting certified"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>



      {/* FINAL CTA - BIG & BOLD */}
      <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-2xl md:text-3xl text-orange-100 mb-10">
            Apply now and begin training within 2 weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now
              <ArrowRight size={28} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 text-2xl font-bold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition-all hover:scale-105 border-4 border-white/30"
            >
              Talk to Advisor
            </Link>
          </div>
          <p className="mt-8 text-lg text-orange-100">
            Questions? Call us at <strong className="text-white">(317) 123-4567</strong> or email <strong className="text-white">info@elevateforhumanity.org</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

const programs = [
  {
    title: "CNA",
    description: "Certified Nursing Assistant - Healthcare career in 4-6 weeks",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
  },
  {
    title: "HVAC",
    description: "Heating & cooling technician - High-demand trade",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
  },
  {
    title: "Barber",
    description: "Licensed barber - Build your own business",
    duration: "12 weeks",
    salary: "$30K-$55K",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
  },
  {
    title: "CDL",
    description: "Commercial driver - Trucking career with benefits",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    image: "/media/programs/cdl-hd.jpg",
    link: "/programs/cdl",
  },
  {
    title: "Medical Assistant",
    description: "Clinical support role in healthcare settings",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    image: "/media/programs/medical-assistant-hd.jpg",
    link: "/programs/medical-assistant",
  },
  {
    title: "Building Tech",
    description: "Maintenance technician for commercial properties",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    image: "/media/programs/building-tech-hd.jpg",
    link: "/programs/building-maintenance",
  },
];

const qualifications = [
  {
    title: "Unemployed or Underemployed",
    description: "Looking for better career opportunities",
  },
  {
    title: "Marion County Resident",
    description: "Or surrounding Indiana counties",
  },
  {
    title: "Eligible to Work in US",
    description: "Legal work authorization required",
  },
  {
    title: "Committed to Success",
    description: "Ready to complete training and get hired",
  },
];

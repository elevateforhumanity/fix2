import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

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
      {/* HERO - Large Image with Overlay Text (Princeton Style) */}
      <section className="relative h-[650px] overflow-hidden">
        <Image
          src="/media/programs/cpr-group-training-hd.jpg"
          alt="Students practicing hands-on CPR training in classroom"
          fill
          className="object-cover"
          priority
          quality={100} sizes="100vw"
        />
        
        
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                Free Workforce Training<br />Funded by the State
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 font-light mb-8 leading-relaxed">
                Indianapolis residents can access fully-funded career training through WIOA, Workforce Ready Grants, and apprenticeships. No tuition. Real credentials. Direct job connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors"
                >
                  Apply for Training
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded border-2 border-white hover:bg-white/10 transition-colors"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                src="/media/programs/healthcare-hd.jpg"
                alt="Healthcare training students in clinical setting"
                fill
                className="object-cover" quality={100} sizes="100vw"
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

      {/* THREE COLUMN FEATURES */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="group bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" quality={100} sizes="100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center text-orange-600 font-semibold group-hover:underline">
                    Discover more
                    <ChevronRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4">Training Programs</h2>
            <p className="text-xl text-slate-600 font-light">
              Indusstart-recognized credentials in high-demand fields
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group border border-slate-200 rounded hover:border-orange-600 transition-colors p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  {program.description}
                </p>
                <div className="text-xs text-slate-500">
                  {program.duration} • {program.salary}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              View all programs
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-light mb-2">500+</div>
              <p className="text-slate-300">Students Trained</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">85%</div>
              <p className="text-slate-300">Job Placement Rate</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">20+</div>
              <p className="text-slate-300">Training Programs</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">100+</div>
              <p className="text-slate-300">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS / STORIES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-light text-slate-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600 font-light">
              Real graduates, real careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="border-l-4 border-orange-600 pl-6">
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">
                  {story.program}
                </p>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {story.name}
                </h3>
                <p className="text-slate-600 italic mb-3">
                  "{story.quote}"
                </p>
                <p className="text-sm text-slate-500">
                  {story.outcome}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/success-stories"
              className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Read more success stories
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT FOUNDER */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
                Our Founder
              </p>
              <h2 className="text-4xl font-light text-slate-900 mb-6 leading-tight">
                Elizabeth L. Greene
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Elizabeth L. Greene founded Elevate For Humanity to address the critical gap between available workforce funding and the people who need it most. A self-taught systems architect, she built the entire platform—including a full learning management system—to create pathways from unemployment to sustainable careers.
              </p>
              <Link
                href="/founder"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Read her story
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative h-[400px] rounded overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl font-bold mb-4">ELG</div>
                  <p className="text-xl">Elizabeth L. Greene</p>
                  <p className="text-sm opacity-90">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-light text-slate-900 mb-6">
            Ready to Start Your Training?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Apply now for free workforce training through state-funded programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors"
            >
              Apply Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded border-2 border-slate-300 hover:border-slate-400 transition-colors"
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
const features = [
  {
    title: "Healthcare Careers",
    description: "Train as a Certified Nursing Assistant, Medical Assistant, or Phlebotomist in 4-10 weeks. State certification included. Hospitals and clinics are hiring immediately. Starting pay: $16-$20/hour.",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
  },
  {
    title: "Skilled Trades",
    description: "HVAC technicians, welders, and building maintenance workers earn $20-$30/hour with benefits. Get EPA certification, OSHA training, and hands-on experience. Apprenticeships available.",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
  },
  {
    title: "Licensed Professionals",
    description: "Become a licensed barber, CDL truck driver, or cosmetologist. Own your chair, drive your own routes, or work for established companies. Flexible schedules and entrepreneurship opportunities.",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
  },
];

const programs = [
  {
    title: "Certified Nursing Assistant",
    description: "Healthcare career training",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    link: "/programs/cna",
  },
  {
    title: "HVAC Technician",
    description: "Heating & cooling systems",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    link: "/programs/hvac",
  },
  {
    title: "Licensed Barber",
    description: "Professional barbering",
    duration: "12 weeks",
    salary: "$30K-$55K",
    link: "/programs/barber",
  },
  {
    title: "Commercial Driver",
    description: "CDL certification",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    link: "/programs/cdl",
  },
  {
    title: "Medical Assistant",
    description: "Clinical support role",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    link: "/programs/medical-assistant",
  },
  {
    title: "Building Maintenance",
    description: "Property maintenance",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    link: "/programs/building-maintenance",
  },
  {
    title: "Phlebotomy",
    description: "Blood draw specialist",
    duration: "4-6 weeks",
    salary: "$30K-$38K",
    link: "/programs/phlebotomy",
  },
  {
    title: "Welding",
    description: "Metal fabrication",
    duration: "8-12 weeks",
    salary: "$40K-$55K",
    link: "/programs/welding",
  },
];

const stories = [
  {
    name: "Marcus J.",
    program: "CNA Training",
    quote: "I went from unemployed to working at a hospital in 6 weeks.",
    outcome: "Now earning $18/hr at Community Hospital",
  },
  {
    name: "Tasha W.",
    program: "HVAC Technician",
    quote: "Free training, real skills, and a job waiting when I finished.",
    outcome: "Hired by local HVAC company at $22/hr",
  },
  {
    name: "David R.",
    program: "CDL Training",
    quote: "I got my CDL without paying a dime. Best decision I made.",
    outcome: "Driving for national carrier at $60K/year",
  },
];

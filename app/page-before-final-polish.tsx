import Link from "next/link";
import Image from "next/image";
import RotatingHeroBanner from "@/components/RotatingHeroBanner";
import { CheckCircle, TrendingUp, Award, Users, Briefcase, DollarSign, Clock, Star } from "lucide-react";

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
      {/* ROTATING HERO BANNER */}
      <RotatingHeroBanner />

      {/* TRUSTED BY SECTION */}
      <section className="bg-slate-50 border-y border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold text-slate-600 mb-6">
            TRUSTED WORKFORCE PARTNERS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            <div className="text-center">
              <p className="font-bold text-slate-700">EmployIndy</p>
              <p className="text-xs text-slate-500">Workforce Board</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700">WorkOne</p>
              <p className="text-xs text-slate-500">Career Centers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700">Indiana DWD</p>
              <p className="text-xs text-slate-500">State Agency</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700">US Dept of Labor</p>
              <p className="text-xs text-slate-500">Federal Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3 SIMPLE STEPS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From application to employment in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 h-full border-2 border-orange-200">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Apply & Get Approved
                </h3>
                <p className="text-slate-700 mb-6">
                  Fill out our simple application. We'll check your eligibility for WIOA, WRG, or other funding programs. Most people qualify!
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>5-minute application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Funding check included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>Advisor call within 48 hours</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-full border-2 border-blue-200">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Complete Training
                </h3>
                <p className="text-slate-700 mb-6">
                  Attend classes, pass your exams, earn your credential. We provide everything you need to succeed.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>4-12 week programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Flexible schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Support services included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 h-full border-2 border-green-200">
                <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Get Hired
                </h3>
                <p className="text-slate-700 mb-6">
                  We connect you with 100+ hiring employers. Get interviews, land the job, start your new career.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Job placement support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Resume & interview prep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Employer connections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
            >
              Start Your Application Now
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Most Popular Programs
            </h2>
            <p className="text-xl text-slate-600">
              High-demand careers with great pay and job security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300" quality={100} sizes="100vw"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    100% FREE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{program.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-600" />
                      <span className="text-slate-700">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-slate-700">{program.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-semibold group-hover:underline">
                      Learn More →
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-700">{program.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full hover:bg-slate-50 transition-all border-2 border-slate-300 hover:border-orange-500"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-blue-100">
              Real results for real people
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
              <p className="text-xl text-blue-100">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">85%</div>
              <p className="text-xl text-blue-100">Job Placement Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">100+</div>
              <p className="text-xl text-blue-100">Hiring Partners</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">$45K</div>
              <p className="text-xl text-blue-100">Average Starting Salary</p>
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
                How Is This 100% Free?
              </h2>
              <p className="text-xl text-slate-700 mb-8">
                Government workforce programs like WIOA, WRG, and JRI pay for everything. You qualify if you're:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Unemployed or Underemployed</p>
                    <p className="text-slate-600">Looking for better opportunities</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Marion County Resident</p>
                    <p className="text-slate-600">Or surrounding counties</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Eligible to Work in US</p>
                    <p className="text-slate-600">Legal authorization required</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Committed to Success</p>
                    <p className="text-slate-600">Ready to complete training</p>
                  </div>
                </li>
              </ul>
              <Link
                href="/funding"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-xl"
              >
                Learn About Funding Options
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/students-new/student-13.jpg"
                alt="Students in hands-on training classroom"
                fill
                className="object-cover" quality={100} sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-2xl text-orange-100 mb-8">
            Apply now and start your free training within 2 weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-bold text-white bg-orange-700 rounded-full hover:bg-orange-800 transition-all hover:scale-105 border-2 border-white/20"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const programs = [
  {
    title: "Certified Nursing Assistant (CNA)",
    description: "Provide essential care in hospitals, nursing homes, and home health settings",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
    rating: "4.8",
    image: "/media/programs/cna-hd.jpg",
    link: "/programs/cna",
  },
  {
    title: "HVAC Technician",
    description: "Install, maintain, and repair heating and cooling systems",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    rating: "4.9",
    image: "/media/programs/hvac-hd.jpg",
    link: "/programs/hvac",
  },
  {
    title: "Barber",
    description: "Master cutting techniques and build your own clientele",
    duration: "12 weeks",
    salary: "$30K-$55K",
    rating: "4.7",
    image: "/media/programs/barber-hd.jpg",
    link: "/programs/barber",
  },
  {
    title: "Commercial Driver's License (CDL)",
    description: "Drive trucks and earn great pay with benefits",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    rating: "4.8",
    image: "/media/programs/cdl-hd.jpg",
    link: "/programs/cdl",
  },
  {
    title: "Medical Assistant",
    description: "Support doctors and nurses in clinical settings",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
    rating: "4.6",
    image: "/media/programs/medical-assistant-hd.jpg",
    link: "/programs/medical-assistant",
  },
  {
    title: "Building Maintenance Tech",
    description: "Maintain and repair commercial and residential properties",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
    rating: "4.7",
    image: "/media/programs/building-tech-hd.jpg",
    link: "/programs/building-maintenance",
  },
];

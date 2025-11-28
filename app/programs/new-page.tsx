import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign, Award, TrendingUp, CheckCircle, Users } from "lucide-react";

export const metadata = {
  title: 'Career Training Programs | Elevate for Humanity',
  description: '20+ free career training programs in healthcare, skilled trades, technology, and more. 100% funded through WIOA, WRG, and workforce grants.',
};

const programs = [
  {
    id: "cna",
    title: "Certified Nursing Assistant (CNA)",
    slug: "cna",
    category: "Healthcare",
    image: "/images/programs/cna-training.jpg",
    duration: "4-6 weeks",
    schedule: "Hybrid (Online + In-Person)",
    salary: "$35,000 - $45,000/year",
    description: "Become a certified nursing assistant and start your healthcare career. Hands-on training in patient care, vital signs, medical terminology, and clinical skills.",
    whatYouLearn: [
      "Patient care and safety procedures",
      "Vital signs monitoring",
      "Medical terminology and documentation",
      "Clinical skills and hands-on practice",
      "State CNA certification exam prep"
    ],
    funding: ["WIOA", "Workforce Ready Grant", "OJT"],
    jobTitles: ["CNA", "Patient Care Tech", "Home Health Aide"],
    employerPartners: "Hospitals, nursing homes, home health agencies",
    featured: true
  },
  {
    id: "hvac",
    title: "HVAC Technician",
    slug: "hvac-tech",
    category: "Skilled Trades",
    image: "/images/programs/hvac-training.jpg",
    duration: "8-12 weeks",
    schedule: "Hybrid (Online + Hands-On)",
    salary: "$45,000 - $65,000/year",
    description: "Learn to install, maintain, and repair heating, ventilation, and air conditioning systems. OSHA safety certified. High demand career with excellent pay.",
    whatYouLearn: [
      "HVAC system installation and repair",
      "Electrical and refrigeration basics",
      "OSHA safety certification",
      "Troubleshooting and diagnostics",
      "Customer service and job site professionalism"
    ],
    funding: ["WIOA", "Workforce Ready Grant", "Apprenticeship"],
    jobTitles: ["HVAC Technician", "HVAC Helper", "Service Technician"],
    employerPartners: "HVAC companies, property management, facilities",
    featured: true
  },
  {
    id: "barber",
    title: "Barber Apprenticeship",
    slug: "barber-apprenticeship",
    category: "Beauty & Wellness",
    image: "/images/programs/barber-training.jpg",
    duration: "12-18 months",
    schedule: "Earn While You Learn",
    salary: "$30,000 - $55,000/year + tips",
    description: "FREE apprenticeship program. Work in a real barbershop, earn $15-20/hour while building your 1,500 hours toward Indiana barber license. Milady theory included.",
    whatYouLearn: [
      "Hair cutting and styling techniques",
      "Shaving and beard grooming",
      "Sanitation and safety procedures",
      "Client consultation and customer service",
      "Shop management and business skills"
    ],
    funding: ["DOL Apprenticeship (PAID)", "Earn $15-20/hr while training"],
    jobTitles: ["Licensed Barber", "Master Barber", "Shop Owner"],
    employerPartners: "Barbershops across Indianapolis",
    featured: true
  },
  {
    id: "cdl",
    title: "CDL / Commercial Driver",
    slug: "cdl",
    category: "Transportation",
    image: "/images/programs/cdl-training.jpg",
    duration: "4-6 weeks",
    schedule: "Full-Time",
    salary: "$45,000 - $70,000/year",
    description: "Get your Commercial Driver's License (CDL) and start a high-paying trucking career. DOT compliance training, safety certification, and job placement included.",
    whatYouLearn: [
      "CDL Class A or B training",
      "DOT regulations and compliance",
      "Vehicle inspection and safety",
      "Defensive driving techniques",
      "Trip planning and logistics"
    ],
    funding: ["WIOA", "Workforce Ready Grant", "OJT"],
    jobTitles: ["Truck Driver", "Delivery Driver", "Transportation Specialist"],
    employerPartners: "Trucking companies, logistics firms, delivery services",
    featured: true
  },
  {
    id: "medical-assistant",
    title: "Medical Assistant",
    slug: "medical-assistant",
    category: "Healthcare",
    image: "/images/programs/medical-assistant.jpg",
    duration: "8-10 weeks",
    schedule: "Hybrid",
    salary: "$35,000 - $48,000/year",
    description: "Work in doctor's offices, clinics, and medical facilities. Learn both clinical and administrative skills for a versatile healthcare career.",
    whatYouLearn: [
      "Clinical procedures and patient care",
      "Medical office administration",
      "EKG and phlebotomy basics",
      "Medical billing and coding intro",
      "Electronic health records (EHR)"
    ],
    funding: ["WIOA", "Workforce Ready Grant"],
    jobTitles: ["Medical Assistant", "Clinical Assistant", "Medical Office Specialist"],
    employerPartners: "Clinics, doctor's offices, urgent care centers",
    featured: false
  },
  {
    id: "building-tech",
    title: "Building Technician",
    slug: "building-tech",
    category: "Skilled Trades",
    image: "/images/programs/building-tech.jpg",
    duration: "8-12 weeks",
    schedule: "Hybrid",
    salary: "$40,000 - $60,000/year",
    description: "Maintain and repair building systems including HVAC, plumbing, electrical, and facilities. Perfect for property management and facilities careers.",
    whatYouLearn: [
      "Building systems maintenance",
      "Basic electrical and plumbing",
      "HVAC troubleshooting",
      "Safety and OSHA compliance",
      "Preventive maintenance procedures"
    ],
    funding: ["WIOA", "Workforce Ready Grant", "Apprenticeship"],
    jobTitles: ["Building Technician", "Facilities Maintenance", "Property Maintenance"],
    employerPartners: "Property management companies, facilities services",
    featured: false
  },
  {
    id: "customer-service",
    title: "Customer Service / Call Center",
    slug: "customer-service",
    category: "Business & Technology",
    image: "/images/programs/customer-service.jpg",
    duration: "4-6 weeks",
    schedule: "Hybrid",
    salary: "$30,000 - $42,000/year",
    description: "Start your career in customer service, call centers, or office support. Learn communication skills, CRM systems, and professional workplace skills.",
    whatYouLearn: [
      "Customer service excellence",
      "Phone and email communication",
      "CRM software and data entry",
      "Conflict resolution",
      "Professional workplace skills (JRI)"
    ],
    funding: ["WIOA", "WEX (Paid Work Experience)"],
    jobTitles: ["Customer Service Rep", "Call Center Agent", "Office Support"],
    employerPartners: "Call centers, retail, hospitality, offices",
    featured: false
  },
  {
    id: "it-support",
    title: "IT Support / Help Desk",
    slug: "it-support",
    category: "Business & Technology",
    image: "/images/programs/it-support.jpg",
    duration: "8-10 weeks",
    schedule: "Hybrid",
    salary: "$38,000 - $55,000/year",
    description: "Start your IT career with help desk and technical support training. Learn troubleshooting, customer service, and IT fundamentals.",
    whatYouLearn: [
      "Computer hardware and software basics",
      "Windows and network troubleshooting",
      "Help desk ticketing systems",
      "Customer service for IT",
      "CompTIA A+ exam prep"
    ],
    funding: ["WIOA", "Workforce Ready Grant"],
    jobTitles: ["IT Support Specialist", "Help Desk Technician", "Desktop Support"],
    employerPartners: "IT companies, corporate offices, managed services",
    featured: false
  }
];

export default async function ProgramsPage() {
  const featuredPrograms = programs.filter(p => p.featured);
  const allPrograms = programs;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-600 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              💯 ALL PROGRAMS 100% FREE
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Career Path
            </h1>
            <p className="text-2xl text-orange-100 mb-8">
              8 high-demand careers. 4-18 week programs. $0 tuition. Real certifications. Job placement included.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">$30K-$70K</p>
                <p className="text-sm text-orange-100">Starting Salary Range</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">4-18 Weeks</p>
                <p className="text-sm text-orange-100">Training Duration</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-orange-100">Out of Pocket</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">100+</p>
                <p className="text-sm text-orange-100">Employer Partners</p>
              </div>
            </div>

            <Link
              href="/apply"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-xl"
            >
              🚀 Apply Now - Start in 2 Weeks
            </Link>
          </div>
        </div>
      </section>

      {/* Funding Bar */}
      <section className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-bold text-lg">WIOA</p>
              <p className="text-xs text-blue-200">Federal workforce funding</p>
            </div>
            <div>
              <p className="font-bold text-lg">Workforce Ready Grant</p>
              <p className="text-xs text-blue-200">Indiana state program</p>
            </div>
            <div>
              <p className="font-bold text-lg">OJT</p>
              <p className="text-xs text-blue-200">Get paid while training</p>
            </div>
            <div>
              <p className="font-bold text-lg">Apprenticeships</p>
              <p className="text-xs text-blue-200">Earn full wages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 text-center">
            🔥 Most Popular Programs
          </h2>
          <p className="text-xl text-slate-600 mb-12 text-center max-w-3xl mx-auto">
            These programs have the highest job placement rates and fastest time to employment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02]">
                <div className="relative h-64 bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                    <p className="text-6xl">
                      {program.category === "Healthcare" && "🏥"}
                      {program.category === "Skilled Trades" && "🔧"}
                      {program.category === "Beauty & Wellness" && "✂️"}
                      {program.category === "Transportation" && "🚛"}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    100% FREE
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      {program.category}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {program.title}
                  </h3>

                  <p className="text-slate-600 mb-4">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="text-sm font-semibold text-slate-900">{program.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-slate-500">Salary</p>
                        <p className="text-sm font-semibold text-slate-900">{program.salary.split('/')[0]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-bold text-slate-900 mb-2">What You'll Learn:</p>
                    <ul className="space-y-1">
                      {program.whatYouLearn.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-bold text-slate-900 mb-2">Funding Options:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.funding.map((fund, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                          {fund}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/programs/${program.slug}`}
                    className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 text-center">
            All Training Programs
          </h2>
          <p className="text-xl text-slate-600 mb-12 text-center">
            Every program is 100% FREE through government workforce funding
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border border-slate-200">
                <div className="relative h-48 bg-slate-100 flex items-center justify-center">
                  <p className="text-5xl">
                    {program.category === "Healthcare" && "🏥"}
                    {program.category === "Skilled Trades" && "🔧"}
                    {program.category === "Beauty & Wellness" && "✂️"}
                    {program.category === "Transportation" && "🚛"}
                    {program.category === "Business & Technology" && "💼"}
                  </p>
                </div>

                <div className="p-5">
                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    {program.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2">
                    {program.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {program.salary.split('-')[0].trim()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  <Link
                    href={`/programs/${program.slug}`}
                    className="block w-full text-center bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Career?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply now and we'll determine which funding programs you qualify for. Most applicants hear back within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/what-we-do"
              className="bg-orange-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-900 transition-all"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

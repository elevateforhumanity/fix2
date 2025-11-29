import Link from "next/link";
import { Download, Mail, Phone, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Press Kit & Media | Elevate For Humanity",
  description: "Media resources, press releases, founder bio, and contact information for journalists and media professionals.",
};

export default function PressKitPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Press Kit & Media
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl">
            Resources for journalists, media professionals, and partners covering Elevate For Humanity.
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Quick Facts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <div className="text-4xl font-bold text-orange-500 mb-2">{fact.stat}</div>
                <p className="text-slate-700 font-semibold">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Elevate For Humanity */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">About Elevate For Humanity</h2>
              <div className="space-y-4 text-lg text-slate-700">
                <p>
                  <strong>Elevate For Humanity</strong> is a workforce development platform that connects Indiana residents to 100% free career training through state and federal funding programs including WIOA, Workforce Ready Grants, apprenticeships, and more.
                </p>
                <p>
                  Founded by <strong>Elizabeth L. Greene</strong>, Elevate For Humanity addresses the critical gap between available workforce funding and the people who need it most. The platform provides training in high-demand fields including healthcare (CNA, Medical Assistant, Phlebotomy), skilled trades (HVAC, Welding, Building Maintenance), transportation (CDL), and personal services (Barber, Cosmetology).
                </p>
                <p>
                  What sets Elevate For Humanity apart is its comprehensive approach: not just training, but also funding navigation, support services (transportation, childcare assistance), job placement connections with 100+ employers, and a full learning management system (LMS) for online and hybrid learning.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Mission & Vision</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Mission</h3>
                  <p className="text-slate-700">
                    To eliminate barriers to career training and employment by connecting underserved communities to free, state-funded workforce programs and providing comprehensive support from enrollment through job placement.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-900 mb-3">Vision</h3>
                  <p className="text-slate-700">
                    To become the national model for workforce development, proving that when you remove financial barriers and provide real support, people don't just get jobs—they build careers and transform communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Bio */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Founder Bio</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white mb-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">ELG</div>
                    <p className="text-sm">Photo Available</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">Elizabeth L. Greene</h3>
                  <p className="text-slate-600">Founder & CEO</p>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-4 text-slate-700">
                <p className="text-lg font-semibold text-slate-900">
                  Short Bio (100 words)
                </p>
                <p>
                  Elizabeth L. Greene is the Founder and CEO of Elevate For Humanity™, a mission-driven workforce organization dedicated to expanding access to quality training, career advancement, and employer-connected opportunities. Elizabeth leads with a blend of professional discipline and genuine care for the people and communities Elevate For Humanity serves. Her approach combines workforce policy expertise, technology innovation, and human-centered design to create clear pathways from unemployment to sustainable careers. Elizabeth's work focuses on removing barriers to opportunity for underserved communities while maintaining strong partnerships with workforce boards, training providers, and employers.
                </p>

                <p className="text-lg font-semibold text-slate-900 pt-4">
                  Extended Bio (250 words)
                </p>
                <p>
                  Elizabeth L. Greene is the Founder and Chief Executive Officer of Elevate For Humanity™, a workforce development platform connecting Indiana residents to free career training through state and federal funding programs including WIOA, Workforce Ready Grants, and apprenticeships.
                </p>
                <p>
                  Under Elizabeth's leadership, Elevate For Humanity has developed a comprehensive ecosystem that includes a learning management system, student and admin dashboards, funding navigation tools, and employer connection systems. She brings expertise in workforce policy, technology innovation, and community partnerships to create accessible pathways for individuals seeking career advancement.
                </p>
                <p>
                  Elizabeth's leadership style prioritizes access for every type of learner, clear supportive pathways to better careers, strong communication with partners and employers, high-quality training experiences, and professional dependable systems that build trust. Her work is grounded in respect, integrity, and the belief that opportunity should be understandable and reachable for everyone.
                </p>
                <p>
                  Today, Elevate For Humanity serves students across 20+ training programs in high-demand fields including healthcare, skilled trades, transportation, and personal services. The organization maintains partnerships with 100+ employers and has achieved an 85% job placement rate. Elizabeth's vision extends beyond Indianapolis—she's building a model that can be replicated nationally, demonstrating that when financial barriers are removed and real support is provided, individuals don't just get jobs—they build careers and transform communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Training Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{program.name}</h3>
                <p className="text-slate-600 mb-3">{program.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-semibold">{program.duration}</span>
                  <span className="text-green-600 font-semibold">{program.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Logo Downloads</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="font-semibold text-slate-700">Logo - Full Color (PNG)</span>
                  <Download size={20} className="text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="font-semibold text-slate-700">Logo - White (PNG)</span>
                  <Download size={20} className="text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="font-semibold text-slate-700">Logo - Black (PNG)</span>
                  <Download size={20} className="text-slate-600" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Brand Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Primary Orange</p>
                    <p className="text-sm text-slate-600">#F97316</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Primary Blue</p>
                    <p className="text-sm text-slate-600">#2563EB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-900"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Dark Slate</p>
                    <p className="text-sm text-slate-600">#0F172A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Media Contact</h2>
          <p className="text-xl text-orange-100 mb-8">
            For press inquiries, interviews, or additional information
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Mail size={24} />
                <a href="mailto:press@elevateforhumanity.org" className="text-xl font-semibold hover:text-orange-200 transition-colors">
                  press@elevateforhumanity.org
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={24} />
                <a href="tel:3171234567" className="text-xl font-semibold hover:text-orange-200 transition-colors">
                  (317) 123-4567
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-orange-100 mb-4">Connect with us:</p>
              <div className="flex justify-center gap-4">
                <Link href="/founder" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                  Founder Story
                  <ExternalLink size={18} />
                </Link>
                <Link href="/success-stories" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30">
                  Success Stories
                  <ExternalLink size={18} />
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
const quickFacts = [
  { stat: "500+", label: "Students Trained" },
  { stat: "20+", label: "Training Programs" },
  { stat: "85%", label: "Job Placement Rate" },
  { stat: "$45K", label: "Avg Starting Salary" },
];

const keyPrograms = [
  {
    name: "Certified Nursing Assistant (CNA)",
    description: "Healthcare career training with state certification",
    duration: "4-6 weeks",
    salary: "$35K-$45K",
  },
  {
    name: "HVAC Technician",
    description: "Heating and cooling systems installation and repair",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
  },
  {
    name: "Commercial Driver's License (CDL)",
    description: "Professional truck driving certification",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
  },
  {
    name: "Barber Training",
    description: "Licensed barber with state certification",
    duration: "12 weeks",
    salary: "$30K-$55K",
  },
  {
    name: "Medical Assistant",
    description: "Clinical support in healthcare settings",
    duration: "8-10 weeks",
    salary: "$32K-$42K",
  },
  {
    name: "Building Maintenance",
    description: "Property maintenance and repair technician",
    duration: "6-8 weeks",
    salary: "$38K-$52K",
  },
];

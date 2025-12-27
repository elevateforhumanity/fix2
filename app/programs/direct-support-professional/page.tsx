import { OptimizedVideo } from '@/components/OptimizedVideo';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Direct Support Professional | Elevate for Humanity',
  description: '100% Free DSP training program',
  keywords: ['Direct Support Professional Indianapolis', 'free Direct Support Professional training', 'WIOA Direct Support Professional', 'Direct Support Professional apprenticeship'],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/direct-support-professional',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/cna-hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Direct Support Professional (DSP)
          </h1>
          <p className="text-xl mb-8">
            100% Free DSP training - Help individuals with disabilities live fulfilling lives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold rounded-lg transition-all text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-slate-900 font-bold rounded-lg transition-all text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Overview</h2>
            <p className="text-lg text-slate-600 mb-4">
              Direct Support Professionals provide essential care and support to individuals with intellectual and developmental disabilities. This rewarding career helps people live independently and participate fully in their communities.
            </p>
            <p className="text-lg text-slate-600 mb-4">
              Our free training program prepares you for immediate employment in residential facilities, day programs, and community settings.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Quick Facts</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Duration:</span>
                <span className="text-slate-700">4-6 weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Cost:</span>
                <span className="text-slate-700">$0 with WIOA/WRG funding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Format:</span>
                <span className="text-slate-700">Hybrid (online + in-person)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Starting Pay:</span>
                <span className="text-slate-700">$14-$18/hour</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Job Placement:</span>
                <span className="text-slate-700">Included</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Person-Centered Care</h3>
              <p className="text-slate-600">Supporting individual goals, preferences, and independence</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Health & Safety</h3>
              <p className="text-slate-600">Medication administration, first aid, emergency procedures</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Communication</h3>
              <p className="text-slate-600">Effective communication strategies and documentation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rights & Ethics</h3>
              <p className="text-slate-600">Protecting rights, dignity, and confidentiality</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Behavioral Support</h3>
              <p className="text-slate-600">Positive behavior strategies and crisis intervention</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Community Integration</h3>
              <p className="text-slate-600">Supporting community participation and social connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outlook */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Career Outlook</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-slate-600 mb-4">
            The demand for Direct Support Professionals is growing rapidly as more individuals with disabilities choose community-based living. This is a stable, rewarding career with opportunities for advancement.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Career Paths</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Residential Support Specialist</li>
                <li>• Day Program Coordinator</li>
                <li>• Job Coach</li>
                <li>• Team Lead/Supervisor</li>
                <li>• Program Manager</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Work Settings</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Group Homes</li>
                <li>• Day Programs</li>
                <li>• Community Living</li>
                <li>• Vocational Programs</li>
                <li>• Respite Care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your DSP Career?</h2>
          <p className="text-xl mb-8">Apply today and begin training in weeks, not months.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-lg transition-all text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-all text-center border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

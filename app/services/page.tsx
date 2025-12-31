import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, Briefcase, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Elevate for Humanity',
  description: 'Tax services, career counseling, job placement, and more. Supporting your success every step of the way.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/images/artlist/hero-training-6.jpg"
          alt="Our Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/60"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white uppercase tracking-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Supporting your success with tax services, career counseling, and job placement
            </p>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto gap-1 py-2">
            <a href="#tax-services" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Tax Services
            </a>
            <a href="#career-counseling" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Career Counseling
            </a>
            <a href="#job-placement" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Job Placement
            </a>
            <a href="#vita" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              VITA Tax Prep
            </a>
          </nav>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" id="tax-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tax Services */}
            <Link href="/supersonic-fast-cash" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-500">
                <div className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Tax Services</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Professional tax preparation, refund advances, and IRS representation through Supersonic Fast Cash. Licensed Enrolled Agent services.
                  </p>
                  <div className="text-orange-600 font-bold group-hover:gap-3 transition-all">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Career Services */}
            <Link href="/career-services" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-green-500">
                <div className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Counseling</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    One-on-one career counseling, resume building, interview preparation, and ongoing support to help you succeed.
                  </p>
                  <div className="text-green-600 font-bold group-hover:gap-3 transition-all">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            {/* Job Placement */}
            <Link href="/employers" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-500">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Placement</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Direct connections with employers hiring our graduates. 85% of students are employed within 6 months of graduation.
                </p>
                <div className="text-blue-600 font-bold group-hover:gap-3 transition-all">
                  Learn More →
                </div>
              </div>
            </Link>

            {/* VITA Tax Prep */}
            <Link href="/vita" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-purple-500">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">VITA Tax Preparation</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Free IRS-certified tax preparation for qualifying individuals. Volunteer Income Tax Assistance program.
                </p>
                <div className="text-purple-600 font-bold group-hover:gap-3 transition-all">
                  Learn More →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help? We're Here For You
          </h2>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

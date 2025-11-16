import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Users, Award, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold text-slate-900">
                Elevate Connects Directory
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/programs"
                className="text-slate-700 hover:text-slate-900 font-medium"
              >
                Programs
              </Link>
              <Link
                href="/about"
                className="text-slate-700 hover:text-slate-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/login"
                className="text-slate-700 hover:text-slate-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/apply"
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6">
                  WIOA-Funded Training Programs
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Career Training at No Cost to You
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Access state-approved workforce training programs, registered
                  apprenticeships, and career pathways funded through WIOA and
                  Indiana DWD partnerships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/apply"
                    className="px-8 py-3.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center"
                  >
                    Check Eligibility
                  </Link>
                  <Link
                    href="/programs"
                    className="px-8 py-3.5 bg-white text-slate-700 border border-slate-300 font-semibold hover:bg-slate-50 transition text-center"
                  >
                    View Programs
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>100% Funded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>State Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Job Placement Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/media/homepage-hero.jpg"
                  alt="Students in training"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 md:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600">
                Three steps to access funded training
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8">
                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Explore Programs
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Browse state-approved training programs in healthcare, skilled
                  trades, and technology sectors.
                </p>
              </div>
              <div className="bg-white p-8">
                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Verify Eligibility
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Complete eligibility screening to determine qualification for
                  WIOA-funded training.
                </p>
              </div>
              <div className="bg-white p-8">
                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Begin Training
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Enroll in your selected program with full tuition coverage and
                  support services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Training Programs
              </h2>
              <p className="text-lg text-slate-600">
                State-approved programs in high-demand industries
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Barber */}
              <Link href="/programs/barber" className="group">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-red-600 transition">
                  <div className="relative h-48">
                    <Image
                      src="/media/program-barber.jpg"
                      alt="Barber Apprenticeship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                      Barber Apprenticeship
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Earn while you learn with a DOL-registered apprenticeship
                      program.
                    </p>
                    <span className="text-red-600 font-semibold text-sm">
                      View Program →
                    </span>
                  </div>
                </div>
              </Link>

              {/* HVAC */}
              <Link href="/programs/hvac" className="group">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-red-600 transition">
                  <div className="relative h-48">
                    <Image
                      src="/media/program-hvac.jpg"
                      alt="HVAC Technician"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                      HVAC Technician
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Train as an HVAC tech and step into a high-demand trade
                      career.
                    </p>
                    <span className="text-red-600 font-semibold text-sm">
                      View Program →
                    </span>
                  </div>
                </div>
              </Link>

              {/* CDL */}
              <Link href="/programs/truck-driving" className="group">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-red-600 transition">
                  <div className="relative h-48">
                    <Image
                      src="/media/program-cdl.jpg"
                      alt="CDL Truck Driving"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                      CDL Truck Driving
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Get your commercial driver's license and start earning
                      immediately.
                    </p>
                    <span className="text-red-600 font-semibold text-sm">
                      View Program →
                    </span>
                  </div>
                </div>
              </Link>

              {/* CNA */}
              <Link href="/programs/cna" className="group">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-red-600 transition">
                  <div className="relative h-48">
                    <Image
                      src="/media/program-cna.jpg"
                      alt="CNA Healthcare"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                      CNA Healthcare
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Start your healthcare career with certified nursing
                      assistant training.
                    </p>
                    <span className="text-red-600 font-semibold text-sm">
                      View Program →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/programs"
                className="inline-block px-8 py-3 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-bold hover:border-slate-400 transition"
              >
                View All Programs
              </Link>
            </div>
          </div>
        </section>

        {/* Why Elevate for Humanity */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Why Elevate for Humanity
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Award className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        State-Approved Programs
                      </h3>
                      <p className="text-slate-600">
                        All training programs are approved by Indiana DWD and
                        meet WIOA eligibility requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Registered Apprenticeship Sponsor
                      </h3>
                      <p className="text-slate-600">
                        We sponsor DOL-registered apprenticeships that combine
                        on-the-job training with classroom instruction.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Digital Credentials & Case Management
                      </h3>
                      <p className="text-slate-600">
                        Track your progress, earn digital badges, and get
                        personalized support throughout your training journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/media/efh-about.jpg"
                  alt="Elevate for Humanity"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 md:px-8 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of Indiana residents who have advanced their
              careers through WIOA-funded training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition"
              >
                Check Your Eligibility
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-100 transition"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">
                Elevate for Humanity
              </h3>
              <p className="text-sm">
                Connecting Indiana residents with free workforce training and
                career opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/programs" className="hover:text-white">
                    All Programs
                  </Link>
                </li>
                <li>
                  <Link href="/programs/barber" className="hover:text-white">
                    Barber
                  </Link>
                </li>
                <li>
                  <Link href="/programs/hvac" className="hover:text-white">
                    HVAC
                  </Link>
                </li>
                <li>
                  <Link href="/programs/cna" className="hover:text-white">
                    Healthcare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; 2025 Elevate for Humanity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

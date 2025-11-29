import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, DollarSign, Award, CheckCircle, 
  Wrench, Zap, ThermometerSun
} from 'lucide-react';

export const metadata: Metadata = {
  title: "HVAC Technician Training | Elevate for Humanity",
  description: "Become an HVAC technician in 10-12 weeks. Learn heating, cooling, and refrigeration systems. EPA 608 certification included. $22-$28/hour starting pay.",
  openGraph: {
    title: "HVAC Technician Training | Elevate for Humanity",
    description: "10-12 week HVAC training program. EPA certification. Job placement support.",
    images: ["/media/programs/hvac-hd.jpg"],
    type: "website",
  },
};

export default function HVACPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Wrench className="text-white" size={20} />
                <span className="text-sm font-semibold">Skilled Trade</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                HVAC Technician Training
              </h1>
              <p className="text-xl text-blue-50 mb-8">
                Learn to install, maintain, and repair heating and cooling systems in 10-12 weeks. 
                Earn EPA 608 certification. Start at $22-$28/hour with benefits and year-round work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
                >
                  Apply Now - FREE Training
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/media/programs/hvac-hd.jpg"
                alt="HVAC Technician Training"
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10-12 Weeks</div>
              <div className="text-sm text-slate-600">Program Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">EPA 608</div>
              <div className="text-sm text-slate-600">Certification Included</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$22-$28/hr</div>
              <div className="text-sm text-slate-600">Starting Pay</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Year-Round</div>
              <div className="text-sm text-slate-600">Job Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ThermometerSun size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Heating Systems</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Gas furnaces and heat pumps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Thermostats and controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Troubleshooting and repair</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Zap size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Cooling & Refrigeration</h3>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Air conditioning systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Refrigerant handling (EPA 608)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>System installation and maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outlook */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Career Outlook</h2>
              <p className="text-lg text-slate-600 mb-6">
                HVAC technicians are in high demand year-round. Every home, business, and building needs heating and cooling. 
                This is stable, well-paying work that can't be outsourced.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award size={24} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Starting Pay: $22-$28/hour</p>
                    <p className="text-sm text-slate-600">$45,000-$58,000 per year with benefits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Experienced Pay: $30-$40/hour</p>
                    <p className="text-sm text-slate-600">$62,000-$83,000 per year after 2-3 years</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={24} className="text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Year-Round Work</p>
                    <p className="text-sm text-slate-600">Heating in winter, cooling in summer - always busy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Where You'll Work</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>HVAC companies (residential & commercial)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Property management companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Hospitals and healthcare facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Schools and universities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Manufacturing facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Start your own HVAC business</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your HVAC Career?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply now for free training through WIOA or Workforce Ready Grant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/funding"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition border-2 border-white/20"
            >
              Check Funding Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users, Award, TrendingUp, ArrowRight, Building2, GraduationCap, Briefcase } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Government-Funded Workforce Training",
  description: "Official WIOA-approved training provider. Free career training programs funded by federal and state workforce development initiatives.",
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Professional Hero Banner - Full Width Image */}
      <section className="relative h-[500px] bg-slate-900">
        <Image
          src="/media/hero-elevate-learners.jpg"
          alt="Workforce Training Excellence"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded px-4 py-2 mb-6 text-sm font-semibold border border-white/30">
              Official WIOA Training Provider | ETPL Approved
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Elevate for Humanity
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-4 font-light">
              Government-Funded Workforce Development
            </p>
            <p className="text-xl text-blue-50 mb-8">
              Providing no-cost career training, industry certifications, and job placement services to Indianapolis residents through federal and state workforce initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded font-bold text-lg hover:bg-blue-50 transition shadow-lg"
              >
                Check Eligibility
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded font-bold text-lg hover:bg-white/10 transition border-2 border-white"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partners */}
      <section className="bg-slate-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600 mb-4 font-semibold">OFFICIAL PARTNERS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-700">
            <div className="text-center">
              <p className="font-bold">EmployIndy</p>
              <p className="text-xs">Workforce Board</p>
            </div>
            <div className="text-center">
              <p className="font-bold">WorkOne</p>
              <p className="text-xs">Career Centers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Indiana DWD</p>
              <p className="text-xs">Dept. of Workforce Development</p>
            </div>
            <div className="text-center">
              <p className="font-bold">U.S. DOL</p>
              <p className="text-xs">Department of Labor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-slate-600">Graduates Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">85%</div>
              <div className="text-slate-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">$45K</div>
              <div className="text-slate-600">Average Starting Salary</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-slate-600">Free Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview with Images */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Career Training Programs</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry-recognized certifications in high-demand fields
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-48">
                <Image
                  src="/media/programs/medical-assistant-hd.jpg"
                  alt="Healthcare Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Healthcare</h3>
                <p className="text-slate-600 mb-4">CNA, Medical Assistant, Patient Care Technician</p>
                <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                  View Programs →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-48">
                <Image
                  src="/media/programs/hvac-hd.jpg"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Skilled Trades</h3>
                <p className="text-slate-600 mb-4">HVAC, Building Maintenance, CDL</p>
                <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                  View Programs →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <div className="relative h-48">
                <Image
                  src="/media/programs/business-hd.jpg"
                  alt="Business Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Business & Services</h3>
                <p className="text-slate-600 mb-4">Tax Preparation, Customer Service, Office Professional</p>
                <Link href="/programs" className="text-blue-600 font-semibold hover:text-blue-700">
                  View Programs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Get Started</h2>
            <p className="text-xl text-slate-600">Simple process to begin your career training</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-slate-900 mb-2">Apply Online</h3>
              <p className="text-slate-600 text-sm">Complete our simple application form</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-slate-900 mb-2">Meet with WorkOne</h3>
              <p className="text-slate-600 text-sm">Verify eligibility and funding approval</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-slate-900 mb-2">Start Training</h3>
              <p className="text-slate-600 text-sm">Begin your program with all costs covered</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-bold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600 text-sm">Job placement assistance included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Information */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Government-Funded Training</h2>
              <p className="text-lg text-slate-700 mb-6">
                Our programs are funded through federal WIOA (Workforce Innovation and Opportunity Act) and Indiana state workforce development initiatives.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">No tuition or fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Books and supplies provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Transportation assistance available</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Childcare support for eligible participants</span>
                </li>
              </ul>
              <Link href="/funding" className="inline-block mt-6 text-blue-600 font-semibold hover:text-blue-700">
                Learn More About Funding →
              </Link>
            </div>
            <div className="relative h-80">
              <Image
                src="/media/hero-slide-healthcare.jpg"
                alt="Training facility"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Check your eligibility for free workforce training today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded font-bold text-lg hover:bg-blue-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-4 rounded font-bold text-lg hover:bg-blue-700 transition border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

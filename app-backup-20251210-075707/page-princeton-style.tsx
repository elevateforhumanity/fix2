import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, GraduationCap, Users, Briefcase, Building2 } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | WIOA-Approved Workforce Training",
  description: "Government-funded career training programs in Indianapolis. WIOA-approved provider offering free training in healthcare, skilled trades, and business services.",
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero - Large Image with Overlay Text (Princeton Style) */}
      <section className="relative h-[600px] bg-slate-900">
        <Image
          src="/media/hero-elevate-learners.jpg"
          alt="Workforce Development Training"
          fill
          className="object-cover"
          priority quality={100} sizes="100vw"
        />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Elevate for Humanity
            </h1>
            <p className="text-2xl md:text-3xl font-light text-slate-200 mb-8">
              Government-Funded Workforce Development
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              WIOA-approved training provider offering no-cost career programs in healthcare, skilled trades, and business services to Indianapolis residents.
            </p>
            <div className="flex gap-4">
              <Link
                href="/apply"
                className="bg-white text-slate-900 px-8 py-3 rounded font-semibold hover:bg-slate-100 transition"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-transparent text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition border border-white"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partners Bar */}
      <section className="bg-slate-50 py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-wide text-slate-500 mb-4 font-semibold">Official Training Partner</p>
          <div className="flex flex-wrap justify-center items-center gap-12 text-slate-700">
            <div className="text-center">
              <p className="font-semibold text-sm">EmployIndy</p>
              <p className="text-xs text-slate-500">Workforce Board</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">WorkOne Indianapolis</p>
              <p className="text-xs text-slate-500">Career Centers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">Indiana DWD</p>
              <p className="text-xs text-slate-500">Workforce Development</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">U.S. Department of Labor</p>
              <p className="text-xs text-slate-500">WIOA Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content with Image (Princeton Style) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <Image
                src="/media/hero-slide-healthcare.jpg"
                alt="Healthcare Training Program"
                fill
                className="object-cover rounded" quality={100} sizes="100vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                Free Career Training Through WIOA
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The Workforce Innovation and Opportunity Act (WIOA) provides funding for eligible Indianapolis residents to receive career training at no cost. Our programs include tuition, books, supplies, and support services.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">No tuition or fees for eligible participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Indusstart-recognized certifications included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Job placement assistance provided</span>
                </li>
              </ul>
              <Link href="/funding" className="text-slate-900 font-semibold hover:text-slate-600 inline-flex items-center gap-2">
                Learn about funding options <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid with Images */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-4">Career Training Programs</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Indusstart-aligned programs designed to meet employer needs in high-demand sectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Healthcare */}
            <div className="bg-white rounded overflow-hidden border border-slate-200">
              <div className="relative h-56">
                <Image
                  src="/media/programs/medical-assistant-hd.jpg"
                  alt="Healthcare Training"
                  fill
                  className="object-cover" quality={100} sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Healthcare</h3>
                <p className="text-slate-600 mb-4">
                  Certified Nursing Assistant, Medical Assistant, Patient Care Technician
                </p>
                <Link href="/programs" className="text-slate-900 font-semibold hover:text-slate-600 inline-flex items-center gap-2">
                  Explore programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Skilled Trades */}
            <div className="bg-white rounded overflow-hidden border border-slate-200">
              <div className="relative h-56">
                <Image
                  src="/media/programs/hvac-hd.jpg"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover" quality={100} sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Skilled Trades</h3>
                <p className="text-slate-600 mb-4">
                  HVAC Technician, Building Maintenance, Commercial Driver's License
                </p>
                <Link href="/programs" className="text-slate-900 font-semibold hover:text-slate-600 inline-flex items-center gap-2">
                  Explore programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Business Services */}
            <div className="bg-white rounded overflow-hidden border border-slate-200">
              <div className="relative h-56">
                <Image
                  src="/media/programs/business-hd.jpg"
                  alt="Business Services Training"
                  fill
                  className="object-cover" quality={100} sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Business Services</h3>
                <p className="text-slate-600 mb-4">
                  Tax Preparation, Customer Service, Office Professional
                </p>
                <Link href="/programs" className="text-slate-900 font-semibold hover:text-slate-600 inline-flex items-center gap-2">
                  Explore programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section with Image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-slate-900 mb-4">
                How to Apply
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our application process connects you with WorkOne Career Centers to verify WIOA eligibility and secure funding approval.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Submit Application</h3>
                    <p className="text-slate-600">Complete our online application form</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">WorkOne Appointment</h3>
                    <p className="text-slate-600">Meet with career counselor to verify eligibility</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Begin Training</h3>
                    <p className="text-slate-600">Start your program with all costs covered</p>
                  </div>
                </div>
              </div>
              <Link href="/apply" className="inline-block mt-8 bg-slate-900 text-white px-8 py-3 rounded font-semibold hover:bg-slate-800 transition">
                Start Application
              </Link>
            </div>
            <div className="relative h-96">
              <Image
                src="/media/programs/barber-hd.jpg"
                alt="Training Application Process"
                fill
                className="object-cover rounded" quality={100} sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-4">Ready to Begin?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Check your eligibility for government-funded career training
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-slate-900 px-8 py-3 rounded font-semibold hover:bg-slate-100 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition border border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, DollarSign, Heart, ArrowRight } from "lucide-react";

export default function ChildcarePage() {
  return (
    <main className="bg-white">
      <section className="relative bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">❤️ ETPL & WRG Approved</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Childcare Provider Certification
              </h1>
              <p className="text-xl md:text-2xl text-pink-100 mb-4">
                Start Your Own Home Daycare or Work in Childcare Centers
              </p>
              <p className="text-lg text-pink-50 mb-6">
                ETPL-approved program with WIOA and WRG funding. Learn child development, safety, nutrition, and business management. High demand for quality childcare providers.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">8-12 Weeks</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">$25K-$40K</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">Rewarding Career</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now - FREE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-800 transition-all border-2 border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/media/programs/childcare-hd.jpg"
                  alt="Childcare Provider Certification Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 hidden">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
            ETPL & WRG Approved
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">
            Childcare Provider Certification
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Start your own home daycare or work in childcare centers. ETPL-approved program 
            with WIOA and WRG funding available for eligible students.
          </p>
          <div className="mt-6">
            <Link
              href="/apply"
              className="rounded-full bg-pink-600 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-700"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Program Overview
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                Our ETPL-approved Childcare Provider Certification program prepares you to 
                work with children in home daycare settings or childcare centers. Learn child 
                development, safety protocols, nutrition, and business management.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                This program is perfect for those who love working with children and want to 
                make a difference in their community. Start your own home daycare business or 
                work for established childcare centers.
              </p>
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-900">
                  ✅ ETPL Approved | ✅ WRG Eligible | ✅ WIOA Funded
                </p>
                <p className="mt-2 text-xs text-blue-800">
                  This program is on Indiana's Eligible Training Provider List and 
                  qualifies for Workforce Ready Grants. Most students pay $0 tuition.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Program Benefits
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>ETPL-approved training program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>Free for eligible students (WIOA/WRG funded)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>CDA (Child Development Associate) credential preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>Indiana childcare licensing guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>First Aid & CPR certification included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>Home daycare business setup training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600">✓</span>
                  <span>Job placement assistance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              What You'll Learn
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Child Development
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Ages and stages, developmental milestones, learning activities, and age-appropriate care
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Health & Safety
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  First aid, CPR, nutrition, illness prevention, safe environments, and emergency procedures
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Business Management
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Licensing requirements, record keeping, parent communication, and running a home daycare
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Career Pathways
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Home Daycare Provider</h3>
                  <p className="text-xs text-slate-700">
                    Start your own licensed home daycare business. Earn $30,000-60,000/year working from home.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Childcare Center Worker</h3>
                  <p className="text-xs text-slate-700">
                    Work in established childcare centers, preschools, or Head Start programs ($12-18/hour).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Lead Teacher/Director</h3>
                  <p className="text-xs text-slate-700">
                    Advance to lead teacher or center director positions with additional education ($18-25/hour).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Indiana Licensing Requirements
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Our program helps you meet Indiana's requirements for childcare providers:
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">Home Daycare</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  <li>• Background check clearance</li>
                  <li>• Health and safety training</li>
                  <li>• First aid/CPR certification</li>
                  <li>• Home inspection approval</li>
                  <li>• Business registration</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">Center Employment</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  <li>• CDA credential (preferred)</li>
                  <li>• Background check clearance</li>
                  <li>• Health screening</li>
                  <li>• Ongoing training hours</li>
                  <li>• Professional references</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Start Your Own Home Daycare
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Many graduates choose to start their own home daycare business. Benefits include:
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">💰</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Good Income</h3>
                  <p className="text-xs text-slate-700">$30,000-60,000/year potential</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">🏠</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Work From Home</h3>
                  <p className="text-xs text-slate-700">Be there for your own children</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg">⏰</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Flexible Schedule</h3>
                  <p className="text-xs text-slate-700">Set your own hours and rates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-pink-200 bg-pink-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Apply now for our ETPL-approved Childcare Provider Certification program. 
              Training is free for eligible students through WIOA and WRG funding.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-pink-600 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-700"
              >
                Apply for Training
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-800 hover:border-pink-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            <p>
              <strong>ETPL Approved:</strong> Indiana Eligible Training Provider List | 
              <strong> WRG Eligible:</strong> Workforce Ready Grant approved | 
              <strong> Funding:</strong> WIOA/WRG covers 100% tuition for eligible students
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

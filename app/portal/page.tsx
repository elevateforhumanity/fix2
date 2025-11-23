// app/portal/page.tsx - UNIFIED PORTAL HOME
import Link from "next/link";
import { GraduationCap, Users, Briefcase, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Portal | Elevate For Humanity",
  description: "Access your student, staff, or employer portal",
};

export default function PortalHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white text-xl font-black uppercase mb-4 shadow-lg">
            EFH
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Elevate For Humanity Portal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose your portal to access courses, manage programs, or connect with talent
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Student Portal */}
          <Link
            href="/portal/student"
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 transition hover:shadow-xl hover:ring-emerald-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Student Portal
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Access your courses, track progress, complete assignments, and earn certificates
              </p>
              <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                Log in or register
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>

          {/* Staff Portal */}
          <Link
            href="/portal/staff"
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 transition hover:shadow-xl hover:ring-blue-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-500 group-hover:text-white transition">
                <Users size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Staff Portal
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Manage enrollments, track attendance, approve certificates, and support learners
              </p>
              <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                Staff login
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>

          {/* Employer Portal */}
          <Link
            href="/portal/employer"
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 transition hover:shadow-xl hover:ring-orange-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-4 group-hover:bg-orange-500 group-hover:text-white transition">
                <Briefcase size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Employer Portal
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Post jobs, manage apprentices, approve OJT/WEX, and connect with talent
              </p>
              <div className="flex items-center text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                Employer login
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm text-slate-700">
            <HelpCircle size={18} />
            <span>Need help?</span>
            <a
              href="mailto:Elevate4humanityedu@gmail.com"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/programs" className="text-slate-700 hover:text-emerald-600 transition">
              Browse Programs
            </Link>
            <Link href="/apply" className="text-slate-700 hover:text-emerald-600 transition">
              Apply Now
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-emerald-600 transition">
              Contact Us
            </Link>
            <Link href="/faq" className="text-slate-700 hover:text-emerald-600 transition">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

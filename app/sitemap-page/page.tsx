import { BookOpen, Briefcase, DollarSign, GraduationCap, Users, Settings, FileText, Award, Building2, Video, MessageSquare, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Site Map | Elevate for Humanity',
  description: 'Complete directory of all pages and resources available on Elevate for Humanity',
}

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Site Map</h1>
            <p className="text-xl text-indigo-100">
              Complete directory of all pages and resources
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Pages */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Main Pages</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-blue-600 hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
              <li><Link href="/apply" className="text-blue-600 hover:underline font-bold">Apply Now</Link></li>
              <li><Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link></li>
              <li><Link href="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
              <li><Link href="/success-stories" className="text-blue-600 hover:underline">Success Stories</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Programs</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/programs" className="text-blue-600 hover:underline font-bold">All Programs</Link></li>
              <li><Link href="/programs/medical-assistant" className="text-blue-600 hover:underline">Medical Assistant</Link></li>
              <li><Link href="/programs/cna" className="text-blue-600 hover:underline">CNA (Certified Nursing Assistant)</Link></li>
              <li><Link href="/programs/barber-apprenticeship" className="text-blue-600 hover:underline">Barber Apprenticeship</Link></li>
              <li><Link href="/programs/hvac" className="text-blue-600 hover:underline">HVAC Technician</Link></li>
              <li><Link href="/programs/building-tech" className="text-blue-600 hover:underline">Building Maintenance Tech</Link></li>
              <li><Link href="/programs/cdl" className="text-blue-600 hover:underline">CDL / Truck Driving</Link></li>
              <li><Link href="/programs/tax-vita" className="text-blue-600 hover:underline">Tax Prep (VITA)</Link></li>
              <li><Link href="/programs/workforce-readiness" className="text-blue-600 hover:underline">Workforce Readiness</Link></li>
              <li><Link href="/micro-classes" className="text-blue-600 hover:underline">Micro Classes</Link></li>
            </ul>
          </div>

          {/* Funding */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Funding</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/funding" className="text-blue-600 hover:underline font-bold">Funding Overview</Link></li>
              <li><Link href="/funding/wioa" className="text-blue-600 hover:underline">WIOA Funding</Link></li>
              <li><Link href="/funding/wrg" className="text-blue-600 hover:underline">Workforce Ready Grant</Link></li>
              <li><Link href="/funding/jri" className="text-blue-600 hover:underline">Job Ready Indy (JRI)</Link></li>
              <li><Link href="/funding/dol" className="text-blue-600 hover:underline">DOL Apprenticeships</Link></li>
              <li><Link href="/financial-aid" className="text-blue-600 hover:underline">Financial Aid</Link></li>
              <li><Link href="/wioa-eligibility" className="text-blue-600 hover:underline">WIOA Eligibility</Link></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">For Students</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/student/dashboard" className="text-blue-600 hover:underline font-bold">Student Dashboard</Link></li>
              <li><Link href="/portal/student" className="text-blue-600 hover:underline">Student Portal</Link></li>
              <li><Link href="/student/hub" className="text-blue-600 hover:underline">Student Hub</Link></li>
              <li><Link href="/student/courses" className="text-blue-600 hover:underline">My Courses</Link></li>
              <li><Link href="/student/grades" className="text-blue-600 hover:underline">Grades</Link></li>
              <li><Link href="/student/certificates" className="text-blue-600 hover:underline">Certificates</Link></li>
              <li><Link href="/student/resources" className="text-blue-600 hover:underline">Resources</Link></li>
              <li><Link href="/student/support" className="text-blue-600 hover:underline">Support</Link></li>
              <li><Link href="/student/career-counseling" className="text-blue-600 hover:underline">Career Counseling</Link></li>
            </ul>
          </div>

          {/* LMS */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">LMS</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/lms" className="text-blue-600 hover:underline font-bold">LMS Home</Link></li>
              <li><Link href="/lms/dashboard" className="text-blue-600 hover:underline">LMS Dashboard</Link></li>
              <li><Link href="/lms/courses" className="text-blue-600 hover:underline">Course Catalog</Link></li>
              <li><Link href="/lms/assignments" className="text-blue-600 hover:underline">Assignments</Link></li>
              <li><Link href="/lms/calendar" className="text-blue-600 hover:underline">Calendar</Link></li>
              <li><Link href="/lms/certificates" className="text-blue-600 hover:underline">Certificates</Link></li>
              <li><Link href="/lms/achievements" className="text-blue-600 hover:underline">Achievements</Link></li>
              <li><Link href="/lms/forums" className="text-blue-600 hover:underline">Discussion Forums</Link></li>
            </ul>
          </div>

          {/* Credentials */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Credentials</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/credentials" className="text-blue-600 hover:underline font-bold">Credentials Overview</Link></li>
              <li><Link href="/verify-credential" className="text-blue-600 hover:underline">Verify Credential</Link></li>
              <li><Link href="/training/certifications" className="text-blue-600 hover:underline">Certifications</Link></li>
              <li><Link href="/student/certifications/milady" className="text-blue-600 hover:underline">Milady Certifications</Link></li>
              <li><Link href="/student/milady-lms" className="text-blue-600 hover:underline">Milady LMS</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">For Employers</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/employers" className="text-blue-600 hover:underline font-bold">Employer Overview</Link></li>
              <li><Link href="/employer/dashboard" className="text-blue-600 hover:underline">Employer Dashboard</Link></li>
              <li><Link href="/hire-graduates" className="text-blue-600 hover:underline">Hire Graduates</Link></li>
              <li><Link href="/employer/post-job" className="text-blue-600 hover:underline">Post a Job</Link></li>
              <li><Link href="/employer/placements" className="text-blue-600 hover:underline">Placements</Link></li>
              <li><Link href="/ojt-and-funding" className="text-blue-600 hover:underline">OJT & Funding</Link></li>
            </ul>
          </div>

          {/* Program Holders */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Program Holders</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/program-holders" className="text-blue-600 hover:underline font-bold">Program Holders Home</Link></li>
              <li><Link href="/program-holder/portal" className="text-blue-600 hover:underline">Portal</Link></li>
              <li><Link href="/program-holder/mou" className="text-blue-600 hover:underline">Universal MOU</Link></li>
              <li><Link href="/program-holder/sign-mou" className="text-blue-600 hover:underline">Sign MOU</Link></li>
              <li><Link href="/program-holder/apply" className="text-blue-600 hover:underline">Become a Program Holder</Link></li>
              <li><Link href="/onboarding" className="text-blue-600 hover:underline">Onboarding</Link></li>
              <li><Link href="/training-providers" className="text-blue-600 hover:underline">Training Providers</Link></li>
            </ul>
          </div>

          {/* Career Services */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Career Services</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/career-services" className="text-blue-600 hover:underline font-bold">Career Services</Link></li>
              <li><Link href="/careers/job-board" className="text-blue-600 hover:underline">Job Board</Link></li>
              <li><Link href="/careers/resume-builder" className="text-blue-600 hover:underline">Resume Builder</Link></li>
              <li><Link href="/careers/interview-prep" className="text-blue-600 hover:underline">Interview Prep</Link></li>
              <li><Link href="/career-fair" className="text-blue-600 hover:underline">Career Fair</Link></li>
            </ul>
          </div>

          {/* Admin & Staff */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Admin & Staff</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/admin" className="text-blue-600 hover:underline font-bold">Admin Portal</Link></li>
              <li><Link href="/admin/dashboard" className="text-blue-600 hover:underline">Admin Dashboard</Link></li>
              <li><Link href="/staff-portal" className="text-blue-600 hover:underline">Staff Portal</Link></li>
              <li><Link href="/admin/certificates" className="text-blue-600 hover:underline">Certificate Management</Link></li>
              <li><Link href="/admin/program-holders" className="text-blue-600 hover:underline">Program Holder Management</Link></li>
            </ul>
          </div>

          {/* Community & Resources */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Community</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-blue-600 hover:underline font-bold">Community Hub</Link></li>
              <li><Link href="/resources" className="text-blue-600 hover:underline">Resources</Link></li>
              <li><Link href="/webinars" className="text-blue-600 hover:underline">Webinars</Link></li>
              <li><Link href="/alumni" className="text-blue-600 hover:underline">Alumni Network</Link></li>
              <li><Link href="/workforce-partners" className="text-blue-600 hover:underline">Workforce Partners</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Legal & Policies</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link></li>
              <li><Link href="/accessibility" className="text-blue-600 hover:underline">Accessibility</Link></li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-orange-100 mb-8">Contact us and we'll help you find the right page or resource</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-800 transition-all border-2 border-white/20"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

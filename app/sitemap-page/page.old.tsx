import { BookOpen, Briefcase, DollarSign, GraduationCap, Users, Settings, FileText, Award, Building2, Video, MessageSquare, Calendar, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Site Map | Elevate for Humanity',
  description: 'Complete directory of all pages and resources available on Elevate for Humanity',
}

export default function SiteMapPage() {
  return (
    <div className="min-h-screen   ">
      {/* Hero */}
      <section className="   text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Complete Site Map</h1>
            <p className="text-xl text-indigo-100 mb-4">
              All 479 pages organized by category
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-sm font-semibold">Use Ctrl+F (Cmd+F on Mac) to search for specific pages</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
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
              <li><Link href="/contact" className="text-blue-600 hover:underline font-bold">Contact Us</Link></li>
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
              <li><Link href="/docs/api" className="text-blue-600 hover:underline">API Documentation</Link></li>
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

          {/* HR & Payroll */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">HR & Payroll</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/admin/hr" className="text-blue-600 hover:underline font-bold">HR Dashboard</Link></li>
              <li><Link href="/admin/hr/payroll" className="text-blue-600 hover:underline">Admin Payroll</Link></li>
              <li><Link href="/employee/payroll" className="text-blue-600 hover:underline">Employee Payroll</Link></li>
              <li><Link href="/admin/hr/employees" className="text-blue-600 hover:underline">Employees</Link></li>
              <li><Link href="/admin/hr/time" className="text-blue-600 hover:underline">Time Tracking</Link></li>
              <li><Link href="/admin/hr/leave" className="text-blue-600 hover:underline">Leave Management</Link></li>
              <li><Link href="/employee/documents" className="text-blue-600 hover:underline">Employee Documents</Link></li>
              <li><Link href="/employee/time-off" className="text-blue-600 hover:underline">Time Off Requests</Link></li>
            </ul>
          </div>

          {/* Case Management */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Case Management</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/cm" className="text-blue-600 hover:underline font-bold">Case Management</Link></li>
              <li><Link href="/docs/case-management" className="text-blue-600 hover:underline">CM Documentation</Link></li>
              <li><Link href="/delegate/dashboard" className="text-blue-600 hover:underline">Delegate Dashboard</Link></li>
              <li><Link href="/delegate/students" className="text-blue-600 hover:underline">Delegate Students</Link></li>
              <li><Link href="/delegate/reports" className="text-blue-600 hover:underline">Delegate Reports</Link></li>
              <li><Link href="/delegate/messages" className="text-blue-600 hover:underline">Delegate Messages</Link></li>
            </ul>
          </div>

          {/* Boards & Governance */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Boards</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/board/dashboard" className="text-blue-600 hover:underline">Board Dashboard</Link></li>
              <li><Link href="/board/referrals" className="text-blue-600 hover:underline">Board Referrals</Link></li>
              <li><Link href="/workforce-board/dashboard" className="text-blue-600 hover:underline">Workforce Board</Link></li>
              <li><Link href="/platform/workforce-boards" className="text-blue-600 hover:underline">Workforce Boards Platform</Link></li>
            </ul>
          </div>

          {/* Special Programs */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Special Programs</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/kingdom-konnect" className="text-blue-600 hover:underline font-bold">Kingdom Konnect</Link></li>
              <li><Link href="/vita" className="text-blue-600 hover:underline font-bold">VITA Tax Program</Link></li>
              <li><Link href="/serene-comfort-care" className="text-blue-600 hover:underline font-bold">Serene Comfort Care</Link></li>
              <li><Link href="/urban-build-crew" className="text-blue-600 hover:underline font-bold">Urban Build Crew</Link></li>
              <li><Link href="/selfish-inc" className="text-blue-600 hover:underline">Selfish Inc</Link></li>
            </ul>
          </div>

          {/* Tools & Utilities */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Tools</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/file-manager" className="text-blue-600 hover:underline">File Manager</Link></li>
              <li><Link href="/sheets" className="text-blue-600 hover:underline">Sheets</Link></li>
              <li><Link href="/slides" className="text-blue-600 hover:underline">Slides</Link></li>
              <li><Link href="/video" className="text-blue-600 hover:underline">Video</Link></li>
              <li><Link href="/videos" className="text-blue-600 hover:underline">Videos</Link></li>
              <li><Link href="/chat" className="text-blue-600 hover:underline">Chat</Link></li>
              <li><Link href="/messages" className="text-blue-600 hover:underline">Messages</Link></li>
              <li><Link href="/calendar" className="text-blue-600 hover:underline">Calendar</Link></li>
              <li><Link href="/search" className="text-blue-600 hover:underline">Search</Link></li>
              <li><Link href="/directory" className="text-blue-600 hover:underline">Directory</Link></li>
            </ul>
          </div>

          {/* Course & Content Builders */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Builders</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/admin/course-builder" className="text-blue-600 hover:underline font-bold">Course Builder</Link></li>
              <li><Link href="/admin/ai-course-builder" className="text-blue-600 hover:underline">AI Course Builder</Link></li>
              <li><Link href="/courses/coursebuilder" className="text-blue-600 hover:underline">Course Builder (Public)</Link></li>
              <li><Link href="/admin/quiz-builder" className="text-blue-600 hover:underline">Quiz Builder</Link></li>
              <li><Link href="/admin/syllabus-generator" className="text-blue-600 hover:underline">Syllabus Generator</Link></li>
              <li><Link href="/admin/program-generator" className="text-blue-600 hover:underline">Program Generator</Link></li>
              <li><Link href="/admin/videos/upload" className="text-blue-600 hover:underline">Video Upload</Link></li>
              <li><Link href="/admin/curriculum/upload" className="text-blue-600 hover:underline">Curriculum Upload</Link></li>
              <li><Link href="/curriculumupload" className="text-blue-600 hover:underline">Curriculum Upload (Alt)</Link></li>
              <li><Link href="/create-course" className="text-blue-600 hover:underline">Create Course</Link></li>
            </ul>
          </div>

          {/* Documents & Binders */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Documents</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/admin/document-center" className="text-blue-600 hover:underline font-bold">Document Center</Link></li>
              <li><Link href="/admin/documents/upload" className="text-blue-600 hover:underline">Upload Documents</Link></li>
              <li><Link href="/employee/documents" className="text-blue-600 hover:underline">Employee Documents</Link></li>
              <li><Link href="/notebooklm" className="text-blue-600 hover:underline">NotebookLM</Link></li>
              <li><Link href="/admin/internal-docs" className="text-blue-600 hover:underline">Internal Docs</Link></li>
            </ul>
          </div>

          {/* Instructor Tools */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-fuchsia-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Instructor</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/instructor/dashboard" className="text-blue-600 hover:underline font-bold">Instructor Dashboard</Link></li>
              <li><Link href="/instructor/analytics" className="text-blue-600 hover:underline">Instructor Analytics</Link></li>
              <li><Link href="/educatorhub" className="text-blue-600 hover:underline">Educator Hub</Link></li>
              <li><Link href="/receptionist" className="text-blue-600 hover:underline">Receptionist</Link></li>
            </ul>
          </div>

          {/* Reporting & Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-lime-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
            </div>
            <ul className="space-y-2">
              <li><Link href="/reports" className="text-blue-600 hover:underline font-bold">Reports</Link></li>
              <li><Link href="/admin/reports" className="text-blue-600 hover:underline">Admin Reports</Link></li>
              <li><Link href="/admin/reports/caseload" className="text-blue-600 hover:underline">Caseload Reports</Link></li>
              <li><Link href="/admin/reports/charts" className="text-blue-600 hover:underline">Charts</Link></li>
              <li><Link href="/admin/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
              <li><Link href="/analyticsdashboard" className="text-blue-600 hover:underline">Analytics Dashboard</Link></li>
              <li><Link href="/platform/workforce-analytics" className="text-blue-600 hover:underline">Workforce Analytics</Link></li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16    rounded-2xl p-12 text-center text-white">
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

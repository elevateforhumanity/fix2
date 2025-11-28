import { FileText, Users, BookOpen, CheckCircle, ArrowRight, Download, Video, GraduationCap, Building2, Handshake, ClipboardCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Program Holders Portal | Elevate for Humanity',
  description: 'Resources, MOU agreements, and onboarding information for program holders and training partners.',
}

export default function ProgramHoldersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Banner with Image */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">🤝 Partner Portal</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Program Holders & Training Partners
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                Welcome to your central hub for MOUs, onboarding resources, and partnership documentation
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/program-holder/portal"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg"
                >
                  Access Portal →
                </Link>
                <Link
                  href="#resources"
                  className="bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all border-2 border-white/20"
                >
                  View Resources
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-semibold">Training Partners</p>
                    <p className="text-sm text-indigo-100">Building Workforce Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Quick Access</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to get started and manage your partnership
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Universal MOU */}
            <Link href="/program-holder/mou" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Universal MOU</h3>
                <p className="text-slate-700 mb-4">
                  View, download, or sign the Memorandum of Understanding for program holders
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Access MOU</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Onboarding */}
            <Link href="/onboarding" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Onboarding</h3>
                <p className="text-slate-700 mb-4">
                  Complete your onboarding process and get set up as a training partner
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Start Onboarding</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Employer Resources */}
            <Link href="/employers" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Employer Info</h3>
                <p className="text-slate-700 mb-4">
                  Information for employers partnering with our training programs
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                  <span>View Resources</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Partner Resources</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Documentation, guides, and tools for program holders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Documentation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Documentation</h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link href="/program-holder/mou" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">Universal MOU Template</span>
                    </div>
                    <Download className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/docs/program-holders" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">Program Holder Guidelines</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/program-holder/how-to-use" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">How to Use the Portal</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Training & Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Training & Support</h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link href="/onboarding" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <ClipboardCheck className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">Onboarding Checklist</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/program-holder/training" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">Training Videos</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-900">Contact Support</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Program Holder */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">What is a Program Holder?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 mb-4">
                A <strong className="text-indigo-600">Program Holder</strong> is an organization or training provider that partners with Elevate for Humanity to deliver workforce development programs. Program holders may include:
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Training Providers</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Vocational schools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Community colleges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Certification programs</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Employer Partners</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>OJT host sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Apprenticeship sponsors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Work experience sites</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-lg text-slate-700">
                All program holders must complete onboarding and sign a Memorandum of Understanding (MOU) that outlines roles, responsibilities, and compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            Join our network of training providers and employers building Indiana's workforce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/program-holder/apply"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg"
            >
              Become a Program Holder →
            </Link>
            <Link
              href="/contact"
              className="bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all border-2 border-white/20"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Full support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Grow your impact</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

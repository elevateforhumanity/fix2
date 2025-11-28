import { Award, CheckCircle, ExternalLink, GraduationCap, Shield, Star, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Industry Credentials & Certifications | Elevate for Humanity',
  description: 'Earn nationally recognized credentials through Certiport, Milady, and other industry-leading certification programs. All included in your FREE training.',
}

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">🏆 Industry-Recognized Credentials</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Earn Real Credentials That Employers Value
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              All our programs include nationally recognized certifications from industry leaders like Certiport, Milady, and more—at NO extra cost
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Training →
              </Link>
              <Link
                href="/programs"
                className="bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all border-2 border-white/20"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Credentials Matter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Industry Credentials Matter</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Credentials prove to employers that you have the skills they need
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Higher Pay</h3>
              <p className="text-slate-600">Certified workers earn 15-20% more on average</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">More Job Offers</h3>
              <p className="text-slate-600">85% of employers prefer certified candidates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Skills</h3>
              <p className="text-slate-600">Third-party validation of your abilities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career Growth</h3>
              <p className="text-slate-600">Credentials open doors to advancement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Credential Partners */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Credential Partners</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We partner with industry-leading certification providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Certiport */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Certiport</h3>
                    <p className="text-blue-100">Technology Certifications</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6">
                  <strong className="text-blue-600">Certiport</strong> is the world's leading provider of certification exam development and delivery. Their certifications are recognized globally by employers and educational institutions.
                </p>
                <h4 className="font-bold text-slate-900 mb-3">Available Certifications:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Microsoft Office Specialist (MOS)</strong> - Word, Excel, PowerPoint, Outlook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>IC3 Digital Literacy</strong> - Computer fundamentals, internet, productivity apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Adobe Certified Professional</strong> - Photoshop, Illustrator, InDesign</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Autodesk Certified User</strong> - AutoCAD, Revit, Fusion 360</span>
                  </li>
                </ul>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>💼 Career Impact:</strong> MOS certification holders earn an average of $16,000 more per year than non-certified peers
                  </p>
                </div>
                <a
                  href="https://certiport.pearsonvue.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More About Certiport <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Milady */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-pink-200">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Milady</h3>
                    <p className="text-pink-100">Cosmetology & Barbering</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6">
                  <strong className="text-pink-600">Milady</strong> is the gold standard in beauty and wellness education. For over 90 years, Milady has been the trusted resource for cosmetology, barbering, and esthetics training.
                </p>
                <h4 className="font-bold text-slate-900 mb-3">Available Programs:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Barbering</strong> - Complete 1,500-hour program with state licensure prep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Cosmetology</strong> - Full curriculum aligned with state board exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Esthetics</strong> - Skincare specialist training and certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><strong>Nail Technology</strong> - Manicure, pedicure, and nail art certification</span>
                  </li>
                </ul>
                <div className="bg-pink-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-pink-900">
                    <strong>💼 Career Impact:</strong> Licensed barbers earn $30K-$55K annually, with top earners making $70K+
                  </p>
                </div>
                <a
                  href="https://www.milady.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
                >
                  Learn More About Milady <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Additional Credentials */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">State Licenses</h3>
              <p className="text-slate-600 mb-4">
                CNA, Barber, Cosmetology, and other state-issued professional licenses
              </p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Indiana State Board approved</li>
                <li>• Exam prep included</li>
                <li>• License application support</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Industry Certifications</h3>
              <p className="text-slate-600 mb-4">
                HVAC, EPA 608, OSHA, CPR/First Aid, and trade-specific credentials
              </p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Nationally recognized</li>
                <li>• Required for employment</li>
                <li>• Lifetime validity (most)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Completion Certificates</h3>
              <p className="text-slate-600 mb-4">
                Program completion certificates for all workforce training programs
              </p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Digital & printed copies</li>
                <li>• Verifiable online</li>
                <li>• Add to resume/LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">All Credentials Included FREE</h2>
              <p className="text-xl text-green-100 mb-8">
                When you train with us through WIOA, Workforce Ready Grant, or other funding programs, ALL certification costs are covered:
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">$0</div>
                  <div className="text-sm text-green-100">Exam Fees</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">$0</div>
                  <div className="text-sm text-green-100">Study Materials</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">$0</div>
                  <div className="text-sm text-green-100">License Applications</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/funding"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg"
                >
                  See Funding Options →
                </Link>
                <Link
                  href="/apply"
                  className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all border-2 border-white/20"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verify Credentials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Verify a Credential</h2>
            <p className="text-xl text-slate-600 mb-8">
              Employers can verify credentials issued by Elevate for Humanity
            </p>
            <Link
              href="/verify-credential"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
            >
              <Shield className="w-6 h-6" />
              Verify Credential
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Earn Your Credentials?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            Start your FREE training today and earn industry-recognized certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/apply"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
            >
              Apply Now - It's FREE! →
            </Link>
            <Link
              href="/programs"
              className="bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all border-2 border-white/20"
            >
              Browse Programs
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% FREE</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>All exams included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Job placement support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

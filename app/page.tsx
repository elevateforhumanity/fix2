import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { VideoShell } from '@/components/VideoShell';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate Connects Directory
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/programs"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Programs
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            About
          </Link>
          <Link href="/login" className="elevate-btn-secondary">
            Sign In
          </Link>
          <Link href="/signup" className="elevate-btn-primary">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="elevate-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            {/* Left: Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-efh-red/10 border border-efh-red/20 rounded-full text-sm font-semibold mb-6 text-efh-red">
                ✓ WIOA-Funded Training • 100% Free for Eligible Participants
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-gray-900">
                Transform Your Future with FREE Workforce Training
              </h1>
              <p className="text-2xl font-semibold mb-6 text-efh-orange italic">
                Innovate. Elevate. Reset.
              </p>
              <p className="text-xl mb-8 text-gray-700 leading-relaxed">
                A workforce & wellness ecosystem for real people. Access
                high-quality career training programs funded by WIOA. Get the
                skills employers need—at no cost to you.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/enroll" className="elevate-btn-primary">
                  Check Your Eligibility
                </Link>
                <Link href="/programs" className="elevate-btn-secondary">
                  Browse Programs
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-efh-teal" />
                  <span>WIOA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-efh-teal" />
                  <span>Industry-Recognized Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-efh-teal" />
                  <span>Job Placement Support</span>
                </div>
              </div>
            </div>

            {/* Right: Video Placeholder */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-white">
                {/* VIDEO SCRIPT 1: Homepage Hero (25 seconds)
                    Cinematic video for Elevate for Humanity
                    
                    Scene 1 (0-6s): Close-ups of diverse people (barber, HVAC tech, CNA, CDL student) 
                    getting ready for work. Overlay: "Innovate."
                    
                    Scene 2 (6-12s): Students using laptops/phones, dashboard with progress bars, 
                    enroll buttons, certificates. Overlay: "Elevate."
                    
                    Scene 3 (12-18s): Wellness montage - journaling, tea/coffee, stretching, breathing. 
                    Overlay: "Reset."
                    
                    Scene 4 (18-25s): Wide shot of city/neighborhood, lights connecting like network map.
                    Final text: "Elevate for Humanity - Innovate. Elevate. Reset."
                    "A workforce & wellness ecosystem for real people."
                    
                    Replace this placeholder with actual video URL when ready.
                */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-efh-red/10 border-2 border-efh-red/20 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-efh-red"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-900 text-sm font-semibold">
                      Innovate. Elevate. Reset.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      25 sec hero video
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Video placeholder
                    </p>
                  </div>
                </div>
                {/* Uncomment when video is ready:
                <video 
                  className="w-full h-full object-cover"
                  poster="/videos/hero-poster.jpg"
                  controls
                  preload="metadata"
                >
                  <source src="/videos/hero-innovate-elevate-reset.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                */}
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Free Training</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-teal-600">85%</div>
                <div className="text-sm text-gray-600">Job Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="elevate-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-gray-700 font-semibold">Free Training</div>
              <div className="text-sm text-gray-500 mt-1">WIOA-Funded</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-700 font-semibold">Career Programs</div>
              <div className="text-sm text-gray-500 mt-1">
                High-Demand Fields
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-teal-600 mb-2">85%</div>
              <div className="text-gray-700 font-semibold">Job Placement</div>
              <div className="text-sm text-gray-500 mt-1">Within 6 Months</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold text-blue-600 mb-2">$45K+</div>
              <div className="text-gray-700 font-semibold">
                Avg. Starting Salary
              </div>
              <div className="text-sm text-gray-500 mt-1">For Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer-Led Apprenticeship & WIOA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Empowering Employers. Advancing Apprenticeships. Transforming
              Tomorrow.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through Elevate Connects Directory, employers across Indiana are
              linking with high-quality, WIOA-eligible apprenticeship and
              training programs to build a skilled workforce.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Employer-Led Registered Apprenticeships
              </h3>
              <p className="text-gray-600 mb-4">
                Provide paid work experience + classroom instruction.
                Apprentices earn while they learn.
              </p>
              <a
                href="https://www.in.gov/dwd/apprenticeship-indiana/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                WIOA-Eligible Training
              </h3>
              <p className="text-gray-600 mb-4">
                Eligible jobseekers access training at little or no cost through
                Workforce Innovation and Opportunity Act funding.
              </p>
              <a
                href="https://www.dol.gov/agencies/eta/wioa/programs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Local Partnership Initiatives
              </h3>
              <p className="text-gray-600 mb-4">
                EmployIndy's Modern Apprenticeship and Indiana Plan's readiness
                programs create pathways into in-demand industries.
              </p>
              <a
                href="https://employindy.org/modern-apprenticeship/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-2"
              >
                Learn More →
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For Employers
              </h3>
              <p className="text-gray-700 mb-6">
                List your apprenticeship-ready program in the directory. Gain
                access to a pipeline of motivated talent, reimbursement
                opportunities, and reporting support.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Access pre-screened, motivated candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>WIOA reimbursement opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Reporting and compliance support</span>
                </li>
              </ul>
              <Link
                href="/program-holder/apply"
                className="elevate-btn-primary w-full text-center block"
              >
                List Your Program
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For Applicants
              </h3>
              <p className="text-gray-700 mb-6">
                Explore programs matching employers, training providers, and
                funding under WIOA or registered apprenticeship models. Search
                by industry, location, or funding type.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span>100% free training through WIOA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Earn while you learn in apprenticeships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Job placement support included</span>
                </li>
              </ul>
              <Link
                href="/enroll"
                className="elevate-btn-primary w-full text-center block"
              >
                Check Your Eligibility
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 italic">
              Building the workforce of tomorrow, today.
            </p>
          </div>

          {/* Original WIOA Info */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is WIOA?
              </h2>
              <p className="text-lg text-gray-600">
                The Workforce Innovation and Opportunity Act provides FREE
                training to help Americans get high-quality jobs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="elevate-card elevate-card-red">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Who Qualifies?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Adults seeking career advancement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Dislocated workers needing retraining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Youth ages 16-24 entering the workforce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Individuals with barriers to employment</span>
                  </li>
                </ul>
              </div>

              <div className="elevate-card elevate-card-blue">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What's Included?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>100% free tuition and training materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Job placement and career counseling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Support services (childcare, transportation)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Training Programs
            </h2>
            <p className="text-lg text-gray-600">
              Industry-recognized certifications in high-demand careers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="elevate-card elevate-card-red group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src="/course-covers/barber-apprenticeship/cover.svg"
                  alt="Barber Apprenticeship"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Barber Apprenticeship
              </h3>
              <p className="text-gray-600 mb-4">
                DOL Registered Apprenticeship. Master barbering with 2,000-hour
                comprehensive training.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  DOL Registered • 2,000 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  Indiana State Barber License
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  $35K-$55K starting salary
                </li>
              </ul>
              <Link
                href="/programs/barber"
                className="elevate-btn-primary w-full text-center block"
              >
                Learn More
              </Link>
            </div>

            <div className="elevate-card elevate-card-blue group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src="/course-covers/truck-driving/cover.svg"
                  alt="CDL Truck Driving"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                CDL Truck Driving
              </h3>
              <p className="text-gray-600 mb-4">
                Professional truck driver training leading to Class A Commercial
                Driver License.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  DOL Approved • 160 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Class A CDL certification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  $50K-$65K starting salary
                </li>
              </ul>
              <Link
                href="/programs/truck-driving"
                className="elevate-btn-accent w-full text-center block"
              >
                Learn More
              </Link>
            </div>

            <div className="elevate-card elevate-card-orange group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src="/course-covers/hvac-tech/cover.svg"
                  alt="HVAC Technician"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                HVAC Technician
              </h3>
              <p className="text-gray-600 mb-4">
                ETPL Approved. Master HVAC systems with comprehensive 640-hour
                training program.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  ETPL Approved • 640 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  EPA 608 certification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  $45K-$65K starting salary
                </li>
              </ul>
              <Link
                href="/programs/hvac-tech"
                className="elevate-btn-secondary w-full text-center block"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="elevate-btn-primary"
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              View All 10 Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real people, real results—hear from graduates who transformed
              their careers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-gray-900">Marcus Johnson</div>
                  <div className="text-sm text-gray-600">
                    Barber Apprenticeship
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-orange-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "This program changed my life. I went from unemployed to owning
                my own barbershop in less than a year. The training was
                top-notch and 100% free through WIOA."
              </p>
              <div className="text-sm text-gray-600">
                Now earning:{' '}
                <span className="font-bold text-green-600">$52K/year</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  SM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">CNA Certification</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-orange-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "As a single mom, I couldn't afford training. WIOA covered
                everything—tuition, books, even childcare. I passed my state
                exam and got hired immediately."
              </p>
              <div className="text-sm text-gray-600">
                Now earning:{' '}
                <span className="font-bold text-green-600">$38K/year</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="elevate-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                  DW
                </div>
                <div>
                  <div className="font-bold text-gray-900">David Williams</div>
                  <div className="text-sm text-gray-600">HVAC Technician</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-orange-500">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "After 15 years in retail, I needed a career change. The HVAC
                program gave me real skills and certifications. I'm now making
                double what I used to earn."
              </p>
              <div className="text-sm text-gray-600">
                Now earning:{' '}
                <span className="font-bold text-green-600">$58K/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Portal Video Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Learning Journey
              </h2>
              <p className="text-xl text-gray-600">Enroll. Learn. Elevate.</p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* VIDEO SCRIPT 2: Student Portal Focus (18 seconds)
                  
                  Shots:
                  - Student logging into clean, modern dashboard on laptop
                  - Close-up of "Enrollment confirmed" and progress bar climbing
                  - Badge or digital certificate animating onto screen
                  - Student smiling, closing laptop, looking relieved/hopeful
                  
                  On-screen text (3-beat):
                  1. "Enroll."
                  2. "Learn."
                  3. "Elevate."
                  
                  Final text: "Elevate for Humanity – Student Portal"
                  "Where workforce training meets real support."
                  
                  Replace this placeholder with actual video URL when ready.
              */}
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">
                    Enroll. Learn. Elevate.
                  </p>
                  <p className="text-white/60 text-sm">
                    18 sec student portal video
                  </p>
                  <p className="text-white/40 text-xs mt-2">
                    Upload video to replace placeholder
                  </p>
                </div>
              </div>
              {/* Uncomment when video is ready:
              <video 
                className="w-full h-full object-cover"
                poster="/videos/student-portal-poster.jpg"
                controls
                preload="metadata"
              >
                <source src="/videos/student-portal-enroll-learn-elevate.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Partner / Provider Video Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="elevate-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                For Training Partners
              </h2>
              <p className="text-xl text-gray-600">
                Build Boss-Energy Programs
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* VIDEO SCRIPT 3: Partner / Provider "Boss Energy" (15 seconds)
                  
                  Shots:
                  - Barber shop owner shaking hands with apprentice
                  - HVAC instructor coaching student at unit
                  - CNA instructor in lab with trainees
                  - Close-up of "Partner Dashboard" showing "New applicants", "Active enrollments"
                  
                  Overlay phrases (large, bold, 1.5-2 seconds each):
                  - "Build Boss-Energy Programs."
                  - "Innovate Training."
                  - "Elevate Communities."
                  
                  Final text: "Elevate for Humanity"
                  "List your program on Elevate Connects Directory."
                  
                  Replace this placeholder with actual video URL when ready.
              */}
              <div className="aspect-video bg-gradient-to-br from-orange-900 to-red-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">
                    Build Boss-Energy Programs
                  </p>
                  <p className="text-white/60 text-sm">15 sec partner video</p>
                  <p className="text-white/40 text-xs mt-2">
                    Upload video to replace placeholder
                  </p>
                </div>
              </div>
              {/* Uncomment when video is ready:
              <video 
                className="w-full h-full object-cover"
                poster="/videos/partner-poster.jpg"
                controls
                preload="metadata"
              >
                <source src="/videos/partner-boss-energy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos / Trust Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="elevate-container">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Trusted By Leading Organizations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder logos - replace with actual partner logos */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">WIOA</div>
                <div className="text-xs text-gray-400">Certified Provider</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">
                  EmployIndy
                </div>
                <div className="text-xs text-gray-400">Partner</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">WorkOne</div>
                <div className="text-xs text-gray-400">Affiliate</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">DOL</div>
                <div className="text-xs text-gray-400">Approved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Check Eligibility
              </h3>
              <p className="text-sm text-gray-600">
                See if you qualify for free WIOA-funded training
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Choose Program</h3>
              <p className="text-sm text-gray-600">
                Select from 10+ high-demand career training programs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Complete Training
              </h3>
              <p className="text-sm text-gray-600">
                Learn from experts and earn industry certifications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Get Hired</h3>
              <p className="text-sm text-gray-600">
                Access job placement support and start your new career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-blue-600 text-white">
        <div className="elevate-container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Join thousands of Americans who have launched successful careers
            through FREE WIOA-funded training.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/enroll"
              className="elevate-btn-primary"
              style={{
                fontSize: '1.125rem',
                padding: '1rem 2.5rem',
                backgroundColor: 'white',
                color: '#dc2626',
              }}
            >
              Check Your Eligibility
            </Link>
            <Link
              href="/programs"
              className="elevate-btn-secondary"
              style={{
                fontSize: '1.125rem',
                padding: '1rem 2.5rem',
                borderColor: 'white',
                color: 'white',
              }}
            >
              Browse Programs
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Free Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10+</div>
              <div className="text-sm opacity-90">Career Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-90">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="elevate-container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <span className="text-white font-bold">
                  Elevate for Humanity
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering Americans through free workforce training and career
                development.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/programs/barber" className="hover:text-white">
                    Barber Apprenticeship
                  </Link>
                </li>
                <li>
                  <Link href="/programs/cna" className="hover:text-white">
                    CNA Certification
                  </Link>
                </li>
                <li>
                  <Link href="/programs/hvac-tech" className="hover:text-white">
                    HVAC Technician
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="hover:text-white">
                    View All Programs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
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
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Get Started</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/enroll" className="hover:text-white">
                    Check Eligibility
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-white">
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

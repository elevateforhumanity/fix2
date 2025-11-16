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
      {/* Simple Hero - Clear Message */}
      <section className="bg-white py-16">
        <div className="elevate-container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Free Career Training in Indianapolis
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Learn a skilled trade, get certified, and start a career that pays well. 
            All training is 100% free if you qualify for WIOA funding.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link 
              href="/enroll" 
              className="px-8 py-4 bg-efh-red text-white rounded-lg text-lg font-semibold hover:bg-efh-orange transition-colors"
            >
              Check If You Qualify
            </Link>
            <Link 
              href="/programs" 
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-efh-red hover:text-efh-red transition-colors"
            >
              Browse Programs
            </Link>
            <Link 
              href="/ai-chat" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              💬 Chat with AI Helper
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-efh-teal" />
              <span>No cost if you qualify</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-efh-teal" />
              <span>Industry certifications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-efh-teal" />
              <span>Job placement help</span>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works - Simple & Clear */}
      <section className="py-24 bg-white">
        <div className="elevate-container max-w-5xl">
          <h2 className="text-5xl font-black text-center mb-4 text-gray-900">
            It's Really This Simple
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            No complicated forms. No hidden fees. Just 3 easy steps.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-gradient-to-br from-efh-red to-efh-orange rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pick Your Path</h3>
              <p className="text-lg text-gray-600">
                Choose from truck driving, HVAC, barbering, CNA, and more
              </p>
            </div>

            <div className="text-center animate-fade-in-up animate-delay-100">
              <div className="w-24 h-24 bg-gradient-to-br from-efh-orange to-yellow-400 rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Get Trained</h3>
              <p className="text-lg text-gray-600">
                Learn from pros. Hands-on training. Industry certifications.
              </p>
            </div>

            <div className="text-center animate-fade-in-up animate-delay-200">
              <div className="w-24 h-24 bg-gradient-to-br from-efh-teal to-green-400 rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Start Working</h3>
              <p className="text-lg text-gray-600">
                We help you land the job. 85% of grads get hired within 6 months.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/enroll" 
              className="inline-block px-12 py-6 bg-gradient-to-r from-efh-red to-efh-orange text-white rounded-full text-2xl font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              Let's Go! →
            </Link>
          </div>
        </div>
      </section>
      {/* Programs - Visual and Engaging */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="elevate-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              What Do You Want To Do?
            </h2>
            <p className="text-2xl text-gray-300">
              Pick a career that actually pays the bills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/programs/truck-driving" className="group">
              <div className="bg-gradient-to-br from-efh-red to-efh-orange p-8 rounded-2xl hover:scale-105 transition-transform shadow-2xl">
                <div className="text-6xl mb-4">🚛</div>
                <h3 className="text-3xl font-bold mb-3">Truck Driving</h3>
                <p className="text-lg mb-4 opacity-90">
                  Get your CDL. Start at $50K+/year.
                </p>
                <div className="text-yellow-300 font-bold group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-tech" className="group">
              <div className="bg-gradient-to-br from-efh-teal to-green-500 p-8 rounded-2xl hover:scale-105 transition-transform shadow-2xl">
                <div className="text-6xl mb-4">❄️</div>
                <h3 className="text-3xl font-bold mb-3">HVAC Tech</h3>
                <p className="text-lg mb-4 opacity-90">
                  Fix AC, make bank. $45K+ starting.
                </p>
                <div className="text-yellow-300 font-bold group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </div>
            </Link>

            <Link href="/programs/barber" className="group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 rounded-2xl hover:scale-105 transition-transform shadow-2xl">
                <div className="text-6xl mb-4">✂️</div>
                <h3 className="text-3xl font-bold mb-3">Barbering</h3>
                <p className="text-lg mb-4 opacity-90">
                  Be your own boss. Build your clientele.
                </p>
                <div className="text-yellow-300 font-bold group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/programs" 
              className="inline-block px-10 py-4 bg-white text-gray-900 rounded-full text-xl font-bold hover:scale-105 transition-transform"
            >
              See All Programs
            </Link>
          </div>
        </div>
      </section>
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

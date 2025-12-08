import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, TrendingUp, Zap, Users, BookOpen, Award, Shield, Star, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Training | Elevate For Humanity',
  description: 'Start your barber career with free training. AI-powered learning, hands-on practice, and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber',
  },
};

export default function BarberPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Video Background */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/video-a4182256-dd84-450e-8c4d-de7b8b0fb949.mp4?Expires=2080573529&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=lkxJ9hWZ9M1zjea0hNnwr73vSnncdQu7-dlD1MpCh2xlhtymVr917riHsZRiO3Zk5Vg2iYUG6dwPeFisVcWapA-aM5F3Wd~6W8ApbMx3kxF-cpxTqgO-GxUMmPLlq8BAW1ArQ7R7Ru1KTm~Et5Uf4lCshLB~7QjHZFtVR4pzGSLBcdJG1M~3ge0eBCEaD6d4GlJ5xntHkE9ZDFS-modw2wbgLRaKGd3Fn5Rh2y32NlixNapRD-p13fGIAr2sNxrectg0UxkKczYK3ILjP8uiOZp0cYwaELx8RCsks0PVnPnbzYPonjnN4~rvA5yK5XQ3J~k-r3d-dwEAh4nLO0XV9g__" type="video/mp4" />
        </video>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>
                Barber Training Program
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)' }}>
                Start your career with 100% free training, AI-powered learning, and guaranteed job placement support
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply?program=barber"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-all hover:shadow-2xl shadow-xl"
                >
                  Apply Now - It's 100% Free
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all hover:shadow-2xl shadow-xl border-2 border-white"
                >
                  Questions? Call 317-314-3757
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">12-16 Weeks</div>
              <div className="text-sm text-slate-600">Flexible Schedule</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">100% FREE</div>
              <div className="text-sm text-slate-600">No Hidden Costs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">AI-Powered</div>
              <div className="text-sm text-slate-600">24/7 Support</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">Job Support</div>
              <div className="text-sm text-slate-600">Placement Help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Career */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Choose Barber?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">High Demand Career</div>
                    <div className="text-slate-600">Growing industry with thousands of job openings</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Good Income Potential</div>
                    <div className="text-slate-600">Competitive salary with room for growth</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">No Experience Required</div>
                    <div className="text-slate-600">We start from the basics and build your skills</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Career Stability</div>
                    <div className="text-slate-600">Essential skills that are always in demand</div>
                  </div>
                </div>
              </div>
              <Link
                href="/apply?program=barber"
                className="inline-block mt-8 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Career Today
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Barber professional at work"
                fill
                className="object-cover"
                quality={100}
              
          sizes="100vw"
        />
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Learning */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Personal AI Instructor
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Never feel stuck or alone. Get instant help, personalized guidance, and encouragement 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Available 24/7</h3>
              <p className="text-slate-600">
                Questions at 2am? Your AI instructor is always awake and ready to help you succeed
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Learning</h3>
              <p className="text-slate-600">
                Learn at your own pace with a curriculum that adapts to your needs and progress
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
              <p className="text-slate-600">
                Get immediate answers, corrections, and encouragement to keep you moving forward
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Complete Curriculum
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to become a licensed barber
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 1: Fundamentals</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Safety and sanitation</li>
                    <li>• Tools and equipment</li>
                    <li>• Client consultation</li>
                    <li>• Professional standards</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 2: Hair Cutting</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Basic cutting techniques</li>
                    <li>• Clipper work and fades</li>
                    <li>• Scissor techniques</li>
                    <li>• Style finishing</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 3: Shaving</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Straight razor techniques</li>
                    <li>• Beard trimming and shaping</li>
                    <li>• Hot towel treatments</li>
                    <li>• Facial grooming</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 4: Hair Styling</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Product knowledge</li>
                    <li>• Styling techniques</li>
                    <li>• Texture and wave patterns</li>
                    <li>• Modern trends</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 5: Business Skills</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Customer service</li>
                    <li>• Appointment management</li>
                    <li>• Marketing yourself</li>
                    <li>• Building clientele</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Module 6: Certification</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• State board preparation</li>
                    <li>• Practice exams</li>
                    <li>• Licensing requirements</li>
                    <li>• Career placement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Profile */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Learn From Industry Experts
            </h2>
            <p className="text-xl text-slate-600">
              Experienced instructors with decades of combined experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Master Barbers</h3>
              <p className="text-slate-600 mb-4">
                Learn from licensed professionals with 15+ years of experience in top barbershops
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">State Licensed</h3>
              <p className="text-slate-600 mb-4">
                All instructors are state-certified and meet the highest professional standards
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career Mentors</h3>
              <p className="text-slate-600 mb-4">
                Get guidance on building your career, finding jobs, and growing your business
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Hear from graduates who transformed their lives
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Quote className="w-10 h-10 text-orange-500 mb-4" />
              <p className="text-slate-700 mb-6 italic">
                "This program changed my life. I went from unemployed to running my own chair in just 4 months. The AI support helped me learn at my own pace."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-slate-900">Marcus Johnson</div>
                  <div className="text-sm text-slate-600">Graduate, Class of 2024</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Quote className="w-10 h-10 text-blue-500 mb-4" />
              <p className="text-slate-700 mb-6 italic">
                "I was nervous about going back to school, but the instructors made it easy. Now I'm making more money than I ever thought possible."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  DW
                </div>
                <div>
                  <div className="font-bold text-slate-900">David Williams</div>
                  <div className="text-sm text-slate-600">Graduate, Class of 2024</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Quote className="w-10 h-10 text-purple-500 mb-4" />
              <p className="text-slate-700 mb-6 italic">
                "Best decision I ever made. The free training removed all barriers, and the job placement support got me hired immediately after graduation."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  TR
                </div>
                <div>
                  <div className="font-bold text-slate-900">Tyrone Roberts</div>
                  <div className="text-sm text-slate-600">Graduate, Class of 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges and Guarantees */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Success is Guaranteed
            </h2>
            <p className="text-xl text-slate-600">
              We're committed to your success every step of the way
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">100% Free Training</h3>
              <p className="text-sm text-slate-700">
                No tuition, no hidden fees, no debt. Completely free education.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">State Accredited</h3>
              <p className="text-sm text-slate-700">
                Fully accredited program meets all state licensing requirements.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Job Placement</h3>
              <p className="text-sm text-slate-700">
                Dedicated support to help you find employment after graduation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
              <Zap className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">24/7 AI Support</h3>
              <p className="text-sm text-slate-700">
                Never feel stuck with round-the-clock AI instructor assistance.
              </p>
            </div>
          </div>
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Our Promise to You</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              If you complete the program and don't pass your state licensing exam on the first try, we'll provide additional training and support at no cost until you succeed.
            </p>
            <Link
              href="/apply?program=barber"
              className="inline-block px-10 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-xl"
            >
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-slate-600">
              Four simple steps to your new career
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply Free</h3>
              <p className="text-slate-600">
                Simple 5-minute application. No experience needed. Get accepted in 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Learn Online</h3>
              <p className="text-slate-600">
                Self-paced video lessons with AI instructor support available 24/7.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hands-On Practice</h3>
              <p className="text-slate-600">
                Real equipment and tools at local training facilities with expert supervision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600">
                Earn your credential and get job placement support to start your career.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/apply?program=barber"
              className="inline-block px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              Start Step 1 - Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Start your career"
          fill
          className="object-cover"
          quality={100}
        
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-2xl text-white mb-8">
            Join students learning barber with free training and AI support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply?program=barber"
              className="inline-block px-12 py-6 bg-orange-500 text-white text-2xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/contact"
              className="inline-block px-12 py-6 bg-white text-slate-900 text-2xl font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl"
            >
              Questions? Contact Us
            </Link>
          </div>
          <p className="text-white mt-6 text-lg">
            Application takes 5 minutes • Get started today • Call 317-314-3757
          </p>
        </div>
      </section>
    </main>
  );
}

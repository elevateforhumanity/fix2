import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, Play } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Exact ForHumanity style with animated text */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/hero/homepage.jpg"
                  alt="Workforce training students"
                  width={700}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Pioneering the future of workforce training
                <br />
                <span className="block mt-2">with Elevate℠ Programs</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Get certified and employed in weeks, not years
              </p>
              
              <Link 
                href="/programs"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all text-lg"
              >
                How It Works
              </Link>

              <div className="mt-12">
                <div className="text-4xl font-bold text-gray-900">2,547</div>
                <div className="text-gray-600">People are enrolled in Elevate programs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Program Section - Like VigorAir */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Introducing CNA Fast Track℠
            </h2>
            <p className="text-xl text-gray-600">
              The only 6-week CNA program with guaranteed job placement
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image with play button */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/media/programs/cna.jpg"
                  alt="CNA Training"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
                    <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why choose CNA Fast Track℠
              </h3>
              <p className="text-gray-600 mb-8">
                State-certified training • Real hospital experience
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/media/programs/cna.jpg"
                      alt="Quick completion"
                      width={80}
                      height={80}
                      className="rounded-2xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Designed for quick completion</h4>
                    <p className="text-gray-600">
                      Complete your certification in just 6-8 weeks with hands-on training in real medical facilities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/media/programs/cna.jpg"
                      alt="Zero cost"
                      width={80}
                      height={80}
                      className="rounded-2xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">$0 cost for most students</h4>
                    <p className="text-gray-600">
                      Most students qualify for 100% free training through WIOA, WRG, or JRI funding programs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/media/programs/cna.jpg"
                      alt="Job placement"
                      width={80}
                      height={80}
                      className="rounded-2xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Job placement guaranteed</h4>
                    <p className="text-gray-600">
                      Hospitals and nursing homes hiring immediately after graduation. We guarantee job placement assistance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/media/programs/cna.jpg"
                      alt="State certified"
                      width={80}
                      height={80}
                      className="rounded-2xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">State certification included</h4>
                    <p className="text-gray-600">
                      State exam prep and testing included. IDOH licensed program with 95% pass rate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href="/programs/cna"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming soon
            </h2>
            <p className="text-xl text-gray-600">
              Learn about other Elevate training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/programs/hvac" className="group relative rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-96">
                <Image
                  src="/media/programs/hvac.jpg"
                  alt="HVAC Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-sm font-semibold mb-2">12 weeks • $48K+ starting</div>
                  <h3 className="text-3xl font-bold mb-2">HVAC Technician</h3>
                  <p className="text-blue-200">Join the waitlist →</p>
                </div>
              </div>
            </Link>

            <Link href="/programs/barber" className="group relative rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-96">
                <Image
                  src="/media/programs/barber.jpg"
                  alt="Barber Apprenticeship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-sm font-semibold mb-2">12-18 months • DOL-Registered</div>
                  <h3 className="text-3xl font-bold mb-2">Barber Apprenticeship</h3>
                  <p className="text-blue-200">Join the waitlist →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Proprietary Technology. Uncompromising Quality.
            </h2>
            <p className="text-xl text-gray-400">
              Partner-powered training. Elevate orchestration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Advanced training system</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-bold text-white mb-2">Partner-Powered Content</h4>
                  <p className="text-sm">Credentialing partners like Milady deliver curriculum and credentials. Elevate orchestrates the journey.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Real-World Experience</h4>
                  <p className="text-sm">Train in actual hospitals, barbershops, and facilities—not just classrooms.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Key Benefit</h4>
                  <p className="text-sm">Hands-on training improves job readiness and helps you get hired faster.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Efficient by design</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-bold text-white mb-2">Fast-Track Programs</h4>
                  <p className="text-sm">Complete certifications in weeks, not years. Get to work faster.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Job Placement Support</h4>
                  <p className="text-sm">Direct connections to employers. Many students get offers before graduation.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Reduced cost burden</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-bold text-white mb-2">$0 for Most Students</h4>
                  <p className="text-sm">WIOA, WRG, and JRI funding covers full tuition for eligible students.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Compliance Built-In</h4>
                  <p className="text-sm">ETPL-approved, DOL-registered, WorkOne and EmployIndy ready.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Key Benefit</h4>
                  <p className="text-sm">No student debt. Start earning immediately after graduation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Approved, aligned, and trusted
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">DOL-Registered</h3>
              <p className="text-sm text-gray-600">Barber apprenticeship registered with U.S. Department of Labor</p>
            </div>

            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">ETPL-Approved</h3>
              <p className="text-sm text-gray-600">Eligible Training Provider List approved for WIOA funding</p>
            </div>

            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">WRG & JRI Eligible</h3>
              <p className="text-sm text-gray-600">Workforce Ready Grant and Job Ready Indiana approved</p>
            </div>

            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">State Licensed</h3>
              <p className="text-sm text-gray-600">CNA program licensed by Indiana Department of Health</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/about"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Learn more about Elevate for Humanity
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Features Bar */}
      <section className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">⚡</div>
              <div className="text-sm font-semibold text-gray-700 mt-2">100% Online Process</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">🚚</div>
              <div className="text-sm font-semibold text-gray-700 mt-2">Fast Enrollment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">⭐</div>
              <div className="text-sm font-semibold text-gray-700 mt-2">Trained in the U.S.A.</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">🇺🇸</div>
              <div className="text-sm font-semibold text-gray-700 mt-2">DOL-Regulated Programs</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

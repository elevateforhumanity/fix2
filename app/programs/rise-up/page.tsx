import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, DollarSign, ShoppingBag, ArrowRight } from "lucide-react";

export default function RiseUpPage() {
  return (
    <main className="bg-white">
      <section className="relative bg-gradient-to-r from-red-600 to-red-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">🛍️ NRF Foundation Program</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                NRF Foundation RISE Up
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-4">
                Retail & Customer Service Career Training
              </p>
              <p className="text-lg text-red-50 mb-6">
                Industry-backed training providing foundational employability skills for retail, customer service, and beyond. Get certified and job-ready.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">4-6 Weeks</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">$25K-$35K</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-semibold">NRF Certified</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now - FREE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-all border-2 border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/media/programs/multi-training-programs-optimized.jpg"
                  alt="RISE Up Retail Training"
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
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Retail Training Program
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">
            NRF Foundation RISE Up
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Industry-backed training and credentialing program providing foundational 
            employability skills to help you land jobs and get promoted in retail and beyond.
          </p>
          <div className="mt-6">
            <Link
              href="/apply"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
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
                What is RISE Up?
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                RISE Up is the National Retail Federation Foundation's training and 
                credentialing program designed to provide foundational employability 
                skills for careers in retail and customer service industries.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Through Elevate for Humanity's partnership with NRF Foundation, 
                you'll gain access to industry-recognized training that prepares 
                you for entry-level positions and career advancement.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Program Benefits
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✓</span>
                  <span>Industry-recognized certification from NRF Foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✓</span>
                  <span>Foundational employability skills training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✓</span>
                  <span>Career pathways in retail and customer service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✓</span>
                  <span>Job placement assistance and employer connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✓</span>
                  <span>Skills applicable beyond retail industry</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Training Platform Access
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Once enrolled, you'll receive access to the RISE Up platform at{" "}
              <a 
                href="https://riseup.kaleidolearning.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                riseup.kaleidolearning.com
              </a>
            </p>
            <p className="mt-3 text-sm text-slate-700">
              Your email address will be your username. After registration approval, 
              you'll receive instructions to set up your password and access the platform.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Skills You'll Learn
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Customer Service
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Professional communication, problem-solving, and customer engagement
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Workplace Readiness
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Time management, teamwork, professional conduct, and work ethic
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Career Development
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Resume building, interview skills, and career advancement strategies
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Apply now to join the NRF Foundation RISE Up program through 
              Elevate for Humanity. Our team will guide you through the enrollment 
              process and help you access the training platform.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-800 hover:border-red-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Available Credentials
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              RISE Up offers multiple credential pathways. Course duration and content 
              vary by credential. Contact us to learn more about pricing and which 
              credential is right for your career goals.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Customer Service & Sales
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  Learn professional customer engagement, sales techniques, and service excellence
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Business of Retail
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  Understand retail operations, inventory management, and business fundamentals
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Program Resources
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Webinar Recording
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Watch the RISE Up orientation webinar:{" "}
                  <a 
                    href="https://nrf.zoom.us/rec/share/qeIxdBRBDzdi2ZfUtTPEr9K5XPgygrrGQMunqn3w5n_ucqYbhyUpqMXPKus-cQ8y.VEmVggRaMlC0WwqB" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline"
                  >
                    View Recording
                  </a>
                  {" "}(Passcode: EL%1.1Ym)
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Schedule a Call
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Have questions? Schedule a one-on-one meeting with Jessica Viera, 
                  Manager of Customer Engagement:{" "}
                  <a 
                    href="https://calendly.com/jessica-viera-nrf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline"
                  >
                    Book on Calendly
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            <p>
              <strong>Support:</strong> For questions about the RISE Up platform, 
              visit the{" "}
              <a 
                href="https://support.kaleidoscopelearning.zendesk.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                Help Center
              </a>{" "}
              or contact{" "}
              <a href="mailto:riseupsupport@kaleidolearning.com" className="text-red-600 hover:underline">
                riseupsupport@kaleidolearning.com
              </a>
              {" "}or Jessica Viera directly at{" "}
              <a href="tel:+12026268113" className="text-red-600 hover:underline">
                202-626-8113
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

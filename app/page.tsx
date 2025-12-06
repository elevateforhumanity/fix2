// app/page.tsx - Avon-Inspired Modern Homepage
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Homepage Hero Banner (gradient) */}
      <section className="relative w-full">
        <Image
          src="/images/general/hero-banner-latest.png"
          alt="Elevate for Humanity gradient hero banner"
          width={1920}
          height={800}
          className="w-full h-auto object-cover"
          priority
          quality={100}
        />
      </section>

      {/* 2nd Hero Banner - Program Grid */}
      <section className="relative w-full max-w-5xl mx-auto py-10">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Program overview with four feature boxes"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
          quality={100}
        />
      </section>

      {/* FEATURED PROGRAMS - Large Product-Style Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Featured Programs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              DOL Registered Apprenticeships and State-Approved Training
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Barber Program */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image8.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Barber Apprenticeship</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    2,000-hour DOL Registered Apprenticeship. Earn while you learn with WIOA, WRG, and JRI funding.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Healthcare Program */}
            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image3.jpg"
                    alt="Healthcare Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Healthcare Training</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    CNA certification through Choice Medical Institute. State-approved with clinical placement.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image10.jpg"
                    alt="Skilled Trades"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Skilled Trades</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    HVAC, electrical, and plumbing training. Hands-on learning for high-wage careers.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Beauty & Esthetics */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image5.jpg"
                    alt="Beauty & Esthetics"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Beauty & Esthetics</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Nails, esthetics, and cosmetology with experienced instructors and modern facilities.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Support Services */}
            <Link href="/support" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image6.jpg"
                    alt="Support Services"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Support Services</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Life coaching, mental health support, and wraparound services to help you succeed.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Classroom Training */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/gallery/image11.jpg"
                    alt="Classroom Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={95}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">Classroom Training</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Modern facilities with hands-on instruction and real-world skill development.
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Image-Based Feature Blocks */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Why Choose Elevate</h2>
            <p className="text-lg text-slate-600">Built for people navigating real barriers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/gallery/image1.jpg"
                  alt="100% Fundable Programs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">100% Fundable</h3>
                <p className="text-slate-600 leading-relaxed">
                  WIOA, WRG, JRI, and ETPL approved. Most students pay $0 out of pocket.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/gallery/image2.jpg"
                  alt="DOL Registered Apprenticeships"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">DOL Registered</h3>
                <p className="text-slate-600 leading-relaxed">
                  Federally recognized apprenticeships in barber, healthcare, and skilled trades.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/learners/coaching-session.jpg"
                  alt="Wraparound Support Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Wraparound Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Life coaching, housing assistance, childcare navigation, and mental health referrals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL IMAGE SECTION - Avon Style */}
      <section className="py-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden group">
            <Image
              src="/images/artlist/hero-training-6.jpg"
              alt="Hands-On Training"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-12">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Hands-On Training</h3>
                <p className="text-white/90 mb-6 text-lg">Real-world skills with experienced instructors</p>
                <Link
                  href="/programs/barber-apprenticeship"
                  className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] overflow-hidden group">
            <Image
              src="/images/artlist/hero-training-8.jpg"
              alt="Career Services"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-12">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Career Services</h3>
                <p className="text-white/90 mb-6 text-lg">Job placement and ongoing support</p>
                <Link
                  href="/support"
                  className="inline-block px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition"
                >
                  Get Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - With Real Photos */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600">Hear from our graduates</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-10">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/images/students-new/student-1.jpg"
                    alt="J. Moore"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-900">J. Moore</p>
                  <p className="text-sm text-slate-600">Barber Apprentice</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "Elevate helped me restart my life. I went from struggling to becoming a licensed barber apprentice. They believed in me when no one else did."
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-10">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/images/students-new/student-2.jpg"
                    alt="L. Anderson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-900">L. Anderson</p>
                  <p className="text-sm text-slate-600">CNA Graduate</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "The staff is amazing. They helped me get funding, childcare support, and confidence. I'm now working in healthcare and supporting my family."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES GALLERY */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Our Facilities</h2>
            <p className="text-lg text-slate-600">Modern training spaces designed for hands-on learning</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-1.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-2.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-3.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-4.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-5.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-6.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-7.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/facilities-new/facility-8.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Bold and Clean */}
      <section className="py-24 px-6 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Funding is available. Programs fill fast. Take the first step today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/apply"
              className="px-10 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-slate-50 transition-all shadow-lg text-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/advising"
              className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-orange-600 transition-all text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>

          <div className="text-white">
            <p className="mb-2">Questions? We're here to help.</p>
            <p>
              Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or 
              email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold hover:text-white">elevateforhumanity.edu@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

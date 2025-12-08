// app/page.tsx - Avon-Inspired Modern Homepage
import Link from "next/link";
import Image from "next/image";
import { EFH_IMAGES } from "@/src/config/efhImages";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* TOP HERO - High Quality, Mobile Optimized */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* High quality hero image from Unsplash */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&q=90"
            alt="Students collaborating and learning together"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/60" />
        </div>
        
        {/* Hero Content - Mobile Optimized */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Transform Your Future
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 leading-relaxed">
                Free career training. Real opportunities. Life-changing results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/programs"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white font-bold text-center rounded-full hover:bg-orange-600 transition-all shadow-xl text-base sm:text-lg"
                >
                  Explore Programs
                </Link>
                <Link
                  href="/apply"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 font-bold text-center rounded-full hover:bg-slate-100 transition-all shadow-xl text-base sm:text-lg"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-3 sm:mb-4">Featured Programs</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              DOL Registered Apprenticeships and State-Approved Training
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Barber Program */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop&q=85"
                    alt="Professional barber training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Barber Apprenticeship</h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    2,000-hour DOL Registered Apprenticeship. Earn while you learn with WIOA, WRG, and JRI funding.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Healthcare Program */}
            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=85"
                    alt="Healthcare training and nursing"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Healthcare Training</h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    CNA certification through Choice Medical Institute. State-approved with clinical placement.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=85"
                    alt="HVAC and skilled trades training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">Skilled Trades</h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    HVAC, electrical, and plumbing training. Hands-on learning for high-wage careers.
                  </p>
                  <span className="text-sm sm:text-base text-orange-600 font-semibold group-hover:underline">
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
                    quality={100}
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
                    quality={100}
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
                    quality={100}
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



      {/* WHY CHOOSE US - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-3 sm:mb-4">Why Choose Elevate</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">Built for people navigating real barriers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop&q=85"
                  alt="100% Fundable Programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">100% Fundable</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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
              src="/images/gallery/image10.jpg"
              alt="Hands-On Training"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              quality={100}
            />
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
              src="/images/gallery/image11.jpg"
              alt="Career Services"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              quality={100}
            />
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
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/testimonials/testimonial-success-story-2.png"
                alt="Student Success Story"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                quality={100}
              />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/testimonials/testimonial-medical-assistant.png"
                alt="Medical Assistant Graduate"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY IMAGE 3 */}
      <section className="relative w-full">
        <Image
          src="/images/location-6.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
      </section>

      {/* FACILITY IMAGE 4 */}
      <section className="relative w-full">
        <Image
          src="/images/location-8.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
      </section>

      {/* FACILITY IMAGE 5 */}
      <section className="relative w-full">
        <Image
          src="/images/location-10.jpg"
          alt="Training Facility"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
        />
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
                src="/images/gallery/image3.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image4.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image5.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image7.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image9.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/gallery/image8.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg group">
              <Image
                src="/images/location-11.jpg"
                alt="Training Facility"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={100}
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

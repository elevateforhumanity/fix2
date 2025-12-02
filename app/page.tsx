'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mounted, setMounted] = useState(false);

  const banners = [
    { 
      title: "Free Training. Real Skills. A Career You Can Be Proud Of.", 
      subtitle: "Indianapolis • State-Approved & Federally Recognized Workforce Institute",
      description: "Approved for ETPL, WRG, INTraining, JRI, and U.S. DOL Registered Apprenticeships so your training is funded, legitimate, and employer-recognized.",
      image: "/media-backup-20251128-043832/hero-elevate-learners.jpg"
    },
    { 
      title: "Hands-On Training", 
      subtitle: "Learn from industry experts with real-world experience in state-of-the-art facilities",
      description: "State-approved programs that meet federal quality standards",
      image: "/media-backup-20251128-043832/state-funding-hero.jpg"
    },
    { 
      title: "Career Services That Work", 
      subtitle: "From training to placement, we support you every step of your career journey",
      description: "Workforce board approved and employer-recognized credentials",
      image: "/media-backup-20251128-043832/hero-slide-healthcare.jpg"
    }
  ];

  useEffect(() => {
    setMounted(true);

    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => {
      clearInterval(bannerTimer);
    };
  }, []);

  return (
    <main className="bg-white">


      {/* Hero Banner with Rotating Slides */}
      <section className="relative min-h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${mounted ? 'transition-opacity duration-1000' : ''} ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
            <div className="relative h-full flex items-center justify-center py-20">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                  {banner.subtitle}
                </p>
                {banner.description && (
                  <p className="text-lg md:text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                    {banner.description}
                  </p>
                )}
                <Link
                  href="/apply"
                  className="inline-block px-12 py-5 bg-white text-red-600 font-bold text-lg rounded-full hover:scale-110 transition-all shadow-2xl uppercase tracking-wide"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        {mounted && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBanner ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Program Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4">
            Program Highlights
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Real opportunities. Real training. Real careers.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Highlight 1 - Earn While You Learn */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/trades/program-hvac-technician.jpg"
                  alt="Earn While You Learn - Paid Apprenticeship"
                  fill
                  className="object-cover brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-5 right-5 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold">
                  PAID TRAINING
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-extrabold mb-4">Earn While You Learn</h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Start earning a paycheck from day one with our paid apprenticeship programs.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm">
                    Get Paid
                  </span>
                  <span className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm">
                    Gain Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Highlight 2 - 100% Free Training */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/medical-assistant/large/ma-large-02.jpg"
                  alt="100% Free Training - No Tuition"
                  fill
                  className="object-cover brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-5 right-5 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold">
                  $0 COST
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-extrabold mb-4">100% Free Training</h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Zero tuition. Zero hidden fees. Fully funded programs.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full font-semibold text-sm">
                    No Tuition
                  </span>
                  <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full font-semibold text-sm">
                    No Fees
                  </span>
                </div>
              </div>
            </div>

            {/* Highlight 3 - Government Certified */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                  alt="Government Certified Programs - Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-5 right-5 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold">
                  CERTIFIED
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-extrabold mb-4">Government Certified Programs</h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  WRG, WIOA, OJT, ETPL certified training programs approved by government agencies.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-sm">
                    WRG
                  </span>
                  <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold text-sm">
                    WIOA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/facilities-new/facility-1.jpg"
                alt="Elevate for Humanity training facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-5xl font-extrabold mb-6">Connecting People to Free Career Training</h2>
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                At Elevate for Humanity, we connect everyday people to 100% free workforce training that leads to real careers. No tuition, no debt—just direct pathways to employment through government-funded programs.
              </p>
              <p className="text-xl text-slate-700 leading-relaxed mb-8">
                Through partnerships with government agencies, training providers, and employers, we create a seamless journey from unemployment to career success. Our dedicated team guides you through eligibility, enrollment, training, and job placement.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg"
              >
                Learn More About Us
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4">
            Free Training Programs
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            100% funded through WIOA, WRG, and government programs. Start your new career today.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-extrabold text-white">{program.title}</h3>
                    <p className="text-white/90 text-lg mt-1">{program.description}</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                    {program.fullDescription}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="text-sm text-slate-500 mb-1">Duration</div>
                      <div className="text-lg font-bold text-slate-900">{program.duration}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="text-sm text-slate-500 mb-1">Avg. Salary</div>
                      <div className="text-lg font-bold text-slate-900">{program.salary}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-slate-700 mb-2">What You'll Learn:</div>
                    <ul className="space-y-1">
                      {program.skills.map((skill, i) => (
                        <li key={i} className="text-slate-600 flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={program.link}
                    className="block w-full text-center px-6 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg"
                  >
                    Learn More & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Why Choose Elevate for Humanity?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-64">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <div className="text-yellow-500 text-2xl mb-4 text-center">★★★★★</div>
                  <p className="text-slate-700 italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-center">
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-slate-500 text-sm">{testimonial.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Your Path to Success
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-3xl font-extrabold">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-white text-center mb-16">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-extrabold text-white mb-2">2500+</div>
              <p className="text-xl text-white/90 font-semibold">Graduates Placed</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-extrabold text-white mb-2">95%</div>
              <p className="text-xl text-white/90 font-semibold">Job Placement</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-extrabold text-white mb-2">50+</div>
              <p className="text-xl text-white/90 font-semibold">Career Paths</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-extrabold text-white mb-2">100+</div>
              <p className="text-xl text-white/90 font-semibold">Employer Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Our Hiring Partners
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-48">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <div className="font-bold text-xl text-white">{partner.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4">
            State-of-the-Art Facilities
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Train in modern, fully-equipped facilities designed for hands-on learning
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl">{facility.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-2xl p-6 shadow-lg group">
                <summary className="font-bold text-xl cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-red-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center mb-4">
            Connect With Us
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Follow our journey and join our community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.gradient} rounded-3xl p-8 text-center cursor-pointer hover:scale-105 transition-all duration-300 block`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-black" style={{ color: social.color }}>{social.initial}</span>
                </div>
                <h3 className="text-white text-2xl font-extrabold mb-3">{social.name}</h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">{social.description}</p>
                <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm inline-block hover:scale-110 transition-all">
                  {social.cta}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Approvals & Partners with Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            Official Approvals & Partners
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
            Elevate For Humanity operates as a state-approved, federally recognized workforce training institute under our 501(c)(3) nonprofit, Selfish Inc.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* DWD Logo */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
              <div className="relative w-full h-24 mb-4">
                <Image
                  src="/logos/dwd.svg"
                  alt="Indiana Department of Workforce Development"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-center text-sm">Indiana DWD</h3>
              <p className="text-xs text-gray-600 text-center mt-1">INTraining Approved</p>
            </div>

            {/* DOL Logo */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
              <div className="relative w-full h-24 mb-4">
                <Image
                  src="/logos/dol.svg"
                  alt="U.S. Department of Labor"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-center text-sm">U.S. DOL</h3>
              <p className="text-xs text-gray-600 text-center mt-1">Registered Apprenticeship</p>
            </div>

            {/* WorkOne Logo */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
              <div className="relative w-full h-24 mb-4">
                <Image
                  src="/logos/workone.svg"
                  alt="WorkOne Indiana"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-center text-sm">WorkOne</h3>
              <p className="text-xs text-gray-600 text-center mt-1">WIOA Partner</p>
            </div>

            {/* Placeholder for additional partner */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
              <div className="relative w-full h-24 mb-4 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-300">501(c)(3)</div>
              </div>
              <h3 className="font-bold text-center text-sm">Selfish Inc</h3>
              <p className="text-xs text-gray-600 text-center mt-1">Nonprofit Organization</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Workforce Ready Grant (WRG)</h3>
                  <p className="text-gray-600 text-sm">Approved training provider for state-funded programs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Eligible Training Provider (ETPL)</h3>
                  <p className="text-gray-600 text-sm">WIOA-approved for workforce development</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Job Ready Indy (JRI)</h3>
                  <p className="text-gray-600 text-sm">Marion County training partner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Certiport Testing Center</h3>
                  <p className="text-gray-600 text-sm">MOS, IC3, IT Specialist certifications</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Milady RISE Partner</h3>
                  <p className="text-gray-600 text-sm">Beauty & barber safety standards</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="text-green-600 text-2xl mr-3">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Federal Contractor</h3>
                  <p className="text-gray-600 text-sm">SAM.gov registered (UEI: VX2GK5S8SZH8)</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-700 text-lg max-w-4xl mx-auto mb-8">
            These approvals mean our students can access free or funded training, and our partners can trust that we meet state, federal, and industry standards.
          </p>
          
          <div className="text-center">
            <Link
              href="/approvals"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg"
            >
              View All Approvals & Credentials
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-2xl text-slate-600 mb-12">
            Apply now for 100% free training. No tuition, no debt, real jobs waiting.
          </p>
          <Link
            href="/apply"
            className="inline-block px-12 py-5 bg-red-600 text-white font-bold text-lg rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-2xl uppercase tracking-wide"
          >
            Apply Now - It's Free
          </Link>
        </div>
      </section>
    </main>
  );
}

// Data
const programs = [
  {
    title: "Healthcare",
    description: "CNA, Medical Assistant, Phlebotomy",
    fullDescription: "Launch your healthcare career with hands-on training in patient care, vital signs, medical terminology, and clinical procedures. Get certified and start working in hospitals, clinics, and care facilities.",
    duration: "4-10 weeks",
    salary: "$35K-$45K",
    link: "/programs/cna",
    color: "bg-teal-600",
    image: "/media-backup-20251128-043832/programs/cna-hd.jpg",
    skills: [
      "Patient care and vital signs monitoring",
      "Medical terminology and documentation",
      "CPR and First Aid certification",
      "Clinical procedures and safety protocols"
    ]
  },
  {
    title: "Skilled Trades",
    description: "HVAC, Electrical, Plumbing",
    fullDescription: "Master in-demand trade skills with expert instruction in HVAC systems, electrical wiring, and plumbing installation. Earn industry certifications and start a high-paying career with job security.",
    duration: "8-12 weeks",
    salary: "$45K-$65K",
    link: "/programs/hvac",
    color: "bg-orange-600",
    image: "/media-backup-20251128-043832/programs/hvac-hd.jpg",
    skills: [
      "HVAC installation and repair",
      "Electrical systems and wiring",
      "Plumbing and pipe fitting",
      "Safety codes and regulations"
    ]
  },
  {
    title: "Beauty & Wellness",
    description: "Barber, Cosmetology, Esthetics",
    fullDescription: "Build your beauty career with professional training in barbering, hair styling, skin care, and salon management. Get licensed and start your own business or work in top salons.",
    duration: "12 weeks",
    salary: "$30K-$55K",
    link: "/programs/barber",
    color: "bg-pink-600",
    image: "/media-backup-20251128-043832/programs/barber-hd.jpg",
    skills: [
      "Hair cutting and styling techniques",
      "Skin care and facial treatments",
      "Salon safety and sanitation",
      "Client consultation and business skills"
    ]
  },
  {
    title: "Transportation",
    description: "CDL, Logistics, Delivery",
    fullDescription: "Get your Commercial Driver's License and start earning immediately. Learn safe driving practices, vehicle inspection, and logistics operations. High demand with excellent pay and benefits.",
    duration: "4-6 weeks",
    salary: "$50K-$70K",
    link: "/programs/cdl",
    color: "bg-blue-600",
    image: "/media-backup-20251128-043832/programs/cdl-hd.jpg",
    skills: [
      "Commercial vehicle operation",
      "DOT safety regulations and compliance",
      "Pre-trip inspection procedures",
      "Defensive driving and road safety"
    ]
  },
];

const whyChooseUs = [
  {
    title: "Industry-Focused Curriculum",
    description: "Programs designed with employer input to teach the exact skills needed in today's job market",
    image: "/images/artlist/hero-training-5.jpg",
  },
  {
    title: "Expert Instructors",
    description: "Learn from professionals with years of real-world experience in their fields",
    image: "/images/artlist/hero-training-6.jpg",
  },
  {
    title: "Job Placement Support",
    description: "Dedicated career services team helping you find employment after graduation",
    image: "/images/heroes/career-services.jpg",
  },
  {
    title: "100% Free Training",
    description: "No tuition costs through WIOA, WRG, and government-funded programs",
    image: "/images/funding/funding-dol-program.jpg",
  },
];

const testimonials = [
  {
    name: "Marcus Johnson",
    program: "Electrical Training Graduate",
    quote: "This program changed my life. Within 2 months of graduation, I landed a great job with benefits. The instructors truly care about your success.",
    image: "/media-backup-20251128-043832/testimonials/student1.jpg",
  },
  {
    name: "Sarah Martinez",
    program: "IT Support Specialist",
    quote: "The hands-on training and career support were incredible. I went from no tech experience to landing my dream job in IT support.",
    image: "/media-backup-20251128-043832/testimonials/student2.jpg",
  },
  {
    name: "David Thompson",
    program: "Healthcare Graduate",
    quote: "Elevate for Humanity gave me the skills and confidence to start a new career. The job placement assistance was outstanding.",
    image: "/media-backup-20251128-043832/testimonials/student3.jpg",
  },
];

const steps = [
  {
    number: "1",
    title: "Apply & Enroll",
    description: "Complete a simple application and meet with our admissions team to explore your options",
    image: "/images/gallery/image6.jpg",
  },
  {
    number: "2",
    title: "Train & Learn",
    description: "Attend classes with expert instructors and gain hands-on experience in modern facilities",
    image: "/images/artlist/hero-training-7.jpg",
  },
  {
    number: "3",
    title: "Earn Certification",
    description: "Complete your program and earn industry-recognized certifications",
    image: "/images/gallery/image7.jpg",
  },
  {
    number: "4",
    title: "Launch Your Career",
    description: "Work with our career services team to find and secure your ideal job",
    image: "/images/heroes/career-services.jpg",
  },
];

const partners = [
  { icon: "🏢", name: "Major Employers", image: "/images/employers/partnership-meeting.jpg" },
  { icon: "🏭", name: "Industry Leaders", image: "/images/employers/partnership-office-meeting.jpg" },
  { icon: "🏥", name: "Healthcare Systems", image: "/images/employers/partnership-hiring-event.jpg" },
  { icon: "💻", name: "Tech Companies", image: "/images/employers/partnership-handshake.jpg" },
];

const facilities = [
  { name: "Healthcare Training Lab", image: "/images/facilities-new/facility-1.jpg" },
  { name: "HVAC Workshop", image: "/images/facilities-new/facility-2.jpg" },
  { name: "Computer Lab", image: "/images/facilities-new/facility-3.jpg" },
  { name: "Barber Training Studio", image: "/images/facilities-new/facility-4.jpg" },
  { name: "Welding Workshop", image: "/images/facilities-new/facility-5.jpg" },
  { name: "Classroom Facilities", image: "/images/facilities-new/facility-6.jpg" },
];

const faqs = [
  {
    question: "How long are the training programs?",
    answer: "Program lengths vary from 8 weeks to 12 months depending on the career path. Most programs can be completed in 3-6 months with flexible day and evening schedules available.",
  },
  {
    question: "What financial aid options are available?",
    answer: "We offer federal financial aid, state grants, scholarships, and flexible payment plans. Our financial aid team will help you explore all available options.",
  },
  {
    question: "Do I need prior experience to enroll?",
    answer: "No prior experience is required! Our programs are designed for both career changers and those new to their chosen field. We start with fundamentals and build your skills progressively.",
  },
  {
    question: "What is your job placement rate?",
    answer: "Over 95% of our graduates secure employment within 6 months of completing their program. Our career services team provides resume help, interview prep, and direct connections to employers.",
  },
  {
    question: "Can I visit the campus before enrolling?",
    answer: "Absolutely! We encourage prospective students to tour our facilities, meet instructors, and see our training equipment. Contact us to schedule your personalized campus tour.",
  },
];

const socialMedia = [
  {
    name: "Facebook",
    initial: "f",
    description: "Daily success stories and updates",
    cta: "Follow Us",
    gradient: "bg-gradient-to-br from-[#1877f2] to-[#0c63d4]",
    color: "#1877f2",
    url: "https://facebook.com/elevateforhumanity"
  },
  {
    name: "Instagram",
    initial: "IG",
    description: "Students in action and campus life",
    cta: "Follow Us",
    gradient: "bg-gradient-to-br from-[#e1306c] via-[#c13584] to-[#833ab4]",
    color: "#e1306c",
    url: "https://instagram.com/elevateforhumanity"
  },
  {
    name: "LinkedIn",
    initial: "in",
    description: "Professional networking and jobs",
    cta: "Connect",
    gradient: "bg-gradient-to-br from-[#0077b5] to-[#005885]",
    color: "#0077b5",
    url: "https://linkedin.com/company/elevateforhumanity"
  },
  {
    name: "YouTube",
    initial: "YT",
    description: "Testimonials and campus tours",
    cta: "Subscribe",
    gradient: "bg-gradient-to-br from-[#ff0000] to-[#cc0000]",
    color: "#ff0000",
    url: "https://youtube.com/@elevateforhumanity"
  },
  {
    name: "TikTok",
    initial: "TT",
    description: "Behind-the-scenes content",
    cta: "Follow Us",
    gradient: "bg-gradient-to-br from-[#000000] to-[#333333]",
    color: "#000000",
    url: "https://tiktok.com/@elevateforhumanity"
  },
];

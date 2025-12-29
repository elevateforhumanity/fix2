import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container, Section } from '@/components/layout/Container';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { FeatureCard } from '@/components/ui/FeatureCard';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Free Career Training & Apprenticeships Indiana',
  description: 'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more. Get trained, get hired, get paid. No cost, no debt.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
};

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO - Exact SkilledUS Style */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
        <Image
          src="/images/heroes/hero-homepage.jpg"
          alt="Elevate for Humanity - Free Career Training"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white uppercase tracking-wide">
              LIMITLESS OPPORTUNITIES
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              WHERE LEARNING LEADS TO EARNING!
            </h2>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center rounded-md bg-orange-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-md border-3 border-white bg-transparent px-10 py-4 text-lg font-bold text-white hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 uppercase"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAREER OPPORTUNITIES - Exact SkilledUS Style */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              CAREER OPPORTUNITIES
            </h2>
            <p className="text-lg text-gray-700">
              See our career pathways options and find the best fit for your future!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Alignment with Industry Needs</h3>
              <p className="text-gray-600 mb-6">
                Skilled US collaborates with business leaders to address current and future workforce demands.
              </p>
              <Link href="/programs" className="text-orange-500 font-semibold hover:text-orange-600">
                Learn More &gt;
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find a Location Near You</h3>
              <p className="text-gray-600 mb-6">
                Elevate for Humanity has programs in multiple locations across Indiana.
              </p>
              <Link href="/locations" className="text-orange-500 font-semibold hover:text-orange-600">
                Learn More &gt;
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hire Our Skilled Graduates</h3>
              <p className="text-gray-600 mb-6">
                Our candidates come out of our program credentialed and ready to work.
              </p>
              <Link href="/employers" className="text-orange-500 font-semibold hover:text-orange-600">
                Learn More &gt;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. PROGRAMS & PATHWAYS - Exact SkilledUS Style */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              We Have A Path For You!
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              Discover why Elevate is right for you. Take a look below at opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program Cards - SkilledUS Style */}
            <Link href="/programs#manufacturing" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-blue-500 to-blue-700">
                <Image
                  src="/images/programs/manufacturing.jpg"
                  alt="Advanced Manufacturing"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Manufacturing</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>

            <Link href="/programs#construction" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-orange-500 to-orange-700">
                <Image
                  src="/images/programs/construction.jpg"
                  alt="Building & Construction"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Building & Construction</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>

            <Link href="/programs#business" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-green-500 to-green-700">
                <Image
                  src="/images/programs/business.jpg"
                  alt="Business & IT Services"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business & IT Services</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>

            <Link href="/programs#entrepreneurship" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-purple-500 to-purple-700">
                <Image
                  src="/images/programs/entrepreneurship.jpg"
                  alt="Entrepreneurship"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Entrepreneurship</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>

            <Link href="/programs#healthcare" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-red-500 to-red-700">
                <Image
                  src="/images/programs/healthcare.jpg"
                  alt="Healthcare & Life Sciences"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Healthcare & Life Sciences</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>

            <Link href="/programs#transportation" className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="aspect-video relative bg-gradient-to-br from-yellow-500 to-yellow-700">
                <Image
                  src="/images/programs/transportation.jpg"
                  alt="Transportation & Logistics"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transportation & Logistics</h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">Learn More &gt;</p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. LOCATIONS - Exact SkilledUS Style */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Elevate is everywhere!
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Elevate is a 100% Tuition-Free Program that offers a wide array of career training options for individuals over the age of 17.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Indianapolis', href: '/locations/indianapolis' },
              { name: 'Fort Wayne', href: '/locations/fort-wayne' },
              { name: 'Evansville', href: '/locations/evansville' },
              { name: 'South Bend', href: '/locations/south-bend' },
              { name: 'Bloomington', href: '/locations/bloomington' }
            ].map((location) => (
              <Link
                key={location.name}
                href={location.href}
                className="group block text-center p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{location.name}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. TESTIMONIALS - Exact SkilledUS Style */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Thank you everyone. Thank all of you with helping me accomplish and obtaining my license. I can grow more to help create stability for myself and children.",
                name: "Barbara B.",
                link: "#"
              },
              {
                quote: "They provided an extremely informative and a hospitable environment. I really enjoyed my classes with Elevate. Thank you so much!",
                name: "Timothy S.",
                link: "#"
              },
              {
                quote: "I greatly appreciated the opportunity to receive a grant to help me move forward into a field that I have wanted to pursue for a long time. Thank You!",
                name: "William T.",
                link: "#"
              }
            ].map((testimonial, i) => (
              <Link key={i} href={testimonial.link} className="block bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-900 mb-4 leading-relaxed">
                  {testimonial.quote}
                </h3>
                <p className="text-gray-700 font-semibold">{testimonial.name}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FINAL CTA - Exact SkilledUS Style */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
              Are you ready to change your life?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto font-light">
              Elevate is here to help you reach your fullest potential. If you're ready to change your life, we are here to help!
            </p>
            <Link
              href="/enroll"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-12 py-5 text-lg font-bold text-white shadow-2xl hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
            >
              Get Started Today
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

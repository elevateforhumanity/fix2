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
      {/* 1. HERO - Text Overlay (matches SkilledUS) */}
      <section className="relative h-[450px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/images/heroes/hero-homepage.jpg"
          alt="Elevate for Humanity - Free Career Training"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />
        
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Limitless Opportunities
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                Where Learning Leads to Earning!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/enroll"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-orange-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-orange-700 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  View Programs
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* 2. CAREER OPPORTUNITIES - 3 Column Features */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Career Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See our career pathways options and find the best fit for your future!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Industry-Aligned Training"
              description="Our programs are designed with business leaders to address current and future workforce demands."
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
              title="Industry Credentials"
              description="Earn recognized certifications that employers value and that advance your career."
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="100% Tuition-Free"
              description="No cost to you. WIOA-funded programs mean you can train without debt."
            />
          </div>
        </Container>
      </Section>

      {/* 3. PROGRAMS & PATHWAYS - Grid Layout */}
      <Section background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Have A Path For You!
            </h2>
            <p className="text-lg text-gray-600">
              Discover why Elevate is right for you. Take a look below at opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProgramCard
              title="Healthcare & Life Sciences"
              description="CNA, Medical Assistant, Direct Support Professional, and more healthcare careers."
              image="/images/programs/healthcare.jpg"
              href="/programs#healthcare"
            />
            <ProgramCard
              title="Building & Construction"
              description="HVAC, Electrical, Plumbing, and construction trades with hands-on training."
              image="/images/programs/construction.jpg"
              href="/programs#construction"
            />
            <ProgramCard
              title="Business & IT Services"
              description="Customer service, office administration, and technology skills for modern workplaces."
              image="/images/programs/business.jpg"
              href="/programs#business"
            />
            <ProgramCard
              title="Transportation & Logistics"
              description="CDL training, logistics coordination, and supply chain management."
              image="/images/programs/transportation.jpg"
              href="/programs#transportation"
            />
            <ProgramCard
              title="Entrepreneurship"
              description="Start and grow your own business with training in business planning and operations."
              image="/images/programs/entrepreneurship.jpg"
              href="/programs#entrepreneurship"
            />
            <ProgramCard
              title="Advanced Manufacturing"
              description="Modern manufacturing skills including CNC, welding, and quality control."
              image="/images/programs/manufacturing.jpg"
              href="/programs#manufacturing"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange-600 px-8 py-3 text-base font-semibold text-white hover:bg-brand-orange-700 transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </Container>
      </Section>

      {/* 4. LOCATIONS */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find a Location Near You
            </h2>
            <p className="text-lg text-gray-600">
              Elevate for Humanity serves communities across Indiana
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Bloomington'].map((city) => (
              <Link
                key={city}
                href="/locations"
                className="group text-center p-6 border-2 border-gray-200 rounded-lg hover:border-brand-orange-600 hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-orange-600 transition-colors">
                  <svg className="w-8 h-8 text-brand-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{city}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. TESTIMONIALS */}
      <Section background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Hear from graduates who transformed their careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Thank you everyone. Thank all of you with helping me accomplish and obtaining my license. I can grow more to help create stability for myself and children.",
                name: "Barbara B.",
                program: "CDL Training"
              },
              {
                quote: "They provided an extremely informative and a hospitable environment. I really enjoyed my classes with Elevate. Thank you so much!",
                name: "Timothy S.",
                program: "HVAC Technician"
              },
              {
                quote: "I greatly appreciated the opportunity to receive a grant to help me move forward into a field that I have wanted to pursue for a long time.",
                name: "William T.",
                program: "Healthcare"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-brand-orange-600 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. FINAL CTA */}
      <Section background="white" className="bg-gradient-to-r from-brand-orange-600 to-brand-orange-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You Ready to Change Your Life?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Elevate is here to help you reach your fullest potential. If you're ready to change your life, we are here to help!
            </p>
            <Link
              href="/enroll"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-brand-orange-600 hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}

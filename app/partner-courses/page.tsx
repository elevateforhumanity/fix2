import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Shield,
  Heart,
  Laptop,
  ShoppingBag,
  Scissors,
  Briefcase,
  Calculator,
} from 'lucide-react';
import CheckoutButton from '@/components/drug-testing/CheckoutButton';

export const metadata: Metadata = {
  title: 'Partner Courses & Certifications | Elevate for Humanity',
  description:
    'Industry-recognized certifications from top training partners. OSHA, CPR, Microsoft, Adobe, and more.',
};

export default function PartnerCoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Partner Courses & Certifications
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Industry-recognized certifications from top training partners. Boost
            your career with credentials employers demand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✅ Lifetime Certifications
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✅ Industry Recognized
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✅ Instant Access
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✅ 40% Discount
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#osha"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Shield className="w-5 h-5 inline mr-2" />
              OSHA Safety
            </a>
            <a
              href="#healthcare"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Healthcare
            </a>
            <a
              href="#technology"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Laptop className="w-5 h-5 inline mr-2" />
              Technology
            </a>
            <a
              href="#retail"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ShoppingBag className="w-5 h-5 inline mr-2" />
              Retail
            </a>
            <a
              href="#barber"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Scissors className="w-5 h-5 inline mr-2" />
              Barber
            </a>
            <a
              href="#job-readiness"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Briefcase className="w-5 h-5 inline mr-2" />
              Job Readiness
            </a>
          </div>
        </div>
      </section>

      {/* OSHA Safety - CareerSafe */}
      <section id="osha" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-brand-orange-600" />
            <div>
              <h2 className="text-3xl font-bold">OSHA Safety Training</h2>
              <p className="text-gray-600">
                CareerSafe - OSHA Authorized Provider
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CourseCard
              name="OSHA 10-Hour General Industry"
              price={49}
              provider="CareerSafe"
              category="OSHA Safety"
              description="DOL card issued"
              popular
            />
            <CourseCard
              name="OSHA 30-Hour General Industry"
              price={119}
              provider="CareerSafe"
              category="OSHA Safety"
              description="DOL card issued"
            />
            <CourseCard
              name="OSHA 10-Hour Construction"
              price={49}
              provider="CareerSafe"
              category="OSHA Safety"
              description="DOL card issued"
              popular
            />
            <CourseCard
              name="OSHA 30-Hour Construction"
              price={119}
              provider="CareerSafe"
              category="OSHA Safety"
              description="DOL card issued"
            />
            <CourseCard
              name="Bloodborne Pathogens"
              price={35}
              provider="CareerSafe"
              category="OSHA Safety"
              description="1-year cert"
            />
            <CourseCard
              name="Forklift/Powered Industrial Truck"
              price={77}
              provider="CareerSafe"
              category="OSHA Safety"
              description="3-year cert"
            />
            <CourseCard
              name="Confined Space Entry"
              price={49}
              provider="CareerSafe"
              category="OSHA Safety"
              description="Annual recommended"
            />
            <CourseCard
              name="Lockout/Tagout (LOTO)"
              price={49}
              provider="CareerSafe"
              category="OSHA Safety"
              description="Annual recommended"
            />
            <CourseCard
              name="Fall Protection"
              price={49}
              provider="CareerSafe"
              category="OSHA Safety"
              description="Annual recommended"
            />
          </div>
        </div>
      </section>

      {/* Healthcare - HSI */}
      <section id="healthcare" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <Heart className="w-12 h-12 text-brand-orange-600" />
            <div>
              <h2 className="text-3xl font-bold">Healthcare Safety</h2>
              <p className="text-gray-600">HSI - Health & Safety Institute</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CourseCard
              name="CPR/AED (Adult, Child, Infant)"
              price={84}
              provider="HSI"
              category="Healthcare Safety"
              description="2-year cert"
              popular
            />
            <CourseCard
              name="Healthcare Provider CPR"
              price={98}
              provider="HSI"
              category="Healthcare Safety"
              description="2-year cert"
              popular
            />
            <CourseCard
              name="Basic First Aid"
              price={70}
              provider="HSI"
              category="Healthcare Safety"
              description="2-year cert"
            />
            <CourseCard
              name="Pediatric First Aid"
              price={84}
              provider="HSI"
              category="Healthcare Safety"
              description="2-year cert"
            />
            <CourseCard
              name="Bloodborne Pathogens"
              price={56}
              provider="HSI"
              category="Healthcare Safety"
              description="1-year cert"
            />
            <CourseCard
              name="CPR/AED + First Aid Combo"
              price={133}
              provider="HSI"
              category="Healthcare Safety"
              description="2-year cert"
            />
          </div>
        </div>
      </section>

      {/* Technology - Certiport */}
      <section id="technology" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <Laptop className="w-12 h-12 text-brand-blue-600" />
            <div>
              <h2 className="text-3xl font-bold">Technology Certifications</h2>
              <p className="text-gray-600">
                Certiport - Pearson VUE Authorized
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <CourseCard
              name="MOS - Word"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
            <CourseCard
              name="MOS - Excel"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
              popular
            />
            <CourseCard
              name="MOS - PowerPoint"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
            <CourseCard
              name="MOS - Outlook"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
            <CourseCard
              name="Adobe - Photoshop"
              price={168}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
            <CourseCard
              name="Adobe - Illustrator"
              price={168}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
            <CourseCard
              name="QuickBooks Certified User"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
              popular
            />
            <CourseCard
              name="IT Specialist - Python"
              price={140}
              provider="Certiport"
              category="Technology"
              description="Lifetime cert"
            />
          </div>
        </div>
      </section>

      {/* Retail - NRF */}
      <section id="retail" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <ShoppingBag className="w-12 h-12 text-purple-600" />
            <div>
              <h2 className="text-3xl font-bold">Retail & Customer Service</h2>
              <p className="text-gray-600">NRF Foundation - RISE Up Program</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            <CourseCard
              name="Customer Service & Sales"
              price={70}
              provider="NRF Foundation"
              category="Retail"
              description="Lifetime cert"
              popular
            />
            <CourseCard
              name="Business of Retail"
              price={70}
              provider="NRF Foundation"
              category="Retail"
              description="Lifetime cert"
            />
            <CourseCard
              name="NRF RISE Up Bundle"
              price={119}
              provider="NRF Foundation"
              category="Retail"
              description="Both courses"
            />
          </div>
        </div>
      </section>

      {/* Barber - Milady */}
      <section id="barber" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <Scissors className="w-12 h-12 text-pink-600" />
            <div>
              <h2 className="text-3xl font-bold">Barber Safety Program</h2>
              <p className="text-gray-600">Milady RISE - Cengage Learning</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <CourseCard
              name="Domestic Violence Awareness"
              price={42}
              provider="Milady/Cengage"
              category="Barber Training"
              description="Lifetime cert"
            />
            <CourseCard
              name="Human Trafficking Awareness"
              price={42}
              provider="Milady/Cengage"
              category="Barber Training"
              description="Lifetime cert"
            />
            <CourseCard
              name="Infection Control & Safety"
              price={42}
              provider="Milady/Cengage"
              category="Barber Training"
              description="Lifetime cert"
            />
            <CourseCard
              name="Milady RISE Complete Bundle"
              price={105}
              provider="Milady/Cengage"
              category="Barber Training"
              description="All 3 certs"
              popular
            />
          </div>
        </div>
      </section>

      {/* Job Readiness - JRI */}
      <section id="job-readiness" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4 mb-8">
            <Briefcase className="w-12 h-12 text-brand-green-600" />
            <div>
              <h2 className="text-3xl font-bold">Job Readiness Initiative</h2>
              <p className="text-gray-600">EmployIndy - JRI Program</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CourseCard
              name="Communication Skills Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="Problem Solving Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="Teamwork & Collaboration Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="Professionalism Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="Career Management Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="Digital Literacy Badge"
              price={35}
              provider="EmployIndy"
              category="Job Readiness"
              description="Lifetime badge"
            />
            <CourseCard
              name="JRI Complete Bundle (All 6)"
              price={168}
              provider="EmployIndy"
              category="Job Readiness"
              description="All badges"
              popular
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Questions About Certifications?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Call us to discuss which certifications are right for your career
            goals.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50"
          >
            Call (317) 314-3757
          </a>
        </div>
      </section>
    </main>
  );
}

function CourseCard({
  name,
  price,
  provider,
  category,
  description,
  popular,
}: {
  name: string;
  price: number;
  provider: string;
  category: string;
  description: string;
  popular?: boolean;
}) {
  return (
    <div
      className={`bg-white border-2 rounded-lg p-6 ${popular ? 'border-indigo-500' : 'border-gray-200'}`}
    >
      {popular && (
        <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
          POPULAR
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="text-2xl font-bold text-indigo-600 mb-4">${price}</div>
      <CheckoutButton
        productName={name}
        price={price}
        type="course"
        category={category}
        className="w-full text-sm"
      />
    </div>
  );
}

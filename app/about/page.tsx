import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Shield,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about',
  },
  title: 'About Us | Elevate For Humanity',
  description:
    'Building pathways. Removing barriers. Elevating people. Learn about our workforce development ecosystem.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="About Elevate For Humanity"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building pathways. Removing barriers. Elevating people.
          </h1>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto gap-1 py-2">
            <a href="#mission" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Our Mission
            </a>
            <a href="#what-we-do" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              What We Do
            </a>
            <a href="#team" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Our Team
            </a>
            <a href="#impact" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Impact
            </a>
            <Link href="/transparency" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Transparency
            </Link>
            <Link href="/blog" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Blog
            </Link>
            <a href="#contact" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Contact
            </a>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white" id="mission">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Elevate for Humanity is a workforce development ecosystem designed
              to help individuals access training, funding, employment pathways,
              and support services — especially when traditional systems feel
              fragmented or out of reach.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We operate as a workforce hub, coordinating education, employers,
              funding sources, and community partners so people don't fall
              through the cracks.
            </p>

            <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 my-8">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                We are not just a school.
                <br />
                We are not just a platform.
              </p>
              <p className="text-lg text-gray-700">
                We are a connector — aligning opportunity with people who are
                ready to move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-brand-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We help people navigate funding, not just programs
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We support individuals facing real-life barriers
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We work with employers and agencies — not around them
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-brand-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We track progress so outcomes don't get lost
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We believe access + support = success
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Focus
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Workforce training & apprenticeships
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Employer-aligned career pathways
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Justice-impacted & underserved populations
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Community-based solutions
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Long-term economic mobility
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Mission, Vision & Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-brand-blue-600 mb-4">
                Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To expand access to workforce opportunities by connecting people
                to training, funding, employment, and support services — with
                dignity, clarity, and accountability.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A future where individuals are not limited by barriers, systems
                work together, and communities thrive through sustainable
                careers.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-brand-green-600 mb-4">
                Values
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Equity:</strong> Access should not depend on privilege
                </li>
                <li>
                  <strong>Integrity:</strong> Clear expectations, honest
                  outcomes
                </li>
                <li>
                  <strong>Collaboration:</strong> Systems work better together
                </li>
                <li>
                  <strong>Accountability:</strong> Real tracking, real results
                </li>
                <li>
                  <strong>Humanity:</strong> People over processes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 text-white overflow-hidden">
        <Image
          src="/images/heroes/student-career.jpg"
          alt="Get started"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore programs or start your application today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Explore Programs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg text-lg font-bold hover:bg-blue-600 border-2 border-white transition-colors"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Elevate for Humanity was founded with a simple but powerful mission: to remove barriers and create pathways to economic opportunity for everyone.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We saw too many talented individuals held back by lack of access to training, funding, or support. Traditional systems often felt overwhelming, disconnected, or simply out of reach.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                So we built something different—a comprehensive ecosystem that brings together training programs, funding sources, career services, and community support all in one place.
              </p>
              <p className="text-lg text-gray-700">
                Today, we serve thousands of students across Indiana and beyond, partnering with employers, training providers, and workforce boards to create real opportunities for real people.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/team-new/team-1.jpg"
                alt="Our Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact by Numbers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-700">
              Real results for real people
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-black text-blue-600 mb-2">5,000+</div>
              <div className="text-lg font-semibold text-gray-900">Students Served</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-black text-green-600 mb-2">351</div>
              <div className="text-lg font-semibold text-gray-900">Training Programs</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-black text-orange-600 mb-2">85%</div>
              <div className="text-lg font-semibold text-gray-900">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl font-black text-purple-600 mb-2">$45K</div>
              <div className="text-lg font-semibold text-gray-900">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-700">
              Experienced leaders committed to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-new/team-7.jpg"
                  alt="Leadership Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Executive Leadership</h3>
                <p className="text-gray-700">
                  Decades of experience in workforce development, education, and social impact
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-new/team-13.jpg"
                  alt="Program Directors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Program Directors</h3>
                <p className="text-gray-700">
                  Industry experts who design and oversee our training programs
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-new/team-3.jpg"
                  alt="Support Staff"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Support Staff</h3>
                <p className="text-gray-700">
                  Dedicated team providing career counseling, advising, and student support
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Meet the Full Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners & Accreditation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted & Accredited
            </h2>
            <p className="text-xl text-gray-700">
              Recognized by leading organizations and agencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accreditations</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span>Indiana Department of Workforce Development (DWD) Approved</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span>WIOA Eligible Training Provider</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span>IRS Certified VITA Site</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span>Registered Apprenticeship Sponsor</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Partners</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span>EmployIndy Workforce Board</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Indiana Family and Social Services Administration (FSSA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Local Employers & Industry Partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span>Community Colleges & Training Providers</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/accreditation"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
            >
              View Full Accreditation Details
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

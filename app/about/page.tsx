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
          src="/images/gallery/image8.jpg"
          alt="About Elevate For Humanity"
          fill
          className="object-cover brightness-50"
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

      {/* Main Content */}
      <section className="py-16 bg-white">
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
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Workforce training & apprenticeships
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Employer-aligned career pathways
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Justice-impacted & underserved populations
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Community-based solutions
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
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
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
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
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg text-lg font-bold hover:bg-blue-900 border-2 border-white transition-colors"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

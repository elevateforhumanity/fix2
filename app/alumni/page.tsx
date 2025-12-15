import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Briefcase, TrendingUp, Heart } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/alumni',
  },
  title: 'Alumni Network | Elevate For Humanity',
  description:
    'Join our thriving alumni community. Connect with graduates, access exclusive opportunities, and continue your professional growth.',
};

export default async function AlumniPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/heroes/alumni.jpg"
          alt="Alumni Network"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Once Elevate, Always Elevate
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Your graduation is just the beginning. Stay connected, keep growing,
            and give back to the community that helped you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Join Alumni Network
            </Link>
            <Link
              href="/success-stories"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                2,500+
              </div>
              <div className="text-gray-600">Alumni Nationwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Employed in Field</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                $45K
              </div>
              <div className="text-gray-600">Average Starting Salary</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Alumni Benefits
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Your relationship with Elevate doesn't end at graduation. We're
              committed to your long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Networking Events
              </h3>
              <p className="text-gray-600">
                Connect with fellow alumni, industry professionals, and
                potential employers at exclusive events.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Job Board Access
              </h3>
              <p className="text-gray-600">
                Get first access to job postings from our employer partners
                actively seeking Elevate graduates.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Continuing Education
              </h3>
              <p className="text-gray-600">
                Access free workshops, webinars, and advanced training to keep
                your skills current.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Mentorship Program
              </h3>
              <p className="text-gray-600">
                Give back by mentoring current students or receive guidance from
                experienced alumni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Alumni Success Stories
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Real graduates, real careers, real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/heroes/success-story-1.jpg"
                  alt="Success Story"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  From Unemployed to Healthcare Hero
                </h3>
                <p className="text-gray-600 mb-4">
                  "Elevate gave me the skills and confidence to start a new
                  career in healthcare. Now I'm a CNA making a difference every
                  day."
                </p>
                <Link
                  href="/success-stories"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/heroes/success-story-2.jpg"
                  alt="Success Story"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Building a Better Future
                </h3>
                <p className="text-gray-600 mb-4">
                  "After completing the HVAC program, I landed a job with great
                  benefits. I can finally provide for my family."
                </p>
                <Link
                  href="/success-stories"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/heroes/success-story-3.jpg"
                  alt="Success Story"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Second Chances Work
                </h3>
                <p className="text-gray-600 mb-4">
                  "The reentry program helped me rebuild my life. I'm now a
                  certified welder with a stable career and a bright future."
                </p>
                <Link
                  href="/success-stories"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/success-stories"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View All Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Give Back to the Community
              </h2>
              <p className="text-base md:text-lg mb-6 text-blue-100">
                Your success story can inspire the next generation of Elevate
                learners. Share your experience, mentor a student, or speak at
                an event.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-200 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Mentor current students in your field</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-200 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Share your success story to inspire others</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-200 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Speak at orientation or graduation events</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-200 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Help with job referrals and networking</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Involved
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/gallery/image3.jpg"
                alt="Alumni Giving Back"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            Stay Connected
          </h2>
          <p className="text-base md:text-lg mb-8 text-gray-600">
            Update your contact information, share your career milestones, and
            stay engaged with the Elevate community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Update Your Info
            </Link>
            <Link
              href="/success-stories"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

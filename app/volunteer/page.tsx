import { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

import Link from 'next/link';

import {
  Heart,
  Users,
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer Opportunities | Elevate for Humanity',
  description:
    'Make a difference in your community. Volunteer as a mentor, tutor, guest speaker, or event support. Flexible opportunities available.',
};

const volunteerOpportunities = [
  {
    id: 1,
    title: 'Career Mentor',
    icon: Briefcase,
    commitment: 'Ongoing - 2-4 hours/month',
    description:
      'Guide students through their career journey. Share your professional experience, provide advice, and help students navigate their new careers.',
    requirements: [
      '3+ years professional experience',
      'Passion for helping others succeed',
      'Reliable and committed',
      'Background check required',
    ],
    impact:
      'Mentored students are 40% more likely to stay employed after 1 year',
  },
  {
    id: 2,
    title: 'Tutor / Teaching Assistant',
    icon: BookOpen,
    commitment: 'Flexible - 2-6 hours/week',
    description:
      'Help students master course material. Provide one-on-one tutoring, assist in classrooms, or lead study groups in your area of expertise.',
    requirements: [
      'Expertise in HVAC, healthcare, CDL, or related field',
      'Patient and encouraging teaching style',
      'Available during class hours (varies by program)',
      'Background check required',
    ],
    impact: 'Students with tutoring support have 25% higher completion rates',
  },
  {
    id: 3,
    title: 'Guest Speaker / Industry Professional',
    icon: Users,
    commitment: 'One-time - 1-2 hours',
    description:
      'Share your industry insights with students. Speak about your career path, industry trends, or specific skills. Virtual or in-person options available.',
    requirements: [
      'Professional experience in relevant field',
      'Engaging presentation skills',
      'Willingness to answer student questions',
      'No background check required',
    ],
    impact: 'Guest speakers inspire students and provide real-world context',
  },
  {
    id: 4,
    title: 'Event Support Volunteer',
    icon: Calendar,
    commitment: 'Flexible - 3-4 hours per event',
    description:
      'Help with hiring events, open houses, graduations, and workshops. Greet guests, assist with registration, set up/tear down, and support event logistics.',
    requirements: [
      'Friendly and professional demeanor',
      'Reliable and punctual',
      'Able to stand/walk for extended periods',
      'No background check required',
    ],
    impact:
      'Events connect 100+ students with employers and resources each quarter',
  },
  {
    id: 5,
    title: 'Resume & Interview Coach',
    icon: Award,
    commitment: 'Flexible - 2-4 hours/month',
    description:
      'Help students create professional resumes and practice interviewing. Conduct mock interviews, provide feedback, and boost student confidence.',
    requirements: [
      'HR or hiring experience preferred',
      'Strong communication skills',
      'Constructive feedback approach',
      'Background check required',
    ],
    impact: 'Coached students receive 60% more interview callbacks',
  },
  {
    id: 6,
    title: 'Administrative Support',
    icon: Heart,
    commitment: 'Flexible - 4-8 hours/week',
    description:
      'Support our team with office tasks, data entry, phone calls, filing, and general administrative duties. Great for retirees or those with flexible schedules.',
    requirements: [
      'Basic computer skills',
      'Attention to detail',
      'Professional phone manner',
      'Background check required',
    ],
    impact: 'Administrative support allows staff to focus on student success',
  },
];

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold">Make a Difference</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Volunteer with Us
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed">
              Help transform lives through education and career training.
              Flexible opportunities for professionals, retirees, and community
              members.
            </p>
            <Link
              href="#opportunities"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
            >
              View Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-sm text-slate-600">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                5,000+
              </div>
              <div className="text-sm text-slate-600">
                Volunteer Hours (2024)
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                800+
              </div>
              <div className="text-sm text-slate-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-sm text-slate-600">
                Would Volunteer Again
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Volunteer with Us?
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Your time and expertise can change lives. Here&apos;s what our
              volunteers say:
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Make Real Impact</h3>
              <p className="text-slate-600">
                See the direct results of your efforts as students transform
                their lives and launch new careers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Build Community</h3>
              <p className="text-slate-600">
                Connect with like-minded professionals and community members who
                share your passion for service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Flexible Commitment</h3>
              <p className="text-slate-600">
                Choose opportunities that fit your schedule, from one-time
                events to ongoing mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="opportunities" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Volunteer Opportunities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {volunteerOpportunities.map((opportunity) => {
                const Icon = opportunity.icon;
                return (
                  <div
                    key={opportunity.id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">
                          {opportunity.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>{opportunity.commitment}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {opportunity.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">
                        Requirements:
                      </h4>
                      <ul className="space-y-1">
                        {opportunity.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-900">
                        <strong>Impact:</strong> {opportunity.impact}
                      </p>
                    </div>
                    <Link
                      href="#apply"
                      className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                    >
                      Apply for This Role
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What Our Volunteers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;Mentoring students has been one of the most rewarding
                  experiences of my career. Seeing them succeed makes every hour
                  worth it.&quot;
                </p>
                <div className="font-bold">— Jennifer Martinez</div>
                <div className="text-sm text-slate-600">
                  Career Mentor, 2 years
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;As a retired teacher, volunteering here keeps me
                  connected to education while making a real difference in adult
                  learners&apos; lives.&quot;
                </p>
                <div className="font-bold">— Robert Chen</div>
                <div className="text-sm text-slate-600">Tutor, 3 years</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;I volunteer at hiring events quarterly. It&apos;s
                  amazing to see students land jobs and start their careers.
                  Very fulfilling!&quot;
                </p>
                <div className="font-bold">— Lisa Anderson</div>
                <div className="text-sm text-slate-600">
                  Event Volunteer, 1 year
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Apply to Volunteer
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Fill out the form below and we&apos;ll be in touch within 48
                hours
              </p>
            </div>
            <form className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Volunteer Opportunity *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an opportunity</option>
                  {volunteerOpportunities.map((opp) => (
                    <option key={opp.id} value={opp.title}>
                      {opp.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Availability
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your availability (days, times, frequency)..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Why do you want to volunteer? *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your motivation and what you hope to contribute..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  rows={4}
                  placeholder="Share any relevant professional or volunteer experience..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Questions About Volunteering?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Contact our Volunteer Coordinator to learn more about
              opportunities and how you can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:317-314-3757"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
              >
                Call: 317-314-3757
              </a>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/20 transition"
              >
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

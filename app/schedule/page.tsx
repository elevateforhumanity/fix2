import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/schedule",
  },
  title: 'Schedule a Meeting | Book Appointment | Elevate For Humanity',
  description: 'Schedule a meeting with our team via Microsoft Teams or Zoom. Book appointments for admissions, career counseling, program information, and more.',
};

const meetingTypes = [
  {
    title: 'Admissions Consultation',
    duration: '30 minutes',
    description: 'Learn about our programs, admission requirements, and how to get started',
    icon: '🎓',
    platforms: ['Teams', 'Zoom', 'Phone'],
    link: '/schedule/admissions'
  },
  {
    title: 'Career Counseling',
    duration: '45 minutes',
    description: 'Discuss your career goals and find the right training program for you',
    icon: '💼',
    platforms: ['Teams', 'Zoom', 'In-Person'],
    link: '/schedule/career-counseling'
  },
  {
    title: 'Program Information Session',
    duration: '20 minutes',
    description: 'Quick overview of specific training programs and certifications',
    icon: '📚',
    platforms: ['Teams', 'Zoom'],
    link: '/schedule/program-info'
  },
  {
    title: 'Financial Aid Consultation',
    duration: '30 minutes',
    description: 'Learn about grants, funding options, and how to pay for training',
    icon: '💰',
    platforms: ['Teams', 'Zoom', 'Phone'],
    link: '/schedule/financial-aid'
  },
  {
    title: 'Tax Services Appointment',
    duration: '60 minutes',
    description: 'Schedule tax preparation or VITA services',
    icon: '📋',
    platforms: ['Teams', 'Zoom', 'In-Person'],
    link: '/schedule/tax-services'
  },
  {
    title: 'Employer Partnership Meeting',
    duration: '45 minutes',
    description: 'Discuss hiring partnerships and workforce development',
    icon: '🤝',
    platforms: ['Teams', 'Zoom', 'In-Person'],
    link: '/schedule/employer'
  },
  {
    title: 'Program Holder Meeting',
    duration: '30 minutes',
    description: 'For training providers and program holders',
    icon: '🏢',
    platforms: ['Teams', 'Zoom'],
    link: '/schedule/program-holder'
  },
  {
    title: 'General Inquiry',
    duration: '15 minutes',
    description: 'Quick questions or general information',
    icon: '💬',
    platforms: ['Teams', 'Zoom', 'Phone'],
    link: '/schedule/general'
  }
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Schedule a Meeting"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Schedule a Meeting
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Book an appointment with our team via Microsoft Teams, Zoom, phone, or in-person
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Microsoft Teams
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Zoom
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Phone
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              In-Person
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Meeting Type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meetingTypes.map((meeting) => (
                <div
                  key={meeting.title}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition"
                >
                  <div className="text-5xl mb-4">{meeting.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{meeting.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{meeting.duration}</p>
                  <p className="text-gray-600 mb-4 text-sm">{meeting.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Available via:</p>
                    <div className="flex flex-wrap gap-2">
                      {meeting.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={meeting.link}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-3 rounded-lg font-semibold transition"
                  >
                    Schedule Now →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Integration Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Easy Online Scheduling</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📅</span>
                </div>
                <h3 className="text-xl font-bold mb-3">1. Choose Your Time</h3>
                <p className="text-gray-600">
                  Select a convenient date and time from our available slots
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-3">2. Select Platform</h3>
                <p className="text-gray-600">
                  Choose Microsoft Teams, Zoom, phone, or in-person meeting
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-bold mb-3">3. Get Confirmation</h3>
                <p className="text-gray-600">
                  Receive instant confirmation with meeting link and calendar invite
                </p>
              </div>
            </div>

            {/* Embedded Calendar Placeholder */}
            <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Interactive Calendar</h3>
                <p className="text-gray-600 mb-6">
                  Our booking calendar will appear here. Select a meeting type above to view available times.
                </p>
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <p className="text-sm text-gray-500 mb-4">Calendar Integration Options:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="font-semibold mb-2">Microsoft Bookings</p>
                      <p className="text-xs text-gray-600">Integrated with Teams</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="font-semibold mb-2">Calendly</p>
                      <p className="text-xs text-gray-600">Zoom integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Connect</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-3">Speak with our team directly</p>
                <a
                  href="tel:+13175551234"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  (317) 555-1234
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-3">Send us your questions</p>
                <a
                  href="mailto:info@elevateforhumanity.org"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  info@elevateforhumanity.org
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Chat with us online</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Scheduling FAQs</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-2">How do I join a Teams or Zoom meeting?</h3>
                <p className="text-gray-600">
                  After booking, you'll receive an email with a meeting link. Simply click the link at your scheduled time to join. No account required for Zoom; Teams works best with a Microsoft account.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-2">Can I reschedule my appointment?</h3>
                <p className="text-gray-600">
                  Yes! Use the link in your confirmation email to reschedule or cancel. Please give us at least 24 hours notice if possible.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-2">What if I miss my scheduled meeting?</h3>
                <p className="text-gray-600">
                  No problem! Simply schedule another appointment. We understand things come up.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-bold mb-2">Do you offer evening or weekend appointments?</h3>
                <p className="text-gray-600">
                  Yes! We offer flexible scheduling including evenings and some weekend slots to accommodate working adults.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-bold mb-2">Is there a cost for consultations?</h3>
                <p className="text-gray-600">
                  No! All initial consultations and information sessions are completely free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16    text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule your free consultation today and take the first step toward a better career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule/admissions"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Schedule Admissions Call
              </Link>
              <Link
                href="/apply"
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 text-lg shadow-2xl transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

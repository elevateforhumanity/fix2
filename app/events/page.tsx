import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Video,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Workshops | Elevate for Humanity',
  description:
    'Join us for information sessions, hiring events, workshops, and open houses. Free career training events in Indianapolis.',
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Monthly Information Session',
    date: '2025-01-14',
    time: '6:00 PM - 7:30 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Info Session',
    description:
      'Learn about our free training programs, funding options, and how to get started. Meet our staff, tour the facility, and get your questions answered.',
    capacity: '50 seats',
    registration: '/contact',
    virtual: false,
  },
  {
    id: 2,
    title: 'Quarterly Hiring Event',
    date: '2025-01-16',
    time: '10:00 AM - 2:00 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Hiring Event',
    description:
      'Meet with 20+ local employers hiring for healthcare, transportation, skilled trades, and more. Bring your resume and dress professionally. On-site interviews available.',
    capacity: '100+ attendees',
    registration: '/employers#contact',
    virtual: false,
  },
  {
    id: 3,
    title: 'CNA Program Orientation',
    date: '2025-01-21',
    time: '5:30 PM - 6:30 PM',
    location: 'Virtual (Zoom)',
    address: 'Online',
    type: 'Program Orientation',
    description:
      'Interested in becoming a Certified Nursing Assistant? Join us for a virtual orientation to learn about the 6-week CNA program, certification requirements, and job opportunities.',
    capacity: 'Unlimited',
    registration: '/programs/cna',
    virtual: true,
  },
  {
    id: 4,
    title: 'Resume Writing Workshop',
    date: '2025-01-23',
    time: '2:00 PM - 4:00 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Workshop',
    description:
      'Free workshop on creating a professional resume that gets results. Bring your laptop and leave with a polished resume ready to send to employers.',
    capacity: '25 seats',
    registration: '/contact',
    virtual: false,
  },
  {
    id: 5,
    title: 'CDL Information Session',
    date: '2025-01-28',
    time: '6:00 PM - 7:00 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Info Session',
    description:
      'Learn about our CDL training program. Meet instructors, see the trucks, and learn how to get your Class A license in just 6 weeks with 100% funding available.',
    capacity: '30 seats',
    registration: '/programs/cdl',
    virtual: false,
  },
  {
    id: 6,
    title: 'Interview Skills Workshop',
    date: '2025-02-06',
    time: '3:00 PM - 5:00 PM',
    location: 'Virtual (Zoom)',
    address: 'Online',
    type: 'Workshop',
    description:
      'Master the art of interviewing. Learn how to answer common questions, present yourself professionally, and follow up effectively. Includes mock interviews.',
    capacity: 'Unlimited',
    registration: '/contact',
    virtual: true,
  },
  {
    id: 7,
    title: 'Open House - All Programs',
    date: '2025-02-11',
    time: '4:00 PM - 7:00 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Open House',
    description:
      'Tour our facility, meet instructors from all programs, and learn about free training opportunities. Refreshments provided. Bring the family!',
    capacity: '100+ attendees',
    registration: '/contact',
    virtual: false,
  },
  {
    id: 8,
    title: 'Financial Literacy Workshop',
    date: '2025-02-13',
    time: '6:00 PM - 7:30 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Workshop',
    description:
      'Learn budgeting basics, how to build credit, and financial planning for your new career. Free workshop for students and community members.',
    capacity: '40 seats',
    registration: '/contact',
    virtual: false,
  },
  {
    id: 9,
    title: 'Employer Partnership Breakfast',
    date: '2025-02-18',
    time: '8:00 AM - 10:00 AM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Employer Event',
    description:
      'For employers only. Learn how to partner with us for hiring, tax incentives (WOTC), and customized training programs. Breakfast provided.',
    capacity: '50 seats',
    registration: '/employers#contact',
    virtual: false,
  },
  {
    id: 10,
    title: 'Graduation Ceremony - Winter 2025',
    date: '2025-02-27',
    time: '6:00 PM - 8:00 PM',
    location: 'Elevate for Humanity Training Center',
    address: '8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240',
    type: 'Graduation',
    description:
      'Celebrate our winter graduates! Family and friends welcome. Light refreshments. RSVP required for graduates and guests.',
    capacity: '200 attendees',
    registration: '/contact',
    virtual: false,
  },
];

const eventTypeColors = {
  'Info Session': 'bg-blue-100 text-blue-700',
  'Hiring Event': 'bg-green-100 text-green-700',
  'Program Orientation': 'bg-purple-100 text-purple-700',
  Workshop: 'bg-orange-100 text-orange-700',
  'Open House': 'bg-pink-100 text-pink-700',
  'Employer Event': 'bg-indigo-100 text-indigo-700',
  Graduation: 'bg-red-100 text-red-700',
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold">Upcoming Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Events & Workshops
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Join us for free information sessions, hiring events, workshops,
              and open houses. All events are free and open to the community.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-slate-600">
                All events are free. Registration recommended but not required
                for most events.
              </p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Box */}
                    <div className="flex-shrink-0">
                      <div className="bg-blue-600 text-white rounded-lg p-4 text-center w-24">
                        <div className="text-3xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm uppercase">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                          })}
                        </div>
                        <div className="text-xs">
                          {new Date(event.date).getFullYear()}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-slate-900 flex-1">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            eventTypeColors[
                              event.type as keyof typeof eventTypeColors
                            ]
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-5 h-5 text-slate-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-600">
                          {event.virtual ? (
                            <Video className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-semibold">
                              {event.location}
                            </div>
                            {event.address !== 'Online' && (
                              <div className="text-sm">{event.address}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-5 h-5 text-slate-400" />
                          <span>{event.capacity}</span>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <Link
                        href={event.registration}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                      >
                        Register Now
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recurring Events */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Recurring Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Monthly Info Sessions
                </h3>
                <p className="text-slate-600 mb-4">
                  Second Tuesday of every month, 6:00 PM - 7:30 PM. Learn about
                  all our programs and funding options.
                </p>
                <Link
                  href="/contact"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Register →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Quarterly Hiring Events
                </h3>
                <p className="text-slate-600 mb-4">
                  Third Thursday of Jan, Apr, Jul, Oct. Meet 20+ employers
                  hiring our graduates.
                </p>
                <Link
                  href="/employers"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Weekly Open Hours</h3>
                <p className="text-slate-600 mb-4">
                  Every Wednesday, 4:00 PM - 6:00 PM. Drop in for questions,
                  tours, or to start your application.
                </p>
                <Link
                  href="/contact"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Visit Us →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Graduation Ceremonies
                </h3>
                <p className="text-slate-600 mb-4">
                  End of each quarter (Mar, Jun, Sep, Dec). Celebrate our
                  graduates and their achievements!
                </p>
                <Link
                  href="/success-stories"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Success Stories →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can&apos;t Make an Event?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us anytime to schedule a personal tour or phone
              consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-50 transition shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

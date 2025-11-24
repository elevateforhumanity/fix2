import Link from 'next/link';
import { Video, Calendar, Users, Clock } from 'lucide-react';

const webinars = [
  {
    id: 1,
    title: 'How to Get FREE Career Training',
    date: 'December 5, 2024',
    time: '6:00 PM EST',
    duration: '45 minutes',
    attendees: 45,
    description: 'Learn about WIOA, WRG, and JRI funding options.'
  },
  {
    id: 2,
    title: 'HVAC Career Opportunities in Indianapolis',
    date: 'December 12, 2024',
    time: '7:00 PM EST',
    duration: '60 minutes',
    attendees: 32,
    description: 'Explore high-paying HVAC careers and our apprenticeship program.'
  }
];

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Video className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Upcoming Webinars</h1>
          <p className="text-xl text-indigo-50">Free info sessions about our programs</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{webinar.title}</h2>
              <p className="text-slate-700 mb-4">{webinar.description}</p>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Calendar size={16} />{webinar.date}</span>
                <span className="flex items-center gap-1"><Clock size={16} />{webinar.time}</span>
                <span className="flex items-center gap-1"><Users size={16} />{webinar.attendees} registered</span>
              </div>
              <Link href={`/webinars/${webinar.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                Register Now - FREE
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

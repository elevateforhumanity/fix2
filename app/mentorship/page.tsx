import { Users, Target, MessageCircle, Calendar } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior HVAC Technician',
    company: 'Carrier Corporation',
    expertise: 'HVAC, Apprenticeships',
    availability: 'Available'
  },
  {
    id: 2,
    name: 'Michael Davis',
    title: 'Healthcare Administrator',
    company: 'Community Health Network',
    expertise: 'CNA, Healthcare Careers',
    availability: 'Available'
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    title: 'Master Barber & Shop Owner',
    company: 'Elite Cuts Barbershop',
    expertise: 'Barbering, Entrepreneurship',
    availability: 'Limited'
  }
];

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Users className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Mentorship Program</h1>
          <p className="text-xl text-purple-50">Connect with industry professionals</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Target className="mx-auto mb-3 text-purple-600" size={40} />
              <h3 className="font-semibold text-slate-900 mb-2">1. Choose Your Mentor</h3>
              <p className="text-sm text-slate-600">Browse mentors in your field</p>
            </div>
            <div className="text-center">
              <MessageCircle className="mx-auto mb-3 text-blue-600" size={40} />
              <h3 className="font-semibold text-slate-900 mb-2">2. Connect</h3>
              <p className="text-sm text-slate-600">Send a connection request</p>
            </div>
            <div className="text-center">
              <Calendar className="mx-auto mb-3 text-green-600" size={40} />
              <h3 className="font-semibold text-slate-900 mb-2">3. Schedule Sessions</h3>
              <p className="text-sm text-slate-600">Meet regularly for guidance</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Mentors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{mentor.name}</h3>
              <p className="text-sm text-slate-600 mb-1">{mentor.title}</p>
              <p className="text-sm text-slate-500 mb-3">{mentor.company}</p>
              <div className="mb-4">
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {mentor.expertise}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${mentor.availability === 'Available' ? 'text-green-600' : 'text-orange-600'}`}>
                  {mentor.availability}
                </span>
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg font-semibold hover:bg-purple-700 transition">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

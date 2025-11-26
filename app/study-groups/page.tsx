import { Users, BookOpen, Calendar, MapPin } from 'lucide-react';

const studyGroups = [
  {
    id: 1,
    name: 'HVAC Fundamentals Study Group',
    course: 'HVAC Technician Program',
    members: 8,
    maxMembers: 12,
    schedule: 'Tuesdays & Thursdays, 6:00 PM',
    location: 'Online (Zoom)',
    nextSession: 'December 5, 2024'
  },
  {
    id: 2,
    name: 'CNA Exam Prep Group',
    course: 'Certified Nursing Assistant',
    members: 10,
    maxMembers: 15,
    schedule: 'Mondays & Wednesdays, 7:00 PM',
    location: 'Online (Zoom)',
    nextSession: 'December 4, 2024'
  },
  {
    id: 3,
    name: 'Barbering Techniques Workshop',
    course: 'Licensed Barber Program',
    members: 6,
    maxMembers: 10,
    schedule: 'Saturdays, 10:00 AM',
    location: 'In-Person - Indianapolis Campus',
    nextSession: 'December 7, 2024'
  },
  {
    id: 4,
    name: 'CDL Practice Test Group',
    course: 'Commercial Driver License',
    members: 12,
    maxMembers: 15,
    schedule: 'Fridays, 5:00 PM',
    location: 'Online (Zoom)',
    nextSession: 'December 6, 2024'
  }
];

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Users className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Study Groups</h1>
          <p className="text-xl text-blue-50">Learn together, succeed together</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Join a Study Group?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <BookOpen className="mb-3 text-brandPrimary" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Collaborative Learning</h3>
              <p className="text-sm text-slate-600">Share knowledge and learn from peers</p>
            </div>
            <div>
              <Calendar className="mb-3 text-green-600" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Stay Accountable</h3>
              <p className="text-sm text-slate-600">Regular sessions keep you on track</p>
            </div>
            <div>
              <Users className="mb-3 text-purple-600" size={32} />
              <h3 className="font-semibold text-slate-900 mb-2">Build Connections</h3>
              <p className="text-sm text-slate-600">Network with fellow students</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Active Study Groups</h2>
          <button className="px-6 py-2 bg-brandPrimary text-white rounded-lg font-semibold hover:bg-brandPrimaryDark transition">
            Create New Group
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studyGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{group.name}</h3>
              <p className="text-sm text-brandPrimary font-semibold mb-4">{group.course}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Users className="mr-2" size={16} />
                  <span>{group.members}/{group.maxMembers} members</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="mr-2" size={16} />
                  <span>{group.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="mr-2" size={16} />
                  <span>{group.location}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-slate-500 mb-1">Next Session</p>
                <p className="text-sm font-semibold text-slate-900">{group.nextSession}</p>
              </div>

              <button className="w-full px-4 py-2 bg-brandPrimary text-white rounded-lg font-semibold hover:bg-brandPrimaryDark transition">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

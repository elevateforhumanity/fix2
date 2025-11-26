import { Trophy, Award, Star, TrendingUp } from 'lucide-react';

const topStudents = [
  {
    rank: 1,
    name: 'Marcus Thompson',
    program: 'HVAC Technician',
    points: 2850,
    badges: 12,
    coursesCompleted: 8
  },
  {
    rank: 2,
    name: 'Jessica Williams',
    program: 'Certified Nursing Assistant',
    points: 2720,
    badges: 11,
    coursesCompleted: 7
  },
  {
    rank: 3,
    name: 'David Chen',
    program: 'Licensed Barber',
    points: 2650,
    badges: 10,
    coursesCompleted: 7
  },
  {
    rank: 4,
    name: 'Ashley Rodriguez',
    program: 'Medical Assistant',
    points: 2480,
    badges: 9,
    coursesCompleted: 6
  },
  {
    rank: 5,
    name: 'James Patterson',
    program: 'CDL Training',
    points: 2350,
    badges: 9,
    coursesCompleted: 6
  },
  {
    rank: 6,
    name: 'Maria Garcia',
    program: 'Phlebotomy Technician',
    points: 2280,
    badges: 8,
    coursesCompleted: 5
  },
  {
    rank: 7,
    name: 'Robert Johnson',
    program: 'Building Maintenance',
    points: 2150,
    badges: 8,
    coursesCompleted: 5
  },
  {
    rank: 8,
    name: 'Emily Davis',
    program: 'Culinary Arts',
    points: 2080,
    badges: 7,
    coursesCompleted: 5
  }
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Trophy className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-xl text-yellow-50">Top performing students this month</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <Star className="mx-auto mb-3 text-yellow-500" size={40} />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Total Points</h3>
            <p className="text-3xl font-bold text-slate-900">18,610</p>
            <p className="text-sm text-slate-600">Earned by top 8 students</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Award className="mx-auto mb-3 text-blue-500" size={40} />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Badges Earned</h3>
            <p className="text-3xl font-bold text-slate-900">74</p>
            <p className="text-sm text-slate-600">Achievements unlocked</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <TrendingUp className="mx-auto mb-3 text-green-500" size={40} />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Courses Completed</h3>
            <p className="text-3xl font-bold text-slate-900">49</p>
            <p className="text-sm text-slate-600">Total completions</p>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Program</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Points</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Badges</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topStudents.map((student) => (
                  <tr key={student.rank} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {student.rank === 1 && <Trophy className="text-yellow-500 mr-2" size={20} />}
                        {student.rank === 2 && <Trophy className="text-slate-400 mr-2" size={20} />}
                        {student.rank === 3 && <Trophy className="text-orange-600 mr-2" size={20} />}
                        <span className="text-lg font-bold text-slate-900">#{student.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{student.program}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-brandPrimary">{student.points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                        {student.badges}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        {student.coursesCompleted}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">How to Earn Points</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Complete a lesson: <span className="font-semibold">50 points</span></li>
            <li>• Pass a quiz: <span className="font-semibold">100 points</span></li>
            <li>• Finish a course: <span className="font-semibold">500 points</span></li>
            <li>• Earn a badge: <span className="font-semibold">200 points</span></li>
            <li>• Help a peer (forum): <span className="font-semibold">25 points</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

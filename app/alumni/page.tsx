import { GraduationCap, Users, Briefcase, Award } from 'lucide-react';

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GraduationCap className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Alumni Network</h1>
          <p className="text-xl text-green-50">Stay connected with fellow graduates</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 text-center">
            <Users className="mx-auto mb-4 text-green-600" size={48} />
            <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
            <p className="text-slate-600">Alumni Members</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Briefcase className="mx-auto mb-4 text-brandPrimary" size={48} />
            <div className="text-4xl font-bold text-slate-900 mb-2">85%</div>
            <p className="text-slate-600">Employment Rate</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Award className="mx-auto mb-4 text-purple-600" size={48} />
            <div className="text-4xl font-bold text-slate-900 mb-2">1,200+</div>
            <p className="text-slate-600">Certifications Earned</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Join Our Alumni Network</h2>
          <p className="text-slate-700 mb-6">
            Stay connected with fellow graduates, access exclusive job opportunities, and continue your professional development.
          </p>
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Join Alumni Network
          </button>
        </div>
      </div>
    </div>
  );
}

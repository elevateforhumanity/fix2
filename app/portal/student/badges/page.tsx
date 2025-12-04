import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, Star, Trophy, Target, Zap, Crown, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Badges & Achievements | Student Portal',
};

export default async function BadgesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id);

  const totalPoints = (profile?.points || 0);
  const level = Math.floor(totalPoints / 100) + 1;
  const nextLevelPoints = level * 100;
  const progressToNext = ((totalPoints % 100) / 100) * 100;

  const badges = [
    { id: 1, name: 'First Steps', description: 'Complete your first course', icon: Star, earned: enrollments && enrollments.length > 0, points: 10 },
    { id: 2, name: 'Quick Learner', description: 'Complete 3 courses', icon: Zap, earned: enrollments && enrollments.length >= 3, points: 25 },
    { id: 3, name: 'Dedicated Student', description: 'Complete 5 courses', icon: Trophy, earned: enrollments && enrollments.length >= 5, points: 50 },
    { id: 4, name: 'Master Learner', description: 'Complete 10 courses', icon: Crown, earned: enrollments && enrollments.length >= 10, points: 100 },
    { id: 5, name: 'Perfect Score', description: 'Get 100% on an assignment', icon: Target, earned: false, points: 20 },
    { id: 6, name: 'Early Bird', description: 'Submit 5 assignments early', icon: Award, earned: false, points: 15 },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Badges & Achievements</h1>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-100 mb-2">Current Level</p>
              <p className="text-5xl font-bold">Level {level}</p>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Crown size={48} className="text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{totalPoints} points</span>
              <span>{nextLevelPoints} points to Level {level + 1}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progressToNext}%` }}></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-yellow-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{earnedBadges.length}</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Star className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Trophy className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{level}</p>
            <p className="text-sm text-gray-600">Current Level</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Target className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{lockedBadges.length}</p>
            <p className="text-sm text-gray-600">To Unlock</p>
          </div>
        </div>

        {/* Earned Badges */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Earned Badges</h2>
          </div>
          <div className="p-6">
            {earnedBadges.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {earnedBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6 text-center">
                      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon size={40} className="text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                        +{badge.points} points
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600">No badges earned yet. Start learning to unlock achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Locked Badges */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Locked Badges</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {lockedBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.id} className="border-2 border-gray-300 bg-gray-50 rounded-lg p-6 text-center opacity-60">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock size={40} className="text-gray-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                    <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-medium">
                      +{badge.points} points
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

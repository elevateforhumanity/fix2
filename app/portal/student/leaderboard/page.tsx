import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Trophy, Star, Award, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leaderboard | Student Portal',
  description: 'Compete with other students',
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: rankings } = await supabase
    .from('profiles')
    .select('id, full_name, points')
    .order('points', { ascending: false })
    .limit(50);

  const userRank = rankings?.findIndex(r => r.id === user.id) + 1 || 0;
  const userPoints = profile?.points || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 mb-1">Your Rank</p>
              <p className="text-4xl font-bold">#{userRank || 'Unranked'}</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-100 mb-1">Your Points</p>
              <p className="text-4xl font-bold">{userPoints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Top Students</h2>
          </div>
          <div className="divide-y">
            {rankings && rankings.length > 0 ? (
              rankings.map((student: any, index: number) => (
                <div key={student.id} className={\`p-4 flex items-center justify-between \${student.id === user.id ? 'bg-blue-50' : 'hover:bg-gray-50'}\`}>
                  <div className="flex items-center gap-4">
                    <span className={\`text-2xl font-bold \${index < 3 ? 'text-yellow-600' : 'text-gray-400'}\`}>
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{student.full_name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-600">{student.points} points</p>
                    </div>
                  </div>
                  {index === 0 && <span className="text-2xl">🥇</span>}
                  {index === 1 && <span className="text-2xl">🥈</span>}
                  {index === 2 && <span className="text-2xl">🥉</span>}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-600">
                No rankings yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CourseLeaderboardPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  useEffect(() => {
    loadData();
  }, [courseId, timeframe]);

  async function loadData() {
    const supabase = createClient();
    
    // Load course
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
    
    setCourse(courseData);

    // Calculate date filter
    let dateFilter = new Date(0); // All time
    if (timeframe === 'month') {
      dateFilter = new Date();
      dateFilter.setMonth(dateFilter.getMonth() - 1);
    } else if (timeframe === 'week') {
      dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - 7);
    }

    // Load leaderboard data
    const { data: progressData } = await supabase
      .from('course_progress')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('course_id', courseId)
      .gte('updated_at', dateFilter.toISOString())
      .order('progress_percentage', { ascending: false })
      .limit(100);

    // Calculate points and rank
    const rankedData = (progressData || []).map((item, index) => ({
      ...item,
      rank: index + 1,
      points: Math.round(item.progress_percentage * 10 + (item.completed_lessons || 0) * 5),
    }));

    setLeaderboard(rankedData);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href={`/courses/${courseId}`} className="text-white/80 hover:text-white text-sm mb-4 inline-block">
              ← Back to Course
            </Link>
            <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
            <p className="text-xl text-purple-100">Course Leaderboard</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Timeframe Filter */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Timeframe</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeframe('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeframe === 'week'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeframe('month')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeframe === 'month'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setTimeframe('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeframe === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
          </div>

          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* 2nd Place */}
              <div className="text-center pt-12">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                    {leaderboard[1]?.profiles?.avatar_url ? (
                      <Image
                        src={leaderboard[1].profiles.avatar_url}
                        alt={leaderboard[1].profiles.full_name}
                        width={80}
                        height={80}
                        className="rounded-full" quality={100}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {leaderboard[1]?.profiles?.full_name?.[0] || '2'}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{leaderboard[1]?.profiles?.full_name}</p>
                <p className="text-sm text-gray-600">{leaderboard[1]?.points} points</p>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-yellow-300">
                    {leaderboard[0]?.profiles?.avatar_url ? (
                      <Image
                        src={leaderboard[0].profiles.avatar_url}
                        alt={leaderboard[0].profiles.full_name}
                        width={96}
                        height={96}
                        className="rounded-full" quality={100}
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {leaderboard[0]?.profiles?.full_name?.[0] || '1'}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    👑
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-lg">{leaderboard[0]?.profiles?.full_name}</p>
                <p className="text-sm text-gray-600">{leaderboard[0]?.points} points</p>
              </div>

              {/* 3rd Place */}
              <div className="text-center pt-12">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mx-auto">
                    {leaderboard[2]?.profiles?.avatar_url ? (
                      <Image
                        src={leaderboard[2].profiles.avatar_url}
                        alt={leaderboard[2].profiles.full_name}
                        width={80}
                        height={80}
                        className="rounded-full" quality={100}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {leaderboard[2]?.profiles?.full_name?.[0] || '3'}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{leaderboard[2]?.profiles?.full_name}</p>
                <p className="text-sm text-gray-600">{leaderboard[2]?.points} points</p>
              </div>
            </div>
          )}

          {/* Full Leaderboard */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900">Full Rankings</h3>
            </div>
            {leaderboard.length > 0 ? (
              <div className="divide-y">
                {leaderboard.map((enstart) => (
                  <div key={enstart.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-center">
                        <span className={`text-lg font-bold ${
                          enstart.rank === 1 ? 'text-yellow-500' :
                          enstart.rank === 2 ? 'text-gray-400' :
                          enstart.rank === 3 ? 'text-orange-500' :
                          'text-gray-600'
                        }`}>
                          #{enstart.rank}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {enstart.profiles?.avatar_url ? (
                          <Image
                            src={enstart.profiles.avatar_url}
                            alt={enstart.profiles.full_name}
                            width={48}
                            height={48}
                            className="rounded-full" quality={100}
                          />
                        ) : (
                          <span className="text-purple-600 font-semibold">
                            {enstart.profiles?.full_name?.[0] || '?'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {enstart.profiles?.full_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {enstart.progress_percentage}% complete • {enstart.completed_lessons || 0} lessons
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">{enstart.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No rankings yet</h3>
                <p className="text-gray-600">Be the first to complete lessons and earn points!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

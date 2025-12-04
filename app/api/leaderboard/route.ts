import { NextResponse } from 'next/server';
import { getCurrentUser, createServerSupabaseClient } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'week';
    const supabase = await createServerSupabaseClient();

    // Calculate date range based on timeframe
    const now = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
        startDate = new Date(0); // Beginning of time
        break;
    }

    // Get user achievements and calculate points
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select(`
        user_id,
        points,
        earned_at,
        profiles:user_id (
          full_name,
          avatar_url
        )
      `)
      .gte('earned_at', startDate.toISOString());

    // Aggregate points by user
    const userPoints = new Map<string, { userId: string; name: string; avatar: string; points: number; achievements: number }>();
    
    achievements?.forEach(achievement => {
      const userId = achievement.user_id;
      const existing = userPoints.get(userId);
      
      if (existing) {
        existing.points += achievement.points || 0;
        existing.achievements += 1;
      } else {
        userPoints.set(userId, {
          userId,
          name: achievement.profiles?.full_name || 'Anonymous',
          avatar: achievement.profiles?.avatar_url || '',
          points: achievement.points || 0,
          achievements: 1,
        });
      }
    });

    // Convert to array and sort by points
    const leaderboard = Array.from(userPoints.values())
      .sort((a, b) => b.points - a.points)
      .slice(0, 100) // Top 100
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
        isCurrentUser: entry.userId === user.id,
      }));

    // Find current user's rank if not in top 100
    const currentUserRank = leaderboard.find(entry => entry.isCurrentUser)?.rank;
    const currentUserEntry = currentUserRank ? null : {
      rank: leaderboard.length + 1,
      userId: user.id,
      name: 'You',
      avatar: '',
      points: 0,
      achievements: 0,
      isCurrentUser: true,
    };

    return NextResponse.json({
      leaderboard,
      currentUser: currentUserEntry,
      timeframe,
      totalUsers: userPoints.size,
    });
  } catch (error: any) {
    console.error('[Leaderboard] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();

    // Get user achievements with details
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('*, achievement_id, earned_at, points')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    // Calculate stats
    const totalPoints = userAchievements?.reduce((sum, a) => sum + (a.points || 0), 0) || 0;
    const level = Math.floor(totalPoints / 100) + 1;
    
    // Define available achievements
    const allAchievements = [
      { id: 'first_login', name: 'Welcome Aboard', description: 'Complete your first login', points: 10, icon: '👋' },
      { id: 'first_course', name: 'Getting Started', description: 'Enroll in your first course', points: 25, icon: '📚' },
      { id: 'first_completion', name: 'Finisher', description: 'Complete your first course', points: 100, icon: '🎓' },
      { id: 'perfect_score', name: 'Perfect Score', description: 'Get 100% on an assessment', points: 50, icon: '💯' },
      { id: 'week_streak', name: 'Dedicated Learner', description: 'Log in 7 days in a row', points: 75, icon: '🔥' },
      { id: 'help_others', name: 'Helpful', description: 'Answer 10 forum questions', points: 50, icon: '🤝' },
      { id: 'three_courses', name: 'Multi-talented', description: 'Complete 3 courses', points: 250, icon: '⭐' },
      { id: 'certificate_earned', name: 'Certified', description: 'Earn your first certificate', points: 150, icon: '🏆' },
    ];

    const earnedIds = new Set(userAchievements?.map(a => a.achievement_id) || []);
    const achievements = allAchievements.map(achievement => ({
      ...achievement,
      earned: earnedIds.has(achievement.id),
      earnedAt: userAchievements?.find(a => a.achievement_id === achievement.id)?.earned_at,
    }));

    return NextResponse.json({
      achievements,
      stats: {
        totalPoints,
        level,
        streak: 0, // Would need to calculate from login history
        totalAchievements: userAchievements?.length || 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.achievementId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Award achievement
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: user.id,
        achievement_id: body.achievementId,
        earned_at: new Date().toISOString(),
        points: body.points || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, achievement: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'Star',
      earned: true,
      earnedAt: '2024-02-16',
      points: 10,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Study for 7 consecutive days',
      icon: 'Zap',
      earned: true,
      earnedAt: '2024-02-23',
      points: 50,
    },
    {
      id: '3',
      title: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: 'Trophy',
      earned: false,
      progress: 3,
      total: 5,
      points: 100,
    },
    {
      id: '4',
      title: 'Module Complete',
      description: 'Finish an entire module',
      icon: 'Award',
      earned: true,
      earnedAt: '2024-03-01',
      points: 75,
    },
  ];

  const stats = {
    totalPoints: 1250,
    level: 5,
    streak: 12,
    totalAchievements: achievements.filter(a => a.earned).length,
  };

  return NextResponse.json({ achievements, stats });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId || !body.achievementId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const achievement = {
    ...body,
    earned: true,
    earnedAt: new Date().toISOString(),
  };

  return NextResponse.json(achievement, { status: 201 });
}

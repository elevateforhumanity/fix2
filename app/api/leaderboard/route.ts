import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe') || 'week';

  const leaderboard = [
    {
      rank: 1,
      userId: '101',
      name: 'Sarah Johnson',
      avatar: '/media/avatars/avatar-1.jpg',
      points: 2450,
      level: 8,
    },
    {
      rank: 2,
      userId: '102',
      name: 'Michael Chen',
      avatar: '/media/avatars/avatar-2.jpg',
      points: 2280,
      level: 7,
    },
    {
      rank: 3,
      userId: '103',
      name: 'Emily Rodriguez',
      avatar: '/media/avatars/avatar-3.jpg',
      points: 2150,
      level: 7,
    },
    {
      rank: 4,
      userId: '104',
      name: 'David Kim',
      avatar: '/media/avatars/avatar-4.jpg',
      points: 1980,
      level: 6,
    },
    {
      rank: 5,
      userId: '1',
      name: 'You',
      avatar: '/media/avatars/avatar-default.jpg',
      points: 1250,
      level: 5,
      isCurrentUser: true,
    },
  ];

  return NextResponse.json({ leaderboard, timeframe });
}

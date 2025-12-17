import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'week';

    // Leaderboard feature not yet implemented
    return NextResponse.json({
      leaderboard: [],
      timeframe,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}

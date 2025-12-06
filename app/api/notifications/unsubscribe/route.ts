import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json();

    // Note: Remove subscription from database
    // console.log('[Notifications] Unsubscribe:', subscription);

    // In production, you would:
    // 1. Extract user ID from session/auth
    // 2. Remove subscription from database
    // 3. Update user preferences

    return NextResponse.json({
      success: true,
      message: 'Subscription removed',
    });
  } catch (error) {
    console.error('[Notifications] Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove subscription' },
      { status: 500 }
    );
  }
}

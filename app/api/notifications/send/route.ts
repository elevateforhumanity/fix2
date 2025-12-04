import { NextRequest, NextResponse } from 'next/server';
import { getPushNotificationService } from '@/lib/notifications/push-service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userIds, notification, broadcast } = body;

    if (!notification) {
      return NextResponse.json(
        { success: false, error: 'Missing notification data' },
        { status: 400 }
      );
    }

    // Verify authentication for admin operations
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const pushService = getPushNotificationService();
    let sentCount = 0;

    if (broadcast) {
      // Broadcast to all users (admin only)
      // TODO: Add admin role check
      sentCount = await pushService.broadcast(notification);
    } else if (userIds && Array.isArray(userIds)) {
      // Send to multiple users
      sentCount = await pushService.sendToUsers(userIds, notification);
    } else if (userId) {
      // Send to single user
      sentCount = await pushService.sendToUser(userId, notification);
    } else {
      return NextResponse.json(
        { success: false, error: 'Must specify userId, userIds, or broadcast' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent',
      sentCount,
    });
  } catch (error) {
    console.error('[Notifications] Send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}

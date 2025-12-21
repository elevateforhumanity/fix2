import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { supabase } from '../lib/supabase';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface PushNotificationToken {
  token: string;
  platform: 'ios' | 'android';
  deviceId: string;
}

/**
 * Register for push notifications and get token
 */
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Push notifications only work on physical devices');
    return null;
  }

  try {
    // Check existing permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permissions if not granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Push notification permissions not granted');
      return null;
    }

    // Get push token
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      console.error('Project ID not found in app config');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    // Configure Android channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4F46E5',
      });
    }

    return token.data;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    return null;
  }
}

/**
 * Save push token to database
 */
export async function savePushToken(
  userId: string,
  token: string
): Promise<void> {
  try {
    const platform = Platform.OS as 'ios' | 'android';
    const deviceId = Constants.deviceId || 'unknown';

    const { error } = await supabase.from('push_tokens').upsert(
      {
        user_id: userId,
        token,
        platform,
        device_id: deviceId,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,device_id',
      }
    );

    if (error) throw error;

    console.log('Push token saved successfully');
  } catch (error) {
    console.error('Error saving push token:', error);
  }
}

/**
 * Remove push token from database (on logout)
 */
export async function removePushToken(userId: string): Promise<void> {
  try {
    const deviceId = Constants.deviceId || 'unknown';

    const { error } = await supabase
      .from('push_tokens')
      .delete()
      .eq('user_id', userId)
      .eq('device_id', deviceId);

    if (error) throw error;

    console.log('Push token removed successfully');
  } catch (error) {
    console.error('Error removing push token:', error);
  }
}

/**
 * Schedule a local notification
 */
export async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: any,
  trigger?: Notifications.NotificationTriggerInput
): Promise<string> {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: trigger || null, // null = immediate
  });
}

/**
 * Cancel a scheduled notification
 */
export async function cancelNotification(
  notificationId: string
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get badge count
 */
export async function getBadgeCount(): Promise<number> {
  return await Notifications.getBadgeCountAsync();
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number): Promise<void> {
  await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear badge count
 */
export async function clearBadgeCount(): Promise<void> {
  await Notifications.setBadgeCountAsync(0);
}

/**
 * Add notification received listener
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Add notification response listener (when user taps notification)
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Schedule daily reminder notification
 */
export async function scheduleDailyReminder(
  hour: number = 9,
  minute: number = 0
): Promise<string> {
  return await scheduleLocalNotification(
    'Time to learn!',
    'Continue your learning journey today',
    { type: 'daily_reminder' },
    {
      hour,
      minute,
      repeats: true,
    }
  );
}

/**
 * Schedule course deadline reminder
 */
export async function scheduleCourseDeadlineReminder(
  courseName: string,
  deadlineDate: Date
): Promise<string> {
  const oneDayBefore = new Date(deadlineDate);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);

  return await scheduleLocalNotification(
    'Course deadline approaching',
    `${courseName} is due tomorrow`,
    { type: 'deadline_reminder', courseName },
    {
      date: oneDayBefore,
    }
  );
}

/**
 * Notification types for handling different actions
 */
export enum NotificationType {
  COURSE_ASSIGNED = 'course_assigned',
  COURSE_COMPLETED = 'course_completed',
  BADGE_EARNED = 'badge_earned',
  DEADLINE_REMINDER = 'deadline_reminder',
  DAILY_REMINDER = 'daily_reminder',
  MESSAGE_RECEIVED = 'message_received',
  ANNOUNCEMENT = 'announcement',
}

/**
 * Handle notification tap based on type
 */
export function handleNotificationTap(
  notification: Notifications.NotificationResponse,
  navigation: any
): void {
  const data = notification.notification.request.content.data;
  const type = data?.type as NotificationType;

  switch (type) {
    case NotificationType.COURSE_ASSIGNED:
    case NotificationType.COURSE_COMPLETED:
      if (data?.courseId) {
        navigation.navigate('CourseDetail', { courseId: data.courseId });
      } else {
        navigation.navigate('Courses');
      }
      break;

    case NotificationType.BADGE_EARNED:
      navigation.navigate('Achievements');
      break;

    case NotificationType.DEADLINE_REMINDER:
      if (data?.courseId) {
        navigation.navigate('CourseDetail', { courseId: data.courseId });
      }
      break;

    case NotificationType.MESSAGE_RECEIVED:
      navigation.navigate('Messages');
      break;

    case NotificationType.ANNOUNCEMENT:
      navigation.navigate('Home');
      break;

    default:
      navigation.navigate('Home');
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { supabase } from '../lib/supabase';

/**
 * Offline storage service for caching data and syncing when online
 */

const STORAGE_KEYS = {
  COURSES: '@elevate/courses',
  LESSONS: '@elevate/lessons',
  PROGRESS: '@elevate/progress',
  CERTIFICATES: '@elevate/certificates',
  BADGES: '@elevate/badges',
  PENDING_SYNC: '@elevate/pending_sync',
  LAST_SYNC: '@elevate/last_sync',
};

export interface PendingSyncItem {
  id: string;
  type: 'progress' | 'completion' | 'quiz_answer';
  data: any;
  timestamp: number;
}

/**
 * Check if device is online
 */
export async function isOnline(): Promise<boolean> {
  const state = await NetInfo.fetch();
  return state.isConnected === true && state.isInternetReachable === true;
}

/**
 * Save data to offline storage
 */
export async function saveOfflineData(key: string, data: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving offline data:', error);
  }
}

/**
 * Get data from offline storage
 */
export async function getOfflineData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting offline data:', error);
    return null;
  }
}

/**
 * Remove data from offline storage
 */
export async function removeOfflineData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing offline data:', error);
  }
}

/**
 * Clear all offline data
 */
export async function clearAllOfflineData(): Promise<void> {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing offline data:', error);
  }
}

/**
 * Cache courses for offline access
 */
export async function cacheCourses(userId: string): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', userId);

    if (error) throw error;

    await saveOfflineData(STORAGE_KEYS.COURSES, data);
    console.log('Courses cached successfully');
  } catch (error) {
    console.error('Error caching courses:', error);
  }
}

/**
 * Get cached courses
 */
export async function getCachedCourses(): Promise<any[]> {
  const courses = await getOfflineData<any[]>(STORAGE_KEYS.COURSES);
  return courses || [];
}

/**
 * Cache lessons for a course
 */
export async function cacheLessons(courseId: string): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (error) throw error;

    const existingLessons =
      (await getOfflineData<any>(STORAGE_KEYS.LESSONS)) || {};
    existingLessons[courseId] = data;

    await saveOfflineData(STORAGE_KEYS.LESSONS, existingLessons);
    console.log(`Lessons for course ${courseId} cached successfully`);
  } catch (error) {
    console.error('Error caching lessons:', error);
  }
}

/**
 * Get cached lessons for a course
 */
export async function getCachedLessons(courseId: string): Promise<any[]> {
  const allLessons = await getOfflineData<any>(STORAGE_KEYS.LESSONS);
  return allLessons?.[courseId] || [];
}

/**
 * Cache user progress
 */
export async function cacheProgress(userId: string): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    await saveOfflineData(STORAGE_KEYS.PROGRESS, data);
    console.log('Progress cached successfully');
  } catch (error) {
    console.error('Error caching progress:', error);
  }
}

/**
 * Get cached progress
 */
export async function getCachedProgress(): Promise<any[]> {
  const progress = await getOfflineData<any[]>(STORAGE_KEYS.PROGRESS);
  return progress || [];
}

/**
 * Add item to pending sync queue
 */
export async function addToPendingSync(
  item: Omit<PendingSyncItem, 'id' | 'timestamp'>
): Promise<void> {
  try {
    const pendingItems =
      (await getOfflineData<PendingSyncItem[]>(STORAGE_KEYS.PENDING_SYNC)) ||
      [];

    const newItem: PendingSyncItem = {
      ...item,
      id: `${Date.now()}_${Math.random()}`,
      timestamp: Date.now(),
    };

    pendingItems.push(newItem);
    await saveOfflineData(STORAGE_KEYS.PENDING_SYNC, pendingItems);

    console.log('Item added to pending sync queue');
  } catch (error) {
    console.error('Error adding to pending sync:', error);
  }
}

/**
 * Get pending sync items
 */
export async function getPendingSyncItems(): Promise<PendingSyncItem[]> {
  const items = await getOfflineData<PendingSyncItem[]>(
    STORAGE_KEYS.PENDING_SYNC
  );
  return items || [];
}

/**
 * Remove item from pending sync queue
 */
export async function removeFromPendingSync(itemId: string): Promise<void> {
  try {
    const pendingItems = await getPendingSyncItems();
    const filteredItems = pendingItems.filter((item) => item.id !== itemId);
    await saveOfflineData(STORAGE_KEYS.PENDING_SYNC, filteredItems);
  } catch (error) {
    console.error('Error removing from pending sync:', error);
  }
}

/**
 * Sync pending items when online
 */
export async function syncPendingItems(userId: string): Promise<void> {
  const online = await isOnline();
  if (!online) {
    console.log('Device is offline, skipping sync');
    return;
  }

  const pendingItems = await getPendingSyncItems();
  if (pendingItems.length === 0) {
    console.log('No pending items to sync');
    return;
  }

  console.log(`Syncing ${pendingItems.length} pending items...`);

  for (const item of pendingItems) {
    try {
      switch (item.type) {
        case 'progress':
          await syncProgressItem(item.data);
          break;
        case 'completion':
          await syncCompletionItem(item.data);
          break;
        case 'quiz_answer':
          await syncQuizAnswerItem(item.data);
          break;
      }

      // Remove successfully synced item
      await removeFromPendingSync(item.id);
      console.log(`Synced item ${item.id}`);
    } catch (error) {
      console.error(`Error syncing item ${item.id}:`, error);
      // Keep item in queue for retry
    }
  }

  // Update last sync timestamp
  await saveOfflineData(STORAGE_KEYS.LAST_SYNC, Date.now());
  console.log('Sync completed');
}

/**
 * Sync progress item
 */
async function syncProgressItem(data: any): Promise<void> {
  const { error } = await supabase
    .from('lesson_progress')
    .upsert(data, { onConflict: 'user_id,lesson_id' });

  if (error) throw error;
}

/**
 * Sync completion item
 */
async function syncCompletionItem(data: any): Promise<void> {
  const { error } = await supabase
    .from('lesson_progress')
    .update({ completed: true, completed_at: data.completed_at })
    .eq('user_id', data.user_id)
    .eq('lesson_id', data.lesson_id);

  if (error) throw error;
}

/**
 * Sync quiz answer item
 */
async function syncQuizAnswerItem(data: any): Promise<void> {
  const { error } = await supabase.from('quiz_responses').insert(data);

  if (error) throw error;
}

/**
 * Get last sync timestamp
 */
export async function getLastSyncTime(): Promise<number | null> {
  return await getOfflineData<number>(STORAGE_KEYS.LAST_SYNC);
}

/**
 * Full sync - download all user data for offline access
 */
export async function performFullSync(userId: string): Promise<void> {
  const online = await isOnline();
  if (!online) {
    throw new Error('Device is offline');
  }

  console.log('Starting full sync...');

  try {
    // Sync pending items first
    await syncPendingItems(userId);

    // Cache fresh data
    await Promise.all([cacheCourses(userId), cacheProgress(userId)]);

    // Cache lessons for enrolled courses
    const courses = await getCachedCourses();
    for (const enrollment of courses) {
      await cacheLessons(enrollment.course_id);
    }

    await saveOfflineData(STORAGE_KEYS.LAST_SYNC, Date.now());
    console.log('Full sync completed successfully');
  } catch (error) {
    console.error('Error during full sync:', error);
    throw error;
  }
}

/**
 * Setup network listener for auto-sync
 */
export function setupNetworkListener(userId: string): () => void {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable) {
      console.log('Device came online, syncing...');
      syncPendingItems(userId).catch(console.error);
    }
  });

  return unsubscribe;
}

/**
 * Get offline storage size
 */
export async function getStorageSize(): Promise<number> {
  try {
    const keys = Object.values(STORAGE_KEYS);
    let totalSize = 0;

    for (const key of keys) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        totalSize += new Blob([data]).size;
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
}

/**
 * Format storage size for display
 */
export function formatStorageSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

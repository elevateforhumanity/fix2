// Background sync manager for offline data

import { getDB } from './db';

export class SyncManager {
  private static instance: SyncManager;
  private syncing = false;

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  async registerBackgroundSync() {
    if (
      'serviceWorker' in navigator &&
      'sync' in ServiceWorkerRegistration.prototype
    ) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await (registration as any).sync.register('sync-progress');
        // console.log('[Sync] Background sync registered');
      } catch (error) {
        console.error('[Sync] Background sync registration failed:', error);
        // Fallback to periodic sync
        this.startPeriodicSync();
      }
    } else {
      // Fallback for browsers without background sync
      this.startPeriodicSync();
    }
  }

  private startPeriodicSync() {
    // Sync every 5 minutes when online
    setInterval(
      () => {
        if (navigator.onLine) {
          this.syncNow();
        }
      },
      5 * 60 * 1000
    );

    // Sync when coming back online
    window.addEventListener('online', () => {
      // console.log('[Sync] Back online, syncing...');
      this.syncNow();
    });
  }

  async syncNow(): Promise<boolean> {
    if (this.syncing) {
      // console.log('[Sync] Already syncing, skipping...');
      return false;
    }

    if (!navigator.onLine) {
      // console.log('[Sync] Offline, skipping sync');
      return false;
    }

    this.syncing = true;
    // console.log('[Sync] Starting sync...');

    try {
      const db = await getDB();

      // Sync progress
      const unsyncedProgress = await db.getUnsyncedProgress();
      // console.log(`[Sync] Found ${unsyncedProgress.length} unsynced progress items`);

      for (const progress of unsyncedProgress) {
        try {
          // Send to API
          const response = await fetch('/api/lms/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              courseId: progress.courseId,
              lessonId: progress.lessonId,
              progress: progress.progress,
              completed: progress.completed,
            }),
          });

          if (response.ok) {
            // Mark as synced
            if (progress.id) {
              await db.markProgressSynced(progress.id);
              // console.log('Progress synced');
            }
          } else {
            console.error(
              `[Sync] Failed to sync progress:`,
              response.statusText
            );
          }
        } catch (error) {
          console.error('[Sync] Error syncing progress item:', error);
        }
      }

      // Sync queue items
      const queueItems = await db.getSyncQueue();
      // console.log(`[Sync] Found ${queueItems.length} queue items`);

      for (const item of queueItems) {
        try {
          const response = await fetch(item.url, {
            method: item.method || 'POST',
            headers: item.headers || { 'Content-Type': 'application/json' },
            body: item.body ? JSON.stringify(item.body) : undefined,
          });

          if (response.ok) {
            await db.removeFromSyncQueue(item.id);
            // console.log(`[Sync] Synced queue item ${item.id}`);
          }
        } catch (error) {
          console.error('[Sync] Error syncing queue item:', error);
        }
      }

      // console.log('[Sync] Sync completed successfully');
      this.syncing = false;
      return true;
    } catch (error) {
      console.error('[Sync] Sync failed:', error);
      this.syncing = false;
      return false;
    }
  }

  async queueRequest(url: string, options: RequestInit = {}): Promise<void> {
    const db = await getDB();
    await db.addToSyncQueue({
      url,
      method: options.method || 'POST',
      headers: options.headers,
      body: options.body,
      type: 'api-request',
    });

    // Try to sync immediately if online
    if (navigator.onLine) {
      this.syncNow();
    }
  }
}

// Initialize sync manager
export function initSync() {
  const syncManager = SyncManager.getInstance();
  syncManager.registerBackgroundSync();

  // Listen for online/offline events
  window.addEventListener('online', () => {
    // console.log('[Sync] Network status: online');
    syncManager.syncNow();
  });

  window.addEventListener('offline', () => {
    // console.log('[Sync] Network status: offline');
  });
}

export default SyncManager;

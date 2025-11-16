// Push notification manager

export interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

export class NotificationManager {
  private static instance: NotificationManager;

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async getPermissionStatus(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return { granted: false, denied: true, prompt: false };
    }

    const permission = Notification.permission;
    return {
      granted: permission === 'granted',
      denied: permission === 'denied',
      prompt: permission === 'default',
    };
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('[Notifications] Not supported in this browser');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.warn('[Notifications] Permission denied');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('[Notifications] Permission request failed:', error);
      return false;
    }
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('[Notifications] Push notifications not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Check if already subscribed
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        // Subscribe to push notifications
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

        if (!vapidPublicKey) {
          console.warn('[Notifications] VAPID public key not configured');
          return null;
        }

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
        });

        console.log('[Notifications] Subscribed to push:', subscription);

        // Send subscription to server
        await this.sendSubscriptionToServer(subscription);
      }

      return subscription;
    } catch (error) {
      console.error('[Notifications] Push subscription failed:', error);
      return null;
    }
  }

  async unsubscribeFromPush(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscriptionFromServer(subscription);
        console.log('[Notifications] Unsubscribed from push');
        return true;
      }

      return false;
    } catch (error) {
      console.error('[Notifications] Unsubscribe failed:', error);
      return false;
    }
  }

  async sendNotification(
    title: string,
    options?: NotificationOptions
  ): Promise<void> {
    const permission = await this.getPermissionStatus();

    if (!permission.granted) {
      console.warn('[Notifications] Permission not granted');
      return;
    }

    if ('serviceWorker' in navigator) {
      // Use service worker to show notification
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: '/icon-192.png',
        badge: '/icon-72.png',
        ...options,
      } as NotificationOptions);
    } else {
      // Fallback to regular notification
      new Notification(title, {
        icon: '/icon-192.png',
        ...options,
      });
    }
  }

  private async sendSubscriptionToServer(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error(
        '[Notifications] Failed to send subscription to server:',
        error
      );
    }
  }

  private async removeSubscriptionFromServer(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error(
        '[Notifications] Failed to remove subscription from server:',
        error
      );
    }
  }

  private urlBase64ToUint8Array(base64String: string): BufferSource {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray as BufferSource;
  }
}

export default NotificationManager;

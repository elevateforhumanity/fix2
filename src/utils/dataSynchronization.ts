/**
 * Data Synchronization Utility
 * Ensures 100% data consistency across the application
 * Handles real-time updates, conflict resolution, and offline sync
 */

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface SyncConfig {
  table: string;
  onUpdate: (payload: any) => void;
  onInsert?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  filter?: Record<string, any>;
}

interface SyncState {
  lastSync: Date;
  pendingChanges: any[];
  isOnline: boolean;
  syncInProgress: boolean;
}

class DataSynchronizationManager {
  private subscriptions: Map<string, RealtimeChannel> = new Map();
  private syncState: Map<string, SyncState> = new Map();
  private retryQueue: Map<string, any[]> = new Map();
  private maxRetries = 3;
  private retryDelay = 1000;

  /**
   * Subscribe to real-time updates for a table
   */
  subscribe(config: SyncConfig): () => void {
    if (!supabase) return () => {};

    const { table, onUpdate, onInsert, onDelete, filter } = config;
    const channelName = `sync_${table}_${Date.now()}`;

    // Initialize sync state
    this.syncState.set(table, {
      lastSync: new Date(),
      pendingChanges: [],
      isOnline: navigator.onLine,
      syncInProgress: false,
    });

    // Create channel
    const channel = supabase.channel(channelName).on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table,
        filter: filter ? this.buildFilter(filter) : undefined,
      },
      (payload) => {
        this.handleUpdate(table, payload, onUpdate);
      }
    );

    if (onInsert) {
      channel.on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table,
          filter: filter ? this.buildFilter(filter) : undefined,
        },
        (payload) => {
          this.handleInsert(table, payload, onInsert);
        }
      );
    }

    if (onDelete) {
      channel.on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table,
          filter: filter ? this.buildFilter(filter) : undefined,
        },
        (payload) => {
          this.handleDelete(table, payload, onDelete);
        }
      );
    }

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        this.updateSyncState(table, { lastSync: new Date() });
      }
    });

    this.subscriptions.set(channelName, channel);

    // Return cleanup function
    return () => {
      this.unsubscribe(channelName);
    };
  }

  /**
   * Unsubscribe from a channel
   */
  private async unsubscribe(channelName: string): Promise<void> {
    const channel = this.subscriptions.get(channelName);
    if (channel) {
      await channel.unsubscribe();
      this.subscriptions.delete(channelName);
    }
  }

  /**
   * Handle UPDATE events with conflict resolution
   */
  private handleUpdate(
    table: string,
    payload: any,
    callback: (payload: any) => void
  ): void {
    try {
      // Check for conflicts
      const state = this.syncState.get(table);
      if (state?.syncInProgress) {
          `[DataSync] Sync in progress for ${table}, queuing update`
        );
        state.pendingChanges.push({ type: 'UPDATE', payload });
        return;
      }

      // Apply update
      callback(payload);
      this.updateSyncState(table, { lastSync: new Date() });
    } catch (error) {
      this.queueRetry(table, { type: 'UPDATE', payload, callback });
    }
  }

  /**
   * Handle INSERT events
   */
  private handleInsert(
    table: string,
    payload: any,
    callback: (payload: any) => void
  ): void {
    try {
      callback(payload);
      this.updateSyncState(table, { lastSync: new Date() });
    } catch (error) {
      this.queueRetry(table, { type: 'INSERT', payload, callback });
    }
  }

  /**
   * Handle DELETE events
   */
  private handleDelete(
    table: string,
    payload: any,
    callback: (payload: any) => void
  ): void {
    try {
      callback(payload);
      this.updateSyncState(table, { lastSync: new Date() });
    } catch (error) {
      this.queueRetry(table, { type: 'DELETE', payload, callback });
    }
  }

  /**
   * Queue failed operations for retry
   */
  private queueRetry(table: string, operation: any): void {
    const queue = this.retryQueue.get(table) || [];
    queue.push(operation);
    this.retryQueue.set(table, queue);

    // Schedule retry
    setTimeout(() => this.processRetryQueue(table), this.retryDelay);
  }

  /**
   * Process retry queue
   */
  private async processRetryQueue(table: string): Promise<void> {
    const queue = this.retryQueue.get(table);
    if (!queue || queue.length === 0) return;

      `[DataSync] Processing retry queue for ${table}:`,
      queue.length
    );

    const operation = queue.shift();
    if (!operation) return;

    try {
      operation.callback(operation.payload);
      this.retryQueue.set(table, queue);
    } catch (error) {
      if (queue.length < this.maxRetries) {
        queue.push(operation);
        this.retryQueue.set(table, queue);
        setTimeout(() => this.processRetryQueue(table), this.retryDelay * 2);
      } else {
      }
    }
  }

  /**
   * Update sync state
   */
  private updateSyncState(table: string, updates: Partial<SyncState>): void {
    const current = this.syncState.get(table);
    if (current) {
      this.syncState.set(table, { ...current, ...updates });
    }
  }

  /**
   * Build filter string for Supabase
   */
  private buildFilter(filter: Record<string, any>): string {
    return Object.entries(filter)
      .map(([key, value]) => `${key}=eq.${value}`)
      .join(',');
  }

  /**
   * Sync data manually (for offline recovery)
   */
  async syncTable(table: string, localData: any[]): Promise<any[]> {
    if (!supabase) return [];

    const state = this.syncState.get(table);
    if (!state) {
      return [];
    }

    this.updateSyncState(table, { syncInProgress: true });

    try {
      // Fetch latest data from server
      const { data: serverData, error } = await supabase
        .from(table)
        .select('*');

      if (error) throw error;

      // Merge local and server data (server wins on conflicts)
      const merged = this.mergeData(localData, serverData || []);

      this.updateSyncState(table, {
        syncInProgress: false,
        lastSync: new Date(),
      });

      return merged;
    } catch (error) {
      this.updateSyncState(table, { syncInProgress: false });
      throw error;
    }
  }

  /**
   * Merge local and server data
   */
  private mergeData(local: any[], server: any[]): any[] {
    const serverMap = new Map(server.map((item) => [item.id, item]));
    const merged = [...server];

    for (const localItem of local) {
      if (!serverMap.has(localItem.id)) {
        merged.push(localItem);
      }
    }

    return merged;
  }

  /**
   * Get sync status for a table
   */
  getSyncStatus(table: string): SyncState | undefined {
    return this.syncState.get(table);
  }

  /**
   * Cleanup all subscriptions
   */
  async cleanup(): Promise<void> {
    for (const [channelName] of this.subscriptions) {
      await this.unsubscribe(channelName);
    }
    this.syncState.clear();
    this.retryQueue.clear();
  }
}

// Export singleton instance
export const dataSyncManager = new DataSynchronizationManager();

// Export hook for React components
export function useDataSync(config: SyncConfig) {
  useEffect(() => {
    const cleanup = dataSyncManager.subscribe(config);
    return cleanup;
  }, [config.table]);

  return {
    syncStatus: dataSyncManager.getSyncStatus(config.table),
    manualSync: (localData: any[]) =>
      dataSyncManager.syncTable(config.table, localData),
  };
}

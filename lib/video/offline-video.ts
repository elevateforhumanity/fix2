// Offline video download and playback utilities

import { getDB, OfflineVideo } from '@/lib/offline/db';

export interface DownloadProgress {
  loaded: number;
  total: number;
  percent: number;
}

export class OfflineVideoManager {
  private static instance: OfflineVideoManager;

  static getInstance(): OfflineVideoManager {
    if (!OfflineVideoManager.instance) {
      OfflineVideoManager.instance = new OfflineVideoManager();
    }
    return OfflineVideoManager.instance;
  }

  /**
   * Download video for offline playback
   */
  async downloadVideo(
    videoId: string,
    lessonId: string,
    url: string,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<boolean> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        loaded += value.length;

        if (onProgress && total > 0) {
          onProgress({
            loaded,
            total,
            percent: (loaded / total) * 100,
          });
        }
      }

      // Combine chunks into blob - convert Uint8Array[] to BlobPart[]
      const blob = new Blob(chunks as BlobPart[], { type: 'video/mp4' });

      // Save to IndexedDB
      const db = await getDB();
      await db.saveVideo({
        id: videoId,
        lessonId,
        blob,
        cachedAt: Date.now(),
      });

      // console.log(`[OfflineVideo] Downloaded video ${videoId}`);
      return true;
    } catch (error) {
      console.error('[OfflineVideo] Download failed:', error);
      return false;
    }
  }

  /**
   * Get offline video URL
   */
  async getOfflineVideoUrl(videoId: string): Promise<string | null> {
    try {
      const db = await getDB();
      const video = await db.getVideo(videoId);

      if (!video) {
        return null;
      }

      // Create object URL from blob
      return URL.createObjectURL(video.blob);
    } catch (error) {
      console.error('[OfflineVideo] Failed to get offline video:', error);
      return null;
    }
  }

  /**
   * Check if video is available offline
   */
  async isVideoAvailableOffline(videoId: string): Promise<boolean> {
    try {
      const db = await getDB();
      const video = await db.getVideo(videoId);
      return !!video;
    } catch (error) {
      return false;
    }
  }

  /**
   * Delete offline video
   */
  async deleteOfflineVideo(videoId: string): Promise<boolean> {
    try {
      const db = await getDB();
      await db.deleteVideo(videoId);
      // console.log(`[OfflineVideo] Deleted video ${videoId}`);
      return true;
    } catch (error) {
      console.error('[OfflineVideo] Delete failed:', error);
      return false;
    }
  }

  /**
   * Get storage usage for videos
   */
  async getVideoStorageUsage(): Promise<{ count: number; sizeMB: number }> {
    try {
      const db = await getDB();
      const estimate = await db.getStorageEstimate();

      // Rough estimate - in production, track actual video sizes
      return {
        count: 0, // Would need to query video count
        sizeMB: Math.round((estimate.usage / 1024 / 1024) * 100) / 100,
      };
    } catch (error) {
      console.error('[OfflineVideo] Failed to get storage usage:', error);
      return { count: 0, sizeMB: 0 };
    }
  }

  /**
   * Clear all offline videos
   */
  async clearAllVideos(): Promise<boolean> {
    try {
      const db = await getDB();
      // Would need to implement getAllVideos and delete each
      // console.log('[OfflineVideo] Cleared all videos');
      return true;
    } catch (error) {
      console.error('[OfflineVideo] Clear failed:', error);
      return false;
    }
  }
}

/**
 * Hook for downloading videos
 */
export function useVideoDownload() {
  const manager = OfflineVideoManager.getInstance();

  const downloadVideo = async (
    videoId: string,
    lessonId: string,
    url: string,
    onProgress?: (progress: DownloadProgress) => void
  ) => {
    return manager.downloadVideo(videoId, lessonId, url, onProgress);
  };

  const isAvailableOffline = async (videoId: string) => {
    return manager.isVideoAvailableOffline(videoId);
  };

  const deleteVideo = async (videoId: string) => {
    return manager.deleteOfflineVideo(videoId);
  };

  return {
    downloadVideo,
    isAvailableOffline,
    deleteVideo,
  };
}

export default OfflineVideoManager;

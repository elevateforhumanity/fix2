/**
 * YouTube Data API Integration
 * Handles video management and analytics
 */

interface YouTubeConfig {
  apiKey: string;
  clientId?: string;
  clientSecret?: string;
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    publishedAt: string;
    channelId: string;
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

interface YouTubePlaylist {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  contentDetails: {
    itemCount: number;
  };
}

interface YouTubeSearchResult {
  id: {
    kind: string;
    videoId?: string;
    playlistId?: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
}

class YouTubeClient {
  private config: YouTubeConfig;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(config: YouTubeConfig) {
    this.config = config;
  }

  private async request(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const queryParams = new URLSearchParams({
      key: this.config.apiKey,
      ...params,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getVideo(videoId: string): Promise<YouTubeVideo> {
    const result = await this.request('/videos', {
      part: 'snippet,contentDetails,statistics',
      id: videoId,
    });

    if (!result.items || result.items.length === 0) {
      throw new Error('Video not found');
    }

    return result.items[0];
  }

  async getVideos(videoIds: string[]): Promise<YouTubeVideo[]> {
    const result = await this.request('/videos', {
      part: 'snippet,contentDetails,statistics',
      id: videoIds.join(','),
    });

    return result.items || [];
  }

  async searchVideos(query: string, maxResults: number = 10): Promise<YouTubeSearchResult[]> {
    const result = await this.request('/search', {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults.toString(),
    });

    return result.items || [];
  }

  async getPlaylist(playlistId: string): Promise<YouTubePlaylist> {
    const result = await this.request('/playlists', {
      part: 'snippet,contentDetails',
      id: playlistId,
    });

    if (!result.items || result.items.length === 0) {
      throw new Error('Playlist not found');
    }

    return result.items[0];
  }

  async getPlaylistItems(playlistId: string, maxResults: number = 50): Promise<any[]> {
    const result = await this.request('/playlistItems', {
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: maxResults.toString(),
    });

    return result.items || [];
  }

  async getChannelVideos(channelId: string, maxResults: number = 10): Promise<YouTubeSearchResult[]> {
    const result = await this.request('/search', {
      part: 'snippet',
      channelId,
      type: 'video',
      order: 'date',
      maxResults: maxResults.toString(),
    });

    return result.items || [];
  }

  getEmbedUrl(videoId: string, options: {
    autoplay?: boolean;
    controls?: boolean;
    modestbranding?: boolean;
    rel?: boolean;
    start?: number;
  } = {}): string {
    const params = new URLSearchParams();
    
    if (options.autoplay) params.append('autoplay', '1');
    if (options.controls === false) params.append('controls', '0');
    if (options.modestbranding) params.append('modestbranding', '1');
    if (options.rel === false) params.append('rel', '0');
    if (options.start) params.append('start', options.start.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return `https://www.youtube.com/embed/${videoId}${query}`;
  }

  getThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : `${quality}default`}.jpg`;
  }

  getWatchUrl(videoId: string, timestamp?: number): string {
    const params = timestamp ? `?t=${timestamp}` : '';
    return `https://www.youtube.com/watch?v=${videoId}${params}`;
  }

  parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    return hours * 3600 + minutes * 60 + seconds;
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

export function createYouTubeClient(): YouTubeClient | null {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('YouTube not configured');
    }
    return null;
  }

  return new YouTubeClient({
    apiKey,
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
  });
}

export const youtube = createYouTubeClient();

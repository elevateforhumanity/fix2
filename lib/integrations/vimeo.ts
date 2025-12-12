/**
 * Vimeo Video Hosting Integration
 * Handles video uploads and management
 */

interface VimeoConfig {
  accessToken: string;
  clientId?: string;
  clientSecret?: string;
}

interface VimeoVideo {
  uri: string;
  name: string;
  description: string;
  duration: number;
  link: string;
  player_embed_url: string;
  pictures: {
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
}

interface VimeoUploadResponse {
  uri: string;
  upload: {
    upload_link: string;
    approach: string;
    size: number;
  };
}

class VimeoClient {
  private config: VimeoConfig;
  private baseUrl = 'https://api.vimeo.com';

  constructor(config: VimeoConfig) {
    this.config = config;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Vimeo API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getVideo(videoId: string): Promise<VimeoVideo> {
    return this.request(`/videos/${videoId}`);
  }

  async createUpload(fileSize: number, name: string, description?: string): Promise<VimeoUploadResponse> {
    return this.request('/me/videos', {
      method: 'POST',
      body: JSON.stringify({
        upload: {
          approach: 'tus',
          size: fileSize,
        },
        name,
        description,
        privacy: {
          view: 'unlisted',
        },
      }),
    });
  }

  async updateVideo(videoId: string, data: { name?: string; description?: string }): Promise<VimeoVideo> {
    return this.request(`/videos/${videoId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteVideo(videoId: string): Promise<void> {
    await this.request(`/videos/${videoId}`, {
      method: 'DELETE',
    });
  }

  async listVideos(page = 1, perPage = 25): Promise<{ data: VimeoVideo[]; total: number }> {
    return this.request(`/me/videos?page=${page}&per_page=${perPage}`);
  }

  getEmbedUrl(videoId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_VIMEO_BASE_URL || 'https://player.vimeo.com/video';
    return `${baseUrl}/${videoId}`;
  }
}

export function createVimeoClient(): VimeoClient | null {
  const accessToken = process.env.VIMEO_ACCESS_TOKEN;

  if (!accessToken) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new VimeoClient({
    accessToken,
    clientId: process.env.VIMEO_CLIENT_ID,
    clientSecret: process.env.VIMEO_CLIENT_SECRET,
  });
}

export const vimeo = createVimeoClient();

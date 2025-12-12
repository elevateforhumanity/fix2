/**
 * Wistia Video Hosting Integration
 * Handles video uploads and management
 */

interface WistiaConfig {
  apiToken: string;
}

interface WistiaMedia {
  id: number;
  name: string;
  type: string;
  duration: number;
  hashed_id: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  assets: Array<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
}

interface WistiaProject {
  id: number;
  name: string;
  hashed_id: string;
  mediaCount: number;
}

class WistiaClient {
  private config: WistiaConfig;
  private baseUrl = 'https://api.wistia.com/v1';

  constructor(config: WistiaConfig) {
    this.config = config;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Wistia API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getMedia(hashedId: string): Promise<WistiaMedia> {
    return this.request(`/medias/${hashedId}.json`);
  }

  async listMedias(projectId?: number): Promise<WistiaMedia[]> {
    const params = projectId ? `?project_id=${projectId}` : '';
    return this.request(`/medias.json${params}`);
  }

  async updateMedia(hashedId: string, data: { name?: string; description?: string }): Promise<WistiaMedia> {
    return this.request(`/medias/${hashedId}.json`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMedia(hashedId: string): Promise<void> {
    await this.request(`/medias/${hashedId}.json`, {
      method: 'DELETE',
    });
  }

  async listProjects(): Promise<WistiaProject[]> {
    return this.request('/projects.json');
  }

  async createProject(name: string): Promise<WistiaProject> {
    return this.request('/projects.json', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  getEmbedUrl(hashedId: string, options: { autoPlay?: boolean; muted?: boolean } = {}): string {
    const params = new URLSearchParams();
    if (options.autoPlay) params.append('autoPlay', 'true');
    if (options.muted) params.append('muted', 'true');
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return `https://fast.wistia.net/embed/iframe/${hashedId}${query}`;
  }

  getUploadUrl(projectId?: number): string {
    const params = projectId ? `?project_id=${projectId}` : '';
    return `https://upload.wistia.com/${params}`;
  }
}

export function createWistiaClient(): WistiaClient | null {
  const apiToken = process.env.WISTIA_API_TOKEN;

  if (!apiToken) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new WistiaClient({ apiToken });
}

export const wistia = createWistiaClient();

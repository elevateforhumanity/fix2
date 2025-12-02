/**
 * Cloudinary Media Management Integration
 * Handles image and video uploads with transformations
 */

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface CloudinaryUploadOptions {
  file: string | Buffer;
  folder?: string;
  publicId?: string;
  tags?: string[];
  transformation?: string;
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
}

interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}

interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'scale' | 'fit' | 'fill' | 'limit' | 'pad' | 'crop';
  quality?: number | 'auto';
  format?: string;
  gravity?: string;
  effect?: string;
}

class CloudinaryClient {
  private config: CloudinaryConfig;
  private baseUrl: string;

  constructor(config: CloudinaryConfig) {
    this.config = config;
    this.baseUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}`;
  }

  private async sign(params: Record<string, any>): Promise<string> {
    const crypto = await import('crypto');
    const timestamp = Math.floor(Date.now() / 1000);
    
    const sortedParams = Object.keys(params)
      .filter(key => key !== 'file' && key !== 'api_key')
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    const stringToSign = `${sortedParams}&timestamp=${timestamp}${this.config.apiSecret}`;
    
    return crypto
      .createHash('sha1')
      .update(stringToSign)
      .digest('hex');
  }

  async upload(options: CloudinaryUploadOptions): Promise<CloudinaryUploadResponse> {
    const resourceType = options.resourceType || 'auto';
    const timestamp = Math.floor(Date.now() / 1000);

    const params: Record<string, any> = {
      timestamp,
      ...(options.folder && { folder: options.folder }),
      ...(options.publicId && { public_id: options.publicId }),
      ...(options.tags && { tags: options.tags.join(',') }),
      ...(options.transformation && { transformation: options.transformation }),
    };

    const signature = await this.sign(params);

    const formData = new FormData();
    formData.append('file', options.file);
    formData.append('api_key', this.config.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'timestamp') {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseUrl}/${resourceType}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  async delete(publicId: string, resourceType: 'image' | 'video' | 'raw' = 'image'): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      public_id: publicId,
      timestamp,
    };

    const signature = await this.sign(params);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', this.config.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const response = await fetch(`${this.baseUrl}/${resourceType}/destroy`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary delete failed: ${response.statusText}`);
    }
  }

  getUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
    const transformations: string[] = [];

    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    if (options.gravity) transformations.push(`g_${options.gravity}`);
    if (options.effect) transformations.push(`e_${options.effect}`);

    const transformation = transformations.length > 0 ? `${transformations.join(',')}/` : '';
    
    return `https://res.cloudinary.com/${this.config.cloudName}/image/upload/${transformation}${publicId}`;
  }

  getVideoUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
    const transformations: string[] = [];

    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);

    const transformation = transformations.length > 0 ? `${transformations.join(',')}/` : '';
    
    return `https://res.cloudinary.com/${this.config.cloudName}/video/upload/${transformation}${publicId}`;
  }

  getThumbnail(publicId: string, width: number = 300, height: number = 200): string {
    return this.getUrl(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 'auto',
    });
  }
}

export function createCloudinaryClient(): CloudinaryClient | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Cloudinary not configured');
    }
    return null;
  }

  return new CloudinaryClient({
    cloudName,
    apiKey,
    apiSecret,
  });
}

export const cloudinary = createCloudinaryClient();

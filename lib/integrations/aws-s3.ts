/**
 * AWS S3 Storage Integration
 * Handles file uploads and storage management
 */

interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

interface S3UploadOptions {
  key: string;
  body: Buffer | Blob | string;
  contentType?: string;
  acl?: 'private' | 'public-read' | 'public-read-write';
  metadata?: Record<string, string>;
}

interface S3Object {
  Key: string;
  LastModified: Date;
  Size: number;
  ETag: string;
}

class S3Client {
  private config: S3Config;
  private baseUrl: string;

  constructor(config: S3Config) {
    this.config = config;
    this.baseUrl = `https://${config.bucket}.s3.${config.region}.amazonaws.com`;
  }

  private async sign(
    method: string,
    path: string,
    headers: Record<string, string> = {}
  ): Promise<Record<string, string>> {
    const crypto = await import('crypto');
    const date = new Date().toUTCString();

    const stringToSign = [
      method,
      headers['Content-MD5'] || '',
      headers['Content-Type'] || '',
      date,
      path,
    ].join('\n');

    const signature = crypto
      .createHmac('sha1', this.config.secretAccessKey)
      .update(stringToSign)
      .digest('base64');

    return {
      ...headers,
      Date: date,
      Authorization: `AWS ${this.config.accessKeyId}:${signature}`,
    };
  }

  async upload(options: S3UploadOptions): Promise<string> {
    const headers = await this.sign('PUT', `/${options.key}`, {
      'Content-Type': options.contentType || 'application/octet-stream',
      ...(options.acl && { 'x-amz-acl': options.acl }),
      ...(options.metadata &&
        Object.entries(options.metadata).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [`x-amz-meta-${key}`]: value,
          }),
          {}
        )),
    });

    const response = await fetch(`${this.baseUrl}/${options.key}`, {
      method: 'PUT',
      headers,
      // @ts-expect-error TS2769: No overload matches this call.
      body: options.body,
    });

    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.statusText}`);
    }

    return `${this.baseUrl}/${options.key}`;
  }

  async download(key: string): Promise<Blob> {
    const headers = await this.sign('GET', `/${key}`);

    const response = await fetch(`${this.baseUrl}/${key}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`S3 download failed: ${response.statusText}`);
    }

    return response.blob();
  }

  async delete(key: string): Promise<void> {
    const headers = await this.sign('DELETE', `/${key}`);

    const response = await fetch(`${this.baseUrl}/${key}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`S3 delete failed: ${response.statusText}`);
    }
  }

  async list(prefix?: string, maxKeys: number = 1000): Promise<S3Object[]> {
    const params = new URLSearchParams({
      'list-type': '2',
      'max-keys': maxKeys.toString(),
      ...(prefix && { prefix }),
    });

    const path = `/?${params.toString()}`;
    const headers = await this.sign('GET', path);

    const response = await fetch(`${this.baseUrl}${path}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`S3 list failed: ${response.statusText}`);
    }

    const xml = await response.text();
    return this.parseListResponse(xml);
  }

  private parseListResponse(xml: string): S3Object[] {
    const objects: S3Object[] = [];
    const contentRegex = /<Contents>(.*?)<\/Contents>/gs;
    const matches = xml.matchAll(contentRegex);

    for (const match of matches) {
      const content = match[1];
      const key = content.match(/<Key>(.*?)<\/Key>/)?.[1];
      const lastModified = content.match(
        /<LastModified>(.*?)<\/LastModified>/
      )?.[1];
      const size = content.match(/<Size>(.*?)<\/Size>/)?.[1];
      const etag = content.match(/<ETag>(.*?)<\/ETag>/)?.[1];

      if (key && lastModified && size && etag) {
        objects.push({
          Key: key,
          LastModified: new Date(lastModified),
          Size: parseInt(size, 10),
          ETag: etag,
        });
      }
    }

    return objects;
  }

  getPublicUrl(key: string): string {
    return `${this.baseUrl}/${key}`;
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresIn;
    const crypto = await import('crypto');

    const stringToSign = `GET\n\n\n${expires}\n/${this.config.bucket}/${key}`;
    const signature = crypto
      .createHmac('sha1', this.config.secretAccessKey)
      .update(stringToSign)
      .digest('base64');

    const params = new URLSearchParams({
      AWSAccessKeyId: this.config.accessKeyId,
      Expires: expires.toString(),
      Signature: signature,
    });

    return `${this.baseUrl}/${key}?${params.toString()}`;
  }
}

export function createS3Client(): S3Client | null {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';
  const bucket = process.env.AWS_S3_BUCKET;

  if (!accessKeyId || !secretAccessKey || !bucket) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new S3Client({
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
  });
}

export const s3 = createS3Client();

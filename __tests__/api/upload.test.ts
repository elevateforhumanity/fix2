/**
 * Unit Tests for Upload API
 * Tests the /api/media/upload endpoint
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from '@/app/api/media/upload/route';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Upload API - /api/media/upload', () => {
  let mockSupabase: any;
  let mockRequest: Request;

  beforeEach(() => {
    // Setup mock Supabase client
    mockSupabase = {
      auth: {
        getUser: vi.fn(),
      },
      storage: {
        from: vi.fn(),
      },
    };

    (createClient as any).mockResolvedValue(mockSupabase);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should return 401 if user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should proceed if user is authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'test.txt' },
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/test.txt' },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      expect(response.status).not.toBe(401);
    });
  });

  describe('File Validation', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });
    });

    it('should return 400 if no file is provided', async () => {
      const formData = new FormData();

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('file');
    });

    it('should accept valid file types', async () => {
      const validTypes = [
        { type: 'image/jpeg', name: 'test.jpg' },
        { type: 'image/png', name: 'test.png' },
        { type: 'application/pdf', name: 'test.pdf' },
        { type: 'video/mp4', name: 'test.mp4' },
      ];

      for (const fileType of validTypes) {
        mockSupabase.storage.from.mockReturnValue({
          upload: vi.fn().mockResolvedValue({
            data: { path: fileType.name },
            error: null,
          }),
          getPublicUrl: vi.fn().mockReturnValue({
            data: { publicUrl: `https://example.com/${fileType.name}` },
          }),
        });

        const formData = new FormData();
        formData.append(
          'file',
          new Blob(['test'], { type: fileType.type }),
          fileType.name
        );

        mockRequest = new Request('http://localhost:3000/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        const response = await POST(mockRequest);
        expect(response.status).toBe(200);
      }
    });
  });

  describe('File Upload', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });
    });

    it('should upload file to default bucket', async () => {
      const uploadMock = vi.fn().mockResolvedValue({
        data: { path: 'uploads/test.txt' },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: uploadMock,
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/test.txt' },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      await POST(mockRequest);

      expect(mockSupabase.storage.from).toHaveBeenCalledWith('media');
      expect(uploadMock).toHaveBeenCalled();
    });

    it('should upload file to custom bucket', async () => {
      const uploadMock = vi.fn().mockResolvedValue({
        data: { path: 'documents/test.pdf' },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: uploadMock,
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/test.pdf' },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'application/pdf' }),
        'test.pdf'
      );
      formData.append('bucket', 'documents');

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      await POST(mockRequest);

      expect(mockSupabase.storage.from).toHaveBeenCalledWith('documents');
    });

    it('should upload file to custom folder', async () => {
      const uploadMock = vi.fn().mockResolvedValue({
        data: { path: 'custom-folder/test.txt' },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: uploadMock,
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/custom-folder/test.txt' },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );
      formData.append('folder', 'custom-folder');

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      await POST(mockRequest);

      const uploadCall = uploadMock.mock.calls[0];
      expect(uploadCall[0]).toContain('custom-folder');
    });

    it('should return public URL after successful upload', async () => {
      const publicUrl = 'https://example.com/uploads/test.txt';

      mockSupabase.storage.from.mockReturnValue({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'uploads/test.txt' },
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.ok).toBe(true);
      expect(data.url).toBe(publicUrl);
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });
    });

    it('should handle storage upload errors', async () => {
      mockSupabase.storage.from.mockReturnValue({
        upload: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Storage error' },
        }),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });

    it('should handle network errors gracefully', async () => {
      mockSupabase.storage.from.mockReturnValue({
        upload: vi.fn().mockRejectedValue(new Error('Network error')),
      });

      const formData = new FormData();
      formData.append(
        'file',
        new Blob(['test'], { type: 'text/plain' }),
        'test.txt'
      );

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });
  });

  describe('File Metadata', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'uploads/test.txt' },
          error: null,
        }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/test.txt' },
        }),
      });
    });

    it('should return file metadata in response', async () => {
      const formData = new FormData();
      const file = new Blob(['test content'], { type: 'text/plain' });
      formData.append('file', file, 'test.txt');

      mockRequest = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(data.filename).toBeDefined();
      expect(data.size).toBeDefined();
      expect(data.type).toBe('text/plain');
    });

    it('should generate unique filenames', async () => {
      const uploadMock = vi.fn().mockResolvedValue({
        data: { path: 'uploads/test.txt' },
        error: null,
      });

      mockSupabase.storage.from.mockReturnValue({
        upload: uploadMock,
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/test.txt' },
        }),
      });

      const formData1 = new FormData();
      formData1.append(
        'file',
        new Blob(['test1'], { type: 'text/plain' }),
        'test.txt'
      );

      const formData2 = new FormData();
      formData2.append(
        'file',
        new Blob(['test2'], { type: 'text/plain' }),
        'test.txt'
      );

      const request1 = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData1,
      });

      const request2 = new Request('http://localhost:3000/api/media/upload', {
        method: 'POST',
        body: formData2,
      });

      const response1 = await POST(request1);
      const data1 = await response1.json();

      const response2 = await POST(request2);
      const data2 = await response2.json();

      expect(data1.filename).not.toBe(data2.filename);
    });
  });
});

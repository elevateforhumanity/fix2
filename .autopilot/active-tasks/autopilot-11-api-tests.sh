#!/bin/bash
# Task: Create API Route Tests

mkdir -p __tests__/api/checkout
cat > __tests__/api/checkout/create.test.ts << 'APITEST'
import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/checkout/create/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/auth', () => ({
  getCurrentUser: vi.fn().mockResolvedValue({
    id: 'user-123',
    email: 'test@example.com',
  }),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: {
              id: 'course-123',
              title: 'Test Course',
              student_price_cents: 5000,
            },
            error: null,
          }),
        }),
      }),
    }),
  }),
}));

describe('POST /api/checkout/create', () => {
  it('should create checkout session for valid course', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout/create', {
      method: 'POST',
      body: JSON.stringify({ courseId: 'course-123' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('sessionId');
  });

  it('should return 401 for unauthenticated user', async () => {
    vi.mocked(getCurrentUser).mockResolvedValueOnce(null);

    const request = new NextRequest('http://localhost:3000/api/checkout/create', {
      method: 'POST',
      body: JSON.stringify({ courseId: 'course-123' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
APITEST

echo "✅ Created API test template"
echo "⚠️  Need to create 49 more API tests"

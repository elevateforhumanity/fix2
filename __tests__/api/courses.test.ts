import { GET, POST } from '@/app/api/courses/route';
import { NextRequest } from 'next/server';

describe('/api/courses', () => {
  describe('GET', () => {
    it('returns list of courses', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.courses).toBeInstanceOf(Array);
      expect(data.courses.length).toBeGreaterThan(0);
    });

    it('includes course details', async () => {
      const response = await GET();
      const data = await response.json();
      const course = data.courses[0];

      expect(course).toHaveProperty('id');
      expect(course).toHaveProperty('title');
      expect(course).toHaveProperty('category');
      expect(course).toHaveProperty('duration');
    });
  });

  describe('POST', () => {
    it('creates new course', async () => {
      const courseData = {
        title: 'New Course',
        category: 'Technology',
        duration: '8 weeks',
      };

      const request = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.title).toBe(courseData.title);
      expect(data).toHaveProperty('id');
    });

    it('validates required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});

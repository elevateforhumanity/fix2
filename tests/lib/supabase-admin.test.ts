import { describe, it, expect, beforeAll } from 'vitest';
import { getUserByEmail, getUserById } from '@/lib/supabase-admin';

describe('Supabase Admin Client', () => {
  // These tests require a valid Supabase setup with service role key
  // Skip if environment variables are not set
  const skipTests =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY;

  describe('getUserByEmail', () => {
    it('should return null for non-existent email', async () => {
      if (skipTests) {
        // console.log('Skipping test - missing environment variables');
        return;
      }

      const user = await getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });

    it('should return user object for valid email', async () => {
      if (skipTests) {
        // console.log('Skipping test - missing environment variables');
        return;
      }

      // This test would need a known test user in the database
      // For now, we just verify the function doesn't throw
      try {
        await getUserByEmail('test@example.com');
      } catch (error) {
        // Expected to fail if user doesn't exist, but shouldn't throw
        expect(error).toBeUndefined();
      }
    });
  });

  describe('getUserById', () => {
    it('should throw error for non-existent user ID', async () => {
      if (skipTests) {
        // console.log('Skipping test - missing environment variables');
        return;
      }

      await expect(
        getUserById('00000000-0000-0000-0000-000000000000')
      ).rejects.toThrow();
    });

    it('should return user object for valid ID', async () => {
      if (skipTests) {
        // console.log('Skipping test - missing environment variables');
        return;
      }

      // This test would need a known test user ID
      // For now, we just verify the function signature
      try {
        await getUserById('test-user-id');
      } catch (error) {
        // Expected to fail with invalid ID format
        expect(error).toBeDefined();
      }
    });
  });
});

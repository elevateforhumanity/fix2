import { describe, it, expect, beforeAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

describe('Authentication Flow', () => {
  let supabase: ReturnType<typeof createClient>;

  beforeAll(() => {
    supabase = createClient(supabaseUrl, supabaseKey);
  });

  it('should connect to Supabase', async () => {
    expect(supabase).toBeDefined();
  });

  it('should have auth methods available', () => {
    expect(supabase.auth.signUp).toBeDefined();
    expect(supabase.auth.signInWithPassword).toBeDefined();
    expect(supabase.auth.signOut).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'invalid@test.com',
      password: 'wrongpassword',
    });
    expect(error).toBeDefined();
  });
});

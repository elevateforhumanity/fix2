import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/lib/sanitize';

describe('sanitizeHtml', () => {
  it('should sanitize dangerous HTML', () => {
    const dirty = '<script>alert("xss")</script><p>Safe content</p>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).toContain('Safe content');
  });
});

import { describe, it, expect } from 'vitest';
import { ApiError } from './api';

describe('ApiError', () => {
  it('stores status', () => {
    const e = new ApiError(404, 'Not found');
    expect(e.status).toBe(404);
  });

  it('throws on negative status', () => {
    expect(() => new ApiError(-1, 'bad')).toThrow('Invalid status code: must be between 100 and 599');
  });

  it('throws on status below 100', () => {
    expect(() => new ApiError(0, 'bad')).toThrow('Invalid status code: must be between 100 and 599');
    expect(() => new ApiError(99, 'bad')).toThrow('Invalid status code: must be between 100 and 599');
  });

  it('throws on status above 599', () => {
    expect(() => new ApiError(600, 'bad')).toThrow('Invalid status code: must be between 100 and 599');
    expect(() => new ApiError(1000, 'bad')).toThrow('Invalid status code: must be between 100 and 599');
  });

  it('accepts valid HTTP status codes', () => {
    expect(() => new ApiError(100, 'Continue')).not.toThrow();
    expect(() => new ApiError(200, 'OK')).not.toThrow();
    expect(() => new ApiError(404, 'Not Found')).not.toThrow();
    expect(() => new ApiError(500, 'Internal Server Error')).not.toThrow();
    expect(() => new ApiError(599, 'Network Connect Timeout Error')).not.toThrow();
  });
});

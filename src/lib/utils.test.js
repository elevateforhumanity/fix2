import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges multiple class names', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handles conditional classes with clsx', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('resolves tailwind conflicts with twMerge', () => {
    const result = cn('px-4 py-2', 'px-6');
    expect(result).toBe('py-2 px-6');
  });

  it('handles empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('filters out falsy values', () => {
    const result = cn('valid', false, null, undefined, 'another-valid');
    expect(result).toBe('valid another-valid');
  });

  it('handles array inputs', () => {
    const result = cn(['class-1', 'class-2'], 'class-3');
    expect(result).toBe('class-1 class-2 class-3');
  });

  it('handles object inputs with conditional keys', () => {
    const result = cn({
      'always-present': true,
      'conditionally-present': true,
      'not-present': false,
    });
    expect(result).toBe('always-present conditionally-present');
  });
});

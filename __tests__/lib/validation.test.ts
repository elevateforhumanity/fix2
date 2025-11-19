import { validators, validateForm } from '@/lib/validation';
import { vi } from 'vitest';

describe('validators', () => {
  describe('required', () => {
    it('should return error for empty string', () => {
      expect(validators.required('')).toBe('This field is required');
    });

    it('should return error for whitespace-only string', () => {
      expect(validators.required('   ')).toBe('This field is required');
    });

    it('should return error for null', () => {
      expect(validators.required(null)).toBe('This field is required');
    });

    it('should return error for undefined', () => {
      expect(validators.required(undefined)).toBe('This field is required');
    });

    it('should return null for valid string', () => {
      expect(validators.required('valid')).toBeNull();
    });
  });

  describe('email', () => {
    it('should return error for invalid email', () => {
      expect(validators.email('invalid')).toBe(
        'Please enter a valid email address'
      );
      expect(validators.email('invalid@')).toBe(
        'Please enter a valid email address'
      );
      expect(validators.email('@invalid.com')).toBe(
        'Please enter a valid email address'
      );
      expect(validators.email('invalid@domain')).toBe(
        'Please enter a valid email address'
      );
    });

    it('should return null for valid email', () => {
      expect(validators.email('test@example.com')).toBeNull();
      expect(validators.email('user.name+tag@example.co.uk')).toBeNull();
    });
  });

  describe('phone', () => {
    it('should return error for invalid phone', () => {
      expect(validators.phone('123')).toBe('Please enter a valid phone number');
      expect(validators.phone('abcdefghij')).toBe(
        'Please enter a valid phone number'
      );
    });

    it('should return null for valid phone formats', () => {
      expect(validators.phone('1234567890')).toBeNull();
      expect(validators.phone('123-456-7890')).toBeNull();
      expect(validators.phone('(123) 456-7890')).toBeNull();
      expect(validators.phone('123.456.7890')).toBeNull();
    });
  });

  describe('minLength', () => {
    it('should return error for string shorter than minimum', () => {
      const validator = validators.minLength(5);
      expect(validator('abc')).toBe('Must be at least 5 characters');
    });

    it('should return null for string meeting minimum', () => {
      const validator = validators.minLength(5);
      expect(validator('abcde')).toBeNull();
      expect(validator('abcdef')).toBeNull();
    });
  });

  describe('maxLength', () => {
    it('should return error for string longer than maximum', () => {
      const validator = validators.maxLength(5);
      expect(validator('abcdef')).toBe('Must be no more than 5 characters');
    });

    it('should return null for string within maximum', () => {
      const validator = validators.maxLength(5);
      expect(validator('abc')).toBeNull();
      expect(validator('abcde')).toBeNull();
    });
  });

  describe('zip', () => {
    it('should return error for invalid zip code', () => {
      expect(validators.zip('123')).toBe('Please enter a valid ZIP code');
      expect(validators.zip('abcde')).toBe('Please enter a valid ZIP code');
      expect(validators.zip('12345-')).toBe('Please enter a valid ZIP code');
    });

    it('should return null for valid zip codes', () => {
      expect(validators.zip('12345')).toBeNull();
      expect(validators.zip('12345-6789')).toBeNull();
    });
  });

  describe('ssn', () => {
    it('should return error for invalid SSN', () => {
      expect(validators.ssn('123')).toBe(
        'Please enter a valid SSN (XXX-XX-XXXX)'
      );
      expect(validators.ssn('abc-de-fghi')).toBe(
        'Please enter a valid SSN (XXX-XX-XXXX)'
      );
    });

    it('should return null for valid SSN formats', () => {
      expect(validators.ssn('123-45-6789')).toBeNull();
      expect(validators.ssn('123456789')).toBeNull();
    });
  });

  describe('date', () => {
    it('should return error for invalid date', () => {
      expect(validators.date('invalid')).toBe('Please enter a valid date');
      expect(validators.date('2023-13-01')).toBe('Please enter a valid date');
    });

    it('should return null for valid date', () => {
      expect(validators.date('2023-01-01')).toBeNull();
      expect(validators.date('2023-12-31')).toBeNull();
    });
  });

  describe('minAge', () => {
    // Helper to create a date string for a person of specific age
    const createBirthDate = (
      yearsAgo: number,
      monthsAgo: number = 0,
      daysAgo: number = 0
    ): string => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - yearsAgo);
      date.setMonth(date.getMonth() - monthsAgo);
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString().split('T')[0];
    };

    it('should return error for person younger than minimum age', () => {
      const validator = validators.minAge(18);
      const birthDate = createBirthDate(17); // 17 years old
      expect(validator(birthDate)).toBe('Must be at least 18 years old');
    });

    it('should return null for person exactly minimum age', () => {
      const validator = validators.minAge(18);
      const birthDate = createBirthDate(18); // Exactly 18 years old
      expect(validator(birthDate)).toBeNull();
    });

    it('should return null for person older than minimum age', () => {
      const validator = validators.minAge(18);
      const birthDate = createBirthDate(25); // 25 years old
      expect(validator(birthDate)).toBeNull();
    });

    it('should handle birthday not yet occurred this year', () => {
      const validator = validators.minAge(18);
      const today = new Date();

      // Create a birthdate 18 years ago but 1 day in the future
      const birthDate = new Date(today);
      birthDate.setFullYear(today.getFullYear() - 18);
      birthDate.setDate(today.getDate() + 1);

      const birthDateStr = birthDate.toISOString().split('T')[0];

      // Should still be 17 since birthday hasn't occurred yet
      expect(validator(birthDateStr)).toBe('Must be at least 18 years old');
    });

    it('should handle birthday that occurred yesterday', () => {
      const validator = validators.minAge(18);
      const today = new Date();

      // Create a birthdate exactly 18 years ago minus 1 day
      const birthDate = new Date(today);
      birthDate.setFullYear(today.getFullYear() - 18);
      birthDate.setDate(today.getDate() - 1);

      const birthDateStr = birthDate.toISOString().split('T')[0];

      // Should be 18 since birthday was yesterday
      expect(validator(birthDateStr)).toBeNull();
    });

    it('should handle edge case of birthday today', () => {
      const validator = validators.minAge(18);
      const today = new Date();

      // Create a birthdate exactly 18 years ago today
      const birthDate = new Date(today);
      birthDate.setFullYear(today.getFullYear() - 18);

      const birthDateStr = birthDate.toISOString().split('T')[0];

      // Should be 18 since birthday is today
      expect(validator(birthDateStr)).toBeNull();
    });

    it('should handle leap year birthdays', () => {
      const validator = validators.minAge(21);

      // Test someone born on Feb 29, 2000 (leap year)
      // They should be over 21 years old by now (2024+)
      const birthDate = '2000-02-29';

      expect(validator(birthDate)).toBeNull();
    });
  });
});

describe('validateForm', () => {
  it('should return empty object for valid form', () => {
    const values = {
      email: 'test@example.com',
      name: 'John Doe',
    };
    const rules = {
      email: [validators.required, validators.email],
      name: [validators.required, validators.minLength(3)],
    };

    const errors = validateForm(values, rules);
    expect(errors).toEqual({});
  });

  it('should return errors for invalid form', () => {
    const values = {
      email: 'invalid',
      name: '',
    };
    const rules = {
      email: [validators.required, validators.email],
      name: [validators.required],
    };

    const errors = validateForm(values, rules);
    expect(errors.email).toBe('Please enter a valid email address');
    expect(errors.name).toBe('This field is required');
  });

  it('should stop at first error for each field', () => {
    const values = {
      password: '',
    };
    const rules = {
      password: [validators.required, validators.minLength(8)],
    };

    const errors = validateForm(values, rules);
    // Should only return the first error (required), not minLength
    expect(errors.password).toBe('This field is required');
  });

  it('should validate multiple fields', () => {
    const values = {
      email: 'invalid',
      phone: '123',
      zip: 'abc',
    };
    const rules = {
      email: [validators.email],
      phone: [validators.phone],
      zip: [validators.zip],
    };

    const errors = validateForm(values, rules);
    expect(Object.keys(errors)).toHaveLength(3);
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.zip).toBeTruthy();
  });
});

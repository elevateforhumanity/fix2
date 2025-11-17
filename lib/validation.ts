// Form validation utilities

export const validators = {
  required: (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value: string) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  minLength: (min: number) => (value: string) => {
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max: number) => (value: string) => {
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  zip: (value: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(value)) {
      return 'Please enter a valid ZIP code';
    }
    return null;
  },

  ssn: (value: string) => {
    const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
    if (!ssnRegex.test(value)) {
      return 'Please enter a valid SSN (XXX-XX-XXXX)';
    }
    return null;
  },

  date: (value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  },

  minAge: (min: number) => (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < min) {
      return `Must be at least ${min} years old`;
    }
    return null;
  },
};

export function validateForm(
  values: Record<string, any>,
  rules: Record<string, Array<(value: any) => string | null>>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
}

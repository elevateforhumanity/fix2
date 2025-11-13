export interface FrameworkSettings {
  errors: string[];
  warnings: string[];
  sites: any[];
}

export function getConfig(): FrameworkSettings {
  return {
    errors: [],
    warnings: [],
    sites: [],
  };
}

export function validateFrameworkCompatibility(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  return {
    isValid: true,
    errors: [],
    warnings: [],
  };
}

export default {
  getConfig,
  validateFrameworkCompatibility,
};

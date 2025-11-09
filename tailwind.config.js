/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}', './pages/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { lg: '1120px', '2xl': '1280px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e8f0ff',
          200: '#cfe0ff',
          300: '#a9c6ff',
          400: '#7ea6ff',
          500: '#4f82ff',
          600: '#2f64f0',
          700: '#224dd1',
          800: '#1d3da6',
          900: '#1a3588',
        },
        accent: { 500: '#19c39c' },
        'brand-border': 'var(--brand-border)',
        'brand-border-dark': 'var(--brand-border-dark)',
        'brand-border-light': 'var(--brand-border-light)',
        'brand-text': 'var(--brand-text)',
        'brand-text-muted': 'var(--brand-text-muted)',
        'brand-text-light': 'var(--brand-text-light)',
        'brand-surface': 'var(--brand-surface)',
        'brand-surface-dark': 'var(--brand-surface-dark)',
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-hover': 'var(--brand-primary-hover)',
        'brand-primary-active': 'var(--brand-primary-active)',
        'brand-secondary': 'var(--brand-secondary)',
        'brand-secondary-hover': 'var(--brand-secondary-hover)',
        'brand-accent': 'var(--brand-accent)',
        'brand-muted': 'var(--brand-muted)',
        'brand-success': 'var(--brand-success)',
        'brand-success-hover': 'var(--brand-success-hover)',
        'brand-info': 'var(--brand-info)',
        'brand-info-hover': 'var(--brand-info-hover)',
        'brand-warning': 'var(--brand-warning)',
        'brand-warning-hover': 'var(--brand-warning-hover)',
        'brand-danger': 'var(--brand-danger)',
        'brand-danger-hover': 'var(--brand-danger-hover)',
        'brand-focus': 'var(--brand-focus)',
      },
      boxShadow: { soft: '0 6px 30px -10px rgba(0,0,0,0.12)' },
      borderRadius: { xl2: '1rem' },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

// injected by setup-autofix
const tokens = require('./branding/tokens.json');
module.exports.theme = module.exports.theme || {};
module.exports.theme.extend = module.exports.theme.extend || {};
const existingColors = module.exports.theme.extend.colors || {};
module.exports.theme.extend.colors = {
  ...existingColors,
  brand: { ...(existingColors.brand || {}), ...tokens.brand },
  surface: { ...(existingColors.surface || {}), ...tokens.surface },
  text: { ...(existingColors.text || {}), ...tokens.text },
};

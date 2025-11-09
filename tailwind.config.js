/**
 * Elevate for Humanity - Official Design System
 * Tailwind Configuration
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { 
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px' // Max container width
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        // EFH Official Brand Colors
        efh: {
          red: '#E41E26',        // Primary brand color
          orange: '#F97316',     // Secondary/gradient
          blue: '#2563EB',       // Accent for tech/education
          charcoal: '#1F2937',   // Main text
          slate: '#6B7280',      // Secondary text
          lightgray: '#F9FAFB',  // Backgrounds
          emerald: '#10B981',    // Success states
          amber: '#F59E0B',      // Warnings
        },
        // Semantic color system
        brand: {
          primary: '#E41E26',
          'primary-hover': '#C41820',
          'primary-active': '#A01418',
          secondary: '#F97316',
          'secondary-hover': '#EA580C',
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          light: '#D1D5DB',
        },
        surface: {
          base: '#FFFFFF',
          elevated: '#F9FAFB',
          overlay: '#F3F4F6',
        },
        status: {
          success: '#10B981',
          'success-hover': '#059669',
          warning: '#F59E0B',
          'warning-hover': '#D97706',
          error: '#EF4444',
          'error-hover': '#DC2626',
          info: '#3B82F6',
          'info-hover': '#2563EB',
        },
      },
      boxShadow: {
        card: '0 4px 14px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        soft: '0 6px 30px -10px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

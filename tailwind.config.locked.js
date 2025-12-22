/** @type {import('tailwindcss').Config} */

/**
 * LOCKED VISUAL RULES
 *
 * These values are LOCKED. Do not add new values.
 * Consistency = Polish.
 */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // LOCKED: Only these spacing values allowed
      spacing: {
        // Sections: ONLY these two
        section: '4rem', // 64px = py-16
        'section-hero': '5rem', // 80px = py-20

        // Elements: ONLY these three
        tight: '1rem', // 16px = mb-4
        standard: '1.5rem', // 24px = mb-6
        loose: '2rem', // 32px = mb-8
        header: '3rem', // 48px = mb-12
      },

      // LOCKED: Only these font sizes allowed
      fontSize: {
        hero: ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        section: ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }], // 30px
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        small: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
      },

      // LOCKED: Only these colors allowed
      colors: {
        // Backgrounds (ONLY 3)
        'bg-primary': '#ffffff',
        'bg-alternate': '#f8fafc',
        'bg-dark': '#0f172a',

        // Text (ONLY 4)
        'text-primary': '#0f172a',
        'text-secondary': '#334155',
        'text-tertiary': '#64748b',
        'text-inverse': '#ffffff',

        // Accents (ONLY 2)
        'accent-primary': '#2563eb',
        'accent-success': '#16a34a',

        // Keep existing brand colors for compatibility
        brand: {
          orange: {
            600: '#ea580c',
            700: '#c2410c',
          },
        },
      },

      // LOCKED: Only these border radius values
      borderRadius: {
        card: '0.5rem', // 8px
        button: '0.5rem', // 8px
      },

      // LOCKED: Only these shadows
      boxShadow: {
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],

  // SAFELIST: Ensure locked classes are always available
  safelist: [
    'py-16',
    'py-20',
    'mb-4',
    'mb-6',
    'mb-8',
    'mb-12',
    'gap-6',
    'text-4xl',
    'text-3xl',
    'text-base',
    'text-sm',
  ],
};

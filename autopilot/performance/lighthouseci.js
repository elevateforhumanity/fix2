// autopilot/performance/lighthouseci.js
const fs = require('fs');

const urls = fs
  .readFileSync('autopilot/performance/urls.txt', 'utf8')
  .trim()
  .split('\n');
// "desktop" | "mobile" via workflow matrix or local env
const PRESET = process.env.LH_PRESET || 'desktop';
// budgets file can differ by preset
const BUDGETS_FILE =
  PRESET === 'mobile'
    ? 'autopilot/performance/budgets.mobile.json'
    : 'autopilot/performance/budgets.json';

module.exports = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 3,
      settings: {
        preset: PRESET,
        // enable route budgets
        budgetsPath: BUDGETS_FILE,
      },
    },
    assert: {
      assertions: {
        // Category score gates
        'categories:performance': [
          'error',
          { minScore: PRESET === 'mobile' ? 0.92 : 0.9 },
        ],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],

        // Hard metric ceilings (median across 3 runs)
        'first-contentful-paint': [
          'error',
          {
            maxNumericValue: PRESET === 'mobile' ? 1800 : 2000,
            aggregationMethod: 'median',
          },
        ],
        'largest-contentful-paint': [
          'error',
          {
            maxNumericValue: PRESET === 'mobile' ? 2200 : 2500,
            aggregationMethod: 'median',
          },
        ],
        'total-blocking-time': [
          'error',
          {
            maxNumericValue: PRESET === 'mobile' ? 150 : 200,
            aggregationMethod: 'median',
          },
        ],
        'cumulative-layout-shift': [
          'error',
          {
            maxNumericValue: PRESET === 'mobile' ? 0.08 : 0.1,
            aggregationMethod: 'median',
          },
        ],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};

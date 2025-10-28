// Flat config (ESLint 9)
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  {
    ignores: [
      'public/**',
      'dist/**',
      'build/**',
      'node_modules/**',
      'docs/**',
      'android/**',
      'ios/**',
      'netlify/functions/**',
      'generate-full-app.js',
      'tools/**',
    ],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      // Many generated/experimental modules rely on loose typing and placeholder args.
      // We disable unused/any checks globally so they do not spam CI with warnings.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/test/**/*', '**/*.test.*', '**/__tests__/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: [
      'tailwind.config.js',
      'tools/**/*.cjs',
      'tools/**/*.js',
      'scripts/**/*.cjs',
      'scripts/**/*.js',
      'scripts/**/*.mjs',
      'server.js',
      'src/**/*.js',
      'utils/**/*.js',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-empty': 'off',
      'no-unreachable': 'off',
    },
  },
  {
    plugins: { react, 'react-hooks': hooks },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['class', 'jsx'] }],
      'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
      'react/jsx-no-useless-fragment': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-newline': ['warn', { prevent: true }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
    },
    settings: { react: { version: 'detect' } },
  },
];

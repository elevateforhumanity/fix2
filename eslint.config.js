// Flat config (ESLint 9)
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import ts from 'typescript-eslint';

// Custom plugin to detect potential secrets
const noSecretsPlugin = {
  rules: {
    'no-hardcoded-secrets': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Detect potential hardcoded secrets',
          category: 'Security',
          recommended: true
        },
        messages: {
          secretDetected: 'Potential secret detected: {{pattern}}. Use environment variables instead.'
        }
      },
      create(context) {
        // Patterns that might indicate secrets
        const secretPatterns = [
          { regex: /nfp_[A-Za-z0-9_-]{20,}/, name: 'Netlify token' },
          { regex: /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/, name: 'JWT token' },
          { regex: /("|')sk_live_[A-Za-z0-9]{24,}("|')/, name: 'Stripe secret key' },
          { regex: /("|')sk_test_[A-Za-z0-9]{24,}("|')/, name: 'Stripe test key' },
          { regex: /("|')AKIA[0-9A-Z]{16}("|')/, name: 'AWS access key' },
          { regex: /("|')[A-Za-z0-9+/]{40}("|').*aws.*secret/i, name: 'AWS secret key' },
          { regex: /Bearer\s+[A-Za-z0-9_-]{20,}/, name: 'Bearer token' },
          { regex: /("|')ghp_[A-Za-z0-9]{36}("|')/, name: 'GitHub personal access token' },
          { regex: /("|')gho_[A-Za-z0-9]{36}("|')/, name: 'GitHub OAuth token' }
        ];

        return {
          Literal(node) {
            if (typeof node.value !== 'string') return;
            
            const value = node.value;
            for (const pattern of secretPatterns) {
              if (pattern.regex.test(value)) {
                context.report({
                  node,
                  messageId: 'secretDetected',
                  data: { pattern: pattern.name }
                });
              }
            }
          },
          TemplateElement(node) {
            const value = node.value.raw;
            for (const pattern of secretPatterns) {
              if (pattern.regex.test(value)) {
                context.report({
                  node,
                  messageId: 'secretDetected',
                  data: { pattern: pattern.name }
                });
              }
            }
          }
        };
      }
    }
  }
};

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
    plugins: {
      'no-secrets': noSecretsPlugin
    },
    rules: {
      // Many generated/experimental modules rely on loose typing and placeholder args.
      // We disable unused/any checks globally so they do not spam CI with warnings.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'error',
      'no-secrets/no-hardcoded-secrets': 'error',
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

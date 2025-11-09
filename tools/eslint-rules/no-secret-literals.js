/**
 * ESLint Custom Rule: no-secret-literals
 * Detects hard-coded secret patterns in code to prevent accidental commits
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hard-coded secret literals',
      category: 'Security',
      recommended: true,
    },
    messages: {
      secretDetected: 'Hard-coded secret detected: {{secretType}}. Use environment variables instead.',
    },
    schema: [],
  },

  create(context) {
    // Secret patterns to detect
    const secretPatterns = [
      {
        // JWT tokens (starts with eyJ)
        pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
        type: 'JWT token',
      },
      {
        // Netlify tokens (starts with nfp_)
        pattern: /nfp_[A-Za-z0-9]{32,}/,
        type: 'Netlify token',
      },
      {
        // Generic API keys (long alphanumeric strings)
        pattern: /(['"`])(?:api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token)['"`]\s*[:=]\s*['"`][A-Za-z0-9_-]{32,}['"`]/i,
        type: 'API key or token',
      },
      {
        // AWS Access Key ID
        pattern: /AKIA[0-9A-Z]{16}/,
        type: 'AWS Access Key',
      },
      {
        // Private keys
        pattern: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/,
        type: 'Private key',
      },
      {
        // Slack tokens
        pattern: /xox[pboa]-[0-9]{12}-[0-9]{12}-[A-Za-z0-9]{24,}/,
        type: 'Slack token',
      },
      {
        // Generic bearer tokens
        pattern: /['"`]Bearer\s+[A-Za-z0-9_-]{20,}['"`]/,
        type: 'Bearer token',
      },
      {
        // Supabase anon keys (specific pattern detected in the repo)
        pattern: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
        type: 'Supabase key',
      },
    ];

    function checkNode(node) {
      const value = node.value;
      if (typeof value !== 'string') return;

      // Check each secret pattern
      for (const { pattern, type } of secretPatterns) {
        if (pattern.test(value)) {
          context.report({
            node,
            messageId: 'secretDetected',
            data: { secretType: type },
          });
          break; // Report only once per node
        }
      }
    }

    return {
      Literal(node) {
        checkNode(node);
      },
      TemplateElement(node) {
        if (node.value && node.value.raw) {
          checkNode({ value: node.value.raw, ...node });
        }
      },
    };
  },
};

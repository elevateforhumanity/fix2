/**
 * Tests for Stripe API version consistency
 * Ensures all Stripe clients use the same API version
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const EXPECTED_API_VERSION = '2024-11-20.acacia';

describe('Stripe API Version Consistency', () => {
  it('should use consistent API version across all files', () => {
    const filesToCheck = [
      'app/api/checkout/create/route.ts',
      'app/api/checkout/route.ts',
      'app/api/webhooks/stripe/route.ts',
      'app/api/stripe/route.ts',
      'app/api/stripe/webhook/route.ts',
      'app/api/create-checkout-session/route.ts',
      'app/api/hsi/create-checkout/route.ts',
      'app/api/partner-courses/create-checkout/route.ts',
      'lib/stripe/stripe-client.ts',
      'lib/payments.ts',
      'lib/billing/stripe.ts',
      'lib/partner-workflows/payments.ts',
    ];

    const inconsistentFiles: string[] = [];

    filesToCheck.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if file contains Stripe initialization
        if (content.includes('new Stripe(') && content.includes('apiVersion')) {
          // Extract API version
          const apiVersionMatch = content.match(/apiVersion:\s*['"]([^'"]+)['"]/);
          
          if (apiVersionMatch) {
            const version = apiVersionMatch[1];
            if (version !== EXPECTED_API_VERSION) {
              inconsistentFiles.push(`${file} uses ${version}`);
            }
          }
        }
      }
    });

    expect(inconsistentFiles).toEqual([]);
  });

  it('should not use deprecated API versions', () => {
    const deprecatedVersions = ['2023-10-16', '2025-10-29.clover'];
    const filesToCheck = [
      'app/api',
      'lib',
    ];

    const filesWithDeprecatedVersions: string[] = [];

    const checkDirectory = (dir: string) => {
      const fullPath = path.join(process.cwd(), dir);
      
      if (!fs.existsSync(fullPath)) return;

      const files = fs.readdirSync(fullPath, { withFileTypes: true });

      files.forEach((file) => {
        const filePath = path.join(fullPath, file.name);
        
        if (file.isDirectory()) {
          checkDirectory(path.join(dir, file.name));
        } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          
          deprecatedVersions.forEach((version) => {
            if (content.includes(`apiVersion: '${version}'`) || 
                content.includes(`apiVersion: "${version}"`)) {
              filesWithDeprecatedVersions.push(
                `${path.relative(process.cwd(), filePath)} uses deprecated ${version}`
              );
            }
          });
        }
      });
    };

    filesToCheck.forEach(checkDirectory);

    expect(filesWithDeprecatedVersions).toEqual([]);
  });

  it('should have Stripe webhook secret configured', () => {
    // This test ensures webhook handling is properly configured
    const webhookFiles = [
      'app/api/webhooks/stripe/route.ts',
      'app/api/stripe/webhook/route.ts',
    ];

    webhookFiles.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check for webhook secret usage
        expect(content).toContain('STRIPE_WEBHOOK_SECRET');
        expect(content).toContain('constructEvent');
      }
    });
  });

  it('should handle Stripe initialization errors gracefully', () => {
    const filesToCheck = [
      'app/api/checkout/create/route.ts',
      'app/api/webhooks/stripe/route.ts',
      'lib/stripe/stripe-client.ts',
    ];

    filesToCheck.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check for null/undefined handling when Stripe key is missing
        if (content.includes('new Stripe(')) {
          expect(
            content.includes('? new Stripe') || 
            content.includes('if (!stripe)') ||
            content.includes('if (!stripeKey)')
          ).toBe(true);
        }
      }
    });
  });
});

describe('Stripe Payment Flow Integration', () => {
  it('should have consistent metadata structure across checkout sessions', () => {
    const checkoutFiles = [
      'app/api/checkout/create/route.ts',
      'app/api/hsi/create-checkout/route.ts',
      'app/api/partner-courses/create-checkout/route.ts',
    ];

    checkoutFiles.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Ensure metadata is being set for tracking
        if (content.includes('checkout.sessions.create')) {
          expect(content).toContain('metadata');
        }
      }
    });
  });

  it('should handle webhook events consistently', () => {
    const webhookFiles = [
      'app/api/webhooks/stripe/route.ts',
      'app/api/stripe/webhook/route.ts',
    ];

    webhookFiles.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check for proper event handling
        expect(content).toContain('checkout.session.completed');
        expect(content).toContain('event.type');
      }
    });
  });
});

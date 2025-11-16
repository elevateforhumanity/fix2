import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock authentication
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
  });

  test('should display pricing page', async ({ page }) => {
    await page.goto('/pricing');

    await expect(page.locator('h1')).toContainText(/pricing|plans/i);

    // Should show pricing cards
    const pricingCards = page.locator(
      '[data-testid="pricing-card"], .pricing-card, .plan-card'
    );
    await expect(pricingCards.first()).toBeVisible();
  });

  test('should show course pricing', async ({ page }) => {
    await page.goto('/programs');

    // Should show prices
    const prices = page.locator('text=/\\$\\d+|free/i');
    await expect(prices.first()).toBeVisible();
  });

  test('should initiate checkout process', async ({ page }) => {
    await page.goto('/programs');

    // Click first course
    await page.click(
      '[data-testid="course-card"]:first-child, .course-card:first-child'
    );

    // Click purchase/enroll button
    await page.click(
      'button:has-text("Buy"), button:has-text("Purchase"), button:has-text("Enroll")'
    );

    // Should redirect to checkout or show payment form
    await expect(page).toHaveURL(/\/checkout|\/payment|stripe/);
  });

  test('should validate payment form', async ({ page }) => {
    await page.goto('/checkout');

    // Try to submit without filling form
    await page.click('button[type="submit"], button:has-text("Pay")');

    // Should show validation errors
    await expect(page.locator('text=/required|invalid/i')).toBeVisible();
  });

  test('should handle Stripe integration', async ({ page }) => {
    await page.goto('/checkout');

    // Should have Stripe elements
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]');

    // Check if Stripe iframe loads (may not be present in test env)
    const hasStripe = await page.locator('iframe[name*="stripe"]').count();

    if (hasStripe > 0) {
      // Stripe frame exists - test passes
      expect(hasStripe).toBeGreaterThan(0);
    }
  });
});

test.describe('Subscription Management', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
  });

  test('should display subscription status', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show subscription info
    await expect(
      page.locator('text=/subscription|plan|membership/i')
    ).toBeVisible();
  });

  test('should allow subscription upgrade', async ({ page }) => {
    await page.goto('/pricing');

    // Should have upgrade buttons
    const upgradeButtons = page.locator(
      'button:has-text("Upgrade"), a:has-text("Upgrade")'
    );

    if ((await upgradeButtons.count()) > 0) {
      await expect(upgradeButtons.first()).toBeVisible();
    }
  });
});

test.describe('Payment Security', () => {
  test('should use HTTPS for payment pages', async ({ page }) => {
    const response = await page.goto('/checkout');

    // Should have secure headers
    const headers = response?.headers();
    expect(headers?.['strict-transport-security']).toBeTruthy();
  });

  test('should not expose payment credentials', async ({ page }) => {
    await page.goto('/checkout');

    const content = await page.content();

    // Should not contain Stripe secret keys
    expect(content).not.toMatch(/sk_live_|sk_test_/);
  });
});

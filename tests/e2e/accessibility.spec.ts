import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Compliance', () => {
  test('should not have accessibility violations on homepage', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on login page', async ({
    page,
  }) => {
    await page.goto('/login');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on course page', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'mock-token',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/programs');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Keyboard Navigation', () => {
  test('should navigate with Tab key', async ({ page }) => {
    await page.goto('/');

    // Press Tab multiple times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should have visible focus indicator
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
      };
    });

    // Should have some focus styling
    const hasFocusStyle =
      focusedElement.outline !== 'none' ||
      focusedElement.outlineWidth !== '0px' ||
      focusedElement.boxShadow !== 'none';

    expect(hasFocusStyle).toBe(true);
  });

  test('should activate buttons with Enter key', async ({ page }) => {
    await page.goto('/login');

    // Focus on submit button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Press Enter
    await page.keyboard.press('Enter');

    // Should trigger form submission
    await expect(page.locator('text=/required|invalid/i')).toBeVisible();
  });

  test('should navigate menus with arrow keys', async ({ page }) => {
    await page.goto('/');

    // Open navigation menu
    const menuButton = page.locator(
      'button[aria-label*="menu"], button:has-text("Menu")'
    );

    if ((await menuButton.count()) > 0) {
      await menuButton.click();

      // Use arrow keys
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      // Should navigate menu items
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(['A', 'BUTTON']).toContain(focusedElement);
    }
  });
});

test.describe('Screen Reader Support', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check for ARIA landmarks
    const main = await page.locator('main, [role="main"]').count();
    const nav = await page.locator('nav, [role="navigation"]').count();

    expect(main).toBeGreaterThan(0);
    expect(nav).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Should have alt attribute (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1Count = await page.locator('h1').count();

    // Should have exactly one h1
    expect(h1Count).toBe(1);
  });

  test('should have form labels', async ({ page }) => {
    await page.goto('/login');

    const inputs = page.locator('input[type="email"], input[type="password"]');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');

      if (id) {
        // Should have associated label
        const label = await page.locator(`label[for="${id}"]`).count();
        expect(label > 0 || ariaLabel !== null).toBe(true);
      }
    }
  });
});

test.describe('Color Contrast', () => {
  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    // Run axe with WCAG AA standard
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });
});

test.describe('Responsive Design', () => {
  test('should be usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Should show mobile menu
    const mobileMenu = page.locator(
      'button[aria-label*="menu"], button:has-text("Menu")'
    );
    await expect(mobileMenu).toBeVisible();
  });

  test('should be usable on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Should render properly
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should be usable on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Should render properly
    await expect(page.locator('h1')).toBeVisible();
  });
});

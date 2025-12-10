import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Public pages that should return 200
const publicPages = [
  { path: "/", title: /Elevate for Humanity|Free Career Training/ },
  { path: "/programs", title: /Programs|Career Training/ },
  { path: "/apply", title: /Apply|Application/ },
  { path: "/about", title: /About|Our Story/ },
  { path: "/contact", title: /Contact|Get in Touch/ },
  { path: "/funding", title: /Funding|WIOA/ },
  { path: "/programs/cna", title: /CNA|Certified Nursing Assistant/ },
  { path: "/programs/barber-apprenticeship", title: /Barber|Apprenticeship/ },
  { path: "/programs/hvac-technician", title: /HVAC|Technician/ },
];

// Protected pages that should redirect to login
const protectedPages = [
  "/student/dashboard",
  "/student/courses",
  "/lms/dashboard",
  "/admin",
  "/admin/courses",
];

test.describe("Public Pages", () => {
  for (const page of publicPages) {
    test(`${page.path} loads successfully`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(`${BASE_URL}${page.path}`);
      
      // Check status code
      expect(response?.status()).toBeLessThan(400);
      
      // Check title
      await expect(browserPage).toHaveTitle(page.title);
      
      // Check that logo is visible
      const logo = browserPage.locator('img[alt*="Elevate"]').first();
      await expect(logo).toBeVisible();
    });
  }
});

test.describe("Protected Pages", () => {
  for (const path of protectedPages) {
    test(`${path} requires authentication`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${path}`);
      
      // Should redirect (307) or show unauthorized (401/403)
      const status = response?.status();
      expect([200, 307, 401, 403]).toContain(status);
      
      // If 200, should be on login page or show login form
      if (status === 200) {
        const url = page.url();
        const hasLoginForm = await page.locator('input[type="email"], input[type="password"]').count() > 0;
        expect(url.includes("login") || url.includes("signin") || hasLoginForm).toBeTruthy();
      }
    });
  }
});

test.describe("Navigation", () => {
  test("Header navigation works", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check that main nav items are visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Check Programs link
    const programsLink = page.locator('a[href*="programs"]').first();
    await expect(programsLink).toBeVisible();
  });

  test("Footer is present", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check contact info is present
    await expect(footer.locator('text=/317-314-3757|contact/i')).toBeVisible();
  });
});

test.describe("Forms", () => {
  test("Apply form has required fields", async ({ page }) => {
    await page.goto(`${BASE_URL}/apply`);
    
    // Check for common form fields
    const hasFirstName = await page.locator('input[name*="first" i], input[placeholder*="first" i]').count() > 0;
    const hasLastName = await page.locator('input[name*="last" i], input[placeholder*="last" i]').count() > 0;
    const hasEmail = await page.locator('input[type="email"]').count() > 0;
    
    expect(hasFirstName || hasLastName || hasEmail).toBeTruthy();
  });

  test("Contact form is accessible", async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    
    // Check that contact information is visible
    const hasPhone = await page.locator('text=/317-314-3757/').count() > 0;
    const hasEmail = await page.locator('text=/@elevateforhumanity|@gmail/i').count() > 0;
    
    expect(hasPhone || hasEmail).toBeTruthy();
  });
});

test.describe("Performance", () => {
  test("Homepage loads within 5 seconds", async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
  });

  test("Images have alt text", async ({ page }) => {
    await page.goto(BASE_URL);
    
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 10)) { // Check first 10 images
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});

test.describe("Accessibility", () => {
  test("Page has proper heading structure", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Should have an h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test("Links have accessible names", async ({ page }) => {
    await page.goto(BASE_URL);
    
    const links = await page.locator('a').all();
    
    for (const link of links.slice(0, 10)) { // Check first 10 links
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  });
});

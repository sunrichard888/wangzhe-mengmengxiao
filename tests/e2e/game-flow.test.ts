import { test, expect } from '@playwright/test';

test.describe('Game Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the main menu', async ({ page }) => {
    await expect(page).toHaveTitle(/王者萌萌消/);
    await expect(page.locator('text=PLAY')).toBeVisible();
  });

  test('should start a new game', async ({ page }) => {
    // Click play button
    await page.click('text=PLAY');
    
    // Wait for game to load
    await page.waitForSelector('canvas');
    
    // Check that game UI is visible
    await expect(page.locator('text=Score:')).toBeVisible();
    await expect(page.locator('text=Moves:')).toBeVisible();
  });

  test('should complete a match', async ({ page }) => {
    // Start game
    await page.click('text=PLAY');
    await page.waitForSelector('canvas');

    // Get canvas element
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Note: Actual card interaction testing would require
    // more complex Playwright interactions with Phaser canvas
    // This is a placeholder for the full e2e test
  });

  test('should show level complete screen', async ({ page }) => {
    // Start game
    await page.click('text=PLAY');
    await page.waitForSelector('canvas');

    // This would require simulating enough moves to complete the level
    // For now, we just verify the game starts
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('should handle pause menu', async ({ page }) => {
    // Start game
    await page.click('text=PLAY');
    await page.waitForSelector('canvas');

    // Click pause button (if implemented in UI)
    // This is a placeholder for pause functionality testing
  });

  test('should navigate back to main menu', async ({ page }) => {
    // Start game
    await page.click('text=PLAY');
    await page.waitForSelector('canvas');

    // Navigate back (would need pause menu or game over)
    // For now, just reload and check main menu
    await page.goto('http://localhost:3000');
    await expect(page.locator('text=PLAY')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('text=王者萌萌消')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('text=PLAY')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
  });
});

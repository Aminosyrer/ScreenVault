import { test, expect } from '@playwright/test';

test('should have the correct title', async ({ page }) => {
    const baseURL = process.env.BASE_URL || 'http://localhost:5173';
    console.log(`Navigating to ${baseURL}`);
    await page.goto(baseURL);

    await expect(page).toHaveTitle(/Screen Vault/);
});

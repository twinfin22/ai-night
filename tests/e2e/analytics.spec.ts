import { expect, test } from '@playwright/test';

test('default build does not load or initialize GA4', async ({ page }) => {
  const gaRequests: string[] = [];
  const gaErrors: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('googletagmanager.com')) gaRequests.push(request.url());
  });
  page.on('console', (message) => {
    if (message.type() === 'error' && /gtag|googletagmanager/i.test(message.text())) gaErrors.push(message.text());
  });

  await page.goto('/');
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  await expect.poll(() => gaRequests).toEqual([]);
  await expect.poll(() => gaErrors).toEqual([]);
  expect(await page.evaluate(() => typeof (window as Window & { gtag?: unknown }).gtag)).toBe('undefined');
});

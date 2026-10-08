import { expect, test } from '@playwright/test';

for (const kind of ['ordinary', 'tutorial'] as const) {
  for (const status of [200, 429, 503]) {
    test(`${kind} form handles HTTP ${status} with retained input and direct email fallback`, async ({ page }) => {
      await page.route('**/api/contact', (route) => route.fulfill({ status, contentType: 'application/json', headers: status === 429 ? { 'Retry-After': '61' } : {}, body: JSON.stringify(status === 200 ? { ok: true } : { error: 'synthetic failure' }) }));
      if (kind === 'ordinary') {
        await page.goto('/');
        await page.locator('.form-fallback summary').click();
        await page.locator('.contact-form input[name="email"]').fill('student@example.com');
        await page.locator('.contact-form textarea').fill('My retained question');
        await page.locator('.contact-form button[type="submit"]').click();
        const feedback = page.locator('.contact-form__status');
        if (status === 200) {
          await expect(feedback).toHaveText('문의가 전송되었습니다.');
          await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('');
        } else {
          await expect(feedback).toContainText(status === 429 ? '2분 후' : '잠시 이용할 수 없습니다');
          await expect(page.locator('.contact-form textarea')).toHaveValue('My retained question');
          await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('student@example.com');
          await expect(page.locator('.contact-form button[type="submit"]')).toBeEnabled();
        }
        await expect(page.locator('.contact-form a[href="mailto:hello@ai-night.study"]')).toBeVisible();
      } else {
        await page.addInitScript(() => {
          localStorage.setItem('ainight.version', '5'); localStorage.setItem('ainight.app', 'codex'); localStorage.setItem('ainight.os', 'macos');
        });
        await page.goto('/tutorials/day-01/');
        await page.locator('[data-help]').click();
        await page.locator('[data-help-email]').fill('student@example.com');
        await page.locator('[data-help-question]').fill('My retained question');
        await page.locator('[data-help-submit]').click();
        if (status === 200) {
          await expect(page.locator('[data-help-success]')).toBeVisible();
          await expect(page.locator('[data-help-question]')).toHaveValue('');
        } else {
          await expect(page.locator('[data-help-error]')).toContainText(status === 429 ? '2분 후' : '잠시 이용할 수 없습니다');
          await expect(page.locator('[data-help-question]')).toHaveValue('My retained question');
          await expect(page.locator('[data-help-email]')).toHaveValue('student@example.com');
          await expect(page.locator('[data-help-submit]')).toBeEnabled();
        }
        await expect(page.locator('[data-help-form] a[href="mailto:hello@ai-night.study"]')).toBeVisible();
      }
    });
  }
}

test('tutorial retries retain the provider idempotency key across 429 and 503', async ({ page }) => {
  const bodies: any[] = [];
  await page.route('**/api/contact', (route) => {
    bodies.push(route.request().postDataJSON());
    return route.fulfill({ status: bodies.length === 1 ? 429 : 503, contentType: 'application/json', headers: { 'Retry-After': '60' }, body: JSON.stringify({ error: 'synthetic failure' }) });
  });
  await page.addInitScript(() => {
    localStorage.setItem('ainight.version', '5'); localStorage.setItem('ainight.app', 'codex'); localStorage.setItem('ainight.os', 'macos');
  });
  await page.goto('/tutorials/day-01/');
  await page.locator('[data-help]').click();
  await page.locator('[data-help-email]').fill('student@example.com');
  await page.locator('[data-help-question]').fill('My retained question');
  await page.locator('[data-help-submit]').click();
  await expect(page.locator('[data-help-error]')).toContainText('1분 후');
  await page.locator('[data-help-submit]').click();
  await expect(page.locator('[data-help-error]')).toContainText('잠시 이용할 수 없습니다');
  expect(bodies).toHaveLength(2);
  expect(bodies[1].requestId).toBe(bodies[0].requestId);
});

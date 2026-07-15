import { expect, test } from '@playwright/test';

test('Day 1 lets a learner select Codex and starts the Week 1 one-action lesson', async ({ page }) => {
  await page.goto('/tutorials/day-01/');

  await expect(page.getByRole('heading', { name: '이번 주에 쓸 앱을 고르세요' })).toBeVisible();
  await expect(page.getByRole('button', { name: '수업 시작' })).toBeDisabled();

  await page.getByRole('radio', { name: /Codex/ }).check();
  await page.getByRole('button', { name: '수업 시작' }).click();

  await expect(page.getByRole('heading', { name: '오늘 할 일을 먼저 살펴봐요' })).toBeVisible();
  await expect(page.locator('[data-one-action]')).toHaveAttribute('data-day', '1');
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();

  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: '설치 전에 준비해요' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('ainight.position'))).toContain('d01-prep');
});

test('tutorial list retains direct routes for all Week 1 days', async ({ page }) => {
  await page.goto('/tutorials/');

  for (let day = 1; day <= 5; day += 1) {
    await expect(page.locator(`a[href="/tutorials/day-${String(day).padStart(2, '0')}/"]`).first()).toBeVisible();
  }
});

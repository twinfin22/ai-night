import { expect, test } from '@playwright/test';

test('Day 12 advances without a completion checkbox', async ({ page }) => {
  await page.goto('/tutorials/day-12/');
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: '개인정보 없는 1분 직접 녹음 준비하기' })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await expect(page.getByText('이 행동을 마쳤습니다')).toHaveCount(0);
});

test('Day 15 lists the selected track in its real order', async ({ page }) => {
  await page.goto('/tutorials/day-15/');
  await page.getByRole('radio', { name: 'Codex' }).check();
  await page.getByRole('button', { name: '수업 시작' }).click();
  const list = page.locator('.visual-timeline');
  await expect(list).toContainText('예약할 업무 하나 고르기');
  await expect(list).toContainText('예약 작업 화면 열기');
  await expect(list).not.toContainText('Claude Cowork');
  await expect(page.locator('[data-progress-label]')).toContainText('/ 12');
});

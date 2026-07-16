import { expect, test } from '@playwright/test';

test('Day 12 starts with privacy-safe direct recording preparation', async ({ page }) => {
  await page.goto('/tutorials/day-12/');
  await page.getByRole('button', { name: '오늘의 실습 시작하기' }).click();
  await expect(page.getByRole('heading', { name: '개인정보 없는 1분 직접 녹음 준비하기' })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음' })).toBeDisabled();
  await page.getByRole('checkbox', { name: '이 행동을 마쳤습니다' }).check();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
});

test('Day 15 lists the selected track in its real order', async ({ page }) => {
  await page.goto('/tutorials/day-15/');
  await page.getByRole('radio', { name: 'Codex' }).check();
  await page.getByRole('button', { name: '수업 시작' }).click();
  const list = page.locator('.workboard-focus ol');
  await expect(list).toContainText('예약 기능을 먼저 확인하세요');
  await expect(list).toContainText('예약 작업 화면 열기');
  await expect(list).not.toContainText('Claude Cowork');
  await expect(page.locator('[data-progress-label]')).toContainText('/ 12');
});

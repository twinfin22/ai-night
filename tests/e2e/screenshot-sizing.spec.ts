import { expect, test } from '@playwright/test';

test('screenshots are contained visual references with an enlargement control', async ({ page }) => {
  await page.goto('/tutorials/day-12/');
  for (let index = 0; index < 4; index += 1) await page.getByRole('button', { name: '다음' }).click();
  const image = page.getByRole('img', { name: '클로바노트 공식 앱의 음성 기록과 화자 표시 화면' });
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty('naturalWidth', 392);
  const enlarge = image.locator('..');
  await expect(enlarge).toHaveAttribute('data-image-open', '');
  await enlarge.click();
  await expect(page.locator('[data-image-dialog]')).toBeVisible();
});

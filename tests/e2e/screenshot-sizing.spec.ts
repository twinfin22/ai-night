import { expect, test } from '@playwright/test';

test('screenshots are static, contained visual references', async ({ page }) => {
  await page.goto('/tutorials/day-12/');
  for (let index = 0; index < 4; index += 1) await page.getByRole('button', { name: '다음' }).click();
  const image = page.getByRole('img', { name: '클로바노트 공식 앱의 음성 기록과 화자 표시 화면' });
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty('naturalWidth', 392);
  await expect(image.locator('..')).not.toHaveRole('button');
  await expect(page.locator('[data-visual] button, .image-dialog')).toHaveCount(0);
});

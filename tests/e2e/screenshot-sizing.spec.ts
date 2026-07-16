import { expect, test } from '@playwright/test';

test('portrait screenshots keep their native width and still open in the zoom dialog', async ({ page }) => {
  await page.goto('/tutorials/day-12/');
  await page.getByRole('button', { name: '오늘의 실습 시작하기' }).click();

  for (let index = 0; index < 3; index += 1) {
    await page.getByRole('checkbox', { name: '이 행동을 마쳤습니다' }).check();
    await page.getByRole('button', { name: '다음' }).click();
  }

  const image = page.getByRole('img', { name: '클로바노트 공식 앱의 음성 기록과 화자 표시 화면' });
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty('naturalWidth', 392);
  await expect(image).toHaveJSProperty('clientWidth', 392);

  await page.getByRole('button', { name: '스크린샷 크게 보기' }).click();
  await expect(page.locator('.image-dialog')).toBeVisible();
});

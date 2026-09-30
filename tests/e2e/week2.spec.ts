import { expect, test } from '@playwright/test';

test('Day 6 advances without self-confirmation', async ({ page }) => {
  await page.goto('/tutorials/day-06/');
  await expect(page.getByRole('heading', { name: 'AI에게 일을 맡기는 두 가지 원칙' })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: '오늘 맡길 반복 업무를 한 문장으로 정하기' })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await expect(page.getByText('이 화면에서 직접 해봤나요?')).toHaveCount(0);
});

test('Day 7 gates only the output format and keeps the selected branch', async ({ page }) => {
  await page.goto('/tutorials/day-07/');
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: '오늘 만들 결과를 한 문장으로 정하기' })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음' })).toBeDisabled();
  await page.getByRole('radio', { name: '5장 슬라이드' }).check();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: 'A안: 5장 슬라이드 목차 먼저 만들기' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'B안: Google Docs 문서 초안 만들기' })).toHaveCount(0);
});

test('Day 7 restores the saved Docs choice and its branch', async ({ page }) => {
  await page.goto('/tutorials/day-07/');
  await page.getByRole('button', { name: '다음' }).click();
  await page.getByRole('radio', { name: 'Google Docs 문서' }).check();
  await page.reload();
  await expect(page.getByRole('radio', { name: 'Google Docs 문서' })).toBeChecked();
  await page.getByRole('button', { name: '다음' }).click();
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('heading', { name: 'B안: Google Docs 문서 초안 만들기' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A안: 5장 슬라이드 목차 먼저 만들기' })).toHaveCount(0);
});

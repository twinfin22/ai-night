import { expect, test } from '@playwright/test';

for (const sample of [
  { day: 1, key: '1.codex', page: 'd01-start', view: 'FOCUS' },
  { day: 1, key: '1.codex', page: 'd01-folder', view: 'WORKBENCH' },
  { day: 1, key: '1.codex', page: 'd01-codex-download', view: 'SPOTLIGHT' },
  { day: 1, key: '1.codex', page: 'd01-first-prompt', view: 'PROMPT' },
  { day: 2, key: '2.codex', page: 'd02-review', view: 'COMPARISON' },
  { day: 3, key: '3.common', page: 'd03-retro', view: 'WORKBOOK' },
]) {
  test(`${sample.view} keeps the visual read-only`, async ({ page }) => {
    await page.addInitScript((state) => {
      localStorage.setItem('ainight.version', '5');
      localStorage.setItem('ainight.app', 'codex');
      localStorage.setItem('ainight.position', JSON.stringify({ [state.key]: state.page }));
    }, sample);
    await page.goto(`/tutorials/day-${String(sample.day).padStart(2, '0')}/`);
    await expect(page.locator('[data-visual]')).toHaveAttribute('data-view', sample.view);
    await expect(page.locator('[data-visual] button, [data-visual] a, [data-visual] input, [data-visual] textarea, [data-visual] select, [data-visual] summary')).toHaveCount(0);
    await expect(page.locator('[data-lesson] :is(button,a,input,textarea,select,summary):not([data-coach] *)')).toHaveCount(0);
  });
}

test('all 20 one-action routes open a usable lesson', async ({ page }) => {
  for (let day = 1; day <= 20; day += 1) {
    await page.goto(`/tutorials/day-${String(day).padStart(2, '0')}/`);
    const chooser = page.locator('[data-preflight]');
    if (await chooser.isVisible()) {
      await page.getByRole('radio', { name: /Codex/ }).check();
      await page.getByRole('button', { name: '수업 시작' }).click();
    }
    await expect(page.locator('[data-lesson]')).toBeVisible();
    await expect(page.locator('[data-title]')).not.toBeEmpty();
    await expect(page.getByRole('button', { name: /다음|완료하기/ })).toBeVisible();
  }
});

test('technical details and downloads stay in the coach immediately above navigation', async ({ page }) => {
  await page.goto('/tutorials/day-13/');
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByText('안 보여요 · 보충 설명')).toBeVisible();
  await expect(page.locator('[data-support-details] + footer [data-next]')).toBeVisible();
  await expect(page.getByRole('button', { name: '프롬프트 복사하기' })).toBeEnabled();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();

  await page.goto('/tutorials/day-18/');
  await page.getByRole('button', { name: '다음' }).click();
  await page.getByRole('button', { name: '다음' }).click();
  const download = page.getByRole('link', { name: '카페 매출 CSV 다운로드' });
  await expect(download).toHaveAttribute('download', '');
  await expect(download.locator('xpath=ancestor::*[@data-coach]')).toHaveCount(1);
  await expect(page.locator('[data-coach] .guide-downloads a')).toHaveCount(4);

  await page.goto('/tutorials/day-19/');
  const day19Chooser = page.locator('[data-preflight]');
  if (await day19Chooser.isVisible()) {
    await page.getByRole('radio', { name: /Codex/ }).check();
    await page.getByRole('button', { name: '수업 시작' }).click();
  }
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();
  await expect(page.getByRole('link', { name: /GPTers/ })).toContainText('GPTers · 2026-07-16 확인');
  await expect(page.locator('[data-visual] a')).toHaveCount(0);
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`Day 17 optional blog grader works at ${viewport.width}px`, async ({ page, context }) => {
    await page.setViewportSize(viewport);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      localStorage.setItem('ainight.version', '5');
      localStorage.setItem('ainight.position', JSON.stringify({ '17.common': 'd17-action-08' }));
    });
    await page.goto('/tutorials/day-17/');

    await expect(page.locator('[data-time]')).toHaveText('30분 + 선택 10분');
    await expect(page.getByRole('heading', { name: '선택 심화: 내 글 합격 검사기 만들기' })).toBeVisible();
    await expect(page.getByText('잘된 블로그 글 3개가 없으면 다음을 눌러 회고로 건너뛰세요.', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: /참고 원문/ })).toContainText('100 School · 2026-07-27 확인');
    await expect(page.locator('[data-progress-label]')).toHaveText('9 / 10');

    await page.getByRole('button', { name: '프롬프트 복사하기' }).click();
    await expect(page.getByRole('button', { name: '복사됨' })).toBeVisible();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('잘된 블로그 글 3개');

    await page.getByRole('button', { name: '다음' }).click();
    await expect(page.getByRole('heading', { name: '오늘의 회고' })).toBeVisible();
    await expect(page.locator('[data-progress-label]')).toHaveText('10 / 10');
  });
}

test('invalid saved positions recover and Day 20 completion remains deduplicated', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('ainight.position', JSON.stringify({ '7.common': 'missing-page', '20.common': 'd20-action-99' }));
    localStorage.setItem('ainight.done', JSON.stringify([20, '20', 19]));
  });
  await page.goto('/tutorials/day-07/');
  await expect(page.locator('[data-title]')).not.toBeEmpty();
  await expect(page.locator('[data-progress-label]')).toContainText('1 /');

  await page.goto('/tutorials/day-20/');
  await expect(page.getByRole('heading', { name: '오늘의 회고' })).toBeVisible();
  await page.getByRole('button', { name: '완료하기' }).click();
  await expect(page).toHaveURL(/\/tutorials\/$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('ainight.done'))).toBe('[19,20]');
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('ainight.completed'))).toBe('20');
});

import { expect, test } from '@playwright/test';

for (const viewport of [{ width: 1366, height: 768 }, { width: 390, height: 844 }, { width: 188, height: 844 }]) {
  test(`Day 1 one-action shell stays readable at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/tutorials/day-01/');
    await page.getByRole('radio', { name: /Codex/ }).check();
    await page.getByRole('button', { name: '수업 시작' }).click();

    await expect(page.locator('[data-workboard][data-view="FOCUS"]')).toBeVisible();
    await expect(page.locator('[data-timeline] [data-timeline-marker]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: '다음' })).toBeEnabled();

    const layout = await page.evaluate(() => {
      const button = document.querySelector('[data-next]') as HTMLElement;
      const body = document.querySelector('.one-action__body') as HTMLElement;
      const workboard = document.querySelector('[data-workboard]') as HTMLElement;
      return {
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        nextHeight: button.getBoundingClientRect().height,
        bodyOverflow: getComputedStyle(body).overflowY,
        workboardOverflow: getComputedStyle(workboard).overflowY,
      };
    });

    expect(layout.documentOverflow).toBe(0);
    expect(layout.nextHeight).toBeGreaterThanOrEqual(52);
    expect(layout.bodyOverflow).not.toBe('auto');
    expect(layout.workboardOverflow).not.toBe('auto');
  });
}

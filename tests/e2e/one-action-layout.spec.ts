import { expect, test } from '@playwright/test';

for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }, { width: 900, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`A2 coach/visual contract at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/tutorials/day-01/');
    await page.getByRole('radio', { name: /Codex/ }).check();
    await page.getByRole('button', { name: '수업 시작' }).click();
    await expect(page.locator('[data-coach]')).toBeVisible();
    await expect(page.locator('[data-visual]')).toBeVisible();
    await expect(page.locator('[data-visual] button, [data-visual] a, [data-visual] input, [data-visual] textarea, [data-visual] select, [data-visual] summary')).toHaveCount(0);
    const result = await page.evaluate(() => {
      const coach = document.querySelector('[data-coach]') as HTMLElement;
      const visual = document.querySelector('[data-visual]') as HTMLElement;
      const guide = document.querySelector('[data-guide]') as HTMLElement;
      const support = document.querySelector('[data-support]') as HTMLElement;
      const next = document.querySelector('[data-next]') as HTMLElement;
      const actionsAreInCoach = [...document.querySelectorAll('[data-lesson] button, [data-lesson] a, [data-lesson] input, [data-lesson] textarea, [data-lesson] select, [data-lesson] summary')].every((element) => element.closest('[data-coach]'));
      return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, coachWidth: coach.getBoundingClientRect().width, coachTop: coach.getBoundingClientRect().top, visualTop: visual.getBoundingClientRect().top, nextHeight: next.getBoundingClientRect().height, actionsAreInCoach, guideOverflow: getComputedStyle(guide).overflowY, supportBottom: support.getBoundingClientRect().bottom };
    });
    expect(result.overflow).toBe(0);
    expect(result.nextHeight).toBeGreaterThanOrEqual(52);
    expect(result.actionsAreInCoach).toBe(true);
    if (viewport.width > 900) expect(result.coachWidth).toBe(360);
    else expect(result.coachTop).toBeLessThanOrEqual(result.visualTop);
    if (viewport.width === 1280) { expect(result.guideOverflow).toBe('auto'); expect(result.supportBottom).toBeLessThanOrEqual(viewport.height); }
    await expect(page.getByText(/자동 저장|지금 할 일 ·|화면을 확인했어요|공식 페이지를 확인했습니다|이 행동을 마쳤습니다|스크린샷 크게 보기/)).toHaveCount(0);
  });
}

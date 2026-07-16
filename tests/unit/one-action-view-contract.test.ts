import { describe, expect, it } from 'vitest';
import { courseDays, type OneActionTutorialDay, type OneActionView } from '../../src/data/course';

const expectedViews: OneActionView[] = ['FOCUS', 'WORKBENCH', 'SPOTLIGHT', 'PROMPT', 'COMPARISON', 'WORKBOOK'];

describe('one-action view contract', () => {
  it('keeps all six view types in the shared one-action course', () => {
    const views = new Set(
      courseDays
        .filter((day): day is OneActionTutorialDay => day.experience === 'one-action')
        .flatMap((day) => day.pages.map((page) => page.view)),
    );

    expect([...views].sort()).toEqual([...expectedViews].sort());
  });

  it('keeps each page on exactly one supported renderer view', () => {
    const oneActionDays = courseDays.filter((day): day is OneActionTutorialDay => day.experience === 'one-action');
    expect(oneActionDays.flatMap((day) => day.pages).every((page) => expectedViews.includes(page.view))).toBe(true);
  });
});

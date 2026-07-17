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

  it('uses no advanceWhen flags and only one required progress control', () => {
    const pages = courseDays.filter((day): day is OneActionTutorialDay => day.experience === 'one-action').flatMap((day) => day.pages);
    const controls = pages.flatMap((page) => (page.controls || []).map((control) => ({ page: page.id, control })));
    expect(pages.every((page) => !('advanceWhen' in page))).toBe(true);
    expect(controls).toEqual([expect.objectContaining({ page: 'd07-choice-output', control: expect.objectContaining({ id: 'output-format', required: true }) })]);
  });
});

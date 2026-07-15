import { describe, expect, it } from 'vitest';
import { week2Days, week2SourceRecords } from '../../src/data/course-week2';

describe('Week 2 source snapshot', () => {
  it('preserves the 39 sheet records and the Day 7 branch contract', () => {
    expect(week2SourceRecords).toHaveLength(39);
    expect(week2Days.map((day) => day.pages.length)).toEqual([10, 8, 6, 6, 9]);
    expect(week2SourceRecords.filter((record) => record.supporting)).toHaveLength(12);
    expect(week2SourceRecords.filter((record) => record.screenshot)).toHaveLength(9);
    expect(new Set(week2SourceRecords.map((record) => record.screenshot).filter(Boolean)).size).toBe(8);

    const day7 = week2Days.find((day) => day.day === 7)!;
    expect(day7.pages.find((page) => page.id === 'd07-choice-output')?.kind).toBe('CHOICE');
    expect(day7.pages.find((page) => page.id === 'd07-action-slides')?.visibleWhen).toEqual({ choiceKey: 'output-format', equals: 'slides' });
    expect(day7.pages.find((page) => page.id === 'd07-action-docs')?.visibleWhen).toEqual({ choiceKey: 'output-format', equals: 'docs' });
  });
});

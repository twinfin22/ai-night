import { describe, expect, it } from 'vitest';
import { courseDays, courseVersion } from '../../src/data/course';

describe('Week 1 one-action course data', () => {
  it('keeps days 1 through 5 on the one-action renderer with unique page ids', () => {
    const week1 = courseDays.filter((day) => day.day >= 1 && day.day <= 5);

    expect(courseVersion).toBe('5');
    expect(week1).toHaveLength(5);

    for (const day of week1) {
      expect(day.experience).toBe('one-action');
      if (day.experience !== 'one-action') continue;

      const ids = day.pages.map((page) => page.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids[0]).toBe(`d${String(day.day).padStart(2, '0')}-start`);
      expect(day.pages.some((page) => page.kind === 'START')).toBe(true);
    }
  });
});

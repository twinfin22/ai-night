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

  it('applies only page-id overrides for the Week 2 QA copy and links', () => {
    const day6 = week2Days.find((day) => day.day === 6)!;
    const day7 = week2Days.find((day) => day.day === 7)!;
    const day10 = week2Days.find((day) => day.day === 10)!;

    const helper = day6.pages.find((page) => page.id === 'd06-action-07')!;
    expect(helper.action).toContain('새 대화/보조 AI');
    expect(helper.supporting).toContain('새 대화/보조 AI');
    expect(helper.action).not.toContain('subagent');
    expect(helper.source.action).toContain('subagent');

    const choice = day7.pages.find((page) => page.id === 'd07-choice-output')!;
    const slides = day7.pages.find((page) => page.id === 'd07-action-slides')!;
    const docs = day7.pages.find((page) => page.id === 'd07-action-docs')!;
    const comparison = day7.pages.find((page) => page.id === 'd07-action-05')!;
    expect(choice.replacementText).toContain('첨부한 원본 파일');
    expect(slides.prompt).toContain('첨부한 원본 파일을 5장 슬라이드 초안');
    expect(docs.prompt).toContain('첨부한 원본 파일을 읽고');
    expect(comparison.title).toContain('5장 슬라이드 또는 Google Docs 문서');

    const github = day10.pages.find((page) => page.id === 'd10-action-01')!;
    const vercel = day10.pages.find((page) => page.id === 'd10-action-02')!;
    expect(github.officialLinks).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'GitHub 가입', href: 'https://github.com/signup', verifiedAt: '2026-07-16' }),
      expect.objectContaining({ label: 'GitHub 로그인', href: 'https://github.com/login' }),
    ]));
    expect(vercel.officialLinks).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Vercel 로그인', href: 'https://vercel.com/login' }),
      expect.objectContaining({ label: 'Vercel Dashboard', href: 'https://vercel.com/dashboard' }),
    ]));
  });

  it('does not alter Day 8 or Day 9 source-derived pages', () => {
    for (const day of week2Days.filter((item) => item.day === 8 || item.day === 9)) {
      for (const page of day.pages) {
        expect(page.title).toBe(page.source.headline);
        expect(page.description).toBe(page.source.description);
        expect(page.prompt).toBe(page.source.prompt);
      }
    }
  });
});

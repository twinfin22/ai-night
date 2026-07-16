import { describe, expect, it } from 'vitest';
import { courseDays, courseVersion } from '../../src/data/course';

type OfficialLink = {
  label: string;
  href: string;
  publisher: string;
  verifiedAt: string;
  accessNote: string;
};

const links = (page: unknown) => (page as { officialLinks?: OfficialLink[] }).officialLinks ?? [];

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

  it('adds the Day 1 safe-practice branch and saves then reopens Day 2 instructions', () => {
    const day1 = courseDays.find((day) => day.day === 1)!;
    const day2 = courseDays.find((day) => day.day === 2)!;
    if (day1.experience !== 'one-action' || day2.experience !== 'one-action') throw new Error('Week 1 must use one-action pages.');

    const prepIndex = day1.pages.findIndex((page) => page.id === 'd01-practice-material');
    const promptIndex = day1.pages.findIndex((page) => page.id === 'd01-first-prompt');
    expect(prepIndex).toBeGreaterThan(-1);
    expect(prepIndex).toBeLessThan(promptIndex);
    expect(day1.pages[prepIndex].description).toContain('개인정보가 없는 연습 파일');
    expect(day1.pages[promptIndex].prompt).toContain('[내가 하는 일]');

    const save = day2.pages.find((page) => page.id === 'd02-save')!;
    const reopen = day2.pages.find((page) => page.id === 'd02-test')!;
    expect(save.prompt).toContain('ai-study/project-instructions.md');
    expect(reopen.prompt).toContain('다시 열어 읽어줘');
    expect(reopen.prompt).toContain('내용은 바꾸지 마');
  });

  it('keeps Day 4 and Day 5 official links inside the selected app track', () => {
    const day4 = courseDays.find((day) => day.day === 4)!;
    const day5 = courseDays.find((day) => day.day === 5)!;
    if (day4.experience !== 'one-action' || day5.experience !== 'one-action') throw new Error('Week 1 must use one-action pages.');

    const chatgpt = day4.pages.find((page) => page.id === 'd04-browser-codex')!;
    const claude = day4.pages.find((page) => page.id === 'd04-browser-claude')!;
    expect(chatgpt.track).toBe('codex');
    expect(chatgpt.image?.src).toBe('/assets/tutorials/week1/d04-chatgpt-chrome-official.png');
    expect(links(chatgpt)).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'ChatGPT 확장', publisher: 'OpenAI', verifiedAt: '2026-07-16' }),
    ]));
    expect(claude.track).toBe('claude');
    expect(links(claude)).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Claude 확장', publisher: 'Anthropic', verifiedAt: '2026-07-16' }),
    ]));

    const codexSchedule = day5.pages.find((page) => page.id === 'd05-open-codex')!;
    const claudeSchedule = day5.pages.find((page) => page.id === 'd05-open-claude')!;
    expect(codexSchedule.description).toContain('Scheduled');
    expect(links(codexSchedule)[0]).toMatchObject({ href: 'https://developers.openai.com/codex/app/automations', publisher: 'OpenAI' });
    expect(claudeSchedule.action).toContain('Scheduled → New task');
    expect(links(claudeSchedule)[0]).toMatchObject({ href: 'https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork', publisher: 'Anthropic' });
  });
});

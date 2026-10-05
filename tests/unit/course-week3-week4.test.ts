import { describe, expect, it } from 'vitest';
import { courseDays } from '../../src/data/course';
import cafeCsv from '../../public/assets/tutorials/week4/samples/d18-cafe-sales-synthetic.csv?raw';
import retailCsv from '../../public/assets/tutorials/week4/samples/d18-retail-orders-synthetic.csv?raw';
import salonCsv from '../../public/assets/tutorials/week4/samples/d18-salon-reservations-synthetic.csv?raw';
import reviewsCsv from '../../public/assets/tutorials/week4/samples/d18-store-reviews-synthetic.csv?raw';

const oneActionDay = (day: number) => {
  const item = courseDays.find((candidate) => candidate.day === day);
  if (!item || item.experience !== 'one-action') throw new Error(`Day ${day} is not one-action`);
  return item;
};

describe('Week 3 QA overrides', () => {
  it('keeps Day 11 track-specific and removes /history', () => {
    const day11 = oneActionDay(11);
    const codex = day11.pages.filter((page) => !page.track || page.track === 'codex');
    const claude = day11.pages.filter((page) => !page.track || page.track === 'claude');

    expect(codex.find((page) => page.id === 'd11-01-codex')?.officialLinks?.[0]).toMatchObject({ publisher: 'OpenAI', verifiedAt: '2026-07-16' });
    expect(codex.some((page) => [page.image, ...(page.images ?? [])].some((image) => image?.src.includes('d11-claude-md')))).toBe(false);
    expect(claude.find((page) => page.id === 'd11-01-claude')?.officialLinks?.[0]).toMatchObject({ publisher: 'Anthropic', verifiedAt: '2026-07-16' });
    expect(claude.some((page) => [page.image, ...(page.images ?? [])].some((image) => image?.src.includes('d11-agents-md')))).toBe(false);
    expect(JSON.stringify(day11.pages)).not.toContain('/history');
  });

  it('adds Day 12 prep and links, Day 13 fallback, Day 14 Korean-first headings, and Day 15 capability-first tracks', () => {
    const day12 = oneActionDay(12);
    expect(day12.pages.slice(0, 3).map((page) => page.id)).toEqual(['d12-start', 'd12-prep-audio', 'd12-01']);
    expect(day12.pages.find((page) => page.id === 'd12-prep-audio')?.description).toContain('실명·회사명·전화번호·고객정보');
    expect(day12.pages.find((page) => page.id === 'd12-01')?.officialLinks?.[0]?.href).toBe('https://clovanote.naver.com/');
    expect(day12.pages.find((page) => page.id === 'd12-02')?.officialLinks?.[0]?.href).toContain('contents/12812');
    expect(day12.pages.find((page) => page.id === 'd12-06')?.officialLinks?.[0]?.href).toContain('contents/12831');

    const day13 = oneActionDay(13);
    expect(day13.pages.find((page) => page.id === 'd13-01')).toMatchObject({ title: '회의록 정리 도우미와 양식 만들기', technicalDetails: [{ title: '파일 구조 보기' }] });
    for (const page of day13.pages.filter((page) => page.kind === 'ACTION')) expect(`${page.description}\n${page.prompt}`).toContain('폴더에 접근');

    const day14 = oneActionDay(14);
    expect(day14.pages.slice(2, 7).map((page) => page.title)).toEqual(['이름과 역할', '언제 쓰는지', '처리 순서', '참고 자료', '시험 방법']);
    expect(JSON.stringify(day14.pages)).toContain('원본 수정과 외부 발송은 금지');
    expect(day14.pages.find((page) => page.id === 'd14-07')?.prompt).toContain('폴더에 접근');

    const day15 = oneActionDay(15);
    expect(day15.pages.find((page) => page.id === 'd15-capability')?.prompt).toContain('최소 수동 요청문');
    expect(day15.pages.filter((page) => page.id.startsWith('d15-05-')).map((page) => page.track).sort()).toEqual(['claude', 'codex']);
    for (const app of ['codex', 'claude']) {
      const pages = day15.pages.filter((page) => !page.track || page.track === app);
      expect(pages.map((page) => page.id).indexOf('d15-capability')).toBeLessThan(pages.findIndex((page) => page.id === `d15-05-${app}`));
    }
  });
});

describe('Week 4 QA overrides', () => {
  it('leaves Days 16 and 20 source lessons unchanged and appends Day 17 advanced practice', () => {
    expect(oneActionDay(16).pages.map((page) => page.title)).toEqual([
      '콘텐츠 만들기 자동화1: 블로그 제작 공정 설계하기', '내가 지금 하는 순서를 적으세요', 'AI에게 공정 후보 3개를 받으세요', '반복할 수 있는 공정 하나를 고르세요', '비슷한 스킬과 사례를 조사시키세요', '반영할 개선점만 고르세요', '각 단계의 일을 한 가지씩 정하세요', '검수 규칙 3개를 고르세요', '이 공정을 재사용 스킬로 저장하세요', '오늘의 회고',
    ]);
    const day17 = oneActionDay(17);
    expect(day17.time).toBe('30분 + 선택 10분');
    expect(day17.pages.map((page) => page.id)).toEqual([
      'd17-start',
      'd17-action-01',
      'd17-action-02',
      'd17-action-03',
      'd17-action-04',
      'd17-action-05',
      'd17-action-06',
      'd17-action-07',
      'd17-action-08',
      'd17-advanced-check',
      'd17-action-99',
    ]);
    expect(oneActionDay(20).pages.map((page) => page.title)).toEqual([
      'AI 야학 졸업을 축하합니다!', 'AI가 읽을 수 있는 기록을 찾으세요', '진단에 쓸 기록을 직접 고르세요', '20일 기록에서 내 패턴을 진단받으세요', '계속할 활용법 3개를 고르세요', '다음 30일의 작은 계획을 정하세요', '업무 규칙 후보를 만드세요', '고른 규칙을 앱별 위치에 반영하세요', '오늘의 회고',
    ]);
    expect(oneActionDay(20).pages[1]?.description).toBe('AI가 지금 열 수 있는 대화 기록과 작업 파일만 목록으로 만듭니다.');
  });

  it('keeps the optional Day 17 blog grader bounded and human-approved', () => {
    const page = oneActionDay(17).pages.find((candidate) => candidate.id === 'd17-advanced-check');
    const prompt = page?.prompt ?? '';

    expect(page).toMatchObject({
      title: '선택 심화: 내 글 합격 검사기 만들기',
      description: expect.stringContaining('기존 글 세 개가 없으면'),
      officialLinks: [{
        label: '참고 원문',
        href: 'https://app.teams.100school.com/day/13/good-enough-never-is-b2c',
        publisher: '100 School',
        verifiedAt: '2026-07-27',
        accessNote: expect.stringContaining('AI 야학 수업에 맞게 재작성'),
      }],
    });
    for (const contract of ['잘된 블로그 글 3개', '새 주제', '도입', '구조', '말투', '명확성', '총 100점', '오늘 수선한', '95점', '최대 2회', '사람이 최종 승인', '최종 글', '항목별 점수와 근거', '사실·말투·게시 적합성']) {
      expect(prompt).toContain(contract);
    }
    expect(prompt).toContain('합격 확정이 아니다');
    expect(prompt).toContain('게시하거나 저장하지 마');
    expect(prompt).not.toMatch(/이메일|디자인|제안서|무한|통과할 때까지|95점이 될 때까지/);
  });

  it('exposes four non-empty Day 18 CSV downloads', () => {
    const day18 = oneActionDay(18);
    const downloads = day18.pages.find((page) => page.id === 'd18-action-02')?.downloadLinks ?? [];
    expect(downloads.map((link) => link.label)).toEqual(['카페 매출 CSV', '소매 주문 CSV', '미용실 예약 CSV', '매장 리뷰 CSV']);
    for (const csv of [cafeCsv, retailCsv, salonCsv, reviewsCsv]) expect(csv.length).toBeGreaterThan(0);
  });

  it('lists all six Day 19 official sources and only exposes the selected schedule track', () => {
    const day19 = oneActionDay(19);
    const links = day19.pages.flatMap((page) => page.officialLinks ?? []);
    expect(links.slice(0, 6).every((link) => link.verifiedAt === '2026-07-16' && link.publisher && link.accessNote)).toBe(true);
    expect(links.slice(0, 6).map((link) => link.href)).toEqual([
      'https://www.gpters.org/', 'https://modulabs.co.kr/', 'https://koding.kr/',
      'https://page.stibee.com/subscriptions/181723', 'https://www.aiground.co.kr/#/portal/signup/free', 'https://aimatters.co.kr/subscribe/',
    ]);
    expect(day19.pages.filter((page) => page.id.startsWith('d19-action-08-')).map((page) => page.track).sort()).toEqual(['claude', 'codex']);
  });

  it('uses the same human-only retro wording across Week 3', () => {
    for (const number of [11, 12, 13, 14, 15]) {
      expect(oneActionDay(number).pages.find((page) => page.kind === 'RETRO')?.description).toBe('회고는 내 경험으로 답합니다. AI는 정리만 돕습니다.');
    }
  });
});

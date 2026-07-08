# AI 야학 튜토리얼 저작 가이드

## 원칙

- 한 화면에는 행동 하나만 넣는다.
- 긴 문장은 복사 버튼으로 제공한다.
- 모든 단계에는 성공 확인과 막혔을 때 안내를 넣는다.
- Day 3부터 마지막 단계는 `/오늘마무리`다.
- `/오늘마무리`는 자동 파일 저장을 보장하지 않는다. 실패하면 복사용 마크다운을 보여준다.

## 콘텐츠 위치

- 커리큘럼 데이터: `src/data/course.ts`
- 출석부: `src/pages/tutorials/index.astro`
- 위저드: `src/pages/tutorials/day-[day].astro`
- 마무리 계약: `docs/tutorials/today-close-contract.md`

## Day 추가·수정 절차

1. `courseDays`에서 해당 Day의 `status`를 `ready`로 바꾼다.
2. `steps`를 5-9개로 채운다.
3. 1주차 앱별 화면 차이가 있으면 `appTrack: 'both'`와 `claude`, `codex` steps를 따로 쓴다.
4. 결제처럼 건너뛰면 안 되는 단계는 `stuck.skip: false`로 둔다.
5. `npm run build`를 실행한다.

## 스크린샷 규칙

- 파일명: `d01-claude-step01.png`, `d01-codex-step01-ok.png`
- 누를 곳 표시본과 성공 확인본을 나눠 저장한다.
- 앱 업데이트가 있으면 Day 1-3, Day 7-9 스크린샷을 먼저 다시 확인한다.

## 검수

- 50대 초보 기준으로 문장을 다시 읽는다.
- “프롬프트”, “MCP”, “scheduled task” 같은 말은 한글 설명을 먼저 붙인다.
- 모바일에서 버튼 높이 48px 이상인지 확인한다.

/* Live-sheet snapshot. Do not fetch Google Sheets at runtime. */
export const week2Provenance = {
  workbook: 'AI야학 튜토리얼',
  spreadsheetId: '1aT28MPd8RuqsNzRwK77ZM2Zp5vZDKH7Bfgt59Aj2gqM',
  sheet: '2주차 세부 강의안',
  sheetId: 275570530,
  range: 'A1:M48',
  readAt: '2026-07-14T23:59:08+09:00',
} as const;

export type Week2SourceKind = 'START' | 'ACTION' | 'RETRO';

export type Week2SourceRecord = {
  dayLabel: string;
  order: string;
  sourceKind: Week2SourceKind;
  headline: string;
  description: string;
  flow: string | null;
  outcome: string | null;
  action: string | null;
  prompt: string | null;
  replacementText: string | null;
  screenshot: string | null;
  supporting: string | null;
  bottomButton: string;
};

export type Week2VisibleWhen = {
  choiceKey: 'output-format';
  equals: 'slides' | 'docs';
};

export type Week2Page = {
  id: string;
  kind: 'START' | 'CHOICE' | 'ACTION' | 'RETRO';
  view: 'FOCUS' | 'WORKBENCH' | 'SPOTLIGHT' | 'PROMPT' | 'WORKBOOK';
  title: string;
  description: string;
  action: string | null;
  flow?: string[];
  outcome?: string;
  prompt: string | null;
  replacementText: string | null;
  supporting: string | null;
  bottomButton: string;
  image?: { src: string; alt: string };
  officialLinks?: {
    label: string;
    href: string;
    publisher: string;
    verifiedAt: string;
    accessNote: string;
  }[];
  visibleWhen?: Week2VisibleWhen;
  choice?: {
    key: 'output-format';
    options: readonly {
      value: 'slides' | 'docs';
      label: string;
      description: string;
    }[];
  };
  controls?: {
    id: string;
    type: 'radio';
    label: string;
    required: true;
    persist: 'local';
    options: readonly { value: string; label: string; description?: string }[];
  }[];
  source: Week2SourceRecord;
};

export type Week2TutorialDay = {
  day: number;
  week: 2;
  theme: '시키기';
  title: string;
  subtitle: string;
  totalScreens: string;
  time: string;
  outcome: string;
  flow: string;
  retroStorage: string;
  status: 'ready';
  appTrack: 'unified';
  experience: 'one-action';
  pages: readonly Week2Page[];
};

export const week2DayMetadata = [
  {
    "day": 6,
    "label": "Day 6",
    "title": "AI에게 일을 잘 맡기는 2가지 원칙",
    "subtitle": "① 명확하게 지시 내리기\n② AI가 ‘스스로’ 틀린 점을 찾아 고치게 하기",
    "totalScreens": "10",
    "time": "30분",
    "outcome": "내 업무용 작업 계약→검사·수정 재사용 프롬프트 1개 + 저장 규칙 1개",
    "flow": "반복 업무 고르기 → 작업 계약 만들기 → 계획 승인하기 → 검사·수정하기 → 재사용 규칙 저장하기",
    "retroStorage": "ai-study/daily_retro.md · Day 6만 갱신"
  },
  {
    "day": 7,
    "label": "Day 7",
    "title": "표를 보고서로, 문서를 슬라이드로",
    "subtitle": "스프레드시트를 구글 문서로 바꾸거나, 멋진 프레젠테이션 슬라이드를 만들어보세요",
    "totalScreens": "7 (4A/4B 중 택1)",
    "time": "30분",
    "outcome": "5장 슬라이드 또는 Google Docs 문서 1개",
    "flow": "결과물 정하기 → 파일 첨부 → 선택한 형식 제작 → 질문 답변 → 원본 대조",
    "retroStorage": "ai-study/daily_retro.md · Day 7만 갱신"
  },
  {
    "day": 8,
    "label": "Day 8",
    "title": "웹사이트 만들기1: 계획 세우기",
    "subtitle": "머릿속 아이디어를 AI와 정리해 계획서(PLAN.md)를 만들어요",
    "totalScreens": "6",
    "time": "30분",
    "outcome": "내가 승인한 PLAN.md",
    "flow": "AI 인터뷰 → 질문 답변 → 수정안 선택 → 최종 PLAN.md 저장",
    "retroStorage": "ai-study/daily_retro.md · Day 8만 갱신"
  },
  {
    "day": 9,
    "label": "Day 9",
    "title": "웹사이트 만들기2: 계획서를 홈페이지로 바꾸기",
    "subtitle": "디자인을 고른 뒤 AI에게 제작을 맡기고 잘 만들어졌는지 검토해보세요",
    "totalScreens": "6",
    "time": "30분",
    "outcome": "휴대폰·컴퓨터 검사를 마친 웹사이트",
    "flow": "디자인 선택 → 제작 → 두 화면 검사 → 직접 눌러보기",
    "retroStorage": "ai-study/daily_retro.md · Day 9만 갱신"
  },
  {
    "day": 10,
    "label": "Day 10",
    "title": "웹사이트 만들기3: 내 홈페이지 세상에 공개하기",
    "subtitle": "GitHub에 저장하고 Vercel에 올려 웹사이트 주소를 만들고, 주변에 공유해보세요",
    "totalScreens": "9",
    "time": "30분",
    "outcome": "공개 주소 + QR 코드 + 비밀정보가 제외된 저장소",
    "flow": "GitHub 저장 → Vercel 배포 → 공개 주소 검사 → QR 만들기",
    "retroStorage": "ai-study/daily_retro.md · Day 10만 갱신"
  }
] as const;

export const week2SourceRecords = [
  {
    "dayLabel": "Day 6",
    "order": "1/10",
    "sourceKind": "START",
    "headline": "AI에게 일을 맡기는 두 가지 원칙",
    "description": "오늘은 AI에게 일을 맡기기 전에 기준을 정하고, 받은 결과를 다시 확인하는 방법을 익혀요. 내 업무에 바로 쓸 요청문과 저장 규칙 하나를 만들어 봐요.",
    "flow": "반복 업무 고르기 → 작업 계약 만들기 → 계획 승인하기 → 검사·수정하기 → 재사용 규칙 저장하기",
    "outcome": "내 업무용 작업 계약→검사·수정 재사용 프롬프트 1개 + 저장 규칙 1개",
    "action": null,
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "오늘의 실습 시작하기"
  },
  {
    "dayLabel": "Day 6",
    "order": "2/10",
    "sourceKind": "ACTION",
    "headline": "오늘 맡길 반복 업무를 한 문장으로 정하기",
    "description": "AI에게 부탁하기 전에 내가 무엇을 하고, 누가 받으며, 어떤 결과가 필요한지 먼저 정해요. 이 한 문장이 뒤의 모든 요청을 흔들리지 않게 잡아줘요.",
    "flow": null,
    "outcome": null,
    "action": "“[업무]를 해서 [받을 사람]에게 [결과]를 준다” 형태로 한 줄을 완성합니다.",
    "prompt": null,
    "replacementText": "[업무] / [받을 사람] / [결과]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "3/10",
    "sourceKind": "ACTION",
    "headline": "AI에게 줄 네 가지 정보 정하기",
    "description": "AI가 내 일을 정확히 이해하려면 원하는 결과, 참고할 내용, 지켜야 할 조건, 끝났다고 볼 기준이 필요해요. 네 칸을 내 상황에 맞게 채우면 AI가 빈 곳을 마음대로 채우는 일을 줄일 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "강조된 네 칸을 내 상황으로 바꿔 프롬프트를 보냅니다.",
    "prompt": "아래 업무를 시작하기 전에 작업 계약을 만들어줘.\n목표: [원하는 결과]\n맥락: [누가 쓰는지·참고자료]\n제약: [길이·말투·하지 말 것]\n완료조건: [무엇을 확인하면 끝인지]\n빈칸은 추측하지 말고 질문해줘.",
    "replacementText": "[원하는 결과] / [누가 쓰는지·참고자료] / [길이·말투·하지 말 것] / [무엇을 확인하면 끝인지]",
    "screenshot": null,
    "supporting": "작업 계약은 무엇을·어떤 자료로·어떤 조건에서·어디까지 할지 정하는 약속입니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "4/10",
    "sourceKind": "ACTION",
    "headline": "빠진 정보는 먼저 물어보게 하기",
    "description": "정보가 빠졌다면 AI가 바로 일을 시작하지 않도록 해요. 한 번에 하나씩 질문하게 하면 내가 필요한 내용만 차분히 정할 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 보내고 질문에 직접 답합니다.",
    "prompt": "내가 [업무]를 맡기려 합니다. 바로 시작하지 말고 목표·맥락·제약·완료조건에서 빠진 내용을 한 번에 한 가지씩, 최대 3개 질문해줘. 숫자·날짜·가격·이름은 추측하지 마.",
    "replacementText": "[업무]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "5/10",
    "sourceKind": "ACTION",
    "headline": "계획을 먼저 보고 시작 승인하기",
    "description": "여러 단계가 필요한 일은 결과부터 만들게 하지 말고, 먼저 어떤 순서로 할지 받아 봐요. 계획을 읽고 괜찮다고 승인한 뒤에 시작하면 예상 밖의 작업을 줄일 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "계획을 요청하고 내용을 확인한 뒤 승인합니다.",
    "prompt": "아직 실행하지 마. 이 일을 3~5단계로 나누고 각 단계의 필요한 자료·틀리기 쉬운 곳·내가 확인할 시점을 보여줘. 계획을 보여준 뒤 내 승인을 기다려.",
    "replacementText": null,
    "screenshot": null,
    "supporting": "작은 수정은 계획 없이 바로 해도 됩니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "6/10",
    "sourceKind": "ACTION",
    "headline": "만든 뒤에는 검사와 수정을 한 번 더 하기",
    "description": "첫 결과는 끝이 아니에요. 처음에 정한 완료 기준으로 확인하고, 문제를 고친 뒤 같은 기준으로 다시 살펴보게 해요.",
    "flow": null,
    "outcome": null,
    "action": "첫 결과에 검사·수정·재검사를 요청합니다.",
    "prompt": "결과를 만든 뒤 바로 끝났다고 하지 마. 완료조건으로 스스로 검사하고, 문제를 고치고, 같은 검사를 다시 해. 마지막에 찾은 문제·고친 내용·아직 내가 확인할 것을 보여줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "7/10",
    "sourceKind": "ACTION",
    "headline": "결과물에 맞는 도구로 직접 확인하기",
    "description": "AI의 말만 믿지 말고 결과물에 맞는 방법으로 직접 확인해요. 문서는 원문과 비교하고, 웹사이트는 실제 화면으로 열어 보고, 코드는 테스트로 점검해요.",
    "flow": null,
    "outcome": null,
    "action": "내 업무에 맞는 검사 도구 하나를 실행시킵니다.",
    "prompt": "가능한 도구를 먼저 확인해. 쓸 수 있는 도구로 직접 검사하고, 실행하지 못한 검사는 ‘미확인’으로 표시해. 문제를 고치고 같은 검사를 다시 해.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-responsive-qa-success.png",
    "supporting": "Playwright는 실제 브라우저 화면과 동작을 검사하는 도구입니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "8/10",
    "sourceKind": "ACTION",
    "headline": "새 대화에서 결과를 한 번 더 확인하기",
    "description": "만든 AI와 다른 대화에서 결과물을 다시 살펴봐요. 앞선 설명을 듣지 않은 상태에서도 빠진 점을 찾는지 보면 결과를 더 믿을 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "subagent 또는 새 대화에 검토 프롬프트를 보냅니다.",
    "prompt": "너는 새 검사자야. 앞선 설명을 믿지 말고 [결과물/파일]만 보고 완료조건과 맞지 않는 점을 찾아줘. 실제 파일·화면·원본을 기준으로 검사하고, 고치기 전에 문제·근거·우선순위를 보여줘.",
    "replacementText": "[결과물/파일]",
    "screenshot": null,
    "supporting": "subagent는 조사·검토를 따로 맡는 작은 작업자입니다. 같은 파일 동시 편집은 피합니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "9/10",
    "sourceKind": "ACTION",
    "headline": "다음에도 쓸 요청문과 규칙 남기기",
    "description": "오늘 잘된 요청문과 검사 방법만 골라 내 규칙으로 남겨요. 다음에 그대로 꺼내 쓸 수 있도록 말투, 꼭 확인할 것, 하지 않을 것, 끝났다고 볼 기준을 적어 둬요.",
    "flow": null,
    "outcome": null,
    "action": "초안을 확인하고 저장을 승인합니다.",
    "prompt": "오늘 만든 작업 계약과 검사·수정 지시를 합쳐 내 업무용 재사용 프롬프트 1개를 만들어줘.\n그중 다음에도 지킬 규칙을 아래 4줄로 따로 정리해줘.\n① 말투\n② 반드시 할 확인\n③ 하지 말 것\n④ 끝났다고 볼 기준\n비밀번호·고객정보·일회성 내용은 빼. Codex에서는 AGENTS.md, Claude Code/Cowork에서는 CLAUDE.md에 넣을 초안을 먼저 보여주고, 내 승인 전에는 저장하지 마.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/week3/screenshots/d11-agents-md-official.png",
    "supporting": "Codex는 AGENTS.md, Claude Code/Cowork는 CLAUDE.md를 사용합니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 6",
    "order": "10/10",
    "sourceKind": "RETRO",
    "headline": "오늘 한 일을 내 말로 돌아보기",
    "description": "AI가 대신 쓰지 않고, 오늘 새롭게 할 수 있게 된 일과 막힌 점을 내 말로 적어요. 짧아도 괜찮으니 다음에 다시 볼 나에게 도움이 되도록 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "회고 프롬프트를 실행하고 세 질문에 직접 답합니다.",
    "prompt": "지금부터 오늘 회고를 진행해줘. /history나 작업 기록을 읽어 대신 쓰지 말고, 내가 직접 답한 내용만 사용해.\n\n다음 세 가지를 한 번에 하나씩 물어봐.\n1) 오늘 새롭게 할 수 있게 된 것은?\n2) 막힌 부분은 무엇이며, 해결했다면 어떻게 해결했나? 해결하지 못했다면 다음에는 어떻게 시도할까?\n3) 남아 있는 궁금증이나 새롭게 시도하고 싶은 것은?\n\n세 답변을 모두 받은 뒤 Asia/Seoul 기준 오늘 날짜로 ai-study/daily_retro.md를 업데이트해. 파일이나 폴더가 없으면 만들어.\n\n<!-- day-6-retro:start -->\n## YYYY-MM-DD · 6일차 수업 · AI에게 일을 잘 맡기는 2가지 원칙\n\n### 새롭게 할 수 있게 된 것\n사용자의 답변 그대로\n\n### 막혔던 부분\n사용자의 답변 그대로. 해결했다면 방법, 해결하지 못했다면 다음 시도를 포함.\n\n### 남아 있는 궁금증 / 새롭게 시도하고 싶은 것\n사용자의 답변 그대로\n<!-- day-6-retro:end -->\n\n저장 규칙:\n- 같은 day-6-retro 마커 블록이 있으면 그 블록만 통째로 교체하고 수업일자를 오늘 날짜로 바꿔.\n- 같은 블록이 없으면 파일 끝에 추가해.\n- 다른 Day 블록은 절대 수정하지 마.\n- 내가 답한 문장을 요약하거나 보완하거나 바꾸지 마.\n- AI 의견·평가·칭찬·추측·추가 요약은 넣지 마.\n- 저장 후 수정한 Day와 파일 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 회고 프롬프트 복사"
  },
  {
    "dayLabel": "Day 7",
    "order": "1/7",
    "sourceKind": "START",
    "headline": "원본을 보고서나 슬라이드로 바꾸기",
    "description": "오늘은 원본 파일 하나를 5장 슬라이드 또는 Google Docs 문서로 바꿔 봐요. 누가 읽고 무엇을 하면 좋을지 정한 뒤, 원본에 없는 내용은 넣지 않고 만들어요.",
    "flow": "결과물 정하기 → 파일 첨부 → 선택한 형식 제작 → 질문 답변 → 원본 대조",
    "outcome": "5장 슬라이드 또는 Google Docs 문서 1개",
    "action": null,
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "오늘의 실습 시작하기"
  },
  {
    "dayLabel": "Day 7",
    "order": "2/7",
    "sourceKind": "ACTION",
    "headline": "오늘 만들 결과를 한 문장으로 정하기",
    "description": "슬라이드와 문서 중 하나를 고르고, 어떤 원본을 누구에게 보여 줄지 적어 봐요. 읽은 사람이 무엇을 하길 바라는지까지 정하면 결과물이 더 분명해져요.",
    "flow": null,
    "outcome": null,
    "action": "[A 또는 B] / [원본] / [받을 사람] / [읽고 나서 할 행동]을 한 줄로 완성합니다.",
    "prompt": null,
    "replacementText": "[A 또는 B] / [원본] / [받을 사람] / [읽고 나서 할 행동]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "3/7",
    "sourceKind": "ACTION",
    "headline": "개인정보를 가린 사본 첨부하기",
    "description": "원본 파일을 바로 올리지 말고 이름, 전화번호, 주소 같은 개인정보를 가린 사본을 준비해요. AI에게 먼저 읽기만 해 달라고 요청하면 원본을 바꾸는 일을 막을 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "익명화한 복사본을 첨부하고 프롬프트를 보냅니다.",
    "prompt": "첨부한 파일을 읽기만 해줘. 아직 원본을 수정하거나 새 파일을 만들지 말고, 개인정보나 확인하기 어려운 값이 있으면 먼저 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": "익명화할 정보: 이름·전화번호·주소·계좌번호·고객 식별 정보",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "4A/7",
    "sourceKind": "ACTION",
    "headline": "A안: 5장 슬라이드 목차 먼저 만들기",
    "description": "슬라이드를 곧바로 만들지 말고 5장 목차부터 받아 봐요. 원본에 없는 숫자는 확인이 필요하다고 표시하게 하고, 목차가 맞는지 본 뒤에 제작을 승인해요.",
    "flow": null,
    "outcome": null,
    "action": "A를 고른 경우 프롬프트를 보냅니다.",
    "prompt": "먼저 현재 사용할 수 있는 슬라이드·프레젠테이션 도구 이름을 알려줘. 없는 도구 이름을 지어내지 마.\n첨부한 원본을 아래 5장으로 구성해줘.\n1장 제목\n2장 핵심 현황\n3장 문제\n4장 제안\n5장 다음 행동\n원문에 없는 숫자는 ‘확인 필요’로 표시해. 먼저 목차만 보여주고 내 승인 후 제작해줘.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/document-compat/screenshots/d07-claude-design-slide-deck-official.png",
    "supporting": "Claude Design과 Codex 프레젠테이션 도구는 실제로 보이는 기능만 사용합니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "4B/7",
    "sourceKind": "ACTION",
    "headline": "B안: Google Docs 문서 초안 만들기",
    "description": "Google Drive와 Docs가 연결되어 있는지 먼저 확인해요. 연결되어 있으면 문서 초안을 만들고, 연결되어 있지 않으면 그대로 붙여 넣을 수 있는 초안을 화면에서 받아요.",
    "flow": null,
    "outcome": null,
    "action": "B를 고른 경우 양식을 골라 프롬프트를 보냅니다.",
    "prompt": "먼저 현재 Google Drive·Docs에 연결되어 있는지 확인해줘. 연결되어 있으면 첨부한 스프레드시트를 읽고 [주간 보고서/회의 후 할 일표/고객 문의 정리] 중 내가 고른 양식의 Google Docs 초안을 만들어줘. 연결되어 있지 않으면 Google Docs에 그대로 붙일 완성형 초안을 화면에 보여줘.\n핵심 수치·변화·확인 필요·다음 행동을 구분하고, 원본에 없는 내용은 추측하지 마. 저장하기 전 내 승인을 받아줘.",
    "replacementText": "[주간 보고서/회의 후 할 일표/고객 문의 정리]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "5/7",
    "sourceKind": "ACTION",
    "headline": "필요한 내용만 답하고 만들기 승인하기",
    "description": "AI가 꼭 필요한 것만 한 번에 하나씩 묻게 해요. 모르는 내용은 억지로 채우지 않고 '확인 필요'로 남긴 뒤, 만들 내용을 보고 내가 승인해요.",
    "flow": null,
    "outcome": null,
    "action": "질문에 직접 답하고 만들 내용을 승인합니다.",
    "prompt": "결과물에 꼭 필요한 질문만 한 번에 하나씩, 최대 3개 해줘. 내가 모르는 항목은 임의로 채우지 말고 ‘확인 필요’로 남겨줘. 질문이 끝나면 만들 내용을 짧게 보여주고 내 승인을 기다려.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "6/7",
    "sourceKind": "ACTION",
    "headline": "완성본을 원본과 한 항목씩 비교하기",
    "description": "제목, 숫자, 이름, 날짜, 링크가 원본과 같은지 하나씩 확인해요. 다른 부분만 고치고, 고친 뒤에는 파일이 깨지지 않았는지도 다시 살펴봐요.",
    "flow": null,
    "outcome": null,
    "action": "대조·수정·재확인을 요청합니다.",
    "prompt": "완성본의 제목·숫자·이름·날짜·링크를 원본과 대조해. 원본과 다른 값은 그 값만 원본 기준으로 고치고, 확인하지 못한 항목은 ‘확인 필요’로 남겨줘. 수정 후 파일을 다시 열어 표·글자·이미지가 깨지지 않았는지 확인하고 마지막에 대조표를 보여줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 7",
    "order": "7/7",
    "sourceKind": "RETRO",
    "headline": "오늘 만든 결과를 내 말로 돌아보기",
    "description": "AI가 대신 쓰지 않고, 오늘 새롭게 할 수 있게 된 일과 막힌 점을 내 말로 적어요. 짧아도 괜찮으니 다음에 다시 볼 나에게 도움이 되도록 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "회고 프롬프트를 실행하고 세 질문에 직접 답합니다.",
    "prompt": "지금부터 오늘 회고를 진행해줘. /history나 작업 기록을 읽어 대신 쓰지 말고, 내가 직접 답한 내용만 사용해.\n\n다음 세 가지를 한 번에 하나씩 물어봐.\n1) 오늘 새롭게 할 수 있게 된 것은?\n2) 막힌 부분은 무엇이며, 해결했다면 어떻게 해결했나? 해결하지 못했다면 다음에는 어떻게 시도할까?\n3) 남아 있는 궁금증이나 새롭게 시도하고 싶은 것은?\n\n세 답변을 모두 받은 뒤 Asia/Seoul 기준 오늘 날짜로 ai-study/daily_retro.md를 업데이트해. 파일이나 폴더가 없으면 만들어.\n\n<!-- day-7-retro:start -->\n## YYYY-MM-DD · 7일차 수업 · 표를 보고서로, 문서를 슬라이드로\n\n### 새롭게 할 수 있게 된 것\n사용자의 답변 그대로\n\n### 막혔던 부분\n사용자의 답변 그대로. 해결했다면 방법, 해결하지 못했다면 다음 시도를 포함.\n\n### 남아 있는 궁금증 / 새롭게 시도하고 싶은 것\n사용자의 답변 그대로\n<!-- day-7-retro:end -->\n\n저장 규칙:\n- 같은 day-7-retro 마커 블록이 있으면 그 블록만 통째로 교체하고 수업일자를 오늘 날짜로 바꿔.\n- 같은 블록이 없으면 파일 끝에 추가해.\n- 다른 Day 블록은 절대 수정하지 마.\n- 내가 답한 문장을 요약하거나 보완하거나 바꾸지 마.\n- AI 의견·평가·칭찬·추측·추가 요약은 넣지 마.\n- 저장 후 수정한 Day와 파일 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 회고 프롬프트 복사"
  },
  {
    "dayLabel": "Day 8",
    "order": "1/6",
    "sourceKind": "START",
    "headline": "내 홈페이지 계획을 차근차근 만들기",
    "description": "오늘은 웹사이트를 만들기 전에 필요한 내용을 AI와 하나씩 정리해요. 마지막에는 내가 확인하고 승인한 홈페이지 계획서 PLAN.md를 남겨, 다음 수업에서 이 계획을 그대로 써요.",
    "flow": "AI 인터뷰 → 질문 답변 → 수정안 선택 → 최종 PLAN.md 저장",
    "outcome": "내가 승인한 PLAN.md",
    "action": null,
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "오늘의 실습 시작하기"
  },
  {
    "dayLabel": "Day 8",
    "order": "2/6",
    "sourceKind": "ACTION",
    "headline": "AI와 홈페이지 계획을 정리하기",
    "description": "아직 웹사이트 파일을 만들지는 않아요. 아래 요청을 보내면 AI가 목적부터 참고할 사이트까지 한 번에 하나씩 묻고, 답을 바탕으로 홈페이지 계획서 초안을 보여 줘요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 복사해 실행합니다.",
    "prompt": "지금은 웹사이트 파일을 만들거나 수정하지 말고 계획만 세워줘. 내 웹사이트 목적·주요 고객·원하는 분위기·방문자가 할 핵심 행동·참고 사이트를 한 번에 하나씩, 최대 5개 질문해줘. 모르는 내용은 추측하지 말고 선택지 3개를 보여줘. 답이 끝나면 페이지 구성·각 페이지 내용·필요한 자료·휴대폰 성공 기준을 담은 PLAN.md 초안을 보여줘. 내가 승인하기 전에는 저장하거나 제작하지 마.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 8",
    "order": "3/6",
    "sourceKind": "ACTION",
    "headline": "한 질문씩 내 생각 알려주기",
    "description": "모든 질문에 정답이 있는 것은 아니에요. 잘 모르겠으면 '모르겠어'라고 말하고, AI가 보여 주는 선택지에서 내 상황에 가까운 답을 골라요.",
    "flow": null,
    "outcome": null,
    "action": "최대 5개 질문에 한 번씩 직접 답합니다.",
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 8",
    "order": "4/6",
    "sourceKind": "ACTION",
    "headline": "홈페이지 계획에서 고칠 부분 고르기",
    "description": "AI가 보여 준 계획에서 꼭 고쳐야 할 부분만 살펴봐요. 휴대폰 첫 화면, 핵심 버튼, 사진과 문구, 개인정보, 완성 기준 중 빠진 것이 있으면 최대 세 개만 골라요.",
    "flow": null,
    "outcome": null,
    "action": "수정 후보를 최대 3개 고릅니다.",
    "prompt": "PLAN.md 초안을 점검해줘. 휴대폰 첫 화면, 방문자가 누를 핵심 버튼, 필요한 사진·문구, 개인정보 수집 여부, 완성 확인 기준에서 빠진 점만 보여줘. 비밀번호·고객정보·비밀키는 계획서에 넣지 마. 수정 후보를 최대 3개 보여주고, 내가 고른 것만 반영해.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 8",
    "order": "5/6",
    "sourceKind": "ACTION",
    "headline": "승인한 홈페이지 계획만 저장하기",
    "description": "내가 고른 수정만 반영한 계획을 PLAN.md 파일로 저장해요. 저장이 끝나면 파일 위치를 확인해 두면 다음 수업에서 바로 이어서 만들 수 있어요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 실행하고 저장 경로를 확인합니다.",
    "prompt": "내가 승인한 수정만 반영해 최종 PLAN.md를 현재 작업 폴더에 저장해줘. 승인하지 않은 기능은 추가하지 말고 저장한 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 8",
    "order": "6/6",
    "sourceKind": "RETRO",
    "headline": "오늘 만든 계획을 내 말로 돌아보기",
    "description": "AI가 대신 쓰지 않고, 오늘 새롭게 할 수 있게 된 일과 막힌 점을 내 말로 적어요. 짧아도 괜찮으니 다음에 다시 볼 나에게 도움이 되도록 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "회고 프롬프트를 실행하고 세 질문에 직접 답합니다.",
    "prompt": "지금부터 오늘 회고를 진행해줘. /history나 작업 기록을 읽어 대신 쓰지 말고, 내가 직접 답한 내용만 사용해.\n\n다음 세 가지를 한 번에 하나씩 물어봐.\n1) 오늘 새롭게 할 수 있게 된 것은?\n2) 막힌 부분은 무엇이며, 해결했다면 어떻게 해결했나? 해결하지 못했다면 다음에는 어떻게 시도할까?\n3) 남아 있는 궁금증이나 새롭게 시도하고 싶은 것은?\n\n세 답변을 모두 받은 뒤 Asia/Seoul 기준 오늘 날짜로 ai-study/daily_retro.md를 업데이트해. 파일이나 폴더가 없으면 만들어.\n\n<!-- day-8-retro:start -->\n## YYYY-MM-DD · 8일차 수업 · 웹사이트 만들기 1: 계획 세우기\n\n### 새롭게 할 수 있게 된 것\n사용자의 답변 그대로\n\n### 막혔던 부분\n사용자의 답변 그대로. 해결했다면 방법, 해결하지 못했다면 다음 시도를 포함.\n\n### 남아 있는 궁금증 / 새롭게 시도하고 싶은 것\n사용자의 답변 그대로\n<!-- day-8-retro:end -->\n\n저장 규칙:\n- 같은 day-8-retro 마커 블록이 있으면 그 블록만 통째로 교체하고 수업일자를 오늘 날짜로 바꿔.\n- 같은 블록이 없으면 파일 끝에 추가해.\n- 다른 Day 블록은 절대 수정하지 마.\n- 내가 답한 문장을 요약하거나 보완하거나 바꾸지 마.\n- AI 의견·평가·칭찬·추측·추가 요약은 넣지 마.\n- 저장 후 수정한 Day와 파일 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 회고 프롬프트 복사"
  },
  {
    "dayLabel": "Day 9",
    "order": "1/6",
    "sourceKind": "START",
    "headline": "승인한 계획을 홈페이지로 만들기",
    "description": "오늘은 어제 만든 PLAN.md를 바탕으로 실제 홈페이지를 만들어요. 디자인을 고르고 내 컴퓨터에서 미리 본 뒤, 휴대폰과 컴퓨터 화면을 확인해요.",
    "flow": "디자인 선택 → 제작 → 휴대폰·컴퓨터 검사 → 직접 눌러보기",
    "outcome": "휴대폰·컴퓨터 검사를 마친 웹사이트",
    "action": null,
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "오늘의 실습 시작하기"
  },
  {
    "dayLabel": "Day 9",
    "order": "2/6",
    "sourceKind": "ACTION",
    "headline": "두 디자인 중 내 홈페이지에 맞는 하나 고르기",
    "description": "내용과 기능은 바꾸지 않고 글자, 색, 사진 분위기만 다른 두 안을 비교해요. 내 브랜드와 잘 어울리고 읽기 편한 한 가지를 고르면 돼요.",
    "flow": null,
    "outcome": null,
    "action": "두 안 중 하나를 고릅니다.",
    "prompt": "현재 작업 폴더의 승인된 PLAN.md를 읽고 글자 크기·색·사진 분위기만 다른 디자인 방향 2개를 간단한 미리보기로 보여줘. 내용과 기능은 바꾸지 말고, 내가 하나를 고를 때까지 파일을 수정하지 마.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-claude-design-official.jpg",
    "supporting": "Claude 경로: Claude Design에서 왼쪽 대화창으로 요청하고 오른쪽 캔버스에서 디자인 결과를 확인하는 화면을 바로 보여줘. 화면 위치만 짧게 설명합니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 9",
    "order": "3/6",
    "sourceKind": "ACTION",
    "headline": "고른 디자인으로 홈페이지 만들기",
    "description": "승인한 PLAN.md와 방금 고른 디자인만 사용해 홈페이지를 만들어요. Codex를 쓴다면 Sites를, Claude를 쓴다면 Claude Design을 사용해 고른 디자인을 적용해요. 아직 외부에 공개하지 않으니, 먼저 내 컴퓨터의 미리 보기에서 결과를 편하게 확인해요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 실행하고 로컬 미리보기를 확인합니다.",
    "prompt": "승인된 PLAN.md와 내가 고른 디자인 방향대로 웹사이트를 만들어줘. Codex를 쓰고 있다면 Sites를, Claude를 쓰고 있다면 Claude Design을 사용해. 먼저 지금 실제 사용할 수 있는 웹 제작 도구만 확인하고, 없으면 기본 기능으로 진행해. PLAN.md에 없는 기능은 추가하지 마. 오늘은 로컬 미리보기까지만 만들고 외부 공개·결제·계정 변경·비밀정보 입력이 필요하면 실행 전에 멈춰.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-chatgpt-sites-at-mention-live.jpg",
    "supporting": "Codex 경로: ChatGPT 입력칸에 @를 입력한 뒤 Sites를 고르는 실제 화면을 바로 보여줘. @Sites를 고른 뒤 같은 요청을 보낸다고 안내합니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 9",
    "order": "4/6",
    "sourceKind": "ACTION",
    "headline": "휴대폰과 컴퓨터에서 화면 확인하기",
    "description": "웹사이트는 화면 크기에 따라 글자와 버튼의 위치가 달라질 수 있어요. 휴대폰과 컴퓨터에서 글자, 버튼, 링크, 화면이 옆으로 밀리는지, 이미지가 잘리지 않는지를 확인해요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 실행해 검사와 재검사를 맡깁니다.",
    "prompt": "먼저 지금 사용할 수 있는 브라우저 검사 도구를 알려줘. 사용할 수 있으면 휴대폰·컴퓨터 화면을 자동 검사하고, 없으면 내가 두 화면을 열 수 있게 안내해. 글자 크기·버튼·링크·가로 밀림·잘린 이미지를 확인하고 문제를 고친 뒤 다시 검사해. 마지막에 검사 결과와 웹사이트 폴더 위치·미리보기 주소만 보여줘.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-responsive-qa-success.png",
    "supporting": "QA는 화면과 동작이 의도대로 보이는지 확인하는 품질 점검입니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 9",
    "order": "5/6",
    "sourceKind": "ACTION",
    "headline": "홈페이지의 핵심 버튼 직접 눌러 보기",
    "description": "처음 홈페이지에 들어온 사람이 가장 먼저 누를 버튼을 휴대폰과 컴퓨터에서 한 번씩 눌러 봐요. 불편한 점이 있으면 하나만 적고, 없으면 '수정 없음'이라고 승인해요.",
    "flow": null,
    "outcome": null,
    "action": "불편한 점 하나를 적거나 ‘수정 없음’으로 승인합니다.",
    "prompt": "내가 느낀 불편: [불편한 점]. 이것만 고치고 PLAN.md의 내용과 기능은 바꾸지 마. 수정한 위치와 다시 검사한 결과만 보여줘.",
    "replacementText": "[불편한 점]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 9",
    "order": "6/6",
    "sourceKind": "RETRO",
    "headline": "오늘 만든 홈페이지를 내 말로 돌아보기",
    "description": "AI가 대신 쓰지 않고, 오늘 새롭게 할 수 있게 된 일과 막힌 점을 내 말로 적어요. 짧아도 괜찮으니 다음에 다시 볼 나에게 도움이 되도록 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "회고 프롬프트를 실행하고 세 질문에 직접 답합니다.",
    "prompt": "지금부터 오늘 회고를 진행해줘. /history나 작업 기록을 읽어 대신 쓰지 말고, 내가 직접 답한 내용만 사용해.\n\n다음 세 가지를 한 번에 하나씩 물어봐.\n1) 오늘 새롭게 할 수 있게 된 것은?\n2) 막힌 부분은 무엇이며, 해결했다면 어떻게 해결했나? 해결하지 못했다면 다음에는 어떻게 시도할까?\n3) 남아 있는 궁금증이나 새롭게 시도하고 싶은 것은?\n\n세 답변을 모두 받은 뒤 Asia/Seoul 기준 오늘 날짜로 ai-study/daily_retro.md를 업데이트해. 파일이나 폴더가 없으면 만들어.\n\n<!-- day-9-retro:start -->\n## YYYY-MM-DD · 9일차 수업 · 웹사이트 만들기 2: 계획서를 홈페이지로 바꾸기\n\n### 새롭게 할 수 있게 된 것\n사용자의 답변 그대로\n\n### 막혔던 부분\n사용자의 답변 그대로. 해결했다면 방법, 해결하지 못했다면 다음 시도를 포함.\n\n### 남아 있는 궁금증 / 새롭게 시도하고 싶은 것\n사용자의 답변 그대로\n<!-- day-9-retro:end -->\n\n저장 규칙:\n- 같은 day-9-retro 마커 블록이 있으면 그 블록만 통째로 교체하고 수업일자를 오늘 날짜로 바꿔.\n- 같은 블록이 없으면 파일 끝에 추가해.\n- 다른 Day 블록은 절대 수정하지 마.\n- 내가 답한 문장을 요약하거나 보완하거나 바꾸지 마.\n- AI 의견·평가·칭찬·추측·추가 요약은 넣지 마.\n- 저장 후 수정한 Day와 파일 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 회고 프롬프트 복사"
  },
  {
    "dayLabel": "Day 10",
    "order": "1/9",
    "sourceKind": "START",
    "headline": "내 홈페이지를 인터넷에 공개하기",
    "description": "오늘은 만든 홈페이지를 GitHub에 안전하게 저장하고 Vercel로 공개해요. 마지막에는 누구나 열 수 있는 주소와 공유용 QR 코드까지 준비해요.",
    "flow": "GitHub 저장 → Vercel 배포 → 공개 주소 검사 → QR 만들기",
    "outcome": "공개 주소 + QR 코드 + 비밀정보가 제외된 저장소",
    "action": null,
    "prompt": null,
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "오늘의 실습 시작하기"
  },
  {
    "dayLabel": "Day 10",
    "order": "2/9",
    "sourceKind": "ACTION",
    "headline": "GitHub 계정으로 로그인하기",
    "description": "GitHub는 홈페이지 파일을 보관하는 곳이에요. 로그인하거나 가입할 때 이메일, 비밀번호, 2단계 인증 코드는 채팅에 쓰지 말고 내가 직접 입력해요.",
    "flow": null,
    "outcome": null,
    "action": "GitHub 홈 화면까지 들어갑니다.",
    "prompt": null,
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-github-signup.png",
    "supporting": "무료 계정으로도 실습할 수 있습니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "3/9",
    "sourceKind": "ACTION",
    "headline": "GitHub 계정으로 Vercel 로그인하기",
    "description": "Vercel은 GitHub에 저장한 홈페이지를 인터넷에 공개해 주는 서비스예요. 'Continue with GitHub'를 누른 뒤, 연결 권한 내용을 읽고 내가 직접 승인해요.",
    "flow": null,
    "outcome": null,
    "action": "Vercel 대시보드까지 들어갑니다.",
    "prompt": null,
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-vercel-signup-github.png",
    "supporting": "연결 권한은 GitHub 설정에서 나중에 해제할 수 있습니다.",
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "4/9",
    "sourceKind": "ACTION",
    "headline": "GitHub에 올릴 파일 확인하기",
    "description": "GitHub에 올리기 전에 개인정보, 고객 정보, 비밀키, .env 파일이 없는지 먼저 살펴봐요. GitHub의 저장 공간을 공개할지 비공개로 둘지 고르고, 내가 승인한 파일만 올려요.",
    "flow": null,
    "outcome": null,
    "action": "공개·비공개를 고르고 저장 파일을 승인합니다.",
    "prompt": "현재 작업 폴더를 GitHub에 저장해줘. 먼저 git·gh·GitHub 연결 여부를 확인하고 개인정보·고객정보·비밀키·.env를 검사해 제외할 것과 저장할 파일을 보여줘. 저장소 공개·비공개는 내가 고르고, 내가 승인한 뒤에만 커밋·푸시해. 로그인·비밀번호·2단계 인증은 내가 직접 처리하며 채팅에 입력하지 않게 해.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "5/9",
    "sourceKind": "ACTION",
    "headline": "Vercel에서 GitHub 저장 공간 고르기",
    "description": "Vercel에서 방금 만든 GitHub 저장 공간을 선택해요. 프로젝트 이름과 앞으로 사용할 공개 주소를 확인한 뒤, 'Deploy'를 누르기 전 화면에서 멈춰요.",
    "flow": null,
    "outcome": null,
    "action": "Deploy 직전 화면까지 진행합니다.",
    "prompt": "Vercel에서 방금 저장한 GitHub 저장소를 가져오게 도와줘. 브라우저 제어가 가능하면 한 단계씩 진행하고, 불가능하면 내가 누를 버튼을 한 번에 하나씩 알려줘. 저장소·프로젝트 이름·예정 공개 주소를 보여주고 Deploy 직전에 멈춰. 로그인·GitHub 연결 권한·비밀값 입력은 내가 직접 할게.",
    "replacementText": null,
    "screenshot": "/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-vercel-import-repository-official.png",
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "6/9",
    "sourceKind": "ACTION",
    "headline": "공개 전 세 가지를 확인하고 Deploy 누르기",
    "description": "프로젝트 이름, 연결한 GitHub 저장 공간, 공개될 주소가 맞는지 다시 확인해요. 세 가지가 맞으면 내가 직접 'Deploy'를 눌러 홈페이지 공개를 시작해요.",
    "flow": null,
    "outcome": null,
    "action": "세 항목을 확인하고 Deploy를 누릅니다.",
    "prompt": "배포 준비 화면의 프로젝트 이름·연결 저장소·예정 공개 주소를 다시 보여줘. 내가 승인하면 내가 직접 Deploy를 누를게. 상태를 읽을 수 있으면 Ready까지 확인하고, 읽을 수 없으면 내가 공개 주소를 알려줄 때까지 기다려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "7/9",
    "sourceKind": "ACTION",
    "headline": "공개한 주소를 두 화면에서 확인하기",
    "description": "공개 주소를 휴대폰과 컴퓨터 크기로 열어 글자, 버튼, 링크, 화면이 옆으로 밀리는지, 이미지가 잘리지 않는지를 확인해요. 문제가 있으면 고친 뒤 같은 항목을 다시 보고, 모두 괜찮으면 실제 주소를 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "프롬프트를 실행해 검사와 재검사를 맡깁니다.",
    "prompt": "먼저 지금 사용할 수 있는 브라우저 검사 도구를 알려줘. 사용할 수 있으면 공개 주소를 휴대폰·컴퓨터 화면으로 자동 검사하고, 없으면 내가 두 화면을 열 수 있게 안내해. 글자 크기·버튼·링크·가로 밀림·잘린 이미지를 확인하고 문제를 고친 뒤 다시 검사해. 마지막에 다섯 항목 결과와 실제 최종 주소만 보여줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "8/9",
    "sourceKind": "ACTION",
    "headline": "QR 코드와 소개 문구 만들기",
    "description": "실제로 공개된 주소로 QR 코드를 만들고, 함께 보낼 짧은 소개 문구도 준비해요. QR 코드는 휴대폰 카메라로 한 번 읽어 보고, 메시지는 아직 보내지 않아요.",
    "flow": null,
    "outcome": null,
    "action": "QR을 휴대폰 카메라로 한 번 읽습니다.",
    "prompt": "[최종 배포 주소]로 QR 코드 PNG를 만들어줘. 스마트폰으로 인식되는지 확인할 방법과 단체방에 붙일 2줄 소개 문구를 보여줘. 실제 전송은 하지 마.",
    "replacementText": "[최종 배포 주소]",
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 다음"
  },
  {
    "dayLabel": "Day 10",
    "order": "9/9",
    "sourceKind": "RETRO",
    "headline": "오늘 공개한 홈페이지를 내 말로 돌아보기",
    "description": "AI가 대신 쓰지 않고, 오늘 새롭게 할 수 있게 된 일과 막힌 점을 내 말로 적어요. 짧아도 괜찮으니 다음에 다시 볼 나에게 도움이 되도록 남겨요.",
    "flow": null,
    "outcome": null,
    "action": "회고 프롬프트를 실행하고 세 질문에 직접 답합니다.",
    "prompt": "지금부터 오늘 회고를 진행해줘. /history나 작업 기록을 읽어 대신 쓰지 말고, 내가 직접 답한 내용만 사용해.\n\n다음 세 가지를 한 번에 하나씩 물어봐.\n1) 오늘 새롭게 할 수 있게 된 것은?\n2) 막힌 부분은 무엇이며, 해결했다면 어떻게 해결했나? 해결하지 못했다면 다음에는 어떻게 시도할까?\n3) 남아 있는 궁금증이나 새롭게 시도하고 싶은 것은?\n\n세 답변을 모두 받은 뒤 Asia/Seoul 기준 오늘 날짜로 ai-study/daily_retro.md를 업데이트해. 파일이나 폴더가 없으면 만들어.\n\n<!-- day-10-retro:start -->\n## YYYY-MM-DD · 10일차 수업 · 웹사이트 만들기 3: 내 홈페이지 세상에 공개하기\n\n### 새롭게 할 수 있게 된 것\n사용자의 답변 그대로\n\n### 막혔던 부분\n사용자의 답변 그대로. 해결했다면 방법, 해결하지 못했다면 다음 시도를 포함.\n\n### 남아 있는 궁금증 / 새롭게 시도하고 싶은 것\n사용자의 답변 그대로\n<!-- day-10-retro:end -->\n\n저장 규칙:\n- 같은 day-10-retro 마커 블록이 있으면 그 블록만 통째로 교체하고 수업일자를 오늘 날짜로 바꿔.\n- 같은 블록이 없으면 파일 끝에 추가해.\n- 다른 Day 블록은 절대 수정하지 마.\n- 내가 답한 문장을 요약하거나 보완하거나 바꾸지 마.\n- AI 의견·평가·칭찬·추측·추가 요약은 넣지 마.\n- 저장 후 수정한 Day와 파일 경로만 알려줘.",
    "replacementText": null,
    "screenshot": null,
    "supporting": null,
    "bottomButton": "이전 / 회고 프롬프트 복사"
  }
] as const satisfies readonly Week2SourceRecord[];

const assets = {
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-responsive-qa-success.png': {
    src: '/assets/tutorials/week2/d09-responsive-qa-success.png',
    alt: '브라우저 검사 결과에서 모든 확인 항목이 통과한 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/week3/screenshots/d11-agents-md-official.png': {
    src: '/assets/tutorials/week2/d11-agents-md-official.png',
    alt: 'AGENTS.md 또는 CLAUDE.md에 작업 규칙을 기록하는 예시 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/document-compat/screenshots/d07-claude-design-slide-deck-official.png': {
    src: '/assets/tutorials/week2/d07-claude-design-slide-deck-official.png',
    alt: 'Claude Design에서 슬라이드 결과를 확인하는 예시 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-claude-design-official.jpg': {
    src: '/assets/tutorials/week2/d09-claude-design-official.jpg',
    alt: 'Claude Design의 대화창과 캔버스에 디자인 결과가 보이는 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/website-planning/screenshots/d09-chatgpt-sites-at-mention-live.jpg': {
    src: '/assets/tutorials/week2/d09-chatgpt-sites-at-mention-live.jpg',
    alt: 'ChatGPT 입력칸에서 @로 Sites를 선택하는 예시 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-github-signup.png': {
    src: '/assets/tutorials/week2/d10-github-signup.png',
    alt: 'GitHub 로그인 또는 가입 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-vercel-signup-github.png': {
    src: '/assets/tutorials/week2/d10-vercel-signup-github.png',
    alt: 'GitHub 계정으로 Vercel에 로그인하는 화면',
  },
  '/Users/leegen/localnomad/ai-evening/public/assets/tutorials/github-vercel/screenshots/d10-vercel-import-repository-official.png': {
    src: '/assets/tutorials/week2/d10-vercel-import-repository-official.png',
    alt: 'Vercel에서 GitHub 저장소를 선택해 가져오는 화면',
  },
} as const;

const assetFor = (screenshot: string | null) =>
  screenshot ? assets[screenshot as keyof typeof assets] : undefined;

const pageId = (record: Week2SourceRecord) => {
  const day = Number(record.dayLabel.replace(/\D/g, ''));
  const prefix = `d${String(day).padStart(2, '0')}`;
  if (record.sourceKind === 'START') return `${prefix}-start`;
  if (record.sourceKind === 'RETRO') return `${prefix}-retro`;
  if (day === 7 && record.order === '2/7') return 'd07-choice-output';
  if (day === 7 && record.order === '4A/7') return 'd07-action-slides';
  if (day === 7 && record.order === '4B/7') return 'd07-action-docs';
  const actionNumber = Number(record.order.match(/^\d+/)?.[0] ?? 1) - 1;
  return `${prefix}-action-${String(actionNumber).padStart(2, '0')}`;
};

const pageView = (record: Week2SourceRecord): Week2Page['view'] => {
  const day = Number(record.dayLabel.replace(/\D/g, ''));
  if (record.sourceKind === 'START') return 'FOCUS';
  if (record.sourceKind === 'RETRO') return 'WORKBOOK';
  if (day === 7 && record.order === '2/7') return 'WORKBENCH';
  if (record.screenshot) return 'SPOTLIGHT';
  if (record.prompt) return 'PROMPT';
  if (record.replacementText) return 'WORKBENCH';
  return 'FOCUS';
};

const checkedAt = '2026-07-16';
const pageOverrides: Record<string, Partial<Week2Page>> = {
  'd06-action-07': {
    action: '새 대화 또는 보조 AI에 검토 프롬프트를 보냅니다.',
    supporting: '새 대화 또는 보조 AI는 조사·검토를 따로 맡는 작은 작업자입니다. 같은 파일 동시 편집은 피합니다.',
  },
  'd07-choice-output': {
    action: '[5장 슬라이드 또는 Google Docs 문서] / [첨부한 원본 파일] / [받을 사람] / [읽고 나서 할 행동]을 한 줄로 완성합니다.',
    replacementText: '[5장 슬라이드 또는 Google Docs 문서] / [첨부한 원본 파일] / [받을 사람] / [읽고 나서 할 행동]',
    supporting: '[5장 슬라이드 또는 Google Docs 문서] / [첨부한 원본 파일] / [받을 사람] / [읽고 나서 할 행동]',
  },
  'd07-action-02': {
    action: '첨부한 원본 파일에서 개인정보를 가린 사본을 첨부하고 프롬프트를 보냅니다.',
    prompt: '첨부한 원본 파일의 개인정보를 가린 사본을 읽기만 해줘. 아직 원본을 수정하거나 새 파일을 만들지 말고, 개인정보나 확인하기 어려운 값이 있으면 먼저 알려줘.',
  },
  'd07-action-slides': {
    prompt: '먼저 현재 사용할 수 있는 슬라이드·프레젠테이션 도구 이름을 알려줘. 없는 도구 이름을 지어내지 마.\n첨부한 원본 파일을 5장 슬라이드 초안으로 아래 순서에 맞춰 구성해줘.\n1장 제목\n2장 핵심 현황\n3장 문제\n4장 제안\n5장 다음 행동\n원문에 없는 숫자는 ‘확인 필요’로 표시해. 먼저 5장 슬라이드 목차만 보여주고 내 승인 후 제작해줘.',
  },
  'd07-action-docs': {
    prompt: '먼저 현재 Google Drive·Docs에 연결되어 있는지 확인해줘. 연결되어 있으면 첨부한 원본 파일을 읽고 [주간 보고서/회의 후 할 일표/고객 문의 정리] 중 내가 고른 양식의 Google Docs 문서 초안을 만들어줘. 연결되어 있지 않으면 Google Docs에 그대로 붙일 완성형 문서 초안을 화면에 보여줘.\n핵심 수치·변화·확인 필요·다음 행동을 구분하고, 원본에 없는 내용은 추측하지 마. 저장하기 전 내 승인을 받아줘.',
  },
  'd07-action-05': {
    title: '5장 슬라이드 또는 Google Docs 문서를 원본과 비교하기',
    description: '5장 슬라이드 또는 Google Docs 문서의 제목, 숫자, 이름, 날짜, 링크가 첨부한 원본 파일과 같은지 하나씩 확인해요. 다른 부분만 고치고, 고친 뒤에는 파일이 깨지지 않았는지도 다시 살펴봐요.',
    prompt: '5장 슬라이드 또는 Google Docs 문서의 제목·숫자·이름·날짜·링크를 첨부한 원본 파일과 대조해. 원본과 다른 값은 그 값만 원본 기준으로 고치고, 확인하지 못한 항목은 ‘확인 필요’로 남겨줘. 수정 후 파일을 다시 열어 표·글자·이미지가 깨지지 않았는지 확인하고 마지막에 대조표를 보여줘.',
  },
  'd10-action-01': {
    officialLinks: [
      { label: 'GitHub 가입', href: 'https://github.com/signup', publisher: 'GitHub', verifiedAt: checkedAt, accessNote: '가입·로그인과 이메일 인증은 내가 직접 합니다.' },
      { label: 'GitHub 로그인', href: 'https://github.com/login', publisher: 'GitHub', verifiedAt: checkedAt, accessNote: '비밀번호와 2단계 인증 코드는 채팅에 입력하지 않습니다.' },
    ],
  },
  'd10-action-02': {
    officialLinks: [
      { label: 'Vercel 로그인', href: 'https://vercel.com/login', publisher: 'Vercel', verifiedAt: checkedAt, accessNote: 'GitHub 연결 권한은 내가 직접 확인합니다.' },
      { label: 'Vercel Dashboard', href: 'https://vercel.com/dashboard', publisher: 'Vercel', verifiedAt: checkedAt, accessNote: '로그인 후 내 대시보드에서만 작업합니다.' },
    ],
  },
};

const toPage = (record: Week2SourceRecord): Week2Page => {
  const day = Number(record.dayLabel.replace(/\D/g, ''));
  const choice = day === 7 && record.order === '2/7'
    ? {
        key: 'output-format' as const,
        options: [
          { value: 'slides' as const, label: '5장 슬라이드', description: '원본을 5장 슬라이드로 만듭니다.' },
          { value: 'docs' as const, label: 'Google Docs 문서', description: '원본을 Google Docs 문서로 만듭니다.' },
        ],
      }
    : undefined;
  const visibleWhen = day === 7 && record.order === '4A/7'
    ? { choiceKey: 'output-format' as const, equals: 'slides' as const }
    : day === 7 && record.order === '4B/7'
      ? { choiceKey: 'output-format' as const, equals: 'docs' as const }
      : undefined;

  const page: Week2Page = {
    id: pageId(record),
    kind: choice ? 'CHOICE' : record.sourceKind,
    view: pageView(record),
    title: record.headline,
    description: record.description,
    action: record.action,
    ...(record.flow ? { flow: record.flow.split(' → ') } : {}),
    ...(record.outcome ? { outcome: record.outcome } : {}),
    prompt: record.prompt,
    replacementText: record.replacementText,
    supporting: record.supporting || record.replacementText,
    bottomButton: record.bottomButton,
    ...(assetFor(record.screenshot) ? { image: assetFor(record.screenshot) } : {}),
    ...(visibleWhen ? { visibleWhen } : {}),
    ...(choice ? { choice } : {}),
    ...(choice ? { controls: [{ id: 'output-format', type: 'radio' as const, label: '오늘 만들 결과', required: true as const, persist: 'local' as const, options: choice.options }] } : {}),
    source: record,
  };

  return { ...page, ...(pageOverrides[page.id] ?? {}) };
};

export const week2Days: readonly Week2TutorialDay[] = week2DayMetadata.map((metadata) => ({
  ...metadata,
  week: 2,
  theme: '시키기',
  status: 'ready',
  appTrack: 'unified',
  experience: 'one-action',
  pages: week2SourceRecords
    .filter((record) => Number(record.dayLabel.replace(/\D/g, '')) === metadata.day)
    .map(toPage),
}));

const expectedSourceCounts: Record<number, number> = { 6: 10, 7: 8, 8: 6, 9: 6, 10: 9 };
const expectedVisibleCounts: Record<number, number> = { 6: 10, 7: 7, 8: 6, 9: 6, 10: 9 };
const sourceFields: (keyof Week2SourceRecord)[] = [
  'dayLabel', 'order', 'sourceKind', 'headline', 'description', 'flow', 'outcome',
  'action', 'prompt', 'replacementText', 'screenshot', 'supporting', 'bottomButton',
];

if (week2SourceRecords.length !== 39) throw new Error('Week 2 requires 39 source records.');
if (week2SourceRecords.filter((record) => record.supporting).length !== 12) throw new Error('Week 2 requires 12 supporting notes.');
if (week2SourceRecords.filter((record) => record.screenshot).length !== 9) throw new Error('Week 2 requires 9 screenshot references.');
if (new Set(week2SourceRecords.flatMap((record) => record.screenshot ? [record.screenshot] : [])).size !== 8) {
  throw new Error('Week 2 requires 8 unique screenshot sources.');
}
for (const day of week2Days) {
  if (day.pages.length !== expectedSourceCounts[day.day]) throw new Error(`Unexpected ${day.day}일차 source count.`);
  const visible = day.pages.filter((page) => !page.visibleWhen).length + (day.day === 7 ? 1 : 0);
  if (visible !== expectedVisibleCounts[day.day]) throw new Error(`Unexpected ${day.day}일차 visible count.`);
  if (day.pages.filter((page) => page.source.sourceKind === 'START').length !== 1 || day.pages.filter((page) => page.source.sourceKind === 'RETRO').length !== 1) {
    throw new Error(`Week 2 day ${day.day} requires one START and one RETRO.`);
  }
}
const ids = new Set<string>();
for (const page of week2Days.flatMap((day) => day.pages)) {
  if (ids.has(page.id)) throw new Error(`Duplicate Week 2 page id: ${page.id}`);
  ids.add(page.id);
  if (sourceFields.some((field) => !(field in page.source))) throw new Error(`Week 2 source field lost: ${page.id}`);
  if (page.kind !== page.source.sourceKind && page.id !== 'd07-choice-output') {
    throw new Error(`Unexpected source/runtime kind conversion: ${page.id}`);
  }
  if (page.visibleWhen && !['d07-action-slides', 'd07-action-docs'].includes(page.id)) {
    throw new Error(`Unexpected conditional page: ${page.id}`);
  }
  if (page.view === 'PROMPT' && !page.prompt) throw new Error(`PROMPT requires source prompt: ${page.id}`);
  if (page.view === 'SPOTLIGHT' && !page.image) throw new Error(`SPOTLIGHT requires image: ${page.id}`);
  if (page.kind === 'CHOICE' && !page.choice) throw new Error(`CHOICE requires options: ${page.id}`);
}

import type { OneActionPage, OneActionTutorialDay } from './course';

const retro = (day: number, title: string): OneActionPage => ({
  id: `d${String(day).padStart(2, '0')}-retro`, kind: 'RETRO', view: 'WORKBOOK',
  title: '오늘 회고를 남겨봐요',
  description: 'AI가 질문을 하나씩 물을 때 내 말로 답하고, 같은 일차 기록만 갱신합니다.',
  action: '아래 프롬프트를 복사해 AI와 회고를 진행합니다.',
  prompt: `오늘 ${day}일차 수업 회고를 정리해줘. 수업 제목은 “${title}”이야.\n\n아래 질문을 쉬운 말로 한 번에 하나씩 물어봐. 내가 답하지 않은 내용은 추측하지 마.\n1. 새롭게 할 수 있게 된 것\n2. 막혔던 부분과 해결 방법 또는 다음에 시도할 방법\n3. 남아 있는 궁금증 또는 새롭게 시도하고 싶은 것\n\n답을 모두 받으면 ai-study/daily_retro.md를 읽어. “## ${day}일차 수업” 구역이 있으면 그 구역만 이번 답변으로 덮어쓰고, 없으면 일차 순서에 맞춰 추가해. 다른 일차 기록은 바꾸지 마. AI가 회고를 대신 쓰거나 평가하지 마. 저장 뒤 파일 경로와 “${day}일차 회고 저장 완료”만 알려줘.`,
});

const start = (day: number, title: string, subtitle: string, outcome: string, flow: string[]): OneActionPage => ({
  id: `d${String(day).padStart(2, '0')}-start`, kind: 'START', view: 'FOCUS', title: '오늘 할 일을 먼저 살펴봐요',
  subtitle, description: `오늘은 ${title} 수업입니다.`, action: '결과와 순서를 확인한 뒤 한 화면씩 따라갑니다.', outcome, flow,
});

export const week1Days: OneActionTutorialDay[] = [
  {
    day: 1, week: 1, theme: '차리기', title: '설치·가입·첫 업무 폴더', outcome: '가입한 AI 앱, ai-study 폴더, 내 일을 설명한 5줄', status: 'ready', appTrack: 'both', time: '30분', experience: 'one-action',
    pages: [
      start(1, '설치·가입·첫 업무 폴더', '앱을 설치하고 계정을 만들고 첫 대화를 해보세요.', '앱 하나와 ai-study 연습 공간', ['앱을 고릅니다', '설치하고 로그인합니다', '작업 폴더를 만듭니다']),
      { id: 'd01-prep', kind: 'ACTION', view: 'FOCUS', title: '설치 전에 준비해요', description: '현재 쓰는 계정과 컴퓨터 운영체제를 먼저 확인합니다.', action: '새 결제는 하지 않고 설치 화면만 엽니다.' },
      { id: 'd01-codex-download', kind: 'ACTION', view: 'SPOTLIGHT', track: 'codex', title: 'Codex용 ChatGPT 앱을 설치해요', description: '공식 다운로드 페이지에서 내 운영체제용 앱을 설치합니다.', action: '앱을 설치하고 Codex 화면이 보이는지 확인합니다.', image: { src: '/assets/tutorials/week1/d01-codex-download-official.png', alt: 'ChatGPT 데스크톱 앱 공식 다운로드 화면' } },
      { id: 'd01-claude-download', kind: 'ACTION', view: 'SPOTLIGHT', track: 'claude', title: 'Claude 앱을 설치해요', description: '공식 다운로드 페이지에서 앱을 설치하고 엽니다.', action: 'Claude 앱을 설치하고 실행합니다.', image: { src: '/assets/tutorials/week1/d01-claude-download-official.png', alt: 'Claude 앱 공식 다운로드 화면' } },
      { id: 'd01-signin', kind: 'ACTION', view: 'FOCUS', title: '가입 또는 로그인을 시작해요', description: '이미 있는 계정이면 새로 만들지 않습니다. 비밀번호와 인증 코드는 AI에게 보내지 않습니다.', action: '계정 시작 화면까지 이동합니다.' },
      { id: 'd01-app-check', kind: 'ACTION', view: 'FOCUS', title: '앱이 열렸는지 확인해요', description: '로그인 뒤 새 대화 또는 새 작업을 시작할 수 있는 화면이 보이면 됩니다.', action: '앱의 첫 화면을 확인합니다.' },
      { id: 'd01-folder', kind: 'ACTION', view: 'WORKBENCH', title: 'ai-study 작업 폴더를 만들어요', description: '앞으로 연습 파일을 모을 폴더를 한 곳에 만듭니다.', action: '컴퓨터에 ai-study 폴더를 만듭니다.', supporting: '파일을 AI에게 맡기기 전에 어떤 자료가 들어 있는지 먼저 확인하세요.' },
      { id: 'd01-first-prompt', kind: 'ACTION', view: 'PROMPT', title: '내 일을 5줄로 설명해 달라고 해요', description: '연습 폴더의 파일을 바꾸지 않도록 분명히 말합니다.', action: '프롬프트를 복사해 첫 대화를 시작합니다.', prompt: '지금 열어 둔 ai-study 폴더 안의 파일을 살펴보고, 내가 어떤 일을 하는 사람인지 처음 보는 사람도 이해할 수 있게 5줄로 설명해줘. 파일에서 확인한 사실과 네 추측을 구분하고, 개인정보나 고객정보가 보이면 외부로 보내지 말고 먼저 알려줘. 파일은 수정하거나 삭제하지 마.' },
      { id: 'd01-check', kind: 'ACTION', view: 'FOCUS', title: '첫 대화를 확인해요', description: 'AI가 내 일을 설명했는지, 추측과 사실을 구분했는지 봅니다.', action: '답에서 고칠 부분 하나를 말합니다.' },
      { id: 'd01-finish', kind: 'ACTION', view: 'FOCUS', title: '오늘 만든 것을 확인해요', description: '앱, 폴더, 첫 대화가 준비됐습니다.', action: '다음 수업으로 넘어갈 준비를 합니다.' },
    ],
  },
  {
    day: 2, week: 1, theme: '차리기', title: '나에게 맞게 AI 설정하기', outcome: '내 앱의 기본 설정과 프로젝트 지침 초안', status: 'ready', appTrack: 'both', time: '30분', experience: 'one-action',
    pages: [
      start(2, '나에게 맞게 AI 설정하기', '모델, 권한, 사용량을 내 상황에 맞게 확인해요.', '프로젝트 지침 초안', ['기본 설정을 확인합니다', '사용량을 읽습니다', '지침 초안을 만듭니다']),
      { id: 'd02-model', kind: 'ACTION', view: 'WORKBENCH', title: '모델과 승인 설정을 확인해요', description: '지금 보이는 이름과 옵션만 확인합니다. 새 결제나 위험한 설정 변경은 하지 않습니다.', action: '설정 화면을 열고 닫습니다.', supporting: '계정마다 메뉴 이름이 달라도 현재 표시된 선택지만 확인하면 됩니다.' },
      { id: 'd02-codex-usage', kind: 'ACTION', view: 'SPOTLIGHT', track: 'codex', title: 'Codex 사용량을 확인해요', description: '현재 표시된 사용량과 초기화 안내만 읽습니다.', action: 'Usage 화면을 확인하고 닫습니다.', image: { src: '/assets/tutorials/week1/d02-codex-usage-live.png', alt: 'Codex 사용량 설정 화면' } },
      { id: 'd02-claude-usage', kind: 'ACTION', view: 'SPOTLIGHT', track: 'claude', title: 'Claude 사용량을 확인해요', description: '표시가 있는 계정에서만 현재 한도를 확인합니다.', action: '사용량 표시를 읽고 닫습니다.', image: { src: '/assets/tutorials/week1/d02-claude-usage-official.png', alt: 'Claude Code 사용량 화면' } },
      { id: 'd02-instructions', kind: 'ACTION', view: 'PROMPT', title: '프로젝트 지침 초안을 만들어요', description: 'AI가 질문을 하나씩 물을 때 아는 것만 답합니다.', action: '프롬프트를 복사합니다.', prompt: 'ai-study 프로젝트에서만 쓸 프로젝트 지침 초안을 함께 만들자. 질문은 한 번에 하나씩, 최대 4개만 해줘. 자주 맡길 일, 원하는 답변 형식, 정보가 부족할 때 물어볼 것, 파일 수정이나 발송 전에 승인받을지를 물어봐. 민감한 정보는 묻지 마. 파일을 만들거나 저장하지 말고 6줄 이내 초안만 보여줘.' },
      { id: 'd02-review', kind: 'ACTION', view: 'COMPARISON', title: '초안을 점검해요', description: '잘못된 정보와 승인 없는 행동이 없는지 봅니다.', action: '고칠 문장만 골라봅니다.', comparison: [{ label: '남길 것', content: '쉬운 말, 확인 질문, 승인 전 행동 중단' }, { label: '뺄 것', content: '비밀번호, 확정되지 않은 숫자, 자동 실행 약속' }] },
      { id: 'd02-save', kind: 'ACTION', view: 'FOCUS', title: '지침을 저장할 위치를 확인해요', description: '앱마다 저장 위치가 다를 수 있습니다. 오늘은 위치만 확인해도 됩니다.', action: '프로젝트 폴더와 지침 위치를 확인합니다.' },
      { id: 'd02-test', kind: 'ACTION', view: 'PROMPT', title: '새 대화에서 지침을 시험해요', description: '답변 형식과 확인 방식이 지침에 맞는지 봅니다.', action: '프롬프트를 복사해 시험합니다.', prompt: '이 프로젝트에서 다음에 할 일을 3개만 제안해줘. 파일을 수정하거나 명령을 실행하지 말고, 필요한 정보가 부족하면 먼저 한 가지 질문을 해줘. 확인되지 않은 사실이나 숫자는 추측하지 마.' },
      { id: 'd02-finish', kind: 'ACTION', view: 'FOCUS', title: '내 설정을 정리해요', description: '다음 수업에서도 같은 기준을 사용할 수 있습니다.', action: '지침을 다시 열 수 있는지 확인합니다.' },
    ],
  },
  {
    day: 3, week: 1, theme: '차리기', title: 'AI와 대화하는 방법', outcome: '내 사업의 첫 5분 컨설팅과 이번 주 행동 하나', status: 'ready', appTrack: 'unified', time: '25분', experience: 'one-action',
    pages: [
      start(3, 'AI와 대화하는 방법', '상황, 목표, 결과물, 조건을 담아 구체적으로 대화해요.', '이번 주 첫 행동 하나', ['좋은 요청을 살핍니다', '내 상황을 적습니다', '실행안을 고릅니다']),
      { id: 'd03-four-parts', kind: 'ACTION', view: 'COMPARISON', title: '좋은 요청의 네 칸을 찾아봐요', description: '목적, 상황, 결과물, 조건을 구분하면 AI가 추측할 일이 줄어듭니다.', action: '두 요청을 비교합니다.', comparison: [{ label: '모호한 요청', content: '장사 잘되게 해줘.' }, { label: '구체적인 요청', content: '내 업종과 고객을 먼저 물어보고, 이번 주 실행할 개선안 3개를 쉬운 말로 제안해줘.' }] },
      { id: 'd03-context', kind: 'ACTION', view: 'WORKBENCH', title: '내 사업 정보를 적어봐요', description: '업종, 주요 고객, 가장 큰 고민만 한 줄씩 적습니다.', action: '민감한 정보 없이 세 가지를 준비합니다.', supporting: '매출, 고객 이름, 계약 내용처럼 외부에 보여주기 어려운 정보는 쓰지 않습니다.' },
      { id: 'd03-consulting', kind: 'ACTION', view: 'PROMPT', title: '5분 컨설팅을 요청해요', description: 'AI가 먼저 필요한 것을 묻게 합니다.', action: '프롬프트를 복사해 답합니다.', prompt: '내 사업을 5분 동안 집중 컨설팅해줘. 업종, 주요 고객, 지금 가장 큰 고민을 먼저 물어본 뒤, 바로 실행할 개선안 3개를 예상 효과와 첫 행동까지 포함해 쉬운 말로 제안해줘. 모르는 숫자나 사실은 추측하지 마.' },
      { id: 'd03-choice', kind: 'ACTION', view: 'WORKBENCH', title: '이번 주 실행안 하나를 골라요', description: '좋은 아이디어가 많아도 지금 할 수 있는 하나면 충분합니다.', action: '가장 쉬운 실행안 하나를 고릅니다.', supporting: '돈이나 새 계정이 필요한 일보다 오늘 15분 안에 시작할 수 있는 일을 고릅니다.' },
      { id: 'd03-first-action', kind: 'ACTION', view: 'PROMPT', title: '첫 행동을 15분으로 줄여봐요', description: '오늘이나 내일 바로 시작할 크기로 만듭니다.', action: '선택한 실행안을 바꿔 넣습니다.', prompt: '방금 제안 중 내가 고른 것은 [선택한 개선안]이야. 15분 안에 시작할 수 있는 첫 행동 1개로 줄여줘. 돈, 날짜, 계정 정보가 필요하면 추측하지 말고 한 번에 한 질문씩 물어봐줘.' },
      retro(3, 'AI와 대화하는 방법'),
    ],
  },
  {
    day: 4, week: 1, theme: '차리기', title: 'AI에게 도구 쥐어주기', outcome: 'Drive 파일 5줄 요약과 확인할 일 표', status: 'ready', appTrack: 'both', time: '30분', experience: 'one-action',
    pages: [
      start(4, 'AI에게 도구 쥐어주기', '브라우저와 Google Drive를 연결해 업무 보조를 만들어요.', '파일 요약과 확인할 일 표', ['민감한 탭을 닫습니다', 'Drive를 연결합니다', '원문과 비교합니다']),
      { id: 'd04-browser-codex', kind: 'ACTION', view: 'FOCUS', track: 'codex', title: 'Codex 브라우저 연결을 찾아봐요', description: '공식 연결 항목이 보이는 곳까지 이동합니다.', action: '연결 화면 위치만 확인합니다.' },
      { id: 'd04-browser-claude', kind: 'ACTION', view: 'FOCUS', track: 'claude', title: 'Claude in Chrome을 찾아봐요', description: '공식 설치 화면과 게시자를 먼저 확인합니다.', action: '공식 화면 위치만 확인합니다.' },
      { id: 'd04-tabs', kind: 'ACTION', view: 'COMPARISON', title: '민감한 탭을 먼저 닫아요', description: '연습과 관계없는 정보를 연결 전에 정리합니다.', action: '필요한 탭만 남깁니다.', comparison: [{ label: '닫을 탭', content: '금융, 병원, 정부, 고객 정보' }, { label: '남길 탭', content: '연습에 쓸 내 파일과 공식 안내' }] },
      { id: 'd04-drive', kind: 'ACTION', view: 'WORKBENCH', title: 'Google Drive를 연결해요', description: '요청되는 권한을 한 줄씩 읽고 내 계정인지 확인합니다.', action: '연결 완료 화면까지 진행합니다.', supporting: '권한 범위가 이해되지 않으면 연결하지 말고 먼저 내용을 확인합니다.' },
      { id: 'd04-file', kind: 'ACTION', view: 'FOCUS', title: '요약할 연습 파일을 골라요', description: '민감한 정보가 없는 내가 소유한 파일 하나만 사용합니다.', action: '파일 내용과 공유 범위를 확인합니다.' },
      { id: 'd04-summary', kind: 'ACTION', view: 'PROMPT', title: 'Drive 파일 요약을 요청해요', description: '확인되지 않은 내용은 확인 필요로 표시합니다.', action: '파일 링크를 바꿔 넣습니다.', prompt: '이 구글 드라이브 파일을 읽고 핵심 내용을 5줄로 요약해줘: [구글 드라이브 링크]. 결정 사항과 내가 해야 할 일은 담당자, 기한, 우선순위가 보이는 표로 정리하고, 파일에 없는 내용은 확인 필요라고 표시해줘.' },
      { id: 'd04-verify', kind: 'ACTION', view: 'PROMPT', title: 'AI의 표를 원문과 비교해요', description: '근거가 없으면 지우지 말고 확인 필요로 남깁니다.', action: '검증 프롬프트를 복사합니다.', prompt: '방금 표의 각 행 끝에 원문 근거가 있는 문장 또는 항목을 짧게 붙여줘. 근거를 찾지 못하면 삭제하지 말고 확인 필요로 바꿔줘.' },
      { id: 'd04-disconnect', kind: 'ACTION', view: 'FOCUS', title: '연결을 유지할지 정해요', description: '필요할 때만 연결을 켜두는 편이 안전합니다.', action: '계속 쓸 연결만 남깁니다.' },
      retro(4, 'AI에게 도구 쥐어주기'),
    ],
  },
  {
    day: 5, week: 1, theme: '차리기', title: '반복·예약 작업 설정하기', outcome: '월요일 뉴스 요약 예약 초안과 시험 기준', status: 'ready', appTrack: 'both', time: '25분', experience: 'one-action',
    pages: [
      start(5, '반복·예약 작업 설정하기', '매주 월요일 관심 분야 뉴스를 받아보세요.', '예약 초안과 시험 기준', ['예약 위치를 찾습니다', '받을 조건을 정합니다', '시험해 봅니다']),
      { id: 'd05-open-codex', kind: 'ACTION', view: 'SPOTLIGHT', track: 'codex', title: 'Codex 예약 작업 화면을 열어봐요', description: '새 예약 작업을 만들기 직전 화면까지 이동합니다.', action: 'Automations 화면을 엽니다.', image: { src: '/assets/tutorials/week1/d05-codex-automations-official.png', alt: 'Codex Automations 공식 화면' } },
      { id: 'd05-open-claude', kind: 'ACTION', view: 'SPOTLIGHT', track: 'claude', title: 'Claude 예약 작업 화면을 열어봐요', description: '새 작업을 만들기 직전 화면까지 이동합니다.', action: '예약 작업 화면을 엽니다.', image: { src: '/assets/tutorials/week1/d05-claude-schedule-official.png', alt: 'Claude 예약 작업 공식 화면' } },
      { id: 'd05-conditions', kind: 'ACTION', view: 'PROMPT', title: '내 뉴스 요약 조건을 정해요', description: '모르는 값은 정하지 말고 AI가 추측하지 않게 합니다.', action: '프롬프트를 복사해 네 가지를 답합니다.', prompt: '내 뉴스 요약 예약 작업을 만들기 전에 관심 주제, 제외 키워드, 선호 출처, 받을 분량을 한 번에 한 질문씩 물어봐줘. 내가 답하지 않은 값은 추측하지 마.' },
      { id: 'd05-create', kind: 'ACTION', view: 'PROMPT', title: '뉴스 요약 예약 초안을 만들어요', description: '승인하기 전에는 실제 예약을 만들지 않게 합니다.', action: '관심 주제를 바꿔 넣습니다.', prompt: '매주 월요일 오전 9시에 [관심 주제]의 지난 7일 소식을 요약하는 예약 작업 설정 초안만 보여줘. 공식 기관과 신뢰도 높은 언론을 우선하고 중복과 홍보성 글은 빼줘. 내가 승인하기 전에는 생성하지 마.' },
      { id: 'd05-test', kind: 'ACTION', view: 'COMPARISON', title: '예약 작업을 시험해 봐요', description: '예약 시간을 기다리지 않고 결과를 먼저 점검합니다.', action: '출처와 중복을 확인합니다.', comparison: [{ label: '확인할 것', content: '출처 링크, 중복 여부, 내 가게 영향의 근거' }, { label: '바꿀 수 있는 것', content: '관심 주제, 출처, 받을 분량' }] },
      { id: 'd05-change', kind: 'ACTION', view: 'PROMPT', title: '예약 작업을 하나 바꿔봐요', description: '다른 일정과 형식은 그대로 두고 한 가지만 바꿉니다.', action: '바꿀 항목을 넣습니다.', prompt: '이 예약 작업에서 [바꿀 항목]을 [새 값]으로 바꿔줘. 나머지 일정과 형식은 그대로 두고 변경 전과 후를 표로 보여준 다음 내 승인을 받아 적용해줘.' },
      retro(5, '반복·예약 작업 설정하기'),
    ],
  },
];

const allowedViews = {
  START: ['FOCUS'],
  CHOICE: ['WORKBENCH'],
  ACTION: ['FOCUS', 'WORKBENCH', 'SPOTLIGHT', 'PROMPT', 'COMPARISON'],
  RETRO: ['WORKBOOK'],
} as const;

const expectedVisibleCounts: Record<number, Record<'claude' | 'codex', number>> = {
  1: { claude: 9, codex: 9 }, 2: { claude: 8, codex: 8 }, 3: { claude: 7, codex: 7 },
  4: { claude: 9, codex: 9 }, 5: { claude: 7, codex: 7 },
};

for (const day of week1Days) {
  const ids = new Set<string>();
  for (const page of day.pages) {
    if (ids.has(page.id)) throw new Error(`Duplicate one-action page id: ${page.id}`);
    ids.add(page.id);
    if (!allowedViews[page.kind].includes(page.view as never)) throw new Error(`Invalid ${page.kind}/${page.view}: ${page.id}`);
    if (!page.title || !page.description || !page.action) throw new Error(`Missing page copy: ${page.id}`);
    if ((page.kind === 'START' && (!page.subtitle || !page.outcome || !page.flow?.length)) ||
      ((page.view === 'PROMPT' || page.view === 'WORKBOOK') && !page.prompt) ||
      (page.view === 'SPOTLIGHT' && !page.image) ||
      (page.view === 'COMPARISON' && page.comparison?.length !== 2) ||
      (page.view === 'WORKBENCH' && !page.supporting && !page.choices)) {
      throw new Error(`Missing required one-action content: ${page.id}`);
    }
  }
  for (const track of ['claude', 'codex'] as const) {
    const count = day.pages.filter((page) => !page.track || page.track === track).length;
    if (count !== expectedVisibleCounts[day.day][track]) throw new Error(`Unexpected ${day.day}일차 ${track} page count: ${count}`);
  }
}

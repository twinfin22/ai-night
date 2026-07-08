import { blogTutorial } from './blog-tutorial';
import { feedbackTutorial } from './feedback-tutorial';
import { firstPromptTutorial } from './first-prompt-tutorial';
import { skillTutorial } from './skill-tutorial';
import type { TutorialStep as ModuleTutorialStep } from './tutorial-types';
import { websiteTutorial } from './website-tutorial';

export type AppChoice = 'claude' | 'codex';
export type TutorialStatus = 'ready' | 'coming-soon';
export type AppTrack = 'both' | 'unified';

export interface StuckHelp {
  different: string;
  missing: string;
  skip: boolean;
}

export interface TutorialStep {
  action: string;
  detail: string;
  copyText?: string;
  success: string;
  stuck: StuckHelp;
}

export interface TutorialDay {
  day: number;
  week: number;
  theme: string;
  title: string;
  outcome: string;
  status: TutorialStatus;
  requiresDesktop: boolean;
  appTrack: AppTrack;
  time: string;
  challenge: string;
  tomorrow: string;
  readyLabel?: string;
  steps: TutorialStep[] | Record<AppChoice, TutorialStep[]>;
}

export const storageKeys = {
  version: 'ainight.version',
  done: 'ainight.done',
  position: 'ainight.position',
  last: 'ainight.last',
  app: 'ainight.app',
};

const defaultStuck: StuckHelp = {
  different: '화면 이름이 조금 달라도 괜찮습니다. 지금 단계에서 찾는 말만 다시 확인하세요.',
  missing: '버튼이 안 보이면 창을 넓히거나, 왼쪽 위와 오른쪽 위를 먼저 보세요.',
  skip: true,
};

const closingStep = (day: number): TutorialStep => ({
  action: '/오늘마무리를 실행하세요.',
  detail: '오늘 만든 것과 잘 된 부탁 방식을 정리합니다. 파일 저장이 안 되면 복사해서 직접 저장합니다.',
  copyText: `오늘은 Day ${day}입니다. /오늘마무리\n\n아래 형식으로 정리해 주세요. 폴더에 파일을 직접 만들 수 있으면 내AI공부/수업일지/day-${String(day).padStart(2, '0')}.md로 저장해 주세요. 파일을 만들 수 없으면 제가 복사할 수 있게 마크다운만 보여주세요.\n\n# Day ${day} 수업일지\n\n## 오늘 한 일\n-\n\n## 잘 통한 부탁 방식\n-\n\n## 막힌 점\n-\n\n## 내일 이어할 말\n-`,
  success: `day-${String(day).padStart(2, '0')}.md 파일이 생기거나, 복사해서 저장할 수 있는 마크다운이 나오면 성공입니다.`,
  stuck: {
    ...defaultStuck,
    different: '파일이 바로 안 생기면 실패가 아닙니다. AI가 보여준 마크다운을 복사해 수업일지 폴더에 직접 저장하세요.',
  },
});

const moduleStepToCourseStep = (step: ModuleTutorialStep): TutorialStep => ({
  action: step.title,
  detail: step.goal,
  copyText: step.prompt?.trim() ? step.prompt : undefined,
  success: step.successCriteria?.length
    ? `완료 기준: ${step.successCriteria.join(' / ')}`
    : `“${step.output}”이 나오면 성공입니다.`,
  stuck: {
    ...defaultStuck,
    different: step.recoveryPrompt ?? defaultStuck.different,
  },
});

const reuseModuleSteps = (steps: ModuleTutorialStep[], day: number): TutorialStep[] => [
  ...steps.map(moduleStepToCourseStep),
  closingStep(day),
];

const comingSoonStep: TutorialStep = {
  action: '이 수업은 준비 중입니다.',
  detail: '자리는 열어두었습니다. 완성되면 같은 주소에서 바로 이어집니다.',
  success: '지금은 출석부에서 다른 준비된 수업을 고르면 됩니다.',
  stuck: {
    different: '준비 중 수업은 아직 단계가 없습니다.',
    missing: '버튼이 없는 것이 정상입니다.',
    skip: true,
  },
};

export const weeks = [
  { week: 1, theme: '차리기', subtitle: '앱과 내 공부 공간을 준비합니다.' },
  { week: 2, theme: '시키기', subtitle: '반복 부탁을 AI에게 맡기는 법을 익힙니다.' },
  { week: 3, theme: '굴리기', subtitle: '나에게 맞춘 자동화 흐름을 만듭니다.' },
  { week: 4, theme: '홀로서기', subtitle: '혼자 문제를 정하고 해결합니다.' },
];

export const courseDays: TutorialDay[] = [
  {
    day: 1,
    week: 1,
    theme: '차리기',
    title: '앱 설치와 첫 만남',
    outcome: '내 앱을 고르고, 설치 후 첫 대화를 나눕니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'both',
    time: '25분',
    challenge: 'AI에게 내 가게나 내 일에 대해 한 가지를 편하게 물어보세요.',
    tomorrow: '내일은 유료 가입과 공부 폴더를 만듭니다.',
    readyLabel: '여기서 시작하세요',
    steps: {
      claude: [
        {
          action: '오늘 쓸 앱으로 클로드를 고르세요.',
          detail: '아래 선택 버튼에서 클로드를 누릅니다. 이 선택은 이 브라우저에 저장됩니다.',
          success: '상단에 “클로드로 진행 중”이라고 보이면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: 'Claude 공식 사이트를 여세요.',
          detail: '새 창에서 claude.ai를 열고 앱 설치 안내를 따라갑니다.',
          copyText: 'https://claude.ai/download',
          success: '컴퓨터에 Claude 앱이 열리면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '무엇을 물어도 괜찮습니다. AI는 컴퓨터를 망가뜨리지 않습니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
      ],
      codex: [
        {
          action: '오늘 쓸 앱으로 코덱스를 고르세요.',
          detail: '아래 선택 버튼에서 코덱스를 누릅니다. 이 선택은 이 브라우저에 저장됩니다.',
          success: '상단에 “코덱스로 진행 중”이라고 보이면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: 'Codex 앱을 여세요.',
          detail: '설치된 Codex를 실행하고 새 작업 공간을 엽니다.',
          success: '대화 입력창이 보이면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '잘못된 질문은 없습니다. 먼저 편한 말로 부탁해봅니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
      ],
    },
  },
  {
    day: 2,
    week: 1,
    theme: '차리기',
    title: '유료 가입과 내 폴더 만들기',
    outcome: '결제, 내AI공부 폴더, 수업일지 폴더, /오늘마무리 설치를 끝냅니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'both',
    time: '30분',
    challenge: '내AI공부 폴더 안에 “내 가게 자료” 폴더를 하나 더 만드세요.',
    tomorrow: '내일은 화면 버튼을 하나씩 익힙니다.',
    steps: {
      claude: [
        {
          action: '클로드 유료 가입 화면을 확인하세요.',
          detail: '결제는 건너뛸 수 없습니다. 강사와 함께 금액과 계정을 확인한 뒤 진행하세요.',
          success: '유료 기능 안내가 사라지고 대화가 가능하면 성공입니다.',
          stuck: { ...defaultStuck, skip: false },
        },
        {
          action: '내AI공부 폴더와 수업일지 폴더를 만드세요.',
          detail: '바탕화면이나 문서 폴더 안에 “내AI공부/수업일지”를 만듭니다.',
          success: '수업일지 폴더가 열려 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '/오늘마무리 주문을 저장하세요.',
          detail: '파일 저장은 앱마다 다릅니다. 오늘은 복사해서 저장하는 안전한 방식으로 시작합니다.',
          copyText: '앞으로 제가 “/오늘마무리”라고 말하면, 오늘 배운 것과 잘 통한 부탁 방식을 수업일지 형식으로 정리해 주세요. 파일을 직접 만들 수 있으면 내AI공부/수업일지/day-XX.md로 저장하고, 파일을 만들 수 없으면 제가 복사할 수 있게 마크다운만 보여주세요.',
          success: 'AI가 “파일 저장이 안 되면 복사용 마크다운을 보여주겠다”고 답하면 성공입니다.',
          stuck: defaultStuck,
        },
      ],
      codex: [
        {
          action: '코덱스 유료 가입 상태를 확인하세요.',
          detail: '결제는 건너뛸 수 없습니다. 강사와 함께 계정과 결제 상태를 확인하세요.',
          success: '새 작업을 만들 수 있으면 성공입니다.',
          stuck: { ...defaultStuck, skip: false },
        },
        {
          action: '내AI공부 폴더와 수업일지 폴더를 만드세요.',
          detail: '바탕화면이나 문서 폴더 안에 “내AI공부/수업일지”를 만듭니다.',
          success: '수업일지 폴더가 열려 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '/오늘마무리 주문을 저장하세요.',
          detail: '코덱스에서는 작업 폴더 안 파일 저장을 시도합니다. 안 되면 복사용 마크다운으로 대체합니다.',
          copyText: '앞으로 제가 “/오늘마무리”라고 말하면, 오늘 배운 것과 잘 통한 부탁 방식을 수업일지 형식으로 정리해 주세요. 파일을 직접 만들 수 있으면 내AI공부/수업일지/day-XX.md로 저장하고, 파일을 만들 수 없으면 제가 복사할 수 있게 마크다운만 보여주세요.',
          success: 'AI가 “파일 저장이 안 되면 복사용 마크다운을 보여주겠다”고 답하면 성공입니다.',
          stuck: defaultStuck,
        },
      ],
    },
  },
  {
    day: 3,
    week: 1,
    theme: '차리기',
    title: '화면 구석구석 — 버튼별 설명',
    outcome: '자주 쓰는 버튼의 이름과 위치를 압니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'both',
    time: '25분',
    challenge: '버튼 이름 3개를 내 말로 적어보세요.',
    tomorrow: '내일은 첫 프롬프트를 만듭니다.',
    steps: {
      claude: [comingSoonStep],
      codex: [comingSoonStep],
    },
  },
  {
    day: 4,
    week: 1,
    theme: '차리기',
    title: '첫 프롬프트 만들기',
    outcome: '목표, 맥락, 제약, 완료 기준이 들어간 첫 지시문을 만듭니다.',
    status: 'ready',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '25분',
    challenge: '내 가게 말투로 같은 부탁을 한 번 더 바꿔보세요.',
    tomorrow: '내일은 나만의 말투 규칙을 정합니다.',
    steps: reuseModuleSteps(firstPromptTutorial.steps, 4),
  },
  {
    day: 5,
    week: 1,
    theme: '차리기',
    title: '나만의 말투 정하기',
    outcome: 'AI가 내 말투 규칙대로 답하게 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '25분',
    challenge: '싫어하는 말투 3가지를 AI에게 알려주세요.',
    tomorrow: '다음 주는 AI에게 일을 시킵니다.',
    steps: [comingSoonStep],
  },
  {
    day: 6,
    week: 2,
    theme: '시키기',
    title: 'AI에게 혹평 받기',
    outcome: '내 전단지나 공지문을 AI 피드백으로 고칩니다.',
    status: 'ready',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '25분',
    challenge: '고친 문장을 손님 말투로 더 쉽게 바꿔보세요.',
    tomorrow: '내일은 첫 스킬을 씁니다.',
    steps: reuseModuleSteps(feedbackTutorial.steps, 6),
  },
  {
    day: 7,
    week: 2,
    theme: '시키기',
    title: '첫 스킬 — 마법의 주문의 정체',
    outcome: '/오늘마무리가 스킬이었음을 알고, 스킬 하나를 내려받아 씁니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '매주 반복하는 부탁 하나를 찾아 이름을 붙이세요.',
    tomorrow: '내일은 외부 도구를 연결합니다.',
    steps: [
      {
        action: 'Day 2에서 쓴 /오늘마무리를 다시 떠올리세요.',
        detail: '매번 같은 마무리 양식을 반복하기 위해 스킬이 필요합니다.',
        success: '“파일 저장이 되면 저장, 안 되면 복사용 마크다운”이라고 설명할 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '수업용 오늘마무리 스킬을 확인하세요.',
        detail: '스킬은 반복 주문을 문서로 저장해 둔 것입니다. 오늘은 수업용 스킬 문서를 열어봅니다.',
        copyText: '수업용 오늘마무리 스킬 문서를 기준으로, 오늘 수업일지를 만들어 주세요. 파일 저장이 안 되면 복사용 마크다운으로 보여주세요.',
        success: 'AI가 Day 번호와 수업일지 형식을 확인하면 성공입니다.',
        stuck: defaultStuck,
      },
      closingStep(7),
    ],
  },
  {
    day: 8,
    week: 2,
    theme: '시키기',
    title: 'MCP — 크롬·드라이브·지메일 붙이기',
    outcome: '연결된 도구로 받은 메일 정리표 같은 실물 결과를 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '내가 자주 여는 도구 1개를 추가로 적어보세요.',
    tomorrow: '내일은 예약 작업을 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 9,
    week: 2,
    theme: '시키기',
    title: '예약 작업 — 매일 아침 뉴스 요약',
    outcome: '내일 아침부터 자동 도착하는 업종 뉴스 요약을 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '뉴스 주제를 우리 동네 소식으로 바꿔보세요.',
    tomorrow: '내일은 내 스킬을 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 10,
    week: 2,
    theme: '시키기',
    title: '내 스킬 만들기',
    outcome: '반복해서 시키던 부탁 하나를 스킬로 저장합니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '스킬 이름을 손님도 이해할 말로 바꿔보세요.',
    tomorrow: '다음 주는 자동화 흐름을 굴립니다.',
    steps: reuseModuleSteps(skillTutorial.steps, 10),
  },
  {
    day: 11,
    week: 3,
    theme: '굴리기',
    title: '뉴스 요약 업그레이드',
    outcome: '폰으로 도착하는 아침 브리핑을 만듭니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '브리핑 끝에 “오늘 할 일 1개”를 붙여보세요.',
    tomorrow: '내일은 쌓아둔 수업일지로 AGENTS.md를 만듭니다.',
    steps: [
      {
        action: '받고 싶은 뉴스 주제를 하나 고르세요.',
        detail: '업종, 동네, 고객 관심사 중 하나만 고릅니다.',
        copyText: '우리 가게에 도움 되는 아침 브리핑 주제를 5개 추천해 주세요. 너무 큰 뉴스 말고 오늘 장사에 쓸 수 있는 주제로요.',
        success: '뉴스 주제 1개를 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '전달 받을 곳을 정하세요.',
        detail: '이메일 또는 텔레그램 중 지금 열 수 있는 쪽을 고릅니다.',
        success: '내 폰에서 받을 경로가 정해지면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '아침 브리핑 문장을 복사해 설정하세요.',
        detail: '시간, 주제, 분량, 마지막 행동 1개를 포함합니다.',
        copyText: '매일 아침 8시에 아래 주제로 짧은 브리핑을 보내주세요.\n주제: [내 주제]\n형식: 핵심 3줄, 오늘 할 일 1개, 참고 링크 2개\n말투: 50대 소상공인이 바로 이해할 수 있게 쉽게',
        success: '테스트 브리핑이 한 번 도착하면 성공입니다.',
        stuck: defaultStuck,
      },
      closingStep(11),
    ],
  },
  {
    day: 12,
    week: 3,
    theme: '굴리기',
    title: 'AGENTS.md — 나만의 AI 설명서',
    outcome: '수업일지를 모아 나에게 맞춘 AI 설명서를 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: 'AI가 나를 오해한 부분 1개를 고쳐보세요.',
    tomorrow: '내일은 내 가게 웹사이트를 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 13,
    week: 3,
    theme: '굴리기',
    title: '내 가게 웹사이트 만들기',
    outcome: '사업 소개 페이지를 만듭니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '첫 화면 문장을 손님 말투로 바꿔보세요.',
    tomorrow: '내일은 블로그 자동화입니다.',
    steps: reuseModuleSteps(websiteTutorial.steps, 13),
  },
  {
    day: 14,
    week: 3,
    theme: '굴리기',
    title: '블로그 콘텐츠 자동화 파이프라인',
    outcome: '주제만 넣으면 초안이 나오는 글쓰기 흐름을 만듭니다.',
    status: 'ready',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '후기 글 주제 하나를 넣어 초안을 만들어보세요.',
    tomorrow: '내일은 카드뉴스입니다.',
    steps: reuseModuleSteps(blogTutorial.steps, 14),
  },
  {
    day: 15,
    week: 3,
    theme: '굴리기',
    title: '카드뉴스 제작 자동화 파이프라인',
    outcome: '인스타그램이나 블로그용 카드뉴스 세트 1벌을 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '표지 문장을 3가지 버전으로 뽑아보세요.',
    tomorrow: '다음 주는 혼자 해결하는 연습입니다.',
    steps: [comingSoonStep],
  },
  {
    day: 16,
    week: 4,
    theme: '홀로서기',
    title: '사진·서류로 일 시키기',
    outcome: '사진을 던지면 정리되는 장부 흐름을 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '30분',
    challenge: '영수증 사진 1장으로 표를 만들어보세요.',
    tomorrow: '내일은 종합 프로젝트입니다.',
    steps: [comingSoonStep],
  },
  {
    day: 17,
    week: 4,
    theme: '홀로서기',
    title: '종합 프로젝트',
    outcome: '내 가게 문제 하나를 스스로 정의하고 해결합니다.',
    status: 'coming-soon',
    requiresDesktop: true,
    appTrack: 'unified',
    time: '30분',
    challenge: '문제, 자료, 원하는 결과를 한 문장씩 쓰세요.',
    tomorrow: '내일은 AI 답변을 검증합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 18,
    week: 4,
    theme: '홀로서기',
    title: 'AI가 틀렸을 때',
    outcome: '검증 습관과 비용 점검표를 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '25분',
    challenge: 'AI 답변 하나를 다른 출처로 확인해보세요.',
    tomorrow: '내일은 커뮤니티에 질문합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 19,
    week: 4,
    theme: '홀로서기',
    title: '더 넓은 세계 — 한국 AI 커뮤니티',
    outcome: 'GPTers 같은 커뮤니티에 가입하고 질문 하나를 올립니다.',
    status: 'ready',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '25분',
    challenge: '내 질문에 배경, 시도한 것, 원하는 답을 넣어 다시 고쳐보세요.',
    tomorrow: '내일은 AI 도구함과 수료증입니다.',
    steps: [
      {
        action: '한국 AI 커뮤니티 하나를 고르세요.',
        detail: '강사가 안내한 곳 또는 GPTers처럼 초보 질문을 받는 곳을 고릅니다.',
        copyText: 'AI 초보 소상공인이 질문하기 좋은 한국 커뮤니티를 3곳 추천해 주세요. 너무 개발자 위주인 곳은 빼주세요.',
        success: '가입할 커뮤니티 1곳을 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '질문 초안을 만드세요.',
        detail: '무엇을 하려는지, 어디서 막혔는지, 어떤 답이 필요한지 씁니다.',
        copyText: '아래 내용을 커뮤니티에 올릴 질문으로 고쳐 주세요.\n상황: [내 상황]\n해본 것: [해본 것]\n막힌 곳: [막힌 곳]\n원하는 답: [원하는 답]',
        success: '복사해서 올릴 수 있는 질문이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      closingStep(19),
    ],
  },
  {
    day: 20,
    week: 4,
    theme: '홀로서기',
    title: '나만의 AI 도구함 + 수료',
    outcome: 'AI 툴킷 목록, 다음 30일 계획, 수료증을 만듭니다.',
    status: 'coming-soon',
    requiresDesktop: false,
    appTrack: 'unified',
    time: '30분',
    challenge: '다음 30일 동안 매주 반복할 일 1개를 정하세요.',
    tomorrow: '수료했습니다. 이제 내 일에 계속 붙여 씁니다.',
    steps: [comingSoonStep],
  },
];

export function getDay(day: number) {
  return courseDays.find((item) => item.day === day);
}

export function dayPath(day: number) {
  return `/tutorials/day-${String(day).padStart(2, '0')}/`;
}

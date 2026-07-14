import { week1Days } from './course-week1';
import { week4Days } from './course-week4';

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
  image?: { src: string; alt: string };
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
  appTrack: AppTrack;
  time: string;
  challenge: string;
  tomorrow: string;
  readyLabel?: string;
  steps: TutorialStep[] | Record<AppChoice, TutorialStep[]>;
}

export type OneActionKind = 'START' | 'CHOICE' | 'ACTION' | 'RETRO';
export type OneActionView = 'FOCUS' | 'WORKBENCH' | 'SPOTLIGHT' | 'PROMPT' | 'COMPARISON' | 'WORKBOOK';
export type OneActionControlType = 'text' | 'radio' | 'checkbox' | 'check';

export interface OneActionControl {
  id: string;
  type: OneActionControlType;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  exact?: number;
  options?: { value: string; label: string; description?: string }[];
  persist?: 'local' | 'session';
}

export interface OneActionPage {
  id: string;
  kind: OneActionKind;
  view: OneActionView;
  title: string;
  description: string;
  action: string;
  track?: AppChoice;
  subtitle?: string;
  outcome?: string;
  flow?: string[];
  prompt?: string;
  highlightTokens?: string[];
  image?: { src: string; alt: string };
  images?: { src: string; alt: string }[];
  officialLinks?: { label: string; href: string }[];
  supporting?: string;
  choices?: { value: string; label: string; description: string }[];
  comparison?: { label: string; content: string }[];
  controls?: OneActionControl[];
  advanceWhen?: 'started' | 'copied' | 'controls' | 'confirmed';
}

export interface OneActionTutorialDay extends Omit<TutorialDay, 'appTrack' | 'steps' | 'challenge' | 'tomorrow'> {
  experience: 'one-action';
  appTrack: AppTrack;
  pages: OneActionPage[];
  challenge?: string;
  tomorrow?: string;
}

export type LegacyTutorialDay = TutorialDay & { experience?: never };
export type CourseDay = LegacyTutorialDay | OneActionTutorialDay;

export const storageKeys = {
  version: 'ainight.version',
  done: 'ainight.done',
  position: 'ainight.position',
  last: 'ainight.last',
  app: 'ainight.app',
  draft: 'ainight.draft',
};

export const courseVersion = '4';

const defaultStuck: StuckHelp = {
  different: '화면 이름이 조금 달라도 괜찮습니다. 지금 단계에서 찾는 말만 다시 확인하세요.',
  missing: '버튼이 안 보이면 창을 넓히거나, 왼쪽 위와 오른쪽 위를 먼저 보세요.',
  skip: true,
};

const saveResultStep = (day: number): TutorialStep => ({
  action: '오늘 만든 것과 이어 할 말 1줄을 남기세요.',
  detail: '파일 저장을 억지로 하지 않습니다. 지금 대화에 오늘 만든 것과 다음에 이어 할 말만 짧게 남깁니다.',
  copyText: `오늘은 Day ${day}입니다.\n\n오늘 만든 것을 짧게 정리해 주세요.\n\n형식:\n- 오늘 만든 것:\n- 다음에 이어 할 말:\n\n파일 저장이 꼭 필요한 결과물은 앞 단계 안내를 따릅니다. 오늘 대화에서 확인되지 않는 내용은 지어내지 말고 "확인 필요"라고 표시해 주세요.`,
  success: `Day ${day}에서 만든 것과 다음에 이어 할 말 1줄이 대화에 남으면 성공입니다.`,
  stuck: {
    ...defaultStuck,
    different: '파일이 없어도 실패가 아닙니다. 주간 정리는 앱 히스토리와 현재 대화를 먼저 확인합니다.',
  },
});

const weeklyHistoryStep = (week: number, dayRange: string): TutorialStep => ({
  action: `Week ${week} 대화 히스토리에서 설명서 후보를 뽑으세요.`,
  detail: 'Claude/Codex 앱의 최근 대화와 작업 히스토리를 우선 확인합니다. 접근이 안 되면 ai-study/outputs와 현재 대화에서 확인 가능한 내용만 씁니다.',
  copyText: `Week ${week}(${dayRange})를 돌아보고, ai-study/AGENTS.md에 추가하거나 고칠 후보를 뽑아 주세요.\n\n반드시 지킬 것:\n- 먼저 Claude/Codex의 최근 대화와 작업 히스토리를 읽을 수 있는지 확인하기\n- 읽기 전에 어떤 히스토리 또는 폴더를 볼지 저에게 말하기\n- 비밀번호, 토큰, 결제정보, 개인정보는 후보에 넣지 않기\n- 히스토리 접근이 안 되면 ai-study/outputs와 지금 대화에서 확인 가능한 내용만 쓰기\n- 확실하지 않은 내용은 "확인 필요"로 표시하기\n- ai-study/AGENTS.md에는 제가 승인한 후보만 반영하기\n\n출력은 후보 5개 이하로, 각 후보마다 이유를 한 줄씩 붙여 주세요.`,
  success: '설명서 후보가 5개 이하로 나오고, 내가 승인한 것만 반영되면 성공입니다.',
  stuck: {
    ...defaultStuck,
    different: '히스토리 접근이 안 되면 실패가 아닙니다. ai-study/outputs와 지금 대화에서 확인되는 내용만 쓰면 됩니다.',
  },
});

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
  { week: 1, theme: '차리기', subtitle: '앱과 기본 습관을 준비합니다.' },
  { week: 2, theme: '시키기', subtitle: '서류와 돈 계산을 AI에게 맡깁니다.' },
  { week: 3, theme: '굴리기', subtitle: '자동으로 돌아가는 흐름을 만듭니다.' },
  { week: 4, theme: '홀로서기', subtitle: '배운 것을 조합해 나만의 시스템을 만듭니다.' },
];

const legacyCourseDays: LegacyTutorialDay[] = [
  {
    day: 1, week: 1, theme: '차리기',
    title: '시작하기 — 설치, 가입, 화면 투어',
    outcome: '앱 설치, ai-study 폴더, 첫 대화까지 끝냅니다.',
    status: 'ready', appTrack: 'both', time: '30분',
    challenge: '화면 투어에서 배운 버튼 3개의 이름을 내 말로 적어보세요.',
    tomorrow: '내일은 첫 프롬프트를 만듭니다.',
    readyLabel: '여기서 시작하세요',
    steps: {
      claude: [
        {
          action: 'Claude 앱을 설치하고 로그인하세요.',
          detail: '새 창에서 claude.ai를 열고 앱 설치 안내를 따라간 뒤, 강사와 함께 유료 가입까지 확인합니다.',
          copyText: 'https://claude.ai/download',
          success: '컴퓨터에 Claude 앱이 열리고, 유료 안내 없이 대화 입력창이 보이면 성공입니다.',
          stuck: { ...defaultStuck, skip: false },
        },
        {
          action: '화면 투어 1 — 대화와 세션을 찾으세요.',
          detail: '새 대화 버튼, 지난 대화(세션) 목록, 프로젝트를 하나씩 직접 눌러봅니다.',
          image: {
            src: '/assets/tutorials/setup/claude-app-sidebar.png',
            alt: 'Claude 앱의 Chat, Cowork, Code 모드와 왼쪽 메뉴 화면',
          },
          success: '새 대화 버튼과 지난 대화 목록을 직접 눌러봤으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '화면 투어 2 — 모델과 모드를 찾으세요.',
          detail: '모델 선택, 생각 깊이, 질문 모드, 프로젝트 또는 폴더에서 작업하기 위치를 확인합니다. 지금은 위치만 알면 됩니다.',
          image: {
            src: '/assets/tutorials/setup/claude-chat-input-attach.png',
            alt: 'Claude 앱의 입력창, 파일 첨부, 모델 선택 위치 화면',
          },
          success: '모델 선택, 생각 깊이, 질문 모드, 폴더 작업 위치를 말할 수 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: 'ai-study 작업 폴더를 만들고 연결하세요.',
          detail: '바탕화면이나 문서 폴더 안에 ai-study 폴더를 만듭니다. 파일 저장이 필요한 날에만 outputs 폴더를 보조로 씁니다.',
          copyText: '제 컴퓨터에 ai-study라는 작업 폴더를 만들어 주세요. 파일 저장이 필요한 수업을 위해 outputs 폴더도 함께 만들어 주세요.',
          success: 'ai-study 폴더가 보이고, 필요할 때 쓸 outputs 폴더도 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '무엇을 물어도 괜찮습니다. AI는 컴퓨터를 망가뜨리지 않습니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
        saveResultStep(1),
      ],
      codex: [
        {
          action: 'Codex 앱을 설치하고 로그인하세요.',
          detail: '설치된 Codex를 실행하고, 강사와 함께 계정과 결제 상태를 확인합니다.',
          success: '새 작업을 만들 수 있으면 성공입니다.',
          stuck: { ...defaultStuck, skip: false },
        },
        {
          action: '화면 투어 1 — 대화와 작업 공간을 찾으세요.',
          detail: '새 작업 버튼, 지난 작업 목록을 하나씩 직접 눌러봅니다.',
          image: {
            src: '/assets/tutorials/setup/codex-app-sidebar.png',
            alt: 'Codex 앱의 New chat, Search, Scheduled, Plugins 왼쪽 메뉴 화면',
          },
          success: '새 작업 버튼과 지난 작업 목록을 직접 눌러봤으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '화면 투어 2 — 모델과 모드를 찾으세요.',
          detail: '모델 선택 메뉴와 계획(Plan) 모드의 위치를 확인합니다. 지금은 위치만 알면 됩니다.',
          image: {
            src: '/assets/tutorials/setup/codex-folder-plan-mode.png',
            alt: 'Codex 앱의 작업 폴더 선택, 모델 선택, 계획 모드 위치 화면',
          },
          success: '모델 선택과 계획 모드의 위치를 말할 수 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: 'ai-study 작업 폴더를 만들고 연결하세요.',
          detail: '바탕화면이나 문서 폴더 안에 ai-study 폴더를 만듭니다. 파일 저장이 필요한 날에만 outputs 폴더를 보조로 씁니다.',
          copyText: '제 컴퓨터에 ai-study라는 작업 폴더를 만들어 주세요. 파일 저장이 필요한 수업을 위해 outputs 폴더도 함께 만들어 주세요.',
          success: 'ai-study 폴더가 보이고, 필요할 때 쓸 outputs 폴더도 있으면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '잘못된 질문은 없습니다. 먼저 편한 말로 부탁해봅니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
        saveResultStep(1),
      ],
    },
  },
  {
    day: 2, week: 1, theme: '차리기',
    title: '첫 프롬프트 만들기',
    outcome: '나쁜 예와 좋은 예를 비교하고, CRISP 5칸 지시서를 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '25분',
    challenge: '오늘 만든 5칸 지시서에서 말투 칸만 바꿔 다시 시켜보세요.',
    tomorrow: '내일은 메뉴판과 가격표를 만듭니다.',
    steps: [
      {
        action: '먼저 나쁜 예를 그대로 보내세요.',
        detail: '일부러 짧게 부탁해 봅니다. AI가 내 상황을 모르면 대충 짐작한다는 것을 직접 봅니다.',
        copyText: '우리 가게 홍보글 써줘',
        success: '답이 너무 넓거나 내 가게와 맞지 않는 부분을 찾으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '빠진 정보를 체크하세요.',
        detail: '누구에게 보여줄 글인지, 어떤 가게인지, 어디에 올릴 글인지, 길이와 말투가 있는지 봅니다.',
        copyText: '방금 답에서 빠진 정보를 체크해 주세요. 누구에게 보여줄 글인지, 어떤 가게인지, 어디에 올릴 글인지, 길이와 말투가 있는지 기준으로 봐 주세요.',
        success: '빠진 정보가 3개 이상 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '5칸 좋은 예로 다시 시켜보세요.',
        detail: '목표·맥락·제약·완료기준을 한 번에 설명하지 말고, 5칸으로 나눠 씁니다.',
        copyText: `내 상황: 저는 [동네/업종]을 운영합니다. 주 손님은 [손님]입니다.
AI가 맡을 역할: 초보 사장님을 돕는 홍보 문구 도우미입니다.
해달라는 일: [올릴 곳]에 올릴 홍보글을 써 주세요.
말투: 손님이 바로 이해할 수 있게 쉽고 따뜻하게 써 주세요.
지켜야 할 조건: 과장하지 말고, 가격이나 운영시간처럼 모르는 정보는 물어봐 주세요.`,
        success: '처음 답보다 내 상황이 더 많이 반영되면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '두 답을 나란히 비교하세요.',
        detail: 'AI가 갑자기 좋아진 것이 아니라, 내가 일을 더 분명하게 시켰다는 것을 확인합니다.',
        copyText: '처음 짧게 부탁한 답과 5칸으로 다시 부탁한 답을 비교해 주세요. 내 손님, 내 가게, 올릴 곳이 반영된 부분을 표로 보여 주세요.',
        success: '좋아진 이유를 내 말로 1개 설명할 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '나쁜 예와 좋은 예 5쌍을 보세요.',
        detail: '문자 답장, 공지문, 가격 안내, 리뷰 답글, 행사 안내처럼 실제로 자주 쓰는 예시를 봅니다.',
        copyText: '소상공인이 자주 하는 AI 부탁 5개를 나쁜 예와 좋은 예로 나눠 보여 주세요. 문자 답장, 공지문, 가격 안내, 리뷰 답글, 행사 안내를 포함해 주세요.',
        success: '내 일에 바로 쓸 수 있는 좋은 예 1개를 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '내 첫 AI 작업 지시서를 직접 채우세요.',
        detail: '아래 5칸 라벨은 그대로 둡니다. 빈칸만 내 일에 맞게 채웁니다.',
        copyText: `내 상황:
AI가 맡을 역할:
해달라는 일:
말투:
지켜야 할 조건:`,
        success: '5칸이 모두 채워진 내 첫 지시서가 생기면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '막히면 AI가 나를 인터뷰하게 하세요.',
        detail: '완벽하게 쓰려고 멈추지 말고, AI에게 먼저 물어볼 질문을 달라고 합니다.',
        copyText: '더 잘 만들기 위해 나에게 먼저 물어봐야 할 질문 3개만 해줘.\n질문은 쉬운 말로 해줘.',
        success: '내가 바로 답할 수 있는 질문 3개를 받으면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(2),
    ],
  },
  {
    day: 3, week: 1, theme: '차리기',
    title: '제대로 시키기 — 메뉴판·가격표',
    outcome: 'AI가 제안한 참고 디자인 중 하나를 골라, 인쇄 가능한 메뉴판을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '같은 메뉴판을 계절 한정판 버전으로 바꿔보세요.',
    tomorrow: '내일은 한 번 설정하면 계속 적용되는 것들을 배웁니다.',
    steps: [
      {
        action: '참고할 메뉴판 모양을 AI에게 먼저 골라달라고 하세요.',
        detail: '처음부터 내가 디자인을 정하려고 애쓰지 않습니다. AI에게 후보를 몇 개 받으면, 나는 마음에 드는 모양만 고르면 됩니다.',
        copyText: '작은 가게에서 바로 인쇄해 쓸 수 있는 메뉴판 모양을 5개 추천해 주세요. 너무 화려한 것보다 손님이 가격을 빨리 볼 수 있는 모양이면 좋겠습니다. 각 모양마다 어울리는 가게 종류와 장단점을 쉬운 말로 적어 주세요.',
        success: '마음에 드는 메뉴판 모양 1개를 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '손글씨 메뉴나 기존 가격표 사진을 올리세요.',
        detail: '메뉴 이름과 가격을 직접 다시 치지 않아도 됩니다. 종이에 적은 메뉴, 벽에 붙은 가격표, 예전 메뉴판 사진 중 하나를 올립니다.',
        copyText: '첨부한 사진에서 메뉴 이름과 가격을 읽어 주세요. 헷갈리는 글자는 추측하지 말고 저에게 확인 질문을 해 주세요.',
        success: 'AI가 메뉴와 가격을 표로 정리하고, 헷갈리는 부분을 물어보면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '사진 첨부가 안 되면 메뉴 5개만 직접 적어도 됩니다. 중요한 것은 실제 자료를 AI에게 주는 습관입니다.',
        },
      },
      {
        action: '4가지를 넣어 메뉴판 제작을 부탁하세요.',
        detail: '가게 종류, 손님, 참고 메뉴판 모양, 꼭 지킬 조건을 한 번에 알려줍니다. 모르는 정보는 AI가 물어보게 합니다.',
        copyText: `가게 종류: [예: 분식집, 미용실, 카페]
주 손님: [예: 동네 주민, 직장인, 단골 손님]
참고 메뉴판 모양: [방금 고른 메뉴판 모양]
지켜야 할 조건: A4 한 장에 인쇄할 수 있게, 메뉴 이름과 가격이 크게 보이게, 모르는 내용은 만들지 말고 질문하기

위 조건으로 인쇄용 메뉴판 초안을 만들어 주세요. 먼저 메뉴와 가격이 맞는지 확인할 표를 보여주고, 그다음 인쇄용 문구를 만들어 주세요.`,
        success: '메뉴와 가격 확인표가 먼저 나오고, 그 다음 인쇄용 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '틀린 메뉴와 가격을 바로잡으세요.',
        detail: '예쁘게 만드는 것보다 가격이 맞는 것이 먼저입니다. 인쇄 전에 메뉴 이름과 숫자를 한 번 더 확인합니다.',
        copyText: '지금 만든 메뉴판에서 메뉴 이름과 가격만 따로 표로 뽑아 주세요. 제가 확인할 수 있게 원래 사진에서 읽은 내용과 최종 메뉴판에 들어간 내용을 나란히 보여 주세요.',
        success: '틀린 가격이나 빠진 메뉴를 고칠 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '인쇄 전에 쓸 메뉴판 원고로 저장하세요.',
        detail: '오늘 결과물은 화면에만 있으면 안 됩니다. ai-study 안의 outputs 폴더에 저장할 수 있는 글로 받습니다.',
        copyText: '확정한 내용으로 A4 인쇄 전에 쓸 메뉴판 원고를 만들어 주세요. 가능하면 ai-study/outputs/day-03-menu.md 파일로 저장해 주세요. 파일 저장이 안 되면 제가 복사해서 저장할 수 있는 글로 보여 주세요.',
        success: 'day-03-menu.md 파일이 생기거나, 복사해서 저장할 수 있는 메뉴판 글이 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '바로 PDF가 안 나와도 괜찮습니다. 오늘은 인쇄 전에 쓸 수 있는 메뉴판 원고를 만드는 것이 목표입니다.',
        },
      },
      saveResultStep(3),
    ],
  },
  {
    day: 4, week: 1, theme: '차리기',
    title: 'AI 기본 설정 — 시스템 프롬프트와 가게 설명서',
    outcome: '개인 설정과 ai-study/AGENTS.md 내 가게 설명서를 만들어, 같은 부탁의 전과 후를 비교합니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '설명서에 손님이 자주 묻는 질문 1개를 더해보세요.',
    tomorrow: '내일은 12가지 습관을 한눈에 정리합니다.',
    steps: [
      {
        action: '개인 설정에 쉬운 말투 규칙을 넣으세요.',
        detail: '한 번 설정해 두면 새 부탁을 할 때마다 같은 말투 기준을 먼저 깔고 시작할 수 있습니다. 어려운 말은 쉬운 말로 바꾸게 합니다.',
        copyText: `제 개인 설정 또는 시스템 프롬프트에 아래 규칙을 넣고 싶습니다. 더 짧고 자연스럽게 다듬어 주세요.

규칙:
- 저는 작은 가게를 운영하는 초보자입니다.
- 어려운 말은 쓰지 말고, 꼭 필요하면 쉬운 예를 붙여 주세요.
- 답은 존댓말로, 바로 따라 할 수 있는 순서로 써 주세요.
- 모르는 내용은 지어내지 말고 먼저 질문해 주세요.
- 제 가게 정보가 필요하면 저를 인터뷰해 주세요.`,
        success: '개인 설정에 넣을 쉬운 말투 규칙이 완성되면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '개인 설정 위치를 못 찾으면, 지금은 이 규칙을 복사해 새 대화 첫머리에 붙여 넣어도 됩니다.',
        },
      },
      {
        action: 'AI에게 내 가게 정보를 인터뷰해 달라고 하세요.',
        detail: '내가 긴 설명을 한 번에 쓰려고 하지 않습니다. AI가 질문하고, 나는 아는 것만 답합니다.',
        copyText: `제 가게 설명서를 만들고 싶습니다. 한 번에 많이 묻지 말고, 질문은 2개씩만 해 주세요.

꼭 물어볼 것:
- 가게 이름과 업종
- 주 손님
- 자주 파는 상품이나 서비스
- 손님에게 쓰는 말투
- 자주 받는 질문
- 피하고 싶은 표현

제가 답하면 마지막에 ai-study/AGENTS.md에 넣을 짧은 초안을 만들어 주세요.`,
        success: 'AI가 질문을 시작하고, 내가 답한 내용으로 가게 정보가 모이면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '질문이 너무 많으면 "두 개씩만 물어봐 주세요"라고 다시 말하세요.',
        },
      },
      {
        action: 'ai-study/AGENTS.md 내 가게 설명서를 저장하세요.',
        detail: 'AGENTS.md는 AI가 먼저 읽는 내 가게 설명서입니다. 길게 쓰지 말고, 계속 써도 되는 사실만 넣습니다.',
        copyText: `방금 인터뷰한 내용으로 ai-study/AGENTS.md 파일을 만들어 주세요.

제목은 "# 내 가게 설명서"로 해 주세요.
아래 순서로 짧게 정리해 주세요.

## 내 정보
-

## 가게 정보
-

## 손님과 말투
-

## 자주 하는 일
-

## AI가 지켜야 할 규칙
- 쉬운 존댓말로 설명합니다.
- 모르는 내용은 만들지 말고 먼저 물어봅니다.
- 손님에게 보낼 문장은 과장하지 않습니다.

파일 저장이 안 되면 제가 복사해서 저장할 수 있게 마크다운으로 보여 주세요.`,
        success: 'ai-study/AGENTS.md 파일이 생기거나, 복사해서 저장할 설명서가 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '처음부터 완벽할 필요 없습니다. 오늘은 짧은 설명서를 하나 만드는 것이 목표입니다.',
        },
      },
      {
        action: '설명서 없이 한 번 부탁해 답을 받아두세요.',
        detail: '비교할 기준을 남깁니다. 일부러 가게 설명을 많이 넣지 않고 짧게 부탁합니다.',
        copyText: '우리 가게 단골 손님에게 보낼 이번 주 안내 문자를 써 주세요.',
        success: '설명서가 반영되기 전 느낌의 답이 하나 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '설명서를 읽힌 뒤 같은 부탁을 다시 하세요.',
        detail: '같은 부탁이라도 내 가게 설명서가 있으면 말투와 내용이 더 맞아지는지 확인합니다.',
        copyText: `ai-study/AGENTS.md 내 가게 설명서를 먼저 읽고, 아래 부탁을 다시 해 주세요.

부탁:
우리 가게 단골 손님에게 보낼 이번 주 안내 문자를 써 주세요.

마지막에 설명서 없이 만든 답과 지금 답이 어떻게 달라졌는지 쉬운 표로 비교해 주세요.`,
        success: '전과 후 차이가 표로 나오고, 내 가게에 더 맞는 부분을 찾으면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '차이가 별로 없으면 설명서에 주 손님, 자주 파는 상품, 피하고 싶은 표현을 한 줄씩 더 넣어 보세요.',
        },
      },
      saveResultStep(4),
    ],
  },
  {
    day: 5, week: 1, theme: '차리기',
    title: '[이론] AI 잘 시키는 12가지 습관',
    outcome: '지난 4일의 습관에 이름을 붙이고, 습관 카드와 첫 설명서 업데이트를 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '25분',
    challenge: '12가지 중 나에게 제일 어려운 습관 1개를 골라보세요.',
    tomorrow: '다음 주는 서류와 돈 계산을 맡깁니다.',
    steps: [
      {
        action: '지난 4일에 이미 쓴 습관 4개를 확인하세요.',
        detail: '새로 외우는 시간이 아닙니다. Day 1부터 Day 4까지 이미 해본 행동에 이름만 붙입니다.',
        copyText: `지난 4일 동안 제가 이미 해본 AI 사용 습관을 아래 4개 이름으로 정리해 주세요.

1. 잘 통한 방식 기록하기
2. 목표, 맥락, 제약, 완료기준 담아 지시하기
3. 파일, 사진, 링크 같은 실물을 같이 주기
4. 한 번 설정한 설명서를 계속 적용하기

각 습관마다 "제가 이미 한 일"과 "앞으로 다시 쓸 때 한 문장"을 쉬운 말로 써 주세요.`,
        success: '4가지 습관마다 내가 한 일과 다시 쓸 문장 1개가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '남은 습관 8개를 미리 보세요.',
        detail: '긴 설명은 건너뜁니다. 다음 주부터 어떤 행동을 하게 될지만 한 줄씩 봅니다.',
        copyText: `AI를 더 잘 쓰기 위해 앞으로 배울 남은 습관 8개를 처음 보는 사장님도 바로 이해할 말로 바꿔 주세요.

5. 만들기 전 계획부터
6. 검증시키고 증거 요구하기
7. 큰 일은 쪼개고, 작게 시험해서 키우기
8. AI에게 내 도구 쥐여주기
9. 반복 부탁은 스킬로 저장하기
10. 매일 하는 일은 예약 걸기
11. 꼬이면 새 대화로 다시 시작하기
12. 모호하면 AI에게 나를 인터뷰시키기

각 습관은 이름, 쉬운 뜻, 가게 일 예시 1개만 써 주세요. 강의처럼 길게 설명하지 마세요.`,
        success: '남은 습관 8개가 짧은 말과 가게 일 예시로 정리되면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '인쇄용 습관 카드를 만드세요.',
        detail: '벽에 붙여 두고 실제 부탁 전에 보는 카드입니다. 읽는 자료가 아니라 바로 복사해서 쓰는 카드로 만듭니다.',
        copyText: `AI를 쓰기 전에 볼 인쇄용 "AI 잘 시키는 12가지 습관 카드"를 만들어 주세요.

조건:
- A4 한 장에 들어가게 짧게
- 작은 가게 사장님이 이해할 쉬운 존댓말
- 각 습관마다 "확인 질문" 1개 포함
- 각 습관마다 바로 복사해서 쓸 수 있는 짧은 부탁문 1개 포함
- 파일 저장이 가능하면 ai-study/outputs/day-05-habit-card.md로 저장
- 파일 저장이 안 되면 제가 복사할 수 있게 마크다운으로 보여주기

카드 맨 위 제목은 "AI 잘 시키는 12가지 습관 카드"로 해 주세요.`,
        success: 'day-05-habit-card.md 파일이 생기거나, 복사해서 인쇄할 카드가 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '너무 길게 나오면 "A4 한 장에 들어가게 절반으로 줄여줘"라고 다시 말하세요.',
        },
      },
      {
        action: '첫 설명서 업데이트 후보를 받으세요.',
        detail: '이번 주에 배운 내용을 AGENTS.md에 바로 덮어쓰지 않습니다. 먼저 후보만 보고 내가 고릅니다.',
        copyText: `Day 1부터 Day 5까지의 대화 히스토리와 오늘 만든 습관 카드를 바탕으로, ai-study/AGENTS.md에 추가하면 좋은 문장 후보를 골라 주세요.

반드시 지킬 것:
- 읽기 전에 어떤 히스토리 또는 폴더를 볼지 저에게 말하기
- 히스토리 접근이 안 되면 ai-study/outputs와 지금 대화에서 확인 가능한 내용만 쓰기
- 제가 승인한 것만 반영하기
- 후보는 5개 이하
- 각 후보마다 왜 필요한지 한 줄로 설명
- 어려운 말 금지
- 아직 반영하지 말고 번호를 붙여서 먼저 보여주기`,
        success: '설명서에 넣을 후보가 5개 이하로 나오고, 승인 전에는 반영하지 않으면 성공입니다.',
        stuck: defaultStuck,
      },
      weeklyHistoryStep(1, 'Day 1-5'),
    ],
  },
  {
    day: 6, week: 2, theme: '시키기',
    title: '인보이스 만들기 — 계획 먼저',
    outcome: '견적서/인보이스 양식 + 실전 발행 1건',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '견적서를 영수증 겸용 버전으로 바꿔보세요.',
    tomorrow: '내일은 영수증 사진으로 장부를 만듭니다.',
    steps: [
      {
        action: '플랜 모드를 켜고, 먼저 계획만 받으세요.',
        detail: '오늘 습관은 "만들기 전 계획부터"입니다. 바로 만들지 말고, 견적서/인보이스에 들어갈 항목과 양식 순서를 먼저 정합니다.',
        copyText: `플랜 모드로 먼저 계획만 세워 주세요. 아직 파일이나 최종 양식은 만들지 마세요.

목표: 작은 가게에서 바로 쓸 견적서/인보이스 양식 만들기
필요한 항목: 발행일, 거래처, 품목, 수량, 단가, 공급가액, 세금, 합계, 입금 계좌, 메모
말투: 초보 사장님도 이해할 수 있게 쉽게
조건: 빠진 항목이 있으면 먼저 질문하고, 제가 승인하기 전에는 제작하지 마세요.`,
        success: 'AI가 항목 목록과 양식 순서를 계획으로만 보여주면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '플랜 모드 버튼을 못 찾으면 "계획만 먼저 말하고, 만들지는 마세요"라고 적어도 됩니다.',
        },
      },
      {
        action: '계획을 검토하고, 고친 뒤 승인하세요.',
        detail: '내 가게에 필요 없는 항목은 빼고, 꼭 필요한 항목은 더합니다. 승인 전에는 제작으로 넘어가지 않습니다.',
        copyText: `방금 계획을 검토해 주세요.

1. 작은 가게 인보이스에 꼭 필요한 항목이 빠졌는지 확인해 주세요.
2. 너무 어려운 말은 쉬운 말로 바꿔 주세요.
3. 제가 고를 수 있게 "그대로 진행"과 "수정 추천"을 나눠 보여 주세요.

제가 "승인합니다"라고 말하기 전에는 만들지 마세요.`,
        success: '수정할 점을 확인하고 "승인합니다"라고 말할 준비가 되면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '승인한 계획으로 양식을 만들고, 합계를 검산시키세요.',
        detail: '돈 계산은 반드시 한 번 더 확인합니다. 수량×단가, 세금, 합계가 맞는지 AI에게 따로 검산시킵니다.',
        copyText: `승인합니다. 이제 견적서/인보이스 양식을 만들어 주세요.

샘플 거래:
거래처: [거래처 이름]
품목: [예: 도시락 20개]
수량: [수량]
단가: [단가]
세금: [포함/별도/없음 중 선택]
입금 계좌: [은행명 계좌번호 예금주]

양식을 만든 뒤에는 반드시 아래 검산표를 붙여 주세요.
- 수량 × 단가
- 공급가액
- 세금
- 최종 합계
- 계산이 맞는지 한 줄 확인`,
        success: '인보이스 양식과 합계 검산표가 함께 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '세금 처리가 헷갈리면 "세금 없음"으로 먼저 연습해도 됩니다. 중요한 것은 합계를 검산하는 습관입니다.',
        },
      },
      {
        action: '실제 거래 1건으로 발행본을 만드세요.',
        detail: '연습용이 아니라 최근 거래나 곧 보낼 거래 1건을 넣습니다. 보내기 전 이름, 금액, 계좌를 다시 봅니다.',
        copyText: `아래 실제 거래 1건으로 발행할 인보이스를 만들어 주세요.

거래처:
발행일:
품목:
수량:
단가:
세금:
입금 계좌:
입금 기한:
메모:

마지막에 보내기 전 확인표를 붙여 주세요. 거래처 이름, 품목, 계좌, 합계가 맞는지 검산까지 확인해 주세요. 가능하면 ai-study/outputs/day-06-invoice.md 파일로 저장해 주세요. 파일 저장이 안 되면 제가 복사할 수 있는 글로 보여 주세요.`,
        success: '실제 거래 1건의 발행본이 나오고, 이름·계좌·합계 확인표가 붙으면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '실제 거래를 바로 쓰기 부담스러우면 이름만 가리고 진행하세요. 금액 검산은 꼭 합니다.',
        },
      },
      saveResultStep(6),
    ],
  },
  {
    day: 7, week: 2, theme: '시키기',
    title: '영수증 사진 → 지출 장부',
    outcome: '영수증 사진을 표로 정리하고, 원본과 대조해 이번 달 지출 장부를 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '25분',
    challenge: '가장 큰 지출 3건을 AI에게 찾아달라고 해보세요.',
    tomorrow: '내일은 매출 정리를 자동화합니다.',
    steps: [
      {
        action: '영수증 5장을 준비하세요.',
        detail: '날짜, 가게명, 금액이 보이게 사진을 찍습니다. 흐리거나 잘린 사진은 다시 찍습니다.',
        copyText: `영수증 사진 5장을 정리하려고 합니다.

먼저 사진을 받을 준비만 해 주세요.
제가 사진을 올리면 아래 기준으로만 읽어 주세요.

기준:
- 날짜, 가게명, 금액, 용도를 표로 정리
- 안 보이는 글자는 추측하지 말고 "확인 필요"라고 표시
- 숫자, 돈, 날짜는 원본에서 보이는 것만 쓰기
- 헷갈리는 부분은 저에게 먼저 질문하기`,
        success: '영수증 사진 5장을 올릴 준비가 되면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '사진이 잘 안 보이면 불을 켜고, 영수증 한 장씩 화면에 꽉 차게 다시 찍으세요.',
        },
      },
      {
        action: '사진에서 날짜·가게명·금액·용도를 표로 정리시키세요.',
        detail: 'AI가 장부 초안을 만듭니다. 용도는 내 가게 기준으로 물어보게 하고, 모르면 비워 둡니다.',
        copyText: `방금 올린 영수증 사진 5장을 표로 정리해 주세요.

표 칸:
- 번호
- 날짜
- 가게명
- 금액
- 용도
- 원본에서 확인한 근거
- 확인 필요 여부

반드시 지킬 것:
- 숫자, 돈, 날짜를 추측하지 마세요.
- 원본에서 안 보이면 "확인 필요"라고 쓰세요.
- 용도가 애매하면 제게 질문하세요.
- 금액은 쉼표를 넣어 보기 쉽게 쓰되, 원본과 같은 숫자인지 다시 확인하세요.`,
        success: '영수증 5장이 표로 정리되고, 확인 필요한 칸이 따로 보이면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '원본 대조로 틀린 곳을 찾으세요.',
        detail: '오늘의 핵심 습관입니다. AI 답을 믿고 끝내지 말고, 원본과 한 줄씩 대조하게 합니다.',
        copyText: `방금 만든 표를 영수증 원본과 다시 대조해 주세요.

대조할 것:
- 날짜가 원본과 같은지
- 가게명이 원본과 같은지
- 금액이 원본과 같은지
- 용도를 제가 확인해야 하는지

출력:
1. 틀렸거나 의심되는 곳 목록
2. 원본에서 확인한 근거
3. 제가 직접 확인해야 할 질문
4. 고친 표

틀린 곳이 없다고 말하기 전에, 각 영수증을 한 장씩 다시 봤다는 근거를 적어 주세요.`,
        success: '틀린 곳 또는 확인할 곳이 목록으로 나오고, 고친 표가 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: 'AI가 "맞습니다"만 말하면, "어느 영수증의 어느 글자를 보고 확인했는지 근거를 써 주세요"라고 다시 시키세요.',
        },
      },
      {
        action: '이번 달 지출 장부로 확장하세요.',
        detail: '영수증 5장을 시작점으로 삼아 월 장부 양식을 만듭니다. 추가 금액이나 날짜는 내가 알려준 것만 넣습니다.',
        copyText: `대조가 끝난 표를 바탕으로 이번 달 지출 장부를 만들어 주세요.

장부 조건:
- 제목: 이번 달 지출 장부
- 항목: 날짜, 가게명, 금액, 용도, 결제수단, 메모, 원본 확인 여부
- 합계는 원본 확인이 끝난 금액만 더하기
- 확인 필요 금액은 합계에 넣지 말고 따로 표시
- 제가 말하지 않은 날짜, 금액, 결제수단은 추측하지 않기
- 파일 저장이 가능하면 ai-study/outputs/day-07-expense-ledger.md로 저장
- 파일 저장이 안 되면 제가 복사할 수 있게 마크다운 표로 보여주기`,
        success: '이번 달 지출 장부가 생기고, 확인 끝난 합계와 확인 필요 항목이 따로 보이면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '합계가 이상하면 "확인 끝난 금액만 다시 더하고 계산 과정을 보여 주세요"라고 말하세요.',
        },
      },
      saveResultStep(7),
    ],
  },
  {
    day: 8, week: 2, theme: '시키기',
    title: '매출 정리 자동화',
    outcome: '매출 자료를 단계별로 정리해 시트와 차트 1장을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '차트를 월별에서 요일별로 바꿔보세요.',
    tomorrow: '내일은 크롬·드라이브·지메일을 연결합니다.',
    steps: [
      {
        action: '매출 자료를 한곳에 모으세요.',
        detail: '엑셀 파일, 카드 매출 내역, 손글씨 장부 사진 중 지금 있는 자료만 준비합니다. 날짜와 금액이 안 보이면 다시 확인합니다.',
        copyText: `매출 자료를 정리하려고 합니다.

먼저 자료를 받을 준비만 해 주세요.
제가 엑셀, 사진, 글 중 되는 방식으로 자료를 올리면 아래 기준으로 확인해 주세요.

기준:
- 날짜, 품목, 수량, 금액, 결제수단을 찾기
- 안 보이는 숫자와 날짜는 추측하지 않기
- 헷갈리는 금액은 "확인 필요"라고 표시
- 바로 차트를 만들지 말고, 먼저 정리 계획을 보여주기`,
        success: 'AI가 자료를 받기 전에 정리 계획과 확인 기준을 먼저 말하면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '자료가 여러 곳에 있으면 오늘은 1개 자료만 골라도 됩니다. 작게 시작하는 것이 목표입니다.',
        },
      },
      {
        action: '정리 표부터 만들고 확인하세요.',
        detail: '오늘 습관은 쪼개서 시키기입니다. 차트까지 한 번에 가지 말고, 먼저 깨끗한 표만 만듭니다.',
        copyText: `제가 올린 매출 자료를 먼저 정리 표로만 만들어 주세요.

표 칸:
- 날짜
- 품목 또는 서비스
- 수량
- 매출 금액
- 결제수단
- 원본 확인 여부
- 확인 필요 메모

반드시 지킬 것:
- 날짜, 수량, 금액은 원본에 있는 것만 쓰기
- 안 보이면 "확인 필요"라고 쓰기
- 합계나 차트는 아직 만들지 않기
- 표를 만든 뒤 제가 확인할 질문을 3개 이하로 묻기`,
        success: '정리 표가 나오고, 확인 질문이 3개 이하로 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '집계표와 합계를 따로 검산시키세요.',
        detail: '정리 표가 맞다는 것을 확인한 뒤에만 집계합니다. AI에게 계산 과정을 보이게 합니다.',
        copyText: `방금 정리 표를 바탕으로 집계표를 만들어 주세요.

집계할 것:
- 날짜별 매출 합계
- 결제수단별 매출 합계
- 품목별 매출 합계
- 전체 합계

반드시 지킬 것:
- 확인 필요 금액은 합계에 넣지 말고 따로 표시
- 계산 과정을 간단히 보여주기
- 전체 합계가 각 집계와 맞는지 검산하기
- 이상한 숫자가 있으면 먼저 질문하기`,
        success: '집계표와 계산 과정이 나오고, 확인 필요 금액이 합계에서 빠져 있으면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '합계가 이상하면 "원본 확인 끝난 금액만 다시 더해 주세요"라고 말하세요.',
        },
      },
      {
        action: '차트 1장과 반복용 지시문을 저장하세요.',
        detail: '마지막에 차트 1장만 뽑고, 다음 달에도 다시 쓸 수 있는 부탁문을 남깁니다.',
        copyText: `검산이 끝난 집계표로 차트 1장을 만들어 주세요.

조건:
- 차트는 이번 달 매출 흐름을 보기 쉬운 방식 1개만 추천
- 왜 그 차트가 좋은지 한 줄로 설명
- 차트에 들어간 숫자의 기준을 적기
- 다음 달에도 쓸 반복용 지시문을 만들어 주기
- 가능하면 ai-study/outputs/day-08-sales-summary.md로 저장
- 파일 저장이 안 되면 제가 복사할 수 있게 마크다운으로 보여주기`,
        success: '차트 1장과 다음에도 쓸 반복용 지시문이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(8),
    ],
  },
  {
    day: 9, week: 2, theme: '시키기',
    title: '도구 연결 — 크롬·드라이브·지메일 (MCP)',
    outcome: '커넥터를 연결해 우리 가게 리뷰 정리표와 답글 초안을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '자주 쓰는 도구 1개를 더 연결해보세요.',
    tomorrow: '내일은 재미의 날, 남이 만든 스킬을 씁니다.',
    steps: [
      {
        action: '커넥터 설정 화면을 찾으세요.',
        detail: '오늘은 AI에게 내 도구를 쥐여주는 날입니다. 먼저 연결 화면만 찾고, 로그인은 강사와 함께 확인합니다.',
        image: {
          src: '/assets/tutorials/connectors/screenshots/connector-settings.png',
          alt: '커넥터 또는 MCP 설정 화면에서 Chrome, Google Drive, Gmail 연결 항목을 확인하는 예시 화면',
        },
        copyText: `제가 쓰는 AI 앱에서 커넥터 또는 MCP 설정 화면을 찾고 싶습니다.

제 상황을 기준으로 천천히 안내해 주세요.
조건:
- 한 번에 한 단계씩
- 로그인이나 권한 허용 화면이 나오면 멈추고 저에게 확인받기
- 연결 전에는 어떤 자료에 접근하는지 쉬운 말로 설명하기
- 비밀번호, 인증번호, 토큰은 절대 대화에 쓰라고 하지 않기`,
        success: '커넥터 설정 화면을 찾고, 어떤 권한을 주는지 설명을 들으면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '화면 이름이 MCP가 아니라 커넥터, 연결, 도구로 보일 수 있습니다. 같은 뜻인지 확인하세요.',
        },
      },
      {
        action: '크롬·드라이브·지메일 중 필요한 도구를 연결하세요.',
        detail: '모두 연결하려다 막히지 않습니다. 오늘 리뷰 정리에 필요한 도구부터 연결합니다.',
        image: {
          src: '/assets/tutorials/connectors/screenshots/connector-permissions.png',
          alt: 'Google Drive 또는 Gmail 연결 권한 화면에서 허용 전에 접근 범위를 확인하는 예시 화면',
        },
        copyText: `리뷰 정리를 위해 필요한 도구 연결 순서를 정해 주세요.

후보:
- 크롬: 리뷰 페이지를 열어 확인
- 드라이브: 정리표 저장
- 지메일: 필요하면 답글 초안 공유

반드시 지킬 것:
- 로그인은 제가 직접 하기
- 권한 허용 전에 어떤 자료를 읽는지 설명하기
- 불필요한 권한은 요청하지 않기
- 연결이 안 되면 수동 복사 방식으로 대체하기`,
        success: '필요한 도구 1개 이상이 연결되거나, 수동 복사 대체 방법이 정해지면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '연결이 안 되면 실패가 아닙니다. 리뷰 글을 복사해서 붙여넣는 방식으로 진행하세요.',
        },
      },
      {
        action: '리뷰를 정리표로 만드세요.',
        detail: '실제 리뷰만 정리합니다. 별점, 작성자, 날짜, 리뷰 내용은 AI가 만들면 안 됩니다.',
        copyText: `연결된 도구 또는 제가 붙여넣은 리뷰를 바탕으로 리뷰 정리표를 만들어 주세요.

표 칸:
- 날짜
- 작성자 표시 이름
- 별점
- 리뷰 내용 요약
- 칭찬한 점
- 불편했던 점
- 답글 필요 여부
- 원본 확인 여부

반드시 지킬 것:
- 실제 리뷰에 없는 내용은 만들지 않기
- 작성자 개인정보를 자세히 쓰지 않기
- 별점이나 날짜가 안 보이면 "확인 필요"라고 쓰기
- 답글이 필요한 리뷰를 먼저 표시하기`,
        success: '리뷰 정리표가 나오고, 답글이 필요한 리뷰가 표시되면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '리뷰 답글 초안을 뽑고 저장하세요.',
        detail: '답글은 짧고 정중하게 씁니다. 과장, 변명, 개인정보 언급은 피합니다.',
        copyText: `리뷰 정리표에서 답글이 필요한 리뷰만 골라 답글 초안을 만들어 주세요.

조건:
- 쉬운 존댓말
- 과장 금지
- 개인정보 언급 금지
- 불만 리뷰에는 먼저 사과하고, 확인 가능한 조치만 말하기
- 좋은 리뷰에는 감사와 재방문 인사만 짧게
- 가능하면 ai-study/outputs/day-09-review-replies.md로 저장
- 파일 저장이 안 되면 복사할 수 있게 마크다운으로 보여주기`,
        success: '리뷰 답글 초안과 저장할 문서가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(9),
    ],
  },
  {
    day: 10, week: 2, theme: '시키기',
    title: '재미의 날 — k-skill 골라 쓰기',
    outcome: 'k-skill에서 스킬 하나를 설치해 실행하고, 스킬의 정체를 확인합니다.',
    status: 'ready', appTrack: 'unified', time: '25분',
    challenge: '설치한 스킬의 파일을 열어 한 줄만 내 취향대로 바꿔보세요.',
    tomorrow: '다음 주는 내 스킬을 직접 만듭니다.',
    steps: [
      {
        action: 'k-skill 목록을 구경하세요.',
        detail: '오늘은 재미의 날입니다. 완벽히 이해하려 하지 말고, 남이 만들어 둔 저장된 부탁문을 구경합니다.',
        copyText: `k-skill 목록을 같이 구경하고 싶습니다.

제가 고를 수 있게 아래 기준으로 5개만 추천해 주세요.
- 작은 가게 사장님이 써볼 만한 것
- 실행 결과가 눈에 보이는 것
- 설치가 너무 어렵지 않은 것
- 기차표 조회, 동네 실거래가, 맞춤법 같은 생활 예시 포함

각 스킬은 이름, 하는 일, 재미있는 이유만 짧게 설명해 주세요.`,
        success: '써보고 싶은 스킬 후보 1개를 고르면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '목록이 어렵게 보이면 "생활 예시만 5개로 줄여 주세요"라고 말하세요.',
        },
      },
      {
        action: '스킬 하나를 설치하거나 복사해 실행하세요.',
        detail: '설치가 되면 설치하고, 안 되면 스킬 파일 내용을 복사해 붙여넣어도 됩니다.',
        copyText: `제가 고른 스킬 1개를 실행해 보고 싶습니다.

진행 방식:
1. 설치할 수 있으면 설치 방법을 한 단계씩 안내
2. 설치가 막히면 스킬 파일 내용을 복사해서 실행하는 방법으로 대체
3. 실행 전에 이 스킬이 어떤 입력을 요구하는지 먼저 설명
4. 숫자, 날짜, 지역, 계정 정보가 필요하면 추측하지 말고 저에게 질문`,
        success: '스킬이 설치되거나, 복사 실행 방식으로 첫 결과가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '스킬 파일을 열어 정체를 확인하세요.',
        detail: '스킬은 어려운 마법이 아니라 저장된 부탁문입니다. 파일 안에서 반복 지시가 어떻게 적혀 있는지 봅니다.',
        copyText: `방금 쓴 스킬 파일을 쉬운 말로 설명해 주세요.

확인할 것:
- 이 스킬이 맡는 일
- 사용자에게 먼저 물어보는 것
- 결과를 어떤 형식으로 내는지
- 내가 바꿀 수 있는 한 줄

마지막에 "스킬 = 저장된 부탁문"이라는 말이 왜 맞는지 한 문장으로 설명해 주세요.`,
        success: '스킬 파일에서 내가 바꿀 수 있는 한 줄을 찾으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '내 일에 맞게 한 줄만 바꿔보세요.',
        detail: '처음부터 새 스킬을 만들지 않습니다. 오늘은 남의 스킬을 열어보고 작은 부분 하나만 바꿉니다.',
        copyText: `방금 스킬에서 제 가게 일에 맞게 바꿀 수 있는 문장 3개를 후보로 보여 주세요.

조건:
- 실제로 한 줄만 바꾸기
- 너무 큰 기능 추가 금지
- 바꾸기 전 문장과 바꾼 뒤 문장을 나란히 보여주기
- 제가 승인하기 전에는 파일에 반영하지 않기`,
        success: '바꿀 후보 1개를 고르고, 승인 전에는 반영하지 않으면 성공입니다.',
        stuck: defaultStuck,
      },
      weeklyHistoryStep(2, 'Day 6-10'),
    ],
  },
  {
    day: 11, week: 3, theme: '굴리기',
    title: '내 스킬 만들기',
    outcome: 'Day 6에서 만든 인보이스 흐름을 /인보이스 스킬로 저장해 새 대화에서 불러 씁니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '매주 반복하는 부탁 하나를 더 찾아 이름을 붙이세요.',
    tomorrow: '내일은 아침 브리핑을 자동화합니다.',
    steps: [
      {
        action: 'k-skill 예시를 떠올리세요.',
        detail: 'Day 10에서 본 k-skill처럼 스킬은 반복 부탁을 문서로 저장해 둔 것입니다.',
        copyText: '제가 Day 10에서 본 k-skill 예시를 기준으로, 반복 부탁을 스킬 파일로 저장한다는 말이 무슨 뜻인지 쉬운 말로 설명해 주세요.',
        success: '"스킬 = 저장해 둔 부탁문"이라고 내 말로 설명할 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: 'Day 6 인보이스 흐름을 /인보이스 스킬로 저장하세요.',
        detail: 'Day 6에서 만든 인보이스 양식과 검산 규칙을 반복해서 쓰는 스킬로 바꿉니다. Day 6 결과 파일이 없으면 먼저 샘플 양식으로 시작해도 됩니다.',
        copyText: 'ai-study/outputs/day-06-invoice.md를 바탕으로 "/인보이스"라는 스킬을 만들어 주세요.\n\n다음부터 제가 /인보이스라고 하면 아래 순서로 진행하게 해 주세요.\n1. 거래처 이름, 품목, 수량, 단가, 세금, 입금 계좌를 물어보기\n2. 빠진 정보는 추측하지 않고 다시 질문하기\n3. 간단한 인보이스 초안 만들기\n4. 수량×단가, 세금, 최종 합계를 검산표로 확인하기\n5. 보내기 전 확인표를 붙이기\n\nDay 6 파일을 읽을 수 없으면 아래 샘플 양식으로 먼저 만들어 주세요.\n거래처:\n품목:\n수량:\n금액:\n입금 계좌:\n메모:',
        success: 'AI가 /인보이스로 부를 수 있다고 확인하면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '새 대화에서 /인보이스를 불러보세요.',
        detail: '새 대화를 열고 /인보이스만 입력합니다. 저장이 잘 됐다면 질문이 먼저 옵니다.',
        copyText: '/인보이스',
        success: 'AI가 거래처 이름과 금액을 물어보면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '새 대화에서 기억을 못 하면, 스킬 문서를 복사해 두었다가 붙여넣고 다시 저장을 부탁하세요.',
        },
      },
      saveResultStep(11),
    ],
  },
  {
    day: 12, week: 3, theme: '굴리기',
    title: '아침 브리핑 자동화',
    outcome: '매일 아침 폰으로 도착하는 업종 브리핑을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '브리핑 끝에 "오늘 할 일 1개"를 붙여보세요.',
    tomorrow: '내일은 재고 시트를 만듭니다.',
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
        copyText: '매일 아침 8시에 아래 주제로 짧은 브리핑을 보내주세요.\n주제: [내 주제]\n형식: 핵심 3줄, 오늘 할 일 1개, 참고 링크 2개\n말투: 바로 이해할 수 있게 쉽게',
        success: '테스트 브리핑이 한 번 도착하면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(12),
    ],
  },
  {
    day: 13, week: 3, theme: '굴리기',
    title: '스프레드시트 재고 관리',
    outcome: '품목 5개로 작게 시험한 뒤 전체로 키운 재고 시트를 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '재고가 3개 이하면 눈에 띄게 표시해달라고 해보세요.',
    tomorrow: '내일은 카드뉴스를 만듭니다.',
    steps: [
      {
        action: '재고 시트 구조를 먼저 계획하세요.',
        detail: '처음부터 전체 재고를 넣지 않습니다. 어떤 칸이 필요한지 먼저 정하고, 품목 5개로 시험합니다.',
        copyText: `가게 재고 시트를 만들기 전에 계획부터 세워 주세요.

목표: 품목 5개로 먼저 시험하는 재고 시트 만들기
필요한 칸 후보:
- 품목명
- 현재 재고
- 최소 필요 재고
- 입고 수량
- 판매 수량
- 남은 재고
- 재주문 필요 여부
- 메모

반드시 지킬 것:
- 제 실제 재고 수량을 추측하지 않기
- 계산식이 필요한 칸을 따로 표시하기
- 제가 승인하기 전에는 전체 시트를 만들지 않기`,
        success: '재고 시트 구조와 계산식이 필요한 칸이 먼저 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '품목 5개만 넣어 작게 만드세요.',
        detail: '오늘 습관은 작게 시험하고 키우기입니다. 전체 품목이 아니라 5개만 넣고 계산이 맞는지 봅니다.',
        copyText: `승인합니다. 아래 품목 5개만 넣을 수 있는 작은 재고 시트를 만들어 주세요.

품목 5개:
1. [품목명]
2. [품목명]
3. [품목명]
4. [품목명]
5. [품목명]

각 품목마다 현재 재고, 최소 필요 재고, 입고 수량, 판매 수량은 제가 알려준 숫자만 쓰세요.
모르는 숫자는 빈칸 또는 "확인 필요"로 두세요.
남은 재고와 재주문 필요 여부 계산식을 같이 보여 주세요.`,
        success: '품목 5개짜리 작은 재고 시트와 계산식이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '계산이 맞는지 시험하세요.',
        detail: 'AI가 만든 시트를 믿고 끝내지 않습니다. 숫자 하나를 바꿔 계산이 따라 바뀌는지 확인합니다.',
        copyText: `품목 5개 재고 시트를 시험해 주세요.

시험할 것:
- 현재 재고 + 입고 수량 - 판매 수량 = 남은 재고
- 남은 재고가 최소 필요 재고보다 적으면 재주문 필요
- 숫자 하나를 바꿨을 때 결과가 어떻게 바뀌는지 예시로 설명

틀린 계산이 있으면 고친 표를 다시 보여 주세요.`,
        success: '계산 시험 결과와 고친 표가 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '계산이 헷갈리면 "품목 1개만 예로 들어 다시 계산해 주세요"라고 말하세요.',
        },
      },
      {
        action: '전체 품목으로 확장할 입력 규칙을 정하세요.',
        detail: '시험이 통과한 뒤에만 전체로 키웁니다. 입력 규칙을 정해두면 다음에 덜 헷갈립니다.',
        copyText: `품목 5개 시험이 통과했습니다. 이제 전체 재고로 확장할 때 쓸 입력 규칙을 만들어 주세요.

규칙 조건:
- 제가 직접 입력해야 하는 칸
- 자동 계산되는 칸
- 비워두면 안 되는 칸
- 숫자가 이상할 때 확인할 질문
- 가능하면 ai-study/outputs/day-13-inventory-sheet.md로 저장
- 파일 저장이 안 되면 복사할 수 있게 마크다운으로 보여주기`,
        success: '입력 규칙과 저장할 재고 시트 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(13),
    ],
  },
  {
    day: 14, week: 3, theme: '굴리기',
    title: '카드뉴스 만들기',
    outcome: '피드백을 반복해 인스타용 카드뉴스 1세트를 만들고, 꼬이면 새 대화로 리셋합니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '표지 문장을 3가지 버전으로 뽑아보세요.',
    tomorrow: '내일은 내 가게 웹페이지를 계획합니다.',
    steps: [
      {
        action: '참고 카드뉴스 스타일을 고르세요.',
        detail: 'AI가 후보를 제안하고, 사람은 고릅니다. 내 가게와 맞는 분위기를 먼저 정합니다.',
        copyText: `인스타나 블로그에 올릴 카드뉴스를 만들고 싶습니다.

먼저 참고 스타일 후보를 5개만 제안해 주세요.
조건:
- 처음 보는 사람도 읽기 쉬운 스타일
- 글자가 너무 작지 않은 스타일
- 과한 디자인보다 읽기 쉬운 스타일
- 제가 고를 수 있게 장점과 어울리는 업종을 한 줄씩 설명

아직 카드뉴스 본문은 만들지 마세요.`,
        success: '참고 스타일 후보 중 하나를 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '카드뉴스 초안 1세트를 만드세요.',
        detail: '브랜드명, 가격, 행사 기간은 지어내지 않게 합니다. 모르면 질문하게 합니다.',
        copyText: `제가 고른 스타일로 카드뉴스 초안 1세트를 만들어 주세요.

주제: [주제]
대상 손님: [손님]
올릴 곳: [인스타그램/블로그/카카오채널 등]

조건:
- 카드 5장 안팎
- 각 카드마다 제목과 본문
- 어려운 말 금지
- 가격, 날짜, 행사 기간은 제가 말한 것만 쓰기
- 모르는 내용은 질문하기
- 마지막 카드에는 손님이 할 행동 1개만 넣기`,
        success: '카드별 제목과 본문 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '피드백을 주고 2번 수정하세요.',
        detail: '한 번에 완성하려 하지 않습니다. 좋은 점과 고칠 점을 나눠 말하고 수정합니다.',
        copyText: `방금 카드뉴스 초안을 수정하고 싶습니다.

먼저 아래 기준으로 스스로 점검해 주세요.
- 글자가 너무 많지 않은지
- 첫 카드가 눈에 들어오는지
- 손님이 이해하기 쉬운지
- 과장된 표현이 없는지
- 마지막 행동이 분명한지

그다음 수정안 1차를 보여 주세요. 제가 피드백하면 2차 수정까지 이어가 주세요.`,
        success: '수정안 1차와 2차가 나오고, 더 읽기 쉬워지면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '대화가 꼬이면 새 대화로 리셋하세요.',
        detail: '수정이 길어져 이상해지면 실패가 아닙니다. 핵심만 새 대화에 옮겨 다시 시작합니다.',
        copyText: `지금까지 정한 카드뉴스 내용을 새 대화에 옮길 수 있게 정리해 주세요.

정리할 것:
- 주제
- 대상 손님
- 고른 스타일
- 꼭 들어갈 내용
- 빼야 할 표현
- 마지막 행동
- 현재 최종 카드뉴스 초안

가능하면 ai-study/outputs/day-14-card-news.md로 저장해 주세요. 파일 저장이 안 되면 복사할 수 있게 보여 주세요.`,
        success: '새 대화에 붙여넣을 정리본과 카드뉴스 최종 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '이미지 특화 도구는 이름만 알아두세요.',
        detail: 'Higgsfield, Canva AI 같은 도구도 있지만 오늘은 소개만 합니다. 핵심은 좋은 원고와 수정 흐름입니다.',
        copyText: 'Higgsfield, Canva AI 같은 이미지 특화 도구가 무엇인지 처음 보는 사람도 이해할 수 있게 한 줄씩만 설명해 주세요. 오늘 바로 가입하거나 결제하지는 않습니다.',
        success: '이미지 도구가 따로 있다는 것만 이해하면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(14),
    ],
  },
  {
    day: 15, week: 3, theme: '굴리기',
    title: '내 가게 웹페이지 (상) — 계획 먼저',
    outcome: 'AI 인터뷰와 플랜 모드로 계획서를 확정하고 첫 화면을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '첫 화면 문장을 손님 말투로 바꿔보세요.',
    tomorrow: '내일은 웹페이지를 세상에 공개합니다.',
    steps: [
      {
        action: 'AI에게 내 가게 웹페이지 인터뷰를 시키세요.',
        detail: '모호하면 AI가 나를 인터뷰하게 합니다. 질문은 한 번에 2개씩만 받습니다.',
        copyText: `내 가게 웹페이지를 만들기 전에 저를 인터뷰해 주세요.

조건:
- 질문은 한 번에 2개씩만
- 업종, 주 손님, 위치, 대표 상품, 연락 방법을 확인
- 주소, 운영시간, 가격, 전화번호는 제가 말한 것만 쓰기
- 모르면 절대 지어내지 말고 "확인 필요"로 표시
- 마지막에 웹페이지에 꼭 들어갈 정보 목록을 보여주기`,
        success: 'AI가 질문을 시작하고, 웹페이지에 들어갈 정보 목록이 모이면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '플랜 모드로 페이지 계획서를 확정하세요.',
        detail: '바로 만들지 말고 첫 화면, 소개, 상품, 위치, 문의 순서를 먼저 정합니다.',
        copyText: `방금 인터뷰한 내용을 바탕으로 웹페이지 계획서를 만들어 주세요.

계획서에 넣을 것:
- 첫 화면 문장
- 가게 소개
- 대표 상품 또는 서비스
- 위치와 운영시간
- 문의 방법
- 손님이 눌러야 할 버튼 1개

아직 웹페이지를 만들지 말고 계획만 보여 주세요. 제가 승인하기 전에는 제작하지 마세요.`,
        success: '페이지 계획서가 나오고, 내가 승인할 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '첫 화면만 제작하세요.',
        detail: '오늘 결과물은 전체 웹페이지가 아니라 계획서와 첫 화면입니다. 작은 완성으로 끝냅니다.',
        copyText: `승인합니다. 계획서대로 웹페이지 첫 화면만 만들어 주세요.

첫 화면 조건:
- 가게 이름
- 손님이 바로 이해할 한 문장
- 대표 상품 또는 서비스 3개 이하
- 문의 버튼 문구 1개
- 주소, 운영시간, 가격은 제가 말한 것만 사용
- 모르는 정보는 "확인 필요"로 남기기
- 가능하면 ai-study/outputs/day-15-homepage-plan.md로 저장`,
        success: '페이지 계획서와 첫 화면 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      weeklyHistoryStep(3, 'Day 11-15'),
    ],
  },
  {
    day: 16, week: 4, theme: '홀로서기',
    title: '웹페이지 (하) — GitHub·Vercel로 공개',
    outcome: '남에게 보낼 수 있는 링크를 만들고 내 폰으로 확인합니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '링크를 지인 1명에게 보내 첫인상 한 줄을 받아보세요.',
    tomorrow: '내일은 블로그 글 공장을 만듭니다.',
    steps: [
      {
        action: '나머지 화면을 완성하고 눈으로 비교하세요.',
        detail: '어제 만든 첫 화면을 기준으로 나머지 내용을 채웁니다. 화면은 직접 열어 눈으로 확인합니다.',
        copyText: `어제 만든 웹페이지 첫 화면과 계획서를 바탕으로 나머지 화면을 완성해 주세요.

반드시 지킬 것:
- 주소, 운영시간, 가격, 전화번호는 제가 말한 것만 쓰기
- 모르는 정보는 "확인 필요"로 남기기
- 완성 후 어떤 화면을 눈으로 확인해야 하는지 체크리스트 만들기
- 스크린샷이나 화면 설명과 비교해 어색한 부분을 찾기`,
        success: '나머지 화면 초안과 눈으로 확인할 체크리스트가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: 'GitHub 저장소를 만들 준비를 하세요.',
        detail: '계정, 비밀번호, 인증번호는 AI에게 쓰지 않습니다. 저장소 이름과 공개 여부만 확인합니다.',
        image: {
          src: '/assets/tutorials/github-vercel/screenshots/github-new-repository-docs.png',
          alt: 'GitHub 새 저장소 만들기 공식 도움말 화면',
        },
        copyText: `웹페이지를 GitHub에 올릴 준비를 도와주세요.

조건:
- 계정, 비밀번호, 인증번호는 제가 직접 입력
- 저장소 이름 후보 3개 제안
- 공개/비공개 차이를 쉬운 말로 설명
- 저장소를 만들기 전 제가 확인할 것 목록 만들기
- 버튼을 누르기 전에는 멈춰서 저에게 확인받기`,
        success: '저장소 이름과 공개 여부를 정하면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: 'Vercel에 연결하고 배포 링크를 확인하세요.',
        detail: '배포 URL은 AI가 만들면 안 됩니다. 실제 화면에 나온 링크만 기록합니다.',
        image: {
          src: '/assets/tutorials/github-vercel/screenshots/vercel-git-docs.png',
          alt: 'Vercel에서 GitHub 저장소를 연결해 배포하는 공식 도움말 화면',
        },
        copyText: `GitHub 저장소를 Vercel에 연결해 배포하려고 합니다.

반드시 지킬 것:
- 로그인은 제가 직접 하기
- 권한 허용 전에 어떤 권한인지 설명
- 배포 링크는 실제 화면에 나온 URL만 쓰기
- 링크가 안 보이면 "확인 필요"라고 말하기
- 에러가 나오면 에러 문구를 그대로 보고 원인을 추측하지 말기`,
        success: '실제 Vercel 배포 링크가 나오면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '배포가 실패하면 에러 문구를 복사해 AI에게 그대로 보여 주세요. 링크를 지어내면 안 됩니다.',
        },
      },
      {
        action: '내 폰으로 열어 최종 확인하세요.',
        detail: '컴퓨터에서만 보면 놓치는 것이 있습니다. 폰에서 링크를 열고 글자, 버튼, 연락 정보를 확인합니다.',
        image: {
          src: '/assets/tutorials/github-vercel/screenshots/vercel-deployments-docs.png',
          alt: 'Vercel 배포 목록에서 실제 배포 링크를 확인하는 공식 도움말 화면',
        },
        copyText: `배포된 웹페이지를 제 폰으로 확인할 체크리스트를 만들어 주세요.

확인할 것:
- 링크가 실제로 열리는지
- 첫 화면 문장이 잘 보이는지
- 전화번호, 주소, 운영시간이 맞는지
- 버튼이 눌리는지
- 글자가 너무 작지 않은지
- 가능하면 ai-study/outputs/day-16-published-link.md로 배포 링크와 확인 결과 저장`,
        success: '폰에서 링크가 열리고, 확인 결과가 저장되면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(16),
    ],
  },
  {
    day: 17, week: 4, theme: '홀로서기',
    title: '블로그 글 공장',
    outcome: '주제만 넣으면 초안이 나오는 글쓰기 파이프라인을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '후기 글 주제 하나를 넣어 초안을 만들어보세요.',
    tomorrow: '내일은 텔레그램 봇을 연결합니다.',
    steps: [
      {
        action: '글감 10개를 뽑으세요.',
        detail: '내 가게 설명서와 지금까지 만든 결과물을 바탕으로 손님에게 도움 되는 글감을 찾습니다.',
        copyText: `ai-study/AGENTS.md와 지금까지 만든 수업 결과물을 바탕으로 블로그 글감 10개를 추천해 주세요.

조건:
- 우리 가게 손님이 궁금해할 주제
- 너무 광고처럼 보이지 않는 주제
- 제가 실제로 아는 내용으로 쓸 수 있는 주제
- 의료, 법률, 효능, 가격처럼 민감한 내용은 확인 질문 표시
- 각 글감마다 제목 후보와 왜 좋은지 한 줄 설명`,
        success: '블로그 글감 10개와 제목 후보가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '글쓰기 스킬 초안을 만드세요.',
        detail: '반복해서 쓸 수 있도록 글쓰기 부탁을 스킬 형태로 저장합니다. 설명서 말투를 반영하게 합니다.',
        copyText: `반복해서 쓸 "블로그 글쓰기 스킬" 초안을 만들어 주세요.

스킬 조건:
- 주제 1개를 받으면 블로그 초안을 만든다
- ai-study/AGENTS.md의 말투와 가게 정보를 먼저 반영한다
- 모르는 사실, 가격, 운영시간, 효능은 추측하지 않고 질문한다
- 초안 마지막에 확인해야 할 사실 목록을 붙인다
- 제목 3개, 본문, 손님 행동 1개를 포함한다`,
        success: '반복해서 쓸 글쓰기 스킬 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '주제 1개로 초안을 뽑으세요.',
        detail: '글쓰기 스킬이 실제로 작동하는지 주제 하나로 시험합니다. 사실 확인 목록을 꼭 봅니다.',
        copyText: `방금 만든 글쓰기 스킬로 아래 주제의 블로그 초안을 만들어 주세요.

주제: [글감 10개 중 하나]

반드시 지킬 것:
- 확인되지 않은 사실은 단정하지 않기
- 가격, 날짜, 운영시간은 제가 준 것만 쓰기
- 손님이 바로 이해할 쉬운 존댓말
- 마지막에 "사장님이 확인할 것" 목록 붙이기`,
        success: '블로그 초안과 사장님이 확인할 것 목록이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '글쓰기 흐름을 그림처럼 정리하세요.',
        detail: '어떤 자료를 넣으면 어떤 결과가 나오는지 흐름을 남깁니다. 다음에 다시 쓰기 위한 지도입니다.',
        copyText: `오늘 만든 블로그 글 공장 흐름을 그림처럼 정리해 주세요.

형식:
AGENTS.md와 가게 자료
-> 글감 10개
-> 주제 1개 선택
-> 글쓰기 스킬 실행
-> 초안
-> 사실 확인
-> 게시

가능하면 ai-study/outputs/day-17-blog-pipeline.md로 저장해 주세요. 파일 저장이 안 되면 복사할 수 있게 마크다운으로 보여 주세요.`,
        success: '블로그 글 공장 흐름과 저장할 문서가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(17),
    ],
  },
  {
    day: 18, week: 4, theme: '홀로서기',
    title: '텔레그램 봇 연결',
    outcome: '폰으로 "오늘 마감 리포트"를 보내주는 봇을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '리포트에 내일 날씨 한 줄을 붙여보세요.',
    tomorrow: '내일은 나만의 비서 에이전트를 조립합니다.',
    steps: [
      {
        action: 'BotFather에서 봇 만들 준비를 하세요.',
        detail: '토큰은 비밀번호처럼 다룹니다. AI에게 그대로 붙여넣지 않습니다.',
        image: {
          src: '/assets/tutorials/telegram/screenshots/botfather-setup.png',
          alt: 'Telegram BotFather에서 새 봇을 만들고 토큰을 비공개로 보관하는 예시 화면',
        },
        copyText: `텔레그램 BotFather로 봇을 만들 준비를 도와주세요.

반드시 지킬 것:
- 한 번에 한 단계씩 안내
- 토큰은 절대 대화나 파일에 그대로 쓰지 않기
- 계정 정보와 인증번호는 제가 직접 입력
- 봇 이름과 사용자 이름 후보만 제안
- 토큰 화면이 나오면 "복사해서 안전한 곳에 보관하세요"까지만 말하기`,
        success: '봇 이름과 사용자 이름을 정하고, 토큰을 안전하게 다루는 규칙을 알면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '마감 리포트 형식을 정하세요.',
        detail: '폰으로 받을 내용이 길면 안 봅니다. 매일 저녁 확인할 핵심만 정합니다.',
        copyText: `매일 저녁 받을 "오늘 마감 리포트" 형식을 만들어 주세요.

포함할 것:
- 오늘 매출
- 지출
- 재고 확인 필요
- 내일 할 일 1개
- 특이사항

조건:
- 금액과 숫자는 제가 준 것만 쓰기
- 모르면 "확인 필요"로 표시
- 폰에서 보기 좋게 짧게
- 마지막에 내일 아침 확인할 것 1개만 붙이기`,
        success: '폰으로 받을 짧은 마감 리포트 형식이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '테스트 메시지를 폰으로 보내세요.',
        detail: '연결은 말로만 끝내지 않습니다. 내 폰에 실제 메시지가 도착해야 합니다.',
        image: {
          src: '/assets/tutorials/telegram/screenshots/telegram-test-message.png',
          alt: '텔레그램 봇 테스트 메시지가 폰에 도착한 것을 확인하는 예시 화면',
        },
        copyText: `텔레그램 봇 연결을 테스트하려고 합니다.

진행 조건:
- 토큰은 제가 직접 안전하게 입력
- 토큰을 대화에 노출하지 않기
- 테스트 메시지 내용은 "오늘 마감 리포트 테스트"로 하기
- 메시지가 폰에 도착했는지 제가 확인할 때까지 기다리기
- 실패하면 에러 문구를 그대로 보고 원인 후보를 3개 이하로 정리`,
        success: '내 폰 텔레그램에 테스트 메시지가 도착하면 성공입니다.',
        stuck: {
          ...defaultStuck,
          different: '메시지가 안 오면 토큰을 다시 붙여넣지 말고, 에러 문구와 봇 사용자 이름부터 확인하세요.',
        },
      },
      {
        action: '매일 저녁 예약을 걸고 저장하세요.',
        detail: '자동화는 작게 시작합니다. 먼저 하루 1번 짧은 리포트만 예약합니다.',
        copyText: `매일 저녁 [시간]에 텔레그램으로 오늘 마감 리포트를 보내도록 예약 흐름을 만들어 주세요.

반드시 지킬 것:
- 제가 정한 시간만 사용
- 토큰은 저장 위치만 설명하고 본문에 쓰지 않기
- 테스트가 성공한 뒤에만 예약하기
- 예약 내용을 ai-study/outputs/day-18-telegram-report.md에 저장
- 파일 저장이 안 되면 복사할 수 있게 마크다운으로 보여주기`,
        success: '예약 내용이 정리되고, 테스트 성공 뒤 예약까지 끝나면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(18),
    ],
  },
  {
    day: 19, week: 4, theme: '홀로서기',
    title: '나만의 비서 에이전트',
    outcome: '설명서·스킬·연결·예약을 조립해 내 가게 전담 비서를 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '비서에게 맡길 일을 다음 달에 1개 더 늘려보세요.',
    tomorrow: '내일은 수료입니다.',
    steps: [
      {
        action: '비서에게 맡길 일을 고르세요.',
        detail: '전담 비서라고 해서 모든 일을 맡기지 않습니다. 지금까지 만든 것 중 반복할 일만 고릅니다.',
        copyText: `지금까지 만든 결과물을 바탕으로 내 가게 전담 비서에게 맡길 일을 정리해 주세요.

후보:
- 매출 정리
- 지출 장부
- 재고 확인
- 리뷰 답글 초안
- 블로그 초안
- 오늘 마감 리포트

각 후보마다 "맡겨도 되는 일"과 "사장님이 직접 확인해야 하는 일"을 나눠 주세요.`,
        success: '비서에게 맡길 일과 내가 직접 확인할 일이 나뉘면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: 'AI에게 인터뷰 받아 비서 사양서를 만드세요.',
        detail: '모호하면 AI가 나를 인터뷰하게 합니다. 질문은 2개씩만 받습니다.',
        copyText: `내 가게 전담 비서 사양서를 만들고 싶습니다.

저를 인터뷰해 주세요.
조건:
- 질문은 한 번에 2개씩만
- 비서가 할 일
- 비서가 하면 안 되는 일
- 꼭 확인해야 하는 숫자와 돈
- 어떤 결과물을 어디에 저장할지
- 모르면 추측하지 말고 질문하기

인터뷰가 끝나면 ai-study/outputs/day-19-assistant-spec.md 초안을 만들어 주세요.`,
        success: '비서 사양서 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '설명서·스킬·연결·예약을 조립하세요.',
        detail: 'Day 4 설명서, Day 10-11 스킬, Day 9 연결, Day 18 예약을 하나의 흐름으로 묶습니다.',
        copyText: `내 가게 전담 비서를 아래 재료로 조립하는 계획을 만들어 주세요.

재료:
- ai-study/AGENTS.md
- 지금까지 만든 스킬
- 연결된 도구
- 예약된 마감 리포트
- ai-study/outputs의 결과물
- 앱 대화 히스토리에서 확인한 반복 패턴

출력:
1. 비서가 먼저 읽을 것
2. 비서가 실행할 순서
3. 사장님에게 확인 질문할 때
4. 저장할 파일 위치
5. 위험해서 자동으로 하면 안 되는 일`,
        success: '비서 실행 순서와 자동으로 하면 안 되는 일이 정리되면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '실제 부탁 1개로 시운전하세요.',
        detail: '비서는 말로만 완성되지 않습니다. 실제 부탁 하나를 처리하고, 결과와 증거를 확인합니다.',
        copyText: `내 가게 전담 비서를 시운전해 주세요.

실제 부탁:
[예: 이번 주 매출과 지출을 보고 내일 할 일 1개를 정리해 주세요]

반드시 지킬 것:
- 사용한 자료를 먼저 말하기
- 숫자와 돈은 출처를 보여주기
- 모르는 것은 질문하기
- 결과를 짧게 정리하기
- 마지막에 "사장님이 직접 확인할 것"을 붙이기`,
        success: '실제 부탁 1개가 처리되고, 사용한 자료와 확인할 것이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      saveResultStep(19),
    ],
  },
  {
    day: 20, week: 4, theme: '홀로서기',
    title: '도구함 + 커뮤니티 + 수료',
    outcome: '지금까지의 결과물 목록, 30일 계획, 커뮤니티 질문 1개, 수료증 초안을 만듭니다.',
    status: 'ready', appTrack: 'unified', time: '30분',
    challenge: '다음 30일 동안 매주 반복할 일 1개를 정하세요.',
    tomorrow: '수료했습니다. 이제 내 일에 계속 붙여 씁니다.',
    steps: [
      {
        action: '지금까지 만든 것을 목록으로 정리하세요.',
        detail: '이 phase에서는 준비된 일차만 먼저 기록합니다. 전체 20일 완주 뒤 같은 흐름을 다시 씁니다.',
        copyText: 'ai-study/outputs와 앱 대화 히스토리에서 확인 가능한 내용을 바탕으로, 지금까지 제가 만든 결과물을 표로 정리해 주세요. 결과물 이름, 만든 날, 앞으로 쓸 곳 세 칸으로요. 확실하지 않은 것은 "확인 필요"라고 표시해 주세요.',
        success: '내 결과물 표가 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '다음 30일 계획을 만드세요.',
        detail: '거창할 필요 없습니다. 매주 반복할 일 1개면 충분합니다.',
        copyText: '위 결과물 중에서 제 가게에 제일 도움이 된 것을 골라, 다음 30일 동안 매주 반복할 일 1개와 새로 시도할 일 1개를 계획으로 짜 주세요.',
        success: '매주 반복할 일 1개가 정해지면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '한국 AI 커뮤니티 하나를 고르세요.',
        detail: '강사가 안내한 곳 또는 GPTers처럼 초보 질문을 받는 곳을 고릅니다.',
        copyText: 'AI 초보 소상공인이 질문하기 좋은 한국 커뮤니티를 3곳 추천해 주세요. 너무 개발자 위주인 곳은 빼주세요.',
        success: '가입할 커뮤니티 1곳을 고르면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '질문 초안을 만들어 올리세요.',
        detail: '무엇을 하려는지, 어디서 막혔는지, 어떤 답이 필요한지 씁니다.',
        copyText: '아래 내용을 커뮤니티에 올릴 질문으로 고쳐 주세요.\n상황: [내 상황]\n해본 것: [해본 것]\n막힌 곳: [막힌 곳]\n원하는 답: [원하는 답]',
        success: '복사해서 올릴 수 있는 질문이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '수료증을 만드세요.',
        detail: '최종 수료 때 쓸 초안입니다. 지금은 임시본으로 만들고, 20일 전체 완주 뒤 최종본으로 고칩니다.',
        copyText: '제가 AI 야학 20일 과정 수료증 초안을 만들고 싶습니다. 제 이름과 오늘 날짜를 넣고, 결과물 개수는 지금 ai-study 폴더에서 확인한 개수로 임시 표시해 주세요. 전체 20일을 끝낸 뒤 최종본으로 다시 만들 예정이라고 작게 적어 주세요.',
        success: '인쇄하거나 나중에 최종본으로 고칠 수 있는 수료증 초안이 나오면 성공입니다.',
        stuck: defaultStuck,
      },
      weeklyHistoryStep(4, 'Day 16-20'),
    ],
  },
];

export const courseDays: CourseDay[] = [
  ...week1Days,
  ...legacyCourseDays.filter((day) => day.day >= 6 && day.day <= 15),
  ...week4Days,
];

export function getDay(day: number) {
  return courseDays.find((item) => item.day === day);
}

export function dayPath(day: number) {
  return `/tutorials/day-${String(day).padStart(2, '0')}/`;
}

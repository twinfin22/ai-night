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
  download?: { href: string; label: string; fileName?: string };
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

const wrapUpStep = (day: number): TutorialStep => ({
  action: '/wrap-up으로 오늘을 기록하세요.',
  detail: '설치한 /wrap-up 스킬로 오늘 만든 것과 잘 통한 부탁 방식을 수업일지로 남깁니다. 파일 저장이 안 되면 복사해서 직접 저장합니다.',
  copyText: `오늘은 Day ${day}입니다. /wrap-up\n\n아래 형식으로 정리해 주세요. 파일을 만들 수 있으면 ai-study/journal/day-${String(day).padStart(2, '0')}.md로 저장하고, 파일을 만들 수 없으면 제가 복사할 수 있게 마크다운만 보여주세요.\n\n# Day ${day} 수업일지\n\n## 오늘 만든 것\n-\n\n## 잘 통한 부탁 방식\n-\n\n## 안 통한 부탁 방식\n-\n\n## AI가 나에 대해 새로 알게 된 사실 1개\n-\n\n## 내일 이어할 말\n-`,
  success: `day-${String(day).padStart(2, '0')}.md 파일이 생기거나, 복사해서 저장할 수 있는 마크다운이 나오면 성공입니다.`,
  stuck: {
    ...defaultStuck,
    different: '파일이 바로 안 생기면 실패가 아닙니다. AI가 보여준 마크다운을 복사해 ai-study/journal 폴더에 직접 저장하세요.',
  },
});

const wrapUpWeeklyStep = (): TutorialStep => ({
  action: '/wrap-up 주간 — 내 가게 설명서를 업데이트하세요.',
  detail: '이번 주 일지에서 AI가 나에 대해 알게 된 사실을 모아 설명서에 반영합니다. 반영 여부는 내가 정합니다.',
  copyText: `/wrap-up 주간\n\n이번 주 ai-study/journal의 수업일지를 읽고, 내 가게 설명서(ai-study/AGENTS.md)에 추가하거나 고칠 내용을 제안해 주세요. 하나씩 보여주고, 제가 승인한 것만 반영해 주세요.`,
  success: 'AI가 제안 목록을 보여주고, 내가 승인한 것만 설명서에 반영되면 성공입니다.',
  stuck: {
    ...defaultStuck,
    different: '아직 AGENTS.md가 없다면 "지금 만들어줘"라고 하면 됩니다. 일지가 부족해도 1개 제안만 받으면 충분합니다.',
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

export const courseDays: TutorialDay[] = [
  {
    day: 1, week: 1, theme: '차리기',
    title: '시작하기 — 설치, 가입, 화면 투어',
    outcome: '앱 설치, ai-study 폴더, 첫 대화, /wrap-up 스킬 설치까지 끝냅니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'both', time: '30분',
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
          detail: '바탕화면이나 문서 폴더 안에 ai-study 폴더를 만들고, 그 안에 journal 폴더도 만듭니다. 앱에서 이 폴더를 작업 폴더로 지정합니다.',
          copyText: '제 컴퓨터에 ai-study라는 작업 폴더를 만들고, 그 안에 journal 폴더를 만들어 주세요. 앞으로 수업 파일은 모두 여기에 저장할 거예요.',
          success: 'ai-study 폴더와 그 안의 journal 폴더가 보이면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '무엇을 물어도 괜찮습니다. AI는 컴퓨터를 망가뜨리지 않습니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '/wrap-up 스킬을 설치하세요.',
          detail: '매일 수업 끝에 일지를 남기는 스킬입니다. 파일을 내려받거나 열어서 내용을 복사한 뒤, 앱에 설치합니다.',
          download: { href: '/skills/wrap-up/SKILL.md', label: 'SKILL.md 다운로드', fileName: 'SKILL.md' },
          copyText: '아래 스킬 파일을 /wrap-up 스킬로 설치해 주세요.\n\n스킬 파일: https://www.ai-night.study/skills/wrap-up/SKILL.md\n\n설치가 끝나면 제가 /wrap-up이라고 말했을 때 ai-study/journal/day-XX.md 수업일지를 만들 수 있어야 합니다. 주간 모드 /wrap-up 주간은 AGENTS.md에 넣을 후보를 제안하되, 제가 승인한 것만 반영해야 합니다.',
          success: 'SKILL.md 파일을 받았고, /wrap-up 스킬로 설치할 준비가 되면 성공입니다.',
          stuck: defaultStuck,
        },
        wrapUpStep(1),
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
          detail: '바탕화면이나 문서 폴더 안에 ai-study 폴더를 만들고, 그 안에 journal 폴더도 만듭니다. 앱에서 이 폴더를 작업 폴더로 엽니다.',
          copyText: '제 컴퓨터에 ai-study라는 작업 폴더를 만들고, 그 안에 journal 폴더를 만들어 주세요. 앞으로 수업 파일은 모두 여기에 저장할 거예요.',
          success: 'ai-study 폴더와 그 안의 journal 폴더가 보이면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '첫 인사를 보내세요.',
          detail: '잘못된 질문은 없습니다. 먼저 편한 말로 부탁해봅니다.',
          copyText: '안녕하세요. 저는 AI가 처음입니다. 제가 작은 가게 일을 더 쉽게 하려면 오늘 무엇부터 해보면 좋을까요?',
          success: 'AI가 답장을 하면 성공입니다.',
          stuck: defaultStuck,
        },
        {
          action: '/wrap-up 스킬을 설치하세요.',
          detail: '매일 수업 끝에 일지를 남기는 스킬입니다. 파일을 내려받거나 열어서 내용을 복사한 뒤, 앱에 설치합니다.',
          download: { href: '/skills/wrap-up/SKILL.md', label: 'SKILL.md 다운로드', fileName: 'SKILL.md' },
          copyText: '아래 스킬 파일을 /wrap-up 스킬로 설치해 주세요.\n\n스킬 파일: https://www.ai-night.study/skills/wrap-up/SKILL.md\n\n설치가 끝나면 제가 /wrap-up이라고 말했을 때 ai-study/journal/day-XX.md 수업일지를 만들 수 있어야 합니다. 주간 모드 /wrap-up 주간은 AGENTS.md에 넣을 후보를 제안하되, 제가 승인한 것만 반영해야 합니다.',
          success: 'SKILL.md 파일을 받았고, /wrap-up 스킬로 설치할 준비가 되면 성공입니다.',
          stuck: defaultStuck,
        },
        wrapUpStep(1),
      ],
    },
  },
  {
    day: 2, week: 1, theme: '차리기',
    title: '첫 프롬프트 만들기',
    outcome: '나쁜 예와 좋은 예를 비교하고, CRISP 5칸 지시서를 만듭니다.',
    status: 'ready', requiresDesktop: false, appTrack: 'unified', time: '25분',
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
      wrapUpStep(2),
    ],
  },
  {
    day: 3, week: 1, theme: '차리기',
    title: '제대로 시키기 — 메뉴판·가격표',
    outcome: 'AI가 제안한 참고 디자인 중 하나를 골라, 인쇄 가능한 메뉴판을 만듭니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '30분',
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
주 손님: [예: 동네 주민, 직장인, 어르신]
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
      wrapUpStep(3),
    ],
  },
  {
    day: 4, week: 1, theme: '차리기',
    title: 'AI 기본 설정 — 시스템 프롬프트와 가게 설명서',
    outcome: '개인 설정과 ai-study/AGENTS.md 내 가게 설명서를 만들어, 같은 부탁의 전과 후를 비교합니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '설명서에 손님이 자주 묻는 질문 1개를 더해보세요.',
    tomorrow: '내일은 12가지 습관을 한눈에 정리합니다.',
    steps: [
      {
        action: '개인 설정에 쉬운 말투 규칙을 넣으세요.',
        detail: '한 번 설정해 두면 새 부탁을 할 때마다 같은 말투 기준을 먼저 깔고 시작할 수 있습니다. 어려운 말은 쉬운 말로 바꾸게 합니다.',
        copyText: `제 개인 설정 또는 시스템 프롬프트에 아래 규칙을 넣고 싶습니다. 더 짧고 자연스럽게 다듬어 주세요.

규칙:
- 저는 50대 이상 소상공인 초보자입니다.
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
      wrapUpStep(4),
    ],
  },
  {
    day: 5, week: 1, theme: '차리기',
    title: '[이론] AI 잘 시키는 12가지 습관',
    outcome: '지난 4일의 습관에 이름을 붙이고, 습관 카드와 첫 설명서 업데이트를 만듭니다.',
    status: 'ready', requiresDesktop: false, appTrack: 'unified', time: '25분',
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
        copyText: `AI를 더 잘 쓰기 위해 앞으로 배울 남은 습관 8개를 50대 이상 소상공인도 바로 이해할 말로 바꿔 주세요.

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
- 50대 이상 소상공인이 이해할 쉬운 존댓말
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
        copyText: `Day 1부터 Day 5까지의 수업일지와 오늘 만든 습관 카드를 바탕으로, ai-study/AGENTS.md에 추가하면 좋은 문장 후보를 골라 주세요.

반드시 지킬 것:
- 제가 승인한 것만 반영하기
- 후보는 5개 이하
- 각 후보마다 왜 필요한지 한 줄로 설명
- 어려운 말 금지
- 아직 반영하지 말고 번호를 붙여서 먼저 보여주기`,
        success: '설명서에 넣을 후보가 5개 이하로 나오고, 승인 전에는 반영하지 않으면 성공입니다.',
        stuck: defaultStuck,
      },
      wrapUpWeeklyStep(),
    ],
  },
  {
    day: 6, week: 2, theme: '시키기',
    title: '인보이스 만들기 — 계획 먼저',
    outcome: '견적서/인보이스 양식 + 실전 발행 1건',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '견적서를 영수증 겸용 버전으로 바꿔보세요.',
    tomorrow: '내일은 영수증 사진으로 장부를 만듭니다.',
    steps: [
      {
        action: '플랜 모드를 켜고, 먼저 계획만 받으세요.',
        detail: '오늘 습관은 "만들기 전 계획부터"입니다. 바로 만들지 말고, 견적서/인보이스에 들어갈 항목과 양식 순서를 먼저 정합니다.',
        copyText: `플랜 모드로 먼저 계획만 세워 주세요. 아직 파일이나 최종 양식은 만들지 마세요.

목표: 작은 가게에서 바로 쓸 견적서/인보이스 양식 만들기
필요한 항목: 발행일, 거래처, 품목, 수량, 단가, 공급가액, 세금, 합계, 입금 계좌, 메모
말투: 50대 초보 사장님도 이해할 수 있게 쉽게
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
      wrapUpStep(6),
    ],
  },
  {
    day: 7, week: 2, theme: '시키기',
    title: '영수증 사진 → 지출 장부',
    outcome: '영수증 사진을 표로 정리하고, 원본과 대조해 이번 달 지출 장부를 만듭니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '25분',
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
      wrapUpStep(7),
    ],
  },
  {
    day: 8, week: 2, theme: '시키기',
    title: '매출 정리 자동화',
    outcome: '매출 자료를 단계별로 정리해 시트와 차트 1장을 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '차트를 월별에서 요일별로 바꿔보세요.',
    tomorrow: '내일은 크롬·드라이브·지메일을 연결합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 9, week: 2, theme: '시키기',
    title: '도구 연결 — 크롬·드라이브·지메일 (MCP)',
    outcome: '커넥터를 연결해 우리 가게 리뷰 정리표와 답글 초안을 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '자주 쓰는 도구 1개를 더 연결해보세요.',
    tomorrow: '내일은 재미의 날, 남이 만든 스킬을 씁니다.',
    steps: [comingSoonStep],
  },
  {
    day: 10, week: 2, theme: '시키기',
    title: '재미의 날 — k-skill 골라 쓰기',
    outcome: 'k-skill에서 스킬 하나를 설치해 실행하고, 스킬의 정체를 확인합니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '25분',
    challenge: '설치한 스킬의 파일을 열어 한 줄만 내 취향대로 바꿔보세요.',
    tomorrow: '다음 주는 내 스킬을 직접 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 11, week: 3, theme: '굴리기',
    title: '내 스킬 만들기',
    outcome: '샘플 인보이스 부탁을 /인보이스 스킬로 저장해 새 대화에서 불러 씁니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '매주 반복하는 부탁 하나를 더 찾아 이름을 붙이세요.',
    tomorrow: '내일은 아침 브리핑을 자동화합니다.',
    steps: [
      {
        action: 'Day 1에서 설치한 /wrap-up을 떠올리세요.',
        detail: '매일 쓰는 /wrap-up은 실제 스킬 파일로 설치한 반복 부탁입니다. 스킬은 반복 부탁을 문서로 저장해 둔 것입니다.',
        copyText: '제가 Day 1에서 설치한 /wrap-up 스킬 파일을 기준으로, 반복 부탁을 스킬 파일로 저장한다는 말이 무슨 뜻인지 쉬운 말로 설명해 주세요.',
        success: '"스킬 = 저장해 둔 부탁문"이라고 내 말로 설명할 수 있으면 성공입니다.',
        stuck: defaultStuck,
      },
      {
        action: '샘플 인보이스 부탁을 /인보이스 스킬로 저장하세요.',
        detail: 'Day 6이 아직 준비 중이므로, 이 phase에서는 샘플 양식으로 먼저 스킬 구조를 익힙니다.',
        copyText: '아래 내용을 "/인보이스"라는 스킬로 저장해 주세요. 다음부터 제가 /인보이스라고 하면, 거래처 이름·품목·금액·입금 계좌만 물어보고 간단한 인보이스 초안을 만들어 주세요.\n\n샘플 양식:\n거래처:\n품목:\n수량:\n금액:\n입금 계좌:\n메모:',
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
      wrapUpStep(11),
    ],
  },
  {
    day: 12, week: 3, theme: '굴리기',
    title: '아침 브리핑 자동화',
    outcome: '매일 아침 폰으로 도착하는 업종 브리핑을 만듭니다.',
    status: 'ready', requiresDesktop: true, appTrack: 'unified', time: '30분',
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
      wrapUpStep(12),
    ],
  },
  {
    day: 13, week: 3, theme: '굴리기',
    title: '스프레드시트 재고 관리',
    outcome: '품목 5개로 작게 시험한 뒤 전체로 키운 재고 시트를 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '재고가 3개 이하면 눈에 띄게 표시해달라고 해보세요.',
    tomorrow: '내일은 카드뉴스를 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 14, week: 3, theme: '굴리기',
    title: '카드뉴스 만들기',
    outcome: '피드백을 반복해 인스타용 카드뉴스 1세트를 만들고, 꼬이면 새 대화로 리셋합니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '표지 문장을 3가지 버전으로 뽑아보세요.',
    tomorrow: '내일은 내 가게 웹페이지를 계획합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 15, week: 3, theme: '굴리기',
    title: '내 가게 웹페이지 (상) — 계획 먼저',
    outcome: 'AI 인터뷰와 플랜 모드로 계획서를 확정하고 첫 화면을 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '첫 화면 문장을 손님 말투로 바꿔보세요.',
    tomorrow: '내일은 웹페이지를 세상에 공개합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 16, week: 4, theme: '홀로서기',
    title: '웹페이지 (하) — GitHub·Vercel로 공개',
    outcome: '남에게 보낼 수 있는 링크를 만들고 내 폰으로 확인합니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '링크를 지인 1명에게 보내 첫인상 한 줄을 받아보세요.',
    tomorrow: '내일은 블로그 글 공장을 만듭니다.',
    steps: [comingSoonStep],
  },
  {
    day: 17, week: 4, theme: '홀로서기',
    title: '블로그 글 공장',
    outcome: '주제만 넣으면 초안이 나오는 글쓰기 파이프라인을 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '후기 글 주제 하나를 넣어 초안을 만들어보세요.',
    tomorrow: '내일은 텔레그램 봇을 연결합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 18, week: 4, theme: '홀로서기',
    title: '텔레그램 봇 연결',
    outcome: '폰으로 "오늘 마감 리포트"를 보내주는 봇을 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '리포트에 내일 날씨 한 줄을 붙여보세요.',
    tomorrow: '내일은 나만의 비서 에이전트를 조립합니다.',
    steps: [comingSoonStep],
  },
  {
    day: 19, week: 4, theme: '홀로서기',
    title: '나만의 비서 에이전트',
    outcome: '설명서·스킬·연결·예약을 조립해 내 가게 전담 비서를 만듭니다.',
    status: 'coming-soon', requiresDesktop: true, appTrack: 'unified', time: '30분',
    challenge: '비서에게 맡길 일을 다음 달에 1개 더 늘려보세요.',
    tomorrow: '내일은 수료입니다.',
    steps: [comingSoonStep],
  },
  {
    day: 20, week: 4, theme: '홀로서기',
    title: '도구함 + 커뮤니티 + 수료',
    outcome: '지금까지의 결과물 목록, 30일 계획, 커뮤니티 질문 1개, 수료증 초안을 만듭니다.',
    status: 'ready', requiresDesktop: false, appTrack: 'unified', time: '30분',
    challenge: '다음 30일 동안 매주 반복할 일 1개를 정하세요.',
    tomorrow: '수료했습니다. 이제 내 일에 계속 붙여 씁니다.',
    steps: [
      {
        action: '지금까지 만든 것을 목록으로 정리하세요.',
        detail: '이 phase에서는 준비된 일차만 먼저 기록합니다. 전체 20일 완주 뒤 같은 흐름을 다시 씁니다.',
        copyText: 'ai-study 폴더와 journal의 수업일지를 읽고, 지금까지 제가 만든 결과물을 표로 정리해 주세요. 결과물 이름, 만든 날, 앞으로 쓸 곳 세 칸으로요.',
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
      wrapUpWeeklyStep(),
    ],
  },
];

export function getDay(day: number) {
  return courseDays.find((item) => item.day === day);
}

export function dayPath(day: number) {
  return `/tutorials/day-${String(day).padStart(2, '0')}/`;
}

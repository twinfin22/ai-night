import type { TutorialData } from './tutorial-types';

export const setupTutorial: TutorialData = {
  title: '내 AI 작업실 만들기',
  description: '수업 때 쓸 계정, 앱, 작업 폴더를 준비하고 첫 도움 요청 문장까지 만들어보는 튜토리얼.',
  canonicalPath: '/modules/setup/',
  markdownPath: '/modules/setup.md',
  overviewTemplate: 'flow',
  stepsLabel: '선택 2개',
  toolSelector: true,
  resumePrompt: `내 작업 폴더는 문서/ai-yahak-studio야. 이 폴더 안에서 다음 실습을 이어가자.`,
  resumePromptByTrack: {
    codex: `내 작업 폴더는 문서/ai-yahak-studio야. 이 폴더 안에서 다음 실습을 이어가자.`,
    claude: `지난 시간에 AI 야학 작업실 약속을 만들었어. 그 약속을 보고 다음 실습을 이어가자.`,
  },
  steps: [
    {
      step: '01',
      track: 'both',
      label: '계정 확인',
      title: '수업에 쓸 AI 계정으로 로그인합니다.',
      goal: '1. ChatGPT 또는 Claude에 로그인합니다. 2. 수업 중 길게 요청해도 멈추지 않도록 유료 계정인지 봅니다. 3. 끝나면 바로 질문을 입력할 수 있는 화면이 보입니다.',
      officialLinks: [
        { track: 'codex', label: 'ChatGPT 로그인', url: 'https://chatgpt.com/' },
        { track: 'claude', label: 'Claude 로그인', url: 'https://claude.ai/' },
      ],
      screenshots: [
        {
          track: 'claude',
          url: 'https://claude.ai/',
          src: '/assets/tutorials/setup/claude-login.jpeg',
          alt: 'Claude 회원가입과 로그인 공식 링크 안내 카드',
          caption: 'Claude 계정 확인 화면',
          captionUrl: 'https://claude.ai/',
        },
      ],
      conceptToggles: [
        {
          title: '무료 버전으로 하면 왜 막히나요?',
          body: '수업에서는 글을 고치고, 파일을 만들고, 여러 번 다시 부탁합니다. 무료 계정은 중간에 제한이 걸릴 수 있습니다. 오늘은 수업이 끊기지 않도록 유료 계정을 기준으로 봅니다.',
        },
        {
          title: '회사/학교 계정이면?',
          body: '회사나 학교 계정은 결제나 앱 사용이 막혀 있을 수 있습니다. 계정 메뉴에서 현재 요금제와 사용할 수 있는 기능을 먼저 확인하세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '로그인 확인',
    },
    {
      step: '02',
      track: 'both',
      label: '앱 설치',
      title: '공식 사이트에서 앱을 설치합니다.',
      goal: '1. 공식 링크로 들어갑니다. 2. 비슷한 가짜 사이트를 피합니다. 3. 끝나면 내 컴퓨터에서 AI 앱을 열 수 있습니다.',
      officialLinks: [
        { track: 'codex', label: 'Codex 시작 안내', url: 'https://chatgpt.com/ko-KR/codex/get-started/' },
        { track: 'claude', label: 'Claude 다운로드', url: 'https://claude.com/ko/download' },
      ],
      screenshots: [
        {
          track: 'codex',
          url: 'https://chatgpt.com/ko-KR/codex/get-started/',
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 한국어 시작 안내 화면',
          caption: 'Codex 한국어 시작 안내',
          captionUrl: 'https://chatgpt.com/ko-KR/codex/get-started/',
        },
        {
          track: 'claude',
          url: 'https://claude.com/ko/download',
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 한국어 다운로드 페이지',
          caption: 'Claude 한국어 다운로드 페이지',
          captionUrl: 'https://claude.com/ko/download',
        },
      ],
      conceptToggles: [
        {
          title: '피싱 링크와 유사 링크 주의',
          body: '검색 결과에는 비슷한 이름의 광고나 가짜 사이트가 섞일 수 있습니다. 주소를 확인하고, 수업 화면에 있는 공식 링크에서 시작하세요.',
        },
        {
          title: '보안 경고가 뜨면',
          body: '바로 누르지 말고 앱 이름과 주소를 확인하세요. 모르겠으면 화면에 보이는 문장을 AI에게 적어주고 “지금 눌러야 할 것 하나만 알려줘”라고 물어보세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '앱 설치 완료',
    },
    {
      step: '03',
      track: 'both',
      label: '작업 폴더 만들기',
      title: '문서 안에 수업 폴더 하나를 만듭니다.',
      goal: '1. 문서 폴더 안에 ai-yahak-studio를 만듭니다. 2. 수업 파일이 여기저기 흩어지지 않게 합니다. 3. 끝나면 AI에게 이 폴더 안에서만 일하라고 말할 수 있습니다.',
      conceptToggles: [
        {
          title: '왜 바탕화면이나 다운로드 폴더를 피하나요?',
          body: '바탕화면과 다운로드 폴더에는 사진, 영수증, 임시 파일이 쉽게 섞입니다. 수업 파일은 문서 폴더 안의 ai-yahak-studio 하나에 모아두면 나중에 다시 찾기 쉽습니다.',
        },
        {
          title: '폴더와 파일 차이',
          body: '폴더는 파일을 담는 상자입니다. 파일은 그 안에 들어가는 실제 문서, 사진, 글입니다. 오늘은 상자 하나만 먼저 만들고, 나머지는 AI에게 정리해달라고 부탁합니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '작업 폴더 1개',
    },
    {
      step: 'C1',
      track: 'claude',
      label: 'Claude 첫 화면 보기',
      title: 'Claude에서 질문 입력칸과 왼쪽 메뉴만 봅니다.',
      goal: '1. 질문을 쓰는 칸을 찾습니다. 2. 왼쪽 메뉴가 어디 있는지 봅니다. 3. 끝나면 오늘 수업 질문을 바로 넣을 수 있습니다.',
      officialLinks: [
        { label: 'Claude 다운로드', url: 'https://claude.com/ko/download' },
      ],
      screenshots: [
        {
          url: 'https://claude.com/ko/download',
          src: '/assets/tutorials/setup/claude-app-sidebar.png',
          alt: 'Claude 앱의 Chat, Cowork, Code 상단 모드와 사이드바 메뉴',
          caption: 'Claude 앱 메뉴 화면',
          captionUrl: 'https://claude.com/ko/download',
        },
      ],
      conceptToggles: [
        {
          title: 'Chat',
          body: '일반 대화입니다. 첫날에는 여기에서 질문하고 답을 받는 것만 해도 충분합니다.',
        },
        {
          title: 'Cowork',
          body: '파일을 붙이거나 긴 작업을 부탁할 때 쓰는 곳입니다. 첫날에는 위치만 확인합니다.',
        },
        {
          title: 'Code',
          body: '개발 작업을 할 때 쓰는 곳입니다. 첫날에는 건드리지 않아도 됩니다.',
        },
        {
          title: '새 작업',
          body: '새 대화나 새 작업을 시작하는 버튼입니다.',
        },
        {
          title: '프로젝트',
          body: '자료와 대화를 한곳에 모아두는 공간입니다. 오늘은 새로 만들지 않습니다.',
        },
        {
          title: '아티팩트',
          body: 'Claude가 만든 문서, 표, 글 같은 결과물을 확인하는 곳입니다.',
        },
        {
          title: '예정됨',
          body: '예약된 작업을 보는 메뉴입니다. 첫날에는 건드리지 않습니다.',
        },
        {
          title: '발송(베타)',
          body: '베타 기능입니다. 수업 첫날에는 사용하지 않습니다.',
        },
        {
          title: '사용자 지정',
          body: '말투나 작업 방식 같은 개인 설정을 바꾸는 곳입니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: 'Claude 메뉴 위치 확인',
    },
    {
      step: 'X1',
      track: 'codex',
      label: 'Codex 첫 화면 보기',
      title: 'Codex에서 수업 폴더와 질문 입력칸을 찾습니다.',
      goal: '1. 문서/ai-yahak-studio 폴더를 고릅니다. 2. AI가 이 폴더 안에서만 파일을 만들게 합니다. 3. 끝나면 첫 부탁을 입력할 준비가 됩니다.',
      officialLinks: [
        { label: 'Codex 시작하기', url: 'https://chatgpt.com/ko-KR/codex/get-started/' },
        { label: 'Codex 앱 기능', url: 'https://developers.openai.com/codex/app/features' },
        { label: 'Codex Plugins', url: 'https://developers.openai.com/codex/plugins' },
      ],
      screenshots: [
        {
          url: 'https://chatgpt.com/ko-KR/codex/get-started/',
          src: '/assets/tutorials/setup/codex-folder-plan-mode.png',
          alt: 'Codex에서 기존 작업 폴더를 고르고 첫 지시를 입력하는 화면',
          caption: 'Codex 작업 폴더 선택 화면',
          captionUrl: 'https://chatgpt.com/ko-KR/codex/get-started/',
        },
        {
          url: 'https://developers.openai.com/codex/app/features',
          src: '/assets/tutorials/setup/codex-app-sidebar.png',
          alt: 'Codex 앱의 New chat, Search, Scheduled, Plugins 사이드바 메뉴',
          caption: 'Codex 앱 사이드바 메뉴',
          captionUrl: 'https://developers.openai.com/codex/app/features',
        },
      ],
      conceptToggles: [
        {
          title: 'New chat',
          body: '새 작업을 시작하는 버튼입니다. 수업에서 새 실습을 시작할 때 씁니다.',
        },
        {
          title: 'Search',
          body: '지난 작업을 찾는 메뉴입니다. 전에 만든 파일이나 대화를 다시 찾을 때 씁니다.',
        },
        {
          title: 'Scheduled',
          body: '예약된 작업을 확인하는 메뉴입니다. 첫날에는 보기만 합니다.',
        },
        {
          title: 'Plugins',
          body: '추가 기능을 보는 메뉴입니다. 첫날에는 설치하지 않고 위치만 확인합니다.',
        },
        {
          title: '작업 폴더 지정',
          body: 'New project에서 Use an existing folder를 고르고 문서/ai-yahak-studio 폴더를 선택합니다. 이렇게 해야 AI가 수업 폴더 안의 파일만 보고 고칩니다.',
        },
        {
          title: 'Plan mode',
          body: '바로 파일을 고치기 전에 먼저 할 일을 말해주는 선택입니다. 처음에는 “무엇을 할지 먼저 말해줘”라고 요청하면 됩니다.',
        },
        {
          title: '모델 선택',
          body: '첫날에는 기본값을 유지합니다. 막히거나 어려운 작업일 때만 바꿉니다.',
        },
        {
          title: '생각 깊이 선택',
          body: '간단한 확인은 빠르게, 복잡한 수정은 더 오래 생각하게 할 수 있습니다. 처음에는 기본값으로 둡니다.',
        },
        {
          title: '승인/권한 요청',
          body: '수업 폴더 안 파일 변경은 허용해도 됩니다. 수업 폴더 밖 파일, 개인정보, 결제 관련 요청은 멈추고 물어보세요.',
        },
        {
          title: '결과 확인',
          body: 'Codex가 바꾼 파일과 오류 문구를 결과 화면에서 확인합니다. 모르면 “무슨 뜻인지 한 줄로 말해줘”라고 물어보세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: 'Codex 작업 폴더와 메뉴 위치 확인',
    },
    {
      step: 'C2',
      track: 'claude',
      label: 'Claude 첫 실습',
      title: '내 수업 폴더 사용 약속을 글로 정리합니다.',
      goal: '1. 앞으로 파일을 어디에 둘지 정합니다. 2. 사람과 AI가 맡을 일을 나눕니다. 3. 끝나면 다음 수업 때 이어서 쓸 문장이 생깁니다.',
      screenshots: [
        {
          url: 'https://claude.com/ko/download',
          src: '/assets/tutorials/setup/claude-chat-input-attach.png',
          alt: 'Claude 입력창과 파일 첨부 위치를 확인하는 안내 이미지',
          caption: 'Claude 입력창과 파일 첨부 위치',
          captionUrl: 'https://claude.com/ko/download',
        },
      ],
      conceptToggles: [
        {
          title: '파일 첨부 위치',
          body: '입력창 근처의 첨부 버튼을 확인합니다. 오늘 만든 파일을 나중에 Claude에 붙여 넣거나 첨부할 수 있습니다.',
        },
        {
          title: 'Codex와 다른 점',
          body: 'Codex는 폴더 안 파일을 직접 만들고 고치는 데 강합니다. Claude는 대화로 내용을 정리하고 파일을 붙여 보며 다듬는 데 익숙합니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: 'Claude 첫 대화와 재개 문장',
      prompt: `나는 AI 야학 수강생이야. 앞으로 이 수업에서 자료와 결과물을 잘 정리하려고 해.
초보자 기준으로 수업 폴더 사용 약속을 만들어줘.

조건:
- 어려운 말은 쓰지 마.
- 내가 직접 해야 할 일과 Claude에게 맡길 일을 나눠줘.
- 다음 수업 때 이어서 쓸 수 있는 재개 문장도 만들어줘.`,
    },
    {
      step: 'X2',
      track: 'codex',
      label: 'Codex 첫 실습',
      title: '수업 폴더 안에 기본 안내문을 만듭니다.',
      goal: '1. 자료함, 결과물, 연습, 메모 폴더를 만듭니다. 2. AI가 다음에도 쉬운 말로 답하도록 안내문을 남깁니다. 3. 끝나면 수업 파일을 넣을 자리가 생깁니다.',
      conceptToggles: [
        {
          title: 'AI 안내문이 뭔가요?',
          body: 'AI에게 주는 짧은 약속입니다. 이 폴더에서 다시 일할 때마다 “짧게 말하기”, “쉬운 말 쓰기”, “먼저 한 단계만 말하기” 같은 기준을 보게 합니다.',
        },
        {
          title: '어떤 답변 규칙을 쓰면 좋나요?',
          body: '“짧게 말해줘”, “쉬운 말로 설명해줘”, “먼저 한 단계만 알려줘”처럼 내가 실제로 원하는 말투를 쓰면 됩니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '수업 폴더, README, AGENTS.md',
      prompt: `이 폴더는 내 AI 야학 작업실이야.

먼저 이 폴더가 OneDrive나 iCloud 같은 클라우드 동기화 안에 있는지 확인해줘.
문제가 될 수 있으면 쉬운 말 한 줄로 알려줘.

그 다음 아래 폴더를 만들어줘:
- 자료함
- 결과물
- 연습
- 메모

각 폴더 안에 README.md를 만들고 한 줄 설명을 적어줘.

마지막으로 AGENTS.md라는 AI 안내문을 만들고 아래 규칙을 적어줘:
- 사용자는 컴퓨터 명령어에 익숙하지 않은 초보자다.
- 컴퓨터 명령어가 필요하면 사용자에게 시키지 말고 네가 직접 실행해라.
- 승인이 필요하면 쉬운 말로 이유를 설명해라.
- 사용자에게는 전문용어 없이 한두 문장으로만 설명해라.`,
    },
    {
      step: '06',
      track: 'both',
      label: 'AI에게 도움 요청해보기',
      title: '막힌 화면을 설명하고 다음 행동 하나만 물어봅니다.',
      goal: '1. 막힌 화면의 버튼이나 오류 문구를 적습니다. 2. AI에게 지금 할 일 하나만 묻습니다. 3. 끝나면 혼자 오래 헤매지 않고 다음으로 넘어갈 수 있습니다.',
      conceptToggles: [
        {
          title: '화면을 잘 설명하지 못해도 되나요?',
          body: '괜찮습니다. “설치 화면에서 멈췄어”, “폴더를 고르는 화면이야”처럼 지금 보이는 것만 말해도 됩니다.',
        },
        {
          title: 'AI 답이 너무 길면요?',
          body: '다시 물어보면 됩니다. “너무 길어. 내가 지금 눌러야 할 것 1개만 말해줘”라고 쓰면 됩니다.',
        },
        {
          title: '개인정보를 보내도 되나요?',
          body: '보내지 마세요. 이름, 전화번호, 주소, 결제 정보는 가리고 물어보세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '도움 요청 문장 1개',
      recoveryPrompt: 'AI 답이 너무 어렵게 느껴져. 지금 내가 눌러야 할 것 1개만 쉬운 말로 다시 알려줘.',
      prompt: `지금 수업을 따라 하다가 막혔어.
내 화면에는 이런 내용이 보여:
- [보이는 버튼 이름이나 오류 문구]

내가 지금 해야 할 일 1개만 쉬운 말로 알려줘.`,
    },
  ],
};

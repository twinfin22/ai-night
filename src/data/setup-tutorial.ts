import type { TutorialData } from './tutorial-types';

export const setupTutorial: TutorialData = {
  title: 'AI 작업 환경 만들기',
  description: 'AI 야학 수업을 이어가기 위해 앱 설치, 작업 폴더 연결, 첫 정리 실습까지 끝내는 튜토리얼.',
  canonicalPath: '/modules/setup/',
  markdownPath: '/modules/setup.md',
  stepsLabel: '트랙 2개',
  toolSelector: true,
  resumePrompt: `내 작업 폴더는 문서/ai-yahak-studio야. 이 폴더를 기준으로 다음 실습을 이어가자.`,
  resumePromptByTrack: {
    codex: `내 작업 폴더는 문서/ai-yahak-studio야. 이 폴더를 기준으로 다음 실습을 이어가자.`,
    claude: `지난 시간에 AI 야학 작업실 운영 규칙을 만들었어. 그 규칙을 기준으로 다음 실습을 이어가자.`,
  },
  steps: [
    {
      step: '01',
      track: 'both',
      label: '계정 확인',
      title: '유료 계정으로 로그인되어 있는지 확인합니다.',
      goal: '수업 중 기능 제한으로 멈추지 않게 ChatGPT 또는 Claude 유료 계정 상태를 확인합니다.',
      duration: '3분',
      officialLinks: [
        { label: 'ChatGPT 회원가입/로그인', url: 'https://chatgpt.com/' },
        { label: 'Claude 회원가입/로그인', url: 'https://claude.ai/' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/chatgpt-signup.png',
          alt: 'ChatGPT 회원가입 보안 확인 화면',
          caption: 'ChatGPT 가입/로그인에서 보안 확인이 먼저 뜰 수 있습니다. 체크 후 계정 화면으로 들어갑니다.',
        },
        {
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 공식 다운로드 페이지 화면',
          caption: 'Claude를 쓸 사람은 Claude 계정으로 로그인합니다.',
        },
      ],
      successCriteria: ['내 계정으로 로그인되어 있다.', '유료 플랜 사용 가능 상태를 확인했다.'],
      conceptToggles: [
        {
          title: '무료 버전으로 하면 왜 막히나요?',
          body: '수업 중 긴 작업, 파일 작업, 반복 요청에서 제한에 걸릴 수 있습니다. 이 튜토리얼은 유료 계정을 기준으로 진행합니다.',
        },
        {
          title: '회사/학교 계정이면?',
          body: '결제나 권한이 막힐 수 있습니다. 계정 메뉴에서 현재 플랜과 사용할 수 있는 기능을 먼저 확인하세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '로그인 확인',
      prompt: '',
    },
    {
      step: '02',
      track: 'both',
      label: '앱 설치',
      title: '공식 앱을 설치하고 로그인합니다.',
      goal: '검색 결과의 가짜 앱을 피하고, 공식 앱에서 수업을 시작할 준비를 합니다.',
      duration: '7분',
      officialLinks: [
        { label: 'Codex 공식 다운로드', url: 'https://developers.openai.com/codex/app' },
        { label: 'Claude 공식 다운로드', url: 'https://claude.ai/download' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 공식 다운로드 페이지',
          caption: 'Codex는 OpenAI Developers의 공식 앱 페이지에서 받습니다.',
        },
        {
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 공식 다운로드 페이지',
          caption: 'Claude는 Claude 공식 다운로드 페이지에서 받습니다.',
        },
      ],
      successCriteria: ['앱이 열린다.', '내 계정으로 로그인되어 있다.'],
      conceptToggles: [
        {
          title: '검색 결과에서 받으면 안 되는 이유',
          body: '비슷한 이름의 가짜 앱이나 광고 링크가 섞일 수 있습니다. 위 공식 링크에서만 받으세요.',
        },
        {
          title: '보안 경고가 뜨면',
          body: '바로 누르지 말고 앱 이름과 받은 주소를 확인하세요. 모르면 AI에게 화면을 설명하고 한 단계만 물어보세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '앱 설치 완료',
      recoveryPrompt: '앱 설치 화면에서 막혔어. 지금 화면에서 무엇을 눌러야 하는지 쉬운 말로 한 단계만 알려줘.',
      prompt: `앱 설치 중 막혔어. 지금 화면에서 무엇을 눌러야 하는지 초보자 기준으로 한 단계씩 알려줘.`,
    },
    {
      step: '03',
      track: 'both',
      label: '작업 폴더 만들기',
      title: '문서 안에 작업실 폴더 하나만 만듭니다.',
      goal: '사람이 직접 만드는 폴더는 하나로 줄이고, 나머지 정리는 AI에게 맡깁니다.',
      duration: '5분',
      successCriteria: ['문서 폴더 안에 `ai-yahak-studio`가 보인다.', '폴더 안은 비어 있어도 괜찮다.'],
      conceptToggles: [
        {
          title: '왜 바탕화면이나 다운로드 폴더를 피하나요?',
          body: '나중에 파일이 섞이기 쉽고, AI가 작업할 범위가 헷갈립니다. 수업용 작업실은 문서 폴더 안에 하나만 둡니다.',
        },
        {
          title: '폴더/파일/프로젝트 차이',
          body: '폴더는 파일을 담는 상자입니다. 프로젝트는 그 상자를 기준으로 AI가 이어서 일하는 단위입니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '작업 폴더 1개',
      prompt: '',
    },
    {
      step: 'C1',
      track: 'claude',
      label: 'Claude 시작',
      title: 'Claude에서 첫 대화와 파일 첨부 위치를 확인합니다.',
      goal: 'Claude 트랙은 폴더 자동화가 아니라 대화와 파일 첨부 중심으로 시작합니다.',
      duration: '7분',
      officialLinks: [
        { label: 'Claude 공식 다운로드', url: 'https://claude.ai/download' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 공식 다운로드 페이지',
          caption: 'Claude는 공식 앱을 설치한 뒤 새 대화와 파일 첨부 위치를 확인합니다.',
        },
      ],
      successCriteria: ['Claude에서 새 대화를 시작할 수 있다.', '파일 첨부 버튼 위치를 안다.', '다음 수업에 이어갈 문장을 저장했다.'],
      conceptToggles: [
        {
          title: 'Claude Code를 첫날 쓰지 않는 이유',
          body: '첫날 목표는 설치와 첫 성공입니다. Claude Code는 개발자 도구라 초보자에게 경로가 길어집니다.',
        },
        {
          title: 'Codex와 뭐가 다른가요?',
          body: 'Codex는 폴더 안 파일을 만들고 고치는 흐름입니다. Claude는 첫날 대화와 파일 첨부로 작업 규칙을 정리하는 흐름입니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: 'Claude 첫 대화와 재개 문장',
      prompt: `나는 AI 야학 수강생이야. 앞으로 이 수업에서 자료와 결과물을 잘 정리하려고 해.
초보자 기준으로 작업실 운영 규칙을 만들어줘.

조건:
- 어려운 말은 쓰지 마.
- 내가 직접 해야 할 일과 Claude에게 맡길 일을 나눠줘.
- 다음 수업 때 이어서 쓸 수 있는 재개 문장도 만들어줘.`,
    },    {
      step: '04',
      track: 'codex',
      label: 'Codex 연결',
      title: '작업 폴더를 Codex에 연결합니다.',
      goal: 'AI가 작업실 안에서 파일을 만들고 고칠 수 있는 상태로 만듭니다.',
      duration: '8분',
      officialLinks: [
        { label: 'Codex 시작하기', url: 'https://chatgpt.com/codex/get-started/' },
        { label: 'Codex 앱 설명', url: 'https://developers.openai.com/codex/app' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 앱 기능 설명 화면',
          caption: 'Codex 앱은 작업 목록, 입력창, 변경 내용(diff)을 한 화면에서 봅니다.',
        },
      ],
      successCriteria: ['Codex 화면에서 현재 폴더가 `ai-yahak-studio`로 보인다.', '입력창에 메시지를 쓸 수 있다.', '파일을 만들 수 있는 권한 상태다.'],
      conceptToggles: [
        {
          title: '권한 요청은 언제 허용하나요?',
          body: '작업실 폴더 안에 파일을 만들거나 고치는 요청은 보통 괜찮습니다. 작업실 밖 파일 삭제, 개인정보 전송, 결제 관련 요청은 멈추고 물어보세요.',
        },
        {
          title: 'Local / Worktree / Cloud 차이',
          body: 'Local은 내 컴퓨터 폴더에서 일하는 방식입니다. Worktree와 Cloud는 여러 작업을 나눠 돌릴 때 쓰는 고급 기능이라 첫날에는 몰라도 됩니다.',
        },
        {
          title: '터미널 창이 보여도 괜찮나요?',
          body: 'AI가 파일을 만들거나 확인할 때 명령을 실행할 수 있습니다. 무엇을 하는지 설명을 읽고, 이상하면 승인하지 말고 질문하세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '폴더 구조와 AGENTS.md',
      recoveryPrompt: '작업 폴더를 앱에 연결하다가 막혔어. 내가 지금 확인해야 할 것 1개만 먼저 알려줘.',
      prompt: `이 폴더는 내 AI 야학 작업실이야.

먼저 클라우드 동기화 문제가 있는지 확인해줘.
그 다음 아래 폴더를 만들어줘:
- 자료함
- 결과물
- 연습
- 메모

각 폴더 안에 README.md를 만들고 한 줄 설명을 적어줘.
마지막으로 AGENTS.md에 "쉬운 말로 짧게 설명하기" 규칙을 추가해줘.`,
    },
    {
      step: '05',
      track: 'codex',
      label: '내 규칙 추가',
      title: 'AI가 다음에도 지킬 규칙을 하나 추가합니다.',
      goal: 'AGENTS.md에 내 취향을 넣고, 다음 대화에서 적용되는지 확인합니다.',
      duration: '3분',
      screenshots: [
        {
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 앱 화면 예시',
          caption: 'Codex에서는 작업 지시, 파일 변경, 결과 확인을 한 흐름으로 봅니다.',
        },
      ],
      successCriteria: ['AGENTS.md에 내 규칙이 추가됐다.', '다음 답변에서 그 규칙이 적용된다.'],
      conceptToggles: [
        {
          title: 'AGENTS.md가 뭔가요?',
          body: 'AI에게 주는 규칙 노트입니다. 이 폴더에서 다시 일할 때마다 먼저 읽고 따르는 기준입니다.',
        },
        {
          title: '좋은 규칙 예시',
          body: '답변은 짧게 해줘. 어려운 말은 쉬운 말로 바꿔줘. 먼저 할 일을 1개만 말해줘.',
        },
      ],
      recommended: [],
      useful: [],
      output: '내 규칙 1개',
      prompt: `AGENTS.md에 내 규칙을 추가해줘:
- 나에게 항상 존댓말로 대답해줘.`,
    },

  ],
};

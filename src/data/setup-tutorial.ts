import type { TutorialData } from './tutorial-types';

export const setupTutorial: TutorialData = {
  title: 'AI 작업 환경 만들기',
  description: 'AI 야학 수업을 이어가기 위해 앱 설치, 작업 폴더 지정, 첫 정리 실습까지 끝내는 튜토리얼.',
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
      officialLinks: [
        { track: 'codex', label: 'ChatGPT 로그인', url: 'https://chatgpt.com/' },
        { track: 'claude', label: 'Claude 로그인', url: 'https://claude.ai/' },
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
      officialLinks: [
        { track: 'codex', label: 'Codex 시작 안내', url: 'https://chatgpt.com/ko-KR/codex/get-started/' },
        { track: 'claude', label: 'Claude 다운로드', url: 'https://claude.com/ko/download' },
      ],
      screenshots: [
        {
          track: 'codex',
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 한국어 시작 안내 화면',
          caption: 'Codex는 한국어 시작 안내에서 앱 사용법을 확인합니다.',
        },
        {
          track: 'claude',
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 한국어 다운로드 페이지',
          caption: 'Claude는 한국어 다운로드 페이지에서 macOS용 앱 버튼을 확인합니다.',
        },
      ],
      successCriteria: ['앱이 열린다.', '내 계정으로 로그인되어 있다.'],
      conceptToggles: [
        {
          title: '검색 결과에서 받으면 안 되는 이유',
          body: '비슷한 이름의 가짜 앱이나 광고 링크가 섞일 수 있습니다. 공식 사이트 주소인지 먼저 확인하고 받으세요.',
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
      officialLinks: [
        { label: 'Claude 다운로드', url: 'https://claude.com/ko/download' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/claude-download.png',
          alt: 'Claude 한국어 다운로드 페이지',
          caption: 'Claude는 한국어 다운로드 페이지에서 공식 앱을 설치한 뒤 새 대화와 파일 첨부 위치를 확인합니다.',
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
      label: '작업 폴더 지정',
      title: 'Codex가 사용할 작업 폴더를 고릅니다.',
      goal: 'AI가 수업용 폴더 안에서만 파일을 만들고 고치도록 작업 범위를 정합니다.',
      officialLinks: [
        { label: 'Codex 시작 안내', url: 'https://chatgpt.com/ko-KR/codex/get-started/' },
        { label: 'Codex 앱 사용법', url: 'https://developers.openai.com/codex/app' },
      ],
      screenshots: [
        {
          src: '/assets/tutorials/setup/codex-project-folder.jpeg',
          alt: 'Codex에서 기존 작업 폴더를 고르는 화면',
          caption: '왼쪽 아래 메뉴에서 기존 폴더 사용을 골라 내가 만든 작업 폴더를 지정합니다.',
        },
      ],
      successCriteria: ['Codex 화면에서 현재 폴더가 `ai-yahak-studio`로 보인다.', '입력창에 메시지를 쓸 수 있다.', 'Codex가 이 폴더 안에 파일을 만들 수 있다.'],
      conceptToggles: [
        {
          title: '권한 요청은 언제 허용하나요?',
          body: '작업실 폴더 안에 파일을 만들거나 고치는 요청은 보통 괜찮습니다. 작업실 밖 파일 삭제, 개인정보 전송, 결제 관련 요청은 멈추고 물어보세요.',
        },
        {
          title: '처음에는 어떤 방식을 고르나요?',
          body: '첫날에는 내 컴퓨터에 있는 폴더 하나만 고르면 됩니다. 여러 작업을 나눠 돌리는 기능은 나중에 배워도 됩니다.',
        },
        {
          title: '터미널 창이 보여도 괜찮나요?',
          body: 'AI가 파일을 만들거나 확인할 때 명령을 실행할 수 있습니다. 무엇을 하는지 설명을 읽고, 이상하면 승인하지 말고 질문하세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '폴더 구조와 답변 규칙 문서',
      recoveryPrompt: 'Codex에서 작업 폴더를 고르다가 막혔어. 내가 지금 눌러야 할 것 1개만 먼저 알려줘.',
      prompt: `이 폴더는 내 AI 야학 작업실이야.

먼저 클라우드 동기화 문제가 있는지 확인해줘.
그 다음 아래 폴더를 만들어줘:
- 자료함
- 결과물
- 연습
- 메모

각 폴더 안에 README.md를 만들고 한 줄 설명을 적어줘.
마지막으로 AGENTS.md라는 에이전트 문서를 만들고 "쉬운 말로 짧게 설명하기" 규칙을 적어줘.`,
    },
    {
      step: '05',
      track: 'codex',
      label: '답변 규칙 정하기',
      title: '에이전트 문서를 만들고 답변 규칙을 정합니다.',
      goal: 'AI가 다음에도 쉬운 말로 답하도록 이 폴더 안에 규칙 문서를 남깁니다.',
      screenshots: [
        {
          src: '/assets/tutorials/setup/codex-download.png',
          alt: 'Codex 한국어 시작 안내 화면',
          caption: 'Codex에서는 작업 지시, 파일 변경, 결과 확인을 한 흐름으로 봅니다.',
        },
      ],
      successCriteria: ['에이전트 문서가 만들어졌다.', '문서 안에 내가 원하는 답변 규칙이 들어 있다.', '다음 답변에서 그 규칙이 적용된다.'],
      conceptToggles: [
        {
          title: '에이전트 문서가 뭔가요?',
          body: 'AI에게 주는 안내문입니다. 이 폴더에서 다시 일할 때마다 AI가 먼저 읽고 따르는 기준입니다.',
        },
        {
          title: '어떤 답변 규칙을 쓰면 좋나요?',
          body: '“짧게 말해줘”, “쉬운 말로 설명해줘”, “먼저 한 단계만 알려줘”처럼 내가 실제로 원하는 말투를 쓰면 됩니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '에이전트 문서와 답변 규칙',
      prompt: `AGENTS.md라는 에이전트 문서를 만들고, 아래 답변 규칙을 적어줘:
- 나에게 항상 쉬운 말로 짧게 설명해줘.
- 먼저 해야 할 일 1개만 알려줘.`,
    },
    {
      step: '06',
      track: 'both',
      label: 'AI에게 도움 요청해보기',
      title: '막힌 화면을 설명하고 다음 행동 하나만 물어봅니다.',
      goal: '혼자 오래 헤매지 않고, AI에게 지금 필요한 한 단계만 묻는 연습을 합니다.',
      successCriteria: ['막힌 상황을 한 문장으로 설명했다.', 'AI에게 다음에 할 일 1개만 물어봤다.', '답이 어렵거나 길면 더 쉽게 다시 물어봤다.'],
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

import type { TutorialData } from './tutorial-types';

export const setupTutorial: TutorialData = {
  title: 'AI 작업 환경 만들기',
  description: 'AI 야학 수업을 이어가기 위해 앱 설치, 작업 폴더 연결, 첫 정리 실습까지 끝내는 튜토리얼.',
  canonicalPath: '/modules/setup/',
  markdownPath: '/modules/setup.md',
  stepsLabel: '5단계',
  summary: [
    { label: '진행 방식', value: '5단계' },
    { label: '최종 결과', value: '작업 폴더' },
  ],
  prepItems: [
    'ChatGPT 또는 Claude 유료 계정',
    'Mac 또는 Windows 컴퓨터',
    '인터넷 연결',
    '문서 폴더를 열 수 있는 상태',
  ],
  prepNote: '폴더를 혼자 예쁘게 정리하려고 하지 마세요. 작업 폴더 하나만 만들고, 내부 정리는 AI에게 맡깁니다.',
  resumePrompt: `내 작업 폴더는 문서/ai-yahak-studio야. 이 폴더를 기준으로 다음 실습을 이어가자.`,
  steps: [
    {
      step: '01',
      label: '계정 확인',
      title: '유료 계정으로 로그인되어 있는지 확인합니다.',
      goal: '수업 중 기능 제한으로 멈추지 않게 ChatGPT 또는 Claude 유료 계정 상태를 확인합니다.',
      recommended: [],
      useful: [],
      learner: ['앱 계정 확인하기', '유료 플랜 상태 보기', '다른 계정으로 로그인되어 있지 않은지 확인하기'],
      ai: [],
      output: '로그인 확인',
      prompt: '',
    },
    {
      step: '02',
      label: '앱 설치',
      title: '공식 앱을 설치하고 로그인합니다.',
      goal: '검색 결과의 가짜 앱을 피하고, 공식 앱에서 수업을 시작할 준비를 합니다.',
      recommended: [],
      useful: [],
      learner: ['공식 다운로드 링크 열기', '앱 설치하기', '보안 경고가 뜨면 내용을 읽기'],
      ai: ['설치 화면에서 막혔을 때 다음 한 단계 설명하기'],
      output: '앱 설치 완료',
      prompt: `앱 설치 중 막혔어. 지금 화면에서 무엇을 눌러야 하는지 초보자 기준으로 한 단계씩 알려줘.`,
    },
    {
      step: '03',
      label: '작업 폴더 만들기',
      title: '문서 안에 작업실 폴더 하나만 만듭니다.',
      goal: '사람이 직접 만드는 폴더는 하나로 줄이고, 나머지 정리는 AI에게 맡깁니다.',
      recommended: [],
      useful: [],
      learner: ['문서 폴더 열기', '`ai-yahak-studio` 폴더 만들기', '폴더 위치 눈으로 확인하기'],
      ai: [],
      output: '작업 폴더 1개',
      prompt: '',
    },
    {
      step: '04',
      label: 'Codex 연결',
      title: '작업 폴더를 Codex에 연결합니다.',
      goal: 'AI가 작업실 안에서 파일을 만들고 고칠 수 있는 상태로 만듭니다.',
      recommended: [],
      useful: [],
      learner: ['Codex에서 폴더 열기', '현재 폴더명이 맞는지 확인하기', '권한 요청을 읽고 허용 여부 판단하기'],
      ai: ['클라우드 동기화 여부 점검', '쉬운 폴더 구조 만들기', 'AGENTS.md 만들기'],
      output: '폴더 구조와 AGENTS.md',
      prompt: `나는 AI 야학 수강생이고 컴퓨터를 잘 몰라. 이 폴더는 내 수업 작업실이야.

시작하기 전에 먼저 확인해줘:
이 폴더가 OneDrive나 iCloud 같은 클라우드 동기화 안에 있는지 확인하고,
문제가 될 수 있으면 네가 직접 해결해줘. 해결한 내용은 쉬운 말 한 줄로만 알려줘.

그 다음, 아래 폴더 구조를 만들어줘:
- 자료함
- 결과물
- 연습
- 메모

각 폴더 안에 README.md를 하나씩 만들고, 이 폴더에 무엇을 넣으면 되는지 쉬운 말 한 줄로 적어줘.

마지막으로 AGENTS.md 파일을 만들고 이 규칙을 적어줘:
- 사용자는 터미널을 모르는 초보자다. 터미널 명령이 필요하면 사용자에게 시키지 말고 네가 직접 실행하고, 승인이 필요하면 쉬운 말로 설명해라.
- 작업에 필요한 도구(Node, npx 등)가 없으면 왜 필요한지 쉬운 말로 설명하고, 승인받은 뒤 설치해라.
- 뭔가 막히면 포기하지 말고 다른 방법을 찾아 시도해라.
- 사용자에게는 전문용어 없이 한두 문장으로만 설명해라.`,
    },
    {
      step: '05',
      label: '내 규칙 추가',
      title: 'AI가 다음에도 지킬 규칙을 하나 추가합니다.',
      goal: 'AGENTS.md에 내 취향을 넣고, 다음 대화에서 적용되는지 확인합니다.',
      recommended: [],
      useful: [],
      learner: ['원하는 말투 고르기', '규칙 추가 요청하기', '다음 답변에서 적용 확인하기'],
      ai: ['AGENTS.md 수정하기', '규칙 적용 확인하기'],
      output: '내 규칙 1개',
      prompt: `AGENTS.md에 내 규칙을 추가해줘:
- 나에게 항상 존댓말로 대답해줘.`,
    },
  ],
};

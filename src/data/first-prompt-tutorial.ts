import type { TutorialData } from './tutorial-types';
import { tutorialMeta } from './tutorial-meta';

export const firstPromptTutorial: TutorialData = {
  title: tutorialMeta.firstPrompt.title,
  description: '대충 말했을 때와 제대로 말했을 때 결과가 어떻게 달라지는지 직접 비교하고, 내 첫 AI 작업 지시서를 만드는 튜토리얼.',
  canonicalPath: '/modules/first-prompt/',
  markdownPath: '/modules/first-prompt.md',
  overviewTemplate: 'flow',
  stepsLabel: '8단계',
  firstPromptBuilder: true,
  resumePrompt: `지난 시간에 만든 내 첫 AI 작업 지시서를 기준으로 다음 일을 이어가자.`,
  steps: [
    {
      step: '01',
      label: 'AI에게 대충 시켜보기',
      title: '먼저 짧게 말했을 때 어떤 답이 나오는지 봅니다.',
      goal: 'AI가 내 상황을 모르면 대충 짐작해서 쓴다는 것을 직접 확인합니다.',
      successCriteria: [
        '짧은 요청을 그대로 복사해서 AI에게 보냈습니다.',
        '답이 너무 넓거나 내 가게와 맞지 않는 부분을 찾았습니다.',
      ],
      conceptToggles: [
        {
          title: '왜 먼저 대충 시켜보나요?',
          body: '처음부터 잘 쓰려고 하면 손이 멈춥니다. 먼저 대충 시켜보고, 마음에 안 드는 이유를 찾으면 다음 말이 쉬워집니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '처음 나온 AI 답변',
      prompt: `우리 가게 홍보글 써줘`,
    },
    {
      step: '02',
      label: '왜 마음에 안 드는지 보기',
      title: '빠진 정보를 체크합니다.',
      goal: 'AI가 못한 것이 아니라 내가 일을 덜 분명하게 시킨 부분을 찾습니다.',
      successCriteria: [
        '누구에게 보여줄 글인지 확인했습니다.',
        '어떤 가게인지 확인했습니다.',
        '어디에 올릴 글인지 확인했습니다.',
        '길이와 말투가 있는지 확인했습니다.',
      ],
      conceptToggles: [
        {
          title: 'AI가 똑똑하지 않은 건가요?',
          body: '그보다 내가 알려준 정보가 적은 경우가 많습니다. AI는 모르는 부분을 스스로 짐작합니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '빠진 정보 체크',
    },
    {
      step: '03',
      label: '5칸으로 다시 말하기',
      title: '내 상황, 역할, 일, 말투, 조건을 나눠 씁니다.',
      goal: '긴 설명 대신 5칸에 나눠 적어서 AI가 할 일을 분명하게 만듭니다.',
      successCriteria: [
        '내 상황을 한두 문장으로 적었습니다.',
        'AI가 맡을 역할을 적었습니다.',
        '해달라는 일을 적었습니다.',
        '원하는 말투를 적었습니다.',
        '꼭 지켜야 할 조건을 적었습니다.',
      ],
      conceptToggles: [
        {
          title: '5칸을 다 채워야 하나요?',
          body: '처음에는 샘플로 채워도 됩니다. 내 가게 이름, 손님, 올릴 곳만 바꿔도 답이 훨씬 가까워집니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '5칸 요청문',
    },
    {
      step: '04',
      label: '샘플로 먼저 채우기',
      title: '빈칸에서 멈추지 않게 샘플을 고릅니다.',
      goal: '동네 식당, 농산물, 숙소, 체험 수업 중 가까운 예시를 골라 시작합니다.',
      successCriteria: [
        '가장 가까운 샘플을 하나 골랐습니다.',
        '샘플 문장 중 내 일과 맞지 않는 부분을 바꿨습니다.',
      ],
      conceptToggles: [
        {
          title: '내 업종이 없으면?',
          body: '가장 비슷한 샘플을 고르세요. 식당은 카페로, 숙소는 체험 공간으로 바꿔도 됩니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '내 일에 맞춘 샘플',
    },
    {
      step: '05',
      label: 'Claude와 Codex 나누기',
      title: '글을 묻는 일과 파일을 고치는 일을 구분합니다.',
      goal: '한 화면에 섞지 않고, 어떤 일은 Claude에 묻고 어떤 일은 Codex에 맡길지 나눕니다.',
      successCriteria: [
        '글쓰기, 정리, 아이디어는 Claude에 묻는다고 적었습니다.',
        '파일 고치기, 문구 바꾸기, 작업 전 계획 받기는 Codex에 맡긴다고 적었습니다.',
      ],
      conceptToggles: [
        {
          title: '둘 중 하나만 쓰면 안 되나요?',
          body: '가능합니다. 오늘은 역할을 나눠 보는 것이 목표입니다. 글로 생각을 정리할 때와 파일을 실제로 고칠 때가 다르다는 것만 기억하면 됩니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '도구 선택 기준',
    },
    {
      step: '06',
      label: '다시 시켜보고 비교하기',
      title: '짧은 요청과 5칸 요청의 답을 나란히 봅니다.',
      goal: 'AI가 갑자기 좋아진 것이 아니라, 내가 일을 더 분명하게 시켰다는 것을 확인합니다.',
      successCriteria: [
        '짧은 요청의 답과 5칸 요청의 답을 비교했습니다.',
        '내 손님, 내 가게, 올릴 곳이 답에 반영됐는지 봤습니다.',
      ],
      conceptToggles: [
        {
          title: '비교할 때 무엇을 봐야 하나요?',
          body: '그럴듯한 문장보다 내 손님에게 바로 보여줄 수 있는지를 보세요.',
        },
      ],
      recommended: [],
      useful: [],
      output: '비교한 답변 2개',
    },
    {
      step: '07',
      label: 'AI에게 먼저 질문시키기',
      title: '완벽하게 쓰려 하지 말고 AI가 물어보게 합니다.',
      goal: '막히면 AI에게 먼저 물어볼 질문을 달라고 해서 다음 입력을 쉽게 만듭니다.',
      successCriteria: [
        '질문 3개를 받았습니다.',
        '내가 바로 답할 수 있는 질문인지 확인했습니다.',
      ],
      recommended: [],
      useful: [],
      output: 'AI가 물어본 질문 3개',
      prompt: `더 잘 만들기 위해 나에게 먼저 물어봐야 할 질문 3개만 해줘.
질문은 쉬운 말로 해줘.`,
    },
    {
      step: '08',
      label: '내 첫 AI 작업 지시서 저장',
      title: '다음에도 다시 쓸 수 있게 저장합니다.',
      goal: '오늘 만든 말을 수업 단체방에 공유하거나 내 작업 폴더에 저장합니다.',
      successCriteria: [
        '내가 하고 싶은 일을 적었습니다.',
        '5칸 내용을 저장했습니다.',
        'AI가 나에게 먼저 물어볼 질문까지 붙였습니다.',
      ],
      conceptToggles: [
        {
          title: '어디에 저장하면 좋나요?',
          body: '수업 작업 폴더에 저장하거나 단체방에 공유하세요. 다음 수업에서 그대로 이어서 쓸 수 있습니다.',
        },
      ],
      recommended: [],
      useful: [],
      output: '내 첫 AI 작업 지시서',
      prompt: `내가 하고 싶은 일:
내 상황:
AI가 맡을 역할:
해달라는 일:
말투:
지켜야 할 조건:
AI가 나에게 먼저 물어볼 질문:`,
    },
  ],
};

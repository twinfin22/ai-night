export interface TutorialModuleMeta {
  key: string;
  href: string;
  label: string;
  title: string;
  body: string;
  outputs: string[];
}

const setupModule: TutorialModuleMeta = {
  key: 'setup',
  href: '/modules/setup/',
  label: '작업 준비',
  title: '1. AI 사용 설정하기',
  body: '수업 때 쓸 앱을 켜고, 내 파일을 모아둘 폴더를 하나 만듭니다. 다음에 다시 열어도 이어서 일할 수 있게 해둡니다.',
  outputs: ['작업 폴더', '내 말투 규칙', '막혔을 때 물어볼 문장'],
};

const firstPromptModule: TutorialModuleMeta = {
  key: 'firstPrompt',
  href: '/modules/first-prompt/',
  label: '첫 지시',
  title: '2. 첫 프롬프트 만들기',
  body: '대충 말했을 때와 제대로 말했을 때 결과가 어떻게 달라지는지 직접 비교합니다.',
  outputs: ['내 첫 AI 작업 지시서'],
};

const websiteModule: TutorialModuleMeta = {
  key: 'website',
  href: '/modules/website/',
  label: '웹사이트',
  title: '3. 웹사이트 만들기',
  body: '내 사업이 누구에게 무엇을 해주는지 한 장으로 정리합니다. 보고 바로 문의할 수 있는 길까지 만듭니다.',
  outputs: ['첫 화면 문장', '페이지 순서', '문의 버튼'],
};

const githubVercelModule: TutorialModuleMeta = {
  key: 'githubVercel',
  href: '/modules/github-vercel/',
  label: '공개 링크',
  title: '3+a. 웹사이트 공유하기 (깃허브&버셀)',
  body: '내 컴퓨터에 있는 작업물을 GitHub에 보관하고, Vercel로 남에게 보낼 수 있는 링크를 만듭니다.',
  outputs: ['GitHub 보관함', 'Vercel 공개 주소', '다시 고친 뒤 확인하는 방법'],
};

const blogModule: TutorialModuleMeta = {
  key: 'blog',
  href: '/modules/blog/',
  label: '블로그',
  title: '4. 블로그 글쓰기 자동화',
  body: '후기, 안내문, 자주 듣는 질문 중 하나를 골라 블로그 글의 뼈대를 만듭니다. 처음부터 완성하려고 하지 않습니다.',
  outputs: ['독자 질문 1개', '글 뼈대', '고쳐 쓸 초안'],
};

export const tutorialModules = [
  setupModule,
  firstPromptModule,
  websiteModule,
  githubVercelModule,
  blogModule,
];

export const tutorialMeta = {
  setup: setupModule,
  firstPrompt: firstPromptModule,
  website: websiteModule,
  githubVercel: githubVercelModule,
  blog: blogModule,
};

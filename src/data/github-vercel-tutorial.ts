import type { TutorialData } from './tutorial-types';

export const githubVercelTutorial: TutorialData = {
  title: '3+a. 웹사이트 공유하기 (깃허브&버셀)',
  description: '내 가게 소개 페이지나 행사 안내 페이지를 GitHub에 보관하고, Vercel로 남에게 보낼 수 있는 주소를 만드는 튜토리얼.',
  canonicalPath: '/modules/github-vercel/',
  markdownPath: '/modules/github-vercel.md',
  overviewTemplate: 'flow',
  stepsLabel: '6단계 + 선택',
  resumePrompt: `GitHub와 Vercel로 공개 링크를 만들다가 중간에 멈췄어.
내가 지금 어디까지 했는지 물어보고, 다음 한 단계만 쉬운 말로 안내해줘.

확인할 것:
1. GitHub 계정이 있는지
2. GitHub에 내 작업물을 담을 공간을 만들었는지
3. 내 파일이 GitHub에 올라갔는지
4. Vercel에서 그 작업물을 가져왔는지
5. 공개 주소가 열리는지
6. 내 도메인을 Cloudflare로 연결해야 하는 상황인지`,
  steps: [
    {
      step: '01',
      label: '필요한지 정하기',
      title: '지금 공개 링크가 필요한지 먼저 정합니다.',
      goal: '1. 지금 만든 것이 남에게 보여줄 결과물인지 고릅니다. 2. 아직 연습이면 여기서 멈춰도 됩니다. 3. 끝나면 GitHub와 Vercel을 지금 할지 나중에 할지 결정됩니다.',
      screenshots: [
        {
          url: 'https://github.com/',
          src: '/assets/tutorials/github-vercel/screenshots/github-repo-files.png',
          alt: 'GitHub 파일 목록 실제 화면',
        },
        {
          url: 'https://vercel.com/docs/git',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-git-docs.png',
          alt: 'Vercel Git 연결 도움말 실제 화면',
        },
      ],
      successCriteria: [
        '내 작업물이 남에게 보여줄 웹사이트인지 판단했다.',
        '혼자 연습 파일인지, 공개 링크가 필요한 결과물인지 구분했다.',
      ],
      conceptToggles: [
        {
          title: 'GitHub는 무엇인가요?',
          body: 'GitHub는 내 작업물을 넣어두는 온라인 보관함입니다. 내 컴퓨터에만 있으면 나만 볼 수 있지만, GitHub에 올리면 파일 묶음과 고친 기록이 한곳에 남습니다. 웹사이트를 인터넷에 보여주기 전, 먼저 GitHub 보관함에 정리해 넣는다고 생각하면 됩니다.',
        },
        {
          title: 'Vercel은 무엇인가요?',
          body: 'Vercel은 GitHub 보관함에 있는 웹사이트를 꺼내서 실제 인터넷 주소로 보여주는 곳입니다. GitHub가 파일 보관함이라면, Vercel은 사람들이 들어와 보는 공개 입구입니다. Vercel이 만들어주는 주소를 보내면 다른 사람이 내 사이트를 열 수 있습니다.',
        },
        {
          title: 'GitHub와 Vercel 차이를 한 줄로 말하면?',
          body: 'GitHub는 “파일을 보관하는 곳”, Vercel은 “그 파일을 웹사이트 주소로 보여주는 곳”입니다. 파일은 GitHub에 있고, 사람들은 Vercel 주소로 봅니다. 그래서 순서는 보통 GitHub에 올리기 먼저, Vercel로 공개하기 나중입니다.',
        },
        {
          title: '전체 순서는 어떻게 되나요?',
          body: '순서는 4단계입니다. 1. 내 컴퓨터나 AI 앱에서 웹사이트를 만듭니다. 2. GitHub에 올립니다. 3. Vercel이 GitHub에 있는 파일을 가져옵니다. 4. Vercel이 공개 주소를 만들어줍니다. 나중에 고치면 다시 GitHub에 올리고, Vercel 주소에서 새 내용이 보이는지 확인합니다.',
        },
        {
          title: '언제 굳이 안 해도 되나요?',
          body: '혼자 보는 메모, 연습 파일, 아직 모양도 안 잡힌 초안이면 지금은 안 해도 됩니다. 남에게 링크를 보내야 하거나, 나중에 계속 고칠 웹사이트라면 GitHub와 Vercel을 쓰는 편이 좋습니다. 먼저 결과물이 작게라도 생겼을 때 연결해도 늦지 않습니다.',
        },
        {
          title: 'AI에게 어떻게 부탁하면 되나요?',
          body: '처음에는 기능 이름을 많이 외울 필요 없습니다. “이 작업을 공개 링크로 만들어야 하는지 판단해줘”라고 물어보면 됩니다. GitHub에 올리는 일이나 Vercel 공개 상태 확인도 AI에게 “내 화면을 보고 다음 행동 하나만 알려줘”라고 요청하면 됩니다.',
        },
        {
          title: 'AI가 대신 할 수 있는 일 전체',
          body: 'AI는 GitHub 공간 만들기, 파일 올리기, 저장점 만들기, GitHub로 보내기, Vercel 공개 상태 확인, 실패 문구 읽기, 공개 주소가 열리는지 확인하기까지 도울 수 있습니다. 하지만 계정 가입, 로그인 승인, 결제, 2단계 인증, 비밀번호나 API 키 확인은 사람이 직접 해야 합니다. 기준은 간단합니다. “내 계정의 권한을 허용하는 버튼”은 사람이 누르고, “파일을 정리하고 상태를 확인하는 일”은 AI에게 맡깁니다.',
        },
        {
          title: 'Cloudflare도 써야 하나요?',
          body: '현재 기본 순서에는 필요 없습니다. Cloudflare는 내가 산 도메인이나 이메일 연결을 만질 때만 등장합니다. 화면이 어렵게 보이면 AI에게 “Cloudflare에서 무엇을 넣어야 하는지 쉬운 말로 알려줘”라고 요청하세요.',
        },
      ],
      recommended: ['office-hours'],
      useful: ['github:github: GitHub 상태를 확인할 때', '@vercel: Vercel 공개 상태를 확인할 때', 'Cloudflare DNS: 도메인을 직접 연결할 때만'],
      output: 'GitHub/Vercel 필요 여부 결정',
      prompt: `내가 만들고 있는 작업물에 GitHub와 Vercel 공개 링크가 필요한지 판단해줘.

내 상황:
- 만들고 있는 것: [예: 가게 소개 페이지, 행사 신청 페이지, 개인 연습 파일]
- 남에게 링크를 보낼 필요: [있음/없음/모름]
- 나중에 계속 수정할 가능성: [있음/없음/모름]

초보자 기준으로 "지금 해야 함 / 나중에 해도 됨 / 안 해도 됨" 중 하나로 골라줘.
이유는 3줄만.`,
    },
    {
      step: '02',
      label: '계정 만들기',
      title: 'GitHub와 Vercel 계정을 준비합니다.',
      goal: '1. GitHub에 로그인할 수 있게 합니다. 2. Vercel은 GitHub 계정으로 들어갈 수 있게 합니다. 3. 끝나면 나중에 공개 링크 만들 때 계정 때문에 멈추지 않습니다.',
      officialLinks: [
        { label: 'GitHub 가입하러 가기', url: 'https://github.com/signup' },
        { label: 'Vercel 가입하러 가기', url: 'https://vercel.com/signup' },
      ],
      screenshots: [
        {
          url: 'https://github.com/signup',
          src: '/assets/tutorials/github-vercel/screenshots/github-signup.png',
          alt: 'GitHub 가입 실제 화면',
        },
        {
          url: 'https://vercel.com/signup',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-signup.png',
          alt: 'Vercel 가입 실제 화면',
        },
      ],
      successCriteria: [
        'GitHub에 로그인할 수 있다.',
        'Vercel에 GitHub 계정으로 로그인할 수 있다.',
        'Vercel에서 GitHub 접근 권한 요청 화면이 나와도 당황하지 않는다.',
      ],
      conceptToggles: [
        {
          title: '왜 같은 이메일이 좋나요?',
          body: '필수는 아니지만 처음에는 같은 이메일이 편합니다. GitHub는 파일을 보관하는 계정이고, Vercel은 그 GitHub 파일을 가져와 공개하는 계정입니다. 두 계정 이메일이 다르면 “내 작업물이 왜 Vercel에서 안 보이지?”처럼 헷갈릴 수 있습니다. 처음에는 같은 이메일로 만들고, Vercel은 GitHub로 로그인하는 방식을 추천합니다.',
        },
        {
          title: 'GitHub로 Vercel 로그인해도 괜찮나요?',
          body: '괜찮습니다. 오히려 처음에는 그게 더 쉽습니다. Vercel은 GitHub에 있는 파일을 가져와야 웹사이트를 공개할 수 있습니다. GitHub로 Vercel에 로그인하면 나중에 파일 묶음을 고를 때 단계가 줄어듭니다. 권한 요청 화면이 나오면 “Vercel이 내 GitHub 파일을 읽어도 되는지 묻는 화면”이라고 이해하면 됩니다.',
        },
        {
          title: 'AI가 대신 할 수 있나요?',
          body: '가입, 로그인, 2단계 인증, 권한 승인 버튼은 사람이 직접 해야 합니다. AI가 내 계정에 몰래 들어가거나 대신 인증하면 안 됩니다. 대신 AI는 화면을 보고 “지금은 Continue with GitHub를 누르세요”, “이 권한 요청은 Vercel 연결에 필요한 정상 화면입니다”, “결제 화면이 나오면 멈추세요”처럼 다음 행동을 안내할 수 있습니다.',
        },
      ],
      recommended: ['github:github', '@vercel'],
      useful: ['browser:control-in-app-browser: 로그인 화면을 같이 확인할 때', 'chrome:control-chrome: 내 Chrome 로그인 상태를 써야 할 때'],
      output: 'GitHub 계정과 Vercel 계정',
      recoveryPrompt: 'GitHub 또는 Vercel 가입 화면에서 막혔어. 지금 화면에서 눌러야 할 것 하나만 알려줘.',
      prompt: `GitHub와 Vercel 계정을 만들고 있어.
나는 초보자야.

지금 화면을 설명할 테니, 다음에 눌러야 할 버튼 하나만 알려줘.
보안이나 결제 관련 화면이면 먼저 위험한지 설명해줘.`,
    },
    {
      step: '03',
      label: '보관함 만들기',
      title: 'GitHub에 내 작업물을 담을 공간을 하나 만듭니다.',
      goal: '1. 웹사이트 하나를 담을 GitHub 공간을 만듭니다. 2. 공개 여부를 실수하지 않게 확인합니다. 3. 끝나면 내 작업물을 올릴 주소가 생깁니다.',
      officialLinks: [
        { label: 'GitHub 새 보관함 만들기 도움말', url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository' },
      ],
      screenshots: [
        {
          url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository',
          src: '/assets/tutorials/github-vercel/screenshots/github-new-repository-docs.png',
          alt: 'GitHub 새 보관함 만들기 도움말 실제 화면',
        },
      ],
      successCriteria: [
        'AI가 GitHub 공간 만들기를 도울 수 있는지 확인했다.',
        'GitHub에 새 보관함이 생겼다.',
        '이름을 영어 소문자와 하이픈으로 정했다.',
        'Public/Private 중 무엇을 골랐는지 안다.',
      ],
      conceptToggles: [
        {
          title: 'GitHub 보관함이 뭔가요?',
          body: '웹사이트 하나를 담는 상자라고 생각하면 됩니다. 예를 들어 카페 소개 사이트를 만들면, 그 사이트의 파일과 고친 기록이 GitHub 보관함 하나에 들어갑니다. 내 컴퓨터의 작업 폴더와 GitHub 보관함이 연결되면, AI가 파일을 고친 뒤 그 결과를 GitHub에 올릴 수 있습니다.',
        },
        {
          title: 'Public과 Private 차이',
          body: 'Public은 GitHub 안의 파일을 누구나 볼 수 있는 상태입니다. Private은 초대받은 사람만 볼 수 있는 상태입니다. 중요한 점은 “웹사이트 공개”와 “GitHub 파일 공개”가 다르다는 것입니다. Vercel로 웹사이트를 공개하더라도 GitHub 파일은 Private으로 둘 수 있습니다. 처음에는 Private이 더 안전합니다.',
        },
        {
          title: 'README는 켜도 되나요?',
          body: 'README는 GitHub 첫 화면에 보이는 설명 파일입니다. 처음 만든 빈 공간이라면 켜도 됩니다. 다만 이미 내 컴퓨터에 AI가 만든 웹사이트 파일 묶음이 있고, 그걸 통째로 올릴 예정이라면 README를 켤지 말지 AI에게 현재 상황을 말하고 안내받으세요. 이 선택 때문에 멈출 필요는 없습니다.',
        },
        {
          title: 'AI가 대신 할 수 있나요?',
          body: '가능한 경우가 많습니다. GitHub 연결이 되어 있으면 AI가 이름을 제안하고, Public/Private과 README 여부를 확인한 뒤 새 공간 만들기까지 도울 수 있습니다. 권한이 없으면 직접 만들지는 못하지만, 어떤 값을 골라야 하는지 정리해줄 수 있습니다. Public 공개 여부는 실수하면 부담이 크니 사람이 마지막으로 확인하세요.',
        },
      ],
      recommended: ['github:yeet'],
      useful: ['github:github: GitHub 공간 만들기 가능 여부와 상태를 확인할 때', 'git-workflow: 저장점 만들기와 올리기를 맡길 때', 'browser:control-in-app-browser: 사람이 눌러야 하는 화면을 같이 볼 때'],
      output: '빈 GitHub 보관함 1개',
      recoveryPrompt: 'GitHub 새 공간 만들기에서 막혔어. AI가 도울 수 있는지 먼저 확인하고, 안 되면 내가 눌러야 할 선택지만 골라줘.',
      prompt: `GitHub에 내 작업물을 담을 새 공간을 만들어줘.

내 작업물:
[무엇을 만들었는지 쓰기]

원하는 것:
1. 먼저 AI가 새 공간 만들기까지 도울 수 있는지 확인해줘.
2. 가능하면 이름, Public/Private, README 여부를 정하고 직접 만들어줘.
3. 권한이 없어서 직접 만들 수 없으면, 내가 GitHub 화면에서 눌러야 할 선택지만 알려줘.
4. 만들었으면 GitHub 주소를 알려줘.
5. 누르면 안 되는 선택지도 짧게 말해줘.

초보자 기준으로 짧게.`,
    },
    {
      step: '04',
      label: '파일 올리기',
      title: '내 컴퓨터의 작업물을 GitHub에 올립니다.',
      goal: '1. 현재 작업 폴더가 맞는지 확인합니다. 2. 파일을 GitHub 보관함에 올립니다. 3. 끝나면 GitHub 화면에 내 파일 목록이 보입니다.',
      screenshots: [
        {
          url: 'https://github.com/',
          src: '/assets/tutorials/github-vercel/screenshots/github-repo-files.png',
          alt: 'GitHub 파일 목록 실제 화면',
        },
      ],
      successCriteria: [
        'GitHub 화면에 내 파일 목록이 보인다.',
        'AI 앱이 commit 또는 push가 끝났다고 말한다.',
        'GitHub 주소를 다시 열어 새로고침했을 때 파일이 그대로 보인다.',
      ],
      conceptToggles: [
        {
          title: 'commit과 push가 뭔가요?',
          body: 'commit은 “지금 상태로 저장점 만들기”입니다. push는 “그 저장점을 GitHub에 올리기”입니다. 이렇게만 기억하면 됩니다. commit은 내 작업 기록, push는 GitHub로 보내기입니다. 명령어를 외울 필요는 없습니다. AI에게 “변경한 파일을 저장점으로 만들고 GitHub에 올려줘”라고 말하면 됩니다.',
        },
        {
          title: 'AI에게 맡겨도 되나요?',
          body: '작업 폴더 안의 파일을 GitHub에 올리는 요청은 맡겨도 됩니다. 특히 “현재 폴더 확인, 어떤 파일이 바뀌었는지 설명, 저장점 만들기, GitHub로 보내기”는 AI가 잘하는 일입니다. 다만 삭제, 작업 폴더 밖 파일 변경, 계정 비밀번호, 결제 정보, 고객 개인정보가 나오면 멈추고 확인하세요.',
        },
        {
          title: 'AI가 대신 할 수 있나요?',
          body: '가능합니다. AI는 현재 폴더가 맞는지 확인하고, GitHub 보관함과 연결하고, 저장점 만들기와 올리기까지 진행할 수 있습니다. 끝난 뒤에는 GitHub 주소를 열어 파일이 올라갔는지도 확인할 수 있습니다. 요청할 때 “삭제하지 말고, 현재 폴더 안에서만 처리해줘”라고 붙이면 더 안전합니다.',
        },
        {
          title: '올리면 안 되는 것',
          body: '비밀번호, API 키, 주민등록번호, 고객 연락처 같은 민감한 정보는 GitHub에 올리면 안 됩니다. Public으로 열어둔 공간이라면 특히 더 위험합니다.',
        },
      ],
      recommended: ['git-workflow'],
      useful: ['github:github: GitHub 상태를 확인할 때', 'github:yeet: AI가 GitHub에 올리는 일까지 처리해야 할 때', 'github:gh-fix-ci: GitHub 검사 실패를 고칠 때'],
      output: '파일이 올라간 GitHub 보관함',
      recoveryPrompt: 'GitHub에 파일 올리다가 막혔어. 내 GitHub 주소와 현재 오류 문구를 보고 다음 행동 하나만 알려줘.',
      prompt: `내 작업 폴더를 GitHub에 올려줘.
가능하면 사람이 컴퓨터 명령어를 직접 치지 않게 네가 대신 처리해줘.

GitHub 주소:
[GitHub 주소 붙여넣기]

규칙:
0. GitHub 주소가 없으면 먼저 새 공간을 만들 수 있는지 확인해줘.
1. 먼저 현재 폴더가 맞는지 확인해줘.
2. 삭제 명령은 쓰지 마.
3. 필요한 경우 commit 메시지는 "Add first website version"으로 해줘.
4. push가 끝나면 GitHub에서 확인할 주소를 알려줘.
5. 실패하면 원인과 다음 행동 하나만 알려줘.`,
    },
    {
      step: '05',
      label: 'Vercel 연결',
      title: 'Vercel에서 공개 주소를 만듭니다.',
      goal: '1. Vercel에서 GitHub에 올린 작업물을 고릅니다. 2. 공개 주소 만들기를 시작합니다. 3. 끝나면 손님에게 보낼 수 있는 링크가 생깁니다.',
      officialLinks: [
        { label: 'Vercel Git 연결 도움말', url: 'https://vercel.com/docs/git' },
        { label: 'Vercel 시작하기 문서', url: 'https://vercel.com/docs/getting-started-with-vercel' },
        { label: 'Vercel 도메인 연결 문서', url: 'https://vercel.com/docs/domains/working-with-domains/add-a-domain' },
        { label: 'Cloudflare DNS 레코드 문서', url: 'https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/' },
        { label: 'Astro Vercel 공개 도움말', url: 'https://docs.astro.build/en/guides/deploy/vercel/' },
      ],
      screenshots: [
        {
          url: 'https://vercel.com/docs/git',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-git-docs.png',
          alt: 'Vercel Git 연결 도움말 실제 화면',
        },
        {
          url: 'https://vercel.com/docs/domains/working-with-domains/add-a-domain',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-domain-docs.png',
          alt: 'Vercel 도메인 연결 문서 실제 화면',
        },
        {
          url: 'https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/',
          src: '/assets/tutorials/github-vercel/screenshots/cloudflare-dns-docs.png',
          alt: 'Cloudflare DNS 레코드 문서 실제 화면',
        },
      ],
      successCriteria: [
        'Vercel에서 내 GitHub 작업물을 선택했다.',
        'Deploy 버튼을 눌렀다.',
        '공개 주소 만들기가 성공했고 링크가 생겼다.',
      ],
      conceptToggles: [
        {
          title: 'Vercel 연결은 무슨 뜻인가요?',
          body: 'Vercel 연결은 “GitHub에 올린 이 작업물을 웹사이트로 보여줘”라고 맡기는 단계입니다. Vercel은 GitHub 안의 파일을 읽고, 웹사이트로 만들고, 공개 주소를 만듭니다. 그래서 먼저 GitHub에 파일이 올라가 있어야 Vercel이 가져올 수 있습니다.',
        },
        {
          title: 'Deploy는 뭔가요?',
          body: 'Deploy는 Vercel 화면에서 보이는 버튼 이름입니다. 뜻은 “웹사이트를 인터넷 주소로 보여주기 시작한다”입니다. GitHub에 파일이 있어도 이 단계를 해야 사람들이 주소로 볼 수 있습니다.',
        },
        {
          title: 'Framework Preset은 뭔가요?',
          body: 'Vercel 화면에서 보이는 선택 이름입니다. “이 웹사이트가 어떤 방식으로 만들어졌는지” 고르는 칸이라고 보면 됩니다. Astro, Next.js, Vite 같은 이름이 보일 수 있습니다. Vercel이 보통 자동으로 맞춰주지만, 틀리면 공개 주소 만들기가 실패할 수 있습니다. 직접 찍지 말고 AI에게 파일을 보고 맞춰달라고 하세요.',
        },
        {
          title: '환경변수는 뭔가요?',
          body: '환경변수는 API 키, 비밀번호, 비밀 토큰처럼 화면에 그대로 적으면 안 되는 값을 따로 넣는 칸입니다. 결제, 로그인, 외부 서비스 연결이 있는 웹사이트는 필요할 수 있습니다. 하지만 단순 소개 페이지, 행사 안내 페이지, 신청 링크 페이지는 보통 비워도 됩니다. 모르면 값을 아무거나 넣지 말고 AI에게 “이 작업물에 필요한 비밀값이 있는지 확인해줘”라고 물어보세요.',
        },
        {
          title: 'Deploy가 실패하면?',
          body: 'Deploy 실패는 “공개 주소 만들기에 실패했다”는 뜻입니다. 겁낼 필요는 없지만, 눈으로 대충 찍어 고치면 더 꼬일 수 있습니다. Vercel의 빨간 오류 문구를 복사해서 AI에게 주고, “원인을 쉬운 말로 설명하고 다음 행동 하나만 알려줘”라고 요청하세요.',
        },
        {
          title: 'AI가 대신 할 수 있나요?',
          body: '대부분 가능합니다. Vercel 연결이 되어 있으면 AI가 작업물 연결, 공개 주소 만들기, 실패 문구 확인, 원인 정리까지 도울 수 있습니다. 사람이 해야 하는 일은 GitHub/Vercel 권한 승인 화면에서 허용 여부를 확인하고 누르는 것입니다. 버튼 승인과 계정 판단은 사람, 설정 확인과 실패 분석은 AI에게 맡기면 됩니다.',
        },
        {
          title: 'Cloudflare는 언제 필요한가요?',
          body: 'Vercel이 주는 vercel.app 주소만 쓸 거면 Cloudflare는 필요 없습니다. Cloudflare는 내가 산 도메인, 예를 들어 myshop.com이나 ai-night.study 같은 주소를 붙일 때 등장합니다. 그 도메인의 DNS 관리가 Cloudflare에 있다면, Vercel이 알려주는 A 또는 CNAME 값을 Cloudflare DNS 화면에 넣어야 합니다. 쉽게 말해 Vercel은 “웹사이트가 있는 곳”, Cloudflare DNS는 “내 도메인을 그곳으로 안내하는 주소록”입니다.',
        },
        {
          title: 'Cloudflare Email Routing도 필요한가요?',
          body: '웹사이트 공개에는 필요 없습니다. Email Routing은 hello@내도메인.com 같은 주소로 메일을 받기만 하고 싶을 때 보는 기능입니다. 예를 들어 hello@myshop.com으로 온 메일을 내 Gmail로 전달받는 식입니다. 다만 “받기”와 “보내기”는 다릅니다. 그 주소로 안정적으로 메일을 보내려면 Google Workspace, Zoho 같은 별도 메일 서비스가 필요할 수 있습니다.',
        },
      ],
      recommended: ['@vercel'],
      useful: ['@vercel: 작업물 가져오기와 공개 상태를 확인할 때', 'Cloudflare DNS: 내 도메인이 Cloudflare에 있을 때만', 'vercel:env-vars: API 키나 비밀값을 넣어야 할 때', 'vercel:vercel-cli: 공개 상태와 오류 문구를 확인할 때', 'browser:control-in-app-browser: 사람이 눌러야 하는 Vercel 화면을 같이 볼 때'],
      output: 'Vercel 공개 주소',
      recoveryPrompt: 'Vercel에서 공개 주소 만들기가 실패했어. 오류 문구를 보고 원인을 쉬운 말로 설명하고, 다음 행동 하나만 알려줘.',
      prompt: `Vercel에서 GitHub에 올린 작업물을 공개 주소로 만들려고 해.
가능하면 @vercel 또는 Vercel 기능으로 네가 대신 확인하고 진행해줘.
권한 승인 화면은 내가 직접 누를게.

내 GitHub 주소:
[GitHub 주소]

초보자 기준으로 안내해줘:
1. Vercel에서 어디를 눌러야 하는지
2. Framework Preset을 무엇으로 봐야 하는지
3. Build 칸을 건드려야 하는지
4. 공개 주소가 성공했는지 확인하는 방법
5. 내 도메인을 붙일 필요가 있는지
6. 도메인이 Cloudflare에 있으면 어떤 DNS 값을 넣어야 하는지

한 번에 한 단계씩.`,
    },
    {
      step: '06',
      label: '수정 확인',
      title: '작게 고친 뒤 공개 주소에서 바뀌었는지 봅니다.',
      goal: '1. 문장 하나를 작게 고칩니다. 2. GitHub에 다시 올립니다. 3. 끝나면 Vercel 공개 주소에서 바뀐 문장이 보입니다.',
      screenshots: [
        {
          url: 'https://vercel.com/docs/deployments',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-deployments-docs.png',
          alt: 'Vercel 공개 기록 도움말 실제 화면',
        },
        {
          url: 'https://github.com/',
          src: '/assets/tutorials/github-vercel/screenshots/github-repo-files.png',
          alt: 'GitHub 파일 목록 실제 화면',
        },
      ],
      successCriteria: [
        '작은 문장 하나를 수정했다.',
        '수정 내용을 GitHub에 올렸다.',
        'Vercel이 새 공개 버전을 만들었다.',
        'Production 공개 주소에서 수정한 문장이 보인다.',
      ],
      conceptToggles: [
        {
          title: '왜 마지막 확인이 중요한가요?',
          body: '처음 공개 주소가 열렸다고 끝난 것이 아닙니다. 실제 운영에서는 문구를 고치고, 사진을 바꾸고, 버튼 링크를 수정하는 일이 계속 생깁니다. 그래서 작은 문장 하나를 바꿔 GitHub에 올리고, Vercel 공개 주소에서 그 문장이 보이는지 확인해야 합니다. 이 확인이 되면 “수정 -> GitHub -> Vercel -> 공개 주소” 순서가 제대로 이어진 것입니다.',
        },
        {
          title: 'Production과 Preview 차이',
          body: 'Production은 손님에게 보내는 진짜 주소입니다. Preview는 수정 중인 버전을 미리 보는 임시 주소입니다. 헷갈리면 이렇게 기억하세요. 공유는 Production, 확인은 Preview. 고객, 단체방, 포스터, 인스타그램 프로필에는 Production 주소를 넣습니다. 공유하기 전에는 AI에게 “이게 Production 주소인지 확인해줘”라고 물어보세요.',
        },
        {
          title: '수정하면 어떤 순서로 바뀌나요?',
          body: '순서는 같습니다. 1. 파일을 고칩니다. 2. commit으로 저장점을 만듭니다. 3. push로 GitHub에 올립니다. 4. Vercel이 새 공개 버전을 만듭니다. 5. Production 주소에서 바뀐 내용을 확인합니다.',
        },
        {
          title: 'AI가 대신 할 수 있나요?',
          body: '가능합니다. AI는 GitHub에 최신 수정이 올라갔는지 보고, Vercel 공개 주소 만들기가 성공했는지 확인하고, Production 주소가 열리는지 검사할 수 있습니다. 화면이 깨지는지, 버튼이 눌리는지, 모바일에서 글자가 겹치지 않는지도 확인할 수 있습니다. 사람이 할 일은 최종 화면을 보고 “이 내용이 맞다/아니다”를 판단하는 것입니다.',
        },
      ],
      recommended: ['vercel:verification'],
      useful: ['github:github: 최신 저장점이 올라갔는지 확인할 때', '@vercel: 공개 상태를 다시 확인할 때', 'git-workflow: 수정 저장과 올리기를 맡길 때', 'vercel:verification: 실제 브라우저로 확인할 때', 'playwright: 화면 깨짐을 자동 확인할 때', 'qa: 사람이 쓰는 흐름으로 점검할 때', 'vercel:deployments-cicd: Production과 Preview를 구분해 확인할 때'],
      output: '수정 확인까지 끝난 공개 링크',
      recoveryPrompt: 'Vercel 공개 주소에서 수정한 내용이 안 보여. GitHub와 Vercel 중 어디를 확인해야 하는지 순서대로 알려줘.',
      prompt: `내 웹사이트 수정이 Vercel 공개 주소에서 보이는지 확인해줘.

확인할 것:
1. GitHub에 최신 수정이 올라갔는지
2. Vercel 새 공개 버전 만들기가 성공했는지
3. 공개 주소에서 수정한 문장이 보이는지
4. 안 보이면 캐시, 브랜치, 공개 실패 중 무엇이 의심되는지

다음 행동 하나만 알려줘.`,
    },
    {
      step: '07',
      label: '(선택) Cloudflare로 나만의 도메인 연결하기',
      title: 'Vercel 공개 주소 대신 내가 산 도메인을 연결합니다.',
      goal: '1. 내 도메인을 쓸지 정합니다. 2. Vercel 기본 주소만으로 부족할 때 필요합니다. 3. 끝나면 내가 산 도메인으로 웹사이트가 열립니다.',
      officialLinks: [
        { label: 'Vercel 도메인 연결 문서', url: 'https://vercel.com/docs/domains/working-with-domains/add-a-domain' },
        { label: 'Cloudflare DNS 레코드 만들기', url: 'https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/' },
        { label: 'Cloudflare 사이트 추가 문서', url: 'https://developers.cloudflare.com/fundamentals/setup/account-setup/add-site/' },
      ],
      screenshots: [
        {
          url: 'https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/',
          src: '/assets/tutorials/github-vercel/screenshots/cloudflare-dns-docs.png',
          alt: 'Cloudflare DNS 레코드 문서 실제 화면',
        },
        {
          url: 'https://vercel.com/docs/domains/working-with-domains/add-a-domain',
          src: '/assets/tutorials/github-vercel/screenshots/vercel-domain-docs.png',
          alt: 'Vercel 도메인 연결 문서 실제 화면',
        },
      ],
      successCriteria: [
        'Vercel 기본 주소가 먼저 정상으로 열린다.',
        '내 도메인의 DNS 관리 위치가 Cloudflare인지 확인했다.',
        'Vercel Domains 화면에서 요구하는 DNS 값을 확인했다.',
        'Cloudflare DNS에 A 또는 CNAME 레코드를 추가했다.',
        '내 도메인 주소로 접속했을 때 Vercel 사이트가 열린다.',
      ],
      conceptToggles: [
        {
          title: '이 단계는 꼭 해야 하나요?',
          body: '아닙니다. Vercel이 준 vercel.app 주소만 공유해도 웹사이트 공개는 끝입니다. 내 브랜드 도메인, 예를 들어 myshop.com이나 ai-night.study 같은 주소를 쓰고 싶을 때만 이 선택 단계를 진행합니다.',
        },
        {
          title: 'Cloudflare는 여기서 무슨 역할인가요?',
          body: 'Cloudflare는 도메인의 주소록입니다. 사람이 myshop.com을 입력하면, Cloudflare DNS가 “이 주소는 Vercel 사이트로 보내면 됩니다”라고 안내합니다. 웹사이트 파일은 Vercel에 있고, 도메인 안내판은 Cloudflare에 있다고 생각하면 됩니다.',
        },
        {
          title: 'A 레코드와 CNAME은 뭔가요?',
          body: 'A 레코드는 도메인을 숫자 IP 주소로 보내는 설정입니다. CNAME은 도메인을 다른 도메인 이름으로 보내는 설정입니다. Vercel이 어떤 값을 넣으라고 알려주므로 외울 필요는 없습니다. 초보자는 Vercel Domains 화면의 안내값을 그대로 Cloudflare DNS에 옮기는 것만 하면 됩니다.',
        },
        {
          title: 'AI에게 어떻게 부탁하나요?',
          body: 'AI에게 “Vercel 도메인 연결값을 보고, 내가 Cloudflare 화면에서 넣어야 할 값을 표로 정리해줘”라고 요청합니다. 권한이 연결되어 있으면 AI가 확인을 도울 수 있고, 권한이 없으면 사람이 눌러야 할 화면과 값을 정리해줍니다.',
        },
        {
          title: '기다려야 하나요?',
          body: '네. DNS는 바로 바뀔 때도 있지만 몇 분에서 몇 시간이 걸릴 수 있습니다. 설정 직후 안 열린다고 계속 값을 바꾸면 더 헷갈립니다. 먼저 Vercel의 도메인 상태와 Cloudflare DNS 값이 맞는지 확인하고, 그다음 기다립니다.',
        },
      ],
      recommended: ['Cloudflare DNS'],
      useful: ['@vercel: Vercel이 요구하는 도메인 DNS 값을 확인할 때', 'browser:control-in-app-browser: Cloudflare 화면을 같이 보며 사람이 눌러야 할 때', 'vercel:verification: 내 도메인으로 실제 접속되는지 확인할 때'],
      output: '내 도메인으로 열리는 웹사이트 주소',
      recoveryPrompt: 'Cloudflare에서 도메인 연결이 안 돼. Vercel Domains 화면과 Cloudflare DNS Records 화면을 보고, 빠진 값 하나만 찾아줘.',
      prompt: `가능하면 Cloudflare DNS 확인 기능을 써서 내 도메인을 Vercel 사이트에 연결하는 과정을 도와줘.
나는 초보자야. 한 번에 한 단계씩 안내해줘.

현재 상태:
- Vercel 공개 주소: [vercel.app 주소 붙여넣기]
- 연결하고 싶은 내 도메인: [예: myshop.com]
- 도메인 DNS 관리 위치: [Cloudflare / 모름]

해줄 일:
1. Cloudflare가 지금 필요한 상황인지 먼저 판단해줘.
2. Vercel Domains 화면에서 확인해야 할 값을 알려줘.
3. Cloudflare DNS Records에 넣을 값을 표로 정리해줘.
4. 내가 직접 눌러야 하는 버튼과 입력값만 알려줘.
5. 설정 후 확인할 주소와 기다릴 시간을 알려줘.
6. 값이 틀리면 바꾸기 전에 먼저 원인을 설명해줘.`,
    },
  ],
};

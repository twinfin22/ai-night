import type { TutorialData, TutorialStep } from './tutorial-types';

const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n');

const sectionList = (title: string, items: string[]) => {
  if (items.length === 0) return '';
  return `\n### ${title}\n${list(items)}\n`;
};

const renderStep = (step: TutorialStep) => `## ${step.step}. ${step.label}

${step.title}

${step.goal}
${sectionList('내가 할 일', step.learner)}${sectionList('AI에게 맡길 일', step.ai)}${sectionList('추천 스킬', step.recommended)}${sectionList('같이 쓰면 좋은 기능', step.useful)}
### 이 단계 결과물
${step.output}
${step.prompt ? `\n### 복붙 프롬프트\n\n\`\`\`text\n${step.prompt}\n\`\`\`\n` : ''}`;

export const renderTutorialMarkdown = (tutorial: TutorialData) => `# ${tutorial.title}

${tutorial.description}

원본 페이지: ${tutorial.canonicalPath}

## 먼저 준비할 것
${list(tutorial.prepItems)}

중요: ${tutorial.prepNote}

## 이번 튜토리얼에서 하는 일
${list(tutorial.steps.map((step) => `${step.step}. ${step.label} - ${step.title}`))}

${tutorial.steps.map(renderStep).join('\n')}
## 중간에 끊기면

\`\`\`text
${tutorial.resumePrompt}
\`\`\`
`;

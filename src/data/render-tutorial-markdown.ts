import { renderSkillMarkdownLink } from './skill-links';
import type { TutorialData, TutorialStep } from './tutorial-types';

const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n');
const skillList = (items: string[]) => items.map((item) => `- ${renderSkillMarkdownLink(item)}`).join('\n');

const sectionList = (title: string, items: string[], options?: { skillLinks?: boolean }) => {
  if (items.length === 0) return '';
  return `\n### ${title}\n${options?.skillLinks ? skillList(items) : list(items)}\n`;
};

const linkList = (links: TutorialStep['officialLinks']) => {
  if (!links?.length) return '';
  return `\n### 공식 링크\n${links.map((link) => `- [${link.label}](${link.url})`).join('\n')}\n`;
};

const trackLabel = (track: TutorialStep['track']) => {
  if (track === 'codex') return 'Codex 전용';
  if (track === 'claude') return 'Claude 전용';
  return '공통';
};

const renderStep = (step: TutorialStep) => `## ${step.step}. ${step.label}

${step.title}

트랙: ${trackLabel(step.track)}

${step.goal}
${step.duration ? `\n예상 시간: ${step.duration}\n` : ''}${linkList(step.officialLinks)}${sectionList('끝났는지 확인', step.successCriteria ?? [])}${sectionList('추천 스킬', step.recommended, { skillLinks: true })}${sectionList('같이 쓰면 좋은 기능', step.useful, { skillLinks: true })}
### 이 단계 결과물
${step.output}
${step.conceptToggles?.length ? `\n### 더 알아보기\n${step.conceptToggles.map((item) => `- ${item.title}: ${item.body}`).join('\n')}\n` : ''}
${step.recoveryPrompt ? `\n### 막혔을 때\n\n\`\`\`text\n${step.recoveryPrompt}\n\`\`\`\n` : ''}
${step.prompt ? `\n### 복붙 프롬프트\n\n\`\`\`text\n${step.prompt}\n\`\`\`\n` : ''}`;

export const renderTutorialMarkdown = (tutorial: TutorialData) => `# ${tutorial.title}

${tutorial.description}

원본 페이지: ${tutorial.canonicalPath}

## 이번 튜토리얼에서 하는 일
${list(tutorial.steps.map((step) => `${step.step}. ${step.label} - ${step.title}`))}

${tutorial.steps.map(renderStep).join('\n')}`;

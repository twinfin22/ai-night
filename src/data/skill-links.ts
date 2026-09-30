const exactSkillGitHubLinks: Record<string, string> = {
  'office-hours': 'https://github.com/garrytan/gstack/tree/main/office-hours',
  'grill-with-docs': 'https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs',
  playwright: 'https://github.com/openai/skills/tree/main/skills/.curated/playwright',
  'skill-installer': 'https://github.com/openai/skills/tree/main/skills/.system/skill-installer',
};

const githubSearchLink = (skill: string) =>
  `https://github.com/search?q=${encodeURIComponent(`"${skill}" "SKILL.md"`)}&type=code`;

export type SkillReference = {
  name: string;
  description: string;
  url?: string;
};

const skillLikePattern = /^@?[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)?$/i;

export const parseSkillReference = (item: string): SkillReference => {
  const trimmed = item.trim();
  const commandMatch = trimmed.match(/^(@?[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)?)(?:\s*:\s+(.+))?$/i);
  const colonIndex = commandMatch ? -1 : trimmed.indexOf(':');
  const maybeName = commandMatch?.[1] ?? (colonIndex > 0 ? trimmed.slice(0, colonIndex).trim() : trimmed);
  const description = commandMatch?.[2] ?? (colonIndex > 0 ? trimmed.slice(colonIndex + 1).trim() : '');
  const name = maybeName || trimmed;
  const url = exactSkillGitHubLinks[name] ?? (skillLikePattern.test(name) ? githubSearchLink(name) : undefined);

  return {
    name,
    description,
    url,
  };
};

export const renderSkillMarkdownLink = (item: string) => {
  const skill = parseSkillReference(item);
  const suffix = skill.description ? `: ${skill.description}` : '';
  return `${skill.url ? `[${skill.name}](${skill.url})` : skill.name}${suffix}`;
};

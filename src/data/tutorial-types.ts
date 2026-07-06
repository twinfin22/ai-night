export type SummaryItem = {
  label: string;
  value: string;
};

export type TutorialStep = {
  step: string;
  track?: 'both' | 'codex' | 'claude';
  actor?: 'human' | 'ai' | 'human-ai';
  actorLabel?: string;
  overviewItems?: {
    actor: 'human' | 'ai';
    actorLabel: string;
    label: string;
    output: string;
  }[];
  loop?: boolean;
  loopLabel?: string;
  label: string;
  title: string;
  goal: string;
  duration?: string;
  officialLinks?: {
    track?: 'both' | 'codex' | 'claude';
    label: string;
    url: string;
  }[];
  screenshots?: {
    track?: 'both' | 'codex' | 'claude';
    src: string;
    alt: string;
    caption: string;
  }[];
  successCriteria?: string[];
  conceptToggles?: {
    title: string;
    body: string;
  }[];
  recoveryPrompt?: string;
  recommended: string[];
  useful: string[];
  output: string;
  prompt?: string;
};

export type TutorialData = {
  title: string;
  description: string;
  canonicalPath: string;
  markdownPath: string;
  overviewTemplate?: 'default' | 'flow';
  steps: TutorialStep[];
  stepsLabel: string;
  summary: SummaryItem[];
  resumePrompt: string;
  resumePromptByTrack?: {
    codex: string;
    claude: string;
  };
  toolSelector?: boolean;
};

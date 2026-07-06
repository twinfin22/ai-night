export type TutorialStep = {
  step: string;
  track?: 'both' | 'codex' | 'claude';
  label: string;
  title: string;
  goal: string;
  duration?: string;
  officialLinks?: {
    label: string;
    url: string;
  }[];
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
    captionUrl?: string;
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
  steps: TutorialStep[];
  stepsLabel: string;
  resumePrompt: string;
  resumePromptByTrack?: {
    codex: string;
    claude: string;
  };
  toolSelector?: boolean;
};

export type SummaryItem = {
  label: string;
  value: string;
};

export type TutorialStep = {
  step: string;
  label: string;
  title: string;
  goal: string;
  recommended: string[];
  useful: string[];
  learner: string[];
  ai: string[];
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
  summary: SummaryItem[];
  prepItems: string[];
  prepNote: string;
  resumePrompt: string;
};

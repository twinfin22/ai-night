import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';
import { firstPromptTutorial } from '../../data/first-prompt-tutorial';

export const GET = () => new Response(renderTutorialMarkdown(firstPromptTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});

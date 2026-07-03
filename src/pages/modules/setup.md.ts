import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';
import { setupTutorial } from '../../data/setup-tutorial';

export const GET = () => new Response(renderTutorialMarkdown(setupTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});

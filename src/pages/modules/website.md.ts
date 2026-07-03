import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';
import { websiteTutorial } from '../../data/website-tutorial';

export const GET = () => new Response(renderTutorialMarkdown(websiteTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});

import { githubVercelTutorial } from '../../data/github-vercel-tutorial';
import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';

export const GET = () => new Response(renderTutorialMarkdown(githubVercelTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});
